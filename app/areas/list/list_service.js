/**
 * Created by lenovo on 2016/9/3.
 */
angular.module('listModule.service',[])
	.factory('listFactory',['$http','configConstant','crossService',function($http,configConstant,crossService){
		return {
			getData:function(objParams,type,fn){

				var url=configConstant.SERVER_PATH+"/v2/movie/"+type;

				crossService.jsonp(url,objParams,function(data){
					fn(data);
				})

			},
			searchData: function (objParams,fn) {
				var url=configConstant.SERVER_PATH+"/v2/movie/search";
				console.log("bbbb");
				crossService.jsonp(url,objParams,function(data){
					fn(data);
				})
			}
		}

	}])

