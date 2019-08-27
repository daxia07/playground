// @codekit-prepend "vendor/jstween-1.2.min.js";

var ehd = {

	mobileview: false,
	currRow: 0,

	el: {
		doc: $(document),
		html: $('html'),
		body: $('body'),
		footer: $('.footer'),
		card: $('.grid-styles'),
		externalLinks: $('.external'),
		scrollPagination: $('.scroll-pagination'),
		cover: $('.cover'),
		masthead: $('.masthead'),
		toggleMobileButton: $('#mobilenav'),
		articleImages: $('.article_body p > img'),
		statements: $('.card-statement .card__content')
	},
	env: {
		isMac: navigator.platform.toLowerCase().indexOf('mac') > -1,
	    isChrome: navigator.userAgent.indexOf('Chrome') > -1,
	    isSafari: navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') == -1,
	    // isIE: $.browser.msie,
	    // isFirefox: $.browser.mozilla,
	    isiOS: (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false),
	    isAndroid: (navigator.userAgent.indexOf('android') > -1)
	},
	init: function() {
		ehd.bindUIActions();
		ehd.styleCards();
		ehd.mobileMasthead();
		ehd.el.articleImages.unwrap();
		ehd.el.externalLinks.attr('target','_blank');
		ehd.detectPaginationScroll(ehd.el.scrollPagination);

		// JS ENABLED
		ehd.el.html.removeClass('no-js');

		var animateLoop;
		var rows = $('.loading, .grid_card');
		var total_rows = rows.length;
		var animateRow = function(){
			rows.eq(ehd.currRow).removeClass('loading');
			ehd.currRow = ehd.currRow + 1;
			if(ehd.currRow == total_rows) {
				clearInterval(animateLoop);
			}
		}
		setTimeout(function(){
			animateLoop = setInterval(animateRow, 200);
		}, 1000);

		if(ehd.el.statements.length > 1) {
			setInterval(function(){
				var container = $('.card-statement .card__inner');
				var image = $('.card-statement img');

				container.animate({
					opacity: 0
				}, 600)
				image.animate({
					opacity: 0
				}, 600, function(){

					var curr = ehd.el.statements.not('.hidden').index();
					var next = curr + 1;
					if(next >= ehd.el.statements.length - 1) {
						next = 0;
					}
					var el =  ehd.el.statements.eq(next).find('.card-headline');
					image.attr('src', el.data('icon'));
					image.attr('alt', el.text());

					ehd.el.statements.eq(curr).addClass('hidden');
					ehd.el.statements.eq(next).removeClass('hidden');
					container.animate({
						opacity: 1
					}, 600);
					image.animate({
						opacity: 1
					}, 600);
					
				})
			}, 10000);
		}

	},
	bindUIActions: function() {
		ehd.el.toggleMobileButton.on('click', ehd.toggleMobileNav);
	},
	toggleMobileNav: function(event) {
		event.preventDefault();
		var mobileMenu = $('.nav.mobile');
			mobileMenu.toggleClass('open');
	},
	rotateStatements: function() {

		statements

	},
	mobileMasthead: function(){
		var browserWidth = ehd.getScreenWidth();
		if(browserWidth <= 862) {
			if(ehd.mobileview == false) {
				ehd.mobileview = true;
				ehd.el.masthead.find('.nav').clone().addClass('mobile').appendTo(ehd.el.masthead);
				ehd.el.masthead.find('.nav.mobile li.mobile').remove();
			}
		} else {
			ehd.el.masthead.find('.nav.mobile').remove();
			ehd.mobileview = false;
		}
	},
	styleCards: function() {
		ehd.el.card.each(function(){
			var el = $(this);
			el.css({
				'background-color' : el.attr('data-bkgcolor'),
				'color' : el.attr('data-txtcolor')
			})
			el.find('a').css({
				'border-color' : el.attr('data-txtcolor'),
				'color' : el.attr('data-txtcolor')
			})
		})
	},
	detectPaginationScroll: function(target) {
		var el = ehd.el.scrollPagination;
		var footerH = ehd.el.footer.outerHeight();
		var windowH = $(document).height() - ehd.getScreenHeight();
		var scrollH = windowH - footerH;
		var scrollPos = (ehd.getScrollPosition() - (ehd.getScreenHeight()/2));
		if(scrollPos <= scrollH) {
			el.addClass('fixed');
		} else {
			el.removeClass('fixed');
		}
		if(scrollPos <= 0) {
			el.addClass('top')
		} else {
			el.removeClass('top')
		}

	},
	getScreenWidth: function() {
		return $(window).width();
	},
	getScreenHeight: function() {
		return $(window).height();
	},
	getScrollPosition: function() {
		return $(window).scrollTop();
	}
}
$(window).scroll(function(){
   ehd.detectPaginationScroll(ehd.el.scrollPagination);
})
$(window).resize(function() {
	ehd.el.body.addClass('preload');
	$.data( this, 'scrollCheck', setTimeout(function() {
		ehd.el.body.removeClass('preload');
	}, 250) );
	ehd.styleCards();
	ehd.mobileMasthead();
});
$(function() {
	ehd.init();
})