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

    $('.b-phone').mask('7 700 00 00', { selectOnFocus: true });
});

$(function() {
    $('.b-page-filter__heading').click(function () {
        $(this).parent().toggleClass('b-page-filter_is-active_yes');
    });
});

$(function() {
    $('.b-inline-popup').magnificPopup({
        removalDelay: 500,
        callbacks: {
            beforeOpen: function() {
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
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
        prevArrow:"<div class='slick-prev'><img class='a-left control-c prev' src='img/arrow-left.png'></div>",
        nextArrow:"<div class='slick-next'><img class='a-left control-c prev' src='img/arrow-right.png'></div>"
    });
});

$(function () {
    $('.b-person-achievement__grid').slick({
        dots: false,
        speed: 700,
        infinite: false,
        slidesToShow: 5,
        adaptiveHeight: true,
        prevArrow:"<div class='slick-prev'><img class='a-left control-c prev' src='img/arrow-left.png'></div>",
        nextArrow:"<div class='slick-next'><img class='a-left control-c prev' src='img/arrow-right.png'></div>",
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
