<template>
	<view class="page-con">
		<customHeader />
		<view class="back" @click="back"
			style="display: flex; flex-direction: row; padding: 40rpx 20rpx;color: #41af74;align-items: center;">
			<image src="../../static/back.svg" mode="widthFix" style="width: 30rpx;height: 30rpx;"></image>
			<view>{{$t("app.name17")}}</view>
		</view>
		<view class="page-container">

			<view class="amount-num">${{onLoadInfo.total_price}}</view>
			<view class="pay-way">
				<view class="tit">{{$t("app.name60")}}</view>
				<view class="way-list">
					<view class="way-item" v-for="(way,index) in payList" :key="index" @click="changeIndex(way)">
						<view class="left">
							<view class="icon pic">
								<image :src="imgUlr + way.coin_logo" mode="widthFix"></image>
							</view>
							<view class="text">
								<view class="way-tit">{{ way.coin_name }}</view>
							</view>
						</view>
						<view class="check-radius" :class="{ checked: coin_id === way.id }">
							<view class="pic">
								<image src="../../static/check.svg" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="recharge-btn" @click="handleSubmit">{{$t("app.name63")}}</view>
		</view>
	</view>
</template>

<script>
	import customHeader from '@/components/customHeader/customHeader.vue';
	import {
		$request,
		filesUrl
	} from '@/utils/request.js'
	export default {
		components: {
			customHeader
		},
		computed: {
			imgUlr() {
				return filesUrl
			},
		},
		data() {
			return {
				payList: [],
				onLoadInfo: {},
				coin_id: "",
				userInfo: {},
				recharge: false,
				type: ''
			};
		},
		onLoad(e) {
			console.log(e)
			this.type = e?.type
			this.onLoadInfo = e;
			this.getType();
			this.getUserInfo();
		},
		methods: {
			async getUserInfo() {
				let res = await $request('userInfo', {})
				console.log(res, '---')
				if (res.data.code == 200) {
					this.userInfo = res.data.data;
				}
			},
			async getType() {
				let res = await $request('payInfo', {})
				// console.log(res)
				if (res.data.code == 200) {
					this.payList = res.data.data;
					this.coin_id = res.data.data[0].id
					return
				}
				uni.showToast({
					icon: 'none',
					title: res.data.msg
				})
			},
			goPage: (url) => {
				// console.log(url);
				uni.navigateTo({
					url
				});
			},
			changeIndex(way) {
				this.coin_id = way.id
			},
			async handleSubmit() {
				let obj = {
					goods_id: this.onLoadInfo.goods_id,
					total_price: this.onLoadInfo.total_price,
					coin_id: this.coin_id,
				}
				let res = await $request('orderCreate', obj)
				// console.log(res)
				uni.showToast({
					icon: 'none',
					title: res.data.msg
				})
				if (res.data.code == 200) {
					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/my/order"
						})
					}, 1000)
					// this.payList = res.data.data;
				}
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	};
</script>

<style lang="less" scoped>
	@import '../../static/less/variable.less';

	.page-con {
		background-color: #f4f6f6;

		.page-container {
			padding: 0rpx 50rpx;

			.amount-num {
				
				text-align: center;
				font-size: 80rpx;
				line-height: 1.3;
				font-weight: bold;
				color: #41af74;
			}

			.discount-num {
				margin-bottom: 20rpx;
				color: #1baba2;
				font-size: 36rpx;
				text-align: center;
				font-weight: bold;
			}

			.pay-way {
				.tit {
					padding: 24rpx 0rpx;
					color: #222;
					font-size: 28rpx;
					line-height: 1.2;
					font-weight: bold;
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
										color: #41af74;

										.text-underline {
											text-decoration: underline;
											margin-left: 20rpx;
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