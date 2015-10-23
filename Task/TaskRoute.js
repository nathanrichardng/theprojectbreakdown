Router.route('/Tasks/:TaskId', {
	template: 'task',
	data: function() {
		var taskId = this.params.TaskId
		return Tasks.findOne({ _id:taskId }, {
	        transform: function(doc) {
	          var newDoc = doc;
	          var owner = Meteor.users.findOne({ _id: doc.owner });

	          newDoc.dueDate = newDoc.dueDate.toDateString();
	          newDoc.owner = owner.profile.firstName + " " + owner.profile.lastName;
	          
	          return newDoc;
	        }
	    });
	}
});