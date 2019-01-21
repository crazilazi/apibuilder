import find from "find-process";
import cmd from "node-cmd";
// tslint:disable-next-line:no-var-requires
const terminate = require("terminate");

class NodeCommand {
    static startService(wheretostart: string) {
        try {
            cmd.run(`node ${wheretostart}`);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async killProcessByID(pid: number | undefined) {
        try {
            if (pid === undefined || pid === 0) {
                return;
            }
            await cmd.run(`kill ${pid}`);
            console.log(`killed pid ${pid}`);
        } catch (error) {
            console.error(error);
            // throw error;
        }
    }

    static killTaskByPid = async (pid: number | undefined) => {
        try {
            if (pid === undefined || pid === 0 || (await find("pid", pid, true)).length === 0) {
                console.log(`pid is ${pid}`);
                return;
            }
            console.log(`pid is real ${pid}`);
            await terminate(pid, (err: any) => {
                if (err) { // you will get an error if you did not supply a valid process.pid
                    console.error("Oopsy: " + err); // handle errors in your preferred way.
                } else {
                    console.log("done"); // terminating the Processes succeeded.
                }
            });
        } catch (error) {
            console.error(error);
            // throw error;
        }
    }
    static getAllNodeProcess = async (): Promise<IProcessInfo[]> => {
        try {
            const c: IProcessInfo[] = await find("name", "node", true);
            return c;
            // .then((list) => {
            //     console.log(list);
            // });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const nc = NodeCommand;
