# blokur

Sample app for blokur. This app allows the user to search the spotify api for songs, play previews and explore related music.

![](/images/demo.gif)
----------


Testing is provided on each service on a unit basis and can be viewed in the .spec.js files.

### Installation

The app requires `node v7.70 ` or higher to run.


	 1. `git clone this repo`
	 2. `cd blokur`
	 3. `npm install`
	 4. `npm start`
	 5.

`npm start` will start an api server on `http://localhost:8081` bundle up the front end and serve via webpack on `http://localhost:3000` and run the test suite.

#### Additional build commands

 1. `npm run test` 
 2. `npm run api:watch`




----------




The app is structured as follows :


### Backend
 
The backend exists in the `api` folder and is structured as follows:

```
api/
  controllers/  // handles the web requests via async midelware supplied to the koa framework
  services/    // the majority of the app
      artistService.js // functions to return, artist info, related songs, related artists and concerts.
      searchService.js // search service to serach the spotify api for tracks
      musicService.js // clean wrapper for the spotify API configuration
      
  server.js // the glue code to turn this into an api using KOA.

```


----------


### Frontend

The frontend is a react / redux app and exists in the `web` folder.

