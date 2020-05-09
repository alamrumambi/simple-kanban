<template>
  <div class="container">
    <Header :isLogin="isLogin" @loginStatus="loginStatus"></Header>
    <Login v-if="!isLogin" :isLogin="isLogin" @login="login"></Login>
    <Task v-if="isLogin" :data="backlogs"></Task>
  </div>
</template>

<script>
import Login from "./components/Login";
import Header from "./components/Header";
import Task from "./components/Task";
import axios from "axios";

export default {
  data() {
    return {
      isLogin: false,
      backlogs: []
      // data: {
      //   backlogs: [],
      //   todos: [],
      //   doing: [],
      //   done: []
      // }
    };
  },
  created() {
    axios
      .get("http://localhost:3000/tasks/backlog")
      .then(res => {
        this.backlogs = res.data; //respon dari rest api dimasukan ke users
      })
      .catch(err => {
        console.log(err);
      });
    this.isLogin = true;
  },
  components: {
    Header,
    Login,
    Task
  },
  methods: {
    loginStatus(value) {
      this.isLogin = value;
    },
    // login
    login(body) {
      axios({
        method: "POST",
        url: "http://localhost:3000/users/login",
        data: body
      })
        .then(response => {
          localStorage.setItem("access_token", response.data.access_token);
          // this.showData();
          this.isLogin = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
h1 {
  background-color: gray;
  padding: 10px;
  color: aliceblue;
}
</style>>

