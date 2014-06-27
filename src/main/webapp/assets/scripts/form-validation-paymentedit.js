var FormValidation = function () {

    var handleValidation1 = function() {
        // for more info visit the official plugin documentation: 
            // /docs.jquery.com/Plugins/Validation

            var form1 = $('#paymentRefundEditForm');
            var error1 = $('.alert-danger', form1);
            var success1 = $('.alert-success', form1);
// alert("enter this");
            form1.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",
                rules: {
                	txnStatus:{
                		required: true
                	},
                	txnFailReason:{
                		required: true,
                		maxlength:100
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
                    form.submit();
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