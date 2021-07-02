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
	fileName?: string
}

function isObject(item: any) {
	return (item && typeof item === 'object' && !Array.isArray(item));
}

export function mergeDeep(target: Configuration, source: Configuration): object {
	
	if (isObject(target) && isObject(source)) {
	  for (const key in source) {
		if (isObject(source[key])) {
		  if (!target[key]) Object.assign(target, { [key]: {} });
		  mergeDeep(target[key], source[key]);
		} else {
		  Object.assign(target, { [key]: source[key] });
		}
	  }
	}
  
	return mergeDeep(target, source);
}

export function ensureDirectoryExistence(filePath: string) {
	var dirname = path.dirname(filePath);
	if (fs.existsSync(dirname)) {
	  return true;
	}
	ensureDirectoryExistence(dirname);
	fs.mkdirSync(dirname);
}