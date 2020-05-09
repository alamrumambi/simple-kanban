<template>
  <div class="container">
    <Header
      :isLogin="isLogin"
      :addForm="addForm"
      @loginStatus="loginStatus"
      @addFormShow="addFormShow"
      @addTask="addTask"
    ></Header>
    <Login v-if="!isLogin" :isLogin="isLogin" @login="login"></Login>
    <Task
      v-if="isLogin"
      :data="data"
      :popForm="popForm"
      @updateTask="updateTask"
      @deleteTask="deleteTask"
      @moveTask="moveTask"
      @popFormShow="popFormShow"
    ></Task>
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
      popForm: false,
      data: {
        backlogs: [],
        todos: [],
        doing: [],
        done: []
      }
    };
  },
  created() {
    if (localStorage.getItem("access_token")) {
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

    popFormShow(value) {
      this.popForm = value;
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
          headers: { access_token: localStorage.getItem("access_token") }
        })
          .then(res => {
            for (let i in res.data) {
              if (category[cat] == "backlog")
                this.data.backlogs.push(res.data[i]);
              //respon dari rest api dimasukan ke users
              else if (category[cat] == "to-do")
                this.data.todos.push(res.data[i]);
              else if (category[cat] == "doing")
                this.data.doing.push(res.data[i]);
              else if (category[cat] == "done")
                this.data.done.push(res.data[i]);
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
      const { title } = body;

      axios({
        method: "POST",
        url: "http://localhost:3000/tasks",
        data: { title },
        headers: { access_token: localStorage.getItem("access_token") }
      })
        .then(res => {
          this.data.backlogs.length = 0;
          this.data.todos.length = 0;
          this.data.doing.length = 0;
          this.data.done.length = 0;
          this.showData();
          this.addForm = false;
        })
        .catch(err => {
          console.log(err);
          this.addForm = true;
        });
    },

    //update task
    updateTask(body) {
      const { title, id } = body;
      axios({
        method: "PUT",
        url: `http://localhost:3000/tasks/edit/${id}`,
        data: { title },
        headers: { access_token: localStorage.getItem("access_token") }
      })
        .then(res => {
          this.data.backlogs.length = 0;
          this.data.todos.length = 0;
          this.data.doing.length = 0;
          this.data.done.length = 0;
          this.showData();
          this.popForm = false;
        })
        .catch(err => {
          console.log(err);
          this.popForm = true;
        });
    },

    //delete task
    deleteTask(id) {
      axios({
        method: "DELETE",
        url: `http://localhost:3000/tasks/${id}`,
        headers: { access_token: localStorage.getItem("access_token") }
      })
        .then(res => {
          this.data.backlogs.length = 0;
          this.data.todos.length = 0;
          this.data.doing.length = 0;
          this.data.done.length = 0;
          this.showData();
          this.popForm = false;
        })
        .catch(err => {
          console.log(err);
          this.popForm = true;
        });
    },

    //move task
    moveTask(body) {
      const { category, id } = body;
      axios({
        method: "PUT",
        url: `http://localhost:3000/tasks/edit-category/${id}`,
        data: { category },
        headers: { access_token: localStorage.getItem("access_token") }
      })
        .then(res => {
          this.data.backlogs.length = 0;
          this.data.todos.length = 0;
          this.data.doing.length = 0;
          this.data.done.length = 0;
          this.showData();
          this.popForm = false;
        })
        .catch(err => {
          console.log(err);
          this.popForm = true;
        });
    }
  }
};
</script>

<style scoped>
</style>>

