import {
  getBanner,
  getProduct
} from '../../service/network.js'

Page({
  data: {
    titles: ["流行", "新款", "精选"],
    banners: [],
    recommend: [],
    sTabIndex: 0,
    currentType:'popProducts',
    goods:{
      popProducts: {
        pageIndex: 1,
        list: []
      },
      newProducts: {
        pageIndex: 1,
        list: []
      },
      sellProducts: {
        pageIndex: 1,
        list: []
      }
    },
    topPosition: 0,
    tabControlTop: 0,
    showBackTop: false,
    showTabControl: false
  },
  onLoad: function() {
    this._getBannerData();
    this._getProduct(0);
  },
  scrollPosition(e){
	const position = e.detail.scrollTop;
	this.setData({
		showBackTop:position>1000
	})
  },
  _getBannerData() {
    getBanner().then(res => {
      const tempbanners = res.data.banner.list.map(item => {
        return item.image
      })

      this.setData({
        banners: tempbanners,
        recommend: res.data.recommend.list
      })
    })
  },
  tabclick(event) {
    console.log(event);
    var selectTabIndex = event.detail.index;
    this._getProduct(selectTabIndex,false);
  },
  loadMore(){
    console.log('loadMore' + this.data.sTabIndex);
    this._getProduct(this.data.sTabIndex,true);
  },
  _getProduct(tab_selectIndex,loadMore){
    var productType = ["pop", "new", "sell"][tab_selectIndex];
    console.log()
    const goodsKey = productType + 'Products';
    console.log('goodsKey'+goodsKey);
    var page = this.data.goods[goodsKey].pageIndex;
    getProduct(productType, page).then(res => {
      const goods = this.data.goods;
      if(loadMore){
        goods[goodsKey].list.push(...res.data.list);
        goods[goodsKey].pageIndex = page + 1;
      }else{
        goods[goodsKey].list = res.data.list;
        goods[goodsKey].pageIndex = 1;
      }
      this.setData({
        currentType: goodsKey,
        goods: goods,
        sTabIndex: tab_selectIndex
      })
    })
  }
})