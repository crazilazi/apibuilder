import fs from "fs";
import _ from "lodash";
import { nc } from "../commands/index";
export class CodeGenerator {
    dirPath: string;
    filePath: string;
    private opts: IUserInput;
    private commonimport: string;

    private commonserver: string = ``;

    constructor(opts: IUserInput) {
        this.dirPath = `C://working//allapigoeshere//${opts.id}`;
        this.filePath = `C://working//allapigoeshere//${opts.id}//${opts.id}${opts.port}.js`;
        this.opts = opts;
        this.commonimport = `
        const bodyParser = require('body-parser');
        const cors = require('cors');
        const express = require('express');

        const app = express();
        app.use(bodyParser.json());
        app.use(cors());`;
    }

    generateAPI = () => {
        try {
            const arrOfUserInfo: IUserInfo[] = this.getDataFromJosnStorage("app\\database\\userinfodb.json");
            // _.isEqual([], []);
            let userInfoAvilable: IUserInfo | undefined = arrOfUserInfo.find((x) => x.id === this.opts.id &&
                x.port === this.opts.port && x.methodName === this.opts.methodName
                && _.isEqual(x.methodParams, this.opts.methodParams) && x.httpMethod === this.opts.httpMethod);
            if (!userInfoAvilable) {
                userInfoAvilable = {
                    id: this.opts.id, methodName: this.opts.methodName,
                    methodParams: this.opts.methodParams, httpMethod: this.opts.httpMethod,
                    data: this.opts.data, port: this.opts.port,
                };
                arrOfUserInfo.push(userInfoAvilable);
            }
            nc.killProcessByID(userInfoAvilable.nodePid);
            nc.killProcessByID(userInfoAvilable.nodePpid);
            console.log(arrOfUserInfo);
            const fileStream = fs.createWriteStream(this.filePath);
            fileStream.once("open", (fd) => {
                fileStream.write(`${this.commonimport}\n`);
                fileStream.write("\n");
                fileStream.write(this.generateActionForApi(arrOfUserInfo));
                fileStream.write("\n");
                fileStream.write(`app.listen(${this.opts.port})\n`);
                fileStream.end();
            });

            fileStream.once("close", async () => {
                nc.startService(this.filePath);
                const nodeProcess = await nc.getAllNodeProcess();
                const foundYou = nodeProcess.filter((n) => n.cmd.trim().toLowerCase()
                    === `node  ${this.filePath.toLowerCase()}`);
                userInfoAvilable!.nodePid = foundYou[0].pid;
                userInfoAvilable!.nodePpid = foundYou[0].ppid;
                console.log(nodeProcess);
                console.log(foundYou);
                this.SetDataToJosnStorage("app\\database\\userinfodb.json", arrOfUserInfo);
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    createFolders = () => {
        try {
            if (!fs.existsSync(this.dirPath)) {
                fs.mkdirSync(this.dirPath, { recursive: true });
            }
        } catch (error) {
            throw error;
        }
    }

    private generateActionForApi = (userinfo: IUserInfo[]): string => {
        let result: string = "";
        userinfo.forEach((x) => {
            const params: string = x.methodParams.length === 0 ? "" :
                `/:${x.methodParams.join("/:")}`;
            switch (x.httpMethod.toLocaleLowerCase()) {
                case "get":
                    result += `app.get("/${x.methodName}${params}", (req, res) => {
                    res.send(${ JSON.stringify(x.data)});});\n`;
                    break;
                default:
                    break;
            }
        });
        return result;
    }

    private getDataFromJosnStorage = (path: string): IUserInfo[] => {
        let data: IUserInfo[] = [];
        const objContent = fs.readFileSync(path, "utf8");
        try {
            data = JSON.parse(objContent);
        } catch (err) {
            console.error(err);
            throw err;
        }
        return data;
    }

    private SetDataToJosnStorage = (path: string, userinfo: IUserInfo[]): void => {
        // your logic
        fs.writeFileSync(path, JSON.stringify(userinfo), "utf8");
    }
}
