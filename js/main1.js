game = new Phaser.Game(960, 600, Phaser.AUTO,null,{preload:preload,update:update,create:create})
var add_sprite
var a
var removeall
var keys
var counter = 0
var hero
var door
var data = []
var data_spider = []
var data_villian = []
var data_coin = []
var data_key = []
var data_hero = []
var data_door = []
var data_cannon = []
var data_lava  = []

var destroy_img= false
var str
var x_pos,y_pos
var size

var grass_group
var spider_group
var villian_group
var coin_group
var key_group
var lava_group
var cannon_group
var eraser
var cursors
var door_img
var hero_img

var state = {}
function preload(){
    game.stage.backgroundColor = "#4488aa"; 
    game.load.image("background", "images/background.png")
    // game.load.json(`level04`, `leveleditortry/level04.json`)}
    try {
        for (var i=0;i<10;i++){
            game.load.json(`level0${i}`, `data/level0${i}.json`)}
    } catch (error) {
        console.log(error);
    }
    game.load.image("platform4", "images/grass_8x1.png")
    game.load.image("platform3", "images/grass_6x1.png")
    game.load.image("platform2", "images/grass_4x1.png")
    game.load.image("platform1", "images/grass_2x1.png")
    game.load.image("platform0", "images/grass_1x1.png")
    game.load.image("hero", "images/hero_stopped.png")
    game.load.spritesheet("villian", "images/villian.png", 41, 63)
    game.load.spritesheet("coin", "images/coin_animated.png", 22, 22)
    game.load.spritesheet('spider', 'images/spider.png', 42, 32);
    game.load.image("eraser", "images/coin_icon.png")
    game.load.spritesheet("door", "images/door.png", 42, 66)
    game.load.spritesheet("key", "images/key.png", 42, 66)
    game.load.image("ground", "images/ground.png")
    game.load.image("cannon", "images/cannon.png")
    game.load.image("lava", "images/lava.png")
    

}
var sprites = ["villian","spider","coin","door","hero","cannon","lava",data_spider,data_cannon,data,data_coin,data_lava,data_villian]
var platform_grass = ["platform0","platform1","platform2","platform3","platform4"]
function create(){
    background = game.add.image(0,0,"background")
    background.width = 4500
    background.height =   window.innerHeight + 600
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
    lava_group = game.add.group()
    key_group = game.add.group()
    cannon_group = game.add.group()
    game.world.setBounds(0, -600, 4500, 1200)

    background.fixedToCamera = true
    ground.fixedToCamera = true
    for (i = 0;i<=6;i++){
        sprites[i] = game.add.sprite(-10,-60,sprites[i])
        console.log(sprites[i].key)
        sprites[i].anchor.set(0.5,0.5)
        if(sprites[i].key == "cannon"){
            sprites[i].scale.setTo(0.3,0.25)

        }
    }
    for (i = 0;i<=5;i++){
        platform_grass[i] = game.add.sprite(-10,-60,platform_grass[i])
        platform_grass[i].anchor.set(0.5,0.5)
}

}


function shit(name){
    add_sprite = name
}



function villian(){
    shit("villian")
}
function coin(){
    shit("coin")
}
function platform(){
    shit("platform")
}
function spider(){
    shit("spider")
}
function key(){
    shit("key")
}
function hero(){
    shit("hero")
}
function door(){
    shit("door")
}
function cannon(){
    shit("cannon")
}
function lava(){
    shit("lava")
}

function destroyall(){

        lava_group.removeAll()
        grass_group.removeAll()
        spider_group.removeAll()
        villian_group.removeAll()
        coin_group.removeAll()
        key_group.removeAll()
        cannon_group.removeAll()
        door_img.destroy()
        hero_img.destroy()
        data_spider.splice(0,data_spider.length)
        data_villian.splice(0,data_villian.length)
        data.splice(0,data.length)
        data_coin.splice(0,data_coin.length)
        data_cannon.splice(0,data_cannon.length)
        data_key.splice(0,data_key.length)
        data_hero.splice(0,data_hero.length)
        data_door.splice(0,data_door.length)

}
var count = 0

