var ATTR_ID = 0;
(function($) {
		$(function() {
			FormValidation.init();
			
			FormComponents.init();
			 load.init("uploadImgFile","uploadImgForm","coverImgUrl","coverImgId",2);
		});
})(jQuery);






function chooseFile(){
	
	$("#uploadImgFile").click();
}

$("#brands").change(
		function() {
			var p = $(this).parent().parent().parent().parent().attr("id");

			$("#" + p + " select[name='seriesID'] option").remove();
			$("#" + p + " select[name='seriesID']").append(
					"<option value=''>请选择</option>");
			$("#" + p + " select[name='storeId'] option").remove();
			$("#" + p + " select[name='storeId']").append(
					"<option value=''>请选择</option>");
			$("#" + p + " select[name='merchandiseId'] option").remove();
			$("#" + p + " select[name='merchandiseId']").append(
					"<option value=''>请选择</option>");
			$("#" + p + " div[name='colors']").empty();
			var brand = $(this).val();
			if (brand != '') {
				$.getJSON('findSeriesByBrandId.json?brandId='
						+ brand, function(data) {
					$.each(data, function(index, item) {
						$("#" + p + " select[name='seriesID']").append(
								"<option value='" + item.velSeriesId + "'>"
										+ item.velSeriesChsName + "</option>");
					});
				});
			}

		});

$("#childSproductClass")
		.change(
				function() {
					var p = $(this).parent().parent().parent().parent().attr(
							"id");

					$("#" + p + " select[name='storeId'] option").remove();
					$("#" + p + " select[name='storeId']").append(
							"<option value=''>请选择</option>");
					$("#" + p + " select[name='merchandiseId'] option")
							.remove();
					$("#" + p + " select[name='merchandiseId']").append(
							"<option value=''>请选择</option>");
					$("#" + p + " div[name='colors']").empty();
					var classid = $(this).val();
					if (classid != '') {
						$
								.getJSON(
										'changeSeriesMerdi.json?velSeriesId='
												+ classid,
										function(data) {
											$
													.each(
															data,
															function(index,
																	item) {
																$(
																		"#"
																				+ p
																				+ " select[name='storeId']")
																		.append(
																				"<option value='"
																						+ item.storeId
																						+ "&"
																						+ classid
																						+ "'>"
																						+ item.storeName
																						+ "</option>");

															});
										});
					}

				});

$("#storeId").change(
		function() {
			var p = $(this).parent().parent().parent().parent().attr("id");
			$("#" + p + " select[name='merchandiseId'] option").remove();
			$("#" + p + " select[name='merchandiseId']").append(
					"<option value=''>请选择</option>");
			$("#" + p + " div[name='colors']").empty();
			var classid = $(this).val();
			var n = classid.split("&");

			var velSeriesId = n[1];

			if (classid != '') {
				$.getJSON('changeSeriesMerdi.json?storeId=' + classid
						+ '&&velSeriesId=' + velSeriesId, function(data) {
					$.each(data, function(index, item) {
						$("#" + p + " select[name='merchandiseId']").append(
								"<option value='" + item.merchandiseId
										+ "'  title='" + item.velModelId + "'>"
										+ item.velModelName + ",￥:"
										+ getFormatPrice(item.storePrice) +"元</option>");

					});
				});
			}

		});

$("#merchandiseId").change(
		function() {
			var p = $(this).parent().parent().parent().parent().attr("id");
			$("#" + p + " div[name='colors']").empty();
			var value = $(this).find("option:selected").attr("title");
			if (value != '' && value != 'all') {
				$.getJSON('changeMerchandiseIdByColor.json?merchandiseId='
						+ value, function(data) {
					$.each(data, function(index, item) {

						$("#" + p + " div[name='colors']").append(
								"<input type='radio' name=color" + p
										+ " value="+item.velColorId
										+ "  onclick='checkBox(this);' >");
						$("#" + p + " div[name='colors']").append(
								"<label>" + item.velColorChsName + "</label>");
					});
				});
			}

		});

