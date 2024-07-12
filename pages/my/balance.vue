<template>
	<view class="page-con">
		<!-- <hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" /> -->
		<customHeader />
		<view class="page-container">
			<view class="text">当前余额</view>
			<view class="amount-num">$20</view>
			<view class="recharge-btn">充值</view>
		</view>
	</view>
</template>

<script>
import customHeader from '@/components/customHeader/customHeader.vue';
export default {
	components: {
		customHeader
	},
	data() {
		return {
		};
	},
	methods: {
		goPage: (url) => {
			console.log(url);
			uni.navigateTo({ url });
		}
	}
};
</script>

<style lang="less" scoped>
@import '../../static/less/variable.less';

.page-con {
	background-color: #f4f6f6;

	.page-container {
		padding: 22rpx 50rpx;
		
		.text {
			margin-top: 60rpx;
			text-align: center;
			line-height: 1.3;
			font-size: 28rpx;
		}

		.amount-num {
			text-align: center;
			font-size: 80rpx;
			line-height: 1.3;
			font-weight: bold;
		}
		
		.recharge-btn {
			margin-top: 40rpx;
			.btn-box();
		}
	}
}
</style>
