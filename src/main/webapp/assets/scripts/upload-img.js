var UploadImg = function () {
	return {
        init: function (fileId,formId,imgUrl,imgId,type) {
        	 $("#"+fileId).change(function(){
        		 if($(this).val() != ""){
        			 $("#"+formId).submit();
        		 };
            });   
        	$("#"+formId).ajaxForm({
                type:"post",
                dataType:"json",
                success:function(data){ 
                	var imgUrlObj = $("#"+imgUrl);
                	var url=$("input[name='"+imgUrl+"']");
                	url.val(data.imgUrl);
                	if(type && type == 2){
                        var imgHost = imgUrlObj.attr("imgHost");
                        imgUrlObj.attr("src",imgHost+data.imgUrl);
                	}else{
                		imgUrlObj.val(data.imgUrl);
                	}
                   $("#"+imgId).val(data.imgId);
                }
              });    
        }

    };

}();