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
    .each((err, contest) => { //async so we cant res from each so workaround
      assert.equal(null, err);

      if (!contest) { // no more contests
        res.send(contests);
        return;
      }

      contests[contest.id] = contest;
    });
});

router.get('/contests/:contestId', (req, res) => { // dynamic contestId

});

export default router;