//alert编写
jQuery.dopAlert = function(message, imageUrl) {
	var page_content =$(document.body);// $("div[class = 'page-content']");
	var alertMessage = '确定要关闭吗？ ';
	var imageTag = '';
	if (message) {
		alertMessage = message;
	}
	if (imageUrl) {
		imageTag = "<img src='" + imageUrl + "' />";
	}
	var content = '<div id="dop_alert_Modal" class="modal fade" aria-hidden="true" role="basic" tabindex="-1" style="display: none;"><div class="modal-dialog" style="width: 300px;margin-top:140px;"><div class="modal-content"><div class="modal-header">	<button class="close" aria-hidden="true" onclick="$.dopAlert.destoryAlert()" type="button"></button><h4 class="modal-title" style="text-align:left;">提示</h4></div><div class="modal-body"> '
			+ imageTag
			+ alertMessage
			+ '</div><div class="modal-footer"><button class="btn blue" type="button" onclick="$.dopAlert.destoryAlert()">确定</button></div></div></div></div>';
	// 添加alert弹出框
	var dop_alert_Modal = [];
	function addAlert() {
		page_content.append(content);
		var dop_alert_Modal_Interval = window.setInterval(function() {
			dop_alert_Modal = $('#dop_alert_Modal');
			if (dop_alert_Modal.length > 0) {
				dop_alert_Modal.modal({
					backdrop : 'static',
					keyboard: false 
				});
				dop_alert_Modal.on('hidden.bs.modal', function(e) {
					dop_alert_Modal.remove();
				});
				dop_alert_Modal.modal("show");
				clearInterval(dop_alert_Modal_Interval);
			}
		}, 50);
	}

	addAlert();
};
// 销毁alert弹出框
jQuery.dopAlert.destoryAlert = function() {
	dop_alert_Modal = $('#dop_alert_Modal');
	dop_alert_Modal.modal("hide");
};

// confirm编写
jQuery.dopConfirm = function(message, imageUrl,fn) {
	var page_content = $(document.body);//$("div[class = 'page-content']");
	var alertMessage = '确定要操作吗？ ';
	var r;
	var imageTag = '';
	
	if (message) {
		alertMessage = message;
	}
	if (imageUrl) {
		imageTag = "<img src='" + imageUrl + "' />";
	}
	var content = '<div id="dop_confirm_Modal" class="modal fade" aria-hidden="true" role="basic" tabindex="-1" style="display: none;"><div class="modal-dialog" style="width: 300px;margin-top:140px;"><div class="modal-content"><div class="modal-header">	<h4 class="modal-title" style="text-align:left;">提示</h4></div><div class="modal-body"> '
		+ imageTag
		+ alertMessage
		+ '</div><div class="modal-footer"><button class="btn blue" data-dismiss="modal" id="okDopConfirmButton" type="button">确定</button><button class="btn default" type="button" id="destoryDopConfirmButton">取消</button></div></div></div></div>';
	// 添加confirm弹出框
	var dop_Confirm_Modal = [];
	function addConfirm() {
		page_content.append(content);
		var dop_confirm_Modal_Interval = window.setInterval(function() {
			dop_Confirm_Modal = $('#dop_confirm_Modal');
			if (dop_Confirm_Modal.length > 0) {
				dop_Confirm_Modal.modal({
					backdrop : 'static',
					keyboard: false
				});
				dop_Confirm_Modal.on('hidden.bs.modal', function(e) {
					dop_Confirm_Modal.remove();
				});
				dop_Confirm_Modal.modal("show");
				$("#destoryDopConfirmButton").bind("click",function(){
					$.dopConfirm.destoryConfirm();
					callBack(false);
				});
				$("#okDopConfirmButton").bind("click",function(){
					callBack(true);
				});
				clearInterval(dop_confirm_Modal_Interval);
			}
		}, 50);
	}
	//处理回调
	function callBack(r){
		fn(r);
	}
		
	addConfirm();
};
//销毁confirm弹出框
jQuery.dopConfirm.destoryConfirm = function() {
	dop_confirm_Modal = $('#dop_confirm_Modal');
	dop_confirm_Modal.modal("hide");
};
