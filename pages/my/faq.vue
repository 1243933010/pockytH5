<template>
	<view class="page-home">
		<customHeader />
		<view class="page-header">
			<view class="back" @click="back">
				<image src="../../static/back.svg" mode="widthFix"></image>
				<text>{{$t("app.name17")}}</text>
			</view>
		</view>
		<view class="content1">
			<view class="faq-box">
				<!-- <view class="faq-tit">FAQ about App Store & iTunes US</view> -->
				<view class="collapse-box">
					<view class="collapse-item" v-for="(item, index) in faqList" :key="index" :class="{ active: item.isActive }">
						<view class="collapse-tit" @click="item.isActive = !item.isActive">
							<view class="icon">
								<view class="pic">
									<image src="../../static/arrow_right.svg" mode="widthFix"></image>
								</view>
							</view>
							<view class="tit">{{ item.title }}</view>
						</view>
						<view class="collapse-content">
							<view class="content" v-html="item.content"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
			$request
		} from '@/utils/request.js'
	import customHeader from '@/components/customHeader/customHeader.vue';
	import Empty from '@/components/empty.vue';
	export default {
		components: {
			customHeader,
			Empty
		},
		data() {
			return {
				faqList: [
					
				]
			};
		},
		onLoad() {
			this.getlist()
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
			async getlist(){
				let res = await $request("faq")
				if(res.data.code == 200){
					this.faqList = res.data.data
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../static/less/variable.less';
	.page-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 40rpx;
			width: 95%;
			margin: 0 auto;
			background-color: #F4F6F6;
			margin-bottom: 25rpx;
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
	page{
		background-color: #F4F6F6;
		.content1{
			width: 90%;
			margin: 0 auto;
			background-color: white;
			border-radius: 40rpx;
			.faq-box {
				width: 100%;
				
				.faq-tit {
					margin-top: 40rpx;
					margin-bottom: 32rpx;
					font-size: 32rpx;
					color: #555;
					text-align: center;
					font-weight: bold;
				}
			
				.collapse-box {
					border-radius: 20rpx;
					padding: 20rpx 32rpx;
					// background-color: #fafafa;
					
					.collapse-item {
						border-bottom: 1px solid #ebedf0;
						font-size: 28rpx;
						line-height: 1.3;
						
						.collapse-tit {
							padding: 20rpx 0;
							color: #323233;
							.df(flex-start, space-between);
							
							.tit {
								flex-grow: 1;
							}
							
							.icon {
								margin-right: 16rpx;
								border-radius: 50%;
								width: 32rpx;
								height: 32rpx;
								background-color: #F4FFF8;
								.df(center, center);
								flex-shrink: 0;
								
								.pic {
									width: 28rpx;
									transform: rotate(-90deg);
									fill: #66C496;
									transition: transform .35s ease-in-out;
								}
							}
						}
						
						.collapse-content {
							color: #777;
							height: 0;
							overflow: hidden;
							transition: height .35s ease-in-out;
							
							.content {
								border-top: 1px solid #ebedf0;
								padding: 24rpx 0 24rpx 48rpx;
								
								.red {
									color: red;
								}
							}
						}
						
						&.active {
							.collapse-tit {
								.icon {
									.pic {
										transform: rotate(90deg);
									}
								}
							}
						
							.collapse-content {
								height: auto;
							}
						}
					}
				}
			}
		}
	}
</style>
