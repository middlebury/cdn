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
  jQuery.easing.def = 'easeInOutQuad'; //set the default easing

  // Gallery
  var slides = jQuery('#museum_gallery .node');
  if (slides.length) {
    // Add the next slide's caption to the current slide, except for the last slide.
    var captions = jQuery('#museum_gallery figcaption');
    for (i = 0; i < slides.length; i++) {
      if (typeof captions[i+1] != 'undefined') {
        jQuery(slides[i]).append('<div class="cycle-next"><a href="#">Next:</a> ' + captions[i+1].innerHTML + '</div>');
      }
    }
    // Add the Cycle2 plugin's next action as the click event on the next slide's caption.
    jQuery('.cycle-next').click(function() {
      jQuery('.cycle-slideshow').cycle('next');
    });
    // Hide the pager if there's only one slide.
    if (slides.length == 1) {
      jQuery('.cycle-pager').hide();
    }
  }

  // Carousel
  var carousel = jQuery('#museum_carousel');
  if (carousel.length) {
    carousel.slider();
    jQuery('#museum_content').append('<div class="carousel_arrow"></div>');
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