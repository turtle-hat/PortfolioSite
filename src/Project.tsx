import type { ReactElement } from "react";
import ImageList from "./ImageList";
import type { ImageListItemProps } from "./ImageListItem";

export type ProjectProps = {
    title: string,
    subtitle: string,
    thumbnail: string,
    tags?: string,
    content: ReactElement,
    imageList: ImageListItemProps[]
}

export default function Project({ title, subtitle, thumbnail, content, tags, imageList } : ProjectProps) {
    return <section className={`project ${tags}`}>
        <h1 className="title">{title}</h1>
        <h2 className="subtitle">{subtitle}</h2>
        <img className="thumbnail" src={thumbnail} alt={`${title} thumbnail`} />
        <div className="content">
            {content}
            <ImageList data={imageList}/>
        </div>
    </section>
}