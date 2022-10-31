import { Collect } from "ado-node";
import * as mysql from "mysql";
export const Injectable = Collect;
export type Conn = mysql.Connection;
