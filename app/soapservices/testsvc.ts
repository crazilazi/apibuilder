import Promise from "bluebird";
export class SoapService {
    getAllEmployee = () => {
        return new Promise((resolve, reject) => {
            resolve(["Rajeev", "Nandish", "Naveen"]);
        });
    }
}
