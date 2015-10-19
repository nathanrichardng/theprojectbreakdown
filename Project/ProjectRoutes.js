Router.route('/Projects');
Router.route('/Projects/:ProjectId', {
	template: 'project',
	waitOn: function() {
		return Meteor.subscribe('users');
	},
	data: function() {
		var projectId = this.params.ProjectId
		return Projects.findOne({ _id:projectId });
	}
});