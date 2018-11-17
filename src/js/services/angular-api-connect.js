(function (window, angular, undefined) {
    'use strict';

    angular.module('ApiConnect', ['Authentication'])

        .service('$api', ['$http','$authentication', '$MessageGlogalService', function ($http, $authentication, $MessageGlogalService) {
            var apiService = this;
            apiService.loading = false;
            apiService.requests = {};

            apiService.totalRequest = function () {
                var total = 0;
                angular.forEach(apiService.requests, function () {
                    total++;
                });
                return total;
            };

            apiService.clearRequests = function () {
                apiService.requests = {};
                return apiService;
            };

            apiService.deleteRequest = function ($endpoint) {
                delete apiService.requests[$endpoint];
                apiService.loading = false;
                return apiService;
            };

            apiService.addRequest = function ($endpoint, $parametros, $callback) {
                var $request = apiService.requests[$endpoint] = {};
                $request['parametros'] = $parametros;
                $request['callback'] = $callback;
                return apiService;
            };

            apiService.request = function ($endpoint, $parametros, $callBack) {
                    apiService.loading = true;

                    if (!apiService.totalRequest()) {
                        console.log("Api connect: não existe requisições.");
                        return;
                    }

                    /*
                     xsrfHeaderName – {string} – Name of HTTP header to populate with the XSRF token.
                     xsrfCookieName
                    */

                    var $requests = apiService.requests;
                    this.clearRequests();
                    var $data = {'data':{}};

                    angular.forEach($requests, function ($infoRequest, $endpoint) {
                        $data['data'][$endpoint] = $infoRequest['parametros'];
                    });

                    var $url = config.api.path;
                    try {
                        $http({method: 'POST', url: $url, params: "", data: $data, /*xsrfHeaderName: 'XSRF-TOKEN', xsrfCookieName: 'XSRF-TOKEN', */withCredentials: true}).
                        success(function (data, status, headers, config, statusText) {
                            apiService.processReceiveData($requests, data, status, headers, config, statusText);
                            apiService.loading = false;
                        }).
                        error(function (data, status, headers, config, statusText) {
                            apiService.processReceiveData($requests, data, status, headers, config, statusText);
                            apiService.loading = false;
                        });
                    }catch (err) {
                        apiService.loading = false;
                    }

            };

            apiService.processReceiveData = function (requests, data, status, headers, config, statusText) {

                switch (status) {
                    default: //ERROR CONEXAO
                        if (typeof $storage.loginInformation != "undefined") {
                            window.history.back();
                        }
                        $MessageGlogalService.add('Please, try again.', 'error', false);
                        //$authentication.logout(true);
                        // $scope.$broadcast('addMessageGlobal', {msg: "No internet connection.", tipo: "error"});
                        break;
                    case 200: //ok
                            console.log('API Request:',requests,'API Response:',data);
                            angular.forEach(data['data'],function ($data, $endpoint) {
                                requests[$endpoint]['callback']($data,requests[$endpoint]['parametros']);
                            });
                        break;

                    case 403: //proibido
                        $authentication.logout(true);
                        return;
                        break;

                    case 400: //bad
                    case 500: //internal error
                        //$authentication.logout(true);
                        break;
                }

                angular.forEach(data['data'],function ($data, $endpoint) {
                    delete apiService.requests[$endpoint];
                });

                //console.log(data); console.log(status); //DEBUG
            };


        }]);

})(window, window.angular);
