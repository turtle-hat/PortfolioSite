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
            subtitle='Web apps and API-integrated projects built with React, JavaScript, TypeScript, and more'
            variant="web"
        />
        <Nav
            pageName='web'
        />
        <main>
            <ProjectList
                data={homepageProjects}
                tagFilter={"web"}
            />
        </main>
        <Footer variant='web'/>
    </StrictMode>
);
