import { ModalInterface } from '../interfaces/modal.interface'

/* Info */
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
export const postUpdatedMock: ModalInterface = {
    title: 'Post editado',
    description: 'Dentro de poco veras los cambios',
    image: {
        src: 'assets/icons/check.svg',
        alt: 'modal image'
    },
    buttonPrincipal: {
        text: 'Cerrar',
        action: null
    }
}
export const windowUploadedMock: ModalInterface = {
    title: 'Archivo Subido',
    description: 'Dentro de poco veras los cambios',
    image: {
        src: 'assets/icons/check.svg',
        alt: 'modal image'
    },
    buttonPrincipal: {
        text: 'Cerrar',
        action: null
    }
}
export const subscribedMock: ModalInterface = {
    title: 'Te has suscrito',
    description: 'Revisa su correo electrónico',
    image: {
        src: 'assets/icons/check.svg',
        alt: 'modal image'
    },
    buttonPrincipal: {
        text: 'Cerrar',
        action: null
    }
}

/* Confirm */
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
export const confirmDeleteMock: ModalInterface = {
    title: 'Confirma',
    description: 'Desea eliminar el archivo seleccionado',
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
export const confirmCancelMock: ModalInterface = {
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
export const confirmUpdateMock: ModalInterface = {
    title: 'Confirma',
    description: 'Desea guardar los cambios',
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

/* Errors */
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
export const ErrorOpenMock: ModalInterface = {
    title: 'Error',
    description: 'No se puede abrir el archivo',
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
