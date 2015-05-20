jQuery(function() {
  jQuery('.languages header, .gateways header').click(function() {
    jQuery(this).siblings().toggle();
  });

  if (jQuery('body').is('.front')) {
    var maxHeight = Math.max.apply(null, jQuery('.columns .column').map(function () {
      return jQuery(this).height();
    }).get());
  
    jQuery('.front .column').each(function() {
      jQuery(this).height(maxHeight);
    });
  }
});