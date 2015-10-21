if (Meteor.isClient) {
  // This code only runs on the client
  Template.projects.helpers({
    projects: function() {
    	return Projects.find({}, {
        transform: function(doc) {
          var newDoc = doc;
          newDoc.dueDate = newDoc.dueDate.toDateString();
          return doc;
        }
      });
    }
  });

  Template.project.events({
    "click .remove-project": function(event) {
      var projectId = this._id;
      console.log(projectId);
      Meteor.call('removeProject', projectId);
    },
    "click .remove-member": function(event) {
      event.preventDefault();
      console.log(Template.parentData());
      console.log(this);
      var projectId = Template.parentData()._id;
      var memberId = this.toString();
      Meteor.call('removeMemberFromProject', projectId, memberId);
    },
    "submit .add-members": function(event) {
      event.preventDefault();
      var projectId = this._id;
      console.log(projectId);
      var selected = event.target.members.selectedOptions;
      for (var i = 0; i< selected.length; i++) {
        var member = selected[i].value;
        console.log(member);
        console.log(projectId);
        console.log("user", Meteor.user());
        Meteor.call('addMemberToProject', projectId, member);
      }
    },
    "change .project-status": function(event) {
      event.preventDefault();
      var projectId = this._id;
      var newStatus = event.target.value;
      console.log(newStatus);
      Meteor.call('updateProjectStatus', projectId, newStatus);
    }
  })

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

  Template.selectColleagues.helpers({
    colleagues: function() {
      console.log(Meteor.user());
      return Meteor.users.find({_id: { $in: Meteor.user().colleagues } });
    }
  });

  Template.member.helpers({
    member: function() {
      console.log(this);
      var userId = this.toString();
      //change this to return user name once profiles are set up
      return Meteor.users.findOne({_id: userId}).emails[0].address;
    }
  })
}