Router.route('/friends', {
	waitOn: function () {
	    return Meteor.subscribe('users');
	}
});