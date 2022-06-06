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

    console.log(arrBackLog)

    var newvalues = { $set: {
      BackLog: arrBackLog, 
      InProgress: arrInProgress,
      Testing: arrTesting,
      Done: arrDone
    } };

    TasksCollection.update({text: text, _id: id}, newvalues)


    console.log(TasksCollection.find({text: text, _id: id}))
  }

})