/**
 * @author v_chenhaibing01
 */

$("#editRelateBrands")
		.on(
				"change",
				function() {
					var pinpai = $("#brandIds").val();
					if (pinpai != '' && pinpai != undefined) {

						var selectedBrand = $(this).val();
						var value = '';
						var array = new Array();
						var i = 0;
						$("form input[name='brandIdM']")
								.each(
										function() {

											var s = 0;
											for ( var int = 0; int < selectedBrand.length; int++) {
												if ($(this).val() == selectedBrand[int]) {

													s = 1;
													break;
												}
											}
											if (s == 0) {
												var va = $(this).parent().find(
														".storeName").val();

												if (va != '' && va != undefined) {

													value += "-" + va;

													var rowid = $(this)
															.parent().parent()
															.parent().parent()
															.attr("id");
													array[i] = rowid;
													i++;
												}
											}

										});

						// $.getJSON('findStoreByBrand.json?brandId='+$(this).val(),function(data){
						//					
						// $.each(data,function(index,item){
						//						
						// console.info(item);
						//						
						// var i=0;
						// for ( var int = 0; int < storeId.length; int++) {
						//							
						// if(storeId[int]==item){
						//						
						// i=int;
						// break;
						// }
						// }
						//						
						// if(i!=0){
						//							
						// value=value+"\t"+storeName[i];
						// i=0;
						// }
						//						
						//						
						// });

						// });

						if (array != null && array.length > 0 && array != '') {
							interval();
							var bbb = value.split("-");
							$("#ulul").empty();
							for ( var int = 0; int < bbb.length; int++) {
								$("#ulul").append("<li>" + bbb[int] + "</li>");
							}
							$("#deletedivName").val(array);
							$('#item_selected_modal').modal('show');
							// successN(value,pinpai,array);

							return;
						}

					}

					$("#childSproductClass option").remove();
					var brand = $(this).val();
					$("#brandIds").val(brand);
					for ( var i = 0; i < brand.length; i++) {
						var b = brand[i];
						if (brand != '') {
							$
									.getJSON(
											'findSeriesByBrandId.json?brandId='
													+ brand[i],
											function(data) {
												$
														.each(
																data,
																function(index,
																		item) {
																	$(
																			"#childSproductClass")
																			.append(
																					"<option value='"
																							+ item.velSeriesId
																							+ "-"
																							+ b
																							+ "'>"
																							+ item.velSeriesChsName
																							+ "</option>");
																});
											});
						}
					}

				});

function successN(value, pinpai, array) {
	if (confirm("重新选择品牌将影响以下经销商店铺: " + value + " \r\r确认要重新选择品牌吗?")) {
		for ( var int = 0; int < array.length; int++) {
			document.getElementById("" + array[int]).removeChild(
					document.getElementById(array[int] + "row"));
			document.getElementById("" + array[int]).remove();
			// $(this).parent().remove();

		}

		$("#childSproductClass option").remove();
		var brand = $("#editRelateBrands").val();
		$("#brandIds").val(brand);
		for ( var i = 0; i < brand.length; i++) {
			var b = brand[i];
			if (brand != '') {
				$.getJSON('../velModel/getClassByBrandId.json?productBrandId='
						+ brand[i], function(data) {
					$.each(data, function(index, item) {
						$("#childSproductClass").append(
								"<option value='" + item.velSeriesId + "-" + b
										+ "'>" + item.velSeriesChsName
										+ "</option>");
					});
				});
			}
		}
	} else {

		$("#editRelateBrands option").attr("selected", false);

		var array = pinpai.split(',');
		var v = $("#editRelateBrands option");
		for ( var int = 0; int < v.length; int++) {
			for ( var int2 = 0; int2 < array.length; int2++) {

				if (v[int].value == array[int2]) {

					v[int].selected = true;
				}
				// else{
				// v[int].selected=false;
				// }
			}
		}

	}
}
var t;
function deleteDiv() {
	if (t) {

		clearInterval(t);
	}
	var value = $("#deletedivName").val();

	var array = value.split(",");
	for ( var int = 0; int < array.length; int++) {
		document.getElementById("" + array[int]).removeChild(
				document.getElementById(array[int] + "row"));
		document.getElementById("" + array[int]).remove();
	}

	$("#childSproductClass option").remove();
	var brand = $("#editRelateBrands").val();
	$("#brandIds").val(brand);
	for ( var i = 0; i < brand.length; i++) {
		var b = brand[i];
		if (brand != '') {
			$.getJSON('../velModel/getClassByBrandId.json?productBrandId='
					+ brand[i], function(data) {
				$.each(data, function(index, item) {
					$("#childSproductClass").append(
							"<option value='" + item.velSeriesId + "-" + b
									+ "'>" + item.velSeriesChsName
									+ "</option>");
				});
			});
		}
	}

}

function recovery() {
	if (t) {

		clearInterval(t);
	}
	var pinpai = $("#brandIds").val();

	$("#editRelateBrands option").attr("selected", false);

	var array = pinpai.split(',');
	var v = $("#editRelateBrands option");
	for ( var int = 0; int < v.length; int++) {
		for ( var int2 = 0; int2 < array.length; int2++) {

			if (v[int].value == array[int2]) {

				v[int].selected = true;
			}
			// else{
			// v[int].selected=false;
			// }
		}
	}

}

function interval() {

	t = setInterval(function() {

		if ($("#item_selected_modal").is(":hidden")) {

			recovery();
		}

	}, 1000);

}