// pages/worldCup/worldCup.js
Page({

  /**
   * 页面的初始数据
   */

  data: {

    // background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    starList: [
      {
        starList: [
          {
            name: 'Mess',
            nationality: '阿根廷',
            imgUrl: '../../images/vatar.png'
          },
          {
            name: 'C罗纳尔多',
            nationality: '葡萄牙',
            imgUrl: '../../images/vatar2.png'
          },
          {
            name: 'Mess',
            nationality: '阿根廷',
            imgUrl: '../../images/vatar.png'
          },
          {
            name: 'Mess',
            nationality: '阿根廷',
            imgUrl: '../../images/vatar.png'
          },
          {
            name: 'Mess',
            nationality: '阿根廷',
            imgUrl: '../../images/vatar.png'
          },
          {
            name: 'Mess',
            nationality: '阿根廷',
            imgUrl: '../../images/vatar.png'
          },
          {
            name: 'Mess',
            nationality: '阿根廷',
            imgUrl: '../../images/vatar.png'
          },
          {
            name: 'Mess',
            nationality: '阿根廷',
            imgUrl: '../../images/vatar.png'
          }
        ]
      },
      {
        starList: [
          {
            name: 'Mess',
            nationality: '阿根廷',
            imgUrl: '../../images/vatar.png'
          },
          {
            name: 'Mess',
            nationality: '阿根廷',
            imgUrl: '../../images/vatar.png'
          },
          {
            name: 'Mess',
            nationality: '阿根廷',
            imgUrl: '../../images/vatar.png'
          },
          {
            name: 'Mess',
            nationality: '阿根廷',
            imgUrl: '../../images/vatar.png'
          },
          {
            name: 'Mess',
            nationality: '阿根廷',
            imgUrl: '../../images/vatar.png'
          },
          {
            name: 'Mess',
            nationality: '阿根廷',
            imgUrl: '../../images/vatar.png'
          },
          {
            name: 'Mess',
            nationality: '阿根廷',
            imgUrl: '../../images/vatar.png'
          },
          {
            name: 'Mess',
            nationality: '阿根廷',
            imgUrl: '../../images/vatar.png'
          }
        ]
      }
    ]
  },
  chooseStar(event) {
    console.log(event);
    var arrayIndex = event.currentTarget.dataset.arrayIndex;
    var itemIndex = event.currentTarget.dataset.itemIndex;
    console.log(`第${arrayIndex}组， 第${itemIndex + 1}个`);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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
  }
})