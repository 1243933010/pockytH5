<template>
	<view class="page-con">
		<!-- <hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" /> -->
		<customHeader />
		<view class="page-container">
			<view class="amount-num">$20</view>
			<view class="discount-num">折扣价 $19.8</view>
			<view class="pay-way">
				<view class="tit">选择支付方式</view>
				<view class="way-list">
					<view class="way-item" v-for="way in wayList" :key="way.id">
						<view class="left">
							<view class="icon pic">
								<image :src="way.img" mode="widthFix"></image>
							</view>
							<view class="text">
								<view class="way-tit">{{ way.tit }}</view>
								<view class="way-desc" v-if="way.desc">
									<text class="red" v-if="way.id === 2">
										$0.00
										<text class="text-underline" @click="goPage('/pages/my/balance')">余额不足请充值</text>
									</text>
									<template v-else>{{ way.desc }}</template>
								</view>
							</view>
						</view>
						<view class="check-radius" :class="{ checked: checkedWay === way.id }" @click="checkedWay = way.id">
							<view class="pic">
								<image src="../../static/check.svg" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="recharge-btn">支付</view>
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
			wayList: [
				{
					id: 0,
					img: '../../static/zhifubao.svg',
					tit: '支付宝'
				},
				{
					id: 1,
					img: '../../static/unionpay.svg',
					tit: '中国银联',
					desc: '请使用本人银行卡付款'
				},
				{
					id: 2,
					img: '../../static/balance.svg',
					tit: '余额支付',
					desc: 'true'
				},
				{
					id: 3,
					img: '../../static/wechat.svg',
					tit: '微信支付'
				}
			],
			checkedWay: 0
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

		.amount-num {
			margin-top: 60rpx;
			text-align: center;
			font-size: 80rpx;
			line-height: 1.3;
			font-weight: bold;
		}

		.discount-num {
			margin-bottom: 20rpx;
			color: #1baba2;
			font-size: 40rpx;
			text-align: center;
			font-weight: bold;
		}

		.pay-way {
			.tit {
				padding: 24rpx;
				color: #222;
				font-size: 28rpx;
				line-height: 1.3;
			}

			.way-list {
				border-radius: 16rpx;
				background-color: #fff;

				.way-item {
					padding: 20rpx 32rpx;
					.df(center, space-between);

					.left {
						flex-grow: 1;
						.df(center);

						.icon {
							margin-right: 20rpx;
							border-radius: 50%;
							width: 60rpx;
							height: 60rpx;
						}

						.text {
							.way-tit {
								font-size: 28rpx;
								color: #333;
								line-height: 1.3;
							}

							.way-desc {
								margin-top: 8rpx;
								font-size: 24rpx;
								color: #969799;
								line-height: 1.3;

								.red {
									color: red;

									.text-underline {
										text-decoration: underline;
									}
								}
							}
						}
					}

					.check-radius {
						border-radius: 50%;
						border: 1px solid #c8c9cc;
						width: 40rpx;
						height: 40rpx;
						flex-shrink: 0;
						overflow: hidden;

						.pic {
							width: 100%;
							opacity: 0;
							background-color: transparent;
							transition: background-color 0.35s ease-in-out, opacity 0.35s ease-in-out;
						}

						&.checked {
							border-color: transparent;

							.pic {
								opacity: 1;
								background-color: #41af74;
							}
						}
					}
				}
			}
		}
		
		.recharge-btn {
			margin-top: 40rpx;
			.btn-box();
		}
	}
}
</style>
