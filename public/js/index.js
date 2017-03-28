/*放心易装·正保障*/
$(function(){
	$("#fxyz_zbz .menu div").click(function(){
		var menu_index = $(this).index();
		// alert(menu_index);
		$(this).addClass("active").siblings().removeClass("active");
		$("#fxyz_zbz .content .wrap").eq(menu_index).show().siblings().hide();

	})


})//end
