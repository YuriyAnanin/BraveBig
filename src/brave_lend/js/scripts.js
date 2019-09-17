$(function () {
    var accordion = $('.js_accordion');
    if (accordion.length) {
        var title = accordion.find('.accordion__item-title');

        title.on('click', function (e) {
            e.preventDefault();

            var $this = $(this);

            if ($this.parent().hasClass('is-open')) {
                $this.parent().removeClass('is-open');
                $this.next().slideUp(350);
            } else {
                $this.parent().parent().find('.accordion__item').removeClass('is-open');
                $this.parent().parent().find('.accordion__item-content-wrap').slideUp(350);
                $this.parent().toggleClass('is-open');
                $this.next().slideToggle(350);
            }

            /*var $this = $(this);

            if ($this.next().hasClass('show')) {
                $this.next().removeClass('show');
                $this.next().slideUp(350);
            } else {
                $this.parent().parent().find('li .inner').removeClass('show');
                $this.parent().parent().find('li .inner').slideUp(350);
                $this.next().toggleClass('show');
                $this.next().slideToggle(350);
            }*/
        });
    }
});
$(document).ready(function(){
    $('.js_thank_link').magnificPopup({
        type: 'inline',
        removalDelay: 500,
        callbacks: {
            beforeOpen: function() {
                this.st.mainClass ='mfp-zoom-in';
            }
        },
        midClick: true
    });


    // Предотвращение отправки формы через php при нажатии на кнопку
    $('form').submit(function (e) {
        e.stopPropagation();
        e.preventDefault();
    });

    // Проверка почты на соответствие маске *@*.*
    function isEmail( mail ){
        var regex = /\S+@\S+/igm;
        return regex.test(mail);
    }


    // Очистка формы
    function clearFields( selector ){
        $(selector).each(function(){
            if( $(this).attr('name') !== 'form'){
                $(this).val('');
                $(this).parent().removeClass('valid');
            }
        });
    }


    // Проверка отдельного поля на валидность
    function fieldValid( input ) {

        if( input.val() !== '' ){

            if ( input.attr('type') === 'email' ){
                return isEmail( input.val() );
            } else {
                return true;
            }

        } else {
            return false;
        }

    }


    // Добавление классов полю по результатам валидации
    function fieldCheck( input ) {

        var parent = input.parent();

        if( fieldValid( input ) ){
            if( parent.hasClass('error') ){
                parent.removeClass('error')
            }
            parent.addClass('valid');

            return true;
        } else {
            if( parent.hasClass('valid') ){
                parent.removeClass('valid')
            }
            parent.addClass('error');

            return false;
        }
    }

    $('.js_form_input').on('change', function () {
        return fieldCheck( $(this) );
    });
    $('.js_form_input').on('focusout', function () {
        $(this).parent().removeClass('filling');
    });
    $('.js_form_input').on('input', function () {
        $(this).parent().addClass('filling');
    });


    // Проверка полей формы на отсутствие пустых полей и валидность
    function fieldsCheck( selector ){
        var checked = true;
        var focus = true;
        $(selector).each( function () {
            checked = fieldCheck( $(this) ) && checked;
            if ( focus && !checked ){
                $(this).focus();
                focus = false;
            }
        });
        return checked;
    }


    // Сбор данных с формы и формирование объекта
    function addFields( selector, object ){

        $(selector).each(function () {
            var $this = $(this);

            object[$this.attr('name')] = $this.val();
        });
    }

    function ajaxDataSend(type, url, data) {
        return $.ajax(
            {
                type: type,
                url: url,
                dataType: 'json',
                data: data,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            }
        );
    }


    var unical, sendButton, selector;
    var active = true;

    function finalValidation() {
        if( active ){
            sendButton = $(this);
            unical = sendButton.closest('.js_form_id').attr('id');
            selector = '#'+unical+' .js_form_input';

            var validForm  = fieldsCheck( selector );

            if ( validForm ){
                active = false;
                sendButton.addClass('load');
                sendForm();
            }
        }
    }

    $('.js_send_form').on('click', finalValidation);


    function sendForm() {

        var dataobj = {};

        addFields( selector, dataobj );

        var response = ajaxDataSend('POST', '/feedback/mail', dataobj);
        response.success(function(data){
            if(!data.error){
                $('.js_thank_link').click();
                clearFields( selector );
            }
            sendButton.removeClass('load');
            active = true;
        });
        response.error(function(data){
            console.log(data);
            sendButton.removeClass('load');
            active = true;
        });
    }
});
$(function() {
    $('.header__hamburger').click(function () {
        $(this).toggleClass('header__hamburger_is-active_true');
        $('.header__mobile').toggleClass('header__mobile_is-state_true');
        $('.mobile-menu').toggleClass('mobile-menu_is-active_true');
    });
});

