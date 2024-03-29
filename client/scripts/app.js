// var {FormView}= require('./formView.js');
// var {RoomsView} = require('./roomsView.js');
// var {MessagesView} = require('./messagesView.js');
// var {Parse} = require('./parse.js');
// var {Rooms} = require('./rooms.js');
// var {Messages} = require('./messages.js');
// var $ = require('jquery');

var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);


    // Poll for new messages every 3 sec
    setInterval(App.fetch, 3000);
      },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      data = JSON.parse(data);
      // Don't bother to update if we have no messages
      if (!data.results) { 
        console.log('FAILURE');
        return; 
      }
      Rooms.update(data.results, RoomsView.render);
      Messages.update(data.results, MessagesView.render);
      
      callback();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};

// exports.App = App;