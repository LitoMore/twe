#!/usr/bin/env node
'use strict';

const T = require('twii');
const Conf = require('conf');
const chalkPipe = require('chalk-pipe');
const importLazy = require('import-lazy')(require);
const {defaultSettings} = require('./settings');

const changeCase = importLazy('change-case');
const stringz = importLazy('stringz');
const ora = importLazy('ora');

const conf = new Conf();
const setup = conf.get('setup') || defaultSettings.setup;
const colors = conf.get('colors') || defaultSettings.colors;
const t = new T(setup);

const spin = text => {
	process.spinner = ora(text).start();
};

const generateStatusLine = (text, entities) => {
	const typeDict = {
		hashtags: 'tags',
		symbols: 'symbols',
		/* eslint-disable camelcase */
		user_mentions: 'ats',
		/* eslint-enable camelcase */
		urls: 'link',
		media: 'link'
	};
	let statusText = [];
	Object.keys(entities).forEach(key => {
		const type = typeDict[key];
		entities[key].forEach(item => {
			const [from, to] = item.indices;
			const subString = stringz.substr(text, from, to - from);
			statusText.push({type, from, to, text: subString});
		});
	});
	if (statusText.length === 0) {
		return chalkPipe(colors.text)(text);
	}

	statusText.sort((a, b) => a.from - b.from);
	const tempStatusText = statusText.slice();
	tempStatusText.forEach((item, index) => {
		const {from, to} = item;
		if (from > 0 && index === 0) {
			const subString = stringz.substr(text, 0, from);
			statusText.push({type: 'text', from: 0, to: from, text: subString});
		}

		if (index < tempStatusText.length - 1) {
			const next = tempStatusText[index + 1];
			const subString = stringz.substr(text, to, next.from - to);
			statusText.push({type: 'text', from: to, to: next.from, text: subString});
		} else if (to < text.length - 1) {
			const thisTo = text.length - 1;
			const subString = stringz.substr(text, to, thisTo - to);
			statusText.push({type: 'text', from: to, to: thisTo, text: subString});
		}
	});
	statusText.sort((a, b) => a.from - b.from);
	statusText = statusText.map(item => ({type: item.type, text: item.text}));
	const line = statusText.map(item => {
		const paint = chalkPipe(colors[item.type]);
		return paint(item.text);
	}).join('');
	return line;
};

const renderTimeline = tl => {
	tl.forEach(status => {
		const {user, text, entities} = status;
		const line = generateStatusLine(text, entities);
		const statusText = chalkPipe(colors.text)('[') +
			chalkPipe(colors.name)(user.name) +
			chalkPipe(colors.text)(']') +
			chalkPipe(colors.text)(' ') +
			chalkPipe(colors.text)(line);
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
	spin('Sending');

	try {
		await t.post('statuses/update', {status, ...params});
		process.spinner.succeed('Sent!');
	} catch (error) {
		process.spinner.fail(error.body);
		process.exit(1);
	}
};

const fetchTimeline = async (uri, params) => {
	spin('Fetching');

	if (params)	{
		params = convertParams(params);
	}

	try {
		const {body: tl} = await t.get(uri, params);
		process.spinner.stop();
		renderTimeline(tl);
	} catch (error) {
		process.spinner(error.body);
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
