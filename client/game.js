Gamespace.starSize = 50;

Template.game.rendered = function() {
  game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO,'', {preload: preload, create: create, update: update, render: function() {}});

  game.starsLayer = null;

  game.downState = false;
  game.prevX = 0;
  game.prevY = 0;

  //var starsLayer = null;

  function preload() {
    Session.set("star", "star1");
    Session.set("level", "1");
    //TODO: replace with sprite sheet of stars
    game.load.image('star1', 'assets/stars/gold-burst-star.png');
    game.load.image('star2', 'assets/stars/blue-outline-star.png');
    game.load.image('star3', 'assets/stars/gold-round-star.png');
    game.load.image('star4', 'assets/stars/green-star.png');
    game.load.image('reset', 'assets/navigation/reset.png');

    game.load.image('background1', 'assets/scenes/1/background@2x.png');
    game.load.image('foreground1', 'assets/scenes/1/foreground@2x.png');
    game.load.image('background2', 'assets/scenes/2/background@2x.png');
    game.load.image('foreground2', 'assets/scenes/2/foreground@2x.png');
  }

  function create() {

    function resetLevel() {
      game.starsLayer.forEach(function(star) {
        //Fly star out in random direction
        
        //game.add.tween(star).to( { angle: 45 }, 500, Phaser.Easing.Linear.None, true,0,-1, true);
        //game.add.tween(star).to( { width: (Gamespace.starSize * 0.9), height: (Gamespace.starSize * 0.9)  }, 400, Phaser.Easing.Linear.None, true,0,-1, true);
      })
      Session.set("level", "2")
    };

    function changeStar(star) {
      Session.set("star", star)
    };


    // Background & Foreground & starslayer {

      // Background Layer
      var backgroundLayer = game.add.group();

      // Stars Layer
      game.starsLayer = game.add.group();

      // Foreground Layer
      var foregroundLayer = game.add.group();

      // Add background and foreground images & set height
      var background = game.add.sprite(0, 0, 'background1');
      var foreground = game.add.sprite(0, 0, 'foreground1');
      background.height = foreground.height = game.height;
      background.width = foreground.width =  game.width;
      backgroundLayer.add(background);
      foregroundLayer.add(foreground);

      // Events (touch for stars)
      background.inputEnabled = true;
      background.input.priorityID = 0; // lower priority
      background.events.onInputDown.add(pressedDown);
      background.events.onInputUp.add(releasedDown);

    // }

    // Menu Bar {
      // Menubar Layer
      var menuBarLayer = game.add.group();

      // Menubar background

      // First button
      var button1 = game.add.button(0,0, 'star1', changeStar('star1'));
      button1.height = button1.width = Gamespace.starSize;

      // second Button
      var button2 = game.add.button(100,0, 'star2', changeStar('star2'));
      button2.height = button2.width = Gamespace.starSize;

      // third Button
      var button3 = game.add.button(200,0, 'star3', changeStar('star3'));
      button3.height = button3.width = Gamespace.starSize;

      // fourth Button
      var button4 = game.add.button(300,0, 'star4', changeStar('star4'));
      button4.height = button4.width = Gamespace.starSize;

      var resetButton = game.add.button(400, 0, 'reset', resetLevel);
      resetButton.height = resetButton.width = Gamespace.starSize;

      //Add to layer
      menuBarLayer.add(button1);
      menuBarLayer.add(button2);
      menuBarLayer.add(button3);
      menuBarLayer.add(button4);

    // }

  }


  function update() {
    // Finger down, but not pressing button
    if (game.downState) {
      var e = game.input.pointer1

      //Audio...

      //starPlacedSFX.stop();
      //starPlacedSFX.volume(0.5);
      //starPlacedSFX.play();

      //loop sound
      //evt.preventDefault();
      //coords of click
      //evt = evt.originalEvent.touches[0];

      var x = e.clientX;
      var y = e.clientY;

      if(Gamespace.utils.distanceSquared(game.prevX, x, game.prevY, y) > 2000 ) {
        placeStar(x, y)
        game.prevX = x;
        game.prevY = y;
      }


    }
  }

  function placeStar(x,y) {
      var star = game.add.sprite(x, y, Session.get("star"));
      star.anchor = new Phaser.Point(0.5, 0.5);
      star.height = Gamespace.starSize;
      star.width = Gamespace.starSize;
      game.starsLayer.add(star);

      game.add.tween(star).to( { angle: 45 }, 500, Phaser.Easing.Linear.None, true,0,-1, true);
      game.add.tween(star).to( { width: (Gamespace.starSize * 0.9), height: (Gamespace.starSize * 0.9)  }, 400, Phaser.Easing.Linear.None, true,0,-1, true);
  }

  function pressedDown(e) {
    game.downState = true;
  }

  function releasedDown(e) {
    game.downState = false;
  }

}