$(document).ready(function() {
	bindListener();
});

function addimg() {
	$("#button").next().css("display", "none");

	ATTR_ID = ATTR_ID + 1;
	var noneDiv = $("#noneDiv");
	var newDiv = noneDiv.clone(true);
	newDiv.css("display", "block");
	newDiv.attr("id", "div" + ATTR_ID);
	$(newDiv).find("input[name='iquota']").each(function() {
		$(this).attr("name", "iquota" + ATTR_ID);
	});
	$(newDiv).find("input[name='color']").each(function() {
		$(this).attr("name", "color" + ATTR_ID);
	});
	$("#mdiv").after(newDiv);
	bindListener();

}
function bindListener() {
	$("input[name=rmlink]").unbind().click(
			function() {
				var divId = $(this).parent().parent().parent().parent()
						.parent().attr('id');

				document.getElementById("" + divId).remove();

				$(this).parent().remove();
			});
	$("a[name=hideshow]").unbind().click(function() {
		$(this).next().toggle(500);
	});
}
function removeDiv(ob) {
	ob.parentNode.removeChild(ob.parentNode);
}
function getFormatPrice(price){
	var priceVel = 0;
	if(undefined != price && price != null ){
		priceVel =  price*10000;
	}
	return priceVel;
}
function ac(){
	
	
	//$("body").css({"overflow":"auto"});
}

$("#rightbrand").on("click",function(){
	
	var brand=$("#brand");
	var shamSeries=$("#shamSeries");
	
	
	$("#shambrand option:selected").each(function(){
		var sdatashu=$(this).val();
		
		$.getJSON('findSeriesByBrandId.json?brandId='
				+ sdatashu, function(data) {
					
			$.each(data, function(index, item) {
				
				shamSeries.append(
						"<option value='" + item.velSeriesId + "' data='"+sdatashu+"' >"
								+ item.velSeriesChsName + "</option>");
			});
		});
		brand.append(
				"<option  value='" + $(this).val()+ "'>"+ $(this).text() + "</option>");
		$(this).remove();
		
	});
});



$("#rightAllbrand").on("click",function(){
	
	var brand=$("#brand");
	var shamSeries=$("#shamSeries");
	
	
	$("#shambrand option").each(function(){
		var brandData=$(this).val();
		$.getJSON('findSeriesByBrandId.json?brandId='
				+ $(this).val(), function(data) {
					
			$.each(data, function(index, item) {
				shamSeries.append(
						"<option value='" + item.velSeriesId + "' data='"+brandData+"'>"
								+ item.velSeriesChsName + "</option>");
			});
		});
		
		
		brand.append(
				"<option   value='" + $(this).val()+ "'>"+ $(this).text() + "</option>");
		$(this).remove();
		
	});
});

$("#leftbrand").on("click",function(){

	var shambrand=$("#shambrand");
	
	var brandValue=$("#brand").val();
	brand(shambrand);
	
	//brandValue=brandValue.split(",");
	
	var seriesValue=series(brandValue);
	
	var modelValue=model(seriesValue);
	store(modelValue);
	//将store重新放入data
	var array=new Array();
	$("#store option").each(function(){
		
		array.push($(this).val());
	});
	
	$("#findMerchandiseList").attr("data",array);
	
});

$("#leftSeries").on("click",function(){
	
	var seriesValue=$("#series").val();
	//seriesValue=seriesValue.split(',');

	var shamSeries=$("#shamSeries");
	var modelValue=model(seriesValue);
	store(modelValue);
	$("#series option:selected").each(function(){
		
		shamSeries.append(
				"<option  value='" + $(this).val()+ "' data='"+$(this).attr("data")+"'>"+ $(this).text() + "</option>");
		
		$(this).remove();
	});
	var array=new Array();
	//将store重新放入data
	$("#store option").each(function(){
		
		array.push($(this).val());
	});
	
	$("#findMerchandiseList").attr("data",array);
});

