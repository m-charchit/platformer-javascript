  
game = new Phaser.Game(960, 600, Phaser.AUTO,null,{preload:preload,update:update,create:create})
var a
var removeall
var keys
var counter = 0
var add_img = false
var platform_add = false
var spider_add = false
var villian_add = false
var coin_add = false
var key_add = false
var door_add = false
var hero_add = false
var hero
var door
var data = []
var data_spider = []
var data_villian = []
var data_coin = []
var data_key = []
var data_hero = []
var data_door = []
var destroy_img= false
var str
var x_pos,y_pos
var size
var load_level = false
var grass_group
var spider_group
var villian_group
var coin_group
var key_group
var eraser
var cursors
var door_img
var hero_img

var tryvillian

var state = {}
function preload(){
    game.stage.backgroundColor = "#4488aa"; 
    game.load.image("background", "images/background.png")
    // game.load.json(`level04`, `leveleditortry/level04.json`)}
    try {
        for (var i=0;i<3;i++){
            game.load.json(`level0${i}`, `data/level0${i}.json`)}
            // game.load.json(`level01`, `leveleditortry/level01.json`)
            // // game.load.json(`level03`, `leveleditortry/level03.json`)
            // game.load.json(`level05`, `data/level01.json`)
            // game.load.json(`level02`, `data/level02.json`)
            // game.load.json(`level03`, `data/level03.json`)
                
    } catch (error) {
        console.log(error);
    }
    game.load.image("grass:8x1", "images/grass_8x1.png")
    game.load.image("grass:6x1", "images/grass_6x1.png")
    game.load.image("grass:4x1", "images/grass_4x1.png")
    game.load.image("grass:2x1", "images/grass_2x1.png")
    game.load.image("grass:1x1", "images/grass_1x1.png")
    game.load.image("hero", "images/hero_stopped.png")
    game.load.spritesheet("villian", "images/villian.png", 41, 63)
    game.load.spritesheet("coin", "images/coin_animated.png", 22, 22)
    game.load.spritesheet('spider', 'images/spider.png', 42, 32);
    game.load.image("eraser", "images/coin_icon.png")
    game.load.image("lava", "images/lava.png")
    game.load.spritesheet("door", "images/door.png", 42, 66)
    game.load.spritesheet("key", "images/key.png", 42, 66)
    game.load.image("ground", "images/ground.png")

}

function create(){
    background = game.add.image(0,0,"background")
    ground = game.add.image(0,546   ,"ground")
    background.inputEnabled = true
    ground.inputEnabled = true
    eraser = game.add.sprite(54,65,"eraser")
    eraser.scale.setTo(0.6,0.6)
    game.physics.enable(eraser,Phaser.Physics.ARCADE)
    cursors = game.input.keyboard.createCursorKeys();
    grass_group = game.add.group()
    spider_group = game.add.group()
    villian_group = game.add.group()
    coin_group = game.add.group()
    key_group = game.add.group()
    game.world.setBounds(0, 0, 2000, 600)
    background.fixedToCamera = true
    ground.fixedToCamera = true
    
    tryvillian = game.add.sprite(-10,-60,"villian")
    tryvillian.anchor.set(0.5,0.5)
}
function spider(){
    villian_add = false
    spider_add = true
    platform_add = false
    destroy_img = false
    key_add = false
    coin_add = false
    door_add = false
    hero_add = false
    
    
}
function villian(){
    villian_add = true
    spider_add = false
    platform_add = false
    destroy_img = false
    key_add = false
    coin_add = false
    door_add = false
    hero_add = false
}
function platform(){
    platform_add = true
    villian_add = false
    spider_add = false
    destroy_img = false
    key_add = false
    coin_add = false
    door_add = false
    hero_add = false
}
function coin(){
    key_add = false
    coin_add = true
    villian_add = false
    platform_add = false
    spider_add = false
    destroy_img = false
    door_add = false
    hero_add = false
}
function key(){
    key_add = true
    coin_add = false
    villian_add = false
    platform_add = false
    spider_add = false
    destroy_img = false
    door_add = false
    hero_add = false
}
function hero_fun(){
    hero_add = true
    key_add = false
    coin_add = false
    villian_add = false
    platform_add = false
    spider_add = false
    destroy_img = false
    door_add = false
}
function door_fun(){
    door_add = true
    key_add = false
    coin_add = false
    villian_add = false
    platform_add = false
    spider_add = false
    destroy_img = false
    hero_add = false

}
function destroyall(){
    grass_group.removeAll()
    spider_group.removeAll()
    villian_group.removeAll()
    coin_group.removeAll()
    key_group.removeAll()
    door_img.destroy()
    hero_img.destroy()
    data_spider.splice(0,data_spider.length)
data_villian.splice(0,data_villian.length)
data.splice(0,data.length)
data_coin.splice(0,data_coin.length)
data_key.splice(0,data_key.length)
data_hero.splice(0,data_hero.length)
data_door.splice(0,data_door.length)
    }
