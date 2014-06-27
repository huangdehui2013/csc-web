var FormValidation = function () {

    var handleValidation1 = function() {
            var form1 = $('#editForm');
            var error1 = $('.alert-danger', form1);
            var success1 = $('.alert-success', form1);
            form1.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",
                rules: {
                	articleName:{
                        required: true,
                        maxlength: 50
                    },
                    
                    materialSource:{
                    	 required: true,
                        maxlength: 20
                    },
                    cmsTitles:{
                        required: true,
                        maxlength: 20
                    }
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
                	var articleName = document.getElementById("model-articleName").value;
                	var articleId = document.getElementById("model-articleId").value;
                	if(articleId != null && articleId != ''){
                		$.post("verifyDuplicate.json", {
                        	articleId : articleId,
                        	articleName : articleName
                        }, function(data) {
                        	var ret = $.parseJSON(data);
                            if (ret.status == 'true') {
                            	form.submit();
                        	}else{
                        		 alert(ret.message);
                        		 return false;
                        	}
                        });
                	}else{
                		return false;
                	}
                    
                }
            });
    }

    return {
        init: function () {
            handleValidation1();

        }

    };

}();