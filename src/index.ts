import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";


const main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    const post = orm.em.create(Post, {id: 211, createdAt: null, updatedAt: null, title: "hello world"});
    await orm.em.persistAndFlush(post);
    console.log("------------------sql2--------------------");
    await orm.em.nativeInsert(Post, {createdAt: null, updatedAt: null, id: 321, title: "vanshul bhatia"});
};

 main();
 
 console.log("Hello World");
 

