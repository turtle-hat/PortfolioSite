import Footer from "./Footer";
import Gallery from "./Gallery";
import Header from "./Header";
import Nav from "./Nav";

import homepageGallery from "../data/homepage-gallery"

export default function Homepage() {
    return <>
        <Header />
        <Gallery data={homepageGallery} />
        <main>
            <section className="project">
                <h1 className="title">Avocado Attorney</h1>
                <h2 className="subtitle">Subtitle Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, velit.</h2>
                <img className="thumbnail" src="/img/projects/avocado-attorney/screenshot1.png" alt="Avocado Attorney thumbnail" />
                <div className="content">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi ea, dolores molestiae sunt veritatis velit similique, incidunt minus illum optio repudiandae voluptatum debitis non perferendis dolor ducimus corrupti explicabo, unde iusto dolorum esse reprehenderit asperiores impedit! Commodi, doloribus veritatis mollitia consequatur atque modi, nulla rem eaque nemo earum numquam culpa quasi quisquam repellat, suscipit molestiae incidunt inventore. Non cupiditate blanditiis corrupti quod, culpa nam deserunt quis architecto, tempore quia delectus quo! Excepturi ratione impedit voluptatum sit. Sit rerum molestiae a maiores dignissimos! Consequatur cum dolore at ipsum accusamus reprehenderit magni, animi vel, et esse blanditiis quae consectetur sapiente iusto ea.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere ducimus alias distinctio itaque. Enim excepturi quidem exercitationem porro quia quibusdam voluptas molestias repudiandae aperiam est, iusto temporibus, deleniti reiciendis blanditiis doloribus? Magni blanditiis pariatur rerum ipsam eaque perferendis enim velit! Iste fuga, voluptas sed laudantium, natus magni quos nihil saepe aliquid beatae, voluptatum ex repellendus laboriosam architecto nemo id quam eligendi excepturi illum. Possimus eligendi vero, natus ullam, eaque deleniti, dolore delectus quisquam illum praesentium nam iure. Ab esse ullam blanditiis necessitatibus consectetur? Veritatis minus aut libero odit reprehenderit quibusdam! Suscipit labore sed, dolor iste beatae natus officia possimus impedit, at eos omnis animi magni dicta. Alias, architecto neque! Cumque est reiciendis architecto, accusamus expedita quo rerum unde nulla voluptatum.</p>
                    <ul>
                        <li>fact 1</li>
                        <li>fact 2</li>
                        <li>fact 3</li>
                    </ul>
                </div>
            </section>
        </main>
        <Footer />
    </>;
}
