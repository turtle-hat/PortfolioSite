import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectList from "./components/ProjectList";

import homepageProjects from "../data/homepage-projects"
import Nav from "./components/Nav";

export default function Homepage() {

    return <>
        <Header
            title="Owen Gebhardt"
            subtitle="Multifaceted, meticulous developer of enjoyable experiences"
        />
        <Nav/>
        <main>
            <ProjectList
                data={homepageProjects}
                tagFilter={""}
            />
        </main>
        <Footer />
    </>;
}
