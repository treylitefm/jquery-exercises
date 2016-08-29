$(document).ready(function() {

    var stageMatrix; //set in buildStage; separate from stage0 just in case more stages (stage1, stage2, etc) are added later
    // 0 = border, 1 = pellet, 2 power pellet, 3 ghost, 4 fruit, 5 portal, 6 nothing
    var stage0 = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],

    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,2,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,2,0],
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

    [0,2,1,1,0,0,1,1,1,1,1,1,1,6,6,1,1,1,1,1,1,1,0,0,1,1,2,0],

    [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0],
    [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0],

    [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],

    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],

    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];


    var shiftDelta = 4; //px
    var shiftCadence = 50; //ms
    var logCadence = 500; //ms
    var wakaCadence = 100; //ms
    var powerPelletPulseCadence = 500; //ms
    var direction  = 'right';
    var initialized = false;

    var shiftIntervalID;
    var wakaIntervalID;
    var powerPelletPulseIntervalID;
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
//                $('audio.start')[0].play();
                initialized = true;
               // $('audio.start').on('ended', function() {
                    shiftIntervalID = setInterval(shift, shiftCadence);
                    wakaIntervalID = setInterval(waka, wakaCadence);
                    powerPelletPulseIntervalID = setInterval(powerPelletPulse, powerPelletPulseCadence);
                    //ghostShiftIntervalID = setInterval(ghostShift); //TODO: figure out how tf this is going to work
                    //ghostStepIntervalID = setInterval(ghostStep); //TODO: figure out how tf this is going to work
                    //$('audio.waka0')[0].play();
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

        if (directionReq !== undefined ) { //if passed a new direction and the new direction is able to be moved to, then set old direction to new direction
            move = canMove(sprite, directionReq);
            if (move['canMove']) {
                direction = directionReq;
                rotatePacman(sprite, direction);
            }
        } else {
            move = canMove(sprite, direction);
            if (!move['canMove']) { //if new direction fails, check to see if old direction can be moved to. if cant, return false with no displacement. else continue trucking on
                return false;
            }
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

        if (move['collectPellet'] || move['collectPowerPellet']) {
            collectPellet(move['moveTo'], move['collectPowerPellet']);
        }
    }

    function canMove(el, dir) { //collision
        var center = getCenter(el);
        var matrixPos = getMatrixPos(center);
        var canMove = false;
        var moveTo;

        var x = matrixPos['x'];
        var y = matrixPos['y'];
        var collectPellet = false;
        var collectPowerPellet = false;
        var block;
        
        //debugger; //TODO: duh-lete

        if (dir == 'up') {
            if ((Number.isInteger(x) && !Number.isInteger(y)) || (Number.isInteger(x) && Number.isInteger(y))) {
                y = Math.ceil(y);
                block = getBlockType(stageMatrix[y-1][x]);
                moveTo = {x: x, y: y-1};
            } 
        } else if (dir == 'right') {
            if ((!Number.isInteger(x) && Number.isInteger(y)) || (Number.isInteger(x) && Number.isInteger(y))) {
                x = Math.floor(x);
                block = getBlockType(stageMatrix[y][x+1]);
                moveTo = {x: x+1, y: y};
            }
        } else if (dir == 'down') {
            if ((Number.isInteger(x) && !Number.isInteger(y)) || (Number.isInteger(x) && Number.isInteger(y))) {
                y = Math.floor(y);
                block = getBlockType(stageMatrix[y+1][x]);
                moveTo = {x: x, y: y+1};
            }
        } else if (dir == 'left') {
            if ((!Number.isInteger(x) && Number.isInteger(y)) || (Number.isInteger(x) && Number.isInteger(y))) {
                x = Math.ceil(x);
                block = getBlockType(stageMatrix[y][x-1]);
                moveTo = {x: x-1, y: y};
            }
        }
        
        if (block !== undefined) {
            canMove = block !== 'border';
            collectPellet = block == 'pellet';
            collectPowerPellet = block == 'power-pellet';
        }

        return {
            el: el,
            canMove: canMove,
            center: center,
            direction: dir,
            collectPellet: collectPellet,
            collectPowerPellet: collectPowerPellet,
            moveTo: moveTo
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

    function getBlockType(block) {
        var type;

        if (block == 0) {
            type = 'border'; 
        } else if (block == 1) {
            type = 'pellet';
        } else if (block == 2) {
            type = 'power-pellet';
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
        var block;
        
        for (var i = 0; i < stageToBuild.length; i++) {
            for (var j = 0; j < stageToBuild[i].length; j++) {
                block = getBlockType(stageToBuild[i][j]);
                $('.stage').append('<div class="block block'+i+'-'+j+' '+block+'">block</div>');
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

    function positionGhosts() {

    }

    function collectPellet(point, isPowerPellet) {
        stageMatrix[point['y']][point['x']] = 6;
        var pellet = $('.block'+point['y']+'-'+point['x']);
        pellet.addClass('eaten');

        if (isPowerPellet) {
            pellet.removeClass('power-pellet');
            //activate scared mode
        } else {
        }
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

    function powerPelletPulse() {
        var powerPellets = $('.power-pellet');
        
        if (powerPellets.hasClass('pulse')) {
            powerPellets.removeClass('pulse');
        } else {
            powerPellets.addClass('pulse');
        }
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
