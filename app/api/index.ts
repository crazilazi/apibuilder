import bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import express from "express";
import fs from "fs";
import { NodeCommand } from "../commands/index";

const app = express();
// use of bodyparser to parse text to object
app.use(bodyParser.json());

app.use(cors());

// create api
app.post("/createapi", (req, res) => {
    // your logic here
    try {
        if (!fs.existsSync(`C:/working/allapigoeshere/${req.body.user}/${req.body.entity}`)) {
            fs.mkdirSync(`C:/working/allapigoeshere/${req.body.user}/${req.body.entity}`, { recursive: true });
        }
        // tslint:disable-next-line:max-line-length
        const fileStream = fs.createWriteStream(`C://working//allapigoeshere//${req.body.user}//${req.body.entity}//${req.body.method}.js`);

        fileStream.once("open", (fd) => {
            fileStream.write("const bodyParser = require('body-parser');\n");
            fileStream.write("const chalk = require('chalk');\n");
            fileStream.write("const cors = require('cors');\n");
            fileStream.write("const express = require('express');\n");
            fileStream.write("const app = express();\n");
            fileStream.write("app.use(bodyParser.json());\n");
            fileStream.write("app.use(cors());\n");
            fileStream.write("\n");
            fileStream.write(`app.get('/allemp', (req, res) => {
            res.send([{name: 'Rajeev'}, {name: 'Sachin'}, {name: 'Nandish'}]);
        });\n`);
            fileStream.write("\n");
            fileStream.write(`app.listen(${req.body.port}, () => {
            console.log(chalk.bgRed('server is started on localhost:${req.body.port}'));
        });\n`);
            // Important to close the stream when you're ready
            fileStream.end();
        });
        // tslint:disable-next-line:max-line-length
        NodeCommand.StartService(`C://working//allapigoeshere//${req.body.user}//${req.body.entity}//${req.body.method}.js`);
        res.status(200).send("api has been created and running.");
    } catch (error) {
        console.log(chalk.bgRed(error));
        res.status(400).send(error);
    }
});

// start server
app.listen(3000, () => {
    console.log(chalk.bgRed("server is started on localhost:3000"));
});
