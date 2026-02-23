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
            title="Programming"
            variant="programming"
        />
        <Nav/>
        <main>
            <ProjectList
                data={homepageProjects}
                tagFilter={"programming"}
            />
        </main>
        <Footer variant='programming'/>
    </StrictMode>
);
