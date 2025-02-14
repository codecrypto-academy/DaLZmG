import { Bytes, Web3 } from 'web3';
import fs from 'fs';

require('dotenv').config();

const {
  LINK_NODE_URL,
  PRIVATE_KEY
} = process.env;

export const getLastBlockNumber = (): Promise<bigint> => {
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(LINK_NODE_URL);

    web3.eth.getBlockNumber()
      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export const getLastBlockData = (): Promise<Object> => {
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(LINK_NODE_URL);

    web3.eth.getBlock('latest')
      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export const getBlockByNumber = (blockNumber: number): Promise<Object> => {
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(LINK_NODE_URL);

    web3.eth.getBlock(blockNumber)
      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export const getBalance = (wallet: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(LINK_NODE_URL);

    web3.eth.getBalance(wallet)
      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export const getTransaction = (txHash: string): Promise<Object> => {
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(LINK_NODE_URL);

    web3.eth.getTransaction(txHash)
      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      })
  })
}
export const sendTransaction = (from: string, to: string, value: number): Promise<Bytes> => {
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(LINK_NODE_URL);

    try {
      const tx = {
        from,
        to,
        value: web3.utils.toWei(value, 'ether'),
        gas: 21000,
        gasPrice: await web3.eth.getGasPrice(),
        nonce: await web3.eth.getTransactionCount(from, 'latest'),
        // chainId: '4800'
      };

      web3.eth.sendTransaction(tx)
        .then((resp) => {
          resolve(resp.transactionHash);
        })
        .catch((error) => {
          reject(error);
        })
    } catch (error) {
      console.error('Error al enviar la transacción:', error);
      reject(error)
    }
  })
}

export const sendSignedTransaction = (from: string, to: string, value: number): Promise<Bytes> => {
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(LINK_NODE_URL);
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = await web3.eth.getTransactionCount(from, 'latest');

    try {
      const tx = {
        from,
        to,
        value: web3.utils.toWei(value, 'ether'),
        gas: 21000,
        gasPrice,
        nonce,
        chainId: await web3.eth.net.getId()
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY as string);

      web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        .then((resp) => {
          resolve(resp.transactionHash);
        })
        .catch((error) => {
          reject(error);
        })
    } catch (error) {
      console.error('Error al enviar la transacción:', error);
      reject(error)
    }
  })
}

export const getLocalPrivKey = async () => {
  const web3 = new Web3('http://localhost:8545');

  const keystoreFilePath = '../nodo3/keystore/UTC--2025-02-13T21-20-58.811217300Z--98349b71a397fc7af6a1bdcac0d605c0e7ae5e91';
  // const keystoreFilePath = '../nodo1/keystore/UTC--2025-02-13T21-17-04.327910100Z--22294b896ad46530bd1b6ae50a8e4adb477453ae';
  const password = '0123456789'; // La contraseña que usaste al crear la cuenta

  // Leer el archivo de la cuenta
  const keystore = fs.readFileSync(keystoreFilePath, 'utf8');

  // Desencriptar la cuenta
  const account = await web3.eth.accounts.decrypt(JSON.parse(keystore), password);
  console.log(account);
}

const app = async () => {
  const blockNumber = 2;
  const mainWallet = '0x23997E1562faB0815C9Bb15f06D48fD7079273D0'.toLowerCase();
  const secondWallet = '0x789b1182f498Be80c0d7D36E395c2CBC53b44B0C'.toLowerCase();
  const node1_wallet1 = '0x22294b896ad46530bd1b6ae50a8e4adb477453ae'.toLowerCase();

  let txHash: Bytes = '';

  try {
    await getLastBlockNumber()
      .then((resp) => {
        console.log(`Last Block number is: ${resp}`);
      })
      .catch(error => {
        console.error(`Error: ${error}`);
      })

    await getLastBlockData()
      .then((resp) => {
        console.log(`Last Block data is:`, resp);
      })
      .catch(error => {
        console.error(`Error: ${error}`);
      })

    await getBlockByNumber(blockNumber)
      .then((resp) => {
        console.log(`Block ${blockNumber} data is:`, resp);
      })
      .catch(error => {
        console.error(`Error: ${error}`);
      })

    await getBalance(secondWallet)
      .then((resp) => {
        console.log(`Wallet ${secondWallet} balance is: ${Web3.utils.fromWei(resp.toString(), 'ether')} ETH`);
      })
      .catch(error => {
        console.error(`Error: ${error}`);
      })

    await sendTransaction(node1_wallet1, secondWallet, 1)
      .then((resp) => {
        txHash = resp;
        console.log(`New Transaction hash is: ${resp}`);
      })
      .catch(error => {
        console.error(`Error: ${error}`);
      })

    if (txHash != '') {
      await getTransaction(txHash)
        .then((resp) => {
          console.log(`Transaction ${txHash} data is:`, resp);
        })
        .catch(error => {
          console.error(`Error: ${error}`);
        })
    } else {
      console.log(`Transaction hash is empty`);
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

console.log('Starting app...');
app();

// getLocalPrivKey();
