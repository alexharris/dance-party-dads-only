var currentScene = 'titlescene';
var pointTotal;
var finalPoints;

pointCounter = function(event) {
    pointTotal = 0;
    htmlCounter = $('.point-counter');
    if(event == 'gameover') {
        clearInterval(countPoints);
        clearInterval(anxietyInterval);
        $(htmlCounter).html('');
    } else {
        countPoints = setInterval(function () {
            pointTotal = pointTotal + 10;
            $(htmlCounter).html(pointTotal);
            if (pointTotal % 100 === 0  ) {
                writeMessage();
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

// loadDadsOnly = function(event){
//     if (event == 'remove') {
//         dads.remove();
//     } else {
//         dads = Snap("100%", 1000);
//         // loadDadsOnlyTimeout = window.setTimeout(animateDadsOnly, 1000);
//     }
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
    trackAnxiety(0);
    $('.start-message').hide();
    $('.dance-scene .fireworks').show();
    currentlyDancing = true;
    switchDanceMoves();
}

var currentDanceMove = -1;

var thiccMoves = ['dance1Big.gif', 'dance2Big.gif', 'dance3Big.gif'];
var lonelyMoves = ['dance1Lonely.gif', 'dance2Lonely.gif', 'dance3Lonely.gif'];
var coolMoves = ['dance1Cool.gif', 'dance2Cool.gif', 'dance3Cool.gif'];
var doctorMoves = ['dance1Doctor.gif', 'dance2Doctor.gif', 'dance3Doctor.gif'];


switchDanceMoves = function() {
    currentDanceMove = currentDanceMove + 1;
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


var anxietyLevel;

trackAnxiety = function(startingLevel){

    if(startingLevel !== undefined) {
        anxietyLevel = startingLevel;
    }

    anxietyInterval = window.setInterval(function(){
        anxietyLevel = anxietyLevel + .01;
        $('.anxiety-level').css('width', anxietyLevel * 10 + '%');

        if (anxietyLevel > 1) {
          switchToPartysOverScene();
          pointCounter('gameover');
        }

    }, 20);

}

writeMessage = function() {
    messages = [
        '<p>Cool!</p>',
        '<p>Nice moves!</p>',
        '<p>You\'re doing it!</p>',
        '<p>More like Mambo Number 5000!</p>'
    ]
    $('.messages').append(messages[Math.floor(Math.random() * Math.floor(messages.length))]);
    setTimeout(function() { $('.messages').empty() }, 2000);
}

switchToPartysOverScene = function() {
    $('.dance-scene').fadeOut('fast');
    $('.partys-over-scene').fadeIn('fast');
    $('.final-points').text('');
    $('.final-points').append($('.point-counter').text());
    danceAudio('off');
    playAgain();
}



// CONTROLS

var loadDancingTimeout;
var dKeyPressed;

$(document).keydown(function(e){
    if (e.keyCode==32 && currentScene=='titlescene') { //spacebar
        openingScene('remove');
        selectPlayerScene('load');
        titleSongAudio('off');
        currentScene = 'selectscene';
    } else if (e.keyCode==39 && currentScene=='selectscene') { // right arrow
        rotatePlayers('left');
    } else if (e.keyCode==37 && currentScene=='selectscene') { // left arrow
        rotatePlayers('right');
    } else if (e.keyCode==13 && currentScene=='selectscene') { // return key
        dadSelectAudio();
        currentScene = 'dancescene';
        loadDancingTimeout = window.setTimeout(switchToDanceScene, 700);
    } else if (e.keyCode==68 && currentScene=='dancescene') { // D key
        if (dKeyPressed == true) {
            if (anxietyLevel > 0) {
                anxietyLevel = anxietyLevel - 1;
            }
        } else {
            startDancing();
            dKeyPressed = true;
        }
    } else if (e.keyCode==83 && currentScene=='dancescene' && currentlyDancing == true) { // S key
   
        switchDanceMoves();
    }
});
