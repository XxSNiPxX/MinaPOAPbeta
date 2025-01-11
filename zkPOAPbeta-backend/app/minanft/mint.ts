import type { blockchain, MintParams } from "minanft";
import {
  serializeTransaction,
  sendTransaction,
} from "./client-utils";
import { createFileFromImageUrl } from "./common-utils";
import { pinFile } from "./server-utils";
import { PrivateKey  } from 'o1js'
import type { VerificationKey } from "o1js";
import { Field, PublicKey, UInt64, Mina, Signature, UInt32,CircuitString,Struct,Encoding } from "o1js";
interface ReservedItem {
  username: string;
  price: number;
  currency: string;
  description: string;
}
import {
  MinaNFT,
  NameContractV2,
  RollupNFT,
  FileData,
  initBlockchain,
  MINANFT_NAME_SERVICE_V2,
  VERIFICATION_KEY_V2_JSON,
  fetchMinaAccount,
  api,
  serializeFields,
  wallet,

} from "minanft";

import fs = require('fs');
import crypto = require('crypto');




const calculateSHA512 = async (filePath: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const hash = crypto.createHash('sha512');
    const stream = fs.createReadStream(filePath);

    stream.on('data', (data) => {
      hash.update(data);
    });

    stream.on('end', () => {
      const hashString = hash.digest('base64');
      resolve(hashString); // Return the hash as a string
    });

    stream.on('error', (err) => {
      reject(err); // Reject the promise on error
    });
  });
};

//UPDATE THIS WITH THE VALUES YOU B62qqhL8xfHBpCUTk1Lco2Sq8HitFsDDNJraQG9qCtWwyvxcPADn4EV
const CHAIN_NAME = "devnet"
const MINANFT_CONTRACT_ADDRESS = "B62qs2NthDuxAT94tTFg6MtuaP1gaBxTZyNv9D3uQiQciy1VsaimNFT"
const contractAddress = MINANFT_CONTRACT_ADDRESS;
const chain: blockchain = CHAIN_NAME;
const NEXT_PUBLIC_PINATA_JWT="PINNING JWT"
const NEXT_PUBLIC_MINANFT_JWT= "MINA NFT JWT FROM THE BOT"
const BLOCKBERRY_MAINNET_BASE_URL="BLOCKBERRY_CAN_IGNORE"
const BLOCKBERRY_API_KEY="BLOCKBERRY_CAN_IGNORE"
const ownerPrivKey="PRIVATE_KEY_OF_BACKEND_WALLET"
const ownerPubKey="PUBLIC_KEY_OF_BACKEND_WALLET"
const ownerPrivateKey=PrivateKey.fromBase58(ownerPrivKey);
const wallet_address=ownerPubKey


