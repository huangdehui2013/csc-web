var TableManaged = function () {

    return {

        //main function to initiate the module
        init: function () {
            if (!jQuery().dataTable) {
                return;
            }

            // begin datatable 
            var modelsTable = $('#models-data').dataTable({
            	"bProcessing": true,
            	"bFilter": false,
                "sAjaxSource": '../hotkey/hotkeyAjaxList.json',
                "sServerMethod": "POST",
                "bServerSide": true,  
                "aoColumns": [
                              { "mData": "id","bSortable": false,"sWidth": "10%"   },
                              { "mData": "fileDate","bSortable": false,"sWidth": "40%" },
                              { "mData": "fileUrl","bSortable": false,"sWidth": "50%" }
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
	                },
	                {

	                	'aTargets': [1],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                		var dateFormat =new Date(data);
	                		var year=dateFormat.getFullYear();     
	                	    var month=dateFormat.getMonth()+1;     
	                	    var day=dateFormat.getDate();     
	                	    var hour=dateFormat.getHours();     
	                	    var minute=dateFormat.getMinutes();     
	                	    var second=dateFormat.getSeconds();    
	                	    var nowdate=year+"-"+month+"-"+day;
	                		return nowdate;
	                	}
	                }
	               ,
	               {

	                	'aTargets': [2],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                		  
	                		return "<a href='#' data="+data+" onclick='downloadb(this);'>下载</a>";
	                	}
	                }
	               ,
	                {
						sDefaultContent: '',
						aTargets: [ '_all' ]
	                },
	               
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
        
//            $('#models-data tbody tr .checkboxes').live("click",function(){
//            	var checkboxes = $('#models-data tbody tr .checkboxes');
//                checkboxes.parents('tr').removeClass('active'); //移除所有tr的active class
//                checkboxes.not($(this)).attr("checked", false); //将除$(this)之外所有的.checkboxes取消选择
//                   
//                jQuery.uniform.update(checkboxes);  //jQuery.uniform更新数据
//                // checkboxes 选择不到:checked 的，又用$('#models-data tbody tr .checkboxes:checked')重新选择了一次
//                if($('#models-data tbody tr .checkboxes:checked').length > 0){
//                    $('.table-toolbar .group-control').attr('disabled', false);
//                    $(this).parents('tr').addClass("active");
//                }else{
//                    $('.table-toolbar .group-control').attr('disabled', true);
//                }
//            });

            return modelsTable;
        }

    };

}();








