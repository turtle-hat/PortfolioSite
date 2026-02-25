import audioVisualizerPhoto1 from "../img/projects/audio-visualizer/screenshot-1.jpg";
import audioVisualizerPhoto2 from "../img/projects/audio-visualizer/screenshot-2.jpg";
import audioVisualizerPhoto3 from "../img/projects/audio-visualizer/screenshot-3.jpg";

import avocadoAttorneyPhoto1 from "../img/projects/avocado-attorney/screenshot-1.png";
import avocadoAttorneyPhoto2 from "../img/projects/avocado-attorney/screenshot-2.png";
import avocadoAttorneyPhoto3 from "../img/projects/avocado-attorney/screenshot-3.png";

// import digitalTwinPhoto1 from "../img/projects/digital-twin/screenshot-1.jpg";

import direct3dPhoto1 from "../img/projects/direct3d-11-renderer/screenshot-1.jpg";
import direct3dPhoto2 from "../img/projects/direct3d-11-renderer/screenshot-2.jpg";
import direct3dPhoto3 from "../img/projects/direct3d-11-renderer/screenshot-3.jpg";
import direct3dPhoto4 from "../img/projects/direct3d-11-renderer/screenshot-4.png";

import portfolioSitePhoto1 from "../img/projects/portfolio-site/screenshot-1.png";
import portfolioSitePhoto2 from "../img/projects/portfolio-site/screenshot-2.png";
import portfolioSitePhoto3 from "../img/projects/portfolio-site/screenshot-3.png";

import remixVisualizerPhoto1 from "../img/projects/remix-visualizer/screenshot-1.jpg";
import remixVisualizerPhoto2 from "../img/projects/remix-visualizer/screenshot-2.jpg";
import remixVisualizerPhoto3 from "../img/projects/remix-visualizer/screenshot-3.jpg";

import rgdcPostersPhoto1 from "../img/projects/rgdc-posters/jamster-ref-sheet.jpg";
import rgdcPostersPhoto2 from "../img/projects/rgdc-posters/poster-1.jpg";
import rgdcPostersPhoto3 from "../img/projects/rgdc-posters/poster-2.jpg";
import rgdcPostersPhoto4 from "../img/projects/rgdc-posters/poster-3.jpg";

import tangramsPhoto1 from "../img/projects/tangrams/screenshot-1.jpg";
import tangramsPhoto2 from "../img/projects/tangrams/screenshot-2.jpg";
import tangramsPhoto3 from "../img/projects/tangrams/screenshot-3.jpg";




