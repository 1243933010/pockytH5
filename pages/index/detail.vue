<template>
	<view>
		<customHeader />
		<view class="page-home">
			<view class="page-header">
				<view class="back" @click="back">
					<image src="../../static/back.svg" mode="widthFix"></image>
					<text>{{$t("app.name17")}}</text>
				</view>
				<view class="like">
					<image src="../../static/like.svg" mode="widthFix"></image>
				</view>
			</view>
			<view class="goods">
				<view class="img">
					<image :src="goodsInfo.url" mode="widthFix"></image>
				</view>
				<view class="title">
					<text>{{goodsInfo.title}}</text>
				</view>
				<view class="form">
					<view class="form-title">
						<text>{{$t("app.name18")}}</text>
					</view>
					<view class="input" @click="open">
						<text>{{pleaderPrice}}</text>
					</view>
				</view>
			</view>
			<view class="other">
				<view class="xieyi">
					<checkbox-group @change="change">
						<label>
							<checkbox style="transform:scale(0.8)" value="cb" checked="true" />
						</label>
					</checkbox-group>
					<view class="text">
						<text>{{$t("app.name19")}} <text class="text1">《{{$t("app.name20")}}》</text>{{$t("app.name21")}}  <text class="text1">《{{$t("app.name22")}}》</text></text>
					</view>
				</view>
				<view class="warn">
					<image src="../../static/warning.svg" mode=""></image>
					<text>{{$t("app.name23")}}</text>
				</view>
			</view>
			
			<view class="rich">
				<view class="title">
					<text>Powered by</text>
					<image src="../../static/logo3.svg" mode="widthFix"></image>
				</view>
				<view class="text1 default">
					<text class="title">{{$t("app.name24")}}</text>
				</view>
				<view class="text2">
					<text>test</text>
				</view>
			</view>
			<view class="rich rich1">
				<view class="text1 default">
					<text class="title">{{$t("app.name25")}}</text>
				</view>
				<view class="text2">
					<text>test</text>
				</view>
			</view>
		</view>
		<view class="pay-btn" :class="checkBoxValue.length>0?'disabled':''">
			<text>{{$t("app.name26")}}</text>
		</view>
		<master-keyboard ref="keyboard" keyboardtype="digit" :randomNumber="true" :newCar="false" :defaultValue="title"
			@keyboardClick="handleClick"></master-keyboard>
	</view>
</template>

<script>
	import customHeader from "@/components/customHeader/customHeader.vue";
	import {
		$request
	} from '@/utils/request.js'
	export default {
		components: {
			customHeader,
		},
		data() {
			return {
				goodsInfo: {
					url: '../../static/head_bg.8ba4822.png',
					title: 'test'
				},
				price: '',
				title: '',
				checkBoxValue:[]
			};
		},
		computed: {
			pleaderPrice() {
				if (this.price) {
					return this.price
				} else {
					return `$1-2000`
				}
			}
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			change(e){
				this.checkBoxValue = e.detail.value;
			},
			open() {
				this.$refs.keyboard.open(true) //true 键盘显示 false 键盘隐藏
			},
			handleClick(e) {
				console.log(e)
				this.title = e.value;
				this.price = e.value //键盘输入值
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/ .uni-checkbox-input-checked{
		background-color: rgb(27, 171, 162);
		border: none;
	}
	/deep/ .uni-checkbox-input{
		box-sizing: border-box;
		border-color: #969799 !important;
	}
	/deep/ .uni-checkbox-input:hover{
		border-color: #969799 !important;
	}
	/deep/ .uni-checkbox-input.uni-checkbox-input-checked:before{
		color: white;
	}
	.page-home {
		// margin: 0 auto;
		margin-top: -15rpx;
		background-color: white;
		border-top-right-radius: 15rpx;
		border-top-left-radius: 15rpx;

		.page-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 40rpx;
			width: 95%;
			margin: 0 auto;

			.back {
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 28rpx;
				color: #41AF74;

				image {
					width: 32rpx;
				}
			}

			.like {
				border: 1px solid #C4C4C4;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 76rpx;
				height: 76rpx;

				image {
					width: 44rpx;
				}
			}
		}

		.goods {
			width: 95%;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-sizing: border-box;
			padding-top: 40rpx;

			.img {
				width: 500rpx;
				margin-bottom: 20rpx;

				image {
					width: 100%;
				}
			}

			.title {
				color: #555555;
				font-size: 36rpx;
				font-weight: 600;
			}

			.form {
				width: 95%;
				display: flex;
				flex-direction: column;
				margin-bottom: 60rpx;
				.form-title {
					font-size: 28rpx;
					margin-bottom: 15rpx;
				}

				.input {
					width: 100%;
					font-size: 26rpx;
					background-color: #F8F8F8;
					color: #969799;
					box-sizing: border-box;
					padding: 15rpx 20rpx;
					border-radius: 20rpx;
				}
			}
		}
		.other{
			width: 95%;
			margin: 0 auto;
			border-top: 1px solid #DCDFE6;
			border-bottom: 1px solid #DCDFE6;
			box-sizing: border-box;
			padding: 40rpx 0;
			// display: flex;
			// flex-direction: row;
			// align-items: center;
			uni-checkbox-group{
				display: flex;
				align-items: center;
				justify-content: center;
				padding-top: 5rpx;
				font-size: 26rpx;
			}
			.xieyi{
				display: flex;
				flex-direction: row;
				align-items: center;
				color: #777777;
				font-size: 26rpx;
				margin-bottom: 30rpx;
				.text1{
					color: #41AF74;
				}
			}
			.warn{
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 26rpx;
				font-weight: 600;
				color: #555555;
				image{
					width: 35rpx;
					height: 35rpx;
					margin-right: 10rpx;
				}
			}
		}
		
		.rich{
			width: 95%;
			margin: 0 auto;
			padding-top: 40rpx;
			padding-bottom: 40rpx;
			.title{
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				color: #777777;
				// font-weight: 600;
				font-size: 42rpx;
				image{
					width: 180rpx;
				}
			}
			.text1{
				display: inline-block;
				// flex-direction: column;
				width: 100%;
				text-align: left;
				padding-left: 15rpx;
				margin-bottom: 15rpx;
				.title{
					font-size: 30rpx;
					display: inline-block;
					width: 100%;
					text-align: left;
					color: #555;
					font-weight: 600;
				}
			}
			.default{
				border-left: 8rpx solid #41AF74;
			}
			.text2{
				color: #777777;
				font-size: 27rpx;
			}
		}
		.rich1{
			padding-bottom: 180rpx;
		}
	}
	.pay-btn{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #e0e0e0;
		color: #9b9b9b;
		font-size: 45rpx;
		font-weight: 600;
		box-sizing: border-box;
		padding: 40rpx 0;
	}
	.disabled{
		background-color: #41AF74;
		color: white;
	}
</style>