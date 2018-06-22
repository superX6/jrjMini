
var app = getApp();
var util = require('../../utils/util.js');
Page({


  data: {

  },

  onLoad: function (options) {
    //授权页面判断入口  type=2 帮别人助力进入
    const tsupportType = util.getCurrentPageUrlOptions().type;
    if (tsupportType === '2') {
      
    }
  },

  bindGetUserInfo: function (e) {
  
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      wx.showToast({
        title: '无法登录',
        icon: 'fail',
        duration: 2000
      })
    }
    if (!e.detail.userInfo) {
      return;
    }   
    wx.setStorageSync('userInfo', e.detail.userInfo);
    //已经授权 微信登录
    this.login();
  },
  login: function () {
    let that = this;
    let worldCupToken = wx.getStorageSync('worldCupToken');  
    wx.login({
      success: function (res) {   
        console.log('222222222222222');
        console.log(`res.code=${res.code}`)   
        wx.request({
          url: getApp().globalData.path + 'worldCup/getOpenid',
          method: 'POST',
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          data: {
            code: res.code
          },
          success: function (res) { 
            if (res.data.code !== 0) {             
              wx.removeStorageSync('worldCupToken')
              wx.showModal({
                title: '提示',
                content: '无法登录，请重试',
                showCancel: false,
                img
              })
              return;
            }
            if (res.data.code === 0) {            
              wx.setStorageSync('worldCupToken', res.data.data.openid);                  
              // 回到原来的地方放
              wx.navigateBack();
              return;
            }          
          }
        })
      }
    })
  },
  registerUser: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            // 下面开始调用注册接口
            wx.request({
              url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/wxapp/register/complex',
              data: { code: code, encryptedData: encryptedData, iv: iv }, // 设置请求的 参数
              success: (res) => {
                wx.hideLoading();
                that.login();
              }
            })
          }
        })
      }
    })
  }
})