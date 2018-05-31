// pages/award/award.js
var util = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {    
    isHideLoadMore: true,
    tab1: true,
    tab2: false,
    loadMoreCount: 1,
    everydayAward: [],
    hadAward: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var that = this;  
    wx.request({
      url: getApp().globalData.path + "agentAwardList/",
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        currentPage: 1,
        status: 0,
        thirdSession: wx.getStorageSync('thirdSession')
      },
      success: function (res) {
        if (res.data.code == 0) {       
          that.setData({
            everydayAward: res.data.data
          })
        }
      }
    });
    wx.request({
      url: getApp().globalData.path + "agentAwardList/",
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        currentPage: 1,
        status: 2,
        thirdSession: wx.getStorageSync('thirdSession')
      },
      success: function (res) {
        if (res.data.code == 0) {        
          that.setData({
            hadAward: res.data.data
          })
        }
      }
    })
  }, 
  selectTab1: function () {
    this.setData({
      tab1: true,
      tab2: false
    })
  },
  selectTab2: function () {
    this.setData({
      tab1: false,
      tab2: true
    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { 
    var that = this;
    if (this.data.tab1) {
      if (this.data.loadMoreCount > 6) {
        wx.showModal({
          title: '提示',
          content: '我也是有底线的'
        })
        return;
      };
      var addData = [];
      this.setData({
        isHideLoadMore: false
      });
      wx.request({
        url: getApp().globalData.path + "agentAwardList/",
        method: "GET",
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          currentPage: this.data.loadMoreCount,
          status: 2,
          thirdSession: wx.getStorageSync('thirdSession')
        },
        success: function (res) {
          that.setData({
            loadMoreCount: that.data.loadMoreCount + 1
          });  
          if (res.data.code == 0) {
            addData = res.data.data;
          }
        }
      });

    
      setTimeout(() => {
        this.setData({
          isHideLoadMore: true,
          everydayAward: this.data.everydayAward.concat(addData)
        })
      }, 1000)
    }
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '金融街在线理财师',
      path: "/pages/login/login",
      imageUrl: "https://www.jrjzx.cn/p2pmini/statics/build/img/logo.png",
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 1200
        })
      },
      fail: function (res) {}
    }
  }
})