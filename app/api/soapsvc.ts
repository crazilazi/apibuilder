import bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import express from "express";
import sql from "mssql";
// tslint:disable-next-line:no-var-requires
const soap = require("../utility/soapsvcgenerator");
import { SoapService } from "../soapservices/testsvc";
// tslint:disable-next-line:no-var-requires
// const SoapService = require("../soapservices/testsvc");
const app = express();
// use of bodyparser to parse text to object
app.use(bodyParser.json());

app.use(cors());

// connection config
// // tslint:disable-next-line:no-empty
// function SoapService() {
// }
// SoapService.prototype.getAllEmployee = function () {
//     return new Promise(function (resolve, reject) {
//         resolve(["Rajeev", "Nandish", "Naveen"]);
//     });
// };
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
app.post("/createsoapservice", async (req, res) => {
    // your logic here
    try {

        res.status(200).send("soap api has been created and running.");
    } catch (error) {
        console.log(chalk.bgRed("errorrrrrrrrr"));
        console.log(chalk.bgRed(error));
        res.status(400).send(error);
    }
});

// start server
app.listen(3000, () => {
    console.log(chalk.bgRed("server is started on localhost:3000"));
});
