$(function() {
    $('.b-cities-list__data').select2({});
});

$(function() {
    $('.b-header__hamburger').click(function () {
        $(this).toggleClass('b-header__hamburger_is-active_true');
        $('.b-header__mobile').toggleClass('b-header__mobile_is-state_true');
        $('.b-mobile-menu').toggleClass('b-mobile-menu_is-active_true');
    });
});

$(function() {
   $('.b-input-wrapper__submit').on('click', function (event) {
       event.preventDefault();

       var input = $(this).parent().find('input');

       var type = input.attr('type') == "text" ? "password" : 'text';

       input.prop('type', type);
   });

    $('.b-phone').mask('+7 700 000 00 00', { selectOnFocus: true });
});

$(document).ready(function() {
    $('.js_login_form').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = 'mfp-zoom-in';
            }
        },
        midClick: true
    });
});

$(document).ready(function() {
    $('.js_recovery_form').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = 'mfp-zoom-in';
            }
        },
        midClick: true
    });
});

$(document).ready(function() {
    $('.js_register').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = 'mfp-zoom-in';
            }
        },
        midClick: true
    });
});

//asdasdasdsadasdasdasdasd

$(document).ready(function() {
    $('.js_reg').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = 'mfp-zoom-in';
            }
        },
        midClick: true
    });
});
$(document).ready(function() {
    $('.js_fri').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = 'mfp-zoom-in';
            }
        },
        midClick: true
    });
});
$(document).ready(function() {
    $('.js_book').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = 'mfp-zoom-in';
            }
        },
        midClick: true
    });
});
$(document).ready(function() {
    $('.js_iniv').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = 'mfp-zoom-in';
            }
        },
        midClick: true
    });
});
$(document).ready(function() {
    $('.js_prog').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = 'mfp-zoom-in';
            }
        },
        midClick: true
    });
});
$(document).ready(function() {
    $('.js_first_fight').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = 'mfp-zoom-in';
            }
        },
        midClick: true
    });
});
$(document).ready(function() {
    $('.js_personal_data').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = 'mfp-zoom-in';
            }
        },
        midClick: true
    });
});
$(document).ready(function() {
    $('.js_popup_open').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = 'mfp-zoom-in';
            }
        },
        midClick: true
    });
});

$(function() {
    $('.b-page-filter__heading').click(function () {
        $(this).parent().toggleClass('b-page-filter_is-active_yes');
    });
});

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
$(function () {
    $('.b-person-achievement__grid').slick({
        dots: false,
        speed: 700,
        infinite: false,
        slidesToShow: 5,
        adaptiveHeight: true,
        prevArrow:"<div class='slick-prev'><img class='a-left control-c prev' src='assets/img/arrow-left.png'></div>",
        nextArrow:"<div class='slick-next'><img class='a-left control-c prev' src='assets/img/arrow-right.png'></div>",
        variableWidth: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    arrows: false
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    variableWidth: false
                }
            }
        ]
    });
});


$(function() {
    $('.b-profile-avatar__slider').slick({
        dots: true,
        speed: 400,
        infinite: false,
        fade: true,
        arrows: false,
        cssEase: 'linear'
    });
});

$(function() {
    $('.b-rating-header__grid').slick({
        dots: false,
        arrows: false,
        speed: 700,
        infinite: false,
        slidesToShow: 4,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    arrows: false,
                    variableWidth: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                    variableWidth: false
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    variableWidth: false
                }
            }
        ]
    });
});

$(function() {
    $('[data-table-column-index=1]').addClass('b-schedule-table__column_border_left');

    $('.b-schedule-table__column').hover(
        function () {
            var columnID = $(this).attr('data-table-column-index');
            $(this).parent().parent().find("[data-table-column-index='" + columnID + "']").toggleClass('b-schedule-table__column_is-hover_true');

            $(this).parent().toggleClass('b-schedule-table__row_is-hover_true');
        }, function () {
            var columnID = $(this).attr('data-table-column-index');
            $(this).parent().parent().find("[data-table-column-index='" + columnID + "']").toggleClass('b-schedule-table__column_is-hover_true');

            $(this).parent().toggleClass('b-schedule-table__row_is-hover_true');
        }
    );

    $('.b-schedule-table__detail').hover(function () {
        $(this).text('Детали');
    }, function () {
        var oldText = $(this).attr('data-name');
        $(this).text(oldText);
    });
});

$(function() {
    $('.b-select').select2({});
});

$(function() {
    $('.b-services-item__slider').slick({
        dots: true,
        speed: 400,
        infinite: false,
        fade: true,
        cssEase: 'linear',
        prevArrow:"<div class='slick-prev'><img class='a-left control-c prev' src='assets/img/arrow-left.png'></div>",
        nextArrow:"<div class='slick-next'><img class='a-left control-c prev' src='assets/img/arrow-right.png'></div>"
    });
});
