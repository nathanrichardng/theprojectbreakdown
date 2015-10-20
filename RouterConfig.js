var requireLogin = function() { 
  if (! Meteor.user()) {
   // If user is not logged in render landingpage
   this.render('home'); 
 } else {
   //if user is logged in render whatever route was requested
   this.next(); 
 }
}
 
// Before any routing run the requireLogin function. 
// Except in the case of "landingpage". 
// Note that you can add more pages in the exceptions if you want. (e.g. About, Faq, contact...) 
Router.onBeforeAction(requireLogin, {except: ['home']});
Router.configure({
	layoutTemplate: 'main'
});