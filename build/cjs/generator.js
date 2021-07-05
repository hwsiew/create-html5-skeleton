"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.twitterSnippet = exports.openGraphSnippet = exports.appleSnippet = exports.preconnetion = exports.prefetchDNS = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// import * as config from './config.json';
const util = __importStar(require("./util"));
const config_1 = __importDefault(require("./config"));
const lodash_1 = __importDefault(require("lodash"));
function prefetchDNS(config) {
    let links = config.map(link => `<link rel="dns-prefetch" href="${link}">`);
    return links.join('\n\t');
}
exports.prefetchDNS = prefetchDNS;
function preconnetion(config) {
    let links = config.map(link => `<link rel="preconnect" href="${link}">`);
    return links.join('\n\t');
}
exports.preconnetion = preconnetion;
function appleSnippet(config) {
    let content = [];
    if (config.icons) {
        for (const [key, href] of Object.entries(config['icons'])) {
            let sizes = key !== 'default' ? `sizes="${key}" ` : '';
            content.push(`<link rel="apple-touch-icon" ${sizes}href="${href}">`);
        }
    }
    if ('startupImage' in config) {
        content.push(`<link rel="apple-touch-startup-image" href="${config['startupImage']}">`);
    }
    if ('webAppTitle' in config) {
        content.push(`<meta name="apple-mobile-web-app-title" content="${config['webAppTitle']}">`);
    }
    return content.join('\n\t');
}
exports.appleSnippet = appleSnippet;
function openGraphSnippet(config) {
    let content = [];
    for (const [key, value] of Object.entries(config)) {
        let property = key;
        if (property == 'imageWidth')
            property = 'image:width';
        else if (property == 'imageHeight')
            property = 'image:height';
        else if (property == 'siteName')
            property = 'site_name';
        content.push(`<meta property="og:${property}" content="${value}">`);
    }
    return content.join('\n\t');
}
exports.openGraphSnippet = openGraphSnippet;
function twitterSnippet(config) {
    let content = [];
    for (const [key, value] of Object.entries(config)) {
        let property = key;
        content.push(`<meta name="twitter:${property}" content="${value}">`);
    }
    return content.join('\n\t');
}
exports.twitterSnippet = twitterSnippet;
const htmlGenerator = function (settings = {}) {
    let config = config_1.default;
    if (settings && Object.keys(settings).length) {
        lodash_1.default.merge(config, settings);
    }
    fs_1.default.readFile(path_1.default.resolve(__dirname, '../../html/base.html'), 'utf8', (err, base) => {
        if (err) {
            console.error(err);
            return;
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
        if (favicon) {
            let type = favicon.split('.').length === 0 ? false : favicon.split('.').pop();
            if (!type || type == 'ico')
                type = 'x-icon';
            type = type.toLowerCase();
            content = content.replace('{%favicon%}', `<link rel="icon" type="image/${type}" href="${favicon}">`);
        }
        else
            content = content.replace('{%favicon%}', '');
        let resetCss = config.supports['resetCss'];
        if (resetCss) {
            let link = `<link rel="stylesheet" href="${resetCss}" />`;
            content = content.replace('{%resetcss%}', link);
        }
        let openGraph = '';
        if ('openGraph' in config.supports && config.supports['openGraph']) {
            openGraph = openGraphSnippet(config.supports['openGraph']);
        }
        content = content.replace('{%openGraph%}', openGraph);
        let twitter = '';
        if ('twitterCard' in config.supports && config.supports['twitterCard']) {
            // let _twitter = fs.readFileSync(path.resolve(__dirname, '../../html/twitterCard.html'), {encoding:'utf8', flag:'r'});
            // twitter = _twitter.split('\n').reduce((acc,line) => line.startsWith('<!--') ? acc : acc + (acc ? '\t' : '') + line , twitter);
            twitter = twitterSnippet(config.supports['twitterCard']);
        }
        content = content.replace('{%twitterCard%}', twitter);
        let apple = '';
        if ('apple' in config.supports && config.supports['apple']) {
            apple = appleSnippet(config.supports['apple']);
        }
        else if ('safari' in config.supports && config.supports['safari']) {
            let _safari = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../../html/safari.html'), { encoding: 'utf8', flag: 'r' });
            apple = _safari.split('\n').reduce((acc, line) => line.startsWith('<!--') ? acc : acc + (acc ? '\t' : '') + line, apple);
        }
        content = content.replace('{%safari%}', apple);
        let dnsPrefetch = '';
        if ('dnsPrefetch' in config.supports && config.supports['dnsPrefetch']) {
            dnsPrefetch = prefetchDNS(config.supports['dnsPrefetch']);
        }
        content = content.replace('{%dnsPrefetch%}', dnsPrefetch);
        let preconnection = '';
        if ('preconnection' in config.supports && config.supports['preconnection']) {
            preconnection = preconnetion(config.supports['preconnection']);
        }
        content = content.replace('{%preconnection%}', preconnection);
        // remove blank line(s)
        content = content.replace(/^\s*[\r\n]/gm, "");
        let output = `${config.outDir}/${config.fileName}.html`;
        if ('filePath' in config && config['filePath']) {
            output = config['filePath'];
        }
        util.ensureDirectoryExistence(output);
        fs_1.default.writeFileSync(output, content);
    });
};
exports.default = htmlGenerator;
