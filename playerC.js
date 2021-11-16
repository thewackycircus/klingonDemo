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

        // allow for player movement
        this.xMove = 0;
        this.yMove = 0;

        // allow for gravityWell affect
        this.xOffset = 0;
        this.yOffset = 0;

        // setting collision size
        this.collisionRadius = this.noseOffset;
    };

    // called regularly from playerC.js update function
    update() {

        // check for movement keys
        if (cursors.left.isDown) {
            this.rotation -= .1;
        } else if (cursors.right.isDown) {
            this.rotation += .1;
        }

        if (cursors.up.isDown) {
            // storing calculated movement into container
            this.xMove = this.speed * Math.cos(this.rotation);
            this.yMove = this.speed * Math.sin(this.rotation);

            // apply gravityWell affect
            this.xMove += this.xOffset;
            this.yMove += this.yOffset;

            // applying calculated move to player object
            this.x += this.xMove;
            this.y += this.yMove; 
        }
        
        // if not actively moving forward
        else {
            
            // apply gravityWell affect
            this.xMove += this.xOffset;
            this.yMove += this.yOffset;

            // applying friction to the movement
            this.xMove *= 0.975;
            this.yMove *= 0.975;

            // applying calculated move to player object
            this.x += this.xMove;
            this.y += this.yMove;
        }

        // if player has left side of screen
        if (this.x > this.scene.game.config.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = this.scene.game.config.width;
        }

        // if player has left top or bottom of screen
        if (this.y > this.scene.game.config.height) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = this.scene.game.config.height;
        }

        // is player firing?
        if (fireButton.isDown) {
            this.fire(bulletGroup);
        }
    }

    // called from main.js when player presses the fire button
    fire(bulletGroup) {

        // finding the x and y pos of the nose, using the distance and angle of the player object
        let startX = this.x + (this.noseOffset * Math.cos(this.rotation));
        let startY = this.y + (this.noseOffset * Math.sin(this.rotation));

        // if enough time has passed
        if (this.scene.time.now > this.nextBulletTime) {
            // initializing new bullet into the bulletGroup to be accessed by main.js
            bulletGroup.add(new Bullet(this.scene, startX, startY, "bullet_img", this.rotation), true);

            // resetting nextBulletTime to hold the delay between bullets firing
            this.nextBulletTime = this.scene.time.now + this.fireDelay;
        }
    }
}