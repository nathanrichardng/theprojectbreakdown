if(Meteor.isClient) {
	// Do not forget to add the email package: $ meteor add email
	// and to configure the SMTP: https://gist.github.com/LeCoupa/9879221

	Template.ForgotPassword.events({
	  'submit #forgotPasswordForm': function(e, t) {
	    e.preventDefault();

	    var forgotPasswordForm = $(e.currentTarget),
	        email = forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase();

	    if (email) {

	      Accounts.forgotPassword({email: email}, function(error) {
	        if (error) {
	          Session.set("loginMenuError", error.reason);
	          Session.set("loginMenuMessage", false);
	        } 
	        else {
	          Session.set("loginMenuMessage", "Email sent. Please check your mailbox.");
	          Session.set("loginMenuError", false);
	          e.target.forgotPasswordEmail.value = "";
	        }
	      });

	    }
	    return false;
	  },
	});

	if (Accounts._resetPasswordToken) {
	  Session.set('resetPassword', Accounts._resetPasswordToken);
	}

	Template.ResetPassword.helpers({
	 resetPassword: function(){
	  return Session.get('resetPassword');
	 }
	});

	Template.ResetPassword.events({
	  'submit #resetPasswordForm': function(e, t) {
	    e.preventDefault();
	    
	    var resetPasswordForm = $(e.currentTarget),
	        password = resetPasswordForm.find('#resetPasswordPassword').val(),
	        passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();

	    if (password && passwordConfirm && (password == passwordConfirm)) {
	      Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
	        if (err) {
	          console.log('We are sorry but something went wrong.');
	        } else {
	          console.log('Your password has been changed. Welcome back!');
	          Session.set('resetPassword', null);
	        }
	      });
	    }
	    return false;
	  }
	});
}
