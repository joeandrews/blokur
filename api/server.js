'use strict';

import koa from 'koa';
import KoaRouter from 'koa-router';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';

let app = new koa();
let api = new KoaRouter();

let searchController = require('./controllers/searchController.js');
let artistController = require('./controllers/artistController.js');
// link up the routes here
// we just pass in the service function as middleware to the koa-router
// test are on a unit basis for each serice and method.

// search for a track
api.get('/api/search', searchController.search);
// fetch an artist meta data by spotifyId
api.get('/api/artist/:id/info', artistController.get);
// fetch artist track recommendations via spotify id
api.get('/api/artist/:id/recommendations', artistController.recommendations);
// fetch related artist recommendations via spotify id
api.get('/api/artist/:id/related', artistController.related);
// fetch artist concerts 
api.get('/api/artist/:id/concerts', artistController.recommendations);

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
