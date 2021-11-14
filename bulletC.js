class Bullet extends Phaser.GameObjects.Sprite {

    // used in initializartion
    constructor(scene, x, y, texture, angleRad) {
        super(scene, x, y, texture);

        // setting speed of bullet
        this.speed = 5;

        // calculate x and y velocity using speed and angle of the player gameObject parsed in from player.js
        this.xMove = this.speed * Math.cos(angleRad);
        this.yMove = this.speed * Math.sin(angleRad);
    }

    // called regularly from main.js update function
    update() {

        // update position based upon initial calculations in constructor
        this.x += this.xMove;
        this.y += this.yMove;

        // if bullet has left screen
        if ( this.x > this.scene.game.width || this.x < 0 || this.y > this.scene.game.height || this.y < 0) {
            this.destroy();
        }
    }
}