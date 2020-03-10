function ParticleSystemLinear(graphics, spec) {
    let that = {};
    let particles = [];

    function create(spec) {
        let that = {};

        spec.fill = 'rgb(255, 255, 255)';
        spec.stroke = 'rgb(0, 0, 0)';
        spec.alive = 0;

        that.update = function(elapsedTime) {
            spec.center.x += (spec.speed * spec.direction.x * elapsedTime);
            spec.center.y += (spec.speed * spec.direction.y * elapsedTime);
            spec.alive += elapsedTime;

            spec.rotation += spec.speed * 0.5;

            return spec.alive < spec.lifetime;
        };

        that.draw = function() {
            graphics.drawRectangle(spec);
        };

        return that;
    }

    that.update = function(elapsedTime) {
        let keepMe = [];
        for (let particle = 0; particle < particles.length; particle++) {
            if (particles[particle].update(elapsedTime)) {
                keepMe.push(particles[particle]);
            }
        }
        particles = keepMe;

        for (let particle = 0; particle < 5; particle++) {
            let size = Math.abs(Random.nextGaussian(spec.size.mean, spec.size.stdev));
            let p = create({
                center: { x: Random.nextRange(0, spec.width), y: 0 },
                size: {x: size, y: size},
                rotation: 0,
                speed: 0.05 + Random.nextGaussian(spec.speed.mean, spec.speed.stdev),
                direction: {x: 0, y: 1},
                lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev)
            });
            particles.push(p);
        }
    };

    that.render = function() {
        for (let p = particles.length - 1; p >= 0; p--) {
            particles[p].draw();
        }
    };

    return that;
}
