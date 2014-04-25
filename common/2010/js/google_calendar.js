jQuery(document).ready(function() {
  jQuery('#middlebury-google-calendar-0.middlebury_google_calendar').show();

  jQuery('.midd_gcal_buttons').change(function() {
    var selected = jQuery(this).find('option:selected').index();
    jQuery('.middlebury_google_calendar').hide();
    jQuery('#middlebury-google-calendar-'+selected+'.middlebury_google_calendar').show();
  });
});