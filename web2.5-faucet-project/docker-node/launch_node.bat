docker run -d --rm -p 5556:8545 -v .\pwd.txt:/pwd.txt -v .\data:/data ethereum/client-go:v1.13.15 --datadir /data --unlock 532c050f5ff4690d694d438e346446fdab96e5da --allow-insecure-unlock --mine --miner.etherbase 532c050f5ff4690d694d438e346446fdab96e5da --password pwd.txt  --nodiscover  --http  --http.addr "0.0.0.0"  --http.api "admin,eth,debug,miner,net,txpool,personal,web3"  --http.corsdomain "*"