var count = 0
function update(){
    if (cursors.right.isDown){
        game.camera.x +=70
    }
    else if (cursors.left.isDown){
        game.camera.x -= 70
    }
    
    size = document.getElementById("size").value
    if (game.input.activePointer.leftButton.isDown == true){                        
        add_img = true 
        count++
    }
    if (game.input.activePointer.leftButton.isDown == false){
        add_img = false
        count = 0
    }
    // if (game.input.activePointer.leftButton.isDown == false){                        
            //         add_img = false}
            y_pos = game.input.mousePointer.y    
            x_pos = game.camera.x + game.input.mousePointer.x
            // console.log(x_pos,y_pos)
    // console.log(x_pos,game.camera.x)
    if (villian_add){
        tryvillian.x = game.input.x + game.camera.x
        tryvillian.y = game.input.y 
    }


    if (add_img && count == 1){
    if (platform_add == true ){
    
        
        if(size== 1){
            grass1 = game.add.sprite(x_pos,y_pos,"grass:1x1")    
            grass_group.add(grass1)      
            world_data = {"image": "grass:1x1", "x": x_pos, "y": y_pos}
            data.push(world_data)
            game.physics.enable(grass1)
        }
        else if(size== 2){
            grass2 = game.add.sprite(x_pos,y_pos,"grass:2x1")    
            grass_group.add(grass2)      
            world_data = {"image": "grass:2x1", "x": x_pos, "y": y_pos}
            data.push(world_data)
            game.physics.enable(grass2)
        }
        else if(size== 3){
            grass3 = game.add.sprite(x_pos,y_pos,"grass:4x1")    
            grass_group.add(grass3)      
            world_data = {"image": "grass:4x1", "x": x_pos, "y": y_pos}
            data.push(world_data)
            game.physics.enable(grass3)
        }
            else if(size== 4){
            grass4 = game.add.sprite(x_pos,y_pos,"grass:6x1")    
            grass_group.add(grass4)      
            world_data = {"image": "grass:6x1", "x": x_pos, "y": y_pos}
            data.push(world_data)
            game.physics.enable(grass4)
           
        }
        else if(size== 5){
            grass5 = game.add.sprite(x_pos,y_pos,"grass:8x1")    
            grass_group.add(grass5)      
            world_data = {"image": "grass:8x1", "x": x_pos, "y": y_pos}
            data.push(world_data)
            game.physics.enable(grass5)
           
        }
    }
        if (spider_add){
            spider_img = game.add.sprite(x_pos,y_pos,"spider")          
            spider_group.add(spider_img)
            world_data = {"x": x_pos, "y": y_pos}
            data_spider.push(world_data)
            spider_img.anchor.set(0.5)
            game.physics.enable(spider_img)
        }
        if (villian_add ){
            villian_img = game.add.sprite(x_pos,y_pos,"villian")
            villian_group.add(villian_img)
            world_data = {"x": x_pos, "y": y_pos}
            data_villian.push(world_data)
            game.physics.enable(villian_img)
            villian_img.anchor.set(.5,.5)
        }
        if (coin_add ){
            coin_img = game.add.sprite(x_pos,y_pos,"coin")
            coin_group.add(coin_img)
            world_data = {"x": x_pos, "y": y_pos}
            data_coin.push(world_data)
            game.physics.enable(coin_img)
            coin_img.anchor.set(0.5,0.5)
        }
        if (key_add ){
            key_img = game.add.sprite(x_pos,y_pos,"key")
            key_group.add(key_img)
            world_data = {"x": x_pos, "y": y_pos}
            data_key.push(world_data)
            game.physics.enable(key_img)
            key_img.anchor.set(0.5,0.5)
        }
        if (door_add ){
            door_img = game.add.sprite(x_pos,y_pos,"door")
            world_data = {"x": x_pos, "y": y_pos}
            data_door.push(world_data)
            game.physics.enable(door_img)
            console.log(data_door);
            door_img.anchor.set(0.5,0.5)
        }
        if (hero_add ){
            hero_img = game.add.sprite(x_pos,y_pos,"hero")
            world_data = {"x": x_pos, "y": y_pos}
            data_hero.push(world_data)
            game.physics.enable(hero_img)
            console.log(data_hero)
            hero_img.anchor.set(0.5,0.5)
        }
        

        
    }
        if (destroy_img){
            eraser.x = game.input.x + game.camera.x
            eraser.y = game.input.y 
            spider_add = false
            villian_add = false
            coin_add = false
            platform_add = false
            hero_add = false
            door_add = false
            key_add = false
            
          
                    game.physics.arcade.collide(eraser,grass_group,eraserGrass,null,this)
                    game.physics.arcade.collide(eraser,spider_group,eraserspider,null,this)
                    game.physics.arcade.collide(eraser,villian_group,eraservillian,null,this)
                    game.physics.arcade.collide(eraser,coin_group,erasercoin,null,this)
                    game.physics.arcade.collide(eraser,key_group,eraserkey,null,this)
                    game.physics.arcade.collide(eraser,door_img,eraserdoor,null,this)
                    game.physics.arcade.collide(eraser,hero_img,eraserhero,null,this)
                }
    if (removeall){
        
    }
                
                
            }
