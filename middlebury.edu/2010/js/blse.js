(function($) {

  $('#midd_campuses a').click(function() {
    $('#midd_campuses a').removeClass('selected');
    var campus = $(this).attr('class');
    $('body').removeClass('ripton oxford santafe');
    $('body').addClass(campus);
    $(this).addClass('selected');
  });

  $('[data-validate-form]').bsFormValidate();

  var video = document.getElementById('blse-home-video');
  var videoContainer = video.parentElement;
  var videoClass = 'video-playing';

  video.removeAttribute('controls');

  video.addEventListener('click', function() {
    if(video.paused) {
      video.setAttribute('controls', '');
      videoContainer.classList.add(videoClass);
      return video.play();
    }
    videoContainer.classList.remove(videoClass);
    video.removeAttribute('controls');
    video.pause();
  });

})(jQuery);
