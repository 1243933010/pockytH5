<template>
	<view class="empty-box">
		<view class="pic">
			<image src="../static/empty.svg" mode="widthFix"></image>
		</view>
		<view class="tit">{{ tit }}</view>
		<view class="desc" v-if="desc">{{ desc }}</view>
	</view>
</template>

<script>
export default {
	name: 'empty',
	data() {
		return {};
	},
	props: {
		tit: {
			type: String,
			require: true
		},
		desc: {
			type: String,
			require: false
		}
	}
};
</script>

<style lang="less">
@import '../static/less/variable.less';

.empty-box {
	.df(center, center);
	flex-direction: column;
	
	.pic {
		width: 380rpx;
	}
	
	.tit {
		font-weight: bold;
		font-size: 52rpx;
		line-height: 1.3;
		color: #117242;
	}
	
	.desc {
		color: #777;
		font-size: 40rpx;
		line-height: 1.3;
	}
}
</style>
