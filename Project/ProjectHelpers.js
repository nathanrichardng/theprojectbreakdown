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

  Template.addMembersForm.helpers({
    colleagues: function() {
      console.log(Meteor.user());
      return Meteor.users.find({_id: { $in: Meteor.user().colleagues } });
    }
  });

  Template.addMembersForm.events({
    "submit .add-members": function(event) {
      event.preventDefault();
      console.log(this._id);
      selected = event.target.members.selectedOptions;
      for (var i = 0; i< selected.length; i++) {
        var member = selected[i].value;
        console.log(member);
        Meteor.call('addMember', this._id, member);
      }
    }
  });
}