$(function () {
    var $window = $(window),
        currentGallery = {};

    $(".js_reviews_slick").slick({
        infinite: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true/*,
        adaptiveHeight: true*/
    });

    $('.select').select2();


    $('.js_goto_anchor').bind("click", function(e){
        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top - 30
        }, 1000);
        e.preventDefault();
        if ($window.width() <= 992){
            $('.header__hamburger').removeClass('header__hamburger_is-active_true');
            $('.header__mobile').removeClass('header__mobile_is-state_true');
            $('.mobile-menu').removeClass('mobile-menu_is-active_true');
        }
    });


    //==== Форма "Записаться"
    $('.js_call_back').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = 'mfp-zoom-in';
            }
        },
        midClick: true
    });


    //==== Форма "Вступление"
    $('.js_offer').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = 'mfp-zoom-in';
            }
        },
        midClick: true
    }).on('click', function () {
        $('.js_offer_name').val($(this).data('offerName'));
    });


    $('.js_open_gallery').on('click', function () {
        currentGallery = galleries[$(this).data('galleryId')];

        $.magnificPopup.open({
            type: 'image',
            items: currentGallery,
            tLoading: 'Загружается изображение #%curr%...',
            closeBtnInside: false,
            removalDelay: 300,
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1],
                tPrev: 'Предыдущее',
                tNext: 'Следующее',
                tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
            },
            image: {
                tError: '<a href="%url%">Изображение #%curr%</a> не удается загрузить.',
                titleSrc: 'title'
            },
            callbacks: {
                beforeOpen: function() {
                    // just a hack that adds mfp-anim class to markup
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                    this.st.gallery.arrowMarkup = this.st.gallery.arrowMarkup.replace('mfp-arrow', 'mfp-arrow mfp-with-anim');
                    this.st.closeMarkup = this.st.closeMarkup.replace('mfp-close', 'mfp-close mfp-with-anim');
                    this.st.mainClass = 'mfp-zoom-in';
                }
            }
        });
    });
});

