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

  		Meteor.call('addCoreTask', newCoreTask);

  		event.target.title.value = "";
  		event.target.description.value = "";
  	}
  });

  Template.coreTasks.helpers({
    coreTasks: function() {
      return Tasks.find({ parentTask: null, project: this._id });
    }
  });

  Template.coreTask.events({
    "click .remove-task": function(event) {
      var taskId = this._id;
      Meteor.call('removeTask', taskId);
    },
    "click .remove-member": function(event) {
      event.preventDefault();
      console.log(Template.parentData());
      console.log(this);
      var taskId = Template.parentData()._id;
      var memberId = this.toString();
      Meteor.call('removeMemberFromTask', taskId, memberId);
    },
    "submit .add-members": function(event) {
      event.preventDefault();
      var taskId = this._id;
      console.log(taskId);
      selected = event.target.members.selectedOptions;
      for (var i = 0; i< selected.length; i++) {
        var member = selected[i].value;
        console.log(member);
        console.log(taskId);
        console.log("user", Meteor.user());
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
        owner: "replacethiswithcodelater",
        parentTask: this._id
      };

      Meteor.call('addSubTask', newSubTask);

      event.target.title.value = "";
      event.target.description.value = "";
    }
  });

  Template.subTasks.helpers({
    subTasks: function() {
      return Tasks.find({ parentTask: this._id});
    }
  });

  Template.subTask.events({
    "click .remove-task": function(event) {
      var taskId = this._id;
      Meteor.call('removeTask', taskId);
    },
    "click .remove-member": function(event) {
      event.preventDefault();
      console.log(Template.parentData());
      console.log(this);
      var taskId = Template.parentData()._id;
      var memberId = this.toString();
      Meteor.call('removeMemberFromTask', taskId, memberId);
    },
    "submit .add-members": function(event) {
      event.preventDefault();
      var taskId = this._id;
      console.log(taskId);
      selected = event.target.members.selectedOptions;
      for (var i = 0; i< selected.length; i++) {
        var member = selected[i].value;
        console.log(member);
        console.log(taskId);
        console.log("user", Meteor.user());
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
      console.log(Template.parentData());
      console.log(this);
      var taskId = Template.parentData()._id;
      var memberId = this.toString();
      Meteor.call('removeMemberFromTask', taskId, memberId);
    },
    "submit .add-members": function(event) {
      event.preventDefault();
      var taskId = this._id;
      console.log("task", this);
      selected = event.target.members.selectedOptions;
      for (var i = 0; i< selected.length; i++) {
        var member = selected[i].value;
        console.log(member);
        console.log(taskId);
        console.log("user", Meteor.user());
        Meteor.call('addMemberToTask', taskId, member);
      }
    }
  });

  //add helper and template to add/remove members
}