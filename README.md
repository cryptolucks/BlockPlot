# BlockPlot

A decentralized land registry platform built on the **Stacks blockchain** using **Clarity** smart contracts for secure, transparent, and tamper-proof property ownership management.

## Overview

BlockPlot modernizes land registration by replacing traditional paper-based systems with a decentralized solution built on Stacks — a Bitcoin-secured Layer 2 blockchain. The platform enables property owners, buyers, and government authorities to securely register, verify, and transfer land ownership records on-chain.

By leveraging Stacks and Clarity, BlockPlot benefits from Bitcoin's security model while enabling programmable, auditable smart contracts.

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

## Smart Contract — `contracts/blockplot.clar`

### `register-land`

```clarity
(define-public (register-land (location (string-ascii 256)) (area uint))
```

Registers a new land parcel on-chain. Stores the caller (`tx-sender`) as owner, along with location, area, and the current block height. Returns the new `land-id`.

### `verify-ownership`

```clarity
(define-read-only (verify-ownership (land-id uint) (claimant principal))
```

Returns `(ok true)` if `claimant` is the registered owner of the given land parcel, `(ok false)` otherwise. Returns `(err u101)` if the land ID does not exist.

### Other Functions

| Function | Type | Description |
|---|---|---|
| `get-land` | read-only | Fetch full details of a land parcel |
| `get-land-count` | read-only | Return total registered parcels |

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

* Transfer ownership function
* Ownership history tracking
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
