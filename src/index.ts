import fs from 'fs';
import generator from './generator';
import { Configuration } from './util';

let settings: Configuration = {};

if(fs.existsSync('createHtml.json')){
	settings = JSON.parse(fs.readFileSync('createHtml.json', 'utf8'));
} 

module.exports = () => generator(settings);