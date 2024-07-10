<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
@import "@/static/less/variable.less";

uni-page-body {
	height: 100%;
	
	.page-con {
		height: 100%;
		.df();
		flex-direction: column;
		
		.page-container {
			flex-grow: 1;
		}
	}
}

.pic {
	image {
		width: 100%;
	}
}
</style>
