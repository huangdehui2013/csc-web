var TableManaged = function() {

	return {

		// main function to initiate the module
		init : function() {
			if (!jQuery().dataTable) {
				return;
			}

			// 日期控件
			if (jQuery().datepicker) {
				$('.date-picker').datepicker({
					rtl : App.isRTL(),
					autoclose : true,
					language : 'zh-CN'
				});
				$('body').removeClass("modal-open"); // fix bug when inline
				// picker is used in
				// modal
			}

			// begin datatable
			var modelsTable = $('#models-data')
					.dataTable(
							{
								"bFilter" : false,
								"bProcessing" : true,
								"sAjaxSource" : '../orderManager/list.json',
								"fnServerParams" : function(aoData) {
									aoData
											.push(
													{
														"name" : "userName",
														"value" : $("#userName").val()
													},
													{
														"name" : "brandId",
														"value" : $("#brandId").val()
													},
													{
														"name" : "storeId",
														"value" : $("#storeId")
																.val()
													},
													{
														"name" : "o2oStatus",
														"value" : $(
																"#o2oStatus")
																.val()
													},
													{
														"name" : "prmtActId",
														"value" : $(
																"#prmtActId")
																.val()
													},
													{
														"name" : "mobileNo",
														"value" : $("#mobileNo")
																.val()
													},
													{
														"name" : "payStatus",
														"value" : $(
																"#payStatus")
																.val()
													},
													{
														"name" : "status",
														"value" : $(
																"#orderStatus")
																.val()
													},
													{
														"name" : "auditStatus",
														"value" : $(
																"#auditStatus")
																.val()
													},
													{
														"name" : "crmStatus",
														"value" : $(
																"#crmStatus")
																.val()
													},
													{
														"name" : "releaseFlag",
														"value" : $(
																"#releaseFlag")
																.val()
													},
													{
														"name" : "overdueStatus",
														"value" : $(
																"#overdueStatus")
																.val()
													},
													{
														"name" : "refundStatus",
														"value" : $(
																"#refundStatus")
																.val()
													},
													{
														"name" : "settleStatus",
														"value" : $(
																"#settleStatus")
																.val()
													},
													{
														"name" : "preOrderId",
														"value" : $(
																"#preOrderId")
																.val()
													},
													{
														"name" : "startSubmitTime",
														"value" : $(
																"#startSubmitTime")
																.val()
													},
													{
														"name" : "endSubmitTime",
														"value" : function() {
															var endTime = '';
															var s = $(
																	"#endSubmitTime")
																	.val();
															if (s != "") {
																var d = new Date(
																		Date
																				.parse(s
																						.replace(
																								/-/g,
																								"/")));
																var n = d
																		.getTime()
																		+ 1
																		* 24
																		* 60
																		* 60
																		* 1000;
																var result = new Date(
																		n);
																endTime = result
																		.getFullYear()
																		+ "-"
																		+ (result
																				.getMonth() + 1)
																		+ "-"
																		+ result
																				.getDate();
															}
															return endTime;
														}
													},
													{
														"name" : "startPayTime",
														"value" : $(
																"#startPayTime")
																.val()
													},
													{
														"name" : "endPayTime",
														"value" : function() {
															var endTime = '';
															var s = $(
																	"#endPayTime")
																	.val();
															if (s != "") {
																var d = new Date(
																		Date
																				.parse(s
																						.replace(
																								/-/g,
																								"/")));
																var n = d
																		.getTime()
																		+ 1
																		* 24
																		* 60
																		* 60
																		* 1000;
																var result = new Date(
																		n);
																endTime = result
																		.getFullYear()
																		+ "-"
																		+ (result
																				.getMonth() + 1)
																		+ "-"
																		+ result
																				.getDate();
															}
															return endTime;
														}
													},
													{
														"name" : "startUpdateTime",
														"value" : $(
																"#startUpdateTime")
																.val()
													},
													{
														"name" : "endUpdateTime",
														"value" : function() {
															var endTime = '';
															var s = $(
																	"#endUpdateTime")
																	.val();
															if (s != "") {
																var d = new Date(
																		Date
																				.parse(s
																						.replace(
																								/-/g,
																								"/")));
																var n = d
																		.getTime()
																		+ 1
																		* 24
																		* 60
																		* 60
																		* 1000;
																var result = new Date(
																		n);
																endTime = result
																		.getFullYear()
																		+ "-"
																		+ (result
																				.getMonth() + 1)
																		+ "-"
																		+ result
																				.getDate();
															}
															return endTime;
														}
													});
								},
								"sServerMethod" : "POST",
								"bServerSide" : true,
								"aoColumns" : [ {
									"mData" : "preOrderId",
									"bSortable" : false
								}, {
									"mData" : "preOrderId",
									"bSortable" : false
								}, {
									"mData" : "prmtActName",
									"bSortable" : false
								}, {
									"mData" : "storeName",
									"bSortable" : false
								}, {
									"mData" : "velModelName",
									"bSortable" : false
								}, {
									"mData" : "statusMsg",
									"bSortable" : false
								}, {
									"mData" : "o2oStatusMsg",
									"bSortable" : false
								}, {
									"mData" : "crmStatusMsg",
									"bSortable" : false
								}, {
									"mData" : "payStatusMsg",
									"bSortable" : false
								}, {
									"mData" : "hasGift",
									"bSortable" : false
								}, {
									"mData" : "userName",
									"bSortable" : false
								}, {
									"mData" : "userId",
									"bSortable" : false
								}, {
									"mData" : "realname",
									"bSortable" : false
								}, {
									"mData" : "mobileNo",
									"bSortable" : false
								}, {
									"mData" : "createTime",
									"bSortable" : false
								}, {
									"mData" : "auditStatusMsg",
									"bSortable" : false
								},{
									"mData" : "preAuditStatus",
									"bSortable" : false
								}, {
									"mData" : "receiptAmount",
									"bSortable" : false
								}

								],
								"aLengthMenu" : [ [ 10, 20, 50 ],
										[ 10, 20, 50 ] // change per page
								// values here
								],
								"aoColumnDefs" : [
										{
											sDefaultContent : '',
											aTargets : [ '_all' ]
										},
										{
											'aTargets' : [ 0 ],
											"mRender" : function(data, type,
													full) {
												return '<input type="radio" name="preOrderId" class="checkboxes"  value="'
														+ full.preOrderId
														+ ","
														+ full.storeId
														+ '">'
														+ '<input type="hidden" id="recieveAddress" value="'
														+ full.address + '"/>';
											}
										} ],
								// set the initial value
								"iDisplayLength" : 10,
								"sPaginationType" : "bootstrap",
								"oLanguage" : {
									"sUrl" : "../assets/scripts/jquery.dataTable.cn.js"
								},

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
			// 具体某一项前面的checkbox，只能选择某一项，不能全选
			$('#models-data tbody tr .checkboxes').live("click", function() {
				var checkboxes = $('#models-data tbody tr .checkboxes');
				checkboxes.parents('tr').removeClass('active'); // 移除所有tr的active
				// class
				checkboxes.not($(this)).attr("checked", false); // 将除$(this)之外所有的.checkboxes取消选择

				jQuery.uniform.update(checkboxes); // jQuery.uniform更新数据
				// checkboxes 选择不到:checked 的，又用$('#models-data tbody tr
				// .checkboxes:checked')重新选择了一次
				if ($('#models-data tbody tr .checkboxes:checked').length > 0) {
					$('.table-toolbar .group-control').attr('disabled', false);
					$(this).parents('tr').addClass("active");
				} else {
					$('.table-toolbar .group-control').attr('disabled', true);
				}
			});

			return modelsTable;
		}

	};

}();
