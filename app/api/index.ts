import bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import express from "express";
import { NodeCommand } from "../commands/index";
import { CG } from "../utility/codegenerator";

const app = express();
// use of bodyparser to parse text to object
app.use(bodyParser.json());

app.use(cors());

// create api
app.post("/createapi", (req, res) => {
    // your logic here
    try {
        const dirPath = `C://working//allapigoeshere//${req.body.user}//${req.body.entity}`;
        const filePath = `C://working//allapigoeshere//${req.body.user}//${req.body.entity}//${req.body.method}.js`;
        CG.createFolders(dirPath);
        const opts: any = { user: req.body, filepath: filePath, dirpath: dirPath };
        CG.generateAPI(opts);
        NodeCommand.StartService(filePath);
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
