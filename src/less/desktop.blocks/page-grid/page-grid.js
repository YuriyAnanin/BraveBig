(function () {

    var btnList = $('.js_rating_list-btn'),
        btnGrid = $('.js_rating_grid-btn'),
        ratingList = $('.js_rating_list'),
        ratingGrid = $('.js_rating_grid');

    btnList.on('click', function (){
        ratingList.addClass('is-open');
        ratingGrid.removeClass('is-open');
        $(this).removeClass('b-button_theme_fill-empty');
        btnGrid.addClass('b-button_theme_fill-empty');
    });
    btnGrid.on('click', function (){
        ratingGrid.addClass('is-open');
        ratingList.removeClass('is-open');
        $(this).removeClass('b-button_theme_fill-empty');
        btnList.addClass('b-button_theme_fill-empty');
    });
})();