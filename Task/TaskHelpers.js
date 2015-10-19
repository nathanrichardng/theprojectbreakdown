if (Meteor.isClient) {
  // This code only runs on the client

  Template.addCoreTaskForm.events({
  	"submit .add-core-task": function(event) {
  		event.preventDefault();

      var newCoreTask = {
        title: event.target.title.value,
        description: event.target.description.value,
        dueDate: event.target.dueDate.value,
        project: this._id,
        owner: "replacethiswithcodelater"
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
    }
  });

  Template.task.events({
    "click .remove-task": function(event) {
      var taskId = this._id;
      Meteor.call('removeTask', taskId);
    }
  });

  //add helper and template to add/remove members
}