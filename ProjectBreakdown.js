if (Meteor.isClient) {
  Meteor.subscribe('projects');
  Meteor.subscribe('tasks');
  Meteor.subscribe('friendRequests');
}

if (Meteor.isServer) {


  Meteor.publish('projects', function() {
    return Projects.find({members: this.userId}); //add filtering for user permissions later
  });

  Meteor.publish('tasks', function() {
    return Tasks.find({

    });
  });

  Meteor.publish('friendRequests', function() {
    return FriendRequests.find({
      $or: [
        {to: this.userId},
        {from: this.userId}
      ]
    });
  });

  Meteor.publish('users', function() {
    return Meteor.users.find({}, {fields: {emails: 1, profile: 1, _id: 1}});
  });
}
