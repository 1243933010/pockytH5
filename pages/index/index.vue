<template>
	<view class="content">
		<!-- <hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" /> -->
		<customHeader :rightBool="true" @rightClick="rightClick" />
		<view class="page-home">
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="2000"
					:duration="500">
					<swiper-item v-for="(item,index) in bannerList" :key="index">
						<image :src="imgUlr+item.img" mode="widthFix"></image>
					</swiper-item>
				</swiper>
			</view>

			<view class="tip">
				<view class="content">
					<view class="item" v-for="(item,index) in tipList" :key="index">
						<image :src="item.img" mode="widthFix"></image>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>

			<view class="hr"></view>
			<view class="scroll1">
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
					<view class="scroll-view-item_H uni-bg-red" :class="scrollIndex==index?'active':''"
						v-for="(item,index) in scroll" :key="index" @click="scrollTab(item,index)">
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
						<image :src="imgUlr+item.class_img" mode="aspectFill"></image>
						<view class="box1">
							<text class="text">{{item.class_name}}</text>
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
	import {$request,filesUrl} from '@/utils/request.js'
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
				scroll:[],
				list: [],
				bannerList:[]
			}
		},
		computed: {
			imgUlr(){
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
			this.getList();
		},
		onLoad() {
			this.getClass()
			this.getBanner();
		},
		
		methods: {
			async getBanner(){
				let res = await $request('banner',{})
				 if(res.data.code==200){
					 this.bannerList = res.data.data;
				 }
			},
			rightClick(){
				uni.navigateTo({
					url:'/pages/index/product'
				})
			},
			async getClass(){
				let res = await $request('goodsClass','/0')
				 if(res.data.code==200){
					 this.scroll = res.data.data;
					 this.list = this.scroll[0].child;
				 }
			},
			clickDetail(item){
			
				// if(item.child.length==0){
				// 	uni.navigateTo({
				// 		url:`./detail?id=${item.id}`
				// 	})
				// }else{
				// 	uni.setStorageSync('classList',item.child)
				// 	uni.navigateTo({
				// 		url:'./class'
				// 	})
				// }
				
				
			// 	if(item.child.length==0){
			// 		uni.navigateTo({
			// 			url:`./detail?id=${item.id}`
			// 		})
			// 	}else{
			// 	this.getList(item.id)
			// }
			this.getList(item.id)
			
			},
			async getList(id) {
				let res = await $request('goodsList',`/${id}`)
				console.log(res)
				 if(res.data.code==200){
					 // uni.navigateTo({
					 // 	url:`./class?id=${id}`
					 // })
					 if(res.data.data.data.length==1){
						 uni.navigateTo({
						 	url:`./detail?id=${res.data.data.data[0].id}`
						 })
					 }else if(res.data.data.data.length>1){
						 	uni.navigateTo({
						 		url:`./class?id=${id}`
						 	})
					 }
				 }
			},
			scrollTab(item, index) {
				this.scrollIndex = index;
				this.list = this.scroll[index].child;
				// this.reqInfo.page = 1;
				// this.getList();
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
		margin-top: -15rpx;
		background-color: white;
		border-top-right-radius: 15rpx;
		border-top-left-radius: 15rpx;

		.uni-margin-wrap {
			width: 100%;

			.swiper {
				width: 95%;
				margin: 0 auto;
				// border-radius: 15rpx;
				padding-top: 15rpx;

				swiper-item {
					border-radius: 15rpx;
				}

				image {
					width: 100%;
					// border-radius: 15rpx;
				}
			}

			// display: flex;
			// justify-content: center;
			// align-items: center;
		}

		.tip {
			width: 100%;
			padding-top: 25rpx;

			.content {
				width: 95%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.item {
					display: flex;
					flex-direction: row;
					align-items: center;
					color: #005C2F;
					font-size: 26rpx;

					image {
						width: 32rpx;
						margin-right: 10rpx;
					}
				}
			}
		}

		.hr {
			width: 100%;
			height: 40rpx;
			margin-top: 25rpx;
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

			.scroll-view_H {
				padding-top: 30rpx;
				// background-color: red;
				// padding-bottom: 30rpx;
				width: 100%;
				height: 150rpx;
				// overflow: scroll;
				white-space: nowrap;

				// display: flex;
				// flex-direction: row;
				// flex-wrap: nowrap;
				// align-items: center;
				// background-color: red;
				.scroll-view-item_H {
					// width: 250rpx;
					margin: 0 15rpx;
					background-color: #f5f5f5;
					display: inline-block !important;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 25rpx;
					padding: 10rpx 25rpx;

					.box {
						display: flex;
						flex-direction: row;
						align-items: center;
						font-size: 28rpx;

						image {
							width: 62rpx;
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
						.status0{
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
						height: 206rpx;
						border-radius: 15rpx;
					}
				}
			}
		}
	}
</style>