jQuery(document).ready(function(jQuery) {
  jQuery('#kwd_search_query').inlineLabel();

  // MM Media Thickbox Pop-outs
  jQuery('img.thickbox').each(function() {
    if (jQuery(this).parent().is('a') == false) {
      // Get the path to the full-size image.
      var src = jQuery(this).attr('src');
      src = src.replace(/styles\/\w+\/private\//, '');

      // Wrap the image in a link that will open a thickbox window.
      jQuery(this).wrap('<a class="thickbox noborder" href="'+src+'"></a>');
    }
  });
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