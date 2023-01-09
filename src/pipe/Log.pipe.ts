import { AdoNodeGlobalPipe } from "ado-node/dist/lib/pipe";
import { NextFunction,Request,Response } from "express";

class LogGlobalPipe implements AdoNodeGlobalPipe{
    run(req: Request, _: Response, next: NextFunction): void{
        console.log('req.query',req.query);
        console.log('req.body',req.body);
        next()
    }
}

export {
    LogGlobalPipe
}