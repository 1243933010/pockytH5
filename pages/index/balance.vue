<template>
	<view class="page-con">
		<!-- <hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" /> -->
		<customHeader />
		<view class="page-container">
			<view class="amount-title">{{$t("app.name73")}}</view>
			<view class="amount-num">${{userInfo.balance||'0.00'}}</view>
			<!-- <view class="discount-num">{{$t("app.name61")}} $19.8</view> -->
		
			<view class="recharge-btn" @click="handleSubmit">{{$t("app.name74")}}</view>
		</view>
	</view>
</template>

<script>
import customHeader from '@/components/customHeader/customHeader.vue';
import {
		$request
	} from '@/utils/request.js'
export default {
	components: {
		customHeader
	},
	data() {
		return {
			payList:[],
			userInfo:{},
			coin_id:"",
		};
	},
	mounted(){
		this.getUserInfo();
	},
	methods: {
		async getUserInfo(){
			let res = await $request('userInfo',{})
			console.log(res,'---')
			if(res.data.code==200){
				this.userInfo = res.data.data;
			}
		},
		goPage: (url) => {
			// console.log(url);
			uni.navigateTo({ url });
		},
		changeIndex(way){
			this.coin_id = way.id
		},
		async handleSubmit(){
			uni.navigateTo({
				url:'./pay'
			})
			
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
		.amount-title{
			text-align: center;
			padding-top: 100rpx;
			font-weight: 600;
		}
		.amount-num {
			// margin-top: 60rpx;
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
