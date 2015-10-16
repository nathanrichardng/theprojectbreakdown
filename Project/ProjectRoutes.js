Router.route('/Projects');
Router.route('/Projects/:ProjectId', {
	template: 'project',
	data: function() {
		var projectId = this.params.ProjectId
		return Projects.findOne({ _id:projectId });
	}
});