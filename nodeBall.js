export class NodeBall{
    constructor (track, radius, speed, colour, direction, audioCtx){
        this.track = track
        this.radius = radius
        this.speed = speed
        this.offset = 0
        this.center = this.track.getPosition(this.offset)
        this.colour = colour
        this.direction = direction
        this.shouldPlay = true
        this.audioCtx = audioCtx
    }
    playSound(frequency = 440, duration = 1){
        const osc = this.audioCtx.createOscillator()
        osc.connect(this.audioCtx.destination)
        osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime)
        osc.start()
        osc.stop(this.audioCtx.currentTime + duration)
    }
    move(){

        this.offset -= this.speed * this.direction
        this.center = this.track.getPosition(this.offset)
        if (this.center.x > this.track.center.x && this.shouldPlay) {
            this.playSound()
            this.shouldPlay = false
        }
        if (this.center.x < this.track.center.x && !this.shouldPlay) {
            this.playSound()
            this.shouldPlay = true
        }
    }
    draw(ctx){
        ctx.beginPath()
        ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
        ctx.strokeStyle = this.colour
        ctx.stroke()
    }
}