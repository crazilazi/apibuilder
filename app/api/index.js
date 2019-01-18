"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var chalk_1 = __importDefault(require("chalk"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var index_1 = require("../commands/index");
var app = express_1.default();
// use of bodyparser to parse text to object
app.use(body_parser_1.default.json());
app.use(cors_1.default());
// create api
app.post("/createapi", function (req, res) {
    // your logic here
    try {
        if (!fs_1.default.existsSync("C:/working/allapigoeshere/" + req.body.user + "/" + req.body.entity)) {
            fs_1.default.mkdirSync("C:/working/allapigoeshere/" + req.body.user + "/" + req.body.entity, { recursive: true });
        }
        // tslint:disable-next-line:max-line-length
        var fileStream_1 = fs_1.default.createWriteStream("C://working//allapigoeshere//" + req.body.user + "//" + req.body.entity + "//" + req.body.method + ".js");
        fileStream_1.once("open", function (fd) {
            fileStream_1.write("const bodyParser = require('body-parser');\n");
            fileStream_1.write("const chalk = require('chalk');\n");
            fileStream_1.write("const cors = require('cors');\n");
            fileStream_1.write("const express = require('express');\n");
            fileStream_1.write("const app = express();\n");
            fileStream_1.write("app.use(bodyParser.json());\n");
            fileStream_1.write("app.use(cors());\n");
            fileStream_1.write("\n");
            fileStream_1.write("app.get('/allemp', (req, res) => {\n            res.send([{name: 'Rajeev'}, {name: 'Sachin'}, {name: 'Nandish'}]);\n        });\n");
            fileStream_1.write("\n");
            fileStream_1.write("app.listen(" + req.body.port + ", () => {\n            console.log(chalk.bgRed('server is started on localhost:" + req.body.port + "'));\n        });\n");
            // Important to close the stream when you're ready
            fileStream_1.end();
        });
        // tslint:disable-next-line:max-line-length
        index_1.NodeCommand.StartService("C://working//allapigoeshere//" + req.body.user + "//" + req.body.entity + "//" + req.body.method + ".js");
        res.status(200).send("api has been created and running.");
    }
    catch (error) {
        console.log(chalk_1.default.bgRed(error));
        res.status(400).send(error);
    }
});
// start server
app.listen(3000, function () {
    console.log(chalk_1.default.bgRed("server is started on localhost:3000"));
});
