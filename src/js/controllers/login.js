(function () {
    'use strict';

    angular.module('emmefxApp')
    .controller('loginctrl',loginctrl);
	
	loginctrl.$inject = ['$window','$scope', '$rootScope','$http','$interval',
    '$timeout','$localStorage','$resource','toastr']

    function loginctrl($window,$scope, $rootScope, $http , $interval, $timeout,$localStorage, $resource, toastr ) {
		
		var $ctrl = this;
		$scope.userlogin = [];
		$rootScope.storage = $localStorage;
		
//		cssInjector.add("/css/bootstrap.css");
//		cssInjector.add("/css/font1.css");
//		cssInjector.add("/css/font2.css");
//		cssInjector.add("/css/font3.css");
//		cssInjector.add("/css/line-awesome.css");
//		cssInjector.add("/css/flag-icon.css");
//		cssInjector.add("/css/pace.css");
//		cssInjector.add("/css/custom.css");
//		cssInjector.add("/css/bootstrap-extended.css");
//		cssInjector.add("/css/colors.css");
//		cssInjector.add("/css/components.css");
//		cssInjector.add("/css/vertical-compact-menu.css");
//		cssInjector.add("/css/cryptocoins.css")
//		cssInjector.add("/css/account-login.css");
//		cssInjector.add("/css/angular-toastr.css");
		
		var addressApi = "http://netpdm.com.br:83/api";

	$scope.submitLogin = function(){
		
	 $http({
        url: addressApi+'/user/login',
        method: "POST",
		headers: {
		'Content-Type': "application/json;charset=utf-8"
		},
        data: {
		"email" : $scope.userlogin.email,
		"password" : $scope.userlogin.password
		}
				
    })
    .then(function(response) {
            if(response.data.auth == 1){
				location.href = '#!/home';
				$rootScope.dataUsuario = response.data;
			$rootScope.storage = $localStorage.$default(response.data);
			toastr.success("Seja Bem Vindo "+ response.data.username, 'Autenticação Ok!');
			
			}else{
				toastr.error("Verifique sua Senha.", 'Erro de Autenticação!');
			}
    }, 
    function(response) { // optional
             console.log(response);
    });
 };
	
	
	
	}
})();