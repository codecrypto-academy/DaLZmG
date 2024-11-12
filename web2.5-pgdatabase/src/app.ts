import { Client } from 'pg';

const client = new Client({
	host: '127.0.0.1',
	port: 5432,
	database: 'template1',
	user: 'postgres',
	password: 'example'
})

export const sillyQuerry = (client: Client): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		try {
			const resp = await client.query("SELECT $1::text as message", ['Hello world!']);
			resolve(resp.rows[0].message);
		} catch (error) {
			reject(error);
		}
	})
}

export const executeQuerry = (client: Client, query: string, params: string[] = []): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		try {
			const resp = await client.query(query, params);
			resolve(resp);
		} catch (error) {
			reject(error);
		}
	})
}

const app = async () => {
	await client.connect();
	console.log(`Database connection started`);


	// CREATE DATABASE 
	await executeQuerry(client, "CREATE TABLE IF NOT EXISTS clients (id serial, name varchar(50), birthday date);")
		.then((resp) => {
			// console.log(resp);
		})
		.catch((error) => {
			console.error(error);
		})


	// CHECK CONNECTION WITH A SILLY QUERY
	await sillyQuerry(client)
		.then((resp) => {
			console.log(`PG Silly response: ${resp}`);
		})
		.catch((error) => {
			console.error(error);
		})



	// INSERT MOCK DATA
	await executeQuerry(client, "INSERT INTO clients(name, birthday) VALUES($1, $2) RETURNING *", ['Jose', '07/10/1998'])
		.then((resp) => {
			for (const row of resp.rows) {
				console.log(row);
			}
		})
		.catch((error) => {
			console.error(error);
		})
	await executeQuerry(client, "INSERT INTO clients(name, birthday) VALUES($1, $2) RETURNING *", ['Juan', '10/02/1969'])
		.then((resp) => {
			for (const row of resp.rows) {
				console.log(row);
			}
		})
		.catch((error) => {
			console.error(error);
		})
	await executeQuerry(client, "INSERT INTO clients(name, birthday) VALUES($1, $2) RETURNING *", ['Pepe', '01/15/2000'])
		.then((resp) => {
			for (const row of resp.rows) {
				console.log(row);
			}
		})
		.catch((error) => {
			console.error(error);
		})


	// QUERY MOCK DATA
	await executeQuerry(client, "SELECT * FROM clients")
		.then(async (resp) => {
			// console.log(resp.rows)
			for (const row of resp.rows) {
				console.log(`Id: ${row.id} - Name: ${row.name} - Birthday: ${new Date(row.birthday).toUTCString()}`);
			}
		})
		.catch((error) => {
			console.error(error);
		})
		
		await client.end();
		console.log(`Database connection ended`);
}


app();

