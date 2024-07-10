<template>
	<view class="page-home">
		<view class="logo">
			<image src="../../static/logo.png" mode="widthFix"></image>
		</view>
		<view class="tip">
			<view class="title">
				<text>{{$t("app.name10")}}</text>
			</view>
			<view class="label">
				<text>{{$t("app.name11")}}</text>
			</view>
		</view>
		<view class="form">
			<view class="input">
				<input type="text" :placeholder="$t('app.name12')" />
			</view>
			<view class="input">
				<input type="text" :placeholder="$t('app.name13')" />
			</view>
			<view class="forget">
				<text>{{$t("app.name14")}}</text>
			</view>
			<view class="btn">
				<view class="">
					<text>{{$t("app.name15")}}</text>
				</view>
			</view>
			<view class="create">
				<text>{{$t("app.name16")}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less" scoped>
	page{
		height: 100%;
		// background-color: red;
	}
	.page-home{
		width: 100%;
		height: 100%;
		background: url(../../static/bk.svg) no-repeat center center / 100% 100%;
		.logo{
			width: 100%;
			padding-top: 150rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 30rpx;
			image{
				width: 130rpx;
			}
		}
		.tip{
			width: 100%;
			text-align: center;
			margin-bottom: 30rpx;
			.title{
				font-weight: 600;
				margin-bottom: 15rpx;
				font-size: 42rpx
			}
			.label{
				font-size: 26rpx;
			}
		}
		.form{
			width: 100%;
			display: flex;
			flex-direction: column;
			// align-items: center;
			.input{
				width: 80%;
				background-color: #F8F8F8;
				border-radius: 10rpx;
				margin: 25rpx auto;
				box-sizing: border-box;
				padding: 25rpx 30rpx;
				input{
					font-size: 26rpx;
				}
			}
			.forget{
				width: 80%;
				margin: 0 auto;
				padding-top: 20rpx;
				color: #41AF74;
				font-size: 26rpx;
				display: flex;
				flex-direction: row-reverse;
			}
			.btn{
				width: 80%;
				margin: 0 auto;
				padding-top: 30rpx;
				view{
					width: 100%;
					background-color: #41AF74;
					color: white;
					box-sizing: border-box;
					font-size: 28rpx;
					padding: 20rpx 0;
					border-radius: 10rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
			.create{
				width: 100%;
				text-align: center;
				padding-top: 40rpx;
				color: #41AF74;
				font-size: 28rpx;
			}
		}
	}
</style>
