
const { ethers } = require("ethers");

const fs = require("fs-extra");

require("dotenv").config();

async function main() {

    //HTTP://192.168.1.78:8545


    const serverProvider = new ethers.JsonRpcProvider("http://192.168.1.78:8545");

    const encryptedJSON = fs.readFileSync("./.encryptedKey.json", "utf8");

    let wallet = ethers.Wallet.fromEncryptedJsonSync(encryptedJSON, process.env.PASSWORD); //don't use the "new" keyword here.

    const abi = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.abi", "utf8");

    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin", "utf8");

    const contractFactory = new ethers.ContractFactory(abi, binary, await wallet.connect(serverProvider));

    console.log("Your contract is being deployed. Please Wait....");

    const contract = await contractFactory.deploy();
    console.log("Contract successfully deployed.");

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