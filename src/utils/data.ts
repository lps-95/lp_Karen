export interface Product {
  id: number
  currentPrice: number
  promoPrice?: number
  image: string
  title: string
  description: string
  inStock: boolean
  discount?: number
  /** 'contain' = mostra a foto inteira (fotos horizontais, como kits) */
  imageFit?: 'cover' | 'contain'
  /** Enquadramento da foto no card (CSS object-position), ex.: 'center bottom' */
  imagePosition?: string
}

export const products: Product[] = [
  {
    id: 1,
    currentPrice: 68.0,
    image: 'img1.avif',
    title: 'Ampola de Reestruturação do Córtex',
    description:
      'Ampola de alta performance, age reestruturando fibras instáveis, elásticas, quebradiças e opacas. Em apenas 5 minutos no conforto da sua casa.',
    inStock: true,
  },
  {
    id: 2,
    currentPrice: 65.9,
    image: 'img3.avif',
    title: 'Sérum Fabulos Premium',
    description:
      'O sérun fabulos premium é o aliado ideal na reestruturação do CMC capilar, são 12 óleos essenciais que simultaneamente reparam danos na fibra e reestabelecem 18MEA, um composto de ácidos graxos indispensáveis para a saúde e integridade da fibra.',
    inStock: false,
  },
  {
    id: 3,
    currentPrice: 389.0,
    image: 'img6.avif',
    title: 'Kit Alisamento Natural',
    description:
      'Descubra o poder de uma fórmula inovadora que combina o melhor da ciência e da natureza para proporcionar resultados incríveis nos cabelos. Ideal para profissionais, o Kit Alisamento Natural oferece soluções completas para limpeza profunda e alinhamento dos fios de forma saudável e natural.',
    inStock: false,
  },
  {
    id: 4,
    currentPrice: 78.5,
    image: 'img8.avif',
    title: 'Máscara Therapy (Efeito Teia)',
    description:
      'Efeito teia com resultado de salão, reposição hídrica, mineral, proteica e de massa. Devolve aos fios força, maciez, promove resistência e vitalidade.',
    inStock: true,
  },
  {
    id: 5,
    currentPrice: 30.0,
    image: 'img5.avif',
    imagePosition: 'center bottom',
    title: 'Escova Fabulos Hair',
    description:
      'A escova Fabulos Hair ativa a circulação sanguínea do couro cabeludo promovendo o crescimento saudável dos fios, desembaraça sem rompimentos e auxilia na prevenção de pontas duplas e fios afinados.',
    inStock: true,
  },
  {
    id: 6,
    currentPrice: 46.9,
    image: '/img4.avif',
    title: 'Perfume Antifrizz',
    description:
      'O Perfume Antifrizz foi desenvolvido para remover a evidência dos fios frizzados, arrepiados e eletrizados.',
    inStock: true,
  },
  {
    id: 7,
    currentPrice: 54.5,
    image: 'reest.avif',
    title: 'Reestruturador Bifásico Therapy',
    description:
      'Protege a fibra contra agressões externas, equilibra o pH e mantém a estrutura do córtex com vitalidade.',
    inStock: true,
  },
  {
    id: 8,
    currentPrice: 57.0,
    image: 'img10.avif',
    title: 'Shampoo CMC',
    description:
      'O Shampoo Rosé atua restaurando o CMC capilar, devolvendo 18-metil eicosanoico à fibra.',
    inStock: true,
  },
  {
    id: 9,
    currentPrice: 57.0,
    image: 'img11.avif',
    title: 'Booster CMC',
    description:
      'Tratamento complementar para restaurar o CMC capilar e fortalecer a fibra.',
    inStock: true,
  },
  {
    id: 10,
    currentPrice: 49.0,
    image: 'img7.avif',
    title: 'Shampoo Therapy',
    description:
      'Age no couro cabeludo com ação antimicrobiana, antifúngica, antisséptica e cicatrizante. Combate radicais livres, oleosidade e caspa, promovendo oxigenação e crescimento.',
    inStock: true,
  },
  {
    id: 11,
    currentPrice: 74.0,
    image: 'masc.avif',
    title: 'Máscara CMC',
    description:
      'A Máscara 18 Rosé foi criada com tecnologia de alta performance para restaurar profundamente o CMC (Cimento da Membrana Celular).',
    inStock: true,
  },
  {
    id: 12,
    currentPrice: 55.0,
    image: 'balm.avif',
    title: 'Perfume e Balm',
    description:
      'Balm Restaurador do CMC Capilar. Tratamento inteligente que repara o CMC, camada responsável pela força, brilho e retenção de água dentro do fio.',
    inStock: true,
  },
  {
    id: 13,
    currentPrice: 354.7,
    image: 'help-my-hair.avif',
    imagePosition: 'center bottom',
    title: 'Kit Help My Hair SOS',
    description:
      'Tratamento tricológico profissional para cabelos elásticos, emborrachados, fragilizados e quebradiços. Shampoo, Máscara e Fluido SOS atuam no CMC e no córtex, repondo componentes estruturais e devolvendo resistência e integridade à fibra. Linha de uso profissional, não indicada para manutenção diária.',
    inStock: true,
  },
  {
    id: 14,
    currentPrice: 89.9,
    image: 'shampoo-sos.avif',
    imagePosition: 'center bottom',
    title: 'Shampoo Help My Hair SOS',
    description:
      'Limpeza Biomimética antioxidante, regenera e equilibra o pH. Nutriamino Cap, Nano Link e Pimenta-Rosa para reposição estrutural em cabelos fragilizados e elásticos.',
    inStock: true,
  },
  {
    id: 15,
    currentPrice: 119.9,
    image: 'fluido-sos.avif',
    imagePosition: 'center bottom',
    title: 'Fluido Help My Hair SOS',
    description:
      'Repositor estrutural sem enxágue com tecnologia de ação contínua. Potencializado por Algas Marrons e Pimenta-Rosa para máxima regeneração do CMC e córtex.',
    inStock: true,
  },
  {
    id: 16,
    currentPrice: 144.9,
    image: 'mascara-sos.avif',
    imagePosition: 'center bottom',
    title: 'Máscara Help My Hair SOS',
    description:
      'Regeneração estrutural biomimética profunda com Nutriamino Cap e Pimenta-Rosa. Combate radicais livres e repara danos oxidativos em cabelos emborrachados e quebradiços.',
    inStock: true,
  },
]
