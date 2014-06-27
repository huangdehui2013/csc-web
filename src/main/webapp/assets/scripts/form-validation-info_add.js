var FormValidation = function () {

    var handleValidation1 = function() {
        // for more info visit the official plugin documentation: 
            // /docs.jquery.com/Plugins/Validation

            var form1 = $('#infoAddForm');
            var error1 = $('.alert-danger', form1);
            var success1 = $('.alert-success', form1);
            form1.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",
                rules: {
                
                	summary:{
                	    required: true,
                		maxlength:150
                	},
                	keywords:{
                		maxlength:10
                	},
                    articleCategoryId:{
                        required: true
                    },
                    articleName:{
                        required: true,
                        maxlength:50
                    },
                    materialSource:{
                        required: true,
                        maxlength:20
                    },
                    editor:{
                        required: true,
                        maxlength:20
                    },
                    cmsTitle:{
                    	maxlength:20
                    }
                    // name: {
                    //     minlength: 2,
                    //     required: true
                    // },
                    // email: {
                    //     required: true,
                    //     email: true
                    // },
                    // url: {
                    //     required: true,
                    // },
                    // number: {
                    //     required: true,
                    //     number: true
                    // },
                    // digits: {
                    //     required: true,
                    //     digits: true
                    // },
                    // creditcard: {
                    //     required: true,
                    //     creditcard: true
                    // },
                    // occupation: {
                    //     minlength: 5,
                    // },
                    // category: {
                    //     required: true
                    // }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit              
                    success1.hide();
                    error1.show();
                    App.scrollTo(error1, -200);
                },

                highlight: function (element) { // hightlight error inputs
                    $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                	
                //	form.submit();
//                	var name = document.getElementById("imageId").value;
//             	   	if(name ==  null || name == ''){
//             	   		alert("封面不能为空");
//                	}else{
//                		form.submit();
//                	}
                	var articleName = document.getElementById("model-articleName").value;
            		$.post("verifyDuplicate.json", {
                    	articleName : articleName
                    }, function(data) {
                    	var ret = $.parseJSON(data);
                        if (ret.status == 'true') {
                        	$(form).ajaxSubmit({
						               type:"post",
						               url:cscBasePath + "/info/save.json",
						               dataType:"json",
						               success:function(data1){
						             //	  var b = $.dopAlert("保存成功.",null);
						             	 alert("保存成功");
						                 window.location.href="list.htm";
						               },
						               error:function(data2){
						                  $.dopAlert("保存失败,请重新操作.",null);
						              }
						      });
                    	}else{
                    		 alert(ret.message);
                    		 return false;
                    	}
                    });
                }
            });


    }

  

    return {
        //main function to initiate the module
        init: function () {

            handleValidation1();

        }

    };

}();