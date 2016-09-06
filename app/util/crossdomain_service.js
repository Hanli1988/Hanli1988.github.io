/**
 * Created by lenovo on 2016/9/3.
 */
angular.module('crossModule',[])
		.service('crossService',['$window',function($window){
		this.jsonp=function(url, params, fn){
			// 0. 处理回调函数挂载问题(不能覆盖)
			// 伪随机数在同一时间调用很可能会重复
			//jsonp_784783476384
			var cbName = `jsonp_${(Math.random() * Math.random()).toString().substr(2)}`;
			// console.log(cbName);
			$window[cbName] = function (data) {
				fn(data);
				// 不断创建标签，最终可能太多，尤其是spa永远不会刷新页面，那标签就会越来越多，所以可以在这个脚本执行完成过后移除
				$window.document.body.removeChild(scriptElement);
			};

			// 1. 组合最终请求的url地址
			// 将params转换为 {key1:val, key2:val} => key1=val&key2=val
			var querystring = '';
			for (var key in params) {
				querystring += `${key}=${params[key]}&`;
			}
			// 告诉服务端我的回调叫什么
			querystring += `callback=${cbName}`;

			//count=5&start=0&callback=jsonp_78678
			url = `${url}?${querystring}`;
			//http://api.douban.com/v2/movie/in_theaters?count=5&start=0&callback=jsonp_78678
			// 2. 创建一个script标签，并将src设置为url地址
			var scriptElement = $window.document.createElement('script');
			scriptElement.src = url;
			// 3. appendChild(执行)
			$window.document.body.appendChild(scriptElement);
		}
	}])
