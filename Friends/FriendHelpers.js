if (Meteor.isClient) {
  // This code only runs on the client
  Template.friends.helpers({
    friends: function() {
    	return Meteor.users.find({ _id: { $in: Meteor.user().colleagues } });
    }
  });

  //add event and template to remove friend
  Template.friend.events({
    "click .remove-friend": function(event) {
      var friendId = this._id
      console.log(friendId);
      Meteor.call('removeFriend', friendId);
    }
  });
}