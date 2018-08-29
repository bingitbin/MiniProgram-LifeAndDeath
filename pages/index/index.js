const AV = require('../../utils/av-live-query-weapp-min');

//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sexList: [{ name: '男', value: 0, checked: true }, { name: '女', value: 1, checked: false }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = user => {
        this.setData({
          userInfo:user,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          // app.globalData.userInfo = res.userInfo
          // this.setData({
          //   userInfo: res.userInfo,
          //   hasUserInfo: true
          // })
          app.getUserInfo(res.userInfo).then(user => {
            this.setData({
              userInfo: user,
              hasUserInfo: true
            })
          });
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.getUserInfo(e.detail.userInfo).then(_=>{

      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    });
    // AV.User.loginWithWeapp().then(user => {
    //   let { nickName, avatarUrl} = e.detail.userInfo;
    //   user.set('username', nickName);
    //   user.set('avatarUrl', avatarUrl);
    //   user.save();
    //   app.globalData.user = user.toJSON();
    //   this.setData({
    //     userInfo: e.detail.userInfo,
    //     hasUserInfo: true
    //   })
    //   console.log(app.globalData.user);
    // }).catch(console.error);

    // console.log(e)
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
  },
  save(){
    const user = AV.User.current();
    user.set(app.globalData.user).save().then(user => {
      // 成功，此时可在控制台中看到更新后的用户信息
      this.globalData.user = user.toJSON();
    }).catch(console.error);;
  },
  sexChange(e){
    

  }
})
