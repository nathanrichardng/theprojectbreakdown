if (Meteor.isClient) {
  // This code only runs on the client
  Template.friendRequests.helpers({
    friendRequests: function() {
    	return FriendRequests.find({});
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
}