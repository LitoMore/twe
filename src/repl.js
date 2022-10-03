import repl from 'node:repl';

export const showInRepl = (parameters = {}) => {
	const r = repl.start('> ');
	r.context.result = parameters;
};
