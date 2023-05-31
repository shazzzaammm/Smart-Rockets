function obstacle(a, b) {
  this.a = a;
  this.b = b;

  this.show = function () {
    noStroke();
    fill(255, 0, 0);
    rect(this.a.x, this.a.y, this.b.x - this.a.x, this.b.y - this.a.y);
    fill(255);
    // ellipse(this.a.x, this.a.y, 20);
    // ellipse(this.b.x, this.a.y, 20);
    // ellipse(this.b.x, this.b.y, 20);
    // ellipse(this.a.x, this.b.y, 20);
  };
}
