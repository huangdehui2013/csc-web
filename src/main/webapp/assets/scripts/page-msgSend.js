var TableManaged = function () 
{
    return {

        //main function to initiate the module
        init: function () {
            if (!jQuery().dataTable) {
                return;
            }

            // begin datatable 
            var col = [{
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
                		return '<input type="radio" name="radio" class="checkboxes" value="' + full.task_id + '"/>';
                	}
                },
	            {
                	'aTargets': [5],
                	"mData": "查看",
                	"mRender": function (data, type, full) {
                		if(cscSendMsgView){
                			return "<button type='button' class='btn blue' id='view_detail' name ='"+full.task_id+"' >查看</button>";
                		}
                		return "";
                	}
                },
                {
                	'aTargets': [3],
                	"mRender": function (data, type, full) {
                		var result;
                		if(data=='I'){
                			result="已经导入";
            			}else if (data=='E'){
            				result="正在执行";
            			}else if (data=='A'){
            				result="审核通过";
            			}else if (data=='R'){
            				result="审核失败";
        				}else if (data=='F'){
            				result="发送完成";
        				}
                        return result;
                    	}
                },
                {
                	'aTargets': [4],
                	"mRender": function (data, type, full) {
                		if(full.task_status == 'A' &&　cscSendMsgSend) {
                			return "<button type='button' class='btn blue' id='send_button' name ='"+full.task_id+"' >执行发送</button>";
            			}else if (full.task_status=='E') {
            				return "<button type='button' class='btn blue' id='refresh_data' name ='"+full.task_id+"' >刷新</button>";
        				}else if (full.task_status=='F') {
        					return "";
        				}
                    }
                }
	        ];
            
          
            
            
          var mytable= $('#models-data').dataTable({
        	  	 "bFilter": false,
            	 "bSort": false, //排序功能
                 "bAutoWidth": false,   //自动计算宽度
            	 "bProcessing": true,//设置异步请求时，是否有等待框。 
                 "sAjaxSource": '../msgSend/msgSendList.json',//请求url
                 "fnServerParams": function ( aoData ) {
                     aoData.push(  
                     		    { "name": "taskStatus", "value": $("#taskStatus").val()}
                                 );
                 },
                 "sServerMethod": "POST",
                 "bServerSide": true,  //异步请求
                 "aoColumns": [
                               { "mData": "task_id",'sWidth':'5%' },
                               { "mData": "create_time",'sWidth':'15%','sClass':'text-center' },
                               { "mData": "creator",'sWidth':'50%' },
                               { "mData": "task_status",'sWidth':'10%','sClass':'text-center' },
                               { "mData": "total_count",'sWidth':'10%','sClass':'text-center' },
                               { "mData": "task_id" , "sWidth": "10%",'sClass':'text-center' } 
                                
                           ],
                "oLanguage": {
                	   "sUrl": "../assets/scripts/jquery.dataTable.cn.js"
                           },
                "aLengthMenu": [
                    [10, 20, 50],
                    [10, 20, 50] // change per page values here
                ],
                "iDisplayLength": 10,
                "sPaginationType": "bootstrap",
                "aoColumnDefs": col,
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
//                ,
//                "fnCreatedRow": function( nRow, aData, iDataIndex ) {
//                      $('td:eq(0)', nRow).html(eval(iDataIndex+1));
//                  }
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
	       
            return mytable;
        }
    };

}();

