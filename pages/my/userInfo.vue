<template>
	<view class="page-con">
		<customHeader />
		<view class="page-header">
			<view class="back" @click="back">
				<image src="../../static/back.svg" mode="widthFix"></image>
				<text>{{$t("app.name17")}}</text>
			</view>
		</view>
		<view class="page-container">
			<view class="list">
				<view class="item" @click="tabClick(item)" v-for="(item,index) in list1" :key="index" :class="index!==0?'active':''">
					<view class="left">
						<image :src="item.img" mode="widthFix"></image>
						<view class="text">
							<text class="title">{{item.text}}</text>
						</view>
					</view>
					<view class="right">
						<image src="../../static/user/right_arrow.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="item" @click="tabClick(item)" v-for="(item,index) in list2" :key="index" :class="index!==0?'active':''">
					<view class="left">
						<image :src="item.img" mode="widthFix"></image>
						<view class="text">
							<text class="title">{{item.text}}</text>
						</view>
					</view>
					<view class="right">
						<image src="../../static/user/right_arrow.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import customHeader from '@/components/customHeader/customHeader.vue';
	export default {
		components: {
			customHeader
		},
		data() {
			return {
				
			};
		},
		computed:{
			list1(){
				return [
					{img:'../../static/user/4.svg',text:this.$t("app.name70"),type:'1'},
					{img:'../../static/user/5.svg',text:this.$t("app.name71"),type:'2'}
				]
			},
			list2(){
				return [
					{img:'../../static/user/6.svg',text:this.$t("app.name72"),type:'3'}
				]
			}
		},
		methods:{
			back(){
				const pages = getCurrentPages()
					if (pages.length === 1) {
						if (typeof params === 'number') {
							history.go(-params)
						} else {
							history.back()
						}
					} else {
						uni.navigateBack()
					}
			},
			tabClick(item){
				
				if(item.type=='1'){
					let url = '/pages/index/balance'
					uni.navigateTo({url})
				}
				if(item.type=='2'){
					let url = '/pages/login/forget'
					uni.navigateTo({url})
				}
				if(item.type=='3'){
					uni.clearStorage();
					uni.showToast({
						icon:'none',title:'success'
					})
					setTimeout(()=>{
						uni.reLaunch({
							url:'/pages/login/login'
						})
					},1000)
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color: rgba(244, 246, 246, 1);
	}
	
	.page-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 40rpx;
			width: 95%;
			margin: 0 auto;
			// background-color: white;
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
	.page-container{
		width: 90%;
		margin: 20rpx auto;
		.list{
			width: 100%;
			display: flex;
			flex-direction: column;
			background-color: white;
			border-radius: 20rpx;
			margin-bottom: 50rpx;
			margin-top: 20rpx;
			.active{
				box-sizing: border-box;
				border-top: 1px solid #ebedf0;
			}
			.item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding: 30rpx 15rpx;
				.left{
					display: flex;
					flex-direction:row;
					align-items: center;
					image{
						width: 40rpx;
						margin-right: 15rpx;
					}
					.text{
						display: flex;
						flex-direction: column;
						.title{
							font-size: 30rpx;
						}
					}
				}
				.right{
					width: 40rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
						width: 20rpx;
					}
				}
			}
		}
	}

</style>
