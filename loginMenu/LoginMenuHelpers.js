if (Meteor.isClient) {
  // This code only runs on the client
  Template.loginMenu.helpers({
    user: function() {
      var currentUser = Meteor.user();
      var text;
      if(currentUser) {
        text = currentUser.profile.firstName + " " + currentUser.profile.lastName;
      }
      else {
        text = "Sign up / Register";
      }
      return text;
    },
    loggedIn: function() {
      return Meteor.user();
    },
    loginMenuMessage: function() {
      return Session.get("loginMenuMessage");
    },
    loginMenuError: function() {
      return Session.get("loginMenuError");
    },
    registering: function() {
      return Session.get("registering");
    }
  });

  Template.loginMenu.events({
    "click .dropdown-toggle": function(event) {
      Session.set("loginMenuMessage", false);
      Session.set("loginMenuError", false);
    },
    "click .begin-registration": function(event) {
      event.preventDefault();
      Session.set("registering", true);
    },
    "click .cancel-registration": function(event) {
      event.preventDefault();
      Session.set("registering", false);
    },
    "click .begin-forgot-password": function(event) {
      //implement logic to show forgotPassword template
    }
  })
}