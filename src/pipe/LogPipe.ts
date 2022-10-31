import { AdoNodeGlobalPipe } from "ado-node/index.d";
import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
export class LogPipe implements AdoNodeGlobalPipe {
  run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    _res: Response<any, Record<string, any>>,
    next: NextFunction
  ): void {
    console.log("query", req.query);
    console.log("body", req.body);
    next();
  }
}
