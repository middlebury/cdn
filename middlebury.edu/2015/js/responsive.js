(function($) {
  $(document).ready(function() {
    $('.js-menu-btn, .js-menu-overlay').on('click', function(e) {
      e.preventDefault();
      $('body').toggleClass('menu-open');
    });
  });
})(jQuery);

//# sourceMappingURL=responsive.js.map
