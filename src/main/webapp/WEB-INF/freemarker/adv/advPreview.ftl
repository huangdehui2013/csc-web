<div class="modal-dialog modal-wide">
	<div class="modal-content well node">
		<div class="modal-header mbt20">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			<h4 class="modal-title">预览广告</h4>
		</div>
		<div class="row">
			<form id="uploadImgForm" method="post" action="${cmsPath}/manage/upload.htm" enctype="multipart/form-data">
				<input type="hidden" name="userId" value="${userid}" />
				<input type="hidden" name="application" value="ms" />
				<div class="col-md-6 form-group">
	                <img id="imageUrl" class="imgshow"  name="imgUrl" src="${imgHost}${imageUrl}" imgHost="${imgHost}"/>
	            </div>
	            <div class="form-group col-md-6">
	                <label class="col-md-4 control-label"></label>
	                <div class="col-md-8">
		                   <input type="file" class="default" name="uploadImg" id="uploadImgFile" style="display:none"/>
	                </div>
	            </div>
			</form>
		</div>
		<hr class="line mbt20" />
		<form id="editForm">
			<input type="hidden" value="${block.blockId}" name="blockId" />
			<input type="hidden" value="${node.nodeId}" name="nodeId" />
			<input type="hidden" value="${blockNodeId}" name="blockNodeId" />
			<input type="hidden" value="${territory.territoryId}" name="territoryId" />
			<input id="imageId"  type="hidden" value="${node.imgId}" name="imgId">
			<div class="row advs">
				<div class="col-md-6 form-group">
					<label class="col-md-4 control-label">广告位名称</label>
					<div class="col-md-8">
						<input class="form-control" type="text" value="${block.blockName}" disabled="disabled">
					</div>
				</div>
				<div class="col-md-6 form-group">
					<label class="col-md-4 control-label">城市站</label>
					<div class="col-md-8">
						<input class="form-control" type="text" value="${territory.territoryName}" disabled="disabled">
					</div>
				</div>
				<div class="col-md-6 form-group">
					<label class="col-md-4 control-label">图片URL<span class="required" style="color:red;">*</span></label>
					<div class="col-md-8">
						<input class="form-control" placeholder="" type="text" name="nodeImgLink" value="${node.nodeImgLink}" readonly="">
					</div>
				</div>

				<div class="col-md-6 form-group">
					<label class="col-md-4 control-label">标题<span class="required" style="color:red;">*</span></label>
					<div class="col-md-8">
						<input class="form-control" placeholder="" type="text" name="nodeTitle" value="${node.nodeTitle}" readonly="">
					</div>
				</div>
				<div class="col-md-6 form-group">
					<label class="col-md-4 control-label">标题URL</label>
					<div class="col-md-8">
						<input class="form-control" placeholder="" type="text" name="nodeLink" value="${node.nodeLink}" readonly="">
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn default" data-dismiss="modal">
					关闭
				</button>
				
			</div>
		</form>
	</div>
</div>
<script src="${request.contextPath}/assets/scripts/upload-img.js"></script>
<script src="${request.contextPath}/assets/scripts/app.js"></script>
<script type="text/javascript">
(function($) {
					$(function() {
						App.init();
						
						
					});

				})(jQuery);
	$(function() {

		UploadImg.init("uploadImgFile", "uploadImgForm", "imageUrl", "imageId", 2);
	}); 
</script>