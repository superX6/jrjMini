// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: '',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  toPage () {
    wx.navigateTo({
      url: '../worldCup/worldCup',
    })
  },
  checkSessionAndGetData: function () {
    var thirdSession = wx.getStorageSync('thirdSession');
    if (thirdSession) {
      wx.request({
        url: getApp().globalData.path + '/checkThirdSession',
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          thirdSession: thirdSession
        },
        success: function (res) {
          var ERROK = res.data.code;
          if (ERROK == 0) {
            wx.reLaunch({
              url: '../award/award'
            })
          } else if (ERROK == -2) {
            wx.showModal({
              title: '提示',
              content: '请重新登录',
            });
          }
        }
      })
    } else {
      console.log('未授权');
      wx.navigateTo({
        url: '../authorize/authorize',
      })
    }
  }
})