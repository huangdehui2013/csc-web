// 加入baseUrl
var baseUrl = $("#baseUrl").val();

// 树的内容
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
		view : {
			selectedMulti : false
		}
	},
	callback : {
		onClick : treeNodeOnClick
	}
};
// 树的onClick事件
function treeNodeOnClick(event, treeId, node, clickFlag) {
	var treeObj = $.fn.zTree.getZTreeObj("structureTree");

	var nodes = treeObj.getSelectedNodes();
	var node = nodes[nodes.length - 1];
	$("#orgId").val(node.orgId);
	userTable.dataTableSettings[0]._iDisplayStart = 0;
	userTable.fnDraw();
	$("#structureInputInPosition").attr("disabled", "disabled");
	$('#positionMultiSelect').attr("disabled", "disabled");

	$('#positionMultiSelect').multiSelect("refresh");
	$("#structureInputInPosition").attr("disabled", "disabled");
	// trContent = [];
}
// 加载树的内容
function loadTree() {
	$.ajax({
		dataType : "json",
		type : "POST",
		url : "../structure/loadStructureTree.json",
		data : {},
		timeout : 5000,
		error : function handleAjaxError(xhr, textStatus, error) {
			if (textStatus === "timeout") {
				$.dopErr("连接超时!请稍后再试");
			} else if (textStatus == "error") {
				$.dopErr("系统繁忙,请稍后再试", null);
			}
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
				loadUserTable();
			} else {
				$.dopAlert("结构载入出错", null);
			}
		}
	});
}
// 组织树的载入
$(function() {
	loadTree();

});
// 阻止model激活事件
$(function() {
	$("a[data-toggle='modal']").click(function(e) {
		e.preventDefault();
	});
});
// 用户表格初始
var userTable;

