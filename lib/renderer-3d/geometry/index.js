var raf = require("request-animation-frame"),
  Emitter = require("emitter");

Emitter(exports);

var loader = new THREE.JSONLoader();
var cache = {};

function createModel(data) {
  console.time("create model " + data.id);
  loader.createModel(data.json, function(geo, materials) {
    exports[data.id] = geo;
    if (data.material && materials.length) {
      exports[data.id + "_materials"] = materials;
    }
    console.timeEnd("create model " + data.id);
  });

  /*
  if( data.material ){
    if( !exports[data.id+'_materials'] ){
      // "get" the model to fill the cache
      exports[data.id];
    }
  }*/
}

exports.isDone = false;

const pathToModels = require.context("./", true);

var parseData = [
  { id: "terrain", path: "./terrain3.json" },
  //{id:'terrainLow',path:'./terrain-low'},
  { id: "cloud1", path: "./cloud1.json" },
  { id: "cloud2", path: "./cloud2.json" },
  { id: "cloud3", path: "./cloud3.json" },
  { id: "animal_bear", path: "./bear.json" },
  { id: "animal_rabbit", path: "./rabbit.json" },
  { id: "animal_bird1", path: "./bird1.json" },
  { id: "animal_moose", path: "./moose.json" },
  { id: "cpu", path: "./cpu.json", material: true },
  { id: "paw", path: "./paw.json" },
  { id: "extra_deathball", path: "./extra_deathball.json" },
  { id: "extra_extralife", path: "./extra_extralife.json" },
  { id: "extra_bulletproof", path: "./extra_shield.json" },
  { id: "extra_fog", path: "./extra_fog.json" },
  { id: "extra_ghostball", path: "./extra_ghostball.json" },
  { id: "extra_mirroredcontrols", path: "./extra_mirroredcontrols.json" },
  { id: "extra_multiball", path: "./extra_multiball.json" },
  { id: "extra_paddleresize", path: "./extra_paddleresize.json" },
  { id: "extra_fireball", path: "./extra_fireball.json" },
  { id: "extra_random", path: "./extra_random.json" },
  { id: "extra_timebomb", path: "./extra_timebomb.json" },
  { id: "extra_laser", path: "./extra_laser.json" }
];

var step = -1;
var totalModels = parseData.length;

console.time("parse geometry");

function parseStep() {
  if (step < totalModels - 1) {
    step++;
    var data = parseData[step];
    console.time("parse " + data.id);
    data.json = JSON.parse(pathToModels(data.path, true));
    console.timeEnd("parse " + data.id);
    raf(parseStep);
  } else {
    console.timeEnd("parse geometry");
    step = -1;
    console.time("create geometry");
    createModelStep();
  }
}

function createModelStep() {
  if (step < totalModels - 1) {
    step++;
    var data = parseData[step];
    createModel(data);
    raf(createModelStep);
  } else {
    console.timeEnd("create geometry");
    exports.isDone = true;
    exports.emit("isDone");
  }
}

parseStep();
