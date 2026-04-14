import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ProjectList from "./components/ProjectList";

import homepageProjects from "../data/homepage-projects";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Header
            title="Owen Gebhardt"
            subtitle='UI/UX design, CSS, graphic design, and illustration'
            variant="design"
        />
        <Nav
            pageName="design"
        />
        <main>
            <ProjectList
                data={homepageProjects}
                tagFilter={"design"}
            />
        </main>
        <Footer variant='design'/>
    </StrictMode>
);
