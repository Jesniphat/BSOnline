angular.module('productSite',[])
.controller('productCtrl', ['$rootScope','$scope','$state','$stateParams','$q','dbSvc','ngDialog', 
  function($rootScope,$scope,$state,$stateParams,$q,dbSvc,ngDialog) {
  console.log($rootScope);
  console.log("Product");
  var menuId = $('.menu');

  for (i=0; i<menuId.length; i++){
    $('#'+menuId[i].id).css('background','');
    if(menuId[i].id == 'product'){
      $('#'+menuId[i].id).css('background','#1b9bff');
    }
  }
  
  $scope.productLists = [];
  $scope.filtered = [];
  $scope.pageSize = 6;
  $scope.keyword = '';
  $scope.searchText = "";
  $scope.currentPage = 1;
  $scope.pageNumber = [];
  $scope.numPages = 1;

  $scope.castegoryLists = [];
  $scope.categoryDropDown = '-1';
  $scope.categoryId = '-1';

  var oldKeyword = '';
  $scope.doChangeKeyword = function() {
      if (oldKeyword != $scope.keyword) {
      oldKeyword = $scope.keyword;
      $scope.numPages = Math.ceil($scope.filtered.length/$scope.pageSize);
      $scope.pageNumber = [];
        for (var i = 1; i <= $scope.numPages; i++) {
          $scope.pageNumber.push(i);
        };
        console.log($scope.pageNumber);
      if ($scope.currentPage > $scope.numPages) {
          $scope.currentPage = $scope.numPages;
      }
      $scope.searchText = $scope.keyword;
      console.log('change');
    }
  }

 
  dbSvc.request('categoryList', {id:'-1'}).then(function(result) {
    if (result.status === true){
      for (i in result.category){
        var x = {"id":result.category[i].id,"name":result.category[i].name_th};
        $scope.castegoryLists.push(x);
      }
    }
    console.log($scope.castegoryLists);
  });

  $scope.refresh = function() {
    var param = {
      'cateId': $scope.categoryId
    };

    dbSvc.request('getProductList',param).then(function(result) {
      if (result.status === true){
        $scope.productLists = result.product;
        console.log($scope.productLists);
        $scope.numPages = Math.ceil($scope.productLists.length/$scope.pageSize);
        $scope.pageNumber = [];
        for (var i = 1; i <= $scope.numPages; i++) {
          $scope.pageNumber.push(i);
        };
        console.log($scope.pageNumber);
      } else {
        console.log('error');
      }
    });
  }

  $scope.refresh();

  $scope.changeCat = function(){
    console.log($scope.categoryDropDown);
    $scope.categoryId = $scope.categoryDropDown;
    $scope.refresh();
  }

  $scope.setQty = function(prodCode){
    console.log(prodCode);
    $scope.prodCode = prodCode;
    ngDialog.open({ 
      template: 'view/set_qty.html', 
      controller: 'SetProductQty',
      scope:$scope,
    });
  }

}])
.controller('SetProductQty', ['$scope', 'dbSvc', function($scope, dbSvc) {
    console.log($scope.prodCode);
     
}])
.controller('productEditCtrl', ['$rootScope','$scope','$state','$stateParams','$q','dbSvc',
  function($rootScope,$scope,$state,$stateParams,$q,dbSvc){
  console.log('Product Edit');

  var menuId = $('.menu');
  for (i=0; i<menuId.length; i++){
    $('#'+menuId[i].id).css('background','');
    if(menuId[i].id == 'product'){
      $('#'+menuId[i].id).css('background','#1b9bff');
    }
  }

  $scope.product = {};
  $scope.castegoryLists = [];
  $scope.categorySelect = "2";
  $scope.newCategory = "";
  $scope.canChangeCat = true;
  $scope.showAddNewCat = true;

  console.log($stateParams.productId);
  if ($stateParams.productId == "non"){
    $scope.canChangeCat = false;
  } else {
    $scope.canChangeCat = true;
  }

  $scope.setCategory = function(){
    if ($scope.categorySelect == "-1") {
      $scope.showAddNewCat = true;
    } else {
      $scope.showAddNewCat = false;
      $scope.newCategory = "";
    }
  }

  $scope.setCategory();

  dbSvc.request("categoryList", {id:"0"}).then(function(result) {
    if (result.status === true){
      console.log(result.category);
      var newCat = {"id":"-1","name":"เพิ่มหมวดหมู่สินค้าใหม่"};
      $scope.castegoryLists.push(newCat);
      for (i in result.category){
        var x = {"id":result.category[i].id,"name":result.category[i].name_th};
        $scope.castegoryLists.push(x);
      }
    }
    console.log($scope.castegoryLists);
  });

  $scope.checkDialog = function() {
    console.log('Dialog');
    $('#dlg').dialog({title:'เพิ่มสินค้า',modal:true, width:600, height:400});
  }

  $scope.isValid = function(){
    if($scope.categorySelect=="-1" && $scope.newCategory == ""){
      return true;
    }
    if($scope.product.productName == "" || $scope.product.productName == undefined){
      return true;
    }
    if($scope.product.productPrice == "" || $scope.product.productPrice == undefined){
      return true;
    }
    return false;
  }

  $scope.saveProduct = function() {
    console.log($scope.product.productDescription);
    // var testArray = [{"id":1,"name":"jestest1","ts":1},
    //                  {"id":2,"name":"jestest2","ts":2}];
    var param = {
      "categoryId":$scope.categorySelect,
      "newCategory":$scope.newCategory,
      "productName":$scope.product.productName,
      "productPrice":$scope.product.productPrice,
      "productDescription":$scope.product.productDescription,
      "productId":$stateParams.productId,
      //"ttt":testArray,
    };
    console.log(param);
    if($stateParams.productId=="non"){
        dbSvc.request("saveProduct", param).then(function(result) {
        if (result.status === true){
          console.log("save sucess");
        }
      });
    }
  }

}]);
