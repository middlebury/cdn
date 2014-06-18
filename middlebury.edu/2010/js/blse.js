jQuery(function() {
  jQuery('#midd_campuses a').click(function() {
    jQuery('#midd_campuses a').removeClass('selected');
    var campus = jQuery(this).attr('class');
    jQuery('body').removeClass('ripton oxford santafe');
    jQuery('body').addClass(campus);
    jQuery(this).addClass('selected');
  });
});