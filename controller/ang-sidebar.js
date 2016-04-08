angular.module('sidebar',[])
.controller('sidebar_controller', ['$rootScope','$scope','$state','$stateParams','$q','dbSvc', 
  function($rootScope,$scope,$state,$stateParams,$q,dbSvc) {
  console.log($rootScope);
  console.log("sidebar");
  var menuId = $('.menu');
  var dropDownMenu = $('.dropmenu');
  // console.log(menuId);
  
  $('#home').css('background','#1b9bff');

  $scope.menuClick = function(idName){
    for (i=0; i<menuId.length; i++){
      $('#'+menuId[i].id).css('background','');
      if(menuId[i].id == idName){
        $('#'+menuId[i].id).css('background','#1b9bff');
      }
    }

    for (j=0; j<dropDownMenu.length; j++){
      $('#'+dropDownMenu[j].id).css('background','');
      if(dropDownMenu[j].id == idName){
        $('#'+dropDownMenu[j].id).css('background','#1b9bff');
      }
    }
  }

}]);
