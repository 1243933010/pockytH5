<template>
	<view class="page-home">
		<view class="logo">
			<image src="../../static/logo.png" mode="widthFix"></image>
		</view>
		<view class="tip">
			<view class="title">
				<text>{{$t("app.name50")}}</text>
			</view>
			<view class="label">
				<text>{{$t("app.name51")}} <text style="color:#41AF74 ;">{{onloadInfo.email}}</text> </text>
			</view>
		</view>
		<view class="form">
			<view class="input">
				<input v-model="requestInfo.code" type="text" :placeholder="$t('app.name57')" />
				<view class="get" v-if="typeof codeText =='number'">{{codeText}}</view>
				<view class="get" v-if="typeof codeText =='string'" @click="handleTime">{{codeLocale}}</view>
			</view>
			
			
			<view class="btn" @click="confirm">
				<view class="">
					<text>{{$t("app.name53")}}</text>
				</view>
			</view>
			<view class="create" @click="back">
				<text>{{$t("app.name52")}}</text>
			</view>
			
			<view class="other">
				<view class="xieyi">
					<checkbox-group @change="change">
						<label>
							<checkbox style="transform:scale(0.8)" value="cb" checked="true" />
						</label>
					</checkbox-group>
					<view class="text">
						<text>{{$t("app.name19")}} <text class="text1" @click="goUrl('/pages/index/xieyi')">《{{$t("app.name20")}}》</text>{{$t("app.name21")}}  <text class="text1"  @click="goUrl('/pages/index/xieyi')">《{{$t("app.name22")}}》</text></text>
					</view>
				</view>
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
				requestInfo:{
					code:"",
				},
				codeText: '',
				onloadInfo:{}
			};
		},
		computed:{
			codeLocale() {
				return this.$t("login.get-code");
			},
		},
		onLoad(e){
			
			if(e.params){
				this.onloadInfo = JSON.parse(e.params);
				this.sendEmail();
			}
			console.log(this.onloadInfo)
		},
		methods:{
			goUrl(url){
				uni.navigateTo({
					url
				})
			},
			back(){
				uni.navigateBack({delta:1})
			},
			handleTime() {
			
				if (typeof this.codeText == "number") {
					return false
				}
				console.log(typeof this.codeText == "number")
				this.codeText = 60;
				this.sendEmail();
				this.timeFnc = setInterval(() => {
					this.codeText--;
					if (this.codeText == 0) {
						this.codeText = this.$t("login.get-code");
						clearInterval(this.timeFnc);
						this.timeFnc = null
					}
				}, 1000)
			},
			async sendEmail() {
				let res;
				res = await $request("getCode", {
					email: this.onloadInfo.email,
					method: "register"
				})
			
				uni.showToast({
					icon: "none",
					title: res.data.msg,
				});
			},
			async confirm(){
				
				// this.formData.password_confirmation = this.formData.password;
				let data = await $request("register", {...this.onloadInfo,...this.requestInfo});
				console.log(data)
				uni.showToast({
					icon: "none",
					title: data.data.msg,
				});
				if (data.data.code == 200) {
					uni.setStorageSync("token", `Bearer ${data.data.data.token}`);
					uni.setStorageSync("userinfo", data.data.data.userinfo); // 存储token
					uni.reLaunch({
						url: "/pages/index/index",
					});
					// let {
					// 	invite_code,
					// 	type,
					// 	id
					// } = this.onLoadParams;
					// if (invite_code || type) {
					// 	let obj = {
					// 		charityConsultationDetail: '/pages/index/detail/charityConsultationDetail',
					// 		passingLoveDetail: '/pages/index/detail/passingLoveDetail',
					// 		activityDetail: '/pages/me/activity/activityDetail'
					// 	}
					// 	uni.reLaunch({
					// 		url: `${obj[type]}?invite_code=${invite_code}&type=${type}&id=${id}`
					// 	})
					// } else {
					// 	uni.reLaunch({
					// 		url: "/pages/index/index",
					// 	});
					// }
					// uni.reLaunch({
					// 	url: "/pages/index/index",
					// });
				} else {
					this.codeText = this.$t("login.get-code");
					clearInterval(this.timeFnc);
					this.timeFnc = null
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		height: 100%;
		// background-color: red;
	}
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
	.page-home{
		width: 100%;
		height: 100%;
		background: url(../../static/bk.svg) no-repeat center center / 100% 100%;
		.logo{
			width: 100%;
			padding-top: 170rpx;
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
				.get{
					font-size: 25rpx;
					color: #41AF74;
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
			.other{
				width: 95%;
				margin: 0 auto;
				// border-top: 1px solid #DCDFE6;
				// border-bottom: 1px solid #DCDFE6;
				box-sizing: border-box;
				padding: 40rpx 0;
				display: flex;
				justify-content: center;
				align-items: center;
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
			}
		}
	}
</style>
