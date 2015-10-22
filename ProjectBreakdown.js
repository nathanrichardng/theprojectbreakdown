if (Meteor.isClient) {
  Meteor.subscribe('projects');
  Meteor.subscribe('tasks');
  Meteor.subscribe('friendRequests');
  Meteor.subscribe('users');
}

if (Meteor.isServer) {


  Meteor.publish('projects', function() {
    return Projects.find({members: this.userId, removed: false}); //add filtering for user permissions later
  });

  Meteor.publish('tasks', function() {
    return Tasks.find({
      removed: false
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
    return Meteor.users.find({}, {fields: {emails: 1, profile: 1, _id: 1, colleagues: 1} });
  });
}
