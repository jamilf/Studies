import { useState } from 'react'

export default function TcpVsUdp() {
  const [lossSimulated, setLossSimulated] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">TCP vs. UDP</h3>
        <p className="text-sm text-soft">Domain 1.4 — the two transport-layer protocols, and what happens to each when a segment goes missing.</p>
      </div>

      <button
        onClick={() => setLossSimulated((s) => !s)}
        className={`w-full rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
          lossSimulated ? 'border-warn bg-warn-tint text-warn' : 'border-line bg-surface text-soft hover:border-line-strong'
        }`}
      >
        {lossSimulated ? 'Packet loss simulated — click to reset' : 'Simulate a lost packet mid-transfer'}
      </button>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-line bg-wash p-4 space-y-3">
          <h4 className="font-display font-semibold text-ink">TCP <span className="text-xs font-sans font-normal text-faint">(Transmission Control Protocol)</span></h4>
          <dl className="text-xs space-y-1.5 font-mono text-ink">
            <div className="flex justify-between"><dt className="text-soft font-sans">Connection</dt><dd>Connection-oriented</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Setup</dt><dd>3-way handshake: SYN, SYN-ACK, ACK</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Reliability</dt><dd>ACKs + retransmission</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Ordering</dt><dd>Sequence numbers, in-order delivery</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Flow control</dt><dd>Sliding window</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Overhead</dt><dd>Higher (20+ byte header)</dd></div>
          </dl>
          <div className={`rounded-crisp px-3 py-2 text-xs transition-colors ${lossSimulated ? 'bg-good-tint border border-good-line text-good' : 'bg-surface border border-line text-faint'}`}>
            {lossSimulated
              ? 'Segment 4 never ACKed → sender times out and retransmits it. The receiver holds later segments and reorders — the application sees a complete, correct stream.'
              : 'No loss right now — segments 1-6 arrive, get ACKed, and are handed to the application in order.'}
          </div>
          <p className="text-[11px] text-faint">Use cases: HTTP/HTTPS, FTP, SMTP, SSH — anything where a missing byte would corrupt the result.</p>
        </div>

        <div className="rounded-crisp border border-line bg-wash p-4 space-y-3">
          <h4 className="font-display font-semibold text-ink">UDP <span className="text-xs font-sans font-normal text-faint">(User Datagram Protocol)</span></h4>
          <dl className="text-xs space-y-1.5 font-mono text-ink">
            <div className="flex justify-between"><dt className="text-soft font-sans">Connection</dt><dd>Connectionless</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Setup</dt><dd>None — just send</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Reliability</dt><dd>None (best-effort)</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Ordering</dt><dd>Not guaranteed</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Flow control</dt><dd>None</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Overhead</dt><dd>Lower (8-byte header)</dd></div>
          </dl>
          <div className={`rounded-crisp px-3 py-2 text-xs transition-colors ${lossSimulated ? 'bg-bad-tint border border-bad-line text-bad' : 'bg-surface border border-line text-faint'}`}>
            {lossSimulated
              ? 'Datagram 4 is simply gone. Nobody notices at this layer — it\'s up to the application (or the human) to detect and recover, e.g. a dropped VoIP syllable or a re-sent DNS query.'
              : 'No loss right now — datagrams 1-6 arrive with zero handshake overhead.'}
          </div>
          <p className="text-[11px] text-faint">Use cases: DNS (53), DHCP (67/68), TFTP (69), SNMP (161/162), VoIP, video streaming, online gaming.</p>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Neither protocol is "better" — they trade reliability for speed. TCP is right whenever correctness matters
        more than latency; UDP is right whenever a late or duplicate packet is worse than a slightly imperfect one
        (a stale video frame just gets skipped, but a retransmitted one would make the stream worse, not better).
      </div>
    </div>
  )
}
