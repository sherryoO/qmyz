(function($) {
	$.imageFileVisible = function(options){    
		// 默认选项
		var defaults = {    
			//包裹图片的元素
			wrapSelector: null,    
			fileSelector:  null ,
			width : '100%',
			height: 'auto',
			errorMessage: "不是图片"
		 };

		var opts = $.extend(defaults, options);
		$(opts.fileSelector).change(function(){
			var file = this.files[0];
			/*if(file.size > 500000){
				alert('请确保所传的图片小于500K ！');
				return false;
			}*/
			var imageType = /image.*/;
			if (file.type.match(imageType)) {
				var reader = new FileReader();
				reader.onload = function(){
					var img = new Image();
					img.src = reader.result;
					$(img).width( opts.width);
					$(img).height( opts.height);
					$(opts.wrapSelector).attr("src", img.src);
					$(opts.wrapSelector).attr("name", "1");
					$("#upphoto").val(img.src)
					// $(opts.wrapSelector).parent().attr("href", img.src);
					// $(opts.wrapSelector).show();
				};
				reader.readAsDataURL(file);				
			}else{
				alert(opts.errorMessage);
			}
		});
	};     
})(jQuery); 
