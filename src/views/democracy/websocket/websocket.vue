<template>
  <el-row>
    <el-col>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="发送人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动内容">
          <el-input v-model="formInline.user" placeholder="活动内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "WebSocket",
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      message: "",
      sock: null,
    };
  },
  created() {
    this.createWebSocket();
  },
  methods: {
    createWebSocket() {
      if ("WebSocket" in window) {
        console.log("您的浏览器支持 WebSocket!");
        //

        //实例化websocket
        this.sock = new WebSocket(
          "ws://127.0.0.1:8080/websocket/marco"
        );
        //保存设置全局websocket对象
        // that.$websock.setWs(this.sock);
        //监听websocket连接打开方法
        this.sock.onopen = function () {
          console.log("打开websocket");
          //调用keepalive方法（不一定都需要调用此方法，可注释）
          //that.keepAlive()
        };
        //监听websocket错误方法
        this.sock.onerror = function (ev) {
          console.log("连接已出错...");
          //延迟执行重连
          setTimeout(() => {
            that.creatSocket();
          }, that.$websock.delay);
        };
        //监听websocket关闭方法
        this.sock.onclose = function (ev) {
          // 关闭 websocket
          console.log("连接已关闭...");
          //延迟执行重连
          setTimeout(() => {
            that.creatSocket();
          }, that.$websock.delay);
        };

        //监听websocket接收消息事件（接收来自服务器的实时消息）
        this.sock.onmessage = function (res) {
          console.log("App.vue收到服务器内容", res.data);
        };
      } else {
        // 浏览器不支持 WebSocket
        console.log("您的浏览器不支持 WebSocket!");
      }
    },
    onSubmit() {
      this.sayMacro();
    },
    sayMacro() {
      this.sock.send("Macro!");
    },
  },
};
</script>

<style scoped>
</style>