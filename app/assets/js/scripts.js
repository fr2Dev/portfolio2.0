(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    var $contactForm = $('#contact-form');

    $contactForm.submit(function(e){

      e.preventDefault();
      $('.contact__comment').empty();
      var postdata =$contactForm.serialize();
    
      $.ajax({
        type:'POST',
        url:  $(this).attr('action'),
        data: postdata,
        dataType:'json',
        success: function(result){
          console.log('result', result);

          var classSuccess = 'contact__asterix--success',
              classError = 'contact__asterix--error',
              $asterixClass = $('.contact__asterix');

          if (result.isSuccess) {
            console.log('success');

            $contactForm.append('<p class="thank-you">Message envoyé avec succès. Merci de m\'avoir contacté !</p>');
            $contactForm[0].reset();
            $asterixClass.removeClass(classError, classSuccess);
            setTimeout(function() {
              $contactForm.children().last().fadeOut(300, function() { $(this).remove(); });
            }, 3000);
          }
          else {
            var $inputName = $('#name'),
                $inputEmail = $('#email'),
                $inputMessage = $('#message'),
                classComment = '.contact__comment';

            function setAsterixColor (input, isSuccess) {
              var $asterix = input.siblings('.contact__label').find('.contact__asterix');
              console.log($asterix);

              isSuccess ? $asterix.removeClass(classError).addClass(classSuccess) : $asterix.removeClass(classSuccess).addClass(classError);
            }

            $inputName.siblings(classComment).html(result.nameError);
            setAsterixColor($inputName, (result.nameError.length == 0));
            $inputEmail.siblings(classComment).html(result.emailError);
            setAsterixColor($inputEmail, (result.emailError.length == 0));
            $inputMessage.siblings(classComment).html(result.messageError);
            setAsterixColor($inputMessage, (result.messageError.length == 0));
          }
        }
      });
    });
  });

})(jQuery, window, document);
