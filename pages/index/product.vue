<template>
	<view class="page-con">
		<!-- <hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" /> -->
		<customHeader />
		
		<view class="page-container">
			<view class="page-header">
				<view class="back" @click="back">
					<image src="../../static/back.svg" mode="widthFix"></image>
					<text>{{$t("app.name17")}}</text>
				</view>
			</view>
			<view class="search-box">
				<view class="search">
					<input v-model="search" type="text" placeholder="search" />
					<view class="search-icon">
						<view class="pic" @click="getList">
							<image src="../../static/search.svg" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="tab-list">
				<view class="tab-item" v-for="tab in tabLit" :key="tab.val" :class="{ active: checkedTab === tab.val }"
					@click="tabHandle(tab)">{{ tab.text }}</view>
			</view> -->
			<scroll-view :scroll-y="true" @scroll="handleScroll">
				<view class="product-list" v-if="orderList.length">
					<view class="product-item" @click="goPage(order)" v-for="order in orderList">
						<view class="box">
							<view class="pic">
								<image src="../../static/head_bg.8ba4822.png" mode="widthFix"></image>
							</view>
							<view class="product-info">
								<view class="product-tit">{{order.goods_name}}</view>
								<view class="product-price">${{order.min}}~{{order.max}}</view>
								<view class="product-profit">{{$t("app.name9")}} 0.01%</view>
							</view>
						</view>
					</view>
				</view>
				<Empty v-else :tit="$t('app.yue8')" :desc="$t('app.yue9')"></Empty>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import customHeader from '@/components/customHeader/customHeader.vue';
	import Empty from '@/components/empty.vue';
	import {
		$request
	} from '@/utils/request.js'
	export default {
		components: {
			customHeader,
			Empty
		},
		data() {
			return {
				orderList: [],
				search:'',
				isBottomReached: false
			};
		},
		computed: {},
		onLoad() {
			this.getList()
		},
		methods: {
			back(){
				uni.navigateBack({delta:1})
			},
			async getList() {
				let res = await $request('goodsList1', {search:this.search})
				console.log(res)
				if (res.data.code == 200) {
					this.orderList = res.data.data.data;
				}
			},
			goPage(item) {
				uni.navigateTo({
					url: `/pages/index/detail?id=${item.id}`
				});
			},

			handleScroll(e) {
				// 获取滚动位置和总滚动高度
				const scrollTop = e.detail.scrollTop;
				const scrollHeight = e.detail.scrollHeight;
				// 假设你有一个方法来获取screenHeight，这通常是窗口的高度或者scroll-view的可见高度
				const screenHeight = uni.getSystemInfoSync().windowHeight; // 或者使用其他方式获取

				// 判断是否接近底部（这里用了10作为阈值，你可以根据需要调整）
				if (scrollTop + screenHeight >= scrollHeight - 10) {
					this.getList();
					// if (!this.isBottomReached) {
					// 	this.isBottomReached = true;
					// 	this.getList(); // 加载更多数据
					// }
				} else {
					this.isBottomReached = false;
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	@import '../../static/less/variable.less';
.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 40rpx;
		width: 95%;
		margin: 20rpx auto;
		background-color: #F4F6F6;
		
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
	
	}
	.page-con {
		background-color: #f4f6f6;

		.page-container {
			.search-box {
				padding: 22rpx 32rpx;
				background-color: #fff;

				.search {
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
			}

			.product-list {
				@space: 24rpx;
				padding: 24rpx;
				.df();
				flex-wrap: wrap;

				.product-item {
					padding: @space calc(@space / 2) 0;
					width: 50%;

					.box {
						box-shadow: rgba(0, 0, 0, 0.25) 2rpx 10rpx 16rpx 0;
						border-radius: 16rpx;
						background-color: #fff;
						overflow: hidden;

						.pic {
							width: 100%;
						}

						.product-info {
							padding: 32rpx;
							line-height: 48rpx;

							.product-tit {
								font-size: 32rpx;
								.vertical(1);
								word-wrap: break-word;
							}

							.product-price {
								font-size: 20rpx;
								color: #333;
							}

							.product-profit {
								font-size: 24rpx;
								color: #ff6f00;
								line-height: 1.3;
							}
						}
					}
				}
			}
		}
	}
</style>