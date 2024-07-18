import requestObj from '@/utils/requestObj.js'
export let filesUrl = 'http://8.210.175.5:8001/';
export let url = 'http://8.210.175.5:8001'
export const $request = (requestName,params,headerType=0)=>{
	let reqObj = requestObj[requestName];
	let token = uni.getStorageSync('token');
	let language = uni.getLocale();
	console.log(language)
	let languageObj = {'en':'en','fr': "fr",'es': "es",'ara': "ara","zh-Hans":"zh_CN"}
	let shareInfo = {
		'invitation_code':'',
		'scene':'',
		'associated_id':'',
	}
	// if(params.invite_code&&params.type&&params.associated_id){
	// 	shareInfo.invitation_code = params.invite_code;
	// 	shareInfo.scene = params.type;
	// 	shareInfo.associated_id = params.id;
	// }
	let headerObj = [
		{
			"Content-Type":"application/json",
			"Authorization":token?`Bearer ${token}`:'',
			"token":token?`${token}`:'',
			"Accept":"application/json",
			"Accept-Language":languageObj[language],
			'Invitation-Code':shareInfo.invitation_code,
			'Scene':shareInfo.scene,
			'Associated-Id':shareInfo.associated_id
		},
		{
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization":token?`Bearer ${token}`:'',
			"token":token?`${token}`:'',
			"Accept":"application/json",
			"Accept-Language":languageObj[language],
			'Invitation-Code':shareInfo.invitation_code,
			'Scene':shareInfo.scene,
			'Associated-Id':shareInfo.associated_id
		}
	]
	
	let reqUrl = reqObj?.otherGet?`${url}${reqObj?.url}${params}`:`${url}${reqObj?.url}`
	let data = reqObj?.otherGet?{}:params;
	if(params.invite_code&&params.type&&params.associated_id){
		data = {id:params.id}
	}
	return new Promise((resolve,reject)=>{
		uni.request({
		    url: reqUrl, 
			method:requestObj[requestName]?.type,
		    data,
		    header: headerObj[headerType],
		    success: (res) => {
				if(res.data.code==401){
					uni.hideLoading()
					uni.clearStorageSync();
					uni.showToast({
						icon:'none',
						title:res.data.msg
					})
					setTimeout(()=>{
						uni.reLaunch({
							url:'/pages/login/login'
						})
					},1000)
					return
				}
		        resolve(res)
		    },
			fail: (err) => {
				reject(err)
			}
		});

	})
}