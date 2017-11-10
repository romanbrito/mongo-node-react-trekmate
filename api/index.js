import express from 'express';
//import data from '../src/testData.json';

const router = express.Router();
// const contests = data.contests.reduce((obj, contest) => { // turning array into object for efficiency
//   obj[contest.id] = contest;
//   return obj;
// }, {});

router.get('/contests', (req, res) => {
  // res.send({
  //   contests: contests
  // });
});

router.get('/contests/:contestId', (req, res) => { // dynamic contestId
  // let contest = contests[req.params.contestId];
  // contest.description = 'fake description since using fake data still';
  // res.send(contest);
});

export default router;