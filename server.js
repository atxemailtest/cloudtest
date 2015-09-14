// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the module dependencies
var AESCrypt = require('crypto_atx.js');

var mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	passport = require('./config/passport'),
	zmq = require('./config/zmq');

// Create a new Mongoose connection instance
var db = mongoose();

// Create a new Express application instance
var app = express();

// Configure the Passport middleware
var passport = passport();

// Use the Express application instance to listen to the '5000' port
app.listen(5000);

// Log the server status to the console
console.log('===============================');
console.log('Server running at port:5000/');
console.log('===============================');

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;

// Create a new zmq connection instance
var zmqsocket = zmq();

zmqsocket.on('message', function(rid , tag, sid, msg_xml) {
	
	console.log("====> sid : " + sid);
	console.log("====> tag : " + tag);
			
	if(tag.toString() == 'ZMSG_HEARTB' + '\0')
	{
		var decrypted_msg = AESCrypt.decrypt(msg_xml);
		console.log('msg received tag : ZMSG_HEARTB' + ' rid : ' + rid);	
		console.log(decrypted_msg.toString());//Test		
	}
			
	zmqsocket.send(rid , zmq.ZMQ_SNDMORE);	
	zmqsocket.send("ZMSG_SYSACK\0");
			
});

//======================================


var User = require('mongoose').model('User');

User.find({},function(err,users){

	if(err) throw err;

	console.log(users);
});