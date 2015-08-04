jQuery(function() {
  jQuery('#block-middlebury-printers-middlebury-printers-list table').DataTable({
    order: [[ 1, 'asc' ], [ 2, 'asc' ]],
    paging: false
  });
});
