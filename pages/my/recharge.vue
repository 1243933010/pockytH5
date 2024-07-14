<template>
	<view class="page-con">
		<!-- <hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" /> -->
		<customHeader />
		<view class="page-container">
			<view class="amount-num">{{$t("app.name64")}}</view>
			<view class="amount-num1" @click="$refs.keyboard.open(true)">${{onLoadInfo.total_price}}{{amount}}</view>
			<!-- <view class="discount-num">{{$t("app.name64")}} $19.8</view> -->
			<view class="pay-way">
				<view class="tit">{{$t("app.name60")}}</view>
				<view class="way-list">
					<view class="way-item" v-for="(way,index) in payList" :key="index">
						<view class="left">
							<view class="icon pic">
								<!-- <image :src="way.img" mode="widthFix"></image> -->
							</view>
							<view class="text">
								<view class="way-tit">{{ way.coin_name }}</view>
								<view class="way-desc" v-if="way.desc">
									<text class="red" v-if="way.id === 2">
										$0.00
										<text class="text-underline" @click="goPage('/pages/my/balance')">余额不足请充值</text>
									</text>
									<template v-else>{{ way.desc }}</template>
								</view>
							</view>
						</view>
						<view class="check-radius" :class="{ checked: coin_id === way.id }" @click="changeIndex(way)">
							<view class="pic">
								<image src="../../static/check.svg" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="recharge-btn" @click="handleSubmit">{{$t("app.name63")}}</view>
		</view>
		<master-keyboard ref="keyboard" keyboardtype="digit" :newCar="false" :defaultValue="title"
			@keyboardClick="handleClick"></master-keyboard>
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
			amount:'0.00',
			title:'',
			payList:[],
			onLoadInfo:{},
			coin_id:"",
		};
	},
	onLoad(e){
		console.log(e)
		this.onLoadInfo = e;
		this.getType();
	},
	methods: {
		handleClick(e) {
			console.log(e)
			this.title = e.value;
			this.amount = e.value //键盘输入值
		},
		async getType(){
			let res = await $request('payInfo',{})
			// console.log(res)
			if(res.data.code==200){
				this.payList = res.data.data;
				this.coin_id = res.data.data[0].id
				return
			}
			uni.showToast({
				icon:'none',
				title:res.data.msg
			})
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
				url:`./rechargeAddress?amount=${this.amount*1}&coin_id=${this.coin_id}`
			})
			// let obj = {
			// 	amount:this.amount*1,
			// 	coin_id:this.coin_id,
			// 	}
			// let res = await $request('recharge',obj)
			// // console.log(res)
			// uni.showToast({
			// 	icon:'none',
			// 	title:res.data.msg
			// })
			// if(res.data.code==200){
			// 	// setTimeout(()=>{
			// 	// 	uni.reLaunch({
			// 	// 		url:"/pages/my/order"
			// 	// 	})
			// 	// },1000)
			// 	// this.payList = res.data.data;
			// }
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
			font-size: 40rpx;
			line-height: 1.3;
			// font-weight: bold;
		}
		.amount-num1 {
			margin-top: 20rpx;
			text-align: center;
			font-size: 80rpx;
			line-height: 1.3;
			font-weight: bold;
			color: #969799;
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
