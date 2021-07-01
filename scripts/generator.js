const fs = require('fs');
const path = require('path');
let config = require('../config.json')

function isObject(item) {
	return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, ...sources) {
	if (!sources.length) return target;
	const source = sources.shift();
  
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
  
	return mergeDeep(target, ...sources);
  }

function ensureDirectoryExistence(filePath) {
	var dirname = path.dirname(filePath);
	if (fs.existsSync(dirname)) {
	  return true;
	}
	ensureDirectoryExistence(dirname);
	fs.mkdirSync(dirname);
}

const htmlGenerator = function( settings = null ){

	if(settings) {
		mergeDeep(config, settings);
	}

	fs.readFile(path.resolve(__dirname, '../html/base.html'), 'utf8' , (err, base) => {
	
		if (err) {
		  console.error(err)
		  return
		}
	
		let content = base;
	
		let lang = config.supports['lang'] || 'en';
		let chartset = config.supports['charset'] || 'utf-8';
		let description = config.supports['description'] || 'Description';
		let title = config.supports['title'] || 'Title';
		let favicon = config.supports['favicon'];
	
		content = content.replace('{%lang%}', lang);
		content = content.replace('{%charset%}', chartset);
		content = content.replace('{%description%}', description);
		content = content.replace('{%title%}', title);
	
		if(favicon){
			let type = favicon.split('.').length === 0 ? false : favicon.split('.').pop();
			if(!type || type == 'ico') type = 'x-icon';
			type = type.toLowerCase();
			content = content.replace('{%favicon%}' ,`<link rel="icon" type="image/${type}" href="${favicon}">`)
		} else content = content.replace('{%favicon%}','');
	
		let resetCss = config.supports['resetCss'];
		if(resetCss){
			let link = `<link rel="stylesheet" href="${resetCss}" />`
			content = content.replace('{%resetcss%}', link);
		}
	
		let safari = '';
		if('safari' in config.supports && config.supports['safari']){
			let _safari = fs.readFileSync(path.resolve(__dirname, '../html/safari.html'), {encoding:'utf8', flag:'r'});
			safari = _safari.split('\n').reduce((acc,line) => line.startsWith('<!--') ? acc : acc + (acc ? '\t' : '') + line , safari);
		} 
		content = content.replace('{%safari%}', safari);
	
		let openGraph = '';
		if('openGraph' in config.supports && config.supports['openGraph']){
			let _openGraph = fs.readFileSync(path.resolve(__dirname, '../html/openGraph.html'), {encoding:'utf8', flag:'r'});
			openGraph = _openGraph.split('\n').reduce((acc,line) => line.startsWith('<!--') ? acc : acc + (acc ? '\t' : '') + line , openGraph);
		} 
		content = content.replace('{%openGraph%}', openGraph);
	
		let twitter = '';
		if('twitterCard' in config.supports && config.supports['twitterCard']){
			let _twitter = fs.readFileSync(path.resolve(__dirname, '../html/twitterCard.html'), {encoding:'utf8', flag:'r'});
			twitter = _twitter.split('\n').reduce((acc,line) => line.startsWith('<!--') ? acc : acc + (acc ? '\t' : '') + line , twitter);
		} 
		content = content.replace('{%twitterCard%}', twitter);
	
		// remove blank line(s)
		content = content.replace(/^\s*[\r\n]/gm, "") 

		let output = `${config.outDir}/${config.fileName}.html`;

		ensureDirectoryExistence(output);
	
		fs.writeFileSync(output, content);
	
	});

}

module.exports = htmlGenerator;
