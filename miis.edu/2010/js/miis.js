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

jQuery(function() { // on DOM ready
	// Nav mouseovers
	jQuery('#miis_navigation').addClass('has_dropdowns').find('li').hover( // attach hover events to nav items
		function() { // onmouseenter
			var self = jQuery(this); // store the element
			clearTimeout(self.data('hideTimer')); // prevent hiding
			self.data('showTimer',setTimeout(function() { // set (and store) the timeout
					self.addClass('hover') // add the hover class
						.siblings().removeClass('hover'); // and remove it from any siblings
					self.find('input').focus(); // focus any input
					if(jQuery.browser.msie&&jQuery.browser.version>=7) { // if IE  /* DT-fix */
						var feature = self.find('.nav_feature'),
							copy = feature.clone();
						feature.remove();
						self.find('.nav_dropdown').prepend(copy);
					}
				},rollovers.beforeShow)
			);
		},function() { // onmouseleave
			var self = jQuery(this); // store the element
			clearTimeout(self.data('showTimer')); // prevent showing
			self.data('hideTimer',setTimeout(function() { // set (and store) the timeout
					self.removeClass('hover'); // add the hover class
					self.find('input').blur(); // blur any input
				},rollovers.beforeHide)
			);
		}
	);
	// Quickaccess
	if(jQuery.fn.quickaccess) {
		$('input.quickaccess').quickaccess({selector:'.qa_links a'});	
	}
	// Header photo caption popup
	jQuery('#miis_header_caption_more').click(function() {
		jQuery('#miis_header_caption_location,#miis_header_caption_more,#miis_header_caption_about').toggle();
		jQuery('#miis_header_caption').css('background-image', 'url()');
		return false;
	});
	jQuery('#miis_header_caption_close').click(function() { /* DT-fix */
		jQuery('#miis_header_caption_more').click();
		jQuery('#miis_header_caption').css('background-image', 'url(http://www.miis.edu/sites/all/themes/miis/images/black_trans.png)');
		return false;
	});
	// FAQ and courses pages
  jQuery('.coursedesc').hide(); // Sep2-fix
  jQuery('.coursetitle').css('cursor','pointer').click(function() { // Sep2-fix
    jQuery(this).next().slideToggle();
  });
	if (!jQuery.browser.webkit) {
	  jQuery('details section').hide(); // Sep2-fix
	  jQuery('details summary').css('cursor','pointer').click(function() { // Sep2-fix
	  	var dets = jQuery(this).parent();
	    dets.find('section').slideToggle();
	    if (dets.attr('open'))
	    	dets.removeAttr('open');
	    else
	    	dets.attr('open', 'open');
	    return false;
	  });
	 }
    // Sidebar Images
    jQuery('#miis_sidebar a img').parents('a').hover(
      function() {
        jQuery(this).css('border', 'none');
      },
      function() {
        jQuery(this).css('border', 'none');
      }
    );

    if (window.location.pathname.indexOf('/admissions/apply', 0) == 0) {
	    jQuery('#block-monster-menus-1 .menu .menu .menu li:first-child a').each(function() {
	    	var href = jQuery(this).attr('href');
	    	if (href == '/admissions/apply/application') {
	    		jQuery(this).attr('href', 'https://ssb.middlebury.edu/PNTR/bzskalog.P_DispLoginNon');
	    		jQuery(this).attr('onClick', 'pageTracker._link(this.href); return false;');
	    	}
	    });
	}

	jQuery('.course_sections .sectiontitle').click(function() {
		jQuery(this).siblings().slideToggle();
	});
});

function onYouTubePlayerReady() { // called when YouTube embeds are ready for interaction
	var yt = document.getElementById('youtube_embed');
	yt.playVideo();
}