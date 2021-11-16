class GravityWell extends Phaser.GameObjects.Sprite {

    // used in initializartion (no texture yet)
    constructor(scene, x, y) {
        super(scene, x, y);

        // set size of gravity well
        this.radius = 25;

        // force of the gravity
        this.gravityForce = .2;
    };

    // called regularly form main.js update()
    update() {
        // check if player has collided
        if (this.findCollisionCircle(playerShip_spr)) {
            this.attract(playerShip_spr);
        } else {
            playerShip_spr.xOffset = 0;
            playerShip_spr.yOffset = 0;
        }

        // creating local container to store bullets in
        var bullet_ary;

        // populating bullet_ary with the children from the bulletGroup
        bullet_ary = bulletGroup.getChildren();

        // check if any bullets are near enough
        for (let bullet_spr of bullet_ary) {
            if (this.findCollisionCircle(bullet_spr)) {
                this.attract(bullet_spr);
            } else {
                bullet_spr.xOffset = 0;
                bullet_spr.yOffset = 0;
            }
        }
    }

    // return true or false for if circles have collided
    findCollisionCircle(otherCircle) {

        // container to store collided result in
        let collided = false;

        // finding x and y diff
        let xDiff = this.x - otherCircle.x;
        let yDiff = this.y - otherCircle.y;

        // using pythagoras to find hypotenuse which represents the distance between each circle center
        let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

        // collided is set by if the distance between each circle center is larger than the size of both circles together
        collided = (distance <= this.radius + otherCircle.collisionRadius);

        // return result
        return(collided);
    }

    // pull object towards
    attract(object) {

        // find out if object is to the right or left and adjust it's x velocity accordingly
        if (object.x > this.x) {
            object.xOffset -= this.gravityForce;
        } else if (object.x <= this.x) {
            object.xOffset += this.gravityForce;
        }

         // find out if object is to the top or bottom and adjust it's y velocity accordingly
         if (object.y > this.y) {
            object.yOffset -= this.gravityForce;
        } else if (object.y <= this.y) {
            object.yOffset += this.gravityForce;
        }
    }
}