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
                "sAjaxSource": '../carowner/ajaxList.json',
                "fnServerParams": function ( aoData ) {
                    aoData.push(
                    		     { "name": "status", "value": $("#status").val()},
                    		     {"name":"applyDate","value":$("#qdate").val()}
                    		     
                    		     
                                );
                },
                "sServerMethod": "POST",
                "bServerSide": true,  
                "aoColumns": [
                          { "mData": "bindApplId","bSortable": false  },
                          { "mData": "status","bSortable": false  },
                          { "mData": "userId","bSortable": false  },
                          { "mData": "ownerName","bSortable": false  },
                          { "mData": "ownerMobile","bSortable": false  },
                          { "mData": "productName","bSortable": false  },
                          { "mData": "brandName","bSortable": false  },
                          { "mData": "seriesName","bSortable": false  },
                          { "mData": "vin","bSortable": false  },
                          { "mData": "bindApplyDate","bSortable": false  }
                         
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
	                		console.info(full.bindApplId);
	                		return '<input type="radio" name="checkbox" class="checkboxes" value="' + full.userId + ','+full.bindApplId+','+full.applProcessId+ ','+full.status+ '"/>';
	                	}
	                },
	                {
	                	'aTargets': [1],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                		if(data == '1'){
	                			return "待认证";
	                		}else if(data == '2'){
	                			return "认证通过";
	                		}else if(data=='3'){
	                			return '认证不通过';
	                		}
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
							
							
							
							var nowdate = year + "-" + month + "-"
									+ day;
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
            
            return modelsTable;
        }

    };

}();