$("#leftModel").on("click",function(){
	
	var modelvalue=$("#model").val();

	var shamModel=$("#shamModel");
	store(modelvalue);
	$("#model option:selected").each(function(){
		
		shamModel.append(
				"<option  value='" + $(this).val()+ "' data='"+$(this).attr("data")+"' title='"+$(this).text()+"'>"+ $(this).text() + "</option>");
		
		$(this).remove();
	});
	var array=new Array();
	//将store重新放入data
	$("#store option").each(function(){
		
		array.push($(this).val());
	});
	
	$("#findMerchandiseList").attr("data",array);
});

$("#leftStore").on("click",function(){
	
	var shamStore=$("#shamstore");
	
	
	$("#store option:selected").each(function(){
		var storeValue=$(this).val();
		shamStore.append(
				"<option  value='" + $(this).val()+ "' data='"+$(this).attr("data")+"'  title='"+$(this).text()+"'>"+ $(this).text() + "</option>");
		
		$("tr[name^='promotionmerchandise']").each(function(){
			var storeId=$(this).find("[name='storeId']").val();
			if(storeValue==storeId){
				
				$(this).remove();
			}
			
		
		});
		
		$(this).remove();
	});
	var array=new Array();
	//将store重新放入data
	$("#store option").each(function(){
		
		array.push($(this).val());
	});
	
	$("#findMerchandiseList").attr("data",array);
});

//向左移动时影响的列表
function brand(shambrand){
	
	$("#brand option:selected").each(function(){
		
		shambrand.append(
				"<option  value='" + $(this).val()+ "'>"+ $(this).text() + "</option>");
		
		$(this).remove();
	});
}

//影响车系
function series(brandValue){
	
	 var seriesValue=new Array();
		$("#shamSeries option").each(function(){
		
			for ( var int = 0; int < brandValue.length; int++) {
				
				if($(this).attr("data")==brandValue[int]){
					seriesValue.push($(this).val());
					seriesValue[int]=
					
					$(this).remove();
				}
				
			}
		});
		
		$("#series option").each(function(){
			
			for ( var int = 0; int < brandValue.length; int++) {
				
				if($(this).attr("data")==brandValue[int]){
					
					seriesValue.push($(this).val());
					
					$(this).remove();
				}
				
			}
		});

		return seriesValue;
}

//受影响车型

function model(seriesValue){
	
	var modelValue=new Array();
	$("#shamModel option").each(function(){
		
		for ( var int = 0; int < seriesValue.length; int++) {
			
			if($(this).attr("data")==seriesValue[int]){
				
				
				modelValue.push($(this).val());
				
				$(this).remove();
			}
			
		}
	});
	
	$("#model option").each(function(){
			
			for ( var int = 0; int < seriesValue.length; int++) {
				
				if($(this).attr("data")==seriesValue[int]){
					
					modelValue.push($(this).val());
					
					$(this).remove();
				}
				
			}
	});
	
	return modelValue;
}

function store(modelValue){
	
	$("#shamstore option").each(function(){
		var array=$(this).attr("data").split(',');
		
		for ( var int = 0; int < modelValue.length; int++) {
			
			for ( var int2 = 0; int2 < array.length; int2++) {
				
				if(array[int2]==modelValue[int]){
					
					
					array.splice(int2,1);
				}
			}
			
		}
		if(array.length<1){
			
			$(this).remove();
		}else{
			
			$(this).attr("data",array);
		}
		
	});
	
	$("#store option").each(function(){
			//var storeValue=$(this).val();
			var array=$(this).attr("data").split(',');
			for ( var int = 0; int < modelValue.length; int++) {
				
				for ( var int2 = 0; int2 < array.length; int2++) {
					
					if(array[int2]==modelValue[int]){
						
						//array[int2].remove();
						$("tr[name^='promotionmerchandise']").each(function(){
							var storeId=$(this).find("[name='modelId']").val();
							
							if(array[int2]==storeId){
								
								$(this).remove();
							}
							
							
						});
						array.splice(int2,1);
					}
				
							
				}
				
			}
			
			if(array.length<1){
				
				$(this).remove();
			}else{
				
				$(this).attr("data",array);
			}
	});
	
	
}



