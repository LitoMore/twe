import process from 'node:process';
import ora from 'ora';

let {spinner} = process;

export const start = (text) => {
	spinner ||= ora(text).start();
};

export const info = (text) => {
	spinner ||= ora().info(text);
};

export const succeed = (text) => {
	if (spinner) {
		spinner.succeed(text);
	} else {
		ora().succeed(text);
	}
};

export const fail = (text) => {
	spinner.fail(text);
};

export const stop = () => {
	spinner.stop();
};