/*

// App globals {
//scenery {
backgrounds = [
  "/assets/scenes/1/background@2x.png",
  "/assets/scenes/2/background@2x.png",
  "/assets/scenes/3/background@2x.png",
  "/assets/scenes/4/background@2x.png",
  "/assets/scenes/5/background@2x.png",
  "/assets/scenes/6/background@2x.png",
];
foregrounds = [
  "/assets/scenes/1/foreground@2x.png",
  "/assets/scenes/2/foreground@2x.png",
  "/assets/scenes/3/foreground@2x.png",
  "/assets/scenes/4/foreground@2x.png",
  "/assets/scenes/5/foreground@2x.png",
  "/assets/scenes/6/foreground@2x.png",
]
//}

currentScene = 0;
NUMBER_OF_SCENES = backgrounds.length;
// }

// File globals {
var down = false;
//var ready = true;
//var throttleSpeed = 100; //milliseconds

var prevX = 0;
var prevY = 0;
//SOUNDS {
var backgroundMusicURL = "/assets/sounds/glowstar-soundtrak-2.wav"
var starPlacedSFXUFL = "/assets/sounds/twinkle.wav"
var backgroundMusic = new Howl({
  urls: [backgroundMusicURL],
  loop: true
})

// FOR DEBUG ONLY {
window.bgm = backgroundMusic;
bgm.mute();
console.log("%cType bgm.unmute() to unmute the background music which I've temporarily made mute by default", "font-size: x-large")
// }

var starPlacedSFX = new Howl({
  urls: [starPlacedSFXUFL],
  loop: true
});
var starPlacedSFXFade = new Howl({
  urls: [starPlacedSFXUFL],
  loop: true
})
//}

// }


// OnLoad...
$(function() {

  Session.set('star', '/assets/stars/gold-burst-star.png');
  backgroundMusic.play();
  setScene(_.random(0, NUMBER_OF_SCENES));
  //$("#backgroundImage").attr('src', backgrounds[0]);
  //$("#foregroundImage").attr('src', foregrounds[0]);
  //$("#background").css('background-size', "100% 100%");
});

var placeStar = function(x,y) {
  var image = $(".nav-button.selected img")[0];

  StarMap.stars.push({
    type: image,
    location: {
      x: x
      y: y
    },
    rot: (Math.random() * 360)
  });


  //newStar = $("<div class='stamp'></div>").appendTo("#background").css('top', y).css('left', x);
  //newStar = $("<img class='stamp' src='"+Session.get('star')+"' />").appendTo("#background").css('top', y).css('left', x);

  var image = $(".nav-button.selected img")[0];

  ctx.drawImage(image, x, y);

  //newStar.attr('src', Session.get('star'));
  //newStar.animate({
    //width: '60px',
    //height: '60px'
  //}, 200, function() {
    //$(this).animate({
    //width: '40px',
    //height: '40px',
    //}, 200)
  //});
};

Template.game.events({
  'touchend.fingers': function(evt) {
    if(down == true) {
      down = false;
      starPlacedSFX.stop();
      pos = starPlacedSFX.pos
      starPlacedSFXFade.pos(pos)
      starPlacedSFXFade.play();
      starPlacedSFXFade.fadeOut(0, 1000, function() {
        starPlacedSFXFade.stop();
        starPlacedSFXFade.volume(0.5);
      });
    }
  },
  'touchstart.fingers #background': function(evt) {
    down = true;
    starPlacedSFX.stop();
    starPlacedSFX.volume(0.5);
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
*/
