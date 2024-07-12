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
				<input type="text" v-model="requestInfo.email" :placeholder="$t('app.name12')" />
			</view>
			<view class="input">
				<input type="text" v-model="requestInfo.password" :password="passwordType"  :placeholder="$t('app.name13')" />
				<image  @click="changSet('passwordType')" class="eye"  src="../../static/eye.svg" mode="widthFix"></image>
			</view>
			<view class="forget" @click="goUrl('./forget')">
				<text>{{$t("app.name14")}}</text>
			</view>
			<view class="btn" @click="loginHandle">
				<view class="">
					<text>{{$t("app.name15")}}</text>
				</view>
			</view>
			<view class="create" @click="goUrl('/pages/login/register')">
				<text>{{$t("app.name16")}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		$request,
		filesUrl
	} from "@/utils/request.js";
	export default {
		data() {
			return {
				passwordType:true,
				requestInfo:{
					email:"",
					password:""
				}
			};
		},
		methods:{
			changSet(bool){
				this[bool] = !this[bool];
			},
			goUrl(url){
				uni.navigateTo({
					url
				})
			},
			loginHandle() {
				// this.formData.captcha = this.captchaData.captcha;
				$request("login", this.requestInfo).then(async res => {
					console.log(res)
					let {
						data,
						code,
						msg
					} = res.data;
			
			
					if (code !== 200) {
						// 登录失败
						uni.showToast({
							title: res.data.msg,
							icon: "none",
						});
						return;
					}
					let {
						token,
						userinfo
					} = data;
					uni.setStorageSync("token", `Bearer ${token}`); // 存储token
					uni.setStorageSync("userinfo", userinfo); // 存储token
					uni.reLaunch({
						url:'/pages/index/index'
					})

				});
			},
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
				display: flex;
				justify-content: space-between;
				align-items: center;
				.eye{
					width: 35rpx;
					image{
						width: 100%;
					}
				}
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
