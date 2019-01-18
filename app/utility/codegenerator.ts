import fs from "fs";
class CodeGenerator {
    private commonimport: string = `
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const express = require('express');

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());`;

    private commonserver: string = ``;
    generateAPI = (opts?: any) => {
        // your logic
        try {
            const fileStream = fs.createWriteStream(opts.filepath);
            fileStream.once("open", (fd) => {
                fileStream.write(`${this.commonimport}\n`);
                fileStream.write("\n");
                fileStream.write(`app.get('/allemp', (req, res) => {
                res.send([{name: 'Rajeev'}, {name: 'Sachin'}, {name: 'Nandish'}]);
            });\n`);
                fileStream.write("\n");
                fileStream.write(`app.listen(${opts.user.port})\n`);
                // Important to close the stream when you're ready
                fileStream.end();
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    createFolders = (path: string) => {
        try {
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true });
            }
        } catch (error) {
            throw error;
        }
    }
}

export const CG = new CodeGenerator();
