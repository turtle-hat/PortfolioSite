import type { ReactElement } from "react"
import ImageListItem from "./ImageListItem"
import type { ImageListItemProps } from "./ImageListItem"

interface ImageListProps {
    data: ImageListItemProps[]
};

export default function ImageList( { data }  : ImageListProps) {
    const images : ReactElement[] = data.map(imageData =>
        <ImageListItem
            image={imageData.image}
            title={imageData.title}
            content={imageData.content}
        />
    );
    
    return <>
        {images}
    </>
}
