<template>
	<view class="content">
		<!-- <hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" /> -->
		<customHeader :rightBool="true" @rightClick="rightClick" @openPop="openPop" />
		<view class="page-home">
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="2000"
					:duration="500">
					<swiper-item v-for="(item,index) in bannerList" :key="index">
						<image :src="imgUlr+item.img" mode="widthFix"></image>
					</swiper-item>
				</swiper>
			</view>

			<!-- 			<view class="tip">
				<view class="content">
					<view class="item" v-for="(item,index) in tipList" :key="index">
						<image :src="item.img" mode="widthFix"></image>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view> -->

			<view class="scroll1">
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
					<view class="scroll-view-item_H uni-bg-red" :class="scrollIndex==item.id?'active':''"
						v-for="(item,index) in classList" :key="index" @click="scrollTab(item.id)">
						<view class="box">
							<image :src="imgUlr+item.class_img" mode="widthFix"></image>
							<text>{{item.class_name}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="list">
				<view class="box">
					<view class="item" v-for="(item,index) in list" :key="index" @click="clickDetail(item)">
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
	</view>
</template>

<script>
	import customHeader from "@/components/customHeader/customHeader.vue";
	import {
		$request,
		filesUrl
	} from '@/utils/request.js'
	export default {
		components: {
			customHeader,
		},
		data() {
			return {
				reqInfo: {
					page: 1
				},
				scrollIndex: 0,
				classList: [],
				list: [],
				bannerList: []
			}
		},
		computed: {
			imgUlr() {
				return filesUrl
			},
			tipList() {
				return [{
						name: this.$t("app.tip1"),
						id: "",
						img: '../../static/1.svg'
					},
					{
						name: this.$t("app.tip2"),
						id: "",
						img: '../../static/2.svg'
					},
					{
						name: this.$t("app.tip3"),
						id: "",
						img: '../../static/3.svg'
					},
					{
						name: this.$t("app.tip4"),
						id: "",
						img: '../../static/4.svg'
					},
				]
			},
		},
		onReachBottom() {
			this.reqInfo.page++
			this.getList(this.scrollIndex);
		},
		onLoad() {
			this.getClass()
			this.getBanner();
			this.getList(0);
		},

		methods: {
			async getBanner() {
				let res = await $request('banner', {})
				if (res.data.code == 200) {
					this.bannerList = res.data.data;
				}
			},
			rightClick() {
				uni.navigateTo({
					url: '/pages/index/product'
				})
			},
			openPop() {
				// let token = uni.getStorageSync('token');
				// if()
			},
			async getClass() {
				let res = await $request('goodsClass', {})
				if (res.data.code == 200) {
					this.classList = res.data.data;
				}
			},
			clickDetail(item) {
				uni.navigateTo({
					url: `./detail?id=${item.id}`
				})
			},
			async getList(id) {
				uni.showLoading()
				let res = await $request('goodsList', `/${id}?page=${this.reqInfo.page}&per_page=20`)
				uni.hideLoading()
				this.list = this.list.concat(res.data.data.data)
			},
			scrollTab(index) {
				this.reqInfo.page = 1;
				this.scrollIndex = index;
				this.list = [];
				this.getList(index);
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../static/less/variable.less";

	/deep/.uni-swiper-dot {
		background: white !important;
	}

	/deep/.uni-swiper-dot-active {
		background: rgba(32, 139, 86, 1) !important;
	}

	.page-home {
		background-color: white;

		.uni-margin-wrap {
			width: 100%;
			background-color: white;

			.swiper {
				margin: 0 auto;
				background-color: white;

			
				height: 310rpx;

				image {
					width: 100%;
					// border-radius: 15rpx;
				}
			}

			// display: flex;
			// justify-content: center;
			// align-items: center;
		}



		.hr {
			width: 100%;
			height: 25rpx;
			background-color: #F4F6F6;
		}

		.active {
			color: #3EC0DC;
			font-weight: 700;
			background-color: white !important;
			box-shadow: 0px 10px 10px rgba(0, 0, 0, .2);
		}

		.scroll1 {
			width: 95%;
			margin-top: -10rpx;

			// background: red;
			border-top-left-radius: 15rpx;
			border-top-right-radius: 15rpx;
			// overflow: hidden;

			.scroll-view_H {
				padding-top: 30rpx;
				// background-color: red;
				// padding-bottom: 30rpx;
				width: 100%;
				height: 150rpx;
				// overflow: scroll;
				white-space: nowrap;
				overflow-x: hidden;

				// display: flex;
				// flex-direction: row;
				// flex-wrap: nowrap;
				// align-items: center;
				// background-color: red;


				/deep/.uni-scroll-view {
					-ms-overflow-style: none;
					scrollbar-width: none;
					overflow-x: auto;

					&::-webkit-scrollbar {
						display: none;
					}
				}

				.scroll-view-item_H {
					// width: 250rpx;
					overflow-x: hidden;
					margin: 0 15rpx;
					background-color: #f5f5f5;
					display: inline-block !important;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 25rpx;
					padding: 20rpx 25rpx;

					.box {
						display: flex;
						flex-direction: row;
						align-items: center;
						font-size: 28rpx;

						image {
							width: 52rpx;
							margin-right: 15rpx;
						}
					}
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