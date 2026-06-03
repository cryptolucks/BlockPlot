// BlockPlot Contract Constants
// Deployed contract on Stacks Mainnet

export const NETWORK_TYPE = "mainnet" as const;

export const CONTRACT_ADDRESS = "SP2N00STXH4K1GBPHC5AM62BP4AJ7STS4XJXCD2D4";
export const CONTRACT_NAME = "blockplot-v3";

export const STACKS_API_URL = "https://api.mainnet.hiro.so";

export const APP_NAME = "BlockPlot";
export const APP_ICON = "https://blockplot.vercel.app/favicon.ico";

// Contract function names
export const FUNCTIONS = {
  REGISTER_LAND: "register-land",
  TRANSFER_LAND: "transfer-land",
  UPDATE_DOCUMENT: "update-document",
  VERIFY_OWNERSHIP: "verify-ownership",
  GET_LAND: "get-land",
  GET_LAND_COUNT: "get-land-count",
  GET_OWNER: "get-owner",
  GET_DOCUMENT_HASH: "get-document-hash",
  IS_FROZEN: "is-frozen",
  GET_TRANSFER_HISTORY: "get-transfer-history",
  GET_TRANSFER_COUNT: "get-transfer-count",
  FILE_DISPUTE: "file-dispute",
  RESOLVE_DISPUTE: "resolve-dispute",
  FREEZE_LAND: "freeze-land",
  UNFREEZE_LAND: "unfreeze-land",
  GET_DISPUTE: "get-dispute",
  HAS_ACTIVE_DISPUTE: "has-active-dispute",
} as const;
