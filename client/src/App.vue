<template>
  <div class="container">
    <Header :isLogin="isLogin" :addForm="addForm" @loginStatus="loginStatus" @addFormShow="addFormShow" @addTask="addTask"></Header>
    <Login v-if="!isLogin" :isLogin="isLogin" @login="login"></Login>
    <Task v-if="isLogin" :data="data"></Task>
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
      addForm: false,
      data: {
        backlogs: [],
        todos: [],
        doing: [],
        done: []
      }
    };
  },
  created() {
    if(localStorage.getItem('access_token')) {
      this.showData();
      this.isLogin = true;
    }
  },
  components: {
    Header,
    Login,
    Task
  },
  methods: {
    //show add form
    addFormShow(value) {
      this.addForm = value;
    },

    //after logout
    loginStatus(value) {
      this.isLogin = value;
    },

    //show all tasks
    showData() {
      const category = ["backlog", "to-do", "doing", "done"];

      for (let cat in category) {
        axios({
          method: "GET",
          url: `http://localhost:3000/tasks/${category[cat]}`,
          headers: {access_token: localStorage.getItem('access_token')}
        })
          .then(res => {
            for (let i in res.data) {
              if(category[cat] == 'backlog') this.data.backlogs.push(res.data[i]); //respon dari rest api dimasukan ke users
              else if(category[cat] == 'to-do') this.data.todos.push(res.data[i]);
              else if(category[cat] == 'doing') this.data.doing.push(res.data[i]);
              else if(category[cat] == 'done') this.data.done.push(res.data[i]);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
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
          this.showData();
          this.isLogin = true;
        })
        .catch(error => {
          console.log(error);
        });
    },

    //add new task
    addTask(body) {
      const {title} = body;

      axios({
        method: "POST",
        url: "http://localhost:3000/tasks",
        data: {title},
        headers: {access_token: localStorage.getItem('access_token')}
      })
      .then(res => {
        location.reload();
      })
      .catch(err => {
        console.log(err);
        this.addForm = true;
      })
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

