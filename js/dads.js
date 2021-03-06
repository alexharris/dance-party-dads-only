var currentScene = 'titlescene';
var pointTotal;
var finalPoints;
var countPointsInterval;
var reasonForLoss;

pointTotal = 0;

pointCounter = function(event) {

    htmlCounter = $('.point-counter');
    if( event == 'gameover' ) {
        clearInterval(countPointsInterval);
        clearInterval(sadnessInterval);
    } else if ( event == 'pause' ) {
        clearInterval(countPointsInterval);
    } else {
        countPointsInterval = setInterval(function () {
            pointTotal = pointTotal + 10;
            $(htmlCounter).html(pointTotal);
            if (pointTotal % 300 === 0) {
                $('.dance-scene .fireworks').show();
            }
            if (pointTotal % 300 === 100) {
                $('.dance-scene .fireworks').hide();
            }
        }, 500);
    }
}

var dads; // generated SVG for dads only animation
// var loadDadsOnlyTimeout; //ID for timeout for loading dads only animation
// var loadDadsOnlyAudioTimeout;
var loadPressSpacebarTimeout;

// animateDadsOnly = function() {
//     $('.dads-only').addClass('dads-only-final');
//     $('.dads-only-final').removeClass('dads-only');
//     loadDadsOnlyTimeout = window.setTimeout(dadsOnlyAudio, 1000);
// }

mainBackground = function() {
    openingScreen = s.rect('0','0','100%','100%');
    openingScreen.attr({
        fill: "#cacaca",
        clippath: "url(#viewport)"
    });
}

loadPressSpacebar = function() {
    $('.press-space').fadeIn('slow');
}

loadFireworks = function() {
    $('.firework').each(function(){
        fireworksSize = Math.random() * (100 - 20) + 20;
        this.style.top = (Math.random()*500) + 'px';
        this.style.left = (Math.random()*900) + 'px';
        this.style.opacity = Math.round(Math.random());
        $(this).css('background-size', fireworksSize);
        this.style.width = fireworksSize + 'px';
        this.style.height = fireworksSize + 'px';
    });
}

window.setInterval(function(){
    loadFireworks();
}, 1000);

openingScene = function(event) {
    if(event == 'remove') {
        $('.dance-logo').fadeOut('fast');
        $('.press-space').fadeOut('fast');
        $('.title-scene').hide();
    } else {
        $('.title-scene').show();
        // loadDadsOnlyTimeout = window.setTimeout(animateDadsOnly, 1500);
        loadPressSpacebarTimeout = window.setTimeout(loadPressSpacebar, 3500);
    }
}

selectPlayerScene = function(event) {
    if(event == 'remove'){
        $('.players').remove();
        $('.select-instructions').fadeOut('fast');
    } else {
        loadPlayers();
        $('.select-player-scene').show();
        $('.select-instructions').fadeIn('fast');
    }
}

loadPlayers = function(){

    // if(typeof players == "undefined"){

        thiccDad = s.image('img/dads/thicc-dad.jpg', '33.333%','5%',100,100);
        lonelyDad = s.image('img/dads/lonely-dad.jpg', '66.666%','5%',100,100);
        coolDad = s.image('img/dads/cool-dad.jpg', '99.999%','5%',100,100);
        doctorDad = s.image('img/dads/doctor-dad.jpg', '133.333%','5%',100,100);

        playerGroup = s.paper.g();
        playerGroup.add(thiccDad, lonelyDad, coolDad, doctorDad);
        playerGroup.attr({class: 'players'});
    // } else {
    //     console.log('players already exist');
    // }
    determineCurrentPlayer();
}

offset = 0;

calculateOffset = function(direction) {

    if(direction == 'left') {
        offset = offset + 100;
    } else if (direction == 'right' && offset <= 400) {
        offset = offset - 100;
    }
    if(offset >= 300){
        offset = 300;
    } else if (offset <= 0) {
        offset = 0;
    }
}

