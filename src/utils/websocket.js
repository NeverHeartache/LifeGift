export default {
  ws: {}, //  websocket 对象
  delay: 1500, // 延迟1500毫秒
  //  设置websocket对象
  setWs: function (newWs) {
    this.ws = newWs;
  },
  onopen: function () {
    console.log('Opening');
    sayMarco();
  },
  onmessage: function (e) {
    console.log('Received message:' + e.data);
    setTimeout(f => {
      sayMarco();
    }, 2000)
  },
  onclose: function () {
    console.log('Closing');
  },
  sayMarco: function () {
    console.log('Sending Marco!');
    this.ws.send('Marco!');
  },
  //设置延迟方法
  setDelay: function (newDelay) {
    this.delay = newDelay
  },
  //发送websocket信息方法
  sendMsg: function (message) {
    this.ws.send(JSON.stringify(message))
  }
}