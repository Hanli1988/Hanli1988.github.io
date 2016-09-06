'use strict';

// Declare app level module which depends on views, and components
angular.module('appModule', [
	'config',
	'ui.router',
	'listModule.controller',
	'detailModule.controller',
	'crossModule'
]).controller("appController",['$scope',function ($scope) {
    $scope.change=function(){};
	$scope.$on('list-to-app', function (event,fn) {
		$scope.change=fn;
	})
	$scope.search="";
    $scope.$watch('search',function(){
		$scope.change($scope.search)
	})
}])
	.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
 $stateProvider.
	 state('list',{
		 url:'/list/:type',
		 templateUrl:'./areas/list/list.html',
		 controller:'listController'
	 })
	 .state('detail',{
		 url:'/detail/:type',
		 templateUrl:'./areas/detail/detail.html',
		 controller:'detailController'
	 })
		$urlRouterProvider.otherwise('/list/in_theaters')
}]);
