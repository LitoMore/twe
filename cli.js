#!/usr/bin/env node
import meow from 'meow';
import * as settings from './src/settings.js';
import * as timeline from './src/timeline.js';

const cli = meow(
	`
Usage
  $ twe               Fetch home-timeline
  $ twe h|home        Fetch home-timeline
  $ twe m|mentions    Fetch mentions-timeline
  $ twe setup         Setup tokens
  $ twe colors        Config color themes
  $ twe <status> ...  Post status
`,
	{importMeta: import.meta},
);

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

	case 'get':
	case 'post': {
		const [, uri] = cli.input;
		timeline.doRequest[command](uri, cli.flags || {});
		break;
	}

	// Post status
	default: {
		const status = cli.input.join(' ');
		timeline.postStatus(status, cli.flags);
		break;
	}
}
