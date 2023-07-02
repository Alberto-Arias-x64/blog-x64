export interface HttpResponse<T> {
    data: T | any
    message: string
    status: 'OK' | 'FAIL'
}

export interface ImageInterface {
    src: string
    alt: string
}

export interface ProjectsInterface {
    title: string
    status: string
    description: string
    link: string
    image: ImageInterface
    tech: ImageInterface[]
}

export interface MessagesInterface {
    id: number
    name: string
    read: boolean
    createdAt: string | Date
}

export interface SingleMessageInterface extends MessagesInterface {
    mail: string
    message: string
    phone: string
    updatedAt: Date | string
}

export interface PostInterface {
    title: string
    keywords: string
    tags: string
    description: string
    date: Date | string
    data: string,
    image: string
}