function update(){

    size = document.getElementById("size").value
    size = parseInt(size)
    if (cursors.right.isDown){
        game.camera.x +=70
    }
    else if (cursors.left.isDown){
        game.camera.x -= 70
    }
    if (cursors.down.isDown){
        game.camera.y +=20
    }
    else if (cursors.up.isDown){
        game.camera.y -= 20
    }


    
    
    if (game.input.activePointer.leftButton.isDown == true){                        
        add_img = true 
        count++
    }
    if (game.input.activePointer.leftButton.isDown == false){
        add_img = false
        count = 0
    }

            y_pos = game.input.mousePointer.y + game.camera.y 
            x_pos = game.camera.x + game.input.mousePointer.x

        for (i=0;i<=6;i++){
            if (add_sprite ==sprites[i].key){
                sprites[i].x = game.input.x + game.camera.x
                sprites[i].y = game.input.y + game.camera.y
            }
            else{
                sprites[i].x = -100
                sprites[i].y = -100
            }
        }


        for (i=0;i<=5;i++){
    if (add_sprite == "platform"){
            if (size == i){
                platform_grass[i].x = game.input.x + game.camera.x
                platform_grass[i].y = game.input.y + game.camera.y 
                }
            else{
                platform_grass[i].x = -600
                platform_grass[i].y = -600               
        }
    }
    else{
        platform_grass[i].x = -600
        platform_grass[i].y = -300
    }
}
    
    if (add_img && count == 1){
        
    if (add_sprite == "platform" ){
        for (i=0;i<=5;i++){
            if (size == i){
               shit2(platform_grass[i].key,data,grass_group)
            }
        }
    }

        if (add_sprite == "spider"){
            shit2("spider",data_spider,spider_group)
        }
        if (add_sprite == "villian" ){
        shit2("villian",data_villian,villian_group)
        }
        if (add_sprite == "coin"){
        shit2("coin",data_coin,coin_group)
        }
        if (add_sprite == "key"){
        shit2("key",data_key,key_group)
        }
        if (add_sprite == "lava"){
        shit2("lava",data_lava,lava_group)
        }
        if (add_sprite == "cannon"){
        cannon_img  = shit2("cannon",data_cannon,cannon_group)
        cannon_img.scale.setTo(0.3,0.25)
        }
        if (add_sprite == "door"){
        door_img = shit2("door",data_door,null)
        }
        if (add_sprite == "hero" ){
            hero_img = shit2("hero",data_hero,null)    
        }
        }
        
        function shit2(name,sprite_pos,group){
            console.log(sprite_pos)
            name = game.add.sprite(x_pos,y_pos,name)    
            if (group != null){
                group.add(name)
            }
         if (group != grass_group){
            world_data = {"x": x_pos, "y": y_pos}
        }
        else{
            world_data = {"image":name.key,"x": x_pos, "y": y_pos}

        }
        
            sprite_pos.push(world_data)
            console.log(sprite_pos)
            game.physics.enable(name)
            name.anchor.set(0.5,0.5)
            return name
        }
        if (add_sprite == "destroy"){
            eraser.x = game.input.x + game.camera.x
            eraser.y = game.input.y + game.camera.y 
  
                    game.physics.arcade.collide(eraser,grass_group,eraserGrass,null,this)
                    game.physics.arcade.collide(eraser,lava_group,eraserlava,null,this)
                    game.physics.arcade.collide(eraser,spider_group,eraserspider,null,this)
                    game.physics.arcade.collide(eraser,villian_group,eraservillian,null,this)
                    game.physics.arcade.collide(eraser,coin_group,erasercoin,null,this)
                    game.physics.arcade.collide(eraser,cannon_group,erasercannon,null,this)
                    game.physics.arcade.collide(eraser,key_group,eraserkey,null,this)
                    game.physics.arcade.collide(eraser,door_img,eraserdoor,null,this)
                    game.physics.arcade.collide(eraser,hero_img,eraserhero,null,this)
                }

                
                
            }


function eraserGrass(keys,grasss){
    // console.log(near)
    if (add_img){
    index = grass_group.getChildIndex(grasss)
    console.log(index,data[index]);
    data.splice(index,1)
    grasss.destroy()
}
}
function eraserspider(keys,grasss){
    // console.log(near)
    if (add_img){
    index = spider_group.getChildIndex(grasss)
    console.log(index,data_spider[index]);
    data_spider.splice(index,1)
    grasss.destroy()   
    }}
