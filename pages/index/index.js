const AV = require('../../utils/av-live-query-weapp-min');

//获取应用实例
const app = getApp()

Page({
  data: {
    show:false
  },
  onLoad: function () {
      app.userInfoReadyCallback = user => {
        this.setData({
          show: true
        })
      }
  }
})
