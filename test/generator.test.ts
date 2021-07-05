import { 
	prefetchDNS,
	preconnetion,
	appleSnippet,
	openGraphSnippet,
	twitterSnippet
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

	test('open graph no meta tags', () => {
		let config = {};
		expect(openGraphSnippet(config)).toEqual('');
	});

	test('open graph meta tags', () => {
		let config = {
			"type": "website",
			"url": "https://example.com/page.html",
			"title": "Content Title",
			"image": "https://example.com/image.jpg",
			"imageWidth": "1200",
			"imageHeight": "630",
			"description": "Description Here",
			"siteName": "Site Name",
			"locale": "en_US"
		};
		expect(openGraphSnippet(config)).toEqual('<meta property="og:type" content="website">\n\t<meta property="og:url" content="https://example.com/page.html">\n\t<meta property="og:title" content="Content Title">\n\t<meta property="og:image" content="https://example.com/image.jpg">\n\t<meta property="og:image:width" content="1200">\n\t<meta property="og:image:height" content="630">\n\t<meta property="og:description" content="Description Here">\n\t<meta property="og:site_name" content="Site Name">\n\t<meta property="og:locale" content="en_US">');
	})

	test('twitter card no meta tags', () => {
		let config = {};
		expect(twitterSnippet(config)).toEqual('');
	})

	test('twitter card meta tags', () => {
		let config = {
			"card": "summary",
			"site": "@site_account",
			"creator": "@individual_account",
			"url": "https://example.com/page.html",
			"title": "Content Title",
			"description": "Content description less than 200 characters",
			"image": "https://example.com/image.jpg"
		};
		expect(twitterSnippet(config)).toEqual('<meta name="twitter:card" content="summary">\n\t<meta name="twitter:site" content="@site_account">\n\t<meta name="twitter:creator" content="@individual_account">\n\t<meta name="twitter:url" content="https://example.com/page.html">\n\t<meta name="twitter:title" content="Content Title">\n\t<meta name="twitter:description" content="Content description less than 200 characters">\n\t<meta name="twitter:image" content="https://example.com/image.jpg">');
	})
});

