// var {Messages} = require('./messages.js');
// var {Rooms} = require('./rooms.js');
// var {MessageView} = require('./messageView.js');
// var {Friends} = require('./friends.js');
// var $ = require('jquery');

var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {

    MessagesView.$chats.on('click', '.username', MessagesView.handleClick);
      },

  render: function() {

    MessagesView.$chats.html('');
    Messages
      .items()
      .filter(message => Rooms.isSelected(message.roomname))
      .each(message => MessagesView.renderMessage(message));
  },

  renderMessage: function(message) {
    var $message = MessageView.render(message);
    MessagesView.$chats.prepend($message);
  },

  handleClick: function(event) {
    // Get username from data attribute
    var username = $(event.target).data('username');
    if (username === undefined) { return; }

    Friends.toggleStatus(username, MessagesView.render);
      }

};

// exports.MessagesView = MessagesView;