"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var chalk_1 = __importDefault(require("chalk"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var app = express_1.default();
// use of bodyparser to parse text to object
app.use(body_parser_1.default.json());
app.use(cors_1.default());
// hello api
app.get("/allemp", function (req, res) {
    res.send([{ name: "Rajeev" }, { name: "Sachin" }, { name: "Nandish" }]);
});
app.get("/alldept", function (req, res) {
    res.send([{ dept: "Development" }, { dept: "Support" }, { dept: "HR" }]);
});
// start server
app.listen(3333, function () {
    console.log(chalk_1.default.bgRed("server is started on localhost:3333"));
});
