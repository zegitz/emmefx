(function () {
    'use strict';

    angular.module('emmefxApp')
  .controller('homectrl', homectrl)
    homectrl.$inject = ['$window','$scope', '$rootScope', '$http','$localStorage', 'cssInjector','$interval',
    '$timeout']

    function homectrl($window,$scope, $rootScope, $http ,$localStorage, cssInjector, $interval, $timeout) {
		
		var $ctrl = this;
		$rootScope.storage =  $localStorage;

		if(!($rootScope.storage.auth == 1)){
			$localStorage.$reset();
			location.href = '#!/login';
		}
		cssInjector.add("/css/bootstrap.css");
		cssInjector.add("/css/font1.css");
		cssInjector.add("/css/font2.css");
		cssInjector.add("/css/font3.css");
		cssInjector.add("/css/line-awesome.css");
		cssInjector.add("/css/flag-icon.css");
		cssInjector.add("/css/pace.css");
		cssInjector.add("/css/customchartist.css");
		cssInjector.add("/css/chartist-plugin-tooltip.css");
		cssInjector.add("/css/bootstrap-extended.css");
		cssInjector.add("/css/colors.css");
		cssInjector.add("/css/components.css");
		cssInjector.add("/css/vertical-compact-menu.css");
		cssInjector.add("/css/cryptocoins.css");
		cssInjector.add("/css/timeline.css");
		cssInjector.add("/css/dashboard-ico.css");
		cssInjector.add("/css/angular-datatables.css");
	
	$ctrl.geragrafico = function(){
		   var verticalBar3 = new Chartist.Bar('#ico-token-supply-demand-chart', {
        labels: ['Q1 2018', 'Q2 2018', 'Q3 2018', 'Q4 2018', 'Q1 2019', 'Q2 2019', 'Q3 2019', 'Q4 2019', 'Q1 2020', 'Q2 2020', 'Q3 2020', 'Q4 2020'],
        series: [
            [4000, 7000, 5000, 2500, 5200, 4400, 7000, 4200, 7500, 2000, 3000, 5000],
        ]
    }, {
        axisY: {
            labelInterpolationFnc: function(value) {
                return (value / 1000) + 'k';
            },
			height: 10,
			offset: 40,
            scaleMinSpace: 20
			
        },
        axisX: {
            showGrid: true,
            labelInterpolationFnc: function(value, index) {
                return value;
            }
        },
        plugins: [
            Chartist.plugins.tooltip({
                appendToBody: true,
                pointClass: 'ct-point'
            })
        ]
    });
    verticalBar3.on('draw', function(data) {
        if (data.type === 'bar') {
            data.element.attr({
                style: 'stroke-width: 25px',
                y1: 250,
                x1: data.x1 + 0.001
            });
            data.group.append(new Chartist.Svg('circle', {
                cx: data.x2,
                cy: data.y2,
                r: 12
            }, 'ct-slice-pie'));
        }
    });
    verticalBar3.on('created', function(data) {
        var defs = data.svg.querySelector('defs') || data.svg.elem('defs');
        defs.elem('linearGradient', {
            id: 'barGradient3',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
        }).elem('stop', {
            offset: 0,
            'stop-color': 'rgb(255, 63, 45)'            
        }).parent().elem('stop', {
            offset: 1,
            'stop-color': 'rgb(254, 200, 0)'
        });
        return defs;
    });
	}
	$ctrl.geragrafico1 = function(){
		var chart = new Chartist.Pie('#token-distribution-chart', {
        // series: [10, 20, 50, 20, 5, 50, 15],
        series: [{
                "name": "Clientes 1",
                "className": "ct-crowdsale",
                "value": 5
            },
            {
                "name": "Clientes 2",
                "className": "ct-team",
                "value": 15
            },
            {
                "name": "Clientes 3",
                "className": "ct-advisors",
                "value": 25
            },
            {
                "name": "Clientes 4",
                "className": "ct-project-advisors",
                "value": 45
            },
            {
                "name": "Clientes 5",
                "className": "ct-masternodes",
                "value": 10
            },

        ],

        labels: ["Private Sale", "Pre Sale", "Start Sale", "Public Sale", "Team"]
    }, {
        donut: true,
        startAngle: 30,
        donutSolid: true,
        donutWidth: 50,
		plugins: [
            Chartist.plugins.tooltip({
                appendToBody: true,
                pointClass: 'ct-tooltip'
            })
        ],
        labelInterpolationFnc: function(value) {
            var total = chart.data.series.reduce(function(prev, series) {
                return prev + series.value;
            }, 0);
            return total + '%';
        }
    });

    chart.on('created', function() {
        var defs = chart.svg.elem('defs');

        defs.elem('linearGradient', {
            id: 'ct-crowdsale',
            x1: 0,
            y1: 1,
            x2: 0,
            y2: 0
        }).elem('stop', {
            offset: 0,
            'stop-color': '#2191ff'
        }).parent().elem('stop', {
            offset: 1,
            'stop-color': '#2abbfe'
        });

        defs.elem('linearGradient', {
            id: 'ct-team',
            x1: 0,
            y1: 1,
            x2: 0,
            y2: 0
        }).elem('stop', {
            offset: 0,
            'stop-color': '#892ffe'
        }).parent().elem('stop', {
            offset: 1,
            'stop-color': '#c37bfe'
        });

        defs.elem('linearGradient', {
            id: 'ct-advisors',
            x1: 0,
            y1: 1,
            x2: 0,
            y2: 0
        }).elem('stop', {
            offset: 0,
            'stop-color': '#6aecae'
        }).parent().elem('stop', {
            offset: 1,
            'stop-color': '#39d98c'
        });

        defs.elem('linearGradient', {
            id: 'ct-project-advisors',
            x1: 0,
            y1: 1,
            x2: 0,
            y2: 0
        }).elem('stop', {
            offset: 0,
            'stop-color': '#f19686'
        }).parent().elem('stop', {
            offset: 1,
            'stop-color': '#e85d44'
        });

        defs.elem('linearGradient', {
            id: 'ct-masternodes',
            x1: 0,
            y1: 1,
            x2: 0,
            y2: 0
        }).elem('stop', {
            offset: 0,
            'stop-color': '#e67ea5'
        }).parent().elem('stop', {
            offset: 1,
            'stop-color': '#fa679d'
        });

        defs.elem('linearGradient', {
            id: 'ct-program',
            x1: 0,
            y1: 1,
            x2: 0,
            y2: 0
        }).elem('stop', {
            offset: 0,
            'stop-color': '#99f3f3'
        }).parent().elem('stop', {
            offset: 1,
            'stop-color': '#33d4d8'
        });
    });
    chart.on('draw', function(data) {
        if (data.type === 'label') {
            if (data.index === 0) {
                data.element.attr({
                    dx: data.element.root().width() / 2,
                    dy: data.element.root().height() / 2
                });
            } else {
                data.element.remove();
            }
        }
    });
	}
	$ctrl.timeline =  function(){
		jQuery(document).ready(function($){
	var timelines = $('.cd-horizontal-timeline'),
		eventsMinDistance = 60;

	(timelines.length > 0) && initTimeline(timelines);

	function initTimeline(timelines) {
		timelines.each(function(){
			var timeline = $(this),
				timelineComponents = {};
			//cache timeline components 
			timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
			timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
			timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
			timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
			timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
			timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
			timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
			timelineComponents['eventsContent'] = timeline.children('.events-content');

			//assign a left postion to the single events along the timeline
			setDatePosition(timelineComponents, eventsMinDistance);
			//assign a width to the timeline
			var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
			//the timeline has been initialize - show it
			timeline.addClass('loaded');

			//detect click on the next arrow
			timelineComponents['timelineNavigation'].on('click', '.next', function(event){
				event.preventDefault();
				updateSlide(timelineComponents, timelineTotWidth, 'next');
			});
			//detect click on the prev arrow
			timelineComponents['timelineNavigation'].on('click', '.prev', function(event){
				event.preventDefault();
				updateSlide(timelineComponents, timelineTotWidth, 'prev');
			});
			//detect click on the a single event - show new event content
			timelineComponents['eventsWrapper'].on('click', 'a', function(event){
				event.preventDefault();
				timelineComponents['timelineEvents'].removeClass('selected');
				$(this).addClass('selected');
				updateOlderEvents($(this));
				updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
				updateVisibleContent($(this), timelineComponents['eventsContent']);
			});

			//on swipe, show next/prev event content
			timelineComponents['eventsContent'].on('swipeleft', function(){
				var mq = checkMQ();
				( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'next');
			});
			timelineComponents['eventsContent'].on('swiperight', function(){
				var mq = checkMQ();
				( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'prev');
			});

			//keyboard navigation
			$(document).keyup(function(event){
				if(event.which=='37' && elementInViewport(timeline.get(0)) ) {
					showNewContent(timelineComponents, timelineTotWidth, 'prev');
				} else if( event.which=='39' && elementInViewport(timeline.get(0))) {
					showNewContent(timelineComponents, timelineTotWidth, 'next');
				}
			});
		});
	}

	function updateSlide(timelineComponents, timelineTotWidth, string) {
		//retrieve translateX value of timelineComponents['eventsWrapper']
		var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
			wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
		//translate the timeline to the left('next')/right('prev') 
		(string == 'next') 
			? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth)
			: translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
	}

	function showNewContent(timelineComponents, timelineTotWidth, string) {
		//go from one event to the next/previous one
		var visibleContent =  timelineComponents['eventsContent'].find('.selected'),
			newContent = ( string == 'next' ) ? visibleContent.next() : visibleContent.prev();

		if ( newContent.length > 0 ) { //if there's a next/prev event - show it
			var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
				newEvent = ( string == 'next' ) ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');
			
			updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
			updateVisibleContent(newEvent, timelineComponents['eventsContent']);
			newEvent.addClass('selected');
			selectedDate.removeClass('selected');
			updateOlderEvents(newEvent);
			updateTimelinePosition(string, newEvent, timelineComponents);
		}
	}

	function updateTimelinePosition(string, event, timelineComponents) {
		//translate timeline to the left/right according to the position of the selected event
		var eventStyle = window.getComputedStyle(event.get(0), null),
			eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
			timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
			timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
		var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

        if( (string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < - timelineTranslate) ) {
        	translateTimeline(timelineComponents, - eventLeft + timelineWidth/2, timelineWidth - timelineTotWidth);
        }
	}

	function translateTimeline(timelineComponents, value, totWidth) {
		var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
		value = (value > 0) ? 0 : value; //only negative translate value
		value = ( !(typeof totWidth === 'undefined') &&  value < totWidth ) ? totWidth : value; //do not translate more than timeline width
		setTransformValue(eventsWrapper, 'translateX', value+'px');
		//update navigation arrows visibility
		(value == 0 ) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
		(value == totWidth ) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
	}

	function updateFilling(selectedEvent, filling, totWidth) {
		//change .filling-line length according to the selected event
		var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
			eventLeft = eventStyle.getPropertyValue("left"),
			eventWidth = eventStyle.getPropertyValue("width");
		eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', ''))/2;
		var scaleValue = eventLeft/totWidth;
		setTransformValue(filling.get(0), 'scaleX', scaleValue);
	}

	function setDatePosition(timelineComponents, min) {
		for (var i = 0; i < timelineComponents['timelineDates'].length; i++) { 
		    var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
		    	distanceNorm = Math.round(distance/timelineComponents['eventsMinLapse']) + 2;
		    timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm*min+'px');
		}
	}

	function setTimelineWidth(timelineComponents, width) {
		var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length-1]),
			timeSpanNorm = timeSpan/timelineComponents['eventsMinLapse'],
			timeSpanNorm = Math.round(timeSpanNorm) + 4,
			totalWidth = timeSpanNorm*width;
		timelineComponents['eventsWrapper'].css('width', totalWidth+'px');
		updateFilling(timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents['fillingLine'], totalWidth);
		updateTimelinePosition('next', timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents);
	
		return totalWidth;
	}

	function updateVisibleContent(event, eventsContent) {
		var eventDate = event.data('date'),
			visibleContent = eventsContent.find('.selected'),
			selectedContent = eventsContent.find('[data-date="'+ eventDate +'"]'),
			selectedContentHeight = selectedContent.height();

		if (selectedContent.index() > visibleContent.index()) {
			var classEnetering = 'selected enter-right',
				classLeaving = 'leave-left';
		} else {
			var classEnetering = 'selected enter-left',
				classLeaving = 'leave-right';
		}

		selectedContent.attr('class', classEnetering);
		visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			visibleContent.removeClass('leave-right leave-left');
			selectedContent.removeClass('enter-left enter-right');
		});
		eventsContent.css('height', selectedContentHeight+'px');
	}

	function updateOlderEvents(event) {
		event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
	}

	function getTranslateValue(timeline) {
		var timelineStyle = window.getComputedStyle(timeline.get(0), null),
			timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
         		timelineStyle.getPropertyValue("-moz-transform") ||
         		timelineStyle.getPropertyValue("-ms-transform") ||
         		timelineStyle.getPropertyValue("-o-transform") ||
         		timelineStyle.getPropertyValue("transform");

        if( timelineTranslate.indexOf('(') >=0 ) {
        	var timelineTranslate = timelineTranslate.split('(')[1];
    		timelineTranslate = timelineTranslate.split(')')[0];
    		timelineTranslate = timelineTranslate.split(',');
    		var translateValue = timelineTranslate[4];
        } else {
        	var translateValue = 0;
        }

        return Number(translateValue);
	}

	function setTransformValue(element, property, value) {
		element.style["-webkit-transform"] = property+"("+value+")";
		element.style["-moz-transform"] = property+"("+value+")";
		element.style["-ms-transform"] = property+"("+value+")";
		element.style["-o-transform"] = property+"("+value+")";
		element.style["transform"] = property+"("+value+")";
	}

	//based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
	function parseDate(events) {
		var dateArrays = [];
		events.each(function(){
			var singleDate = $(this),
				dateComp = singleDate.data('date').split('T');
			if( dateComp.length > 1 ) { //both DD/MM/YEAR and time are provided
				var dayComp = dateComp[0].split('/'),
					timeComp = dateComp[1].split(':');
			} else if( dateComp[0].indexOf(':') >=0 ) { //only time is provide
				var dayComp = ["2000", "0", "0"],
					timeComp = dateComp[0].split(':');
			} else { //only DD/MM/YEAR
				var dayComp = dateComp[0].split('/'),
					timeComp = ["0", "0"];
			}
			var	newDate = new Date(dayComp[2], dayComp[1]-1, dayComp[0], timeComp[0], timeComp[1]);
			dateArrays.push(newDate);
		});
	    return dateArrays;
	}

	function daydiff(first, second) {
	    return Math.round((second-first));
	}

	function minLapse(dates) {
		//determine the minimum distance among events
		var dateDistances = [];
		for (var i = 1; i < dates.length; i++) { 
		    var distance = daydiff(dates[i-1], dates[i]);
		    dateDistances.push(distance);
		}
		return Math.min.apply(null, dateDistances);
	}

	/*
		How to tell if a DOM element is visible in the current viewport?
		http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	*/
	function elementInViewport(el) {
		var top = el.offsetTop;
		var left = el.offsetLeft;
		var width = el.offsetWidth;
		var height = el.offsetHeight;

		while(el.offsetParent) {
		    el = el.offsetParent;
		    top += el.offsetTop;
		    left += el.offsetLeft;
		}

		return (
		    top < (window.pageYOffset + window.innerHeight) &&
		    left < (window.pageXOffset + window.innerWidth) &&
		    (top + height) > window.pageYOffset &&
		    (left + width) > window.pageXOffset
		);
	}

	function checkMQ() {
		//check if mobile or desktop device
		return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}
});
	}
	
	$ctrl.appmenu = function() {
		/*=========================================================================================
  File Name: app-menu.js
  Description: Menu navigation, custom scrollbar, hover scroll bar, multilevel menu
  initialization and manipulations
  ----------------------------------------------------------------------------------------
  Item Name: Crypto ICO - Cryptocurrency Website Landing Page HTML + Dashboard Template
  Version: 1.0
  Author: Pixinvent
  Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/
(function(window, document, $) {
  'use strict';

  $.app = $.app || {};

  var $body       = $('body');
  var $window     = $( window );

  // Main menu
  $.app.menu = {
    expanded: null,
    collapsed: null,
    hidden : null,
    container: null,
    horizontalMenu: false,

    manualScroller: {
      obj: null,

      init: function() {
        var scroll_theme = ($('.main-menu').hasClass('menu-dark')) ? 'light' : 'dark';
        this.obj = $(".main-menu-content").perfectScrollbar({
          suppressScrollX: true,
          theme: scroll_theme
        });
      },

      update: function() {
        if (this.obj) {
          // Scroll to currently active menu on page load if data-scroll-to-active is true
          if($('.main-menu').data('scroll-to-active') === true){
              var position;
              if( $(".main-menu-content").find('li.active').parents('li').length > 0 ){
                position = $(".main-menu-content").find('li.active').parents('li').last().position();
              }
              else{
                position = $(".main-menu-content").find('li.active').position();
              }
              setTimeout(function(){
                // $.app.menu.container.scrollTop(position.top);
                if(position !== undefined){
                  $.app.menu.container.stop().animate({scrollTop:position.top}, 300);
                }
                $('.main-menu').data('scroll-to-active', 'false');
              },300);
          }
          $(".main-menu-content").perfectScrollbar('update');
        }
      },

      enable: function() {
        this.init();
      },

      disable: function() {
        if (this.obj) {
          $('.main-menu-content').perfectScrollbar('destroy');
        }
      },

      updateHeight: function(){
        if( ($body.data('menu') == 'vertical-menu' || $body.data('menu') == 'vertical-menu-modern' || $body.data('menu') == 'vertical-overlay-menu' ) && $('.main-menu').hasClass('menu-fixed')){
          $('.main-menu-content').css('height', $(window).height() - $('.header-navbar').height() - $('.main-menu-header').outerHeight() - $('.main-menu-footer').outerHeight() );
          this.update();
        }
      }
    },

    init: function(compactMenu) {
      if($('.main-menu-content').length > 0){
        this.container = $('.main-menu-content');

        var menuObj = this;
        var defMenu = '';

        if(compactMenu === true){
          defMenu = 'collapsed';
        }

        this.change(defMenu);
      }
    },

    change: function(defMenu) {
      var currentBreakpoint = Unison.fetch.now(); // Current Breakpoint

      this.reset();

      var menuType = $body.data('menu');

      if (currentBreakpoint) {
        switch (currentBreakpoint.name) {
          case 'xl':
          case 'lg':
            if(menuType === 'vertical-overlay-menu'){
              this.hide();
            }
            else if(menuType === 'vertical-compact-menu'){
              this.open();
            }
            else{
              if(defMenu === 'collapsed')
                this.collapse(defMenu);
              else
                this.expand();
            }
            break;
          case 'md':
            if(menuType === 'vertical-overlay-menu'){
              this.hide();
            }
            else if(menuType === 'vertical-compact-menu'){
              this.open();
            }
            else{
              this.collapse();
            }
            break;
          case 'sm':
            this.hide();
            break;
          case 'xs':
            this.hide();
            break;
        }
      }

      // On the small and extra small screen make them overlay menu
      if(menuType === 'vertical-compact-menu'){
        this.toOverlayMenu(currentBreakpoint.name);
      }


      // Added data attribute brand-center for navbar-brand-center
      // TODO:AJ: Shift this feature in PUG.
      if($('.header-navbar').hasClass('navbar-brand-center')){
        $('.header-navbar').attr('data-nav','brand-center');
      }
      if(currentBreakpoint.name == 'sm' || currentBreakpoint.name == 'xs'){
        $('.header-navbar[data-nav=brand-center]').removeClass('navbar-brand-center');
      }else{
        $('.header-navbar[data-nav=brand-center]').addClass('navbar-brand-center');
      }

      // Dropdown submenu on small screen on click
      // --------------------------------------------------
      $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
        if($(this).siblings('ul.dropdown-menu').length > 0){
          event.preventDefault();
        }
        event.stopPropagation();
        $(this).parent().siblings().removeClass('show');
        $(this).parent().toggleClass('show');
      });
    },

    transit: function(callback1, callback2) {
      var menuObj = this;
      $body.addClass('changing-menu');

      callback1.call(menuObj);

      if($body.hasClass('vertical-layout')){
        if($body.hasClass('menu-open') || $body.hasClass('menu-expanded')){
          $('.menu-toggle').addClass('is-active');

          // Show menu header search when menu is normally visible
          if( $body.data('menu') === 'vertical-menu' || $body.data('menu') === 'vertical-content-menu'){
            if($('.main-menu-header')){
              $('.main-menu-header').show();
            }
          }
        }
        else{
          $('.menu-toggle').removeClass('is-active');

          // Hide menu header search when only menu icons are visible
          if( $body.data('menu') === 'vertical-menu' || $body.data('menu') === 'vertical-content-menu'){
            if($('.main-menu-header')){
              $('.main-menu-header').hide();
            }
          }
        }
      }

      setTimeout(function() {
        callback2.call(menuObj);
        $body.removeClass('changing-menu');

        menuObj.update();
      }, 500);
    },

    open: function() {
      this.transit(function() {
        $body.removeClass('menu-hide menu-collapsed').addClass('menu-open');
        this.hidden = false;
        this.expanded = true;
      }, function() {
        if(!$('.main-menu').hasClass('menu-native-scroll') && $('.main-menu').hasClass('menu-fixed') ){
          this.manualScroller.enable();
          $('.main-menu-content').css('height', $(window).height() - $('.header-navbar').height() - $('.main-menu-header').outerHeight() - $('.main-menu-footer').outerHeight() );
          // this.manualScroller.update();
        }
      });
    },

    hide: function() {

      this.transit(function() {
        $body.removeClass('menu-open menu-expanded').addClass('menu-hide');
        this.hidden = true;
        this.expanded = false;
      }, function() {
        if(!$('.main-menu').hasClass('menu-native-scroll') && $('.main-menu').hasClass('menu-fixed')){
          this.manualScroller.enable();
        }
      });
    },

    expand: function() {
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

    collapse: function(defMenu) {
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

    toOverlayMenu: function(screen){
      var menu = $body.data('menu');
      if(screen == 'sm' || screen == 'xs'){
        if($body.hasClass(menu)){
          $body.removeClass(menu).addClass('vertical-overlay-menu');
        }
        if(menu == 'vertical-content-menu'){
          $('.main-menu').addClass('menu-fixed');
        }
      }
      else{
        if($body.hasClass('vertical-overlay-menu')){
          $body.removeClass('vertical-overlay-menu').addClass(menu);
        }
        if(menu == 'vertical-content-menu'){
          $('.main-menu').removeClass('menu-fixed');
        }
      }
    },

    toggle: function() {
      var currentBreakpoint = Unison.fetch.now(); // Current Breakpoint
      var collapsed = this.collapsed;
      var expanded = this.expanded;
      var hidden = this.hidden;
      var menu = $body.data('menu');

      switch (currentBreakpoint.name) {
        case 'xl':
        case 'lg':
        case 'md':
          if(expanded === true){
            if(menu == 'vertical-compact-menu' || menu == 'vertical-overlay-menu'){
              this.hide();
            }
            else{
              this.collapse();
            }
          }
          else{
            if(menu == 'vertical-compact-menu' || menu == 'vertical-overlay-menu'){
              this.open();
            }
            else{
              this.expand();
            }
          }
          break;
        case 'sm':
          if (hidden === true) {
            this.open();
          } else {
            this.hide();
          }
          break;
        case 'xs':
          if (hidden === true) {
            this.open();
          } else {
            this.hide();
          }
          break;
      }
    },

    update: function() {
      this.manualScroller.update();
    },

    reset: function() {
      this.expanded  = false;
      this.collapsed = false;
      this.hidden    = false;
      $body.removeClass('menu-hide menu-open menu-collapsed menu-expanded');
    },
  };

  // Navigation Menu
  $.app.nav = {
    container: $('.navigation-main'),
    initialized : false,
    navItem: $('.navigation-main').find('li').not('.navigation-category'),

    config: {
      speed: 300,
    },

    init: function(config) {
      this.initialized = true; // Set to true when initialized
      $.extend(this.config, config);

      this.bind_events();
    },

    bind_events: function() {
      var menuObj = this;

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
    },

    /**
     * Ensure an admin submenu is within the visual viewport.
     * @param {jQuery} $menuItem The parent menu item containing the submenu.
     */
    adjustSubmenu: function ( $menuItem ) {
      var menuHeaderHeight, menutop, topPos, winHeight,
      bottomOffset, subMenuHeight, popOutMenuHeight, borderWidth, scroll_theme,
      $submenu = $menuItem.children('ul:first'),
      ul = $submenu.clone(true);

      menuHeaderHeight = $('.main-menu-header').height();
      menutop          = $menuItem.position().top;
      winHeight        = $window.height();
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
    },

    collapse: function($listItem, callback) {
      var $subList = $listItem.children('ul');

      $subList.show().slideUp($.app.nav.config.speed, function() {
        $(this).css('display', '');

        $(this).find('> li').removeClass('is-shown');

        if (callback) {
          callback();
        }

        $.app.nav.container.trigger('collapsed.app.menu');
      });
    },

    expand: function($listItem, callback) {
      var $subList  = $listItem.children('ul');
      var $children = $subList.children('li').addClass('is-hidden');

      $subList.hide().slideDown($.app.nav.config.speed, function() {
        $(this).css('display', '');

        if (callback) {
          callback();
        }

        $.app.nav.container.trigger('expanded.app.menu');
      });

      setTimeout(function() {
        $children.addClass('is-shown');
        $children.removeClass('is-hidden');
      }, 0);
    },

    refresh: function() {
      $.app.nav.container.find('.open').removeClass('open');
    },
  };

})(window, document, jQuery);
	}
	
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
	$ctrl.geragrafico();
	$ctrl.geragrafico1();
	$ctrl.timeline();
	$ctrl.app();
	 }, 500);
	
 });
	
	}})();	
