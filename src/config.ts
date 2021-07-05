const config = {
	"supports" : {
		"lang"			: "en",
		"charset"		: "utf-8",
		"title"			: "Title",
		"description"	: "Page description",
		"favicon"		: "favicon.icon",
		"safari"		: true,
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
		"openGraph"		: true,
		"twitterCard"	: true,
		"resetCss" 		: "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css",
		"dnsPrefetch"	: [],
		"preconnection" : []
	},
	"outDir" 	  		: "output",
	"fileName"			: "index",
	"filePath"			: ""
};

export default config;