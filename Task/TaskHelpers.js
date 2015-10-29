if (Meteor.isClient) {
  // This code only runs on the client

  Template.addCoreTaskForm.events({
  	"submit .add-core-task": function(event) {
  		event.preventDefault();
      var newCoreTask = {
        title: event.target.title.value,
        description: event.target.description.value,
        dueDate: event.target.dueDate.value,
        project: this._id
      };

  		Meteor.call('addCoreTask', newCoreTask, function(error, result) {
        if(error) {
          //change this to alerts collection later
          Session.set("error", error.reason);
          $('#error-modal').modal('show');
        }
        if(!error) {
          event.target.title.value = "";
          event.target.description.value = "";
          event.target.dueDate.value = "";
        }
      });
  	}
  });

  Template.coreTasks.helpers({
    coreTasks: function() {
      return Tasks.find({ parentTask: null, project: this._id },{
        transform: function(doc) {
          var newDoc = doc;
          var dueDate = new Date(newDoc.dueDate.getTime() + newDoc.dueDate.getTimezoneOffset()*60000);
          newDoc.dueDate = dueDate.toDateString();
          return newDoc;
        }
      });
    }
  });

  Template.coreTask.events({
    "click .remove-task": function(event) {
      var taskId = this._id;
      Meteor.call('removeTask', taskId);
    },
    "click .remove-member": function(event) {
      event.preventDefault();
      var taskId = Template.parentData()._id;
      var memberId = this.toString();
      Meteor.call('removeMemberFromTask', taskId, memberId);
    },
    "submit .add-members": function(event) {
      event.preventDefault();
      var taskId = this._id;
      selected = event.target.members.selectedOptions;
      for (var i = 0; i< selected.length; i++) {
        var member = selected[i].value;
        Meteor.call('addMemberToTask', taskId, member);
      }
    }
  });

  Template.addSubTaskForm.events({
    "submit .add-sub-task": function(event) {
      event.preventDefault();

      var newSubTask = {
        title: event.target.title.value,
        description: event.target.description.value,
        dueDate: event.target.dueDate.value,
        project: this.project,
        owner: Meteor.userId(),
        parentTask: this._id
      };
      Meteor.call('addSubTask', newSubTask, function(error, result) {
        if(error) {
          //change this to alerts collection later
          Session.set("error", error.reason);
          $('#error-modal').modal('show');
        }
        if(!error) {
          event.target.title.value = "";
          event.target.description.value = "";
          event.target.dueDate.value = "";
        }
      });
    }
  });

  Template.subTasks.helpers({
    subTasks: function() {
      return Tasks.find({ parentTask: this._id}, {
          transform: function(doc) {
            var newDoc = doc;
            var owner = Meteor.users.findOne({ _id: doc.owner });
            var dueDate = new Date(newDoc.dueDate.getTime() + newDoc.dueDate.getTimezoneOffset()*60000);
            
            newDoc.dueDate = dueDate.toDateString();
            newDoc.owner = owner.profile.firstName + " " + owner.profile.lastName;
            
            return newDoc;
          }
      });
    }
  });

  Template.subTask.events({
    "click .remove-sub-task": function(event) {
      var taskId = this._id;
      Meteor.call('removeTask', taskId);
    },
    "click .remove-member": function(event) {
      event.preventDefault();
      var taskId = Template.parentData()._id;
      var memberId = this.toString();
      Meteor.call('removeMemberFromTask', taskId, memberId);
    },
    "submit .add-members": function(event) {
      event.preventDefault();
      var taskId = this._id;
      selected = event.target.members.selectedOptions;
      for (var i = 0; i< selected.length; i++) {
        var member = selected[i].value;
        Meteor.call('addMemberToTask', taskId, member);
      }
    }
  });

  Template.task.events({
    "click .remove-task": function(event) {
      var taskId = this._id;
      var project = this.project;
      var parentTask = this.parentTask;
      Meteor.call('removeTask', taskId, function(error, result) {
        if(error) {
          Session.set("error", error.reason);
          $('#error-modal').modal('show');
        }
        else {
          if(parentTask) {
            Router.go('/tasks/'+parentTask);
          }
          else {
            Router.go('/projects/'+project);
          }
        }
      });
    },
    "click .remove-member": function(event) {
      event.preventDefault();
      var taskId = Template.parentData()._id;
      var memberId = this.toString();
      Meteor.call('removeMemberFromTask', taskId, memberId);
    },
    "submit .add-members": function(event) {
      event.preventDefault();
      var taskId = this._id;
      selected = event.target.members.selectedOptions;
      for (var i = 0; i< selected.length; i++) {
        var member = selected[i].value;
        console.log(member);
        console.log(taskId);
        console.log("user", Meteor.user());
        Meteor.call('addMemberToTask', taskId, member);
      }
    },
    "change .task-status": function(event) {
      event.preventDefault();
      var taskId = this._id;
      var newStatus = event.target.value;
      Meteor.call('updateTaskStatus', taskId, newStatus);
    }
  });

  Template.updateTaskForm.events({
    "submit .update-task": function(event) {
      event.preventDefault();
      var taskId = this._id;
      console.log(this._id);
      var updatedTask = {
        title: event.target.updatedTaskTitle.value,
        description: event.target.updatedTaskDescription.value,
        dueDate: Date.parse(event.target.updatedTaskDueDate.value),
        owner: event.target.member.value,
        _id: taskId
      };

      console.log(updatedTask); 
      
      Meteor.call('updateTask', updatedTask, function(error, result) {
        if(error) {
          //change this to alerts collection later
          console.log(error.reason);
          Session.set("error", error.reason);
          $('#error-modal').modal('show');
        }
        if(!error) {
          Session.set("message", "Task Updated");
          console.log("Task Updated");
          $('#message-modal').modal('show');
        }
      });
    }
  });
}