function loadUserTable() {
	userTable = $('#userTable')
			.dataTable(
					{
						"bFilter" : false,
						"bSort" : false, // 排序功能
						"bProcessing" : true,// 设置异步请求时，是否有等待框。
						"sAjaxSource" : '../structure/searchByOrgIdUser.json',// 请求url
						"fnServerParams" : function(aoData) {
							aoData.push({
								"name" : "orgId",
								"value" : $("#orgId").val()
							});
						},
						"sServerMethod" : "post",
						"bServerSide" : true, // 异步请求
						"aoColumns" : [
								{
									"mData" : "userId",
									"mRender" : function(data, type, full) {
										return '<input type="radio" class="checkboxes" name="userId" value="'
												+ data + '"/>';
									}
								},
								{
									"mData" : "account"
								},
								{
									"mData" : "name"
								},
								{
									"mData" : "mobile"
								},
								{
									"mData" : "email"
								},
								{
									"mData" : "orgId",
									"mRender" : function(data, type, full) {
										var orgName = "";
										var orgId = 0;
										for ( var i = 0; i < zNodes.length; i++) {
											if (zNodes[i].orgId == data) {
												orgId = data;
												orgName = zNodes[i].orgName;
												break;
											}
										}
										reString = "<input type='hidden' value='"
												+ orgId + "'/>" + orgName;
										return reString;
									}
								}, {
									"mData" : "status",
									"mRender" : function(data, type, full) {
										if (data == 1) {
											return "正常";
										}
										if (data == 2) {
											return "禁用";
										}
									}
								} ],
						"aoColumnDefs" : [ {
							"sDefaultContent" : '',
							"aTargets" : [ "_all" ]
						} ],
						"bLengthChange" : false,
						"iDisplayLength" : 10,
						"sPaginationType" : "bootstrap",
						"oLanguage" : {
							"sLengthMenu" : "每页显示 _MENU_ 条记录",
							"sZeroRecords" : "抱歉， 没有找到",
							"sInfo" : "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
							"sInfoEmpty" : "",
							"sInfoFiltered" : "",
							"sProcessing" : "正在查询....",
							"oPaginate" : {
								"sFirst" : "首页",
								"sPrevious" : "前一页",
								"sNext" : "后一页",
								"sLast" : "尾页"
							}
						},
						"fnServerData" : function(sSource, aoData, fnCallback) {
							$.ajax({
								"dataType" : 'json',
								"type" : "POST",
								"url" : sSource,
								"data" : aoData,
								"success" : fnCallback,
								"timeout" : 5000, // 连接超时时间
								"error" : function handleAjaxError(xhr,
										textStatus, error) {
									if (textStatus === "timeout") {
										$.dopErr("连接超时!请稍后再试");
									} else if (textStatus == "error") {
										$.dopErr("系统繁忙,请稍后再试", null);
									}
									userTable.fnProcessingIndicator(false);
								}
							});
						},
						fnDrawCallback : function() {
							/*
							 * var userTableTr=$('#userTable tbody tr');
							 * 
							 * if(userTableTr.length>0){
							 * $(userTableTr[0]).click(); }
							 */
						}

					});
}
// 绑定main的新建user按钮
var trContent;
$(function() {
	var url = "../structure/createUserInit.json";
	var createUserButton = $("#createUserButton");
	var createUserModal = $("#createUserModal");
	var modifyUserButton = $("#modifyUserButton");
	var deleteUserButton = $("#deleteUserButton");
	var resetUserButton = $("#resetUserButton");
	// 绑定增加按钮用户信息
	createUserButton.bind("click", function() {
		createUserModal.load(url, function() {
			createUserModal.modal({
				backdrop : 'static',
				keyboard : false
			});
			$("#modalName").text("人员增加");
			$("#saveInCreate").css({
				"display" : "block",
				"float" : "right"
			});
			$("#modifyInCreate").css({
				"display" : "none",
				"float" : "right"
			});
			$("#doFlag").val(1);
			createUserModal.modal("show");
			$("#saveInCreate").removeAttr("disabled");
			$("#accountContentInCreate").removeAttr("disabled");
		});
	});
	// 绑定修改按钮用户信息
	modifyUserButton.bind("click", function() {

		var selectRadio = $('#userTable :checked');
		if (selectRadio.length < 1) {
			$.dopAlert("请选择一条记录", null);
			return;
		}
		if (!trContent) {
			$.dopAlert("请再一次选中要操作项", null);
			return;
		}
		createUserModal.load(url, function() {
			createUserModal.modal({
				backdrop : 'static',
				keyboard : false
			});
			$("#modalName").text("人员修改");
			$("#saveInCreate").css({
				"display" : "none",
				"float" : "right"
			});
			$("#modifyInCreate").css({
				"display" : "block",
				"float" : "right"
			});
			$("#doFlag").val(2);
			createUserModal.modal("show");
			// 在修改modal填值
			// 填充修改modal树的数据
			var treeObjInCreate = $.fn.zTree
					.getZTreeObj("structureTreeInCreate");

			var nodeInCreate = treeObjInCreate.getNodeByParam("orgId",
					trContent.orgId, null);
			var nodeTId = nodeInCreate.tId;
			var nodeId = nodeTId.substring(nodeTId.indexOf("_") + 1);
			var createSelectNodeId = "#structureTreeInCreate" + nodeId
					+ "_span";
			treeObjInCreate.expandAll(true);
			$(createSelectNodeId).click();
			treeObjInCreate.selectNode(nodeInCreate);
			$("#structureSelectButtonInCreate").click();
			// 填充登陆名
			var accountContent = trContent.account;
			$("#accountContentInCreate").val(
					accountContent.substring(accountContent.indexOf("-") + 1));
			$("#accountContentInCreate").attr("disabled", "disabled");
			// 填充用户id
			$("#userIdInCreate").val(trContent.userId);
			// 填充姓名
			$("#nameInCreate").val(trContent.name);
			// 填充手机
			$("#mobileInCreate").val(trContent.mobile);
			// 填充email
			$("#emailInCreate").val(trContent.email);
			// 填充状态
			$("#statusInCreate").val(trContent.status);
			// 填充描述
			$("#descriptionInCreate").val(trContent.description);
			// 填充更改前的orgId
			$("#oldOrgId").val(trContent.orgId);
			$("#modifyInCreate").removeAttr("disabled");
			$("#userPassword").css("display","none");
		});
	});
	// 绑定删除按钮
	deleteUserButton.bind("click", function() {

		var selectRadio = $('#userTable :checked');
		if (selectRadio.length < 1) {
			$.dopAlert("请选择一条记录", null);
			return;
		}
		$.dopConfirm("确定要删除吗", null, function(r) {
			if (r) {
				$.ajax({
					dataType : "json",
					type : "POST",
					url : "../structure/delUser.json",
					data : {
						"userId" : $("#allUserId").val(),
						"status" : 3
					},
					timeout : 5000,
					error : function handleAjaxError(xhr, textStatus, error) {
						if (textStatus === "timeout") {
							$.dopErr("连接超时!请稍后再试");
						} else if (textStatus == "error") {
							$.dopErr("系统繁忙,请稍后再试", null);
						}
					},
					success : function(data) {
						if (data.msg == "success") {
							$.dopAlert("删除成功", null);
						}
						if (data.msg == "userPostError") {
							$.dopAlert("无法删除,请先删除用户被选择的岗位", null);
						}
						if (data.msg == "other") {
							$.dopAlert("其他错误，请稍后再试", null);
							return;
						}
						userTable.dataTableSettings[0]._iDisplayStart = 0;
						userTable.fnDraw();
						// trContent = [];
						$('#positionMultiSelect').empty();
						$('#positionMultiSelect').attr("disabled", "disabled");
						$('#positionMultiSelect').multiSelect("refresh");
						$("#structureInputInPosition").attr("disabled",
								"disabled");
					}
				});
			} else {
				return;
			}
		});

	});
	// 绑定重置密码按钮
	resetUserButton.bind("click", function() {
		var selectRadio = $('#userTable :checked');
		if (selectRadio.length < 1) {
			$.dopAlert("请选择一条记录", null);
			return;
		}
		$.dopConfirm("确定要重置密码吗?", null, function(r) {
			if (r) {
				$.ajax({
					dataType : "json",
					type : "POST",
					url : "../structure/resetPasswordByAdmin.json",
					data : {
						"userId" : $("#allUserId").val(),
						"account" : $("#allAccount").val(),
						"mobile" : $("#allMobile").val()
					},
					timeout : 5000,
					error : function handleAjaxError(xhr, textStatus, error) {
						if (textStatus === "timeout") {
							$.dopErr("连接超时!请稍后再试");
						} else if (textStatus == "error") {
							$.dopErr("系统繁忙,请稍后再试", null);
						}
					},
					success : function(data) {
						if (data.msg == "success") {
							$.dopAlert("重置成功,新密码已发该用户手机", null);
						}
						if (data.msg == "other") {
							$.dopAlert("其他错误，请稍后再试", null);
							return;
						}
						if (data.msg == "sendErr") {
							$.dopAlert("当前重置对象已经达到24小时内最大密码重置数", null);
							return;
						}else{
							//$.dopAlert("重置成功,新密码("+data.msg+")已发该用户手机", null);
							$.dopAlert("重置成功,新密码已发该用户手机", null);
						}
						trContent = [];
					}
				});
				
			}
		});
	});
});
// 绑定行和radio事件

