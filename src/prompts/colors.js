import chalkPipe from 'chalk-pipe';

const transformer = (color) => {
	return chalkPipe(color)(color);
};

const colroPrompt = (config) => [
	{
		type: 'input',
		name: 'text',
		message: 'Text color',
		default: config.text,
		transformer,
	},
	{
		type: 'input',
		name: 'name',
		message: 'Name color',
		default: config.name,
		transformer,
	},
	{
		type: 'input',
		name: 'ats',
		message: 'ATs color',
		default: config.ats,
		transformer,
	},
	{
		type: 'input',
		name: 'link',
		message: 'Link color',
		default: config.link,
		transformer,
	},
	{
		type: 'input',
		name: 'tags',
		message: 'Tags color',
		default: config.tags,
		transformer,
	},
];

export default colroPrompt;
