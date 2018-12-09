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
			' ' +
			text;
		console.log(statusText);
		// Console.log(status.entities);
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
	await t.post('statuses/update', {status, ...params});
};

const homeTimeline = async params => {
	if (params)	{
		params = convertParams(params);
	}
	const {body: tl} = await t.get('statuses/home_timeline', params);
	renderTimeline(tl);
};

const userTimeline = async params => {
	if (params)	{
		params = convertParams(params);
	}
	const {body: tl} = await t.get('statuses/user_timeline', params);
	renderTimeline(tl);
};

const mentionsTimeline = async params => {
	if (params) {
		params = convertParams(params);
	}
	const {body: tl} = await t.get('statuses/mentions_timeline', params);
	renderTimeline(tl);
};

module.exports = {
	postStatus,
	homeTimeline,
	userTimeline,
	mentionsTimeline
};
