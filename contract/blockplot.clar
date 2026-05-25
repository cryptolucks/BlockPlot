;; BlockPlot - Decentralized Land Registry
;; Author: BlockPlot Team
;; Version: 0.2.0

;; ─── Constants ────────────────────────────────────────────────────────────────

(define-constant CONTRACT-OWNER tx-sender)
(define-constant ERR-ALREADY-REGISTERED (err u100))
(define-constant ERR-NOT-FOUND (err u101))
(define-constant ERR-UNAUTHORIZED (err u102))
(define-constant ERR-INVALID-AREA (err u103))
(define-constant ERR-INVALID-LOCATION (err u104))
(define-constant ERR-SELF-TRANSFER (err u105))
(define-constant ERR-LAND-FROZEN (err u106))
(define-constant ERR-DISPUTE-EXISTS (err u107))
(define-constant ERR-NO-DISPUTE (err u108))
(define-constant ERR-INVALID-HASH (err u109))

;; ─── Data Maps ────────────────────────────────────────────────────────────────

(define-map lands
  { land-id: uint }
  {
    owner: principal,
    location: (string-ascii 256),
    area: uint,
    registered-at: uint,
    document-hash: (string-ascii 64),
    frozen: bool
  }
)

(define-map land-history
  { land-id: uint, entry: uint }
  {
    from: principal,
    to: principal,
    transferred-at: uint
  }
)

(define-map history-counter
  { land-id: uint }
  { count: uint }
)

(define-map disputes
  { land-id: uint }
  {
    claimant: principal,
    reason: (string-ascii 256),
    filed-at: uint,
    resolved: bool
  }
)

(define-data-var land-counter uint u0)

;; ─── Private Helpers ──────────────────────────────────────────────────────────

(define-private (land-exists? (land-id uint))
  (is-some (map-get? lands { land-id: land-id }))
)

(define-private (record-transfer (land-id uint) (from principal) (to principal))
  (let (
    (current-count (default-to u0 (get count (map-get? history-counter { land-id: land-id }))))
    (new-entry (+ current-count u1))
  )
    (map-set land-history
      { land-id: land-id, entry: new-entry }
      { from: from, to: to, transferred-at: block-height }
    )
    (map-set history-counter { land-id: land-id } { count: new-entry })
  )
)

;; ─── Public Functions ─────────────────────────────────────────────────────────

;; Register a new land parcel on-chain with IPFS document hash
(define-public (register-land
    (location (string-ascii 256))
    (area uint)
    (document-hash (string-ascii 64)))
  (let ((new-id (+ (var-get land-counter) u1)))
    (asserts! (> area u0) ERR-INVALID-AREA)
    (asserts! (> (len location) u0) ERR-INVALID-LOCATION)
    (asserts! (> (len document-hash) u0) ERR-INVALID-HASH)
    (asserts! (is-none (map-get? lands { land-id: new-id })) ERR-ALREADY-REGISTERED)
    (map-set lands
      { land-id: new-id }
      {
        owner: tx-sender,
        location: location,
        area: area,
        registered-at: block-height,
        document-hash: document-hash,
        frozen: false
      }
    )
    (var-set land-counter new-id)
    (ok new-id)
  )
)

;; Transfer ownership of a land parcel to a new owner
(define-public (transfer-land (land-id uint) (new-owner principal))
  (let ((land (unwrap! (map-get? lands { land-id: land-id }) ERR-NOT-FOUND)))
    (asserts! (is-eq (get owner land) tx-sender) ERR-UNAUTHORIZED)
    (asserts! (not (is-eq tx-sender new-owner)) ERR-SELF-TRANSFER)
    (asserts! (not (get frozen land)) ERR-LAND-FROZEN)
    (asserts! (is-none (map-get? disputes { land-id: land-id })) ERR-DISPUTE-EXISTS)
    (record-transfer land-id tx-sender new-owner)
    (map-set lands
      { land-id: land-id }
      (merge land { owner: new-owner })
    )
    (ok true)
  )
)

;; Update the IPFS document hash for a land parcel (owner only)
(define-public (update-document (land-id uint) (new-hash (string-ascii 64)))
  (let ((land (unwrap! (map-get? lands { land-id: land-id }) ERR-NOT-FOUND)))
    (asserts! (is-eq (get owner land) tx-sender) ERR-UNAUTHORIZED)
    (asserts! (not (get frozen land)) ERR-LAND-FROZEN)
    (asserts! (> (len new-hash) u0) ERR-INVALID-HASH)
    (map-set lands
      { land-id: land-id }
      (merge land { document-hash: new-hash })
    )
    (ok true)
  )
)

;; Freeze a land parcel to prevent transfers (contract owner only)
(define-public (freeze-land (land-id uint))
  (let ((land (unwrap! (map-get? lands { land-id: land-id }) ERR-NOT-FOUND)))
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-UNAUTHORIZED)
    (map-set lands { land-id: land-id } (merge land { frozen: true }))
    (ok true)
  )
)

