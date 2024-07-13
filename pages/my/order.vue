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
				<view class="tab-item" v-for="tab in tabLit" :key="tab.val" :class="{ active: checkedTab == tab.val }" @click="tabHandle(tab)">{{ tab.text }}</view>
			</view>
			<scroll-view :scroll-y="true" class="tab-pane" @scroll="handleScroll">
				<view class="order-list" v-if="orderList.length">
					<view class="order-item" @click="goPage(`/pages/my/orderDetail`)" v-for="(item,index) in orderList">
						<view class="tag">{{item.order_status}}</view>
						<view class="left">
							<view class="tit">{{item.goods_name}}</view>
							<view class="time">{{item.created_at}}</view>
						</view>
						<view class="right">
							<view class="price">${{item.total_price}}</view>
							<view class="pic">
								<image src="../../static/arrow_right.svg" mode="widthFix"></image>
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
			requestInfo:{
				per_page:20,
				current_page:1,
				order_status:""
			},
			checkedTab: 'all',
			orderList: [],
			isBottomReached: false,
		};
	},
	computed: {
		tabLit(){
			return [
				{
					val: 'all',
					text: this.$t("app.yue4")
				},
				{
					val: "0",
					text:  this.$t("app.yue5")
				},
				{
					val: '1',
					text:  this.$t("app.yue6")
				},
				{
					val: "-1",
					text:  this.$t("app.yue7")
				}
			]
		}
	},
	onLoad() {
		this.getList();
	},
	onReachBottom(){
		this.requestInfo.current_page++;
		this.getList();
	},
	methods: {
		 timestampToDateTime(timestamp) {
		    // 创建一个新的Date对象
		    const date = new Date(timestamp);
		
		    // 获取年、月、日、时、分、秒
		    const year = date.getFullYear();
		    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，所以要加1，并补零
		    const day = date.getDate().toString().padStart(2, '0'); // 补零
		    const hours = date.getHours().toString().padStart(2, '0'); // 补零
		    const minutes = date.getMinutes().toString().padStart(2, '0'); // 补零
		    const seconds = date.getSeconds().toString().padStart(2, '0'); // 补零
		
		    // 格式化年月日时分秒
		    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		},
		async getList(){
			let res = await $request("orderList",{...this.requestInfo})
			if(res.data.code==200){
				res.data.data.data.forEach((val)=>{
					this.tabLit.forEach((item)=>{
						if(val.order_status==item.val){
							val.order_status = item.text;
						}
					})
					val.created_at = this.timestampToDateTime(val.created_at*1000)
				})
				this.orderList.push(...res.data.data.data)
			}
		},
		goPage(url) {
			console.log(url);
			uni.navigateTo({ url });
		},
		tabHandle(tab) {
			this.checkedTab = tab.val;
			this.requestInfo.order_status = tab.val=='all'?'':tab.val;
			this.orderList = [];
			this.getList()
		},
		getOrderList() {
		    // 这里是加载更多数据的逻辑
		    // 假设你从服务器获取了更多数据并更新了list
		    // ...
		    // 加载完成后，重置isBottomReached为false，以便下次可以重新触发加载
		    this.isBottomReached = false;
		},
		handleScroll(e) {
		  //   // 获取滚动位置和总滚动高度
		  //   const scrollTop = e.detail.scrollTop;
		  //   const scrollHeight = e.detail.scrollHeight;
		  //   // 假设你有一个方法来获取screenHeight，这通常是窗口的高度或者scroll-view的可见高度
		  //   const screenHeight = uni.getSystemInfoSync().windowHeight; // 或者使用其他方式获取
				
		  //   // 判断是否接近底部（这里用了10作为阈值，你可以根据需要调整）
		  //   if (scrollTop + screenHeight >= scrollHeight - 10) {
		  //       if (!this.isBottomReached) {
		  //           this.isBottomReached = true;
		  //           this.getOrderList(); // 加载更多数据
		  //       }
		  //   } else {
		  //       this.isBottomReached = false;
		  //   }
		},
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
