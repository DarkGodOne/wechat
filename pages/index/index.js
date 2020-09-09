//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎来到Joying签证办理大厅',
    detail: '从事签证办理业务4年以来，竭诚为客户服务，专业为您解答签证办理过程中的问题，欢迎来电咨询',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    disabled: false,
    loading1: false,
    loading2: false,
    src: ""
  },
  //事件处理函数
  bindViewTap: function() {
    this.setData({ disabled: true,loading1: true});
    wx.navigateTo({
      url: '../country/country'
    })
  },
  carControl: function () {
    this.setData({ disabled: true, loading2: true });
    wx.navigateTo({
      url: '../carControl/carControl'
    })
  },
  onLoad: function () {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({ disabled: false, loading1: false, loading2: false });
  }
})
