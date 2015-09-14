// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var zmq = require('zmq');
	
// Define the zmq configuration 
module.exports = function() {

	var zmqsocket = zmq.socket( 'router' );
	zmqsocket.identity = 'backend' ;
	zmqsocket.bind( 'tcp://*:4502' );
	zmqsocket.RCVTIMEO = 3000;  // in milliseconds

	// Return the zmq socket connection instance
	return zmqsocket;
};

