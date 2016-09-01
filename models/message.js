var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  messageId: { type: String, unique: true, index: true },
  title: String,
  from: String,
  to: String,
  body: String,
  sent: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Message', messageSchema);