// 加入baseUrl
var baseUrl = $("#baseUrl").val();
var storeId = $("#storeId").val();
// 验证增加表单
$(function() {
	var createUserform = $('#createUserform');
	createUserform.validate({
		rules : {
			orgIdInCreate : {
				maxlength : 20,
				required : true
			},
			name : {
				required : true,
				maxlength : 20,
				stringCheck:true
			},
			mobile : {
				required : true,
				isMobile : true
			},
			email : {
				required : true,
				email : true,
				maxlength : 50
			},
			accountInCreate : {
				required : true,
				maxlength : 20,
				wordCheck : true
			},
			description : {
				maxlength : 50,
			}
		},
		messages: {
			email:{   
		           required: "请输入一个Email地址",   
		           email: "请输入一个有效的Email地址"  
		       }
			
		},
		errorPosition : "t",
		errorSpacing : {
			top : 2,
			right : 20,
			bottom : 10,
			left : 5
		},
		focusInvalid : true,

		/* 设置错误信息提示DOM */
		errorPlacement : function(error, element) {
			error.appendTo(element.parent());
		},
		submitHandler : function(form) {
			if ($("#doFlag").val() == 1) {
				$("#saveInCreate").attr("disabled", "disabled");
				saveNewUserAjax();
			}
			if ($("#doFlag").val() == 2) {
				$("#modifyInCreate").attr("disabled", "disabled");
				saveModifyUserAjax();
			}
		}
	});

});

// 树参数
var treeSettingInCreate = {
	data : {
		key : {
			// title : "t"
			name : "orgName"
		},
		simpleData : {
			enable : true,
			idKey : "orgId",
			pIdKey : "parentId",

		},
		view : {
			selectedMulti : false
		}
	},
	callback : {
		onClick : treeNodeOnClickIncreate
	}
};

