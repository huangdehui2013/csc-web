var TableManaged = function () {

    return {

        //main function to initiate the module
        init: function () {
            if (!jQuery().dataTable) {
                return;
            }
            var sAjaxSource = cscBasePath + '/info/infoAjaxList.json';
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
                    		     { "name": "startTime", "value": $("#qStartTime").val()},
                    		     { "name": "endTime", "value": $("#qEndTime").val()},
                    		
                    		     { "name": "rowStatus", "value": $("#rowStatus").val()}
                                );
                },
                "sServerMethod": "POST",
                "bServerSide": true,  
                "aoColumns": [
                          { "mData": "article.articleId","sWidth": "4%","bSortable": false  },
                          { "mData": "articleCategory.articleCategoryName","sWidth": "6%","bSortable": false  },
                          { "mData": "article.articleName","sWidth": "12%","bSortable": false  },
//                          { "mData": "article.subTitle","bSortable": false  },
//                          { "mData": "article.keywords","bSortable": false  },
//                          { "mData": "article.puber","bSortable": false  },
                          { "mData": "article.writer","sWidth": "7%","bSortable": false  },
                          { "mData": "strOnshelfTime","sWidth": "9%","bSortable": false  },
//                          { "mData": "strOffshelfTime" ,"bSortable": false },
                          { "mData": "article.rowStatus","sWidth": "8%","bSortable": false  },
//                          { "mData": "article.articleCategory.categoryName","bSortable": false  },
                          { "mData": "article.materialSource","sWidth": "9%","bSortable": false  },
                          { "mData": "article.editor","sWidth": "7%","bSortable": false  },
                          { "mData": "article.pageView","sWidth": "7%","bSortable": false  },
                          { "mData": "strVelBrand","sWidth": "12%","bSortable": false  },
                          { "mData": "strVelSeries" ,"sWidth": "12%","bSortable": false }
                ],
                "aLengthMenu": [
                    [ 10, 20, 50],
                    [ 10, 20, 50]// change per page values here
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
	                		return '<input type="radio" name="radio" class="checkboxes" value="' + data + '"/>';
	                	}
	                },{
	                	'aTargets': [2],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                			if(full.linkInfoMain != null && full.linkInfoMain != ''){
	                				return "<a target='blank'  href="+msDomain+"/brand/newsdtl_"+full.linkInfoMain +".htm?currentPage=1  \>"+full.article.articleName+"</a>";
	                				//return "<a target='blank' href=http://172.16.1.65:8080/saic-ebiz-web-front/brand/newsdtl_"+full.linkInfoMain +".htm?currentPage=1  \>"+full.article.articleName+"</a>";
	                			}
	                		return full.article.articleName;
		                	
	                	}
	                },
	                {
	                	'aTargets': [5],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                		if(data == 'P'){
	                			return "待审核";
	                		}else if(data == 'A'){
	                			return "已上线";
	                		}else if(data == 'D'){
	                			return "已下线";
	                		}else if(data == 'R'){
	                			return "审核失败";
	                		}
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
                }else{
                    $('.table-toolbar .group-control').attr('disabled', true);
                }
            });

            return modelsTable;
        }

    };

}();

