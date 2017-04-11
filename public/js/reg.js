// 表单验证

function test_name(){
    var istrue =1;
    var name = $("#username").val();
    var name_reg = /^[\u4E00-\u9FA5]{2,6}$/;

    if(name=="")   
        {layer.msg('请填写姓名！'); istrue=2; return false;}

    if(!name.match(name_reg))
        {layer.msg('请填写中文姓名'); istrue=2; return false;}

    if(istrue==1){
        return true;
    };
}
function test_tel(){
    var istrue =1;
    var phone = $("#phone").val();
    var phone_reg = /^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;

    if(phone=="")   
        {layer.msg('请填写手机号码！'); istrue=2; return false;}

    if(!phone.match(phone_reg))
        {layer.msg('手机号格式不正确'); istrue=2; return false;}

    if(istrue==1){
        return true;
    };
}
function test_password(){
    var istrue =1;
    var password = $("#password").val();
    var password_reg = /^(?!^\d+$)(?!^[a-zA-Z]+$)[a-zA-Z0-9]{6,20}$/;

    if(password=="")    
        {layer.msg('请填写您的密码'); istrue=2; return false;}

    if(!password_reg.test(password))    
        {layer.msg('密码格式不正确'); istrue=2; return false;}

    if(istrue==1){
        return true;
    };
}
function test_password2(){
    var istrue =1;
    var password = $("#password").val();
    var password2 = $("#password2").val();

    if(!(password2 == password))    
        {layer.msg('两次密码输入不一致'); istrue=2; return false;}

    if(istrue==1){
        return true;
    };
}
function test_code(){
    var istrue =1;

    if($("#code").val()=="")    
        {layer.msg('请填写验证码'); istrue=2; return false;}

    if(istrue==1){
        return true;
    };
}
function test_checkbox(){
    var istrue =1;

    if (!$("#check_agree").is(':checked')) 
        {layer.msg('请勾选我接受服务条款'); istrue=2; return false;}

    if(istrue==1){
        return true;
    };
}
var iTime = 59;
var Account;
function RemainTime(){
    document.getElementById('phone').disabled = true;
    document.getElementById('sendBtn').disabled = true;
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
function send_mobile_code(){
    var phone = $('#phone').val();
    var data = {mobile:phone};
    // RemainTime();

	$.ajax({
        url: baseUrl + "/ws/register/sendCode",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        cache: false,
        data:JSON.stringify(data),
        success: function (data) {
            if (data.code == "0") {
            	layer.msg("验证码已发送");
                RemainTime();
            } else {
                layer.msg("服务器错误，请稍后重试");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            layer.msg("网络异常1");
        }
    });

}
// function get_mobile_code(){
//     if(!test_tel() || !test_code() || !test_checkbox()){
//         return false;
//     }
//     var phone = $("#phone").val();
//     var code = $("#code").val();
//     var data = {mobile:phone,smscode:code};
//     $.ajax({
//         url: baseUrl + "/ws/register/verifySmsCode",
//         type: "post",
//         dataType: "json",
//         contentType: "application/json",
//         cache: false,
//         data:JSON.stringify(data),
//         success: function (data) {
//             if (data.code == "0") {
//                 layer.msg("验证码正确");
//                 $("#register").hide();
//                 $("#setPassword").fadeIn();
//             } else {
//                 layer.msg("验证码错误");
//             }
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//             layer.msg("网络异常2");
//         }
//     });
// }
function get_mobile_code(){
    var istrue =1;
    var phone = $("#phone").val();
    var code = $("#code").val();
    var data = {mobile:phone,smscode:code};
    $.ajax({
        url: baseUrl + "/ws/register/verifySmsCode",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        cache: false,
        data:JSON.stringify(data),
        success: function (data) {
            if (data.code == "0") {
                layer.msg("验证码正确");
                istrue=1; return true;
            } else {
                layer.msg("验证码错误");
                istrue=2; return false;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            layer.msg("网络异常2");
            istrue=2; return false;
        }
    });
    if(istrue==1){
        return true;
    };
}
function register(){
    if(!test_password() || !test_password2()){
        return false;
    }
    var phone = $("#phone").val();
    // alert(phone);
    var password = $("#password").val();
    var data = {mobile:phone,pwd:password};
    $.ajax({
        url: baseUrl + "/ws/register/reg",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        cache: false,
        data:JSON.stringify(data),
        success: function (data) {
            if (data.code == "0") {
                layer.msg("注册成功");
                window.location = "login.html";
            } else {
                layer.msg("服务器错误，请稍后重试");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            layer.msg("网络异常3");
        }
    });
}
function login(){
    if(!test_tel() || !test_password()){
        return false;
    }
    var istrue =1;
    var phone = $("#phone").val();
    // alert(phone);
    var password = $("#password").val();
    var data = {mobile:phone,pwd:password};
    $.ajax({
        url: baseUrl + "/ws/myaccountLogin",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        cache: false,
        data:JSON.stringify(data),
        success: function (data) {
            if (data.code == "0") {
                layer.msg("登录成功");
                var tokenV = data.data[0].token;
                console.log(tokenV);
                localStorage.setItem("token",tokenV);
                istrue=1; return true;
            } else {
                layer.msg("服务器错误，请稍后重试");
                istrue=2; return false;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            layer.msg("网络异常4");
            istrue=2; return false;
        }
    });
    if(istrue==1){
        return true;
    };
}
// 免费福利报名
function apply(type){
    if(!test_name() || !test_tel() || !get_mobile_code()){
        return false;
    }
    var phone = $("#phone").val();
    var name = $("#username").val();
    // alert(phone);
    var password = $("#password").val();
    var data = {mobile:phone,name:name,type:type,token:""};
    $.ajax({
        url: baseUrl + "/ws/myaccount/apply",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        cache: false,
        data:JSON.stringify(data),
        success: function (data) {
            if (data.code == "0") {
                layer.msg("报名成功");
                // window.location.reload();
            } else {
                layer.msg("服务器错误，请稍后重试");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            layer.msg("网络异常3");
        }
    });
}