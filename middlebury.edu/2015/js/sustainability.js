(function($) {
  $(document).ready(function() {
    $('.menu-btn').on('click', function(e) {
      e.preventDefault();
      $('#midd-menu').toggleClass('menu-open');
    });
  });
})(jQuery);
