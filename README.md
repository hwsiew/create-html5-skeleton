# HTML Skeleton

![npm](https://img.shields.io/npm/v/create-html5-skeleton)

Do you get your HTML page right? Often times, cross-browser compatibility is the top priority of webapp or website. However, html is the most overlooked element as compared to css and javascript. This html skeleton generator enforces various SEO best practices and browsers support meta tags for different purpose. You can generate a html skeleton depends on your need or include most recommended settings for a html page. 

## Supported Elements
- [Open Graph Markup](https://developers.facebook.com/docs/sharing/webmasters/#markup)
- [Twitter Card](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started)
- [Safari Web Clip](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
- [Reset css](https://meyerweb.com/eric/tools/css/reset/)
- [DNS Prefetch](https://developer.mozilla.org/en-US/docs/Web/Performance/dns-prefetch)
- [Preconnet](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preconnect)

## Installation
`npm install -D create-html5-skeleton`

## HTML Generation
`npx create-html --filePath=path/to/file.html`

## Import 
```javascript
// Commonjs
const htmlGenerator = require('create-html5-skeleton');
// ES6
import htmlGenerator from 'create-html5-skeleton';

// Optional: configure the output html by input a setting object
const setting = {
	/* refer to Configuration below for all supported options */
};
htmlGenerator(setting); // this will output html file in the outDir (default: output/).
```

## Preview
The following snippet shows all inclusive html 5 skeleton. You may selectively disable element which you do not need.

```html
<!DOCTYPE html> 
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="description" content="Description">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Title</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
  <link rel="apple-touch-icon" href="touch-icon-iphone.png">
  <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad.png">
  <link rel="apple-touch-icon" sizes="180x180" href="touch-icon-iphone-retina.png">
  <link rel="apple-touch-icon" sizes="167x167" href="touch-icon-ipad-retina.png">
  <link rel="apple-touch-startup-image" href="/launch.png">
  <meta name="apple-mobile-web-app-title" content="AppTitle">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://example.com/page.html">
  <meta property="og:title" content="Content Title">
  <meta property="og:image" content="https://example.com/image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:description" content="Description Here">
  <meta property="og:site_name" content="Site Name">
  <meta property="og:locale" content="en_US">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@site_account">
  <meta name="twitter:creator" content="@individual_account">
  <meta name="twitter:url" content="https://example.com/page.html">
  <meta name="twitter:title" content="Content Title">
  <meta name="twitter:description" content="Content description less than 200 characters">
  <meta name="twitter:image" content="https://example.com/image.jpg">
  <link rel="dns-prefetch" href="http://example.com">
	<link rel="preconnect" href="http://example.com">
</head>
<body>
  <!-- Your content here -->
</body>
</html>
```

## Default Configuration
You may include your custom configuration file to override the default configuration by adding `createHtml.json` at your root directory.
```json
{
  "supports" : {
	  "lang"      : "en",
	  "charset"   : "utf-8",
	  "title"     : "Title",
	  "description" : "Page description",
	  "favicon"   : "favicon.icon",
    "safari"      : true, // depreacted, use 'apple' instead
    "apple"		: {
			"icons" : {
				"default": "touch-icon-iphone.png",
				"152x152": "touch-icon-iphone.png",
				"180x180": "touch-icon-iphone.png",
				"167x167": "touch-icon-iphone.png",
			},
			"webAppTitle": "AppTitle",
			"startupImage": "/launch.png"
		},
    "openGraph"   : {
			"type": "website",
			"url": "https://example.com/page.html",
			"title": "Content Title",
			"image": "https://example.com/image.jpg",
			"imageWidth": "1200",
			"imageHeight": "630",
			"description": "Description Here",
			"siteName": "Site Name",
			"locale": "en_US"
		},
    "twitterCard" : {
			"card": "summary",
			"site": "@site_account",
			"creator": "@individual_account",
			"url": "https://example.com/page.html",
			"title": "Content Title",
			"description": "Content description less than 200 characters",
			"image": "https://example.com/image.jpg"
		},
    "resetCss"    : "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css",
    "dnsPrefetch"	: [],
		"preconnection" : []
  },
 "outDir"    : "build",
 "fileName"  : "index",
 "filePath"  : ""
}
```
