var FormValidation = function() {

	var handleValidation1 = function() {
		// for more info visit the official plugin documentation:
		// /docs.jquery.com/Plugins/Validation

		var form1 = $('#addForm');
		var error1 = $('.alert-danger', form1);
		var success1 = $('.alert-success', form1);

		// alert("enter this");
		form1.validate({
			errorElement : 'span', // default input error message container
			errorClass : 'help-block', // default input error message class
			focusInvalid : false, // do not focus the last invalid input
			ignore : "",
			

			invalidHandler : function(event, validator) { // display error
				
				success1.hide();
				error1.show();
				App.scrollTo(error1, -200);
			},

			highlight : function(element) { // hightlight error inputs
				$(element).closest('.form-group').addClass('has-error'); // set				
			},

			unhighlight : function(element) { // revert the change done by
				// hightlight
				$(element).closest('.form-group').removeClass('has-error'); // set				
			},

			success : function(label) {
				label.closest('.form-group').removeClass('has-error'); // set				
			},

			submitHandler : function(form) {

				var s = $("form[name='addForm']").find("div[name='noneDiv']")
						.attr("id");

				var totalMembersShow = $("#totalMembersShow").val();
				if (totalMembersShow == '') {
					$("#totalMembersShow").val('0');

				}

				if (s == '' || s == null || s == 'undefined') {
					$("#button").next().css("display", "block");

					return false;
				}
				$("form[name='addForm'] div[name='total'] input:checked").each(
						function() {

							if ($(this).val() == 'optional') {
								// salert($(this).parent().find("input[name='colors']").attr("value"));

								var value = '';

								$(this).parent().parent().parent().parent()
										.find("input[name^='color']:checked")
										.each(function() {

											value = $(this).val();
										});
								$(this).parent().find("input[name='colors']")
										.attr("value", value);

							} else {

							}
						});
				//检验所有商品额度是否合格,如果有一项不合格,则不通过							
				var subClass = $("#peSubValid").attr("class");//alert(subClass);
				if(subClass=="blockValid"){
					alert("do not submit");
					return false;
				}
				$.ajax({
					type : "post",
					url : "../activityDynamic/dynaUpdateActivity.json",
					dataType : "json",
					data: $(form1).serialize(),
					success : function(result) {
							
						if (result == true) {
							alert("修改成功!");
							$('#addDialog').modal('hide');
							$('#editDialog').modal('hide');
							$("body").css({
								"overflow" : "auto"
							});
							dataTable.fnDraw();
						} else {
							alert("添加失败!");
							//$.dopAlert(result, null);
						}

					}
				});
				
			}
		});

	};

	return {
		// main function to initiate the module
		init : function() {

			handleValidation1();

		}

	};

}();