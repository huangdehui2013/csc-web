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
			var modelsTable = $('#models-data').dataTable(
					{
						"bFilter" : false,
						"bProcessing" : true,
						"sAjaxSource" : '../pay/ajaxList.json',
						"fnServerParams" : function(aoData) {
							aoData.push({
								"name" : "type",
								"value" : $("#qtype").val()
							}, {
								"name" : "startDate",
								"value" : $("#startDate").val()
							}, {
								"name" : "endDate",
								"value" : $("#endDate").val()
							}, {
								"name" : "payType",
								"value" : 'accounting'
							});
						},
						"sServerMethod" : "POST",
						"bServerSide" : true,
						"aoColumns" : [ {
							"mData" : "paymentId",
							"bSortable" : false
						}, {
							"mData" : "txnInitTime",
							"bSortable" : false
						}, {
							"mData" : "txnPaymentTime",
							"bSortable" : false
						}, {
							"mData" : "terminalType.name",
							"bSortable" : false
						}, {
							"mData" : "txnType.name",
							"bSortable" : false
						}, {
							"mData" : "paymentChannel.name",
							"bSortable" : false
						}, {
							"mData" : "orderId",
							"bSortable" : false
						}, {
							"mData" : "storeId",
							"bSortable" : false
						}, {
							"mData" : "txnAmount",
							"bSortable" : false
						}, {
							"mData" : "serviceFee",
							"bSortable" : false
						}, {
							"mData" : "extTxnNo",
							"bSortable" : false
						}, {
							"mData" : "txnStatus.name",
							"bSortable" : false
						} ],
						"aLengthMenu" : [ [ 10, 20, 50 ], [ 10, 20, 50 ] // change
																			// per
																			// page
																			// values
																			// here
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

									'aTargets' : [ 1 ],
									"mData" : "",
									"mRender" : function(data, type, full) {
										if(data==''){
											return data;
										}
										var dateFormat = new Date(data);
										var year = dateFormat.getFullYear();
										var month =addNum( dateFormat.getMonth() + 1);
										
										var day =addNum( dateFormat.getDate());
										
										
										var hour =addNum( dateFormat.getHours());
										var minute =addNum( dateFormat.getMinutes());
										var second = addNum(dateFormat.getSeconds());
										var nowdate = year + "-" + month + "-"
												+ day + " " + hour + ":"
												+ minute + ":" + second;
										function addNum(t){
											if(t<10){
											return "0"+t;
											}
											return t;
										}
										
										return nowdate;
									}
								},
								{

									'aTargets' : [ 2 ],
									"mData" : "",
									"mRender" : function(data, type, full) {
										if(data==''){
											return data;
										}
										var dateFormat = new Date(data);
										var year = dateFormat.getFullYear();
										var month =addNum( dateFormat.getMonth() + 1);
										
										var day =addNum( dateFormat.getDate());
										
										
										var hour =addNum( dateFormat.getHours());
										var minute =addNum( dateFormat.getMinutes());
										var second = addNum(dateFormat.getSeconds());
										var nowdate = year + "-" + month + "-"
												+ day + " " + hour + ":"
												+ minute + ":" + second;
										function addNum(t){
											if(t<10){
											return "0"+t;
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