function generateRandomString(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
export async function mint(eventname:string,userid:string,eventdescription:string,address_of_minter:string) {
  const nft_minter=PublicKey.fromBase58(address_of_minter);

  console.log("######## MINT NFT Flow Starts ######");
  const name = eventname+userid+generateRandomString(9)
  const price = 0
  const collection = "betaPOAP"
  const description = eventdescription

  //ipfs must be pinning this is a todo


  //this is the link of an image available via https that directly points to an images
  const signed_image_url="http://localhost:8100/favicon.png"
  const nft_id="@testlolnoob41"

  const nft_image: any = await createFileFromImageUrl({
      image_url: signed_image_url,
      name: `${nft_id}.png`,
    });
  //
  const ipfs = await pinFile({
      file: nft_image,
      keyvalues: {
        name,
        owner: address_of_minter,
        contractAddress: MINANFT_CONTRACT_ADDRESS,
        chain: CHAIN_NAME,
        developer: "BySNiP",
        repo: "zkpoapbeta",
      },
    });

    //const ipfs="bafybeiaaerbk3sdqe2vq2lhfmnchilmz3xieq7xkwh2vduypt5t3e56c7q"

  //  const ipfs= "bafkreifljn4kqloeoddmrlusinjropogdgh2u7zkwoqdlenodxore6az34"
  //  console.log(ipfs,"IPFS")
  // const signed_image_url= "TODO"
  // const keys =
  //  const {
  //    name,
  //    price,
  //    collection,
  //    description,
  //    keys,
  //    ipfs,
  //    signed_image_url,
  //    nft_id,
  //  } = params;


   //RESEARCH IS PUBLIC PRINT UTILITY

  const collectionConfig = {
    "betaPOAP": {
      "total_nft_count": "15000", // String value representing total NFTs
      "nft_mint_start_date_time_utc": "2024-08-28", // Date in UTC (could be better represented as a Date object)
      "is_mint_public": false, // Boolean flag to indicate public mint
      "fee_master_public_key": "B62qqhL8xfHBpCUTk1Lco2Sq8HitFsDDNJraQG9qCtWwyvxcPADn4EV" // Public key for fees
    }
  }

   const feeMasterPublicKey = collectionConfig.betaPOAP.fee_master_public_key



//Public key is used for what? who is server in this context?

   if (!ownerPubKey) {
     return { success: false, message: "No account found" };
   }


   //PUBLIC KEY DEVNET MINA NFT SITE -

   if (contractAddress !== MINANFT_NAME_SERVICE_V2) {
     console.error(
       "Contract address is not the same as MINANFT_NAME_SERVICE_V2"
     );
     return {
       success: false,
       message: "Contract address is not the same as MINANFT_NAME_SERVICE_V2",
     };
   }

//PINIATA JWT

   const nftPrivateKey = PrivateKey.random();
   const address = nftPrivateKey.toPublicKey();
   const net = await initBlockchain(chain);
   const sender = PublicKey.fromBase58(ownerPubKey);

   const pinataJWT = NEXT_PUBLIC_PINATA_JWT;
   const jwt = NEXT_PUBLIC_MINANFT_JWT;
   const minanft = new api(jwt);


   //NOUNCE CALCULATION


//THIS IS HERE
  //   async function getZkAppTxsFromBlockberry(wallet_address: string) {
  //     const options = {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       "x-api-key": BLOCKBERRY_API_KEY,
  //     },
  //   };
  //   try {
  //     const response = await fetch(
  //       `${BLOCKBERRY_MAINNET_BASE_URL}/v1/zkapps/accounts/${wallet_address}/txs?size=10&orderBy=DESC&sortBy=AGE`,
  //       options
  //     );
  //     const result = await response.json();
  //     // console.log("zkAppTxs", result);
  //     return result;
  //   } catch (err) {
  //     console.error(err);
  //     return undefined;
  //   }
  // }
  //   async function getPaymentTxsFromBlockberry(wallet_address: string) {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       "x-api-key": BLOCKBERRY_API_KEY,
  //     },
  //   };
  //
  //   try {
  //     const response = await fetch(
  //       `${BLOCKBERRY_MAINNET_BASE_URL}/v1/accounts/${wallet_address}/txs?page=0&size=1&orderBy=DESC&sortBy=AGE&direction=OUT`,
  //       options
  //     );
  //     const result = await response.json();
  //     // console.log("paymentTxs", result,result.data[0]?.nonce);
  //     if(result.data[0]?.nonce==undefined){
  //       return undefined
  //     }
  //     return result;
  //   } catch (err) {
  //     console.error(err);
  //     return undefined;
  //   }
  // }
  //
  //
  // // Fix: Specify 'ms' as a number type
  // const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
  //
  // // Fix: Specify 'fetchFunction' as a function that returns a Promise
  // const executeWithRetry = async (fetchFunction: () => Promise<any>, retries = 3, delayMs = 5000): Promise<any> => {
  //   for (let attempt = 1; attempt <= retries; attempt++) {
  //     try {
  //       console.log(`Attempt ${attempt} of ${retries}...`);
  //       const result = await fetchFunction(); // Execute the fetch transaction
  //
  //       console.log('Transaction retrieval successful!');
  //       return result;
  //     } catch (error: unknown) {
  //       // Fix: Assert error as an instance of Error
  //       if (error instanceof Error) {
  //         console.error(`Error on attempt ${attempt}: ${error.message}`);
  //       } else {
  //         console.error(`Unknown error on attempt ${attempt}`);
  //       }
  //
  //       if (attempt === retries) {
  //         console.error('All attempts failed.');
  //         throw error; // Re-throw the error after retries
  //       }
  //
  //       console.log(`Retrying in ${delayMs / 1000} seconds...`);
  //       await delay(delayMs); // Wait for a few seconds before retrying
  //     }
  //   }
  // };
  //
  //   const zkAppTxsPromise = executeWithRetry(() => getZkAppTxsFromBlockberry(wallet_address));
  //   const paymentTxsPromise = executeWithRetry(() => getPaymentTxsFromBlockberry(wallet_address));
  //
  //   const paymentTxs = await paymentTxsPromise; // Wait for payment transactions
  //
  //
  //   const paymentNonce = (await paymentTxs)?.data[0]?.nonce ?? -1;
  //   let zkNonce = -1;
  //   let found = false;
  //   const zkAppTxs = await zkAppTxsPromise; // Wait for zkApp transactions
  //
  //   // const zkAppTxs = await zkAppTxsPromise;
  //   //console.log(paymentNonce,zkAppTxs)
  //
  //   const size = zkAppTxs?.data?.length ?? 0;
  //   let i = 0;
  //   while (!found && i < size) {
  //   if (zkAppTxs?.data[i]?.proverAddress === wallet_address) {
  //    zkNonce = zkAppTxs?.data[i]?.nonce;
  //    found = true;
  //   }
  //   i++;
  //   }
  //   let nonce = Math.max(zkNonce, paymentNonce);
  //   console.log("nonce", { zkNonce, paymentNonce, nonce });
  //   nonce++;





   // console.log("NONCE", nonce);
   // if (!nonce) {
   //   throw new Error("failed to fetch nonce");
   //   return;
   // }

   //WHAT IS RESERVED_PRICE_REDUCE_KEY?
   //Ignore this reservced price reduced key

   const RESERVED_PRICE_REDUCE_KEY="dbnggujMBvxEc8cVXDpGaiokANYvYCHW_DfBu567eqhi_V"
   const reservedPromise = minanft.reserveName({
     name,
     publicKey: address_of_minter,
     chain: CHAIN_NAME,
     contract: contractAddress,
     version: "v2",
     developer: "BySNiP",
     repo: "zkpoapbeta",
     // key: RESERVED_PRICE_REDUCE_KEY,
   } as any);

    //WHAT IS THIS
    //METADAT resposnibel for metadata for traits
   const nft = new RollupNFT({
     name,
     address,
     external_url: net.network.explorerAccountUrl + address.toBase58(),
   });

   console.log("prepared data", nft);
   //console.log(nft.metadataRoot,"nft.metadataRoot")


      nft.update({ key: `collection`, value: collection });

      nft.updateText({
       key: `description`,
       text: description,
     });

   const sha3_512 = await calculateSHA512("./uploads/favicon.png");

   const sha3_512_test="Z6ErOcqC1Z16gXpQcqSPnLfq7xou6N/CtpGE4HE+ToPVVy97fMAzpqeAeQpIZPkhO6x3QLezy4GsAbnKBW/+pw=="

   if(sha3_512===sha3_512_test){
     console.log("SHAs match")
   }else{
     console.log("SHAs do not match")
     console.log(sha3_512,"//////////////////",sha3_512_test)

   }

   const reserved = await reservedPromise;

   //console.log("Reserved name", reserved);
   if (
     reserved === undefined ||
     reserved.isReserved !== true ||
     reserved.signature === undefined ||
     reserved.signature === "" ||
     reserved.price === undefined ||
     reserved.expiry === undefined ||
     (reserved.price as any)?.price === undefined
   ) {
     console.error("Name is not reserved");
     return {
       success: false,
       message: "Name is not reserved",
       reason: reserved.reason,
     };
   }
   console.log(reserved,"reserved")




   const signature = Signature.fromBase58(reserved.signature);


   if (signature === undefined) {
     console.error("Signature is undefined");
     return {
       success: false,
       message: "reserved response signature is undefined",
     };
   }

   const expiry = UInt32.from(reserved.expiry);
   console.log(expiry,"expiry")

   const imageData = new FileData({
     fileRoot: Field(0),
     height: 0,
     filename: nft_image!.name.substring(0, 30),
     size: nft_image!.size,
     mimeType: nft_image!.type.substring(0, 30),
     sha3_512:sha3_512_test,
     storage: `i:${ipfs}`,
   });

   nft.updateFileData({ key: `image`, type: "image", data: imageData });

   const commitPromise = nft.prepareCommitData({ pinataJWT });


   const zkAppAddress = PublicKey.fromBase58(MINANFT_NAME_SERVICE_V2);
   const zkApp = new NameContractV2(zkAppAddress);
   console.log("before fee")

   const fee = Number((await MinaNFT.fee()).toBigInt());
   console.log(fee,"after fee")

   const memo = ("mint@" + name).substring(0, 30);;
   await fetchMinaAccount({ publicKey: sender });
  await fetchMinaAccount({ publicKey: zkAppAddress });
   //await fetchMinaAccount({ publicKey: sender });
   console.log(sender,"sender")

   //await fetchMinaAccount({ publicKey: zkAppAddress });
   console.log("prepared commit data");
   await commitPromise;
   console.log("prepared commit data");
   console.log("prepared tx");
   //const feeMaster = PublicKey.fromBase58(feeMasterPublicKey);

   if (nft.storage === undefined) {
     return {
       success: false,
       message: "nft storeage is undefined",
     };
   }
   if (nft.metadataRoot === undefined) {
     return {
       success: false,
       message: "nft metadata root is undefined",
     };
   }

   const json = JSON.stringify(
     nft.toJSON({
       includePrivateData: true,
     }),
     null,
     2
   );
   console.log("nft json", json);

//WE NEED TO ADD VERIFICATION KEY TO INSTALL THE NFT ITS USED TI VERIFY I AM SENDING IT TO RIGHT CONTRACT NO NEED TO RECOMIPLE CONTRACT
   const verificationKey: VerificationKey = {
     hash: Field.fromJSON(VERIFICATION_KEY_V2_JSON["devnet"].hash),
     data: VERIFICATION_KEY_V2_JSON["devnet"].data,
   };

   const oraclePub="B62qids6rU9iqjvBV4DHxW8z67mgHFws1rPmFoqpcyRq2arYxUw6sZu"
   const oracle = PublicKey.fromBase58(oraclePub);
   let contract=PublicKey.fromBase58(contractAddress)
    class MintSignatureData extends Struct({
     contract: PublicKey,
     name: Field,
     owner: PublicKey,
     fee: UInt64,
     feeMaster: PublicKey,
     networkIdHash: Field,
     expiry: UInt32,
   }) {}

   let naame=MinaNFT.stringToField(nft.name!);
   let haash=Encoding.stringToFields("testnet")[0];
   console.log(haash)
   let tmpp = await signature
      .verify(
        oracle,
        MintSignatureData.toFields(
          new MintSignatureData({
            contract: contract,
            owner:sender,
            name:naame,
            fee:UInt64.from((reserved.price as any)?.price * 1_000_000_000),
            feeMaster:wallet,
            networkIdHash:haash,
            expiry,
          })
        )
      )
    console.log(tmpp)
    //feeMaster: feeMaster,
   //let tmpres:ReservedItem=reserved.price
   console.log(typeof reserved.price,(reserved.price as any)?.price,"PRICE",UInt64.from(BigInt((reserved.price as any)?.price * 1_000_000_000)))
   // const priceNumber = parseFloat(price); // or use Number(price)
   //  const convertedPrice = Math.floor(priceNumber * 1e9); // Ensure it's an integer
   const mintParams: MintParams = {
     name: naame,
     address,
     owner: nft_minter,
     price: UInt64.from(price * 1e9),
     fee: UInt64.from((reserved.price as any)?.price * 1_000_000_000),
     feeMaster: wallet,
     verificationKey,
     signature,
     metadataParams: {
       metadata: nft.metadataRoot,
       storage: nft.storage,
     },
     expiry,

   };




   console.log("============= mint params ===============",mintParams);

   // console.log(nft.name!)
   // console.log(address.toBase58())
   // console.log(sender.toBase58())
   // console.log(UInt64.from(convertedPrice),"...",convertedPrice)
   // console.log(UInt64.from(BigInt((reserved.price as any)?.price * 1_000_000_000)))
   // console.log(feeMaster.toBase58())
   // console.log(verificationKey)
   // console.log(signature.toBase58())
   // console.log(expiry.toString())
   // console.log(nft.metadataRoot)
   // console.log(nft.storage)


   let tx: any;
   try {
     tx = await Mina.transaction({ sender, fee, memo }, async () => {
       await zkApp.mint(mintParams);
     });
     // console.log("MINT Transaction done");
   } catch (error: any) {
     if (error) {
       // console.log("transaction error 273", error);
       return {
         success: false,
         message: "Transaction failed! Please try again",
       };
     }

     return {
       success: false,
       message: "An unexpected error occurred",
     };
   }
   // console.log("mint transaction", tx);
    tx.sign([nftPrivateKey,ownerPrivateKey]);

   //tx.sign([nftPrivateKey]);
   await NameContractV2.compile()
   await tx.prove()
   let result=await tx.send()





//    tx.prove()
   // const serializedTransaction = serializeTransaction(tx);
   // const transaction = tx.toJSON();
   // console.log("Transaction", tx.toPretty());
   // transaction.sign([ownerPrivKey])

//    console.log("Transaction", tx.toPretty());
//    const payload = {
//      transaction,
//      onlySign: true,
//      feePayer: {
//        fee: fee,
//        memo: memo,
//      },
//    };
//    console.timeEnd("prepared tx");
//    console.timeEnd("ready to sign");
//    let txResult;
//    function isErrorWithCode(error: unknown): error is { code: number } {
//      return typeof error === "object" && error !== null && "code" in error;
//    }
//
// //0 mina nft price for it to not be on sale.
//    const nftPrice =
//      Number(
//        JSON.parse(payload.transaction).accountUpdates[1].body.balanceChange
//          .magnitude
//      ) / 1e9;
//
//    console.log("NFT PRICE", nftPrice);
//    try {
//      txResult = await (window as any).mina?.sendTransaction(payload);
//    } catch (error: unknown) {
//      if (isErrorWithCode(error) && error.code === 1002) {
//        console.log("transaction error 273", error);
//        return {
//          success: false,
//          message: "You cancelled the transaction! Please try again",
//        };
//      }
//      // Handle other types of errors
//      console.error("An unexpected error occurred:", error);
//      return {
//        success: false,
//        message: "An unexpected error occurred",
//      };
//    }
// let tx2:any;
// try {
//   // tx2 = await Mina.transaction({ sender, fee, transaction });
//    tx2 = await Mina.transaction(sender:ownerPubKey, fee, memo:transaction, async () => {
// });
//   console.log("MINT Transaction done");
// } catch (error: any) {
//   if (error) {
//     console.log("transaction error 273", error);
//     return {
//       success: false,
//       message: "Transaction failed! Please try again",
//     };
//   }
//
//   return {
//     success: false,
//     message: "An unexpected error occurred",
//   };
// }
// tx2.sign([ownerPrivateKey])
// console.log(transaction.toFields())
// const signedData = transaction?.signedData;
// if (signedData === undefined) {
//   console.log("No signed data");
//   return undefined;
// }
// console.log(signedData)
//    console.log("Transaction result", txResult);
//    console.time("sent transaction");
//    setMintProgress({
//      [nft_id]: {
//        step: 5,
//        message: "Waiting for Transaction Confirmation...",
//      },
//    });
//    const signedData = txResult?.signedData;
//    if (signedData === undefined) {
//      console.log("No signed data");
//      return undefined;
//    }
//
//
//    //tx.prove()
//
//    //8GB RAM Resonable works with 4 GB too but dont take risk
//    //cache configuration needed incase proving false
//    //check o1js to see how to cache
//
//    const sentTx = await sendTransaction({
//      serializedTransaction,
//      signedData,
//      mintParams: serializeFields(MintParams.toFields(mintParams)),
//      contractAddress,
//      name,
//      nonce,
//    });


   // setMintProgress({
   //   [nft_id]: {
   //     step: 6,
   //     message: "Transaction confirmed and NFT Minted successfully.",
   //   },
   // });

   // if (sentTx.hash.toLocaleLowerCase().includes("error")) {
   //   return { success: false, message: sentTx.hash };
   // }
   // console.log(tx.hash())
   return { success: true,result:result };

  /*
  // Uncomment to wait for transaction to be included in a block and index the NFT
  console.log("Waiting for transaction to be included in a block...");
  console.time("Transaction included in a block");
  await MinaNFT.wait(tx);
  console.timeEnd("Transaction included in a block");

  const indexed = await minanft.indexName({ name });
  console.log("Indexed:", indexed);
  */
}
