<template>
	<view class="empty-box">
		<view class="pic">
			<image src="../static/empty.svg" mode="widthFix" style="width: 200rpx;"></image>
		</view>
		<view class="tit">{{ tit }}</view>
		<view class="desc" v-if="desc">{{ desc }}</view>
	</view>
</template>

<script>
	export default {
		name: 'empty',
		data() {
			return {};
		},
		props: {
			tit: {
				type: String,
				require: true
			},
			desc: {
				type: String,
				require: false
			}
		}
	};
</script>

<style lang="less">
	@import '../static/less/variable.less';

	.empty-box {
		.df(center, center);
		flex-direction: column;
		text-align: center;
		padding: 100rpx ;
		.pic {
			width: 380rpx;
		}

		.tit {
			padding: 30rpx;
			font-weight: bold;
			font-size: 42rpx;
			line-height: 1.3;
			color: #117242;
		}

		.desc {
			color: #777;
			font-size: 30rpx;
			line-height: 1.3;
		}
	}
</style>