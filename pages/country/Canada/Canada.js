// pages/country/America/Questionnaire.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    process: "",
    currentData: 0,
    items: [
      { name: 'Travel', value: '旅游', checked: 'true' },
      { name: 'Family', value: '探亲' },
      { name: 'Business', value: '商务' }],
    primarySize: 'mini',
    disabled: false,
    plain: false,
    loading: false,
    showView: false,
    file: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "办理加拿大签证"
    })
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
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
  onShareAppMessage: function () {

  },

  showProcess: function(e){
    var type = e.detail.value;
    this.setData({process: "获取到"+ type});
  },

  getFile: function(e) {
    var name = e.target.id;
    wx.setClipboardData({
      data: 'https://7669-visa-0f8ec8-1258124844.tcb.qcloud.la/America.doc?sign=7dbcd1a4520ee5f8c52491ec9aa1673f&t=1552285013',
      success(res) {
        wx.showToast({
          title: '下载地址已复制',
          icon: 'success'
        })
      }
    })
  }

})