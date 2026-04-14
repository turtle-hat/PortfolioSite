import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ProjectList from "./components/ProjectList";

import homepageProjects from "../data/homepage-projects"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Header
            title="Owen Gebhardt"
            subtitle='2D and 3D applications with meticulous and robust systems design'
            variant="programming"
        />
        <Nav
            pageName='programming'
        />
        <main>
            <ProjectList
                data={homepageProjects}
                tagFilter={"programming"}
            />
        </main>
        <Footer variant='programming'/>
    </StrictMode>
);
