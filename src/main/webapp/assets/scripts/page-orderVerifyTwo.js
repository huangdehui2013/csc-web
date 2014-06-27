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
                return '<input type="radio" name="productIds" id="productIds" class="checkboxes" value="' + full.preOrderId + "," + full.storeId + "," + full.preAuditStatus + "," +full.storeName +","+full.prmtActName+'">';
            	}
            }
            
            
        ];
            
            /*var manage = {
                	'aTargets': [11],
                	"mData": "管理",
                	"mRender": function (data, type, full) {
                    return '<a href="../velModel/showImages.htm?categroyId=1&pageSize=16&pageNo=1&velModelId='+ data +'" >管理</a>';
                	}
                }
            
            if (picManage) {
            	col.push(manage);
            }*/
            
            
          var mytable= $('#models-data').dataTable({
        	  	 "bFilter": false,
            	 "bSort": false, //排序功能
                 "bAutoWidth": false,   //自动计算宽度
            	 "bProcessing": true,//设置异步请求时，是否有等待框。 
                 "sAjaxSource": '../orderverifyTwo/twoInOneAjaxList.json',//请求url
                 "fnServerParams": function ( aoData ) {
                     aoData.push( { "name": "storeId", "value": $("#storeId").val()},
                     		     { "name": "prmtActId", "value": $("#prmtActId").val()},
                     		     { "name": "auditStatus", "value": $("#auditStatus").val()},
                     		     { "name": "startTime", "value": $("#startTime").val()},
                     		     { "name": "endTime", "value": $("#endTime").val()}
                                 );
                 },
                 "sServerMethod": "POST",
                 "bServerSide": true,  //异步请求
                 "aoColumns": [
                               { "mData": "preOrderId" },//checkbox-value
                               { "mData": "preOrderId" },
                               { "mData": "prmtActName" },
                               { "mData": "storeName" },
                               { "mData": "velModelName" },
                               { "mData": "status" },
                              // { "mData": "o2oStatus" },
                              // { "mData": "crmStatus" },
                               { "mData": "payStatus" },
                               { "mData": "userName"},
                               //{ "mData": "userId"},
                               { "mData": "realName"},
                               { "mData": "mobileNo"},
                               { "mData": "createTime"},
                               { "mData": "preAuditStatus"}
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
                checkboxes.parents('tr').removeClass('active'); //移除所有tr的active class
                checkboxes.not($(this)).attr("checked", false); //将除$(this)之外所有的.checkboxes取消选择
                   
                jQuery.uniform.update(checkboxes);  //jQuery.uniform更新数据
                
                if($('input[name="productIds"]:checked').length > 0)
                {
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

