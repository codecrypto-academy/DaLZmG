import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log(`Request: "/" from ${req.ip}`);
  res.status(200).send('Hello world');
})

export default router;