;; Unfreeze a land parcel (contract owner only)
(define-public (unfreeze-land (land-id uint))
  (let ((land (unwrap! (map-get? lands { land-id: land-id }) ERR-NOT-FOUND)))
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-UNAUTHORIZED)
    (map-set lands { land-id: land-id } (merge land { frozen: false }))
    (ok true)
  )
)

;; File a dispute against a land parcel
(define-public (file-dispute (land-id uint) (reason (string-ascii 256)))
  (begin
    (asserts! (land-exists? land-id) ERR-NOT-FOUND)
    (asserts! (is-none (map-get? disputes { land-id: land-id })) ERR-DISPUTE-EXISTS)
    (map-set disputes
      { land-id: land-id }
      {
        claimant: tx-sender,
        reason: reason,
        filed-at: block-height,
        resolved: false
      }
    )
    (ok true)
  )
)

;; Resolve a dispute (contract owner only)
(define-public (resolve-dispute (land-id uint))
  (let ((dispute (unwrap! (map-get? disputes { land-id: land-id }) ERR-NO-DISPUTE)))
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-UNAUTHORIZED)
    (map-set disputes
      { land-id: land-id }
      (merge dispute { resolved: true })
    )
    (ok true)
  )
)

;; ─── Read-Only Functions ──────────────────────────────────────────────────────

;; Verify whether a principal owns a given land parcel
(define-read-only (verify-ownership (land-id uint) (claimant principal))
  (match (map-get? lands { land-id: land-id })
    land (ok (is-eq (get owner land) claimant))
    ERR-NOT-FOUND
  )
)

;; Fetch full details of a land parcel
(define-read-only (get-land (land-id uint))
  (match (map-get? lands { land-id: land-id })
    land (ok land)
    ERR-NOT-FOUND
  )
)

;; Return total number of registered land parcels
(define-read-only (get-land-count)
  (ok (var-get land-counter))
)

;; Get the owner of a land parcel
(define-read-only (get-owner (land-id uint))
  (match (map-get? lands { land-id: land-id })
    land (ok (get owner land))
    ERR-NOT-FOUND
  )
)

;; Get the document hash of a land parcel
(define-read-only (get-document-hash (land-id uint))
  (match (map-get? lands { land-id: land-id })
    land (ok (get document-hash land))
    ERR-NOT-FOUND
  )
)

;; Check if a land parcel is frozen
(define-read-only (is-frozen (land-id uint))
  (match (map-get? lands { land-id: land-id })
    land (ok (get frozen land))
    ERR-NOT-FOUND
  )
)

;; Get a specific transfer history entry
(define-read-only (get-transfer-history (land-id uint) (entry uint))
  (match (map-get? land-history { land-id: land-id, entry: entry })
    record (ok record)
    ERR-NOT-FOUND
  )
)

;; Get total number of transfers for a land parcel
(define-read-only (get-transfer-count (land-id uint))
  (ok (default-to u0 (get count (map-get? history-counter { land-id: land-id }))))
)

;; Get dispute details for a land parcel
(define-read-only (get-dispute (land-id uint))
  (match (map-get? disputes { land-id: land-id })
    dispute (ok dispute)
    ERR-NO-DISPUTE
  )
)

;; Check if a land parcel has an active (unresolved) dispute
(define-read-only (has-active-dispute (land-id uint))
  (match (map-get? disputes { land-id: land-id })
    dispute (ok (not (get resolved dispute)))
    (ok false)
  )
)
;; feat: add frozen field to lands map for dispute lockdown
;; feat: add land-history map for transfer audit trail
;; feat: add history-counter map to track per-land transfer count
;; feat: add disputes map for on-chain dispute filing
;; feat: define CONTRACT-OWNER constant for admin gating
;; feat: add ERR-INVALID-AREA constant for zero-area guard
;; feat: add ERR-INVALID-LOCATION constant for empty location guard
;; feat: add ERR-SELF-TRANSFER constant for same-owner check
;; feat: add ERR-LAND-FROZEN constant for freeze guard
;; feat: add ERR-DISPUTE-EXISTS constant to prevent duplicate disputes
;; feat: add ERR-NO-DISPUTE constant for missing dispute lookup
;; feat: add ERR-INVALID-HASH constant for empty hash guard
;; feat: add land-exists? private helper function
;; feat: add record-transfer private helper for history logging
;; feat: guard register-land against zero area
;; feat: guard register-land against empty location string
;; feat: guard register-land against empty document hash
;; feat: initialize frozen field to false in register-land
;; feat: add self-transfer guard to transfer-land
;; feat: add freeze guard to transfer-land
;; feat: add dispute guard to transfer-land
;; feat: call record-transfer inside transfer-land for audit log
;; feat: implement update-document public function
;; feat: guard update-document to owner only
;; feat: guard update-document against frozen land
;; feat: guard update-document against empty hash
;; feat: implement freeze-land admin function
;; feat: gate freeze-land to CONTRACT-OWNER
;; feat: implement unfreeze-land admin function
;; feat: gate unfreeze-land to CONTRACT-OWNER
;; feat: implement file-dispute public function
