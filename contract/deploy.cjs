#!/usr/bin/env node
const fs   = require("fs");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const PRIVATE_KEY = process.env.STX_PRIVATE_KEY;
if (!PRIVATE_KEY) { console.error("STX_PRIVATE_KEY not set"); process.exit(1); }

const CONTRACT_NAME = "blockplot-v3";
const CONTRACT_SRC  = fs.readFileSync(path.join(__dirname, "blockplot.clar"), "utf8");
const FEE           = 220000; // 0.22 STX

const {
  makeContractDeploy,
  broadcastTransaction,
  AnchorMode,
  PostConditionMode,
  TransactionVersion,
  getAddressFromPrivateKey,
} = require("@stacks/transactions");

const { STACKS_MAINNET } = require("@stacks/network");

const network = { ...STACKS_MAINNET, client: { baseUrl: "https://api.mainnet.hiro.so" } };

async function deploy() {
  const senderAddress = getAddressFromPrivateKey(PRIVATE_KEY, TransactionVersion.Mainnet);
  console.log(`Deployer : ${senderAddress}`);
  console.log(`Contract : ${CONTRACT_NAME}`);
  console.log(`Fee      : ${FEE} uSTX (${FEE / 1e6} STX)`);

  console.log("\nBuilding deploy transaction...");
  const tx = await makeContractDeploy({
    contractName:      CONTRACT_NAME,
    codeBody:          CONTRACT_SRC,
    senderKey:         PRIVATE_KEY,
    network:           network,
    anchorMode:        AnchorMode.Any,
    // Deny mode: no unexpected asset transfers allowed
    postConditionMode: PostConditionMode.Deny,
    fee:               FEE,
  });

  console.log("Broadcasting to mainnet...");
  const result = await broadcastTransaction({ transaction: tx, network: network });

  if (result.error) {
    console.error("\n❌ Broadcast failed:");
    console.error(JSON.stringify(result, null, 2));
    process.exit(1);
  }

  const txid = typeof result === "string" ? result : result.txid;
  console.log(`\n✅ Broadcast successful!`);
  console.log(`TXID     : ${txid}`);
  console.log(`Explorer : https://explorer.hiro.so/txid/${txid}?chain=mainnet`);
  console.log(`Contract : ${senderAddress}.${CONTRACT_NAME}`);
}

deploy().catch((err) => { console.error(err); process.exit(1); });
