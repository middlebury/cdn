jQuery(function() {
  jQuery('.languages header, .gateways header').click(function() {
    jQuery('.languages header, .gateways header').not(this).siblings().hide();
    
    jQuery(this).siblings().toggle();
  });
  
  jQuery('.languages,.gateways').mouseleave(function() {
    jQuery(this).find('ul').hide();
  });

  if (jQuery('body').is('.front')) {
    jQuery(this).frontColumnHeights();
  }
});

jQuery(document).ajaxSuccess(function() {
  jQuery('.front .column').each(function() {
    jQuery(this).height('100%');
  });
  jQuery(this).frontColumnHeights();
});

jQuery.fn.extend({
  frontColumnHeights : function() {
    var maxHeight = Math.max.apply(null, jQuery('.columns .column').map(function () {
      return jQuery(this).height();
    }).get());
  
    jQuery('.front .column').each(function() {
      jQuery(this).height(maxHeight);
    });
  }
});