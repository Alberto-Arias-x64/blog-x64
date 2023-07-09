import { ModalInterface } from '../interfaces/modal.interface'

export const messageSendMock: ModalInterface = {
    title: 'Mensaje enviado',
    description: 'Tu mensaje a sido enviado satisfactoriamente, dentro de poco me pondré en contacto',
    image: {
        src: 'assets/icons/check.svg',
        alt: 'modal image'
    },
    buttonPrincipal: {
        text: 'Cerrar',
        action: null
    }
}

export const postCreatedMock: ModalInterface = {
    title: 'Post creado',
    description: 'Dentro de poco veras el nuevo contenido',
    image: {
        src: 'assets/icons/check.svg',
        alt: 'modal image'
    },
    buttonPrincipal: {
        text: 'Cerrar',
        action: null
    }
}

export const confirmMock: ModalInterface = {
    title: 'Confirma',
    description: 'Desea descartar los cambios',
    image: {
        src: 'assets/icons/check.svg',
        alt: 'modal image'
    },
    buttonPrincipal: {
        text: 'Cancelar',
        action: null
    },
    buttonSecondary: {
        text: 'Aceptar',
        action: null
    }
}

export const BlockIPMock: ModalInterface = {
    title: 'Cuenta bloqueada',
    description: 'Tu cuenta ha sido temporalmente bloqueada',
    image: {
        src: 'assets/icons/check.svg',
        alt: 'modal image'
    },
    buttonPrincipal: {
        text: 'Cerrar',
        action: null
    }
}

export const ErrorMock: ModalInterface = {
    title: 'Ha ocurrido un error',
    description: 'Parece que ha ocurrido un error, vuelve a intentar',
    image: {
        src: 'assets/icons/check.svg',
        alt: 'modal image'
    },
    buttonPrincipal: {
        text: 'Cerrar',
        action: null
    }
}

export const ExpiredTimeModal: ModalInterface = {
    title: 'Sesión expirada',
    description: 'Se acabo el tiempo',
    image: {
        src: 'assets/icons/check.svg',
        alt: 'modal image'
    },
    buttonPrincipal: {
        text: 'Cerrar',
        action: null
    }
}

export const copyMock = (modalName: ModalInterface) => {
    return JSON.parse(JSON.stringify(modalName))
}
