var down = false;
var ready = true;
var throttleSpeed = 100; //milliseconds

Template.game.events({
  'touchend.fingers': function(evt) {
    down = false;
  },
  'touchstart.fingers': function(evt) {
    down = true;
  },
  'touchmove.fingers #background': function(evt) {
    if(down) {
      if(ready) {
        //coords of click
        evt = evt.originalEvent.touches[0];
        var x = evt.pageX - $('#background').offset().left;
        var y = evt.pageY - $('#background').offset().top;
        //console.log(x,y)

        //birthStar
        $("<div class='stamp'></div>").appendTo("#background").css('top', y).css('left', x);

        //throttle everything
        ready = false;
        setTimeout(function() {
          ready = true;
        }, throttleSpeed);
      }
    }
  }
})
