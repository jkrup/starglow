$(document).ready(function () {

      $(document).on('click', '.muted',
      	function () {
      		$('muted').addClass('playing').removeClass('.muted');
			bgm.unmute();
      	});

      $(document).on('click', '.muted',
      	function () {
      		$('playing').addClass('muted').removeClass('.playing');
			bgm.mute();
      	});

  });