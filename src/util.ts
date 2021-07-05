import path from 'path';
import fs from 'fs';

export interface openGraphConfig {
	type?: string,
	url?: string,
	title?: string,
	image?: string,
	imageWidth?: string,
	imageHeight?: string,
	description?: string,
	siteName?: string,
	locale?: string,	
}

export interface appleConfig {
	icons?: {
		[index: string]: any;
		default: string,
	},
	startupImage?: string,
	webAppTitle?: string
};

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
		resetCss?: string,
		dnsPrefetch?: Array<string>,
		preconnection?: Array<string>
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