import cmd from "node-cmd";

export class NodeCommand {
    static StartService(wheretostart: string) {
        cmd.run(`node ${wheretostart}`);
    }
}
