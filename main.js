import { Track } from './track.js'
import { NodeBall } from './nodeBall.js'
const canvas = document.createElement("canvas")
const size = 700
canvas.width = size
canvas.height = size
canvas.style.backgroundColor = '#000'
document.getElementById('content-box').appendChild(canvas)

const ctx = canvas.getContext('2d')
const audioCtx = new (window.AudioContext || window.WebkitAudioContext)
const trackCenter = { x: size / 2, y: size / 2}
const trackRadius = 100
const nodeBallRadius = 10
const nodeBallSpeed = 0.01
const colour1 = 'hotpink'
let direction1 = -1

const track = new Track(trackCenter, trackRadius, colour1)
const node = new NodeBall(track, nodeBallRadius, nodeBallSpeed, colour1, direction1, audioCtx)

animate()

function animate(){
    ctx.clearRect(0, 0, size, size)
    track.draw(ctx)
    node.move()
    node.draw(ctx)

    requestAnimationFrame(animate)
}