if (Meteor.isClient) {
  // This code only runs on the client
  Template.loginForm.events({
    "submit .log-in-user": function(event) {
      event.preventDefault();
      var user = event.target.userEmail.value;
      var password = event.target.userPassword.value;

      Meteor.loginWithPassword(user, password, function(error) {
        if(error) {
          Session.set("loginMenuError", error.reason);
          Session.set("loginMenuMessage", false);
        }
        else {
          Session.set("loginMenuError", false);
          $('.dropdown-toggle').dropdown('toggle');
          Router.go('/projects');
        }
      })
    }
  });
}