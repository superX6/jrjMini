// pages/worldCup/worldCup.js
var app = getApp();

Page({

  data: {  
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    curIndex: 0,
    contry: '???',
    curId: '',
    starName: '???',
    kefuUrl: '',
    showChooseBtn: true,
    confirmBtn: true,
    stopChoose: false,
    tipsText: '选择助力球星',
    phone: '',
    a: 'ss',
    chooseUrl: getApp().globalData.path + 'statics/build/img/star/un.png',
    showModal: false  
  },
  chooseStar(event) {
    var arrayIndex = event.currentTarget.dataset.arrayIndex;
    var itemIndex = event.currentTarget.dataset.itemIndex;
    var temList = this.data.starList;
    var temArr = temList[arrayIndex].starList;
    
    if (this.data.stopChoose){
      var starId = arrayIndex * 8 + (itemIndex + 1)
      var starName = temArr[itemIndex].name;
      wx.navigateTo({
        url: '../rankPage/rankPage?starId=' + starId + "&starName=" + starName
        // url: '../rankPage/rankPage?starId=1'  + "&starName=" + starName
      })
      return ;
    } else{         
     
      var temUrl = temArr[itemIndex].imgName;
      this.setData({
        curId: arrayIndex * 8 + (itemIndex + 1),
        curIndex: arrayIndex + '' + itemIndex,
        confirmBtn: false,
        chooseUrl: temUrl,
        starName: temArr[itemIndex].name,
        contry: temArr[itemIndex].contry
      })
      // console.log(this.data.curId)  
    }     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      kefuUrl: getApp().globalData.path + "statics/build/img/star/kefu.png"
    })

    var that = this;
   //获取球星列表
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
        // console.log(that.data.starList)
      }
    })

  // 获取我的球星数据情况
    wx.request({
      url: app.globalData.path + "worldCup/myStar",
      method: "POST",
      data: {
        openid: wx.getStorageSync('worldCupToken')
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        if (res.data.code === 0) {          
          that.setData({
            showChooseBtn: false,
            tipsText: '已选球星',
            stopChoose: true,
            chooseUrl: app.globalData.path + res.data.data.imgName,
            starName: res.data.data.name,
            contry: res.data.data.contry          
          })
        }
      }
    })


  },


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
    var that = this;
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
      var nickName = wx.getStorageSync('userInfo').nickName;
      var curImgUrl = wx.getStorageSync('userInfo').avatarUrl;
      var curOpenId = wx.getStorageSync('worldCupToken');
     
      wx.request({
        url: getApp().globalData.path + "worldCup/acquireStar",
        method: "POST",
        data: {
          openid: curOpenId,
          starId: this.data.curId,
          mobile: this.data.phone,
          headImgUrl: curImgUrl,
          nickName: nickName  
        },
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function(res){
          console.log(res.data)
          if (res.data.code === 0) {  
            that.setData({
              tipsText: '已选球星',
              showChooseBtn: false,
              stopChoose: true
            })          
          } else{
            wx.showToast({
              title: '领取失败',
              icon: 'none',
              duration: 2000,
              image: app.globalData.path + 'statics/build/img/star/error.png'
            })
          }
          that.hideModal();
        }
      })

     
    }  
  },
  toRulePage: function () {
    wx.navigateTo({
      url: '../rulePage/rulePage',
    })
  },
  toSharePage: function () {   
    var myToken = wx.getStorageSync('worldCupToken');
    wx.navigateTo({
      url: '../sharePage/sharePage?worldCupToken=' + myToken +'&type=1' // 自身调整 type=1
      // url: '../sharePage/sharePage?worldCupToken=' + myToken + '&type=2&avatarUrl=' + this.data.chooseUrl,
       
    })
  },
  toLoginPage: function() {
    wx.navigateTo({
      url: '../login/login'
    })
  }
})