var TableManaged = function () {

    return {

        //main function to initiate the module
        init: function () {
            if (!jQuery().dataTable) {
                return;
            }
            var sAjaxSource = cscBasePath + '/dealer/infoList.json';
            
            // begin datatable 
            var modelsTable = $('#models-data').dataTable({
            	"bFilter": false,
            	"bProcessing": true,
                "sAjaxSource": sAjaxSource,
                "fnServerParams": function ( aoData ) {
                    aoData.push( 
                    		     { "name": "articleCategoryId", "value": $("#scategory").val()},
                    		     { "name": "brandId", "value": $("#sbrand").val()},
                    		     { "name": "classId", "value": $("#sproductClass").val()},
                    		     { "name": "dealerName", "value": $("#dealerName").val()},
                    		     { "name": "startTime", "value": $("#qStartTime").val()},
                    		     { "name": "endTime", "value": $("#qEndTime").val()},
                    		     { "name": "rowStatus", "value": $("#rowStatus").val()}
                                );
                },
                "sServerMethod": "POST",
                "bServerSide": true,  
                "aoColumns": [
                          { "mData": "article.articleId", "sWidth": "5%","bSortable": false  },
                          { "mData": "articleCategory.articleCategoryName", "sWidth": "6%","bSortable": false  },
                          { "mData": "article.articleName","bSortable": false  },
                          { "mData": "stroeName","sWidth": "8%","bSortable": false  },
                          { "mData": "strOnshelfTime","sWidth": "8%","bSortable": false  },
                          { "mData": "strOffshelfTime","sWidth": "8%","bSortable": false  },
                          { "mData": "strRowStatus", "sWidth": "8%","bSortable": false  },
                          { "mData": "article.atricleSource","sWidth": "8%","bSortable": false  },
                          { "mData": "article.editor", "sWidth": "6%","bSortable": false  },
                          { "mData": "article.pageView", "sWidth": "8%","bSortable": false  },
                          { "mData": "strVelBrand","sWidth": "8%","bSortable": false  },
                          { "mData": "strVelSeries" ,"sWidth": "8%","bSortable": false }
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
						sDefaultContent: '',
						aTargets: [ '_all' ]
	                },
	                {
	                	'aTargets': [0],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                		return '<input type="radio" name="radio" class="checkboxes" flag="'+full.article.rowStatus+'" value="' + data + '"/>';
	                	}
	                },
	                {
	                	'aTargets': [2],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                		if(full.linkInfoMain != null && full.linkInfoMain != ''){
                				return "<a target='blank'  href="+msDomain+"/brand/newsdtl_"+full.linkInfoMain +".htm?currentPage=1  \>"+full.article.articleName+"</a>";
                				//return "<a target='blank'  href=http://172.16.1.65:8080/saic-ebiz-web-front/brand/newsdtl_"+full.linkInfoMain +".htm?currentPage=1  \>"+full.article.articleName+"</a>";
                			}
	                		return full.article.articleName;
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
          //  var checkboxes = $('#models-data tbody tr .checkboxes');
           $('#models-data tbody tr .checkboxes').live("click",function(){
            	var checkboxes = $('#models-data tbody tr .checkboxes');
                checkboxes.parents('tr').removeClass('active'); //移除所有tr的active class
                checkboxes.not($(this)).attr("checked", false); //将除$(this)之外所有的.checkboxes取消选择
                   
                jQuery.uniform.update(checkboxes);  //jQuery.uniform更新数据
                // checkboxes 选择不到:checked 的，又用$('#models-data tbody tr .checkboxes:checked')重新选择了一次
                if($('#models-data tbody tr .checkboxes:checked').length > 0){
                    $('.table-toolbar .group-control').attr('disabled', false);
                    $(this).parents('tr').addClass("active");
                    
                    //待审核的记录才能审核
//                    if($('#models-data tbody tr .checkboxes:checked').attr("flag") !='1'){
//                    	$('#verifyButton').attr('disabled', true);
//                    }
                }else{
                    $('.table-toolbar .group-control').attr('disabled', true);
                }
            });

            return modelsTable;
        }

    };

}();

