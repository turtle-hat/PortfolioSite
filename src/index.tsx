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
            subtitle="Creating enjoyable experiences for users, developers, and everyone in between"
        />
        <Nav/>
        <main>
            <ProjectList
                data={homepageProjects}
                tagFilter={""}
            />
        </main>
        <Footer />
    </StrictMode>
);
