import { TypeBalance } from "../types/Balance.type";
import { TypeBlock } from "../types/Bock.type";
import { TypeTx } from "../types/Tx.type";

const backEndULR = import.meta.env.VITE_BACK_END_URL;

export const getBalance = (address: string):Promise<TypeBalance> => {
  return new Promise(async (resolve, reject) => {
    try {
      fetch(`${backEndULR}/getBalance/${address}`)
        .then((resp) => resp.json())
        .then((resp) => {
          resolve(resp);
        })
        .catch((error) => {
          reject(error)
        })
    } catch (error) {
      console.log(error);
      reject(error);
    }
  })
}

export const getBlockData = (blockNumber: string):Promise<TypeBlock> => {
  return new Promise(async (resolve, reject) => {
    try {
      fetch(`${backEndULR}/getBlockData/${blockNumber}`)
        .then((resp) => resp.json())
        .then((resp) => {
          resolve(resp);
        })
        .catch((error) => {
          reject(error)
        })
    } catch (error) {
      console.log(error);
      reject(error);
    }
  })
}

export const getTxData = (txNumber: string):Promise<TypeTx> => {
  return new Promise(async (resolve, reject) => {
    try {
      fetch(`${backEndULR}/getTxData/${txNumber}`)
        .then((resp) => resp.json())
        .then((resp) => {
          resolve(resp);
        })
        .catch((error) => {
          reject(error)
        })
    } catch (error) {
      console.log(error);
      reject(error);
    }
  })
}