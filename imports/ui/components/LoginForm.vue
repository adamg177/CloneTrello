<template>
  <div>
    <form
      class="login-form"
      @submit.prevent="onLoginSubmit"
    >
      <input
        required
        v-model="user.username"
      />
      <br>
      <br>
      <input
        required
        type="password"
        v-model="user.password"
      />
      <br>
      <br>
      <ButtonComponent 
        :buttonText="'Login'"
        @click="onLoginSubmit"
      />
    </form>
  </div>
</template>

<script>
import {Meteor} from 'meteor/meteor'
import ButtonComponent from "./common/ButtonComponent.vue"

export default {
  components: { 
    ButtonComponent
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
      }
    }
  },
  computed: {
    u() {
      return Meteor.user()
    }
  },
  methods: {
    onLoginSubmit() {
      const {username, password} = this.user
      Meteor.loginWithPassword(username, password)
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
    width: 100%;
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
  position: fixed; bottom: 0px; left: 0px ;z-index: 10;
}
.form-control {
    display: block;
    width: 100%;
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

</style>