
//Uses Sepolia Test Net with Alchemy Nodes.
const { ethers } = require("ethers");

const fs = require("fs-extra");

const dotenv = require("dotenv");

async function main() {



    const serverProvider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/cKI1agWx255N0Qd1z8gitd0tU784fmHN");

    const wallet = new ethers.Wallet("ebe49b7a1406846d11cb11e17ac4517a66dbc799a4903b8f7418b2b20a401ecb", serverProvider);

    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

    console.log("Deploying Please Wait....");

    const contract = await contractFactory.deploy();
    console.log("Contract successfully deployed. Contract Address is: ", await contract.getAddress());

    await contract.deploymentTransaction().wait(1);

    const currentNumber = await contract.retrieve();
    console.log(`This is the current Number: ${currentNumber.toString()}`);


    const transactionResponse = await contract.store(7); // use ethers.toBigInt(123345454) | access store ftn

    const transactionRecipt = await transactionResponse.wait(1);

    const updatedNumber = await contract.retrieve();

    console.log(`updated number is: ${updatedNumber}`);


}



main().catch(function (error) {

    console.error(error);
    process.exit(1);
});