#!/usr/bin/env node

const fs = require('fs');
const generator = require('./generator');

let settings = {};

if(fs.existsSync('createHtml.json')){
	settings = JSON.parse(fs.readFileSync('createHtml.json', 'utf8'));
} 

generator(settings);