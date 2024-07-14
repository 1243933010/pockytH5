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
	orderCreate: {
		name: "下单接口",
		url: '/api/order/create',
		type: 'POST'
	},
	orderCancal: {
		name: "取消订单",
		url: '/api/order/cancal',
		type: 'POST'
	},
	payInfo: {
		name: "获取订单支付信息",
		url: '/api/order/payInfo',
		type: 'GET',
		// otherGet:true
	},
	payInfo: {
		name: "支持的支付类型",
		url: '/api/order/payType',
		type: 'GET',
		// otherGet:true
	},
	orderList: {
		name: "订单列表",
		url: '/api/order/list',
		type: 'POST'
	},
	recharge: {
		name: "创建充值订单",
		url: '/api/pay/recharge',
		type: 'POST'
	},
	collectAdd: {
		name: "添加收藏",
		url: '/api/collect/add',
		type: 'POST'
	},
	collectList: {
		name: "收藏列表",
		url: '/api/collect/list',
		type: 'GET',
		// otherGet:true
	},
	collectRemove: {
		name: "移除收藏",
		url: '/api/collect/remove',
		type: 'POST'
	},
	homeHot: {
		name: "首页最热",
		url: '/api/home/hot',
		type: 'GET',
	},
	homeDiscount: {
		name: "首页打折扣",
		url: '/api/home/discount',
		type: 'GET',
	},
	homeMore: {
		name: "首页更多",
		url: '/api/home/more',
		type: 'GET',
	},
	homeClause: {
		name: "隐私条款",
		url: '/api/home/clause',
		type: 'GET',
	},
}
export default requestObj;