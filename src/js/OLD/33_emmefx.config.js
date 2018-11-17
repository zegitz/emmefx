'use strict';

angular.module('emmefxApp')
  .constant('apiUrl', 'https://api.xprocapital.com/api')
  .constant('mocksPath', '/service/json-complete')
  .constant('userInfoRequestRate', 120) // In seconds
  .constant('smLoader', "../images/loading.gif") // smallLoader
  .constant('lgLoader', "../images/loader.gif") // large loader