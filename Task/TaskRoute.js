Router.route('/Tasks/:TaskId', {
	template: 'task',
	data: function() {
		var taskId = this.params.TaskId
		return Tasks.findOne({ _id:taskId }, {
	        transform: function(doc) {
	          var newDoc = doc;
	          newDoc.dueDate = newDoc.dueDate.toDateString();
	          return doc;
	        }
	    });
	}
});