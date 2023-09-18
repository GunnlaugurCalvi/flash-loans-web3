# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

After deploying the Lock smart contract get the address
place it in the CONTRACT_ADDRESS placeholder in the withdraw.js and run script to fetch your eth back
```shell
npx hardhat run scripts/withdraw.js
```

Create a .env with your PRIVATE_KEY, MY_ADDRESS and ALCHEMY_API_KEY OR INFURA_API_KEY
