import {
  PostConditionMode,
  uintCV,
  stringAsciiCV,
  principalCV,
  cvToJSON,
  fetchCallReadOnlyFunction,
} from "@stacks/transactions";
import { openContractCall } from "@stacks/connect";
import {
  CONTRACT_ADDRESS,
  CONTRACT_NAME,
  FUNCTIONS,
  STACKS_API_URL,
} from "./constants";

// ─── Types ───────────────────────────────────────────────────────────

export interface RegisterLandParams {
  location: string;
  area: number;
  documentHash: string;
  senderAddress: string;
  onFinish: (txId: string) => void;
  onCancel: () => void;
}

export interface TransferLandParams {
  landId: number;
  newOwner: string;
  senderAddress: string;
  onFinish: (txId: string) => void;
  onCancel: () => void;
}

export interface LandRecord {
  owner: string;
  location: string;
  area: number;
  registeredAt: number;
  documentHash: string;
  frozen: boolean;
}

// ─── Write Functions (open wallet for signing) ───────────────────────

/**
 * Register a new land parcel on-chain.
 * Opens the Hiro Wallet for the user to sign and broadcast.
 */
export async function registerLand({
  location,
  area,
  documentHash,
  senderAddress,
  onFinish,
  onCancel,
}: RegisterLandParams) {
  await openContractCall({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: FUNCTIONS.REGISTER_LAND,
    functionArgs: [
      stringAsciiCV(location),
      uintCV(area),
      stringAsciiCV(documentHash),
    ],
    postConditionMode: PostConditionMode.Deny,
    postConditions: [],
    onFinish: (data) => {
      onFinish(data.txId);
    },
    onCancel,
  });
}

/**
 * Transfer ownership of a land parcel.
 * Opens the Hiro Wallet for the user to sign and broadcast.
 */
export async function transferLand({
  landId,
  newOwner,
  senderAddress,
  onFinish,
  onCancel,
}: TransferLandParams) {
  await openContractCall({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: FUNCTIONS.TRANSFER_LAND,
    functionArgs: [uintCV(landId), principalCV(newOwner)],
    postConditionMode: PostConditionMode.Deny,
    postConditions: [],
    onFinish: (data) => {
      onFinish(data.txId);
    },
    onCancel,
  });
}

// ─── Read-Only Functions (no wallet needed) ──────────────────────────

async function callReadOnly(functionName: string, args: any[]) {
  const result = await fetchCallReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName,
    functionArgs: args,
    senderAddress: CONTRACT_ADDRESS,
    client: { baseUrl: STACKS_API_URL },
  });
  return cvToJSON(result);
}

/**
 * Verify whether a principal owns a given land parcel.
 */
export async function verifyOwnership(
  landId: number,
  claimant: string
): Promise<boolean> {
  const result = await callReadOnly(FUNCTIONS.VERIFY_OWNERSHIP, [
    uintCV(landId),
    principalCV(claimant),
  ]);
  return result?.value?.value === true;
}

/**
 * Fetch full details of a land parcel.
 */
export async function getLand(landId: number): Promise<LandRecord | null> {
  try {
    const result = await callReadOnly(FUNCTIONS.GET_LAND, [uintCV(landId)]);
    if (!result?.value) return null;
    const v = result.value;
    return {
      owner: v.owner?.value || "",
      location: v.location?.value || "",
      area: parseInt(v.area?.value || "0"),
      registeredAt: parseInt(v["registered-at"]?.value || "0"),
      documentHash: v["document-hash"]?.value || "",
      frozen: v.frozen?.value === true,
    };
  } catch {
    return null;
  }
}

/**
 * Get the total number of registered land parcels.
 */
export async function getLandCount(): Promise<number> {
  const result = await callReadOnly(FUNCTIONS.GET_LAND_COUNT, []);
  return parseInt(result?.value?.value || "0");
}

/**
 * Get the owner of a land parcel.
 */
export async function getOwner(landId: number): Promise<string | null> {
  try {
    const result = await callReadOnly(FUNCTIONS.GET_OWNER, [uintCV(landId)]);
    return result?.value?.value || null;
  } catch {
    return null;
  }
}

/**
 * Get the document hash of a land parcel.
 */
export async function getDocumentHash(landId: number): Promise<string | null> {
  try {
    const result = await callReadOnly(FUNCTIONS.GET_DOCUMENT_HASH, [
      uintCV(landId),
    ]);
    return result?.value?.value || null;
  } catch {
    return null;
  }
}

/**
 * Check if a land parcel is frozen.
 */
export async function isFrozen(landId: number): Promise<boolean> {
  const result = await callReadOnly(FUNCTIONS.IS_FROZEN, [uintCV(landId)]);
  return result?.value?.value === true;
}

/**
 * Check if a land parcel has an active dispute.
 */
export async function hasActiveDispute(landId: number): Promise<boolean> {
  const result = await callReadOnly(FUNCTIONS.HAS_ACTIVE_DISPUTE, [
    uintCV(landId),
  ]);
  return result?.value?.value === true;
}

/**
 * Get the total number of transfers for a land parcel.
 */
export async function getTransferCount(landId: number): Promise<number> {
  const result = await callReadOnly(FUNCTIONS.GET_TRANSFER_COUNT, [
    uintCV(landId),
  ]);
  return parseInt(result?.value?.value || "0");
}
