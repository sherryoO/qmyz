$(function(){

function tab_change(tab,content){
	var $tab =  $(tab);
	$tab.find("li").eq(0).addClass("active");
	$tab.find("li").on("click",function(){
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(content).children("div").eq(index).show().siblings().hide();
	})
}
// 放心易装·真保障
tab_change("#fxyz_zbz .menu","#fxyz_zbz .content");
// 身边案例-首页
tab_change("#sbal .col-xs-2","#sbal .col-xs-10");





})//end
