interface IUserInput {
    id: string;
    httpMethod: string;
    methodName: string;
    methodParams: string[];
    data: any;
    port: number;
}

interface IUserInfo extends IUserInput {
    nodePid?: number;
    nodePpid?: number;
}

interface IProcessInfo {
    pid: number;
    ppid?: number;
    name: string;
    cmd: string;
}
