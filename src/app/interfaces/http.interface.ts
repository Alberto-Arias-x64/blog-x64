export interface HttpResponse<T> {
    data:       T | any
    message:    string
    status:     'OK' | 'FAIL'
}

export interface ImageInterface {
    src: string
    alt: string
}

export interface ProjectsInterface {
    title:          string
    status:         string
    description:    string
    link:           string
    image:          ImageInterface
    tech:           ImageInterface[]
}

export interface MessagesInterface {
    id:         number
    name:       string
    read:       boolean
    createdAt:  string | Date
}

export interface SingleMessageInterface extends MessagesInterface {
    mail:       string
    message:    string
    phone:      string
    updatedAt:  Date | string
}

export interface PostInterface {
    id:             number
    title:          string
    keywords:       string
    category:       string
    description:    string
    createdAt:      Date | string
    updatedAt:      Date | string
    data:           string,
    image:          string,
    likes:          number,
    liked:          boolean
}

export interface PostPaginatorInterface{
    count: number,
    rows: PostInterface[]
}
export interface WindowsInterface {
    folders:  string[];
    archives: string[];
}

export interface CategoriesInterface {
    id:        number;
    category:  string;
    createdAt: Date;
    updatedAt: Date;
}
