if (Meteor.isClient) {
  // This code only runs on the client
  Template.friendRequests.helpers({
    friendRequests: function() {
    	return FriendRequests.find({ to: Meteor.userId(), status: 'Pending' }, {
        transform: function(doc){
          var toUser = Meteor.users.findOne({ _id: doc.to });
          var fromUser = Meteor.users.findOne({ _id: doc.from });

          //change this to return user profile instead later on
          var toUserName = toUser.profile.firstName + " " + toUser.profile.lastName + " (" + toUser.emails[0].address + ")";
          var fromUserName = fromUser.profile.firstName + " " + fromUser.profile.lastName + " (" + fromUser.emails[0].address + ")";
          var transformedDoc = {
              to: toUserName,
              from: fromUserName,
              createdAt: doc.createdAt.toDateString(),
              status: doc.status
          }
          return transformedDoc;
        }
      });
    }
  });

  Template.sentFriendRequests.helpers({
    sentFriendRequests: function() {
      return FriendRequests.find({ from: Meteor.userId(), status: 'Pending' }, {
        transform: function(doc){
          var toUser = Meteor.users.findOne({ _id: doc.to });
          var fromUser = Meteor.users.findOne({ _id: doc.from });

          //change this to return user profile instead later on
          var toUserEmail = toUser.emails[0].address;
          var fromUserEmail = fromUser.emails[0].address;
          var transformedDoc = {
              to: toUserEmail,
              from: fromUserEmail,
              createdAt: doc.createdAt.toDateString(),
              status: doc.status
          }
          return transformedDoc;
        }
      });
    }
  });

  Template.addFriendRequestForm.events({
  	"submit .add-friendRequest": function(event) {
  		event.preventDefault();
  		var toUser = event.target.toUser.value;
  		
  		Meteor.call('addFriendRequest', toUser);
      console.log(toUser);
  		event.target.toUser.value = "";
  	}
  });

  Template.friendRequest.events({
    "click .accept-friendRequest": function(event) {
      var friendRequest = this._id;
      Meteor.call('acceptFriendRequest', friendRequest);
    }
  });

  Template.friendRequest.events({
    "click .reject-friendRequest": function(event) {
      var friendRequest = this._id;
      Meteor.call('rejectFriendRequest', friendRequest);
    }
  });
}