$("#rightSeries").on("click",function(){
	
	var series=$("#series");
	var shamModel=$("#shamModel");
	
	$("#shamSeries option:selected").each(function(){
		
		var seriesData=$(this).val();
		
		$.getJSON('findModelBySeries.json?seriesId='+ $(this).val()+"&brandId="+$(this).attr("data"),function(data) {
					$.each(data,function(index,item) {
						//alert(item.velModelStatus);
						//if(item.velModelStatus==3){
						
							var vs=0;
							$("#shamModel option").each(function(){
								
								if(item.velModelId==$(this).val()){
									
									vs=1;
									
									return false;
								}
								
							});
							
							if(vs==0){
								
								shamModel.append("<option value='"
										+ item.velModelId+ "' data='"+seriesData+"' title='"+item.velModelName+"' >"
											+ item.velModelName+ "</option>");
							}
							
						//}

					});
						
						
				});
		series.append(
				"<option  value='" + $(this).val()+ "' data='"+$(this).attr("data")+"'  >"+ $(this).text() + "</option>");
		$(this).remove();
	});
	
});

$("#rightAllSeries").on("click",function(){
	
	var series=$("#series");
	var shamModel=$("#shamModel");
	
	
	$("#shamSeries option").each(function(){
		var seriesData=$(this).val();
		$.getJSON('findModelBySeries.json?seriesId='+ $(this).val()+"&brandId="+$(this).attr("data"),function(data) {
					$.each(data,function(index,item) {
						
						var vs=0;
						$("#shamModel option").each(function(){
							
							if(item.velModelId==$(this).val()){
								
								vs=1;
								
								return false;
							}
							
						});
						
						if(vs==0){
							
							shamModel.append("<option value='"
									+ item.velModelId+ "' data='"+seriesData+"' title='"+item.velModelName+"' >"
										+ item.velModelName+ "</option>");
						}
					});
					
				});
		series.append(
				"<option  value='" + $(this).val()+ "'  data='"+$(this).attr("data")+"'>"+ $(this).text() + "</option>");
		$(this).remove();
	});
});

$("#rightModel").on("click",function(){
	
	var model=$("#model");
	
	$("#shamModel option:selected").each(function(){
		
		model.append(
				"<option  value='" + $(this).val()+ "' data='"+$(this).attr("data")+"' title='" + $(this).text()+ "'    >"+ $(this).text() + "</option>");
		$(this).remove();
	});
});

$("#rightAllModel").on("click",function(){
	
	var model=$("#model");
	
	$("#shamModel option").each(function(){
		
		model.append(
				"<option  value='" + $(this).val()+ "' title='" + $(this).text()+ "' data='"+$(this).attr("data")+"'   >"+ $(this).text() + "</option>");
		$(this).remove();
		
	});
});

$("#rightstore").on("click",function(){
	
	var store=$("#store");
	$("#shamstore option:selected").each(function(){
		
		store.append(
				"<option  value='" + $(this).val()+ "' data='"+$(this).attr("data")+"' title='" + $(this).text()+ "'    >"+ $(this).text() + "</option>");
		$(this).remove();
	});
});

$("#rightAllstore").on("click",function(){
	
	var store=$("#store");
	$("#shamstore option").each(function(){
		
		store.append(
				"<option  value='" + $(this).val()+ "' data='"+$(this).attr("data")+"' title='" + $(this).text()+ "'    >"+ $(this).text() + "</option>");
		$(this).remove();
	});
});


var INT_FINAL=0;

