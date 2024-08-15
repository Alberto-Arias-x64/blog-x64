import type { ImageInterface } from './http.interface'

export interface ModalInterface {
  title: string
  image: ImageInterface
  description: string
  buttonPrincipal: {
    text: string
    action: (() => void) | null
  }
  buttonSecondary?: {
    text: string
    action: (() => void) | null
  }
}
