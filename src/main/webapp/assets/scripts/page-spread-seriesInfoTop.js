var TableManaged = function () {

    return {

        init: function () {
            if (!jQuery().dataTable) {
                return;
            }

            var modelsTable = $('#models-data').dataTable({
            	"bFilter": false,
            	"bProcessing": true,
                "sAjaxSource": '../spread/infoAjaxList.json',
                "fnServerParams": function ( aoData ) {
                    aoData.push( 
                    			 { "name": "publisher", "value": $("#sPublisher").val()},
                    		     { "name": "articleCategoryId", "value": $("#scategory").val()},
                    		     { "name": "startTime", "value": $("#sStartTime").val()},
                    		     { "name": "endTime", "value": $("#sEndTime").val()},
                    		     { "name": "provinceId", "value": $("#provinceId").val()},
                    		     { "name": "brandId", "value": $("#hibrandId").val()},
                    		     { "name": "seriesId", "value": $("#seriesId").val()},
                    		     { "name": "dealerName","value":$("#sdealer").val()}
                                );
                },
                "sServerMethod": "POST",
                "bServerSide": true,  
                "aoColumns": [
                          { "mData": "article.articleId","bSortable": false  },
                          { "mData": "articleCategory.articleCategoryName","bSortable": false  },
                          { "mData": "article.articleName","bSortable": false  },
                          { "mData": "article.writer","bSortable": false,
	                    	  "mRender": function (data, type, full) {
	                    		  	var publisher = $("#sPublisher").val();
	                    		  	if(publisher == "0"){
	                    		  		return full.stroeName;
	                    		  	}else{
	                    		  		return data;
	                    		  	}
				              }  
                          },
                          { "mData": "strOnshelfTime","bSortable": false  },
                          { "mData": "article.rowStatus","bSortable": false  },
                          { "mData": "article.editor","bSortable": false  },
                          { "mData": "strVelBrand","bSortable": false  },
                          { "mData": "strVelSeries" ,"bSortable": false }
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
	                		return '<input type="radio" name="checkbox" class="checkboxes" value="' + data + '"/>';
	                	}
	                },{
	                	'aTargets': [2],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                		return "<a target='_blank' href='"+$("#msDomain").val()+"/brand/newsdtl_"+full.linkInfoMain +".htm?currentPage=1'>"+full.article.articleName+"</a>";
		                	
	                	}
	                },
	                {
	                	'aTargets': [5],
	                	"mData": "",
	                	"mRender": function (data, type, full) {
	                		return "已上线";
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

           $('#models-data tbody tr .checkboxes').live("click",function(){
            	var checkboxes = $('#models-data tbody tr .checkboxes');
                checkboxes.parents('tr').removeClass('active'); //移除所有tr的active class
                checkboxes.not($(this)).attr("checked", false); //将除$(this)之外所有的.checkboxes取消选择
                   
                jQuery.uniform.update(checkboxes);  //jQuery.uniform更新数据
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

