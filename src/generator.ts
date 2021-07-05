import fs from 'fs';
import path from 'path';
// import * as config from './config.json';
import * as util from  './util';
import defaultConfig from './config';
import _, { keyBy } from 'lodash';

export function prefetchDNS( config: Array<string> ){
	let links = config.map(link=> `<link rel="dns-prefetch" href="${link}">`);
	return links.join('\n\t');
}

export function preconnetion( config: Array<string> ){
	let links = config.map(link=> `<link rel="preconnect" href="${link}">`);
	return links.join('\n\t');
}

export function appleSnippet(config: util.appleConfig){
	let content = [];
	if(config.icons){
		for(const [key, href] of Object.entries(config['icons'])){
			let sizes = key !== 'default' ? `sizes="${key}" ` : '';
			content.push(`<link rel="apple-touch-icon" ${sizes}href="${href}">`);
		}
	}

	if('startupImage' in config){
		content.push(`<link rel="apple-touch-startup-image" href="${config['startupImage']}">`);
	}

	if('webAppTitle' in config){
		content.push(`<meta name="apple-mobile-web-app-title" content="${config['webAppTitle']}">`);
	}

	return content.join('\n\t');
}

const htmlGenerator = function(settings: util.Configuration = {}){

	let config = defaultConfig

	if(settings && Object.keys(settings).length) {
		_.merge(config, settings);
	}	

	fs.readFile(path.resolve(__dirname, '../../html/base.html'), 'utf8' , (err, base) => {
	
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
	
		let openGraph = '';
		if('openGraph' in config.supports && config.supports['openGraph']){
			let _openGraph = fs.readFileSync(path.resolve(__dirname, '../../html/openGraph.html'), {encoding:'utf8', flag:'r'});
			openGraph = _openGraph.split('\n').reduce((acc,line) => line.startsWith('<!--') ? acc : acc + (acc ? '\t' : '') + line , openGraph);
		} 
		content = content.replace('{%openGraph%}', openGraph);
	
		let twitter = '';
		if('twitterCard' in config.supports && config.supports['twitterCard']){
			let _twitter = fs.readFileSync(path.resolve(__dirname, '../../html/twitterCard.html'), {encoding:'utf8', flag:'r'});
			twitter = _twitter.split('\n').reduce((acc,line) => line.startsWith('<!--') ? acc : acc + (acc ? '\t' : '') + line , twitter);
		} 
		content = content.replace('{%twitterCard%}', twitter);

		let apple = ''
		if('apple' in config.supports && config.supports['apple']){
			apple = appleSnippet(config.supports['apple']);
		} else if('safari' in config.supports && config.supports['safari']){
			let _safari = fs.readFileSync(path.resolve(__dirname, '../../html/safari.html'), {encoding:'utf8', flag:'r'});
			apple = _safari.split('\n').reduce((acc,line) => line.startsWith('<!--') ? acc : acc + (acc ? '\t' : '') + line , apple);
		} 
		content = content.replace('{%safari%}', apple);

		let dnsPrefetch = '';
		if('dnsPrefetch' in config.supports && config.supports['dnsPrefetch']){
			dnsPrefetch = prefetchDNS(config.supports['dnsPrefetch']);
		}
		content = content.replace('{%dnsPrefetch%}', dnsPrefetch);

		let preconnection = '';
		if('preconnection' in config.supports && config.supports['preconnection']){
			preconnection = preconnetion(config.supports['preconnection']);
		}
		content = content.replace('{%preconnection%}', preconnection);
	
		// remove blank line(s)
		content = content.replace(/^\s*[\r\n]/gm, "") 

		let output = `${config.outDir}/${config.fileName}.html`;
		if('filePath' in config && config['filePath']){
			output = config['filePath'];
		}

		util.ensureDirectoryExistence(output);
	
		fs.writeFileSync(output, content);
	
	});
}

export default htmlGenerator;