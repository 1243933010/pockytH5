<template>
	<view class="page-home">
		<view class="logo">
			<image src="../../static/logo.png" mode="widthFix"></image>
		</view>
		<view class="tip">
			<view class="title">
				<text>{{$t("app.name16")}}</text>
			</view>
			<view class="label">
				<text>{{$t("app.name27")}}</text>
			</view>
		</view>
		<view class="form">
			<view class="input">
				<input v-model="requestInfo.name" type="text" :placeholder="$t('app.name28')" />
			</view>
			<view class="input">
				<input  v-model="requestInfo.first_name" type="text" :placeholder="$t('app.name29')" />
			</view>
			<view class="input">
				<input  v-model="requestInfo.email" type="text" :placeholder="$t('app.name30')" />
			</view>
			<view class="input">
				<input  v-model="requestInfo.password" :password="passwordType" :placeholder="$t('app.name31')"  />
			   <image  @click="changSet('passwordType')" class="eye"  src="../../static/eye.svg" mode="widthFix"></image>
			</view>
			<view class="ul">
				<view class="title">
					<text>{{$t("app.name35")}}</text>
				</view>
				<ul class="content">
					<li class="item" :class="index+1==ulList.length?'item1':''" v-for="(item,index) in ulList" :key="index">
						<text>{{item.name}}</text>
					</li>
				</ul>
			</view>
			<view class="input">
				<input v-model="requestInfo.confirmPassword" :password="confirmPasswordType" :placeholder="$t('app.name32')"  />
			     <image  @click="changSet('confirmPasswordType')" class="eye" src="../../static/eye.svg" mode="widthFix"></image>
			</view>
		
			<view class="btn" @click="nextClick">
				<view class="">
					<text>{{$t("app.name33")}}</text>
				</view>
			</view>
			<view class="create" @click="back">
				<text>{{$t("app.name34")}}</text>
			</view>
			
			<view class="other">
				<view class="xieyi">
					<checkbox-group @change="change">
						<label>
							<checkbox style="transform:scale(0.8)" value="cb" checked="true" />
						</label>
					</checkbox-group>
					<view class="text">
						<text>{{$t("app.name19")}} <text class="text1" @click="goUrl('/pages/index/xieyi?type=1')">《{{$t("app.name20")}}》</text>{{$t("app.name21")}}  <text class="text1"  @click="goUrl('/pages/index/xieyi?type=2')">《{{$t("app.name22")}}》</text></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkList:['cd'],
				passwordType:true,
				confirmPasswordType:true,
				requestInfo:{
					email:"",
					password:'',
					first_name:"",
					name:'',
					code:"",
					confirmPassword:''
				}
			};
		},
		computed:{
			ulList(){
				return [
					{name:this.$t("app.name36")},
					{name:this.$t("app.name37")},
					{name:this.$t("app.name38")},
					{name:this.$t("app.name39")},
					{name:this.$t("app.name40")},
				]
			}
		},
		methods:{
			changSet(bool){
				this[bool] = !this[bool];
			},
			change(e){
				this.checkList = e.detail.value;
			},
			goUrl(url){
				uni.navigateTo({
					url
				})
			},
			containsHalfWidthSymbol(str) {
			    // 定义一个包含半角符号的正则表达式
			    const regex = /[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/;
			    // 使用正则表达式测试字符串
			    return regex.test(str);
			},
			back(){
				// uni.navigateBack({delta:1})
				uni.reLaunch({
					url:"/pages/login/login"
				})
			},
			nextClick(){
				if(!this.checkList.length){
					uni.showToast({
						icon:'none',
						title:this.$t("app.name54")
					})
					return
				}
				if(!this.containsHalfWidthSymbol(this.requestInfo.password)){
					uni.showToast({
						icon:'none',
						title:this.$t("app.name55")
					})
					return
				}
				if(this.requestInfo.password!==this.requestInfo.confirmPassword){
					uni.showToast({
						icon:'none',
						title:this.$t("app.name56")
					})
					return
				}
				uni.navigateTo({
					url:`./email?params=${JSON.stringify(this.requestInfo)}`
				})
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
			padding-top: 70rpx;
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
			.ul{
				width: 80%;
				margin: 0 auto;
				.title{
					color: #555;
					font-size: 26rpx;
					margin-bottom: 30rpx;
				}
				.content{
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-wrap: wrap;
					padding-left: 30rpx;
					.item{
						color: #999;
						width: 50%;
						font-size: 24rpx;
						text-align: left;
						margin-bottom: 10rpx;
					}
					.item1{
						width: 100% !important;
					}
				}
			}
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
