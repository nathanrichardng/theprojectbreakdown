if (Meteor.isClient) {
  // This code only runs on the client
  Template.registrationForm.events({
    "submit .register-user": function(event) {
      event.preventDefault();
      var user = {
        email: event.target.email.value,
        password: event.target.password.value,
        profile: {
          firstName: event.target.firstName.value,
          lastName: event.target.lastName.value,
          organization: event.target.organization.value
        }
      }
      Accounts.createUser(user, function(error){
        if(error){
          Session.set("loginMenuError", error.reason);
        }
        else {
          $('.dropdown-toggle').dropdown('toggle');
          Session.set("registering", false);
          Router.go('/projects');
        }
      });
    }
  });
}