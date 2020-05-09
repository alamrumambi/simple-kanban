<template>
  <div class="container">
    <div class="row">
      <div v-if="popForm" id="input-data">
        <div v-if="editForm" id="input-box">
          <div id="title-input">Edit Task</div>
          <label for="input-task">Task Name/ Title</label>
          <input
            type="text"
            placeholder="e.g. Create new todos"
            id="input-task"
            v-model="titleText"
          />
          <button class="blue-button" v-on:click="saveData">Update</button>
          <button v-on:click="cancel" class="red-button">Cancel</button>
        </div>
        <div v-if="deleteForm" id="input-box" style="text-align: center;">
          <div id="title-input" style="background-color: #f44336">Delete this task?</div>
          <button class="blue-button" v-on:click="deleteTask">Yes</button>
          <button v-on:click="cancel" class="red-button">No</button>
        </div>
        <div v-if="moveForm" id="input-box" style="text-align: center;">
          <div id="title-input" style="background-color: #f44336">{{moveAction}} to {{moveText}}?</div>
          <button class="blue-button" v-on:click="moveTask">Yes</button>
          <button v-on:click="cancel" class="red-button">No</button>
        </div>
        <div v-if="authForm" id="input-box" style="text-align: center;">
          <div id="title-input" style="background-color: #f44336">Only Working for your tasks</div>
          <button v-on:click="cancel" class="red-button">Close</button>
        </div>
      </div>
      <!-- backlog -->
      <div v-for="(category, index) in categories" :key="index" class="col-2 col-s-5 col-t-4 tab">
        <div class="item">
          <div class="title">
            <p>{{category.name}}</p>
          </div>
          <div class="tabContent">
            <!-- test content 1 -->
            <div v-for="(data, index) in category.data" :key="index" class="content">
              <p>{{data.title}}</p>
              <hr />
              <div class="contentInfo">
                <div class="info">
                  <p>{{data.User.email}}</p>
                  <p>{{data.createDate}}</p>
                  <button v-if="data.category!=='backlog'" v-on:click="showBackForm(data.id, data.category)" class="event-button">
                    ↻
                  </button>
                </div>
                <div v-if="!popForm" class="event">
                  <button v-on:click="showDelForm(data.id)" class="event-button">
                    ❌
                  </button>
                  <button v-on:click="showEditForm(data.id, data.title)" class="event-button">
                    ✎
                  </button>
                  <button v-if="data.category!=='done'" v-on:click="showMoveForm(data.id, data.category)" class="event-button">
                    ➜
                  </button>
                  <!-- <button>icon</button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "popForm", "authForm"],
  data() {
    return {
      titleText: "",
      idText: "",
      moveText: "",
      moveAction: "",
      moveForm: false,
      editForm: false,
      deleteForm: false,
      categories: [
        {
          name: "Backlog",
          data: this.data.backlogs
        },
        {
          name: "To-do",
          data: this.data.todos
        },
        {
          name: "Doing",
          data: this.data.doing
        },
        {
          name: "Done",
          data: this.data.done
        }
      ]
    };
  },
  methods: {
    saveData() {
      this.$emit("updateTask", { title: this.titleText, id: this.idText });
    },
    moveTask() {
      this.$emit("moveTask", { category: this.moveText, id: this.idText });
    },
    showEditForm(id, title) {
      this.$emit("popFormShow", true);
      this.editForm = true;
      this.deleteForm = false;
      this.moveForm = false;
      this.idText = id;
      this.titleText = title;
    },
    showDelForm(id) {
      this.$emit("popFormShow", true);
      this.idText = id;
      this.deleteForm = true;
      this.editForm = false;
      this.moveForm = false;
    },
    showMoveForm(id, category) {
      this.$emit("popFormShow", true);
      this.idText = id;
      this.moveAction = 'Move';
      if(category == 'backlog') this.moveText = 'to-do';
      else if(category == 'to-do') this.moveText = 'doing';
      else if(category == 'doing') this.moveText = 'done';
      this.moveForm = true;
      this.editForm = false;
      this.deleteForm = false;
    },
    showBackForm(id, category) {
      this.$emit("popFormShow", true);
      this.idText = id;
      this.moveAction = 'Back';
      if(category == 'to-do') this.moveText = 'backlog';
      else if(category == 'doing') this.moveText = 'to-do';
      else if(category == 'done') this.moveText = 'doing';
      this.moveForm = true;
      this.editForm = false;
      this.deleteForm = false;
    },
    deleteTask() {
      this.$emit("deleteTask", this.idText);
    },
    cancel() {
      this.$emit("popFormShow", false);
      this.$emit("authFormShow", false);
      this.editForm = false;
      this.deleteForm = false;
      this.moveForm = false;
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 30px;
}

* {
  box-sizing: border-box;
}

.row {
  width: 90%;
  margin: auto;
}

.row::after {
  content: "";
  clear: both;
  display: table;
}

[class*="col-"] {
  float: left;
  padding: 15px;
}

/* For mobile phones: */
[class*="col-"] {
  width: 100%;
}

@media only screen and (min-width: 600px) {
  /* For tablets: */
  .col-s-1 {
    width: 8.33%;
  }
  .col-s-2 {
    width: 16.66%;
  }
  .col-s-3 {
    width: 25%;
  }
  .col-s-4 {
    width: 33.33%;
  }
  .col-s-5 {
    width: 48%;
  }
  .col-s-6 {
    width: 50%;
  }
  .col-s-7 {
    width: 58.33%;
  }
  .col-s-8 {
    width: 66.66%;
  }
  .col-s-9 {
    width: 75%;
  }
  .col-s-10 {
    width: 83.33%;
  }
  .col-s-11 {
    width: 91.66%;
  }
  .col-s-12 {
    width: 100%;
  }
}

@media only screen and (min-width: 900px) {
  /* For desktop: */
  .col-t-1 {
    width: 8.33%;
  }
  .col-t-2 {
    width: 23%;
  }
  .col-t-3 {
    width: 25%;
  }
  .col-t-4 {
    width: 31.33%;
  }
  .col-t-5 {
    width: 41.66%;
  }
  .col-t-6 {
    width: 50%;
  }
  .col-t-7 {
    width: 58.33%;
  }
  .col-t-8 {
    width: 66.66%;
  }
  .col-t-9 {
    width: 75%;
  }
  .col-t-10 {
    width: 83.33%;
  }
  .col-t-11 {
    width: 91.66%;
  }
  .col-t-12 {
    width: 100%;
  }
}

@media only screen and (min-width: 1150px) {
  /* For desktop: */
  .col-1 {
    width: 8.33%;
  }
  .col-2 {
    width: 23%;
  }
  .col-3 {
    width: 25%;
  }
  .col-4 {
    width: 33.33%;
  }
  .col-5 {
    width: 41.66%;
  }
  .col-6 {
    width: 50%;
  }
  .col-7 {
    width: 58.33%;
  }
  .col-8 {
    width: 66.66%;
  }
  .col-9 {
    width: 75%;
  }
  .col-10 {
    width: 83.33%;
  }
  .col-11 {
    width: 91.66%;
  }
  .col-12 {
    width: 100%;
  }
}

.tab {
  border: 1px solid #dedede;
  margin: 1% 1%;
  padding-top: 0;
}

.tab,
.title {
  background-color: rgb(54, 53, 53);
}

hr {
  border: 1px solid #ebebeb;
}

.title {
  color: white;
  font-family: "Righteous";
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
  margin-bottom: 10px;
}

#input-box label {
  font-size: 16px;
}

