<template>
	<view class="page-con">
		<customHeader />
		<view class="content">
			<view class="time">
				<!-- <text></text> -->
				<text>{{$t("app.name65")}}:{{ minutes }}:{{ seconds }}</text>
			</view>
			<view class="form">
				<view class="title">
					<text>{{$t("app.name66")}}</text>
				</view>
				<view class="input">
					<text>{{payInfo.pay_chain}}</text>
				</view>
			</view>
			<view class="form">
				<view class="title">
					<text>{{$t("app.name67")}}</text>
				</view>
				<view class="erweima">
					<canvas id="qrcode" canvas-id="qrcode"></canvas>
					<!-- <text>{{payInfo.pay_chain}}</text> -->
				</view>
			</view>
			<view class="form">
				<view class="title">
					<text>{{$t("app.name68")}}</text>
				</view>
				<view class="copy">
					<text>{{payInfo.pay_address}}</text>
					<view class="btn">
						<text>{{$t("app.name69")}}</text>
					</view>
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
				coin_id: "",
				payInfo: {},
				timeRemaining: 30 * 60, // 30分钟倒计时，单位是秒
				intervalId: null
			};
		},
		computed: {
			minutes() {
				return Math.floor(this.timeRemaining / 60).toString().padStart(2, '0');
			},
			seconds() {
				return (this.timeRemaining % 60).toString().padStart(2, '0');
			}
		},
		onLoad(e) {
			console.log(e)
			this.amount = e.amount;
			this.coin_id = e.coin_id;
			this.handleSubmit();
			this.startCountdown();
		},
		methods: {
			startCountdown() {
				this.intervalId = setInterval(() => {
					if (this.timeRemaining > 0) {
						this.timeRemaining--;
					} else {
						clearInterval(this.intervalId);
					}
				}, 1000);
			},
			async handleSubmit() {
				let obj = {
					amount: this.amount * 1,
					coin_id: this.coin_id,
				}
				let res = await $request('recharge', obj)
				// console.log(res)
				uni.showToast({
					icon: 'none',
					title: res.data.msg
				})
				if (res.data.code == 200) {
					this.payInfo = res.data.data;
					// 获取uQRCode实例
					var qr = new UQRCode();
					// 设置二维码内容
					qr.data = this.payInfo.pay_address;
					// 设置二维码大小，必须与canvas设置的宽高一致
					qr.size = 100;
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
	}
</script>

<style lang="less" scoped>
	.page-con {
		background-color: #f5f5f5;

		.content {
			.time{
				width: 100%;
				padding: 15rpx 30rpx;
				margin: 20rpx 0;
				display: flex;
				flex-direction: row-reverse;
				font-size: 26rpx;
				font-weight: 600;
				color: darkgray;
			}
			.form {
				display: flex;
				flex-direction: column;

				.title {
					font-size: 26rpx;
					box-sizing: border-box;
					padding: 10rpx 5%;
					margin-bottom: 15rpx;

				}

				.input {
					width: 90%;
					margin: 0 auto;
					border-radius: 15rpx;
					background: white;
					box-sizing: border-box;
					padding: 15rpx 15rpx;
				}

				.erweima {
					width: 300rpx;
					height: 300rpx;
					margin: 0 auto;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.copy {
					width: 90%;
					margin: 0 auto;
					display: flex;
					justify-content: space-between;
					align-items: center;
					background: #f5f5f5;

					.text {
						font-size: 26rpx;
					}

					.btn {
						background-color: #41af74;
						border-radius: 15rpx;
						box-sizing: border-box;
						padding: 10rpx 25rpx;
						font-size: 26rpx;
						color: white;
					}
				}
			}
		}
	}
</style>