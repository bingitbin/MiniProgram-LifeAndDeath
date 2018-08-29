const AV = require('./utils/av-live-query-weapp-min');

AV.init({
  appId: 's1pJniAIT9Dqjb6fDL3vdcil-gzGzoHsz',
  appKey: 'y7nzQ7NXIXmXR0NntkFzyGvU'
});

App({
  onLaunch: function () {
    AV.User.loginWithWeapp().then(user => {
    }).catch(console.error);

    // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res);
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })

    // wx.getUserInfo({
    //   success: res => {
    //     // 可以将 res 发送给后台解码出 unionId
    //     console.log(res);
    //     this.globalData.userInfo = res.userInfo

    //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //     // 所以此处加入 callback 以防止这种情况
    //     if (this.userInfoReadyCallback) {
    //       this.userInfoReadyCallback(res)
    //     }
    //   }
    // })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
         

          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res);
             // this.globalData.userInfo = res.userInfo
              this.getUserInfo(res.userInfo).then(user=>{
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res.userInfo)
                }
              });
            }
          })
        }
      }
    })
  },
  getUserInfo(wxUserInfo){
    return new Promise(r => r(wxUserInfo));
    return AV.User.loginWithWeapp().then(user => {
      if (!user.nickName)
      {
        let { nickName, avatarUrl } = wxUserInfo;
        user.set('nickName', nickName);
        user.set('avatarUrl', avatarUrl);
        user.save();
      }
      return this.globalData.user = user.toJSON();
   
    }).catch(console.error);
  },
  globalData: {
    userInfo: null
  }
})