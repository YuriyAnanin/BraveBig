$(function() {
    $('.b-header__hamburger').click(function () {
        $(this).toggleClass('b-header__hamburger_is-active_true');
        $('.b-header__mobile').toggleClass('b-header__mobile_is-state_true');
        $('.b-mobile-menu').toggleClass('b-mobile-menu_is-active_true');
    });
});
