jQuery(function() {
  jQuery("#library-quick-search-tabs").tabs();

  jQuery("#lib-guides input[type=submit]").click(function() {
    var url = jQuery(this).siblings('select').eq(0).val();

    if (url) {
      window.location = url;
    }

    return false;
  });
});