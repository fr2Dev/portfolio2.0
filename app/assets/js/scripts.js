(function ($, window, document, undefined) {

  'use strict';

  $(function () {

    // Contact form 
    var $contactForm = $('#contact-form');

    $contactForm.submit(function(e){

      e.preventDefault();
      $('.contact__comment').empty();
      var postdata =$contactForm.serialize(),
          spinner = '.contact__ajax-status--spinner',
          checkmark = '.contact__ajax-status--checkmark',
          checkmarkPath = '.checkmark';


      function toggleAjaxIcon(icon) {
        $(icon).toggleClass('visible');
      }
    
      $.ajax({
        type:'POST',
        url:  $(this).attr('action'),
        data: postdata,
        dataType:'json'
      })
      .done(function(result){
        var classSuccess = 'contact__asterix--success',
            classError = 'contact__asterix--error',
            allClasses = classSuccess + ' ' + classError ,
            $asterixClass = $('.contact__asterix');
        
        toggleAjaxIcon(spinner);

        if (result.isSuccess) {
          $contactForm[0].reset();
          $asterixClass.removeClass(allClasses);
          toggleAjaxIcon(checkmark);
          toggleAjaxIcon(checkmarkPath);
          setTimeout(function() {
            toggleAjaxIcon(checkmark);
            toggleAjaxIcon(checkmarkPath);
          }, 3000);
        }
        else {
          var $inputName = $('#name'),
              $inputEmail = $('#email'),
              $inputMessage = $('#message'),
              classComment = '.contact__comment';

          function setAsterixColor (input, isSuccess) {
            var $asterix = input.siblings('.contact__label').find('.contact__asterix');
            isSuccess ? $asterix.removeClass(classError).addClass(classSuccess) : $asterix.removeClass(classSuccess).addClass(classError);
          }

          $inputName.siblings(classComment).html(result.nameError);
          setAsterixColor($inputName, (result.nameError.length === 0));
          $inputEmail.siblings(classComment).html(result.emailError);
          setAsterixColor($inputEmail, (result.emailError.length === 0));
          $inputMessage.siblings(classComment).html(result.messageError);
          setAsterixColor($inputMessage, (result.messageError.length === 0));
        }
      })
      .fail(function() {
        console.log('error');
        toggleAjaxIcon(spinner);
      })
      .always(function() {
        toggleAjaxIcon(spinner);
      });
    });
    // END Contact form
  });

})(jQuery, window, document);
