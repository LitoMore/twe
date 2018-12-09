'use strict';

module.exports = config => ([
	{
		type: 'input',
		name: 'consumerKey',
		message: 'Enter your consumer key',
		default: config.consumerKey
	}, {
		type: 'input',
		name: 'consumerSecret',
		message: 'Enter your consumer secret',
		default: config.consumerSecret
	}, {
		type: 'input',
		name: 'accessToken',
		message: 'Enter your access token',
		default: config.accessToken
	}, {
		type: 'input',
		name: 'accessTokenSecret',
		message: 'Enter your access token secret',
		default: config.accessTokenSecret
	}
]);
