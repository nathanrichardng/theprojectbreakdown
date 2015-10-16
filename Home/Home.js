if (Meteor.isClient) {
  // This code only runs on the client
  Template.home.helpers({
    message: "Welcome to the project breakdown!"
  });
}