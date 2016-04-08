angular.module('test_code',[

]).controller('myCtrl', ['$rootScope','$scope','dbSvc', function($rootScope,$scope,dbSvc) {
  $rootScope.jes_root = 'my test root';
  $scope.name = '';
  $scope.lastName = '';

  $scope.set = function(){
    var param = {
      name:$scope.name,
      lastName:$scope.lastName
    };
    console.log(param);
    dbSvc.request('xxx', param).then(function(result) {
      if (result.status===true){
        console.log(result);
      }else{
        console.log("NO!!");;
      }
    });
  }
}]).controller('myCtrl2', ['$scope', '$rootScope', '$state', '$stateParams', '$q','dbSvc',
function($scope, $rootScope, $state, $stateParams, $q, dbSvc) {
  $scope.myroot = $rootScope.jes_root;
  $scope.filtered = [];
  $scope.pageSize = 5;
  $scope.keyword = '';
  $scope.currentPage = 1;
  $scope.tb = [{id:'1',o:'sss',t:'ggg'},
               {id:'2',o:'qqq',t:'zzz'},
               {id:'3',o:'www',t:'xxx'},
               {id:'4',o:'eee',t:'ccc'},
               {id:'5',o:'rrr',t:'vvv'},
               {id:'6',o:'ttt',t:'bbb'},
               {id:'7',o:'yyy',t:'nnn'},
               {id:'8',o:'uuu',t:'mmm'},
               {id:'9',o:'iii',t:'jjj'},
               {id:'10',o:'oo',t:'kkk'}];
  $scope.ss1 = '';
  $scope.ss2 = '';

  $scope.addss = function(){
    var param = {
      ss1: $scope.ss1,
      ss2: $scope.ss2,
    };
    dbSvc.request('session', param).then(function(result) {
      if (result.status===true){
        console.log(result);
        console.log(result.param);
      }else{
        console.log("NO!!");;
      }
    });
  }

  $scope.check = function(){
    dbSvc.request('unset', {}).then(function(result) {
      if (result.status===true){
        console.log(result);
        console.log("มาแล้ววววว");
      }else{
        console.log("NO!!");;
      }
    });
  }

  $scope.checkjq = function(){
    console.log("JQ");
    var x = $("#name").val();
    console.log(x);
  }
}]);
