var savePositionRoleButton = $("#savePositionRoleButton");

// 加入baseUrl
var baseUrl = $("#baseUrl").val();
// 岗位表格初始
var positionTable;
$(function() {
	positionTable = $('#positionTable')
			.dataTable(
					{
						"bFilter" : false,
						"bSort" : false, // 排序功能
						"bProcessing" : true,// 设置异步请求时，是否有等待框。
						"sAjaxSource" :'../position/getPositionList.json',// 请求url
						"sServerMethod" : "post",
						"bServerSide" : true, // 异步请求
						"fnServerParams" : function(aoData) {
							aoData.push({
								"name" : "orgId",
								"value" : $('#positionOrgId').val()
							});
						},
						"aoColumns" : [
								{
									"mData" : "postId",
									"mRender" : function(data, type, full) {
										return '<input type="radio" name="postId" value="'
												+ data + '"/>';
									}
								}, {
									"mData" : "postName",
								}, {
									"mData" : "description",
								} ],
						"aoColumnDefs" : [ {
							"sDefaultContent" : '',
							"aTargets" : [ "_all" ]
						} ],
						"bPaginate" : false,
						"iDisplayLength" : 10,
						"bInfo" : false,
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
									positionTable.fnProcessingIndicator(false);
								}
							});
						},
						"fnDrawCallback" : function() {
							var positionTableTr=$('#positionTable tbody tr');
							if(positionTableTr.length>0){
								var selectLoadInterval = window.setInterval(function() {
									if(selectFlag){
										$(positionTableTr[0]).click();
										clearInterval(selectLoadInterval);
									}
								}, 200);
							}
						}

					});

});
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

		}
	},
	callback : {
		onClick : treeNodeOnClick
	}
};
// 树的onClick事件
function treeNodeOnClick(event, treeId, node, clickFlag) {
	roleMultiSelect.attr("disabled", "disabled");
	roleMultiSelect.multiSelect("deselect_all");
	roleMultiSelect.multiSelect("refresh");
	var treeObj = $.fn.zTree.getZTreeObj("structureTree");
	var nodes = treeObj.getSelectedNodes();
	var node = nodes[nodes.length - 1];
	if (node.orgCode == "CSC") {
		$("#positionOrgId").val(node.orgId);
		positionTable.dataTableSettings[0]._iDisplayStart=0;
		positionTable.fnDraw();
		return;
	}
	getPostion(node.orgId);
}
// 获取组织下的岗位
function getPostion(id) {
	var orgId = $("#positionOrgId");
	orgId.val(id);
	positionTable.dataTableSettings[0]._iDisplayStart=0;
	positionTable.fnDraw();

}
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

// 保存PositionRole
function savePositionRole() {

	var selects = $("select:disabled");
	if (selects.length > 0) {
		$.dopAlert("请选一个岗位", null);
		return;
	}
	var selectRole = $("[class='ms-selectable'] li:hidden");

	var newRoleIds = '';
	for ( var i = 0; i < selectRole.length; i++) {
		var selectIdString = $(selectRole[i]).attr('id');
		selectIdString = selectIdString.substring(0, selectIdString
				.indexOf('-'));
		newRoleIds += selectIdString + ',';
	}

	newRoleIds = newRoleIds.substring(0, newRoleIds.lastIndexOf(','));
	$.ajax({
		dataType : "json",
		type : "POST",
		url : "../posrole/modifyPositionRole.json",
		data : {
			"newRoleIds" : newRoleIds,
			"postId" : postId
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

			if (data) {
				if (data.msg == "success") {
					$.dopAlert("保存成功", null);
				} else {
					$.dopAlert("保存失败,请刷新重选", null);
				}
			}

		}
	});
}
var postId = "";
// 绑定单选框事件
$(function() {

	var radios = $('#positionTable :radio');
	radios.live("click", function(e) {
		e.stopPropagation();
		roleMultiSelect.removeAttr("disabled");
		roleMultiSelect.multiSelect("refresh");
		postId = $(this).val();
		getPositionRole(postId);
	});

	$('#positionTable tr').live("click", function() {
		var r = $(this).find(":radio");
		r.attr("checked", "checked");
		if (r[0]) {
			r[0].click();
		}
	});

});

// 获取岗位所拥有的角色
function getPositionRole(v) {
	roleMultiSelect.multiSelect('deselect_all');
	if (v) {
		$.ajax({
			dataType : "json",
			type : "POST",
			url : "../posrole/getPositionRole.json",
			data : {
				"postId" : v
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
				if (data && data.length > 0) {
					var oldRoleArray = new Array();
					for ( var i = 0; i < data.length; i++) {
						oldRoleArray
								.push(new String(data[i].roleId).toString());
					}
					roleMultiSelect.multiSelect("select", oldRoleArray);
				}
			}
		});
	} else {
		$.dopAlert("岗位选择错误!请重选", null);
	}

}

var selectFlag=false;
// 角色载入
var roleMultiSelect = $("#roleMultiSelect");
$(function() {
	$.ajax({
		dataType : "json",
		type : "POST",
		url :"../posrole/getRoleList.json",
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
			if (data && data.length > 0) {

				for ( var i = 0; i < data.length; i++) {
					roleMultiSelect.append("<option value='" + data[i].roleId
							+ "' >" + data[i].name + "</option>");
				}
				roleMultiSelect.multiSelect({
					selectableHeader : "<h4>所有运营平台角色</h4>",
					selectionHeader : "<h4>被选择的角色</h4>"
				});
				selectFlag=true;	
			} else {
				$.dopAlert("角色载入出错", null);
			}
		}
	});
});

// 阻止model激活事件
$(function() {
	$("a[data-toggle='modal']").click(function(e) {
		e.preventDefault();
	});
});