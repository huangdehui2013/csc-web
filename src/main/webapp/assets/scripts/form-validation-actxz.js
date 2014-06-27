var FormValidation = function() {

	var handleValidation1 = function() {
		// for more info visit the official plugin documentation:
		// /docs.jquery.com/Plugins/Validation

		var form1 = $('#addForm');
		var error1 = $('.alert-danger', form1);
		var success1 = $('.alert-success', form1);
		
		jQuery.validator.addMethod("isNoFeiFa", function(value, element) {   
		    var tel = /^[\u4e00-\u9fa5\da-zA-Z\-\_]+$/;
		    return this.optional(element) || (tel.test(value));
		}, "不允许出现特殊字符");
		// alert("enter this");
		form1.validate({
			errorElement : 'span', // default input error message container
			errorClass : 'help-block', // default input error message class
			focusInvalid : false, // do not focus the last invalid input
			ignore : "",
			rules : {
				title : {
					minlength : 2,
					maxlength : 50,
					required : true
				}
		,
				subTitle : {

					maxlength : 50

				},
				keywords : {

					isNoFeiFa : true

				},
				coverImgId : {
					required : true,
					digits : true
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
				merchandiseId : {
					required : true,
					digits : true
				},
				deposit : {
					required : true,
					number : true,
					min : 1,
					max : 9999999999
				},
				
				totalNum : {
					required : true,
					digits : true,
					min : 1,
					max : 999999999

				},
				totalMembersShow : {
					digits : true,
					min : 0,
					max : 999999999
				},
				totalNumSum :{
					digits : true,
					min : 1,
					max : 999999999
				},
				shamcolor :{
					digits : true,
					min : 1,
					max : 999999999
				}
//			 name: {
//			 minlength: 2,
//			 required: true
//			 },
//			 email: {
//			 required: true,
//			 email: true
//			 },
//			 url: {
//			 required: true,
//			 },
//			 number: {
//			 required: true,
//			 number: true
//			 },
//			 digits: {
//			 required: true,
//			 digits: true
//			 },
//			 creditcard: {
//			 required: true,
//			 creditcard: true
//			 },
//			 occupation: {
//			 minlength: 5,
//			 },
//			 category: {
//			 required: true
//			 }
			},

			invalidHandler : function(event, validator) { // display error
				// alert on form
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

			unhighlight : function(element) { // revert the change done by
				// hightlight
				$(element).closest('.form-group').removeClass('has-error'); // set
				// error
				// class
				// to
				// the
				// control
				// group
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

				
				

				var totalMembersShow = $("#totalMembersShow").val();
				if (totalMembersShow == '') {
					$("#totalMembersShow").val('0');

				}
				
				var totalNum=$("#totalNum").val();
				
				var salemodel=$("#salesMode option:selected").val();
				
				//var hasGiffBag=$("#hasGiffBag").val();
				
				var shamvalue=0;
				var sv=0;
				//alert($("tr[name^='promotionmerchandise']").length+","+)
				if($("tr[name^='promotionmerchandise']").length<1){
					
					$.dopAlert("销售类活动,必须添加商品",null);
					return false;
				}
				
				var svid=0;
				$("tr[name^='promotionmerchandise']").each(function(){
					
					var value=$(this).find("[name^='total']:checked").val();
					
					
					if(value=='totalSum'){
						
						var totalnum1=$(this).find("[name='totalNumSum']");
						
						if(totalnum1.val()==''){
							
							svid=1;
							return false;
						}
						
						shamvalue=parseInt(shamvalue)+parseInt(totalnum1.val());
						
						//var shamvalue1=totalnum1.val();
						
						//alert(shamvalue1+','+totalNum);
						
						if(salemodel==2){
							
							if(parseInt(totalnum1.val())>parseInt(totalNum)){
								
								sv=1;
							}
						}
					}else{
						
						var shamvalue2=0;
						$(this).find("[name='shamcolor']").each(function(){
							
							if($(this).val()!=''){
								
								shamvalue2=parseInt(shamvalue2)+parseInt($(this).val());
								
								shamvalue=parseInt(shamvalue)+parseInt($(this).val());
							}
							
						});
						
						if(shamvalue2==0){
							
							svid=1;
							return false;
						}
							if(salemodel==2){
								
							if(parseInt(shamvalue2)>parseInt(totalNum)){
								
								sv=1;
							}
						}
						
					}
					
					
					
					
				});
				
				if(svid!=0){
					$.dopAlert("商品配额不能为空",null);
					
					return false;
				}
				
				if(salemodel==1){
				
					if(parseInt(shamvalue)>parseInt(totalNum)){
						$.dopAlert("零售模式下，所有商品配额之和必须小于等于活动总配额",null);
						return false;
					}
				}
				
				if(sv == 1 ){
					
					$.dopAlert("包销模式下，每个商品配额之和必须小于等于活动总配额",null);
					return false;
				}
				
				
				var sum='';
				//var sv=0;
				$("tr[name^='promotionmerchandise']").each(function(index){
					
					var value1=$(this).find("[name^='total']:checked").val();
					
					if(value1=='totalSum'){
						
					//	var totalnum1=$(this).find("[name='totalNumSum']").val();
						sum+=',';
					
					}else{
						
						var shamvalue='';
						$(this).find("[name='shamcolor']").each(function(){
							
							if($(this).val()!=''){
								
								shamvalue+=$(this).val()+"#"+$(this).attr("data")+"-";
							}
							
						});
						//alert(shamvalue);
						if(shamvalue!=''){
							sum+=shamvalue+",";
							//sv++;
						}
						
					}
				});
				
				$("#colors").val(sum);
				//return false;
				$(form).ajaxSubmit({
					type : "post",
					url : "saleSave.json",
					dataType : "json",
					success : function(result) {

						if (result.status == 'true') {
//							$('#addDialog').modal('hide');
//							$('#editDialog').modal('hide');
//							$("body").css({
//								"overflow" : "auto"
//							});
//							dataTable.fnDraw();
							//window.location.href = "list.htm";
							window.opener.dataTable.fnDraw();
							
							window.close();
						} else {
							$.dopAlert(result.message, null);
						}

					}
				});
				return false;
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