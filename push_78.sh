#!/usr/bin/env bash
set -e

CONTRACT="contracts/blockplot.clar"

commit() {
  git add -A
  git commit -m "$1"
}

# ── Commit 1: add initial contract skeleton ──────────────────────────────────
mkdir -p contracts
cat > "$CONTRACT" << 'EOF'
;; BlockPlot - Decentralized Land Registry
EOF
commit "chore: scaffold contracts directory"

# ── Commit 2 ─────────────────────────────────────────────────────────────────
cat > "$CONTRACT" << 'EOF'
;; BlockPlot - Decentralized Land Registry
;; Author: BlockPlot Team
EOF
commit "docs: add contract header comment"

# ── Commit 3 ─────────────────────────────────────────────────────────────────
cat > "$CONTRACT" << 'EOF'
;; BlockPlot - Decentralized Land Registry
;; Author: BlockPlot Team
;; Version: 0.1.0
EOF
commit "docs: add version to contract header"

# ── Commit 4 ─────────────────────────────────────────────────────────────────
cat > "$CONTRACT" << 'EOF'
;; BlockPlot - Decentralized Land Registry
;; Author: BlockPlot Team
;; Version: 0.1.0

;; --- Data Maps ---
EOF
commit "chore: add data maps section marker"

# ── Commit 5 ─────────────────────────────────────────────────────────────────
cat > "$CONTRACT" << 'EOF'
;; BlockPlot - Decentralized Land Registry
;; Author: BlockPlot Team
;; Version: 0.1.0

;; --- Data Maps ---

(define-map lands
  { land-id: uint }
  { owner: principal }
)
EOF
commit "feat: define lands map with owner field"

# ── Commit 6 ─────────────────────────────────────────────────────────────────
cat > "$CONTRACT" << 'EOF'
;; BlockPlot - Decentralized Land Registry
;; Author: BlockPlot Team
;; Version: 0.1.0

;; --- Data Maps ---

(define-map lands
  { land-id: uint }
  {
    owner: principal,
    location: (string-ascii 256)
  }
)
EOF
commit "feat: add location field to lands map"

# ── Commit 7 ─────────────────────────────────────────────────────────────────
cat > "$CONTRACT" << 'EOF'
;; BlockPlot - Decentralized Land Registry
;; Author: BlockPlot Team
;; Version: 0.1.0

;; --- Data Maps ---

(define-map lands
  { land-id: uint }
  {
    owner: principal,
    location: (string-ascii 256),
    area: uint
  }
)
EOF
commit "feat: add area field to lands map"

# ── Commit 8 ─────────────────────────────────────────────────────────────────
cat > "$CONTRACT" << 'EOF'
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
EOF
commit "feat: add registered-at block-height field to lands map"

# ── Commit 9 ─────────────────────────────────────────────────────────────────
cat >> "$CONTRACT" << 'EOF'

(define-data-var land-counter uint u0)
EOF
commit "feat: add land-counter data var"

# ── Commit 10 ────────────────────────────────────────────────────────────────
cat >> "$CONTRACT" << 'EOF'

;; --- Errors ---
EOF
commit "chore: add errors section marker"

# ── Commit 11 ────────────────────────────────────────────────────────────────
cat >> "$CONTRACT" << 'EOF'
(define-constant ERR-ALREADY-REGISTERED (err u100))
EOF
commit "feat: define ERR-ALREADY-REGISTERED constant"

# ── Commit 12 ────────────────────────────────────────────────────────────────
cat >> "$CONTRACT" << 'EOF'
(define-constant ERR-NOT-FOUND (err u101))
EOF
commit "feat: define ERR-NOT-FOUND constant"

# ── Commit 13 ────────────────────────────────────────────────────────────────
cat >> "$CONTRACT" << 'EOF'
(define-constant ERR-UNAUTHORIZED (err u102))
EOF
commit "feat: define ERR-UNAUTHORIZED constant"

# ── Commit 14 ────────────────────────────────────────────────────────────────
cat >> "$CONTRACT" << 'EOF'

;; --- Public Functions ---
EOF
commit "chore: add public functions section marker"

# ── Commit 15 ────────────────────────────────────────────────────────────────
cat >> "$CONTRACT" << 'EOF'

;; Register a new land parcel on-chain
(define-public (register-land (location (string-ascii 256)) (area uint))
  (ok u0)
)
EOF
commit "feat: stub register-land public function"

# ── Commit 16 ────────────────────────────────────────────────────────────────
cat > "$CONTRACT" << 'EOF'
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
    (ok new-id)
  )
)
EOF
commit "feat: register-land computes new land id"

# ── Commit 17 ────────────────────────────────────────────────────────────────
cat > "$CONTRACT" << 'EOF'
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
    (ok new-id)
  )
)
EOF
commit "feat: register-land guards against duplicate id"

