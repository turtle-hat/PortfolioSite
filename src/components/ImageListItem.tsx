import type { ReactElement } from "react"

export type ImageListItemProps = {
    image: string,
    title: string,
    content?: ReactElement
}

export default function ImageListItem({ image, title } : ImageListItemProps) {
    return <figure className="image-list-item">
        <img src={image} alt={title}/>
        <figcaption>{title}</figcaption>
    </figure>;
}