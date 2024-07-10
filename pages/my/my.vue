<template>
	<view class="page-con">
		<!-- <hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" /> -->
		<customHeader />
		<view class="page-container">
			<view class="my-page">
				<view class="tit">订单</view>
				<view class="list">
					<view class="item" @click="goPage(`/pages/my/order`)">
						<view class="left">
							<view class="pic">
								<image src="../../static/order.svg" mode="widthFix"></image>
							</view>
							<view class="text">订单</view>
						</view>
						<view class="pic icon">
							<image src="../../static/arrow_right.svg" mode="widthFix"></image>
						</view>
					</view>
					<view class="item">
						<view class="left">
							<view class="pic">
								<image src="../../static/qa.svg" mode="widthFix"></image>
							</view>
							<view class="text">FAQ</view>
						</view>
						<view class="pic icon">
							<image src="../../static/arrow_right.svg" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="terms">
					<text>查看</text>
					<text class="a-link">《条款和条件》</text>
					<text>和</text>
					<text class="a-link">《隐私政策》</text>
				</view>
			</view>
			<view class="contact-us terms">
				<view class="text">联系我们</view>
				<view class="a-link">shopsupports@pockyt.io</view>
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
		.df();
		flex-direction: column;

		.my-page {
			flex-grow: 1;

			.tit {
				margin: 32rpx 0;
				font-weight: bold;
				font-size: 40rpx;
				line-height: 1.3;
			}

			.list {
				.item {
					margin-bottom: 2.666667vw;
					border-radius: 2.666667vw;
					padding: 60rpx 56rpx;
					background-color: #fff;
					.df(center, space-between);

					.left {
						.df(center);

						.pic {
							margin-right: 16rpx;
							width: 66rpx;
						}
					}

					.icon {
						width: 36rpx;
					}
				}
			}

			.terms {
				margin-top: 44rpx;
				.df(center, center);
				font-size: 28rpx;

				.a-link {
					color: #41af74;
				}
			}
		}

		.contact-us {
			margin-top: 18rpx;
			.df(center, center);
			flex-direction: column;

			.a-link {
				color: #41af74;
			}

			.text {
				color: #999999;
			}
		}
	}
}
</style>
