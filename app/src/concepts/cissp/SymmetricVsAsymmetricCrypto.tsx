export default function SymmetricVsAsymmetricCrypto() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Symmetric vs Asymmetric Cryptography</h3>
        <p className="text-sm text-soft">Domain 3.6 — compare the two fundamental encryption models.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-accent-line bg-accent-tint/50 p-4 space-y-2">
          <p className="text-sm font-semibold text-accent mb-1">Symmetric</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Key:</span> Single shared secret.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Speed:</span> Fast — suited to bulk data.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Examples:</span> AES, 3DES, ChaCha20.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Weakness:</span> Key distribution problem.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Use case:</span> Encrypting a disk, database, or data stream.</p>
        </div>
        <div className="rounded-crisp border border-warn-line bg-warn-tint/50 p-4 space-y-2">
          <p className="text-sm font-semibold text-warn mb-1">Asymmetric</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Key:</span> Public/private key pair.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Speed:</span> Slow — impractical for bulk data.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Examples:</span> RSA, ECC, Diffie-Hellman.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Strength:</span> Solves key distribution, enables digital signatures and non-repudiation.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Use case:</span> Session-key exchange and authentication, e.g. the TLS handshake.</p>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Hybrid cryptosystems like TLS use asymmetric crypto only to negotiate a session key, then switch to symmetric
        encryption for the bulk traffic — the best of both approaches.
      </div>
    </div>
  )
}
