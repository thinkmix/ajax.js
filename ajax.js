;(function(a){
	a.AJAX={
	    post:function(url,data,callback){
	    	var XMLHttp,active=0;
			XMLHttpRequest ? XMLHttp=new XMLHttpRequest() : XMLHttp=new ActiveXObject('Microsoft.XMLHTTP');
			XMLHttp.open("POST",url,true);
			XMLHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
			XMLHttp.setRequestHeader('Accept','application/json, text/javascript;q=0.01');
			XMLHttp.send(this.formatParams(data));
			this.response(XMLHttp,callback,active);
		},
		get:function(url,callback){
			var XMLHttp,active=0;
			XMLHttpRequest ? XMLHttp=new XMLHttpRequest() : XMLHttp=new ActiveXObject('Microsoft.XMLHTTP');
			XMLHttp.open("GET",url,true);
			XMLHttp.send(null);
			this.response(XMLHttp,callback,active);
		},
		response:function(XMLHttp,callback,active){
			XMLHttp.onreadystatechange=function(){
				//在此添加load层
				active++;
				if(XMLHttp.readyState==4){//在此关闭load层
					XMLHttp.status==200?callback(JSON.parse(XMLHttp.responseText)):active>20000?alert('请求超时'):alert(XMLHttp.status);
				}
			}
		},
		formatParams:function(data) {
	        var arr = [];
	        for (var name in data) {
	            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
	        }
	        //arr.push(("q=" + Math.random()).replace(".",""));
	        return arr.join("&");
	    },
	    getJSON:function(url,data,callback){
	    	if(!url||!callback)throw new Error('params error');
	    	var callbackName=('AJAX_'+Math.random()).replace(".","");
	    	data['callback']=callbackName;
	    	var head=document.getElementsByTagName('head')[0];
	    	var params=this.formatParams(data);
	    	var script=document.createElement('script');
	    	head.appendChild(script);

	    	window[callbackName]=function(json){
	    		head.removeChild(script);
	    		clearTimeout(script.timer);
	    		window[callbackName]=null;
	    		callback(json);
	    	}

	    	script.src=url+'?'+params;
	    	script.timer=setTimeout(function(){
	    		head.removeChild(script);
	    		clearTimeout(script.timer);
	    		window[callbackName]=null;
	    		layer.open({content: "请求超时",skin: "msg",time: 2});
	    	},20000);
	    }
	};
})(window);


