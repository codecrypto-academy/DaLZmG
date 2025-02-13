# Web 2.5 - Faucet Project

## Description

On this project you will find a FrontEnd (Vite + TaildwindCSS + Shadcn) and a BackEnd (NodeJS + Express + Ethers) and a Ethereum local node.

## Instalación y funcionamiento

The project have tree folders:
```
  docker-node
  node-back
  vite-front
```

### Instalación y running: 

1. Run Docker node (using Powershell): 
```
  cd docker-node 
  launch_node.bat
```

2. Install and run NodeJS BackEnd:
```
  cd node-back
  npm install
  npm start
```

3. Install and run FrontEnd: 
```
  cd vite-front 
  npm install
  npm run dev
```

## Development proccess details

### FrontEnd creation with Vite

- TailwindCSS added
- Shadcn added (having on mind compatibility improvements needed / canary)

### BackEnd creation with NodeJS + Express

- Created NodeJS + Express backend
  - Added Cors for local development and frontend testing

### Docker container creationg with Ethereum node

- Created a Docker container with an Ethereum node running inside

#### Powershell most relevant commands: 

```bash
docker run -v .\pwd.txt:/pwd.txt -v .\data:/data ethereum/client-go:v1.13.15 account new --password /pwd.txt --datadir /data
```

#### Genesis file for Ethereum node:  

```
{
  "config": {
    "chainId": 15,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "clique": {
      "period": 10,
      "epoch": 30000
    }
  },
  "difficulty": "1",
  "gasLimit": "8000000",
  "extradata": "0x0000000000000000000000000000000000000000000000000000000000000000532c050f5ff4690d694d438e346446fdab96e5da0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "alloc": {
    "0x532c050f5ff4690d694d438e346446fdab96e5da": {
      "balance": "300000000000000000000000000000000"
    },
    "0x23997E1562faB0815C9Bb15f06D48fD7079273D0": {
      "balance": "300000000000000000000000000000000"
    }
  }
}
```

- Replace main account address for `extradata` and `alloc` values. 

- Node initialization: 

```
docker run -v .\genesis.json:/genesis.json -v .\data:/data ethereum/client-go:v1.13.15 init --datadir /data genesis.json
```

```
docker run -d --rm -p 5556:8545 -v .\pwd.txt:/pwd.txt -v .\data:/data ethereum/client-go:v1.13.15 --datadir /data --unlock 532c050f5ff4690d694d438e346446fdab96e5da --allow-insecure-unlock --mine --miner.etherbase 532c050f5ff4690d694d438e346446fdab96e5da --password pwd.txt  --nodiscover  --http  --http.addr "0.0.0.0"  --http.api "admin,eth,debug,miner,net,txpool,personal,web3"  --http.corsdomain "*"
```

### Notes

- Check the backend endpoint `/api/balance` using `curl`:

```bash
  curl http://localhost:3000/api/balance/0x23997E1562faB0815C9Bb15f06D48fD7079273D0
```

- Check the backend endpoint `/api/faucet` using `curl`: 

```bash
  curl http://localhost:3000/api/faucet/0x23997E1562faB0815C9Bb15f06D48fD7079273D0/1
```

