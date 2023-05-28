Differences in deploy.js and deploy1.js

1. deploy.js is taking the local RPC URL from ganache. Its taking a private wallet key from Ganache.
2. That RPC URL and Private Keys are then placed into a .env which will then be hidden with the help of
   .gitignore file.
3. Then you created an encryptKey.js file which will import ethers.js, fs-extra and dotenv packages.
4. Then you imported Private Keys and RPC URL data from .env file. Then you ran .encryptSync() script
   to encrypt the private key and the RPC URL.
5. Then you ran a .fileWriteSync() script to export the encrypted data and write it in a json file called
   .encryptedKey.json
6. Then in the deploy.js file in the main function you imported that RPC URL and Private Key data using
   .fromEncyptedJson() method where you pass the password and the encryptedJson data as arguments.
7. Now your private key, RPC URL and password are encrypted and they can be deleted from the .env file
8. Now you can run your server side scripts as usual. You're getting the abi and the bytecode data from
   the abi and bin files you created during compilation.
9. You created a contractFactory() object and used your abi, bytecode and your walled connetced to the RPC
   URL.
10. Then you deploy the contract using .deploy() function.
11. When you deployed the contract on the blockchain you will now wait for the confirmation of 1 block to 
    add to the blockchain using .deploymentTransaction().wait(1).
12. Then you can access the functions of the smart contract as you wish using contract.<FUNCTION_NAME>();