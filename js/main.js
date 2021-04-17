var key1
var camerax
var door
var lava
var game
var ground
var trial
var villi
var villidie = false
var laser
var laser1

// create the player
function Hero(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, "hero") // here we call the sprite we will add it later
    this.anchor.set(0.5, 0.5)
        // adding physics engine to sprites
    this.game.physics.enable(this)
    this.body.collideWorldBounds = true // so as to stop the hero from moving out of screen
}
Hero.direction = ""
Hero.prototype = Object.create(Phaser.Sprite.prototype)
Hero.prototype.constructor = Hero // now we can access it any activity like jump and move by this
    // now this method comes in use 
Hero.prototype.move = function(direction) {
    const speed = 300  //300 now it will move with physics engine we will handle more things like cllision with physics
    this.body.velocity.x = direction * speed
}
Hero.prototype.jump = function() {
    var jumpspeed = 500 // 500
    jumpspeed+=100
    let canjump = this.body.touching.down
    if (canjump ) {
        this.body.velocity.y = -jumpspeed
    }
    return canjump

}
Hero.prototype.bounce = function() {
    bounce = 200
    this.body.velocity.y = -bounce
}
// create the spider
function Spider(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, "spider")
    this.anchor.set(0.5)

    // animation
    this.animations.add('crawl', [0, 1, 2], 8, true);
    this.animations.add('die', [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
    this.animations.play('crawl');


    this.game.physics.enable(this)
    this.body.collideWorldBounds = true
    this.body.velocity.x = Spider.SPEED
}
Spider.SPEED = 100
Spider.prototype = Object.create(Phaser.Sprite.prototype);
Spider.prototype.constructor = Spider;
Spider.prototype.update = function() {
    if (this.body.touching.right || this.body.blocked.right) {
        this.body.velocity.x = -Spider.SPEED
        

    } else if (this.body.touching.left || this.body.blocked.left) {
        this.body.velocity.x = Spider.SPEED

    }
}
Spider.prototype.die = function() {
    this.body.enable = false
    this.animations.play("die").onComplete.addOnce(function() {
        this.kill()
    }, this)
}
// create the villian
function Villian(game, x, y) {

    Phaser.Sprite.call(this, game, x, y, "villian") // here we call the sprite we will add it later
        // adding physics engine to sprites
    this.animations.add('die', [6, 3, 6, 3, 6, 7], 2);
    this.animations.add('move', [0, 1, 2], 8, true);

    this.animations.play('move');

    this.game.physics.enable(this)
    this.body.collideWorldBounds = true // so as to stop the Villian from moving out of screen
    this.body.velocity.x = Villian.speed
}
Villian.speed = 300
Villian.prototype = Object.create(Phaser.Sprite.prototype)
Villian.prototype.constructor = Villian // now we can access it any activity like jump and move by this
Villian.prototype.update = function() {
    if ((this.body.touching.right || this.body.blocked.right) ) {
        this.body.velocity.x = -Villian.speed
        this.angle = 180
        this.scale.y *= -1
          
        
    } else if (this.body.touching.left || this.body.blocked.left){
        this.body.velocity.x = Villian.speed
        this.scale.y *= -1
        this.angle = 360
    }
}
Villian.prototype.dies = function() {
    this.body.enable = false
    this.destroy()
    // this.animations.play("die").onComplete.addOnce(function() {
    // }, this)

}





playstate = {} // we created a game state which objects will be override in future

// preload function
playstate.preload = function() {
    try {
    for (var i = 0;i<3;i++){
        this.game.load.json(`level:${i}`,`data/level0${i}.json`)
    }   
    } catch (error) {
        
    }
    this.game.load.image("background", "images/background.png") // we have refrence of phaser.game through "this" keyword
        // now before creating sprites we have to load the images
    this.game.load.image("ground", "images/ground.png")
    this.game.load.image("grass:8x1", "images/grass_8x1.png") // about there properties it is in the json file
    this.game.load.image("grass:6x1", "images/grass_6x1.png")
    this.game.load.image("grass:4x1", "images/grass_4x1.png")
    this.game.load.image("grass:2x1", "images/grass_2x1.png")
    this.game.load.image("grass:1x1", "images/grass_1x1.png")
    this.game.load.image("hero", "images/hero_stopped.png")
    this.game.load.spritesheet("villian", "images/villian.png", 41, 63)
    this.game.load.audio("sfx:jump", "audio/jump.wav")
    this.game.load.audio('sfx:coin', 'audio/coin.wav');
    this.game.load.audio('sfx:stomp', 'audio/stomp.wav');
    this.game.load.audio('sfx:key', 'audio/key.wav');
    this.game.load.audio('sfx:door', 'audio/door.wav');
    this.game.load.spritesheet("coin", "images/coin_animated.png", 22, 22)
    this.game.load.spritesheet('spider', 'images/spider.png', 42, 32);
    this.game.load.image("invisible", "images/invisible_wall.png")
    this.game.load.image("icon:coin", "images/coin_icon.png")
    this.game.load.image("lava", "images/lava.png")
    this.game.load.image("font:numbers", "images/numbers.png")
    this.game.load.spritesheet("door", "images/door.png", 42, 66)
    this.game.load.spritesheet("key", "images/key.png", 42, 66)
    this.game.load.spritesheet("keyicon", "images/key_icon.png", 34, 30)
    this.game.load.image("viweapon", "images/viweapon.png")
}

playstate.update = function() {
    this._handlecollision()
    this._handleinput()
    this.coinfont.text = `x${this.coinspickup}`
    if (this.haskey) {
        this.keyIcon.frame = 1
    } else { this.keyIcon.frame = 0 }
    camerax = this.game.camera.x
    // enemyWeapon.trackSprite(closestEnemy, 0, 0);
    // enemyWeapon.fire();
}
playstate._handlecollision = function() {
    this.game.physics.arcade.collide(this.hero, this.platforms)
    this.game.physics.arcade.collide(this.villians, this.platforms)
    this.game.physics.arcade.collide(this.hero, ground)
    this.game.physics.arcade.overlap(this.hero, this.coins, this._herovscoin, null, this) // null here means no filter apply this or it will not work
    this.game.physics.arcade.collide(this.hero, lava, this._herovslava, null, this) // null here means no filter apply this or it will not work
    this.game.physics.arcade.collide(this.hero, laser.bullets, this._herovslaser, null, this) // null here means no filter apply this or it will not work
    this.game.physics.arcade.collide(this.villians, laser1.bullets, this._villianvslaser, null, this) // null here means no filter apply this or it will not work
    this.game.physics.arcade.collide(this.spiders, this.platforms)
    this.game.physics.arcade.collide(this.spiders, this.walls)
    this.game.physics.arcade.collide(this.villians, this.walls)
    this.game.physics.arcade.overlap(this.hero, this.spiders, this._herovsspiders, null, this)
    this.game.physics.arcade.overlap(this.hero, this.villians, this._herovsvillian, null, this)
    this.game.physics.arcade.overlap(this.hero, this.keys1, this.herovskey, null, this)
    this.game.physics.arcade.overlap(this.hero, door, this.hervsdoor, function(hero, keys) {
        return this.haskey && hero.body.touching.down
    }, this)
    this.closest_player = this.villians.getClosestTo(this.hero)
    if (this.closest_player){

    laser.trackSprite(this.closest_player, 20, 3, true)
}
laser1.trackSprite(this.hero, 5, 3, false)
if (this.keys.space.isDown){
    laser1.fire()
}
if (Hero.direction == "right"){
    laser1.fireAngle = Phaser.ANGLE_RIGHT
}
    else if (Hero.direction == "left"){
        laser1.fireAngle = Phaser.ANGLE_LEFT
    }
    else{
        laser1.fireAngle = Phaser.ANGLE_RIGHT

    }
    
    if (this.villians.children.length == 0){
        laser.autofire = false
        console.log("empty")
        
    }
        



}
playstate._herovslaser = function(hero, bullet) {

        bullet.kill()
        hero.kill()
        trial = 0
        this.game.state.restart(true, false, { level: this.level })


}
playstate._villianvslaser = function(villian, bullet) {

        bullet.kill()
        villian.destroy()
        


}


playstate._herovsvillian = function(hero, villian) {
    if (hero.body.velocity.y > 10) {
        villian.dies()
        laser.autofire = false
        if (this.closest_player){
            laser.autofire = true
        }
        
        
        
    } else {
        hero.kill()
        trial = 0
    
        this.sfx.stomp.play()

        trial = 0
        this.game.state.restart(true, false, { level: this.level })
    }
}
playstate._herovslava = function(hero, lava) {
    hero.kill()
    trial = 0
    trial = 0
    this.game.state.restart(true, false, { level: this.level })
}

playstate._herovsspiders = function(hero, spider) {
    if (hero.body.velocity.y > 0) {
        spider.die()
        this.sfx.stomp.play()
        hero.bounce()
    } else {
        this.sfx.stomp.play()
        this.game.state.restart(true, false, { level: this.level })
        trial = 0
    }
}

playstate._herovscoin = function(hero, coin) {
    coin.kill()
    this.coinspickup++
        this.sfx.coin.play()
}


// handling Inputs
playstate._handleinput = function() {
    if (this.keys.right.isDown) {
        Hero.direction = "right"
        this.hero.move(1.3) // 1 is right
    } else if (this.keys.left.isDown) {
        this.hero.move(-1.3) // -1 is left 
        Hero.direction = "left"
    } else {
        this.hero.move(0) // this is so that the hero stops when no key pressed 
    }
}

const levelcount = 3 // increase it after the change in the number of levels
playstate.init = function(data) { // HERE WE ADDED THE KEYS WITH INPUT.KEYBOARD.ADDKEYS
    this.game.renderer.renderSession.roundPixels = true // this is so that the image do not blur
    this.keys = this.game.input.keyboard.addKeys({
        left: Phaser.KeyCode.LEFT, // we gave a name to the key
        right: Phaser.KeyCode.RIGHT,
        up: Phaser.KeyCode.UP,
        space:Phaser.KeyCode.SPACEBAR
    })
    this.coinspickup = 0
    this.keys.up.onDown.add(function() {
        let didjump = this.hero.jump()
        if (didjump) {
            this.sfx.jump.play()
        }
    }, this)
    this.haskey = false
    this.level = (data.level || 0) % levelcount
    console.log(data.level)
    console.log(this.level)
}

playstate.create = function() {
    this.sfx = {
        jump: this.game.add.audio("sfx:jump"),
        coin: this.game.add.audio("sfx:coin"),
        stomp: this.game.add.audio("sfx:stomp"),
        key: this.game.add.audio("sfx:key"),
        door: this.game.add.audio("sfx:door")
    }
    this._loadLevel(this.game.cache.getJSON(`level:${this.level}`)) // now we took the json with cache.getJSON and added a name _loadlevel to it to be used
    this._createUI()
    this.game.world.setBounds(0, 0, 2000, 600)
    this.game.camera.follow(this.hero)
    background.fixedToCamera = true
    ground.fixedToCamera = true

}
var background
playstate._loadLevel = function(data) {
    // console.log(data);
    // creating groups layes for all sprites of same type so that we can set it once only like if collision we will make groups of grass so once we can write collision detection
    this.walls = this.game.add.group()
    background = this.game.add.image(0, 0, "background") // here we used the arbitary key "backgroud" to it which was added above


    this.bgdecor = this.game.add.group()
    this.platforms = this.game.add.group() // now all platforms cn be in group
    this.coins = this.game.add.group()
    this.keys1 = this.game.add.group()
    this.spiders = this.game.add.group()
    this.villians = this.game.add.group()

    // spawn all the platforms and get the data from json file which has an array platforms 
    data.platforms.forEach(this._spawnplatform, this)
        // spawn Hero and villians 

    data.coins.forEach(this._spawncoin, this)
    data.keys1.forEach(this._spawnkey, this)

    var gravity = 500 // 500
    gravity += 500
    this.game.physics.arcade.gravity.y = gravity // we are doing it here not in init so that if there are levels like moon can have their own gravity in json file
    this._spawncharacters({ hero: data.hero, spiders: data.spiders, villians: data.villians })
    this._spawndoor(data.door.x, data.door.y)
    camerax = this.game.camera.x
    this._spawnground(0, 546)
    this._spawnlava(data.lava.x, data.lava.y)
    
    this._spawnweapon()
    this._spawnHeroWeapon()
}

playstate._spawnweapon = function() {
    laser = game.add.weapon(2, "viweapon")
    laser.setBulletBodyOffset(28, 40, 1, 10)
    this.game.physics.enable(laser)
    laser.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS
    laser.bulletSpeed = 500
    laser.fireRate = 2000
    laser.fireAngle = Phaser.ANGLE_RIGHT
    
    laser.autofire = true
    this.antigravity = -500 // 500
    this.antigravity -= 500 
    laser.bulletGravity.y= this.antigravity

    laser.multiFire = true
}
playstate._spawnHeroWeapon = function() {
    laser1 = game.add.weapon(4, "viweapon")
    laser1.setBulletBodyOffset(28, 40, 1, 10)
    this.game.physics.enable(laser1)
    laser1.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS
    laser1.bulletSpeed = 500
    laser1.fireRate = 600

        
    
    
    laser1.autofire = false
    this.antigravity = -500 // 500
    this.antigravity -= 500 
    laser1.bulletGravity.y= this.antigravity

    laser1.multiFire = true
}
    


playstate._spawnground = function(x, y) {
    
    ground = this.game.add.sprite(x, y, "ground")
    this.game.physics.enable(ground)
    ground.body.allowGravity = false
    ground.body.immovable = true
    // ground.fixedToCamera = true
}

playstate._spawnlava = function(x, y) {
    lava = this.game.add.sprite(x, y, "lava")
    this.game.physics.enable(lava)
    lava.body.allowGravity = false
}
playstate._spawncoin = function(coin) {
    let sprite = this.coins.create(coin.x, coin.y, "coin")
    sprite.anchor.set(0.5, 0.5)
    sprite.animations.add("rotate", [0, 1, 2, 1], 10, true)
    sprite.animations.play("rotate")
    this.game.physics.enable(sprite)
    sprite.body.allowGravity = false
}

playstate._spawnplatform = function(platform) {
    let sprite = this.platforms.create(platform.x, platform.y, platform.image) // use sprite instead of image
    this.game.physics.enable(sprite) // now all the platforms like grass ground have physics enabled
        // note - phaser.Group.create is actory method for sprites the new sprite will be added as a child of the group
    sprite.body.allowGravity = false // this is so that the platfoorm do not fall 
    sprite.body.immovable = true
    this._spawnwalls(platform.x, platform.y, "left")
    this._spawnwalls(platform.x + sprite.width, platform.y, "right")
} 


playstate._spawnwalls = function(x, y, side) {
    let sprite = this.walls.create(x, y, "invisible")
    sprite.anchor.set(side === 'left' ? 1 : 0, 1); // logic to settle the anchoe and y displacement it is like this function spawwalls(x,y,side) above it is there spawwalls(platforms.x,....)so side can be equal to left or right
    this.game.physics.enable(sprite)
    sprite.body.immovable = true
    sprite.body.allowGravity = false

}

playstate._spawncharacters = function(data) {
    // ghero
    this.hero = new Hero(this.game, data.hero.x, data.hero.y) // here a new constructor made which is == to this,.hero
    this.game.add.existing(this.hero) // we added the this.hero to Hero

    data.spiders.forEach(function(spider) {
        let sprite = new Spider(this.game, spider.x, spider.y)
        this.spiders.add(sprite)
    }, this)
    data.villians.forEach(function(villian) {
        villi = new Villian(this.game, villian.x, villian.y)
        villi.scale.setTo(0.9, 0.9)
        villi.anchor.setTo(.5,.5)
        
        
        this.villians.add(villi)
        
    }, this)
    
}
playstate._createUI = function() {

    let numbers = "0123456789X "
    this.coinfont = this.game.add.retroFont("font:numbers", 20, 26, numbers, 6)
    let coinicon = this.game.make.image(0, 0, "icon:coin")
    let texticon = this.game.make.image(coinicon.x + coinicon.width, coinicon.height / 2, this.coinfont)
    texticon.anchor.set(0, 0.5)
    this.hud = this.game.add.group()

    this.hud.add(coinicon)

    this.hud.add(texticon)

    this.hud.position.set(10, 10)
    this.keyIcon = this.game.make.image(0, 58, "keyicon")
    this.keyIcon.anchor.set(0, 0.5)
    this.hud.add(this.keyIcon)
    // this.coinicon.fixedToCamera =+ true
    this.hud.fixedToCamera = true

}
playstate._spawndoor = function(x, y) {
    door = this.bgdecor.create(x, y, "door")
    door.anchor.set(0, 0.5)
    this.game.physics.enable(door)
    door.body.allowGravity = false
    this.bgdecor.add(door)
}
playstate._spawnkey = function(key) {
    keys = this.keys1.create(key.x, key.y, "key")
    keys.anchor.set(0.5, 0.5)
    this.game.physics.enable(keys)
    keys.body.allowGravity = false
}
var trial = 0
playstate.herovskey = function(hero, key) {
    key.kill()
    trial++
    console.log(trial)
    if (this.level == 2 && trial == 3) {
        this.haskey = true
    } else if ((this.level == 0 && trial == 1) || (this.level == 1 && trial == 1)) {
        this.haskey = true
    }
    

    this.sfx.key.play()
}
playstate.hervsdoor = function(hero, door) {
    this.game.state.restart(true, false, { level: this.level + 1 })
    trial = 0
    this.sfx.door.play()
}

window.onload = function() {
    game = new Phaser.Game(960,600, Phaser.AUTO, 'game') // created the canvas  with the help of phaser
    game.state.add("play", playstate)
    game.state.start("play", true, false, { level: 2})
}