import bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import express from "express";

const app = express();
// use of bodyparser to parse text to object
app.use(bodyParser.json());

app.use(cors());
// hello api
app.get("/allemp", (req, res) => {
    res.send([{name: "Rajeev"}, {name: "Sachin"}, {name: "Nandish"}]);
});
app.get("/alldept", (req, res) => {
    res.send([{dept: "Development"}, {dept: "Support"}, {dept: "HR"}]);
});
// start server
app.listen(3333, () => {
    console.log(chalk.bgRed("server is started on localhost:3333"));
});
