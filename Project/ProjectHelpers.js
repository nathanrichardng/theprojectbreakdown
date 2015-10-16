if (Meteor.isClient) {
  // This code only runs on the client
  Template.projects.helpers({
    projects: function() {
    	return Projects.find({});
    }
  });

  Template.addProjectForm.events({
  	"submit .add-project": function(event) {
  		event.preventDefault();
  		var title = event.target.title.value;
  		var description = event.target.description.value;
  		var dueDate = event.target.dueDate.value;
  		Projects.insert({
  			title: title,
  			description: description,
  			members: [],
  			dueDate: dueDate,
  			tasks: []
  		});

  		event.target.title.value = "";
  		event.target.description.value = "";
  	}
  });
}