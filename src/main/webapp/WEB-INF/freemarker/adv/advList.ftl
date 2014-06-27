<body class="page-header-fixed">
	<div class="page-container">
		<div class="page-content">
			<div class="row">
				<div class="col-md-12">
					<h3 class="page-title"> 资讯公告管理 </h3>
					<ul class="page-breadcrumb breadcrumb">
						<li>
							<i class="icon-home"></i>
							<a href="${request.contextPath}/index.htm">首页</a>
							<i class="icon-angle-right"></i>
						</li>
					
						<li>
							<a href="${request.contextPath}/adv/list.htm">广告管理</a>
						</li>
					</ul>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12">
					<div class="portlet box blue">
						<div class="portlet-title">
							<div class="caption">
								广告管理
							</div>
						</div>
						<div class="portlet-body">
								<div class="table-toolbar search-conditions">
									<div class="row">
										<div class="col-md-6 form-group">
											<label class="col-md-4 control-label">城市站</label>
											<div class="col-md-8">
												<select class="form-control input-sm" id="qTerritoryId">
													<option value="">All</option>
													<#list terList as ter>
													<option value="${ter.territoryId}">${ter.territoryName}</option>
													</#list>
												</select>
											</div>
										</div>
										<div class="col-md-6 form-group">
											<label class="col-md-4 control-label">广告位名称</label>

											<div class="col-md-8">
												<select class="form-control input-sm" id="qBlockId">
													<option value="">All</option>
													<#list blockList as block>
													<option value="${block.blockId}">${block.blockName}</option>
													</#list>
												</select>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-6 form-group">
											<label class="col-md-4 control-label">状态</label>

											<div class="col-md-8">
												<select class="form-control input-sm" id="qRowStatus" name="qRowStatus">
													<option value="">All</option>
													<option value="1">待上线</option>
													<option value="2">已上线</option>
													<option value="3">已下线</option>
												</select>
											</div>
										</div>

									</div>

									<div class="row">
										<div class="col-md-6 form-group">

											<label class="col-md-4 control-label">上线时间（起）</label>
											<div class="col-md-8">
												<div class="input-group date form_datetime" type ="standard" data-date-format="yyyy-mm-dd hh:ii" data-date="" id="startTime">
													<input size="16" readonly="" class="form-control" type="text" type ="standard" autocomplete="off" id="qStartTime" name="qStartTime" />
													<span class="input-group-btn">
														<button class="btn default date-reset" type="button">
															<i class="icon-remove"></i>
														</button> </span>
													<span class="input-group-btn">
														<button class="btn default date-set" type="button">
															<i class="icon-calendar"></i>
														</button> </span>
												</div>
											</div>
										</div>

										<div class="col-md-6 form-group">

											<label class="col-md-4 control-label">上线时间（止）</label>
											<div class="col-md-8">
												<div class="input-group date form_datetime" type ="standard" data-date-format="yyyy-mm-dd hh:ii" data-date="" id="endTime">
													<input size="16" readonly="" class="form-control" type="text" type ="standard" autocomplete="off" id="qEndTime" name="qEndTime" >
													<span class="input-group-btn">
														<button class="btn default date-reset" type="button">
															<i class="icon-remove"></i>
														</button> </span>
													<span class="input-group-btn">
														<button class="btn default date-set" type="button">
															<i class="icon-calendar"></i>
														</button> </span>
												</div>
											</div>
										</div>
										<div class="modal fade" id="warning-date-error" tabindex="-1" role="dialog" aria-hidden="true">
											<div class="modal-dialog">
												<div class="modal-content">
													<div class="modal-header">
														<button type="button" class="close" data-dismiss=" modal " aria-hidden="true"></button>
														<h4 class="modal-title">提示</h4>
													</div>
													<div class="modal-body">
														上线时间（起）不能大于上线时间（起），请修改后再查询。
													</div>
													<div class="modal-footer">
														<button type="button" class="btn default blue" data-dismiss = "modal">
															确定
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-6 form-group"></div>
										<div class="col-md-6 form-group">
											<label class="col-md-4 control-label"></label>
											<div class="col-md-8">
												<button class="btn btn-primary " id="btn-inquiry" >
													查询
												</button>
											</div>
										</div>
									</div>
									<hr class"line mbt20" />
									<table class="table table-striped table-bordered table-hover" id="models-data">
										<thead>
											<tr>
												<th></th>
												<th>城市站</th>
												<th>广告位名称</th>
												<th>广告位编号</th>
												<th>内容标题</th>
												<th>状态</th>
												<th>上线时间</th>
												<th>发布者</th>
											</tr>
										</thead>
										<tbody>
											<tr class="odd gradeX">
												<td>
												<input type="checkbox" name="checkbox" class="checkboxes" value="1" />
												</td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
											</tr>
										</tbody>
									</table>
								</div>

							<div class="table-toolbar">
								<button type="button" class="btn default group-control blue" id="preview">
									预览
								</button>
								<button type="button" class="btn default group-control blue" disabled id="onshelfButton" data-toggle="modal" data-target="#check-model-modal">
									上线
								</button>
								<button type="button" class="btn default group-control blue" disabled id="editButton" data-toggle="modal" data-target="#update-model-modal">
									<i class="icon-refresh"></i> 更新
								</button>
								<div class="modal fade" id="editDialog" tabindex="-1" role="basic" aria-hidden="true"></div>
								<div class="modal fade" id="previewDialog" tabindex="-1" role="basic" aria-hidden="true"></div>
								<button type="button" class="btn default group-control blue" disabled id="offshelfButton">
									下线
								</button>
								<button type="button" id="addButton" class="btn default blue" data-toggle="modal" data-target="#file-upload-modal">
									<i class="icon-plus"></i> 新增
								</button>
								<div class="modal fade" id="addDialog" tabindex="-1" role="basic" aria-hidden="true"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- BEGIN PAGE LEVEL SCRIPTS -->
		<script src="${request.contextPath}/assets/scripts/page-adgl.js"></script>
		<script type="text/javascript" src="${request.contextPath}/assets/plugins/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
		<script>
			var dataTable;
			(function($) {
				$(function() {
					App.init();
					dataTable = TableManaged.init();

					// 时间控件
					if (jQuery().datetimepicker) {
						$(".form_datetime").datetimepicker({
							autoclose : true,
							isRTL : App.isRTL(),
							format : "yyyy-mm-dd hh:ii",
							pickerPosition : (App.isRTL() ? "bottom-right" : "bottom-left"),
							language : 'zh-CN'
						});
					}

					$("#addButton").click(function() {
						$.get('add.json', function(data) {
							$('#addDialog').html(data);
						});
						$('#addDialog').modal({
							show : true,
						});
					});
					$('#preview').click(function(){
					$("input[name='radio']:radio:checked").each(function() {

							var id = $(this).val();
							$.get('preview.json?advId=' + id, function(data) {
								$('#previewDialog').html(data);
							});
							$('#previewDialog').modal({
								show : true
							});
						});
					});
					$("#editButton").click(function() {
						$("input[name='radio']:radio:checked").each(function() {

							var id = $(this).val();
							$.get('edit.json?advId=' + id, function(data) {
								$('#editDialog').html(data);
							});
							$('#editDialog').modal({
								show : true
							});
						});
					});

					$("#onshelfButton").click(function() {
						$("input[name='radio']:radio:checked").each(function() {
							var id = $(this).val();
							$.post("onshelf.json", {
								advId : id
							}, function(data) {
								if (data.status == 'true') {
									$.dopAlert('上线成功');
									dataTable.fnDraw();
								} else {
									alert(data.message);
								}
							});
						});
					});

					$("#offshelfButton").click(function() {
						$("input[name='radio']:radio:checked").each(function() {
							var id = $(this).val();
							$.post("offshelf.json", {
								advId : id
							}, function(data) {
								if (data.status == 'true') {
									$.dopAlert('下线成功');
									dataTable.fnDraw();
								} else {
									alert(data.message);
								}
							});
						});
					});

					var startDate;
					// 开始时间
					var endDate;
					//结束时间

					// 修改开始时间时
					$('#startTime').on('changeDate', function(ev) {
						// console.log(ev.date.valueOf());
						// 点击时间控件上的X号时ev.date会为null，此时将startDate赋值为0方便判断
						startDate = ev.date == null ? 0 : ev.date.valueOf();
						if (isStartDateBigger()) {
							$('#warning-date-error').modal('show');
							//弹出层提示
						}
					});

					// 修改结束时间时
					$('#endTime').on('changeDate', function(ev) {
						// console.log(ev.date.valueOf());
						// 点击时间控件上的X号时ev.date会为null，此时将endDate赋值为0方便判断
						endDate = ev.date == null ? 0 : ev.date.valueOf();
						if (isStartDateBigger()) {
							$('#warning-date-error').modal('show');
							//弹出层提示
						}
					});

					//判断开始时间是否大于结束时间
					function isStartDateBigger() {
						if ( typeof (startDate) != 'undefined' && typeof (endDate) != 'undefined' && startDate != 0 && endDate != 0) {
							return startDate > endDate;
						} else {
							return false;
						}
					}

					// 点击查询
					$('#btn-inquiry').click(function() {
						if (isStartDateBigger()) {
							$('#warning-date-error').modal('show');
							//弹出层提示
							return false;
						} else {
							dataTable.fnDraw();
						}
					});
				});
			})(jQuery);
		</script>
</body>
<!-- END BODY -->
