let app = require('koa')();
let router = require('koa-router')();

// link up the routes here
// we just pass in the service function as middleware to the koa-router
// test are on a unit basis for each serice and method.

router.get('/search', searchService.search);



app
  .use(router.routes())
  .use(router.allowedMethods());
