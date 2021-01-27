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

jQuery(document).ready(function(jQuery) {
  homepage = jQuery('body').is('#midd_homepage');
  if (jQuery('body').hasClass('page-mm-71654') || jQuery('body').hasClass('page-mm-1041178')) {
    jQuery('#block-monster-menus-1 ul ul li').each(function(i) {
      if (i > 8) this.style.display = 'none';
    });
  }

  // create the indexOf function if it does not exist
  if(!Array.indexOf) {
    Array.prototype.indexOf = function(obj) {
      for(var i=0; i<this.length; i++) {
        if(this[i]==obj) {
          return i;
        }
      }
      return -1;
    }
  }

  jQuery.easing.def = 'easeInOutQuad'; //set the default easing

  // Linked Images
  jQuery('a img').parents('a').addClass('noborder');

  // Fix for Address height
  jQuery('#main-content nav.left').css('padding-bottom',Math.max(195,jQuery('#main-content .region-address').height()+40));

  function getFirstChild(el){
    var firstChild = el.firstChild;
    while(firstChild != null && firstChild.nodeType == 3){ // skip TextNodes
      firstChild = firstChild.nextSibling;
    }
    return firstChild;
  }

  var affiliates = document.getElementById('midd_affiliates'),
    search_submit = document.getElementById('midd_search_submit'),
    navigation = document.getElementById('midd_navigation');
  if(affiliates) affiliates.className=affiliates.className+' ir';
  if(search_submit) search_submit.className=search_submit.className+' ir';
  if(navigation) getFirstChild(navigation).className='ir';

  // Department Banner Image Links
  var midd_banner = jQuery('#midd_banner');
  if (midd_banner.data('theme-page')) {
    var midd_banner_img = midd_banner.find('.node-mm-media img');
    var midd_banner_parent = midd_banner_img.parent();
    if (!midd_banner_parent.is('a')) {
      midd_banner_img.wrap('<a href="'+midd_banner.data('theme-page')+'"></a>');
    } else if (!midd_banner_parent.hasClass('mm_media_field_url')) {
      midd_banner_parent.attr('href', midd_banner.data('theme-page'));
    }
  }

  // Videos
  jQuery('div.video_filter>.video-filter').each(function() {
    jQuery(this).parent().attr("class", "video_filter " + jQuery(this).attr("class"));
  });

  // Dropdowns
  var dropdowns = jQuery('#midd_taskbar .node');
  dropdowns.each(function() {
    links = jQuery(this).find('a');
    if (links.length == 1) {
      h3 = jQuery(this).find('h1');
      h3.css('background-image', 'url()');
      h3.css('padding-right', '6px');
      h3.html('<a href="' + links[0] + '">' + h3.html() + '</a>');
      jQuery(this).addClass('singleton');
    }
  });
  dropdowns.hover(function() {
    var self = jQuery(this);
    if (!self.is('.singleton')) {
      dropdowns.removeClass('active');
      self.addClass('active');
      clearTimeout(self.data('timer'));
    }
  },function() {
    var self = jQuery(this);
    self.data('timer',setTimeout(function() {
      self.removeClass('active')
    },500));
  });

  // Wide tables
  jQuery('.region-content .node .contents table').each(function() {
    var contents = jQuery(this).parents('.contents').eq(0);
    if (contents.outerWidth() && jQuery(this).outerWidth() > contents.outerWidth()) {
      jQuery(this).wrap('<div class="scrollable"></div>');
    }
  });

  // Course and Section lists
  jQuery('.coursedesc,.sectiondesc').hide();
  jQuery('.coursetitle,.sectiontitle').css('cursor','pointer').click(function() {
    jQuery(this).next().slideToggle('400');
  });

  // Donation Thermometers
  jQuery('.node-donation-thermometer').each(function() {
    var horizontal = jQuery(this).is('.march-general') || jQuery(this).is('.young-alumni');
    var progress = jQuery(this).find('.value');
    if (horizontal) {
      progress.width(400 * progress.html() / 100);
    } else if (jQuery(this).is('.midd-match')) {
      progress.height(129 * progress.html() / 100);
    } else {
      progress.height(123 * progress.html() / 100 + 30);
    }
  });

  // FAQs
  jQuery('details:not([open]) section').hide();
  jQuery('details summary').css('cursor','pointer').click(function(e) {
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

  // Gallery click overlay
  if (typeof imagesLoaded == 'function') {
    var imgLoad = imagesLoaded('body');
    imgLoad.on('always', function() {
      jQuery('.mm-gallery-single > a.noborder').each(function() {
        var gallery_overlay = jQuery('<div class="mm-gallery-overlay"></div>');
        jQuery(this).append(gallery_overlay);
        var gallery_image = jQuery(this).find('img')[0];
        gallery_overlay.css('top', gallery_image.height / 2 - 81);
        gallery_overlay.css('left', gallery_image.width / 2 - 114.5);
        jQuery(this).width(gallery_image.width);
        jQuery(this).parent().find('.mm-gallery-caption').width(gallery_image.width);
      });
    });
  }

  // MM Media Thickbox Pop-outs
  jQuery('img.thickbox').each(function() {
    if (jQuery(this).parent().is('a') == false) {
      // Get the path to the full-size image.
      var src = jQuery(this).attr('src');
      src = src.replace(/styles\/\w+\/private\//, '');

      // Wrap the image in a link that will open a thickbox window.
      jQuery(this).wrap('<a class="thickbox noborder" href="'+src+'"></a>');
    }
  });

  // Profile Lists
  var num_profile = 0;
  jQuery('article.node-profile.node-teaser').each(function(index, element) {
    if (num_profile % 2 == 0) {
      jQuery(this).css('margin-right', '18px');
    }

    if (jQuery(this).nextAll('.node').first().is('.node-profile, .node-teaser')) {
      num_profile++;
    } else {
      num_profile = 0;
    }
  });

  // Promotional Calendars and Form fieldsets on pages with blank sidebars.
  jQuery('article.node-promocal,section.body fieldset.form-wrapper').each(function() {
    var sidebar_nodes = jQuery('#block-monster-menus-2 .node');
    if (sidebar_nodes.length == 0) {
      jQuery(this).css('width', '100%');
      jQuery(this).css('max-width', '100%');
    }
  });

  // Carousel
  var carousel = jQuery('#midd_carousel');
  if (carousel.length) {
    carousel.slider();
    jQuery('#midd_content, #main-content').append('<div class="carousel_arrow"></div>');
  }

  // Footer positioning and panel
  var footerPanel = jQuery('#midd_footer_panel');
  jQuery(window).resize(jQuery(window).nudgeFooter).resize();
  jQuery('#midd_footer .quick_footer>a').click(function() {
    var windowHeight = jQuery(window).height(),
      li = jQuery(this).parent();
    if(!footerPanel.is(':visible') || homepage) {
      li.addClass('active');
      var fromTop = jQuery(this).offset().top;
      footerPanel.slideDown(1000);
      jQuery('html,body').animate({scrollTop:(fromTop+330-windowHeight)+'px'},1100);
      if (homepage) {
        jQuery('#midd_footer .quick_footer').removeClass('active');
        li.addClass('active');
      }
    } else {
      if(li.is('.active')) {
        if (!homepage) {
          footerPanel.slideUp(1000,function() {
            jQuery('#midd_footer .quick_footer').removeClass('active');
          });
          jQuery('html,body').animate({scrollTop:(jQuery('body').height()-windowHeight-300)+'px'},900);
        }
      } else {
        jQuery('#midd_footer .quick_footer').removeClass('active');
        li.addClass('active');
      }
    }
    return false;
  });
});

jQuery.fn.extend({
  nudgeFooter : function() {
    var footer = jQuery('#midd_footer').css('visibility', 'visible');
    windowHeight = jQuery(window).height(), bodyHeight = windowHeight;
    if(footer.offset()) bodyHeight = footer.css('margin-top',30).offset().top+30;
    if(bodyHeight<windowHeight) {
      footer.css('margin-top',Math.max(30,windowHeight-bodyHeight+30)+'px');
    }
  },
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
})
