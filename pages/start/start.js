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
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  toPage () {
    wx.navigateTo({
      url: '../login/login',
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