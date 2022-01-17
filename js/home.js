//Menu
$(document).ready(function () {

    $('.menu-toggle').click(function () {
        $('.menu-toggle').toggleClass('active')
        $('nav').toggleClass('active')
    })
});

//Button
$(function () {
    $('#scroll-down').click(function () {
        $('html, body').animate({ scrollTop: $('.scroll-arrival').offset().top }, 'slow');
        return false;
    })
});




