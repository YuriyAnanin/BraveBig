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
