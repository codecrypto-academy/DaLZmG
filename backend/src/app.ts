import express from 'express';
import cors from 'cors';
import { getBalance, getBlockData, getLastBlockNumber, getTxData } from './services/ethereum';

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

// Configurar el replacer para convertir BigInt a string
app.set('json replacer', (key: string, value: any) => {
  return typeof value === 'bigint' ? value.toString() : value;
});

// app.get('/', (req, res) => {
//   res.status(200).send('Hello, world!');
// });

app.get('/getLastBlockNumber', async (req, res) => {
  getLastBlockNumber()
    .then((blockNumber) => {
      // console.log({
      //   blockNumber: Number(blockNumber)
      // });
      res.status(200).send({
        blockNumber: Number(blockNumber)
      })
    })
    .catch((error) => {
      res.status(500).send(error);
    })
})

app.get('/getBlockData/:blockNumber', async (req, res) => {
  const { blockNumber } = req.params;
  if (!blockNumber || isNaN(Number(blockNumber))) {
    res.status(400).send('Block number is required');
    return;
  }
  getBlockData(Number(blockNumber))
    .then((blockData) => {
      // console.log(blockData);
      res.status(200).send(blockData);
    })
    .catch((error) => {
      res.status(500).send(error);
    })
})

app.get('/getTxData/:txAddress', async (req, res) => {
  const { txAddress } = req.params;
  if (!txAddress || isNaN(Number(txAddress))) {
    res.status(400).send('Tx address is required');
    return;
  }
  getTxData(txAddress)
    .then((txData) => {
      // console.log(txData);
      res.status(200).send(txData);
    })
    .catch((error) => {
      res.status(500).send(error);
    })
})

app.get('/getBalance/:address', async (req, res) => {
  const { address } = req.params;
  if (!address) {
    res.status(400).send('Address is required');
  }
  getBalance(address as string)
    .then((balance) => {
      // console.log(balance);
      res.status(200).send(balance);
    })
    .catch((error) => {
      res.status(500).send(error);
    }) 
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})