// pages/authorize/index.js
var app = getApp();
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
  bindGetUserInfo: function (e) {
    console.log(e)
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

    console.log(e)  
    wx.setStorageSync('userInfo', e.detail.userInfo);
    //已经授权 微信登录
    this.login();
  },
  login: function () {
    let that = this;
    let token = wx.getStorageSync('token');
    if (token) {  //存在token 直接登录
      wx.request({
        url: '', //后台接口登录地址
        data: {
          token: token
        },
        success: function (res) {
          if (res.data.code != 0) {
            wx.removeStorageSync('token')
            that.login();
          } else {
            // 回到原来的地方放
            // wx.navigateBack();
          
          }
        }
      })
      return;
    }
    wx.login({
      success: function (res) {      
        wx.request({
          url: getApp().globalData.path + 'worldCup/getOpenid',
          method: 'POST',
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          data: {
            code: res.code
          },
          success: function (res) { 
            if (res.data.code !== 0) {             
              wx.removeStorageSync('token')
              wx.showModal({
                title: '提示',
                content: '无法登录，请重试',
                showCancel: false
              })
              return;
            }
            if (res.data.code === 0) {
              console.log(5555555)
              wx.setStorageSync('token', res.data.data.openid);                  
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