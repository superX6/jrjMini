// pages/rankPage/rankPage.js
var app = getApp();
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    starName: '',
    starId: 1,
    rankList: [],
    fromOpenid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {    
  
    this.setData({
      starId: util.getCurrentPageUrlOptions().starId,
      fromOpenid: wx.getStorageSync('worldCupToken')
    })
    var starName = util.getCurrentPageUrlOptions().starName;
    this.setData({
      starName: starName
    })
    var that = this;
    wx.request({
      url: getApp().globalData.path + "worldCup/starRankingList?starId=" + that.data.starId,
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) { 
        console.log(res)
        if(res.data.code === 0) {        
          that.setData({
            rankList: res.data.data
          })
        }       
      }
    })
  },
  callup: function (event) {
    var that = this;    
    var fromHeadimgurl = event.target.dataset.url;
    var openid = event.target.dataset.openid;
    console.log(that.data.fromOpenid)
    var supportType = 2;
    if (openid === that.data.fromOpenid){
      supportType = 1;
    }
    console.log(fromHeadimgurl)
    var that = this;
    //助力 supportType 1:本人助力 2:帮好友助力
    wx.request({
      url: getApp().globalData.path + "worldCup/support",
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        openid: openid,
        supportType: supportType,
        fromOpenid: that.data.fromOpenid,
        fromHeadimgurl: wx.getStorageSync('userInfo').avatarUrl
      },
      success: function (res) {
        if (res.data.code === 0) {
          wx.showToast({
            title: '助力成功',
            icon: 'success',
            duration: 2000,
            success: function(){            
              wx.request({
                url: getApp().globalData.path + "worldCup/starRankingList?starId=" + that.data.starId,
                method: "POST",
                header: { "Content-Type": "application/x-www-form-urlencoded" },
                success: function (res) {                 
                  if (res.data.code === 0) {
                    that.setData({
                      rankList: res.data.data
                    })
                  }
                }
              })
            }
          })
          that.setData({
            supportTimes: that.data.supportTimes + 1,
            starSupportTimes: that.data.starSupportTimes + 1
          })
          that.setData({
            progressValue: that.data.supportTimes / that.data.topTimes * 100
          })
        }
        if (res.data.code === -1) {
          wx.showToast({
            title: res.data.message || '助力失败',
            icon: 'none',
            duration: 2000,
            image: app.globalData.path + 'statics/build/img/star/error.png'
          })
          return;
        }
      }
    })
  },

})