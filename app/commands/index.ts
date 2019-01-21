import find from "find-process";
import cmd from "node-cmd";

class NodeCommand {
    static startService(wheretostart: string) {
        try {
            cmd.run(`node ${wheretostart}`);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static killProcessByID(pid: number | undefined) {
        try {
            if (pid === undefined || pid === 0) {
                return;
            }
            cmd.run(`kill ${pid}`);
        } catch (error) {
            console.log(error);
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
