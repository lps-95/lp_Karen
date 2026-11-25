import { useCampaignStatus } from "@/config/black-friday"
import { ProductsGrid } from "../../components/ProductsList/index.tsx"
import { ContainerProduct } from "./styles.ts"

export function ProductList() {
  const isCampaignActive = useCampaignStatus() === 'live'

  return (
    <ContainerProduct id='products' $bfActive={isCampaignActive}>
      <ProductsGrid />
    </ContainerProduct>
  )
}
