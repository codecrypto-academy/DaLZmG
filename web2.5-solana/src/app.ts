import solanaWeb3, { Keypair } from '@solana/web3.js';

const checkBalance = async (solanaId: string): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		try {
			let connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet", true));
			//let slot = await connection.getSlot();

			let b58PK = new solanaWeb3.PublicKey(solanaId);

			connection.getBalance(b58PK)
				.then((resp) => {
					resolve(resp);
				})
				.catch((error) => {
					reject(error);
				})
		} catch (error) {
			reject(error);
		}
	})

}

const connectWallet = async (): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		try {
			let keypair = Keypair.generate();

			resolve(keypair);
		} catch (error) {
			reject(error)
		}
	})
}

const exampleId = "5oNDL3swdJJF1g9DzJiZ4ynHXgszjAEpUkxVYejchzrY";
checkBalance(exampleId)
	.then((resp) => {
		console.log(`Balance is: ${resp}`);
	})
	.catch((error) => {
		console.log(`Error: ${error}`);
	})

// connectWallet()
// 	.then((resp) => {
// 		console.log(`Keypair created:`);
// 		console.log(resp);
// 	})
// 	.catch((error) => {
// 		console.log(`Error: ${error}`);
// 	})
