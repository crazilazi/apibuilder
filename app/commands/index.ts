import cmd from "node-cmd";

export class NodeCommand {
    static StartService(wheretostart: string) {
        try {
            cmd.run(`node ${wheretostart}`);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
