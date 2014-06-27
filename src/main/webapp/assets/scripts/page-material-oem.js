var TableManaged = function() {

	return {

		// main function to initiate the module
		init : function() {
			if (!jQuery().dataTable) {
				return;
			}

			// begin datatable
			var modelsTable = $('#models-data')
					.dataTable(
							{
								"bFilter" : false,
								"bProcessing" : true,
								"sAjaxSource" : '../oem/ajaxOemList.json',
								"fnServerParams" : function(aoData) {
									aoData.push({
										"name" : "materialInfoId",
										"value" : $("#materialInfoId").val()
									},
									{
										"name" : "materialStatus",
										"value" : $("#status").val()
									},
									{
										"name" : "materialObject",
										"value" : $("#materialObject").attr('caption')
									}, {
										"name" : "sreqCreate",
										"value" : $("#sreqCreate").val()
									}, {
										"name" : "ereqCreate",
										"value" : $("#ereqCreate").val()
									}, {
										"name" : "sreqPublish",
										"value" : $("#sreqPublish").val()
									}, {
										"name" : "ereqPublish",
										"value" : $("#ereqPublish").val()
									}, {
										"name" : "sfeed",
										"value" : $("#sfeed").val()
									}, {
										"name" : "efeed",
										"value" : $("#efeed").val()
									}, {
										"name" : "sdeadline",
										"value" : $("#sdeadline").val()
									}, {
										"name" : "edeadline",
										"value" : $("#edeadline").val()
									}

									);
								},
								"sServerMethod" : "POST",
								"bServerSide" : true,
								"aoColumns" : [ {
									"mData" : "materialInfoId",
									"bSortable" : false
								}, {
									"mData" : "materialInfoId",
									"bSortable" : false
								}, {
									"mData" : "materialObject",
									"bSortable" : false
								}, {
									"mData" : "status",
									"bSortable" : false
								}, {
									"mData" : "picNum",
									"bSortable" : false
								}, {
									"mData" : "deadline",
									"bSortable" : false
								}, {
									"mData" : "createTime",
									"bSortable" : false
								}, {
									"mData" : "publishTime",
									"bSortable" : false
								}, {
									"mData" : "feedbackTime",
									"bSortable" : false
								}, {
									"mData" : "materialAim",
									"bSortable" : false
								}, ],
								"aLengthMenu" : [ [ 10, 20, 50 ],
										[ 10, 20, 50 ] // change per page
								// values here
								],
								"iDisplayLength" : 10,
								"sPaginationType" : "bootstrap",
								"oLanguage" : {
									"sUrl" : "../assets/scripts/jquery.dataTable.cn.js"
								},
								"aoColumnDefs" : [
										{
											'bSortable' : false,
											'aTargets' : [ 0 ]
										},
										{
											sDefaultContent : '',
											aTargets : [ '_all' ]
										},
										{
											'aTargets' : [ 0 ],
											"mData" : "",
											"mRender" : function(data, type,
													full) {
												return '<input type="radio" name="checkbox" class="checkboxes" data="'
														+ full.materialInfoId
														+ '" status="'
														+ full.status
														+ '" value="'
														+ full.materialInfoId
														+ '"/>';

											}
										},
										{
											'aTargets' : [ 3 ],
											"mData" : "",
											"mRender" : function(data, type,
													full) {

												if (data == '0') {
													return '新建';
												} else if (data == '1') {
													return '已发布';
												} else if (data == '2') {
													return '已作废';
												} else if (data == '3') {
													return '已反馈';
												} else if (data == '4') {
													return '已打回';
												} else if (data == '5') {
													return '已确认';
												}

											}
										},
										{

											'aTargets' : [ 5 ],
											"mData" : "",
											"mRender" : function(data, type,
													full) {
												if (data == "") {
													return "";
												}
												var dateFormat = new Date(data);
												var year = dateFormat
														.getFullYear();
												var month = addNum(dateFormat
														.getMonth() + 1);

												var day = addNum(dateFormat
														.getDate());

												var hour = addNum(dateFormat
														.getHours());
												var minute = addNum(dateFormat
														.getMinutes());
												var second = addNum(dateFormat
														.getSeconds());
												var nowdate = year + "-"
														+ month + "-" + day;
												function addNum(t) {
													if (t < 10) {
														return "0" + t;
													}
													return t;
												}

												return nowdate;
											}

										},
										{

											'aTargets' : [ 6 ],
											"mData" : "",
											"mRender" : function(data, type,
													full) {
												if (data == "") {
													return "";
												}
												var dateFormat = new Date(data);
												var year = dateFormat
														.getFullYear();
												var month = addNum(dateFormat
														.getMonth() + 1);

												var day = addNum(dateFormat
														.getDate());

												var hour = addNum(dateFormat
														.getHours());
												var minute = addNum(dateFormat
														.getMinutes());
												var second = addNum(dateFormat
														.getSeconds());
												var nowdate = year + "-"
														+ month + "-" + day
														+ " " + hour + ":"
														+ minute + ":" + second;
												function addNum(t) {
													if (t < 10) {
														return "0" + t;
													}
													return t;
												}

												return nowdate;
											}

										},
										{

											'aTargets' : [ 7 ],
											"mData" : "",
											"mRender" : function(data, type,
													full) {
												if (data == "") {
													return "";
												}
												var dateFormat = new Date(data);
												var year = dateFormat
														.getFullYear();
												var month = addNum(dateFormat
														.getMonth() + 1);

												var day = addNum(dateFormat
														.getDate());

												var hour = addNum(dateFormat
														.getHours());
												var minute = addNum(dateFormat
														.getMinutes());
												var second = addNum(dateFormat
														.getSeconds());
												var nowdate = year + "-"
														+ month + "-" + day
														+ " " + hour + ":"
														+ minute + ":" + second;
												function addNum(t) {
													if (t < 10) {
														return "0" + t;
													}
													return t;
												}

												return nowdate;
											}

										},
										{

											'aTargets' : [ 8 ],
											"mData" : "",
											"mRender" : function(data, type,
													full) {
												if (data == "") {
													return "";
												}
												var dateFormat = new Date(data);
												var year = dateFormat
														.getFullYear();
												var month = addNum(dateFormat
														.getMonth() + 1);

												var day = addNum(dateFormat
														.getDate());

												var hour = addNum(dateFormat
														.getHours());
												var minute = addNum(dateFormat
														.getMinutes());
												var second = addNum(dateFormat
														.getSeconds());
												var nowdate = year + "-"
														+ month + "-" + day
														+ " " + hour + ":"
														+ minute + ":" + second;
												function addNum(t) {
													if (t < 10) {
														return "0" + t;
													}
													return t;
												}

												return nowdate;
											}

										} ],
								// 在每次获取数据并创建DOM后执行的操作（调用uniform插件，美化checkbox）
								"fnDrawCallback" : function(oSettings) {
									$('input.checkboxes').uniform(); // 调用uniform,美化checkbox
								},
								// 在Table初始化完成之后
								"fnInitComplete" : function(oSettings, json) {
									// 为每页显示多少条记录的select增加class
									$('.dataTables_length select').addClass(
											"form-control input-sm");
									// 为搜索框input增加class
									$('.dataTables_filter input').addClass(
											"form-control input-medium");
								}
							});

			return modelsTable;
		}

	};

}();
