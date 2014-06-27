var TableManaged = function () {

    return {

        //main function to initiate the module
        init: function () {
            if (!jQuery().dataTable) {
                return;
            }

            // begin datatable 
            var modelsTable = $('#models-data').dataTable({
            	"bFilter": false,
            	"bProcessing": true,
                "sAjaxSource": '../pay/ajaxList.json',
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "status", "value": $("#qstatus").val()},
                    		{"name":"payType","value":"settlement"}
                           );
           },
                "sServerMethod": "POST",
                "bServerSide": true,  
                "aoColumns": [
                          { "mData": "settleId","bSortable": false  },
                          { "mData": "settleId","bSortable": false  },
                          { "mData": "storeId","bSortable": false  },
                          { "mData": "storeName","bSortable": false  },
                          { "mData": "txnCount","bSortable": false  },
                          { "mData": "txnAmtTotal","bSortable": false  },
                          { "mData": "settleAmtTotal","bSortable": false  },
                          { "mData": "serviceFeeTotal","bSortable": false  },
                          { "mData": "startTime","bSortable": false  },                        
                          { "mData": "endTime","bSortable": false  },
                          { "mData": "status.name","bSortable": false  },
                          { "mData": "confirmTime","bSortable": false  }
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
	                		if(full.status.code=='1'){
	                			return '<input type="radio" name="checkbox" class="checkboxes" data="'+full.confirmStaff+'" value="' + full.settleId+'"/>';
	                		}
	                		
	                	}
	                },
	                {

	                	'aTargets': [8],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
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

	                	'aTargets': [9],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
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

	                	'aTargets': [11],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                		if(data==''){
	                			return '';
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