rotatePlayers = function(direction){
    if(direction == 'left') {
        calculateOffset('left');
        playerGroup.attr({transform: 't-' + offset + ',0'});
    } else {
        calculateOffset('right');
        playerGroup.attr({transform: 't-' + offset + ',0'});
    };
    dadScrollAudio();
    determineCurrentPlayer();
}

determineCurrentPlayer = function() {

    players = $('.players').children();

    players.attr("class","not-current");

    currentPlayer = players[offset/100];

    $(currentPlayer).attr("class","current-player");

    $.each(players, function(i, val){
        $(val).attr("id", "player" + i);
    })
}

var currentDancer;

determineSelectedPlayer = function() {
    // remove current dad for replays
    $('.dad').removeClass('active-dad');
    if ($('.current-player').attr( "id" ) == 'player0') {
        $('.dancer').append('<img src="img/dances/stillBig.gif" />');
        currentDancer = 'thicc';
    } else if ($('.current-player').attr( "id" ) == 'player1') {
        $('.dancer').append('<img src="img/dances/stillLonely.gif" />');
        currentDancer = 'lonely';
    } else if ($('.current-player').attr( "id" ) == 'player2') {
        $('.dancer').append('<img src="img/dances/stillCool.gif" />');
        currentDancer = 'cool';
    } else if ($('.current-player').attr( "id" ) == 'player3') {
        $('.dancer').append('<img src="img/dances/stillDoctor.gif" />');
        currentDancer = 'doctor';
    } else {
        console.log('no dad is chosen!')
    }
}

loadStillImage = function() {
    switch (currentDancer) {
      case 'thicc':
        $('.dancer').append('<img src="img/dances/stillBig.gif" />');
        break;
      case 'lonely':
        $('.dancer').append('<img src="img/dances/stillLonely.gif" />');
        break;
      case 'cool':
        $('.dancer').append('<img src="img/dances/stillCool.gif" />');
        break;
      case 'doctor':
        $('.dancer').append('<img src="img/dances/stillDoctor.gif" />');
        break;
      default:
        console.log('no current dancer');
    }
}

var volumeStatus = 'on';

mambo5 = new Audio('audio/mambo5.mp3');

danceAudio = function(status) {
    if(volumeStatus == 'off' || status == 'off') {
        mambo5.volume = 0;
    } else {
        // mambo5.loop = true;
        mambo5.play();
        mambo5.volume = 1;
    }
}

// dadsOnlyChunk = new Audio('audio/dads-only.mp3');

// dadsOnlyAudio = function(status) {
//     if(volumeStatus == 'off' || status == 'off') {
//         dadsOnlyChunk.volume = 0;
//     } else {
//         dadsOnlyChunk.play();
//         dadsOnlyChunk.volume = 0.7;
//     }
// }

dadScrollSound = new Audio('audio/dad-scroll.mp3');

dadScrollAudio = function(status) {
    if(volumeStatus == 'off' || status == 'off') {
        dadScrollSound.volume = 0;
    } else {
        dadScrollSound.play();
        dadScrollSound.volume = 1;
    }
}

dadSelectSound = new Audio('audio/dad-select.mp3');

dadSelectAudio = function(status) {
    if(volumeStatus == 'off' || status == 'off') {
        console.log('volume is off so no dad select sound');
        dadSelectSound.volume = 0;
    } else {
        dadSelectSound.play();
        dadSelectSound.volume = 1;
    }
}

titleSongSound = new Audio('audio/title-song.mp3');

titleSongAudio = function(status) {
    if(volumeStatus == 'off' || status == 'off') {
        titleSongSound.volume = 0;
    } else {
        titleSongSound.play();
        titleSongSound.volume = 0.6;
    }
}

volumeToggle = function() {
    $('.volume-icon').click(function(){

        $(this).toggleClass('volume-off');

        if(volumeStatus !== 'on') {
            volumeStatus = 'on';
            if(currentScene == 'dancescene') {
                danceAudio();
            } else if (currentScene == 'titlescene') {
                titleSongAudio();
            }
        } else {
            volumeStatus = 'off';
            danceAudio('off');
            titleSongAudio('off');
        }
    });
}

