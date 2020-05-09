<template>
  <div class="container">
    <div id="login-form">
      <div class="tab">
        <button class="tablinks" v-on:click="loginForm" v-bind:class="{active: loginActive}">Login</button>
        <button class="tablinks" v-on:click="regForm" v-bind:class="{active: !loginActive}">Register</button>
      </div>
      <!-- form login -->
      <form @submit.prevent="login">
        <h1>{{title}}</h1>
        <label v-if="register" for="input-name">Full Name</label>
        <input
          v-if="register"
          type="text"
          placeholder="full name"
          id="input-name"
          v-model="fullNameText"
        />
        <label for="input-email">User Email</label>
        <input type="text" placeholder="user@email.com" id="input-email" v-model="emailText" />
        <label for="input-password">User Password</label>
        <input type="password" placeholder="password" id="input-password" v-model="passwordText" />
        <button type="submit">{{submit}}</button>
        <div class="google">
          <p>-or Sign in with Google-</p>
          <GoogleLogin
            :params="params"
            :renderParams="renderParams"
            :onSuccess="onSuccess"
          ></GoogleLogin>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";

export default {
  props: ["isLogin"],
  data() {
    return {
      register: false,
      title: "Login",
      submit: "Login",
      loginActive: true,
      emailText: "",
      passwordText: "",
      fullNameText: "",
      params: {
        clientId:
          "193359553146-vuev0t0g4batnp58od0cf2jg95jdnn42.apps.googleusercontent.com"
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    };
  },
  components: {
    GoogleLogin
  },
  methods: {
    login() {
      if (this.title == "Login") {
        this.$emit("login", {
          email: this.emailText,
          password: this.passwordText
        });
      } else {
        this.$emit("register", {
          fullName: this.fullNameText,
          email: this.emailText,
          password: this.passwordText
        });
      }
    },

    onSuccess(googleUser) {
      console.log("sampai ke login");
      var id_token = googleUser.getAuthResponse().id_token;
      this.$emit("googleSign", id_token);
    },

    loginForm() {
      this.loginActive = true;
      this.title = "Login";
      this.submit = "Login";
      this.register = false;
    },
    regForm() {
      this.loginActive = false;
      this.title = "Register";
      this.submit = "Register";
      this.register = true;
    }
  }
};
</script>

<style scoped>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 30px;
}

#login-form {
  border: 1px solid #dedede;
  background-color: rgb(54, 53, 53);
}

.tab {
  padding-left: 10px;
  overflow: hidden;
  background-color: rgb(54, 53, 53);
}

.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
  color: white;
}

.tab button.active {
  background-color: white;
  color: black;
  border: none;
}

.tab button:hover {
  background-color: #ddd;
  color: rgb(54, 53, 53);
}

form {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  margin: 0 10px;
  border: none;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  background-color: white;
}

form button {
  border: none;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition: 0.3s;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  background-color: #369ef4;
  color: white;
}

form button:hover {
  background-color: #0175d4;
}

label,
input {
  margin: 0 20px;
}

input {
  font-size: 17px;
}

label {
  margin-top: 15px;
  margin-bottom: 5px;
}

h1,
.google {
  margin: 20px 20px;
}

form button {
  width: 30%;
  margin: 20px 20px;
}

.google {
  margin-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8em;
}

.g-signin2 {
  width: 50%;
}
</style>