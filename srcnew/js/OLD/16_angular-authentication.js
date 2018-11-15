(function (window, angular, undefined) {
    'use strict';

    angular.module('Authentication', ['ngCookies'])

        .service('$authentication', ['$cookieStore','$location','$rootScope', function ($cookieStore,$location,$rootScope) {
            var $authService = this;

            //$cookieStore.put("authentication",$estruturaPadraoInfo); //FORCE LOGOUT

            $authService.data = (!$cookieStore.get("authentication") ? {logado: false, user: {admin: false}} : $cookieStore.get("authentication"));

            //console.log("Authentication data:",$authService.data);

            $authService.verificaLogin = function () {
                if (!$authService.data.logado) {
                    $authService.logout();
                }
            };

            $authService.login = function ($userInfo, $redirect) {
                if ($authService.data.user.account_status && $userInfo.account_block_payment_pending) {
                    $location.path('/order/list');
                }
                $authService.data.logado = true;
                $authService.data.user = angular.extend($authService.data.user, ($userInfo == "undefined" ? {} : $userInfo));
                //console.log($authService.data.user,$userInfo);
                $cookieStore.put("authentication",$authService.data);
                if ($("#rs-wrapper").data('backstretch')) {
                     $("#rs-wrapper").backstretch("destroy", 0);
                    $("#rs-wrapper").data('backstretch','');
                }
                if ($redirect != "undefined" && $redirect) {
                    document.location.href = config.authentication.url.login;
                }
            };

            $authService.logout = function ($redirect) {
                console.log("AuthService Logout");
                 $("#rs-wrapper").backstretch("assets/img/bg.jpg");
                delete $storage.loginInformation;
				$rootScope.$localStorage.$reset();
                $authService.data = {logado: false, user: {admin: false}};
                var elementsShowLogado = angular.element(document).find(".logado");
                // console.log(elementsShowLogado);
                elementsShowLogado.css("display", 'none');
                $cookieStore.put("authentication",$authService.data);
                if ($redirect != "undefined" && $redirect) {
                    document.location.href = config.authentication.url.login;
                }
            };


        }]);

})(window, window.angular);
