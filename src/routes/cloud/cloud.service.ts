import { Collect, Inject } from "ado-node";
import { cloud } from "./cloud.entity";

@Collect()
export class cloudService{
    @Inject(cloud)
    Cloud!:cloud

    run(q_id:string){
         return q_id
    }

}