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
    var $formgroup = $this.closest('.form-group');
    if(!$field.val() && $field.attr('required')) {
      $formgroup.addClass('has-error');
    } else {
      $formgroup.removeClass('has-error');
    }
  });
});
