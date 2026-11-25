import { BlackFridayHero } from "@/components/BlackFridayBanner"
import { BlackFridayCountdown } from "@/components/BlackFridayCountdown"
import { Divider } from "@/components/Divider"
import { FooterComponent } from "@/components/FooterComponent"
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
      {campaignStatus === 'before' && <BlackFridayCountdown />}
      {campaignStatus === 'live' && <BlackFridayHero />}

      <Container>
        <About />
        <CTA />
        <Divider />
        <ProductList />
        <Suspense fallback={null}>
          <Product />
          <Divider />
          <PresentationKit />
          <TestimonialSectionComponent />
          <FAQ />
        </Suspense>
        <FooterComponent />
      </Container>
    </>
  )
}
