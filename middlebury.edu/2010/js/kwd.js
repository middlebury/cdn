jQuery(document).ready(function(jQuery) {
  jQuery('#kwd_search_query').inlineLabel();

  var videos = jQuery('.open_video');
  if (videos.length) {
    jQuery('.open_video').click(function() {
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
      overlay.css('top',(jQuery(window).height() / 2 - 151 + jQuery(window).scrollTop()) + 'px');
      jQuery('#youtube_embed').load(
        'http://www.davisprojectsforpeace.org/middmedia_video_filter/embed?video=' + video + '&width=607&height=320&ratio=607/320' + image);
      blackout.add('.close_overlay').click(function() {
        blackout.add(overlay).remove();
      });
      return false;
    });
  }
});

jQuery.fn.extend({
  inlineLabel: function(style,text) {
    if (typeof style != 'string') {
      style = 'inline_label';
    }
    text = text || jQuery('label[for=' + this.attr('id') + ']').hide().text();
    var self = this,
      blur = function() {
        var val = jQuery.trim(self.val());
        if (!val || val == text) {
          self.addClass(style)
            .val(text)
            .one('focus', function() {
              self.val('')
                .removeClass(style);
            });
        }
      };
    self.blur(blur);
    blur();
    return this;
  }
});