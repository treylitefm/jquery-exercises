$(document).ready(function() {
    var dateFormat = "mm/dd/yy",
        from = $("#from").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 2,
            minDate: 0
        }).on("change", function() {
            to.datepicker("option", "minDate", getDate(this));
        }),
        to = $("#to").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 2
        }).on("change", function() {
            from.datepicker("option", "maxDate", getDate(this) );
    });

    $('#date-picker').on('submit', function() {
        var from = $('input#from').val();
        var to = $('input#to').val();
        var name = $('input#name').val();
        if (from == "" || to == "" || name == "") {
            alert('Required field missing');
        } else {
            alert('Thanks '+name+'! Your cruise leaves on '+from+' and returns on '+to+'!');
            $(this)[0].reset();
        }
    });

function getDate(element) {
    var date;
    try {
        date = $.datepicker.parseDate(dateFormat, element.value);
    } catch(error) {
        date = null;
    }

    return date;
}
});
