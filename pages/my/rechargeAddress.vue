<template>
	<view class="page-con">
		<customHeader />
		<view class="back" @click="back"
			style="display: flex; flex-direction: row; padding: 20rpx 20rpx;color: red;align-items: center; justify-content: space-between;">
			<view style="display: flex; flex-direction: row; padding: 20rpx 20rpx;color: #41af74;align-items: center;">
				<image src="../../static/back.svg" mode="widthFix" style="width: 30rpx;height: 30rpx;"></image>
				<view>{{$t("app.name17")}}</view>
			</view>
			<view class="time" style="float: right;">
				<text>{{$t("app.name65")}} : {{hours}}:{{ minutes }}:{{ seconds }}</text>
			</view>
		</view>
		<view class="content">

			<view class="form">
				<view class="title">
					<text>{{$t("app.name66")}}:</text>
				</view>
				<view class="input">
					<text>{{payInfo.coin_name}}</text>
				</view>
			</view>
			<view class="form">
				<view class="title">
					<text>{{$t("app.name75")}}:</text>
				</view>
				<view class="price-input">
					<text>{{payInfo.coin_amount}}</text>
				</view>
			</view>
			<view class="form">
				<view class="title">
					<text>{{$t("app.name67")}}:</text>
				</view>
				<view class="erweima">
					<canvas id="qrcode" canvas-id="qrcode"></canvas>
				</view>
			</view>
			<view class="form" style="margin-bottom: 40rpx;">
				<view class="title">
					<text>{{$t("app.name68")}}:</text>
				</view>
				<view class="copy">
					<text class="text">{{payInfo.pay_address}}</text>
					<view class="btn" @click="copy(payInfo.pay_address)">
						<text>{{$t("app.name69")}}</text>
					</view>
				</view>
			</view>
			<view class="form">
				<view class="title">
					<text>{{$t("api.message")}}:</text>
				</view>
				<view class="input" style="background: none;">
					<text style="color: red;">{{$t("app.name76")}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import customHeader from '@/components/customHeader/customHeader.vue';
	import UQRCode from 'uqrcodejs';
	import {
		$request
	} from '@/utils/request.js'
	export default {
		components: {
			customHeader
		},
		data() {
			return {
				amount: '',
				order_id: "",
				payInfo: {},
				timeRemaining: 0, // 30分钟倒计时，单位是秒
				intervalId: null
			};
		},
		computed: {
			hours() {
				return Math.floor(this.timeRemaining / 3600).toString().padStart(2, '0');
			},
			minutes() {
				return Math.floor(this.timeRemaining % 3600 / 60).toString().padStart(2, '0');
			},
			seconds() {
				return (this.timeRemaining % 60).toString().padStart(2, '0');
			}
		},
		onLoad(e) {
			console.log(e)
			// this.amount = e.amount;
			this.order_id = e.order_id;
			this.getOrderInfo();

		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			copy(str) {
				uni.setClipboardData({
					data: str,
					icon: 'none'
				})
			},
			async getOrderInfo() {
				let res = await $request('payInfo1', {
					order_id: this.order_id
				})
				console.log(res)
				if (res.data.code == 200) {
					this.payInfo = res.data.data;
					this.handleSubmit()
					// this.startCountdown();
					let time = new Date().getTime();
					console.log(res.data.data.timeout_at - time / 1000)
					if (res.data.data.timeout_at > (time / 1000)) {
						this.timeRemaining = Math.floor((res.data.data.timeout_at - (time / 1000)))
						this.startCountdown();
					}
				}
			},
			startCountdown() {
				this.intervalId = setInterval(() => {
					if (this.payInfo.pay_status == 1) {
						uni.showToast({
							icon: 'none',
							title: 'success'
						})
						clearInterval(this.intervalId);
						uni.reLaunch({
							url: '/pages/my/order'
						})
					}
					if (this.timeRemaining > 0) {
						this.timeRemaining--;
					} else {
						clearInterval(this.intervalId);
					}
				}, 1000);
			},
			async handleSubmit() {
				// let obj = {
				// 	amount: this.amount * 1,
				// 	coin_id: this.coin_id,
				// }
				// let res = await $request('recharge', obj)
				// // console.log(res)
				// uni.showToast({
				// 	icon: 'none',
				// 	title: res.data.msg
				// })
				// if (res.data.code == 200) {
				// this.payInfo = res.data.data;
				// 获取uQRCode实例
				var qr = new UQRCode();
				// 设置二维码内容
				qr.data = this.payInfo.pay_address;
				// 设置二维码大小，必须与canvas设置的宽高一致
				qr.size = 150;
				// 调用制作二维码方法
				qr.make();
				// 获取canvas上下文
				var canvasContext = uni.createCanvasContext('qrcode', this); // 如果是组件，this必须传入
				// 设置uQRCode实例的canvas上下文
				qr.canvasContext = canvasContext;
				// 调用绘制方法将二维码图案绘制到canvas上
				qr.drawCanvas();
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-con {
		background-color: #f5f5f5;

		.content {
			.time {
				width: 100%;
				padding: 15rpx 30rpx;
				margin: 20rpx 0;
				display: flex;
				flex-direction: row-reverse;
				font-size: 26rpx;
				font-weight: 600;
				color: red;
			}

			.form {
				display: flex;
				flex-direction: column;

				.title {
					font-size: 26rpx;
					box-sizing: border-box;
					padding: 10rpx 5%;
					margin-bottom: 15rpx;
					font-weight: 600;
					color: #41af74;

				}

				.title::before {
					/* Font Awesome图标的Unicode字符 */
					content: '1';
					width: 4rpx;
					height: 20rpx;
					margin-right: 15rpx;
					background-color: #41AF74;
					border-radius: 5rpx;
				}

				.input {
					text-align: center;
					width: 90%;
					margin: 0 auto;
					border-radius: 10rpx;
					box-sizing: border-box;
					padding: 15rpx 15rpx;
					font-size: 34rpx;
					font-weight: bold;
				}

				.price-input {
					text-align: center;
					font-size: 48rpx;
					color: red;
				}

				.erweima {
					margin: auto;
					width: 300rpx;
					height: 300rpx;
				}

				.copy {
					width: 90%;
					margin: 0 auto;
					display: flex;
					justify-content: space-between;
					align-items: center;
					background: #f5f5f5;

					.text {
						box-sizing: border-box;
						padding: 15rpx 50rpx 15rpx 5rpx;
						border-radius: 15rpx;
					}

					text {
						font-size: 24rpx;
						width: 500rpx;
						text-overflow: ellipsis;
					}

					.btn {
						border-radius: 15rpx;
						box-sizing: border-box;
						padding: 10rpx 25rpx;
						font-size: 26rpx;
						color: #41AF74;
					}
				}
			}
		}
	}
</style>