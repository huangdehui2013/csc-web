<title>上汽电商运营平台</title>
<style>
	.borderno tbody > tr > td {
		border: none;
	}
	.borderno tbody > tr > td a {
		color: #fff
	}
	.dashboard-stat .more {
		font-size: 16px;
	}
</style>
<div class="page-content">
	<div class="clearfix"></div>
	<!-- BEGIN PAGE HEADER-->
	<div class="row">
		<div class="col-md-12">
			<ul class="page-breadcrumb breadcrumb">
				<li>
					<i class="icon-home"></i>
					<a href="${request.contextPath}/index.htm">首页</a>
				</li>
			</ul>
		</div>
	</div>
	<!-- END PAGE HEADER-->
	<div class="row">
		<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
			<div class="dashboard-stat blue" style="height:208px;">
				<a class="more" href="#">广告管理<i class="m-icon-swapright m-icon-white"></i></a>
				<table class="table borderno">
					<tbody>
						<tr>
							<td><a href="/csc/adv/list.htm">平台广告管理</a></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	$(function() {
		App.init();
	}); 
</script>

<!-- END BODY -->
