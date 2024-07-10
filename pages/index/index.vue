<template>
	<view class="content">
		<!-- <hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" /> -->
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
			<text>{{$t("index.title")}}</text>
		</view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	export default {
		components: {
			hxNavbar,
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		computed: {
			config() {
				return {
					title: this.$t("app.test"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		onLoad() {
			let code = uni.getLocale();
			// if (code) {
			//   this.imgSrc = this.iconList[this.locale[code]];
			// }
			console.log(this.$t,this.$t("app.test"),code,this.$i18n.locale)
			 // uni.setLocale("zh-Hans");
			 // this.$i18n.locale = "zh-Hans";
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
