import bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import express from "express";
import { CodeGenerator } from "../utility/codegenerator";

const app = express();
// use of bodyparser to parse text to object
app.use(bodyParser.json());

app.use(cors());

// create api
app.post("/createapi", async (req, res) => {
    // your logic here
    try {
        const cg = new CodeGenerator(req.body);
        cg.createFolders();
        await cg.generateAPI();
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
