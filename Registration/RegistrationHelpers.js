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
          
        }
        else {
          console.log(user);
          Router.go('/projects');
        }
      });
    }
  });

  //need to make a template and functions to log in/send password reset
}