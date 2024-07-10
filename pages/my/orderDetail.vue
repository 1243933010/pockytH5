<template>
	<view class="page-con">
		<!-- <hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" /> -->
		<customHeader />
		<view class="page-container">
			<view class="order-status">订单完成</view>
			<view class="order-image pic">
				<image src="../../static/head_bg.8ba4822.png" mode="widthFix"></image>
			</view>
			<view class="order-tit">App Store & iTunes US</view>
			<view class="order-price">$2.00</view>
			<view class="order-gift-card-number-box">
				<view class="left">
					<view class="tit">礼品卡号码</view>
					<view class="number">XH62RXL8Q76MNP63</view>
				</view>
				<view class="right">复制</view>
			</view>
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
		return {};
	},
	computed: {},
	onLoad() {},
	methods: {
		goPage: (url) => {
			uni.navigateTo({ url });
		}
	}
};
</script>

<style lang="less" scoped>
@import '../../static/less/variable.less';

.page-con {
	background-color: #fff;

	.page-container {
		position: relative;
		.df(center);
		flex-direction: column;
		
		.order-status {
			box-shadow: inset 0px 0px 1.066667vw #DBDBDB;
			border-radius: 0 0 22rpx 22rpx;
			padding: 0 44rpx;
			background-color: #fff;
			color: #1CC8BE;
			line-height: 80rpx;
			font-size: 32rpx;
			display: inline-block;
		}
		
		.order-image {
			margin-top: 44rpx;
			box-shadow: 0 10rpx 40rpx #ECECEC;
			border-radius: 28rpx;
			overflow: hidden;
			width: 53.866667vw;
		}
		
		.order-tit {
			margin-top: 12rpx;
			font-size: 36rpx;
			line-height: 1.3;
		}
		
		.order-price {
			margin-top: 12rpx;
			margin-bottom: 80rpx;
			font-size: 56rpx;
			color: #555;
			font-weight: bold;
		}
		
		.order-gift-card-number-box {
			width: calc(100vw - 80rpx);
			box-shadow: 1px 1px 1.333333vw #ccc;
			border-radius: 22rpx;
			overflow: hidden;
			.df();
			
			.left {
				padding: 30rpx;
				flex-grow: 1;
				
				.tit {
					color: #9B9B9B;
					font-size: 32rpx;
					line-height: 1.3;
				}
				
				.number {
					font-size: 44rpx;
					color: #000;
					line-height: 1.3;
					font-weight: bold;
					.vertical(1);
				}
			}
			
			.right {
				padding: 0 30rpx;
				flex-shrink: 0;
				background-color: #41AF74;
				color: #fff;
				.df(center, center);
			}
		}
	}
}
</style>