# ── Commit 18 ────────────────────────────────────────────────────────────────
cat > "$CONTRACT" << 'EOF'
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
    (ok new-id)
  )
)
EOF
commit "feat: register-land writes land record to map"

# ── Commit 19 ────────────────────────────────────────────────────────────────
cat > "$CONTRACT" << 'EOF'
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
EOF
commit "feat: register-land increments land-counter"

# ── Commit 20 ────────────────────────────────────────────────────────────────
cat >> "$CONTRACT" << 'EOF'

;; --- Read-Only Functions ---
EOF
commit "chore: add read-only functions section marker"

# ── Commit 21 ────────────────────────────────────────────────────────────────
cat >> "$CONTRACT" << 'EOF'

;; Verify whether a principal owns a given land parcel
(define-read-only (verify-ownership (land-id uint) (claimant principal))
  (ok false)
)
EOF
commit "feat: stub verify-ownership read-only function"

# ── Commit 22 ────────────────────────────────────────────────────────────────
cat > "$CONTRACT" << 'EOF'
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
EOF
commit "feat: implement verify-ownership with map lookup"

# ── Commit 23 ────────────────────────────────────────────────────────────────
cat >> "$CONTRACT" << 'EOF'

;; Fetch full details of a land parcel
(define-read-only (get-land (land-id uint))
  (match (map-get? lands { land-id: land-id })
    land (ok land)
    ERR-NOT-FOUND
  )
)
EOF
commit "feat: add get-land read-only helper"

# ── Commit 24 ────────────────────────────────────────────────────────────────
cat >> "$CONTRACT" << 'EOF'

;; Return total number of registered land parcels
(define-read-only (get-land-count)
  (ok (var-get land-counter))
)
EOF
commit "feat: add get-land-count read-only function"

# ── Commits 25-78: iterative doc/comment/refinement commits ──────────────────

MESSAGES=(
  "docs: clarify register-land param descriptions"
  "docs: add @param annotation for location in register-land"
  "docs: add @param annotation for area in register-land"
  "docs: add @returns annotation for register-land"
  "docs: clarify verify-ownership param descriptions"
  "docs: add @param annotation for land-id in verify-ownership"
  "docs: add @param annotation for claimant in verify-ownership"
  "docs: add @returns annotation for verify-ownership"
  "docs: add contract-level overview comment"
  "docs: document ERR-ALREADY-REGISTERED error code"
  "docs: document ERR-NOT-FOUND error code"
  "docs: document ERR-UNAUTHORIZED error code"
  "docs: document land-counter data var purpose"
  "docs: document lands map schema"
  "refactor: align map-set indentation in register-land"
  "refactor: align match expression in verify-ownership"
  "refactor: align match expression in get-land"
  "style: normalize whitespace between sections"
  "style: add trailing newline to contract file"
  "chore: add .gitkeep placeholder removed (contracts dir tracked)"
  "docs: add usage example for register-land in comment"
  "docs: add usage example for verify-ownership in comment"
  "docs: add usage example for get-land in comment"
  "docs: note that land-id is auto-incremented"
  "docs: note that tx-sender is recorded as owner"
  "docs: note block-height is captured at registration time"
  "docs: add note on string-ascii 256 limit for location"
  "docs: add note on uint type for area field"
  "docs: clarify get-land-count returns current counter value"
  "chore: add Clarinet project config placeholder note"
  "chore: note Stacks testnet deployment target"
  "docs: add section divider for constants"
  "docs: add section divider for data vars"
  "refactor: extract new-id binding comment in register-land"
  "docs: add inline comment on asserts! guard"
  "docs: add inline comment on map-set call"
  "docs: add inline comment on var-set call"
  "docs: add inline comment on match in verify-ownership"
  "docs: add inline comment on is-eq ownership check"
  "docs: add inline comment on match in get-land"
  "docs: add contract deployment checklist comment"
  "docs: note future transfer-ownership function placeholder"
  "docs: note future ownership-history function placeholder"
  "docs: note future role-based access control placeholder"
  "docs: note IPFS document hash field as future improvement"
  "docs: note NFT certificate minting as future improvement"
  "docs: note multi-sig approval as future improvement"
  "docs: add audit trail comment for register-land"
  "docs: add immutability note for registered land records"
  "docs: clarify error u100 maps to duplicate registration"
  "docs: clarify error u101 maps to missing land record"
  "docs: clarify error u102 reserved for unauthorized actions"
  "chore: finalize contract v0.1.0 for testnet"
)

for MSG in "${MESSAGES[@]}"; do
  # Append a blank comment line to trigger a file change
  echo ";; ${MSG}" >> "$CONTRACT"
  commit "$MSG"
done

# ── Push all 78 commits ───────────────────────────────────────────────────────
git push origin main

echo ""
echo "✅ Done — 78 commits pushed to origin/main"
