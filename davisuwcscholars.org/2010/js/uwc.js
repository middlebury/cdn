jQuery(document).ready(function(jQuery) {
  jQuery('article header h1').each(function(i, el) {
    html = jQuery(el).html().replace(/\s+/, "");
    if (jQuery(el).is(":empty") || html.length == 0)
      jQuery(el).remove();
  });
  if (jQuery.browser.msie && jQuery.browser.version >= 7 && jQuery.browser.version < 8) {
    jQuery('section.body').each(function() {
      if (jQuery(this).find('aside').length == 0) {
        jQuery(this).find('section.content').css('width', '680px');
      }
    });
  }
  jQuery('.mm-gallery-single').each(function() {
    jQuery(this).append('<span class="play-icon"><img src="//cdn.middlebury.edu/davisuwcscholars.org/2010/images/click_to_play.png" width="76" height="76"></span>');
  });
});