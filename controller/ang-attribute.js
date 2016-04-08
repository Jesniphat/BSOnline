angular.module('attributeAdjust',[])
.controller('attributeCtrl', ['$rootScope','$scope','$state','$stateParams','$q','dbSvc','ngDialog',
	function($rootScope,$scope,$state,$stateParams,$q,dbSvc,ngDialog) {
		console.log('attribute');
		  var menuId = $('.menu');
		  for (i=0; i<menuId.length; i++){
		    $('#'+menuId[i].id).css('background','');
		    if(menuId[i].id == 'attribute'){
		      $('#'+menuId[i].id).css('background','#1b9bff');
		    }
		  }

		console.log("KO!");

	}])
.controller("attributeEditCtrl", ["$rootScope","$scope","$state","$stateParams","$q","dbSvc","ngDialog", 
	function($rootScope,$scope,$state,$stateParams,$q,dbSvc,ngDialog) {
		console.log("Edit attribute");
		  var menuId = $('.menu');
		  for (i=0; i<menuId.length; i++){
		    $('#'+menuId[i].id).css('background','');
		    if(menuId[i].id == 'attribute'){
		      $('#'+menuId[i].id).css('background','#1b9bff');
		    }
		  }

		$scope.attribute = {};
		$scope.attribute.attributeList = [];
		$scope.attributeListMaster = {
			id:"",
			name:"",
			date:""
		};
		$scope.attributeList = {};

		// $scope.member.contacts.push(angular.copy($scope.contact));

		console.log($stateParams.attributeId);

		$scope.addList = function() {
			console.log("Add List");
			$scope.attributeList.id = "";
			$scope.attributeList.name = $scope.attribute.attributeDetail;
			$scope.attributeList.price = $scope.attribute.attributeDetailPrice;

			$scope.attribute.attributeList.push(angular.copy($scope.attributeList));
			$scope.attribute.attributeDetail = "";
			$scope.attribute.attributeDetailPrice = "";
		}

		$scope.saveAttribute = function() {
			console.log('Save');
			console.log($scope.attribute);
			var data = $scope.attribute;
			dbSvc.request("saveAttribute", data).then(function(result) {
			    if (result.status === true){
				    
			    }
			    console.log($scope.castegoryLists);
			});
		}

		$scope.cutDetail = function(cut) {
			$scope.attribute.attributeList.splice(cut, 1);
		}

	}]);

