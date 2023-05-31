function DNA(genes) {
  if (genes) {
    this.genes = genes;
  } else {
    this.genes = [];
    for (let i = 0; i < lifespan; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(maxForceMag);
    }
  }

  this.crossover = function (partner) {
    let newGenes = [];
    const mid = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      if (i > mid) {
        newGenes[i] = this.genes[i];
      } else {
        newGenes[i] = partner.genes[i];
      }
    }
    return new DNA(newGenes);
  };

  this.mutate = function () {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxForceMag);
      }
    }
  };
}