$("#findStoreList").on("click",function(){
	

	
	
	
	var model=$("#model option").val();
	
	if(model==''||model==undefined){
		
		$.dopAlert("请先选择车型");
		return false;
	}
	
	//alert(1);
	
	$("#findStoreList").attr("disabled",true);
	
	
	var provinceId=$("#addressListFirst").val()==''?-1:$("#addressListFirst").val();
	var cityId=$("#addressListSecond").val()==''?-1:$("#addressListSecond").val();
	var districtId=$("#addressListThird").val()==''?-1:$("#addressListThird").val();
	
	$("#shamstore option").remove();
	
	var shamstore=$("#shamstore");
	$("#store option").remove();
	$("tr[name^=promotionmerchandise]").remove();
	//var a=1;
	//alert($("#model option").val());
	//return false;
	var model='';
	$("#model option").each(function(){
		//console.info($(this).val()+"=="+a++);
	//	var modelId=$(this).val();
		
		model+=$(this).val()+",";
		//var modelName=$(this).
//		$.ajaxSettings.async = false;
	
//				$("#shamstore option").each(function(){
//					
//						if(item.storeId==$(this).val()){
//						
//							$(this).attr("data",$(this).attr("data")+','+modelId);
//							is=1;
//							return false;
//						}
//					
//				});
//				
//				if(is==0){
//					
//					shamstore.append("<option value='" + item.storeId + "' data="+modelId+" title="+item.storeName+" >"+item.storeName+"</option>");
//				}
//				
			
	});
//	$.getJSON('findSalesStoreList.json?modelId='+model+"&provinceId="+provinceId+"&cityId="+cityId+"&districtId="+districtId,function(data){
//		$.each(data,function(index,item){
//			
//			var is=0;
//		});
//	});

	
	
	$.ajax({
	            type: "post",
	            url: 'findSalesStoreList.json?modelId='+model+'&provinceId='+provinceId+"&cityId="+cityId+'&districtId='+districtId+"&datav="+new Date(),
	           
	            contentType: "application/json; charset=utf-8",
	            dataType: "json",
	            success: function (data) {
	               // console.info(data);
	        		$.each(data,function(index,item){
	        			
	        			var is = 0;
						$("#shamstore option").each(function() {
											if (item.storeId == $(this).val()) {
												$(this).attr("data",$(this).attr("data")+ ','+ item.modelId);
												is = 1;
												return false;
											}

										});

						if (is == 0) {

							shamstore.append("<option value='"+ item.storeId+ "' data="+ item.modelId+ " title="+ item.storeName+ " >"+ item.storeName+ "</option>");
						}
						
						
	        		}
	        		
	        		
	        		
	        		
	        		);
	        		
	        		setTimeout(function(){
	        			
	        			$("#findStoreList").attr("disabled",false);
	        		},1000);
	            	
	            },
	            error: function (msg) {
	                $.dopAlert("数据发生异常",null);
	                
	                
	                return false;
	            }
	        });
	

	
//	 var i=0; 
//	 while(i<oSel.options.length){ 
//		 var j=i+1; 
//		 while(j<oSel.options.length){ 
//			 console.info(oSel.options[i].text+","+oSel.options[j].text);
//			 if(oSel.options[i].value==oSel.options[j].value){
//				 
//				 	oSel.options[j]=null;
//			 }else{ 
//				 j++; 
//			 } 
//		 } 
//		 i++; 
//	 } 
	
	
	//判断storeList里面的经销商是否还存在,如果不存在 ，那么删除

//	$("#store option").each(function(){
//		var storeValue=$(this).val();
//		
//		var int=0;
//		$("#shamstore option").each(function(){
//			//console.info(storeValue+","+$(this).val());
//			if(storeValue==$(this).val()){
//				
//				int=1;
//				$(this).remove();
//			}
//			
//		});
//		
//		if(int==0){
//			
//			
//			
//			//删除跟该经销商有关的商品
//			$("tr[name^='promotionmerchandise']").each(function(){
//					var storeId=$(this).find("[name='storeId']").val();
//					if(storeValue==storeId){
//						
//						$(this).remove();
//					}
//					
//				
//			});
//			
//			$(this).remove();
//		}
//		
//		
//		
//	});
	
	
	
	INT_FINAL=1;
	
});

