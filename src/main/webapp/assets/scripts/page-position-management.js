// 加入baseUrl
var baseUrl = $("#baseUrl").val();

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
	var treeObj = $.fn.zTree.getZTreeObj("structureTree");
	var nodes = treeObj.getSelectedNodes();
	var node = nodes[nodes.length - 1];
	if (node.orgCode == "CSC") {
		$("#orgId").val(node.orgId);
		positionTable.dataTableSettings[0]._iDisplayStart=0;
		positionTable.fnDraw();
		return;
	}
	getPostion(node.orgId, node.orgName);
}
var treeFlag=false;
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
				treeFlag=true;
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
// 阻止model激活事件
$(function() {
	$("a[data-toggle='modal']").click(function(e) {
		e.preventDefault();
	});
});
//获取当前行的orgId和orgName
function getOrgIdAndOrgName(TorgId) {
	var treeObj = $.fn.zTree.getZTreeObj("structureTree");
	var node=treeObj.getNodeByParam("orgId", TorgId, null);
	var orgId = $("#orgId");
	var tempStructureName = $("#tempStructureName");
	orgId.val(TorgId);
	tempStructureName.val(node.orgName);
	
	var node = treeObj.getNodeByParam("orgId", TorgId, null);
	treeObj.selectNode(node);
}

// 绑定按钮事件
$(function() {
	var orgId = $("#orgId");
	var createPositionButton = $("#createPositionButton");
	var createModal = $("#createModal");
	var modifyPositionButton = $("#modifyPositionButton");
	var modifyModal = $("#modifyModal");
	var delPositionButton = $("#delPositionButton");

	// 阻止input扩展
	$("input[name=postId]").live("click", function(e) {
		e.stopPropagation();
		
		getOrgIdAndOrgName(positionTable.fnGetData(this.parentNode.parentNode).orgId);
	});
	// 绑定行信息
	$("#positionTable tr").live("click", function() {
		$(this).find("input").click();

	});

	// 绑定新增按钮
	createPositionButton.bind("click", function() {
		var treeObj = $.fn.zTree.getZTreeObj("structureTree");
		var nodes = treeObj.getSelectedNodes();
		if(nodes.length==0){
			$.dopAlert("请选择一个组织", null);
			return;
		}
		if(nodes[nodes.length-1].orgCode=="CSC"){
			$.dopAlert("不可在根组织下添加岗位", null);
			return;
		}
			
			
		var url ="../position/createPositionInit.json";
		createModal.modal({
			backdrop : 'static',
			keyboard : false
		});
		createModal.load(url, function() {
			createModal.modal("show");
			$("#createSaveButton").removeAttr("disabled");
		});
	});
	// 绑定修改按钮
	modifyPositionButton.bind("click", function() {
		var url ="../position/modifyPositionInit.json";
		var selectId = $('#positionTable :radio:checked');
		if (selectId.length == 0) {
			$.dopAlert("请选择一个岗位", null);
			return;
		}
		modifyModal.modal({
			backdrop : 'static',
			keyboard : false
		});
		modifyModal.load(url, function() {
			modifyModal.modal("show");
			$("#modifySaveButton").removeAttr("disabled");
			fillInTable();
		});
	});

});

// 删除按钮
function delPosition() {
	var selectId = $('#positionTable :radio:checked');
	if (selectId.length == 0) {
		$.dopAlert("请选择一个岗位", null);
		return;
	}
	var orgId = $("#orgId");
	if (orgId.val() == 1) {
		$.dopAlert("请选择一个岗位", null);
		return;
	}
	$.dopConfirm("确定要删除吗?", null, function(r) {
		if (r) {
			var postCode = selectId.parent().nextAll("td:eq(0)").text();
			var postName = selectId.parent().nextAll("td:eq(1)").text();
			var description = selectId.parent().nextAll("td:eq(2)").text();
			$.ajax({
				dataType : "json",
				type : "POST",
				url :"../position/delPosition.json",
				data : {
					"postId" : selectId.val(),
					"orgId" : orgId.val(),
					"postCode" : postCode,
					"postName" : postName,
					"description" : description,
					"delStatus" : "2"
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
						var treeObj = $.fn.zTree.getZTreeObj("structureTree");
						var node = treeObj.getNodeByParam("orgId", $("#orgId").val(), null);
						treeObj.expandAll(true);
						treeObj.selectNode(node);
						var nodeTId = node.tId;
						var nodeId = nodeTId.substring(nodeTId.indexOf("_") + 1);
						var selectNodeId = "#structureTree_" + nodeId + "_span";
						$(selectNodeId).click();
					}else if (data.msg == "roleError"){
						$.dopAlert("删除失败,请先删除岗位下的角色", null);
					}else if (data.msg == "userError"){
						$.dopAlert("删除失败,请先删除岗位下的用户", null);
					}else if (data.msg == "err"){
						$.dopAlert("删除失败", null);
					}else{
						$.dopErr("系统繁忙,请稍后再试", null);
					}

				}
			});
		} else {
			return;
		}
	});

}

// 修改页面数据填充
function fillInTable() {
	var selectId = $('#positionTable :radio:checked');
	if (selectId.length == 0) {
		$.dopAlert("请选择一个岗位", null);
		return;
	}
	var orgId = $("#orgId");
	var modifyOrgId = $("#modifyOrgId");
	var modifyPostId = $('#modifyPostId');
	var tempStructureName = $("#tempStructureName");
	var modifyStructureName = $("#modifyStructureName");
	var postCode = selectId.parent().nextAll("td:eq(0)").text();
	var modifyPostCode = $("#modifyPostCode");
	var postName = selectId.parent().nextAll("td:eq(0)").text();
	var modifyPostName = $("#modifyPostName");
	var description = selectId.parent().nextAll("td:eq(1)").text();
	var modifyDescription = $("#modifyDescription");
	modifyOrgId.val(orgId.val());
	modifyPostId.val(selectId.val());
	modifyStructureName.val(tempStructureName.val());
	modifyPostCode.val(postCode);
	modifyPostName.val(postName);
	modifyDescription.val(description);
}
// 获取组织下的岗位
function getPostion(id, name) {
	var orgId = $("#orgId");
	var tempStructureName = $("#tempStructureName");
	orgId.val(id);
	tempStructureName.val(name);
	positionTable.dataTableSettings[0]._iDisplayStart=0;
	positionTable.fnDraw();

}

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
								"value" : $('#orgId').val()
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
						"fnDrawCallback" : function() {
							var radios = $('#positionTable :radio');
							if (radios.length > 0) {
								
								var treeLoadInterval = window.setInterval(function() {
									if(treeFlag){
										$(radios[0]).attr('checked', 'checked');
										clearInterval(treeLoadInterval);
									}
								}, 200);
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
						}
					});

});