function eraserGrass(keys,grasss){
    // console.log(near)
    index = grass_group.getChildIndex(grasss)
    console.log(index,data[index]);
    data.splice(index,1)
    grasss.destroy()
}
function eraserspider(keys,grasss){
    // console.log(near)
    index = spider_group.getChildIndex(grasss)
    console.log(index,data_spider[index]);
    data_spider.splice(index,1)
    grasss.destroy()   
}
function eraservillian(keys,grasss){
    // console.log(near)
    index = villian_group.getChildIndex(grasss)
    console.log(index,data_villian[index]);
    data_villian.splice(index,1)
    grasss.destroy()   
}
function erasercoin(keys,grasss){
    // console.log(near)
    index = coin_group.getChildIndex(grasss)
    console.log(index,data_coin[index]);
    data_coin.splice(index,1)
    grasss.destroy()   
}
function eraserkey(keys,grasss){
    // console.log(near)
    index = key_group.getChildIndex(grasss)
    console.log(index,data_key[index]);
    data_key.splice(index,1)
    grasss.destroy()   
}
function eraserdoor(keys,grasss){
    data_door.pop()
    grasss.destroy()   
}
function eraserhero(keys,grasss){
    console.log(data_hero)
    data_hero.pop()
    grasss.destroy()   
}
var filename 
function download(){
    var elm = document.createElement("a")
    
    elm.setAttribute("href","data:text/plaon;charset=utf-8," +"{" +"\"platforms\" :"+ JSON.stringify(data) +", \"spiders\" :"+ JSON.stringify(data_spider) + ", \"villians\" :"+JSON.stringify(data_villian) +", \"coins\" :"+JSON.stringify(data_coin)+", \"keys1\" :"+JSON.stringify(data_key) +", \"door\" :"+JSON.stringify(data_door[0]) + ", \"hero\" :"+JSON.stringify(data_hero[0]) + ", \"lava\" : {\"x\" :10000, \"y\" :10000}" + "}")

    

    level = document.getElementById("input").value
    filename =  `level0${level}.json`
    elm.setAttribute("download",filename)
    elm.click()
    
}
function load(){
    // a = game.cache.getJSON(`level:${this.level}`)
    load_level = true
    level  = document.getElementById("input").value
    filename =  `level0${level}`
    p = document.getElementById("p")
    // p.innerText = filename
    console.log(filename);
    try {
        a = game.cache.getJSON(filename)
    // alert(JSON.stringify(a.platforms)) // now all platforms cn be in group
    for(i = 0;i<a.platforms.length;i++){
    data.push(a.platforms[i])
}
    a.platforms.forEach(this._spawnplatform, this)

    for(i = 0;i<a.spiders.length;i++){
    data_spider.push(a.spiders[i])
}
    a.spiders.forEach(this._spawnspider, this)

    for(i = 0;i<a.villians.length;i++){
    data_villian.push(a.villians[i])
}
    a.villians.forEach(this._spawnvillian, this)

    for(i = 0;i<a.coins.length;i++){
    data_coin.push(a.coins[i])
}
    a.coins.forEach(this._spawncoin, this)

    for(i = 0;i<a.keys1.length;i++){
    data_key.push(a.keys1[i])
}
    a.keys1.forEach(this._spawnkey, this)

    data_hero.push(a.hero)


    data_door.push(a.door)
    
    
    } catch (error) {
        p.innerText = "file not available"
        p.innerText = `level0${level}`
        console.log(error)
    }
    spawndoor()
    spawnhero()
}
function _spawnplatform(platform){
    let sprite = game.add.sprite(platform.x, platform.y, platform.image) 
    game.physics.enable(sprite)
    grass_group.add(sprite)
    
}
function _spawnspider(spider){
    let sprite =  game.add.sprite(spider.x, spider.y , "spider") 
    game.physics.enable(sprite)
    spider_group.add(sprite)
    sprite.anchor.set(0.5)
}

function _spawnvillian(villian){
    let sprite =  game.add.sprite(villian.x, villian.y , "villian") 
    game.physics.enable(sprite)
    villian_group.add(sprite)
    sprite.anchor.set(.5,.5)
    
}
function _spawncoin(coin){
    let sprite =  game.add.sprite(coin.x, coin.y , "coin") 
    game.physics.enable(sprite)
    coin_group.add(sprite)
    sprite.anchor.set(0.5,0.5)
    
}
function _spawnkey(key){
    let sprite =  game.add.sprite(key.x, key.y , "key") 
    game.physics.enable(sprite)
    key_group.add(sprite)
    sprite.anchor.set(0.5)
    
}

function spawndoor(){
    door_img=  game.add.sprite(a.door.x,a.door.y, "door") 
    game.physics.enable(door_img)    
    door_img.anchor.set(0,0.5)
}
function spawnhero(){
    hero_img =  game.add.sprite(a.hero.x, a.hero.y , "hero") 
    game.physics.enable(hero_img)    
    hero_img.anchor.set(0.5,0.5)
}
function destroy(){   
    destroy_img = true
    // spider_add = false

        
}
