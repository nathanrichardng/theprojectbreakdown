if (Meteor.isServer) {
  Meteor.methods({
      'addProject': function(project){
          var currentUser = Meteor.userId();
          Projects.insert({
            title: project.title,
            description: project.description,
            dueDate: project.dueDate,
            members: [currentUser],
            tasks: [],
            pm: currentUser
          });
      },
      'removeProject': function(projectId) {
        var currentUser = Meteor.userId();
        Projects.update({
          _id: projectId,
          pm: currentUser
        }, 
        {
          $set: { removed: true }
        });
      },
      'addMemberToProject': function(projectId, memberId) {
        var isColleague = Meteor.users.findOne({
          _id: this.userId,
          colleagues: memberId
        });

        if (isColleague) {
          Projects.update({ 
            _id: projectId, 
            pm: this.userId 
          },
          {
            $addToSet: { members: memberId }
          });
        }
      },
      'removeMemberFromProject': function(projectId, memberId) {
        //dont let pm remove themself from project.
        //need to make another method elsewhere to allow them to reassign a new pm
        if(memberId == this.userId) {
          return false;
        }
        Projects.update({ 
          _id: projectId, 
          pm: this.userId 
        },
        {
          $pull: { members: memberId }
        });
      },
      'updateProjectStatus': function(projectId, newStatus) {
        var currentUser = Meteor.userId();
        Projects.update({
          _id: projectId,
          pm: currentUser
        },
        {
          $set: { status: newStatus }
        });
      }
  });
}