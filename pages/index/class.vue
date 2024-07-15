<template>
	<view class="page-home">
		<customHeader />
		<view class="page-header">
			<view class="back" @click="back">
				<image src="../../static/back.svg" mode="widthFix"></image>
				<text>{{$t("app.name17")}}</text>
			</view>
		</view>
		<view class="content">
			<view class="list">
				<view class="box">
					<view class="item" v-for="(item,index) in list" :key="index" @click="clickDetail(item)">
						<image :src="imgUlr+item.goods_img" mode="aspectFill"></image>
						<view class="box1">
							<text class="text">{{item.goods_name}}</text>
							<view class="status">{{$t("app.name9")}}1%</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import customHeader from "@/components/customHeader/customHeader.vue";
	import {
		$request,filesUrl
	} from '@/utils/request.js'
	export default {
		components: {
			customHeader,
		},
		data() {
			return {
				list:[]
			};
		},
		computed:{
			imgUlr(){
				return filesUrl
			},
		},
		onLoad(e){
			// let list = uni.getStorageSync('classList')
			// if(list){
			// 	this.list = list;
			// }
			this.getList(e.id)
		},
		methods:{
			back(){
				uni.navigateBack({delta:1})
			},
			async getList(id) {
				let res = await $request('goodsList',`/${id}`)
				console.log(res)
				 if(res.data.code==200){
					 this.list = res.data.data.data;
				 }
			},
			clickDetail(item){
			uni.navigateTo({
				url:`./detail?id=${item.id}`
			})
				// if(item.child.length==0){
				// 	uni.navigateTo({
				// 		url:`./detail?id=${item.id}`
				// 	})
				// }else{
				// 	// uni.setStorageSync('classList',item.child)
				// 	// uni.navigateTo({
				// 	// 	url:'./class'
				// 	// })
				// }
				
			
			},
		}
	}
</script>

<style lang="less" scoped>
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
	.content{
		padding-top: 50rpx;
	}
	.list {
		width: 100%;

		// background-color: red;
		padding-bottom: 120rpx;

		.box {
			width: 95%;
			margin: 0 auto;
			display: flex;
			flex-direction: row;
			align-items: center;
			flex-wrap: wrap;

			.item {
				width: 48%;
				height: 270rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				border-radius: 15rpx;
				box-shadow: 0px 10px 10px rgba(0, 0, 0, .2);
				margin-right: 2%;
				margin-bottom: 30rpx;

				.box1 {
					display: flex;
					flex-direction: column;

					.text {
						width: 270rpx;
						font-size: 35rpx;
						font-weight: 600;
						line-height: 1.5;
						display: block;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.status0 {
						font-size: 26rpx;
						line-height: 2;
					}

					.status {
						color: #FF6F00;
						font-size: 26rpx;
						margin: 0 0 !important;
					}
				}

				image {
					width: 100%;
					height: 150rpx;
					border-radius: 15rpx;
				}
			}
		}
	}
</style>