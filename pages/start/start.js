// pages/start/start.js
var app = getApp();
var util = require('../../utils/util.js');
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

    const type = util.getCurrentPageUrlOptions().type;  

    if(type === '3') {
      wx.navigateTo({
        url: '../worldCup/worldCup',
      })
    } else{
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo'] && wx.getStorageSync('worldCupToken')) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            console.log('已授权')
            wx.getUserInfo({
              success: res => {
                wx.navigateBack({})
              }
            })
          } else {
            // console.log('授权登录')
            // return; //调试断点       
            wx.navigateTo({
              url: '../authorize/authorize'
            })
          }
        }
      })
    }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  toPage () {    
    if (wx.getStorageSync('worldCupToken')){
      wx.navigateTo({
        url: '../worldCup/worldCup',
      })
    } else{
      wx.navigateTo({
        url: '../authorize/authorize',
      })
    }   
  }
})