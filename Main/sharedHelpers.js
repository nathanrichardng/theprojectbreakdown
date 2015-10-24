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

Blaze.registerHelper('toDate', function(dateString) {
    Date.prototype.yyyymmdd = function() {
       var yyyy = this.getFullYear().toString();
       var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
       var dd  = this.getDate().toString();
       return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
    };

    var date = new Date(dateString.toString());
    return date.yyyymmdd();
});

if (Meteor.isClient) {
  // This code only runs on the client
  Template.main.helpers({
    numberOfFriendRequests: function() {
        return FriendRequests.find({ to: Meteor.userId(), status: 'Pending' }).count();
    },
    message: function() {
        return Session.get("message");
    },
    error: function() {
        return Session.get("error");
    }
  });
}