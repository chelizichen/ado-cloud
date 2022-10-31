import { RedisClientType } from "@redis/client";
import { Collect, Inject } from "ado-node";
import { USER_INFO } from "./user.enity";

@Collect()
class UserService {
  @Inject(USER_INFO)
  USER_INFO!: USER_INFO;

  public getUserKey(_redis: RedisClientType<any, any, any>, UID: string) {
    const key = `sk:${UID}:qt`;
    return key;
  }

  public async List() {
    return await this.USER_INFO.getList();
  }
}

export { UserService };
