if (Meteor.isClient) {
  // This code only runs on the client
  Template.selectColleagues.helpers({
    colleagues: function() {
      console.log(Meteor.user());
      return Meteor.users.find({_id: { $in: Meteor.user().colleagues } });
    }
  });

  Template.member.helpers({
    member: function() {
      console.log(this);
      var userId = this.toString();
      //change this to return user name once profiles are set up
      var member = Meteor.users.findOne({_id: userId});
      return member.profile.firstName + " " + member.profile.lastName;
    }
  })
}