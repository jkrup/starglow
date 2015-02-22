// instead of in $(document).ready(... we just put Template.____.events({
Template.muteButton.events({
  'touchend.fingers .muted': function() {
    console.log(this);
    $('.muted').addClass('playing').removeClass('muted');
    bgm.unmute();
  },
  'touchend.fingers .playing': function() {
    $('.playing').addClass('muted').removeClass('playing');
    bgm.mute();
  }
})
