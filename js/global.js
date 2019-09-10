
$(function() {

	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, winScr, _isresponsive, intPoint = 500, smPoint = 768, mdPoint = 992, lgPoint = 1200, addPoint = 1600, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	function pageCalculations(){
		winW = $(window).width();
		winH = $(window).height();
		if($('.menu-button').is(':visible')) _isresponsive = true;
		else _isresponsive = false;

		$('.fixed-header-margin').css({'padding-top':$('header').outerHeight(true)});
		$('.parallax-slide').css({'height':winH});
	}

	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/
	pageCalculations();
	if($('.search-drop-down .overflow').length && !_ismobile) {
		$('.search-drop-down').addClass('active');
		$('.search-drop-down .overflow').jScrollPane();
		$('.search-drop-down').removeClass('active');
	}
	if(_ismobile) $('body').addClass('mobile');

	/*============================*/
	/* 04 - function on page load */
	/*============================*/
	$(window).load(function(){
		pageCalculations();
		$('#loader-wrapper').fadeOut();
		$('body').addClass('loaded');
		initSwiper();
	});

	/*==============================*/
	/* 05 - function on page resize */
	/*==============================*/
	function resizeCall(){
		pageCalculations();

		$('.navigation:not(.disable-animation)').addClass('disable-animation');

		$('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function(){
			var thisSwiper = swipers['swiper-'+$(this).attr('id')], $t = $(this), slidesPerViewVar = updateSlidesPerView($t), centerVar = thisSwiper.params.centeredSlides;
			thisSwiper.params.slidesPerView = slidesPerViewVar;
			thisSwiper.reInit();
			if(!centerVar){
				var paginationSpan = $t.find('.pagination span');
				var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
				if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
				else $t.removeClass('pagination-hidden');
				paginationSlice.show();
			}
		});
	}
	if(!_ismobile){
		$(window).resize(function(){
			resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			resizeCall();
		}, false);
	}

	/*==============================*/
	/* 06 - function on page scroll */
	/*==============================*/
	function scrollCalculations(){
		winScr = $(window).scrollTop();
		var headerComp = ($('header').outerHeight()<=200)?$('header').outerHeight():200;
		if(winScr>=headerComp && !$('.header-demo').length) {
			if(!$('header').hasClass('fixed-header')){
				$('header').addClass('fixed-header');
				if(!_ismobile) closePopups();
			}
		}
		else {
			if($('header').hasClass('fixed-header')){
				$('header').removeClass('fixed-header');
				if(!_ismobile) closePopups();
			}
		}
		$('nav').addClass('disable-animation');
	}

	scrollCalculations();
	$(window).scroll(function(){
		scrollCalculations();
	});

	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
	var initIterator = 0;
	function initSwiper(){
		
		$('.swiper-container:not(.initialized)').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index + ' initialized').attr('id', index);
			$t.find('.pagination').addClass('pagination-'+index);

			var autoPlayVar = parseInt($t.attr('data-autoplay'), 10);
			if(_ismobile) autoPlayVar = 0;
			var centerVar = parseInt($t.attr('data-center'), 10);
			var simVar = ($t.closest('.circle-description-slide-box').length)?false:true;

			var slidesPerViewVar = $t.attr('data-slides-per-view');
			if(slidesPerViewVar == 'responsive'){
				slidesPerViewVar = updateSlidesPerView($t);
			}
			else slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			var loopVar = parseInt($t.attr('data-loop'), 10);
			var speedVar = parseInt($t.attr('data-speed'), 10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				speed: speedVar,
				pagination: '.pagination-'+index,
				loop: loopVar,
				paginationClickable: true,
				autoplay: autoPlayVar,
				slidesPerView: slidesPerViewVar,
				keyboardControl: true,
				calculateHeight: true, 
				simulateTouch: simVar,
				centeredSlides: centerVar,
				roundLengths: true,
				onSlideChangeEnd: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					if($t.closest('.navigation-banner-swiper').length || $t.closest('.parallax-slide').length){
						var qVal = $t.find('.swiper-slide-active').attr('data-val');
						$t.find('.swiper-slide[data-val="'+qVal+'"]').addClass('active');
					}
				},
				onSlideChangeStart: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					if($t.hasClass('product-preview-swiper')){
						swipers['swiper-'+$t.parent().find('.product-thumbnails-swiper').attr('id')].swipeTo(activeIndex);
						$t.parent().find('.product-thumbnails-swiper .swiper-slide.selected').removeClass('selected');
						$t.parent().find('.product-thumbnails-swiper .swiper-slide').eq(activeIndex).addClass('selected');
					}
					else $t.find('.swiper-slide.active').removeClass('active');
				},
				onSlideClick: function(swiper){
					if($t.hasClass('product-preview-swiper')){
						$t.find('.default-image').attr('src', $t.find('.swiper-slide-active img').attr('src'));
						$t.find('.zoomed-image').attr('src', $t.find('.swiper-slide-active img').data('zoom'));
						$t.find('.product-zoom-container').addClass('visible').animate({'opacity':'1'});
					}
					else if($t.hasClass('product-thumbnails-swiper')){
						swipers['swiper-'+$t.parent().parent().find('.product-preview-swiper').attr('id')].swipeTo(swiper.clickedSlideIndex);
						$t.find('.active').removeClass('active');
						$(swiper.clickedSlide).addClass('active');
					}
				}
			});
			swipers['swiper-'+index].reInit();
			if(!centerVar){
				if($t.attr('data-slides-per-view')=='responsive'){
					var paginationSpan = $t.find('.pagination span');
					var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
					if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
					else $t.removeClass('pagination-hidden');
					paginationSlice.show();
				}
			}
			initIterator++;
		});

	}

	function updateSlidesPerView(swiperContainer){
		if(winW>=1920 && swiperContainer.parent().hasClass('full-width-product-slider')) return 6;
		if(winW>=addPoint) return parseInt(swiperContainer.attr('data-add-slides'), 10);
		else if(winW>=lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'), 10);
		else if(winW>=mdPoint) return parseInt(swiperContainer.attr('data-md-slides'), 10);
		else if(winW>=smPoint) return parseInt(swiperContainer.attr('data-sm-slides'), 10);
		else if(winW>=intPoint) return parseInt(swiperContainer.attr('data-int-slides'), 10);
		else return parseInt(swiperContainer.attr('data-xs-slides'), 10);
	}

	//swiper arrows
	$('.swiper-arrow-left').click(function(){
		swipers['swiper-'+$(this).parent().attr('id')].swipePrev();
	});

	$('.swiper-arrow-right').click(function(){
		swipers['swiper-'+$(this).parent().attr('id')].swipeNext();
	});


	/*==============================*/
	/* 08 - buttons, clicks, hovers */
	/*==============================*/

	//desktop menu
	$('nav>ul>li').on('mouseover', function(){
		if(!_isresponsive){
			$(this).find('.submenu').stop().fadeIn(300);
		}
	});

	$('nav>ul>li').on('mouseleave', function(){
		if(!_isresponsive){
			$(this).find('.submenu').stop().fadeOut(300);
		}
	});

	//responsive menu
	$('nav li .fa').on('click', function(){
		if(_isresponsive){
			$(this).next('.submenu').slideToggle();
			$(this).parent().toggleClass('opened');
		}
	});

	$('.submenu-list-title .toggle-list-button').on('click', function(){
		if(_isresponsive){
			$(this).parent().next('.toggle-list-container').slideToggle();
			$(this).parent().toggleClass('opened');
		}
	});

	$('.menu-button').on('click', function(){
		$('.navigation.disable-animation').removeClass('disable-animation');
		$('body').addClass('opened-menu');
		$(this).closest('header').addClass('opened');
		$('.opened .close-header-layer').fadeIn(300);
		closePopups();
		return false;
	});

	//agregar whislist
		    $(".square").click(function(){
		        if ($(this).hasClass('agregado')){
		        	$(this).removeClass('agregado');
		        	}else{
		        	$(this).addClass('agregado');
		        	}
		        	});

	//agregar whislist en modales
		    $(".square").click(function(){
		        if ($(this).hasClass('agregado')){
		        	$(this).removeClass('agregado');
		        	}else{
		        	$(this).addClass('agregado');
		        	}
		        	});

	$('.close-header-layer, .close-menu').on('click', function(){
		$('.navigation.disable-animation').removeClass('disable-animation');
		$('body').removeClass('opened-menu');
		$('header.opened').removeClass('opened');
		$('.close-header-layer:visible').fadeOut(300);
	});

	//toggle menu block for "everything" template
	$('.toggle-desktop-menu').on('click', function(){
		$('.navigation').toggleClass('active');
		$('nav').removeClass('disable-animation');
		$('.search-drop-down').removeClass('active');
	});

	/*tabs*/
	var tabsFinish = 0;
	$('.tab-switcher').on('click', function(){
		if($(this).hasClass('active') || tabsFinish) return false;
		tabsFinish = 1;
		var thisIndex = $(this).parent().find('.tab-switcher').index(this);
		$(this).parent().find('.active').removeClass('active');
		$(this).addClass('active');

		$(this).closest('.tabs-container').find('.tabs-entry:visible').animate({'opacity':'0'}, 300, function(){
			$(this).hide();
			var showTab = $(this).parent().find('.tabs-entry').eq(thisIndex);
			showTab.show().css({'opacity':'0'});
			if(showTab.find('.swiper-container').length) {
				swipers['swiper-'+showTab.find('.swiper-container').attr('id')].resizeFix();
				if(!showTab.find('.swiper-active-switch').length) showTab.find('.swiper-pagination-switch:first').addClass('swiper-active-switch');
			}
			showTab.animate({'opacity':'1'}, function(){tabsFinish = 0;});
		});
		
	});

	$('.swiper-tabs .title, .links-drop-down .title').on('click', function(){
		$(this).toggleClass('active');
		$(this).next().slideToggle(300);
	});

	/*tabs 2*/
		jQuery('ul.tabs').each(function(){
		    // For each set of tabs, we want to keep track of
		    // which tab is active and it's associated content
		    var $active, $content, $links = jQuery(this).find('a');

		    // If the location.hash matches one of the links, use that as the active tab.
		    // If no match is found, use the first link as the initial active tab.
		    $active = jQuery($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
		    $active.addClass('active');

		    $content = $($active[0].hash);

		    // Hide the remaining content
		    $links.not($active).each(function () {
		        jQuery(this.hash).hide();
		    });

		    // Bind the click event handler
		    jQuery(this).on('click', 'a', function(e){
		        // Make the old tab inactive.
		        $active.removeClass('active');
		        $content.hide();

		        // Update the variables with the new link and content
		        $active = jQuery(this);
		        $content = jQuery(this.hash);

		        // Make the tab active.
		        $active.addClass('active');
		        $content.show();

		        // Prevent the anchor's default click action
		        e.preventDefault();
		    });
		});

	/*sidebar menu*/
	$('.sidebar-navigation .title').on('click', function(){
		if($('.sidebar-navigation .title .fa').is(':visible')) {
			$(this).parent().find('.list').slideToggle(300);
			$(this).parent().toggleClass('active');
		}
	});

	/*search drop down*/
	$('.search-drop-down .title').on('click', function(){
		$(this).parent().toggleClass('active');
	});

	$('.search-drop-down .category-entry').on('click', function(){
		var thisDropDown = $(this).closest('.search-drop-down');
		thisDropDown.removeClass('active');
		thisDropDown.find('.title span').text($(this).text());
	});

	/*search popup*/
	$('.open-search-popup').on('click', function(e){
		if(!$('.search-box.popup').hasClass('active')){
			clearTimeout(closecartTimeout);
			$('.cart-box.active').animate({'opacity':'0'}, 300, function(){$(this).removeClass('active');});
			$('.search-box.popup').addClass('active').css({'right':winW - $(this).offset().left-$(this).outerWidth()*0.5-45, 'top':$(this).offset().top-winScr+0.5*$(this).height()+35, 'opacity':'0'}).stop().animate({'opacity':'1'}, 300, function(){
				$('.search-box.popup input').focus();
			});
		}
		else closePopups();
		if(e.pageY-winScr>winH-100) $('.search-box.popup').addClass('bottom-align');
		else $('.search-box.popup').removeClass('bottom-align');
		return false;
	});

	/*cart popup*/
	$('.open-cart-popup').on('click', function(e){
		clearTimeout(closecartTimeout);
		
		if(!$('.cart-box.popup').hasClass('active')){
			closePopups();
			if($(this).offset().left>winW*0.5){
				$('.cart-box.popup').addClass('active cart-right').css({'left':'auto', 'right':winW - $(this).offset().left-$(this).outerWidth()*0.5-47, 'top':$(this).offset().top-winScr+15, 'opacity':'0'}).stop().animate({'opacity':'1'}, 300);			
			}
			else{
				$('.cart-box.popup').addClass('active cart-left').css({'right':'auto', 'left':$(this).offset().left, 'top':$(this).offset().top-winScr+15, 'opacity':'0'}).stop().animate({'opacity':'1'}, 300);			
			}
		}
		//if($(this).offset().left<100) $('.cart-box.popup').addClass('left-align');
		//else if($(this).hasClass('header-functionality-entry') && $(this).closest('header.type-3').length) $('.cart-box.popup').addClass('fixed-header-left');
		//else $('.cart-box.popup').removeClass('left-align');
	});
	
	$('.open-cart-popup').on('mouseleave', function(){
		closecartTimeout = setTimeout(function(){closePopups();}, 1000);
	});

	var closecartTimeout = 0;
	$('.cart-box.popup').on('mouseover', function(){
		clearTimeout(closecartTimeout);
	});
	$('.cart-box.popup').on('mouseleave', function(){
		closecartTimeout = setTimeout(function(){closePopups();}, 1000);
	});

	function closePopups(){
		$('.popup.active').animate({'opacity':'0'}, 300, function(){$(this).removeClass('active'); $('.cart-box').removeClass('cart-left cart-right');});
	}

	/*whislist popup*/
	$('.open-whislist-popup').on('mouseover', function(e){
		clearTimeout(closewhislistTimeout);
		
		if(!$('.whislist-box.popup').hasClass('active')){
			closePopups();
			if($(this).offset().left>winW*0.5){
				$('.whislist-box.popup').addClass('active whislist-right').css({'left':'auto', 'right':winW - $(this).offset().left-$(this).outerWidth()*0.5-47, 'top':$(this).offset().top-winScr+15, 'opacity':'0'}).stop().animate({'opacity':'1'}, 300);			
			}
			else{
				$('.whislist-box.popup').addClass('active whislist-left').css({'right':'auto', 'left':$(this).offset().left, 'top':$(this).offset().top-winScr+15, 'opacity':'0'}).stop().animate({'opacity':'1'}, 300);			
			}
		}
		//if($(this).offset().left<100) $('.whislist-box.popup').addClass('left-align');
		//else if($(this).hasClass('header-functionality-entry') && $(this).closest('header.type-3').length) $('.whislist-box.popup').addClass('fixed-header-left');
		//else $('.whislist-box.popup').removeClass('left-align');
	});
	
	$('.open-whislist-popup').on('mouseleave', function(){
		closewhislistTimeout = setTimeout(function(){closePopups();}, 1000);
	});

	var closecartTimeout = 0;
	$('.whislist-box.popup').on('mouseover', function(){
		clearTimeout(closewhislistTimeout);
	});
	$('.whislist-box.popup').on('mouseleave', function(){
		closewhislistTimeout = setTimeout(function(){closePopups();}, 1000);
	});

	function closePopups(){
		$('.popup.active').animate({'opacity':'0'}, 300, function(){$(this).removeClass('active'); $('.whislist-box').removeClass('whislist-left whislist-right');});
	}

	/*main menu mouseover calculations*/
	// $('nav>ul>li').on('mouseover', function(){
	// 	var subFoo = $(this).find('.submenu');
	// 	if(subFoo.length) closePopups();
	// 	if(subFoo.length){
	// 		subFoo.removeClass('left-align right-align');
	// 		if(subFoo.offset().left<0) subFoo.addClass('left-align');
	// 		else if(subFoo.offset().left+subFoo.outerWidth()>winW) subFoo.addClass('right-align');
	// 	}
	// });

	/*departments dropdown (template "fullwidthheader")*/
	$('.departmets-drop-down .title').on('click', function(){
		$(this).parent().find('.list').slideToggle(300);
		$(this).toggleClass('active');
	});

	$('.departmets-drop-down').on('mouseleave', function(){
		$(this).find('.list').slideUp(300);
		$(this).find('.title').removeClass('active');
	});

	/*simple arrows slider*/
	var finishBannerSlider = 0;
    function leftClick(obj_clone, arrow){
        var obj = arrow.parent().parent().find(obj_clone);
        if (finishBannerSlider) return false;
        finishBannerSlider = 1;
        obj.last().clone(true).insertBefore(obj.first());
        obj.last().remove();
        var item_width = obj.outerWidth(true);
        obj.parent().css('left','-'+item_width+'px');
        obj.parent().animate({'left':'0px'},300, function(){finishBannerSlider=0;});
        return false;
    }
    
    function rightClick(obj_clone, arrow){
        var obj = arrow.parent().parent().find(obj_clone);
        if (finishBannerSlider) return false;
        finishBannerSlider = 1;
        obj.first().clone(true).insertAfter(obj.last());
        var item_width = obj.outerWidth(true);
        obj.parent().animate({'left':'-'+item_width+'px'},300, function(){
            obj.first().remove();
            obj.parent().css('left','0px');
            finishBannerSlider=0;
        });
        return false;
    }

    $('.menu-slider-arrows .left').on('click', function(){
    	leftClick('.menu-slider-entry', $(this));
    });

    $('.menu-slider-arrows .right').on('click', function(){
    	rightClick('.menu-slider-entry', $(this));
    });

    //product page - zooming image
    var imageObject = {};
    $('.product-zoom-container').on('mouseover', function(e){
    	var $t = $(this);
    	imageObject.thisW = $t.width();
    	imageObject.thisH = $t.height();
    	imageObject.zoomW = $t.find('.zoom-area').outerWidth();
    	imageObject.zoomH = $t.find('.zoom-area').outerHeight();
    	imageObject.thisOf = $t.offset();
    	zoomMousemove($(this), e);
    });

    function zoomMousemove(foo, e){
    	var $t = foo,
    		x = e.pageX - imageObject.thisOf.left,
    		y = e.pageY - imageObject.thisOf.top,
    		zoomX = x - imageObject.zoomW*0.5,
    		zoomY = y - imageObject.zoomH*0.5;
    	if(zoomX<0) zoomX = 0;
    	else if(zoomX+imageObject.zoomW>imageObject.thisW) zoomX = imageObject.thisW - imageObject.zoomW;
    	if(zoomY<0) zoomY = 0;
    	else if(zoomY+imageObject.zoomH>imageObject.thisH) zoomY = imageObject.thisH - imageObject.zoomH;
    	$t.find('.move-box').css({'left':x*(-2), 'top':y*(-2)});
    	$t.find('.zoom-area').css({'left':zoomX, 'top':zoomY});
    }

    $('.product-zoom-container').on('mousemove', function(e){
    	zoomMousemove($(this), e);
    });

    $('.product-zoom-container').on('click', function(){
    	$(this).animate({'opacity':'0'}, function(){$(this).removeClass('visible');});
    });

    $('.product-zoom-container').on('mouseleave', function(){
    	$(this).click();
    });

    //product page - selecting size, quantity, color
    $('.size-selector .entry').on('click', function(){
    	$(this).parent().find('.active').removeClass('active');
    	$(this).addClass('active');
    });

    $('.color-selector .entry').on('click', function(){
    	$(this).parent().find('.active').removeClass('active');
    	$(this).addClass('active');
    });

    $('.number-plus').on('click', function(){
    	var divUpd = $(this).parent().find('.number'), newVal = parseInt(divUpd.text(), 10)+1;
    	divUpd.text(newVal);
    });

    $('.number-minus').on('click', function(){
    	var divUpd = $(this).parent().find('.number'), newVal = parseInt(divUpd.text(), 10)-1;
    	if(newVal>=1) divUpd.text(newVal);
    });

    //accordeon
    $('.accordeon-title').on('click', function(){
    	$(this).toggleClass('active');
    	$(this).next().slideToggle();
    });
    //boton aceptar
        $('.accept-1').on('click', function(){
    	$('span.title-check-1').addClass('check');
    	return false;
    });
        $('.accept-1').on('click', function(){
    	$('.ae-1').hide();
    	$('.ae-2').show('slow');
    	return false;
    });
        $('.accept-2').on('click', function(){
    	$('span.title-check-2').addClass('check');
    	return false;
    });
        $('.accept-2').on('click', function(){
    	$('.ae-2').hide();
    	$('.ae-3').show('slow');
    	return false;
    });
        $('.accept-3').on('click', function(){
    	$('span.title-check-3').addClass('check');
    	return false;
    });
        $('.accept-3').on('click', function(){
    	$('.ae-3').hide();
    	$('.ae-4').show('slow');
    	return false;
    });
        $('.accept-4').on('click', function(){
    	$('span.title-check-4').addClass('check');
    	return false;
    });

    //Flujo login
    $('.forgot-pass').on('click', function(){
    	$('.login-msj-1').addClass('oculto');
    	$('.login-msj-2').removeClass('oculto');
    	return false;
    });
    $('.accept-pass').on('click', function(){
    	$('.login-msj-2').addClass('oculto');
    	$('.login-msj-3').removeClass('oculto');
    	return false;
    });
    $('.cancel-pass').on('click', function(){
    	$('.login-msj-2').addClass('oculto');
    	$('.login-msj-1').removeClass('oculto');
    	return false;
    });

    //open image popup
    $('.open-image').on('click', function(){
    	showPopup($('#image-popup'));
    	return false;
    });

    //open product popup
    $('.open-product').on('click', function(){
    	showPopup($('#product-popup'));
    	initSwiper();
    	return false;
    });

    //open login
    $('.open-login').on('click', function(){
    	showPopup($('#login-popup'));
    	initSwiper();
    	return false;
    });

    //open bienvenida

    $(document).ready(function(){
    	showPopup($('#bienvenida-popup'));
    	initSwiper();
    	return false;
    });

    $('.cerrar-modal').on('click', function(){
    	$('.overlay-popup.visible').removeClass('active');
    	setTimeout(function(){$('.overlay-popup.visible').removeClass('visible');}, 500);
    });


    $('.open-addcar').on('click', function(){
    	showPopup($('#add-car'));
    	initSwiper();
    	return false;
    });

    $('.open-confirmacion').on('click', function(){
    	showPopup($('#confirmacion'));
    	initSwiper();
    	return false;
    });

    $('.open-addwhislist').on('click', function(){
    	showPopup($('#add-wishlist'));
    	initSwiper();
    	return false;
    });

    //checkout
    $('a.apply').on('click', function(){
    	$('p.oculto').removeClass('oculto');
    	initSwiper();
    	return false;
    });

    //open comprobante de venta
    $('.open-comprobante').on('click', function(){
    	showPopup($('#add-comprobante'));
    	initSwiper();
    	return false;
    });
        //generar código
    $('.open-generar-cod').on('click', function(){
    	showPopup($('#add-generar-cod'));
    	initSwiper();
    	return false;
    });
       //imprimir cupon
    $('.open-imprimir').on('click', function(){
    	showPopup($('#add-imprimir'));
    	initSwiper();
    	return false;
    });

    //open gracias venta registrada
    $('.open-venta-reg').on('click', function(){
    	showPopup($('#add-venta-reg'));
    	initSwiper();
    	return false;
    });

    //open subscribe popup
    $('.open-subscribe').on('click', function(){
    	showPopup($('#subscribe-popup'));
    	$('#subscribe-popup .styled-form .field-wrapper input').focus();
    	return false;
    });

    $('.close-popup, .overlay-popup .close-layer').on('click', function(){
    	$('.overlay-popup.visible').removeClass('active');
    	setTimeout(function(){$('.overlay-popup.visible').removeClass('visible');}, 500);
    });


    $('.open-addcar').click(function(){
	    	$('#product-popup.overlay-popup.visible').removeClass('active');
    	setTimeout(function(){$('#product-popup.overlay-popup.visible').removeClass('visible');}, 500);
	    	return false;
    });

    $(document).ready(function() {
	  $("#mostrar-cod").click(function () {
	   $("#cog-generado").show()
	   $("#mostrar-cod").hide()
	  });
	 });

    function showPopup(id){
    	id.addClass('visible active');
    }

    //shop - sort arrow
    $('.sort-button').click(function(){
    	$(this).toggleClass('active');
    });

    //shop - view button
    $('.view-button.grid').click(function(){
    	if($(this).hasClass('active')) return false;
    	$('.shop-grid').fadeOut(function(){
    		$('.shop-grid').removeClass('list-view').addClass('grid-view');
    		$(this).fadeIn();
    	});
    	$(this).parent().find('.active').removeClass('active');
    	$(this).addClass('active');
    });

    $('.view-button.list').click(function(){
    	if($(this).hasClass('active')) return false;
    	$('.shop-grid').fadeOut(function(){
    		$('.shop-grid').removeClass('grid-view').addClass('list-view');
    		$(this).fadeIn();
    	});
    	$(this).parent().find('.active').removeClass('active');
    	$(this).addClass('active');
    });

    //close message
    $('.message-close').on('click', function(){
    	$(this).parent().hide();
    });

    //portfolio
    $('.portfolio-entry').on('mouseover', function(){
    	$(this).addClass('active');
    });

    $('.portfolio-entry').on('mouseleave', function(){
    	$(this).removeClass('active');
    });

    //simple search form focus
    $('.simple-search-form input').on('focus', function(){
    	$(this).closest('.simple-search-form').addClass('active');
    });

    $('.simple-search-form input').on('blur', function(){
    	$(this).closest('.simple-search-form').removeClass('active');
    });

});