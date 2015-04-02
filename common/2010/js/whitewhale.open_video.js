jQuery(document).on('click', '.open_video', function() {
  var video_extra = jQuery(this).siblings('.video_extra');
  var blackout = jQuery('<div class="blackout"></div>').fadeTo(0,0.5).prependTo('body'),
    overlay = jQuery('<div class="video_overlay"><div class="close_overlay">&#215;</div><div id="youtube_embed">Watching this video requires Flash Player 8 or higher.</div></div>').prependTo('body'),
    video = jQuery(this).attr('href'),
    image = jQuery(this).find('img').attr('src');
  if (image) {
    image = '&image=' + image;
  }
  else {
    image = '';
  }
  if (jQuery.browser.safari) {
    bodyelem = jQuery('body');
  }
  else {
    bodyelem = jQuery('html,body');
  }
  var autoplay = 0;
  if (typeof Drupal.settings.middleburyVideoFilter != "undefined" ) {
    autoplay = Drupal.settings.middleburyVideoFilter.autoplay;
  }
  overlay.css('top',(jQuery(window).height() / 2 - 151 + jQuery(window).scrollTop()) + 'px');
  jQuery('#youtube_embed').load(
    Drupal.settings.basePath + 'middlebury_video_filter/embed?video=' + video + '&width=607&height=320&ratio=607/320&autoplay=' + autoplay + image);
  blackout.add('.close_overlay').click(function() {
    blackout.add(overlay).remove();
  });
  if (video_extra[0] && video_extra[0].innerHTML && video_extra[0].innerHTML != 'null' && video_extra[0].innerHTML != 'undefined') {
    jQuery('.video_overlay').append('<div class="video_overlay_extra">'+video_extra[0].innerHTML+'</div>');
  }
  return false;
});