import audioVisualizerThumb from "../img/projects/audio-visualizer/thumb.jpeg";
import audioVisualizer1 from "../img/projects/audio-visualizer/1.jpeg";
import audioVisualizer2 from "../img/projects/audio-visualizer/2.jpeg";

import arrowAceThumb from "../img/projects/arrow-ace/thumb.png";
import arrowAce1 from "../img/projects/arrow-ace/1.jpeg";
import arrowAce2 from "../img/projects/arrow-ace/2.jpeg";
import arrowAce3 from "../img/projects/arrow-ace/3.jpeg";

import avocadoAttorneyThumb from "../img/projects/avocado-attorney/thumb.png";
import avocadoAttorney1 from "../img/projects/avocado-attorney/1.jpeg";
import avocadoAttorney2 from "../img/projects/avocado-attorney/2.jpeg";
import avocadoAttorney3 from "../img/projects/avocado-attorney/3.jpeg";

import digitalTwinThumb from "../img/projects/digital-twin/thumb.jpeg";
import digitalTwin1 from "../img/projects/digital-twin/1.jpeg";
import digitalTwin2 from "../img/projects/digital-twin/2.jpeg";
import digitalTwin3 from "../img/projects/digital-twin/3.jpeg";
import digitalTwin4 from "../img/projects/digital-twin/4.jpeg";

import direct3dThumb from "../img/projects/direct3d-11-renderer/thumb.jpeg";
import direct3d1 from "../img/projects/direct3d-11-renderer/1.jpeg";
import direct3d2 from "../img/projects/direct3d-11-renderer/2.jpeg";
import direct3d3 from "../img/projects/direct3d-11-renderer/3.jpeg";

import portfolioSiteThumb from "../img/projects/portfolio-site/thumb.jpeg";
import portfolioSite1 from "../img/projects/portfolio-site/1.jpeg";
import portfolioSite2 from "../img/projects/portfolio-site/2.jpeg";
import portfolioSite3 from "../img/projects/portfolio-site/3.jpeg";
import portfolioSite4 from "../img/projects/portfolio-site/4.jpeg";

import remixVisualizerThumb from "../img/projects/remix-visualizer/thumb.jpeg";
import remixVisualizer1 from "../img/projects/remix-visualizer/1.jpeg";
import remixVisualizer2 from "../img/projects/remix-visualizer/2.jpeg";

import rgdcPostersThumb from "../img/projects/rgdc-posters/thumb.jpeg";
import rgdcPosters1 from "../img/projects/rgdc-posters/1.jpeg";
import rgdcPosters2 from "../img/projects/rgdc-posters/2.jpeg";
import rgdcPosters3 from "../img/projects/rgdc-posters/3.jpeg";

import roundAndRoundTripThumb from "../img/projects/round-and-round-trip/thumb.png";
import roundAndRoundTrip1 from "../img/projects/round-and-round-trip/1.jpeg";
import roundAndRoundTrip2 from "../img/projects/round-and-round-trip/2.jpeg";

import tangramsThumb from "../img/projects/tangrams/thumb.jpeg";
import tangrams1 from "../img/projects/tangrams/1.jpeg";
import tangrams2 from "../img/projects/tangrams/2.jpeg";
import tangrams3 from "../img/projects/tangrams/3.jpeg";




