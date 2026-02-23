export type GalleryItemProps = {
    name: string,
    link: string,
    img: string,
    blurb: string,
    tags?: string
}

export default function GalleryItem({ name, link, img, blurb, tags }: GalleryItemProps) {
    return (
        <div className={`gallery-item ${tags}`}>
            <a href={link}>
                <img src={img} alt={name} />
                <div className="gallery-item-blurb">
                    <h1>{name}</h1>
                    <h2>{blurb}</h2>
                </div>
            </a>
        </div>
    );
}