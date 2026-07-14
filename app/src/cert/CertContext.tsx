import { createContext, useContext, useState, type ReactNode } from 'react'
import { CERTS, DEFAULT_CERT, certConfig, type CertConfig } from '../lib/certs'

interface CertValue {
  certId: string
  cert: CertConfig
  setCertId: (id: string) => void
}

const CertContext = createContext<CertValue | null>(null)
const STORAGE_KEY = 'active-cert'

export function CertProvider({ children }: { children: ReactNode }) {
  const [certId, setId] = useState<string>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored && CERTS[stored] ? stored : DEFAULT_CERT
  })

  function setCertId(id: string) {
    if (!CERTS[id]) return
    localStorage.setItem(STORAGE_KEY, id)
    setId(id)
  }

  return (
    <CertContext.Provider value={{ certId, cert: certConfig(certId), setCertId }}>{children}</CertContext.Provider>
  )
}

export function useCert(): CertValue {
  const ctx = useContext(CertContext)
  if (!ctx) throw new Error('useCert must be used within CertProvider')
  return ctx
}
