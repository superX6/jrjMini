// pages/worldCup/worldCup.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */

  data: {  
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    curIndex: 0,
    curId: '',
    starName: '???',
    starNationality: '???',
    chooseFlag: true,
    confirmBtn: true,
    stopChoose: false,
    tipsText: '竞猜世界杯金球奖得主',
    phone: '',
    a: 'ss',
    chooseUrl: 'https://uat.jrjzx.cn/p2pmini//statics/build/img/star/un.png',
    showModal: false  
  },
  chooseStar(event) {
    if (this.data.stopChoose){
      return ;
    }
    var arrayIndex = event.currentTarget.dataset.arrayIndex;
    var itemIndex = event.currentTarget.dataset.itemIndex;
    var temList = this.data.starList;  
    var temArr = temList[arrayIndex].starList;
    var temUrl = temArr[itemIndex].imgName;       
    this.setData({
      curId: arrayIndex * 8 + (itemIndex+1),
      curIndex: arrayIndex + '' + itemIndex,
      confirmBtn: false,
      chooseUrl: temUrl,
      starName: temArr[itemIndex].name,
      starNationality: temArr[itemIndex].contry
    })
    console.log(this.data.curId)    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(wx.getStorageSync('token'))
    var that = this;
   
    wx.request({
      url: getApp().globalData.path + "worldCup/starList/",
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },    
      success: function (res) {       
        if (res.data.code === 0) {          
          var resList = res.data.data;               
          const newArray = resList.map(function (value) {
            value.imgName = app.globalData.path + value.imgName;
            return value;
          });
         
          that.setData({
            starList: [
              {
                starList: resList.slice(0, 8)
              },
              {
                starList: resList.slice(8, 16)
              },
              {
                starList: resList.slice(16, 24)
              }
            ]
          })
        }
        console.log(that.data.starList)
      }
    })
  },

 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {

    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '7766',
      path: '/page/user?id=123'
    }
  },
  // handleChooseStar () {
  //   wx.showModal({
  //     title: '提示',
  //     content: `<view>
  //     <text>请输入你的电话号码</text>
  //     <input />
  //     <button class='weui-btn'>选定支持球星</button>
  //     </view>`,
  //     success: function (res) {
  //       if (res.confirm) {
  //         console.log('用户点击确定')
  //       } else if (res.cancel) {
  //         console.log('用户点击取消')
  //       }
  //     }
  //   })
  // },
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  inputChange: function (event) {  
    if (/[0-9]/.test(event.detail.value.charAt(event.detail.cursor - 1))) {
      this.setData({
        phone: event.detail.value
      })
      return event.detail.value
    }else{    
      return event.detail.value.substring(0, event.detail.cursor - 1)
    }
  },
  onConfirm: function () {
    var phoneReg = /^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/;   
    if (!phoneReg.test(this.data.phone)) {
      wx.showModal({
        title: '温馨提示',
        content: '手机号输入格式有误,请重新输入',
      })   
      this.setData({
        phone: ''
      })  
    }else{  
    
      var curImgUrl = wx.getStorageSync('userInfo').avatarUrl;
      var curOpenId = wx.getStorageSync('token');
     
      wx.request({
        url: getApp().globalData.path + "worldCup/acquireStar",
        method: "POST",
        data: {
          openid: curOpenId,
          starId: this.data.curId,
          mobile: this.data.phone,
          headImgUrl: curImgUrl,
        },
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function(res){
          console.log(res.data)
          if (res.data.code === 0) {  
            
          }
        }
      })

      this.setData({
        tipsText: '已选球星',
        chooseFlag: false,
        stopChoose: true
      })

      this.hideModal();
    }  
  },
  toRulePage: function () {
    wx.navigateTo({
      url: '../rulePage/rulePage',
    })
  },
  toSharePage: function () {
    wx.navigateTo({
      url: '../sharePage/sharePage',
    })
  }
})