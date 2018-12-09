'use strict';

const inquirer = require('inquirer');
const Conf = require('conf');
const importLazy = require('import-lazy')(require);

const setupPrompt = importLazy('./prompts/setup');
const colorsPrompt = importLazy('./prompts/colors');

const defaultSettings = {
	setup: {
		consumerKey: '',
		consumerSecret: '',
		accessToken: '',
		accessTokenSecret: ''
	},
	colors: {
		text: 'reset',
		name: 'green',
		ats: 'blue',
		link: 'blue'
	}
};

const conf = new Conf();

const renderSetupPropmt = async () => {
	const defaultSetup = conf.get('setup') || defaultSettings.setup;
	const setup = await inquirer.prompt(setupPrompt(defaultSetup));
	conf.set('setup', setup);
};

const renderColorsPrompt = async () => {
	const defaultColors = conf.get('colors') || defaultSettings.colors;
	const colors = await inquirer.prompt(colorsPrompt(defaultColors));
	conf.set('colors', colors);
};

module.exports = {
	defaultSettings,
	renderSetupPropmt,
	renderColorsPrompt
};
