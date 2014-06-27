// 获取from元素
var parentName = $("#parentName");
var parentId = $("#parentId");
var fullPath = $("#fullPath");
var delStatus = $("#delStatus");
var orgId = $("#orgId");
var orgIdTemp = $("#orgIdTemp");
var orgCode = $("#orgCode");
var orgName = $("#orgName");
var description = $("#description");
var saveButton = $("#saveButton");
var doFlag = $("#doFlag");
// 加入baseUrl
var baseUrl = $("#baseUrl").val();

// 回调tree的容器
var zNodes = [];

// 树参数
var setting = {
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
		veiw:{
			expandSpeed: ""
		}
	},
	callback : {
		onClick : treeNodeOnClick
	}
};
// 加载树的内容
function loadTree() {
	$.ajax({
		dataType : "json",
		type : "POST",
		url :"../structure/loadStructureTree.json",
		data : {},
		timeout : 5000,
		error : function handleAjaxError(xhr, textStatus, error) {
			if (textStatus === "timeout") {
				$.dopErr("连接超时!请稍后再试");
			} else if (textStatus == "error") {
				$.dopErr("系统繁忙,请稍后再试", null);
			}
			saveButton.removeAttr("disabled");
		},
		success : function(data) {
			if (data) {
				zNodes = data;
				$.fn.zTree.init($("#structureTree"), setting, zNodes);
				var treeObj = $.fn.zTree.getZTreeObj("structureTree");
				var node = treeObj.getNodeByParam("orgCode", "CSC", null);
				// treeObj.expandNode(node, true, false, true);
				treeObj.expandAll(true);
				treeObj.selectNode(node);
				var tId='#'+node.tId+'_span';
				
				$(tId).click();
			} else {
				$.dopAlert("结构载入出错", null);
			}
		}
	});
}
// 树的onClick事件
function treeNodeOnClick(event, treeId, node, clickFlag) {
	$("#structureForm").validate().resetForm();
	var treeObj = $.fn.zTree.getZTreeObj("structureTree");
	if (node.orgCode == "CSC") {
		parentName.val("");
		orgId.val(node.orgId);
		orgIdTemp.val(node.orgId);
		parentId.val(node.orgId);
		fullPath.val(node.fullPath);
		delStatus.val("");
		orgCode.val("");
		orgName.val("");
		description.val("");
	} else {
		orgId.val(node.orgId);
		orgIdTemp.val(node.orgId);
		parentId.val(node.parentId);
		parentName
				.val(treeObj.getNodeByParam("orgId", parentId.val(), null).orgName);
		fullPath.val(node.fullPath);
		delStatus.val(node.delStatus);
		orgCode.val(node.orgCode);
		orgName.val(node.orgName);
		description.val(node.description);
	}
	orgCode.attr("disabled", "disabled");
	orgName.attr("disabled", "disabled");
	description.attr("disabled", "disabled");
	saveButton.attr("disabled", "disabled");
}
// 组织树的载入
$(function() {
	loadTree();
});

// 提交
var structureForm = $("#structureForm");
function createStructure() {
	structureForm.submit();

}
// 添加初始化
function addInit() {
	$("#structureForm").validate().resetForm();
	doFlag.val("add");
	var treeObj = $.fn.zTree.getZTreeObj("structureTree");
	var nodes = treeObj.getSelectedNodes();
	if (nodes.length < 1) {
		$.dopAlert("请选择一个节点", null);
		return;
	} else {
		var node = nodes[nodes.length - 1];
		if (node.orgId < 0) {
			return;
		}
		parentId.val(node.orgId);
		parentName.val(treeObj.getNodeByParam("orgId", parentId.val(), null).orgName);
		fullPath.val(node.fullPath);
		delStatus.val(node.delStatus);
		orgCode.val("");
		orgName.val("");
		description.val("");
		orgCode.removeAttr("disabled");
		orgName.removeAttr("disabled");
		description.removeAttr("disabled");
		saveButton.removeAttr("disabled");
	}
}

