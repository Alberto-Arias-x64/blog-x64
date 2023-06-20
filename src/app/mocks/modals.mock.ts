import { ModalInterface } from "../interfaces/modal.interface";

export const messageSendMock: ModalInterface = {
    title: "Mensaje enviado",
    description: "Tu mensaje a sido enviado satisfactoriamente, dentro de poco me pondré en contacto",
    image: {
        src: "assets/icons/check.svg",
        alt: "modal image",
    },
    button: "Cerrar"
}

export const BlockIPMock: ModalInterface = {
    title: "Cuenta bloqueada",
    description: "Tu cuenta ha sido temporalmente bloqueada",
    image: {
        src: "assets/icons/check.svg",
        alt: "modal image",
    },
    button: "Cerrar"
}
