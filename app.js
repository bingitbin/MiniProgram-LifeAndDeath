const AV = require('./utils/av-live-query-weapp-min');
AV.init({
  appId: 's1pJniAIT9Dqjb6fDL3vdcil-gzGzoHsz',
  appKey: 'y7nzQ7NXIXmXR0NntkFzyGvU'
});
App({
  onLaunch: function () {
    AV.User.loginWithWeapp().then(user => {
      let userInfo = user.toJSON();
      if (userInfo.nickName)
      {
        this.globalData.user = userInfo;
        wx.redirectTo({
          url: '/pages/diary-list/diary-list'
        })
        return;
      }
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo
                  wx.redirectTo({
                    url: '/pages/basic-info/basic-info'
                  })
                }
              })
              return;
          }
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback()
          }
        }
      })
    }).catch(console.error);
  },
  globalData: {
    userInfo: null
  }
})