$("#addressListFirst").change(function(){
	$("#addressListSecond option").remove();
	$("#addressListSecond").append("<option value=''>请选择:</option>");
	$("#addressListThird option").remove();
	$("#addressListThird").append("<option value=''>请选择:</option>");
	var first=$(this).val();
	if(first){
		
		$.getJSON('../velmerchandise/distriction.json?addressListFirst='+first,function(data){
			$.each(data,function(index,item){
				$("#addressListSecond").append("<option value='" + item.area_code_id + "'>"+item.area_code_name+"</option>");
			});
		});
	}
});

$("#addressListSecond").change(function(){
	$("#addressListThird option").remove();
	$("#addressListThird").append("<option value=''>请选择:</option>");
	var second=$(this).val();
	if(second){
		$.getJSON('../velmerchandise/street.json?addressListSecond='+second,function(data){
		
			$.each(data,function(index,item){
					$("#addressListThird").append("<option value='"+item.area_code_id+"'>"+item.area_code_name+"</option>");
			});
		});
	}
});

$("#removeAll").on("click",function(){
	
	$.dopConfirm("你确定要移除上面的条件吗?,下列商品将全部移除", null, function(r) {
		//$("#brand option").remove();
		$("#removeAll").attr("disabled",true);
		
		setTimeout(function(){
			
			$("#removeAll").attr("disabled",false);
		},5000);
		
		if(r){
			
			$("#shamSeries option").remove();
			$("#series option").remove();
			$("#shamModel option").remove();
			$("#model option").remove();
			$("#shamstore option").remove();
			$("#store option").remove();
			
			
			var shamBrand=$("#shambrand");
			$("#brand option").each(function(){
				
				shamBrand.append(
						"<option  value='" + $(this).val()+ "'>"+ $(this).text() + "</option>");
				$(this).remove();
			});
			
			$("tr[name^='promotionmerchandise']").each(function(){
				
				$(this).remove();
			});
			
			$("#findMerchandiseList").attr("data",'');
		}
	});
});

var FINAL_INT=0;

