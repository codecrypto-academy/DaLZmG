import { ethers } from "ethers";
import fs from 'fs';

require('dotenv').config();

const { 
  ETHEREUM_PROVIDER_URL, 
  ETHEREUM_PROVIDER_PASSWORD, 
  NODE_URL
} = process.env;

if (!NODE_URL || NODE_URL.length === 0) {
  throw new Error('NODE_URL is not defined');
}

export const getBalance = async (address: string):Promise<Object> => (
  new Promise((resolve, reject) => {
    try {
      fetch(NODE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_getBalance',
          params: [
            address,
            'latest'
          ],
          id: 1
        })
      })
        .then(res => res.json())
        .then (data => {
          console.log(data);
          resolve({
            address: address,
            balance: (Number(data.result) / 10**18),
            date: new Date().toISOString()
          });
        })
        .catch(err => {
          console.error(err);
          reject(err);
        }) 
    } catch (error) {
      console.error(error);
      reject(error);
    }
  })
);

export const getFaucet = async (address: string, amount: number):Promise<Object> => (
  new Promise(async (resolve, reject) => {
    try {
      if (!ETHEREUM_PROVIDER_URL || ETHEREUM_PROVIDER_URL.length === 0) {
        throw new Error('ETHEREUM_PROVIDER_URL is not defined');
      }
      if (!ETHEREUM_PROVIDER_PASSWORD || ETHEREUM_PROVIDER_PASSWORD.length === 0) {
        throw new Error('ETHEREUM_PROVIDER_PASSWORD is not defined');
      }

      const provider = new ethers.JsonRpcProvider(NODE_URL);
      const mainWalletData = fs.readFileSync(ETHEREUM_PROVIDER_URL || '', 'utf8');
      const wallet = await ethers.Wallet.fromEncryptedJson(mainWalletData, ETHEREUM_PROVIDER_PASSWORD || '');
      const connectedWallet = wallet.connect(provider);
      const tx = await connectedWallet.sendTransaction({
        to: address,
        value: ethers.parseEther(amount.toString())
      });

      await tx.wait();

      // const balance = ethers.formatUnits((await provider.getBalance(address)).toString());
      const balance = Number(await provider.getBalance(address)) / 10**18;

      const result = {
        address,
        amount,
        balance,
        date: new Date().toISOString()
      };

      console.log(result)
      resolve(result);  
    } catch (error) {
      console.error(error);
      reject(error);
    }
  })
);
