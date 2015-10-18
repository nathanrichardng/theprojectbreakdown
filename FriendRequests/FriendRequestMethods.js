if (Meteor.isServer) {
  Meteor.methods({
      'addFriendRequest': function(toUserEmail){
          var toUser = Meteor.users.findOne({emails: {$elemMatch: {address: toUserEmail} } });
          var toUserId = toUser._id;
          var fromUserId = Meteor.userId();
          var createdAt = new Date();

          var friendRequest = {
            from: fromUserId,
            to: toUserId,
            createdAt: createdAt,
            status: 'Pending'
          }

          FriendRequests.insert(friendRequest);
      }
  });
}