$(function() {
	var radios = $('#userTable :radio');
	radios.live("click", function(e) {

	});

	$('#userTable tr').live(
			"click",
			function() {
				var r = $(this).find(":radio");
				r.attr("checked", "checked");
				if (r[0]) {
					r[0].click();
				}

				trContent = userTable.fnGetData(this);
				$("#allUserId").val(trContent.userId);
				$("#allAccount").val(trContent.account);
				$("#allOrgId").val(trContent.orgId);
				$("#tempOrgId").val(trContent.orgId);
				$("#allMobile").val(trContent.mobile);
				$("#positionMultiSelect").multiSelect("refresh");

				var treeObjInPosition = $.fn.zTree
						.getZTreeObj("structureTreeInPosition");
				var nodeInPosition = treeObjInPosition.getNodeByParam("orgId",
						trContent.orgId, null);
				var nodeTId = nodeInPosition.tId;
				var nodeId = nodeTId.substring(nodeTId.indexOf("_") + 1);
				var positionSelectNodeId = "#structureTreeInPosition" + nodeId
						+ "_span";
				$(positionSelectNodeId).click();
				treeObjInPosition.selectNode(nodeInPosition);

				$("#structureSelectButtonInPosition").click();
				$("#structureInputInPosition").removeAttr("disabled");
				$('#positionMultiSelect').removeAttr("disabled");

			});

});

