import '@/styles/Global.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { App } from './App.tsx'
import { GlobalStyles } from './styles/GlobalStyles.ts'
import { theme } from './styles/theme.ts'

import { AppErrorBoundary } from '@/components/AppErrorBoundary'
import { AppGuard } from '@/components/AppGuard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppErrorBoundary>
        <AppGuard>
          <App />
        </AppGuard>
      </AppErrorBoundary>
    </ThemeProvider>
  </StrictMode>
)

// Se um arquivo da página não baixar (comum logo após um deploy novo),
// recarrega uma única vez para pegar a versão atual.
window.addEventListener('vite:preloadError', (event) => {
  try {
    if (sessionStorage.getItem('reloaded-after-preload-error')) return
    sessionStorage.setItem('reloaded-after-preload-error', '1')
  } catch {
    return
  }
  event.preventDefault()
  window.location.reload()
})

// Animações ao rolar a página (antes vinham de um CDN externo sem versão fixa)
AOS.init()
