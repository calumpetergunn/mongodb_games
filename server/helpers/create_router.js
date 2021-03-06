
const express = require('express');
const ObjectId = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => { 
    collection.find()
    .toArray()
    .then((docs) => res.json(docs))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({status: 500, error:err})
    })

  })

  // READ ONE
  // 
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection.findOne({ _id:ObjectId(id)})
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.error(err);
      res.json({status: 500, error: err})
    })
  })

  router.post('/', (req, res) => {
    const newData = req.body;
    collection.insertOne(newData)
    .then((result) => {
      res.json(result.ops[0])
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({status: 500, error:err})
    })

  })
  // UPDATE
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    collection.findOneAndUpdate(
      { _id:ObjectId(id)},
      { $set: updatedData},
      {returnOriginal: false}
      )
      .then((updatedDoc) => {
        res.json(updatedDoc.value)
      })
  .catch((err) => {
    console.error(err);
    res.status(500);
    res.json({status: 500, error:err})
  })
})

  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection.deleteOne({ _id:ObjectId(id)})
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.error(err);
      res.json({status: 500, error: err})
    })
  })

  return router;

};

module.exports = createRouter;


// HANDLE A GET REQUEST TO /api/games - send back all games
// We need a database
// we need some dummy game data in db


// HANDLE A POST REQUEST

// HANDLE A DELETE REQUEST