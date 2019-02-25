(function ($, window, document, undefined) {

  'use strict';

  $(function () {

    var app = {
      init: function() {
        this.scrollLink = $('.scroll');
        this.setContactFormScript();
        this.setScrollAnimation();
        this.setSmoothScrolling();
        this.setActiveLinkSwitchOnScroll();
        this.setStickyHeader();
        this.setMobileNavClosingOnClick();
      },
      
      setContactFormScript: function() {
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
      },
      setScrollAnimation: function() {
        ScrollOut({
          once: true,
          threshold: .2
        });
      },
      setSmoothScrolling: function() {
        this.scrollLink.click(function(e) {
          e.preventDefault();
          $('body,html').animate({
            scrollTop: $(this.hash).offset().top
          }, 1000 );
        });
      },
      setActiveLinkSwitchOnScroll: function(){
        var self = this;
        
        $(window).scroll(function() {
          var scrollbarLocation = $(this).scrollTop();
          
          self.scrollLink.each(function() {
            var sectionOffset = $(this.hash).offset().top - 20;
            
            if ( sectionOffset <= scrollbarLocation ) {
              $(this).parent().addClass('active');
              $(this).parent().siblings().removeClass('active');
            }
          });
          
        });
      },
      setStickyHeader: function() {
        // grab an element
        var myElement = document.querySelector('.header');
        // construct an instance of Headroom, passing the element
        var headroom  = new Headroom(myElement);
        // initialise
        headroom.init(); 
      },
      setMobileNavClosingOnClick: function() {
        function uncheck() {
          document.querySelector('.navbar__checkbox').checked = false;
        }
       
        var navbar = document.querySelector('.navbar');
        navbar.addEventListener('click', function (event) {
          if (event.target.matches('.navbar__link')) {
            uncheck();
          }
        }, false);
      }
    };

    app.init();

    
  });

})(jQuery, window, document);
