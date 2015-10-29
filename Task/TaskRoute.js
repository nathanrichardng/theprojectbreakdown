Router.route('/Tasks/:TaskId', {
	template: 'task',
	data: function() {
		var taskId = this.params.TaskId
		return Tasks.findOne({ _id:taskId }, {
	        transform: function(doc) {
	          var newDoc = doc;
	          var owner = Meteor.users.findOne({ _id: doc.owner });
	          var dueDate = new Date(newDoc.dueDate.getTime() + newDoc.dueDate.getTimezoneOffset()*60000);
	          
          	  newDoc.dueDate = dueDate.toDateString();
	          newDoc.owner = owner.profile.firstName + " " + owner.profile.lastName;
	          
	          return newDoc;
	        }
	    });
	}
});