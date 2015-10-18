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
      }
  });
}