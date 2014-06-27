var dataTable = TableManaged.init();

(function($) {

	$(function() {
		App.init();
		// dataTable=TableManaged.init();

		$('#btn-inquery').click(function() {
			if (isStartDateBigger()) {
				$('#warning-date-error').modal('show');
				// 弹出层提示
				return false;
			} else {
				dataTable.fnDraw();
			}

		});

		$("#sbrand").change(
				function() {
					$("#sproductClass option").remove();
					$("#sproductClass").append(
							"<option value='-1'>All</option>");
					var brand = $(this).val();

					if (brand != '') {
						$.getJSON('findSeriesByBrandId.json?brandId=' + brand,
								function(data) {
									$.each(data, function(index, item) {
										$("#sproductClass").append(
												"<option value='"
														+ item.velSeriesId
														+ "'>"
														+ item.velSeriesChsName
														+ "</option>");
									});
								});
					}
				});

		// editbtn

		// $("#addbtn").click(function() {
		//
		// var ad = "discountActivityAdd";
		// $.get('inAddPage.json?inPage=' + ad + '&' + new Date(),
		// function(data) {
		// $('#addDialog').html(data);
		//
		// });
		// $("#addDialog").modal({
		// show : true
		// });
		//
	});
var editWindow=null;

	$("#editButton").click(
			function() {
				var x = $("input:radio[name='checkbox']:checked").val();
				if (x == '' || x == undefined) {
					$.dopAlert("请先选中活动", null);
					return false;
				}

				if(!editWindow || editWindow.closed){
					
					var v = x.split(',');

					if (v[2] == 'GENERAL') {
						$('#editDialog').modal({
							show : true
						});
						editWindow=window.open('inEditPage.json?promotionId=' + v[1]
								+ '&proType=' + v[2] + '&promotionStatus=' + v[0],"activityEdit.ftl");
						$(this).focus();
						if(editWindow.open){
							
							$('#editDialog').modal("hide");
						}
						
					} else {
						
						$('#editDialog').modal({
							show : true
						});
						
//						$.post('inEditPage.htm',{"promotionId":v[1],"proType":v[2],"promotionStatus":v[0]},function(data){
//								
//								//location.href=
//						});
						
						var promotionId=encodeURI(encodeURI(v[1]));
						var proType=encodeURI(encodeURI( v[2]));
						var promotionStatus=encodeURI(encodeURI(v[0]));
						editWindow=window.open('inEditPage.json?promotionId=' + promotionId
								+ '&proType=' + proType + '&promotionStatus=' + promotionStatus);
						$('#editDialog').modal("hide");
						// $.get('inEditPage.json?promotionId=' + v[1] + '&proType='
						// + v[2] + '&promotionStatus=' + v[0], function(data) {
						//
						// //if(data.result=='true'){
						// $('#editDialog').html(data);
						// //}else{
						// //$.dopAlert('数据有误,请重新选择');
						// //$('#editDialog').modal('hide');
						// //}
						// });
						// $('#editDialog').modal({
						// show : true
						// });

					}
					
				}else{
					
					$.dopAlert("编辑页面已经打开,请关闭之后再操作",null);
				}
				
				

			});

	$("#offshelf").click(
			function() {

				var x = $("input:radio[name='checkbox']:checked").val();
				if (x == '' || x == undefined) {
					$.dopAlert("请先选中活动", null);
					return false;
				}

				var v = x.split(',');
				if (v[0] == 'WAITING_FOR_PUBLISHING' || v[0] == 'PUBLISHED'
						|| v[0] == 'ONGOING' || v[0] == 'FINSHED') {

					$.dopConfirm("你确定要下线吗?", null, function(r) {
						if (r) {
							$.post("offshelf.json", {
								promotionId : v[1]
							}, function(data) {
								var ret = $.parseJSON(data);
								if (ret.status == 'true') {
									$.dopAlert('下线成功', null);
									dataTable.fnDraw();
								} else {
									$.dopAlert(ret.message, null);
								}
								;
							});
						}
					});
				} else {
					$.dopAlert('该状态不允许下线.', null);

				}
			});

	$("#approveId").click(function() {
		// var x = $("input:radio[name='checkbox']:checked").val();
		// var v = x.split(',');

		// if (v[0] == 'WAITING_FOR_APPROVING') {
		// $("#sPromotionId").attr("value", v[1]);
		// $('#check-model-modal').modal({
		// show : true
		// });
		// } else {
		//	
		// $.dopAlert('该状态不允许审核。',null);
		// }
		$("input[name='checkbox']:radio:checked").each(function() {
			var x = $(this).val();
			var v = x.split(',');
			var promotionId = v[1];
			var promotionStatus=v[0];
			if (promotionId) {
				// if (v[0] == 'WAITING_FOR_APPROVING') {
				$.post("checkVerify.json", {
					promotionId : promotionId
				}, function(data) {
					var ret = $.parseJSON(data);
					if (ret.status == 'true') {
						$("#sPromotionId").attr("value", v[1]);
						$("#spromotionStatus").val(promotionStatus);
						$("#simageId").val(ret.simageId);
						$('#check-model-modal').modal({
							show : true
						});
					} else {
						$.dopAlert(ret.message, null);
					}
				});
				// }else{
				// $.dopAlert('当前非待审核状态，不可以进行审核操作。',null);
				// }
			} else {
				$.dopAlert('请刷新数据,重新审核。', null);
			}
		});
	});

	$("#btn-submit-button").click(function() {
		var promotionId = $("#sPromotionId").val();
		var x = $("input:radio[name='conditions']:checked").val();

		var comment = '';
		var v = $("form input[name='conditions']:checked").val();

		if (v == 'reject') {

			comment = $("#comment").val();
			if (comment == '') {

				$.dopAlert('请输入意见。', null);
				return;
			}
			if (comment.length > 150) {
				$.dopAlert("字符大于150，请重新输入", null);
				return;
			}
		}
		var simageId=$("#simageId").val();
		$.post("approveAndreject.json", {
			promotionId : promotionId,
			conditions : x,
			comment : comment,
			simageId:simageId
		}, function(data) {
			var ret = $.parseJSON(data);
			if (ret.status == 'true') {
				$('#check-model-modal').modal('hide');
				$("#comment").attr('value', '');
				$.dopAlert('审核成功', null);

				dataTable.fnDraw();
			} else {
				alert(ret.message);
			}
		});
		return false;
	});

	FormComponents.init();

	var startDate = '';
	// 开始时间
	var endDate = '';
	// 结束时间

	// 修改开始时间时
	$('#startTime').on('changeDate', function(ev) {
		// console.log(ev.date.valueOf());
		// 点击时间控件上的X号时ev.date会为null，此时将startDate赋值为0方便判断
		startDate = ev.date == null ? 0 : ev.date.valueOf();
		if (isStartDateBigger()) {
			$('#warning-date-error').modal('show');
			// 弹出层提示
		}
	});

	// 修改结束时间时
	$('#endTime').on('changeDate', function(ev) {
		// console.log(ev.date.valueOf());
		// 点击时间控件上的X号时ev.date会为null，此时将endDate赋值为0方便判断
		endDate = ev.date == null ? 0 : ev.date.valueOf();
		if (isStartDateBigger()) {
			$('#warning-date-error').modal('show');
			// 弹出层提示
		}
	});

	// 判断开始时间是否大于结束时间
	function isStartDateBigger() {
		if (typeof (startDate) != 'undefined'
				&& typeof (endDate) != 'undefined' && startDate != 0
				&& endDate != 0) {
			return startDate > endDate;
		} else {
			return false;
		}
	}

	// 点击查询
	$('#btn-inquiry').click(function() {
		if (isStartDateBigger()) {
			$('#warning-date-error').modal('show');
			// 弹出层提示
			return false;
		} else {
			dataTable.fnDraw();
		}
	});

	$("form input[name='conditions']").on("click", function() {
		if ($(this).val() == 'approve') {
			$("#comment").val('');
			$("#comment").css({
				"display" : "none"
			});
		} else {
			$("#comment").css({
				"display" : "block"
			});
			// $("#comment").removeAttr("disabled");
		}
	});

	$("#models-data_length [name='models-data_length']").live('change',
			function() {

				var oSettings = dataTable.fnSettings();
				oSettings._iDisplayStart = 0;
				dataTable.fnDraw();
			});

})(jQuery);

