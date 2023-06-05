import inquirer from 'inquirer';
import Conf from 'conf';
import setupPrompt from './prompts/setup.js';
import colorsPrompt from './prompts/colors.js';

export const defaultSettings = {
	setup: {
		consumerKey: '',
		consumerSecret: '',
		accessToken: '',
		accessTokenSecret: '',
	},
	colors: {
		text: '#cccccc',
		name: 'dim.green',
		ats: 'cyan',
		link: 'dim.cyan.underline',
		tags: 'orange.bold',
	},
};

const conf = new Conf({projectName: 'twe'});

export const renderSetupPropmt = async () => {
	const defaultSetup = conf.get('setup') || defaultSettings.setup;
	const setup = await inquirer.prompt(setupPrompt(defaultSetup));
	conf.set('setup', setup);
};

export const renderColorsPrompt = async () => {
	const defaultColors = conf.get('colors') || defaultSettings.colors;
	const colors = await inquirer.prompt(colorsPrompt(defaultColors));
	conf.set('colors', colors);
};
