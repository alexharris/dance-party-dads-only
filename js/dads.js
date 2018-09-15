var currentScene = 'titlescene';

pointCounter = function() {
    pointTotal = 0;
    htmlCounter = $('.point-counter');
    setInterval(function () {
        pointTotal = pointTotal + 10;
        $(htmlCounter).html(pointTotal);
    }, 500);
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

    // for (var i = 0; i < 8; i++) {
    //     setTimeout($('.fireworks').append('<div class="firework"></div>'));
    // }

    $('.firework').each(function(){
        fireworksSize = Math.random() * (100 - 20) + 20;
        this.style.top = (Math.random()*500) + 'px';
        this.style.left = (Math.random()*900) + 'px';
        this.style.opacity = Math.round(Math.random());
        $(this).css('background-size', fireworksSize);
        this.style.width = fireworksSize + 'px';
        this.style.height = fireworksSize + 'px';
    })


}

window.setInterval(function(){
  loadFireworks();
}, 1000);

openingScene = function(event) {
    if(event == 'remove') {
        $('.dance-logo').fadeOut('fast');
        $('.press-space').fadeOut('fast');

    } else {

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
        $('.select-instructions').fadeIn('fast');

    }
}

loadPlayers = function(){

    if(typeof players == "undefined"){

        player1 = s.image('img/dad0.jpg', '33.333%','5%',100,100);

        player2 = s.image('img/dad1.jpg', '66.666%','5%',100,100);

        player3 = s.image('img/dad2.jpg', '99.999%','5%',100,100);

        player4 = s.image('img/dad3.jpg', '133.333%','5%',100,100);


        playerGroup = s.paper.g();
        playerGroup.add(player1, player2, player3, player4);

        playerGroup.attr({class: 'players'});

    } else {
        console.log('players already exist');
    }

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

determineSelectedPlayer = function() {
    console.log($('.current-player').attr( "id" ));
    if ($('.current-player').attr( "id" ) == 'player0') {
        $('#dad0').addClass('active-dad');
    } else if ($('.current-player').attr( "id" ) == 'player1') {
        $('#dad1').addClass('active-dad');
    } else if ($('.current-player').attr( "id" ) == 'player2') {
        $('#dad2').addClass('active-dad');
    } else if ($('.current-player').attr( "id" ) == 'player3') {
        $('#dad3').addClass('active-dad');
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
        pointCounter();
        danceAudio();
}

var loadDancingTimeout;

$(document).keydown(function(e){

    if (e.keyCode==32) {
        openingScene('remove');
        // loadDadsOnly('remove');
        selectPlayerScene('load');
        $('.title-scene').hide();
        titleSongAudio('off');
        currentScene = 'selectscene';
    } else if (e.keyCode==39) {
        rotatePlayers('left');
    } else if (e.keyCode==37) {
        rotatePlayers('right');
    } else if (e.keyCode==13) {
        dadSelectAudio();
        currentScene = 'dancescene';
        loadDancingTimeout = window.setTimeout(switchToDanceScene, 700);
    }
});
