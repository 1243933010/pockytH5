<template>
	<view class="page-con">
		<!-- <hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" /> -->
		<customHeader />
		<view class="page-container">
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
					tit: '提示“已兑换”或“此代码已兑换”，Apple ID余额却没到账。',
					content: '礼品卡已经兑换成功。App Store&iTune礼品卡余额到账会有延迟，请第2天再重新登录账号查看Apple ID，余额最后都会成功到账。',
					isActive: true
				},
				{
					tit: '提示“输入的代码无效”或“invalid code”等。',
					content: '请确认输入的是正确的App Store&iTune US卡号，没有输入错误、含空格等，或者错误输入了订单单号或者其他礼卡的卡号。',
					isActive: true
				},
				{
					tit: "提示“此代码必须在美国店面兑换”或“店面不符 你无法在此店面购物”或'this code must be redeemed in the U.S. storefront'。",
					content:
						'App Store&iTune US是美国地区礼品卡，仅适用于美国地区Apple ID。请确认兑换的Apple ID是美国地区的，如果确认是美国地区的，请直接咨询下Apple（苹果）客服。',
					isActive: true
				},
				{
					tit: 'Apple ID余额和付款金额一致，却提示“商店余额不足”。',
					content: '请确认Apple ID地区是否为美国免税州，非免税州需要收取消费税。',
					isActive: true
				},
				{
					tit: '提示“此Apple ID尚未在iTunes商店使用过”。',
					content: 'Apple ID账号信息未完善，请点击弹窗的“检查”完成账号信息。',
					isActive: true
				},
				{
					tit: '提示：Code redemption is temporarily unavailable.Try again later.',
					content: '网络问题，请切换网络后重试。',
					isActive: true
				},
				{
					tit: '提示要添加支付方式。',
					content: '如没有可用支付方式绑定，可设置“无（None）”支付方式。如Apple ID有余额无法添加“无”支付方式，可联系Apple(苹果)客服先把账号余额退回到礼品卡上再作修改。',
					isActive: true
				},
				{
					tit: `提示“你的购买无法完成  如需帮助，请联系iTunes支持，网址：www.apple.com/support/itunes/ww/.”。`,
					content: `账号被限制app内购买服务，非购买付费app（即是限制内购），只能联系Apple(苹果)客服解除限制。<text class="red">请注意，联系Apple(苹果)客服查询时，账号可能会被安全检测，如账号存在风险风险可能会被封禁账号，与礼品卡无关。</text>`,
					isActive: true
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
		padding: 32rpx;
		position: relative;

		.collapse-box {
			border-radius: 20rpx;
			padding: 20rpx 32rpx;
			background-color: #fafafa;

			.collapse-item {
				border-bottom: 1px solid #ebedf0;
				font-size: 28rpx;
				line-height: 1.3;
				
				&:last-child {
					border-bottom: none;
				}

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
						background-color: #f4fff8;
						.df(center, center);
						flex-shrink: 0;

						.pic {
							width: 28rpx;
							transform: rotate(-90deg);
							fill: #66c496;
							transition: transform 0.35s ease-in-out;
						}
					}
				}

				.collapse-content {
					color: #777;
					height: 0;
					overflow: hidden;
					transition: height 0.35s ease-in-out;

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
</style>
