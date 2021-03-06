const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

authMiddleware = require('./auth.middleware');

const port = process.env.PORT || 5100;

server.use(middlewares);
server.use(authMiddleware)

server.get('/tags', (req, res) => {
  const items = router.db
    .get('items')
    .value();
  const tags = [];
  items.forEach(item => {
    tags.push(...item.tags)
  });
  res.json(Array.from(new Set(tags)))
})

server.use(router);
server.listen(port);
