'use strict';

import koa from 'koa';
import KoaRouter from 'koa-router';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';

let app = new koa();
let api = new KoaRouter();
let searchService = require('./services/searchService.js');
// link up the routes here
// we just pass in the service function as middleware to the koa-router
// test are on a unit basis for each serice and method.

api.get('/search', searchService.search);



app
	.use(cors({
		origin: 'http://localhost:3000'
	}))
	.use(bodyParser())
	.use(json())
	.use(api.routes())
	.use(api.allowedMethods())
	.listen(8081);

console.log('API running on port 8081')
