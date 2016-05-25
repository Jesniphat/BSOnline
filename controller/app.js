var my_app = angular.module('myApp', ['ui.router','ngRoute','ngSanitize','db','sidebar','productSite','ngDialog','attributeAdjust']);

my_app.filter('startFrom', function() {
  return function(input, start) {
    //console.log(input, start);
    start = +start; //parse to int
    return input.slice(start);
  }
});

my_app.config(function($stateProvider, $urlRouterProvider){
  // For any unmatched url, send to /route1
  $urlRouterProvider.otherwise("/home")
  $stateProvider
    .state("home", {
        url: "^/home",
        templateUrl: "view/home.html"
    })
    .state("product", {
        url: "^/product",
        templateUrl: "view/product.html",
        controller: "productCtrl",
      })
    .state("product_edit", {
        url: "^/product_edit/:productId",
        templateUrl: "view/product_edit.html",
        controller: "productEditCtrl",
      })
    .state("attribute", {
        url: "^/attribute",
        templateUrl: "view/attribute.html",
        controller: "attributeCtrl",
      })
    .state("attribute_edit", {
        url: "^/attribute/:attributeId",
        templateUrl: "view/attribute_edit.html",
        controller: "attributeEditCtrl",
      });
});

// my_app.config(function($routeProvider){
//   $routeProvider.when("/home",{
//     templateUrl: "view/home.html"
//   }).when("/product",{
//     templateUrl: "view/product.html",
//     controller: "productCtrl"
//   }).when("/attribute",{
//     templateUrl: "view/attribute.html",
//     controller: "attributeCtrl"
//   })
// });


// my_app.controller('SetProductQty', ['$scope', 'dbSvc', function($scope, dbSvc) {
//     console.log($scope.prodCode);

// }]);
