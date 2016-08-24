$(document).ready(function() {
    var shiftDelta = 5; //px
    var shiftCadence = 20; //ms
    var logCadence = 500; //ms
    var direction  = 'right';

    var shiftIntervalID = setInterval(shift, shiftCadence);

    var logIntervalID = setInterval(function() {
        var sprite = $('.sprite');
        var sLeft = sprite.css('left');
        var sTop = sprite.css('top');

        logDelta(sLeft, sTop);
    }, logCadence);


    $(document).on('keydown', function(e) {
        if (e.which == 32) {
            console.log('Stopping');
            clearInterval(shiftIntervalID);
            return false; 
        }

        if (e.which == 82) {
            console.log('Refreshing');
            location.reload();
            return false; 
        }

        if (e.which < 37 || e.which > 40) {
            return false; 
        }

        direction = getKeyName(e);
        logKeyPressEvent(e);
    });

    function shift() {
        var sprite = $('.sprite');

        if (direction == 'left') {
            sprite.animate({'left': '-='+shiftDelta}, 0, 'linear');
        } else if (direction == 'up') {
            sprite.animate({'top': '-='+shiftDelta}, 0, 'linear');
        } else if (direction == 'right') {
            sprite.animate({'left': '+='+shiftDelta},0, 'linear');
        } else if (direction == 'down') {
            sprite.animate({'top': '+='+shiftDelta}, 0, 'linear');
        }
    }

    function getKeyName(e) {
        var text = '';

        if (e.which == 37) {
            text = 'left'
        } else if (e.which == 38) {
            text = 'up'
        } else if (e.which == 39) {
            text = 'right'
        } else if (e.which == 40) {
            text = 'down'
        }

        return text;
    }

    function logKeyPressEvent(e) {
        var text = getKeyName(e);

        if (text !== '') {
            text += ' arrow';
            $('.log-left .event').prepend('<p>'+e.which+': '+text+'</p>');
        }
    }

    function logDelta(x, y) {
        $('.log-right .event').prepend('<p>x: '+x+' y: '+y+'</p>');
    }

});
