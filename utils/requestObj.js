let requestObj = {
	registrationAgreement: {
		name: "注册协议",
		url: '/api/registrationAgreement',
		type: 'POST'
	},
	getCode: {
		name: "发送邮箱验证码",
		url: '/api/public/getCode',
		type: 'POST'
	},
	register: {
		name: "注册",
		url: '/api/auth/register',
		type: 'POST'
	},
	findPassword: {
		name: "找回密码",
		url: '/api/auth/findPassword',
		type: 'POST'
	},
	userInfo: {
		name: "用户信息",
		url: '/api/user/info',
		type: 'GET'
	},
	login: {
		name: "登录接口",
		url: '/api/auth/login',
		type: 'POST'
	},
	goodsClass: {
		name: "商品class",
		url: '/api/goods/goodsClass',
		type: 'GET',
		otherGet:true
	},
	goodsList: {
		name: "商品class列表",
		url: '/api/goods/goodsList',
		type: 'GET',
		otherGet:true
	},
	goodsClassDetail: {
		name: "商品class",
		url: '/api/goods/detail',
		type: 'GET',
		otherGet:true
	},
}
export default requestObj;