// 初始化岗位列表
$(function() {

	var selectableHeaderContent = '<div style="position:relative;z-index:2;">	<input id="structureInputInPosition" class="form-control" type="text" readonly="readonly"  value="" style="background:#FFF!important;cursor:pointer" /><!-- 组织树 --><div id="structureDivInPosition" class="form-control"  style="display:none;  height:auto; position:absolute; top: 33px;z-index:100; background:#FFF;border-bottom:1px solid #999999;border-left:1px solid #999999;border-right:1px solid #999999"><div id=structureWrap>	<ul id="structureTreeInPosition" class="ztree" style="margin-top:0; width:200px;"></ul><div style="padding:4px;width:100%;border-top:1px dashed #ccc;"><button class="btn blue" type="button" id="structureSelectButtonInPosition" style="padding:4px;font-size:12px;margin-right:10px">确定</button><button class="btn blue" type="button" id="structureDisButtonInPosition" style="padding:4px;font-size:12px;">取消</button></div></div></div></div>';
	$('#positionMultiSelect')
			.multiSelect(
					{
						selectableHeader : selectableHeaderContent,
						selectionHeader : "<h4>被选择的岗位</h4>",
						afterInit : function(ms) {
							var structureDivInPosition = $("#structureDivInPosition");
							$.fn.zTree.init($("#structureTreeInPosition"),
									treeSettingInPosition, zNodes);
							var treeObj = $.fn.zTree
									.getZTreeObj("structureTreeInPosition");
							treeObj.expandAll(true);
							// 绑定结构下拉框单击事件
							$("#structureDivInPosition").bind("click",
									function(e) {
										e.stopPropagation();
									});

							// 绑定结构选择input单击事件
//							$("#structureInputInPosition").bind("click",
//									function(e) {
//										e.stopPropagation();
//										$("#structureWrap").css({
//											"width" : "150",
//											"height" : "180",
//											"overflow" : "auto"
//										});
//										$("#structureDivInPosition").toggle();
//									});
							// 绑定结构下拉框里面的确定按钮事件
							$("#structureSelectButtonInPosition")
									.bind(
											"click",
											function(e) {
												e.stopPropagation();
												var treeObj = $.fn.zTree
														.getZTreeObj("structureTreeInPosition");
												var nodes = treeObj
														.getSelectedNodes();
												if (nodes.length < 1) {
													$.dopAlert("请选择一个组织", null);
													return;
												}
												if (nodes.length > 1) {
													$
															.dopAlert(
																	"只能选择一个组织",
																	null);
													return;
												}

												var node = nodes[nodes.length - 1];
												if (node.orgCode == "CSC") {
													$.dopAlert("不能选择根组织", null);
													return;
												}

												$("#tempOrgId").val(node.orgId);
												$("#parttimeOrgId").val(
														node.orgId);
												getPositionAndUserPosition(
														node.orgId,
														node.orgName);
												structureDivInPosition.hide();

											});

							// 绑定结构下拉框里面的取消按钮事件
							$("#structureDisButtonInPosition").on("click",
									function(e) {
										e.stopPropagation();
										structureDivInPosition.hide();
									});
						}
					});
	$("#structureInputInPosition").attr("disabled", "disabled");

});

// 岗位树参数
var treeSettingInPosition = {
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
		onClick : treeNodeOnClickInPosition
	}
};

// 岗位树的onClick事件
function treeNodeOnClickInPosition(event, treeId, node, clickFlag) {
	event.preventDefault();

}
// 岗位树的操作
$(function() {
	var structureDivInPosition = $("#structureDivInPosition");
	// 树的生成
	var zNodesContentInterval = window.setInterval(function() {
		if (zNodes) {
			if (zNodes.length > 0) {
				initStructureInPosition();
				clearInterval(zNodesContentInterval);
			}
		}
	}, 50);

});
// 岗位树初始化
function initStructureInPosition() {
	$.fn.zTree.init($("#structureTreeInPosition"), treeSettingInPosition,
			zNodes);
	var treeObj = $.fn.zTree.getZTreeObj("structureTreeInPosition");
	treeObj.expandAll(true);
	// 绑定body的单击事件
	$("body").bind("click", function() {
		$("#structureDivInPosition").hide();
	});

}

