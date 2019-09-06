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
