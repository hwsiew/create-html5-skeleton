#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const generator_1 = __importDefault(require("./generator"));
let settings = {};
if (fs_1.default.existsSync('createHtml.json')) {
    settings = JSON.parse(fs_1.default.readFileSync('createHtml.json', 'utf8'));
}
generator_1.default(settings);
