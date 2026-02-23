import { nanoid } from "nanoid";
import type { ReactElement } from "react";

import Footer from "./Footer";
import Header from "./Header";
import Project from "./Project";

import homepageProjects from "../data/homepage-projects"

export default function Homepage() {
    const tagFilter : string[] = ["programming"];

    const projects : ReactElement[] = homepageProjects.map(project => {
        // Convert projectTags into array
        const projectTags : string[] = project.tags.split(" ");
        
        // Only display project if the filter contains one of its tags
        return tagFilter.length === 0 || tagFilter.some(tag => projectTags.includes(tag)) ?
        <Project
            key={nanoid()}
            title={project.title}
            subtitle={project.subtitle}
            thumbnail={project.thumbnail}
            content={project.content}
            imageList={project.imageList}
        />
        : <></>
    });

    return <>
        <Header />
        <main>
            {projects}
        </main>
        <Footer />
    </>;
}
