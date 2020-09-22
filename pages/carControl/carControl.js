// pages/carControl/carControl.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    StartX: 160,
    StartY: 310,
    leftLooks: '',
    topLooks: '',
    //半径
    radius: 60,
    distance: "0",
  },

  udpSock: null,
  address: '192.168.4.1',
  port: 5000,
  direct: 0,
  turn: 0,
  timeoutID: 0,

  tmrSend: function() {
    var self = this;
    self.udpSock.send({
      address: self.address,
      port: self.port,
      message: '{"x":'+self.direct+',"y":'+self.turn+'}'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    self.udpSock = wx.createUDPSocket();
    if(self.udpSock == null){
      wx.showModal({
        title: "温馨提示", // 提示的标题
        content: "手机不支持UDP", // 提示的内容
        showCancel: false, // 是否显示取消按钮，默认true
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
      })
    }
    self.udpSock.bind();
    self.udpSock.onMessage(function (res) {
      let unit8Arr = new Uint8Array(res.message);
      let encodedString = String.fromCharCode.apply(null, unit8Arr);
      let decodedString = decodeURIComponent(escape((encodedString)));
      self.setData({
        distance: decodedString,
      })
    });
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
    var self = this;
    self.direct = 1;
    self.turn = 0;
    self.timeoutID = setInterval(self.tmrSend, 500);
    self.direct = 0;
    self.turn = 0;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var self = this;
    clearInterval(self.timeoutID);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var self = this;
    clearInterval(self.timeoutID);
    self.udpSock.close();
    self.udpSock = null;
    self.direct = 0;
    self.turn = 0;
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

  ImageTouch: function (e) {
  },

  GetPosition: function (touchX, touchY) {
    var self = this;
    var DValue_X;
    var Dvalue_Y;
    var Dvalue_Z;
    var imageX;
    var imageY;
    var ratio;
    DValue_X = touchX - self.data.StartX;
    Dvalue_Y = touchY - self.data.StartY;
    Dvalue_Z = Math.sqrt(DValue_X * DValue_X + Dvalue_Y * Dvalue_Y);
    //触碰点在范围内
    if (Dvalue_Z <= self.data.radius) {
      imageX = touchX;
      imageY = touchY;
      imageX = Math.round(imageX);
      imageY = Math.round(imageY);
      return { posX: imageX, posY: imageY };
    }
    //触碰点在范围外
    else {
      ratio = self.data.radius / Dvalue_Z;
      imageX = DValue_X * ratio + 160;
      imageY = Dvalue_Y * ratio + 310;
      imageX = Math.round(imageX);
      imageY = Math.round(imageY);
      return { posX: imageX, posY: imageY };
    }
  },
  //拖动摇杆移动
  ImageTouchMove: function (e) {
    var self = this;
    var touchX = e.touches[0].clientX-40;
    var touchY = e.touches[0].clientY-40;
    var movePos = self.GetPosition(touchX, touchY);
    self.setData({
      leftLooks: movePos.posX,
      topLooks: movePos.posY
    })
    
    if (movePos.posX > (self.data.StartX+20)){
      self.turn=1;
    }else if(movePos.posX < (self.data.StartX-20)){
      self.turn=-1;
    }else{
      self.turn=0;
    }
    if (movePos.posY > (self.data.StartY+20)){
      self.direct=-1;
    }else if(movePos.posY < (self.data.StartY-20)){
      self.direct=1;
    }else{
      self.direct=0;
    }
  },

  //松开摇杆复原
  ImageReturn: function (e) {
    var self = this;
    self.setData({
      leftLooks: self.data.StartX,
      topLooks: self.data.StartY
    })
    self.direct = 0;
    self.turn = 0;
  }

})