/**
 * Plugin de SEO/GEO.
 *
 * O site é uma SPA (montada por JavaScript). O Google executa JS, mas a
 * maioria dos robôs de IA (ChatGPT, Claude, Perplexity) só lê o HTML bruto.
 * Este plugin gera, no build, a partir do catálogo real:
 *  - um resumo em HTML semântico dentro do #root (lido por quem não roda JS,
 *    escondido para quem roda; o React substitui o conteúdo ao montar);
 *  - dados estruturados schema.org (Organization, HairSalon, Product, FAQPage);
 *  - /llms.txt e /sitemap.xml.
 */
import type { Plugin } from 'vite'
import { faqData } from './src/components/FAQ\'sComponets/data.ts'
import { SITE, fullAddress, hasAddress, mapsUrl } from './src/config/site.ts'
import { products } from './src/utils/data.ts'

const abs = (path: string) => `${SITE.url}/${path.replace(/^\//, '')}`

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const clean = (s: string) => s.replace(/\s+/g, ' ').trim()

const brl = (v: number) => `R$ ${v.toFixed(2).replace('.', ',')}`

function buildJsonLd() {
  const orgId = `${SITE.url}/#organization`
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: SITE.name,
      alternateName: [SITE.brand, SITE.founder],
      url: SITE.url,
      logo: abs(SITE.logo),
      image: abs(SITE.ogImage),
      description: SITE.shortDescription,
      email: SITE.email,
      telephone: SITE.phone,
      founder: { '@type': 'Person', name: SITE.founder },
      brand: { '@type': 'Brand', name: SITE.brand },
      knowsAbout: SITE.specialties,
      sameAs: [SITE.instagram],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: SITE.phone,
        email: SITE.email,
        url: SITE.whatsapp,
        availableLanguage: 'pt-BR',
        areaServed: 'BR',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      inLanguage: 'pt-BR',
      publisher: { '@id': orgId },
    },
  ]

  if (hasAddress) {
    const a = SITE.address
    graph.push({
      '@type': 'HairSalon',
      '@id': `${SITE.url}/#studio`,
      name: SITE.name,
      url: SITE.url,
      image: abs(SITE.ogImage),
      telephone: SITE.phone,
      email: SITE.email,
      parentOrganization: { '@id': orgId },
      address: {
        '@type': 'PostalAddress',
        streetAddress: a.streetAddress,
        addressLocality: a.city,
        addressRegion: a.state,
        postalCode: a.postalCode,
        addressCountry: a.country,
      },
      ...(SITE.openingHours.length ? { openingHours: SITE.openingHours } : {}),
      hasMap: mapsUrl,
      areaServed: { '@type': 'City', name: a.city },
      makesOffer: SITE.specialties.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s },
      })),
      sameAs: [SITE.instagram],
    })
  }

  graph.push({
    '@type': 'ItemList',
    '@id': `${SITE.url}/#produtos`,
    name: `Produtos ${SITE.brand}`,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.title,
        image: abs(p.image),
        description: clean(p.description),
        brand: { '@type': 'Brand', name: SITE.brand },
        offers: {
          '@type': 'Offer',
          price: p.currentPrice.toFixed(2),
          priceCurrency: 'BRL',
          availability: p.inStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          url: `${SITE.url}/#products`,
          seller: { '@id': orgId },
        },
      },
    })),
  })

  graph.push({
    '@type': 'FAQPage',
    '@id': `${SITE.url}/#faq`,
    mainEntity: faqData.map((f) => ({
      '@type': 'Question',
      name: clean(f.question),
      acceptedAnswer: { '@type': 'Answer', text: clean(f.answer) },
    })),
  })

  // "<" escapado para não fechar a tag <script> por acidente
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  return `<script type="application/ld+json">${json.replace(/</g, '\\u003c')}</script>`
}

