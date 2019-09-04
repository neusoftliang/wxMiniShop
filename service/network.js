import {
  baseUrl,
  timeout
} from './config.js'

function request(options) {
  wx.showLoading({
    title: '正在加载中...',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + options.url,
      timeout: timeout,
      data: options.data,
      success: res => {
        resolve(res.data)
      },
      fail: reject,
      complete: res => {
        wx.hideLoading()
      }
    })
  })
}
// banner图数据请求
export function getBanner() {
  return request({
    url: '/home/multidata'
  })
}
//商品列表
export function getProduct(type, page) {
  return request({
      url: '/home/data',
      data: {
        type,
        page
      }
    }
  )
}
///商品详情
export function getProductDetail(iid) {
	return request({
		url:'/detail',
		data:{
			iid
		}
	})
}
///商品推荐
export function getRecommends() {
  return request({
    url: '/recommend'
  })
}