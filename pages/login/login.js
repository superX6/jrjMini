var md = require('../../utils/md5.js');
var util = require('../../utils/util.js');
// pages/login/login.js
Page({
  data: {
    userN: '',
    passW: '',
    loginText: '登录'
  },
  onLoad: function (options) {
    this.checkSessionAndGetData();
  },

  //用户名和密码输入框事件
  usernameInput: function (e) {
    this.setData({
      userN: e.detail.value
    })
  },
  passwordInput: function (e) {
    this.setData({
      passW: e.detail.value
    })
  },
  checkSessionAndGetData: function(){   
    var thirdSession = wx.getStorageSync('thirdSession');  
    if(thirdSession){    
      wx.request({
        url: getApp().globalData.path + '/checkThirdSession',
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          thirdSession: thirdSession
        },
        success: function (res) {
          var ERROK = res.data.code;             
          if (ERROK == 0) {           
            wx.reLaunch({
              url: '../award/award'
            })
          } else if (ERROK == -2) {
            wx.showModal({
              title: '提示',
              content: '请重新登录',
            });
          }
        }
      })
    } else {
      console.log('未授权');
      wx.navigateTo({
        url: '../authorize/authorize',
      })
    }
  },
  myLogin: function () {
    var phoneReg = /^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/;
    var that = this;
    var account = this.data.userN;
    var password = this.data.passW;

    if (this.data.userN.length == 0 || this.data.passW.length == 0) {
      wx.showModal({
        title: '温馨提示',
        content: '用户名或密码不能为空！！',
      })
    } else if (!phoneReg.test(account)) {
      wx.showModal({
        title: '温馨提示',
        content: '手机号输入有误！',
      })
    } else {
      that.setData({
        infoMess: '',
        loginText: "登录中. . ."
      });
      wx.login({      
        success: function (res) {
          if (res.code) {
            //发起网络请求     
            wx.request({
              url: getApp().globalData.path + 'login',
              method: 'POST',
              header: { "Content-Type": "application/x-www-form-urlencoded" },
              data: {
                account: account,
                password: md.md5(password),
                code: res.code
              },
              success: function (res) {
                that.setData({
                  loginText: "登录"
                });
                if (res.data.code == 0) {
                  wx.setStorageSync('thirdSession', res.data.data.thirdSession);
                  wx.setStorageSync('account', account); 
                  that.checkSessionAndGetData();                
                } else if (res.data.code == -1) {
                  wx.showModal({
                    title: '提示',
                    content: res.data.message,
                  })
                }
              },
              fail: function () {
                that.setData({
                  loginText: "登录"
                });
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    }
  },
  // login
  loginBtnClick: function (a) {   
    this.myLogin();
  },

  //call
  call: function () {
    wx.makePhoneCall({
      phoneNumber: '4009622230'
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
      fail: function (res) {
        // 转发失败
      }
    }
  }

})