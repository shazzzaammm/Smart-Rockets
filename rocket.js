function rocket(dna) {
  this.pos = createVector(width / 2, height);
  this.velocity = createVector(0, -0.01);
  this.acceleration = createVector();
  this.count = 0;
  this.fitness = 0;
  this.finished = false;
  this.count = 0;
  this.crashed = false;
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.show = function () {
    push();
    noStroke();
    fill(255, 50);
    if (this.crashed) {
      fill(255, 0, 0, 50);
    }
    translate(this.pos.x, this.pos.y);
    rotate(this.velocity.heading());
    rectMode(CENTER);
    rect(0, 0, 50, 10);
    pop();
  };

  this.applyForce = function (force) {
    this.acceleration.add(force);
  };

  this.update = function () {
    //dont update if done or dead
    if (this.finished || this.crashed) {
      return;
    }
    //update physics
    this.applyForce(this.dna.genes[count]);
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    this.acceleration.mult(0);
    //check finished
    const distance = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (distance < 16) {
      this.finished = true;
      this.pos = createVector(target.x, target.y);
    }

    //check crashed | surely theres a better way than this right
    for (let i = 0; i < barriers.length; i++) {
      const barrier = barriers[i];
      if (
        this.pos.x > barrier.a.x &&
        this.pos.x < barrier.b.x &&
        this.pos.y > barrier.a.y &&
        this.pos.y < barrier.b.y
      ) {
        this.crashed = true;
      }
    }
    if (
      this.pos.x > width ||
      this.pos.x < 0 ||
      this.pos.y > height + 20 ||
      this.pos.y < 0
    ) {
      this.crashed = true;
    }
    this.count++;
  };

  this.calculateFitness = function () {
    const distance = dist(this.pos.x, this.pos.y, target.x, target.y);
    const speed = this.count / lifespan;
    this.fitness = map(distance, 0, height, height, 0);

    if (this.finished) {
      this.fitness *= 3;
      this.fitness /= speed;
    }
    if (this.crashed) {
      this.fitness *= 0.5;
    }
  };
}
