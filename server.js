var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var async = require('async');
var request = require('request');
var xml2js = require('xml2js');
var _ = require('underscore');
var guid = require('node-uuid'); // to create guids
var favicon = require('serve-favicon');

// Babel ES6/JSX Compiler
require('babel-register');

// Swig is used to render the initial html template
var swig  = require('swig');

// Using react to create the connection to the react JS application
var React = require('react');
var ReactDOM = require('react-dom/server');

// Enable react style routes for different pages
var Router = require('react-router');
var routes = require('./app/routes');

// Local config file
var config = require('./config');

/* Uncomment to enable support for mongo db files
 * ==============================================
// Initializing mongoose db connection for connecting to MongoDB
var mongoose = require('mongoose');
var Message = require('./models/message');
mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});
*/

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.png'));

/**
 * GET /api/dialogs
 * Get a simple "hello world" message from api
 */
app.use('/api/dialogs', require('./api/dialogs'));

// Directing application routes to react routes
app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {

  socket.notifications = [];

  setInterval(function () {
    socket.notifications.push({
        id: guid.v1(),
        title: 'hello',
        desc: 'Suspicious activiti at ' + new Date(),
        when: new Date()
      });
    socket.emit('notifications', { notifications: socket.notifications });
  }, 5000);

  socket.on('dismiss', function (data) {
    socket.notifications = _.reject(socket.notifications, n => n.id === data.id)
    socket.emit('notifications', { notifications: socket.notifications });
  })

  socket.on('disconnect', function() {
    //io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

// starting the server
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});