var leixing = new Array(".jpg", ".jpeg", ".gif", ".png", ".bmp");

var load = function() {
	return {
		init : function(fileId, formId, imgUrl, imgId, type) {

			$("#" + fileId).change(
					function() {
						if ($(this).val() != "") {
							var i = 0;
							var k = $(this).val().substring(
									$(this).val().lastIndexOf("."));
							k=k.toLowerCase();
							for ( var int = 0; int < leixing.length; int++) {

								if (k == leixing[int]) {

									i = 1;
									break;
								}
							}
							if (i == 1) {
								
								$("#" + formId).submit();
							} else {

								$.dopAlert("该文件类型不支持");
							}
						}
						;
					});
			$("#" + formId).ajaxForm({
				type : "post",
				dataType : "json",
				success : function(data) {
					var imgUrlObj = $("#" + imgUrl);
					var url = $("input[name='" + imgUrl + "']");
					url.val(data.imgUrl);
					if (type && type == 2) {
						var imgHost = imgUrlObj.attr("imgHost");
						imgUrlObj.attr("src", imgHost + data.imgUrl);
					} else {
						imgUrlObj.val(data.imgUrl);
					}
					$("#" + imgId).val(data.imgId);
					$("#ios").html('&nbsp;更新图片封面');
					$("#coverImgDiv").css("display","block");
				},
				error:function (){
					
					$.dopAlert('当前服务器繁忙,请稍候...');
				}
			});
		}

	};

}();