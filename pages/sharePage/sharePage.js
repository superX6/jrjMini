// pages/sharePage/sharePage.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    supportTimes: '',
    curRank: 1 ,
    supportType: 1,
    curOpenid: '' ,
    fromOpenid: '',
    fromHeadimgurl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    //判断是自己调整的页面还是别人分享的页面
    if (true) {
      this.setData({
        curOpenid: wx.getStorageSync('token')
      })
    } else {

    }
    this.setData({
      avatarUrl: userInfo.avatarUrl
    })
    // 获取我的球星数据情况
      wx.request({
        url: getApp().globalData.path + "worldCup/myStar",
        method: "POST",
        data: {
          openid: that.data.curOpenid
        },
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (res) {         
          if (res.data.code === 0) {            
            that.setData({
              supportTimes: parseInt(res.data.data.supportTimes) 
            })
          }
        }
      })
      // 获取我的球星排行榜信息
      wx.request({
        url: getApp().globalData.path + "worldCup/myStarRankingList",
        method: "POST",
        data: {
          openid: that.data.curOpenid
        },
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (res) {
          console.log(res)
          if (res.data.code === 0) {
           
          }
        }
      })

      // 获取好友助力情况
      wx.request({
        url: getApp().globalData.path + "worldCup/mySupportRecord",
        method: "POST",
        data: {
          openid: wx.getStorageSync('token')
        },
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (res) {
         
          if (res.data.code === 0) {
            that.setData({
              
            })
          }
        }
      })
 
  },
  callUp: function(){
    var that = this;
   
  //助力 supportType 1:本人助力2:帮好友助力
    wx.request({
      url: getApp().globalData.path + "worldCup/support",
      method: "POST",   
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        openid: that.data.curOpenid,
        supportType: this.data.supportType,
        fromOpenid: this.data.phone,
        fromHeadimgurl: this.data.fromHeadimgurl       
      },
      success: function (res) {
      
        if (res.data.code === 0) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
          that.setData({
            supportTimes: that.data.supportTimes + 1
          })
        }
        if (res.data.code === -1) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000,
            image: '../../images/error.png'
          })
          return;
        }
      }
    })  
  },
  // 要求好友助力按钮事件
  share: function () {
    console.log(1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops)
    }
    return {
      title: 'xx小程序',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  }
})