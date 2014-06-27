var FormValidation = function () {

    var handleValidation1 = function() {
        // for more info visit the official plugin documentation: 
            // /docs.jquery.com/Plugins/Validation

            var form1 = $('#addForm');
            var error1 = $('.alert-danger', form1);
            var success1 = $('.alert-success', form1);
// alert("enter this");
            form1.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",
                rules: {
                	nodeImgLink:{
                		required: true,
                	},
                	nodeTitle:{
                		required: true
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
                	var check=0;
                	$('.has-error').each(function() {
                		check =check+1;

                	});
                	if(check==0){
                		$("#addForm").ajaxSubmit({
                            type : "post",
                            url : "save.json",
                            dataType : "json",
                            success : function(result) {
                                //返回提示信息
                                if (result.status == 'true') {
                                    $('#addDialog').modal('hide');
                                    dataTable.fnDraw();
                                }else{
                                	$.dopAlert(result.message);
                                }
                            }
                        });
                	}
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