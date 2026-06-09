// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BlockPlot - Decentralized Land Registry
 * @notice Equivalent Solidity smart contract for Celo deployment, matching the Stacks Clarity implementation.
 */
contract BlockPlot {
    
    // --- Constants / State Variables ---
    
    address public contractOwner;
    uint256 private landCounter;

    // --- Structs ---

    struct Land {
        address owner;
        string location;
        uint256 area;
        uint256 registeredAt;
        string documentHash;
        bool frozen;
    }

    struct TransferRecord {
        address from;
        address to;
        uint256 transferredAt;
    }

    struct Dispute {
        address claimant;
        string reason;
        uint256 filedAt;
        bool resolved;
    }

    // --- Mappings ---

    mapping(uint256 => Land) private lands;
    // landId => entryIndex => TransferRecord
    mapping(uint256 => mapping(uint256 => TransferRecord)) private landHistory;
    // landId => total transfer history entries
    mapping(uint256 => uint256) private historyCounter;
    mapping(uint256 => Dispute) private disputes;
    // helper to track if a dispute exists
    mapping(uint256 => bool) private disputeExists;

    // --- Events ---

    event LandRegistered(uint256 indexed landId, address indexed owner, string location, uint256 area);
    event LandTransferred(uint256 indexed landId, address indexed from, address indexed to);
    event DocumentUpdated(uint256 indexed landId, string newHash);
    event LandFrozen(uint256 indexed landId);
    event LandUnfrozen(uint256 indexed landId);
    event DisputeFiled(uint256 indexed landId, address indexed claimant, string reason);
    event DisputeResolved(uint256 indexed landId);

    // --- Modifiers ---

    modifier onlyOwner() {
        require(msg.sender == contractOwner, "102"); // ERR-UNAUTHORIZED
        _;
    }

    // --- Constructor ---

    constructor() {
        contractOwner = msg.sender;
    }

    // --- Public Write Functions ---

    /**
     * @notice Register a new land parcel on-chain with IPFS document hash
     * @param location The physical or geographic location of the land
     * @param area The size/area of the land
     * @param documentHash IPFS document hash containing deed/ownership documents
     * @return The newly assigned land ID
     */
    function registerLand(
        string calldata location,
        uint256 area,
        string calldata documentHash
    ) external returns (uint256) {
        require(area > 0, "103"); // ERR-INVALID-AREA
        require(bytes(location).length > 0, "104"); // ERR-INVALID-LOCATION
        require(bytes(documentHash).length > 0, "109"); // ERR-INVALID-HASH
        
        landCounter++;
        uint256 newId = landCounter;
        
        require(lands[newId].owner == address(0), "100"); // ERR-ALREADY-REGISTERED

        lands[newId] = Land({
            owner: msg.sender,
            location: location,
            area: area,
            registeredAt: block.number,
            documentHash: documentHash,
            frozen: false
        });

        emit LandRegistered(newId, msg.sender, location, area);
        return newId;
    }

    /**
     * @notice Transfer ownership of a land parcel to a new owner
     * @param landId The unique ID of the land parcel
     * @param newOwner The address of the new owner
     */
    function transferLand(uint256 landId, address newOwner) external {
        require(landId > 0 && landId <= landCounter, "101"); // ERR-NOT-FOUND
        
        Land storage land = lands[landId];
        require(land.owner != address(0), "101"); // ERR-NOT-FOUND
        require(land.owner == msg.sender, "102"); // ERR-UNAUTHORIZED
        require(msg.sender != newOwner, "105"); // ERR-SELF-TRANSFER
        require(!land.frozen, "106"); // ERR-LAND-FROZEN
        require(!disputeExists[landId] || disputes[landId].resolved, "107"); // ERR-DISPUTE-EXISTS

        // Record transfer history
        uint256 currentCount = historyCounter[landId];
        uint256 newEntry = currentCount + 1;
        landHistory[landId][newEntry] = TransferRecord({
            from: msg.sender,
            to: newOwner,
            transferredAt: block.number
        });
        historyCounter[landId] = newEntry;

        // Update owner
        land.owner = newOwner;

        emit LandTransferred(landId, msg.sender, newOwner);
    }

    /**
     * @notice Update the IPFS document hash for a land parcel
     * @param landId The unique ID of the land parcel
     * @param newHash The new IPFS document hash
     */
    function updateDocument(uint256 landId, string calldata newHash) external {
        require(landId > 0 && landId <= landCounter, "101"); // ERR-NOT-FOUND
        require(bytes(newHash).length > 0, "109"); // ERR-INVALID-HASH

        Land storage land = lands[landId];
        require(land.owner != address(0), "101"); // ERR-NOT-FOUND
        require(land.owner == msg.sender, "102"); // ERR-UNAUTHORIZED
        require(!land.frozen, "106"); // ERR-LAND-FROZEN

        land.documentHash = newHash;

        emit DocumentUpdated(landId, newHash);
    }

    /**
     * @notice Freeze a land parcel to prevent transfers (only contract owner)
     * @param landId The unique ID of the land parcel
     */
    function freezeLand(uint256 landId) external onlyOwner {
        require(landId > 0 && landId <= landCounter, "101"); // ERR-NOT-FOUND
        Land storage land = lands[landId];
        require(land.owner != address(0), "101"); // ERR-NOT-FOUND
        
        land.frozen = true;

        emit LandFrozen(landId);
    }

    /**
     * @notice Unfreeze a land parcel (only contract owner)
     * @param landId The unique ID of the land parcel
     */
    function unfreezeLand(uint256 landId) external onlyOwner {
        require(landId > 0 && landId <= landCounter, "101"); // ERR-NOT-FOUND
        Land storage land = lands[landId];
        require(land.owner != address(0), "101"); // ERR-NOT-FOUND
        
        land.frozen = false;

        emit LandUnfrozen(landId);
    }

    /**
     * @notice File a dispute against a land parcel
     * @param landId The unique ID of the land parcel
     * @param reason The reason for the dispute
     */
    function fileDispute(uint256 landId, string calldata reason) external {
        require(landId > 0 && landId <= landCounter, "101"); // ERR-NOT-FOUND
        require(bytes(reason).length > 0, "104"); // ERR-INVALID-LOCATION
        require(lands[landId].owner != address(0), "101"); // ERR-NOT-FOUND
        require(!disputeExists[landId], "107"); // ERR-DISPUTE-EXISTS

        disputes[landId] = Dispute({
            claimant: msg.sender,
            reason: reason,
            filedAt: block.number,
            resolved: false
        });
        disputeExists[landId] = true;

        emit DisputeFiled(landId, msg.sender, reason);
    }

    /**
     * @notice Resolve a dispute (only contract owner)
     * @param landId The unique ID of the land parcel
     */
    function resolveDispute(uint256 landId) external onlyOwner {
        require(disputeExists[landId], "108"); // ERR-NO-DISPUTE
        
        Dispute storage dispute = disputes[landId];
        dispute.resolved = true;

        emit DisputeResolved(landId);
    }

    // --- Read-Only Functions ---

    /**
     * @notice Verify whether a principal owns a given land parcel
     * @param landId The unique ID of the land parcel
     * @param claimant The address of the alleged owner
     * @return True if the claimant is the owner
     */
    function verifyOwnership(uint256 landId, address claimant) external view returns (bool) {
        require(lands[landId].owner != address(0), "101"); // ERR-NOT-FOUND
        return lands[landId].owner == claimant;
    }

    /**
     * @notice Fetch full details of a land parcel
     * @param landId The unique ID of the land parcel
     * @return The Land details struct
     */
    function getLand(uint256 landId) external view returns (Land memory) {
        require(lands[landId].owner != address(0), "101"); // ERR-NOT-FOUND
        return lands[landId];
    }

    /**
     * @notice Return the total number of registered land parcels
     * @return The total land count
     */
    function getLandCount() external view returns (uint256) {
        return landCounter;
    }

    /**
     * @notice Get the owner of a land parcel
     * @param landId The unique ID of the land parcel
     * @return The owner address
     */
    function getOwner(uint256 landId) external view returns (address) {
        address owner = lands[landId].owner;
        require(owner != address(0), "101"); // ERR-NOT-FOUND
        return owner;
    }

    /**
     * @notice Get the document hash of a land parcel
     * @param landId The unique ID of the land parcel
     * @return The IPFS document hash
     */
    function getDocumentHash(uint256 landId) external view returns (string memory) {
        require(lands[landId].owner != address(0), "101"); // ERR-NOT-FOUND
        return lands[landId].documentHash;
    }

    /**
     * @notice Check if a land parcel is frozen
     * @param landId The unique ID of the land parcel
     * @return True if the land is frozen
     */
    function isFrozen(uint256 landId) external view returns (bool) {
        require(lands[landId].owner != address(0), "101"); // ERR-NOT-FOUND
        return lands[landId].frozen;
    }

    /**
     * @notice Get a specific transfer history entry
     * @param landId The unique ID of the land parcel
     * @param entry The history entry index
     * @return from The previous owner
     * @return to The new owner
     * @return transferredAt The block number when transferred
     */
    function getTransferHistory(uint256 landId, uint256 entry) 
        external 
        view 
        returns (address from, address to, uint256 transferredAt) 
    {
        TransferRecord memory record = landHistory[landId][entry];
        require(record.transferredAt != 0, "101"); // ERR-NOT-FOUND
        return (record.from, record.to, record.transferredAt);
    }

    /**
     * @notice Get the total number of transfers for a land parcel
     * @param landId The unique ID of the land parcel
     * @return The total transfers count
     */
    function getTransferCount(uint256 landId) external view returns (uint256) {
        return historyCounter[landId];
    }

    /**
     * @notice Get dispute details for a land parcel
     * @param landId The unique ID of the land parcel
     * @return claimant The filer of the dispute
     * @return reason The reason description
     * @return filedAt The block number when filed
     * @return resolved True if resolved
     */
    function getDispute(uint256 landId) 
        external 
        view 
        returns (address claimant, string memory reason, uint256 filedAt, bool resolved) 
    {
        require(disputeExists[landId], "108"); // ERR-NO-DISPUTE
        Dispute memory dispute = disputes[landId];
        return (dispute.claimant, dispute.reason, dispute.filedAt, dispute.resolved);
    }

    /**
     * @notice Check if a land parcel has an active (unresolved) dispute
     * @param landId The unique ID of the land parcel
     * @return True if there is an active dispute
     */
    function hasActiveDispute(uint256 landId) external view returns (bool) {
        if (!disputeExists[landId]) {
            return false;
        }
        return !disputes[landId].resolved;
    }
}
