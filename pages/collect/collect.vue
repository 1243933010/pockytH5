<template>
	<view class="page-home">
		<view class="search-box">
			<view class="search">
				<input type="text"/>
				<view class="search-icon">
					<view class="pic">
						<image src="../../static/search.svg" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="edit">
				<image src="../../static/edit.svg" mode="widthFix"></image>
			</view>
		</view>
		<view class="" style="height: 137rpx;"></view>
		
		<view class="list">
			<view class="box">
				<view class="item" v-for="(item,index) in list" :key="index" @click="goDetail(item)">
					<image :src="imgUlr+item.goods_img" mode="aspectFill"></image>
					<view class="box1">
						<text class="text">{{item.goods_name}}</text>
						<view class="status">Up to <span
								style="font-size: 28rpx;padding: 0rpx 10rpx;">{{(item.rate * 100).toFixed(0)}}%</span>
							off</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {$request,filesUrl} from '@/utils/request.js'
	export default {
		data() {
			return {
				list: [],
				reqInfo: {
					page: 1
				},
			};
		},
		onReachBottom() {
			// this.reqInfo.page++
			this.getList();
		},
		computed:{
			imgUlr(){
				return filesUrl
			},
		},
		onLoad(){
			this.getList();
		},
		methods: {
			goDetail(item){
				uni.navigateTo({
					url:`/pages/index/detail?id=${item.id}`
				})
			},
			async getList() {
				let res = await $request('collectList',{})
				if(res.data.code==200){
					this.list = res.data.data.data;
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	@import '../../static/less/variable.less';
	page{
		background: #F4F6F6;
	}
	.page-home {
		

		.search-box {
			box-sizing: border-box;
			padding: 22rpx 26rpx;
			background-color: white;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 137rpx;
			position: fixed;
			top: 0;
			width: 750rpx;
			.search {
				width: 80%;
				border-radius: 1.333333vw;
				border: 0.4vw solid #66c496;
				padding: 10rpx 16rpx 10rpx 28rpx;
				.df(center, center);

				input {
					color: #323233;
					flex-grow: 1;
				}

				.search-icon {
					border-radius: 50%;
					width: 66rpx;
					height: 66rpx;
					background-color: #f4fff8;
					.df(center, center);
					flex-shrink: 0;

					.pic {
						width: 30rpx;
					}
				}
			}

			.edit {
				image {
					width: 60rpx;
				}
			}
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
					height: 310rpx;
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
						align-items: center;
		
						.text {
							text-align: center;
							width: 270rpx;
							font-size: 32rpx;
							line-height: 2;
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
							color: #41af74;
							font-size: 22rpx;
							font-weight: bold;
							margin: 0 0 !important;
						}
					}
		
					image {
						width: 100%;
						height: 190rpx;
						border-radius: 15rpx;
					}
				}
			}
		}
	}
</style>