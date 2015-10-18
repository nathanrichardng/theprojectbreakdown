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
  		var newProject = {
  			title: event.target.title.value,
  			description: event.target.description.value,
  			dueDate: event.target.dueDate.value
  		} 
  		
  		Meteor.call('addProject', newProject);

  		event.target.title.value = "";
  		event.target.description.value = "";
  	}
  });
}