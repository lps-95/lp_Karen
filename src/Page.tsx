import { BlackFridayHero } from "@/components/BlackFridayBanner"
import { BlackFridayCountdown } from "@/components/BlackFridayCountdown"
import { Divider } from "@/components/Divider"
import { FooterComponent } from "@/components/FooterComponent"
import { useCampaignStatus } from "@/config/black-friday"
import { About } from "./Sessions/About"
import { CTA } from "./Sessions/CTA"
import { FAQ } from "./Sessions/FAQ'S"
import { PresentationKit } from "./Sessions/PresentationKit"
import { Product } from "./Sessions/Products"
import { ProductList } from "./Sessions/ProductsList"
import { TestimonialSectionComponent } from "./Sessions/Testemonials"
import { Container } from "./styles/GlobalStyles"

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
        <Product />
        <Divider />
        <PresentationKit />
        <TestimonialSectionComponent />
        <FAQ />
        <FooterComponent />
      </Container>
    </>
  )
}
