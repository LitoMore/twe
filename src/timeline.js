#!/usr/bin/env node
'use strict';

const T = require('twii');
const Conf = require('conf');
const chalkPipe = require('chalk-pipe');
const importLazy = require('import-lazy')(require);
const {defaultSettings} = require('./settings');

const changeCase = importLazy('change-case');

const conf = new Conf();
const setup = conf.get('setup') || defaultSettings.setup;
const colors = conf.get('colors') || defaultSettings.colors;
const t = new T(setup);

const renderTimeline = tl => {
	tl.forEach(status => {
		const {user, text} = status;
		const statusText = chalkPipe(colors.text)('[') +
			chalkPipe(colors.name)(user.name) +
			chalkPipe(colors.text)(']') +
			chalkPipe(colors.text)(' ') +
			chalkPipe(colors.text)(text);
		console.log(statusText);
	});
};

const convertParams = params => {
	const snakeCaseParams = {};
	Object.keys(params).forEach(key => {
		snakeCaseParams[changeCase.snakeCase(key)] = params[key];
	});
	return snakeCaseParams;
};

const postStatus = async (status, params) => {
	try {
		await t.post('statuses/update', {status, ...params});
	} catch (error) {
		console.log(JSON.parse(error.body));
		process.exit(1);
	}
};

const fetchTimeline = async (uri, params) => {
	if (params)	{
		params = convertParams(params);
	}
	try {
		const {body: tl} = await t.get(uri, params);
		renderTimeline(tl);
	} catch (error) {
		console.log(error.body);
		process.exit(1);
	}
};

const homeTimeline = async params => {
	fetchTimeline('statuses/home_timeline', params);
};

const userTimeline = async params => {
	fetchTimeline('statuses/user_timeline', params);
};

const mentionsTimeline = async params => {
	fetchTimeline('statuses/mentions_timeline', params);
};

module.exports = {
	postStatus,
	homeTimeline,
	userTimeline,
	mentionsTimeline
};
