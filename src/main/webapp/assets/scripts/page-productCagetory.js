var TableManaged = function() {

	return {

		// main function to initiate the module
		init : function() {

			if (!jQuery().dataTable) {
				return;
			}

			var col = [
						{
							'bSortable' : false,
							'aTargets' : [ 0 ]
						},
						{
							sDefaultContent : '',
							aTargets : [ '_all' ]
						}
						];
			
			var manage = {
					'aTargets' : [ 5 ],
					"mData" : "管理",
					"mRender" : function(data, type, full) {
						return '<a href=showUpdSeries.htm?seriesId=' + data +'>管理</a>';
					}
				} ;
			
			if (detailManage) {
				col.push(manage);
			}
			
			// begin datatable
			var mytable = $('#models-data')
					.dataTable(
							{
								"bFilter" : false,
								"bSort" : false, // 排序功能
								"bProcessing" : true,// 设置异步请求时，是否有等待框。
								"sAjaxSource" : '../productCategory/getSeriesByBrandId.json',// 请求url
								"fnServerParams" : function(aoData) {
									aoData.push({
										"name" : "velBrandId",
										"value" : $("#brandId").val()
									});
								},
								"sServerMethod" : "POST",
								"bServerSide" : true, // 异步请求
								"aoColumns" : [ {
									"mData" : "vel_brand_chs_name"
								}, {
									"mData" : "vel_series_chs_name"
								}, {
									"mData" : "vel_series_index"
								}, {
									"mData" : "series_size_name"
								}, {
									"mData" : "vel_model_name"
								}, {
									"mData" : "vel_series_id"
								} ],
								"oLanguage" : {
									"sUrl" : "../assets/scripts/jquery.dataTable.cn.js"
								},
								"aLengthMenu" : [ [10, 20, 50],
										[ 10, 20, 50 ] // change
																	// per page
																	// values
																	// here
								],
								"iDisplayLength" : 10,
								"sPaginationType" : "bootstrap",
								"aoColumnDefs" : col
							});
			return mytable;
		}
	};

}();
