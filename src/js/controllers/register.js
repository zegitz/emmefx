(function () {
    'use strict';

    angular.module('emmefxApp')

  .controller('registerctrl', registerctrl);

    registerctrl.$inject =  ['$window','$scope', '$rootScope', '$http', 'cssInjector','$interval',
    '$timeout']

    function registerctrl($window,$scope, $rootScope, $http , cssInjector, $interval, $timeout) {
		
		var $ctrl = this;

		cssInjector.add("/css/bootstrap.css");
		cssInjector.add("/css/font1.css");
		cssInjector.add("/css/font2.css");
		cssInjector.add("/css/font3.css");
		cssInjector.add("/css/line-awesome.css");
		cssInjector.add("/css/flag-icon.css");
		cssInjector.add("/css/pace.css");
		cssInjector.add("/css/chartist.css");
		cssInjector.add("/css/chartist-plugin-tooltip.css");
		cssInjector.add("/css/bootstrap-extended.css");
		cssInjector.add("/css/colors.css");
		cssInjector.add("/css/components.css");
		cssInjector.add("/css/vertical-compact-menu.css");
		cssInjector.add("/css/cryptocoins.css");
		cssInjector.add("/css/timeline.css");
		cssInjector.add("/css/account-register.css");
		
		
		
	}})();
	
	