$(function() {

    var $window = $(window);

    $window.on('scroll', revealOnScroll);

    function revealOnScroll() {
        var viewportTop = $window.scrollTop(),
            viewportBottom = viewportTop + $window.height();

        // Showed...
        $(".js_scroll_animate:not(.animated)").each(function () {
            var $this     = $(this),
                userOffset = $this.data('viewportOffset'),
                win_height_padded = $window.height() / 100 * userOffset,
                startAnimationTop   = viewportTop + win_height_padded,
                startAnimationBottom = viewportBottom - win_height_padded,
                offsetTop       =  $this.offset().top,
                offsetBottom    =  offsetTop + $this.height();

            if ((startAnimationTop < offsetBottom) && (startAnimationTop > offsetTop)
                || (startAnimationBottom > offsetTop) && (startAnimationBottom < offsetBottom)) {
                if ($this.data('timeout')) {
                    window.setTimeout(function(){
                        $this.addClass('animated ' + $this.data('animation'));
                    }, parseInt($this.data('timeout'),10));
                } else {
                    $this.addClass('animated ' + $this.data('animation'));
                }
            }
        });
        // Hidden...
        /*$(".js_revealOnScroll.animated").each(function () {
            var $this     = $(this),
                userOffset = $this.data('viewportOffset'),
                win_height_padded = $window.height() / 100 * userOffset,
                offsetTop       =  $this.offset().top,
                offsetBottom    =  offsetTop + $this.height();
            if ((viewportTop - win_height_padded > offsetBottom)
                || (viewportBottom + win_height_padded < offsetTop)) {
                $(this).removeClass('animated ' + $this.data('animation'))
            }
        });*/
    }

    revealOnScroll();
});
$(function () {

    var $pluralItem = $('.js_plural');

    $pluralItem.each(function () {
        var thisPluralText = $(this).text(),
            thisArrText = thisPluralText.split('/'),
            thisQuantity = +thisArrText[0],
            thisCount;

        thisArrText.shift();
        if ((thisQuantity % 100 >= 11 && thisQuantity % 100 <= 20) || (thisQuantity % 10 >= 5)){
            thisCount = 2;
        } else if (thisQuantity % 10 === 1) {
            thisCount = 0;
        } else {
            thisCount = 1;
        }
        $(this).html(thisQuantity + ' ' + thisArrText[thisCount]);
        $(this).removeClass('hidden');
    });
});
$(function() {
    $('.b-header__hamburger').click(function () {
        $(this).toggleClass('b-header__hamburger_is-active_true');
        $('.b-header__mobile').toggleClass('b-header__mobile_is-state_true');
        $('.b-mobile-menu').toggleClass('b-mobile-menu_is-active_true');
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbi5qcyIsImZvcm0uanMiLCJoZWFkZXIuanMiLCJtYWluLmpzIiwicGx1cmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhY2NvcmRpb24gPSAkKCcuanNfYWNjb3JkaW9uJyk7XG4gICAgaWYgKGFjY29yZGlvbi5sZW5ndGgpIHtcbiAgICAgICAgdmFyIHRpdGxlID0gYWNjb3JkaW9uLmZpbmQoJy5hY2NvcmRpb25fX2l0ZW0tdGl0bGUnKTtcblxuICAgICAgICB0aXRsZS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAoJHRoaXMucGFyZW50KCkuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgICAgICR0aGlzLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAgICAgJHRoaXMubmV4dCgpLnNsaWRlVXAoMzUwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHRoaXMucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmFjY29yZGlvbl9faXRlbScpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAgICAgJHRoaXMucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmFjY29yZGlvbl9faXRlbS1jb250ZW50LXdyYXAnKS5zbGlkZVVwKDM1MCk7XG4gICAgICAgICAgICAgICAgJHRoaXMucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5uZXh0KCkuc2xpZGVUb2dnbGUoMzUwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyp2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAoJHRoaXMubmV4dCgpLmhhc0NsYXNzKCdzaG93JykpIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5uZXh0KCkucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5uZXh0KCkuc2xpZGVVcCgzNTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCdsaSAuaW5uZXInKS5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgICAgICAgICAgICAgICR0aGlzLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ2xpIC5pbm5lcicpLnNsaWRlVXAoMzUwKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5uZXh0KCkudG9nZ2xlQ2xhc3MoJ3Nob3cnKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5uZXh0KCkuc2xpZGVUb2dnbGUoMzUwKTtcbiAgICAgICAgICAgIH0qL1xuICAgICAgICB9KTtcbiAgICB9XG59KTsiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAgICQoJy5qc190aGFua19saW5rJykubWFnbmlmaWNQb3B1cCh7XG4gICAgICAgIHR5cGU6ICdpbmxpbmUnLFxuICAgICAgICByZW1vdmFsRGVsYXk6IDUwMCxcbiAgICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgICAgICBiZWZvcmVPcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0Lm1haW5DbGFzcyA9J21mcC16b29tLWluJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWlkQ2xpY2s6IHRydWVcbiAgICB9KTtcblxuXG4gICAgLy8g0J/RgNC10LTQvtGC0LLRgNCw0YnQtdC90LjQtSDQvtGC0L/RgNCw0LLQutC4INGE0L7RgNC80Ysg0YfQtdGA0LXQtyBwaHAg0L/RgNC4INC90LDQttCw0YLQuNC4INC90LAg0LrQvdC+0L/QutGDXG4gICAgJCgnZm9ybScpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAvLyDQn9GA0L7QstC10YDQutCwINC/0L7Rh9GC0Ysg0L3QsCDRgdC+0L7RgtCy0LXRgtGB0YLQstC40LUg0LzQsNGB0LrQtSAqQCouKlxuICAgIGZ1bmN0aW9uIGlzRW1haWwoIG1haWwgKXtcbiAgICAgICAgdmFyIHJlZ2V4ID0gL1xcUytAXFxTKy9pZ207XG4gICAgICAgIHJldHVybiByZWdleC50ZXN0KG1haWwpO1xuICAgIH1cblxuXG4gICAgLy8g0J7Rh9C40YHRgtC60LAg0YTQvtGA0LzRi1xuICAgIGZ1bmN0aW9uIGNsZWFyRmllbGRzKCBzZWxlY3RvciApe1xuICAgICAgICAkKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZiggJCh0aGlzKS5hdHRyKCduYW1lJykgIT09ICdmb3JtJyl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS52YWwoJycpO1xuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ3ZhbGlkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLy8g0J/RgNC+0LLQtdGA0LrQsCDQvtGC0LTQtdC70YzQvdC+0LPQviDQv9C+0LvRjyDQvdCwINCy0LDQu9C40LTQvdC+0YHRgtGMXG4gICAgZnVuY3Rpb24gZmllbGRWYWxpZCggaW5wdXQgKSB7XG5cbiAgICAgICAgaWYoIGlucHV0LnZhbCgpICE9PSAnJyApe1xuXG4gICAgICAgICAgICBpZiAoIGlucHV0LmF0dHIoJ3R5cGUnKSA9PT0gJ2VtYWlsJyApe1xuICAgICAgICAgICAgICAgIHJldHVybiBpc0VtYWlsKCBpbnB1dC52YWwoKSApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8vINCU0L7QsdCw0LLQu9C10L3QuNC1INC60LvQsNGB0YHQvtCyINC/0L7Qu9GOINC/0L4g0YDQtdC30YPQu9GM0YLQsNGC0LDQvCDQstCw0LvQuNC00LDRhtC40LhcbiAgICBmdW5jdGlvbiBmaWVsZENoZWNrKCBpbnB1dCApIHtcblxuICAgICAgICB2YXIgcGFyZW50ID0gaW5wdXQucGFyZW50KCk7XG5cbiAgICAgICAgaWYoIGZpZWxkVmFsaWQoIGlucHV0ICkgKXtcbiAgICAgICAgICAgIGlmKCBwYXJlbnQuaGFzQ2xhc3MoJ2Vycm9yJykgKXtcbiAgICAgICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2xhc3MoJ2Vycm9yJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudC5hZGRDbGFzcygndmFsaWQnKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiggcGFyZW50Lmhhc0NsYXNzKCd2YWxpZCcpICl7XG4gICAgICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNsYXNzKCd2YWxpZCcpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQuYWRkQ2xhc3MoJ2Vycm9yJyk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoJy5qc19mb3JtX2lucHV0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZpZWxkQ2hlY2soICQodGhpcykgKTtcbiAgICB9KTtcbiAgICAkKCcuanNfZm9ybV9pbnB1dCcpLm9uKCdmb2N1c291dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZmlsbGluZycpO1xuICAgIH0pO1xuICAgICQoJy5qc19mb3JtX2lucHV0Jykub24oJ2lucHV0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdmaWxsaW5nJyk7XG4gICAgfSk7XG5cblxuICAgIC8vINCf0YDQvtCy0LXRgNC60LAg0L/QvtC70LXQuSDRhNC+0YDQvNGLINC90LAg0L7RgtGB0YPRgtGB0YLQstC40LUg0L/Rg9GB0YLRi9GFINC/0L7Qu9C10Lkg0Lgg0LLQsNC70LjQtNC90L7RgdGC0YxcbiAgICBmdW5jdGlvbiBmaWVsZHNDaGVjayggc2VsZWN0b3IgKXtcbiAgICAgICAgdmFyIGNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB2YXIgZm9jdXMgPSB0cnVlO1xuICAgICAgICAkKHNlbGVjdG9yKS5lYWNoKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGVja2VkID0gZmllbGRDaGVjayggJCh0aGlzKSApICYmIGNoZWNrZWQ7XG4gICAgICAgICAgICBpZiAoIGZvY3VzICYmICFjaGVja2VkICl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIGZvY3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2hlY2tlZDtcbiAgICB9XG5cblxuICAgIC8vINCh0LHQvtGAINC00LDQvdC90YvRhSDRgSDRhNC+0YDQvNGLINC4INGE0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQvtCx0YrQtdC60YLQsFxuICAgIGZ1bmN0aW9uIGFkZEZpZWxkcyggc2VsZWN0b3IsIG9iamVjdCApe1xuXG4gICAgICAgICQoc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgb2JqZWN0WyR0aGlzLmF0dHIoJ25hbWUnKV0gPSAkdGhpcy52YWwoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWpheERhdGFTZW5kKHR5cGUsIHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gJC5hamF4KFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ1gtQ1NSRi1UT0tFTic6ICQoJ21ldGFbbmFtZT1cImNzcmYtdG9rZW5cIl0nKS5hdHRyKCdjb250ZW50JylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICB2YXIgdW5pY2FsLCBzZW5kQnV0dG9uLCBzZWxlY3RvcjtcbiAgICB2YXIgYWN0aXZlID0gdHJ1ZTtcblxuICAgIGZ1bmN0aW9uIGZpbmFsVmFsaWRhdGlvbigpIHtcbiAgICAgICAgaWYoIGFjdGl2ZSApe1xuICAgICAgICAgICAgc2VuZEJ1dHRvbiA9ICQodGhpcyk7XG4gICAgICAgICAgICB1bmljYWwgPSBzZW5kQnV0dG9uLmNsb3Nlc3QoJy5qc19mb3JtX2lkJykuYXR0cignaWQnKTtcbiAgICAgICAgICAgIHNlbGVjdG9yID0gJyMnK3VuaWNhbCsnIC5qc19mb3JtX2lucHV0JztcblxuICAgICAgICAgICAgdmFyIHZhbGlkRm9ybSAgPSBmaWVsZHNDaGVjayggc2VsZWN0b3IgKTtcblxuICAgICAgICAgICAgaWYgKCB2YWxpZEZvcm0gKXtcbiAgICAgICAgICAgICAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZW5kQnV0dG9uLmFkZENsYXNzKCdsb2FkJyk7XG4gICAgICAgICAgICAgICAgc2VuZEZvcm0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoJy5qc19zZW5kX2Zvcm0nKS5vbignY2xpY2snLCBmaW5hbFZhbGlkYXRpb24pO1xuXG5cbiAgICBmdW5jdGlvbiBzZW5kRm9ybSgpIHtcblxuICAgICAgICB2YXIgZGF0YW9iaiA9IHt9O1xuXG4gICAgICAgIGFkZEZpZWxkcyggc2VsZWN0b3IsIGRhdGFvYmogKTtcblxuICAgICAgICB2YXIgcmVzcG9uc2UgPSBhamF4RGF0YVNlbmQoJ1BPU1QnLCAnL2ZlZWRiYWNrL21haWwnLCBkYXRhb2JqKTtcbiAgICAgICAgcmVzcG9uc2Uuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIGlmKCFkYXRhLmVycm9yKXtcbiAgICAgICAgICAgICAgICAkKCcuanNfdGhhbmtfbGluaycpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgY2xlYXJGaWVsZHMoIHNlbGVjdG9yICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZW5kQnV0dG9uLnJlbW92ZUNsYXNzKCdsb2FkJyk7XG4gICAgICAgICAgICBhY3RpdmUgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzcG9uc2UuZXJyb3IoZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIHNlbmRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2xvYWQnKTtcbiAgICAgICAgICAgIGFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pOyIsIiQoZnVuY3Rpb24oKSB7XG4gICAgJCgnLmhlYWRlcl9faGFtYnVyZ2VyJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX2hhbWJ1cmdlcl9pcy1hY3RpdmVfdHJ1ZScpO1xuICAgICAgICAkKCcuaGVhZGVyX19tb2JpbGUnKS50b2dnbGVDbGFzcygnaGVhZGVyX19tb2JpbGVfaXMtc3RhdGVfdHJ1ZScpO1xuICAgICAgICAkKCcubW9iaWxlLW1lbnUnKS50b2dnbGVDbGFzcygnbW9iaWxlLW1lbnVfaXMtYWN0aXZlX3RydWUnKTtcbiAgICB9KTtcbn0pO1xuIiwiJChmdW5jdGlvbiAoKSB7XG4gICAgdmFyICR3aW5kb3cgPSAkKHdpbmRvdyksXG4gICAgICAgIGN1cnJlbnRHYWxsZXJ5ID0ge307XG5cbiAgICAkKFwiLmpzX3Jldmlld3Nfc2xpY2tcIikuc2xpY2soe1xuICAgICAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGRvdHM6IHRydWUvKixcbiAgICAgICAgYWRhcHRpdmVIZWlnaHQ6IHRydWUqL1xuICAgIH0pO1xuXG4gICAgJCgnLnNlbGVjdCcpLnNlbGVjdDIoKTtcblxuXG4gICAgJCgnLmpzX2dvdG9fYW5jaG9yJykuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAkKCdodG1sLCBib2R5Jykuc3RvcCgpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKCQodGhpcykuYXR0cignaHJlZicpKS5vZmZzZXQoKS50b3AgLSAzMFxuICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDw9IDk5Mil7XG4gICAgICAgICAgICAkKCcuaGVhZGVyX19oYW1idXJnZXInKS5yZW1vdmVDbGFzcygnaGVhZGVyX19oYW1idXJnZXJfaXMtYWN0aXZlX3RydWUnKTtcbiAgICAgICAgICAgICQoJy5oZWFkZXJfX21vYmlsZScpLnJlbW92ZUNsYXNzKCdoZWFkZXJfX21vYmlsZV9pcy1zdGF0ZV90cnVlJyk7XG4gICAgICAgICAgICAkKCcubW9iaWxlLW1lbnUnKS5yZW1vdmVDbGFzcygnbW9iaWxlLW1lbnVfaXMtYWN0aXZlX3RydWUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAvLz09PT0g0KTQvtGA0LzQsCBcItCX0LDQv9C40YHQsNGC0YzRgdGPXCJcbiAgICAkKCcuanNfY2FsbF9iYWNrJykubWFnbmlmaWNQb3B1cCh7XG4gICAgICAgIHR5cGU6ICdpbmxpbmUnLFxuICAgICAgICByZW1vdmFsRGVsYXk6IDMwMCxcbiAgICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgICAgICBiZWZvcmVPcGVuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdC5tYWluQ2xhc3MgPSAnbWZwLXpvb20taW4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtaWRDbGljazogdHJ1ZVxuICAgIH0pO1xuXG5cbiAgICAvLz09PT0g0KTQvtGA0LzQsCBcItCS0YHRgtGD0L/Qu9C10L3QuNC1XCJcbiAgICAkKCcuanNfb2ZmZXInKS5tYWduaWZpY1BvcHVwKHtcbiAgICAgICAgdHlwZTogJ2lubGluZScsXG4gICAgICAgIHJlbW92YWxEZWxheTogMzAwLFxuICAgICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgICAgIGJlZm9yZU9wZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0Lm1haW5DbGFzcyA9ICdtZnAtem9vbS1pbic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1pZENsaWNrOiB0cnVlXG4gICAgfSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcuanNfb2ZmZXJfbmFtZScpLnZhbCgkKHRoaXMpLmRhdGEoJ29mZmVyTmFtZScpKTtcbiAgICB9KTtcblxuXG4gICAgJCgnLmpzX29wZW5fZ2FsbGVyeScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY3VycmVudEdhbGxlcnkgPSBnYWxsZXJpZXNbJCh0aGlzKS5kYXRhKCdnYWxsZXJ5SWQnKV07XG5cbiAgICAgICAgJC5tYWduaWZpY1BvcHVwLm9wZW4oe1xuICAgICAgICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgICAgICAgICAgIGl0ZW1zOiBjdXJyZW50R2FsbGVyeSxcbiAgICAgICAgICAgIHRMb2FkaW5nOiAn0JfQsNCz0YDRg9C20LDQtdGC0YHRjyDQuNC30L7QsdGA0LDQttC10L3QuNC1ICMlY3VyciUuLi4nLFxuICAgICAgICAgICAgY2xvc2VCdG5JbnNpZGU6IGZhbHNlLFxuICAgICAgICAgICAgcmVtb3ZhbERlbGF5OiAzMDAsXG4gICAgICAgICAgICBnYWxsZXJ5OiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBuYXZpZ2F0ZUJ5SW1nQ2xpY2s6IHRydWUsXG4gICAgICAgICAgICAgICAgcHJlbG9hZDogWzAsMV0sXG4gICAgICAgICAgICAgICAgdFByZXY6ICfQn9GA0LXQtNGL0LTRg9GJ0LXQtScsXG4gICAgICAgICAgICAgICAgdE5leHQ6ICfQodC70LXQtNGD0Y7RidC10LUnLFxuICAgICAgICAgICAgICAgIHRDb3VudGVyOiAnPHNwYW4gY2xhc3M9XCJtZnAtY291bnRlclwiPiVjdXJyJSDQuNC3ICV0b3RhbCU8L3NwYW4+J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGltYWdlOiB7XG4gICAgICAgICAgICAgICAgdEVycm9yOiAnPGEgaHJlZj1cIiV1cmwlXCI+0JjQt9C+0LHRgNCw0LbQtdC90LjQtSAjJWN1cnIlPC9hPiDQvdC1INGD0LTQsNC10YLRgdGPINC30LDQs9GA0YPQt9C40YLRjC4nLFxuICAgICAgICAgICAgICAgIHRpdGxlU3JjOiAndGl0bGUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgICAgICAgICAgYmVmb3JlT3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGp1c3QgYSBoYWNrIHRoYXQgYWRkcyBtZnAtYW5pbSBjbGFzcyB0byBtYXJrdXBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdC5pbWFnZS5tYXJrdXAgPSB0aGlzLnN0LmltYWdlLm1hcmt1cC5yZXBsYWNlKCdtZnAtZmlndXJlJywgJ21mcC1maWd1cmUgbWZwLXdpdGgtYW5pbScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0LmdhbGxlcnkuYXJyb3dNYXJrdXAgPSB0aGlzLnN0LmdhbGxlcnkuYXJyb3dNYXJrdXAucmVwbGFjZSgnbWZwLWFycm93JywgJ21mcC1hcnJvdyBtZnAtd2l0aC1hbmltJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3QuY2xvc2VNYXJrdXAgPSB0aGlzLnN0LmNsb3NlTWFya3VwLnJlcGxhY2UoJ21mcC1jbG9zZScsICdtZnAtY2xvc2UgbWZwLXdpdGgtYW5pbScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0Lm1haW5DbGFzcyA9ICdtZnAtem9vbS1pbic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuXG4kKGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyICR3aW5kb3cgPSAkKHdpbmRvdyk7XG5cbiAgICAkd2luZG93Lm9uKCdzY3JvbGwnLCByZXZlYWxPblNjcm9sbCk7XG5cbiAgICBmdW5jdGlvbiByZXZlYWxPblNjcm9sbCgpIHtcbiAgICAgICAgdmFyIHZpZXdwb3J0VG9wID0gJHdpbmRvdy5zY3JvbGxUb3AoKSxcbiAgICAgICAgICAgIHZpZXdwb3J0Qm90dG9tID0gdmlld3BvcnRUb3AgKyAkd2luZG93LmhlaWdodCgpO1xuXG4gICAgICAgIC8vIFNob3dlZC4uLlxuICAgICAgICAkKFwiLmpzX3Njcm9sbF9hbmltYXRlOm5vdCguYW5pbWF0ZWQpXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzICAgICA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgdXNlck9mZnNldCA9ICR0aGlzLmRhdGEoJ3ZpZXdwb3J0T2Zmc2V0JyksXG4gICAgICAgICAgICAgICAgd2luX2hlaWdodF9wYWRkZWQgPSAkd2luZG93LmhlaWdodCgpIC8gMTAwICogdXNlck9mZnNldCxcbiAgICAgICAgICAgICAgICBzdGFydEFuaW1hdGlvblRvcCAgID0gdmlld3BvcnRUb3AgKyB3aW5faGVpZ2h0X3BhZGRlZCxcbiAgICAgICAgICAgICAgICBzdGFydEFuaW1hdGlvbkJvdHRvbSA9IHZpZXdwb3J0Qm90dG9tIC0gd2luX2hlaWdodF9wYWRkZWQsXG4gICAgICAgICAgICAgICAgb2Zmc2V0VG9wICAgICAgID0gICR0aGlzLm9mZnNldCgpLnRvcCxcbiAgICAgICAgICAgICAgICBvZmZzZXRCb3R0b20gICAgPSAgb2Zmc2V0VG9wICsgJHRoaXMuaGVpZ2h0KCk7XG5cbiAgICAgICAgICAgIGlmICgoc3RhcnRBbmltYXRpb25Ub3AgPCBvZmZzZXRCb3R0b20pICYmIChzdGFydEFuaW1hdGlvblRvcCA+IG9mZnNldFRvcClcbiAgICAgICAgICAgICAgICB8fCAoc3RhcnRBbmltYXRpb25Cb3R0b20gPiBvZmZzZXRUb3ApICYmIChzdGFydEFuaW1hdGlvbkJvdHRvbSA8IG9mZnNldEJvdHRvbSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoJHRoaXMuZGF0YSgndGltZW91dCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5hZGRDbGFzcygnYW5pbWF0ZWQgJyArICR0aGlzLmRhdGEoJ2FuaW1hdGlvbicpKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgcGFyc2VJbnQoJHRoaXMuZGF0YSgndGltZW91dCcpLDEwKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ2FuaW1hdGVkICcgKyAkdGhpcy5kYXRhKCdhbmltYXRpb24nKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gSGlkZGVuLi4uXG4gICAgICAgIC8qJChcIi5qc19yZXZlYWxPblNjcm9sbC5hbmltYXRlZFwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkdGhpcyAgICAgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIHVzZXJPZmZzZXQgPSAkdGhpcy5kYXRhKCd2aWV3cG9ydE9mZnNldCcpLFxuICAgICAgICAgICAgICAgIHdpbl9oZWlnaHRfcGFkZGVkID0gJHdpbmRvdy5oZWlnaHQoKSAvIDEwMCAqIHVzZXJPZmZzZXQsXG4gICAgICAgICAgICAgICAgb2Zmc2V0VG9wICAgICAgID0gICR0aGlzLm9mZnNldCgpLnRvcCxcbiAgICAgICAgICAgICAgICBvZmZzZXRCb3R0b20gICAgPSAgb2Zmc2V0VG9wICsgJHRoaXMuaGVpZ2h0KCk7XG4gICAgICAgICAgICBpZiAoKHZpZXdwb3J0VG9wIC0gd2luX2hlaWdodF9wYWRkZWQgPiBvZmZzZXRCb3R0b20pXG4gICAgICAgICAgICAgICAgfHwgKHZpZXdwb3J0Qm90dG9tICsgd2luX2hlaWdodF9wYWRkZWQgPCBvZmZzZXRUb3ApKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYW5pbWF0ZWQgJyArICR0aGlzLmRhdGEoJ2FuaW1hdGlvbicpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTsqL1xuICAgIH1cblxuICAgIHJldmVhbE9uU2Nyb2xsKCk7XG59KTsiLCIkKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciAkcGx1cmFsSXRlbSA9ICQoJy5qc19wbHVyYWwnKTtcblxuICAgICRwbHVyYWxJdGVtLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGhpc1BsdXJhbFRleHQgPSAkKHRoaXMpLnRleHQoKSxcbiAgICAgICAgICAgIHRoaXNBcnJUZXh0ID0gdGhpc1BsdXJhbFRleHQuc3BsaXQoJy8nKSxcbiAgICAgICAgICAgIHRoaXNRdWFudGl0eSA9ICt0aGlzQXJyVGV4dFswXSxcbiAgICAgICAgICAgIHRoaXNDb3VudDtcblxuICAgICAgICB0aGlzQXJyVGV4dC5zaGlmdCgpO1xuICAgICAgICBpZiAoKHRoaXNRdWFudGl0eSAlIDEwMCA+PSAxMSAmJiB0aGlzUXVhbnRpdHkgJSAxMDAgPD0gMjApIHx8ICh0aGlzUXVhbnRpdHkgJSAxMCA+PSA1KSl7XG4gICAgICAgICAgICB0aGlzQ291bnQgPSAyO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXNRdWFudGl0eSAlIDEwID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpc0NvdW50ID0gMTtcbiAgICAgICAgfVxuICAgICAgICAkKHRoaXMpLmh0bWwodGhpc1F1YW50aXR5ICsgJyAnICsgdGhpc0FyclRleHRbdGhpc0NvdW50XSk7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH0pO1xufSk7Il19
