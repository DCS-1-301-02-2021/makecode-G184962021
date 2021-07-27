scene.setBackgroundColor(8)
let spacePlane = sprites.create(img`
    6 6 6 6 6 6 6 . . . . . . . . .
    7 7 . . . . . . . . . . . . . .
    7 7 7 . . . . . . . . . . . . .
    7 7 7 7 . . . . . . . . . . . .
    2 f f 7 7 7 . . . . . . . . . .
    . f f 7 7 7 7 7 . . . . . . . .
    2 2 f a a a a a a a a . . . . .
    2 4 f 1 1 1 1 1 1 1 1 1 1 1 1 1
    2 4 f 1 1 1 1 1 1 1 1 1 1 1 1 1
    2 2 f a a a a a a a a . . . . .
    . f f 7 7 7 7 7 . . . . . . . .
    2 f f 7 7 7 . . . . . . . . . .
    7 7 7 7 . . . . . . . . . . . .
    7 7 7 . . . . . . . . . . . . .
    7 7 . . . . . . . . . . . . . .
    6 6 6 6 6 6 6 . . . . . . . . .
`, SpriteKind.Player)
info.setLife(3)
spacePlane.setStayInScreen(true)
controller.moveSprite(spacePlane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let missile = sprites.createProjectileFromSprite(img`
        `, spacePlane, 200, 0)
})
game.onUpdateInterval(500, function on_update() {
    let bogy = sprites.create(assets.image`bogy`, SpriteKind.Enemy)
    bogy.setVelocity(-100, randint(-30, 30))
    bogy.y = randint(0, scene.screenHeight())
    bogy.left = scene.screenWidth()
    bogy.setFlag(SpriteFlag.AutoDestroy, true)
})
function on_hit(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
}

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, on_hit)
function on_crash(sprite: any, othersprite: any) {
    info.changeLifeBy(-1)
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, on_hit)
