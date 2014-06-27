//表单验证
function bindRePassword(){
	
	$("#passForm").validate({
		rules : {
			password : {
				required : true
			},
			newPassword : {
				required : true,
				maxlength : 20,
				passwordCheck : true
			},
			repass : {
				required : true,
				equalTo:"#newPassword"
			},
		},
		messages : {
			newPassword : {
				maxlength : "密码不能大于20位",
				passwordCheck : "密码格式不正确"
			},
			repass : {
				required : "请输入新密码",
				equalTo : "您两次输入的密码不一致"
			}
		},
		// 定义提示标签
		// 设置验证触发事件
		focusInvalid : true,
		// 设置错误信息提示DOM
		errorPlacement : function(error, element) {
			error.appendTo(element.parent());
		},
		/* 设置错误信息提示DOM */
		errorPlacement : function(error, element) {
			error.appendTo(element.parent());
		},
		errorPosition:"t",
		errorSpacing: {
			top:    2,
			right:  20,
			bottom: 10,
			left:   5
	 	 }
		
	});
	//关闭按钮
	$("#btn_close").click(function() {
		var createAjax = $("#updatePasswordModal");
		$.dopConfirm("确认关闭吗？", null, function(flag) {
			if (flag) {
				createAjax.modal("hide");
			} else {
			}
		});
	});
	$('#updateRe').bind("click", function() {
		if($("#passForm").valid()){
			var baseUrl = $("#baseUrl").val();
			var password = $("#password").val();
			var newPassword = $("#newPassword").val();
			$.ajax({
				type : "POST",
				url :cscBasePath + "/structure/updatePassword.json",
				async : false,
				data : {
					'password':password,
					'newPassword':newPassword
				},
				dataType : "text",
				success : function(data) {
					if(data=='success'){
						$.dopAlert("修改成功！", "");
						$("#updatePasswordModal").modal("hide");
					}else if(data =='passErr'){
						$.dopAlert("您输入的密码错误，请确认后重新输入！", "");
					}else{
						$.dopAlert("修改失败！", "");
						$("#ajax").modal("hide");
					}
				}
			}, "json");
		}
	});
}

function updatePasswordDaliog(){
	var updatePasswordModal=$('#updatePasswordModal');
	updatePasswordModal.load(cscBasePath + "/structure/updatePasswordForm.json", function() {
		updatePasswordModal.modal({
		    backdrop:'static',
		    keyboard:false
		});
		updatePasswordModal.modal("show");
		bindRePassword();
	});
}


