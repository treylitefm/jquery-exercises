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


    var shiftDelta = 8; //px
    var shiftCadence = 50; //ms
    var logCadence = 500; //ms
    var wakaCadence = 100; //ms
    var direction  = 'right';
    var initialized = false;

    var shiftIntervalID;
    var wakaIntervalID;
/*
    var logIntervalID = setInterval(function() {
        var sprite = $('.sprite');
        center = getCenter(sprite);

        logDelta(center['x'], center['y']);
        logCanMove(sprite);
    }, logCadence);

*/
    $(document).on('keydown', function(e) {
        if (e.which == 32) {
            if (!initialized) {
                buildStage(stage0);
                positionPacman();
                positionGhosts();
                $('audio.start')[0].play();
                initialized = true;
               // $('audio.start').on('ended', function() {
                    shiftIntervalID = setInterval(shift, shiftCadence);
                    wakaIntervalID = setInterval(waka, wakaCadence);
                    ghostShiftIntervalID = setInterval(ghostShift); //TODO: figure out how tf this is going to work
                    ghostStepIntervalID = setInterval(ghostStep); //TODO: figure out how tf this is going to work
                    $('audio.waka0')[0].play();
                    /*setTimeout(function() {
                        $('audio.waka1')[0].play();
                    }, 525);*/ //TODO:delete or fix sync between both audio files
               // });
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

        directionReq = getKeyName(e);
        shift(directionReq);
        //logKeyPressEvent(e);
    });

    function shift(directionReq) {
        var sprite = $('.sprite');
        var move;

        if (directionReq !== undefined && canMove(sprite, directionReq)['canMove']) { //if passed a new direction and the new direction is able to be moved to, then set old direction to new direction
            direction = directionReq;
            rotatePacman(sprite, direction);
        } else if (!canMove(sprite, direction)['canMove']) { //if new direction fails, check to see if old direction can be moved to. if cant, return false with no displacement. else continue trucking on
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

    function canMove(el, dir) { //collision
        var center = getCenter(el);
        var matrixPos = getMatrixPos(center);
        var canMove = false;

        var x = matrixPos['x'];
        var y = matrixPos['y'];
        var xPlus; // used for calculating the two blocks on either side of intersection boundary
        var yPlus; // used for calculating the two blocks on either side of intersection boundary
        
        //debugger; //TODO: duh-lete

        if (dir == 'up') {
            if (Number.isInteger(x) && Number.isInteger(y)) {
                canMove = !isBorder(stageMatrix[y-1][x]);
            } else if (Number.isInteger(x) && !Number.isInteger(y)) {
                y = Math.ceil(y);
                canMove = !isBorder(stageMatrix[y-1][x]);
            }
        } else if (dir == 'right') {
            if (Number.isInteger(x) && Number.isInteger(y)) {
                canMove = !isBorder(stageMatrix[y][x+1]);
            } else if (!Number.isInteger(x) && Number.isInteger(y)) {
                x = Math.floor(x);
                canMove = !isBorder(stageMatrix[y][x+1]);
            }
        } else if (dir == 'down') {
            if (Number.isInteger(x) && Number.isInteger(y)) {
                canMove = !isBorder(stageMatrix[y+1][x]);
            } else if (Number.isInteger(x) && !Number.isInteger(y)) {
                y = Math.floor(y);
                canMove = !isBorder(stageMatrix[y+1][x]);
            }
        } else if (dir == 'left') {
            if (Number.isInteger(x) && Number.isInteger(y)) {
                canMove = !isBorder(stageMatrix[y][x-1]);
            } else if (!Number.isInteger(x) && Number.isInteger(y)) {
                x = Math.ceil(x);
                canMove = !isBorder(stageMatrix[y][x-1]);
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
        $('.stage').append('<div class="sprite pacman"><div class="top open semi"></div><div class="bottom open semi"></div></div>');
        var pacman = $('.sprite.pacman');
        var topPos = scaleToGrid(23); //starting row
        var leftPos = scaleToGrid(13.5); //starting col

        pacman.css('top', topPos);
        pacman.css('left', leftPos);
        pacman.css('display', 'block');
    }

    function waka() {
        if ($('.pacman .semi.open').length == 0) {
            $('.pacman .semi').addClass('open');
        } else {
            $('.pacman .semi.open').removeClass('open');
        }
    }

    function rotatePacman(sprite, dir) {
        var rotation;

        if (dir == 'up') {
            rotation = '270'; 
        } else if (dir == 'right') {
            rotation = '0';
        } else if (dir == 'down') {
            rotation = '90';
        } else if (dir == 'left') {
            rotation = '180';
        }

        sprite.css('transform', 'rotate('+rotation+'deg)');
    }

    function turnGhost(ghost, dir) {
        ghost.removeClass('dir-right');
        ghost.removeClass('dir-up');
        ghost.removeClass('dir-down');

        if (dir == 'left') {
            //do nothing, the absence of dir-* implies left
        } else if (dir == 'up') {
            ghost.addClass('dir-up');
        } else if (dir == 'right') {
            ghost.addClass('dir-right');
        } else if (dir == 'down') {
            ghost.addClass('dir-down');
        }
    }

    function ghostStepAndScared() {
        var ghost = $('.ghost');

        if (ghost.hasClass('step')) {
            ghost.removeClass('step');
        } else {
            ghost.addClass('step');
        }

        if (ghost.hasClass('scared')) {
            var mouth0 = $('.sprite.ghost .mouth0');
            var mouth1 = $('.sprite.ghost .mouth1');

            mouth0.removeClass('mouth0');
            mouth0.addClass('mouth1');
            mouth1.removeClass('mouth1');
            mouth1.addClass('mouth0');

        }
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
