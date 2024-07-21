<template>
	<view>
		<view class="page-home">
			<view class="page-header">
				<view class="back" @click="back">
					<image src="../../static/back.svg" mode="widthFix"></image>
					<text>{{$t("app.name17")}}</text>
				</view>
				<view class="like" @click="likeClick">
					<image v-if="goodsInfo.collect==0" src="../../static/like.svg" mode="widthFix"></image>
					<image v-if="goodsInfo.collect==1" src="../../static/like_check.svg" mode="widthFix"></image>
				</view>
			</view>
			<view class="goods">
				<view class="img">
					<image :src="imgUlr+goodsInfo.goods_img" mode="widthFix"></image>
				</view>
				<view class="title">
					<text style="font-size: 34rpx;">{{goodsInfo.goods_name}}</text>
				</view>

				<view class="price"
					style="color:#41AF74;font-weight: 600;font-size: 35rpx;margin: 20rpx 0; display: flex; flex-direction: row; line-height: 42rpx; justify-content: space-between; width: 600rpx;">
					<view style="font-size: 26rpx;width: 200rpx;text-align: right;"></view>
					<view style="font-size: 42rpx; width: 200rpx; text-align: center;">${{goodsPrice}}</view>
					<view
						style="padding-left: 20rpx;color: #a8a8a8; font-size: 26rpx; width: 200rpx;text-decoration: line-through;">
						${{originPrice}}</view>
				</view>

				<view class="sku">
					<view class="goods_title">
						{{$t("app.goods_type")}}
					</view>
					<view class="sku-option">
						<view v-for="(item , index) in goodsSku.coin" class="sku-item"
							:class="index == currencyIndex ? 'active' : ''" @click="change_currency(index)">
							{{item.coin}}
						</view>
					</view>
				</view>

				<view class="sku">
					<view class="goods_title">
						{{$t("app.goods_price")}}
					</view>
					<view class="sku-option">
						<view v-for="(item , index) in goodsSku.sku" class="sku-name"
							:class="index == valueIndex ? 'active' : ''" @click="changeValue(index)">
							{{item.sku_name}}
						</view>
						<view class="sku-name" v-if="goodsSku.sku == false">
							-
						</view>
					</view>

				</view>
			</view>
			<view class="other">
				<view class="xieyi">
					<checkbox-group @change="change">
						<label>
							<checkbox style="transform:scale(0.8)" value="cb" checked="true" />
						</label>
					</checkbox-group>
					<view class="text">
						<text>{{$t("app.name19")}}
							<text class="text1"
								@click="goUrl('/pages/index/xieyi?type=1')">《{{$t("app.name20")}}》</text>
							{{$t("app.name21")}}
							<text class="text1"
								@click="goUrl('/pages/index/xieyi?type=2')">《{{$t("app.name22")}}》</text>
						</text>
					</view>
				</view>
				<view class="warn">
					<image src="../../static/warning.svg" mode=""></image>
					<text>{{$t("app.name23")}}</text>
				</view>
			</view>

			<view class="rich">
				<view class="goods_title">
					Content
				</view>
				<view class="text2">
					<u-parse :content="goodsInfo.goods_detail" @navigate="navigate"></u-parse>
				</view>
			</view>
		</view>
		<view @click="payConfirm" class="pay-btn" :class="checkBoxValue.length>0?'disabled':''">
			<text>{{$t("app.name26")}}</text>
		</view>
		<master-keyboard ref="keyboard" keyboardtype="digit" :newCar="false" :defaultValue="title"
			@keyboardClick="handleClick"></master-keyboard>
	</view>
</template>

