<template>
  <div class="app-wrapper">
    <template v-if="user">
      <div class="app-header">
        <div>
          Clone Trello
        </div>
        <LogoutForm 
          :user="user"
        />
      </div>
      <TaskForm 
        :users="userList"
      />
      <div 
        class="loading"
        v-if="!$subReady.tasks"  
      >Loading tasks...</div>
      <Task
        v-for="(task, i) in tasks"
        :key="i"
        :task="task"
      />
      <TaskCount
        v-if="tasks && tasks.length" 
        :tasks="tasks"
      />
      <ButtonComponent
        :buttonText="toggleCompleteText"
        @click="toggleHideComplete"
      />
    </template>
    
    <template v-else>
      
      <center>
        <h1>Login</h1>
      <LoginForm/>
      <br>
      <RegisterForm/>
      </center>
    </template>
  </div>
</template>

<script>
import {TasksCollection} from '../db/collections/TasksCollection'
import Task from './components/Task.vue'
import TaskForm from './components/TaskForm.vue'
import TaskCount from './components/TaskCount.vue'
import ButtonComponent from './components/common/ButtonComponent.vue'
import LoginForm from './components/LoginForm.vue'
import LogoutForm from './components/LogoutForm.vue'
import RegisterForm from './components/RegisterForm.vue'

export default {
  components: {
    Task,
    TaskForm,
    TaskCount,
    ButtonComponent,
    RegisterForm,
    LoginForm,
    LogoutForm,
  },
  data() {
    return {
      hideComplete: false,
    }
  },
  computed: {
    toggleCompleteText() {
      return this.hideComplete ? 'Show all' : 'Hide complete'
    },
  },
  methods: {
    toggleHideComplete() {
      this.hideComplete = !this.hideComplete
    }
  },
  meteor: {
    $subscribe: {
      'tasks': [],
      'allUsers': [],
    },
    tasks() {
      if (!this.user) return
      const userIdFilter = {userId: this.user._id}
      const filter = this.hideComplete ? {
        ...userIdFilter,
        complete: false,
      } : userIdFilter
      return TasksCollection.find(filter, {sort: {createdAt: -1}}).fetch()
    },
    // Meteor.userId() return undefined
    // although got eg. Meteor.userId in local storage after login
    user() {
      const userId = Meteor.userId()
      if (!userId) return
      return Meteor.users.findOne({_id: userId})
    },
    userList() {
      if (!this.user) return
      return Meteor.users.find({_id: {$ne: this.user._id}})
    },
  },
}
</script>

<style>
  body {
    font-family: sans-serif;
    padding: 10px;
  }
  body {background-color: rgba(78, 224, 234, 0.116);}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-control {
    display: block;
    width: 80%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.375rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.authors{
  position: fixed; bottom: 0px; left: 0px ;z-index: 10;  text-align: justify;
  text-justify: inter-word;font-size: medium;
}


</style>
