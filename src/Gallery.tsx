export default function Gallery() {
    return (
        <div className="gallery">
          <div className="gallery-item programming full">
            <a href="http://makea.fish">
              <img src="/assets/homepage/gallery-cards/avocado-attorney.png" alt="Avocado Attorney" />
              <div className="gallery-item-blurb">
                <h1>Avocado Attorney</h1>
                <h2>2D visual novel with robust developer tools for cinematics, built in Scratch as a challenge.</h2>
              </div>
            </a>
          </div>
          <div className="gallery-item programming">
            <a href="http://makea.fish">
              <img src="/assets/homepage/gallery-cards/direct3d-11-renderer.png" alt="Direct3D 11 Renderer" />
              <div className="gallery-item-blurb">
                <h1>Direct3D 11 Renderer</h1>
                <h2>3D model renderer written in C++ & HLSL that supports physically-based materials, post-processing, and more.</h2>
              </div>
            </a>
          </div>
          <div className="gallery-item gis">
            <a href="http://makea.fish">
              <img src="/assets/homepage/gallery-cards/rit-campus-digital-twin.png" alt="RIT Campus Digital Twin" />
              <div className="gallery-item-blurb">
                <h1>RIT Campus Digital Twin</h1>
                <h2>Digital twin for preventative maintenance with AI integration built in ArcGIS Pro & Unity.</h2>
              </div>
            </a>
          </div>
          <div className="gallery-item art">
            <a href="http://makea.fish">
              <img src="/assets/homepage/gallery-cards/rit-game-dev-club-posters.png" alt="RIT Game Dev Club Posters" />
              <div className="gallery-item-blurb">
                <h1>RIT Game Dev Club Posters</h1>
                <h2>Club meeting and event advertisements with a consistent brand identity.</h2>
              </div>
            </a>
          </div>
        </div>
    );
}