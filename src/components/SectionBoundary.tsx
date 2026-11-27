import { Component, ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

/**
 * Protege uma seção da página: se ela falhar (ex.: arquivo da seção não
 * baixou), só ela deixa de aparecer, em vez de derrubar o site inteiro.
 */
export class SectionBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('Seção ocultada por erro:', error)
  }

  render() {
    return this.state.hasError ? null : this.props.children
  }
}
