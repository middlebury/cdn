jQuery(function() {
  var $ = jQuery;
  var $form = $('[data-validate-form]');

  $form.submit(function(e) {
    $(this).find('input, select').each(function() {
      var $this = $(this);
      if($this.attr('required') && !$this.val()) {
        $this.closest('.form-group').addClass('has-error');
      }
    })

    if($(this).find('.has-error').length) {
      return false;
    }
  });

  $form.find('input, select').on('blur', function() {
    var $field = $(this);
    var $formgroup = $field.closest('.form-group');
    if(!$field.val() && $field.attr('required')) {
      $formgroup.addClass('has-error');
    } else {
      $formgroup.removeClass('has-error');
    }
  });

  if(!Modernizr.placeholder && Drupal.settings) {
    (function(d, t) {
    var g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
        g.src = Drupal.settings.middleburyUtility.middleburyCdnBase + '/common/2010/js/placeholders.jquery.min.js';
        s.parentNode.insertBefore(g, s);
    }(document, 'script'));
  }

});
