<template>
	<view class="page">
		<view class="image-width" :class="bgImg?'image-width1':''">
			<!-- #ifdef APP -->
			<view class="header" :style="{ paddingTop: iStatusBarHeight + 'px' }">
			<!-- #endif -->
				<!-- #ifdef H5 -->
				<view class="header">
				<!-- #endif -->
					<view class="header-icon" @click="openPop">
						<image :src="img" mode="widthFix"></image>
						<text>{{ headerText }}</text>
					</view>
					<!-- <view class="header-text">
          <text>{{ headerText }}</text>
        </view> -->
					<view class="" v-if="rightBool">
						<view class="search-both" @click="rightClick">
							<view class="search">
								<view class="search-icon">
									<view class="pic">
										<image src="../../static/search.svg" mode="widthFix"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="" v-if="rightBool">
						<!-- <view class="search" @click="rightClick">
							<view class="search-icon">
								<view class="pic">
									<image src="../../static/search.svg" mode="widthFix"></image>
								</view>
							</view>
						</view> -->
						<picker cancel-text="取消1" confirm-text="确定1" @change="bindPickerChange" :value="index" :range="array">
						  <view class="header-select">
						    <image class="header-select-icon" src="../../static/img/yuyan.png" mode="widthFix"></image>
						    <image class="header-select-select" src="../../static/img/select_icon.png" mode="widthFix"></image>
						  </view>
						</picker>
					</view>
					<!-- <picker cancel-text="取消1" confirm-text="确定1" @change="bindPickerChange" :value="index"
						:range="array">
						<view class="header-select">
							
						</view>
					</picker> -->
				</view>
			</view>

			<uni-popup ref="popup" type="center" background-color="#fff" v-if="above">
				<view class="popup-container">
					<view class="popup-tit">{{$t("app.name")}}</view>
					<view class="popup-content">{{ $t("aboutUs.content") }}</view>
					<view class="popup-close-btn" @click="closePop">{{$t("app.sure")}}</view>
				</view>
			</uni-popup>
		</view>
</template>

<script>
	import {
		setTabbar
	} from "@/utils/utils.js";
	export default {
		name: "customHeader",
		props: {
			above: {
				type: Boolean,
				default: false
			},
			bgImg: {
				type: String,
				default: ''
			},
			rightBool: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				iStatusBarHeight: 0,
				index: 0,
				array: ["漢語", "English", "Francés", "Español", " اللغة العربية","Sprache","言語 (げんご)","Lingua","언어","Taal","Idioma"],
				iconList: ["../../static/img/cn.png", "../../static/img/eg.png", "../../static/img/fr.png",
					"../../static/img/es.png", "../../static/img/asa.png"
				],
				code: ["zh_TW", "en", "fr", "es", "ara","de","ja","it","ko","nl","pt"],
				// imgSrc: "../../static/img/eg.png",
				locale: {
					// "zh_CN": 0,
					"zh_TW":0,
					en: 1,
					fr: 2,
					es: 3,
					ara:4,
					de:5,
					ja:6,
					it:7,
					ko:8,
					nl:9,
					pt:10
				},
				headerText: '',
				img: '../../static/img.svg'
			};
		},
		mounted() {
			this.headerText = this.$t("app.name1")

			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			console.log(this.iStatusBarHeight, "系统栏高度");
			let code = uni.getLocale();
			if (code) {
				// this.imgSrc = this.iconList[this.locale[code]];
			}
			let userinfo = uni.getStorageSync('userinfo');
			console.log(userinfo)
			if (userinfo) {
				this.headerText = userinfo.first_name
			}
		},
		methods: {
			rightClick(){
				this.$emit('rightClick')
			},
			bindPickerChange: function(e) {
				// console.log(this.$t, "------",this.$i18n.locale,e,this.code[e.detail.value]);
				// console.log("picker发送选择改变，携带值为", this.code[e.detail.value]);
				
				// this.imgSrc = this.iconList[e.detail.value];
				uni.setLocale(this.code[e.detail.value]);
				
				this.$i18n.locale = this.code[e.detail.value];
				
				// setTabbar(this.$t);
				this.headerText = this.$t("app.name1")
				this.$emit('listenLocale')
			},
			openPop() {
				let token = uni.getStorageSync('token');
				if (!token) {
					uni.reLaunch({
						url: "/pages/login/login"
					})
				}else{
					uni.navigateTo({
						url:'/pages/my/userInfo'
					})
				}
				// this.$refs.popup.open("center");
			},
			closePop() {
				this.$refs.popup.close();
			},
		},
	};
</script>

<style lang="less" scoped>
	@import "../../static/less/variable.less";
	.search-both{
		background-color: #F5F5F5;
		width: 350rpx;
		border-radius: 15rpx;
		display: flex;
		flex-direction: row-reverse;
		.search {
			width: 66rpx;
			height: 66rpx;
			.search-icon {
				background-color: #F4FFF8;
				
			}
			// background-color: red;
		}
	}
	.search {
		width: 80%;
		border-radius: 1.333333vw;
		// padding: 10rpx 16rpx 10rpx 28rpx;
		.df(center, center);

		.search-icon {
			border-radius: 50%;
			width: 66rpx;
			height: 66rpx;
			background-color: #F4FFF8;
			.df(center, center);
			flex-shrink: 0;

			.pic {
				width: 30rpx;
			}
		}
	}

	.page {
		width: 100%;
	}

	.image-width {
		// padding-top: 44rpx;
		width: 100%;
		// height: 200rpx;
		background: url("/static/head_bg.8ba4822.png") no-repeat center center / 100%;
		// background-color: #FEDFC6;
		// background: linear-gradient(0deg, #FDF0B8 0%, #FFE3B1 100%);
		flex-shrink: 0;

		.header {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: calc(100% - 60rpx);
			margin: 0 auto;
			/* #ifdef H5 */
			padding-top: 14rpx;
			/* #endif */
			padding-bottom: 30rpx;
			// padding: 30rpx 0;

			color: white;
			// font-weight: 600;
			font-size: 36rpx;

			.header-icon {
				// color: #403039;
				font-size: 26rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				color: white;

				image {
					width: 70rpx;
					margin-right: 10rpx;
					// border-radius: 50%;
				}
			}

			.header-select {
				display: flex;
				flex-direction: row;
				align-items: center;

				.header-select-icon {
					width: 53rpx;
					border-radius: 50%;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.header-select-select {
					width: 19rpx;
					height: 12rpx;
					margin-left: 9rpx;
				}
			}
		}
	}

	.image-width1 {
		// background:url(../../static/img/banner/index_top.png) no-repeat center center / 100%;
	}

	.popup-container {
		border-radius: 20rpx;
		padding: 30rpx 25rpx 55rpx;
		width: calc(100vw - 184rpx);

		.df(center, flex-start);
		flex-direction: column;

		.popup-tit {
			margin-bottom: 36rpx;
			text-align: center;
			font-size: @bodySize;
			color: @bodyColor;
			font-weight: bold;
		}

		.popup-content {
			color: #666;
			font-size: 24rpx;
			line-height: 1.41;
		}

		.popup-close-btn {
			margin-top: 126rpx;
			border-radius: 50rpx;
			padding: 30rpx 80rpx;
			background-color: #fd7e1f;
			color: #fff;
			font-size: 26rpx;
		}
	}
</style>