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
          window.alert(error.reason);
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
          newDoc.dueDate = newDoc.dueDate.toDateString();
          return doc;
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
          window.alert(error.reason);
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
      return Tasks.find({ parentTask: this._id});
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

  //add helper and template to add/remove members
}