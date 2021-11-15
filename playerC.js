class Player extends Phaser.GameObjects.Sprite {

    // used in initializartion
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        // defining the distance between the center and the nose of the ship
        this.noseOffset = this.width / 2;

        // allow for delayt between firing
        this.nextBulletTime = 0;
        this.fireDelay = 200;

        // setting speed of player
        this.speed = 2;
    };

    // called from main.js when player presses the fire button
    fire(bulletGroup) { 

        // store the rotation of the player Object
        let angleRad = this.rotation;

        // finding the x and y pos of the nose, using the distance and angle of the player object
        let startX = this.x + (this.noseOffset * Math.cos(angleRad));
        let startY = this.y + (this.noseOffset * Math.sin(angleRad));

        // if enough time has passed
        if (this.scene.time.now > this.nextBulletTime) {
            // initializing new bullet into the bulletGroup to be accessed by main.js
            bulletGroup.add(new Bullet(this.scene, startX, startY, "bullet_img", angleRad), true);

            // resetting nextBulletTime to hold the delay between bullets firing
            this.nextBulletTime = this.scene.time.now + this.fireDelay;
        }
    }
}