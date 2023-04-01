$(document).ready(function() {
    
    //расписания туров, выбрать тур, получить консультацию
    $('.main_nav nav ul li:eq(1) a, .main_btna, .main_btn:has(span)').on('click', function(event) {
        event.preventDefault();
        $('.overlay').fadeIn('slow');
        $('.modal').slideDown('slow');
    });

    //закрытие на крестик
    $('.modal .close').on('click', function(event) {
        event.preventDefault();
        $('.overlay').fadeOut('slow');
        $('.modal').slideUp('slow');
    });
});