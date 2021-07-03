"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureDirectoryExistence = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function ensureDirectoryExistence(filePath) {
    var dirname = path_1.default.dirname(filePath);
    if (fs_1.default.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs_1.default.mkdirSync(dirname);
}
exports.ensureDirectoryExistence = ensureDirectoryExistence;