var newWindow=null;
$("#addbtn").on("click",function(){
	//var name="discountActivityAdd.ftl";
	if (!newWindow || newWindow.closed)
    {
		newWindow = window.open('discountAdd.json');
    }else{
    	
    	$.dopAlert("新增页面已经打开,请关闭之后再操作!");
    }
	
	//window.open("discountAdd.json");
});

var newWindow=null;
$("#addButton").on("click",function(){
	
	if (!newWindow || newWindow.closed)
    {
		newWindow = window.open('nonDiscount.json');
    }else{
    	
    	$.dopAlert("新增页面已经打开,请关闭之后再操作!");
    }
	
});

$("#dynamicMerge").click(function(){
	
    var x = $("input:radio[name='checkbox']:checked").val();//alert(x);
           if (x == '' || x == undefined) {
               $.dopAlert("请先选中活动", null);
               return false;
           }
           var v = x.split(",");
           var activeType = x.split(",")[2];//alert("activeType:"+activeType);
           //状态,只有进行中的才能做此更新
           var activeStatus = x.split(",")[0];      //alert("活动状态:"+activeStatus);
           if(activeStatus!="ONGOING" && activeStatus!="PUBLISHED"){
               //$(this).attr({"disabled":"disabled"});
               $.dopAlert("只有状态为“已发布”和“进行中”状态的销售类活动,才能做此更新!",null);
               return false;
           }else{
               //$(this).removeAttr("disabled");
           }
           if(activeType!="SALES"){
               $.dopAlert("非促销类活动没有动态更新",null);
           }else{
             
           
              $.get('../activityDynamic/inDynamicEdit.json?promotionId=' + v[1]  + '&promotionStatus=' + v[0], function(data) {
                   //alert(data);
                   $('#editDialog').html(data); 
               });
               $('#editDialog').modal({
                   show : true
                });
           }
});

function clicktarget(url) {
	// alert(1);
	var u = $(url).attr("data");

	window.location.href = u;
}