// pages/sharePage/sharePage.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    starUrl: '',
    showInviteButton: true,
    showReturnButton: false,
    todayText: '今日助力',
    playButtonText: '我也要玩',
    supportTimes: '',
    myRanking: 1 ,
    supportType: 1,
    curOpenid: '' ,
    fromOpenid: '',
    fromHeadimgurl: '',
    topTimes:0,
    starSupportTimes:0,
    progressValue: 0,
    curStarName:'',
    friendsUrl:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

 
  },
  onShow: function () {
    // 进入分享页面前  先判断是否授权
    var that = this;
    this.setData({
      showReturnButton: false,
    })

    const tcurOpenid = util.getCurrentPageUrlOptions().worldCupToken;
    let tsupportType = util.getCurrentPageUrlOptions().type;

    // 自己从分享页进入自己的
    if (wx.getStorageSync('worldCupToken') === tcurOpenid && tsupportType === '2') {
      tsupportType = '1';
      this.setData({
        showReturnButton: true,
        supportType: '1',
        playButtonText: '进入我的主页'
      })
    }

    this.setData({
      curOpenid: tcurOpenid,
      supportType: tsupportType,
    })

    //判断是自己跳转的页面还是别人分享的页面
    if (tsupportType === '2') { //帮别人助力
      // wx.removeStorageSync('worldCupToken'); // 调试模拟
      const tavatarUrl = util.getCurrentPageUrlOptions().avatarUrl;
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo'] && wx.getStorageSync('worldCupToken')) {
            // console.log('已授权')
            wx.getUserInfo({
              success: res => {
                this.setData({
                  playButtonText: '进入我的主页'
                })
              }
            })
          } else {
            // console.log('授权登录')
            wx.navigateTo({
              url: '../authorize/authorize?type=2',
            })
          }
        }
      })

      this.setData({
        todayText: '帮好友助力',
        showInviteButton: false,
        avatarUrl: tavatarUrl,
        fromOpenid: wx.getStorageSync('worldCupToken'),
        fromHeadimgurl: wx.getStorageSync('userInfo').avatarUrl
      })
    } else if (tsupportType === '1') {  // 自己助力
      var userInfo = wx.getStorageSync('userInfo');
      this.setData({
        todayText: '今日助力',
        showInviteButton: true,
        avatarUrl: userInfo.avatarUrl
      })
    }


    // 获取我的球星数据情况
    wx.request({
      url: app.globalData.path + "worldCup/myStar",
      method: "POST",
      data: {
        openid: that.data.curOpenid
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        if (res.data.code === 0) {
          that.setData({
            supportTimes: parseInt(res.data.data.supportTimes),
            starUrl: app.globalData.path + res.data.data.imgName,
            curStarName: res.data.data.name
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

        if (res.data.code === 0) {
          const results = res.data.data;
          // 计算进度条百分比
          const my = that.data.supportTimes;
          that.setData({
            starSupportTimes: parseInt(results.starSupportTimes),
            myRanking: parseInt(results.myRanking),
            topTimes: parseInt(results.list[0].supportTimes),
            progressValue: my / parseInt(results.list[0].supportTimes) * 100
          })
        }
      }
    })

    // 获取好友助力情况
    wx.request({
      url: app.globalData.path + "worldCup/mySupportRecord",
      method: "POST",
      data: {
        openid: that.data.curOpenid
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        var friendsArr = [];
        if (res.data.code === 0) {
          var temImgUrlArr = res.data.data;
          temImgUrlArr.forEach(function (value, index) {
            friendsArr.push(value.fromHeadimgurl)
          })
          that.setData({
            friendsUrl: friendsArr
          })
        }
        friendsArr = null;
      }
    })
  },
  callUp: function(){
    var that = this;   
  //助力 supportType 1:本人助力 2:帮好友助力
  //  wx.showModal({
  //    title: this.data.fromOpenid,
  //    content: this.data.fromHeadimgurl + '//////' + that.data.curOpenid + '///////' + that.data.supportType,
  //  })
    wx.request({
      url: getApp().globalData.path + "worldCup/support",
      method: "POST",   
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        openid: that.data.curOpenid,
        supportType: that.data.supportType,
        fromOpenid: wx.getStorageSync('worldCupToken'),
        fromHeadimgurl: that.data.fromHeadimgurl       
      },
      success: function (res) {      
        if (res.data.code === 0) {      
          wx.showToast({
            title: '助力成功',
            icon: 'success',
            duration: 2000
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
  toStartPage: function () {
    wx.navigateTo({
      url: '../start/start?type=3',
    })
  },

  createImg: function(){
    wx.navigateTo({
      url: '../shareImage/shareImage',
   
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    
    var temUrl = this.data.starUrl;
    var curPath = app.globalData.path + 'pages/sharePage/sharePage?worldCupToken=' + this.data.curOpenid + '&type=2&avatarUrl=' + this.data.avatarUrl
    console.log(curPath)
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      // console.log(ops)
    }
    return {
      title: '为' + this.data.curStarName +'助力,赢取无人机大奖',
      path: '/pages/sharePage/sharePage?worldCupToken=' + this.data.curOpenid + '&type=2&avatarUrl=' + this.data.avatarUrl,   
      imageUrl: temUrl, 
      success: function (res) {        
        // 转发成功       
        wx.showToast({
          title: '邀请成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '邀请失败',
          icon: 'none',
          duration: 2000,
          image: app.globalData.path + 'statics/build/img/star/error.png'
        })
      }
    }

  }
})