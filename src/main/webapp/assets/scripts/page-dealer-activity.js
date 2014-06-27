var TableManaged = function () {

    return {

        //main function to initiate the module
        init: function () {
            if (!jQuery().dataTable) {
                return;
            }

            $(".form_datetime").datetimepicker({
                autoclose: true,
                isRTL: App.isRTL(),
                language: 'zh-CN',
                pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left")
            });

            // begin datatable 
            var modelsTable = $('#models-data').dataTable({
            	"bFilter": false,
            	"bProcessing": true,
                "sAjaxSource": '../dealer/getActivityList.json',
                "fnServerParams": function ( aoData ) {
                	aoData.push(
                    		     { "name": "publishTimeFrom", "value": $("#seachStartTime").val()},
                    		     {"name":"brandId","value":$("#brandId").val()},
                    		     {"name":"seriesId","value":$("#seriesId").val()},
                    		     { "name": "publishTimeTo", "value": $("#seachEndTime").val()},
                    		     { "name": "storeName", "value": $("#storeName").val()},
                    		     { "name": "proStatus", "value": $("#proStatus").val()}
                    		   );
                },
                "sServerMethod": "POST",
                "bServerSide": true,  
                "aoColumns": [
                          { "mData": "promotion_id", "sWidth": "3%"  },
                          { "mData": "title","bSortable": false  },
                          { "mData": "creator","sWidth": "7%","bSortable": false  },
                          { "mData": "publishTime", "sWidth": "13%","bSortable": false   },
                          { "mData": "promotionStatus", "sWidth": "8%","bSortable": false  },
                          { "mData": "startTime", "sWidth": "13%","bSortable": false   },
                          { "mData": "endTime", "sWidth": "13%","bSortable": false   },
                          { "mData": "storeNameList","sWidth": "13%","bSortable": false  },
                          { "mData": "velBrandChsNameList", "sWidth": "8%","bSortable": false }
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
                "aoColumnDefs": [{
                        'bSortable': false,
                        'aTargets': [0]
                    },{
						sDefaultContent: '',
						aTargets: [ '_all' ]
	                },
	                {
	                	'aTargets': [0],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                		return '<input type="radio" name="checkbox" class="checkboxes" value="' + full.promotionStatus + ','+full.promotionId+','+full.promotionType+'"/>';
	                	}
	                },
	                {
	                	'aTargets': [1],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                		return "<a href='"+full.url+"' target='_BLANK'>"+full.title+"</a>";
		                	
	                	}
	                },
	                {

	                	'aTargets': [3],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
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

	                	'aTargets': [5],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
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
	                	'aTargets': [4],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                		if(data == 'WAITING_FOR_APPROVING'){
	                			return "待审核";
	                		}else if(data == 'REJECTED'){
	                			return "审核失败";
	                		}else if(data == 'WAITING_FOR_PUBLISHING'){
	                			return "待发布";
	                		}else if(data == 'PUBLISHED'){
	                			return "已发布";
	                		}else if(data == 'ONGOING'){
	                			return "进行中";
	                		}else if(data == 'FINSHED'){
	                			return "已失效";
	                		}else if(data == 'OFFSHELF'){
	                			return "已下线";
	                		}
	                	}
	                },
	                {
	                	'aTargets': [7],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                		return "" +
	                				"<a id='info"+full.promotionId+"List"+"' style='display:none' onclick='infoClose(this.id);'>"+full.storeNameList+"</a>"+"<a id='info"+full.promotionId+"' style='display:block' onclick='infoShow(this.id);'>店铺信息</a>";
		                	
	                	}
	                },
	                {

	                	'aTargets': [6],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
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


            //具体某一项前面的checkbox，只能选择某一项，不能全选
            $('#models-data tbody tr .checkboxes').live("click",function(){
            	$('.table-toolbar .group-control').attr('disabled', false);
            });
            
            return modelsTable;
        }

    };

}();

