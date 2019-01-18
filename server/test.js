const bodyParser = require('body-parser');
const chalk = require('chalk');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/allemp', (req, res) => {             res.send([{name: 'Rajeev'}, {name: 'Sachin'}, {name: 'Nandish'}]);         });

app.listen(3333, () => {             console.log(chalk.bgRed('server is started on localhost:3333'));         });
