Gamespace.buildGameGrounds = function() {
  //Background & Foreground {
  var backgroundLayer = game.add.group();
  backgroundLayer.z = 0;

  var foregroundLayer = game.add.group();
  foregroundLayer.z = 2;

  var background = game.add.sprite(0, 0, 'background1');
  var foreground = game.add.sprite(0, 0, 'foreground1');
  background.height = foreground.height = game.height
  background.width = foreground.width = game.width

  backgroundLayer.add(background);
  foregroundLayer.add(foreground);
  // }

  starsLayer = game.add.group();
  starsLayer.z = 1;
  return {
    starsLayer: starsLayer
  };
}
