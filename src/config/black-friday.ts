import { useEffect, useState } from 'react'

export type CampaignTestMode = 'off' | 'before' | 'live' | 'ended'
export type CampaignStatus = 'before' | 'live' | 'ended'

export type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

export const BLACK_FRIDAY_CONFIG = {
  // MODO DE TESTE
  // off    = usa as datas reais
  // before = força a faixa "começa em"
  // live   = força a Black Friday ativa
  // ended  = força a página normal
  TEST_MODE: 'off' as CampaignTestMode,

  // Horário de Brasília
  // 09:00 no horário de Manaus (UTC-4) = 10:00 em Brasília
  startDate: new Date('2026-11-26T09:00:00-04:00'),
  // 19:00 no horário de Manaus (UTC-4) = 20:00 em Brasília
  endDate: new Date('2026-11-28T19:00:00-04:00'),

  // Desconto (%) por id de produto (ver src/utils/data.ts).
  // Produto fora da lista = sem desconto.
  productDiscounts: {
    1: 15, // Ampola de Reestruturação do Córtex
    4: 20, // Máscara Therapy
    6: 30, // Perfume Antifrizz
    7: 40, // Reestruturador Bifásico Therapy
    8: 15, // Shampoo CMC
    9: 15, // Booster CMC
    10: 5, // Shampoo Therapy
    11: 20, // Máscara CMC
    12: 10, // Perfume e Balm
    13: 25, // Kit Help My Hair SOS
  } as Record<number, number>,

  // Produto em destaque no topo durante a Black Friday
  featuredProductId: 13,
} as const

export function getProductDiscount(productId: number): number {
  return BLACK_FRIDAY_CONFIG.productDiscounts[productId] ?? 0
}

export function getMaxDiscount(): number {
  return Math.max(0, ...Object.values(BLACK_FRIDAY_CONFIG.productDiscounts))
}

// Cálculo em centavos para evitar erro de arredondamento
// (ex.: 354,70 com 25% = 266,03 e não 266,02)
export function getDiscountedPrice(price: number, discount: number): number {
  const cents = Math.round(price * 100)
  return Math.round((cents * (100 - discount)) / 100) / 100
}

/**
 * Preço que vale agora: calculado na hora (e não guardado no carrinho),
 * assim um item adicionado antes do início ganha o desconto e um item
 * no carrinho depois do fim volta ao preço normal.
 */
export function getEffectiveUnitPrice(item: {
  id: number
  currentPrice: number
}): number {
  if (getCampaignStatus() !== 'live') return item.currentPrice
  return getDiscountedPrice(item.currentPrice, getProductDiscount(item.id))
}

export function getEffectiveDiscount(productId: number): number {
  return getCampaignStatus() === 'live' ? getProductDiscount(productId) : 0
}

export function getCampaignStatus(): CampaignStatus {
  const mode = BLACK_FRIDAY_CONFIG.TEST_MODE
  if (mode !== 'off') return mode

  const now = Date.now()
  if (now < BLACK_FRIDAY_CONFIG.startDate.getTime()) return 'before'
  if (now <= BLACK_FRIDAY_CONFIG.endDate.getTime()) return 'live'
  return 'ended'
}

function getTimeUntil(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    total: diff,
  }
}

export function getTimeUntilStart(): TimeLeft {
  if (BLACK_FRIDAY_CONFIG.TEST_MODE === 'before') {
    return getTimeUntil(Date.now() + 26 * 3_600_000)
  }
  return getTimeUntil(BLACK_FRIDAY_CONFIG.startDate.getTime())
}

export function getTimeUntilEnd(): TimeLeft {
  if (BLACK_FRIDAY_CONFIG.TEST_MODE === 'live') {
    return getTimeUntil(Date.now() + 2 * 86_400_000 + 5 * 3_600_000)
  }
  return getTimeUntil(BLACK_FRIDAY_CONFIG.endDate.getTime())
}

/**
 * Status da campanha que se atualiza sozinho: a página muda de visual
 * no horário exato, sem a cliente precisar recarregar.
 */
export function useCampaignStatus(): CampaignStatus {
  const [status, setStatus] = useState<CampaignStatus>(getCampaignStatus)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStatus(getCampaignStatus())
    }, 1000)
    return () => window.clearInterval(timer)
  }, [])

  return status
}

export function useTimeLeft(target: 'start' | 'end'): TimeLeft {
  const read = target === 'start' ? getTimeUntilStart : getTimeUntilEnd
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(read)

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(read()), 1000)
    return () => window.clearInterval(timer)
  }, [read])

  return timeLeft
}
