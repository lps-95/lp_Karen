import { MaintenancePage } from '@/pages/MaintenancePage'
import { runCriticalHealthChecks } from '@/utils/system-health'
import { ReactNode, useEffect, useState } from 'react'

type Props = {
  children: ReactNode
}

/**
 * Mostra a página de manutenção SÓ quando ela é ligada manualmente
 * (SYSTEM_CONFIG.MAINTENANCE_MODE).
 *
 * Antes, qualquer erro de JavaScript na página (inclusive de scripts de
 * terceiros, como os navegadores internos do Instagram/Facebook/WhatsApp,
 * extensões ou o Google Analytics) trocava o site inteiro pela manutenção,
 * e em alguns aparelhos a página "não abria". Esses erros agora só são
 * registrados no console.
 */
export function AppGuard({ children }: Props) {
  const [isBroken, setIsBroken] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    let mounted = true

    function logWindowError(event: ErrorEvent) {
      console.warn('Erro de script ignorado (a página continua):', event.message)
    }

    function logPromiseRejection(event: PromiseRejectionEvent) {
      console.warn('Promise rejeitada ignorada (a página continua):', event.reason)
    }

    window.addEventListener('error', logWindowError)
    window.addEventListener('unhandledrejection', logPromiseRejection)

    runCriticalHealthChecks()
      .catch((error) => {
        console.error('Manutenção ativada:', error)
        if (mounted) setIsBroken(true)
      })
      .finally(() => {
        if (mounted) setIsChecking(false)
      })

    return () => {
      mounted = false
      window.removeEventListener('error', logWindowError)
      window.removeEventListener('unhandledrejection', logPromiseRejection)
    }
  }, [])

  if (isChecking) return null
  if (isBroken) return <MaintenancePage />

  return <>{children}</>
}
