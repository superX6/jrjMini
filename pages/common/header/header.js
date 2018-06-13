// pages/common/header/header.js
var util = require('../../../utils/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    bucket: "",
    availablebalance: "",
    account: "",
    freezecapital: "",
    awardmoney: "",
    dueincapital: ""
  },
  ready: function(){
    this.getHeaderData();
  },
  
  methods: {
    getHeaderData: function(){
      var that = this;
      wx.request({
        url: getApp().globalData.path + '/userCenter/accountMoney',
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          thirdSession: wx.getStorageSync('thirdSession')
        },
        success: function(res){
          if(res.data.code == 0){            
            var hour = new Date().getHours();
            var bucket = '';
            if (hour < 6) { bucket = '凌晨好！' }
            else if (hour < 9) { bucket = '早上好！' }
            else if (hour < 12) { bucket = '上午好！' }
            else if (hour < 14) { bucket = '中午好！' }
            else if (hour < 17) { bucket = '下午好！' }
            else if (hour < 19) { bucket = '傍晚好！' }
            else if (hour < 22) { bucket = '晚上好！' }
            else { bucket = '夜里好！' };
            that.setData({
              bucket: bucket,
              availablebalance: util.toFixed2(res.data.data.availablebalance),
              account: wx.getStorageSync('account'),
              freezecapital: util.toFixed2(res.data.data.freezecapital),
              awardmoney: util.toFixed2(res.data.data.awardmoney),
              dueincapital: util.toFixed2(res.data.data.dueincapital)
            })
          }
        }
      })
    },
    toWorldCupPage: function(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }

  }
})
