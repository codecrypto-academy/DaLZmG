import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { getBalance, getFaucet } from './services/ethereum';

require('dotenv').config();

const { 
  PORT
} = process.env;

if (!PORT || PORT.length === 0) {
  throw new Error('PORT is not defined');
}

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/balance/:address', async (req: Request, res: Response) => {
  const { address } = req.params;
  getBalance(address)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
})

app.get ('/api/faucet/:address/:amount', async (req: Request, res: Response) => {
  const { address, amount } = req.params;
  getFaucet(address, Number(amount))
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send
    });
});

app.post('/', (req: Request, res: Response) => {
  const body = req.body;
  res.status(200).send(`Hello ${body.name}`);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});