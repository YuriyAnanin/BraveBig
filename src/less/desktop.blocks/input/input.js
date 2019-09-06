$(function() {
   $('.b-input-wrapper__submit').on('click', function (event) {
       event.preventDefault();

       var input = $(this).parent().find('input');

       var type = input.attr('type') == "text" ? "password" : 'text';

       input.prop('type', type);
   });

    $('.b-phone').mask('+7 700 000 00 00', { selectOnFocus: true });
});
