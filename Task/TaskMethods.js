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
          owner: Meteor.userId(),
          members: [Meteor.userId()]
      });
    },
    'addSubTask': function(subTask) {
      //insert new subtask
      Tasks.insert({
          title: subTask.title,
          description: subTask.description,
          dueDate: subTask.dueDate,
          parentTask: subTask.parentTask,
          project: subTask.project,
          owner: Meteor.userId(),
          members: [Meteor.userId()]
      });
      //increment numberOfSubtasks on original task
      Tasks.update({ _id: subTask.parentTask }, { $inc: { numberOfSubTasks: 1 } });
    },
    'removeTask': function(taskId) {
      var task = Tasks.findOne({ _id: taskId});
      var projectId = task.project;
      var project = Projects.findOne({ _id: projectId});
      if (project.pm == Meteor.userId() || task.owner == Meteor.userId()){
        //update task and all subTasks as removed
        Tasks.update({
          $or: [ 
            { _id: taskId },
            { parentTask: taskId }
          ]
        },
        {
          $set: { removed: true }
        },
        {
          multi: true
        });
        //decrement numberOfSubtasks on parent task
        Tasks.update({ _id: task.parentTask }, { $inc: { numberOfSubTasks: -1 } });
      }
    },
      'addMemberToTask': function(taskId, memberId) {
        var isColleague = Meteor.users.findOne({
          _id: this.userId,
          colleagues: memberId
        });

        var task = Tasks.findOne({ _id: taskId });
        var project = Projects.findOne({ _id: task.project });

        if (isColleague && (task.owner == Meteor.userId() || project.pm == Meteor.userId() ) ) {
          Tasks.update({ 
            _id: taskId
          },
          {
            $addToSet: { members: memberId }
          });
        }
      },
      'removeMemberFromTask': function(taskId, memberId) {
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
            _id: taskId
          },
          {
            $pull: { members: memberId }
          });
        }
      },
      'updateTaskStatus': function(taskId, newStatus) {

        var task = Tasks.findOne({ _id: taskId});
        var projectId = task.project;
        var project = Projects.findOne({ _id: projectId});

        if(project.pm == Meteor.userId() || task.owner == Meteor.userId()) {
          Tasks.update({ 
            _id: taskId
          },
          {
            $set: { status: newStatus }
          });
        }
      }
  });

}