playAgain = function() {
    $('.play-again').click(function() {
        var currentScene = 'titlescene';
        $('.partys-over-scene').hide()
        openingScene();
        titleSongAudio();
    });
};



switchToDanceScene = function(){
    determineSelectedPlayer();
    selectPlayerScene('remove');
    $('.select-player-scene').fadeOut('fast');
    $('.dance-scene').fadeIn('fast');
    $('.dance-scene .fireworks').hide();
    $('.messages').append('<p class="start-message blink_me">TAP D TO KEEP DANCING</p>');
}

var currentlyDancing;

startDancing = function() {
    danceAudio();
    pointCounter();
    trackDancing.resume(0);
    $('.start-message').hide();
    setTimeout(function() {
        $('.messages').append('<p class="special-message blink_me">KEEP TAPPING D! YOU\'RE DANCING!</p>');
    }, 5000);
    currentlyDancing = true;
    controlMessages();
    switchDanceMoves('switch');
}

var pausedStatus;

pauseGame = function() {
    if (pausedStatus === 'paused') { // the game is currently paused
        mambo5.play();
        switchDanceMoves('resume');
        pausedStatus = 'unpaused';
        trackDancing.resume();
        $('.messages').empty();
        switch (gameLevel) {
            case 'start':
                sadnessTimer.resume();
                pointCounter();
                break;
            // case 'sadness':
            //     break;
            case 'sadness2':
                trackSadness.resume();
                songsTimer.resume();
                pointCounter();
                break;
            case 'songs':
                trackSadness.resume();
                break;
            case 'songs2':
                pointCounter();
                trackSadness.resume();
            default:
        }

    } else { // the game is currently going
        // pause music
        mambo5.pause()
        //pause points
        pointCounter('pause');
        // pause dancer animation
        switchDanceMoves('pause');
        // set pausedStatus
        pausedStatus = 'paused';
        // stop tracking sadness
        trackSadness.pause();
        // stop tracking dancing
        trackDancing.pause();

        // if there is a songs timeout, pause it
        if(songsTimer !== undefined) {
            songsTimer.pause();
        }

        if(beginSadness == true ) {
            sadnessTimer.pause();
        }

        $('.messages').empty();
        $('.messages').append('PAUSED');
    }
}

var currentDanceMove = -1;

var thiccMoves = ['dance1Big.gif', 'dance2Big.gif', 'dance3Big.gif'];
var lonelyMoves = ['dance1Lonely.gif', 'dance2Lonely.gif', 'dance3Lonely.gif'];
var coolMoves = ['dance1Cool.gif', 'dance2Cool.gif', 'dance3Cool.gif'];
var doctorMoves = ['dance1Doctor.gif', 'dance2Doctor.gif', 'dance3Doctor.gif'];

// cycle through various dance moves
switchDanceMoves = function(event) {
    if ( event == 'pause') {
        $('.dancer').empty();
        loadStillImage();
    } else {
        if( event == 'switch') {
            currentDanceMove = currentDanceMove + 1;
        }
        if (currentDanceMove >= 3) {
            currentDanceMove = 0;
        }
        $('.dancer').empty();
        if(currentDancer == 'thicc'){
            $('.dancer').append('<img src="img/dances/' + thiccMoves[currentDanceMove] + '" />');
        } else  if(currentDancer == 'lonely'){
            $('.dancer').append('<img src="img/dances/' + lonelyMoves[currentDanceMove] + '" />');
        } else  if(currentDancer == 'cool'){
            $('.dancer').append('<img src="img/dances/' + coolMoves[currentDanceMove] + '" />');
        } else  if(currentDancer == 'doctor'){
            $('.dancer').append('<img src="img/dances/' + doctorMoves[currentDanceMove] + '" />');
        }
    }


}

var sadnessLevel;
var sadnessInterval;

// var trackDancing = {

//         pause: function() {
//             clearInterval(dancingLevelInterval);
//         },

