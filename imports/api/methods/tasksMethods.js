import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'
import {TasksCollection} from '../../db/collections/TasksCollection'

Meteor.methods({
  'tasks.insert'(text, assignedUser, arrBackLog, arrInProgress, arrTesting, arrDone) {
    check(text, String)
    if (!this.userId) {
      throw new Meteor.Error('Not authorized')
    }
    let author
    if (assignedUser) {
      author = Meteor.users.findOne({_id: this.userId})
    }
    TasksCollection.insert({
      text,
      complete: false,
      createdAt: new Date(),
      userId: assignedUser ? assignedUser._id : this.userId,
      author: assignedUser ? author : null,
      BackLog: [],
      InProgress: [],
      Testing: [],
      Done: []
    })
  },

  'tasks.remove'(id) {
    check(id, String)
    const userId = this.userId
    if (!userId) {
      throw new Meteor.Error('Not authorized')
    }
    const task = TasksCollection.findOne({_id: id, userId})
    if (!task) {
      throw new Meteor.Error('Access denied')
    }
    TasksCollection.remove(id)
  },

  'element.remove2'(id,name) {
    check(id,name, String)
    //const task = TasksCollection.findOne({_id: id, userId})
    //if (!task) {
    //  throw new Meteor.Error('Access denied')
    //}
    //TasksCollection.remove(id)
    query = {name:name , _id:id}
    const Task = TasksCollection.find(query).fetch()
    TasksCollection.remove(name)
  },

  'tasks.setIsChecked'(id, complete) {
    check(id, String)
    check(complete, Boolean)
    const userId = this.userId
    if (!userId) {
      throw new Meteor.Error('Not authorized')
    }
    const task = TasksCollection.findOne({_id: id, userId})
    if (!task) {
      throw new Meteor.Error('Access denied')
    }
    TasksCollection.update(id, {
      $set: {
        complete,
      },
    })
  },

  'tasks.update'(text, id, arrBackLog, arrInProgress, arrTesting, arrDone) {
    check(text, String)
    if (!id) {
      throw new Meteor.Error('Not authorized')
    }

    var newvalues = { $set: {
      BackLog: arrBackLog, 
      InProgress: arrInProgress,
      Testing: arrTesting,
      Done: arrDone
    } };

    TasksCollection.update({text: text, _id: id}, newvalues)

  },

  'tasks.readArrBackLog'(text, id)
  {
    check(text, String)
    if (!id) {
      throw new Meteor.Error('Not authorized')
    }

    query = {text: text, _id: id} ;
  
    //console.log(TasksCollection.find(query).fetch()[0].BackLog)
    return TasksCollection.find(query).fetch()[0].BackLog
  },

  'tasks.readArrInProgress'(text, id)
  {
    check(text, String)
    if (!id) {
      throw new Meteor.Error('Not authorized')
    }

    query = {text: text, _id: id} ;
    
    tab = TasksCollection.find(query).fetch()[0].InProgress
    return tab
  },

  'tasks.readArrTesting'(text, id)
  {
    check(text, String)
    if (!id) {
      throw new Meteor.Error('Not authorized')
    }

    query = {text: text, _id: id} ;
    
    tab = TasksCollection.find(query).fetch()[0].Testing
    return tab
  },

  'tasks.readArrDone'(text, id)
  {
    check(text, String)
    if (!id) {
      throw new Meteor.Error('Not authorized')
    }

    query = {text: text, _id: id} ;
    
    tab = TasksCollection.find(query).fetch()[0].Done
    return tab
  }

})