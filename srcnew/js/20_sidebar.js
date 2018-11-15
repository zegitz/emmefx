var app = angular.module('menuToogle', []);

app.directive('sidebarToggle',sidebarToggle);
sidebarToggle.$inject = ['$window','$compile'];
function sidebarToggle($window, $compile, $timeout) {
	return {
		restrict: 'AE',
		link: link 
	};
	  function link(scope,iElement) {
		  scope.element = iElement[0];
		  scope.body = angular.element('#menulot');
		  scope.element.addEventListener("click", function() {
				
				if (scope.body.hasClass('menu-hide')){
					scope.body.removeClass('menu-hide');
					scope.body.removeClass('vertical-overlay-menu');
					scope.body.addClass('menu-open');
					scope.body.addClass('vertical-compact-menu');
				}else{
					scope.body.removeClass('menu-open');
					scope.body.removeClass('vertical-compact-menu');
					scope.body.addClass('menu-hide');
					scope.body.addClass('vertical-overlay-menu');
				}	
			});
	  }
};

app.directive('sidebarToggleMobile',sidebarToggleMobile);
sidebarToggleMobile.$inject = ['$window','$compile'];
function sidebarToggleMobile($window, $compile, $timeout) {
	return {
		restrict: 'AE',
		link: link 
	};
	  function link(scope,iElement) {
		  scope.element = iElement[0];
		  scope.body = angular.element('#menulot');
		  scope.element.addEventListener("click", function() {
				
				if (scope.body.hasClass('menu-hide')){
					scope.body.removeClass('menu-hide');
					scope.body.removeClass('vertical-compact-menu');
					scope.body.addClass('menu-open');
					scope.body.addClass('vertical-overlay-menu');
				}else{
					scope.body.removeClass('menu-open');
					scope.body.removeClass('vertical-overlay-menu');
					scope.body.addClass('menu-hide');
					scope.body.addClass('vertical-compact-menu');
				}	
			});
			
	  }
};

app.directive('resize', resize);
resize.$inject = ['$window','$compile'];
function resize($window,$compile) {

     return {
        link: link,
        restrict: 'A'
     };

     function link(scope, element, attrs){
       scope.body = angular.element('#menulot');
       scope.width = $window.innerWidth;
		 if($window.innerWidth <768){
			scope.body.removeClass('menu-open');
			scope.body.addClass('menu-hide');
			scope.body.removeClass('vertical-compact-menu');
			scope.body.addClass('vertical-overlay-menu');
		 }
       angular.element($window).bind('resize', function(){
       
		if($window.innerWidth <768){
			scope.body.removeClass('menu-open');
			scope.body.addClass('menu-hide');
			scope.body.removeClass('vertical-compact-menu');
			scope.body.addClass('vertical-overlay-menu');
		 }
		 if($window.innerWidth >=768){
			scope.body.removeClass('menu-hide');
			scope.body.addClass('menu-open');
			scope.body.removeClass('vertical-overlay-menu');
			scope.body.addClass('vertical-compact-menu');
		 }
       });

     }

 };

app.directive('ajustebody', ajustebody); 
ajustebody.$inject = ['$window','$compile'];
function ajustebody($window,$compile) {

     return {
        link: link,
        restrict: 'E'
     };

     function link(scope, element, attrs){
       scope.body = angular.element('#menulot');

			scope.body.removeClass('1-column');
			scope.body.addClass('2-columns');
			scope.body.removeClass('bg-full-screen-image');
			//scope.body.addClass('menu-open');
			scope.body.removeClass('blank-page');
			scope.body.addClass('fixed-navbar');
			scope.body.attr('data-col','2-columns');
			if($window.innerWidth >=768){	
			scope.body.addClass('menu-open');
			}		
     }

 };

app.directive('search', search); 
search.$inject = ['$window','$compile'];
function search($window,$compile) {

     return {
        link: link,
        restrict: 'AE'
     };
function link(scope,iElement) {
		  scope.element = iElement[0];
		  scope.input = angular.element('#search');
		  scope.element.addEventListener("click", function() {
			  
			  if (scope.input.hasClass('open')){
			  scope.input.removeClass('open');
			  }else{
				scope.input.addClass('open');
			  }
     });
	}
 };
 
app.directive('countdown', countdown);
countdown.$inject = ['Util','$interval'];
function countdown (Util, $interval) {
            return {
                restrict: 'A',
                link: function (scope,element) {
                    var future;
                    future = 20;
					scope.timer = angular.element('#timer15');
                    contador = $interval(function () {
                        //var diff;
						//diff = Math.floor(future);
						future = future - 1;
						if(future <=15){
						 scope.timer.removeClass('badge-success');
						 scope.timer.addClass('badge-danger');
						}
						if(future <=0){
						 $interval.cancel(contador);
						}
                        return element.text(Util.dhms(future));
						
                    }, 1000);
					
                }
            };
        };

app.factory('Util', [function () {
            return {
                dhms: function (t) {
                    var days, hours, minutes, seconds,msg;
                    days = Math.floor(t / 86400);
                    t -= days * 86400;
                    hours = Math.floor(t / 3600) % 24;
                    t -= hours * 3600;
                    minutes = Math.floor(t / 60) % 60;
                    t -= minutes * 60;
                    seconds = t % 60;
					
					if(seconds<=9){seconds ='0'+seconds;}
					msg = minutes+':'+seconds;
					if(t <=0){ msg = 'Timeout';}
					
                    return [
                        msg 
                    ].join(' ');
                }
            };
        }]);

		