var trackSadness = {
    pause: function() {
        console.log('pause sadness');
        clearInterval(sadnessInterval);
    },
    resume: function(event) {
        $('.sadness-tracker').show();
        $('.switch-control').show();
        if(event !== undefined) {
            sadnessLevel = event;
        }

        sadnessInterval = window.setInterval(function(){
            console.log(sadnessLevel);
            sadnessLevel = sadnessLevel + .01;

            $('.sadness-level').css('width', sadnessLevel * 10 + '%');

            if (sadnessLevel > 10) {
              reasonForLoss = "You got bored!";
              switchToPartysOverScene();
              pointCounter('gameover');
              
            }

        }, 20);
    }
}


var songInterval;
trackSongs = function(e) {
    $('.song-tracker').show();
    $('.song-control').show();

    songInterval = window.setInterval(function(){

        if(e == 'pause') {
            // do nothing because paused
        } else {
            songPercentage = (mambo5.currentTime / mambo5.duration) * 100;

            $('.song-level').css('width', songPercentage + '%');

            if (songPercentage > 99) {
                reasonForLoss = "The music ended!";
                switchToPartysOverScene();

                pointCounter('gameover');
                
            }
        }



    }, 20);
}

var dancingLevelLocation;
// var dancingMeterLocation;
// var dancingMeterDirection = 'right';
// var dancingMeterInterval;
var dancingLevelInterval;


var trackDancing = {

        pause: function() {
            clearInterval(dancingLevelInterval);
        },

        resume: function(event) {
            if ( event !== undefined) {
                dancingLevelLocation = event;
            }

            dancingLevelInterval = window.setInterval(function(){

                dancingLevelLocation = dancingLevelLocation + .01;

                $('.dancing-level').css('width', dancingLevelLocation * 10 + '%');

                if (dancingLevelLocation > 10) {
                    $('.dancing-level').css('width', '100%');
                    pointCounter('gameover');
                    reasonForLoss = "You stopped dancing!";
                    switchToPartysOverScene();
                    
                }
            }, 10);
        },

        clear: function() {
            clearInterval(dancingLevelInterval);
        }

        // switch (event) {
        //     case 0:
        //         dancingLevelLocation = event;
        //         break;
        //     case 'clear':
        //         clearInterval(dancingLevelInterval);
        //         break;
        //     default:
        // }



    // if(event !== undefined && event !== 'pause') {
    //     // dancingMeterLocation = startingLevel;
    //     dancingLevelLocation = event;
    // }

    // dancingMeterInterval = window.setInterval(function(){
    //     if (dancingMeterDirection == 'right') {
    //         dancingMeterLocation = dancingMeterLocation + .5;
    //         if (dancingMeterLocation >= 100) {
    //             dancingMeterDirection = 'left'
    //         }
    //     } else {
    //         dancingMeterLocation = dancingMeterLocation - .5;
    //         if (dancingMeterLocation <= 0) {
    //             dancingMeterDirection = 'right'
    //         }
    //     }
    //     $('.dancing-meter').css('left', dancingMeterLocation + '%');
    // }, 10);



    // if(event == 'clear') {
    //     clearInterval(dancingLevelInterval);
    // }

}


gameLevel = 'start';
var sadnessTimer;
var songsTimer;
var beginSadness;