<script>
	// import customHeader from "@/components/customHeader/customHeader.vue";
	import {
		$request,
		filesUrl
	} from '@/utils/request.js'
	export default {
		// components: {
		// 	customHeader

		// },
		data() {
			return {
				goodsInfo: {},
				price: '',
				title: '',
				checkBoxValue: ['cb'],
				homeClauseInfo: {},
				goodsSku: [],
				goodsPrice: '',
				originPrice: '',
				currencyIndex: 0,
				valueIndex: 0
			};
		},
		computed: {
			imgUlr() {
				return filesUrl
			},
			pleaderPrice() {
				if (this.price) {
					return this.price
				} else {
					return `$${this.goodsInfo.min*1}-${this.goodsInfo.max*1}`
				}
			}
		},
		onLoad(e) {
			this.goodsInfo.id = e.id
			this.getDetail(e.id)
			this.getSku(e.id)
		},
		methods: {
			navigate(e) {
				console.log(e);
				location.href = e;
			},
			async likeClick() {
				console.log(this.goodsInfo)
				if (this.goodsInfo.collect == 0) {
					let res = await $request('collectAdd', {
						goods_id: this.goodsInfo.id
					})
					// console.log(res)
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					})
					if (res.data.code == 200) {
						// this.goodsInfo = res.data.data;
						this.getDetail(this.goodsInfo.id)

						return
					}
				} else if (this.goodsInfo.collect == 1) {
					let res = await $request('collectRemove', {
						goods_id: this.goodsInfo.id
					})
					// console.log(res)
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					})
					if (res.data.code == 200) {
						// this.goodsInfo = res.data.data;
						this.getDetail(this.goodsInfo.id)

						return
					}
				}
			},
			back() {
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
			change(e) {
				this.checkBoxValue = e.detail.value;
			},
			open() {
				this.$refs.keyboard.open(true) //true 键盘显示 false 键盘隐藏
			},
			handleClick(e) {
				console.log(e)
				this.title = e.value;
				this.price = e.value //键盘输入值
			},
			async getDetail(id) {
				let res = await $request('goodsClassDetail', `/${id}`)
				// console.log(res)
				if (res.data.code == 200) {
					this.goodsInfo = res.data.data;
				}
			},
			goUrl(url) {
				uni.navigateTo({
					url
				})
			},
			async getSku(id, coin = '') {
				let data = {
					goods_id: id
				}
				if (coin) {
					data.coin = coin
				}
				let res = await $request('goodsSku', data);
				this.goodsSku = res.data.data
				this.goodsPrice = this.goodsSku.sku[this.valueIndex]?.price 
				this.originPrice = this.goodsSku.sku[this.valueIndex]?.original_price
				if(!this.goodsPrice){
					this.goodsPrice = 0
					this.originPrice = 0
				}
			},
			async payConfirm() {
				if (this.checkBoxValue.length == 0) {
					return false
				}
				let info = {
					goods_sku_id: this.goodsSku.sku[this.valueIndex]?.id,
					goods_id: this.goodsInfo.id,
					total_price: this.goodsPrice
				};
				if(!info.goods_sku_id){
					return false;
				}
				uni.navigateTo({
					url: `./pay?total_price=${info.total_price}&goods_id=${info.goods_id}&goods_sku_id=${info.goods_sku_id}`
				})
			},
			change_currency(index) {
				this.currencyIndex = index
				this.getSku(this.goodsInfo.id, this.goodsSku.coin[index].coin)
			},
			changeValue(index) {
				this.valueIndex = index
				this.goodsPrice = this.goodsSku.sku[index].price
				this.originPrice = this.goodsSku.sku[index].original_price
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/ .uni-checkbox-input-checked {
		background-color: rgb(27, 171, 162);
		border: none;
	}

	/deep/ .uni-checkbox-input {
		box-sizing: border-box;
		border-color: #969799 !important;
	}

	/deep/ .uni-checkbox-input:hover {
		border-color: #969799 !important;
	}

	/deep/ .uni-checkbox-input.uni-checkbox-input-checked:before {
		color: white;
	}

	.page-home {
		// margin: 0 auto;
		margin-top: -15rpx;
		background-color: white;
		border-top-right-radius: 15rpx;
		border-top-left-radius: 15rpx;

		.page-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 40rpx;
			width: 95%;
			margin: 0 auto;

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

		.goods {
			width: 95%;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-sizing: border-box;
			padding-top: 40rpx;

			.img {
				width: 400rpx;
				margin-bottom: 20rpx;

				image {
					border-radius: 15rpx;
					width: 100%;
				}
			}

			.title {
				color: #555555;
				font-size: 36rpx;
				font-weight: 600;
			}

			.form {
				width: 95%;
				display: flex;
				flex-direction: column;
				margin-bottom: 60rpx;

				.form-title {
					font-size: 28rpx;
					margin-bottom: 15rpx;
				}

				.input {
					width: 100%;
					font-size: 26rpx;
					background-color: #F8F8F8;
					color: #969799;
					box-sizing: border-box;
					padding: 15rpx 20rpx;
					border-radius: 20rpx;
				}
			}

			.sku {
				width: 100%;
				margin: 20rpx 10rpx;

				.sku-option {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					margin-left: 60rpx;

					.sku-item {
						text-align: center;
						width: 90rpx;
						margin: 10rpx 0rpx;
						margin-right: 16rpx;
						padding: 5rpx 0rpx;
						border-radius: 13rpx;
						color: #adadad;
						border: 1px solid #adadad;
					}

					.sku-name {
						text-align: center;
						margin: 10rpx 0rpx;
						margin-right: 16rpx;
						padding: 5rpx 15rpx;
						border-radius: 13rpx;
						color: #adadad;
						border: 1px solid #adadad;
					}

					.active {
						color: #41AF74;
						border: 1px solid #41AF74;
					}

				}

				.goods_title {
					margin-left: 20rpx;
					padding: 10rpx;
					width: 100rpx;
					font-weight: bold;
					color: #41AF74;

				}

				.goods_title::before {
					/* Font Awesome图标的Unicode字符 */
					content: '1';
					width: 4rpx;
					height: 20rpx;
					margin-right: 15rpx;
					background-color: #41AF74;
					border-radius: 5rpx;
				}
			}

		}

		.other {
			width: 95%;
			margin: 0 auto;
			border-top: 1px solid #DCDFE6;
			border-bottom: 1px solid #DCDFE6;
			box-sizing: border-box;
			padding: 40rpx 0;

			// display: flex;
			// flex-direction: row;
			// align-items: center;
			uni-checkbox-group {
				display: flex;
				align-items: center;
				justify-content: center;
				padding-top: 5rpx;
				font-size: 26rpx;
			}

			.xieyi {
				display: flex;
				flex-direction: row;
				align-items: center;
				color: #777777;
				font-size: 26rpx;
				margin-bottom: 30rpx;

				.text1 {
					color: #41AF74;
				}
			}

			.warn {
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 26rpx;
				font-weight: 600;
				color: #555555;

				image {
					width: 35rpx;
					height: 35rpx;
					margin-right: 10rpx;
				}
			}
		}

		.rich {
			width: 95%;
			margin: 0 auto;
			padding-bottom: 200rpx;

			.title {
				// display: flex;
				// flex-direction: row;
				// align-items: center;
				// justify-content: center;
				// color: #777777;
				// // font-weight: 600;
				// font-size: 42rpx;

				image {
					width: 180rpx;
				}
			}

			.goods_title {
				margin-left: 20rpx;
				padding-top: 20rpx;
				font-weight: bold;
				color: #41AF74;
			}

			.goods_title::before {
				/* Font Awesome图标的Unicode字符 */
				content: '1';
				width: 4rpx;
				height: 20rpx;
				margin-right: 15rpx;
				background-color: #41AF74;
				border-radius: 5rpx;
			}

			.text1 {
				display: inline-block;
				// flex-direction: column;
				width: 100%;
				text-align: left;
				padding-left: 15rpx;
				margin-bottom: 15rpx;

				.title {
					font-size: 30rpx;
					display: inline-block;
					width: 100%;
					text-align: left;
					color: #555;
					font-weight: 600;
				}
			}

			.default {
				border-left: 8rpx solid #41AF74;
			}

			.text2 {
				color: #777777;
				font-size: 27rpx;
			}
		}

		.rich1 {
			padding-bottom: 180rpx;
		}
	}

	.pay-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #e0e0e0;
		color: #9b9b9b;
		font-size: 36rpx;
		font-weight: 600;
		box-sizing: border-box;
		padding: 26rpx 0;
	}

	.disabled {
		background-color: #41AF74;
		color: white;
	}
</style>