/* MIIS Effects (requires jQuery 1.3+)  */
/* by White Whale Web Services */

var ie = jQuery.browser.msie,
  ie6 = jQuery.browser.msie&&jQuery.browser.version<7,
  ie7 = jQuery.browser.msie&&jQuery.browser.version>=7&&jQuery.browser.version<8,
  ie8 = jQuery.browser.msie&&jQuery.browser.version>=8&&jQuery.browser.version<9,
  ie9 = jQuery.browser.msie&&jQuery.browser.version>=9&&jQuery.browser.version<10;

var settings = {
  edgeWidth : 0.25, // width of hover area on right and left edges for scrolling (portion of frame)
  maxSpeed : 15, //maximum speed (pixels per frame)
  minSpeed : 0.5, // minimum speed (pixels per frame)
  fps : 60, // frames per second
  refreshRate : 100, // how often to listen for a mouse move event
  threshold : 20 // how many pixels does the mouse have to have moved to register the change?
};

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
      },rollovers.beforeShow));
    },function() { // onmouseleave
      var self = jQuery(this); // store the element
      clearTimeout(self.data('showTimer')); // prevent showing
      self.data('hideTimer',setTimeout(function() { // set (and store) the timeout
        self.removeClass('hover'); // add the hover class
        self.find('input').blur(); // blur any input
      },rollovers.beforeHide));
    }
  );

  // jQuery Cycle2 slideshows
  if(jQuery('.cycle-slide').length == 1) {
    jQuery('.cycle-prev,.cycle-next,.cycle-pager').hide();
  }

  // Quickaccess
  if(jQuery.fn.quickaccess) {
    jQuery('input.quickaccess').quickaccess({selector:'.qa_links a'});	
  }

  // Header photo caption popup
  jQuery('#miis_header_caption_more').click(function() {
    jQuery('#miis_header_caption_more,#miis_header_caption_about').toggle();
    jQuery('#miis_header_caption').css('background-image', 'url()');
    return false;
  });
  jQuery('#miis_header_caption_close').click(function() { /* DT-fix */
    jQuery('#miis_header_caption_more').click();
    jQuery('#miis_header_caption').css('background-image', 'url(//cdn.middlebury.edu/miis.edu/2010/images/black_trans.png)');
    return false;
  });

  // FAQ and courses pages
  jQuery('.coursedesc').hide(); // Sep2-fix
  jQuery('.coursetitle').css('cursor','pointer').click(function() { // Sep2-fix
    jQuery(this).next().slideToggle();
  });
  jQuery('details:not([open]) section').hide(); // Sep2-fix
  jQuery('details summary').css('cursor','pointer').click(function(e) { // Sep2-fix
    var dets = jQuery(this).parent();
    dets.find('section').slideToggle();
    if (dets.attr('open'))
    	dets.removeAttr('open');
    else
    	dets.attr('open', 'open');
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  // Sidebar Images
  jQuery('#miis_sidebar a img').parents('a').hover(
    function() {
      jQuery(this).css('border', 'none');
    },
    function() {
      jQuery(this).css('border', 'none');
    }
  );

  // Fullwidth Sub-page Lists
  if (jQuery('body').hasClass('miis_fullwidth')) {
    jQuery('.node-subpglist table').addClass('columns');
    var numcols = jQuery('.node-subpglist table:first td').size();
    if (numcols == 1) {
      jQuery('.node-subpglist table').addClass('one');
    } else if (numcols == 2) {
      jQuery('.node-subpglist table').addClass('two');
    } else if (numcols == 3) {
      jQuery('.node-subpglist table').addClass('three');
    } else if (numcols == 4) {
      jQuery('.node-subpglist table').addClass('four');
    }

    jQuery('.node-subpglist table td').addClass('column');
    jQuery('.node-subpglist table td:first').addClass('first');
    jQuery('.node-subpglist table td:eq(1)').addClass('second');
    jQuery('.node-subpglist table td:eq(2)').addClass('third');
    jQuery('.node-subpglist table td:eq(3)').addClass('fourth');
    jQuery('.node-subpglist table td:last').addClass('last');
    jQuery('.node-subpglist td > ul > li > a').addClass('h3');
    jQuery('.node-subpglist ul ul ul').parent().addClass('h4');
  }

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

  // Carousel
  var carousel = jQuery('#miis_carousel');
  if (carousel.length) {
    carousel.slider();
    jQuery('#miis_content').append('<div class="carousel_arrow"></div>');
  }

  // Blue Theme Sub-navigation
  if (jQuery('body').hasClass('miis_blue')) {
    var subnav = jQuery('#block-monster-menus-1 > div > ul > li > ul > li.expanded > ul').clone();
    jQuery('.region-right').prepend(subnav);
  }
});

