<template>
  <div>
    <RadioComponent :id="task._id" :isChecked="task.complete" @change="onCompleteChange" />
    <label :for="task._id">
      {{ task.text }} {{ task.author ? `(${task.author.username})` : '' }}
    </label>
    <ButtonComponent @click="onDeleteTask" :buttonText="'X'" />

    <ButtonComponent @click="showDetails" :buttonText="'show details'" />

    <div v-if="value1">
      <div class="row-mt-5">
        <div class="col-3">
          <div contenteditable="true" class="Tekst" id="field1">
            <h2>BackLog</h2>
          </div>
          <input id="input-2" v-model="newTask" required placeholder="BackLog" @keyup.enter="add">

          <button @click="add(1)" variant="primary" class="ml-3">Add</button>
          <!-- Backlog draggable component. Pass arrBackLog to list prop -->
          <draggable class="list-group kanban-column" :list="arrBackLog" group="tasks">
            <div class="list-group-item" v-for="element in arrBackLog" :key="element.name">
              {{ element.name }}
              <ButtonComponent @click="onDeleteTask2" :buttonText="'X'" />
              <p></p>
              <label>
                Start Time : <input type="datetime-local" name="meetingdate" class="liner"> End Time: <input
                  type="datetime-local" name="meetingdate" class="liner">
              </label>
              <br>
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div class="p-2 alert alert-primary">
          <div contenteditable="true" class="Tekst" id="field2">
            <h2>In Progress</h2>
          </div>
          <input id="input-3" v-model="newTask" required placeholder="In Progress" @keyup.enter="add">

          <button @click="add(2)" variant="primary" class="ml-3">Add</button>
          <!-- In Progress draggable component. Pass arrInProgress to list prop -->
          <draggable class="list-group kanban-column" :list="arrInProgress" group="tasks">
            <div class="list-group-item" v-for="element in arrInProgress" :key="element.name">
              {{ element.name }}
              <ButtonComponent @click="onDeleteTask3" :buttonText="'X'" />
              
              <p></p>
              <label>
                Start Time : <input type="datetime-local" name="meetingdate" class="liner"> End Time: <input
                  type="datetime-local" name="meetingdate" class="liner">
              </label>
              <br>
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div class="p-2 alert alert-warning">
          <div contenteditable="true" class="Tekst" id="field3">
            <h2>Testing</h2>
          </div>
          <input id="input-3" v-model="newTask" required placeholder="Testing" @keyup.enter="add">

          <button @click="add(3)" variant="primary" class="ml-3">Add</button>
          <!-- Testing draggable component. Pass arrTested to list prop -->
          <draggable class="list-group kanban-column" :list="arrTested" group="tasks">
            <div class="list-group-item" v-for="element in arrTested" :key="element.name">
              {{ element.name }}
              <ButtonComponent @click="onDeleteTask4" :buttonText="'X'" />
              <p></p>
              <label>
                Start Time : <input type="datetime-local" name="meetingdate" class="liner"> End Time: <input
                  type="datetime-local" name="meetingdate" class="liner">
              </label>
              <br>
            </div>

          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div contenteditable="true" class="Tekst" id="field4">
          <h2>Done</h2>
        </div>
        <input id="input-3" v-model="newTask" required placeholder="Done" @keyup.enter="add">

        <button @click="add(4)" variant="primary" class="ml-3">Add</button>
        <!-- Done draggable component. Pass arrDone to list prop -->
        <draggable class="list-group kanban-column" :list="arrDone" group="tasks">
          <div class="list-group-item" v-for="element in arrDone" :key="element.name">
            {{ element.name }}
            <ButtonComponent @click="onDeleteTask5" :buttonText="'X'" />
            <p></p>
            <label>
              Start Time : <input type="datetime-local" name="meetingdate" class="liner"> End Time: <input
                type="datetime-local" name="meetingdate" class="liner">
            </label>
            <br>
          </div>
        </draggable>
      </div>
    </div>
  </div>


</template>

