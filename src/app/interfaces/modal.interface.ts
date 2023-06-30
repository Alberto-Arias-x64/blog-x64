import { ImageInterface } from './http.interface'

export interface ModalInterface {
    title: string
    image: ImageInterface
    description: string
    buttonPrincipal: {
        text: string
        action: Function | null
    },
    buttonSecondary?: {
        text: string
        action: Function | null
    }
}
