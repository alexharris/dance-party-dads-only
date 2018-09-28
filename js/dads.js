var currentScene = 'titlescene';
var pointTotal;
var finalPoints;

pointTotal = 0;

pointCounter = function(event) {

    htmlCounter = $('.point-counter');
    if( event == 'gameover' ) {
        clearInterval(countPoints);
        clearInterval(sadnessInterval);
    } else if ( event == 'pause' ) {
        clearInterval(countPoints);
    } else {
        countPoints = setInterval(function () {
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
var loadDadsOnlyTimeout; //ID for timeout for loading dads only animation
var loadDadsOnlyAudioTimeout;
var loadPressSpacebarTimeout;

animateDadsOnly = function() {
    $('.dads-only').addClass('dads-only-final');
    $('.dads-only-final').removeClass('dads-only');
    loadDadsOnlyTimeout = window.setTimeout(dadsOnlyAudio, 1000);
}

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
        loadDadsOnlyTimeout = window.setTimeout(animateDadsOnly, 1500);
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
        console.log('volume is off so no mambo 5');
        mambo5.volume = 0;
    } else {
        mambo5.loop = true;
        mambo5.play();
        mambo5.volume = 1;
    }
}

dadsOnlyChunk = new Audio('audio/dads-only.mp3');

dadsOnlyAudio = function(status) {
    if(volumeStatus == 'off' || status == 'off') {
        console.log('volume is off so no dads-only chunk');
        dadsOnlyChunk.volume = 0;
    } else {
        dadsOnlyChunk.play();
        dadsOnlyChunk.volume = 0.7;
    }
}

dadScrollSound = new Audio('audio/dad-scroll.mp3');

dadScrollAudio = function(status) {
    if(volumeStatus == 'off' || status == 'off') {
        console.log('volume is off so no dad scroll sound');
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
        console.log('volume is off so no title song');
        titleSongSound.volume = 0;
    } else {
        titleSongSound.play();
        titleSongSound.volume = 0.3;
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

$(document).ready(function(){
    s = Snap.select(".gameplay");
    openingScene();
    titleSongAudio();
    volumeToggle();
});

switchToDanceScene = function(){
    determineSelectedPlayer();
    selectPlayerScene('remove');
    $('.select-player-scene').fadeOut('fast');
    $('.dance-scene').fadeIn('fast');
    $('.dance-scene .fireworks').hide();
}

var currentlyDancing;

startDancing = function() {
    danceAudio();
    pointCounter();
    trackDancing(0);
    $('.start-message').hide();
    currentlyDancing = true;
    controlMessages();
    switchDanceMoves('switch');
}

var pausedStatus;

pauseGame = function() {
    if (pausedStatus === 'paused') { // the game is currently paused
        mambo5.play();
        pointCounter();
        switchDanceMoves('resume');
        pausedStatus = 'unpaused';
    } else { // the game is currently going
        mambo5.pause()
        pointCounter('pause');
        switchDanceMoves('pause');
        pausedStatus = 'paused';
    }
}

var currentDanceMove = -1;

var thiccMoves = ['dance1Big.gif', 'dance2Big.gif', 'dance3Big.gif'];
var lonelyMoves = ['dance1Lonely.gif', 'dance2Lonely.gif', 'dance3Lonely.gif'];
var coolMoves = ['dance1Cool.gif', 'dance2Cool.gif', 'dance3Cool.gif'];
var doctorMoves = ['dance1Doctor.gif', 'dance2Doctor.gif', 'dance3Doctor.gif'];

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

trackSadness = function(startingLevel){
    $('.sadness-tracker').show();
    $('.switch-control').show();
    if(startingLevel !== undefined) {
        sadnessLevel = startingLevel;
    }

    sadnessInterval = window.setInterval(function(){
        sadnessLevel = sadnessLevel + .01;

        $('.sadness-level').css('width', sadnessLevel * 10 + '%');

        if (sadnessLevel > 10) {

          switchToPartysOverScene();

          pointCounter('gameover');
          $('.sadness-level').css('width', '100%');
        }
    }, 20);
}

var dancingLevelLocation;
var dancingMeterLocation;
var dancingMeterDirection = 'right';

trackDancing = function(startingLevel){

    if(startingLevel !== undefined) {
        dancingMeterLocation = startingLevel;
        dancingLevelLocation = startingLevel;
    }

    dancingMeterInterval = window.setInterval(function(){
        if (dancingMeterDirection == 'right') {
            dancingMeterLocation = dancingMeterLocation + .5;
            if (dancingMeterLocation >= 100) {
                dancingMeterDirection = 'left'
            }
        } else {
            dancingMeterLocation = dancingMeterLocation - .5;
            if (dancingMeterLocation <= 0) {
                dancingMeterDirection = 'right'
            }
        }
        $('.dancing-meter').css('left', dancingMeterLocation + '%');
    }, 10);

    dancingLevelInterval = window.setInterval(function(){
        dancingLevelLocation = dancingLevelLocation + .01;
        $('.dancing-level').css('width', dancingLevelLocation * 10 + '%');

        if (dancingLevelLocation > 10) {
            $('.dancing-level').css('width', '100%');
            pointCounter('gameover');
            switchToPartysOverScene();


        }

    }, 10);

}

gameLevel = 'start';

controlMessages = function() {
    switch (gameLevel) {
        case 'start': // initial dancing
            writeMessages();
            setTimeout(function() {
                gameLevel = 'sadness';
                controlMessages();
            }, 10000);
            break;
        case 'sadness':
            console.log('we in sadness');
            clearInterval(writeMessage);
            pointCounter('pause');
            $('.messages').empty() ;
            $('.messages').append('<p class="special-message">You grow bored of this dance. Press S to switch moves. Then keep tapping D. </p>');
            $(document).keydown(function(e){
                if(e.which==83 && currentScene=='dancescene' && currentlyDancing == true && gameLevel == 'sadness') { // press S key
                    gameLevel = 'music';
                    controlMessages();
                }
            });
            break;
        case 'music':
            console.log('we in music');
            pointCounter();
            writeMessages();
            trackSadness(0);
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
        '<p>Feel the mambo rhythm!</p>'
    ]

    writeMessage = setInterval(function () {
        $('.messages').empty();
        $('.messages').append(messages[Math.floor(Math.random() * Math.floor(messages.length))]);
    }, 5000);
}

switchToPartysOverScene = function() {
    $('.dance-scene').fadeOut('fast');
    $('.partys-over-scene').fadeIn('fast');
    clearInterval(writeMessage);
    $('.final-points').text('');
    $('.final-points').append($('.point-counter').text());
    currentScene = 'partysoverscene';
    danceAudio('off');
    playAgain();
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
    } else if (e.which==68 && currentScene=='dancescene') { // D key
        if (dKeyPressed == true) {
            if (dancingMeterLocation > 80 || dancingMeterLocation < 20) {
                dancingLevelLocation = dancingLevelLocation + 1;
            } else {
                dancingLevelLocation = dancingLevelLocation - 1;
            }
        } else {
            startDancing();
            dKeyPressed = true;
        }
    } else if (e.which==83 && currentScene=='dancescene' && currentlyDancing == true) { // S key
        switchDanceMoves('switch');
        if (sadnessLevel > 0) {
            sadnessLevel = sadnessLevel - 1;
        }

    } else if (e.which==80 && currentScene=='dancescene') { // P key
        pauseGame();
    }
    else if (e.which==32 && currentScene=='partysoverscene') { // space bar
        location.reload();
    }
});
