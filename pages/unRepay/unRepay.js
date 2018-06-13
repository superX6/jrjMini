// pages/unRepay/unRepay.js
var util = require('../../utils/util.js');
Page({
  data: {    
    myUnRepay: [],
    isHideLoadMore: true,
    loadMoreCount: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    var that = this;  
    wx.request({
      url: getApp().globalData.path + "invest/holdingList/",
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        currentPage: 1,
        thirdSession: wx.getStorageSync('thirdSession')
      },
      success: function (res) {      
        if (res.data.code == 0) {
          that.setData({
            myUnRepay: res.data.data
          })
        }
      }
    });

  },
  toWorldCupPage: function (e) {
    wx.navigateTo({
      url: '../worldCup/worldCup',
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var thirdSession =  wx.getStorageSync('thirdSession'); 
    
    if (this.data.loadMoreCount > 6) {
      wx.showModal({
        title: '提示',
        content: '我也是有底线的'
      })
      return;
    };
    this.setData({
      isHideLoadMore: false
    });
    var addData = [];
    wx.request({
      url: getApp().globalData.path + "invest/holdingList/",  
      header: { "Content-Type": "application/x-www-form-urlencoded" },   
      method: "POST",
      data: {
        currentPage: this.data.loadMoreCount,
        thirdSession: thirdSession    
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
        myUnRepay: this.data.myUnRepay.concat(addData)
      })
    }, 1000)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
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
      fail: function (res) { }
    }
  }
})