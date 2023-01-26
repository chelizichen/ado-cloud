import { exec } from "node:child_process";
export function get_port_status(port: number) {
  return new Promise((resolve, reject) => {
    let cmd = "lsof -i:" + port + "| awk 'NR==2{print $2}' ";
    const kill_process = exec(cmd);
    kill_process.stdout?.on("data", function (chunk) {
      let pid: number = chunk.toString();
      if (pid && !isNaN(pid)) {
        resolve(pid);
      }
      reject(false);
    });
  });
}
