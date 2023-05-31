var count = 0;
var lifespan = 225;
var mutationRate = 0.0005;
var maxForceMag = 0.25;
var popul;
var target;
let mouseDownLocation, currentMouseLocation;
var barriers = [];
var lifeSpanSlider,
  mutationRateSlider,
  maxForceSlider,
  populationSizeSlider,
  restartButton,
  removeBarriersButton;
function setup() {
  //init
  createCanvas(window.innerWidth, window.innerHeight - 25);
  popul = new population();
  popul.init();
  target = createVector(width / 2, height / 5);
  //gross html (yucky)
  createSpan("Lifespan");
  lifeSpanSlider = createSlider(10, 500, lifespan, 1);
  createSpan("MutationRate");
  mutationRateSlider = createSlider(0, 0.01, mutationRate, 0.0001);
  createSpan("MaxForce");
  maxForceSlider = createSlider(0, 10, maxForceMag, 0.1);
  createSpan("PopulationSize");
  populationSizeSlider = createSlider(10, 1000, popul.populationSize, 5);
  restartButton = createButton("Restart Population");
  removeBarriersButton = createButton("Remove Barriers");
  restartButton.mousePressed(restart);
  removeBarriersButton.mousePressed(destroyAllBarriers);
}
function draw() {
  background(0);
  fill(255);
  ellipse(target.x, target.y, 16, 16);
  updateValues();
  popul.run();
  if (count == lifespan) {
    popul.evaluate();
    popul.selection();
    count = 0;
  }
  count++;
  for (let i = 0; i < barriers.length; i++) {
    const b = barriers[i];
    b.show();
  }
}
//#region draw ur own barriers!
function mousePressed() {
  mouseDownLocation = createVector(mouseX, mouseY);
}

function mouseDragged() {
  currentMouseLocation = createVector(mouseX, mouseY);
}
function mouseReleased() {
  if (
    mouseDownLocation.x < currentMouseLocation.x &&
    mouseDownLocation.y <= currentMouseLocation.y
  ) {
    barriers.push(new obstacle(mouseDownLocation, currentMouseLocation));
  }
}
//#endregion
function restart() {
  let temp = popul.populationSize;
  popul = new population();
  count = 0;
  popul.populationSize = temp;
  popul.init();
}
function destroyAllBarriers() {
  barriers = [];
}
function updateValues() {
  lifespan = lifeSpanSlider.value();
  maxForceMag = maxForceSlider.value();
  mutationRate = mutationRateSlider.value();
  popul.populationSize = populationSizeSlider.value();
}
