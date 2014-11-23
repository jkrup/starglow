var down = false;
var ready = true;
var throttleSpeed = 100; //milliseconds

var prevX = 0;
var prevY = 0;

//Backgrounds {
var backgrounds = [
  "/assets/backgrounds/background-1-farm.jpg"
];
//}



//SOUNDS {
var backgroundMusicURL = "/assets/sounds/glowstar-soundtrak-2.wav"
var starPlacedSFXUFL = "/assets/sounds/twinkle.wav"
var backgroundMusic = new Howl({
  urls: [backgroundMusicURL],
  loop: true
})
var starPlacedSFX = new Howl({
  urls: [starPlacedSFXUFL],
  loop: true
});
var starPlacedSFXFade = new Howl({
  urls: [starPlacedSFXUFL],
  loop: true
})
//}

var distanceSquared = function(x1,x2,y1,y2) {
  return ((x1 - x2)*(x1 - x2)+((y1 - y2) *(y1 - y2)));
}

$(function() {
  backgroundMusic.play();
  $("#background").css('background', "url('" +backgrounds[0]+"')");
  $("#background").css('background-size', "100% 100%");
});

var placeStar = function(x,y) {
  //newStar = $("<div class='stamp'></div>").appendTo("#background").css('top', y).css('left', x);
  newStar = $("<img class='stamp' src='/assets/stars/gold-burst-star.png' />").appendTo("#background").css('top', y).css('left', x);
  newStar.animate({
    width: '60px',
    height: '60px',
    top: '-=12px',
    left: '-=12px'
  }, 200, function() {
    $(this).animate({
    width: '40px',
    height: '40px',
    top: '+=12px',
    left: '+=12px'
    }, 200)
  });
};

Template.game.events({
  'touchend.fingers': function(evt) {
    down = false;
    starPlacedSFX.stop();
    pos = starPlacedSFX.pos
    starPlacedSFXFade.pos(pos)
    starPlacedSFXFade.play();
    starPlacedSFXFade.fadeOut(0, 1000, function() {
      starPlacedSFXFade.stop();
      starPlacedSFXFade.volume(1);
    });
  },
  'touchstart.fingers': function(evt) {
    down = true;
    starPlacedSFX.stop();
    starPlacedSFX.volume(1);
    starPlacedSFX.play();

    //loop sound
    evt.preventDefault();
    //coords of click
    evt = evt.originalEvent.touches[0];
    var x = evt.pageX - $('#background').offset().left;
    var y = evt.pageY - $('#background').offset().top;
    if(distanceSquared(prevX, x, prevY, y) > 2000 ) {

      placeStar(x,y)
      prevX = x;
      prevY = y;
    }
  },
  'touchmove.fingers #background': function(evt) {
    evt.preventDefault();
    if(down) {
 
      //coords of click
      evt = evt.originalEvent.touches[0];
      var x = evt.pageX - $('#background').offset().left;
      var y = evt.pageY - $('#background').offset().top;
      //console.log(x,y)

      //birthStar
      

      if(distanceSquared(prevX, x, prevY, y) > 2000 ) {

        placeStar(x,y)
        prevX = x;
        prevY = y;
      }

    }
  }
})
