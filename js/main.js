jQuery(document).ready(function ($) {
    'use strict';

    var topHeader = $('.parallax-content');
    topHeader.css({ 'background-position': 'center center' });

    $(window).on('scroll', function () {
        var st = $(this).scrollTop();
        topHeader.css({ 'background-position': 'center calc(50% + ' + (st * 0.5) + 'px)' });
        $('.header').toggleClass('active', st > 100);
    });

    $('.pop-button').click(function () {
        $('.pop').fadeIn(300);
    });
    $('.pop > span').click(function () {
        $('.pop').fadeOut(300);
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