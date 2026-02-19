import Footer from "./Footer";
import Gallery from "./Gallery";
import Header from "./Header";
import Nav from "./Nav";

import homepageGallery from "../data/homepage-gallery"

export default function Homepage() {
    return <>
        <Header/>
        <Nav/>
        <Gallery data={homepageGallery}/>
        <Footer/>
    </>;
}
