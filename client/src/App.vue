<template>
  <div class="container">
    <Header :isLogin="isLogin" @loginStatus="loginStatus"></Header>
    <Login v-if="!isLogin" :isLogin="isLogin" @loginStatus="loginStatus"></Login>
    <Task v-if="isLogin" :backlogs="backlogs"></Task>
  </div>
</template>

<script>
import Login from "./components/Login";
import Header from "./components/Header";
import Task from "./components/Task"

export default {
  data() {
    return {
      isLogin: false,
      backlogs: []
    };
  },
  components: {
    Header,
    Login,
    Task
  },
  methods: {
    loginStatus(value) {
      this.isLogin = value;
    }
  },
  created() {
    //contoh ambil data dari server
    //   axios({
    //       method: "GET",
    //       url: "http://localhost:3000"
    //   })
    //   .then(data => {
    //       this.todoList = data;
    //   })
    //   .catch(err => {
    //       console.log(err);
    //   })

    this.backlogs = [
        {
          title: 'Percobaan Pertama',
          email: 'pertama@email.com',
          tanggal: '2019-07-13',
          category: 'backlog'
        },
        {
          title: 'Percobaan kedua kita coba tulis sepanjang-panjangnya',
          email: 'pertama@email.com',
          tanggal: '2019-07-13',
          category: 'backlog'
        },
        {
          title: 'Percobaan kedua kita coba tulis sepanjang-panjangnya',
          email: 'pertama@email.com',
          tanggal: '2019-07-13',
          category: 'backlog'
        },
        {
          title: 'Percobaan ketiga',
          email: 'pertama@email.com',
          tanggal: '2019-07-13',
          category: 'backlog'
        }
      ]
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

