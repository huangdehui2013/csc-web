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
            var sAjaxSource = $("#cscBasePath").val() + '/activity/ajaxList.json';
            // begin datatable 
            var modelsTable = $('#models-data').dataTable({
            	"bFilter": false,
            	"bProcessing": true,
                "sAjaxSource": sAjaxSource,
                "fnServerParams": function ( aoData ) {
                    aoData.push(
                    		     { "name": "publishTimeFrom", "value": $("#seachStartTime").val()},
                    		     {"name":"brandId","value":$("#sbrand").val()},
                    		     {"name":"seriesId","value":$("#sproductClass").val()},
                    		     { "name": "publishTimeTo", "value": $("#seachEndTime").val()},
                    		     { "name": "proType", "value": $("#series-list").val()},
                    		     { "name": "proStatus", "value": $("#status-list").val()}
                    		     
                    		     
                                );
                },
                "sServerMethod": "POST",
                "bServerSide": true,  
                "aoColumns": [
                          { "mData": "promotion_id","bSortable": false, "sWidth": "5%" },
                          { "mData": "promotion_id_id","bSortable": false, "sWidth": "8%" },
                          { "mData": "promotionType","bSortable": false, "sWidth": "10%"},
                          { "mData": "title","bSortable": false},
                          { "mData": "userName","bSortable": false, "sWidth": "10%"},
                          { "mData": "publishTime","bSortable": false, "sWidth": "10%"},
                          { "mData": "offshelfTime","bSortable": false, "sWidth": "10%"},
                          { "mData": "promotionStatus","bSortable": false, "sWidth": "10%"},
                          { "mData": "startTime","bSortable": false, "sWidth": "10%"},
                          { "mData": "endTime","bSortable": false, "sWidth": "10%"},
                          { "mData": "velBrandChsNameList","bSortable": false, "sWidth": "10%"},
                          { "mData": "velSeriesChsNameList","bSortable": false, "sWidth": "10%"}
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
	                		return full.promotionId;
	                	}
	                },
	                {
	                	'aTargets': [2],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                		if(data == 'SALES'){
	                			return "销售类";
	                		}else if(data == 'GENERAL'){
	                			return "非销售类";
	                		}
	                	}
	                },
	                {
	                	'aTargets': [4],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                		if(data == 'DEALER'){
	                			return "经销商";
	                		}else if(data == 'PLATFORM'){
	                			return "运营平台";
	                		}else if(data== 'OEM'){
	                			return '主机厂';
	                		}
	                		return data;
	                	}
	                },
	                {
	                	'aTargets': [3],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                		//console.info(full.url);
	                		//return "<a href='#' data="+full.url+" onclick='clicktarget(this)'> "+full.title+" </a> ";
	                		//return "<a href=///"+full.url+"\>"+full.title+"</a>";
	                		return "<a href='"+full.url+"' target='_BLANK'> "+full.title+" </a> ";
		                	
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
	                },
	                {
	                	'aTargets': [7],
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

	                	'aTargets': [8],
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

	                	'aTargets': [9],
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
            	var checkboxes = $('#models-data tbody tr .checkboxes');
                checkboxes.parents('tr').removeClass('active'); //移除所有tr的active class
                checkboxes.not($(this)).attr("checked", false); //将除$(this)之外所有的.checkboxes取消选择
                   
                jQuery.uniform.update(checkboxes);  //jQuery.uniform更新数据
                // checkboxes 选择不到:checked 的，又用$('#models-data tbody tr .checkboxes:checked')重新选择了一次
                if($('#models-data tbody tr .checkboxes:checked').length > 0){
                    $('.table-toolbar .group-control').attr('disabled', false);
                    $(this).parents('tr').addClass("active");
                }else{
                    $('.table-toolbar .group-control').attr('disabled', true);
                }
            });
            var oSettings = modelsTable.fnSettings();
            if(oSettings.aoColumns.length>0){
            	
            	
            }
           // alert(oSettings._iDisplayStart);
            //alert(oSettings.aoColumns.);
            return modelsTable;
        }

    };

}();

