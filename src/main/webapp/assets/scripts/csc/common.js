var cscBasePath;
$.ajaxSetup ({ 
    cache: false //关闭AJAX相应的缓存 
});
$(function(){
	cscBasePath = $("#cscBasePath").val();
});
function initBrandSeries(brandId,seriesId,modelId){
	$("#"+brandId).change(function() {
		$("#"+seriesId+" option").remove();
		$("#"+seriesId).append("<option value=''>ALL</option>");
		var brand = $(this).val();
		if (brand != '') {
			$.getJSON(cscBasePath+'/common/findSeriesByBrandId.json?brandId=' + brand, function(data) {
				$.each(data, function(index, item) {
					$("#"+seriesId).append("<option value='" + item.velSeriesId + "'>" + item.velSeriesChsName + "</option>");
				});
			});
		}
	});
	
	if(modelId){
		$("#"+seriesId).change(function(){
			$("#"+modelId+" option").remove();
			$("#"+modelId).append("<option value=''>ALL</option>");  
			var classid=$(this).val();
			if(classid)
			{
				$.getJSON(cscBasePath+'/common/findModelBySeriesId.json?velSeriesId='+classid,function(data)
				{
					$.each(data,function(index,item)
					{
						$("#"+modelId).append("<option value='"+item.velModelId+"'>"+item.velModelName+"</option>");  
					});
				});
			}
		});
	}
	
}

function initProCityDis(provinceId,cityId,districtId){
	$("#"+provinceId).change(function() {
		$("#"+cityId+" option").remove();
		$("#"+cityId).append("<option value=''>请选择</option>");
		
		
		var first = $(this).val();
		if (first) {
			$.getJSON(cscBasePath+'/common/distriction.json?addressListFirst=' + first, function(data) {
				$.each(data, function(index, item) {
					$("#"+cityId).append("<option value='" + item.area_code_id + "'>" + item.area_code_name + "</option>");
				});
			});
		}
	});
	if(districtId){
		$("#"+cityId).change(function() {
			if(districtId){
				$("#"+districtId+" option").remove();
				$("#"+districtId).append("<option value=''>请选择</option>");
			}
			var second = $(this).val();
			if (second) {
				$.getJSON(cscBasePath+'/common/street.json?addressListSecond=' + second, function(data) {
					$.each(data, function(index, item) {
						$("#"+districtId).append("<option value='" + item.area_code_id + "'>" + item.area_code_name + "</option>");
					});
				});
			}
		});
	}
	
}
// 日期格式化
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	// millisecond
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
	return format;
};

function checkImageType(data) {
	var values = data.files[0].name;
	if (values != "") {
		var array = new Array('gif', 'jpeg', 'png', 'jpg'); // 可以上传的文件类型
		var fileContentType = values.match(/^(.*)(\.)(.{1,8})$/)[3];
		var isExists = false;
		for ( var i in array) {
			if (fileContentType.toLowerCase() == array[i].toLowerCase()) {
				isExists = true;
			}
		}
		if (isExists == false) {
			$.dopAlert("上传图片类型不正确!只支持:gif、jpeg、png、jpg", null);
		} else {
			data.submit();
		}
	}
}

function getCurrentPage(commonDataTable) {
	var iDisplayLength = commonDataTable.dataTableSettings[0]._iDisplayLength;
	var iDisplayStart = commonDataTable.dataTableSettings[0]._iDisplayStart;
	var currentPage = 0;
	if (iDisplayLength >= 1 && iDisplayStart >= 0) {
		currentPage = Math.round(iDisplayStart / iDisplayLength);
	}

	return currentPage;
}

function reloadTable(){
	dataTable.fnDraw();
}
