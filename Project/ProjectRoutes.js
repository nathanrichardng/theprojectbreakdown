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
	          var dueDate = new Date(newDoc.dueDate.getTime() + newDoc.dueDate.getTimezoneOffset()*60000);
	          
          	  newDoc.dueDate = dueDate.toDateString();
	          newDoc.pm = pm.profile.firstName + " " + pm.profile.lastName;
	          return newDoc;
	        }
      	});
	}
});