#input-box input {
  width: 93%;
  font-size: 18px;
  margin-top: 5px;
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

.red-button {
  background-color: #f44336;
  color: white;
}

.red-button:hover {
  background-color: #b40c00;
}

.blue-button {
  background-color: #369ef4;
  color: white;
}

.blue-button:hover {
  background-color: #007fe7;
}

#input-box #title-input {
  background-color: #369ef4;
  color: white;
  padding: 10px 10px;
  font-family: "Righteous";
  margin-bottom: 10px;
  text-align: center;
}

.tabContent {
  overflow: auto;
  max-height: 1000px;
}

.content {
  background-color: white;
  margin-bottom: 5px;
  padding: 10px;
  padding-top: 0;
  border-radius: 4px;
  border: 1px solid #dedede;
}

.contentInfo {
  /* border: 1px solid #dedede; */
  display: flex;
  justify-content: space-between;
}

.info {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-style: italic;
  font-size: 0.7em;
  color: #7e7a7a;
}

.info p {
  margin: 0;
}

.event {
  display: flex;
  flex-direction: column;
}

.event-button {
  background-color: unset;
  padding: 0;
  margin: 0;
  font-size: 15px;
}

.tooltiptext {
  opacity: 0;
  transition: opacity 1s;
  /* visibility: hidden; */
  width: 70px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

.tooltiptext::after {
  content: " ";
  position: absolute;
  top: 50%;
  right: 100%; /* To the left of the tooltip */
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}

.event-button:hover .tooltiptext {
  /* visibility: visible; */
  opacity: 1;
}
</style>>