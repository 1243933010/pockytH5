<template>
	<view class="content">
		<!-- <hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" /> -->
		<customHeader />
		<view class="page-home">
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
					:interval="interval" :duration="duration">
					<swiper-item>
						<image src="../../static/head_bg.8ba4822.png" mode="widthFix"></image>
					</swiper-item>
					<!-- <swiper-item>
						<image src="../../static/head_bg.8ba4822.png" mode="aspectFill"></image>
					</swiper-item> -->
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import customHeader from "@/components/customHeader/customHeader.vue";
	export default {
		components: {
			customHeader,
		},
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		computed: {
			
		},
		onLoad() {
			let code = uni.getLocale();
			// if (code) {
			//   this.imgSrc = this.iconList[this.locale[code]];
			// }
			console.log(this.$t, this.$t("app.test"), code, this.$i18n.locale)
			// uni.setLocale("zh-Hans");
			// this.$i18n.locale = "zh-Hans";
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.uni-swiper-dot-active{
		background-color: rgba(32, 139, 86,1) !important;
	}
	.page-home{
		margin-top: -15rpx;
		background-color: white;
		border-top-right-radius: 15rpx;
		border-top-left-radius: 15rpx;
		.uni-margin-wrap{
			width: 100%;
			.swiper{
				width: 95%;
				margin: 0 auto;
				// border-radius: 15rpx;
				padding-top: 15rpx;
				swiper-item{
					border-radius: 15rpx;
				}
				image{
					width: 100%;
					// border-radius: 15rpx;
				}
			}
			// display: flex;
			// justify-content: center;
			// align-items: center;
		}
	}
</style>