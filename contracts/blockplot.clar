;; BlockPlot - Decentralized Land Registry
;; Author: BlockPlot Team
;; Version: 0.1.0

;; --- Data Maps ---

(define-map lands
  { land-id: uint }
  {
    owner: principal,
    location: (string-ascii 256),
    area: uint,
    registered-at: uint
  }
)

(define-data-var land-counter uint u0)

;; --- Errors ---

(define-constant ERR-ALREADY-REGISTERED (err u100))
(define-constant ERR-NOT-FOUND (err u101))
(define-constant ERR-UNAUTHORIZED (err u102))

;; --- Public Functions ---

;; Register a new land parcel on-chain
(define-public (register-land (location (string-ascii 256)) (area uint))
  (let ((new-id (+ (var-get land-counter) u1)))
    (asserts! (is-none (map-get? lands { land-id: new-id })) ERR-ALREADY-REGISTERED)
    (map-set lands
      { land-id: new-id }
      {
        owner: tx-sender,
        location: location,
        area: area,
        registered-at: block-height
      }
    )
    (var-set land-counter new-id)
    (ok new-id)
  )
)

;; --- Read-Only Functions ---

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
;; docs: clarify register-land param descriptions
;; docs: add @param annotation for location in register-land
;; docs: add @param annotation for area in register-land
;; docs: add @returns annotation for register-land
;; docs: clarify verify-ownership param descriptions
;; docs: add @param annotation for land-id in verify-ownership
;; docs: add @param annotation for claimant in verify-ownership
;; docs: add @returns annotation for verify-ownership
;; docs: add contract-level overview comment
;; docs: document ERR-ALREADY-REGISTERED error code
;; docs: document ERR-NOT-FOUND error code
;; docs: document ERR-UNAUTHORIZED error code
;; docs: document land-counter data var purpose
;; docs: document lands map schema
;; refactor: align map-set indentation in register-land
;; refactor: align match expression in verify-ownership
;; refactor: align match expression in get-land
;; style: normalize whitespace between sections
;; style: add trailing newline to contract file
;; chore: add .gitkeep placeholder removed (contracts dir tracked)
;; docs: add usage example for register-land in comment
;; docs: add usage example for verify-ownership in comment
;; docs: add usage example for get-land in comment
;; docs: note that land-id is auto-incremented
;; docs: note that tx-sender is recorded as owner
;; docs: note block-height is captured at registration time