controlMessages = function() {
    switch (gameLevel) {
        case 'start': // initial dancing
            writeMessages();
            // setTimeout(function() {
            //     gameLevel = 'sadness';
            //     controlMessages();
            // }, 10000);
            sadnessTimer = new Timer(function() {
                gameLevel = 'sadness';
                beginSadness = true;
                controlMessages();
            }, 12000);
            break;
        case 'sadness':
            clearInterval(writeMessage);
            pointCounter('pause');
            $('.messages').empty();
            $('.messages').append('<p class="special-message blink_me">You grow bored of this dance. Press N to keep the boredom down. </p>');
            $(document).keydown(function(e){
                if(e.which==78 && currentScene=='dancescene' && currentlyDancing == true && gameLevel == 'sadness') { // press N key
                    gameLevel = 'sadness2';
                    controlMessages();
                    $('.messages').empty();
                }
            });
            $(document).click(function(e){
                if(clickedClass(e) == 'n-button' && currentScene=='dancescene' && currentlyDancing == true && gameLevel == 'sadness') { // press N key
                    gameLevel = 'sadness2';
                    controlMessages();
                    $('.messages').empty();
                }
            });
            break;
        case 'sadness2':
            console.log('entering sadness 2');
            pointCounter();
            writeMessages();
            trackSadness.resume(0);
            setTimeout(function() {
                $('.messages').append('<p class="special-message blink_me">DO NEW MOVES TO KEEP YOUR BOREDOM AT BAY</p>');
            }, 3000);
            songsTimer = new Timer(function() {
                gameLevel = 'songs';
                controlMessages();
            }, 17000);
            break;
        case 'songs':
            console.log('entering songs');
            clearInterval(writeMessage);
            pointCounter('pause');
            $('.messages').empty();
            $('.messages').append('<p class="special-message blink_me">The song is almost over. Restart with R or the party\'s over.</p>');

            $(document).keydown(function(e){
                if(e.which==82 && currentScene=='dancescene' && currentlyDancing == true && gameLevel == 'songs') { // press R key
                    gameLevel = 'songs2';
                    controlMessages();
                }
            });
            $(document).click(function(e){
                if(clickedClass(e) == 'r-button' && currentScene=='dancescene' && currentlyDancing == true && gameLevel == 'songs') { // press R key
                    gameLevel = 'songs2';
                    controlMessages();
                }
            });
            break;
        case 'songs2':
            console.log('entering songs2')
            pointCounter();
            writeMessages();
            // trackSadness.resume();
            trackSongs();
            break;
        default:
            console.log('no game level');
    }
}

// Randomly pick a message from the array and publish in the message area
writeMessages = function() {
    messages = [
        '<p>Cool!</p>',
        '<p>Nice moves!</p>',
        '<p>You\'re doing it!</p>',
        '<p>More like Mambo Number 5000!</p>',
        '<p>Feel the mambo rhythm!</p>',
        '<p>You are the #1 dance daddy.</p>',
        '<p>You are the master of your fate. You are the Dancing Dad.</p>',
        '<p>All other dads bow down to you.</p>',
        '<p>Nice moves, dad!</p>',
        '<p>Get loose, pops!</p>',
        '<p>You’re doing it, sir!</p>',
        '<p>Keep going, poppie!</p>',
        '<p>I believe in you, papa!</p>',
        '<p>Prove the haters wrong!</p>',
        '<p>Don\'t listen to your detractors. Just dance.</p>',
        '<p>The journey is dancing. The destination is dance. </p>',
        '<p>I love you, dad.</p>',
        '<p>I love my dad.</p>',
        '<p>All we ask is that you do your best, dad.</p>',
        '<p>Remember high school? God, time goes by so fast.</p>',
        '<p>If you stop, something bad will happen.</p>',
        '<p>“Some dance to remember, some dance to forget.” - The Eagles (all dads)</p>',
        '<p>Dance is the language of the heart. </p>',
        '<p>Dance like nobody\'s watching and earning points for every second you continue.</p>',
        '<p>“Yeah, I wanna dance with somebody / With somebody who loves me (my dad)” - Whitney Houston</p>',
        '<p>Dance dance dance, etc.</p>',
        '<p>When words will not suffice, there is always dance.</p>',
        '<p>Let the rhythm take over.</p>',
        '<p>Give yourself to the music.</p>'
    ]

    writeMessage = setInterval(function () {
        $('.messages').empty();
        $('.messages').append(messages[Math.floor(Math.random() * Math.floor(messages.length))]);
    }, 8000);
}

switchToPartysOverScene = function() {
    $('.dance-scene').fadeOut('fast');
    $('.partys-over-scene').fadeIn('fast');
    clearInterval(writeMessage);
    $('.final-points').text('');
    $('.final-points').append($('.point-counter').text());
    $('.reason-for-loss').prepend(reasonForLoss);
    currentScene = 'partysoverscene';
    $('.sadness-level').css('width', '100%');
    $('.song-level').css('width', '100%');
    $('.dancing-level').css('width', '100%');
    trackSadness.pause();
    clearInterval(songInterval);
    trackDancing.clear();
    danceAudio('off');
    console.log(reasonForLoss);
    playAgain();
    $('.messages').empty();
}

