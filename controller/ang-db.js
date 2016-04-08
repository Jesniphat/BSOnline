var db = angular.module('db', []);
db.service('dbSvc', ['$rootScope', '$window', '$q', '$filter', '$http',
  function($rootScope, $window, $q, $filter, $http){
    var request = function(action, param) {
      var deferred = $q.defer();
      var url = 'api/api.php';
      //var url = 'www.kapook.com';
      $http.post(url + '/' + action, param).then(function(response) {
        //console.log('data=', response.data);
        deferred.resolve(response.data);
      }, function() {
        deferred.reject(false);
      });
      return deferred.promise;
    }
    this.request = request;
}]);
