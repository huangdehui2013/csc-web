var TableManaged = function () {

    return {

        //main function to initiate the module
        init: function () {
            if (!jQuery().dataTable) {
                return;
            }

            // begin datatable 
            var mytable= $('#models-data').dataTable({
            	"bFilter": false,//不显示搜索框
            	"bSort": false, //排序功能
           	 	"bProcessing": true,//设置异步请求时，是否有等待框。 
                "sAjaxSource": '../dealer/list.json',//请求url
                "fnServerParams": function ( aoData ) {
                    aoData.push( { "name": "brandId", "value": $("#brands").val()},
                    		     { "name": "storeStatus", "value": $("#status").val()},
                    		     { "name": "dealerName", "value": $("#dealerName").val()},
                    		     { "name": "storeName", "value": $("#storeName").val()},
                    		     { "name": "provinceId", "value": $("#addressListFirst").val()},
                    		     { "name": "cityId", "value": $("#addressListSecond").val()},
                    		     { "name": "domain", "value": $("#domain").val()},
                    		     
                    		     { "name": "districtId", "value": $("#addressListThird").val()}
                                );
                },
                "sServerMethod": "POST",
                "bServerSide": true,  //异步请求
                "aoColumns": [
                              { "mData": "storeId", "sWidth": "4%" },
                              { "mData": "storeId", "sWidth": "8%" },
                              { "mData": "storeName"},
                              { "mData": "dealer.oems","sWidth": "12%" },
                              { "mData": "dealer.dealerName" },
                              { "mData": "brandName", "sWidth": "8%" },
                              { "mData": "storeStatus", "sWidth": "8%" },
                              { "mData": "rtfId","sWidth": "6%" }
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
                "aoColumnDefs": [
                    {
						sDefaultContent: '',
						aTargets: [ '_all' ]
                    },
                    {
                    	'aTargets': [0],
                    	"mRender": function (data, type, full) {
                        return '<input type="radio" name="storeIds" class="checkboxes" data-set="#models-data .checkboxes" value="' + data + '">';
                    	}
                    }, {
                    	'aTargets': [2],
                    	"mRender": function (data, type, full) {
                    		
                    	if(typeof(full.storeUrl) != 'undefined'){
                    		return '<a href="'+full.storeUrl+'" target="_blank">'+full.storeName+'</a>';
                        }else{
                        	if(data==''){
                        		return '暂无';
                        	}else{
                        		return data;
                        	}
                        }	
                        }
                    },
                    {
                    	'aTargets': [6],
                    	"mRender": function (data, type, full) {
                            return data=='1'?'<label class="stateSign" caption="正常运营">正常运营</label>':'<label class="stateSign" caption="已下线">已下线</label>';
                        	}
                    },
                    {
                    	'aTargets': [7],
                    	"mRender": function (data, type, full) {
                        if(data == ''){
                        	return '暂无';
                        }else{
                        	return '<a  target="blank" href="../dealer/getStoreDesc.json?rtfId='+data+'&storeId='+full.storeId+'" >预览</a>';
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
            
            $('#models-data tbody tr .checkboxes').live('click', function(){
                var checkboxes = $('#models-data tbody tr .checkboxes');
                checkboxes.parents('tr').removeClass('active'); //移除所有tr的active class
                checkboxes.not($(this)).attr("checked", false); //将除$(this)之外所有的.checkboxes取消选择
                   
                // $(this).attr("checked",  $(this).attr("checked") ? true : false ); 
                jQuery.uniform.update(checkboxes);  //jQuery.uniform更新数据
                // checkboxes 选择不到:checked 的，又用$('#models-data tbody tr .checkboxes:checked')重新选择了一次
                if($('#models-data tbody tr .checkboxes:checked').length > 0){
                    $('.table-toolbar .group-control').attr('disabled', false);
                    $(this).parents('tr').addClass("active");
                }else{
                    $('.table-toolbar .group-control').attr('disabled', true);
                }
            });

            return  mytable;
        }

    };

}();

