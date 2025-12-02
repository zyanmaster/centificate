var names = decodeURIComponent(getQueryString("name"))
var certificates = getUrl("certificate")
$(function(){
	Qmsg.config({
	    showClose:false,
	    timeout: 3000
	})
	if(names != "" && names != "null" && certificates != "" && certificates != undefined){
	    $(".loading").show();
	    $(".certificate-query").addClass("hide");
	    $(".certificate-query-submit-check").addClass("hide");
	    getlist(names,certificates,1)
	}
	//查询
	$(".certificate-query-submit-check a").click(function(){
		var name = $("#name").val();
		var certificate = $("#certificate").val();
		if(name == ""){
			Qmsg.warning({
			    content:"姓名不能为空",
			    timeout:5000
			});
			return false;
		};
		if(certificate == ""){
			Qmsg.warning({
			    content:"证书编号不能为空",
			    timeout:5000
			});
			return false;
		};
		$(".loading").show();
		getlist(name,certificate,2)
	})
	//关闭
	$(".certificate-query-close a").click(function(){
		$(".certificate-query").removeClass("hide");
		$(".competition-content").addClass("hide");
		$(".query-certificate-no").addClass("hide");
		$(".certificate-query-submit-check").removeClass("hide");
		$(".certificate-query-close").addClass("hide");
	})
})
function getlist(name,certificate,type){
    let _data={
			"Page":1,    
			"PageSize":10, 
			"WhereJson":{"name":name,"certificate":certificate},  
			"listAll":1,  
		};
		$.ajax({
			type: "post",
			url: "//back.zyjjgl.org.cn/tcenter/api/h5/certificate_verify?data="+encodeURIComponent(JSON.stringify(_data))+"&Token="+Token,
			dataType: "json",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",//默认
			success: function (data) {
			    $(".loading").hide();
				console.log(data)
				if(data.code==200){
					Qmsg.success({
					    content:data.msg,
					    timeout:5000
					});
					console.log(data.data.list)
					if( data.data.list.length > 0 ){
						const result = data.data.list[0];
						console.log(result)
						$("#certificate-name").html(result.name);
						$("#Title").html(result.Title);
						$("#certificateID").html(result.certificate);
						$("#Projectno").html(result.Projectno);
						$("#time").html(result.date1);
						
						$(".certificate-query").addClass("hide");
						$(".competition-content").removeClass("hide");
						$(".query-certificate-no").addClass("hide");
						$(".certificate-query-submit-check").addClass("hide");
						if(type==1){
						    $(".certificate-query-close").addClass("hide");
						}else{
						    $(".certificate-query-close").removeClass("hide");
						}
					}else{
						$(".certificate-query").addClass("hide");
						$(".competition-content").addClass("hide");
						$(".query-certificate-no").removeClass("hide");
						$(".certificate-query-submit-check").addClass("hide");
						if(type==1){
						    $(".certificate-query-close").addClass("hide");
						}else{
						    $(".certificate-query-close").removeClass("hide");
						}
					}
					
				}else{
					$(".certificate-query").addClass("hide");
					$(".competition-content").addClass("hide");
					$(".query-certificate-no").removeClass("hide");
					$(".certificate-query-submit-check").addClass("hide");
					if(type==1){
					    $(".certificate-query-close").addClass("hide");
					}else{
					    $(".certificate-query-close").removeClass("hide");
					}
					Qmsg.warning({
					    content:data.msg,
					    timeout:5000
					});
					return false;
				}
			
			},
			error: function(msg) {
				console.log(msg)
			}
		});
}

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var l = decodeURI(window.location.search);
	var r = l.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

