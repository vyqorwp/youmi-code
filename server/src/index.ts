import 'reflect-metadata';
import {MikroORM} from '@mikro-orm/core';
import {__prod__} from './constants';
import microConfig from './mikro-orm.config';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import {HelloResolver} from './resolvers/hello';
import {PostResolver} from './resolvers/post';
import {UserResolver} from './resolvers/user';

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();
  const apolloserver = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({em: orm.em}),
  });
  apolloserver.applyMiddleware({app});
  app.get('/', (_, res) => {
    res.send('hello');
  });
  app.listen(4444, () => {
    console.log('server started on localhost:4444');
  });
  // const post = orm.em.create(Post, { title: 'my first title' })
  // await orm.em.persistAndFlush(post)
  // const posts = await orm.em.find(Post, {})
  // console.log(posts)
};

main().catch((err) => {
  console.error(err);
});
