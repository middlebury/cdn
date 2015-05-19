jQuery(function() {
  jQuery('.languages li:first-child, .gateways li:first-child').click(function() {
    jQuery(this).siblings().toggle();
  });
});