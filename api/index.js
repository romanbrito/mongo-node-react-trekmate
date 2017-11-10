import express from 'express';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';

// mongodb
let mdb;
MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);

  mdb = db;
});

const router = express.Router();


router.get('/contests', (req, res) => {
  //mongodb native driver
  let contests = {}; //
  mdb.collection('contests').find({})
    .project({ // only the fields to be included
      id: 1,
      categoryName: 1,
      contestName: 1
    })
    .each((err, contest) => { //async so we cant res from each so workaround
      assert.equal(null, err);

      if (!contest) { // no more contests
        res.send( { contests } ); // object
        return;
      }

      contests[contest.id] = contest;
    });
});

router.get('/names/:nameIds', (req, res) => { //http://localhost:8080/api/names/101,102
  //mongodb native driver
  const nameIds = req.params.nameIds.split(',').map(Number); //converts array of string into number [101,102]

  let names = {}; //
  mdb.collection('names').find({ id: { $in: nameIds }})
    .each((err, name) => { //async so we cant res from each so workaround
      assert.equal(null, err);

      if (!name) { // no more contests
        res.send( { names } ); // object
        return;
      }

      names[name.id] = name;
    });
});

router.get('/contests/:contestId', (req, res) => { // dynamic contestId
  mdb.collection('contests')
    .findOne({id: Number(req.params.contestId)})
    .then(contest => res.send(contest))
    .catch(console.error);
});

export default router;