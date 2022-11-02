import { Collect } from "ado-node";
import { readFile } from "fs";

@Collect()
export class LogService {
  getLog_ServerName(serverName: string) {
    return new Promise((resolve, reject) => {
      const path = `public/server/${serverName}/log.txt`;
      readFile(path, { encoding: "utf-8", flag: "r" }, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
