<template>
	<view>
		<customHeader />
		<view class="page-home">
			<view class="page-header">
				<view class="back" @click="back">
					<image src="../../static/back1.svg" mode="widthFix"></image>
					<text>{{$t("app.name17")}}</text>
				</view>
			<!-- 	<view class="like">
					<image src="../../static/like.svg" mode="widthFix"></image>
				</view> -->
			</view>
			
			<view class="page-content">
				<view class="content">
					<rich-text :nodes="richText"></rich-text>
				</view>
			</view>
		</view>
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
				richText:'121212121',
				homeClauseInfo:{},
				type:''
			};
		},
		onLoad(e){
			// this.type = e.type;
			this.type = '1';
			this.getHomeClause();
		},
		methods:{
			async getHomeClause(){
				let res = await $request('homeClause',{})
				// console.log(res)
				
				if(res.data.code==200){
					this.homeClauseInfo = res.data.data;
					if(this.type=='1'){
						this.richText = res.data.data.clause
					}else if(this.type=='2'){
						this.richText = res.data.data.privacy
					}
					return
				}
				uni.showToast({
					icon:'none',
					title:res.data.msg
				})
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color: #F4F6F6;
	}
	.page-home {
		// margin: 0 auto;
		margin-top: -15rpx;
		background-color: #F4F6F6;
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
				color: #959595;
	
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
		.page-content{
			margin-top: 40rpx;
			.content{
				margin: 0 auto;
				width: 90%;
				// padding-top: 40rpx;
				background-color: white;
				border-radius: 20rpx;
				box-sizing: border-box;
				padding:40rpx 20rpx ;
			}
		}
}

</style>
