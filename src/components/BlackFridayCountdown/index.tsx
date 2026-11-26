import { BLACK_FRIDAY_CONFIG, getMaxDiscount, useTimeLeft } from '@/config/black-friday'
import { motion } from 'framer-motion'

const GOLD_FOIL =
  'bg-[linear-gradient(180deg,#FBEFD6_0%,#E2C690_45%,#B48F55_75%,#E8CF9C_100%)] bg-clip-text text-transparent'

function formatStart(date: Date) {
  const day = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    timeZone: 'America/Manaus',
  })
  const hour = date.toLocaleTimeString('pt-BR', {
    hour: 'numeric',
    timeZone: 'America/Manaus',
  })
  return `${day} às ${hour}h`
}

/** Faixa "começa em", exibida antes do início da Black Friday. */
export function BlackFridayCountdown() {
  const timeLeft = useTimeLeft('start')

  const units = [
    { value: timeLeft.days, label: 'dias' },
    { value: timeLeft.hours, label: 'horas' },
    { value: timeLeft.minutes, label: 'min' },
    { value: timeLeft.seconds, label: 'seg' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full border-b border-[#D8BE93]/40 bg-[#0A0A0A] bg-[radial-gradient(700px_200px_at_50%_0%,rgba(216,190,147,0.18),transparent_70%)] px-4 py-5 text-white md:py-7"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center gap-4 md:flex-row md:gap-16">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D8BE93] md:text-[12px]">
            Em breve · {formatStart(BLACK_FRIDAY_CONFIG.startDate)} (Manaus)
          </span>
          <span className="font-['LeagueGothic'] text-[48px] uppercase leading-[0.9] md:text-[64px]">
            <span className={GOLD_FOIL}>Black</span> Friday
          </span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#BDB6AA] md:text-[11px]">
            Começa em
          </span>
          <div className="flex gap-2">
            {units.map((u) => (
              <div
                key={u.label}
                className="flex w-[62px] flex-col items-center gap-0.5 rounded-xl border border-[#D8BE93]/45 bg-[#141311] pb-2 pt-2.5 md:w-[70px]"
              >
                <span className="font-['LeagueGothic'] text-[32px] leading-none text-[#F3E3C3] md:text-[38px]">
                  {String(u.value).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-[0.18em] text-[#BDB6AA] md:text-[10px]">
                  {u.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 rounded-[18px] border border-[#D8BE93] px-6 py-3">
          <span className="font-['Stardom'] text-[28px] text-[#F3E3C3] md:text-[34px]">
            até {getMaxDiscount()}% off
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-[#BDB6AA] md:text-[11px]">
            Estoque limitado
          </span>
        </div>
      </div>
    </motion.div>
  )
}
