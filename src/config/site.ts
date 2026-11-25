/**
 * Dados do negócio usados em SEO, dados estruturados (schema.org) e llms.txt.
 * Mantenha estes dados iguais aos do Perfil da Empresa no Google.
 */
export const SITE = {
  url: 'https://studiokarenfrazao.com',
  name: 'Studio Karen Frazão',
  brand: 'Fabulos Hair',
  founder: 'Karen Frazão',
  title: 'Studio Karen Frazão · Fabulos Hair | Tricologia em Manaus e cosméticos capilares',
  description:
    'Studio de tricologia e terapia capilar integrativa em Manaus e cosméticos Fabulos Hair com ativos da Amazônia: tratamento de caspa, queda e cabelos danificados, alisamento natural e reconstrução do CMC. Entrega para todo o Brasil.',
  shortDescription:
    'Studio de tricologia e terapia capilar integrativa e marca de cosméticos capilares Fabulos Hair, com ativos da Amazônia e liberação da Anvisa.',
  phone: '+55 92 99378-7566',
  whatsapp: 'https://wa.me/5592993787566',
  email: 'sac@studiokarenfrazao.com',
  instagram: 'https://www.instagram.com/studiokarenfrazao/',
  ogImage: '/og-image.jpg',
  logo: '/image.png',
  foundingYearsText: 'Há mais de 7 anos',

  specialties: [
    'Tricologia e terapia capilar integrativa',
    'Tratamento de caspa, calvície e outras afecções do couro cabeludo',
    'Alisamento natural',
    'Reconstrução do CMC e do córtex capilar',
  ],

  // Endereço do Studio (atendimento presencial).
  // Preencha para ativar o cadastro como negócio local (HairSalon) no Google.
  address: {
    streetAddress: 'R. Pres. Vargas, 39-21',
    neighborhood: 'Zumbi dos Palmares',
    city: 'Manaus',
    state: 'AM',
    postalCode: '69084-444',
    country: 'BR',
  },
  // Ex.: ['Mo-Fr 09:00-18:00', 'Sa 09:00-13:00']
  openingHours: ['Mo-Sa 09:00-17:00'] as string[],
} as const

export const hasAddress = Boolean(SITE.address.streetAddress && SITE.address.city)

export const fullAddress = [
  SITE.address.streetAddress,
  SITE.address.neighborhood,
  `${SITE.address.city} - ${SITE.address.state}`,
  SITE.address.postalCode,
]
  .filter(Boolean)
  .join(', ')

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${SITE.name}, ${fullAddress}`
)}`
