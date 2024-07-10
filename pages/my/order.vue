<template>
	<view class="page-con">
		<!-- <hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" /> -->
		<customHeader />
		<view class="page-container">
			<view class="search-box">
				<view class="search">
					<input type="text" placeholder="search" />
					<view class="search-icon">
						<view class="pic">
							<image src="../../static/search.svg" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="tab-list">
				<view class="tab-item" v-for="tab in tabLit" :key="tab.val" :class="{ active: checkedTab === tab.val }" @click="tabHandle(tab)">{{ tab.text }}</view>
			</view>
			<scroll-view :scroll-y="true" class="tab-pane">
				<view class="order-list" v-if="orderList.length">
					<view class="order-item">
						<view class="tag">订单完成</view>
						<view class="left">
							<view class="tit">App Store & iTunes US</view>
							<view class="time">04/07/2024 09:22:33</view>
						</view>
						<view class="right">
							<view class="price">$2.00</view>
							<view class="pic">
								<image src="../../static/arrow_right.svg" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				<Empty v-else tit="暂无订单" desc="您可以在主页挑选你最喜欢的礼品卡"></Empty>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import customHeader from '@/components/customHeader/customHeader.vue';
import Empty from '@/components/empty.vue';
export default {
	components: {
		customHeader,
		Empty
	},
	data() {
		return {
			tabLit: [
				{
					val: 1,
					text: '全部'
				},
				{
					val: 2,
					text: '订单完成'
				},
				{
					val: 3,
					text: '订单失败'
				},
				{
					val: 4,
					text: '处理中'
				}
			],
			checkedTab: 1,
			orderList: [1]
		};
	},
	computed: {},
	onLoad() {},
	methods: {
		goPage(url) {
			console.log(url);
			uni.navigateTo({ url });
		},
		tabHandle(tab) {
			this.checkedTab = tab.val;
			getOrderList()
		},
		getOrderList() {
			// 获取订单列表
		}
	}
};
</script>

<style lang="less" scoped>
@import '../../static/less/variable.less';

.page-con {
	background-color: #f4f6f6;

	.page-container {
		.search-box {
			padding: 22rpx 26rpx;
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

		.tab-list {
			.df();
			background-color: #fff;

			.tab-item {
				text-align: center;
				width: 25%;
				line-height: 96rpx;
				font-size: 32rpx;
				color: #646566;
				position: relative;

				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					width: 0px;
					height: 2px;
					transition: width 0.35s ease-in-out;
					background-color: #41af74;
				}

				&.active {
					color: #41af74;

					&::after {
						width: 60%;
					}
				}
			}
		}

		.tab-pane {
			.order-list {
				padding: 0 44rpx;
				
				.order-item {
					margin-top: 34rpx;
					border-radius: 10rpx;
					padding: 54rpx 36rpx;
					background-color: #fff;
					position: relative;
					overflow: hidden;
					.df(center, space-between);
					
					.tag {
						position: absolute;
						left: 0;
						top: 0;
						border-bottom-right-radius: 10rpx;
						padding: 4rpx 10rpx;
						background-image: linear-gradient(194.24deg, #5DEADD 10.12%, #22D3C2 56.66%);
						font-size: 28rpx;
						color: #fff;
						line-height: 1.3;
					}
					
					.left {
						flex-grow: 1;
						
						.tit {
							font-size: 36rpx;
							color: #555;
							line-height: 1.3;
							font-weight: bold;
							.vertical(1);
						}
						
						.time {
							margin-top: 12rpx;
							font-size: 36rpx;
							line-height: 1.3;
							color: #777;
						}
					}
					
					.right {
						padding-left: 20rpx;
						.df(center);
						flex-shrink: 0;
						
						.price {
							font-size: 40rpx;
							font-weight: bold;
							color: #555;
							line-height: 1.3;
						}
						
						.pic {
							width: 40rpx;
							height: 40rpx;
							flex-shrink: 0;
						}
					}
				}
			}
			
			.empty-box {
				margin-top: 80rpx;
			}
		}
	}
}
</style>
