(function($) {
  $(document).ready(function() {
    $('.js-menu-btn, .js-menu-overlay').on('click', function(e) {
      e.preventDefault();
      $('body').toggleClass('menu-open');
    });
    $('a[href^="mailto:"]').each(function () {
      var address = $(this).html().replace("@", "&#8203;@");
      $(this).html(address);
    });
  });
})(jQuery);

//# sourceMappingURL=responsive.js.map
