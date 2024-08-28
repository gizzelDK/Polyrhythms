export class NodeBall{
    constructor (track
                ,radius
                ,speed
                ,colour
                ,direction
                ,audioCtx
                ,soundDuration
                ,frequency){
        this.track = track
        this.radius = radius
        this.speed = speed
        this.offset = 0
        this.center = this.track.getPosition(this.offset)
        this.colour = colour
        this.direction = direction
        this.shouldPlay = true
        this.audioCtx = audioCtx
        this.soundDuration = soundDuration || 0.5
        this.frequency = frequency || 440
    }
    playSound(frequency, duration){
        const osc = this.audioCtx.createOscillator()
        const envelope = this.audioCtx.createGain()
        osc.connect(envelope)
        envelope.connect(this.audioCtx.destination)

        envelope.gain.setValueAtTime(0.1, this.audioCtx.currentTime)
        envelope.gain.exponentialRampToValueAtTime(0.1, this.audioCtx.currentTime + (duration * 0.5))
        envelope.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + duration)
        osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime)
        osc.start()
        osc.stop(this.audioCtx.currentTime + duration)
    }
    move(){

        this.offset -= this.speed * this.direction
        this.center = this.track.getPosition(this.offset)
        if (this.center.x > this.track.center.x && this.shouldPlay) {
            this.playSound(this.frequency, this.soundDuration)
            this.shouldPlay = false
        }
        if (this.center.x < this.track.center.x && !this.shouldPlay) {
            this.playSound(this.frequency, this.soundDuration)
            this.shouldPlay = true
        }
    }
    draw(ctx){
        ctx.beginPath()
        ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
        ctx.lineWidth = 2
        ctx.strokeStyle = `hsl(${this.colour}, 100%, 50%)`
        ctx.fillStyle = `hsl(${this.colour}, 30%, 50%)`
        ctx.fill()
        ctx.stroke()
    }
}