#!/usr/bin/env node
import process from 'node:process';
import T from 'twii';
import Conf from 'conf';
import chalkPipe from 'chalk-pipe';
import changeCase from 'change-case';
import * as spinner from './spinner.js';
import {defaultSettings} from './settings.js';
import {showInRepl} from './repl.js';

const conf = new Conf();
const setup = conf.get('setup') || defaultSettings.setup;
const colors = conf.get('colors') || defaultSettings.colors;
const t = new T(setup);

const generateStatusLine = (text, entities) => {
	const typeDict = {
		hashtags: 'tags',
		symbols: 'symbols',
		/* eslint-disable camelcase */
		user_mentions: 'ats',
		/* eslint-enable camelcase */
		urls: 'link',
		media: 'link',
	};
	let statusText = [];
	for (const key of Object.keys(entities)) {
		const type = typeDict[key];
		for (const item of entities[key]) {
			const [from, to] = item.indices;
			const subString = text.slice(from, to - from);
			statusText.push({type, from, to, text: subString});
		}
	}

	if (statusText.length === 0) {
		return chalkPipe(colors.text)(text);
	}

	statusText.sort((a, b) => a.from - b.from);
	const temporaryStatusText = [...statusText];
	for (const [index, item] of temporaryStatusText.entries()) {
		const {from, to} = item;
		if (from > 0 && index === 0) {
			const subString = text.slice(0, from);
			statusText.push({type: 'text', from: 0, to: from, text: subString});
		}

		if (index < temporaryStatusText.length - 1) {
			const next = temporaryStatusText[index + 1];
			const subString = text.slice(to, next.from - to);
			statusText.push({type: 'text', from: to, to: next.from, text: subString});
		} else if (to < text.length - 1) {
			const thisTo = text.length - 1;
			const subString = text.slice(to, thisTo - to);
			statusText.push({type: 'text', from: to, to: thisTo, text: subString});
		}
	}

	statusText.sort((a, b) => a.from - b.from);
	statusText = statusText.map((item) => ({type: item.type, text: item.text}));
	const line = statusText
		.map((item) => {
			const paint = chalkPipe(colors[item.type]);
			return paint(item.text);
		})
		.join('');
	return line;
};

const renderTimeline = (tl) => {
	for (const status of tl) {
		const {user, text, entities} = status;
		const line = generateStatusLine(text, entities);
		const statusText =
			chalkPipe(colors.text)('[') +
			chalkPipe(colors.name)(user.name) +
			chalkPipe(colors.text)(']') +
			chalkPipe(colors.text)(' ') +
			chalkPipe(colors.text)(line.trim());
		console.log(statusText);
	}
};

const convertParameters = (parameters) => {
	const snakeCaseParameters = {};
	for (const key of Object.keys(parameters)) {
		snakeCaseParameters[changeCase.snakeCase(key)] = parameters[key];
	}

	return snakeCaseParameters;
};

export const postStatus = async (status, parameters) => {
	spinner.start('Sending');

	try {
		await t.post('statuses/update', {status, ...parameters});
		spinner.succeed('Sent!');
	} catch (error) {
		spinner.fail(JSON.stringify(error.body?.errors));
		process.exit(1);
	}
};

const fetchTimeline = async (uri, parameters) => {
	spinner.start('Fetching');

	if (parameters) {
		parameters = convertParameters(parameters);
	}

	try {
		const {body: tl} = await t.get(uri, parameters);
		spinner.stop();
		renderTimeline(tl);
	} catch (error) {
		spinner.fail(JSON.stringify(error.body?.errors));
		process.exit(1);
	}
};

export const homeTimeline = async (parameters) => {
	fetchTimeline('statuses/home_timeline', parameters);
};

export const userTimeline = async (parameters) => {
	fetchTimeline('statuses/user_timeline', parameters);
};

export const mentionsTimeline = async (parameters) => {
	fetchTimeline('statuses/mentions_timeline', parameters);
};

const renderResponse = (body, {repl}) => {
	if (repl) {
		showInRepl(body);
	} else {
		console.log(body);
	}
};

export const doRequest = {
	async get(uri, {repl, ...parameters}) {
		try {
			const {body} = await t.get(uri, parameters);
			renderResponse(body, {repl});
		} catch (error) {
			renderResponse(error, {repl});
		}
	},

	async post(uri, {repl, ...parameters}) {
		try {
			const {body} = await t.post('statuses/update', {...parameters});
			renderResponse(body, {repl});
		} catch (error) {
			renderResponse(error, {repl});
		}
	},
};
