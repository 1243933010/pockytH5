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
				<input type="text" :placeholder="$t('app.name28')" />
			</view>
			<view class="input">
				<input type="text" :placeholder="$t('app.name29')" />
			</view>
			<view class="input">
				<input type="text" :placeholder="$t('app.name30')" />
			</view>
			<view class="input">
				<input type="password" :placeholder="$t('app.name31')"  />
			</view>
			<view class="input">
				<input type="password" :placeholder="$t('app.name32')"  />
			</view>
		
			<view class="btn">
				<view class="">
					<text>{{$t("app.name33")}}</text>
				</view>
			</view>
			<view class="create">
				<text>{{$t("app.name34")}}?</text>
			</view>
			<view class="ul">
				<view class="title">
					<text>{{$t("app.name35")}}</text>
				</view>
				<ul class="content">
					<li class="item" v-for="(item,index) in ulList" :key="index">
						
					</li>
				</ul>
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
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
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
