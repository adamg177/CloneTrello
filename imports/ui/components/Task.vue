<template>
  <div>
    <RadioComponent
      :id="task._id"
      :isChecked="task.complete"
      @change="onCompleteChange"
    />
    <label :for="task._id">
    {{task.text}} {{task.author ? `(${task.author.username})` : ''}}
    </label>
    <ButtonComponent 
      @click="onDeleteTask"
      :buttonText="'X'"
    />
    <ButtonComponent
      @click="showDetails"
      :buttonText="'show details'"
    />

    <div v-if="value1">
             <div class="row mt-5">
      <div class="col-3">
        <div class="p-2 alert alert-secondary">
          <h3>Back Log</h3>
           <input
          id="input-2"
          v-model="newTask"
          required
          placeholder="BackLog"
          @keyup.enter="add"
        >
          <button @click="add(1)" variant="primary" class="ml-3">Add</button>
          <!-- Backlog draggable component. Pass arrBackLog to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrBackLog"
            group="tasks"
          >
            <div
              class="list-group-item"
              v-for="element in arrBackLog"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div class="p-2 alert alert-primary">
          <h3>In Progress</h3>
           <input
          id="input-3"
          v-model="newTask"
          required
          placeholder="In Progress"
          @keyup.enter="add">
          
          <button @click="add(2)" variant="primary" class="ml-3">Add</button>
          <!-- In Progress draggable component. Pass arrInProgress to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrInProgress"
            group="tasks"
          >
            <div
              class="list-group-item"
              v-for="element in arrInProgress"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div class="p-2 alert alert-warning">
          <h3>Testing</h3>
          <input
          id="input-3"
          v-model="newTask"
          required
          placeholder="Testing"
          @keyup.enter="add">
          
          <button @click="add(3)" variant="primary" class="ml-3">Add</button>
          <!-- Testing draggable component. Pass arrTested to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrTested"
            group="tasks"
          >
            <div
              class="list-group-item"
              v-for="element in arrTested"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div class="p-2 alert alert-success">
          <h3>Done</h3>
          <input
          id="input-3"
          v-model="newTask"
          required
          placeholder="Done"
          @keyup.enter="add">
          
          <button @click="add(4)" variant="primary" class="ml-3">Add</button>
          <!-- Done draggable component. Pass arrDone to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrDone"
            group="tasks"
          >
            <div
              class="list-group-item"
              v-for="element in arrDone"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>
     </div>
    </div>
   </div>

</template>

<script>
import {Meteor} from 'meteor/meteor'
import RadioComponent from './common/RadioComponent.vue'
import ButtonComponent from './common/ButtonComponent.vue'
import draggable from "vuedraggable";

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
    onCompleteChange(complete) {
      Meteor.call('tasks.setIsChecked', this.task._id, complete)
    },
    onDeleteTask() {
      Meteor.call('tasks.remove', this.task._id)
    },
    add: function(choice) {
      if (this.newTask) 
      {
        if (choice == 1)
        {
            this.arrBackLog.push({ name: this.newTask });
            this.newTask = "";
        }
        else if (choice == 2)
        {
          this.arrInProgress.push({ name: this.newTask });
          this.newTask = "";
        }
        else if (choice == 3)
        {
          this.arrTested.push({ name: this.newTask });
          this.newTask = "";
        }
        else if (choice == 4)
        {
          this.arrDone.push({ name: this.newTask });
          this.newTask = "";
        }
        
      }
    },
    showDetails: function()
    {
      if (this.value1 == false)
      {
        this.value1 = true;
        console.log(this.value1);
      }
      else if (this.value1 == true)
      {
        this.value1 = false;
        console.log(this.value1);
      }
    }
  }
}
</script>

<style>
/* light stylings for the kanban columns */
.kanban-column {
  min-height: 100px;
  min-width: 100px;
  background-color:blanchedalmond;
}

</style>




