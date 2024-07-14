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
							<view class="tit">{{ item.tit }}</view>
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
					{
						tit: "提示“已兑换”或“此代码已兑换”，Apple ID余额却没到账。",
						content: "礼品卡已经兑换成功。App Store&iTune礼品卡余额到账会有延迟，请第2天再重新登录账号查看Apple ID，余额最后都会成功到账。",
						isActive: true
					},
					{
						tit: "提示“输入的代码无效”或“invalid code”等。",
						content: "请确认输入的是正确的App Store&iTune US卡号，没有输入错误、含空格等，或者错误输入了订单单号或者其他礼卡的卡号。",
						isActive: false
					},
					{
						tit: "提示“此代码必须在美国店面兑换”或“店面不符 你无法在此店面购物”或'this code must be redeemed in the U.S. storefront'。",
						content: "App Store&iTune US是美国地区礼品卡，仅适用于美国地区Apple ID。请确认兑换的Apple ID是美国地区的，如果确认是美国地区的，请直接咨询下Apple（苹果）客服。",
						isActive: false
					},
					{
						tit: "Apple ID余额和付款金额一致，却提示“商店余额不足”。",
						content: "请确认Apple ID地区是否为美国免税州，非免税州需要收取消费税。",
						isActive: false
					},
					{
						tit: "提示“此Apple ID尚未在iTunes商店使用过”。",
						content: "Apple ID账号信息未完善，请点击弹窗的“检查”完成账号信息。",
						isActive: false
					},
					{
						tit: "提示：Code redemption is temporarily unavailable.Try again later.",
						content: "网络问题，请切换网络后重试。",
						isActive: false
					},
					{
						tit: "提示要添加支付方式。",
						content: "如没有可用支付方式绑定，可设置“无（None）”支付方式。如Apple ID有余额无法添加“无”支付方式，可联系Apple(苹果)客服先把账号余额退回到礼品卡上再作修改。",
						isActive: false
					},
					{
						tit: `提示“你的购买无法完成  如需帮助，请联系iTunes支持，网址：www.apple.com/support/itunes/ww/.”。`,
						content: `账号被限制app内购买服务，非购买付费app（即是限制内购），只能联系Apple(苹果)客服解除限制。<text class="red">请注意，联系Apple(苹果)客服查询时，账号可能会被安全检测，如账号存在风险风险可能会被封禁账号，与礼品卡无关。</text>`,
						isActive: false
					}
				]
			};
		},
		methods:{
			back(){
				uni.navigateBack({delta:1})
			},
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
