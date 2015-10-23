if (Meteor.isServer) {
  // server/smtp.js
  	Meteor.startup(function () {
	    smtp = {
	      username: 'theprojectbreakdown@gmail.com',   // eg: server@gentlenode.com
	      password: 'thisisjustformyapp',   // eg: 3eeP1gtizk5eziohfervU
	      server:   'smtp.gmail.com',  // eg: mail.gandi.net
	      port: 25
	    }
	    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
	});
}