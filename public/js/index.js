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

	// 个人中心编辑资料性别切换
	$(".changeList ul.ul_mid li.li2 .sex .row").on("click","input",function(e){
		console.log(e.currentTarget);
		$(this).parent(".row").addClass("checked").siblings().removeClass("checked");
	})

	// 个人中心兴趣标签选择
	$("#favor .swiper-container .swiper-slide").click(function(){
		$(this).toggleClass("active");
	})

	// 个人中心-我的消息左滑删除效果
	var startX, stratY, moveX, moveY, endX, endY;
	function swipeUp(ele){
		var $ele =  $(ele);
		$ele.bind("touchstart", function(e) {
		  e.preventDefault();
		  startX = e.touches[0].pageX;
		}).bind("touchmove", function(e) {
		  e.preventDefault();
		  moveX = e.touches[0].pageX - startX;
		}).bind("touchend", function(e) {
		  e.preventDefault();
		  if (moveX < -50) {
		  	// alert("left");
		  	$(this).animate({right:'5rem'},300,'linear');
		  	$(this).parent("li").siblings().find(".main").animate({right:'0'},300,'linear');
		  }
		  if (moveX > 50) {
		  	// alert("right");
		  	$(this).animate({right:'0'},300,'linear');
		  }
		}); 
	}
	swipeUp('#my_message ul li .main');
	$('#my_message ul li .delete').click(function(){
	    $(this).parent("li").remove();
	});
})//end
