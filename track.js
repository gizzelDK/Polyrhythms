export class Track {
    constructor(center, radius, colour){
        this.center = center
        this.radius = radius
        this.colour = colour
        this.shapeMod = 1
    }

    getPosition(offset){
        return{
            x: this.center.x + Math.cos(offset * this.shapeMod) * this.radius
            ,y: this.center.y - Math.sin(offset) * this.radius
        }
    }
    draw(ctx){
        ctx.beginPath()
        // ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
        for(let a = 0; a < Math.PI * 2; a += 0.1){
            const position = this.getPosition(a)
            ctx.lineTo(position.x, position.y)
        }
        ctx.closePath()
        ctx.strokeStyle = this.colour
        ctx.stroke()
    }
}