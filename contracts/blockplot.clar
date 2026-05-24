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