export default [
    {
        title: "Ten Grams of Tangrams",
        subtitle: "HTML - CSS - JavaScript - PixiJS",
        thumbnail: tangramsPhoto1,
        tags: "programming web design",
        content: <div>
            <p>For the final project in my Intro to Game Web Technology course during Fall 2022, I needed to design and program a video game to run in a web browser. As a kid, I used to play with a set of plastic puzzle pieces called tangrams, which includes a number of specific triangles and quadrilaterals. I brainstormed off from that idea and decided on a design for a puzzle game that tasks the player with fitting a set of angular pieces snugly into a board, much like a jigsaw puzzle.</p>
            <p>Each puzzle is created by procedurally dividing a full board into a random set of pieces, which are assigned a random color and scattered on the left to hide their original positions. Each piece is stored as a list of positions representing the filled triangles they’re made of, which is cross-referenced against a grid of occupied and unoccupied triangles in the board whenever one is placed.</p>
            <p>I hope to continue development on this game in the future. Due to the way triangle directionality is processed, pieces can currently only be placed on tiles that allow the diagonal lines across each square to match up. I’d like to remove this restriction to make gameplay more intuitive and allow greater creativity. Additionally, playtesting revealed that the piece sizes need to be more constrained: puzzles often contain tiny triangles that can fit anywhere and large pieces that can only fit in one place, both of which are uninteresting to deal with. Finally, I’d like to improve the graphics and color choices, since they’re currently unpolished and functional “programmer art.”</p>
            <p><a href="https://people.rit.edu/org7993/235/project3">Click here to play.</a></p>
        </div>,
        imageList: [
            {
                image: tangramsPhoto2,
                title: "Partially filled board"
            },
            {
                image: tangramsPhoto3,
                title: "Win screen"
            },
        ]
    },
    {
        title: "This Site",
        subtitle: "HTML - CSS - TypeScript - Node.js - Vite - React",
        thumbnail: portfolioSitePhoto1,
        tags: "programming web",
        content: <div>
            <p>The site you're looking at now was created in preparation for the RIT Spring 2026 Career Fair. After beginning to create the site in plain HTML and CSS during Summer 2025, I put development on hiatus to focus on applying to jobs. Seeking to broaden my skillset, I took an online class to learn React over the course of about 50 hours from October 2025 to February 2026. During February 2026, I refactored my original site to use a new React-based stack, blocking out the site into reusable components.</p>
            <p>In its current state, the site features data-driven design to generate site content from JSON-style data stored in a separate file, a responsive layout that changes based on window size, and accessible light- and dark-mode palettes.</p>
        </div>,
        imageList: [
            {
                image: portfolioSitePhoto2,
                title: "Tablet layout"
            },
            {
                image: portfolioSitePhoto3,
                title: "Mobile layout"
            },
        ]
    },
    {
        title: "Direct3D 11 Renderer",
        subtitle: "C++ - Direct3D11 - HLSL",
        thumbnail: direct3dPhoto1,
        tags: "programming",
        content: <div>
            <p>Rendering application to display 3D models, written during two classes over the course of two semesters. Features include:</p>
            <ul>
                <li>Physically-based materials with albedo, metalness, roughness, and normal maps.</li>
                <li>Custom mesh rendering.</li>
                <li>Lighting with multiple directional/point/spot lights.</li>
                <li>Real-time shadow mapping.</li>
                <li>Skyboxes.</li>
                <li>Post-processing blur and dithering effects.</li>
                <li>A foliage mesh generation system with adjustable parameters, many of which can be randomized with a seed.</li>
                <li>A user interface created with Dear ImGui that allows observation and tuning of simulation parameters during runtime.</li>
            </ul>
        </div>,
        imageList: [
            {
                image: direct3dPhoto3,
                title: "Foliage mesh generation parameters"
            },
        
            {
                image: direct3dPhoto4,
                title: "Particle emitters and shadows"
            },
            {
                image: direct3dPhoto2,
                title: "Blue noise dithering shader"
            },
        
        ]
    },
    {
        title: "Super Intergalactic Audio Visualizer",
        subtitle: "HTML - TypeScript - Node.js - Bulma - Webpack",
        thumbnail: audioVisualizerPhoto1,
        tags: "programming web design",
        content: <div>
            <p>Added EQ filters to web audio player application by interfacing with the WebAudio API. Used Canvas API to render a rotating field of stars, which react to the music. Designed clean, responsive, and modern page layout using the Bulma CSS framework.</p>
        </div>,
        imageList: [
            {
                image: audioVisualizerPhoto2,
                title: "Tablet Layout"
            },
            {
                image: audioVisualizerPhoto3,
                title: "Mobile Layout"
            },
        ]
    },
    {
        title: "Scratch Remix Tree Visualizer",
        subtitle: "HTML - CSS - JavaScript - AJAX",
        thumbnail: remixVisualizerPhoto1,
        tags: "programming web",
        content: <div>
            <p>MIT’s Scratch website, and the visual coding language used to create the projects shared there, was my first introduction to the practice of programming 12 years ago. It’s very important to me, and I still use it today to share short games and animations with my friends from high school. When I was given an assignment to build a browser application that interfaces with the API of another website, I decided to use the Scratch API to create a site that would be useful to me and my friends.</p>
            <p>One of Scratch’s primary features is the ability to view the code of projects written by others, and create a derivative project called a “remix” by modifying any project’s code and assets. In the previous official version of the Scratch website, Scratch 2.0, each project could be viewed in a “remix tree,” which visualized the connections between projects and their remixes in a phylogenetic tree–like diagram. This feature has become deprecated on the official site, and the visualization breaks down if looking at a long enough chain of remixes. I sought to recreate this feature using the skills I learned about the DOM and JavaScript in a way that would remain effective with large numbers of projects.</p>
        </div>,
        imageList: [
            {
                image: remixVisualizerPhoto2,
                title: "Parameter tooltips"
            },
            {
                image: remixVisualizerPhoto3,
                title: "Project info on hover"
            },
        ]
    },
    {
        title: "RIT Game Developers Club Posters",
        subtitle: "Graphic Design - Character Design - Krita",
        thumbnail: rgdcPostersPhoto1,
        tags: "design",
        content: <div>
            <p>As Vice President of the RIT Game Developers Club, advertised club events by designing promotional posters with a consistent brand identity. Designed a mascot character, Jamster, to use in club promotional materials. Coordinated and organized weekend-long game jams each semester, including preparing slideshows and overseeing event operations.</p>
        </div>,
        imageList: [
            {
                image: rgdcPostersPhoto2,
                title: "Fall 2024-Spring 2025 General Club Poster"
            },
            {
                image: rgdcPostersPhoto3,
                title: "Halloween 2024 Game Jam Poster"
            },
            {
                image: rgdcPostersPhoto4,
                title: "Spring 2025 Game Jam Poster"
            },
        ]
    },
    {
        title: "Avocado Attorney",
        subtitle: "2D visual novel game with robust developer tools for scripting cinematic sequences.",
        thumbnail: avocadoAttorneyPhoto1,
        tags: "programming design",
        content: <div>
            <p>A lighthearted, cartoonish courtroom visual novel game based on the Ace Attorney series, with a variety of custom systems for managing all aspects of gameplay and the user interface, including:</p>
            <ul>
                <li>2D character animations.</li>
                <li>Input polling with keyboard and touchscreen support.</li>
                <li>Text display with format markup, soft wrapping, and inline commands for signalling cinematic events.</li>
                <li>Vertically layered soundtrack coordination.</li>
                <li>User interface with animations.</li>
                <li>Visual effects.</li>
                <li>2D camera motions.</li>
                <li>Nonlinear scene flow control.</li>
            </ul>
            <p>Development has been ongoing since 2022, when free time allows. Currently, I am in the process of illustrating final art assets, including backgrounds, character animations, and interface elements. I have also hired a composer to write the game's original soundtrack and regularly coordinate with him to ensure it fits the desired tone for various story beats.</p>
            <p>Avocado Attorney is an open source project programmed in the block-based programming language Scratch using the TurboWarp IDE, with well-documented code systems designed to allow non-programmers to engage in communal storytelling by scripting their own game sequences in my custom engine and sharing their creations online.</p>
        </div>,
        imageList: [
            {
                image: avocadoAttorneyPhoto2,
                title: "Inventory interface"
            },
            {
                image: avocadoAttorneyPhoto3,
                title: "Dialogue option interface"
            },
        ]
    },
]
