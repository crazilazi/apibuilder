"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function mkDirByPathSync(targetDir, opts) {
    var isRelativeToScript = opts && opts.isRelativeToScript;
    var sep = path_1.default.sep;
    var initDir = path_1.default.isAbsolute(targetDir) ? sep : "";
    targetDir.split(sep).reduce(function (parentDir, childDir) {
        var baseDir = isRelativeToScript ? __dirname : ".";
        var curDir = path_1.default.resolve(baseDir, parentDir, childDir);
        try {
            fs_1.default.mkdirSync(curDir);
            console.log("Directory " + curDir + " created!");
        }
        catch (err) {
            if (err.code !== "EEXIST") {
                throw err;
            }
            console.log("Directory " + curDir + " already exists!");
            return curDir;
        }
        return curDir;
    }, initDir);
}
exports.mkDirByPathSync = mkDirByPathSync;
