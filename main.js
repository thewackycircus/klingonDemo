// game constants
const GAMEHEIGHT = 500;
const GAMEWIDTH = 400;

// reference to game objects
var playerShip_spr;
var bullet_ary;

// config to be parsed into game initialization
let config = {
    type: Phaser.AUTO,
    width: GAMEWIDTH,
    height: GAMEHEIGHT,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// game initialization
let game = new Phaser.Game(config);

// called before game starts
function preload() {
    // loading image assets
    this.load.image('ship_img', 'assets/ship.png');
    this.load.image('bullet_img', 'assets/bullet.png');
}

// called when game starts
function create() {
    // initializing player game object with arcade physcis body from 'existing' key word
    playerShip_spr = this.add.existing(new Player(this, 200, 200, "ship_img"));

    // adding some controls to play the game with
    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // creating a container to store bullets in
    bulletGroup = this.add.group();
}

// update is called regularly by the Phaser game engine so can be used to update game
function update() {
    // creating local container to store bullets in
    var bullet_ary;

    // check for movement keys
    if (cursors.left.isDown) {
        playerShip_spr.rotation -= .1;
    } else if (cursors.right.isDown) {
        playerShip_spr.rotation += .1;
    }

    // is player firing?
    if (fireButton.isDown) {
        playerShip_spr.fire(bulletGroup);
    }
    
    // populating bullet_ary with the children from the bulletGroup
    bullet_ary = bulletGroup.getChildren();

    // update bullets
    for  (let bullet_spr of bullet_ary) {
        bullet_spr.update();
    }
}