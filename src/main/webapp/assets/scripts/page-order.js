var TableManaged = function () {

    return {

        //main function to initiate the module
        init: function () {
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
            var modelsTable = $('#models-data').dataTable({
            	"bFilter": false,
            	"bProcessing": true,
                "sAjaxSource": '../salesOrder/salesOrderAjaxLists.json',
                "fnServerParams": function ( aoData ) {
                    aoData.push(
                    		     { "name": "preOrderId", "value": $("#preOrderId").val()},
                    		     {"name":"dealerId","value":$("#dealerId").val()},
                    		     { "name": "brandId", "value": $("#brandId").val()},
                    		     {"name":"velSeriesId","value":$("#velSeriesId").val()},
                    		     { "name": "velModelId", "value": $("#velModelId").val()},
                    		     {"name":"prmtActName","value":$("#prmtActName").val()},
                    		     { "name": "userName", "value": $("#userName").val()},
                    		     {"name":"mobileNo","value":$("#mobileNo").val()},
                    		     { "name": "startSubmitTime", "value": $("#startSubmitTime").val()},
                    		     {"name":"endSubmitTime","value":$("#endSubmitTime").val()},
                    		     {"name":"status","value":$("#status").val()}
                    		     
                    		     
                                );
                },
                "sServerMethod": "POST",
                "bServerSide": true,  
                "aoColumns": [
                          { "mData": "preOrderId","bSortable": false  },
                          { "mData": "dealerName ","bSortable": false  },
                          { "mData": "brandName ","bSortable": false  },
                          { "mData": "velSeriesName ","bSortable": false  },
                          { "mData": "velModelName ","bSortable": false  },
                          { "mData": "prmtActName ","bSortable": false  },
                          { "mData": "userName","bSortable": false  },
                          { "mData": "mobileNo ","bSortable": false  },
                          { "mData": "createTime ","bSortable": false  },
                          { "mData": "status","bSortable": false  }
                         
                ],
                "aLengthMenu": [
                    [10, 20, 50],
                    [10, 20, 50] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 10,
                "sPaginationType": "bootstrap",
                "oLanguage": {
              	   "sUrl": "../assets/scripts/jquery.dataTable.cn.js"
                },
                
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