// 树的onClick事件
function treeNodeOnClickIncreate(event, treeId, node, clickFlag) {
	event.preventDefault();

}
// 在新增页面树的操作
$(function() {
	var structureDivInCreate = $("#structureDivInCreate");
	// 树的生成
	$.fn.zTree.init($("#structureTreeInCreate"), treeSettingInCreate, zNodes);
	var treeObj = $.fn.zTree.getZTreeObj("structureTreeInCreate");
	var node = treeObj.getNodeByParam("orgId", "1", null);
	treeObj.expandNode(node, true, false, true);
	// 绑定创建modal的单击事件
	$("#createUserModal").bind("click", function() {
		structureDivInCreate.hide();
	});

	// 绑定结构下拉框单击事件
	$("#structureDivInCreate").bind("click", function(e) {
		e.stopPropagation();
	});

	// 绑定结构选择input单击事件
	$("#inputStructureInCreate").bind("click", function(e) {
		e.stopPropagation();
		structureDivInCreate.toggle();
	});
	// 绑定结构下拉框里面的确定按钮事件
	$("#structureSelectButtonInCreate").bind("click", function(e) {
		e.stopPropagation();
		var nodes = treeObj.getSelectedNodes();
		if (nodes.length < 1) {
			$.dopAlert("请选择一个组织", null);
			return;
		}
		if (nodes.length > 1) {
			$.dopAlert("只能选择一个组织", null);
			return;
		}

		var node = nodes[nodes.length - 1];
		if (node.orgCode == "CSC") {
			$.dopAlert("不能选择根组织", null);
			return;
		}
		$("#inputStructureInCreate").val(node.orgName);
		$("#inputStructureValueInCreate").val(node.orgId);
		$("#inputStructureInCreate").keyup();
		structureDivInCreate.hide();

	});

	// 绑定结构下拉框里面的取消按钮事件
	$("#structureDisButtonInCreate").bind("click", function(e) {
		e.stopPropagation();
		structureDivInCreate.hide();
	});

});
// 保存新建ajax
function saveNewUserAjax() {
	$("#accountInCreate").val(
			$("#accountHeadInCreate").text()+ $("#accountContentInCreate").val());
	$.ajax({
				dataType : "json",
				type : "POST", 
				url :"../structure/createUser.json",
				data : $("#createUserform").serialize(),
				timeout : 20000,
				error : function handleAjaxError(xhr, textStatus, error) {
					if (textStatus === "timeout") {
						$.dopErr("连接超时!请稍后再试");
					} else if (textStatus == "error") {
						$.dopErr("系统繁忙,请稍后再试", null);
					}
					$("#saveInCreate").removeAttr("disabled");
				},
				success : function(data) {
					if (data.msg == "success") {
						$.dopAlert("添加成功,密码已发送到所填的客户手机和邮箱", null);
						$("#cancleButtonTop").trigger("click");
//						$
//								.dopConfirm(
//										'添加成功,密码发送到所填的客户手机和邮箱",是否继续添加?',
//										null,
//										function(r) {
//											$("#saveInCreate").removeAttr("disabled");
//											// 联动主页面的tree
//											var treeObjInCreate = $.fn.zTree
//													.getZTreeObj("structureTreeInCreate");
//											var treeObjInMain = $.fn.zTree
//													.getZTreeObj("structureTree");
//											var nodesInCreate = treeObjInCreate
//													.getSelectedNodes();
//											var nodeInCreate = nodesInCreate[nodesInCreate.length - 1];
//											var nodeTId = nodeInCreate.tId;
//											var nodeId = nodeTId.substring(nodeTId.indexOf("_") + 1);
//											var mainSelectNodeId = "#structureTree_" + nodeId + "_span";
//											treeObjInMain.expandAll(true);
//											$(mainSelectNodeId).click();
//											
//											if (r) {
//												$("#createUserform")[0].reset();
//											} else {
//												$("#cancleButtonTop").trigger("click");
//											}
//										});
					}else{
						$.dopAlert("登录帐号已存在", null);
						$("#saveInCreate").removeAttr("disabled");
						return;
					}
				}
			});
}
// 保存修改ajax
function saveModifyUserAjax() {
	$("#accountInCreate").val(
			$("#accountHeadInCreate").text()
					+ $("#accountContentInCreate").val());
	$.ajax({
		dataType : "json",
		type : "POST",
		url : "../structure/modifyUser.json",
		data : $("#createUserform").serialize(),
		timeout : 20000,
		error : function handleAjaxError(xhr, textStatus, error) {
			if (textStatus === "timeout") {
				$.dopErr("连接超时!请稍后再试");
			} else if (textStatus == "error") {
				$.dopErr("系统繁忙,请稍后再试", null);
			}
			$("#modifyInCreate").removeAttr("disabled");
			$("#createUserModal").modal("hide");
		},
		success : function(data) {
			if (data.msg == "success") {
				$.dopAlert("修改成功", null);
			}
			if (data.msg == "other") {
				$.dopAlert("其他错误，请稍后再试", null);
				return;
			}
			$("#modifyInCreate").removeAttr("disabled");
			// 联动主页面的tree
			var treeObjInCreate = $.fn.zTree
					.getZTreeObj("structureTreeInCreate");
			var treeObjInMain = $.fn.zTree.getZTreeObj("structureTree");
			var nodesInCreate = treeObjInCreate.getSelectedNodes();
			var nodeInCreate = nodesInCreate[nodesInCreate.length - 1];
			var nodeTId = nodeInCreate.tId;
			var nodeId = nodeTId.substring(nodeTId.indexOf("_") + 1);
			var mainSelectNodeId = "#structureTree_" + nodeId + "_span";
			treeObjInMain.expandAll(true);
			$(mainSelectNodeId).click();
			$("#cancleButtonTop").trigger("click");
		}
	});

}
// 新增页面按钮绑定
$(function() {
	// 新建保存按钮
	$("#saveInCreate").bind("click", function(e) {
		e.stopPropagation();
		// $("#inputStructureInCreate").keyup();
		$("#createUserform").submit();
	});
	// 修改保存
	$("#modifyInCreate").bind("click", function(e) {
		e.stopPropagation();
		// $("#inputStructureInCreate").keyup();
		$("#createUserform").submit();
	});
});
