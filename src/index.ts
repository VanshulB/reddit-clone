import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { validate } from "graphql";
import { HelloResolvers } from "./resolvers/hello";


const main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up(); 
    
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolvers],
            validate: false,
        })
    });
    await apolloServer.start();
    
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log("Server started at port 4000");

    }); 
}; 
main().catch((err => {
     console.log(err); 
    }));