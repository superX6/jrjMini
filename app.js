//app.js
App({
  onLaunch: function () {
   //wx.clearStorageSync();
   // 获取用户信息
    wx.getSetting({
      success: res => { 
        if (res.authSetting['scope.userInfo'] && wx.getStorageSync('token')) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log('已授权')
          wx.getUserInfo({
            success: res => {             
              wx.navigateBack({})
            }
          })
        }else{ 
          console.log('授权登录')  
          // return; //调试断点       
          wx.navigateTo({
            url: '../authorize/authorize',
          })
        }
      }
    })
    
  },

  globalData: {
    userInfo: null,
    //  path: "https://www.jrjzx.cn/p2pmini/"
    path: "https://uat.jrjzx.cn/p2pmini/"
  }
})