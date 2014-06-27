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
                    rtl: App.isRTL(),
                    autoclose: true,
                    language:'zh-CN'
                });
                $('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
            }
            
            // begin datatable 
            var modelsTable = $('#models-data').dataTable({
            	"bFilter": false,
            	"bProcessing": true,
                "sAjaxSource": '../pay/ajaxList.json',
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "startDate", "value":$("#startDate").val()},
                    		{ "name": "endDate", "value": addDay($("#endDate").val())},
                    		{ "name": "payType", "value": 'auditMonth'}
                    		
                           );
           },
                "sServerMethod": "POST",
                "bServerSide": true,  
                "aoColumns": [
                          { "mData": "startDate","bSortable": false  },
                          { "mData":"endDate","bSortable": false  },
                          { "mData": "storeId","bSortable": false  },
                          { "mData": "refundSuccCount","bSortable": false  },
                          { "mData": "refundFailCount","bSortable": false  },
                          { "mData": "paySuccCount","bSortable": false  },
                          { "mData": "payFailCount","bSortable": false  },
                          { "mData": "refundSuccAmt","bSortable": false  },
                          { "mData": "refundFailAmt","bSortable": false  },                        
                          { "mData": "paySuccAmt","bSortable": false  },
                          { "mData": "payFailAmt","bSortable": false  },
                          { "mData": "sumAmt","bSortable": false  }
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
	                		var d=$("#startDate").val();
	                		
	                		return d;
	                	}
	                },
	                {

	                	'aTargets': [1],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                		var d=$("#endDate").val();
	                		return d;
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


function addDay(endTime){
	 if(endTime!=""){
		    var   s   =   endTime;   
		    var   d   =   new   Date(Date.parse(s.replace(/-/g,   "/")));   
		    var n = d.getTime() + 1 * 24 * 60 * 60 * 1000;
		    var result = new Date(n);
		    endTime=result.getFullYear() + "-" + (result.getMonth() + 1) + "-" + (result.getDate());
     }
	  return endTime;
}

