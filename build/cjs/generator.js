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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// import * as config from './config.json';
const util = __importStar(require("./util"));
const config_1 = __importDefault(require("./config"));
const lodash_1 = __importDefault(require("lodash"));
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
        let safari = '';
        if ('safari' in config.supports && config.supports['safari']) {
            let _safari = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../../html/safari.html'), { encoding: 'utf8', flag: 'r' });
            safari = _safari.split('\n').reduce((acc, line) => line.startsWith('<!--') ? acc : acc + (acc ? '\t' : '') + line, safari);
        }
        content = content.replace('{%safari%}', safari);
        let openGraph = '';
        if ('openGraph' in config.supports && config.supports['openGraph']) {
            let _openGraph = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../../html/openGraph.html'), { encoding: 'utf8', flag: 'r' });
            openGraph = _openGraph.split('\n').reduce((acc, line) => line.startsWith('<!--') ? acc : acc + (acc ? '\t' : '') + line, openGraph);
        }
        content = content.replace('{%openGraph%}', openGraph);
        let twitter = '';
        if ('twitterCard' in config.supports && config.supports['twitterCard']) {
            let _twitter = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../../html/twitterCard.html'), { encoding: 'utf8', flag: 'r' });
            twitter = _twitter.split('\n').reduce((acc, line) => line.startsWith('<!--') ? acc : acc + (acc ? '\t' : '') + line, twitter);
        }
        content = content.replace('{%twitterCard%}', twitter);
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