function eraserlava(keys,grasss){
    // console.log(near)
    if (add_img){
    index = lava_group.getChildIndex(grasss)
    console.log(index,data_lava[index]);
    data_lava.splice(index,1)
    grasss.destroy()   
    }}
function erasercannon(keys,grasss){
    // console.log(near)
    if (add_img){
    index = cannon_group.getChildIndex(grasss)
    console.log(index,data_cannon[index]);
    data_cannon.splice(index,1)
    grasss.destroy()   
    }
}
function eraservillian(keys,grasss){
    // console.log(near)
    if (add_img){
    index = villian_group.getChildIndex(grasss)
    data_villian.splice(index,1)
    grasss.destroy()   
    }
}
function erasercoin(keys,grasss){
    // console.log(near)
    if (add_img){
    index = coin_group.getChildIndex(grasss)
    console.log(index,data_coin[index]);
    data_coin.splice(index,1)
    grasss.destroy()   
    }
}
function eraserkey(keys,grasss){
    // console.log(near)
    if (add_img){
    index = key_group.getChildIndex(grasss)
    console.log(index,data_key[index]);
    data_key.splice(index,1)
    grasss.destroy()   
    }
}
function eraserdoor(keys,grasss){
    if (add_img){
    data_door.pop()
    grasss.destroy()   
    }
}
function eraserhero(keys,grasss){
    if (add_img){
    data_hero.pop()
    grasss.destroy()   
    }
}
var filename 
function download(){
    var elm = document.createElement("a")
    for (i = 7 ;i<=sprites.length - 1;i++){
        if (sprites[i].length == 0)
{        sprites[i].push({"x":-10,"y":10010101})
}
        
    }
    
    elm.setAttribute("href","data:text/plaon;charset=utf-8," +"{" +"\"platforms\" :"+ JSON.stringify(data) +", \"spiders\" :"+ JSON.stringify(data_spider) + ", \"villians\" :"+JSON.stringify(data_villian) +", \"coins\" :"+JSON.stringify(data_coin)+", \"keys1\" :"+JSON.stringify(data_key) +", \"cannon\" :"+JSON.stringify(data_cannon) +", \"door\" :"+JSON.stringify(data_door[0]) + ", \"hero\" :"+JSON.stringify(data_hero[0]) + ", \"lava\" :" +JSON.stringify(data_lava)  + "}")

    

    level = document.getElementById("input").value
    filename =  `level0${level}.json`
    elm.setAttribute("download",filename)
    elm.click()
    
}

function load(){
    // a = game.cache.getJSON(`level:${this.level}`)
add_sprite == "platform"
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
    for(i = 0;i<a.cannon.length;i++){
    data_cannon.push(a.cannon[i])
}
    a.cannon.forEach(this._spawncannon, this)
    for(i = 0;i<a.lava.length;i++){
    data_lava.push(a.lava[i])
}
    a.lava.forEach(this._spawnlava, this)

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

function draw(sprite,group,name = null){
    console.log(sprite)
    if (name == null){
    img = game.add.sprite(sprite.x, sprite.y, sprite.image)
}else{
    img = game.add.sprite(sprite.x,sprite.y,name)
}
    game.physics.enable(img )
    if (group != null){
    group.add(img )
}
    img.anchor.set(0.5,0.5)
    return img
}
function _spawnplatform(platform){
    draw(platform,grass_group) 
}
function _spawnspider(spider){
    draw(spider,spider_group,"spider")
}

function _spawnvillian(villian){
    draw(villian,villian_group,"villian")
    
}
function _spawnlava(lava){
    draw(lava,lava_group,"lava")   
}
function _spawncoin(coin){
draw(coin,coin_group,"coin")
    
}
function _spawnkey(key){
draw(key,key_group,"key")
    
}
function _spawncannon(cannon){
cannon = draw(cannon,cannon_group,"cannon")
cannon.scale.setTo(0.3,0.25)
    cannon.anchor.setTo(.5,.5)
    
}

function spawndoor(){
door_img = draw(a.door,null,"door")
}
function spawnhero(){
    hero_img = draw(a.hero,null,"hero")
}
function destroy(){   
    shit("destroy")
}
