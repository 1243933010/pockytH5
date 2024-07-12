## 简介

万能键盘是一款集**数字键盘、带小数点的数字键盘、身份证键盘、车牌号键盘**为一身的自定义键盘。

## 属性

属性|类型|必填|备注
-|-|-|-
keyboardtype|String| 否| `number`:数字键盘（默认），`digit`:带小数点数字键盘，`idcard`:身份证键盘，`car`:车牌键盘
defaultValue |String | 是|初始化键盘值，默认为'',每次回调重新赋值
newCar | Boolean |否| 是否为新能源车牌，`keyboardtype`为`car`生效，默认为`false`
randomNumber | Boolean | 否 | 是否开启安全键盘，默认为`false`，仅`keyboardtype`为 `number`、`digit`、`idcard`时生效

## 事件

事件名| 备注
-|-
@keyboardClick | 键盘输入回调，返回值event:{value:value}，键盘输入值：event.value

## 说明

可配合`input`使用，也可配合`text、view`等组件使用，请注意如果配合`input`使用，`input`请添加`:disabled="true"`属性，暂时还未找到`input`隐藏软键盘的方法，如果你有关于隐藏软键盘的方法，欢迎评论留言。

## 基本用法
    <input class="text_wrap" @click="handleShowKeyboard" :disabled="true" placeholder="请输入车牌号" :value="title"/>
	<master-keyboard ref="keyboard" keyboardtype="number" :randomNumber="true" :newCar="false" :defaultValue="title" @keyboardClick="handleClick"></master-keyboard>

    data:{
        return {
			title: ''
		}
    }
	components: {
		'master-keyboard': keyboard
	},
    methods: {
		handleShowKeyboard(){
			this.$refs.keyboard.open(true)//true 键盘显示 false 键盘隐藏
		},
		handleClick(e){
			this.title = e.value //键盘输入值
		}
	}

## 兼容性

微信、QQ小程序、Android、Edge实测没问题，IOS没有本子尚未测试。


## 其他

第一次写插件，不足之处，请多多原谅。有任何问题，欢迎评论指出。感谢你的关注和支持。


【蝴蝶壁纸】QQ小程序，每天分享免费壁纸！

![avatar](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c4651ffd-8264-432b-af24-d142b3731b81/b78c6983-d943-460d-845d-906e98df5740.png)

【缘来是星座】QQ小程序，每天1点、7点、17点更新十二星座运势，还可以查看你的他（她）和你是否配对奥！

![avatar](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c4651ffd-8264-432b-af24-d142b3731b81/27938734-819b-4784-8214-29e56c005c65.png)

