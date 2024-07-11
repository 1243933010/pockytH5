<template>
	<view class="page-con">
		<!-- <hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" /> -->
		<customHeader />
		<view class="page-container">
			<view class="order-status">订单完成</view>
			<view class="order-image pic">
				<image src="../../static/head_bg.8ba4822.png" mode="widthFix"></image>
			</view>
			<view class="order-tit">App Store & iTunes US</view>
			<view class="order-price">$2.00</view>
			<view class="order-gift-card-number-box">
				<view class="left">
					<view class="tit">礼品卡号码</view>
					<view class="number">XH62RXL8Q76MNP63</view>
				</view>
				<view class="right">复制</view>
			</view>
			<view class="anti-fraud">防诈提醒</view>
			<view class="list">
				<view class="item">
					<view class="label">实付金额</view>
					<view class="info">$2.00</view>
				</view>
				<view class="item">
					<view class="label">交易状态</view>
					<view class="info">success</view>
				</view>
				<view class="item">
					<view class="label">订单编号</view>
					<view class="info">2IIN8UYMF5KLG3</view>
				</view>
				<view class="item">
					<view class="label">购买时间</view>
					<view class="info">2024-07-04 09:22:33</view>
				</view>
			</view>
			<view class="agin-btn">再次购买</view>
			<view class="faq-box">
				<view class="faq-tit">FAQ about App Store & iTunes US</view>
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
			<view class="contact-us terms">
				<view class="text">{{$t("app.yue3")}}</view>
				<view class="a-link">shopsupports@pockyt.io</view>
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
	computed: {},
	onLoad() {},
	methods: {
		goPage: (url) => {
			uni.navigateTo({ url });
		}
	}
};
</script>

<style lang="less" scoped>
@import '../../static/less/variable.less';

.page-con {
	background-color: #fff;

	.page-container {
		padding: 0 32rpx;
		position: relative;
		.df(center);
		flex-direction: column;

		.order-status {
			box-shadow: inset 0px 0px 1.066667vw #dbdbdb;
			border-radius: 0 0 22rpx 22rpx;
			padding: 0 44rpx;
			background-color: #fff;
			color: #1cc8be;
			line-height: 80rpx;
			font-size: 32rpx;
			display: inline-block;
		}

		.order-image {
			margin-top: 44rpx;
			box-shadow: 0 10rpx 40rpx #ececec;
			border-radius: 28rpx;
			overflow: hidden;
			width: 53.866667vw;
		}

		.order-tit {
			margin-top: 12rpx;
			font-size: 32rpx;
			line-height: 1.3;
		}

		.order-price {
			margin-top: 12rpx;
			margin-bottom: 80rpx;
			font-size: 52rpx;
			color: #555;
			font-weight: bold;
		}

		.order-gift-card-number-box {
			width: 100%;
			box-shadow: 1px 1px 1.333333vw #ccc;
			border-radius: 22rpx;
			overflow: hidden;
			.df();

			.left {
				padding: 30rpx;
				flex-grow: 1;

				.tit {
					color: #9b9b9b;
					font-size: 28rpx;
					line-height: 1.3;
				}

				.number {
					font-size: 40rpx;
					color: #000;
					line-height: 1.3;
					font-weight: bold;
					.vertical(1);
				}
			}

			.right {
				padding: 0 30rpx;
				flex-shrink: 0;
				background-color: #41af74;
				color: #fff;
				.df(center, center);
			}
		}

		.anti-fraud {
			margin-top: 70rpx;
			color: #41af74;
			font-size: 28rpx;
			text-decoration: underline;
			line-height: 1.3;
		}

		.list {
			width: 100%;

			.item {
				border-bottom: 1px solid #ebedf0;
				padding: 20rpx 0;
				.df(center, space-between);
				font-size: 28rpx;
				line-height: 1.3;

				&:last-child {
					border: none;
				}

				.label {
					color: #323233;
				}

				.info {
					color: #969799;
				}
			}
		}

		.agin-btn {
			margin-top: 32rpx;
			.btn-box();
			width: 100%;
		}

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
				background-color: #fafafa;
				
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

		.contact-us {
			margin-top: 40rpx;
			margin-bottom: 12rpx;
			.df(center, center);
			flex-direction: column;

			.a-link {
				color: #41af74;
			}

			.text {
				color: #999999;
			}
		}
	}
}
</style>
