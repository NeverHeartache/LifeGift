<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="Activity name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="form.region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai"></el-option>
        <el-option label="Zone two" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="Pick a date" v-model="form.date1" style="width: 100%"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker placeholder="Pick a time" v-model="form.date2" style="width: 100%"></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="Instant delivery">
      <el-switch v-model="form.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="Activity type">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="Online activities" name="type"></el-checkbox>
        <el-checkbox label="Promotion activities" name="type"></el-checkbox>
        <el-checkbox label="Offline activities" name="type"></el-checkbox>
        <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Resources">
      <el-radio-group v-model="form.resource">
        <el-radio label="Sponsor"></el-radio>
        <el-radio label="Venue"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "WebSocket",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      message: "",
    };
  },
  created() {
    createWebSocket();
  },
  methods: {
    createWebSocket() {
      let that = this;
      if ("WebSocket" in window) {
        console.log("您的浏览器支持 WebSocket!");
        //实例化websocket	 
        that.ws = new WebSocket("ws://local.democracy.com:8081/websocket/macro");
        //保存设置全局websocket对象
        that.$global.setWs(that.ws);
        //监听websocket连接打开方法
        that.ws.onopen = function () {
          console.log("打开websocket")
          //调用keepalive方法（不一定都需要调用此方法，可注释）
          //that.keepAlive()
        }
        //监听websocket错误方法
        that.ws.onerror = function (ev) {
          console.log("连接已出错...");
          //延迟执行重连
          setTimeout(() => {
            that.creatSocket();
          }, that.$global.delay);
        };
        //监听websocket关闭方法
        that.ws.onclose = function (ev) {
          // 关闭 websocket
          console.log("连接已关闭...");
          //延迟执行重连
          setTimeout(() => {
            that.creatSocket();
          }, that.$global.delay);
        };

        //监听websocket接收消息事件（接收来自服务器的实时消息）
        that.ws.onmessage = function (res) {
          console.log("App.vue收到服务器内容", res.data);
        };
      } else {
        // 浏览器不支持 WebSocket
        console.log("您的浏览器不支持 WebSocket!");
      }
    },
    onSubmit() {
      let url = "ws://local.democracy.org/websocket/macro";
      let sock = new WebSocket(url);
      sock.onopen = function () {
        console.log('Opening!');
        sayMacro();
      }
    },

  },
};
</script>

<style scoped>
</style>