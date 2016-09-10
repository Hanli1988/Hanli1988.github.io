/**
 * Created by lenovo on 2016/9/3.
 */
angular.module('listModule.controller',['listModule.service'])
.controller('listController',['$scope','$stateParams','listFactory',function($scope,$stateParams,listFactory){

		 $scope.moviesList={};
		 $scope.loading=true;

		$scope.page={
			type:$stateParams.type,
			count:5,
			start:0,
			current:1,
			totalCount:0,
			totalPage:0,
			city:"上海"
		}
		  $scope.goForward=function(){

			  if($scope.page.current <= $scope.page.totalPage){

				  return false;
			  }

			  $scope.page.current++;
			  $scope.getData();
		  }
		  $scope.goBack=function(){
			  if($scope.page.current<=1){
				  return false;
			  }
			  $scope.page.current--;
			  $scope.getData();
		  }
          $scope.getData=function(){
		  $scope.loading=true;
			  listFactory.getData({city:"上海",count:5,start:$scope.page.count*($scope.page.current-1)},$scope.page.type,function(data){
			  $scope.moviesList=data;

			  $scope.loading=false;
			  $scope.page.totalCount=data.total;
			  $scope.page.tatalPage=Math.ceil(data.total/$scope.page.count);
				//强制数据同步更新到页面
			  $scope.$apply();
		  });
	  }
      $scope.searchData=function(search){
		  	$scope.loading=true;
		  listFactory.searchData({q:search,count:5,start:$scope.page.count*($scope.page.current-1)},function(data){
			  $scope.moviesList=data;

			  $scope.loading=false;
			  $scope.page.totalCount=data.total;
			  $scope.page.totalPage=Math.ceil(data.total/$scope.page.count)
			  $scope.$apply();
		  });
	  }

		$scope.getData();

		$scope.$emit("list-to-app",$scope.searchData);

	}])
	.filter('myFilter',function(){
		return function(input){
			return input.join('、')
		}
	})
