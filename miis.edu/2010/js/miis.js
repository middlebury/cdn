/* MIIS Effects (requires jQuery 1.3+)  */
/* by White Whale Web Services */

/* Rollover variables */
var rollovers = {
	beforeShow:100, // ms delay before a menu is initially shown
	beforeHide:500 // ms delay before a menu is hidden when exiting
};

/*var solutions = {
	distance:2, // pixels each item should move per frame
	fps:30 // frames per second
};*/

$(function() { // on DOM ready
	// Nav mouseovers
	$('#miis_navigation').addClass('has_dropdowns').find('li').hover( // attach hover events to nav items
		function() { // onmouseenter
			var self = $(this); // store the element
			clearTimeout(self.data('hideTimer')); // prevent hiding
			self.data('showTimer',setTimeout(function() { // set (and store) the timeout
					self.addClass('hover') // add the hover class
						.siblings().removeClass('hover'); // and remove it from any siblings
					self.find('input').focus(); // focus any input
					if($.browser.msie&&$.browser.version>=7) { // if IE  /* DT-fix */
						var feature = self.find('.nav_feature'),
							copy = feature.clone();
						feature.remove();
						self.find('.nav_dropdown').prepend(copy);
					}
				},rollovers.beforeShow)
			);
		},function() { // onmouseleave
			var self = $(this); // store the element
			clearTimeout(self.data('showTimer')); // prevent showing
			self.data('hideTimer',setTimeout(function() { // set (and store) the timeout
					self.removeClass('hover'); // add the hover class
					self.find('input').blur(); // blur any input
				},rollovers.beforeHide)
			);
		}
	);
	// Quickaccess
	if($.fn.quickaccess) {
		$('input.quickaccess').quickaccess({selector:'.qa_links a'});	
	}
	// Header photo caption popup
	$('#miis_header_caption_more').click(function() {
		$('#miis_header_caption_location,#miis_header_caption_more,#miis_header_caption_about').toggle();
		$('#miis_header_caption').css('background-image', 'url()');
		return false;
	});
	$('#miis_header_caption_close').click(function() { /* DT-fix */
		$('#miis_header_caption_more').click();
		$('#miis_header_caption').css('background-image', 'url(http://www.miis.edu/sites/all/themes/miis/images/black_trans.png)');
		return false;
	});
	// FAQ and courses pages
  $('.coursedesc').hide(); // Sep2-fix
  $('.coursetitle').css('cursor','pointer').click(function() { // Sep2-fix
    $(this).next().slideToggle();
  });
	if (!jQuery.browser.webkit) {
	  $('details section').hide(); // Sep2-fix
	  $('details summary').css('cursor','pointer').click(function() { // Sep2-fix
	  	var dets = $(this).parent();
	    dets.find('section').slideToggle();
	    if (dets.attr('open'))
	    	dets.removeAttr('open');
	    else
	    	dets.attr('open', 'open');
	    return false;
	  });
	 }
    // Sidebar Images
    $('#miis_sidebar a img').parents('a').hover(
      function() {
        $(this).css('border', 'none');
      },
      function() {
        $(this).css('border', 'none');
      }
    );

    if (window.location.pathname.indexOf('/admissions/apply', 0) == 0) {
	    $('#block-monster-menus-1 .menu .menu .menu li:first-child a').each(function() {
	    	var href = $(this).attr('href');
	    	if (href == '/admissions/apply/application') {
	    		$(this).attr('href', 'https://ssb.middlebury.edu/PNTR/bzskalog.P_DispLoginNon');
	    		$(this).attr('onClick', 'pageTracker._link(this.href); return false;');
	    	}
	    });
	}

	$('.course_sections .sectiontitle').click(function() {
		$(this).siblings().slideToggle();
	});
});

function onYouTubePlayerReady() { // called when YouTube embeds are ready for interaction
	var yt = document.getElementById('youtube_embed');
	yt.playVideo();
}