Template.nav.events({
  'touchend.fingers .nav-button': function(evt) {
    Session.set('star', $(evt.currentTarget).children("img").attr("src")); //TODO: decide if we want to grab separate star icon or THIS image..
    evt.stopPropagation();
  },
  'touchend.fingers .reset-button': function(evt) {
    // Getting next Scene {
    currentScene = currentScene + _.random(1, NUMBER_OF_SCENES -1);
    currentScene = currentScene % NUMBER_OF_SCENES;
    setScene(currentScene);
    // }

    // Clear stars
    $(".stamp").remove();
    // TODO: Add shooting star animation!
    //Session.set('fg', 'assets/foreground/background-2-mountain.png'); //TODO: decide if we want to grab separate star icon or THIS image..
  }
})

setScene = function(index) {
  //TODO: add some transition perhaps to make this not be clunky
  $("#backgroundImage").attr('src', backgrounds[index]);
  $("#foregroundImage").attr('src', foregrounds[index]);
}
