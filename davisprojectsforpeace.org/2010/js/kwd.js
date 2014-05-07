jQuery(document).ready(function(jQuery) {
  jQuery('#kwd_search_query').inlineLabel();
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