import { Web3 } from 'web3';

export const getBlockNumber = (ehtURL: string): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		const web3 = new Web3(ehtURL);

		web3.eth.getBlockNumber()
			.then((resp) => {
				resolve(resp);
			})
			.catch((error) => {
				reject(error);
			})
	})
}

export const getBalance = (ethURL: string, wallet: string): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		const web3 = new Web3(ethURL);

		web3.eth.getBalance(wallet)
			.then((resp) => {
				resolve(resp);
			})
			.catch((error) => {
				reject(error);
			})
	})
}

const app = () => {
  const myURL = 'https://eth-mainnet.g.alchemy.com/v2/KNshROFl5qeHvibnGHS7qZmrfHgodUxo';
  
  const myWallet = '0x23997E1562faB0815C9Bb15f06D48fD7079273D0';
  const pdfWallet = '0xff21E724B7D483fc93708855AbE6ee4f1eD97BF3';
  const jViejoWallet = '0x280f1DB3D104dAd8705C0696fb81BD8e78141CAf';
  
  getBlockNumber(myURL)
    .then((resp) => {
      console.log(`Block Number is ${resp}`);
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    })
  
  getBalance(myURL, myWallet)
    .then((resp) => {
      console.log(`My balance is: ${resp}`);
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    })
  
  getBalance(myURL, pdfWallet)
    .then((resp) => {
      console.log(`CodeCrypto balance is: ${resp}`);
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    })
  
    getBalance(myURL, jViejoWallet)
    .then((resp) => {
      console.log(`Jose Viejo balance is: ${resp}`);
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    })
}

app();
