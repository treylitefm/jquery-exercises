$(document).ready(function() {

    var stageMatrix; //set in buildStage; separate from stage0 just in case more stages (stage1, stage2, etc) are added later
    // 0 = border, 1 = pellet, 2 super pellet, 3 ghost, 4 fruit, 5 portal, 6 nothing
    var stage0 = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],

    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],

    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],

    [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],

    [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],

    [0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,6,6,6,6,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,6,6,6,6,0],
    [0,6,6,6,6,0,1,0,0,6,6,6,6,6,6,6,6,6,6,0,0,1,0,6,6,6,6,0],
    [0,6,6,6,6,0,1,0,0,6,0,0,0,0,0,0,0,0,6,0,0,1,0,6,6,6,6,0],
    [0,0,0,0,0,0,1,0,0,6,0,6,6,6,6,6,6,0,6,0,0,1,0,0,0,0,0,0],

    [5,6,6,6,6,6,1,6,6,6,0,6,6,6,6,6,6,0,6,6,6,1,6,6,6,6,6,5], // Center row with teleport

    [0,0,0,0,0,0,1,0,0,6,0,6,6,6,6,6,6,0,6,0,0,1,0,0,0,0,0,0],
    [0,6,6,6,6,0,1,0,0,6,0,0,0,0,0,0,0,0,6,0,0,1,0,6,6,6,6,0],
    [0,6,6,6,6,0,1,0,0,6,6,6,6,6,6,6,6,6,6,0,0,1,0,6,6,6,6,0],
    [0,6,6,6,6,0,1,0,0,6,0,0,0,0,0,0,0,0,6,0,0,1,0,6,6,6,6,0],
    [0,0,0,0,0,0,1,0,0,6,0,0,0,0,0,0,0,0,6,0,0,1,0,0,0,0,0,0],

    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],

    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],

    [0,1,1,1,0,0,1,1,1,1,1,1,1,6,6,1,1,1,1,1,1,1,0,0,1,1,1,0],

    [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0],
    [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0],

    [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],

    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],

    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];


    var shiftDelta = 4; //px
    var shiftCadence = 20; //ms
    var logCadence = 500; //ms
    var direction  = 'up'; //'right';
    var initialized = false;

    var shiftIntervalID;

    var logIntervalID = setInterval(function() {
        var sprite = $('.sprite');
        center = getCenter(sprite);

        logDelta(center['x'], center['y']);
    }, logCadence);


    $(document).on('keydown', function(e) {
        if (e.which == 32) {
            if (!initialized) {
                shiftIntervalID = setInterval(shift, shiftCadence);
                buildStage(stage0);
                positionPacman();
                initialized = true;
            } else {
                console.log('Stopping');
                clearInterval(shiftIntervalID);
                logCanMove($('.pacman'));
            }
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
        if (direction === 'left') {
            debugger;
        }
        var move = canMove(sprite, direction);

        if (!move['canMove']) {
            return false;
        }

        if (direction == 'left') {
            sprite.animate({'left': '-='+shiftDelta}, 0, 'linear');
        } else if (direction == 'up') {
            sprite.animate({'top': '-='+shiftDelta}, 0, 'linear');
        } else if (direction == 'right') {
            sprite.animate({'left': '+='+shiftDelta},0, 'linear');
        } else if (direction == 'down') {
            sprite.animate({'top': '+='+shiftDelta}, 0, 'linear');
        }

        collide(direction);
    }

    function canMove(el, dir) {
        var center = getCenter(el);
        var matrixPos = getMatrixPos(center);
        var canMove = false;

        var x = matrixPos['x'];
        var y = matrixPos['y'];
        var xPlus;
        var yPlus;

        if (!Number.isInteger(x) && (dir == 'up' || dir == 'down')) {
           x = Math.floor(x);
           xPlus = x+1;
        }
        if (!Number.isInteger(y) && (dir == 'left' || dir == 'right')) {
           y = Math.floor(y);
           yPlus = y+1;
        }

        if (dir == 'up') {
            if (xPlus === undefined) {
                canMove = !isBorder(stageMatrix[y-1][x]);
            } else {
                canMove = !(isBorder(stageMatrix[y-1][x]) && isBorder(stageMatrix[y-1][xPlus])); 
            }
        } else if (dir == 'right') {
            if (yPlus === undefined) {
                canMove = isBorder(stageMatrix[y][x+1]);
            } else {
                canMove = !(isBorder(stageMatrix[y][x+1]) && isBorder(stageMatrix[yPlus][x+1])); 
            }
        } else if (dir == 'down') {
            if (xPlus === undefined) {
                canMove = isBorder(stageMatrix[y+1][x]);
            } else {
                canMove = !(isBorder(stageMatrix[y+1][x]) && isBorder(stageMatrix[y+1][xPlus])); 
            }
        } else if (dir == 'left') {
            if (yPlus === undefined) {
                canMove = isBorder(stageMatrix[y][x-1]);
            } else {
                canMove = !(isBorder(stageMatrix[y][x-1]) && isBorder(stageMatrix[yPlus][x-1])); 
            }
        }

        return {
            el: el,
            canMove: canMove,
            center: center,
            direction: dir
        }
    }

    function collide(dir) {
        //check for collision in desired direction
        return true;
    }

    function getCenter(el) {
        var position = el.position();
        var centerY = (position['top']+position['top']+el.height())/2;
        var centerX = (position['left']+position['left']+el.width())/2;

        return {y: centerY, x: centerX};
    }

    window.getCenter = getCenter;

    function getMatrixPos(center) {
       var col = (center['x']-8)/16;
       var row = (center['y']-8)/16;

       return { y: row, x: col }
    }

    function isBorder(i) {
        return i === 0;
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

    function buildStage(stageToBuild) {
        function getBlockType(block) {
            var type;

            if (block == 0) {
               type = 'border'; 
            } else if (block == 1) {
                type = 'pellet';
            } else if (block == 2) {
                type = 'super-pellet';
            } else if (block == 3) {
                type = 'ghost';
            } else if (block == 4) {
                type = 'fruit';
            } else if (block == 5) {
                type = 'portal';
            } else if (block == 6) {
                type = 'empty'
            }

            return type;
        }

        var block;
        
        for (var i = 0; i < stageToBuild.length; i++) {
            for (var j = 0; j < stageToBuild[i].length; j++) {
                block = getBlockType(stageToBuild[i][j]);
                $('.stage').append('<div class="block '+block+'">block</div>');
            }
        }

        stageMatrix = stageToBuild; //stageMatrix = canonical matrix
    }

    function positionPacman() {
        var pacman = $('.sprite.pacman');
        var topPos = scaleToGrid(22.5); //starting row
        var leftPos = scaleToGrid(13); //starting col

        pacman.css('top', topPos);
        pacman.css('left', leftPos);
        pacman.css('display', 'block');
    }

    function scaleToGrid(n) {
        return n*16;
    }

    function logKeyPressEvent(e) {
        var text = getKeyName(e);

        if (text !== '') {
            text += ' arrow';
            $('.log-left.top .event').prepend('<p>'+e.which+': '+text+'</p>');
        }
    }

    function logDelta(x, y) {
        $('.log-right .event').prepend('<p>x: '+x+' y: '+y+'</p>');
    }
    
    function logCanMove(el) {
        var moveUp = canMove(el, 'up')['canMove'];
        var moveRight = canMove(el, 'right')['canMove'];
        var moveDown = canMove(el, 'down')['canMove'];
        var moveLeft = canMove(el, 'left')['canMove'];
        $('.log-left.bottom .event').prepend('<p>'+moveUp+' '+moveRight+' '+moveDown+' '+moveLeft+'</p>');
    }
});
