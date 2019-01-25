import bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import express from "express";
import jsonxml from "jsontoxml";
import sql from "mssql";
import xml from "xml";
import converter, { Options } from "xml-js";
import { nc } from "../commands/index";
import { CodeGenerator } from "../utility/codegenerator";

const app = express();
// use of bodyparser to parse text to object
app.use(bodyParser.json());

app.use(cors());

// connection config

const config = {
    user: "Rajeev",
    password: "Oak1nd1a01",
    server: "192.168.1.50", // You can use 'localhost\\instance' to connect to named instance
    database: "SamEmpDB",

    options: {
        encrypt: false, // Use this if you're on Windows Azure
    },
};

const pool = new sql.ConnectionPool(config);
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

app.post("/createsoapservice", async (req, res) => {
    // your logic here
    try {
        // nc.startService("C:\\working\\apibuilder\\app\\soapservices\\soaptest.js");
        nc.runSingleCommandWithWait("C:\\working\\apibuilder\\app\\soapservices\\soaptest.js");
        res.status(200).send("http://127.0.0.1:1337/soapService?wsdl");
    } catch (error) {
        console.log(chalk.bgRed("errorrrrrrrrr"));
        console.log(chalk.bgRed(error));
        res.status(400).send(error);
    }
});
// get json data using sql
app.get("/getEmpDataAsJson", async (req, res) => {
    // your logic here
    try {
        const conn = await pool.connect();
        const request = new sql.Request(conn);
        const result = await request.query(`select top 10 first_name, last_name, email, salary from dbo.employees;`);
        console.log(result.recordset);
        await conn.close();
        res.status(200).send(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

// get xml data using sql
app.get("/getEmpDataAsXml", async (req, res) => {
    // your logic here
    try {
        const conn = await pool.connect();
        const request = new sql.Request(conn);
        const result = await request.query(`select top 10 first_name, last_name, email, salary from dbo.employees;`);
        // console.log(result.recordset);
        const options: Options.JS2XML = { compact: true, ignoreComment: true, spaces: 4, parentKey: "employee" };
        // console.log({ employee: result.recordset });
        // const data: string = converter.js2xml({ employee: result.recordset }, options);
        // const data = jsonxml({ employee: result.recordset });
        const example3 = [{
            toys: [{ toy: "Transformers", name: "boy" }, { toy: "GI Joe", name: "boy" },
            { toy: "He-man", name: "boy" }],
        }];
        const data = xml(example3, true);
        console.log(data);
        await conn.close();
        res.set("Content-Type", "text/xml");
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});
// start server
app.listen(3000, () => {
    console.log(chalk.bgRed("server is started on localhost:3000"));
});
