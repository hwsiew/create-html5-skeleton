import { 
	prefetchDNS,
	preconnetion,
	appleSnippet
} from '../src/generator';
import * as util from '../src/util';

describe('HTML generator', () => {

	test('link for dns prefetch single', ()=>{

		let content = prefetchDNS(['example.com']);

		expect(content).toEqual('<link rel="dns-prefetch" href="example.com">');
	});

	test('link for dns prefetch multiple', ()=>{

		let content = prefetchDNS(['example.com','example1.com','domain.com']);

		content = content.replace(/\n\t/g,'');

		expect(content).toEqual('<link rel="dns-prefetch" href="example.com"><link rel="dns-prefetch" href="example1.com"><link rel="dns-prefetch" href="domain.com">');
	});

	test('link for preconnection single', ()=>{

		let content = preconnetion(['example.com']);

		expect(content).toEqual('<link rel="preconnect" href="example.com">');
	});

	test('link for preconnection multiple', ()=>{

		let content = preconnetion(['example.com','example1.com','domain.com']);

		content = content.replace(/\n\t/g,'');

		expect(content).toEqual('<link rel="preconnect" href="example.com"><link rel="preconnect" href="example1.com"><link rel="preconnect" href="domain.com">');
	});

	test('apple empty config', () => {
		let config: util.appleConfig = {};
		let content = appleSnippet(config);
		expect(content).toEqual('');
	});

	test('apple icons multiple', () => {
		let config = {
			icons : {
				'default': 'touch-icon-iphone.png',
				'152x152': 'touch-icon-iphone.png',
				'180x180': 'touch-icon-iphone.png'
			},
		};
		let content = appleSnippet(config);
		expect(content).toEqual('<link rel="apple-touch-icon" href="touch-icon-iphone.png">\n\t<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-iphone.png">\n\t<link rel="apple-touch-icon" sizes="180x180" href="touch-icon-iphone.png">');
	});

	test('apple startup image', () => {
		let config = {
			startupImage: '/launch.png'
		};
		expect(appleSnippet(config)).toEqual('<link rel="apple-touch-startup-image" href="/launch.png">');
	});

	test('apple web app title', () => {
		let config = {
			webAppTitle: 'AppTitle'
		};
		expect(appleSnippet(config)).toEqual('<meta name="apple-mobile-web-app-title" content="AppTitle">');
	});
});

