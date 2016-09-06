/**
 * Created by lenovo on 2016/9/3.
 */
angular.module('detailModule.controller',['detailModule.service'])
	.controller('detailController',['$scope','$stateParams','detailFactory',function($scope,$stateParams,detailFactory){
		$scope.details={
			id:$stateParams.type
		};

		$scope.getData=function(){
			detailFactory.getData($scope.details.id,function(data){
				$scope.data = data;
				console.log($scope.data);
				$scope.$apply();
			});
		}
		$scope.getData();



	}])

