jQuery(function() {
  jQuery('#middlebury-housing-photos img').each(function(i) {
    if (i > 0) {
      jQuery(this).hide();
    }
    jQuery(this).attr('id', 'middlebury-housing-photos-'+i);
  });
  jQuery('input.housing-photos').click(function(i) {
    var img = jQuery(this).attr('title');
    jQuery('#middlebury-housing-photos img').each(function(i) {
      if (i == img) {
        jQuery(this).show();
      } else {
        jQuery(this).hide();
      }
    });
  });
});