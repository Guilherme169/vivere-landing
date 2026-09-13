// Import relativo de propósito: este arquivo também é lido pelo vite.config,
// que não resolve o alias '@'.
import type { City } from './cities'

/**
 * Próxima data de entrega de uma cidade, a partir dos dias fixos da rota.
 *
 * É a informação que nenhum concorrente nacional consegue dar: eles entregam
 * "em até X dias úteis", a Vivere passa na cidade em dia marcado. Dizer
 * "próxima entrega: terça, 16 de setembro" é concreto e responde ao "quando
 * isso chega aqui?" sem o visitante ter que abrir o cardápio.
 *
 * Sempre calculado no navegador, nunca no build: data de build congela e em
 * dois dias a página estaria mentindo.
 */
export function proximaEntrega(weekdays: number[], hoje = new Date()): Date | null {
  if (!weekdays.length) return null

  const base = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
  for (let salto = 0; salto <= 7; salto += 1) {
    const dia = new Date(base)
    dia.setDate(base.getDate() + salto)
    if (weekdays.includes(dia.getDay())) return dia
  }
  return null
}

const DIAS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
const DIAS_CURTOS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
const MESES = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
]

function mesmodia(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString()
}

/** "hoje", "amanhã" ou "ter, 16/09". */
export function entregaCurta(data: Date, hoje = new Date()): string {
  const amanha = new Date(hoje)
  amanha.setDate(hoje.getDate() + 1)
  if (mesmodia(data, hoje)) return 'hoje'
  if (mesmodia(data, amanha)) return 'amanhã'
  const dd = String(data.getDate()).padStart(2, '0')
  const mm = String(data.getMonth() + 1).padStart(2, '0')
  return `${DIAS_CURTOS[data.getDay()]}, ${dd}/${mm}`
}

/** "hoje", "amanhã" ou "terça, 16 de setembro". */
export function entregaLonga(data: Date, hoje = new Date()): string {
  const amanha = new Date(hoje)
  amanha.setDate(hoje.getDate() + 1)
  if (mesmodia(data, hoje)) return 'hoje'
  if (mesmodia(data, amanha)) return 'amanhã'
  return `${DIAS[data.getDay()]}, ${data.getDate()} de ${MESES[data.getMonth()]}`
}

/** Atalho para quem já tem a cidade em mãos. */
export function proximaEntregaDaCidade(city: City, hoje = new Date()): Date | null {
  return proximaEntrega(city.weekdays, hoje)
}
