Router.route('/Projects');
Router.route('/Projects/:ProjectId', {
	template: 'project',
	waitOn: function() {
		return Meteor.subscribe('users');
	},
	data: function() {
		var projectId = this.params.ProjectId
		return Projects.findOne({ _id:projectId }, {
	        transform: function(doc) {
	          var newDoc = doc;
	          var pm = Meteor.users.findOne({ _id: doc.pm });
	          newDoc.dueDate = newDoc.dueDate.toDateString();
	          newDoc.pm = pm.profile.firstName + " " + pm.profile.lastName;
	          return newDoc;
	        }
      	});
	}
});