<template>
	<view class="master_wrap" v-show="show" hover-stop-propagation>
		<block v-if="keyboardtype == 'number' || keyboardtype == 'digit' || keyboardtype == 'idcard'">
			<view class="down_wrap">
				<image src="../../static/icon_down.png" @tap.stop="handleCloseKeyboard(false)"></image>
			</view>
			<view class="kerboard_number">
				<view @tap.stop="handleNumberKeyboardClick(item)" :hover-stay-time="100"
					:class="item== '-1' ? keyboardtype == 'number' ?  'number_empty' :'number_item' : item=='-2' ? 'number_delete' : 'number_item' "
					:hover-class="item== '-1' ?  keyboardtype == 'number' ?  'number_empty_active' : 'number_item_active' : item=='-2' ? 'number_delete_active' : 'number_item_active'"
					v-for="(item,index) in  randomNumberArr" :key="index">
					<block v-if="item == '-1'">
						<view v-if="keyboardtype == 'digit'">
							·
						</view>
						<view v-else-if=" keyboardtype ==  'idcard'">
							X
						</view>
					</block>
					<block v-else-if="item == '-2'">
						<image class="delete_img" src="../../static/icon_delete.png"></image>
					</block>
					<block v-else>
						{{item}}
					</block>
				</view>
			</view>
		</block>
		<block v-else-if="keyboardtype == 'car'">
			<view class="keyboard_car">
				<image @tap.stop="handleCloseKeyboard(false)" class="car_down" src="../../static/icon_down.png"></image>
				<view class="tab_wrap">
					<view @tap.stop="handleCarTabItemClick(index)"
						:class=" carType === index ?'tab_item_active' : 'tab_item'" hover-class="tab_item_active"
						v-for="(item,index) in carTabArr" :key="index">
						{{item}}
					</view>
				</view>
				<view class="car_content">
					<block v-if="carType === 0">
						<view class="car_province">
							<view @tap.stop="handleCarKerboardClick(item)"
								:class="computedDefaultValueLength ===0 ?  'province_item' :'province_item_disable'"
								:hover-class="computedDefaultValueLength ===0 ? 'province_item_active' : 'none'"
								:hover-stay-time="100" v-for="(item,index) in sliceProvinceArr" :key="index">
								{{item}}
							</view>
						</view>
						<view class="car_province_1">
							<view @tap.stop="handleCarKerboardClick(item)"
								:class=" (formatCarProvinceFirst(item) === -1 && computedDefaultValueLength ===0 )  ? 'province_item1' :
								 ((newCar && computedDefaultValueLength ===7 && formatCarProvinceFirst(item) !== -1) || 
								 (!newCar && computedDefaultValueLength ===6 && formatCarProvinceFirst(item) !== -1) ) ? 'province_item1' :  'province_item_disable'"
								:hover-class=" (formatCarProvinceFirst(item) === -1 && computedDefaultValueLength ===0) ? 'province_item_active' : 'none'"
								:hover-stay-time="100" :style="{'margin-left' : computeItemSpace + '%'}"
								v-for="(item,index) in sliceSecondProvinceArr" :key="index">
								{{item}}
							</view>
						</view>
					</block>
					<block v-else="carType === 1">
						<view class="car_latter">
							<view @tap.stop="handleCarKerboardClick(item)"
								:class=" (computedDefaultValueLength ===1 && formatCarProvinceSecond(item) >-1 || computedDefaultValueLength ===0) ? 'province_item_disable' : 'latter_item'"
								:hover-class=" (computedDefaultValueLength ===1 && formatCarProvinceSecond(item) >-1 || computedDefaultValueLength ===0) ? 'none' : 'province_item_active'"
								:hover-stay-time="100" v-for="(item,index) in sliceLatterArr" :key="index">
								<text>{{item}}</text>
							</view>
						</view>
						<view class="car_province_1">
							<view @tap.stop="handleCarKerboardClick(item)"
								:class=" (computedDefaultValueLength ===1 && formatCarProvinceSecond(item) >-1 || computedDefaultValueLength ===0)  ? 'province_item_disable' : 'province_item1'"
								:hover-class=" (computedDefaultValueLength ===1 && formatCarProvinceSecond(item) >-1 || computedDefaultValueLength ===0) ? 'none' : 'province_item_active'"
								:hover-stay-time="100" :style="{'margin-left' : computeItemSpace + '%'}"
								v-for="(item,index) in sliceSecondLatterArr" :key="index">
								{{item}}
							</view>
						</view>
					</block>
					<view @tap.stop="handleCarKerboardDeleteClick" class="car_delete" hover-class="car_delete_active"
						:hover-stay-time="100"
						:style="{'top':computeDeleteTop + 'rpx','right' :computeItemSpace + '%' }">
						<image class="delete_img" src="../../static/icon_delete.png"></image>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: "master-keyboard",
		props: {
			keyboardtype: {
				type: String,
				default: 'number' // number=数字键盘 digit=带小数点的数字键盘  idcard=身份证号键盘  car=车牌号键盘
			},
			defaultValue: {
				type: String,
				default: ''
			},
			newCar: {
				type: Boolean,
				default: false
			},
			randomNumber: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				numberArr: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
				carProvinceArr: ['京', '津', '渝', '沪', '冀', '晋', '辽', '吉', '黑', '苏', '浙', '皖', '闽', '赣', '鲁', '豫',
					'鳄', '湘', '粤', '琼', '川', '贵', '云', '陕', '甘', '青', '蒙', '桂', '宁', '新', '藏', '使',
					'领', '警', '学', '港', '澳'
				],
				carLatterArr: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
					'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R',
					'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
				],
				carTabArr: ['省份', '字母'],
				carType: 0,
				show: false,
			};
		},
		computed: {
			sliceProvinceArr: function() {
				return this.carProvinceArr.slice(0, 30)
			},
			sliceSecondProvinceArr: function() {
				return this.carProvinceArr.slice(30, this.carProvinceArr.length)
			},
			sliceLatterArr: function() {
				return this.carLatterArr.slice(0, 30)
			},
			sliceSecondLatterArr: function() {
				return this.carLatterArr.slice(30, this.carLatterArr.length)
			},
			computeDeleteTop: function() {
				return 80 * 3 + 10 * 3
			},
			computeItemSpace: function() {
				return (1 - 0.095 * 10) / 11 * 100
			},
			computedDefaultValueLength: function() {
				return this.$props.defaultValue.length
			},
			randomNumberArr: function() {
				if(this.$props.randomNumber){
					this.numberArr.sort(function() {
						return 0.5 - Math.random()
					})
				}
				const size = this.numberArr.length
				this.numberArr.splice(size - 1, 0, "-1")
				this.numberArr.push("-2")
				return this.numberArr
			}
		},
		watch: {
			show: function(value) {

			}
		},
		onLoad() {},
		methods: {
			formatCarProvinceFirst(value) {
				const list = ['使', '领', '警', '学', '港', '澳', ]
				return list.indexOf(value)
			},
			formatCarProvinceSecond(value) {
				const list = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
				return list.indexOf(value)
			},
			handleCloseKeyboard() {
				this.open(false)
			},
			open(value) {
				this.show = value
			},
			//车牌tab点击事件
			handleCarTabItemClick(index) {
				this.carType = index
			},
			//车牌键盘点击事件
			handleCarKerboardClick(e) {
				const keyValue = e
				let value = this.$props.defaultValue
				if (/^[\u4e00-\u9fa5]*$/.test(value) && value.length >= 2) {
					value = ''
				}
				var pattern = new RegExp("[\u4E00-\u9FA5]+");
				var pattern2 = new RegExp("[A-Za-z]+");
				var pattern3 = new RegExp("[0-9]+");

				if (value.length == 0) {
					if (!pattern.test(keyValue) || this.formatCarProvinceFirst(keyValue) !== -1) {
						return
					}
					this.carType = 1
				} else if (value.length == 1) {
					if (!pattern2.test(keyValue)) {
						return
					}
				} else {
					if (value.length === (this.$props.newCar ? 7 : 6) && pattern.test(keyValue) && this
						.formatCarProvinceFirst(keyValue) == -1) {
						return
					}
					if (pattern.test(keyValue) && value.length !== (this.$props.newCar ? 7 : 6)) {
						return
					}
				}

				if (value.length < 7 && !this.$props.newCar) {
					this.$emit('keyboardClick', {
						value: value + keyValue
					})
				}
				if (value.length < 8 && this.$props.newCar) {
					this.$emit('keyboardClick', {
						value: value + keyValue
					})
				}
			},
			//车牌键盘删除事件
			handleCarKerboardDeleteClick() {
				let deleteValue = this.$props.defaultValue
				if (deleteValue == '' || (/^[\u4e00-\u9fa5]*$/.test(deleteValue) && deleteValue.length !== 1)) {
					return
				}
				if (deleteValue.length > 0) {
					let count = deleteValue.length
					this.$emit('keyboardClick', {
						value: deleteValue.substr(0, count - 1)
					})
				}
			},
			//数字键盘点击事件
			handleNumberKeyboardClick(e) {
				const keyValue = e
				if (this.$props.keyboardtype == 'number' || this.$props.keyboardtype == 'digit' || this.$props
					.keyboardtype == 'idcard') {
					switch (keyValue) {
						case '-1':
							if (this.$props.keyboardtype == 'number' || this.$props.defaultValue == '') {
								return
							}
							let value = this.$props.defaultValue
							if (/^[\u4e00-\u9fa5]*$/.test(value) || value.indexOf('.') > -1 || value.indexOf('X') > -1) {
								return
							}
							if (this.$props.keyboardtype == 'idcard') {
								if (value.length === 17) {
									this.$emit('keyboardClick', {
										value: value + 'X'
									})
								}
							}
							if (this.$props.keyboardtype == 'digit') {
								this.$emit('keyboardClick', {
									value: value + '.'
								})
							}
							break
						case '-2':
							let deleteValue = this.$props.defaultValue
							if (deleteValue == '' || /^[\u4e00-\u9fa5]*$/.test(deleteValue)) {
								return
							}
							if (deleteValue.length > 0) {
								let count = deleteValue.length
								this.$emit('keyboardClick', {
									value: deleteValue.substr(0, count - 1)
								})
							}
							break
						default:
							let initValue = this.$props.defaultValue
							if (/^[\u4e00-\u9fa5]*$/.test(initValue)) {
								initValue = ''
							}
							if (this.$props.keyboardtype == 'idcard') {
								if (initValue.length < 18) {
									this.$emit('keyboardClick', {
										value: initValue + keyValue
									})
								}
								return
							}
							this.$emit('keyboardClick', {
								value: initValue + keyValue
							})
							break
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import './master-keyboard.scss';
</style>
