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
      'addMember': function(projectId, memberId) {
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
      }
      //add methods to add/remove a colleague from the members array
  });
}