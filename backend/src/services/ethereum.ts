require('dotenv').config();
import Web3, { Bytes } from 'web3';

const { 
  ETH_API_KEY,
  ETH_API_URL,
} = process.env;

const web3 = new Web3(ETH_API_URL);

export const testFunct = async () => {
  fetch(`${ETH_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_blockNumber",
      params: [],
      id: 1,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export const getLastBlockNumber = async ():Promise<bigint> => {
  return new Promise((resolve, reject) => {
    try {
      web3.eth.getBlockNumber()
        .then((blockNumber) => {
          // console.log(blockNumber);
          resolve(blockNumber);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        }); 
    } catch (error) {
      console.error(error);
      reject(error);
    }
  })
}

export const getBlockData = async (blockNumber: number):Promise<Object> => {
  return new Promise((resolve, reject) => {
    try {
      web3.eth.getBlock(blockNumber)
        .then((blockData) => {
          resolve(blockData);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  })
}

export const getTxData = async (txAddress: Bytes):Promise<Object> => {
  return new Promise((resolve, reject) => {
    try {
      web3.eth.getTransaction(txAddress)
        .then((txData) => {
          resolve(txData);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  })
}

export const getBalance = async (address: string):Promise<Object> => {
  return new Promise((resolve, reject) => {
    try {
      web3.eth.getBalance(address)
        .then((balance) => {
          const ethBalance = web3.utils.fromWei(balance, 'ether');
          resolve({
            balance,
            ethBalance
          });
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  })
}