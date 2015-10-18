if (Meteor.isServer) {
  // This code only runs on the client
  Meteor.methods({
    'addCoreTask': function(coreTask) {
      Tasks.insert({
          title: coreTask.title,
          description: coreTask.description,
          dueDate: coreTask.dueDate,
          parentTask: null,
          project: coreTask.project,
          owner: coreTask.owner,
          members: []
      });
    },
    'addSubTask': function(subTask) {
      Tasks.insert({
          title: subTask.title,
          description: subTask.description,
          dueDate: subTask.dueDate,
          parentTask: subTask.parentTask,
          project: subTask.project,
          owner: subTask.owner,
          members: []
      });
    } 
  });

}