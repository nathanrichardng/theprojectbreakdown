if (Meteor.isClient) {
  // This code only runs on the client

  Template.addCoreTaskForm.events({
  	"submit .add-core-task": function(event) {
  		event.preventDefault();
  		var title = event.target.title.value;
  		var description = event.target.description.value;
  		var dueDate = event.target.dueDate.value;
      var project = this._id;
      var owner = "replacethiswithcodelater";
  		Tasks.insert({
  			title: title,
  			description: description,
  			members: [],
  			dueDate: dueDate,
  			parentTask: null,
        project: project,
        owner: owner
  		});

  		event.target.title.value = "";
  		event.target.description.value = "";
  	}
  });

  Template.coreTasks.helpers({
    coreTasks: function() {
      return Tasks.find({ parentTask: null, project: this._id });
    }
  });

  Template.addSubTaskForm.events({
    "submit .add-sub-task": function(event) {
      event.preventDefault();
      var title = event.target.title.value;
      var description = event.target.description.value;
      var dueDate = event.target.dueDate.value;
      var project = this.project;
      var owner = "replacethiswithcodelater";
      var parentTask = this._id;
      Tasks.insert({
        title: title,
        description: description,
        members: [],
        dueDate: dueDate,
        parentTask: parentTask,
        project: project,
        owner: owner
      });

      event.target.title.value = "";
      event.target.description.value = "";
    }
  });

  Template.subTasks.helpers({
    subTasks: function() {
      console.log(this._id);
      return Tasks.find({ parentTask: this._id});
    }
  });
}