import { nanoid } from "nanoid";
import type { ReactElement } from "react";

import Footer from "./Footer";
import Gallery from "./Gallery";
import Header from "./Header";
import Nav from "./Nav";
import Project from "./Project";

import homepageGallery from "../data/homepage-gallery"
import homepageProjects from "../data/homepage-projects"

export default function Homepage() {
    const projects : ReactElement[] = homepageProjects.map(project => 
        <Project
            key={nanoid()}
            title={project.title}
            subtitle={project.subtitle}
            thumbnail={project.thumbnail}
            content={project.content}
            imageList={project.imageList}
        />
    );

    return <>
        <Header />
        <main>
            {projects}
        </main>
        <Footer />
    </>;
}
