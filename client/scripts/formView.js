// var {Rooms} = require('./rooms.js');
// var {Parse} = require('./parse.js');
// var {Messages} = require('./messages.js');
// var {App} = require('./app.js');

// var $ = require('jquery');
// var _ = require('underscore');

var FormView = {

  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    

    var message = {
      username: App.username,
      text: FormView.$form.find('#message').val(),
      roomname: Rooms.selected || 'lobby'
    };

    Parse.create(message, (data) => {
      console.log(data);
      _.extend(message, JSON.parse(data));
      Messages.add(message, MessagesView.render);
    });
      },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};
// exports.FormView = FormView;