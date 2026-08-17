jQuery(document).ready(function($) {
    'use strict';
    var owl = $("#owl-testimonials");
    owl.owlCarousel({ 
        pagination : true,
        paginationNumbers: false,
        autoPlay: 6000,
        items : 1,
        itemsDesktop : [1000,1],
        itemsDesktopSmall : [900,1],
        itemsTablet: [600,1],
        itemsMobile : false    
    });
    var top_header = $('.parallax-content');
    top_header.css({'background-position':'center center'});
    
    $(window).scroll(function () {
        var st = $(this).scrollTop();
        top_header.css({'background-position':'center calc(50% + '+(st*.5)+'px)'});
    });
    
    $('.counter').each(function() {
        var $this = $(this),
        countTo = $this.attr('data-count');  
        $({ countNum: $this.text()}).animate({
        countNum: countTo
        },

        {
        duration: 8000,
        easing:'linear',
        step: function() {
            $this.text(Math.floor(this.countNum));
        },
        complete: function() {
            $this.text(this.countNum);
        }
        });  
    });
    
    $(".pop-button").click(function () {
        $(".pop").fadeIn(300);
    });
    $(".pop > span").click(function () {
        $(".pop").fadeOut(300);
    });
    $(window).on("scroll", function() {
        if($(window).scrollTop() > 100) {
        $(".header").addClass("active");
        } else {
            $(".header").removeClass("active");
        }
    });
});


const form = document.getElementById('contact');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const service_id = process.env.SERVICEID;
    const template_id = process.env.TEMPLATEID;
    const api_key = process.env.APIKEY;

    emailjs.init(api_key);

    const t_name = document.getElementById('name').value;
    const msg = document.getElementById('message').value;
    const submitButton = document.getElementById('form-submit');

    const tempParam = {
        to_name: t_name,
        message: msg,
    };
    
    $(".pop").fadeOut(300);
    submitButton.disabled = true;
    
    emailjs.send(service_id, template_id, tempParam)
    .then(function (response) {
        console.log('Success', response.status, response.text);
        showNotification('Message sent successfully!', true);
        form.reset();
        submitButton.disabled = false;
    }, function (error) {
        console.log('Error:', error);
        showNotification('Failed to send message.', false);
        submitButton.disabled = false;
    });
});

function showNotification(message, success) {
    const notification = document.createElement('div');

    notification.className = 'email-notification';
    notification.textContent = message;

    if (success) {
        notification.classList.add('success');
    } else {
        notification.classList.add('error');
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');

        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 1500);
}