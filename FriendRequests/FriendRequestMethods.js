if (Meteor.isServer) {
  Meteor.methods({
      'addFriendRequest': function(toUserEmail){
          var toUser = Meteor.users.findOne({emails: {$elemMatch: {address: toUserEmail} } });
          var toUserId = toUser._id;
          var fromUserId = Meteor.userId();
          //don't allow duplicates
          if(FriendRequests.findOne({ $or: [
              {to: toUserId, from: fromUserId, status: 'Pending'}, 
              {from: toUserId, to: fromUserId, status: 'Pending'},
              {to: toUserId, from: fromUserId, status: 'Accepted'}, 
              {from: toUserId, to: fromUserId, status: 'Accepted'}
            ] })) {
            return false;
          }
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

  Meteor.methods({
      'acceptFriendRequest': function(friendRequestId){
          var friendRequest = FriendRequests.findOne({_id: friendRequestId});
          //don't allow duplicates
          if(friendRequest.to != this.userId) {
            return false;
          }
          FriendRequests.update({_id: friendRequestId}, {$set: {status: 'Accepted'} });
          Meteor.users.update({_id: friendRequest.to}, {$addToSet: {colleagues: friendRequest.from } });
          Meteor.users.update({_id: friendRequest.from}, {$addToSet: {colleagues: friendRequest.to } });
      }
  });

  Meteor.methods({
      'rejectFriendRequest': function(friendRequestId){
          var friendRequest = FriendRequests.findOne({_id: friendRequestId});
          //don't allow duplicates
          if(friendRequest.to != this.userId) {
            return false;
          }
          FriendRequests.update({_id: friendRequestId}, {$set: {status: 'Rejected'} });
      }
  });  
}