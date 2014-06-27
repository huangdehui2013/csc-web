var FormValidation = function() {

	var handleValidation1 = function() {
		// for more info visit the official plugin documentation:
		// /docs.jquery.com/Plugins/Validation

		var form1 = $('#addForm');
		var error1 = $('.alert-danger', form1);
		var success1 = $('.alert-success', form1);
		// alert("enter this");
		jQuery.validator.addMethod("isNoFeiFa", function(value, element) {   
		    var tel = /^[\u4e00-\u9fa5\da-zA-Z\-\_]+$/;
		    return this.optional(element) || (tel.test(value));
		}, "不允许出现特殊字符");
		form1
				.validate({
					errorElement : 'span', // default input error message
											// container
					errorClass : 'help-block', // default input error message
												// class
					focusInvalid : false, // do not focus the last invalid
											// input
					ignore : "",
					rules : {
						title : {
							minlength : 2,
							maxlength : 50,
							required : true
						},
						subTitle : {
							maxlength : 50
						},
						keywords : {
							maxlength : 10,
							isNoFeiFa : true
						},
						coverImgId : {
							required : true,
							number : true
						},
						sstartTime : {
							required : true
						},
						sendTime : {
							required : true
						},
						spublishTime : {
							required : true
						},
						soffshelfTime : {
							required : true
						},

						url : {
							required : true,
							url:true
						},

						velBrandId : {
							required : true

						},
						totalMembersShow : {
							digits : true,
							min : 0,
							max : 9999999999
						},
						memberLimit : {
							required : true,
							digits : true,
							min : 1,
							max : 9999999999
						},
						storeId : {
							required : true
						}

					},

					invalidHandler : function(event, validator) { // display
																	// error
																	// alert on
																	// form
																	// submit
						success1.hide();
						error1.show();
						App.scrollTo(error1, -200);
					},

					highlight : function(element) { // hightlight error inputs
						$(element).closest('.form-group').addClass('has-error'); // set
																					// error
																					// class
																					// to
																					// the
																					// control
																					// group
					},

					unhighlight : function(element) { // revert the change
														// done by hightlight
						$(element).closest('.form-group').removeClass(
								'has-error'); // set error class to the
												// control group
					},

					success : function(label) {
						label.closest('.form-group').removeClass('has-error'); // set
																				// success
																				// class
																				// to
																				// the
																				// control
																				// group
					},

					submitHandler : function(form) {
						
						
						$("span[name='storeNameValidate']").remove();
						var totalMembersShow = $("#totalMembersShow").val();
						if (totalMembersShow == '') {
							$("#totalMembersShow").val('0');

						}

						var s = new Array();
						var i = 0;

						var is = 0;
						$("form input[name='storeId']")
								.each(
										function() {
											if ($(this).val() == '') {

												$(this)
														.prev()
														.after(
																"<span name='storeNameValidate' style='color:red;'>请输入店铺名称</span>");
												var storeName = $(this).prev()
														.attr("id");
												$(this).prev().prev().before(
														"<a name='" + storeName
																+ "'/>");
												if (is == 0) {
													// App.scrollTo(storeName,0);
													location.href = "#"
															+ storeName;
												}

												is = 1;

											}
											s[i] = $(this).val();
											i++;
										});
						if (is != 0) {

							return false;
						}

						for ( var int = 0; int < s.length; int++) {

							for ( var int2 = int + 1; int2 < s.length; int2++) {
								if (s[int] == s[int2]) {

									$.dopAlert("经销商店铺 第" + (int + 1) + "行与第"
											+ (int2 + 1) + "行出现重复", null);
									return;
								}
							}

						}
						$("#save").attr({
							"disabled" : true
						});

						//return false;
						$(form).ajaxSubmit({
							type : "post",
							url : "generateSave.json",
							dataType : "json",
							success : function(result) {
								// 返回提示信息
								
//								window.opener.dataTable.fnDraw();
//								window.close();
								//alert(result.status);
								if (result.status == 'true') {
									
									window.opener.dataTable.fnDraw();
									window.close();
								} else {
									$.dopAlert(result.message, null);
									$("#save").attr({
										"disabled" : false
									});
								}
							},
							error : function() {

								$("#save").attr({
									"disabled" : false
								});
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