$("#findMerchandiseList").on("click",function(){
	
	$("tr[name^='promotionmerchandise']").remove();
	
	var storevv=$("#store option").val();
	
	if(storevv==null || storevv==''){
		
		$.dopAlert("经销商列表为空,请添加经销商");
		return ;
	}
	
	if(INT_FINAL==1){
		
		
	}
	
	
	var array=new Array();
	$("#store option").each(function(){
		
		array.push($(this).val()+"-"+$(this).attr("data")+"#");
	});
	
	
//	var value=$(this).attr("data");
//	if(value!=null &&value!=''){
//		
//		value=value.split("#");
//		
//	}
//	
//	//最终需要执行查询的参数
//	
//	
//	var arrayint1=new Array();
//	
//	var arrayint2=new Array();
//	
//	var arrayint3=new Array();
//	
//	var arrayvalue=new Array();
//	for ( var int = 0; int < array.length; int++) {
//		
//		arrayint3=array[int].split('-');
//
//		
//		for ( var int2 = 0; int2 < value.length; int2++) {
//		
//			array[int]=arrayvalue.split('-');
//			
//			//if(array[int]==)
//		}
//	}
//	
//	
//	
//	return false;
	
	
	$(this).attr("disabled",true);
	
//	$(this).attr("data",array);
	
	
	
	//缓存在button的数据和，store的数据进行对比
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	FINAL_INT++;
	 $("#store option").each(function(){
		 var storeId=$(this).val();
//		 
//		 if(value!=null && value!=''){
//			 
//			// var values=value.split("-");
//			 
////			 for ( var int = 0; int < array.length; int++) {
////				
////				 
////			}
//			 
//			 
//			 
////			 var s=0;
////			 for(var int=0;int<value.length;int++){
////				 
////				 if(storeId==value[int]){
////					 
////					 s=1;
////					 break;
////				 }
////			 }
////			 if(s==1){
////				 
////				 return true;
////			 }
//		 }
		 
		 var modelId=$(this).attr("data");
		 var storeName=$(this).text();
		 
		 $.ajaxSettings.async = false;
		 $.getJSON('findMerchandiseList.json?storeId='+storeId+'&modelId='+modelId,function(data){
				
				$.each(data,function(index,item){
					
					$("#tables #queryOK").after("<tr name=promotionmerchandise"+FINAL_INT+" id=merchandise"+FINAL_INT+">"
							+"<td>"+
							"<div class='justify'>商品信息</div>"
						+"</td>"+
						"<td colspan='3'>"+
							"<table class='table table-bordered'>"
						+	"	<tr>"
							+"		<td><div class='justify'>车型</div></td>"
							+	"	<td><input type='hidden' name='merchandiseId' value="+item.merchandiseId+" id=merchandiseId"+FINAL_INT+">" +
									"<input class='form-control' title='"+item.velModelName+"-￥:"+parseInt(item.storePrice*10000)+"元' disabled placeholder='初始化人数' value='"+item.velModelName+"-￥:"+parseInt(item.storePrice*10000)+"元' name='modelName'  type='text'>" +
									"<input class='form-control'  name='modelId' value="+item.velModelId+"  type='hidden'>" +
									"<input class='form-control' placeholder='初始化人数' value="+item.storeId+" name='storeId'  type='hidden'>" +
									"</td>"
							+	"	<td>经销商店铺</td>"
							+	"	<td><input class='form-control' title="+storeName+" placeholder='' value="+storeName+" name='storeName' disabled type='text'></td>"
						+	"		<td>意向金</td>"
							+		"<td><input class='form-control' placeholder='必填' name='deposit' id='deposit"+FINAL_INT+"' type='text'></td>"
									
							+	"	<td>"
							+"<table width='100%'>"
							+"<tr>"
							+	"<td>总配额<input type='radio' checked value='totalSum' onclick='changetotalNum(this,"+FINAL_INT+")' name='totalNum"+FINAL_INT+"'></td>"
							+	"<td><input type='text' placehoder='请输入总配额' name='totalNumSum' id=totalSumNum"+FINAL_INT+"  style='width:60px'></td>"
						+	"</tr>"
							+"<tr>"
							+	"<td>颜色配额<input type='radio' value='totalColor' onclick='changetotalNum(this,"+FINAL_INT+")' name='totalNum"+FINAL_INT+"'></td>"
							+	"<td>"
								+"颜色"
								+"</td>"
							+"</tr>"
							+"<tr>"
							
							+	"<td colspan='2'>"
								+"<div style='overflow:auto;height:80px;' name='colorlist'  id='colorList"+FINAL_INT+"'>"
							+	"<ul>"
								
							+	"</ul>"
							+"</div>"
								+"</td>"
							+"</tr>"
						+"</table>"
							+	"	</td> <td><input type='button' value='X' class='btn btn-warning' id='closeMerchandiseId'  onclick='closeMerchandise(this)'/></td>"

						+		"</tr>"
							+"</table>"
						+"</td>"


						+"</tr>");
					
					//将数据放入merchandise颜色
					
					$.ajaxSettings.async = false;
					$.getJSON('changeMerchandiseIdByColor.json?merchandiseId='+ item.velModelId, function(data) {
						$.each(data, function(index, item) {
							
								$("#colorList"+FINAL_INT+" ul").append("<li disabled>"+item.velColorChsName+"<input disabled type='text' name='shamcolor' id='shamcolor"+FINAL_INT+index+"' style='width:60px;' data="+item.velColorId+" value=''></li> ");
						});
					});
					FINAL_INT++;
				});
			});
		 
		

		 
		 
		 
	 });
	
	 setTimeout(function(){
		 
		 $("#findMerchandiseList").attr("disabled",false);
	 },5000);
	
});

function changetotalNum(obj,num){
	
	if($(obj).val()=='totalSum'){
		
		$("#colorList"+num+" *").attr("disabled",true);
	}else{
		
		$("#colorList"+num+" *").attr("disabled",false);
	}
	
}

function closeMerchandise(obj){
	
	var tr=obj.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	//alert(tr.val());
	tr.parentNode.removeChild(tr);
};