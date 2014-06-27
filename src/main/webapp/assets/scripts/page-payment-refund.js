var TableManaged = function() {

	return {

		// main function to initiate the module
		init : function() {
			if (!jQuery().dataTable) {
				return;
			}

			// begin datatable
			var modelsTable = $('#models-data').dataTable(
					{
						"bFilter" : false,
						"bProcessing" : true,
						"sAjaxSource" : '../pay/ajaxPayrefundList.json',
						"fnServerParams" : function(aoData) {
							aoData.push({
								"name" : "type",
								"value" : $("#qtype").val()
							});
						},
						"sServerMethod" : "POST",
						"bServerSide" : true,
						"aoColumns" : [{
							"mData" : "paymentId",
							"bSortable" : false
						}, {
							"mData" : "paymentId",
							"bSortable" : false
						}, {
							"mData" : "paymentChannel.name",
							"bSortable" : false
						}, {
							"mData" : "orderId",
							"bSortable" : false
						}, {
							"mData" : "extTxnNo",
							"bSortable" : false
						}, {
							"mData" : "txnInitTime",
							"bSortable" : false
						}, {
							"mData" : "storeId",
							"bSortable" : false
						}, {
							"mData" : "txnAmount",
							"bSortable" : false
						}, {
							"mData" : "txnStatus.name",
							"bSortable" : false
						}, {
							"mData" : "txnFailReason",
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
									'aTargets' : [ 0 ],
									"mData" : "",
									"mRender" : function(data, type,
											full) {
										if(full.txnStatus.name != '成功'){
										 return '<input type="radio" name="radio" class="checkboxes" value="' + data +','+ full.txnStatus.name +","+ full.txnFailReason + '"/>';
										}
									}
								},

								{

									'aTargets' : [ 5],
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
