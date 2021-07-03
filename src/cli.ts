#!/usr/bin/env node

import fs from 'fs';
import generator from './generator';
import {Configuration} from './util';

let settings: Configuration = {};

if(fs.existsSync('createHtml.json')){
	settings = JSON.parse(fs.readFileSync('createHtml.json', 'utf8'));
}

for(let i = 2 ; i < process.argv.length ; i++){
	let [key, value] = process.argv[i].split('=');
	settings[key.replace(/^(-+)/, '')] = value;
}

generator(settings);