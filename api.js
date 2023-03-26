const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults({
  static: "./buid"
});

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1"
  })
)
server.use(router);
server.listen(process.env.PORT || 3001, () => {
  console.log('JSON Server is running')
});

module.exports = server.createHandler({
  path: '/api'
});