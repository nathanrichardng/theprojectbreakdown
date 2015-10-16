Router.route('/Tasks/:TaskId', {
	template: 'task',
	data: function() {
		var taskId = this.params.TaskId
		return Tasks.findOne({ _id:taskId });
	}
});