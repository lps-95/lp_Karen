import { BlackFridayHero } from "@/components/BlackFridayBanner"
import { BlackFridayCountdown } from "@/components/BlackFridayCountdown"
import { Divider } from "@/components/Divider"
import { FooterComponent } from "@/components/FooterComponent"
import { SectionBoundary } from "@/components/SectionBoundary"
import { useCampaignStatus } from "@/config/black-friday"
import { lazy, Suspense } from "react"
import { About } from "./Sessions/About"
import { CTA } from "./Sessions/CTA"
import { ProductList } from "./Sessions/ProductsList"
import { Container } from "./styles/GlobalStyles"

// Seções abaixo da primeira tela: baixadas depois, deixando o início mais rápido
const Product = lazy(() =>
  import("./Sessions/Products").then((m) => ({ default: m.Product }))
)
const PresentationKit = lazy(() =>
  import("./Sessions/PresentationKit").then((m) => ({ default: m.PresentationKit }))
)
const TestimonialSectionComponent = lazy(() =>
  import("./Sessions/Testemonials").then((m) => ({
    default: m.TestimonialSectionComponent,
  }))
)
const FAQ = lazy(() => import("./Sessions/FAQ'S").then((m) => ({ default: m.FAQ })))

export const LandingPage = () => {
  // before = faixa "começa em" | live = Black Friday | ended = página normal
  const campaignStatus = useCampaignStatus()

  return (
    <>
      <SectionBoundary>
        {campaignStatus === 'before' && <BlackFridayCountdown />}
        {campaignStatus === 'live' && <BlackFridayHero />}
      </SectionBoundary>

      <Container>
        <About />
        <CTA />
        <Divider />
        <ProductList />
        <SectionBoundary>
          <Suspense fallback={null}>
            <Product />
          </Suspense>
        </SectionBoundary>
        <Divider />
        <SectionBoundary>
          <Suspense fallback={null}>
            <PresentationKit />
          </Suspense>
        </SectionBoundary>
        <SectionBoundary>
          <Suspense fallback={null}>
            <TestimonialSectionComponent />
          </Suspense>
        </SectionBoundary>
        <SectionBoundary>
          <Suspense fallback={null}>
            <FAQ />
          </Suspense>
        </SectionBoundary>
        <FooterComponent />
      </Container>
    </>
  )
}
