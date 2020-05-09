<template>
  <div>
    <div class="container">
      <div v-if="addForm" id="input-data">
        <div id="input-box">
          <div id="title-input">Add Task</div>
          <label for="input-task">Task Name/ Title</label>
          <input
            type="text"
            placeholder="e.g. Create new todos"
            id="input-task"
            v-model="titleText"
          />
          <button class="blue-button" v-on:click="saveData">Add</button>
          <button class="red-button" v-on:click="cancel">Cancel</button>
        </div>
      </div>
      <a href="#" type="button">KANBAN</a>
      <div v-if="isLogin" id="nav">
        <button id="addTask" v-on:click="addTask">Add New Task</button> &nbsp;
        <button type="button" class="red-button" v-on:click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["isLogin", "addForm"],
  data() {
    return {
      titleText: ""
    };
  },
  methods: {
    addTask() {
      this.$emit("addFormShow", true);
      this.titleText = "";
    },
    saveData() {
      this.$emit("addTask", { title: this.titleText });
    },
    cancel() {
      this.$emit("addFormShow", false);
    },
    logout() {
      localStorage.removeItem("access_token");
      this.$emit("loginStatus", false);
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  background-color: rgb(54, 53, 53);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

a {
  font-family: "Righteous";
  font-size: 32px;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
}

button {
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition: 0.3s;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}

#addTask {
  background-color: white;
  color: black;
  border: 2px solid #4caf50; /* Green */
}

#addTask:hover {
  background-color: rgb(223, 217, 217);
}

.red-button {
  background-color: #f44336;
  color: white;
}

.red-button:hover {
  background-color: #b40c00;
}

#nav {
  padding: 10px 20px;
}

#input-data {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  width: 100%;
  height: 100%;
  background-color: rgba(55, 55, 55, 0.6);
  text-align: center;
  font-size: 18px;
}

#input-data #input-box {
  margin: 150px auto;
  background-color: white;
  width: 300px;
  text-align: left;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  border: 1px solid #dedede;
}

#input-box label,
#input-box input,
#input-box button {
  margin: 0 10px;
  margin-top: 20px;
}

#input-box label {
  font-size: 16px;
}

#input-box input {
  width: 89%;
  font-size: 18px;
  margin-top: 5px;
}

#input-box button {
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition: 0.3s;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  margin-bottom: 10px;
}

#input-box #title-input {
  background-color: #369ef4;
  color: white;
  padding: 10px 10px;
  font-family: "Righteous";
  margin-bottom: 10px;
  text-align: center;
}

.blue-button {
  background-color: #369ef4;
  color: white;
}

.blue-button:hover {
  background-color: #007fe7;
}
</style>