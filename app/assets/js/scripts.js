(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    
    $('#contact-form').submit(function(e){

      e.preventDefault();
      $('.contact__comment').empty();
      var postdata = $('#contact-form').serialize();
    
      $.ajax({
        type:'POST',
        url:'php/contact.php',
        data: postdata,
        dataType:'json',
        success: function(result){
            if (result.isSuccess) {
              $("#contact-form").append("<p class='thank-you'>Message envoyé avec succès. Merci de m'avoir contacté !</p>");
              $("#contact-form")[0].reset();
            }
            else {
              $("#name ~ .contact__comment").html(result.nameError);
              $("#email ~ .contact__comment").html(result.emailError);
              $("#message ~ .contact__comment").html(result.messageError);
            }
        }
      });
    });
  });

})(jQuery, window, document);
