import { ModalInterface } from "../interfaces/modal.interface";

export const messageSendMock: ModalInterface = {
    title: "Mensaje enviado",
    description: "Tu mensaje a sido enviado satisfactoriamente, dentro de poco me pondré en contacto",
    image: {
        src: "assets/icons/check.svg",
        alt: "modal image",
    },
    buttonPrincipal: {
        text: "Cerrar",
        action: null,
    }
}

export const BlockIPMock: ModalInterface = {
    title: "Cuenta bloqueada",
    description: "Tu cuenta ha sido temporalmente bloqueada",
    image: {
        src: "assets/icons/check.svg",
        alt: "modal image",
    },
    buttonPrincipal: {
        text: "Cerrar",
        action: null,
    }
}

export const ExpiredTimeModal: ModalInterface = {
    title: "Sesión expirada",
    description: "Se acabo el tiempo",
    image: {
        src: "assets/icons/check.svg",
        alt: "modal image",
    },
    buttonPrincipal: {
        text: "Cerrar",
        action: null,
    }
}
