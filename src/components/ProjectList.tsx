import { nanoid } from "nanoid";
import type { ReactElement } from "react";

import Project from "./Project";
import type { ProjectProps } from "./Project"

export type ProjectListProps = {
    data: ProjectProps[],
    tagFilter?: string
}

export default function ProjectList({ data, tagFilter } : ProjectListProps) {
    const projects : ReactElement[] = data.map(project => {
        // Convert projectTags into array
        const projectTags : string[] = project.tags ? project.tags.split(" ") : [];
        
        // Only display project if the filter contains one of its tags
        return !tagFilter || tagFilter.length === 0 || tagFilter.split(" ").some(tag => projectTags.includes(tag)) ?
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
        {projects}
    </>
}
