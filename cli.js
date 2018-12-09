#!/usr/bin/env node
'use strict';

const meow = require('meow');
const importLazy = require('import-lazy')(require);

const settings = importLazy('./src/settings');
const timeline = importLazy('./src/timeline');

const cli = meow(`
	Usage
		$ twe
`);

const [command] = cli.input;

switch (command) {
	// Config tokens
	case 'setup':
		settings.renderSetupPropmt();
		break;

	// Config colors
	case 'colors':
		settings.renderColorsPrompt();
		break;

	// Fetch home-timeline
	case undefined:
	case 'h':
	case 'home':
		timeline.homeTimeline(cli.flags);
		break;

	// Fetch user-timeline
	case 'me':
		timeline.userTimeline(cli.flags);
		break;

	// Fetch mentions-timeline
	case 'm':
	case 'mention':
	case 'mentions':
		timeline.mentionsTimeline(cli.flags);
		break;

	// Post status
	default: {
		const status = cli.input.join(' ');
		timeline.postStatus(status, cli.flags);
		break;
	}
}
