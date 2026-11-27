import {
  BLACK_FRIDAY_CONFIG,
  getDiscountedPrice,
  getMaxDiscount,
  getProductDiscount,
  useTimeLeft,
} from '@/config/black-friday'
import { products } from '@/utils/data'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

const GOLD_FOIL =
  'bg-[linear-gradient(180deg,#FBEFD6_0%,#E2C690_45%,#B48F55_75%,#E8CF9C_100%)] bg-clip-text text-transparent'

function formatBRL(value: number) {
  return `R$ ${value.toFixed(2).replace('.', ',')}`
}

function formatEnd(date: Date) {
  try {
    const day = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      timeZone: 'America/Manaus',
    })
    const hour = date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      timeZone: 'America/Manaus',
    })
    return `${day} às ${hour}h`
  } catch {
    // fallback sem fuso (aparelhos antigos sem a base de fusos horários)
    const d = new Date(date.getTime() - 4 * 3_600_000) // UTC-4 = Manaus
    const dd = String(d.getUTCDate()).padStart(2, '0')
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
    return `${dd}/${mm} às ${String(d.getUTCHours()).padStart(2, '0')}h`
  }
}

export function BlackFridayHero() {
  const timeLeft = useTimeLeft('end')
  const maxDiscount = getMaxDiscount()
  const endText = formatEnd(BLACK_FRIDAY_CONFIG.endDate)
  const isLastHours = timeLeft.total > 0 && timeLeft.total < 6 * 3_600_000

  const featured = products.find(
    (p) => p.id === BLACK_FRIDAY_CONFIG.featuredProductId && p.inStock
  )
  const featuredDiscount = featured ? getProductDiscount(featured.id) : 0
  const featuredPrice = featured
    ? getDiscountedPrice(featured.currentPrice, featuredDiscount)
    : 0

  useEffect(() => {
    const t = window.setTimeout(async () => {
      const { default: confetti } = await import('canvas-confetti')
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.4 },
        colors: ['#0A0A0A', '#D8BE93', '#F3E3C3', '#B48F55'],
      })
    }, 600)
    return () => window.clearTimeout(t)
  }, [])

  const units = [
    { value: timeLeft.days, label: 'dias' },
    { value: timeLeft.hours, label: 'horas' },
    { value: timeLeft.minutes, label: 'min' },
    { value: timeLeft.seconds, label: 'seg' },
  ]

  return (
    <header className="w-full bg-[#0A0A0A] text-white">
      {/* Faixa superior */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 bg-[#D8BE93] px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[#0A0A0A] sm:text-[13px]">
        <span className="hidden sm:inline">Black Friday Fabulos Hair</span>
        <span aria-hidden className="hidden sm:inline">✦</span>
        <span>Até {maxDiscount}% off</span>
        <span aria-hidden>✦</span>
        <span>Só até {endText}</span>
      </div>

      <section className="relative border-b border-[#D8BE93]/25 bg-[radial-gradient(900px_420px_at_72%_30%,rgba(216,190,147,0.16),transparent_70%)] px-4 pb-12 pt-9 sm:px-6 md:pb-16 md:pt-16">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-12">
          {/* Texto + contador */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex min-w-0 flex-[1_1_480px] flex-col gap-5"
          >
            <div className="flex items-center gap-3">
              <img
                src="image.png"
                alt="Logo Karen Frazão"
                className="h-9 w-9 object-contain md:h-11 md:w-11"
              />
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#D8BE93] md:text-[13px]">
                Karen Frazão · Fabulos Hair
              </span>
            </div>

            <p className="m-0 font-['LeagueGothic'] text-[96px] font-normal uppercase leading-[0.86] sm:text-[120px] md:text-[148px]">
              <span className={GOLD_FOIL}>Black</span>
              <br />
              Friday
            </p>

            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-['Stardom'] text-[32px] text-[#F3E3C3] md:text-[40px]">
                até {maxDiscount}% off
              </span>
              <span className="text-[15px] text-[#BDB6AA]">
                em produtos selecionados
              </span>
            </div>

            <div className="mt-1 flex flex-col gap-2.5">
              {isLastHours ? (
                <motion.span
                  animate={{ opacity: [0.55, 1, 0.55] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#F3E3C3]"
                >
                  Últimas horas · termina em
                </motion.span>
              ) : (
                <span className="text-[11px] uppercase tracking-[0.28em] text-[#BDB6AA] md:text-[12px]">
                  A oferta termina em
                </span>
              )}
              <div className="grid max-w-[366px] grid-cols-4 gap-2 md:gap-2.5">
                {units.map((u) => (
                  <div
                    key={u.label}
                    className="flex flex-col items-center gap-1 rounded-[14px] border border-[#D8BE93]/45 bg-[linear-gradient(180deg,#171512,#0D0C0A)] pb-2.5 pt-3"
                  >
                    <span className="font-['LeagueGothic'] text-[40px] leading-none text-[#F3E3C3] md:text-[48px]">
                      {String(u.value).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#BDB6AA] md:text-[11px]">
                      {u.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href="#products"
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(180deg,#F3E3C3,#C9A86A)] px-9 text-[14px] font-extrabold uppercase tracking-[0.16em] text-[#0A0A0A] no-underline shadow-[0_12px_34px_rgba(201,168,106,0.35)] transition-transform hover:-translate-y-0.5 sm:w-auto md:text-[15px]"
              >
                Ver ofertas
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <span className="w-full text-center text-[13px] text-[#BDB6AA] sm:w-auto sm:text-left">
                Válido até {endText} (horário de Manaus)
              </span>
            </div>
          </motion.div>

          {/* Produto em destaque */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="flex min-w-0 flex-[1_1_360px] justify-center"
            >
              <div className="relative w-full max-w-[520px] pr-3 pt-3 sm:pr-0 sm:pt-0">
                <div className="rounded-[32px] bg-[linear-gradient(160deg,#F3E3C3_0%,#B48F55_45%,#E8CF9C_70%,#8E6E3C_100%)] p-2 shadow-[0_40px_80px_rgba(0,0,0,0.6)] md:p-2.5">
                  <div className="flex flex-col overflow-hidden rounded-[24px] bg-[#0F2A22]">
                    <div className="flex items-center justify-between py-4 pl-5 pr-24 md:pr-28">
                      <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#D8BE93]">
                        Lançamento
                      </span>
                      <span className="hidden text-[10px] uppercase tracking-[0.2em] text-[#E9E3D7] sm:inline md:text-[11px]">
                        Linha profissional
                      </span>
                    </div>
                    <div className="mx-3 overflow-hidden rounded-[18px]">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="block h-[260px] w-full object-cover object-[50%_82%] md:h-[360px]"
                      />
                    </div>
                    <div className="flex flex-wrap items-end justify-between gap-3 px-5 pb-5 pt-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-['Stardom'] text-[22px] text-white md:text-[26px]">
                          {featured.title}
                        </span>
                        <span className="text-[12px] text-[#BDB6AA]">
                          Shampoo · Fluido · Máscara
                        </span>
                      </div>
                      {featuredDiscount > 0 && (
                        <div className="flex flex-col items-end gap-0.5">
                          <span className="text-[12px] text-[#BDB6AA] line-through">
                            {formatBRL(featured.currentPrice)}
                          </span>
                          <span
                            className={`font-['LeagueGothic'] text-[36px] leading-none md:text-[40px] ${GOLD_FOIL}`}
                          >
                            {formatBRL(featuredPrice)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {featuredDiscount > 0 && (
                  <div className="absolute -right-1 -top-3 flex h-[96px] w-[96px] flex-col items-center justify-center rounded-full border-2 border-[#D8BE93] bg-[#0A0A0A] shadow-[0_10px_30px_rgba(0,0,0,0.5)] sm:-right-6 sm:-top-6 md:h-[120px] md:w-[120px]">
                    <span
                      className={`font-['LeagueGothic'] text-[42px] leading-[0.9] md:text-[52px] ${GOLD_FOIL}`}
                    >
                      -{featuredDiscount}%
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.22em] text-[#F3E3C3] md:text-[10px]">
                      Destaque
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </header>
  )
}