// 获取岗位和用户岗位ajax
function getPositionAndUserPosition(orgIdParam, orgNameParam) {
	var treeObj = $.fn.zTree.getZTreeObj("structureTree");
	var node = treeObj.getNodeByParam("orgCode", "CSC", null);
	var positionMultiSelect = $("#positionMultiSelect");
	// 岗位集合
	var positionArray = [];
	// 用户岗位结合
	var userOrgPostArray = [];
	// 获取岗位
	$.ajax({
		dataType : "json",
		async : false,
		type : "POST",
		url : "../position/getPositionList.json",
		data : {
			"orgId" : node.orgId,
		},
		timeout : 5000,
		error : function handleAjaxError(xhr, textStatus, error) {
			if (textStatus === "timeout") {
				$.dopErr("连接超时!请稍后再试");
			} else if (textStatus == "error") {
				$.dopErr("系统繁忙,请稍后再试", null);
			}
		},
		success : function(data) {
			var positionValue = data.aaData;
			positionArray = positionValue;
		}
	});

	// 获取用户和岗位
	$.ajax({
		dataType : "json",
		async : false,
		type : "POST",
		url : "../structure/searchUserOrgPost.json",
		data : {
			"orgId" : $("#tempOrgId").val(),
			"userId" : $("#allUserId").val()
		},
		timeout : 5000,
		error : function handleAjaxError(xhr, textStatus, error) {
			if (textStatus === "timeout") {
				$.dopErr("连接超时!请稍后再试");
			} else if (textStatus == "error") {
				$.dopErr("系统繁忙,请稍后再试", null);
			}
		},
		success : function(data) {
			userOrgPostArray = data;
		}
	});

	// 刷新multiSelect
	positionMultiSelect.empty();
	for ( var i = 0; i < positionArray.length; i++) {
		positionMultiSelect.append('<option value="' + positionArray[i].postId
				+ '">' + positionArray[i].postName + '</option>');
	}
	var tempUserOrgPostArray = new Array();
	for ( var i = 0; i < userOrgPostArray.length; i++) {
		tempUserOrgPostArray.push(new String(userOrgPostArray[i].postId)
				.toString());
	}
	// positionMultiSelect.removeAttr("disabled");
	positionMultiSelect.multiSelect("refresh");
	positionMultiSelect.multiSelect("select", tempUserOrgPostArray);
	$("#structureInputInPosition").val("组织名:" + orgNameParam);

}
// 保存userOrgPost按钮的方法
function saveUserOrgPost() {
	var selectRadio = $('#userTable :checked');
	if (selectRadio.length < 1) {
		$.dopAlert("请选择要操作的用户", null);
		return;
	}
	var saveUserOrgPostButton = $("#saveUserOrgPostButton");
	saveUserOrgPostButton.attr("disabled", "disabled");
	var selectPosition = $("[class='ms-selectable'] ul[class='ms-list'] li:hidden");

	var newPositionIds = '';
	for ( var i = 0; i < selectPosition.length; i++) {
		var selectIdString = $(selectPosition[i]).attr('id');
		selectIdString = selectIdString.substring(0, selectIdString
				.indexOf('-'));
		newPositionIds += selectIdString + ',';
	}

	newPositionIds = newPositionIds.substring(0, newPositionIds
			.lastIndexOf(','));
	$.ajax({
		dataType : "json",
		type : "POST",
		url : "../structure/modifyUserOrgPost.json",
		data : {
			"orgId" : $("#allOrgId").val(),
			"userId" : $("#allUserId").val(),
			"parttimeOrgId" : $("#parttimeOrgId").val(),
			"newPositionIds" : newPositionIds
		},
		timeout : 5000,
		error : function handleAjaxError(xhr, textStatus, error) {
			if (textStatus === "timeout") {
				$.dopErr("连接超时!请稍后再试");
			} else if (textStatus == "error") {
				$.dopErr("系统繁忙,请稍后再试", null);
			}
		},
		success : function(data) {
			saveUserOrgPostButton.removeAttr("disabled");
			if (data.msg == "success") {
				$.dopAlert("修改成功", null);
			}
		}
	});

	// 

}
