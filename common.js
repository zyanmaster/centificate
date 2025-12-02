var apiUrl =  "//back.zyjjgl.org.cn" ;
var Token = "be6301680aedea2d3a56fa8ca58a2742";
var companyChannelId = 17182;//业务管理 / 各省申报单位审核
var h5UserChannelId = 17308;//
//公共弹窗函数
function commonPop(tips){
    $("#commonpop").stop().hide();
    $("#commonpop span").html(tips);		 
    $("#commonpop").fadeIn(1);
    var popInterval = setTimeout(function() {		    	
        $("#commonpop").fadeOut(300);
        clearTimeout(popInterval);
    }, 2000);  
}
//校验手机号是否合法
function isPhoneNum(num) {
	if (num == "") {
		Qmsg.warning({
		    content:"请输入手机号码",
		    timeout:5000
		});
		return false;
	}
	var reg = /^1[3-9]\d{9}$/;
	if (!reg.test(num)) {
		Qmsg.warning({
		    content:"请输入有效的手机号码",
		    timeout:5000
		});
		return false;
	} else {
		return true;
	}
}
//获取地址栏参数
function getUrl(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
};

//sessionStorage
function sSs(key,value){
    if(value==undefined || value===undefined ){
        return sessionStorage.getItem(key);//获取指定key本地存储的值
    }
    if(value==null){
        sessionStorage.removeItem(key);//删除指定key本地存储的值
        return true;
    }
    sessionStorage.setItem(key,value);//将value存储到key字段
    return true;
};	


//获得完整地址
function returnWhole(_url){
	if(_url.substr(0,4)!="http"){
       _url  = ""+siteUrl + _url  ;
    } 
    return _url ;
}

function setCookie (name, value, day) {
    if(day !== 0){     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
		var expires = day * 24 * 60 * 60 * 1000;
        var date = new Date(+new Date()+expires);
        document.cookie = name + "=" + escape(value) + ";path=/;expires=" + date.toUTCString();
    }else{
        document.cookie = name + "=" + escape(value)+ ";path=/";
    }
};
function delCookie() { // 删除cookie
    let expires = new Date()
    expires.setTime(expires.getTime() - 1)
    let currentCookie = document.cookie
    if (currentCookie != null) {
        document.cookie = 'DataTableCookie=' + currentCookie + ';expires=' + expires.toGMTString()
    }
}

//清空cookie
function clearCookie() {
   var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
   console.log(keys);
   if (keys) {
      for (var i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();//清除当前域名下的,例如：m.kevis.com
            document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();//清除当前域名下的，例如 .m.kevis.com
            document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString();//清除一级域名下的或指定的，例如 .kevis.com
      }
   }
   console.log('已清除cookie'); 
}

function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)){
		return unescape(arr[2]);
	}else{
		return null;
	}
}