jQuery.fn.extend({
  slider : function() {
    var self = this,
      strip = self.children(0),
      stripWidth = strip.width(),
      frameWidth = self.width(),
      offset = 0;
    if(!ie) leftEdge = 0, rightEdge = 0;
    self.data('stripWidth',stripWidth);
    self.data('originalWidth',stripWidth-12);
    strip.width(stripWidth);
    jQuery(window).resize(function() { // calculate the hover areas and the strip "center" on resize
      frameWidth = self.width();
      leftEdge = settings.edgeWidth*frameWidth;
      rightEdge = frameWidth-(settings.edgeWidth*frameWidth);
    }).resize(); // and do it now
    var header = jQuery('#midd_header'),
      title = header.find('img'),
      titletext = header.find('h1 img').css('position','relative'),
      headerGutter = (header.width()-40-title.width())/2,
      titleTextOffset = 0,
      titleTextModifier = 0;
    if(!self.is('#midd_waveform')||homepage) {
      offset = -1*((stripWidth-frameWidth)/2); // initial offset
      strip.css('left',offset);
    } else if(!ie && strip.width() - header.width() > jQuery(window).width()) {
      offset = -1*((stripWidth-header.width())/2-(jQuery(window).width()*0.4));
      strip.css('left',offset);
      titleTextModifier = offset*-1;
      titleTextOffset = 0;
    }
    // Attach mouseover behavior
    var destination,
      lastX=-100,
      lastTime=0;
    self.mousemove(function(e) {
      var curX = e.clientX,
        curTime = new Date().getTime(),
        modifier;
      if(Math.abs(curX-lastX)<settings.threshold||curTime-lastTime<settings.refreshRate) return; // if the mouse has moved less than 20 or less than 100ms have elapsed, don't fire
      lastX = curX;
      lastTime = curTime;
      stripWidth = self.data('stripWidth');
      if(curX<leftEdge) {
        modifier = Math.pow((leftEdge-curX)/leftEdge,3);
        destination = 0;
      } else if(curX>rightEdge) {
        modifier = Math.pow((curX-rightEdge)/(frameWidth-rightEdge),3);
        destination = -1*(stripWidth-frameWidth);
      } else {
        destination = offset;
        modifier = 0;
      }
      if(stripWidth>frameWidth) { // if the strip is narrower than the window
        desination = -1*((stripWidth-frameWidth)/2); // move toward the center
      }
      slide(settings.maxSpeed*modifier);
    })
    .mouseleave(function() { // on mouse exit
      if(destination>offset) {
        destination = Math.min(offset+100,destination);
      } else {
        destination = Math.max(offset-100,destination);
      }
    });
    var animation,
      sliderOffset = parseInt(jQuery('div.slider').css('left')),
      slide = function(speed) {
        clearInterval(animation);
        var direction = destination>offset ? 1 : -1;
        animation = setInterval(function() {
          jQuery().click();
          var distance = Math.abs(destination-offset), // distance remaining
            modifier = Math.pow(distance/stripWidth,0.3), // moderator decelerates as the destination approaches
            step = Math.max(speed*modifier,settings.minSpeed);
          if(distance<=step) { // if the destination is less than the next step
            offset=destination;
            clearInterval(animation);
          } else {
            offset+=step*direction;
          }
          var percentOff = Math.abs(offset/(stripWidth-frameWidth));
          if(ie) {
            title.css('left',offset*0.3);
          } else {
            title.css('left',titleTextOffset*0.3);
            titleTextOffset = offset+titleTextModifier;
          }
          if(ie9||ie7) {
            jQuery('#midd_stories li.bar').css('left',offset-sliderOffset);
          } else {
            strip.css('left',offset);
          }
        },1000/settings.fps);
      };
    return this;
  }
});