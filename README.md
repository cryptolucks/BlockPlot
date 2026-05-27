# BlockPlot

A premium, decentralized land registry platform built on the **Stacks blockchain** using **Clarity** smart contracts for secure, transparent, and tamper-proof property ownership management.

🚀 **Live Web App:** [https://blockplot.vercel.app](https://blockplot.vercel.app)

---

## Overview

BlockPlot modernizes land registration by replacing traditional paper-based systems with a decentralized solution built on Stacks — a Bitcoin-secured Layer 2 blockchain. The platform enables property owners, buyers, and government authorities to securely register, verify, and transfer land ownership records on-chain.

By leveraging Stacks and Clarity, BlockPlot benefits from Bitcoin's security model while enabling programmable, auditable smart contracts.

---

## Interactive Web3 Application

The BlockPlot frontend is a high-fidelity Next.js web application showcasing a full property administration dashboard:

* **Sleek Web3 Portal:** Secure land registration page live at `/register`.
* **Synchronized Wallet Connection:** Unified simulated Stacks Hiro Wallet connection synced across the global header and registration cards in real-time.
* **IPFS Title Seal:** Drag-and-drop deed upload simulator producing cryptographic IPFS hashes.
* **Grid Coordinate Visualizer:** Fully dynamic layout plotting geometric land block sizes (m²) on a coordinate grid interface.
* **On-Chain Land Ledger:** Real-time block height updates and transaction record streaming logs.

---

## Features

* Secure on-chain land registration
* Transparent ownership verification
* Immutable property records
* Digital transfer of land ownership
* Wallet authentication via Hiro Wallet
* Role-based access for land authorities and users
* Transaction history tracking
* Fast and transparent property validation

---

## Problem Statement

Traditional land registry systems often face challenges such as:

* Document forgery
* Multiple ownership claims
* Slow verification processes
* Lack of transparency
* Centralized data manipulation

BlockPlot addresses these issues through decentralized and verifiable record management anchored to Bitcoin.

---

## How It Works

1. A land authority registers a property on-chain by calling `register-land`.
2. Ownership details are linked to the owner's Stacks wallet address (`tx-sender`).
3. Anyone can verify land authenticity publicly via `verify-ownership`.
4. Ownership transfers are recorded as Stacks transactions.
5. Every update remains transparent and immutable on-chain.

---

## Tech Stack

* Smart Contracts: **Clarity** (Stacks)
* Blockchain: **Stacks** (Bitcoin-secured Layer 2)
* Frontend: Next.js / React
* Wallet Integration: **Hiro Wallet**
* Storage: IPFS (for land documents)
* Styling: Tailwind CSS
* Dev Tooling: **Clarinet**

---

## Mainnet Deployment

The `blockplot-v3` contract is fully deployed and active on the Stacks Mainnet!

* **Contract ID:** [`SP2N00STXH4K1GBPHC5AM62BP4AJ7STS4XJXCD2D4.blockplot-v3`](https://explorer.hiro.so/txid/38fb14d77cac06ad825c32c6705792879828aed5dc7fc176a837be5146322f19?chain=mainnet)

---

## Smart Contract — `contract/blockplot.clar` (v0.2.0)

### `register-land`

```clarity
(define-public (register-land (location (string-ascii 256)) (area uint) (document-hash (string-ascii 64)))
```

Registers a new land parcel on-chain with its IPFS document hash. Stores the caller (`tx-sender`) as owner, along with location, area, document hash, and the current burn block height. Returns the new `land-id`.

### `verify-ownership`

```clarity
(define-read-only (verify-ownership (land-id uint) (claimant principal))
```

Returns `(ok true)` if `claimant` is the registered owner of the given land parcel, `(ok false)` otherwise. Returns `(err u101)` if the land ID does not exist.

### Other Functions

| Function | Type | Description |
|---|---|---|
| `transfer-land` | public | Transfer ownership of a land parcel to a new owner |
| `update-document` | public | Update the IPFS document hash for a land parcel (owner only) |
| `file-dispute` | public | File a dispute against a land parcel |
| `freeze-land` | public | Admin function to freeze a land parcel from being transferred |
| `unfreeze-land` | public | Admin function to unfreeze a land parcel |
| `resolve-dispute` | public | Admin function to mark a dispute as resolved |
| `get-land` | read-only | Fetch full details of a land parcel |
| `get-land-count` | read-only | Return total registered parcels |
| `get-owner` | read-only | Return the owner of a land parcel |
| `get-transfer-history` | read-only | Return a specific transfer history entry |
| `get-transfer-count` | read-only | Return total number of transfers for a land parcel |
| `get-dispute` | read-only | Get dispute details for a land parcel |

### Error Codes

| Code | Constant | Meaning |
|---|---|---|
| `u100` | `ERR-ALREADY-REGISTERED` | Land ID already exists |
| `u101` | `ERR-NOT-FOUND` | Land ID not found |
| `u102` | `ERR-UNAUTHORIZED` | Caller not authorized |

---

## Installation

Clone the repository:

```bash
git clone https://github.com/cryptolucks/blockplot.git
cd blockplot
```

Install [Clarinet](https://github.com/hirosystems/clarinet) for Clarity development:

```bash
brew install clarinet
```

Check the contract:

```bash
clarinet check
```

Run the Clarinet console to interact with the contract locally:

```bash
clarinet console
```

Example — register a land parcel:

```clarity
(contract-call? .blockplot register-land "Lagos, Plot 42" u500)
```

Example — verify ownership:

```clarity
(contract-call? .blockplot verify-ownership u1 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)
```

Install frontend dependencies:

```bash
npm install
npm run dev
```

---

## Future Improvements

* GIS/Map integration
* NFT-based land certificates (SIP-009)
* Multi-signature ownership approvals
* Government verification portal
* Mobile application support
* AI-powered fraud detection

---

## Use Cases

* Government land registries
* Real estate agencies
* Community land ownership systems
* Property verification platforms
* Cross-border land documentation

---

## Contribution

Contributions are welcome.

To contribute:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Vision

BlockPlot aims to create a future where land ownership is transparent, secure, globally verifiable, and accessible to everyone — anchored to Bitcoin through the Stacks blockchain.
