(function () {
    'use strict';

    angular.module('emmefxApp')
  .controller('buyctrl', buyctrl);

    buyctrl.$inject =  ['$window','$scope', '$rootScope', '$http', 'cssInjector','$interval',
    '$timeout']

    function buyctrl($window,$scope, $rootScope, $http , cssInjector, $interval, $timeout) {
		
		var $ctrl = this;

		cssInjector.add("/css/bootstrap.css");
		cssInjector.add("/css/font1.css");
		cssInjector.add("/css/font2.css");
		cssInjector.add("/css/font3.css");
		cssInjector.add("/css/line-awesome.css");
		cssInjector.add("/css/flag-icon.css");
		cssInjector.add("/css/pace.css");
		cssInjector.add("/css/bootstrap-extended.css");
		cssInjector.add("/css/colors.css");
		cssInjector.add("/css/components.css");
		cssInjector.add("/css/vertical-compact-menu.css");
		cssInjector.add("/css/cryptocoins.css");
		cssInjector.add("/css/buy-ico.css");
		
		$ctrl.app = function(){
      var menuObj = this;
	  var $body       = $('body');
	  var windowEl = angular.element($window); 
	  
	  menuObj.expand = function() {
      if (this.expanded === false) {
        if( $body.data('menu') == 'vertical-menu-modern' ){
          $('.modern-nav-toggle').find('.toggle-icon')
          .removeClass('ft-toggle-left').addClass('ft-toggle-right');

          // Code for localStorage
          if (typeof(Storage) !== "undefined") {
            localStorage.setItem("menuLocked", "true");
          }
        }
        /*if( $body.data('menu') == 'vertical-menu' || $body.data('menu') == 'vertical-menu-modern'){
          this.changeLogo('expand');
        }*/
        this.transit(function() {
          $body.removeClass('menu-collapsed').addClass('menu-expanded');
          this.collapsed = false;
          this.expanded = true;

        });
      }
    },

	  menuObj.collapse = function(defMenu) {
      if (this.collapsed === false) {
        if( $body.data('menu') == 'vertical-menu-modern' ){
          $('.modern-nav-toggle').find('.toggle-icon')
          .removeClass('ft-toggle-right').addClass('ft-toggle-left');

          // Code for localStorage
          if (typeof(Storage) !== "undefined") {
            localStorage.setItem("menuLocked", "false");
          }
        }
        this.transit(function() {
          $body.removeClass('menu-expanded').addClass('menu-collapsed');
          this.collapsed = true;
          this.expanded  = false;

        });
      }
    },

	  
	   menuObj.adjustSubmenu = function( $menuItem ) {
      var menuHeaderHeight, menutop, topPos, winHeight,
      bottomOffset, subMenuHeight, popOutMenuHeight, borderWidth, scroll_theme,
      $submenu = $menuItem.children('ul:first'),
      ul = $submenu.clone(true);

      menuHeaderHeight = $('.main-menu-header').height();
      menutop          = $menuItem.position().top;
      winHeight        = windowEl.height();
      borderWidth      = 0;
      subMenuHeight    = $submenu.height();

      if(parseInt($menuItem.css( "border-top" ),10) > 0){
        borderWidth = parseInt($menuItem.css( "border-top" ),10);
      }

      popOutMenuHeight = winHeight - menutop - $menuItem.height() - 30;
      scroll_theme     = ($('.main-menu').hasClass('menu-dark')) ? 'light' : 'dark';

      if($body.data('menu') === 'vertical-compact-menu'){
        topPos = menutop + borderWidth;
        popOutMenuHeight = winHeight - menutop - 30;
      }
      else if($body.data('menu') === 'vertical-content-menu'){
        topPos = menutop + $menuItem.height() + borderWidth;
        popOutMenuHeight = winHeight - $('.content-header').height() -$menuItem.height() - menutop - 60;
      }
      else{
        topPos = menutop + $menuItem.height() + borderWidth;
      }
      
      if($body.data('menu') == 'vertical-content-menu'){
        ul.addClass('menu-popout').appendTo('.main-menu-content').css({
          'top' : topPos,
          'position' : 'fixed',
        });
      }
      else{
        ul.addClass('menu-popout').appendTo('.main-menu-content').css({
          'top' : topPos,
          'position' : 'fixed',
          'max-height': popOutMenuHeight,
        });

        $('.main-menu-content > ul.menu-content').perfectScrollbar({
          theme:scroll_theme,
        });
      }
    }
	
      $('.navigation-main').on('mouseenter.app.menu', 'li', function() {
        var $this = $(this);
        $('.hover', '.navigation-main').removeClass('hover');
        if( ($body.hasClass('menu-collapsed') && $body.data('menu') != 'vertical-menu-modern') || ($body.data('menu') == 'vertical-compact-menu' && !$body.hasClass('vertical-overlay-menu')) ){
          $('.main-menu-content').children('span.menu-title').remove();
          $('.main-menu-content').children('a.menu-title').remove();
          $('.main-menu-content').children('ul.menu-content').remove();

          // Title
          var menuTitle = $this.find('span.menu-title').clone(),
          tempTitle,
          tempLink;
          if(!$this.hasClass('has-sub') ){
            tempTitle = $this.find('span.menu-title').text();
            tempLink = $this.children('a').attr('href');
            if(tempTitle !== ''){
              menuTitle = $("<a>");
              menuTitle.attr("href", tempLink);
              menuTitle.attr("title", tempTitle);
              menuTitle.text(tempTitle);
              menuTitle.addClass("menu-title");
            }
          }
          // menu_header_height = ($('.main-menu-header').length) ? $('.main-menu-header').height() : 0,
          // fromTop = menu_header_height + $this.position().top + parseInt($this.css( "border-top" ),10);
          var fromTop;
          if($this.css( "border-top" )){
            fromTop = $this.position().top + parseInt($this.css( "border-top" ), 10);
          }
          else{
            fromTop = $this.position().top;
          }
          if($body.data('menu') !== 'vertical-compact-menu'){
            menuTitle.appendTo('.main-menu-content').css({
              position:'fixed',
              top : fromTop,
            });
          }

          // Content
          if($this.hasClass('has-sub') && $this.hasClass('nav-item')) {
            var menuContent = $this.children('ul:first');
            menuObj.adjustSubmenu($this);
          }
        }
        $this.addClass('hover');
      }).on('mouseleave.app.menu', 'li', function() {
        // $(this).removeClass('hover');
      }).on('active.app.menu', 'li', function(e) {
        $(this).addClass('active');
        e.stopPropagation();
      }).on('deactive.app.menu', 'li.active', function(e) {
        $(this).removeClass('active');
        e.stopPropagation();
      }).on('open.app.menu', 'li', function(e) {

        var $listItem = $(this);
        $listItem.addClass('open');

        menuObj.expand($listItem);

        // If menu collapsible then do not take any action
        if ($('.main-menu').hasClass('menu-collapsible')) {
          return false;
        }
        // If menu accordion then close all except clicked once
        else{
          $listItem.siblings('.open').find('li.open').trigger('close.app.menu');
          $listItem.siblings('.open').trigger('close.app.menu');
        }

        e.stopPropagation();
      }).on('close.app.menu', 'li.open', function(e) {
        var $listItem = $(this);

        $listItem.removeClass('open');
        menuObj.collapse($listItem);

        e.stopPropagation();
      }).on('click.app.menu', 'li', function(e) {
        var $listItem = $(this);
        if($listItem.is('.disabled')){
          e.preventDefault();
        }
        else{
          if( ($body.hasClass('menu-collapsed') && $body.data('menu') != 'vertical-menu-modern')  || ($body.data('menu') == 'vertical-compact-menu' && $listItem.is('.has-sub') && !$body.hasClass('vertical-overlay-menu'))){
            e.preventDefault();
          }
          else{
            if ($listItem.has('ul')) {
              if ($listItem.is('.open')) {
                $listItem.trigger('close.app.menu');
              } else {
                $listItem.trigger('open.app.menu');
              }
            } else {
              if (!$listItem.is('.active')) {
                $listItem.siblings('.active').trigger('deactive.app.menu');
                $listItem.trigger('active.app.menu');
              }
            }
          }
        }

        e.stopPropagation();
      });


      $('.navbar-header, .main-menu').on('mouseenter',modernMenuExpand).on('mouseleave',modernMenuCollapse);

      function modernMenuExpand(){
        if( $body.data('menu') == 'vertical-menu-modern'){
          $('.main-menu, .navbar-header').addClass('expanded');
          if($body.hasClass('menu-collapsed')){
            var $listItem = $('.main-menu li.menu-collapsed-open'),
            $subList = $listItem.children('ul');

            $subList.hide().slideDown(200, function() {
                $(this).css('display', '');
            });

            $listItem.addClass('open').removeClass('menu-collapsed-open');
            // $.app.menu.changeLogo('expand');
          }
        }
      }

      function modernMenuCollapse(){
        if($body.hasClass('menu-collapsed') && $body.data('menu') == 'vertical-menu-modern'){
          setTimeout(function(){
            if($('.main-menu:hover').length === 0 && $('.navbar-header:hover').length === 0){

              $('.main-menu, .navbar-header').removeClass('expanded');
              if($body.hasClass('menu-collapsed')){
                var $listItem = $('.main-menu li.open'),
                $subList = $listItem.children('ul');
                $listItem.addClass('menu-collapsed-open');

                $subList.show().slideUp(200, function() {
                    $(this).css('display', '');
                });

                $listItem.removeClass('open');
                // $.app.menu.changeLogo();
              }
            }
          },1);
        }
      }
	  
      $('.main-menu-content').on('mouseleave', function(){
        if( $body.hasClass('menu-collapsed') || $body.data('menu') == 'vertical-compact-menu' ){
          $('.main-menu-content').children('span.menu-title').remove();
          $('.main-menu-content').children('a.menu-title').remove();
          $('.main-menu-content').children('ul.menu-content').remove();
        }
        $('.hover', '.navigation-main').removeClass('hover');
      });

      // If list item has sub menu items then prevent redirection.
      $('.navigation-main li.has-sub > a').on('click',function(e){
        e.preventDefault();
      });

      $('ul.menu-content').on('click', 'li', function(e) {
        var $listItem = $(this);
        if($listItem.is('.disabled')){
          e.preventDefault();
        }
        else{
          if ($listItem.has('ul')) {
            if ($listItem.is('.open')) {
              $listItem.removeClass('open');
              menuObj.collapse($listItem);
            } else {
              $listItem.addClass('open');

              menuObj.expand($listItem);

              // If menu collapsible then do not take any action
              if ($('.main-menu').hasClass('menu-collapsible')) {
                return false;
              }
              // If menu accordion then close all except clicked once
              else{
                $listItem.siblings('.open').find('li.open').trigger('close.app.menu');
                $listItem.siblings('.open').trigger('close.app.menu');
              }

              e.stopPropagation();
            }
          } else {
            if (!$listItem.is('.active')) {
              $listItem.siblings('.active').trigger('deactive.app.menu');
              $listItem.trigger('active.app.menu');
            }
          }
        }
		
        e.stopPropagation();
      });
	};
	
	$scope.$on('$viewContentLoaded', function(event){
		$timeout(function() {
$ctrl.app();
	 }, 500);
		});
		
		
	}
	})();
	
	
