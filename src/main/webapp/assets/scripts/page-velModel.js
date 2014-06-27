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
                return '<input type="checkbox" name="productIds" class="checkboxes" value="' + data + '">';
            	}
            },
            {
            	'aTargets': [7],
            	"mRender": function (data, type, full) {
            		var result;
            		if(data=='1')
        			{
            			result="待发布";
        			}
            		if(data=='2')
        			{
            			result="待上市";
        			}else if (data=='3')
    				{
        				result="已上市";
    				}
        			else if (data=='4')
    				{
        				result="已下市";
    				}
                    return result;
                	}
            },
            {
            	'aTargets': [8],
            	"mRender": function (data, type, full) {
            		var result;
            		if(data=='1')
        			{
            			result="在产";
        			}else if (data=='2')
    				{
        				result="停产";
    				}
                    return result;
                	}
            }
            
            
        ];
            
            var manage = {
                	'aTargets': [11],
                	"mData": "管理",
                	"mRender": function (data, type, full) {
                    return '<a href="../velModel/showImages.htm?categroyId=1&pageSize=16&pageNo=1&velModelId='+ data +'" >管理</a>';
                	}
                }
            
            if (picManage) {
            	col.push(manage);
            }
            
            
          var mytable= $('#models-data').dataTable({
        	  	 "bFilter": false,
            	 "bSort": false, //排序功能
                 "bAutoWidth": false,   //自动计算宽度
            	 "bProcessing": true,//设置异步请求时，是否有等待框。 
                 "sAjaxSource": '../velModel/list.json',//请求url
                 "fnServerParams": function ( aoData ) {
                     aoData.push( { "name": "velBrandId", "value": $("#brandId").val()},
                     		     { "name": "velSeriesId", "value": $("#seriesId").val()},
                     		     { "name": "velModelId", "value": $("#velModelId").val()},
                     		     { "name": "velModelStatus", "value": $("#velModelStatus").val()},
                     		    { "name": "productionStatus", "value": $("#productionStatus").val()}
                                 );
                 },
                 "sServerMethod": "POST",
                 "bServerSide": true,  //异步请求
                 "aoColumns": [
                               { "mData": "vel_model_id" },
                               { "mData": "vel_model_id" , "sWidth": "80px" },
                               { "mData": "oems_id" , "sWidth": "100px" },
                               { "mData": "vel_model_name" , "sWidth": "130px"  },
                               { "mData": "vel_brand_id" , "sWidth": "80px"},
                               { "mData": "vel_series_id", "sWidth": "80px" },
                               { "mData": "vel_year_style_id" , "sWidth": "40px" },
                               { "mData": "vel_model_status" , "sWidth": "80px" },
                               { "mData": "production_status" , "sWidth": "80px" },
                               { "mData": "onmrkt_date" , "sWidth": "100px" },
                               // { "mData": "offmrkt_date" },
                               { "mData": "guide_price" , "sWidth": "120px" },
                               { "mData": "vel_model_id" , "sWidth": "60px" }
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
            });

            //具体某一项前面的checkbox，只能选择某一项，不能全选
             $("input[name='productIds']").live('click',function()
             {
             	var checkboxes = $("input[name='productIds']");
                 //checkboxes.parents('tr').removeClass('active'); //移除所有tr的active class
                 //checkboxes.not($(this)).attr("checked", false); //将除$(this)之外所有的.checkboxes取消选择
            	
                 jQuery.uniform.update(checkboxes);  //jQuery.uniform更新数据
                 if ($(this).attr('checked') != 'checked') {
                 	$(this).parents('tr').removeClass('active'); 
                 } else {
                 	$(this).parents('tr').addClass("active");
                 }
                
                 if($('input[name="productIds"]:checked').length > 0)
                 {
                     $('.table-toolbar .group-control').attr('disabled', false);
                    
                 }else{
                     $('.table-toolbar .group-control').attr('disabled', true);
                 }
             });
            
            $('#models-data .group-checkable').change(function () {
                var set = $(this).attr("data-set");
                var checked = $(this).is(":checked");
                $(set).each(function () {
                    if (checked) {
                        $(this).attr("checked", true);
                        $(this).parents('tr').addClass("active");
                        $('.table-toolbar .group-control').attr('disabled', false);
                    } else {
                        $(this).attr("checked", false);
                        $(this).parents('tr').removeClass("active");
                        $('.table-toolbar .group-control').attr('disabled', true);
                    }                    
                });
                $.uniform.update(set);
            });

            $('#models-data tbody tr .checkboxes').change(function(){
                 $(this).parents('tr').toggleClass("active");
            });
            
            return mytable;
        }
    };

}();