// 添加
function addTree() {
	var parmeter = structureForm.serialize();
	saveButton.attr("disabled", "disabled");
	$.ajax({
		type : "POST",
		dataType : "json",
		url : "../structure/createStructure.json",
		data : parmeter,
		timeout : 5000,
		error : function handleAjaxError(xhr, textStatus, error) {
			if (textStatus === "timeout") {
				$.dopErr("连接超时!请稍后再试");
			} else if (textStatus == "error") {
				$.dopErr("系统繁忙,请稍后再试", null);
			}
			saveButton.removeAttr("disabled");
		},
		success : function(data) {
			if (data.orgId > 0) {
				$.dopAlert("添加成功", null);
				var treeObj = $.fn.zTree.getZTreeObj("structureTree");
				var node = treeObj.getNodeByParam("orgId", orgIdTemp.val(),
						null);
				treeObj.addNodes(node, data);
				orgCode.attr("disabled", "disabled");
				orgName.attr("disabled", "disabled");
				description.attr("disabled", "disabled");
				saveButton.attr("disabled", "disabled");
				loadTree();
			} else {
				$.dopAlert("添加失败,组织编码已被占用", null);
			}
		}
	});

}
// 删除
function delTree() {
	delStatus.val("1");
	var parmeter = {
		"orgId" : orgId.val(),
		"orgCode" : orgCode.val(),
		"orgName" : orgName.val(),
		"description" : description.val(),
		"fullPath" : fullPath.val(),
		"parentId" : parentId.val(),
		"delStatus" : "1"
	};
	var treeObj = $.fn.zTree.getZTreeObj("structureTree");
	var nodes = treeObj.getSelectedNodes();
	if (nodes.length < 1) {
		$.dopAlert("请选择一个节点", null);
		return;
	}
	var node = nodes[nodes.length - 1];
	if (node.orgCode =="CSC") {
		$.dopAlert("根组织结构不可以删除", null);
		return;
	}
	if (node.children) {
		if (node.children.length > 0) {
			$.dopAlert("有子节点不可删除", null);
			return;
		}
	}
	saveButton.attr("disabled", "disabled");
	$.dopConfirm("确定要删除吗,如果有用户和岗位绑定在组织下,请先删除该组织下的用户和岗位",null,function(r) {
						if (r) {
							$.ajax({
										type : "POST",
										dataType : "json",
										url : "../structure/delStructure.json",
										data : parmeter,
										timeout : 5000,
										error : function handleAjaxError(xhr,
												textStatus, error) {
											if (textStatus === "timeout") {
												$.dopErr("连接超时!请稍后再试");
											} else if (textStatus == "error") {
												$.dopErr("系统繁忙,请稍后再试",
														null);
											}
											saveButton.removeAttr("disabled");
										},
										success : function(data) {
											if (data.msg == "success") {
												$.dopAlert("删除成功", null);
												var treeObj = $.fn.zTree.getZTreeObj("structureTree");
												var node = treeObj.getNodeByParam("orgId", orgId.val(),	null);
												node.orgCode = orgCode.val();
												node.orgName = orgName.val();
												node.description = description.val();
												treeObj.removeNode(node);
												orgId.val("");
												orgCode.val("");
												orgName.val("");
												description.val("");
												saveButton.attr("disabled",	"disabled");
											} else if (data.msg == "usererr") {
												$.dopAlert(	"组织下有用户绑定,请先删除组织下的用户",	null);
											} else if (data.msg == "posterr") {
												$.dopAlert("组织下有岗位绑定,请先删除组织下的岗位", null);
											}else if (data.msg == "songerr") {
												$.dopAlert("组织下有子节点,请先删除该组织下的子节点", null);
											} else {
												$.dopAlert("其它错误,请刷新后再试", null);
											}

											;
										}
									});
						} else {
							saveButton.removeAttr("disabled");
							return;
						}
					});

}
// 修改init
function modifyInit() {
	$("#structureForm").validate().resetForm();
	doFlag.val("modify");
	structureFormd.resetForm();
	var treeObj = $.fn.zTree.getZTreeObj("structureTree");
	var nodes = treeObj.getSelectedNodes();
	if (nodes.length < 1) {
		$.dopAlert("请选择一个节点", null);
		return;
	} else {
		var node = nodes[nodes.length - 1];
		if (node.orgCode == "CSC") {
			$.dopAlert("根组织不可修改", null);
			return;
		}
		orgId.val(node.orgId);
		parentId.val(node.parentId);
		parentName
				.val(treeObj.getNodeByParam("orgId", parentId.val(), null).orgName);
		fullPath.val(node.fullPath);
		delStatus.val(node.delStatus);
		orgCode.val(node.orgCode);
		orgName.val(node.orgName);
		description.val(node.description);
		orgCode.removeAttr("disabled");
		orgName.removeAttr("disabled");
		description.removeAttr("disabled");
		saveButton.removeAttr("disabled");
	}
}
// 修改
function modifyTree() {
	var parmeter = structureForm.serialize();
	$.ajax({
		type : "POST",
		dataType : "json",
		url :"../structure/modifyStructureTree.json",
		data : parmeter,
		timeout : 5000,
		error : function handleAjaxError(xhr, textStatus, error) {
			if (textStatus === "timeout") {
				$.dopErr("连接超时!请稍后再试");
			} else if (textStatus == "error") {
				$.dopErr("系统繁忙,请稍后再试", null);
			}
		},
		success : function(data) {
			if (parseInt(data.msg) > 0) {
				$.dopAlert("修改成功", null);
				var treeObj = $.fn.zTree.getZTreeObj("structureTree");
				var node = treeObj.getNodeByParam("orgId", orgId.val(), null);
				node.orgCode = orgCode.val();
				node.orgName = orgName.val();
				node.description = description.val();
				treeObj.updateNode(node);
				orgCode.attr("disabled", "disabled");
				orgName.attr("disabled", "disabled");
				description.attr("disabled", "disabled");
				saveButton.attr("disabled", "disabled");
			} else {
				$.dopAlert("修改失败,组织编码已被占用", null);
				orgCode.attr("disabled", "disabled");
				orgName.attr("disabled", "disabled");
				description.attr("disabled", "disabled");
				saveButton.attr("disabled", "disabled");
			}
			;
		}
	});
}
// 验证
var structureFormd
$(function() {
	structureFormd=structureForm.validate({
		rules : {
			parentName : {
				required : true
			},
			orgCode : {
				required : true,
				maxlength : 10
			},
			orgName : {
				required : true,
				maxlength : 20,
				stringCheckExpend:true
			},
			description : {
				required : true,
				maxlength : 50
			}
		},
		// 定义提示标签
		focusInvalid : true,

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
	 	 },
		submitHandler : function(form) {
			if (doFlag.val() == "add") {
				addTree();
				doFlag.val("");
			} else if (doFlag.val() == "modify") {
				modifyTree();
				doFlag.val("");
			}
		}
	});
});