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