//
//
//
//
//
//
//
//
//
//var TableManaged = function () {
//
//    return {
//
//        //main function to initiate the module
//        init: function () {
//            if (!jQuery().dataTable) {
//                return;
//            }
//
//            // begin datatable 
//            
//            var modelsTable = $('#models-data').dataTable({
//            	"bProcessing": true,
//                "sAjaxSource": '../user/userAjaxList.json',
//                "fnServerParams": function ( aoData ) {
//                	 aoData.push( 
//                		     { "name": "selectTypies", "value": $("#selectType").val()},
//                		     { "name": "selectStatuses", "value": $("#selectStatus").val()}
//                		   
//                            );
//            },
//            "sServerMethod": "POST",
//            "bServerSide": true,  
//                "aoColumns": [
//                  { "mData": "objectId","bSortable": false   },
//                  { "mData": "objectId","bSortable": false },
//                  { "mData": "objectType","bSortable": false },
//                  { "mData": "content","bSortable": false },
//                  { "mData": "createUser","bSortable": false },
//                  { "mData": "createDate","bSortable": false },
//                  { "mData": "auditState","bSortable": false  }
//                 
//                 
//                ],
//                "aLengthMenu": [
//                    [10, 20, 50, -1],
//                    [10, 20, 50, "All"] // change per page values here
//                ],
//                "iDisplayLength": 10,
//                "sPaginationType": "bootstrap",
//                "oLanguage": {
//              	   "sUrl": "../assets/scripts/jquery.dataTable.cn.js"
//                },
//                "aoColumnDefs": [{
//	                    'bSortable': false,
//	                    'aTargets': [0]
//	                },
//	                {
//						sDefaultContent: '',
//						aTargets: [ '_all' ]
//	                },
//	                {
//	                	'aTargets': [0],
//	                	"mData": "",
//	                	"mRender": function (data, type, full) {
//	                		return '<input type="checkbox" name="checkbox" class="checkboxes" value="' + data + '"/>';
//	                	}
//	                }
////	                {
////	                	'aTargets': [6],
////	                	"mData": "",
////	                	"mRender": function (data, type, full) {
////	                		if(data == 'P'){
////	                			return "待审核";
////	                		}else if(data == 'A'){
////	                			return "已上线";
////	                		}else if(data == 'D'){
////	                			return "已下线";
////	                		}else if(data == 'R'){
////	                			return "审核失败";
////	                		}
////	                	}
////	                }
//	            ]
//            });
//
//            //表头前面的checkbox（文档内要求一次只能操作一项，故注释掉）
//            /*jQuery('#models-data .group-checkable').change(function () {
//                var set = jQuery(this).attr("data-set");
//                var checked = jQuery(this).is(":checked");
//                jQuery(set).each(function () {
//                    if (checked) {
//                        $(this).attr("checked", true);
//                    } else {
//                        $(this).attr("checked", false);
//                    }
//                    $(this).parents('tr').toggleClass("active");
//                });
//                jQuery.uniform.update(set);
//
//            });*/
//
//            //具体某一项前面的checkbox，只能选择某一项，不能全选
////            var checkboxes = $('#models-data tbody tr .checkboxes');
////            checkboxes.click(function(){
//////                checkboxes.parents('tr').removeClass('active'); //移除所有tr的active class
//////                checkboxes.not($(this)).attr("checked", false); //将除$(this)之外所有的.checkboxes取消选择
////                   if($(this).attr("checked")!="checked"){
////                	   alert(1);
////                	   $(this).prev.document.getElementsByTagName('tr').removeClass('active');
////                	   alert( $(this).prev.document.getElementsByTagName('tr'));
////                   }
////                 $(this).attr("checked",  $(this).attr("checked") ? true : false ); 
////                jQuery.uniform.update(checkboxes);  //jQuery.uniform更新数据
////                // checkboxes 选择不到:checked 的，又用$('#models-data tbody tr .checkboxes:checked')重新选择了一次
////                if($('#models-data tbody tr .checkboxes:checked').length > 0){
////                    $('.table-toolbar .group-control').attr('disabled', false);
////                    $(this).parents('tr').addClass("active");
////                }else{
////                    $('.table-toolbar .group-control').attr('disabled', true);
////                }
////            });
//
//
///*            // general settings  模态弹窗
//            $.fn.modal.defaults.spinner = $.fn.modalmanager.defaults.spinner = 
//              '<div class="loading-spinner" style="width: 200px; margin-left: -100px;">' +
//                '<div class="progress progress-striped active">' +
//                  '<div class="progress-bar" style="width: 100%;"></div>' +
//                '</div>' +
//              '</div>';
//
//            //ajax demo:
//            var $modal = $('#update-model-modal');
//
//            $('#btn-update-model-outer').on('click', function(){
//              // create the backdrop and wait for next modal to be triggered
//              $('body').modalmanager('loading');
//
//              setTimeout(function(){
//                  $modal.load('ui_extended_modals_ajax_sample.html', '', function(){
//                  $modal.modal();
//                });
//              }, 1000);
//            });
//
//            $modal.on('click', '.update', function(){
//              $modal.modal('loading');
//              setTimeout(function(){
//                $modal
//                  .modal('loading')
//                  .find('.modal-body')
//                    .prepend('<div class="alert alert-info fade in">' +
//                      'Updated!<button type="button" class="close" data-dismiss="alert">&times;</button>' +
//                    '</div>');
//              }, 1000);
//            });*/
//        }
//
//    };
//
//}();
//
