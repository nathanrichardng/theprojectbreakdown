if (Meteor.isClient) {
  // This code only runs on the client
  Template.loggedInActions.events({
    "click .logout-user": function(event) {
      event.preventDefault();
      Meteor.logout();
    },
    "submit .change-user-password": function(event) {
    	event.preventDefault();
    	var currentPassword = event.target.currentPassword.value
    	var newPassword = event.target.newPassword.value
    	var confirmPassword = event.target.confirmPassword.value

    	if(newPassword == confirmPassword) {
    		Accounts.changePassword(currentPassword, newPassword, function(error) {
    			if(error) {
    				Session.set("loginMenuError", error.reason);
    				Session.set("loginMenuMessage", false);
    			}
    			else{
    				Session.set("loginMenuMessage", "Password updated to " + newPassword);
    				Session.set("loginMenuError", false);
    				Session.set("changingPassword", false);
    			}
    		});
    	}
    	else {
    		//need to add a "messages" local collection and use that to report messages like this to user.
    		Session.set("loginMenuError", "Passwords do not match");
    		Session.set("loginMenuMessage", false);
    	}
    },
    "click .change-password-button": function(event) {
    	event.preventDefault();
    	Session.set("loginMenuError", false);
    	Session.set("loginMenuMessage", false);
    	Session.set("changingPassword", true);
    },
    "click .cancel-change-password": function(event) {
    	event.preventDefault();
    	Session.set("loginMenuError", false);
    	Session.set("loginMenuMessage", false);
    	Session.set("changingPassword", false);
    }
  });

  Template.loggedInActions.helpers({
  	changingPassword: function() {
  		return Session.get("changingPassword");
  	}
  });
}