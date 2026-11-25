import { fullAddress, mapsUrl, SITE } from "@/config/site"
import { Instagram, Mail, MapPin } from "lucide-react"
import {
  FooterContainer,
  FooterLinks,
  FooterLink,
  FooterSocials,
  SocialIcon,
  FooterText,
} from "./styles"

export const FooterComponent = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <FooterLink href='#cta' aria-label='Sobre'>
          Sobre
        </FooterLink>
        <FooterLink
          href='pdfs/politica de privacidade.pdf'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Política de Privacidade'
        >
          Política de Privacidade
        </FooterLink>

        <FooterLink
          href='pdfs/termos de servicos.pdf'
          target='_blank'
          aria-label='Termos de Serviço'
        >
          Termos de Serviço
        </FooterLink>
        <FooterLink
          href='mailto:sac@studiokarenfrazao.com'
          aria-label='Contato'
          target='_blank'
        >
          Contato
        </FooterLink>
      </FooterLinks>

      <FooterSocials>
        <SocialIcon
          href='mailto:sac@studiokarenfrazao.com'
          target='_blank'
          aria-label='Email'
        >
          <Mail />
        </SocialIcon>
        <SocialIcon
          href='https://www.instagram.com/studiokarenfrazao/'
          target='_blank'
          aria-label='Instagram'
        >
          <Instagram />
        </SocialIcon>
      </FooterSocials>

      <address className="mt-5 flex flex-col items-center gap-1 text-sm not-italic text-white md:text-base">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-white underline-offset-4 hover:underline"
        >
          <MapPin size={16} aria-hidden />
          {fullAddress}
        </a>
        <span>Segunda a sábado, das 9h às 17h · WhatsApp {SITE.phone}</span>
      </address>

      <FooterText>
        &copy; {new Date().getFullYear()} Studio Karen Frazão. Todos os direitos
        reservados.
      </FooterText>
    </FooterContainer>
  )
}
