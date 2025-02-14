# Web 2.5 - Ethereum Project

## Description 

On this proyect I'm going to describe how to develop an Ethereum private network with each nodes as you want, three for the example.

## Develop proccess

### Account creation 

**Created a `pwd.txt` file with the password that will be used inside. (This file it's not present in to the repository)**

Created node accounts using `geth`: 

```
geth --datadir nodo1 account new --password ./pwd.txt
geth --datadir nodo2 account new --password ./pwd.txt
geth --datadir nodo3 account new --password ./pwd.txt
geth --datadir nodo3 account new --password ./pwd.txt
geth --datadir nodo3 account new --password ./pwd.txt
```

Where `nodo1` and `./pwd.txt` are parameters.

### Genesis json file creation

Used `puppeth` to create a genesis json file for the network. 
`puppeth` is discontinued and now it's recommended to use `kurtosis` [here is the documentation](https://geth.ethereum.org/docs/fundamentals/kurtosis) to crate a new project using it.

### Node initialization 

Initialized each node we have to init using account data and genesis file we created before:

```
geth init --datadir nodo1 ./ethzmg.json
geth init --datadir nodo2 ./ethzmg.json
geth init --datadir nodo3 ./ethzmg.json
```

### Bootnode service

Bootnode is a service used by nodes to discover other nodes, integrate them with the network, and connect them to each other.

Used the `bootnode` tool to initiate a bootnode service with this two steps: 

1. Generating a key: 
```
  bootnode -genkey boot.key
```

2. Starting the service: 
```
  bootnode -nodekey boot.key -addr :30305
```

### Node running

Used `geth` to run each node. 

Running node1:
```
geth --datadir nodo1 --syncmode full --http --http.api admin,eth,miner,net,txpool,personal --http.port 8545 --allow-insecure-unlock --unlock "22294b896ad46530bd1b6ae50a8e4adb477453ae" --password ./pwd.txt --port 30034 --bootnodes "enode://f5eecbe2e4459c7d5383beb013d51b49fd8778f65f11441e832b73615bdd376527fa9bfa3d7e2fd7ee3e3d567c01bfd8775e38eb845b82a733dfcc44a0b70b09@127.0.0.1:0?discport=30305" --ipcpath " url=\\.\pipe\geth.ipc" --authrpc.port 8551 --mine
```

Running node2:
```
geth --datadir nodo2 --syncmode full --http --http.api admin,eth,miner,net,txpool,personal --http.port 8546 --allow-insecure-unlock --unlock "9479d634306852036926782ca4ee91c4a24c1413" --password ./pwd.txt --port 30035 --bootnodes "enode://f5eecbe2e4459c7d5383beb013d51b49fd8778f65f11441e832b73615bdd376527fa9bfa3d7e2fd7ee3e3d567c01bfd8775e38eb845b82a733dfcc44a0b70b09@127.0.0.1:0?discport=30305" --ipcpath " url=\\.\pipe\geth2.ipc" --authrpc.port 8552 --mine
```

Running node3:
```
geth --datadir nodo3 --syncmode full --http --http.api admin,eth,miner,net,txpool,personal --http.port 8547 --allow-insecure-unlock --unlock "98349b71a397fc7af6a1bdcac0d605c0e7ae5e91" --password ./pwd.txt --port 30036 --bootnodes "enode://f5eecbe2e4459c7d5383beb013d51b49fd8778f65f11441e832b73615bdd376527fa9bfa3d7e2fd7ee3e3d567c01bfd8775e38eb845b82a733dfcc44a0b70b09@127.0.0.1:0?discport=30305" --ipcpath " url=\\.\pipe\geth3.ipc" --authrpc.port 8553 --mine
```

### Node management

In order to connect to one of the created nodes: 

```
geth attach http://localhost:8545
``` 

Once inside we can use functions like:

- `admin.nodeInfo` to query node information 
- `eth.blockNumber` to check the current block number
- `eth.getBlock(n)` to check `n` bock info.

You can find [documentation here](https://geth.ethereum.org/docs/interacting-with-geth/rpc/ns-admin)

Nodes are stoped by default if you don't use the flag `--mine` when launching, it's possible to use `miner.start()` to do the node starts minning.