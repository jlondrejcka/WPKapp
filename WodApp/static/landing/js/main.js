$(document).ready(function () {

	$('.lightbox').colorbox({
		rel:'gal',
		maxWidth: "98%",
		maxHeight: "98%"
	});
	$(window).scroll(function() {
	scrollPos = $(this).scrollTop();
		$('section').css({
			'background-position' : 'center ' + (-scrollPos/4)+"px"
		});
	});
	$(window).on({
		resize: function () {
			$.colorbox.resize();
		}
	});

	$("#slides").slides({
		responsive: true
	});

	$("#slides1").slides({
		responsive: true
	});

	$("#slides2").slides({
		responsive: true
	});

	$("#slides3").slides({
		responsive: true
	});

	$("#slides4").slides({
		responsive: true
	});
	$("#slides5").slides({
		responsive: true
	});

	$("#slides6").slides({
			responsive: true
		});


		$(document).ready(function() {
			$('.slidewrap').carousel({
				slider: '.slider',
				slide: '.slide',
				nextSlide : '.next',
				prevSlide : '.prev',
				addPagination: false,
				addNav : false
			});
			
			$('.slidewrap2').carousel({
				slider: '.slider2',
				slide: '.slide2',
				nextSlide : '.next2',
				prevSlide : '.prev2',
				addPagination: false,
				addNav : false
			});
			
			$('.slidewrap3').carousel({ 
					namespace: "mr-rotato" // Defaults to “carousel”.
				})
				.bind({
					'mr-rotato-beforemove' : function() {
						$('.events').append("<li>“beforemove” event fired.</li>");
					},
					'mr-rotato-aftermove' : function() {
						$('.events').append("<li>“aftermove” event fired.</li>");
					}
				})
				.after('<ul class="events">Events</ul>');
		});





	$("img.lazy").show().lazyload({
		failure_limit: 10,
		skip_invisible: false,
		effect: 'fadeIn'
	});



	// skills
	$('body').delegate('#skills', 'waypoint.reached', function(event, direction) {
		scrollPos = $(this).scrollTop();
		$(".bar[data-percent]").each(function(){
			$(this).delay(5000).css({width: $(this).attr('data-percent')+"%"});
		});
	});
	$('#skills').waypoint({ offset: '50%' });
/*
*/
	/*
	var scrollElement = 'html, body';
	$('html, body').each(function () {
		var initScrollTop = $(this).attr('scrollTop');
		$(this).attr('scrollTop', initScrollTop + 1);
		if ($(this).attr('scrollTop') == initScrollTop + 1) {
			scrollElement = this.nodeName.toLowerCase();
			$(this).attr('scrollTop', initScrollTop);
			return false;
		}
	});

	$("#navigation a[href^='#']").on({
		click: function(e) {
			e.preventDefault();
			var $this = $(this),
			target = this.hash,
			$target = $(target);
			var top;

			if ($target.length < 1) {
				top = 0;
			} else {
				top = $target.offset().top;
			}

			$(scrollElement).stop().animate({
				'scrollTop': top
			}, 250, 'swing', function() {
				window.location.hash = target;
			});
		}
	});*/
	$('#navigation a.slide_page').on({
			click: function(e) {
				e.preventDefault();
				$('body').stop().scrollTo(
					$( $(this).attr('href') ),

					{ duration: 1200,
      offset: { 'left':0, 'top':-0.03*$(window).height() }
    }
				);
			}
	});

		$('.filter li a').click(function(e) {
			e.preventDefault();
			
			$('.filter li').removeClass('selected');
			$(this).parent('span').addClass('selected');
			
			thisItem = $(this).attr('rel');
			
			if(thisItem != "all") {
			
				$('.gallery span[rel='+thisItem+']')
					.stop()
					.animate({
						'width' : '100%', 
						'height': '340px',
						'opacity' : 1, 
						
					});
				
				$('.gallery span[rel!='+thisItem+']')
					.stop()
					.animate({
						'width' : 0, 
						'opacity' : 0,
						'height' :0,
						
					});
			} else {
				$('.gallery span')
					.stop()
					.animate({
						'opacity' : 1, 
						'height': '340px',
						'width' : '100%', 
						
						
					});
			}
		})
});