export interface City {
  /** Usado na URL: /osorio, /capao-da-canoa… */
  slug: string
  name: string
  /** Como o nome entra no meio de uma frase. */
  inName: string
  days: string
  period: string
  /**
   * Dias da semana em que a rota passa, no padrão do JavaScript
   * (0 = domingo … 6 = sábado). É daqui que sai a data da próxima entrega
   * mostrada no site. Vazio nas cidades sem dia fixo.
   */
  weekdays: number[]
  /** Parágrafo próprio de cada cidade. Página de cidade sem conteúdo próprio
   *  é página-isca, e o Google trata como tal. */
  intro: string
  isBase?: boolean
  /** Sem dia fixo: a data é combinada no WhatsApp depois do pedido. */
  onRequest?: boolean
}

export const CITIES: City[] = [
  {
    slug: 'santo-antonio-da-patrulha',
    name: 'Santo Antônio da Patrulha',
    inName: 'em Santo Antônio da Patrulha',
    days: 'Segunda a sexta',
    period: 'a combinar',
    weekdays: [1, 2, 3, 4, 5],
    isBase: true,
    intro:
      'A cozinha fica aqui. É de Santo Antônio da Patrulha que saem todas as marmitas Vivere, para as oito cidades que atendemos. Por ser a cidade-sede, a entrega acontece de segunda a sexta — e quem preferir pode retirar direto na R. Sezefredo da Costa Tôrres, 373, no Centro, combinando o horário na hora do pedido.',
  },
  {
    slug: 'osorio',
    name: 'Osório',
    inName: 'em Osório',
    days: 'Terças e sextas',
    period: 'pela manhã',
    weekdays: [2, 5],
    intro:
      'Osório é a cidade que a Vivere atende com mais frequência depois da sede: são duas entregas por semana, terça e sexta pela manhã. São cerca de 35 quilômetros de estrada desde a nossa cozinha em Santo Antônio da Patrulha, percorridos com as marmitas em caixa térmica — elas saem congeladas e chegam congeladas, prontas para ir direto ao seu freezer.',
  },
  {
    slug: 'capao-da-canoa',
    name: 'Capão da Canoa',
    inName: 'em Capão da Canoa',
    days: 'Sextas',
    period: 'pela manhã',
    weekdays: [5],
    intro:
      'Em Capão da Canoa a entrega é toda sexta pela manhã, na mesma viagem que desce o litoral e atende Xangri-Lá. São cerca de 70 quilômetros desde a cozinha, o trajeto mais longo da nossa rota — por isso a viagem é semanal e com hora marcada. Como a validade é de 180 dias no congelador, uma entrega por semana costuma resolver o mês inteiro de quem se organiza.',
  },
  {
    slug: 'xangri-la',
    name: 'Xangri-Lá',
    inName: 'em Xangri-Lá',
    days: 'Sextas',
    period: 'pela manhã',
    weekdays: [5],
    intro:
      'Xangri-Lá entra na rota do litoral junto com Capão da Canoa: a entrega é toda sexta pela manhã. São cerca de 59 quilômetros desde Santo Antônio da Patrulha. O pedido é feito no cardápio online e a data já fica marcada no carrinho, sem precisar combinar nada depois.',
  },
  {
    slug: 'glorinha',
    name: 'Glorinha',
    inName: 'em Glorinha',
    days: 'Quartas',
    period: 'pela manhã',
    weekdays: [3],
    intro:
      'Glorinha tem dia próprio na nossa rota: quarta-feira pela manhã. É a cidade mais próxima da cozinha depois da sede, o que mantém o trajeto curto e a marmita bem congelada até a sua porta. A data da entrega você escolhe no próprio cardápio online, ao fechar o pedido.',
  },
  {
    slug: 'tramandai',
    name: 'Tramandaí',
    inName: 'em Tramandaí',
    days: 'A combinar',
    period: 'pelo WhatsApp',
    weekdays: [],
    onRequest: true,
    intro:
      'A Vivere entrega em Tramandaí, mas essa ainda não é uma cidade com dia fixo na rota. Na prática funciona assim: você monta o pedido normalmente no cardápio online e, logo depois, a gente combina com você pelo WhatsApp a melhor data para a entrega. É um passo a mais, e nenhum custo a mais — o frete é o mesmo das outras cidades.',
  },
  {
    slug: 'imbe',
    name: 'Imbé',
    inName: 'em Imbé',
    days: 'A combinar',
    period: 'pelo WhatsApp',
    weekdays: [],
    onRequest: true,
    intro:
      'Imbé é atendida pela Vivere sem dia fixo por enquanto. Você faz o pedido pelo cardápio online como qualquer outra cidade, e a data da entrega a gente acerta com você no WhatsApp em seguida. Conforme o número de pedidos em Imbé crescer, a cidade entra na rota com dia marcado — como já aconteceu com Xangri-Lá.',
  },
  {
    slug: 'caraa',
    name: 'Caraá',
    inName: 'em Caraá',
    days: 'A combinar',
    period: 'pelo WhatsApp',
    weekdays: [],
    onRequest: true,
    intro:
      'Caraá é vizinha de Santo Antônio da Patrulha e está entre as cidades que a Vivere atende sem dia fixo. Faça o pedido pelo cardápio online e a gente combina a data da entrega com você pelo WhatsApp logo depois. Por ser perto da cozinha, costuma dar pra encaixar com facilidade.',
  },
]

export function cityBySlug(slug: string): City | undefined {
  return CITIES.find((city) => city.slug === slug)
}
