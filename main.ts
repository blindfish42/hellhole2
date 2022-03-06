namespace SpriteKind {
    export const Fireball = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    laseroverheat = laseroverheat + 1
    if (laseroverheat <= 10) {
        projectile = sprites.createProjectileFromSprite(assets.image`myImage`, mySprite2, 50, 0)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Fireball, function (sprite, otherSprite) {
    fireball.destroy(effects.fire, 500)
    info.changeScoreBy(10)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Fireball, function (sprite, otherSprite) {
    music.bigCrash.play()
    mySprite.destroy()
    laseroverheat = 1
    fireball.destroy(effects.fire, 500)
    info.changeLifeBy(-1)
    scene.cameraShake(5, 500)
    mySprite = sprites.create(assets.image`puppy`, SpriteKind.Player)
    mySprite.setPosition(5, 108)
    mySprite.setStayInScreen(true)
    controller.moveSprite(mySprite, 100, 0)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    astroid.destroy(effects.fire, 200)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    mySprite.destroy()
    music.smallCrash.play()
    info.changeLifeBy(-1)
    laseroverheat = 1
    scene.cameraShake(4, 500)
    mySprite = sprites.create(assets.image`puppy`, SpriteKind.Player)
    mySprite.setPosition(5, 108)
    mySprite.setStayInScreen(true)
    controller.moveSprite(mySprite, 100, 0)
})
let astroid: Sprite = null
let fireball: Sprite = null
let projectile: Sprite = null
let mySprite2: Sprite = null
let mySprite: Sprite = null
let laseroverheat = 0
laseroverheat = 1
info.setScore(1)
let speed = 1000
effects.starField.startScreenEffect()
mySprite = sprites.create(assets.image`puppy`, SpriteKind.Player)
mySprite2 = sprites.create(assets.image`spaceship-up-down`, SpriteKind.Player)
mySprite2.setPosition(6, 55)
mySprite.setPosition(83, 111)
controller.moveSprite(mySprite2, 0, 100)
controller.moveSprite(mySprite, 100, 0)
mySprite.setStayInScreen(true)
mySprite2.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(speed, function () {
    astroid = sprites.createProjectileFromSide(assets.image`projectile`, 0, 50)
    mySprite.setKind(SpriteKind.Player)
    mySprite2.setKind(SpriteKind.Player)
    astroid.setKind(SpriteKind.Enemy)
    astroid.x = randint(20, scene.screenWidth())
    speed = speed - info.score()
    if (randint(0, 10) == 0) {
        fireball = sprites.createProjectileFromSide(assets.image`fire`, 50, 50)
        fireball.x = randint(20, scene.screenWidth())
        fireball.follow(mySprite)
        fireball.setKind(SpriteKind.Fireball)
    }
})
game.onUpdateInterval(3500, function () {
    laseroverheat = 1
})
