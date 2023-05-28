const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();


async function main() {

    const privateKey = process.env.PRIVATE_KEY;
    const walletKey = new ethers.Wallet(privateKey);

    const encryptedJSON = await walletKey.encryptSync(process.env.PASSWORD, privateKey); //encryptSync() is the key here.

    console.log(encryptedJSON);

    fs.writeFileSync("./.encryptedKey.json", encryptedJSON);
}

main().catch(function (error) {

    console.error(error);
    process.exit(1);
});