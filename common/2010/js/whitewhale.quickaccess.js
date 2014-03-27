/**
 * Copyright (c) White Whale Web Services (http://www.whitewhale.net/)
 * but free for any use, with or without modification
 *
 * Version 1.2.2 (2009-09-27)
 *
 * Usage: $('.inputselector').quickaccess(settingsObject);
 * 	where .inputselector selects the container for the search input (so when the element has no other function than quickaccess it isn't shown) OR the search input itself
 *	settingsObject may contain:
 *  selector : the selector for the links that are to be searched (i.e. '#linkslist a' or 'a.quickaccess')
 *  results : the container in which the results will be placed (default:they'll be placed in a #qa_results created immediately after the search box)
 *  inlineLabel : instructional text that appears inside the search box (i.e. 'Just start typing what you're looking for...')
 *	forceSelect : when true, an autocomplete option will always be selected; disable, for instance, if you'd like the quickaccess box to also function as a typical search box (default:true)
 *	onSubmit(event,selected) : callback function for when the user hits the enter/return key; by default, this will take them to the selected link (args: the keypress event and the currently selected result)
 *  maxResults : the maximum number of results to show at any one time (default : 10)
 *  tooMany : the message to show when there are more matching results than maxResults (default : 'Keep typing...')
 *  noneFound : the message to show when no results are found (default : 'No matches found.')
 *  topMatch : a message to be prepended to the top matching element (i.e. 'Top Match: ')
 *  focus : true/false; should the search element grab focus upon page initialization? (default : false)
 *  sort : true/false; should the search results be alphabetized? (default : false)
 *  duplicates : true/false; should duplicate URLs be allowed in the results? (default : true, meaning no items removed -- not currently supported by IE6 or 7)
 *
 * Example: $('#quicksearch').quickaccess({selector:'#offices li a', maxResults:10,noneFound:'Sorry, no matching links were found.'});
 **/

