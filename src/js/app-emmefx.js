(function () {
    'use strict';

    var emmefxApp = angular.module('emmefxApp', ['ui.router','ApiConnect','ultimateDataTableServices','chartistAngularDirective','menuToogle','ngStorage','ngResource','toastr']);
    emmefxApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider  ) {


        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'loginctrl'
            })
				
			.state('monitor-ea', {
                url: '/monitor-ea',
                templateUrl: 'views/monitorea.html',
                controller: 'monitorEaCtrl'
            })

            .state('monitor-funds', {
                url: '/monitor-funds',
                templateUrl: 'views/monitorfunds.html',
                controller: 'monitorFundsCtrl'
            })

            .state('monitor-vps', {
                url: '/monitor-vps',
                templateUrl: 'views/monitorvps.html',
                controller: 'monitorVpsCtrl'
            })

            .state('monitor-traders', {
                url: '/monitor-traders',
                templateUrl: 'views/monitortraders.html',
                controller: 'monitorTradersCtrl'
            })
			
			.state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'homectrl'
            })
			
			.state('users', {
                url: '/users',
                templateUrl: 'views/users.html',
                controller: 'usersctrl'
            })
			
			.state('newuser', {
                url: '/newuser',
                templateUrl: 'views/newuser.html',
                controller: 'newuserctrl'
            })
			
			.state('edituser', {
                url: '/edituser/:id',
                templateUrl: 'views/edituser.html',
                controller: 'edituserctrl'
            })
		
			.state('accounts', {
                url: '/accounts',
                templateUrl: 'views/accounts.html',
                controller: 'accountsctrl'
            })

            .state('newaccount', {
                url: '/newaccount',
                templateUrl: 'views/newaccount.html',
                controller: 'newaccountctrl'
            })

            .state('editaccount', {
                url: '/editaccount',
                templateUrl: 'views/editaccount.html',
                controller: 'editaccountctrl'
            })
			
			.state('clients', {
                url: '/clients',
                templateUrl: 'views/clients.html',
                controller: 'clientsctrl'
            })

            .state('newclient', {
                url: '/newclient',
                templateUrl: 'views/newclient.html',
                controller: 'newclientctrl'
            })

            .state('editclient', {
                url: '/editclient',
                templateUrl: 'views/editclient.html',
                controller: 'editclientctrl'
            })

            .state('vps', {
                url: '/vps',
                templateUrl: 'views/vps.html',
                controller: 'vpsctrl'
            })

            .state('newvps', {
                url: '/newvps',
                templateUrl: 'views/newvps.html',
                controller: 'newvpsctrl'
            })

            .state('editvps', {
                url: '/editvps',
                templateUrl: 'views/editvps.html',
                controller: 'editvpsctrl'
            })
			
			
			
    });
	emmefxApp.config(['$qProvider', function($qProvider){
   $qProvider.errorOnUnhandledRejections(false);

}]);
	emmefxApp.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = true;
}]);
    emmefxApp.run(['$rootScope', 
    function ($rootScope) {

       

    }]);
	
})();
