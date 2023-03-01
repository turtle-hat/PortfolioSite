class Placeholder extends PIXI.Sprite {
    constructor(x = 0, y = 0) {
        super(app.loader.resources["gameAssets/placeholder.png"].texture);
        // position, scaling, rotating etc are now from center of sprite
        this.anchor.set(.5, .5);
        this.size = 1.0;
        this.scale.set(this.size);
        this.x = x;
        this.y = y;
    }

    resize(dt) {
        this.size += dt;
        this.scale.set(this.size);
    }
}