(function($){
	$.fn.extend({
		quickaccess  :   function(s) {
			var self = this;

			// initialize the settings with their defaults
			s = $.extend({
					selector	: 'a.qa',
					results		: null,
					forceSelect	: true,
					onSubmit	: function(e,selected) { if(selected.length) { e.preventDefault(); window.location=selected.eq(0).find('a').attr('href'); } },
					maxResults	: 10,
					tooMany		: 'Keep typing...',
					noneFound	: 'No matches found.',
					topMatch	: null,
					focus		: true,
					sort		: false,
					duplicates	: true
				},s);
			
			qa = { };
			
			var blur = function() { // blur function (that we can call without dispatching onBlur events)
				if(s.inlineLabel&&!$.trim(qa.search.val())) { // if an inlineLabel is specified and there's no query
					qa.search.val(s.inlineLabel).addClass('qa_inline_label'); // set the value to the inlineLabel and add the class
				}
			};
			
			if(self.is('input[type=text],textarea')) qa.search=self; // if the specified item is an input element, use it
			else qa.search = self.prepend('<input type="text" id="qa_search_query"/>').children().eq(0); // otherwise, add an input inside of it

			if(s.results) qa.results=$(s.results).eq(0); // select the specified container
			else qa.results = qa.search.after('<div id="qa_results"></div>').next(); // otherwise, create a new container
			
			qa.results.addClass('qa_blur').append('<ul id="qa_results_list"><li></li></ul>'); // initialize the blurred state and append results list to results div
			qa.results_list = qa.results.find('ul#qa_results_list'); // results list is the ul we just added 
			
			var toSpace = new RegExp('[,\-_\/\\\s&]+','g'), // regexp for elements that should become spaces
				toRemove = new RegExp('[^a-zA-Z 0-9]+','g'); // regexp for elements that should be removed
			
			qa.links = new Array(); // array to store all links
			$(s.selector).each(function() { // with each
				qa.links.push({ // add it to the array
					title : $(this).text(), // the "title"
					keywords : (this.innerHTML).toLowerCase().replace('&amp;','and').replace(toSpace,' ').replace(toRemove,''), // keyword for matching against
					href : $(this).attr('href')
				});
			});
			
			if(s.sort) qa.links.sort(function(a,b) { // alphabetize
				var la = a.title.toLowerCase(), // toLowerCase for case-insensitive sort; we use a new variable name due to IE bug
					lb = b.title.toLowerCase(); // ditto
				return (la==lb ? 0 : (la>lb? 1 : -1));
			});
						
			qa.matches = qa.links; // grab links, attach data to match against
			
			qa.search.attr('autocomplete','off').keyup(function() { // on each keypress, filter the links
				var raw = $(this).val(),
					query = $.trim(raw.toLowerCase().replace(toSpace,' ').replace(toRemove,'')),subquery; // grab query, sanitize it
				if(query==qa.lastquery) return; // do nothing if the query is unchanged
				if(!query.length) {
					qa.lastquery='';
					qa.results_list.html('<li></li>');
					qa.results.addClass('qa_noquery');
					return;
				} else qa.results.removeClass('qa_noquery');
				if(!qa.lastquery||query.indexOf(qa.lastquery)!=0) {  // if this query is NOT a subset of the last query, reinitialize the matches and search on all terms
					qa.matches = qa.links;
					subquery = query;
				} else subquery = query.substring(query.lastIndexOf(' ')+1,query.length); // otherwise, since this query IS a subset of the last query, no need to search the last query's terms
				qa.lastquery=query;
				$.each(subquery.split(' '),function() { // filter the result for each word in the query
					var search = this;
					qa.matches = $.grep(qa.matches,function(item) { return (' ' + item.keywords).indexOf(' ' + search)>=0; });
				});
				var query_exp = new RegExp('(\\b' + raw.replace(toRemove,'.').replace(/\s/g,'|\\b') +')','ig'); // for highlighting the query terms (we do this before emptying the list for performance)
				qa.results_list.empty();
				qa.results.removeClass('qa_toomany').removeClass('qa_nonefound');
				if(qa.matches.length>s.maxResults) qa.results_list.html('<li>'+s.tooMany+'</li>').parent().addClass('qa_toomany'); // if there are too many matches
				else if(!qa.matches.length) qa.results_list.html('<li>'+s.noneFound+'</li>').parent().addClass('qa_nonefound'); // if there are no matches
				else { // if the matches are just right
					$.each(qa.matches,function(index,item) { // with each item
						if(s.duplicates||!qa.results_list.find('a[href='+item.href+']').length) { // if duplicates are okay or if there are no duplicates
							qa.results_list.append('<li><a href="'+item.href+'">'+(' ' + item.title).replace(query_exp,'<span class="qa_highlight">$1</span>')+'</a></li>'); // list the match, with highlighting
						}
					});
					var top = qa.results_list.children().eq(0).attr('id','qa_topmatch').prepend(s.topMatch);
					if(s.forceSelect) top.addClass('qa_selected');
				}
			}).keydown(function(e) { // capture special keys on keydown
				switch(e.keyCode) {
					case 38: // up arrow
						e.preventDefault();
						if(!qa.results.is('.qa_toomany')) {
							var selected = qa.results_list.find('.qa_selected');
							selected.removeClass('qa_selected');
							if(selected.prev().length) selected.prev().addClass('qa_selected');
							else if(!selected.length||s.forceSelect) qa.results_list.find('li:last-child').addClass('qa_selected');
						}
						break;
					case 40: // down arrow
						e.preventDefault();
						if(!qa.results.is('.qa_toomany')) {
							var selected = qa.results_list.find('.qa_selected');
							selected.removeClass('qa_selected');
							if(selected.next().length) selected.next().addClass('qa_selected');
							else if(!selected.length||s.forceSelect) qa.results_list.children().eq(0).addClass('qa_selected');
						}
						break;
					case 13: // enter/return
						var selected = qa.results_list.find('.qa_selected');
						s.onSubmit.apply(self,[e,selected]);
						break;
				}
			}).focus(function() {
				qa.results.removeClass('qa_blur');
				if($.trim(qa.search.val())==s.inlineLabel) { // if the function is the inlineLabel
					qa.search.val('').removeClass('qa_inline_label');
				}
			}).blur(function() {
				setTimeout(function() { qa.results.addClass('qa_blur'); },200); // after 200ms, add the blur class; we use a delay in case the user has clicked in that area
				blur();
			});
			
			qa.search.keyup(); // run search in case field is pre-populated (e.g. in Firefox)
			
			blur(); // call the blur function
			
			if(s.focus) qa.search.focus(); // put cursor in search box
			
			return this; // return original element for chaining
		}
	});

})(jQuery);