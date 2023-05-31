function population() {
  this.rockets = [];
  this.populationSize = 100;
  this.matingPool = [];
  this.init = function () {
    for (let i = 0; i < this.populationSize; i++) {
      this.rockets[i] = new rocket();
    }
  };

  this.evaluate = function () {
    this.matingPool = [];
    let maxFitness = 0;
    for (let i = 0; i < this.rockets.length; i++) {
      const r = this.rockets[i];
      r.calculateFitness();
      if (r.fitness > maxFitness) {
        maxFitness = r.fitness;
      }
    }
    for (let i = 0; i < this.rockets.length; i++) {
      const r = this.rockets[i];
      r.fitness /= maxFitness;
    }
    for (let i = 0; i < this.rockets.length; i++) {
      const r = this.rockets[i];
      let num = r.fitness * 100;
      for (let j = 0; j < num; j++) {
        this.matingPool.push(r);
      }
    }
    console.log(maxFitness);
    // createP(maxFitness);
  };

  this.selection = function () {
    let newRockets = [];
    for (let i = 0; i < this.rockets.length; i++) {
      const parentA = random(this.matingPool).dna;
      const parentB = random(this.matingPool).dna;
      const child = parentA.crossover(parentB);
      newRockets[i] = new rocket(child);
      newRockets[i].dna.mutate();
    }
    this.rockets = newRockets;
  };

  this.run = function () {
    for (let i = 0; i < this.rockets.length; i++) {
      const r = this.rockets[i];
      r.update();
      r.show();
    }
  };
}
