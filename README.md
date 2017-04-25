# blokur

Sample app for blokur.

Testing is provided on each service on a unit basis.

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
