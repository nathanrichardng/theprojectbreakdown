if (Meteor.isServer) {
  Meteor.methods({
      'removeFriend': function(friendId){
        var userId = Meteor.userId();
          Meteor.users.update({ _id: userId }, {$pull: {colleagues: friendId} });
          Meteor.users.update({ _id: friendId }, {$pull: {colleagues: userId} });
          FriendRequests.update({ $or: [{ to: userId, from: friendId }, { to:friendId, from: userId }] }, {$set: {status: 'Rejected'} }, { multi: true });
      }
  });  
}