// CONTROLS

var loadDancingTimeout;
var sKeyPressed;
var dKeyPressed;

$(document).keydown(function(e){
    if (e.which==32 && currentScene=='titlescene') { //spacebar
        openingScene('remove');
        selectPlayerScene('load');
        titleSongAudio('off');
        currentScene = 'selectscene';
    } else if (e.which==39 && currentScene=='selectscene') { // right arrow
        rotatePlayers('left');
    } else if (e.which==37 && currentScene=='selectscene') { // left arrow
        rotatePlayers('right');
    } else if (e.which==32 && currentScene=='selectscene') { // space bar
        dadSelectAudio();
        currentScene = 'dancescene';
        loadDancingTimeout = window.setTimeout(switchToDanceScene, 700);
    } else if (e.which==68 && currentScene=='dancescene' && pausedStatus !== 'paused') { // D key
        if (dKeyPressed == true) {
            if (dancingLevelLocation >= 0) {
                dancingLevelLocation = dancingLevelLocation - 1;    
            }
        } else {
            startDancing();
            dKeyPressed = true;
        }
    } else if (e.which==78 && currentScene=='dancescene' && currentlyDancing == true && pausedStatus !== 'paused') { // N key
        switchDanceMoves('switch');
        sadnessLevel = 0;
    } else if (e.which==82 && currentScene=='dancescene') { // R key
        mambo5.currentTime = 0;
        danceAudio();
    } else if (e.which==80 && currentScene=='dancescene' && currentlyDancing == true) { // P key
        pauseGame();
    }
    else if (e.which==32 && currentScene=='partysoverscene') { // space bar
        location.reload();
    }
});

var clickedClass = function(e) {
    return e.target.className;
}


$(document).on('touchstart', function(e){

    if (clickedClass(e) == 'space-bar' && currentScene=='titlescene') { //spacebar
        openingScene('remove');
        selectPlayerScene('load');
        titleSongAudio('off');
        currentScene = 'selectscene';
    } else if (clickedClass(e) == 'right-arrow' && currentScene=='selectscene') { // right arrow
        rotatePlayers('left');
    } else if (clickedClass(e) == 'left-arrow' && currentScene=='selectscene') { // left arrow
        rotatePlayers('right');
    } else if (clickedClass(e) == 'space-bar' && currentScene=='selectscene') { // space bar
        dadSelectAudio();
        currentScene = 'dancescene';
        loadDancingTimeout = window.setTimeout(switchToDanceScene, 700);
    } else if (clickedClass(e) == 'd-button' && currentScene=='dancescene' && pausedStatus !== 'paused') { // D key
        if (dKeyPressed == true) {
            if (dancingLevelLocation >= 0) {
                dancingLevelLocation = dancingLevelLocation - 1;    
            }
        } else {
            startDancing();
            dKeyPressed = true;
        }
    } else if (clickedClass(e) == 'n-button' && currentScene=='dancescene' && currentlyDancing == true && pausedStatus !== 'paused') { // N key
        switchDanceMoves('switch');
        sadnessLevel = 0;
    } else if (clickedClass(e) == 'r-button' && currentScene=='dancescene') { // R key
        mambo5.currentTime = 0;
        danceAudio();
    } else if (clickedClass(e) == 'p-button' && currentScene=='dancescene' && currentlyDancing==true) { // P key
        pauseGame();
    }
    else if (clickedClass(e) == 'space-bar' && currentScene=='partysoverscene') { // space bar
        location.reload();
    }
});



function Timer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    this.resume = function() {
        start = new Date();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
}

var lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  var now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

$(document).ready(function(){
    s = Snap.select(".gameplay");
    openingScene();
    titleSongAudio();
    volumeToggle();
});
