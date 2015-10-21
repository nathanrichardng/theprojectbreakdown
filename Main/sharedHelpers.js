Blaze.registerHelper('isEqual', function (lhs, rhs) {
    return lhs === rhs;
});

Blaze.registerHelper('classFor', function (value) {
    switch (value) {
    	case "In progress":
    		return "status inProgress";
    	case "At risk":
    		return "status atRisk";
    	case "Complete":
    		return "status complete";
    	case "Pending information":
    		return "status pendingInfo"
    	default:
    		return "";
    }
});

if (Meteor.isClient) {
  // This code only runs on the client
  Template.main.helpers({
    numberOfFriendRequests: function() {
        return FriendRequests.find({ to: Meteor.userId(), status: 'Pending' }).count();
    }
  });
}