import type { ReactElement } from "react"

export type ImageListItemProps = {
    image: string,
    title: string,
    content: ReactElement
}

export default function ImageListItem({ image, title, content } : ImageListItemProps) {
    return <img className="image-list-item" src={image} alt={title} title={title}/>;
}