export default [
    {title: "Ten Grams of Tangrams",
        subtitle: "HTML - CSS - JavaScript - PixiJS",
        thumbnail: tangramsThumb,
        tags: "programming web design",
        content: <div>
            <p>For the final project in my Intro to Game Web Technology course during Fall 2022, I needed to design and program a video game to run in a web browser. As a kid, I used to play with a set of plastic puzzle pieces called tangrams, which includes a number of specific triangles and quadrilaterals. I brainstormed off from that idea and decided on a design for a puzzle game that tasks the player with fitting a set of angular pieces snugly into a board, much like a jigsaw puzzle.</p>
            <p>Each puzzle is created by procedurally dividing a full board into a random set of pieces, which are assigned a random color and scattered on the left to hide their original positions. Each piece is stored as a list of positions representing the filled triangles they’re made of, which is cross-referenced against a grid of occupied and unoccupied triangles in the board whenever one is placed.</p>
            <p>I hope to continue development on this game in the future. Due to the way triangle directionality is processed, pieces can currently only be placed on tiles that allow the diagonal lines across each square to match up. I’d like to remove this restriction to make gameplay more intuitive and allow greater creativity. Additionally, playtesting revealed that the piece sizes need to be more constrained: puzzles often contain tiny triangles that can fit anywhere and large pieces that can only fit in one place, both of which are uninteresting to deal with. Finally, I’d like to improve the graphics and color choices, since they’re currently unpolished and functional “programmer art.”</p>
            <p><a href="https://people.rit.edu/org7993/235/project3" target="_blank">Click here to play.</a></p>
        </div>,
        imageList: [
            {
                image: tangrams1,
                title: "Starting state"
            },
            {
                image: tangrams2,
                title: "Partially filled board"
            },
            {
                image: tangrams3,
                title: "Win screen"
            },
        ]
    },
    {title: "This Site",
        subtitle: "TypeScript - React - Node.js - Vite - HTML - CSS",
        thumbnail: portfolioSiteThumb,
        tags: "programming web design",
        content: <div>
            <p>The site you're looking at now was created in preparation for the RIT Spring 2026 Career Fair. After beginning to create the site in plain HTML and CSS during Summer 2025, I put development on hiatus to focus on applying to jobs. Seeking to broaden my skillset, I took an online class to learn React over the course of about 50 hours from October 2025 to February 2026. During February 2026, I refactored my original site to use a new React-based stack, blocking out the site into reusable components.</p>
            <p>In its current state, the site features data-driven design to generate site content from JSON-style data stored in a separate file, a responsive layout that changes based on window size, and accessible light- and dark-mode palettes.</p>
        </div>,
        imageList: [
            {
                image: portfolioSite1,
                title: "Tablet layout"
            },
            {
                image: portfolioSite2,
                title: "Mobile layout"
            },
            {
                image: portfolioSite3,
                title: "Hero and navbar"
            },
            {
                image: portfolioSite4,
                title: "Dark mode and picture masonry layout"
            },
        ]
    },
    {title: "RIT Campus Digital Twin",
        subtitle: "Python - C# - JavaScript - AJAX - OpenAI API - ArcGIS Pro - ArcGIS Online",
        thumbnail: digitalTwinThumb,
        tags: "programming web",
        content: <div>
            <p>Created a disaster resilience planning application in Unity that leverages geospatial and weather data to model how disruption of individual buildings in a physical network can affect the network as a whole. The application can also accept plain language prompts and convert them into concrete simulation parameters using the OpenAI API.</p>
            <p>In the picture above, temperature data is pulled directly from weather.gov, and determines the buildings' color. Shapefiles containing the buildings (and connections between them) are loaded from ArcGIS Online, and the connections are colored based on their distance to designated "source" nodes.</p>
            <p>My responsibilities varied throughout the course of the project, since each phase required notably different software, processes, and skills. These included:</p>
            <ul>
                <li>Synthesizing 3D geospatial datasets using Python script tools in ArcGIS Pro.</li>
                <li>Performing research into project-relevant tools and the state of the field.</li>
                <li>Writing Python script tools to pipeline data created in ArcGIS Pro through ArcGIS Online and into Unity.</li>
                <li>Programming the Unity application in C#.</li>
            </ul>
            <p>I was the sole developer on the project, and received instruction and supervision from Brian Tomaszewski, Ph.D. and David I. Schwartz, Ph.D.</p>
        </div>,
        imageList: [
            {
                image: digitalTwin1,
                title: "Network full view"
            },
            {
                image: digitalTwin2,
                title: "Network close-up"
            },
            {
                image: digitalTwin3,
                title: "AI prompt demonstration"
            },
            {
                image: digitalTwin4,
                title: "Unity Shader Graph code for network lines"
            },
        ]
    },
    {title: "Direct3D 11 Renderer",
        subtitle: "C++ - Direct3D11 - HLSL",
        thumbnail: direct3dThumb,
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
                image: direct3d1,
                title: "Foliage mesh generation parameters"
            },
            {
                image: direct3d2,
                title: "Particle emitters and shadows"
            },
            {
                image: direct3d3,
                title: "Blue noise dithering shader"
            },
        
        ]
    },
    {title: "Super Intergalactic Audio Visualizer",
        subtitle: "HTML - TypeScript - Node.js - Bulma - Webpack",
        thumbnail: audioVisualizerThumb,
        tags: "web design",
        content: <div>
            <p>Added EQ filters to web audio player application by interfacing with the WebAudio API. Used Canvas API to render a rotating field of stars, which react to the music. Designed clean, responsive, and modern page layout using the Bulma CSS framework.</p>
        </div>,
        imageList: [
            {
                image: audioVisualizer1,
                title: "Tablet layout"
            },
            {
                image: audioVisualizer2,
                title: "Mobile layout"
            },
        ]
    },
    {title: "Round & Round Trip",
        subtitle: "C# - Unity - Aseprite",
        thumbnail: roundAndRoundTripThumb,
        tags: "programming design",
        content: <div>
            <p>A graph theory-based game about finding the most fuel-efficient route around a series of maps. Programmed and shipped the game in 96 hours for the GMTK Game Jam 2025. Rapidly prototyped systems for player movement, map logic, and puzzle solution confirmation. Added developer tools to assist with level creation and mentored teammates on their usage. Collaborated with teammates to link UI to gameplay systems while solving merge conflicts. Illustrated 40+ location icons, 4 level maps, 2 ending screens, and a player sprite.</p>
        </div>,
        imageList: [
            {
                image: roundAndRoundTrip1,
                title: "Level 1"
            },
            {
                image: roundAndRoundTrip2,
                title: "Level 3"
            },
        ]
    },
    {title: "Scratch Remix Tree Visualizer",
        subtitle: "HTML - CSS - JavaScript - AJAX",
        thumbnail: remixVisualizerThumb,
        tags: "programming web",
        content: <div>
            <p>MIT’s Scratch website, and the visual coding language used to create the projects shared there, was my first introduction to the practice of programming 12 years ago. It’s very important to me, and I still use it today to share short games and animations with my friends from high school. When I was given an assignment to build a browser application that interfaces with the API of another website, I decided to use the Scratch API to create a site that would be useful to me and my friends.</p>
            <p>One of Scratch’s primary features is the ability to view the code of projects written by others, and create a derivative project called a “remix” by modifying any project’s code and assets. In the previous official version of the Scratch website, Scratch 2.0, each project could be viewed in a “remix tree,” which visualized the connections between projects and their remixes in a phylogenetic tree–like diagram. This feature has become deprecated on the official site, and the visualization breaks down if looking at a long enough chain of remixes. I sought to recreate this feature using the skills I learned about the DOM and JavaScript in a way that would remain effective with large numbers of projects.</p>
            <p><a href="/org7993/235/project2/" target="_blank">Click here to use the site.</a></p>
        </div>,
        imageList: [
            {
                image: remixVisualizer1,
                title: "Parameter tooltips"
            },
            {
                image: remixVisualizer2,
                title: "Project info on hover"
            },
        ]
    },
    {title: "Arrow Ace",
        subtitle: "C# - Unity - GIMP",
        thumbnail: arrowAceThumb,
        tags: "programming",
        content: <div>
            <p>This is a project I made in my Interactive Media Development class, in which we learn how to use the video game engine Unity.</p>
            <p>In Arrow Ace, you play an ace pilot/archer who wields a versatile bow that can shoot many kinds of projectiles. If you get an enemy's projectile to hits the direct center of your plane, you capture it instead of taking damage from it. The next time you hit the fire button, you'll launch that stolen projectile instead of a normal arrow.</p>
            <p>This took me around a month to program. I also made all the art assets myself (with the exception of the fonts). I added a number of notable features that weren't required, like the ship having acceleration and slowdown times and objects having multiple hit- and hurtboxes for detecting collision types.</p>
            <p>There are two types of enemies: One type waits until you pass in front of it before charging at you, and the other type fires spear projectiles at you. Health is handled with a health bar that depletes when you get hit. Scoring is based on enemy hits and kills, and the amount of points each individual enemy gives out can be doubled (sometimes multiple times) by hitting it in the fuselage or with a special projectile.</p>
            <p>Controls:</p>
            <ul>
                <li>WASD / Arrow Keys - Move</li>
                <li>Spacebar - Fire</li>
                <li>R - Restart</li>
            </ul>
            <p><a href="https://turtle-hat.github.io/ArrowAceUnity/" target="_blank">Click here to play.</a></p>
        </div>,
        imageList: [
            {
                image: arrowAce1,
                title: "Enemy types"
            },
            {
                image: arrowAce2,
                title: "Launching a stolen spear"
            },
            {
                image: arrowAce3,
                title: "Game Over screen"
            },
        ]
    },
    {title: "RIT Game Developers Club Posters",
        subtitle: "Graphic Design - Character Design - Krita",
        thumbnail: rgdcPostersThumb,
        tags: "design",
        content: <div>
            <p>As Vice President of the RIT Game Developers Club, advertised club events by designing promotional posters with a consistent brand identity. Designed a mascot character, Jamster, to use in club promotional materials. Coordinated and organized weekend-long game jams each semester, including preparing slideshows and overseeing event operations.</p>
        </div>,
        imageList: [
            {
                image: rgdcPosters1,
                title: "Fall 2024–Spring 2025 general club poster"
            },
            {
                image: rgdcPosters2,
                title: "Halloween 2024 Game Jam poster"
            },
            {
                image: rgdcPosters3,
                title: "Spring 2025 Game Jam poster"
            },
        ]
    },
    {title: "Avocado Attorney",
        subtitle: "2D visual novel game with robust developer tools for scripting cinematic sequences.",
        thumbnail: avocadoAttorneyThumb,
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
                image: avocadoAttorney1,
                title: "Cross-examination interface"
            },
            {
                image: avocadoAttorney2,
                title: "Inventory interface"
            },
            {
                image: avocadoAttorney3,
                title: "Dialogue option interface"
            },
        ]
    },
]
