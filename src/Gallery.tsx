import { nanoid } from "nanoid";

import GalleryItem from "./GalleryItem"
import type { GalleryItemProps } from "./GalleryItem"

interface GalleryProps {
    data: GalleryItemProps[]
}

export default function Gallery({ data } : GalleryProps) {
    
    const items: React.ReactElement[] = data.map(
        (item : GalleryItemProps) => 
        <GalleryItem
            key={nanoid()}
            name={item.name}
            link={item.link}
            img={item.img}
            blurb={item.blurb}
            tags={item.tags}
        />
    );

    return (
        <div className="gallery">
            {items}
        </div>
    );
}