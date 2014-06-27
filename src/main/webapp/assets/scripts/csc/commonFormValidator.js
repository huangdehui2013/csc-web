/**
 * 通用验证js
 */

$(document).ready(function(){       

	
 // 字符验证       
 jQuery.validator.addMethod("stringCheck", function(value, element) {       
   return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
 }, "只能包括中英文字");   //只能包括中文字、英文字母、数字和下划线
 //stringCheckExpend
 jQuery.validator.addMethod("stringCheckExpend", function(value, element) {       
	   return this.optional(element) || /^[\u0391-\uFFE5\w\x2D]+$/.test(value);
	 }, "只能包括中英文字,中下划线");   //只能包括中文字、英文字母、数字和中下划线
//字符验证  英文字母和数字下中划线
 jQuery.validator.addMethod("wordCheck", function(value, element) {       
   return this.optional(element) || /^[\w\x2D]+$/.test(value);
 }, "只能包括字母,数字,中下划线");   //只能包括英文字母、数字和下划线
 
 // 字符验证       
 jQuery.validator.addMethod("stringValidate", function(value, element) {       
   return this.optional(element) || /^[\u0391-\uFFE5\w\s\-\_]+$/.test(value);
 }, "只能包括中英文字,中下划线空格");   //只能包括中文字、英文字母、数字和下划线空格
 // 中文字两个字节       
 jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {       
   var length = value.length;       
   for(var i = 0; i < value.length; i++){       
       if(value.charCodeAt(i) > 127){       
       length++;       
       }       
   }       
   return this.optional(element) || ( length >= param[0] && length <= param[1] );       
 }, "请确保输入的值在3-15个字节之间(一个中文字算2个字节)");   
 

 // 身份证号码验证       
 jQuery.validator.addMethod("isIdCardNo", function(value, element) {       
   return this.optional(element) || isIdCardNo(value);       
 }, "请正确输入身份证号码");    
    

 // 手机号码验证       
 jQuery.validator.addMethod("isMobile", function(value, element) {       
   var length = value.length;   
   var mobile = /^((1)+\d{10})$/;   
   return this.optional(element) || (length == 11 && mobile.test(value));       
 }, "请正确填写手机号码");       
    

 // 电话号码验证       
 jQuery.validator.addMethod("isTel", function(value, element) {       
   var tel = /^(\d{3,4}-?\d{3,9}(-\d{2,6})?)$/;    //电话号码格式010-12345678-123456   
   return this.optional(element) || (tel.test(value));       
 }, "请正确填写电话或传真号码");   
 

 // 联系电话(手机/电话皆可)验证   
 jQuery.validator.addMethod("isPhone", function(value,element) {   
   var length = value.length;   
   var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;   
   var tel = /^(\d{3,4}-?\d{3,9}(-\d{2,6})?)$/;   
   return this.optional(element) || (tel.test(value) || mobile.test(value));   
 }, "请正确填写联系电话");   
    

 // 邮政编码验证       
 jQuery.validator.addMethod("isZipCode", function(value, element) {       
   var tel = /^[0-9]{6}$/;       
   return this.optional(element) || (tel.test(value));       
 }, "请正确填写邮政编码");  
 
 //年龄验证
// jQuery.validator.addMethod("age", function(value, element) {       
//	   var tel = /^[0-9]{1,3}$/;       
//	   return this.optional(element) || (tel.test(value));       
//	 }, "请填写正确的年龄");  
 // 比较
 jQuery.validator.addMethod("greaterThan", function(value, element, params) {
	 console.info($(params).val());
	 console.info("value----"+value);
	 var target = $(params).val();
     var isValueNumeric = !isNaN(parseFloat(value)) && isFinite(value);
     var isTargetNumeric = !isNaN(parseFloat(target)) && isFinite(target);
     if (isValueNumeric && isTargetNumeric) {
         return Number(value) > Number(target);
     }

     if (!/Invalid|NaN/.test(new Date(value))) {
    	 console.info(new Date(value));
    	 console.info(new Date(target));
         return new Date(value) > new Date(target);
     }

     return false;
 },"必须大于{0}");

 // 比较日期 带时分秒
 jQuery.validator.addMethod("greaterThanDate", function (value, element, params) {
	 //console.info($(params).val());
	 var target = $(params).val();
	 //添加秒
	 if(target.length == 16){
		 target = target + ":00";
	 }
	 if(value.length == 16){
		 value = value + ":00";
	 }
	 //替换日期中分割符-为/
	 var regEx = new RegExp("\\-","gi");
	 target = target.replace(regEx,"/");
	 value = value.replace(regEx,"/");
	 
	 return this.optional(element) || new Date(value) >= new Date(target);
 },'结束日期必须大于开始日期');
 
//比较日期小于 带时分秒
 jQuery.validator.addMethod("lessThanDate", function (value, element, params) {
	 //console.info($(params).val());
	 var target = $(params).val();
	 //添加秒
	 if(target.length == 16){
		 target = target + ":00";
	 }
	 if(value.length == 16){
		 value = value + ":00";
	 }
	 //替换日期中分割符-为/
	 var regEx = new RegExp("\\-","gi");
	 target = target.replace(regEx,"/");
	 value = value.replace(regEx,"/");
	 
	 return this.optional(element) || new Date(value) <= new Date(target);
 },'发布日期必须小于开始日期');

 jQuery.validator.addMethod("greaterNow", function (value, element) {
//		var regEx = new RegExp("\\-","gi");
//		data = data.replace(regEx,"/");
//		return new Date(data).format("yyyy-MM-dd");
//	 console.info(new Date(value));
//	 console.info(new Date("2013-12-30 12:20").format("yyyy-MM-dd hh:mm"));
//	 console.info(new Date().toLocaleDateString());
		 if(value.length == 16){
			 value = value + ":00";
			//替换日期中分割符-为/
			 var regEx = new RegExp("\\-","gi");
			 value = value.replace(regEx,"/");
		 }
	 
	    return this.optional(element) || new Date(value) >= new Date();
	},'必须大于当前日期');
 jQuery.validator.addMethod("greaterEquelsNow", function (value, element) {
//		var regEx = new RegExp("\\-","gi");
//		data = data.replace(regEx,"/");
//		return new Date(data).format("yyyy-MM-dd");
//	 console.info(new Date(value));
//	 console.info(new Date("2013-12-30 12:20").format("yyyy-MM-dd hh:mm"));
//	 console.info(new Date().toLocaleDateString());
		 if(value.length == 16){
			 value = value + ":00";
			//替换日期中分割符-为/
			 var regEx = new RegExp("\\-","gi");
			 value = value.replace(regEx,"/");
		 }
	    return this.optional(element) || new Date(value).format("yyyy-MM-dd") >= new Date().format("yyyy-MM-dd");
	},'必须大于等于当前日期');
 //大于等于点当前日期
 jQuery.validator.addMethod("greaterNowDate", function (value, element) {
//		var regEx = new RegExp("\\-","gi");
//		data = data.replace(regEx,"/");
//		return new Date(data).format("yyyy-MM-dd");
//	 console.info(new Date(value));
//	 console.info(new Date("2013-12-30 12:20").format("yyyy-MM-dd hh:mm"));
//	 console.info(new Date().toLocaleDateString());
		 if(value.length == 16){
			 value = value + ":00";
			//替换日期中分割符-为/
			 var regEx = new RegExp("\\-","gi");
			 value = value.replace(regEx,"/");
		 }
	 
	    return this.optional(element) || new Date(value).format("yyyy-MM-dd") >= new Date().format("yyyy-MM-dd");
	},'必须大于等于当前日期');

//货币验证
	$.validator.addMethod("isCurrenty", function(value, element) {
		 var reg = /^\d*\.?\d{0,2}$/; 
		 return reg.test(value);
		}, jQuery.validator.format("请录入有效数字，最多2位小数"));
	
	//验证显示顺序
	 jQuery.validator.addMethod("valueExists", function(value, element,param) {  
		var obj=new Object();
		var oldValue=param.oldValue;
		var flag=false;
		console.info(oldValue);
		obj[param.key]=value;
		 if(value=="" || value==oldValue ){
			 flag= true;
		  }else{
			  $.ajax({
					type : "POST",
					url : param.url,
					async:false,
					dataType : "json",
					data :obj,
					success : function(data) {
						console.info(data);
						flag=data;
					}
				});
		  }
		 return flag;
		
	 }, "显示顺序不能重复");  
	 
// 验证密码
	jQuery.validator.addMethod("passwordCheck", function(value, element) {
		return this.optional(element) || /^[\S]+$/.test(value);
	}, "");

 //开始验证 (验证示例)  
 $('#submitForm').validate({   
   /* 设置验证规则 */  
   rules: {   
       username: {   
           required:true,   
           stringCheck:true,   
           byteRangeLength:[3,15]   
       },   
       email:{   
           required:true,   
           email:true  
       },   
       phone:{   
           required:true,   
           isPhone:true  
       },   
       address:{   
           required:true,   
           stringCheck:true,   
           byteRangeLength:[3,100]   
       }   
   },   
      
   /* 设置错误信息 */  
   messages: {   
       username: {       
           required: "请填写用户名",   
           stringCheck: "用户名只能包括中文字、英文字母、数字和下划线",   
           byteRangeLength: "用户名必须在3-15个字符之间(一个中文字算2个字符)"       
       },   
       email:{   
           required: "请输入一个Email地址",   
           email: "请输入一个有效的Email地址"  
       },   
       phone:{   
           required: "请输入您的联系电话",   
           isPhone: "请输入一个有效的联系电话"  
       },   
       address:{   
           required: "请输入您的联系地址",   
           stringCheck: "请正确输入您的联系地址",   
           byteRangeLength: "请详实您的联系地址以便于我们联系您"  
       }   
   },   
      
   /* 设置验证触发事件 */  
   focusInvalid: true,   
   onkeyup: false,   
      
   /* 设置错误信息提示DOM */  
   errorPlacement: function(error, element) {
       error.appendTo( element.parent());       
   }
});   
 

});