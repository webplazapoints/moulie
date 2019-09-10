(function($){
"use strict"; // Start of use strict
//Document Ready
jQuery(document).ready(function(){
	//Select UI
	$('.orderby').selectmenu();	
	//Button Mobile
	if($(window).width()<768){
		$('.language-link,.currency-link,.account-link,.icon-search,.icon-user,.icon-cart').click(function(event){
			event.preventDefault();
			$(this).next().slideToggle();
		});
	}
	//Fixed Latest News 
	if($(window).width()>768){
		$('.item-home-latest-news').click(function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
			}else{
				$(this).addClass('active');
			}
		});
	}
	//Product Load More
	$('.list-product-loadmore').each(function(){
		var size_li = $(this).find(".list-product li").size();
		var x=$(this).find('.btn-link-loadmore').attr('data-num');
		var y=parseInt($(this).find('.btn-link-loadmore').attr('data-num'))-1;
		$(this).find('.list-product li:lt('+x+')').show();
		$(this).find('.list-product li:gt('+y+')').hide();
		$(this).find('.btn-link-loadmore').click(function () {
			var size_li = $(this).prev().find("li").size();
			var x=$(this).attr('data-num');
			var x=parseInt($(this).attr('data-num'));
			$(this).attr('data-num',x+4);
			var x=$(this).attr('data-num');
			$(this).prev().find('li:lt('+x+')').show();
			if($(this).attr('data-num')>size_li){
				$(this).hide();
			}
		});
	});
	//Testimonial
	if($(window).width()>=768){
		$('.left-open').on('click',function(event){
		   event.preventDefault();
		   $(this).parents('.item').removeClass('right-open');
		   $(this).parents('.item').removeClass('left-close');
		   $(this).parents('.item').addClass('left-open');
		})
		$('.left-close').on('click',function(event){
		   event.preventDefault();
		   $(this).parents('.item').removeClass('left-open');
		   $(this).parents('.item').addClass('left-close');
		})
		$('.right-open').on('click',function(event){
		   event.preventDefault();
		   $(this).parents('.item').removeClass('left-open');
		   $(this).parents('.item').removeClass('right-close');
		   $(this).parents('.item').addClass('right-open');
		  })
		$('.right-close').on('click',function(event){
		   event.preventDefault();
		   $(this).parents('.item').removeClass('right-open');
		   $(this).parents('.item').addClass('right-close');
		})
	}
	//End
	//Box Filter
	$('body').click(function(){
		$('.box-attr-filter').slideUp();
	});
	$('.btn-filter').click(function(event){
		event.preventDefault();
		event.stopPropagation();
		$('.box-attr-filter').slideToggle();
	});
	//Product Quick View
	$('.product-quick-view').each(function(){
		$(this).fancybox();
	});
	//Control Homme Extra Box
	$('.icon-extra-sub').click(function(event){
		event.preventDefault();
		$('.icon-extra-sub').addClass('hide-box')
		$(this).next().addClass('show-box');
	});
	$('.close-extra-sub').click(function(event){
		event.preventDefault();
		$('.icon-extra-sub').removeClass('hide-box')
		$(this).parent().removeClass('show-box');
	});
	//Category Lightbox
	$('.header-banner-link').click(function(event){
		event.preventDefault();
		$(this).parent().next().addClass('height-light');
	});
	$('.header-banner-link').click(function(event){
		event.preventDefault();
		$(this).parent().next().addClass('height-light');
	});
	$('.close-category-lightbox').click(function(event){
		event.preventDefault();
		$(this).parent().removeClass('height-light');
	});
	//Slider Scroll
	if($('.item-product-featured').length>0){
		$('.item-product-featured').each(function(){
			$(this).find('.bxslider').bxSlider({
				pagerCustom: '.bx-pager',
				nextText:'',
				prevText:''
			});
		});
	}
	//Accordions
	if($('.accordion-box').length >0){
		$('.accordion-box').each(function(){
			$('.title-accordion').click(function(){
				$(this).parent().parent().find('.item-accordion').removeClass('active');
				$(this).parent().addClass('active');
				$(this).parent().parent().find('.desc-accordion').stop(true,true).slideUp();
				$(this).next().stop(true,true).slideDown();
			});
		});
	}
	//Menu Responsive
	if($(window).width()<768){
		$('body').click(function(){
			$('.main-menu').removeClass('active');
		});
		$('.show-menu').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			$(this).hide();
			$(this).next().show();
			$('.main-menu').addClass('active');
		});
		$('.hide-menu').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			$(this).hide();
			$(this).prev().show();
			$('.main-menu').removeClass('active');
		});	
		$('.main-nav li.menu-item-has-childrent>a').click(function(event){ 
			event.stopPropagation();
			$(this).toggleClass('active');
			if($(this).hasClass('active')){
				event.preventDefault();
				$('.sub-menu').fadeOut(400);
				$(this).next().stop(true,true).fadeIn(400);
			}else{
				$('.sub-menu').fadeOut(400);
				$(this).next().stop(true,true).fadeOut(400);
			}
		});
	}
	//Post Gallery
	$('.item-post-gallery .fancybox').fancybox();
	$('.item-team-gallery .fancybox').fancybox();
	//Toggle Search
	$('body').click(function(){
		$('.select-category').slideUp();
	});
	$('.toggle-category').click(function(event){
		event.preventDefault();
		event.stopPropagation();
		$(this).next().slideToggle();
	});
	//Change Grid-List
	$('.product-sort a').click(function(event){
		//event.preventDefault();
		$('.product-sort a').removeClass('active');
		$(this).addClass('active');
	});
	//Filter Price
	$( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 49, 419 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	//Attr Filter Price
	$( "#slider-range-price" ).slider({
      range: true,
      min: 0,
      max: 5000,
      values: [ 924, 5000 ],
      slide: function( event, ui ) {
        $( "#amount-price" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount-price" ).val( "$" + $( "#slider-range-price" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range-price" ).slider( "values", 1 ) );
	//Remove Product
	if($('.remove-product-compare').length>0){
		$('.remove-product-compare').click(function(event){
			event.preventDefault();
			$(this).parent().remove();
		});
	}else{
		$('.widget.widget-compare').remove();
	}
	//Banner Tab Slider
	if($('.slider-tab').length>0){
		$('.slider-tab .bxslider').bxSlider({
			pagerCustom: '.slider-tab #bx-pager',
			nextText:'',
			prevText:''
		});
	}
	//Product Gallery
	if($('.product-gallery .bxslider').length>0){
		$('.product-gallery .bxslider').bxSlider({
			pagerCustom: '.product-gallery #bx-pager',
			nextText:'<span class="lnr lnr-chevron-right"></span>',
			prevText:'<span class="lnr lnr-chevron-left"></span>'
		});
	}
	//Post Gallery
	if($('.post-format-gallery .bxslider').length>0){
		$('.post-format-gallery .bxslider').bxSlider({
			pagerCustom: '.post-format-gallery #bx-pager',
			nextText:'<span class="lnr lnr-arrow-right-circle"></span>',
			prevText:'<span class="lnr lnr-arrow-left-circle"></span>'
		});
	}
	//Select Size
	$('.selected-attr-size	span').text($('.select-attr-size li').first().find('a').text());
	$('body').click(function(){
		$('.select-attr-size').slideUp();
	});
	$('.selected-attr-size').click(function(event){
		event.preventDefault();
		event.stopPropagation();
		$('.select-attr-size').slideToggle();
	});
	$('.select-attr-size a').click(function(event){
		event.preventDefault();
		$('.select-attr-size a').removeClass('selected');
		$(this).addClass('selected');
		$('.selected-attr-size span').text($(this).text());
	});
	//Sort By
	$('body').click(function(){
		$('.filter-type').slideUp();
	});
	$('.filter-selected').click(function(event){
		event.preventDefault();
		event.stopPropagation();
		$('.filter-type').slideToggle();
	});
	$('.filter-type a').click(function(event){
		event.preventDefault();
		$('.filter-type a').removeClass('selected');
		$(this).addClass('selected');
		$('.filter-selected').text($(this).text());
	});
	//Select Color
	$('.attr-color li a').click(function(event){
		event.preventDefault();
		$('.attr-color li a').removeClass('selected');
		$(this).addClass('selected');
	});
	//Qty Up-Down
	$('.info-qty').each(function(){
		var qtyval = parseInt($(this).find('.qty-val').text());
		$('.qty-up').click(function(event){
			event.preventDefault();
			qtyval=qtyval+1;
			$('.qty-val').text(qtyval);
		});
		$('.qty-down').click(function(event){
			event.preventDefault();
			qtyval=qtyval-1;
			if(qtyval>0){
				$('.qty-val').text(qtyval);
			}else{
				qtyval=0;
				$('.qty-val').text(qtyval);
			}
		});
	});
});
//Window Load
jQuery(window).load(function(){ 
	//Category Slider
	if($('.category-slider').length>0){
		$('.category-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 2], 
				[768, 3], 
				[992, 3], 
				[1200, 5] 
				],
				pagination: false,
				navigation: true,
			});
		});
	}
	//Post Slider
	if($('.post-slider').length>0){
		$('.post-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 2], 
				[768, 2], 
				[992, 2], 
				[1200, 2] 
				],
				pagination: false,
				navigation: true,
				navigationText:['<i class="fa fa-caret-left"></i>','<i class="fa fa-caret-right"></i>']
			});
		});
	}
	//Customer Slider
	if($('.customer-saying').length>0){
		$('.customer-saying').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 2], 
				[768, 2], 
				[992, 3], 
				[1200, 3] 
				],
				pagination: false,
				navigation: false,
				autoPlay:true
			});
		});
	}
	//Product Slider
	if($('.product-slider').length>0){
		$('.none-sidebar .product-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 2], 
				[768, 3], 
				[992, 3], 
				[1200, 5] 
				],
				pagination: false,
				navigation: true,
			});
		});
	}
	if($('.product-slider').length>0){
		$('.arrow-style.product-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 2], 
				[768, 3], 
				[992, 3], 
				[1200, 5] 
				],
				pagination: false,
				navigation: true,
				navigationText:['<span class="lnr lnr-arrow-left-circle"></span>','<span class="lnr lnr-arrow-right-circle"></span>']
			});
		});
	}
	//Default Product Slider
	if($('.product-slider').length>0){
		$('.has-sidebar .product-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 2], 
				[768, 3], 
				[992, 3], 
				[1200, 3] 
				],
				pagination: false,
				navigation: true,
			});
		});
	}
	//Post Slider
	if($('.post-gallery').length>0){
		$('.post-gallery').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 2], 
				[768, 3], 
				[992, 3], 
				[1200, 3] 
				],
				pagination: false,
				navigation: true,
				navigationText:['<span class="lnr lnr-arrow-left-circle"></span>','<span class="lnr lnr-arrow-right-circle"></span>']
			});
		});
	}
	//Partner Slider
	if($('.partner-slider-paginav.style1').length>0){
		$('.partner-slider-paginav.style1').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 2], 
				[480, 3], 
				[768, 4], 
				[992, 5], 
				[1200, 6] 
				],
				pagination: true,
				navigation: false,
				autoPlay:true,
			});
		});
	}
	if($('.partner-slider-paginav').length>0){
		$('.partner-slider-paginav').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 2], 
				[480, 3], 
				[768, 4], 
				[992, 5], 
				[1200, 6] 
				],
				pagination: true,
				navigation: false,
			});
		});
	}
	if($('.partner-slider-directnav').length>0){
		$('.partner-slider-directnav').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 2], 
				[480, 3], 
				[768, 4], 
				[992, 5], 
				[1200, 6] 
				],
				pagination: false,
				navigation: true,
				navigationText:['<span class="lnr lnr-arrow-left-circle"></span>','<span class="lnr lnr-arrow-right-circle"></span>']
			});
		});
	}
	//The Brand
	if($('.the-brand').length>0){
		$('.the-brand').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: true,
				navigation: false,
				singleItem : true,
				transitionStyle : "fade"
			});
		});
	}	
	//Testimonial Slider
	if($('.testimonial-slider').length>0){
		$('.testimonial-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: true,
				navigation: false,
			});
		});
	}	
	if($('.home-testimonial-slider').length>0){
		$('.home-testimonial-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: false,
				navigation: true,
				singleItem : true,
				transitionStyle : "fade",
				navigationText:['<span class="lnr lnr-arrow-left-circle"></span>','<span class="lnr lnr-arrow-right-circle"></span>']
			});
		});
	}	
	//Home Feaured Slider
	if($('.home-featured-slider').length>0){
		$('.home-featured-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				addClassActive:true,
				pagination: true,
				navigation: true,
				navigationText:['<span class="lnr lnr-arrow-left-circle"></span>','<span class="lnr lnr-arrow-right-circle"></span>']
			});
		});
		var first=$('.home-featured-slider .owl-theme .owl-controls .owl-page').first().index()+1;
		var last=$('.home-featured-slider .owl-theme .owl-controls .owl-page').last().index()+1;
		$('.control-paginav-featured-slider').prepend('<span class="first-num">'+first+'</span>');
		$('.control-paginav-featured-slider').append('<span class="last-num">'+last+'</span>');
		//Range with fixed maximum
		$( ".control-paginav-featured-slider #slider-range-max" ).slider({
		  range: "max",
		  min: first,
		  max: last,
		  value: first,
		  slide: function( event, ui ) {
			$( ".control-paginav-featured-slider #amount" ).text( ui.value );
			$('.home-featured-slider').find('.wrap-item').trigger('owl.goTo', ui.value);
		  }
		});
		$( ".control-paginav-featured-slider #amount" ).text( $( ".control-paginav-featured-slider #slider-range-max" ).slider( "value" ) );
		$( ".control-paginav-featured-slider #amount" ).appendTo($(".control-paginav-featured-slider .ui-slider-handle.ui-state-default.ui-corner-all"));
	}	
	//Slider Paginav
	if($('.slider-paginav').length>0){
		$('.slider-paginav').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				addClassActive:true,
				pagination: true,
				navigation: false,
			});
			$(this).find('.owl-theme .owl-controls .owl-page').each(function(){
				var num=$(this).index()+1;
				$(this).find('span').text(num);
			});
		});
	}	
	//Banner Circle Slider
	if($('.banner-slider-circle-vertical').length>0){
		$('.banner-slider-circle-vertical').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: true,
				navigation: false,
			});
		});
	}	
	//Banner Rect Slider
	if($('.banner-slider-rect-vertical').length>0){
		$('.banner-slider-rect-vertical').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: true,
				navigation: false,
			});
		});
	}	
	//Banner Hoztical Slider
	if($('.banner-slider-circle-hoztical').length>0){
		$('.banner-slider-circle-hoztical').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: true,
				navigation: false,
			});
		});
	}	
	//Banner Slider
	if($('.banner-slider').length>0){
		$('.banner-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: false,
				navigation: true,
				autoPlay:true,
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>']
			});
		});
	}	
	//Product Tab Slider
	if($('.product-tab-slider').length>0){
		$('.product-tab-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: false,
				navigation: true,
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>']
			});
		});
	}	
	//Product New Slider
	if($('.new-product').length>0){
		$('.new-product').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: false,
				navigation: true,
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>']
			});
		});
	}	
	//Popular Post
	if($('.popular-post').length>0){
		$('.popular-post').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: true,
				navigation: false,
			});
		});
	}
	//Header Slider
	if($('.header-slider').length>0){
		$('.header-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: true,
				navigation: false,
				autoPlay:true,
			});
		});
	}
	//Default Paginav
	if($('.default-paginav').length>0){
		$('.default-paginav').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: true,
				navigation: false,
			});
		});
	}
	if($('.home-latest-news .default-directnav').length>0){
		$('.home-latest-news .default-directnav').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: false,
				navigation: true,
				navigationText:['<span class="lnr lnr-arrow-left-circle"></span>','<span class="lnr lnr-arrow-right-circle"></span>']
			});
		});
	}
	if($('.default-directnav').length>0){
		$('.default-directnav').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: false,
				navigation: true,
				navigationText:['<span class="lnr lnr-arrow-left-circle"></span>','<span class="lnr lnr-arrow-right-circle"></span>']
			});
		});
	}
	//Time Circle
	if($('.deal-countdown').length>0){
		$(".deal-countdown").TimeCircles({
			fg_width: 0.05,
			bg_width: 0,
			text_size: 0,
			circle_bg_color: "#5f6062",
			time: {
				Days: {
					show: true,
					text: "",
					color: "#fff"
				},
				Hours: {
					show: true,
					text: "",
					color: "#fff"
				},
				Minutes: {
					show: true,
					text: "",
					color: "#fff"
				},
				Seconds: {
					show: true,
					text: "",
					color: "#fff"
				}
			}
		}); 
	}
	if($('.hotdeal-countdown').length>0){
		$(".hotdeal-countdown").TimeCircles({
			fg_width: 0.03,
			bg_width: 0,
			text_size: 0,
			circle_bg_color: "#1b1d1f",
			time: {
				Days: {
					show: true,
					text: "DAY",
					color: "#fbb450"
				},
				Hours: {
					show: true,
					text: "HOUR",
					color: "#fbb450"
				},
				Minutes: {
					show: true,
					text: "MIN",
					color: "#fbb450"
				},
				Seconds: {
					show: true,
					text: "SEC",
					color: "#fbb450"
				}
			}
		}); 
	}
});
})(jQuery); // End of use strict