function buildFallbackHtml() {
  const productItems = products
    .map(
      (p) =>
        `<li><h3>${esc(p.title)}</h3><p>${brl(p.currentPrice)} · ${
          p.inStock ? 'Disponível' : 'Esgotado'
        }</p><p>${esc(clean(p.description))}</p></li>`
    )
    .join('')

  const faqItems = faqData
    .map((f) => `<dt>${esc(clean(f.question))}</dt><dd>${esc(clean(f.answer))}</dd>`)
    .join('')

  const addressLine = hasAddress
    ? `<p>Endereço do Studio: <a href="${esc(mapsUrl)}">${esc(fullAddress)}</a></p><p>Atendimento: segunda a sábado, das 9h às 17h.</p>`
    : ''

  return `<div id="seo-fallback">
<header><h1>${esc(SITE.name)} · ${esc(SITE.brand)}</h1><p>${esc(SITE.description)}</p></header>
<main>
<section><h2>Sobre</h2><p>${esc(SITE.foundingYearsText)} entregando saúde e beleza capilar. Produtos de alta performance com ativos da Amazônia, desenvolvidos pela marca ${esc(
    SITE.brand
  )}, com testes de eficácia e liberação da Anvisa.</p>
<h3>Especialidades</h3><ul>${SITE.specialties.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></section>
<section><h2>Produtos</h2><ul>${productItems}</ul></section>
<section><h2>Perguntas frequentes</h2><dl>${faqItems}</dl></section>
<section><h2>Contato e agendamento</h2>
<p>WhatsApp: <a href="${SITE.whatsapp}">${esc(SITE.phone)}</a></p>
<p>E-mail: <a href="mailto:${SITE.email}">${esc(SITE.email)}</a></p>
<p>Instagram: <a href="${SITE.instagram}">@studiokarenfrazao</a></p>
${addressLine}<p>Entregamos para todo o Brasil.</p></section>
</main>
</div>`
}

function buildLlmsTxt() {
  const lines = [
    `# ${SITE.name} · ${SITE.brand}`,
    '',
    `> ${SITE.shortDescription}`,
    '',
    `${SITE.foundingYearsText} entregando saúde e beleza capilar. Fundadora: ${SITE.founder}. Vendas e agendamentos pelo WhatsApp, com entrega para todo o Brasil.`,
    '',
    '## Especialidades',
    '',
    ...SITE.specialties.map((s) => `- ${s}`),
    '',
    '## Produtos e preços',
    '',
    ...products.map(
      (p) =>
        `- **${p.title}** — ${brl(p.currentPrice)} (${
          p.inStock ? 'disponível' : 'esgotado'
        }): ${clean(p.description)}`
    ),
    '',
    '## Perguntas frequentes',
    '',
    ...faqData.flatMap((f) => [`### ${clean(f.question)}`, '', clean(f.answer), '']),
    '## Contato',
    '',
    `- Site: ${SITE.url}`,
    `- WhatsApp: ${SITE.phone} (${SITE.whatsapp})`,
    `- E-mail: ${SITE.email}`,
    `- Instagram: ${SITE.instagram}`,
  ]
  if (hasAddress) {
    lines.push(`- Endereço do Studio: ${fullAddress} (${mapsUrl})`)
    lines.push('- Atendimento presencial: segunda a sábado, das 9h às 17h')
  }
  return lines.join('\n') + '\n'
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10)
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE.url}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
</urlset>
`
}

export function seoPlugin(): Plugin {
  return {
    name: 'karen-seo',
    transformIndexHtml: {
      // 'pre': substitui antes do Vite analisar os links do HTML
      order: 'pre',
      handler(html) {
        return html
          .replace('<!--seo:jsonld-->', buildJsonLd())
          .replace('<!--seo:fallback-->', buildFallbackHtml())
          .replace(/%SITE_TITLE%/g, esc(SITE.title))
          .replace(/%SITE_DESCRIPTION%/g, esc(SITE.description))
          .replace(/%SITE_URL%/g, SITE.url)
          .replace(/%SITE_OG_IMAGE%/g, abs(SITE.ogImage))
      },
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: buildLlmsTxt() })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap() })
    },
  }
}
