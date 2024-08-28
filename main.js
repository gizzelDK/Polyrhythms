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

const trackMinRadius = 100
const nodeBallRadius = 10
const nodeBallMinSpeed = 0.01
const trackStep = 15
const nodeBallSpeedStep = -0.0001
const colour1 = 'hotpink'
let direction1 = -1

const tracks = []
const nodeBalls = []
const nPairs = 12
const soundFrequencies = [
    1760, 1567.98, 1396.91, 1318.51, 1174.66, 1046.5, 987.77, 880,
    783.99, 698.46, 659.25, 587.33, 523.25, 493.88, 440, 392, 349.23,
    329.63, 293.66, 261.63
]

let cureentFrequency = 0
/// French pitch / diapason normal
// const frequency = 435
/// Verdi tuning
const frequency = 432
const g3 = (frequency - (frequency/12) *2)/4
for (let i = 0; i < nPairs; i++){
    const trackRadius = trackMinRadius + i * trackStep
    const nodeBallSpeed = nodeBallMinSpeed + i * nodeBallSpeedStep
    const hue = (i * 360) / nPairs
    const duration = 0.5
    if (i > 0){
        cureentFrequency += g3/12
        
    }else{
        cureentFrequency += g3
    }
    const track = new Track(trackCenter, trackRadius, hue)
    const node = new NodeBall(track
                            ,nodeBallRadius
                            ,nodeBallSpeed
                            ,hue
                            ,direction1
                            ,audioCtx
                            ,duration
                            ,(cureentFrequency))
    tracks.push(track)
    nodeBalls.push(node)
}

animate()

function animate(){
    // ctx.clearRect(0, 0, size, size)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, size, size)
    tracks.forEach(track => track.draw(ctx))
    nodeBalls.forEach(node => node.move())
    nodeBalls.forEach(node => node.draw(ctx))

    requestAnimationFrame(animate)
}