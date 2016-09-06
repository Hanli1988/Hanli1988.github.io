/**
 * Created by lenovo on 2016/9/3.
 */
angular.module('detailModule.service',[])
	.factory('detailFactory',['$http','configConstant','crossService',function($http,configConstant,crossService){
		return {
			getData:function(id,fn){

				var url=configConstant.SERVER_PATH+"/v2/movie/subject/"+id;

				crossService.jsonp(url,{},function(data){
					fn(data);
				})

			}
		}

	}])


