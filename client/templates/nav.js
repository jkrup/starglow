Template.nav.events({
  'touchend.fingers .nav-button': function(evt) {
    console.log("ewhfo");
    window.esx = evt;
    Session.set('star', $(evt.currentTarget).children("img").attr("src")); //TODO: decide if we want to grab separate star icon or THIS image..
  }
})
