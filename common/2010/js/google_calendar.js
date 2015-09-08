jQuery(document).ready(function() {
  var num = window.location.href.split('#')[1];

  // If the hash value is not an integer, set it to 0.
  if (isNaN(num) || num % 1 != 0) {
    num = 0;
  }

  jQuery('#middlebury-google-calendar-' + num + '.middlebury_google_calendar').show();
  jQuery('.midd_gcal_buttons option:eq(' + num + ')').prop('selected', true);

  jQuery('.midd_gcal_buttons').change(function() {
    var selected = jQuery(this).find('option:selected').index();
    jQuery('.middlebury_google_calendar').hide();
    jQuery('#middlebury-google-calendar-'+selected+'.middlebury_google_calendar').show();
  });
});
