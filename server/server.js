const express = require('express');
const app = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js')
const cors = require('cors');



app.use(parser.json());
app.use(cors());

MongoClient.connect('/mongodb://localhost:27017')
.then((client) => {
  const db = client.db('games_hub');
  const gamesCollection = db.collection('games');
  const gamesRouter = createRouter(gamesCollection);
  app.use('/api/games', gamesRouter)
})
.catch(console.error);
// create the db - 'games_hub'
// create a new collection to store our data - 'games'

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});

