// componets/w-tab-control/w-tab-contol.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles:{
      type: Array,
      titles: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e){
      this.setData({
        currentIndex: e.currentTarget.dataset.selectindex
      })
      // 2.发出时间
      const data = { index: this.data.currentIndex }
      this.triggerEvent("tabclick", data, {})
    }
  },
})
