import path from 'path';
import fs from 'fs';

export interface Configuration {
	[index: string]: any;
	supports?: {
		[index: string]: any;
		lang?: string,
		charset?: string,
		description?: string,
		title?: string,
		favicon?: string,
		safari?: boolean,
		openGraph?: boolean,
		twitterCard?: boolean,
		resetCss?: string
	},
	outDir?: string,
	fileName?: string,
	filePath?: string,
}

export function ensureDirectoryExistence(filePath: string) {
	var dirname = path.dirname(filePath);
	if (fs.existsSync(dirname)) {
	  return true;
	}
	ensureDirectoryExistence(dirname);
	fs.mkdirSync(dirname);
}