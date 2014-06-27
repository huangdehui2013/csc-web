var TableManaged = function() {

	return {

		// main function to initiate the module
		init : function() {
			if (!jQuery().dataTable) {
				return;
			}

			var colDef = [
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
						"mRender" : function(data, type, full) {
							return '<input type="radio" name="checkbox" class="checkboxes" value="'
									+ data + '"/>';
						}
					} ];
			
				colDef.push({
					'aTargets' : [ 9 ],
					"mData" : "",
					"mRender" : function(data, type, full) {
						if (editRes) {
							var base = $("#base").val();
							var url = base
									+ '/spread/seriesInfoSetTop.htm?seriesId='
									+ full.series.velSeriesId + '&territoryId='
									+ full.territory.territoryId +'&brandId='+full.brand.velBrandId+ "&nodeId="
									+ data;
							return "<a href='" + url + "'>修改</a>"
						}else{
							return "-";
						}
					}
				})
			
			// begin datatable
			var modelsTable = $('#models-data').dataTable(
					{
						"bFilter" : false,
						"bProcessing" : true,
						"sAjaxSource" : '../spread/seriesInfoAjaxList.json',
						"fnServerParams" : function(aoData) {
							aoData.push({
								"name" : "territoryId",
								"value" : $("#qTerritoryId").val()
							}, {
								"name" : "seriesId",
								"value" : $("#qSeriesId").val()
							});
						},
						"sServerMethod" : "POST",
						"bServerSide" : true,
						"aoColumns" : [ {
							"mData" : "blockNodeId",
							"bSortable" : false
						}, {
							"mData" : "territory.territoryName",
							"bSortable" : false
						}, {
							"mData" : "brand.velBrandChsName",
							"bSortable" : false
						}, {
							"mData" : "series.velSeriesChsName",
							"bSortable" : false
						}, {
							"mData" : "articleVo.article.articleName",
							"bSortable" : false
						}, {
							"mData" : "articleVo.strRowStatus",
							"bSortable" : false
						}, {
							"mData" : "articleVo.strOnshelfTime",
							"bSortable" : false
						}, {
							"mData" : "articleVo.article.publisher",
							"bSortable" : false,
							"mRender" : function (data, type, full) {
	                    		  	if(data == '1'){
	                    		  		return "电商平台";
	                    		  	}else{
	                    		  		return data;
	                    		  	}
				              }
						}, {
							"mData" : "topTime",
							"bSortable" : false
						}, {
							"mData" : "nodeId",
							"bSortable" : false
						} ],
						"aLengthMenu" : [ [ 10, 20, 50 ], [ 10, 20, 50 ] // change
						// per
						// page
						// values here
						],
						"iDisplayLength" : 10,
						"sPaginationType" : "bootstrap",
						"oLanguage" : {
							"sUrl" : "../assets/scripts/jquery.dataTable.cn.js"
						},
						"aoColumnDefs" : colDef,
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
