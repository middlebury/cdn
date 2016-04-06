(function($) {
  $(document).ready(function() {

    $('[data-validate-form]').bsFormValidate();

    if(!Modernizr.placeholder && Drupal.settings) {
      (function(d, t) {
      var g = d.createElement(t),
          s = d.getElementsByTagName(t)[0];
          g.src = Drupal.settings.middleburyUtility.middleburyCdnBase + '/common/2010/js/placeholders.jquery.min.js';
          s.parentNode.insertBefore(g, s);
      }(document, 'script'));
    }
  })

})(jQuery);
