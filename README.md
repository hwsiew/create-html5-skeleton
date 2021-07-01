# HTML Skeleton

Do you get your HTML page right? Often times, cross-browser compatibility is the top priority of webapp or website. However, html is the most overlooked element as compared to css and javascript. This html skeleton generator enforces various SEO best practices and browsers support meta tags for different purpose. You can generate a html skeleton depends on your need or include most recommended settings for a html page. 

## Supported Elements
- Open Graph
- Twitter Card
- Safari Web Clip
- Reset css
- and more...

## Installation
`npm install -D create-html5-skeleton`

## HTML Generation
`npx create-html`

## Preview
The following snippet shows all inclusive html 5 skeleton. You may selectively disable element which you do not need.

```
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
</head>
<body>
	<!-- Your content here -->
</body>
</html>
```

## Default Configuration
You may include your custom configuration file to override the default configuration by adding `createHtml.json` at your root directory.
```
{
	"supports" : {
		"safari"		: true, 
		"openGraph"		: true,
		"twitterCard"	: true,
		"resetCss" 		: "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
	},
	"outDir" 	  		: "build",
	"fileName"			: "index"	
}
```
