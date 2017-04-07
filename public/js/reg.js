// 表单验证
function jiaoyan(){
    var istrue =1;
    var phone = $("#phone").val().toString();
    if(phone=="")	
		{layer.msg('请填写手机号码！'); istrue=2; return false;}
    if(!phone.match(/^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/))
    	{layer.msg('手机号格式不正确'); $('#phone').val("");istrue=2; return false;}

    if($("#password").val()=="")	
    	{layer.msg('请填写您的密码'); istrue=2; return false;}

    if($("#password").val().length<6)	
    	{layer.msg('密码不得小于6位'); istrue=2; return false;}

    if(!($("#password2").val() == $("#password").val()))	
    	{layer.msg('两次密码输入不一致'); istrue=2; return false;}

    if($("#code").val()=="")	
    	{layer.msg('请填写验证码'); istrue=2; return false;}

    if (!$(".noteBtn").hasClass("yes")) 
    	{layer.msg('请勾选我接受服务条款'); istrue=2; return false;}

    if(istrue==1){
        return true;
    };
}
var iTime = 59;
var Account;
function RemainTime(){
    document.getElementById('phone').disabled = true;
    var iSecond,sSecond="",sTime="";
    if (iTime >= 0){
        iSecond = parseInt(iTime%60);
        iMinute = parseInt(iTime/60)
            if (iSecond >= 0){
                if(iMinute>0){
                    sSecond = iMinute + "分" + iSecond + "秒";
                }else{
                    sSecond = iSecond + "秒";
                }
            }
        sTime=sSecond;
        if(iTime==0){
            clearTimeout(Account);
            document.getElementById('phone').disabled = false;
            sTime='重新获取';
            iTime = 59;
            document.getElementById('sendBtn').disabled = false;
        }else{
            Account = setTimeout(RemainTime,1000);
            iTime=iTime-1;
        }
    }else{
        sTime='没有倒计时';
    }
    document.getElementById('sendBtn').innerHTML = sTime;
}
var baseUrl = "http://10.100.10.226:8080/wechat";
function get_mobile_code(){
    var phone = $('#phone').val();

    // document.getElementById("hide_tel").value=phone;
    alert(phone);
    // RemainTime();

	// var url="{:U('User/checkreg_verify')}"
 //    var send_code = "<?php echo $_SESSION['send_code'];?>";
 //    $.post(url, {phone:phone,send_code:send_code}, function(msg) {
 //                if(msg=='提交成功'){
 //                	$('#code').val("");
 //                    RemainTime();
 //                }else{
 //                    layer.msg(msg);
 //                }
 //            });


	 $.ajax({
	                url: baseUrl + "/ws/register/sendCode",
	                type: "post",
	                dataType: "json",
	                contentType: "application/json",
	                cache: false,
	                data:JSON.stringify({mobile:phone}),
	                success: function (data) {
	                    if (data.code == "0") {
	                    	alert("验证码已发送");
                            RemainTime();
	                    } else {
	                        alert("服务器错误，请稍后重试");
	                    }
	                },
	                error: function (jqXHR, textStatus, errorThrown) {
	                    alert("网络异常");
	                }
	            });

}

$(function(){
	$('#sendBtn').click(function(){
		get_mobile_code();

	})



})//
