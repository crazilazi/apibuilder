"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_cmd_1 = __importDefault(require("node-cmd"));
var NodeCommand = /** @class */ (function () {
    function NodeCommand() {
    }
    NodeCommand.StartService = function (wheretostart) {
        node_cmd_1.default.run("node " + wheretostart);
    };
    return NodeCommand;
}());
exports.NodeCommand = NodeCommand;
