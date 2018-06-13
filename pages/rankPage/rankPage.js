// pages/rankPage/rankPage.js
var app = getApp();
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    starName: '莫迪卡',
    rankList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    // console.log(util.getCurrentPageUrlOptions().starId)
    var starId = util.getCurrentPageUrlOptions().starId;
    var starName = util.getCurrentPageUrlOptions().starName;
    this.setData({
      starName: starName
    })
    var that = this;
    wx.request({
      url: getApp().globalData.path + "worldCup/starRankingList?starId=" + starId,
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) { 
        if(res.data.code === 0) {
        
          that.setData({
            rankList: res.data.data
          })
        }       
      }
    })
  }

})