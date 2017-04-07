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
	// 云监控-身边案例-首页
	tab_change("#sbal .col-xs-2","#sbal .col-xs-10");
	// 三大效果图-身边案例-首页
	tab_change("#sbal .lists","#sbal .contents");
	// 第一个子集效果图-身边案例-首页
	tab_change("#sbal .contents .theme1 .theme_lists","#sbal .contents .theme1 .theme_pic");
	// 第二个子集效果图-身边案例-首页
	tab_change("#sbal .contents .theme2 .theme_lists","#sbal .contents .theme2 .theme_pic");
	// 第三个子集效果图-身边案例-首页
	tab_change("#sbal .contents .theme3 .theme_lists","#sbal .contents .theme3 .theme_pic");







})//end
