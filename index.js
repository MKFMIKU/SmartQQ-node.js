var config = require('./lib/config'),
	fs = require('fs'),
	path = require('path'),
	request = require('request');

var clean_cookie = function(){
	"use strict";
	let cookie = path.join(__dirname + config.COOKIE_FILE);
	fs.exists(cookie, function(exists) {
		if(exists)
			fs.unlinkSync(cookie,function(err){
				if(err) throw err;
				console.log('Cookie file removed.');
			});
		else
			console.error('Cookie file not found');
	});
};

clean_cookie();