import { SYSTEM_CONFIG } from '@/config/system-config'

/**
 * Única condição que coloca o site em manutenção: o modo manual.
 * (A checagem de "offline" foi removida: alguns navegadores internos de apps
 * informam navigator.onLine = false mesmo conectados, e a página não abria.)
 */
export async function runCriticalHealthChecks() {
  if (SYSTEM_CONFIG.MAINTENANCE_MODE) {
    throw new Error('Modo de manutenção ativado manualmente')
  }

  return true
}
