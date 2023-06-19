export interface HttpResponse<T> {
    data: T | any;
    message: string
    status: string
}

export interface BadgeInterface {
    src: string
    alt: string
}

export interface ProjectsInterface {
    title: string
    status: string
    frontend: string
    backend: string
    deploy: string
    description: string
    link: string
    image: BadgeInterface
}