<script>
import { Meteor } from 'meteor/meteor'
import RadioComponent from './common/RadioComponent.vue'
import ButtonComponent from './common/ButtonComponent.vue'
import draggable from "vuedraggable"

export default {
  components: {
    RadioComponent,
    ButtonComponent,
    draggable
  },
  props: {
    task: {
      type: null,
      required: true,
    }
  },
  data() {
    return {
      // for new tasks
      value1: false,
      newTask: "",
      // 4 arrays to keep track of our 4 statuses
      arrBackLog: [],
      arrInProgress: [],
      arrTested: [],
      arrDone: []
    };
  },
  methods: {
    initBackLog() {
      return new Promise((resolve, reject) => {
        Meteor.call('tasks.readArrBackLog', this.task.text, this.task._id, function (error, result) {
          if (error) reject(error);
          resolve(result);
        });
      }
      );
    },

    initInProgress() {
      return new Promise((resolve, reject) => {
        Meteor.call('tasks.readArrInProgress', this.task.text, this.task._id, function (error, result) {
          if (error) reject(error);
          resolve(result);
        });
      }
      );
    },

    initInTesting() {
      return new Promise((resolve, reject) => {
        Meteor.call('tasks.readArrTesting', this.task.text, this.task._id, function (error, result) {
          if (error) reject(error);
          resolve(result);
        });
      }
      );
    },

    initDone() {
      return new Promise((resolve, reject) => {
        Meteor.call('tasks.readArrDone', this.task.text, this.task._id, function (error, result) {
          if (error) reject(error);
          resolve(result);
        });
      }
      );
    },

    async spr1() {
      const result1 = await this.initBackLog();
      //const result2 = await this.initInProgress();
      //const result3 = await this.initInTesting();
      //const result4 = await this.initDone();

      //console.log("result="+result); 
      this.arrBackLog = [];
      //this.arrInProgress = [];
      //this.arrTested = [];
      //this.arrDone = [];

      Array.prototype.push.apply(this.arrBackLog, result1);
      //Array.prototype.push.apply(this.arrInProgress, result2);
      //Array.prototype.push.apply(this.arrTested, result3);
      //Array.prototype.push.apply(this.arrDone, result4);
      //Array.prototype.push(this.arrBackLog, result);
      //console.log("arrBackLog: "+this.arrBackLog);
    },

    async spr2() {
      //const result1 = await this.initBackLog();
      const result2 = await this.initInProgress();
      //const result3 = await this.initInTesting();
      //const result4 = await this.initDone();

      //console.log("result="+result); 
      //this.arrBackLog = [];
      this.arrInProgress = [];
      //this.arrTested = [];
      //this.arrDone = [];

      //Array.prototype.push.apply(this.arrBackLog, result1);
      Array.prototype.push.apply(this.arrInProgress, result2);
      //Array.prototype.push.apply(this.arrTested, result3);
      //Array.prototype.push.apply(this.arrDone, result4);
      //Array.prototype.push(this.arrBackLog, result);
      //console.log("arrBackLog: "+this.arrBackLog);
    },

    async spr3() {
      //const result1 = await this.initBackLog();
      //const result2 = await this.initInProgress();
      const result3 = await this.initInTesting();
      //const result4 = await this.initDone();

      //console.log("result="+result); 
      //this.arrBackLog = [];
      //this.arrInProgress = [];
      this.arrTested = [];
      //this.arrDone = [];

      //Array.prototype.push.apply(this.arrBackLog, result1);
      //Array.prototype.push.apply(this.arrInProgress, result2);
      Array.prototype.push.apply(this.arrTested, result3);
      //Array.prototype.push.apply(this.arrDone, result4);
      //Array.prototype.push(this.arrBackLog, result);
      //console.log("arrBackLog: "+this.arrBackLog);
    },

    async spr4() {
      //const result1 = await this.initBackLog();
      //const result2 = await this.initInProgress();
      //const result3 = await this.initInTesting();
      const result4 = await this.initDone();

      //console.log("result="+result); 
      //this.arrBackLog = [];
      //this.arrInProgress = [];
      //this.arrTested = [];
      this.arrDone = [];

      //Array.prototype.push.apply(this.arrBackLog, result1);
      //Array.prototype.push.apply(this.arrInProgress, result2);
      //Array.prototype.push.apply(this.arrTested, result3);
      Array.prototype.push.apply(this.arrDone, result4);
      //Array.prototype.push(this.arrBackLog, result);
      //console.log("arrBackLog: "+this.arrBackLog);
    },

    onCompleteChange(complete) {
      Meteor.call('tasks.setIsChecked', this.task._id, complete)
    },
    onDeleteTask() {
      Meteor.call('tasks.remove', this.task._id)
    },
    onDeleteTask2() {
      //Meteor.call('element.remove2', this.name )
      this.arrBackLog.splice(0, 1)
      Meteor.call('tasks.update', this.task.text, this.task._id, this.arrBackLog, this.arrInProgress, this.arrTested, this.arrDone);
    },
        onDeleteTask3() {
      //Meteor.call('element.remove2', this.name )
      this.arrInProgress.splice(0, 1)
      Meteor.call('tasks.update', this.task.text, this.task._id, this.arrBackLog, this.arrInProgress, this.arrTested, this.arrDone);
    },
        onDeleteTask4() {
      //Meteor.call('element.remove2', this.name )
      this.arrTested.splice(0, 1)
      Meteor.call('tasks.update', this.task.text, this.task._id, this.arrBackLog, this.arrInProgress, this.arrTested, this.arrDone);
    },
        onDeleteTask5() {
      //Meteor.call('element.remove2', this.name )
      this.arrDone.splice(0, 1)
      Meteor.call('tasks.update', this.task.text, this.task._id, this.arrBackLog, this.arrInProgress, this.arrTested, this.arrDone);
    },
    add: function (choice) {
      if (this.newTask) {
        if (choice == 1) {
          this.arrBackLog.push({ name: this.newTask });
          Meteor.call('tasks.update', this.task.text, this.task._id, this.arrBackLog, this.arrInProgress, this.arrTested, this.arrDone);
          this.newTask = "";
        }
        else if (choice == 2) {
          this.arrInProgress.push({ name: this.newTask });
          Meteor.call('tasks.update', this.task.text, this.task._id, this.arrBackLog, this.arrInProgress, this.arrTested, this.arrDone);
          this.newTask = "";
        }
        else if (choice == 3) {
          this.arrTested.push({ name: this.newTask });
          Meteor.call('tasks.update', this.task.text, this.task._id, this.arrBackLog, this.arrInProgress, this.arrTested, this.arrDone);
          this.newTask = "";
        }
        else if (choice == 4) {
          this.arrDone.push({ name: this.newTask });
          Meteor.call('tasks.update', this.task.text, this.task._id, this.arrBackLog, this.arrInProgress, this.arrTested, this.arrDone);
          this.newTask = "";
        }
        //this.saveData();
      }
    },
    showDetails: function () {
      //this.spr();
      if (this.value1 == false) {
        this.spr1();
        this.spr2();
        this.spr3();
        this.spr4();

        this.saveData();
        this.value1 = true;
        console.log(this.value1);
      }
      else if (this.value1 == true) {
        this.saveData();
        Meteor.call('tasks.update', this.task.text, this.task._id, this.arrBackLog, this.arrInProgress, this.arrTested, this.arrDone);
        this.value1 = false;
        console.log(this.value1);
        //this.arrBackLog = [];
      }
    },
    saveData: function () {
      Meteor.call('tasks.update', this.task.text, this.task._id, this.arrBackLog, this.arrInProgress, this.arrTested, this.arrDone);
    }
  }
}
</script>

<style>
/* light stylings for the kanban columns */
.kanban-column {
  min-height: 100px;
  min-width: 100px;
  background-color: blanchedalmond;
}

.list-group-item {
  background-color: pink
}
</style>




