jQuery(document).ready(function() {
  var search_url = jQuery('#midd_search').attr('action');
  var go_url = jQuery('#midd_ajax_search_url').val();
  jQuery('#midd_search_query').autocomplete({
    source: function(request, response) {
      var q = jQuery('#midd_search_query').val();
      jQuery.ajax({
        url: go_url,
        dataType: 'json',
        type: 'GET',
        data: {
          query: q,
          format: 'json',
        },
        success: function(data) {
          v = search_url+'?q2='+q;
          response(jQuery.merge(
            [{label:'Search for '+q,value:v}],
            jQuery.map(data, function(obj) {
              return {
                label: 'go/'+obj,
                value: 'http://go.middlebury.edu/'+obj,
              }
            }))
          );
        },
      });
    },
    select: function(event, ui) {
      if (ui.item) {
        window.location = ui.item.value;
        return false;
      }
    },
  }).autocomplete('widget').addClass('ajax_search_results');
});