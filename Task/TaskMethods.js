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
    },
    'removeTask': function(taskId) {
      var task = Tasks.findOne({ _id: taskId});
      var projectId = task.project;
      var project = Projects.findOne({ _id: projectId});
      if (project.pm == Meteor.userId()){
        Tasks.update({
          _id: taskId
        },
        {
          $set: { removed: true }
        });
      }
    },
      'addMemberToTask': function(taskId, memberId) {
        var isColleague = Meteor.users.findOne({
          _id: this.userId,
          colleagues: memberId
        });

        if (isColleague) {
          Tasks.update({ 
            _id: taskId, 
            owner: this.userId 
          },
          {
            $addToSet: { members: memberId }
          });
        }
      },
      'removeMemberFromTask': function(projectId, memberId) {
        //dont let pm remove themself from project.
        //need to make another method elsewhere to allow them to reassign a new pm
        if(memberId == this.userId) {
          return false;
        }

        var task = Tasks.findOne({ _id: taskId});
        var projectId = task.project;
        var project = Projects.findOne({ _id: projectId});

        if(project.pm == Meteor.userId() || task.owner == Meteor.userId()) {
          Tasks.update({ 
            _id: projectId
          },
          {
            $pull: { members: memberId }
          });
        }
      }
    //add methods to add/remove a colleague from members array 
  });

}