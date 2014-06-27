var TTTableManaged = function () {

    return {

        //main function to initiate the module
        init: function () {
            if (!jQuery().dataTable) {
                return;
            }

            // begin datatable 
            var modelsTable = $('#models-data-child').dataTable({
            	"bFilter": false,
            	"bProcessing": true,
                "sAjaxSource": '../activity/findStoreList.json',
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "dealerId", "value": $("#qdealerId").val()==''?-1:$("#qdealerId").val()},
                    		{ "name": "provinceId", "value": $("#provinceId").val()==''?-1:$("#provinceId").val()},
                    		{ "name": "cityId", "value": $("#cityId").val()==''?-1:$("#cityId").val()},
                    		{ "name": "districtId", "value": $("#districtId").val()==''?-1:$("#districtId").val()},
                    		{ "name": "dealerName", "value":$("#qdealerName").val()}
                           );
           },
                "sServerMethod": "POST",
                "bServerSide": true,  
                "aoColumns": [
                          { "mData": "storeId","bSortable": false  },
                          { "mData": "storeId","bSortable": false  },
                          { "mData": "storeName","bSortable": false  }
                         
                ],
                "aLengthMenu": [
                    [10, 20, 50],
                    [10, 20, 50] // change per page values here
                ],
                "iDisplayLength": 10,
                "sPaginationType": "bootstrap",
                "oLanguage": {
              	   "sUrl": "../assets/scripts/jquery.dataTable.cn.js"
                },
                "aoColumnDefs": [{
	                    'bSortable': false,
	                    'aTargets': [0]
	                },
	                {
						sDefaultContent: '',
						aTargets: [ '_all' ]
	                },
	                {
	                	'aTargets': [0],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                		
	                			return '<input type="radio" name="checkbox" class="checkboxes" value="' + full.storeId+'"/>';
	                	
	                	}
	                }
	            ],
                // 在每次获取数据并创建DOM后执行的操作（调用uniform插件，美化checkbox）
                "fnDrawCallback": function( oSettings ) {
                    $('input.checkboxes').uniform();    // 调用uniform,美化checkbox
                },
                //在Table初始化完成之后
                "fnInitComplete": function(oSettings, json) {
                	 // 为每页显示多少条记录的select增加class
                    $('.dataTables_length select').addClass("form-control input-sm");
                    // 为搜索框input增加class
                    $('.dataTables_filter input').addClass("form-control input-medium");
                }
            });

            
            return modelsTable;
        }

    };

}();

