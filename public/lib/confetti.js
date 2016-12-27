class Confetti{
    constructor(elId){
        const canvas = document.getElementById(elId);

        this.context = canvas.getContext("2d");
        this.width = canvas.width = window.innerWidth;
        this.height = canvas.height = window.innerHeight;

        this.particles = [];
        this.colors = [
            "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5",
            "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4CAF50",
            "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
            "#FF5722", "#795548"
        ];

        this.update(this);
    }


    launch(){
        let self = this;
        this.particles = [];

        for(let i = 0; i < 300; i++){
            this.particles.push({
            	x:         this.width/2,
            	y:         this.height/2,
            	boxW:      this.constructor.randomRange(5,20),
            	boxH:      this.constructor.randomRange(5,20),
            	size:      this.constructor.randomRange(2,8),
            	velX:      this.constructor.randomRange(-8,8),
            	velY:      this.constructor.randomRange(-50,-10),
            	angle:     this.constructor.convertToRadians(this.constructor.randomRange(0,360)),
            	color:     this.colors[Math.floor(Math.random() * this.colors.length)],
            	anglespin: this.constructor.randomRange(-0.2,0.2),
                draw:      (particle) => {
                    self.drawParticle(particle, self.context);
                }
        	});
        }
    }


    drawParticle(particle, context){
        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.angle);
        context.fillStyle = particle.color;
        context.beginPath();
        context.fillRect(particle.boxW/2*-1, particle.boxH/2*-1, particle.boxW, particle.boxH);
        context.fill();
        context.closePath();
        context.restore();

        particle.angle += particle.anglespin;
        particle.velY *= 0.999;
        particle.velY += 0.3;
        particle.x += particle.velX;
        particle.y += particle.velY;

        if(particle.y < 0){
            particle.velY *= -0.2;
            particle.velX *= 0.9;
        }

        if(particle.y > particle.height){
            particle.anglespin = 0;
            particle.y = particle.height;
            particle.velY *= -0.2;
            particle.velX *= 0.9;
        }

        if(particle.x > particle.width ||particle.x < 0){
            particle.velX *= -0.5;
        }
    }

    update(self){
        self.context.clearRect(0, 0, self.width, self.height);
        self.context.globalAlpha = 1;
        self.particles.forEach(particle => {
            particle.draw(particle);
        });

        requestAnimationFrame(() => {
            this.update(self);
        });
    }

    static randomRange(min, max){
    	return min + Math.random() * (max - min );
    }

    static convertToRadians(degree) {
        return degree*(Math.PI/180);
    }
}
