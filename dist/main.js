/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Visualizer.ts":
/*!***************************!*\
  !*** ./src/Visualizer.ts ***!
  \***************************/
/*! exports provided: DrawableNeuron, Visualizer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawableNeuron", function() { return DrawableNeuron; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Visualizer", function() { return Visualizer; });
class DrawableNeuron {
    constructor(x, y, activation, name, id, isBias = false) {
        this.x = x;
        this.y = y;
        this.activation = activation;
        this.name = name;
        this.isBias = isBias;
        this.id = id;
    }
}
class Visualizer {
    constructor(content) {
        this.content = content;
        this.ctx = content.getContext('2d');
        this.height = content.height;
        this.width = content.width;
    }
    draw(neurons, connections) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawableNeurons = [];
        this.drawableInputNeurons = [];
        const leftMargin = this.width / (neurons.length + 1);
        // Neurons
        neurons.forEach((layer, lIdx) => {
            const topMargin = this.height / (layer.length + 2);
            layer.forEach((neuron, nIdx) => {
                const x = leftMargin * (1 + lIdx);
                const y = topMargin * (1 + nIdx);
                const drawableNeuron = new DrawableNeuron(x, y, neuron.getActivation(), neuron.getName(), nIdx);
                this.drawableNeurons.push(drawableNeuron);
                if (lIdx === 0) {
                    this.drawableInputNeurons.push(drawableNeuron);
                }
            });
            if (lIdx != neurons.length - 1) {
                const x = leftMargin * (1 + lIdx);
                const y = topMargin * (1 + neurons[lIdx].length);
                const drawableNeuron = new DrawableNeuron(x, y, 1, `bias${lIdx}`, neurons[lIdx].length, true);
                this.drawableNeurons.push(drawableNeuron);
            }
        });
        // Connections
        const drawableNameMap = new Map();
        this.drawableNeurons.forEach((drawableNeuron) => drawableNameMap.set(drawableNeuron.name, drawableNeuron) // WTF, I was not able to create map from 2d arr
        );
        connections.forEach((layer, lIdx) => {
            layer.forEach((connection) => {
                const inputNName = (connection.getInputNeuron().getIsBias()) ?
                    `bias${lIdx}` :
                    connection.getInputNeuron().getName();
                this.drawConnection(drawableNameMap.get(inputNName), drawableNameMap.get(connection.getOutputNeuron().getName()), connection.getWeight());
            });
        });
        this.drawableNeurons.forEach((neuron) => {
            this.drawNeuron(neuron);
        });
    }
    drawNeuron(drawableNeuron) {
        // white background
        this.ctx.beginPath();
        this.ctx.arc(drawableNeuron.x, drawableNeuron.y, 25, 0, 2 * Math.PI);
        this.ctx.fillStyle = `rgb(255,255,255)`;
        this.ctx.fill();
        this.ctx.beginPath();
        if (drawableNeuron.isBias)
            this.ctx.fillStyle = `rgba(46,40,42, 1)`;
        else
            this.ctx.fillStyle = `rgba(61, 232, 255, ${drawableNeuron.activation})`;
        this.ctx.strokeStyle = `rgb(46,40,42, 1)`;
        this.ctx.lineWidth = 1;
        this.ctx.arc(drawableNeuron.x, drawableNeuron.y, 25, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.fillStyle = `rgb(46,40,42, 1)`;
        const height = 16;
        this.ctx.font = `bold ${height}px`;
        const text = Number(drawableNeuron.activation).toFixed(4);
        this.ctx.fillText(text, drawableNeuron.x - this.ctx.measureText(text).width / 2, drawableNeuron.y + height / 3);
    }
    drawConnection(inputNeuron, outputNeuron, weight) {
        this.ctx.beginPath();
        this.ctx.lineWidth = Math.log(1.001 + Math.abs(weight));
        this.ctx.strokeStyle = (weight > 0) ?
            `rgba(61, 232, 255, 1)` :
            `rgba(205, 83, 52, 1)`;
        this.ctx.moveTo(inputNeuron.x, inputNeuron.y);
        this.ctx.lineTo(outputNeuron.x, outputNeuron.y);
        this.ctx.closePath();
        this.ctx.stroke();
        // Draw connection weights
        // y = ax + c
        const a = (outputNeuron.y - inputNeuron.y) / (outputNeuron.x - inputNeuron.x);
        const c = outputNeuron.y - a * outputNeuron.x;
        let x;
        const distanceFromOrigin = 60;
        if (inputNeuron.name.indexOf("bias") > -1) {
            x = inputNeuron.x + (distanceFromOrigin / Math.sqrt(1 + Math.pow(a, 2)));
        }
        else {
            x = outputNeuron.x - (distanceFromOrigin / Math.sqrt(1 + Math.pow(a, 2)));
        }
        const y = a * x + c;
        this.ctx.font = `12px`;
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(Math.atan(a));
        this.ctx.fillText(Number(weight).toFixed(4), 0, 0);
        this.ctx.restore();
    }
    getDrawableInputNeurons() {
        return this.drawableInputNeurons;
    }
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Visualizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Visualizer */ "./src/Visualizer.ts");
/* harmony import */ var _neuralNetwork_NeuralCore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./neuralNetwork/NeuralCore */ "./src/neuralNetwork/NeuralCore.ts");
/* harmony import */ var _neuralNetwork_HelperObjects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./neuralNetwork/HelperObjects */ "./src/neuralNetwork/HelperObjects.ts");



window.slide = (i, value) => {
    input[i] = value;
    neuralCore.evaluate(input);
    visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
};
window.addOrRemoveLayer = (add) => {
    neuralCore.addOrRemoveLayer(add);
    updateUI();
};
window.addOrRemoveNeuron = (add, layerIdx) => {
    neuralCore.addOrRemoveNeuron(add, layerIdx);
    if (layerIdx == 0) {
        if (add)
            input.push(1);
        else
            input.pop();
    }
    updateUI();
};
window.train = (multipleIters) => {
    let iters = multipleIters ? Number.parseInt(itersInput.value) : 1;
    neuralCore.setRate(Number.parseFloat(rateInput.value));
    // Regularization
    switch (regTypeInput.value) {
        case "L1":
            neuralCore.setRegularizationType(_neuralNetwork_HelperObjects__WEBPACK_IMPORTED_MODULE_2__["Regularizations"].L1);
            break;
        case "L2":
            neuralCore.setRegularizationType(_neuralNetwork_HelperObjects__WEBPACK_IMPORTED_MODULE_2__["Regularizations"].L2);
            break;
        case "none":
            neuralCore.setRegularizationType(_neuralNetwork_HelperObjects__WEBPACK_IMPORTED_MODULE_2__["Regularizations"].NONE);
            break;
    }
    neuralCore.setRegularizationRate(Number.parseFloat(regRateInput.value));
    if (trainRepeat.checked && interval == null) {
        trainBtn.innerText = "Stop";
        interval = setInterval(() => { runTrainLoop(iters); }, 100);
    }
    else if (interval != null) {
        clearInterval(interval);
        interval = null;
        trainBtn.innerText = "Start";
    }
    else {
        runTrainLoop(iters);
    }
};
const runTrainLoop = (iters) => {
    for (let i = 0; i < iters; i++) {
        neuralCore.train();
    }
    updateUI();
};
window.setTrainingData = () => {
    try {
        const dataArr = JSON.parse(trainingSetInput.value);
        neuralCore.setTrainingSamples([]);
        dataArr.forEach((sample) => {
            neuralCore.addTrainingSet(sample[0], sample[1]);
        });
        neuralCore.reset();
        updateUI();
    }
    catch (err) {
        alert(err);
    }
};
window.randomWeights = () => {
    weightsInput.value = '[]';
    try {
        neuralCore.setWeights([]);
    }
    catch (_a) { }
    neuralCore.reset();
    updateUI();
};
window.randomBias = () => {
    biasInput.value = '[]';
    try {
        neuralCore.setBias([]);
    }
    catch (_a) { }
    neuralCore.reset();
    updateUI();
};
window.setWeights = () => {
    try {
        const weights = JSON.parse(weightsInput.value);
        neuralCore.setWeights(weights);
        neuralCore.reset();
        updateUI();
    }
    catch (err) {
        alert(err);
    }
};
window.setBias = () => {
    try {
        const weights = JSON.parse(biasInput.value);
        neuralCore.setBias(weights);
        neuralCore.reset();
        updateUI();
    }
    catch (err) {
        alert(err);
    }
};
window.reset = () => {
    neuralCore.reset();
    updateUI();
};
window.applyTrainingSample = (idx) => {
    input = neuralCore.getTrainingSamples()[idx].input;
    updateUI();
};
window.onload = () => {
    main();
};
let neuralCore;
let visualizer;
let input;
let interval = null;
let inputSize = 3;
let hiddenSizes = [2];
let outputSize = 2;
let layerControls;
let inputControls;
let canvas;
let cost;
let iter;
let rateInput;
let itersInput;
let regTypeInput;
let regRateInput;
let trainRepeat;
let trainBtn;
let trainingSetLabelsOutput;
let trainingSetDataOutput;
let trainingSetInput;
let weightsInput;
let biasInput;
const main = () => {
    canvas = document.getElementById('content');
    inputControls = document.getElementById('input-controls');
    layerControls = document.getElementById('layer-controls');
    iter = document.getElementById('iter-output');
    cost = document.getElementById('cost');
    rateInput = document.getElementById('rate-input');
    itersInput = document.getElementById('iters-input');
    regTypeInput = document.getElementById('regularization-type-input');
    regRateInput = document.getElementById('regularization-rate-input');
    trainingSetDataOutput = document.getElementById('training-set-data-output');
    trainingSetLabelsOutput = document.getElementById('training-set-neurons-output');
    trainingSetInput = document.getElementById('training-set-input');
    weightsInput = document.getElementById('training-set-weights');
    biasInput = document.getElementById('training-set-bias');
    trainRepeat = document.getElementById('train-repeat-chckbx');
    trainBtn = document.getElementById('train-btn');
    visualizer = new _Visualizer__WEBPACK_IMPORTED_MODULE_0__["Visualizer"](canvas);
    initCore();
};
const initCore = () => {
    neuralCore = new _neuralNetwork_NeuralCore__WEBPACK_IMPORTED_MODULE_1__["NeuralCore"](inputSize, hiddenSizes, outputSize);
    // Set default values
    input = new Array(neuralCore.getInputSize());
    input.fill(1);
    neuralCore.evaluate(input);
    const wn = window;
    wn.setTrainingData();
    wn.setWeights();
    wn.setBias();
    updateUI();
};
const updateUI = () => {
    neuralCore.evaluate(input);
    let content = addLayerControlRow('Layers', neuralCore.getLayerCnt().toString(), 'addOrRemoveLayer(true)', 'addOrRemoveLayer(false)');
    content += addLayerControlRow('Input size', neuralCore.getInputSize().toString(), 'addOrRemoveNeuron(true, 0)', 'addOrRemoveNeuron(false, 0)');
    for (let i = 0; i < neuralCore.getLayerCnt() - 2; i++) {
        content += addLayerControlRow('Hidden layer size', neuralCore.getHiddenLayerSizes()[i].toString(), `addOrRemoveNeuron(true, ${i + 1})`, `addOrRemoveNeuron(false, ${i + 1})`);
    }
    content += addLayerControlRow('Output size', neuralCore.getOutputSize().toString(), `addOrRemoveNeuron(true, ${neuralCore.getLayerCnt() - 1})`, `addOrRemoveNeuron(false, ${neuralCore.getLayerCnt() - 1})`);
    layerControls.innerHTML = content;
    inputControls.innerHTML = '';
    if (!visualizer.getDrawableInputNeurons()) {
        visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
    }
    const controlHeight = 50;
    visualizer.getDrawableInputNeurons().forEach((neuron) => {
        const x = neuron.x - 80;
        const y = neuron.y - controlHeight / 2 + 5;
        inputControls.innerHTML += `<input
      style="position: absolute; top: ${y}px; left: ${x}px; height: ${controlHeight}px;" 
      type="range" orient="vertical" min="0" max="1" value="${neuron.activation}" step="0.05" 
      oninput="slide(${neuron.id}, this.value);">`;
    });
    iter.innerHTML = neuralCore.getIteration().toString();
    cost.innerHTML = neuralCore.getCost().toString();
    // Add training set data labels
    let labels = '';
    for (let i = 0; i < neuralCore.getInputSize(); i++) {
        labels += `<th scope='col'>Input ${i}</th>`;
    }
    for (let i = 0; i < neuralCore.getOutputSize(); i++) {
        labels += `<th scope='col' style="text-align: right">Output ${i}</th>`;
    }
    trainingSetLabelsOutput.innerHTML = labels;
    // Add training data
    let trainingData = '';
    neuralCore.getTrainingSamples().forEach((sample, idx) => {
        trainingData += `<tr style="cursor:pointer;" onclick="applyTrainingSample(${idx})">`;
        sample.input.forEach(val => {
            trainingData += `<td>${val}</td>`;
        });
        sample.output.forEach(val => {
            trainingData += `<td style="text-align: right">${val}</td>`;
        });
        trainingData += '</tr>';
    });
    trainingSetDataOutput.innerHTML = trainingData;
    visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
};
const addLayerControlRow = (label, size, onclickPos, onclickNeg) => {
    return `<tr><td align='right'><label>${label}:</label><b style="margin: auto 6px">${size}</b></td><td>
  <div class="btn-group" role="group">
    <button type="button" class="btn btn-secondary btn-sm" onclick="${onclickNeg}">-</button>
    <button type="button" class="btn btn-secondary btn-sm" onclick="${onclickPos}">+</button>
  </div></td></tr>`;
};


/***/ }),

/***/ "./src/neuralNetwork/Connection.ts":
/*!*****************************************!*\
  !*** ./src/neuralNetwork/Connection.ts ***!
  \*****************************************/
/*! exports provided: Connection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Connection", function() { return Connection; });
class Connection {
    constructor(input, output, weight) {
        this.sampleWeightChanges = [];
        this.inputNeuron = input;
        this.outputNeuron = output;
        this.weight = weight || Math.random();
    }
    addSampleWeightChange(weightChange) {
        this.sampleWeightChanges.push(weightChange);
    }
    applyAverageWeightChange() {
        const change = (this.sampleWeightChanges.reduce((acc, val) => acc + val, 0) / this.sampleWeightChanges.length);
        this.weight += change;
        this.sampleWeightChanges = [];
    }
    getWeight() {
        return this.weight;
    }
    calculateValue() {
        return this.weight * this.inputNeuron.calculateActivation();
    }
    getOutputNeuron() {
        return this.outputNeuron;
    }
    getInputNeuron() {
        return this.inputNeuron;
    }
}


/***/ }),

/***/ "./src/neuralNetwork/HelperObjects.ts":
/*!********************************************!*\
  !*** ./src/neuralNetwork/HelperObjects.ts ***!
  \********************************************/
/*! exports provided: SIGMOID, Regularizations, L1Reg, L2Reg, TrainSample, getNumberOfConnections */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIGMOID", function() { return SIGMOID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Regularizations", function() { return Regularizations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L1Reg", function() { return L1Reg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L2Reg", function() { return L2Reg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrainSample", function() { return TrainSample; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNumberOfConnections", function() { return getNumberOfConnections; });
;
const SIGMOID = {
    output: (x) => 1 / (1 + Math.exp(-x)),
    der: (x) => {
        let output = SIGMOID.output(x);
        return output * (1 - output);
    }
};
var Regularizations;
(function (Regularizations) {
    Regularizations[Regularizations["L1"] = 0] = "L1";
    Regularizations[Regularizations["L2"] = 1] = "L2";
    Regularizations[Regularizations["NONE"] = 2] = "NONE";
})(Regularizations || (Regularizations = {}));
const L1Reg = {
    cost: (connections) => {
        return connections.reduce((prev, connLayer) => {
            return prev + connLayer.reduce((acc, conn) => acc + Math.abs(conn.getWeight()), 0);
        }, 0) * (1 / getNumberOfConnections(connections));
    },
    der: (weight, connCount) => {
        return ((weight > 0) ? 1 : -1) * (1 / connCount);
    }
};
const L2Reg = {
    cost: (connections) => {
        return 1 / 2 * connections.reduce((prev, connLayer) => {
            return prev + connLayer.reduce((acc, conn) => acc + Math.pow(conn.getWeight(), 2), 0);
        }, 0) * (1 / getNumberOfConnections(connections));
    },
    der: (currWeight, connCount) => {
        return currWeight * (1 / connCount);
    }
};
class TrainSample {
    constructor(input, output) {
        this.input = input;
        this.output = output;
    }
}
const getNumberOfConnections = (connections) => {
    return connections.reduce((acc, conn) => acc + conn.length, 0);
};


/***/ }),

/***/ "./src/neuralNetwork/NeuralCore.ts":
/*!*****************************************!*\
  !*** ./src/neuralNetwork/NeuralCore.ts ***!
  \*****************************************/
/*! exports provided: NeuralCore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NeuralCore", function() { return NeuralCore; });
/* harmony import */ var _Neuron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Neuron */ "./src/neuralNetwork/Neuron.ts");
/* harmony import */ var _Connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Connection */ "./src/neuralNetwork/Connection.ts");
/* harmony import */ var _HelperObjects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HelperObjects */ "./src/neuralNetwork/HelperObjects.ts");



class NeuralCore {
    constructor(inputSize, hiddenLayerSizes, outputSize) {
        this.iterCnt = 0;
        this.rate = 1;
        this.lambda = 0.001;
        this.regType = _HelperObjects__WEBPACK_IMPORTED_MODULE_2__["Regularizations"].NONE;
        this.biasNeuron = new _Neuron__WEBPACK_IMPORTED_MODULE_0__["Neuron"]('bias', true);
        this.neurons = [];
        this.connections = [];
        this.trainSamples = [];
        this.inputSize = inputSize;
        this.hiddenLayerSizes = hiddenLayerSizes;
        this.outputSize = outputSize;
        this.layerCnt = hiddenLayerSizes.length + 2;
        // Reset
        this.neurons = [];
        this.connections = [];
        this.init();
    }
    init() {
        // Create the neurons
        for (let l = 0; l < this.layerCnt; l++) {
            // How many neurons are in each layer?
            let neuronsInLayerCnt = 0;
            switch (l) {
                case 0:
                    neuronsInLayerCnt = this.inputSize;
                    break;
                case this.hiddenLayerSizes.length + 1:
                    neuronsInLayerCnt = this.outputSize;
                    break;
                default:
                    neuronsInLayerCnt = this.hiddenLayerSizes[l - 1];
                    break;
            }
            this.neurons[l] = [];
            // Create them
            for (let n = 0; n < neuronsInLayerCnt; n++) {
                this.neurons[l][n] = new _Neuron__WEBPACK_IMPORTED_MODULE_0__["Neuron"](`Neuron${l}${n}`);
                if (l == 0) {
                    this.neurons[l][n].setAsInputNeuron(0); // just to avoid crashes, the 0 should be overriden later 
                }
            }
        }
        // Create the Connections
        this.createConnections(0, this.layerCnt - 1);
    }
    resetWeights() {
        let temp;
        this.weightList = temp;
    }
    setWeights(weights) {
        this.resetWeights();
        if (weights.length !== this.layerCnt - 1) {
            throw 'Weight count does not match layer count';
        }
        for (let i = 0; i < weights[0].length; i++) {
            if (weights[0][i].length !== this.inputSize) {
                throw `Weights at hidden layer 1 of neuron ${i + 1} do not match the input count`;
            }
        }
        for (let size = 1; size < this.hiddenLayerSizes.length; size++) {
            if (weights[size].length !== this.hiddenLayerSizes[size]) {
                throw `Weights at hidden layer ${size + 1} do not match the neuron count`;
            }
            for (let i = 0; i < weights[size].length; i++) {
                if (weights[size][i].length !== this.hiddenLayerSizes[size - 1]) {
                    throw `Weights at hidden layer ${size + 1} of neuron ${i + 1} do not match the input count`;
                }
            }
        }
        for (let i = 0; i < weights[weights.length - 1].length; i++) {
            if (weights[weights.length - 1][i].length !== this.hiddenLayerSizes[this.hiddenLayerSizes.length - 1]) {
                throw `Weights at output layer of neuron ${i + 1} do not match the input count`;
            }
        }
        this.weightList = weights;
    }
    resetBiasList() {
        let temp;
        this.biasList = temp;
    }
    setBias(biasList) {
        this.resetBiasList();
        if (biasList.length !== this.hiddenLayerSizes.length + 1) {
            throw 'Bias count does not match layer count';
        }
        for (let i = 0; i < biasList.length - 1; i++) {
            if (biasList[i].length !== this.hiddenLayerSizes[i]) {
                throw `Bias at layer ${i + 1} do not match the hidden layer count`;
            }
        }
        if (biasList[biasList.length - 1].length !== this.outputSize) {
            throw `Bias at output layer do not match the output layer count`;
        }
        this.biasList = biasList;
    }
    evaluate(input) {
        if (input.length != this.inputSize) {
            throw 'Input size does not match';
        }
        // Reset, so each neuron is recalculated
        this.neurons.forEach(layer => { layer.forEach(neuron => neuron.reset()); });
        // Set input layer
        this.neurons[0].forEach((neuron, idx) => { neuron.setInput(input[idx]); });
        this.neurons[this.layerCnt - 1].forEach(neuron => {
            neuron.calculateActivation();
        });
        return this.neurons[this.layerCnt - 1].map(neuron => neuron.getActivation());
    }
    addTrainingSet(input, output) {
        if (input.length != this.inputSize) {
            throw 'Input size does not match';
        }
        else if (output.length != this.outputSize) {
            throw 'Output size does not match';
        }
        this.trainSamples.push(new _HelperObjects__WEBPACK_IMPORTED_MODULE_2__["TrainSample"](input, output));
    }
    getCost() {
        if (this.trainSamples.length == 0) {
            return 0;
        }
        const costSum = this.trainSamples.reduce((costSum, sample) => {
            this.evaluate(sample.input);
            return costSum + this.neurons[this.layerCnt - 1].reduce((acc, neuron, i) => {
                return acc + Math.pow((neuron.getActivation() - sample.output[i]), 2);
            }, 0);
        }, 0);
        // Regularization
        let regCost = 0;
        switch (this.regType) {
            case _HelperObjects__WEBPACK_IMPORTED_MODULE_2__["Regularizations"].L1:
                regCost = _HelperObjects__WEBPACK_IMPORTED_MODULE_2__["L1Reg"].cost(this.connections);
                break;
            case _HelperObjects__WEBPACK_IMPORTED_MODULE_2__["Regularizations"].L2:
                regCost = _HelperObjects__WEBPACK_IMPORTED_MODULE_2__["L2Reg"].cost(this.connections);
                break;
            case _HelperObjects__WEBPACK_IMPORTED_MODULE_2__["Regularizations"].NONE:
                regCost = 0;
                break;
        }
        return 1 / 2 * costSum * (1 / this.trainSamples.length) +
            this.lambda * regCost;
    }
    train() {
        this.trainSamples.forEach((sample) => {
            this.evaluate(sample.input);
            // Calculate sigmas of the last layer
            this.neurons[this.layerCnt - 1].forEach((neuron, idx) => {
                const newSigma = (sample.output[idx] - neuron.getActivation()) * _HelperObjects__WEBPACK_IMPORTED_MODULE_2__["SIGMOID"].der(neuron.getActivation());
                neuron.setSigma(newSigma);
            });
            // Calculate sigmas for each neuron in the lower layers
            for (let l = this.layerCnt - 2; l >= 0; l--) {
                this.neurons[l].forEach((neuron) => {
                    const newSigma = neuron.getOutputs().reduce((acc, connection) => {
                        return acc + connection.getOutputNeuron().getSigma() * connection.getWeight();
                    }, 0) * _HelperObjects__WEBPACK_IMPORTED_MODULE_2__["SIGMOID"].der(neuron.getActivation());
                    neuron.setSigma(newSigma);
                });
            }
            // Accumulate all weight updates
            this.connections.forEach((connLayer) => {
                connLayer.forEach((connection) => {
                    let regDer = 0;
                    switch (this.regType) {
                        case _HelperObjects__WEBPACK_IMPORTED_MODULE_2__["Regularizations"].L1:
                            regDer = _HelperObjects__WEBPACK_IMPORTED_MODULE_2__["L1Reg"].der(connection.getWeight(), Object(_HelperObjects__WEBPACK_IMPORTED_MODULE_2__["getNumberOfConnections"])(this.connections));
                            break;
                        case _HelperObjects__WEBPACK_IMPORTED_MODULE_2__["Regularizations"].L2:
                            regDer = _HelperObjects__WEBPACK_IMPORTED_MODULE_2__["L2Reg"].der(connection.getWeight(), Object(_HelperObjects__WEBPACK_IMPORTED_MODULE_2__["getNumberOfConnections"])(this.connections));
                            break;
                        case _HelperObjects__WEBPACK_IMPORTED_MODULE_2__["Regularizations"].NONE:
                            regDer = 0;
                            break;
                    }
                    const weightChange = connection.getOutputNeuron().getSigma() *
                        connection.getInputNeuron().getActivation() *
                        this.rate -
                        this.lambda * regDer; // Regularization
                    connection.addSampleWeightChange(weightChange);
                });
            });
        });
        // Uff, let's hope everything works and apply the magic
        this.connections.forEach((connLayer) => {
            connLayer.forEach((connection) => {
                connection.applyAverageWeightChange();
            });
        });
        this.iterCnt++;
    }
    addOrRemoveLayer(add) {
        if (add) {
            const newLayerSize = 3;
            this.hiddenLayerSizes.push(newLayerSize);
            this.layerCnt++;
            // Create the new neurons
            this.createLayerOfNeurons(this.layerCnt - 2, newLayerSize);
            // Recreate the last layer
            this.createLayerOfNeurons(this.layerCnt - 1, this.outputSize);
            // Recreate all necessary connections
            this.createConnections(this.layerCnt - 3, this.layerCnt - 1);
        }
        else {
            if (this.layerCnt == 2) {
                return;
            }
            this.hiddenLayerSizes.pop();
            this.layerCnt--;
            this.neurons.pop();
            this.connections.pop();
            // Recreate the last layer
            this.createLayerOfNeurons(this.layerCnt - 1, this.outputSize);
            // Recreate all necessary connections
            this.createConnections(this.layerCnt - 2, this.layerCnt - 1);
        }
    }
    // This function is very long and ugly, I dont want to simply rebuild the network because I want to keep the weights
    addOrRemoveNeuron(add, layerIdx) {
        const isInput = layerIdx == 0;
        const isOutput = layerIdx == this.layerCnt - 1;
        const isHidden = !isInput && !isOutput;
        const sizeChange = (add) ? 1 : -1;
        if (isHidden) {
            this.hiddenLayerSizes[layerIdx - 1] += sizeChange;
        }
        else if (isInput) {
            this.inputSize += sizeChange;
            this.trainSamples = [];
        }
        else {
            this.outputSize += sizeChange;
            this.trainSamples = [];
        }
        if (add) {
            let newNeuronIdx;
            if (isHidden) {
                newNeuronIdx = this.hiddenLayerSizes[layerIdx - 1] - 1;
            }
            else if (isInput) {
                newNeuronIdx = this.inputSize - 1;
            }
            else {
                newNeuronIdx = this.outputSize - 1;
            }
            const newNeuron = new _Neuron__WEBPACK_IMPORTED_MODULE_0__["Neuron"](`Neuron${layerIdx}${newNeuronIdx}`);
            this.neurons[layerIdx][newNeuronIdx] = newNeuron;
            if (isInput)
                newNeuron.setAsInputNeuron(0);
            //// Add connections from the prev layer
            if (!isInput) {
                this.neurons[layerIdx - 1].forEach((neuron, idx) => {
                    const connection = new _Connection__WEBPACK_IMPORTED_MODULE_1__["Connection"](neuron, newNeuron);
                    neuron.addOutput(connection);
                    newNeuron.addInput(connection);
                    this.connections[layerIdx - 1].push(connection);
                });
                // Dont forget the bias
                const connection = new _Connection__WEBPACK_IMPORTED_MODULE_1__["Connection"](this.biasNeuron, newNeuron);
                newNeuron.addInput(connection);
                this.connections[layerIdx - 1].push(connection);
            }
            if (!isOutput) {
                //// Add connections to the next layer
                this.neurons[layerIdx + 1].forEach((neuron, idx) => {
                    const connection = new _Connection__WEBPACK_IMPORTED_MODULE_1__["Connection"](newNeuron, neuron);
                    neuron.addInput(connection);
                    this.connections[layerIdx].push(connection);
                });
            }
        }
        else {
            const removedNeuron = this.neurons[layerIdx].pop();
            // Remove outputs from the prev layer
            if (!isInput) {
                this.neurons[layerIdx - 1].forEach((neuron) => {
                    neuron.setOutputs(neuron.getOutputs().filter((connection) => {
                        return connection.getOutputNeuron().getName() != removedNeuron.getName();
                    }));
                });
            }
            // Remove input in the next layer
            if (!isOutput) {
                this.neurons[layerIdx + 1].forEach((neuron) => {
                    neuron.setInputs(neuron.getInputs().filter((connection) => {
                        return connection.getInputNeuron().getName() != removedNeuron.getName();
                    }));
                });
            }
            // Remove the unused connections
            if (!isInput) {
                this.connections[layerIdx - 1] = this.connections[layerIdx - 1].filter((connection) => {
                    return connection.getOutputNeuron().getName() != removedNeuron.getName();
                });
            }
            if (!isOutput) {
                this.connections[layerIdx] = this.connections[layerIdx].filter((connection) => {
                    return connection.getInputNeuron().getName() != removedNeuron.getName();
                });
            }
        }
    }
    reset() {
        this.iterCnt = 0;
        this.createConnections(0, this.layerCnt - 1);
    }
    createLayerOfNeurons(layerIdx, layerSize) {
        this.neurons[layerIdx] = [];
        for (let i = 0; i < layerSize; i++) {
            this.neurons[layerIdx][i] = new _Neuron__WEBPACK_IMPORTED_MODULE_0__["Neuron"](`Neuron${layerIdx}${i}`);
        }
    }
    createConnections(firstLayer, lastLayer) {
        for (let l = firstLayer; l < lastLayer; l++) {
            // For each neuron in the layer add all connections to neurons in the next layer
            this.connections[l] = [];
            // Reset input & outputs
            this.neurons[l + 1].forEach(nextNeuron => { nextNeuron.resetInputs(); });
            this.neurons[l].forEach(nextNeuron => { nextNeuron.resetOutputs(); });
            this.neurons[l + 1].forEach((nextNeuron, toIdx) => {
                this.neurons[l].forEach((currNeuron, fromIdx) => {
                    let weight;
                    try {
                        weight = this.weightList[l][toIdx][fromIdx];
                    }
                    catch (_a) {
                        // Happens if new layers have been added - use default value from Connection
                    }
                    const connection = new _Connection__WEBPACK_IMPORTED_MODULE_1__["Connection"](currNeuron, nextNeuron, weight);
                    currNeuron.addOutput(connection);
                    nextNeuron.addInput(connection);
                    this.connections[l].push(connection);
                });
                let bias;
                try {
                    bias = this.biasList[l][toIdx];
                }
                catch (_a) {
                    // Happens if new layers have been added - use default value from Connection
                }
                // Add bias neuron to each layer
                const biasConnection = new _Connection__WEBPACK_IMPORTED_MODULE_1__["Connection"](this.biasNeuron, nextNeuron, bias);
                nextNeuron.addInput(biasConnection);
                this.connections[l].push(biasConnection);
            });
        }
    }
    getNeurons() {
        return this.neurons;
    }
    getConnections() {
        return this.connections;
    }
    getInputSize() {
        return this.inputSize;
    }
    getOutputSize() {
        return this.outputSize;
    }
    getLayerCnt() {
        return this.layerCnt;
    }
    getHiddenLayerSizes() {
        return this.hiddenLayerSizes;
    }
    setRate(newRate) {
        this.rate = newRate;
    }
    getIteration() {
        return this.iterCnt;
    }
    setRegularizationType(regType) {
        this.regType = regType;
    }
    setRegularizationRate(rate) {
        this.lambda = rate;
    }
    getTrainingSamples() {
        return this.trainSamples;
    }
    setTrainingSamples(samples) {
        this.trainSamples = samples;
    }
}


/***/ }),

/***/ "./src/neuralNetwork/Neuron.ts":
/*!*************************************!*\
  !*** ./src/neuralNetwork/Neuron.ts ***!
  \*************************************/
/*! exports provided: Neuron */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Neuron", function() { return Neuron; });
/* harmony import */ var _HelperObjects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HelperObjects */ "./src/neuralNetwork/HelperObjects.ts");

class Neuron {
    constructor(name, isBias = false) {
        this.inputs = [];
        this.outputs = [];
        this.isInput = false;
        this.isCalculated = false;
        this.isBias = false;
        this.name = name;
        this.isBias = isBias;
    }
    ;
    getName() {
        return this.name;
    }
    getIsBias() {
        return this.isBias;
    }
    setAsInputNeuron(activation) {
        this.isInput = true;
        this.activation = activation;
        this.inputs = null;
    }
    setInput(activation) {
        if (!this.isInput) {
            throw 'Cannot set activation of non-input neuron';
        }
        this.activation = activation;
    }
    setSigma(sigma) {
        this.sigma = sigma;
    }
    addInput(input) {
        this.inputs.push(input);
    }
    ;
    getInputs() {
        return this.inputs;
    }
    addOutput(output) {
        this.outputs.push(output);
    }
    getOutputs() {
        return this.outputs;
    }
    setOutputs(connections) {
        this.outputs = connections;
    }
    setInputs(connections) {
        this.inputs = connections;
    }
    resetInputs() {
        this.inputs = [];
    }
    resetOutputs() {
        this.outputs = [];
    }
    reset() {
        this.isCalculated = false;
    }
    getActivation() {
        if (this.isBias)
            this.activation = 1;
        return this.activation;
    }
    getSigma() {
        return this.sigma;
    }
    calculateActivation() {
        if (!this.isInput && !this.isCalculated && !this.isBias) {
            this.activation = _HelperObjects__WEBPACK_IMPORTED_MODULE_0__["SIGMOID"].output(this.inputs.reduce((acc, currConn) => acc + currConn.calculateValue(), 0));
            this.isCalculated = true;
        }
        return this.getActivation();
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Zpc3VhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL0Nvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25ldXJhbE5ldHdvcmsvSGVscGVyT2JqZWN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV1cmFsTmV0d29yay9OZXVyYWxDb3JlLnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL05ldXJvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0VNO0lBUUosWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sR0FBRyxLQUFL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Y2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IE5ldXJvbiB9IGZyb20gXCIuL25ldXJhbE5ldHdvcmsvTmV1cm9uXCI7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSBcIi4vbmV1cmFsTmV0d29yay9Db25uZWN0aW9uXCI7XG5cbmV4cG9ydCBjbGFzcyBEcmF3YWJsZU5ldXJvbiB7XG4gIHB1YmxpYyB4OiBudW1iZXI7XG4gIHB1YmxpYyB5OiBudW1iZXI7XG4gIHB1YmxpYyBhY3RpdmF0aW9uOiBudW1iZXI7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBpc0JpYXM6IGJvb2xlYW47XG4gIHB1YmxpYyBpZDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHgsIHksIGFjdGl2YXRpb24sIG5hbWUsIGlkLCBpc0JpYXMgPSBmYWxzZSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pc0JpYXMgPSBpc0JpYXM7XG4gICAgdGhpcy5pZCA9IGlkO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaXN1YWxpemVyIHtcblxuICBwcml2YXRlIGNvbnRlbnQ6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XG4gIHByaXZhdGUgZHJhd2FibGVOZXVyb25zOiBEcmF3YWJsZU5ldXJvbltdO1xuICBwcml2YXRlIGRyYXdhYmxlSW5wdXROZXVyb25zOiBEcmF3YWJsZU5ldXJvbltdO1xuXG4gIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICB0aGlzLmN0eCA9IGNvbnRlbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLmhlaWdodCA9IGNvbnRlbnQuaGVpZ2h0O1xuICAgIHRoaXMud2lkdGggPSBjb250ZW50LndpZHRoO1xuICB9XG5cbiAgcHVibGljIGRyYXcobmV1cm9uczogTmV1cm9uW11bXSwgY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXVtdKSB7XG4gICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblxuICAgIHRoaXMuZHJhd2FibGVOZXVyb25zID0gW107XG4gICAgdGhpcy5kcmF3YWJsZUlucHV0TmV1cm9ucyA9IFtdO1xuICAgIGNvbnN0IGxlZnRNYXJnaW4gPSB0aGlzLndpZHRoIC8gKG5ldXJvbnMubGVuZ3RoICsgMSk7XG5cbiAgICAvLyBOZXVyb25zXG4gICAgbmV1cm9ucy5mb3JFYWNoKChsYXllciwgbElkeCkgPT4ge1xuICAgICAgY29uc3QgdG9wTWFyZ2luID0gdGhpcy5oZWlnaHQgLyAobGF5ZXIubGVuZ3RoICsgMik7XG4gICAgICBsYXllci5mb3JFYWNoKChuZXVyb24sIG5JZHgpID0+IHtcbiAgICAgICAgY29uc3QgeCA9IGxlZnRNYXJnaW4gKiAoMSArIGxJZHgpO1xuICAgICAgICBjb25zdCB5ID0gdG9wTWFyZ2luICogKDEgKyBuSWR4KTtcblxuICAgICAgICBjb25zdCBkcmF3YWJsZU5ldXJvbiA9IG5ldyBEcmF3YWJsZU5ldXJvbih4LCB5LCBuZXVyb24uZ2V0QWN0aXZhdGlvbigpLCBuZXVyb24uZ2V0TmFtZSgpLCBuSWR4KTtcbiAgICAgICAgdGhpcy5kcmF3YWJsZU5ldXJvbnMucHVzaChkcmF3YWJsZU5ldXJvbik7XG5cbiAgICAgICAgaWYgKGxJZHggPT09IDApIHtcbiAgICAgICAgICB0aGlzLmRyYXdhYmxlSW5wdXROZXVyb25zLnB1c2goZHJhd2FibGVOZXVyb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKGxJZHggIT0gbmV1cm9ucy5sZW5ndGggLSAxKSB7XG4gICAgICAgIGNvbnN0IHggPSBsZWZ0TWFyZ2luICogKDEgKyBsSWR4KTtcbiAgICAgICAgY29uc3QgeSA9IHRvcE1hcmdpbiAqICgxICsgbmV1cm9uc1tsSWR4XS5sZW5ndGgpO1xuXG4gICAgICAgIGNvbnN0IGRyYXdhYmxlTmV1cm9uID0gbmV3IERyYXdhYmxlTmV1cm9uKHgsIHksIDEsIGBiaWFzJHtsSWR4fWAsIG5ldXJvbnNbbElkeF0ubGVuZ3RoLCB0cnVlKTtcbiAgICAgICAgdGhpcy5kcmF3YWJsZU5ldXJvbnMucHVzaChkcmF3YWJsZU5ldXJvbik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBDb25uZWN0aW9uc1xuICAgIGNvbnN0IGRyYXdhYmxlTmFtZU1hcCA9IG5ldyBNYXA8c3RyaW5nLCBEcmF3YWJsZU5ldXJvbj4oKTtcbiAgICB0aGlzLmRyYXdhYmxlTmV1cm9ucy5mb3JFYWNoKFxuICAgICAgKGRyYXdhYmxlTmV1cm9uKSA9PiBkcmF3YWJsZU5hbWVNYXAuc2V0KGRyYXdhYmxlTmV1cm9uLm5hbWUsIGRyYXdhYmxlTmV1cm9uKS8vIFdURiwgSSB3YXMgbm90IGFibGUgdG8gY3JlYXRlIG1hcCBmcm9tIDJkIGFyclxuICAgICk7XG5cbiAgICBjb25uZWN0aW9ucy5mb3JFYWNoKChsYXllciwgbElkeCkgPT4ge1xuICAgICAgbGF5ZXIuZm9yRWFjaCgoY29ubmVjdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dE5OYW1lID1cbiAgICAgICAgICAoY29ubmVjdGlvbi5nZXRJbnB1dE5ldXJvbigpLmdldElzQmlhcygpKSA/XG4gICAgICAgICAgICBgYmlhcyR7bElkeH1gIDpcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS5nZXROYW1lKCk7XG5cbiAgICAgICAgdGhpcy5kcmF3Q29ubmVjdGlvbihcbiAgICAgICAgICBkcmF3YWJsZU5hbWVNYXAuZ2V0KGlucHV0Tk5hbWUpLFxuICAgICAgICAgIGRyYXdhYmxlTmFtZU1hcC5nZXQoY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXROYW1lKCkpLFxuICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0V2VpZ2h0KClcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kcmF3YWJsZU5ldXJvbnMuZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICB0aGlzLmRyYXdOZXVyb24obmV1cm9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd05ldXJvbihkcmF3YWJsZU5ldXJvbjogRHJhd2FibGVOZXVyb24pIHtcbiAgICAvLyB3aGl0ZSBiYWNrZ3JvdW5kXG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguYXJjKGRyYXdhYmxlTmV1cm9uLngsIGRyYXdhYmxlTmV1cm9uLnksIDI1LCAwLCAyICogTWF0aC5QSSk7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYigyNTUsMjU1LDI1NSlgO1xuICAgIHRoaXMuY3R4LmZpbGwoKTtcblxuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIGlmIChkcmF3YWJsZU5ldXJvbi5pc0JpYXMpXG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBgcmdiYSg0Niw0MCw0MiwgMSlgO1xuICAgIGVsc2VcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGByZ2JhKDYxLCAyMzIsIDI1NSwgJHtkcmF3YWJsZU5ldXJvbi5hY3RpdmF0aW9ufSlgO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gYHJnYig0Niw0MCw0MiwgMSlgXG4gICAgdGhpcy5jdHgubGluZVdpZHRoID0gMTtcbiAgICB0aGlzLmN0eC5hcmMoZHJhd2FibGVOZXVyb24ueCwgZHJhd2FibGVOZXVyb24ueSwgMjUsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICB0aGlzLmN0eC5maWxsKCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG5cbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBgcmdiKDQ2LDQwLDQyLCAxKWBcbiAgICBjb25zdCBoZWlnaHQgPSAxNjtcbiAgICB0aGlzLmN0eC5mb250ID0gYGJvbGQgJHtoZWlnaHR9cHhgO1xuICAgIGNvbnN0IHRleHQgPSBOdW1iZXIoZHJhd2FibGVOZXVyb24uYWN0aXZhdGlvbikudG9GaXhlZCg0KTtcbiAgICB0aGlzLmN0eC5maWxsVGV4dChcbiAgICAgIHRleHQsXG4gICAgICBkcmF3YWJsZU5ldXJvbi54IC0gdGhpcy5jdHgubWVhc3VyZVRleHQodGV4dCkud2lkdGggLyAyLFxuICAgICAgZHJhd2FibGVOZXVyb24ueSArIGhlaWdodCAvIDMpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3Q29ubmVjdGlvbihpbnB1dE5ldXJvbjogRHJhd2FibGVOZXVyb24sIG91dHB1dE5ldXJvbjogRHJhd2FibGVOZXVyb24sIHdlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHgubGluZVdpZHRoID0gTWF0aC5sb2coMS4wMDEgKyBNYXRoLmFicyh3ZWlnaHQpKTtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9ICh3ZWlnaHQgPiAwKSA/XG4gICAgICBgcmdiYSg2MSwgMjMyLCAyNTUsIDEpYCA6XG4gICAgICBgcmdiYSgyMDUsIDgzLCA1MiwgMSlgO1xuXG4gICAgdGhpcy5jdHgubW92ZVRvKGlucHV0TmV1cm9uLngsIGlucHV0TmV1cm9uLnkpO1xuICAgIHRoaXMuY3R4LmxpbmVUbyhvdXRwdXROZXVyb24ueCwgb3V0cHV0TmV1cm9uLnkpO1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuXG4gICAgLy8gRHJhdyBjb25uZWN0aW9uIHdlaWdodHNcbiAgICAvLyB5ID0gYXggKyBjXG4gICAgY29uc3QgYSA9IChvdXRwdXROZXVyb24ueSAtIGlucHV0TmV1cm9uLnkpIC8gKG91dHB1dE5ldXJvbi54IC0gaW5wdXROZXVyb24ueClcbiAgICBjb25zdCBjID0gb3V0cHV0TmV1cm9uLnkgLSBhICogb3V0cHV0TmV1cm9uLnhcbiAgICBsZXQgeDtcbiAgICBjb25zdCBkaXN0YW5jZUZyb21PcmlnaW4gPSA2MDtcbiAgICBpZiAoaW5wdXROZXVyb24ubmFtZS5pbmRleE9mKFwiYmlhc1wiKSA+IC0xKSB7XG4gICAgICB4ID0gaW5wdXROZXVyb24ueCArIChkaXN0YW5jZUZyb21PcmlnaW4vTWF0aC5zcXJ0KDErYSoqMikpXG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSBvdXRwdXROZXVyb24ueCAtIChkaXN0YW5jZUZyb21PcmlnaW4vTWF0aC5zcXJ0KDErYSoqMikpXG4gICAgfVxuICAgIGNvbnN0IHkgPSBhICogeCArIGM7XG5cbiAgICB0aGlzLmN0eC5mb250ID0gYDEycHhgO1xuICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICB0aGlzLmN0eC50cmFuc2xhdGUoeCwgeSk7XG4gICAgdGhpcy5jdHgucm90YXRlKE1hdGguYXRhbihhKSk7XG4gICAgdGhpcy5jdHguZmlsbFRleHQoTnVtYmVyKHdlaWdodCkudG9GaXhlZCg0KSwgMCwgMCk7XG4gICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICB9XG5cbiAgcHVibGljIGdldERyYXdhYmxlSW5wdXROZXVyb25zKCkge1xuICAgIHJldHVybiB0aGlzLmRyYXdhYmxlSW5wdXROZXVyb25zO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWaXN1YWxpemVyLCBEcmF3YWJsZU5ldXJvbiB9IGZyb20gJy4vVmlzdWFsaXplcic7XG5pbXBvcnQgeyBOZXVyYWxDb3JlIH0gZnJvbSAnLi9uZXVyYWxOZXR3b3JrL05ldXJhbENvcmUnO1xuaW1wb3J0IHsgUmVndWxhcml6YXRpb25zLCBUcmFpblNhbXBsZSB9IGZyb20gJy4vbmV1cmFsTmV0d29yay9IZWxwZXJPYmplY3RzJztcbmltcG9ydCB7IE5ldXJvbiB9IGZyb20gJy4vbmV1cmFsTmV0d29yay9OZXVyb24nO1xuXG4od2luZG93IGFzIGFueSkuc2xpZGUgPSAoaTogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKSA9PiB7XG4gIGlucHV0W2ldID0gdmFsdWU7XG4gIG5ldXJhbENvcmUuZXZhbHVhdGUoaW5wdXQpO1xuICB2aXN1YWxpemVyLmRyYXcobmV1cmFsQ29yZS5nZXROZXVyb25zKCksIG5ldXJhbENvcmUuZ2V0Q29ubmVjdGlvbnMoKSk7XG59XG5cbih3aW5kb3cgYXMgYW55KS5hZGRPclJlbW92ZUxheWVyID0gKGFkZDogYm9vbGVhbikgPT4ge1xuICBuZXVyYWxDb3JlLmFkZE9yUmVtb3ZlTGF5ZXIoYWRkKTtcbiAgdXBkYXRlVUkoKTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLmFkZE9yUmVtb3ZlTmV1cm9uID0gKGFkZDogYm9vbGVhbiwgbGF5ZXJJZHg6IG51bWJlcikgPT4ge1xuICBuZXVyYWxDb3JlLmFkZE9yUmVtb3ZlTmV1cm9uKGFkZCwgbGF5ZXJJZHgpO1xuICBpZiAobGF5ZXJJZHggPT0gMCkge1xuICAgIGlmIChhZGQpXG4gICAgICBpbnB1dC5wdXNoKDEpO1xuICAgIGVsc2VcbiAgICAgIGlucHV0LnBvcCgpO1xuICB9XG5cbiAgdXBkYXRlVUkoKTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLnRyYWluID0gKG11bHRpcGxlSXRlcnM6IGJvb2xlYW4pID0+IHtcbiAgbGV0IGl0ZXJzID0gbXVsdGlwbGVJdGVycyA/IE51bWJlci5wYXJzZUludChpdGVyc0lucHV0LnZhbHVlKSA6IDE7XG4gIG5ldXJhbENvcmUuc2V0UmF0ZShOdW1iZXIucGFyc2VGbG9hdChyYXRlSW5wdXQudmFsdWUpKTtcblxuICAvLyBSZWd1bGFyaXphdGlvblxuICBzd2l0Y2ggKHJlZ1R5cGVJbnB1dC52YWx1ZSkge1xuICAgIGNhc2UgXCJMMVwiOlxuICAgICAgbmV1cmFsQ29yZS5zZXRSZWd1bGFyaXphdGlvblR5cGUoUmVndWxhcml6YXRpb25zLkwxKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJMMlwiOlxuICAgICAgbmV1cmFsQ29yZS5zZXRSZWd1bGFyaXphdGlvblR5cGUoUmVndWxhcml6YXRpb25zLkwyKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJub25lXCI6XG4gICAgICBuZXVyYWxDb3JlLnNldFJlZ3VsYXJpemF0aW9uVHlwZShSZWd1bGFyaXphdGlvbnMuTk9ORSk7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIG5ldXJhbENvcmUuc2V0UmVndWxhcml6YXRpb25SYXRlKE51bWJlci5wYXJzZUZsb2F0KHJlZ1JhdGVJbnB1dC52YWx1ZSkpO1xuXG4gIGlmICh0cmFpblJlcGVhdC5jaGVja2VkICYmIGludGVydmFsID09IG51bGwpIHtcbiAgICB0cmFpbkJ0bi5pbm5lclRleHQgPSBcIlN0b3BcIlxuICAgIGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4geyBydW5UcmFpbkxvb3AoaXRlcnMpIH0sIDEwMCk7XG4gIH0gZWxzZSBpZiAoaW50ZXJ2YWwgIT0gbnVsbCkge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIGludGVydmFsID0gbnVsbDtcbiAgICB0cmFpbkJ0bi5pbm5lclRleHQgPSBcIlN0YXJ0XCJcbiAgfSBlbHNlIHtcbiAgICBydW5UcmFpbkxvb3AoaXRlcnMpO1xuICB9XG59XG5cbmNvbnN0IHJ1blRyYWluTG9vcCA9IChpdGVyczogbnVtYmVyKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlcnM7IGkrKykge1xuICAgIG5ldXJhbENvcmUudHJhaW4oKTtcbiAgfVxuICB1cGRhdGVVSSgpO1xufVxuXG4od2luZG93IGFzIGFueSkuc2V0VHJhaW5pbmdEYXRhID0gKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGFBcnIgPSBKU09OLnBhcnNlKHRyYWluaW5nU2V0SW5wdXQudmFsdWUpO1xuICAgIG5ldXJhbENvcmUuc2V0VHJhaW5pbmdTYW1wbGVzKFtdKTtcbiAgICBkYXRhQXJyLmZvckVhY2goKHNhbXBsZSkgPT4ge1xuICAgICAgbmV1cmFsQ29yZS5hZGRUcmFpbmluZ1NldChzYW1wbGVbMF0sIHNhbXBsZVsxXSk7XG4gICAgfSk7XG4gICAgbmV1cmFsQ29yZS5yZXNldCgpO1xuICAgIHVwZGF0ZVVJKCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGFsZXJ0KGVycik7XG4gIH1cbn1cbih3aW5kb3cgYXMgYW55KS5yYW5kb21XZWlnaHRzID0gKCkgPT4ge1xuICAgICAgd2VpZ2h0c0lucHV0LnZhbHVlID0gJ1tdJ1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV1cmFsQ29yZS5zZXRXZWlnaHRzKFtdKTtcbiAgICAgIH0gY2F0Y2gge31cbiAgICAgIG5ldXJhbENvcmUucmVzZXQoKTtcbiAgICAgIHVwZGF0ZVVJKClcbn1cbih3aW5kb3cgYXMgYW55KS5yYW5kb21CaWFzID0gKCkgPT4ge1xuICAgICAgYmlhc0lucHV0LnZhbHVlID0gJ1tdJ1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV1cmFsQ29yZS5zZXRCaWFzKFtdKTtcbiAgICAgIH0gY2F0Y2gge31cbiAgICAgIG5ldXJhbENvcmUucmVzZXQoKTtcbiAgICAgIHVwZGF0ZVVJKClcbn1cbih3aW5kb3cgYXMgYW55KS5zZXRXZWlnaHRzID0gKCkgPT4ge1xuICB0cnkge1xuICAgICAgY29uc3Qgd2VpZ2h0czogbnVtYmVyW11bXVtdID0gSlNPTi5wYXJzZSh3ZWlnaHRzSW5wdXQudmFsdWUpO1xuICAgICAgbmV1cmFsQ29yZS5zZXRXZWlnaHRzKHdlaWdodHMpO1xuICAgICAgbmV1cmFsQ29yZS5yZXNldCgpO1xuICAgICAgdXBkYXRlVUkoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGFsZXJ0KGVycik7XG4gICAgfVxufVxuKHdpbmRvdyBhcyBhbnkpLnNldEJpYXMgPSAoKSA9PiB7XG4gIHRyeSB7XG4gICAgICBjb25zdCB3ZWlnaHRzOiBudW1iZXJbXVtdID0gSlNPTi5wYXJzZShiaWFzSW5wdXQudmFsdWUpO1xuICAgICAgbmV1cmFsQ29yZS5zZXRCaWFzKHdlaWdodHMpO1xuICAgICAgbmV1cmFsQ29yZS5yZXNldCgpO1xuICAgICAgdXBkYXRlVUkoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGFsZXJ0KGVycik7XG4gICAgfVxufVxuXG4od2luZG93IGFzIGFueSkucmVzZXQgPSAoKSA9PiB7XG4gIG5ldXJhbENvcmUucmVzZXQoKTtcbiAgdXBkYXRlVUkoKTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLmFwcGx5VHJhaW5pbmdTYW1wbGUgPSAoaWR4OiBudW1iZXIpID0+IHtcbiAgaW5wdXQgPSBuZXVyYWxDb3JlLmdldFRyYWluaW5nU2FtcGxlcygpW2lkeF0uaW5wdXQ7XG4gIHVwZGF0ZVVJKCk7XG59XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIG1haW4oKTtcbn07XG5cbmxldCBuZXVyYWxDb3JlOiBOZXVyYWxDb3JlO1xubGV0IHZpc3VhbGl6ZXI6IFZpc3VhbGl6ZXI7XG5sZXQgaW5wdXQ6IG51bWJlcltdO1xubGV0IGludGVydmFsID0gbnVsbDtcblxubGV0IGlucHV0U2l6ZSA9IDM7XG5sZXQgaGlkZGVuU2l6ZXMgPSBbMl07XG5sZXQgb3V0cHV0U2l6ZSA9IDI7XG5cbmxldCBsYXllckNvbnRyb2xzOiBIVE1MRWxlbWVudDtcbmxldCBpbnB1dENvbnRyb2xzOiBIVE1MRWxlbWVudDtcbmxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuXG5sZXQgY29zdDogSFRNTEVsZW1lbnQ7XG5sZXQgaXRlcjogSFRNTEVsZW1lbnQ7XG5cbmxldCByYXRlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5sZXQgaXRlcnNJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbmxldCByZWdUeXBlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5sZXQgcmVnUmF0ZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xubGV0IHRyYWluUmVwZWF0OiBIVE1MSW5wdXRFbGVtZW50O1xubGV0IHRyYWluQnRuOiBIVE1MSW5wdXRFbGVtZW50O1xuXG5sZXQgdHJhaW5pbmdTZXRMYWJlbHNPdXRwdXQ6IEhUTUxFbGVtZW50O1xubGV0IHRyYWluaW5nU2V0RGF0YU91dHB1dDogSFRNTEVsZW1lbnQ7XG5sZXQgdHJhaW5pbmdTZXRJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbmxldCB3ZWlnaHRzSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5sZXQgYmlhc0lucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuXG5jb25zdCBtYWluID0gKCkgPT4ge1xuICBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICBpbnB1dENvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LWNvbnRyb2xzJyk7XG4gIGxheWVyQ29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGF5ZXItY29udHJvbHMnKTtcbiAgaXRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVyLW91dHB1dCcpO1xuICBjb3N0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvc3QnKTtcbiAgcmF0ZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhdGUtaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICBpdGVyc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZXJzLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgcmVnVHlwZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZ3VsYXJpemF0aW9uLXR5cGUtaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICByZWdSYXRlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVndWxhcml6YXRpb24tcmF0ZS1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHRyYWluaW5nU2V0RGF0YU91dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbmluZy1zZXQtZGF0YS1vdXRwdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICB0cmFpbmluZ1NldExhYmVsc091dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbmluZy1zZXQtbmV1cm9ucy1vdXRwdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICB0cmFpbmluZ1NldElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluaW5nLXNldC1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHdlaWdodHNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbmluZy1zZXQtd2VpZ2h0cycpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGJpYXNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbmluZy1zZXQtYmlhcycpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHRyYWluUmVwZWF0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluLXJlcGVhdC1jaGNrYngnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICB0cmFpbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbi1idG4nKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIHZpc3VhbGl6ZXIgPSBuZXcgVmlzdWFsaXplcihjYW52YXMpO1xuXG4gIGluaXRDb3JlKCk7XG59XG5jb25zdCBpbml0Q29yZSA9ICgpID0+IHtcbiAgbmV1cmFsQ29yZSA9IG5ldyBOZXVyYWxDb3JlKGlucHV0U2l6ZSwgaGlkZGVuU2l6ZXMsIG91dHB1dFNpemUpO1xuXG4gIC8vIFNldCBkZWZhdWx0IHZhbHVlc1xuICBpbnB1dCA9IG5ldyBBcnJheShuZXVyYWxDb3JlLmdldElucHV0U2l6ZSgpKTtcbiAgaW5wdXQuZmlsbCgxKTtcblxuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcbiAgY29uc3Qgd24gPSAod2luZG93IGFzIGFueSlcbiAgd24uc2V0VHJhaW5pbmdEYXRhKClcbiAgd24uc2V0V2VpZ2h0cygpXG4gIHduLnNldEJpYXMoKVxuICB1cGRhdGVVSSgpO1xufVxuXG5jb25zdCB1cGRhdGVVSSA9ICgpID0+IHtcbiAgbmV1cmFsQ29yZS5ldmFsdWF0ZShpbnB1dCk7XG5cbiAgbGV0IGNvbnRlbnQgPSBhZGRMYXllckNvbnRyb2xSb3coXG4gICAgJ0xheWVycycsXG4gICAgbmV1cmFsQ29yZS5nZXRMYXllckNudCgpLnRvU3RyaW5nKCksXG4gICAgJ2FkZE9yUmVtb3ZlTGF5ZXIodHJ1ZSknLFxuICAgICdhZGRPclJlbW92ZUxheWVyKGZhbHNlKSdcbiAgKTtcblxuXG4gIGNvbnRlbnQgKz0gYWRkTGF5ZXJDb250cm9sUm93KFxuICAgICdJbnB1dCBzaXplJyxcbiAgICBuZXVyYWxDb3JlLmdldElucHV0U2l6ZSgpLnRvU3RyaW5nKCksXG4gICAgJ2FkZE9yUmVtb3ZlTmV1cm9uKHRydWUsIDApJyxcbiAgICAnYWRkT3JSZW1vdmVOZXVyb24oZmFsc2UsIDApJ1xuICApO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmV1cmFsQ29yZS5nZXRMYXllckNudCgpIC0gMjsgaSsrKSB7XG4gICAgY29udGVudCArPSBhZGRMYXllckNvbnRyb2xSb3coXG4gICAgICAnSGlkZGVuIGxheWVyIHNpemUnLFxuICAgICAgbmV1cmFsQ29yZS5nZXRIaWRkZW5MYXllclNpemVzKClbaV0udG9TdHJpbmcoKSxcbiAgICAgIGBhZGRPclJlbW92ZU5ldXJvbih0cnVlLCAke2kgKyAxfSlgLFxuICAgICAgYGFkZE9yUmVtb3ZlTmV1cm9uKGZhbHNlLCAke2kgKyAxfSlgXG4gICAgKTtcbiAgfVxuXG4gIGNvbnRlbnQgKz0gYWRkTGF5ZXJDb250cm9sUm93KFxuICAgICdPdXRwdXQgc2l6ZScsXG4gICAgbmV1cmFsQ29yZS5nZXRPdXRwdXRTaXplKCkudG9TdHJpbmcoKSxcbiAgICBgYWRkT3JSZW1vdmVOZXVyb24odHJ1ZSwgJHtuZXVyYWxDb3JlLmdldExheWVyQ250KCkgLSAxfSlgLFxuICAgIGBhZGRPclJlbW92ZU5ldXJvbihmYWxzZSwgJHtuZXVyYWxDb3JlLmdldExheWVyQ250KCkgLSAxfSlgXG4gICk7XG5cbiAgbGF5ZXJDb250cm9scy5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gIGlucHV0Q29udHJvbHMuaW5uZXJIVE1MID0gJyc7XG5cbiAgaWYgKCF2aXN1YWxpemVyLmdldERyYXdhYmxlSW5wdXROZXVyb25zKCkpIHtcbiAgICB2aXN1YWxpemVyLmRyYXcobmV1cmFsQ29yZS5nZXROZXVyb25zKCksIG5ldXJhbENvcmUuZ2V0Q29ubmVjdGlvbnMoKSk7XG4gIH1cblxuXG4gIGNvbnN0IGNvbnRyb2xIZWlnaHQgPSA1MDtcbiAgdmlzdWFsaXplci5nZXREcmF3YWJsZUlucHV0TmV1cm9ucygpLmZvckVhY2goKG5ldXJvbjogRHJhd2FibGVOZXVyb24pID0+IHtcbiAgICBjb25zdCB4ID0gbmV1cm9uLnggLSA4MDtcbiAgICBjb25zdCB5ID0gbmV1cm9uLnkgLSBjb250cm9sSGVpZ2h0IC8gMiArIDU7XG4gICAgaW5wdXRDb250cm9scy5pbm5lckhUTUwgKz0gYDxpbnB1dFxuICAgICAgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogJHt5fXB4OyBsZWZ0OiAke3h9cHg7IGhlaWdodDogJHtjb250cm9sSGVpZ2h0fXB4O1wiIFxuICAgICAgdHlwZT1cInJhbmdlXCIgb3JpZW50PVwidmVydGljYWxcIiBtaW49XCIwXCIgbWF4PVwiMVwiIHZhbHVlPVwiJHtuZXVyb24uYWN0aXZhdGlvbn1cIiBzdGVwPVwiMC4wNVwiIFxuICAgICAgb25pbnB1dD1cInNsaWRlKCR7bmV1cm9uLmlkfSwgdGhpcy52YWx1ZSk7XCI+YDtcbiAgfSlcblxuICBpdGVyLmlubmVySFRNTCA9IG5ldXJhbENvcmUuZ2V0SXRlcmF0aW9uKCkudG9TdHJpbmcoKTtcbiAgY29zdC5pbm5lckhUTUwgPSBuZXVyYWxDb3JlLmdldENvc3QoKS50b1N0cmluZygpO1xuXG4gIC8vIEFkZCB0cmFpbmluZyBzZXQgZGF0YSBsYWJlbHNcbiAgbGV0IGxhYmVscyA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG5ldXJhbENvcmUuZ2V0SW5wdXRTaXplKCk7IGkrKykge1xuICAgIGxhYmVscyArPSBgPHRoIHNjb3BlPSdjb2wnPklucHV0ICR7aX08L3RoPmA7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXVyYWxDb3JlLmdldE91dHB1dFNpemUoKTsgaSsrKSB7XG4gICAgbGFiZWxzICs9IGA8dGggc2NvcGU9J2NvbCcgc3R5bGU9XCJ0ZXh0LWFsaWduOiByaWdodFwiPk91dHB1dCAke2l9PC90aD5gO1xuICB9XG4gIHRyYWluaW5nU2V0TGFiZWxzT3V0cHV0LmlubmVySFRNTCA9IGxhYmVscztcblxuICAvLyBBZGQgdHJhaW5pbmcgZGF0YVxuICBsZXQgdHJhaW5pbmdEYXRhID0gJyc7XG4gIG5ldXJhbENvcmUuZ2V0VHJhaW5pbmdTYW1wbGVzKCkuZm9yRWFjaCgoc2FtcGxlLCBpZHgpID0+IHtcbiAgICB0cmFpbmluZ0RhdGEgKz0gYDx0ciBzdHlsZT1cImN1cnNvcjpwb2ludGVyO1wiIG9uY2xpY2s9XCJhcHBseVRyYWluaW5nU2FtcGxlKCR7aWR4fSlcIj5gO1xuICAgIHNhbXBsZS5pbnB1dC5mb3JFYWNoKHZhbCA9PiB7XG4gICAgICB0cmFpbmluZ0RhdGEgKz0gYDx0ZD4ke3ZhbH08L3RkPmA7XG4gICAgfSk7XG4gICAgc2FtcGxlLm91dHB1dC5mb3JFYWNoKHZhbCA9PiB7XG4gICAgICB0cmFpbmluZ0RhdGEgKz0gYDx0ZCBzdHlsZT1cInRleHQtYWxpZ246IHJpZ2h0XCI+JHt2YWx9PC90ZD5gO1xuICAgIH0pO1xuICAgIHRyYWluaW5nRGF0YSArPSAnPC90cj4nO1xuICB9KTtcbiAgdHJhaW5pbmdTZXREYXRhT3V0cHV0LmlubmVySFRNTCA9IHRyYWluaW5nRGF0YTtcbiAgdmlzdWFsaXplci5kcmF3KG5ldXJhbENvcmUuZ2V0TmV1cm9ucygpLCBuZXVyYWxDb3JlLmdldENvbm5lY3Rpb25zKCkpO1xufVxuXG5jb25zdCBhZGRMYXllckNvbnRyb2xSb3cgPSAobGFiZWw6IHN0cmluZywgc2l6ZTogc3RyaW5nLCBvbmNsaWNrUG9zOiBzdHJpbmcsIG9uY2xpY2tOZWc6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBgPHRyPjx0ZCBhbGlnbj0ncmlnaHQnPjxsYWJlbD4ke2xhYmVsfTo8L2xhYmVsPjxiIHN0eWxlPVwibWFyZ2luOiBhdXRvIDZweFwiPiR7c2l6ZX08L2I+PC90ZD48dGQ+XG4gIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiIG9uY2xpY2s9XCIke29uY2xpY2tOZWd9XCI+LTwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCIgb25jbGljaz1cIiR7b25jbGlja1Bvc31cIj4rPC9idXR0b24+XG4gIDwvZGl2PjwvdGQ+PC90cj5gO1xufSIsImltcG9ydCB7IE5ldXJvbiB9IGZyb20gXCIuL05ldXJvblwiO1xuXG5leHBvcnQgY2xhc3MgQ29ubmVjdGlvbiB7XG4gIHByaXZhdGUgd2VpZ2h0OiBudW1iZXI7XG4gIHByaXZhdGUgaW5wdXROZXVyb246IE5ldXJvbjtcbiAgcHJpdmF0ZSBvdXRwdXROZXVyb246IE5ldXJvbjtcbiAgcHJpdmF0ZSBzYW1wbGVXZWlnaHRDaGFuZ2VzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGlucHV0OiBOZXVyb24sIG91dHB1dDogTmV1cm9uLCB3ZWlnaHQ/OiBudW1iZXIpIHtcbiAgICB0aGlzLmlucHV0TmV1cm9uID0gaW5wdXQ7XG4gICAgdGhpcy5vdXRwdXROZXVyb24gPSBvdXRwdXQ7XG4gICAgdGhpcy53ZWlnaHQgPSB3ZWlnaHQgfHwgTWF0aC5yYW5kb20oKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTYW1wbGVXZWlnaHRDaGFuZ2Uod2VpZ2h0Q2hhbmdlOiBudW1iZXIpIHtcbiAgICB0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMucHVzaCh3ZWlnaHRDaGFuZ2UpO1xuICB9XG5cbiAgcHVibGljIGFwcGx5QXZlcmFnZVdlaWdodENoYW5nZSgpIHtcbiAgICBjb25zdCBjaGFuZ2UgPSAodGhpcy5zYW1wbGVXZWlnaHRDaGFuZ2VzLnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYyArIHZhbCwgMCkgLyB0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMubGVuZ3RoKTtcbiAgICB0aGlzLndlaWdodCArPSBjaGFuZ2U7XG4gICAgdGhpcy5zYW1wbGVXZWlnaHRDaGFuZ2VzID0gW107XG4gIH1cblxuICBwdWJsaWMgZ2V0V2VpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLndlaWdodDtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy53ZWlnaHQgKiB0aGlzLmlucHV0TmV1cm9uLmNhbGN1bGF0ZUFjdGl2YXRpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPdXRwdXROZXVyb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub3V0cHV0TmV1cm9uO1xuICB9XG5cbiAgcHVibGljIGdldElucHV0TmV1cm9uKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0TmV1cm9uO1xuICB9XG59IiwiaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gXCIuL0Nvbm5lY3Rpb25cIjtcblxuZXhwb3J0IGludGVyZmFjZSBBY3RpdmF0aW9uIHtcbiAgZGVyKHg6IG51bWJlcik6IG51bWJlcjtcbiAgb3V0cHV0KHg6IG51bWJlcik6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBTSUdNT0lEOiBBY3RpdmF0aW9uID0ge1xuICBvdXRwdXQ6ICh4OiBudW1iZXIpOiBudW1iZXIgPT4gMSAvICgxICsgTWF0aC5leHAoLXgpKSxcbiAgZGVyOiAoeDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICBsZXQgb3V0cHV0ID0gU0lHTU9JRC5vdXRwdXQoeCk7XG4gICAgcmV0dXJuIG91dHB1dCAqICgxIC0gb3V0cHV0KTtcbiAgfVxufTtcblxuZXhwb3J0IGVudW0gUmVndWxhcml6YXRpb25zIHtcbiAgTDEsXG4gIEwyLFxuICBOT05FLFxufVxuXG5leHBvcnQgY29uc3QgTDFSZWcgPSB7XG4gIGNvc3Q6IChjb25uZWN0aW9uczogQ29ubmVjdGlvbltdW10pOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiBjb25uZWN0aW9ucy5yZWR1Y2UoXG4gICAgICAocHJldiwgY29ubkxheWVyOiBDb25uZWN0aW9uW10pID0+IHtcbiAgICAgICAgcmV0dXJuIHByZXYgKyBjb25uTGF5ZXIucmVkdWNlKChhY2MsIGNvbm4pID0+IGFjYyArIE1hdGguYWJzKGNvbm4uZ2V0V2VpZ2h0KCkpLCAwKVxuICAgICAgfSwgMCkgKiAoMSAvIGdldE51bWJlck9mQ29ubmVjdGlvbnMoY29ubmVjdGlvbnMpKTtcbiAgfSxcblxuICBkZXI6ICh3ZWlnaHQ6IG51bWJlciwgY29ubkNvdW50OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiAoKHdlaWdodCA+IDApID8gMSA6IC0xKSAgKiAoMSAvIGNvbm5Db3VudCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEwyUmVnID0ge1xuICBjb3N0OiAoY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXVtdKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gMSAvIDIgKiBjb25uZWN0aW9ucy5yZWR1Y2UoXG4gICAgICAocHJldiwgY29ubkxheWVyOiBDb25uZWN0aW9uW10pID0+IHtcbiAgICAgICAgcmV0dXJuIHByZXYgKyBjb25uTGF5ZXIucmVkdWNlKChhY2MsIGNvbm4pID0+IGFjYyArIGNvbm4uZ2V0V2VpZ2h0KCkgKiogMiwgMClcbiAgICAgIH0sIDApICogKDEgLyBnZXROdW1iZXJPZkNvbm5lY3Rpb25zKGNvbm5lY3Rpb25zKSk7XG4gIH0sXG5cbiAgZGVyOiAoY3VycldlaWdodDogbnVtYmVyLCBjb25uQ291bnQ6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIGN1cnJXZWlnaHQgKiAoMSAvIGNvbm5Db3VudCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRyYWluU2FtcGxlIHtcbiAgcHVibGljIGlucHV0OiBudW1iZXJbXTtcbiAgcHVibGljIG91dHB1dDogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IoaW5wdXQ6IG51bWJlcltdLCBvdXRwdXQ6IG51bWJlcltdKSB7XG4gICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgIHRoaXMub3V0cHV0ID0gb3V0cHV0O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZXROdW1iZXJPZkNvbm5lY3Rpb25zID0gKGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW11bXSk6IG51bWJlciA9PiB7XG4gIHJldHVybiBjb25uZWN0aW9ucy5yZWR1Y2UoKGFjYywgY29ubikgPT4gYWNjICsgY29ubi5sZW5ndGgsIDApO1xufSIsImltcG9ydCB7IE5ldXJvbiB9IGZyb20gXCIuL05ldXJvblwiO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gXCIuL0Nvbm5lY3Rpb25cIjtcbmltcG9ydCB7IFRyYWluU2FtcGxlLCBTSUdNT0lELCBSZWd1bGFyaXphdGlvbnMsIEwyUmVnLCBnZXROdW1iZXJPZkNvbm5lY3Rpb25zLCBMMVJlZyB9IGZyb20gXCIuL0hlbHBlck9iamVjdHNcIjtcblxuZXhwb3J0IGNsYXNzIE5ldXJhbENvcmUge1xuICBwcml2YXRlIGlucHV0U2l6ZTogbnVtYmVyO1xuICBwcml2YXRlIGhpZGRlbkxheWVyU2l6ZXM6IG51bWJlcltdO1xuICBwcml2YXRlIG91dHB1dFNpemU6IG51bWJlcjtcblxuICBwcml2YXRlIGxheWVyQ250OiBudW1iZXI7XG4gIHByaXZhdGUgYmlhc0xpc3Q6IG51bWJlcltdW107XG4gIHByaXZhdGUgd2VpZ2h0TGlzdDogbnVtYmVyW11bXVtdO1xuXG4gIHByaXZhdGUgaXRlckNudCA9IDA7XG5cbiAgcHJpdmF0ZSByYXRlID0gMTtcbiAgcHJpdmF0ZSBsYW1iZGEgPSAwLjAwMTtcbiAgcHJpdmF0ZSByZWdUeXBlOiBSZWd1bGFyaXphdGlvbnMgPSBSZWd1bGFyaXphdGlvbnMuTk9ORTtcblxuICBwcml2YXRlIGJpYXNOZXVyb24gPSBuZXcgTmV1cm9uKCdiaWFzJywgdHJ1ZSk7XG4gIHByaXZhdGUgbmV1cm9uczogTmV1cm9uW11bXSA9IFtdO1xuICBwcml2YXRlIGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW11bXSA9IFtdO1xuXG4gIHByaXZhdGUgdHJhaW5TYW1wbGVzOiBUcmFpblNhbXBsZVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoaW5wdXRTaXplOiBudW1iZXIsIGhpZGRlbkxheWVyU2l6ZXM6IG51bWJlcltdLCBvdXRwdXRTaXplOiBudW1iZXIpIHtcbiAgICB0aGlzLmlucHV0U2l6ZSA9IGlucHV0U2l6ZTtcbiAgICB0aGlzLmhpZGRlbkxheWVyU2l6ZXMgPSBoaWRkZW5MYXllclNpemVzO1xuICAgIHRoaXMub3V0cHV0U2l6ZSA9IG91dHB1dFNpemU7XG4gICAgdGhpcy5sYXllckNudCA9IGhpZGRlbkxheWVyU2l6ZXMubGVuZ3RoICsgMjtcblxuICAgIC8vIFJlc2V0XG4gICAgdGhpcy5uZXVyb25zID0gW107XG4gICAgdGhpcy5jb25uZWN0aW9ucyA9IFtdO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgLy8gQ3JlYXRlIHRoZSBuZXVyb25zXG4gICAgZm9yIChsZXQgbCA9IDA7IGwgPCB0aGlzLmxheWVyQ250OyBsKyspIHtcbiAgICAgIC8vIEhvdyBtYW55IG5ldXJvbnMgYXJlIGluIGVhY2ggbGF5ZXI/XG4gICAgICBsZXQgbmV1cm9uc0luTGF5ZXJDbnQgPSAwO1xuICAgICAgc3dpdGNoIChsKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBuZXVyb25zSW5MYXllckNudCA9IHRoaXMuaW5wdXRTaXplO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRoaXMuaGlkZGVuTGF5ZXJTaXplcy5sZW5ndGggKyAxOlxuICAgICAgICAgIG5ldXJvbnNJbkxheWVyQ250ID0gdGhpcy5vdXRwdXRTaXplO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG5ldXJvbnNJbkxheWVyQ250ID0gdGhpcy5oaWRkZW5MYXllclNpemVzW2wgLSAxXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdGhpcy5uZXVyb25zW2xdID0gW107XG5cbiAgICAgIC8vIENyZWF0ZSB0aGVtXG4gICAgICBmb3IgKGxldCBuID0gMDsgbiA8IG5ldXJvbnNJbkxheWVyQ250OyBuKyspIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xdW25dID0gbmV3IE5ldXJvbihgTmV1cm9uJHtsfSR7bn1gKTtcbiAgICAgICAgaWYgKGwgPT0gMCkge1xuICAgICAgICAgIHRoaXMubmV1cm9uc1tsXVtuXS5zZXRBc0lucHV0TmV1cm9uKDApOyAvLyBqdXN0IHRvIGF2b2lkIGNyYXNoZXMsIHRoZSAwIHNob3VsZCBiZSBvdmVycmlkZW4gbGF0ZXIgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgdGhlIENvbm5lY3Rpb25zXG4gICAgdGhpcy5jcmVhdGVDb25uZWN0aW9ucygwLCB0aGlzLmxheWVyQ250IC0gMSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0V2VpZ2h0cygpIHtcbiAgICBsZXQgdGVtcDogbnVtYmVyW11bXVtdO1xuICAgIHRoaXMud2VpZ2h0TGlzdCA9IHRlbXA7XG4gIH1cblxuICBwdWJsaWMgc2V0V2VpZ2h0cyh3ZWlnaHRzOiBudW1iZXJbXVtdW10pIHtcbiAgICB0aGlzLnJlc2V0V2VpZ2h0cygpO1xuICAgIGlmICh3ZWlnaHRzLmxlbmd0aCAhPT0gdGhpcy5sYXllckNudCAtIDEpIHtcbiAgICAgIHRocm93ICdXZWlnaHQgY291bnQgZG9lcyBub3QgbWF0Y2ggbGF5ZXIgY291bnQnO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlaWdodHNbMF0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh3ZWlnaHRzWzBdW2ldLmxlbmd0aCAhPT0gdGhpcy5pbnB1dFNpemUpIHtcbiAgICAgICAgdGhyb3cgYFdlaWdodHMgYXQgaGlkZGVuIGxheWVyIDEgb2YgbmV1cm9uICR7aSsxfSBkbyBub3QgbWF0Y2ggdGhlIGlucHV0IGNvdW50YDtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgc2l6ZSA9IDE7IHNpemUgPCB0aGlzLmhpZGRlbkxheWVyU2l6ZXMubGVuZ3RoOyBzaXplKyspIHtcbiAgICAgIGlmICh3ZWlnaHRzW3NpemVdLmxlbmd0aCAhPT0gdGhpcy5oaWRkZW5MYXllclNpemVzW3NpemVdKSB7XG4gICAgICAgIHRocm93IGBXZWlnaHRzIGF0IGhpZGRlbiBsYXllciAke3NpemUrMX0gZG8gbm90IG1hdGNoIHRoZSBuZXVyb24gY291bnRgO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWlnaHRzW3NpemVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh3ZWlnaHRzW3NpemVdW2ldLmxlbmd0aCAhPT0gdGhpcy5oaWRkZW5MYXllclNpemVzW3NpemUtMV0pIHtcbiAgICAgICAgICB0aHJvdyBgV2VpZ2h0cyBhdCBoaWRkZW4gbGF5ZXIgJHtzaXplKzF9IG9mIG5ldXJvbiAke2krMX0gZG8gbm90IG1hdGNoIHRoZSBpbnB1dCBjb3VudGA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWlnaHRzW3dlaWdodHMubGVuZ3RoIC0gMV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh3ZWlnaHRzW3dlaWdodHMubGVuZ3RoIC0gMV1baV0ubGVuZ3RoICE9PSB0aGlzLmhpZGRlbkxheWVyU2l6ZXNbdGhpcy5oaWRkZW5MYXllclNpemVzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgIHRocm93IGBXZWlnaHRzIGF0IG91dHB1dCBsYXllciBvZiBuZXVyb24gJHtpKzF9IGRvIG5vdCBtYXRjaCB0aGUgaW5wdXQgY291bnRgO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMud2VpZ2h0TGlzdCA9IHdlaWdodHM7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0Qmlhc0xpc3QoKSB7XG4gICAgbGV0IHRlbXA6IG51bWJlcltdW107XG4gICAgdGhpcy5iaWFzTGlzdCA9IHRlbXA7XG4gIH1cbiAgcHVibGljIHNldEJpYXMoYmlhc0xpc3Q6IG51bWJlcltdW10pIHtcbiAgICB0aGlzLnJlc2V0Qmlhc0xpc3QoKTtcbiAgICBpZiAoYmlhc0xpc3QubGVuZ3RoICE9PSB0aGlzLmhpZGRlbkxheWVyU2l6ZXMubGVuZ3RoICsgMSkge1xuICAgICAgdGhyb3cgJ0JpYXMgY291bnQgZG9lcyBub3QgbWF0Y2ggbGF5ZXIgY291bnQnO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpYXNMaXN0Lmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgaWYgKGJpYXNMaXN0W2ldLmxlbmd0aCAhPT0gdGhpcy5oaWRkZW5MYXllclNpemVzW2ldKSB7XG4gICAgICAgIHRocm93IGBCaWFzIGF0IGxheWVyICR7aSsxfSBkbyBub3QgbWF0Y2ggdGhlIGhpZGRlbiBsYXllciBjb3VudGA7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChiaWFzTGlzdFtiaWFzTGlzdC5sZW5ndGggLSAxXS5sZW5ndGggIT09IHRoaXMub3V0cHV0U2l6ZSkge1xuICAgICAgdGhyb3cgYEJpYXMgYXQgb3V0cHV0IGxheWVyIGRvIG5vdCBtYXRjaCB0aGUgb3V0cHV0IGxheWVyIGNvdW50YDtcbiAgICB9XG5cbiAgICB0aGlzLmJpYXNMaXN0ID0gYmlhc0xpc3Q7XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGUoaW5wdXQ6IG51bWJlcltdKTogbnVtYmVyW10ge1xuICAgIGlmIChpbnB1dC5sZW5ndGggIT0gdGhpcy5pbnB1dFNpemUpIHtcbiAgICAgIHRocm93ICdJbnB1dCBzaXplIGRvZXMgbm90IG1hdGNoJztcbiAgICB9XG4gICAgLy8gUmVzZXQsIHNvIGVhY2ggbmV1cm9uIGlzIHJlY2FsY3VsYXRlZFxuICAgIHRoaXMubmV1cm9ucy5mb3JFYWNoKGxheWVyID0+IHsgbGF5ZXIuZm9yRWFjaChuZXVyb24gPT4gbmV1cm9uLnJlc2V0KCkpIH0pXG4gICAgLy8gU2V0IGlucHV0IGxheWVyXG4gICAgdGhpcy5uZXVyb25zWzBdLmZvckVhY2goKG5ldXJvbiwgaWR4KSA9PiB7IG5ldXJvbi5zZXRJbnB1dChpbnB1dFtpZHhdKSB9KTtcblxuICAgIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250IC0gMV0uZm9yRWFjaChuZXVyb24gPT4ge1xuICAgICAgbmV1cm9uLmNhbGN1bGF0ZUFjdGl2YXRpb24oKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLm1hcChuZXVyb24gPT4gbmV1cm9uLmdldEFjdGl2YXRpb24oKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkVHJhaW5pbmdTZXQoaW5wdXQ6IG51bWJlcltdLCBvdXRwdXQ6IG51bWJlcltdKSB7XG4gICAgaWYgKGlucHV0Lmxlbmd0aCAhPSB0aGlzLmlucHV0U2l6ZSkge1xuICAgICAgdGhyb3cgJ0lucHV0IHNpemUgZG9lcyBub3QgbWF0Y2gnO1xuICAgIH0gZWxzZSBpZiAob3V0cHV0Lmxlbmd0aCAhPSB0aGlzLm91dHB1dFNpemUpIHtcbiAgICAgIHRocm93ICdPdXRwdXQgc2l6ZSBkb2VzIG5vdCBtYXRjaCc7XG4gICAgfVxuXG4gICAgdGhpcy50cmFpblNhbXBsZXMucHVzaChuZXcgVHJhaW5TYW1wbGUoaW5wdXQsIG91dHB1dCkpXG4gIH1cblxuICBwdWJsaWMgZ2V0Q29zdCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLnRyYWluU2FtcGxlcy5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgY29uc3QgY29zdFN1bSA9IHRoaXMudHJhaW5TYW1wbGVzLnJlZHVjZSgoY29zdFN1bSwgc2FtcGxlKSA9PiB7IC8vIEFkZCB1cCBhbGwgc2FtcGxlc1xuICAgICAgdGhpcy5ldmFsdWF0ZShzYW1wbGUuaW5wdXQpO1xuICAgICAgcmV0dXJuIGNvc3RTdW0gKyB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLnJlZHVjZSgoYWNjLCBuZXVyb24sIGkpID0+IHsgLy8gQWRkIHVwIGFsbCBvdXRwdXQgbmV1cm9uc1xuICAgICAgICByZXR1cm4gYWNjICsgKG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkgLSBzYW1wbGUub3V0cHV0W2ldKSAqKiAyO1xuICAgICAgfSwgMCk7XG4gICAgfSwgMCk7XG5cbiAgICAvLyBSZWd1bGFyaXphdGlvblxuICAgIGxldCByZWdDb3N0ID0gMDtcbiAgICBzd2l0Y2ggKHRoaXMucmVnVHlwZSkge1xuICAgICAgY2FzZSBSZWd1bGFyaXphdGlvbnMuTDE6XG4gICAgICAgIHJlZ0Nvc3QgPSBMMVJlZy5jb3N0KHRoaXMuY29ubmVjdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUmVndWxhcml6YXRpb25zLkwyOlxuICAgICAgICByZWdDb3N0ID0gTDJSZWcuY29zdCh0aGlzLmNvbm5lY3Rpb25zKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFJlZ3VsYXJpemF0aW9ucy5OT05FOlxuICAgICAgICByZWdDb3N0ID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIDEgLyAyICogY29zdFN1bSAqICgxIC8gdGhpcy50cmFpblNhbXBsZXMubGVuZ3RoKSArXG4gICAgICB0aGlzLmxhbWJkYSAqIHJlZ0Nvc3Q7XG4gIH1cblxuICBwdWJsaWMgdHJhaW4oKSB7XG4gICAgdGhpcy50cmFpblNhbXBsZXMuZm9yRWFjaCgoc2FtcGxlKSA9PiB7XG4gICAgICB0aGlzLmV2YWx1YXRlKHNhbXBsZS5pbnB1dClcblxuICAgICAgLy8gQ2FsY3VsYXRlIHNpZ21hcyBvZiB0aGUgbGFzdCBsYXllclxuICAgICAgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5mb3JFYWNoKChuZXVyb24sIGlkeCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdTaWdtYSA9XG4gICAgICAgICAgKHNhbXBsZS5vdXRwdXRbaWR4XSAtIG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkpICogU0lHTU9JRC5kZXIobmV1cm9uLmdldEFjdGl2YXRpb24oKSk7XG4gICAgICAgIG5ldXJvbi5zZXRTaWdtYShuZXdTaWdtYSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gQ2FsY3VsYXRlIHNpZ21hcyBmb3IgZWFjaCBuZXVyb24gaW4gdGhlIGxvd2VyIGxheWVyc1xuICAgICAgZm9yIChsZXQgbCA9IHRoaXMubGF5ZXJDbnQgLSAyOyBsID49IDA7IGwtLSkge1xuICAgICAgICB0aGlzLm5ldXJvbnNbbF0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmV3U2lnbWEgPVxuICAgICAgICAgICAgbmV1cm9uLmdldE91dHB1dHMoKS5yZWR1Y2UoKGFjYywgY29ubmVjdGlvbikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gYWNjICsgY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXRTaWdtYSgpICogY29ubmVjdGlvbi5nZXRXZWlnaHQoKTtcbiAgICAgICAgICAgIH0sIDApICogU0lHTU9JRC5kZXIobmV1cm9uLmdldEFjdGl2YXRpb24oKSk7XG4gICAgICAgICAgbmV1cm9uLnNldFNpZ21hKG5ld1NpZ21hKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFjY3VtdWxhdGUgYWxsIHdlaWdodCB1cGRhdGVzXG4gICAgICB0aGlzLmNvbm5lY3Rpb25zLmZvckVhY2goKGNvbm5MYXllcikgPT4ge1xuICAgICAgICBjb25uTGF5ZXIuZm9yRWFjaCgoY29ubmVjdGlvbikgPT4ge1xuXG4gICAgICAgICAgbGV0IHJlZ0RlciA9IDA7XG4gICAgICAgICAgc3dpdGNoICh0aGlzLnJlZ1R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgUmVndWxhcml6YXRpb25zLkwxOlxuICAgICAgICAgICAgICByZWdEZXIgPSBMMVJlZy5kZXIoY29ubmVjdGlvbi5nZXRXZWlnaHQoKSwgZ2V0TnVtYmVyT2ZDb25uZWN0aW9ucyh0aGlzLmNvbm5lY3Rpb25zKSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBSZWd1bGFyaXphdGlvbnMuTDI6XG4gICAgICAgICAgICAgIHJlZ0RlciA9IEwyUmVnLmRlcihjb25uZWN0aW9uLmdldFdlaWdodCgpLCBnZXROdW1iZXJPZkNvbm5lY3Rpb25zKHRoaXMuY29ubmVjdGlvbnMpKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFJlZ3VsYXJpemF0aW9ucy5OT05FOlxuICAgICAgICAgICAgICByZWdEZXIgPSAwO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCB3ZWlnaHRDaGFuZ2UgPVxuICAgICAgICAgICAgY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXRTaWdtYSgpICpcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS5nZXRBY3RpdmF0aW9uKCkgKlxuICAgICAgICAgICAgdGhpcy5yYXRlIC1cbiAgICAgICAgICAgIHRoaXMubGFtYmRhICogcmVnRGVyOyAvLyBSZWd1bGFyaXphdGlvblxuXG4gICAgICAgICAgY29ubmVjdGlvbi5hZGRTYW1wbGVXZWlnaHRDaGFuZ2Uod2VpZ2h0Q2hhbmdlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFVmZiwgbGV0J3MgaG9wZSBldmVyeXRoaW5nIHdvcmtzIGFuZCBhcHBseSB0aGUgbWFnaWNcbiAgICB0aGlzLmNvbm5lY3Rpb25zLmZvckVhY2goKGNvbm5MYXllcikgPT4ge1xuICAgICAgY29ubkxheWVyLmZvckVhY2goKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgY29ubmVjdGlvbi5hcHBseUF2ZXJhZ2VXZWlnaHRDaGFuZ2UoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pdGVyQ250Kys7XG4gIH1cblxuICBwdWJsaWMgYWRkT3JSZW1vdmVMYXllcihhZGQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoYWRkKSB7XG4gICAgICBjb25zdCBuZXdMYXllclNpemUgPSAzO1xuICAgICAgdGhpcy5oaWRkZW5MYXllclNpemVzLnB1c2gobmV3TGF5ZXJTaXplKTtcbiAgICAgIHRoaXMubGF5ZXJDbnQrKztcblxuICAgICAgLy8gQ3JlYXRlIHRoZSBuZXcgbmV1cm9uc1xuICAgICAgdGhpcy5jcmVhdGVMYXllck9mTmV1cm9ucyh0aGlzLmxheWVyQ250IC0gMiwgbmV3TGF5ZXJTaXplKTtcblxuICAgICAgLy8gUmVjcmVhdGUgdGhlIGxhc3QgbGF5ZXJcbiAgICAgIHRoaXMuY3JlYXRlTGF5ZXJPZk5ldXJvbnModGhpcy5sYXllckNudCAtIDEsIHRoaXMub3V0cHV0U2l6ZSk7XG5cbiAgICAgIC8vIFJlY3JlYXRlIGFsbCBuZWNlc3NhcnkgY29ubmVjdGlvbnNcbiAgICAgIHRoaXMuY3JlYXRlQ29ubmVjdGlvbnModGhpcy5sYXllckNudCAtIDMsIHRoaXMubGF5ZXJDbnQgLSAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMubGF5ZXJDbnQgPT0gMikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplcy5wb3AoKTtcbiAgICAgIHRoaXMubGF5ZXJDbnQtLTtcbiAgICAgIHRoaXMubmV1cm9ucy5wb3AoKTtcbiAgICAgIHRoaXMuY29ubmVjdGlvbnMucG9wKCk7XG5cbiAgICAgIC8vIFJlY3JlYXRlIHRoZSBsYXN0IGxheWVyXG4gICAgICB0aGlzLmNyZWF0ZUxheWVyT2ZOZXVyb25zKHRoaXMubGF5ZXJDbnQgLSAxLCB0aGlzLm91dHB1dFNpemUpO1xuXG4gICAgICAvLyBSZWNyZWF0ZSBhbGwgbmVjZXNzYXJ5IGNvbm5lY3Rpb25zXG4gICAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25zKHRoaXMubGF5ZXJDbnQgLSAyLCB0aGlzLmxheWVyQ250IC0gMSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVGhpcyBmdW5jdGlvbiBpcyB2ZXJ5IGxvbmcgYW5kIHVnbHksIEkgZG9udCB3YW50IHRvIHNpbXBseSByZWJ1aWxkIHRoZSBuZXR3b3JrIGJlY2F1c2UgSSB3YW50IHRvIGtlZXAgdGhlIHdlaWdodHNcbiAgcHVibGljIGFkZE9yUmVtb3ZlTmV1cm9uKGFkZDogYm9vbGVhbiwgbGF5ZXJJZHg6IG51bWJlcikge1xuICAgIGNvbnN0IGlzSW5wdXQgPSBsYXllcklkeCA9PSAwO1xuICAgIGNvbnN0IGlzT3V0cHV0ID0gbGF5ZXJJZHggPT0gdGhpcy5sYXllckNudCAtIDE7XG4gICAgY29uc3QgaXNIaWRkZW4gPSAhaXNJbnB1dCAmJiAhaXNPdXRwdXQ7XG5cbiAgICBjb25zdCBzaXplQ2hhbmdlID0gKGFkZCkgPyAxIDogLTFcblxuICAgIGlmIChpc0hpZGRlbikge1xuICAgICAgdGhpcy5oaWRkZW5MYXllclNpemVzW2xheWVySWR4IC0gMV0gKz0gc2l6ZUNoYW5nZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNJbnB1dCkge1xuICAgICAgdGhpcy5pbnB1dFNpemUgKz0gc2l6ZUNoYW5nZTtcbiAgICAgIHRoaXMudHJhaW5TYW1wbGVzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3V0cHV0U2l6ZSArPSBzaXplQ2hhbmdlO1xuICAgICAgdGhpcy50cmFpblNhbXBsZXMgPSBbXTtcbiAgICB9XG5cbiAgICBpZiAoYWRkKSB7XG4gICAgICBsZXQgbmV3TmV1cm9uSWR4O1xuXG4gICAgICBpZiAoaXNIaWRkZW4pIHtcbiAgICAgICAgbmV3TmV1cm9uSWR4ID0gdGhpcy5oaWRkZW5MYXllclNpemVzW2xheWVySWR4IC0gMV0gLSAxO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNJbnB1dCkge1xuICAgICAgICBuZXdOZXVyb25JZHggPSB0aGlzLmlucHV0U2l6ZSAtIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdOZXVyb25JZHggPSB0aGlzLm91dHB1dFNpemUgLSAxO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdOZXVyb24gPSBuZXcgTmV1cm9uKGBOZXVyb24ke2xheWVySWR4fSR7bmV3TmV1cm9uSWR4fWApO1xuICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4XVtuZXdOZXVyb25JZHhdID0gbmV3TmV1cm9uO1xuXG4gICAgICBpZiAoaXNJbnB1dClcbiAgICAgICAgbmV3TmV1cm9uLnNldEFzSW5wdXROZXVyb24oMCk7XG5cblxuICAgICAgLy8vLyBBZGQgY29ubmVjdGlvbnMgZnJvbSB0aGUgcHJldiBsYXllclxuICAgICAgaWYgKCFpc0lucHV0KSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeCAtIDFdLmZvckVhY2goKG5ldXJvbiwgaWR4KSA9PiB7XG4gICAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKG5ldXJvbiwgbmV3TmV1cm9uKTtcbiAgICAgICAgICBuZXVyb24uYWRkT3V0cHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICAgIG5ld05ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4IC0gMV0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIERvbnQgZm9yZ2V0IHRoZSBiaWFzXG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbih0aGlzLmJpYXNOZXVyb24sIG5ld05ldXJvbik7XG4gICAgICAgIG5ld05ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeCAtIDFdLnB1c2goY29ubmVjdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNPdXRwdXQpIHtcbiAgICAgICAgLy8vLyBBZGQgY29ubmVjdGlvbnMgdG8gdGhlIG5leHQgbGF5ZXJcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4ICsgMV0uZm9yRWFjaCgobmV1cm9uLCBpZHgpID0+IHtcbiAgICAgICAgICBjb25zdCBjb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb24obmV3TmV1cm9uLCBuZXVyb24pO1xuICAgICAgICAgIG5ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4XS5wdXNoKGNvbm5lY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVtb3ZlZE5ldXJvbiA9IHRoaXMubmV1cm9uc1tsYXllcklkeF0ucG9wKCk7XG4gICAgICAvLyBSZW1vdmUgb3V0cHV0cyBmcm9tIHRoZSBwcmV2IGxheWVyXG4gICAgICBpZiAoIWlzSW5wdXQpIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4IC0gMV0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgbmV1cm9uLnNldE91dHB1dHMobmV1cm9uLmdldE91dHB1dHMoKS5maWx0ZXIoKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLmdldE91dHB1dE5ldXJvbigpLmdldE5hbWUoKSAhPSByZW1vdmVkTmV1cm9uLmdldE5hbWUoKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmUgaW5wdXQgaW4gdGhlIG5leHQgbGF5ZXJcbiAgICAgIGlmICghaXNPdXRwdXQpIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4ICsgMV0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgbmV1cm9uLnNldElucHV0cyhuZXVyb24uZ2V0SW5wdXRzKCkuZmlsdGVyKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5nZXRJbnB1dE5ldXJvbigpLmdldE5hbWUoKSAhPSByZW1vdmVkTmV1cm9uLmdldE5hbWUoKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmUgdGhlIHVudXNlZCBjb25uZWN0aW9uc1xuICAgICAgaWYgKCFpc0lucHV0KSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbGF5ZXJJZHggLSAxXSA9IHRoaXMuY29ubmVjdGlvbnNbbGF5ZXJJZHggLSAxXS5maWx0ZXIoKGNvbm5lY3Rpb246IENvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXROYW1lKCkgIT0gcmVtb3ZlZE5ldXJvbi5nZXROYW1lKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzT3V0cHV0KSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbGF5ZXJJZHhdID0gdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeF0uZmlsdGVyKChjb25uZWN0aW9uOiBDb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS5nZXROYW1lKCkgIT0gcmVtb3ZlZE5ldXJvbi5nZXROYW1lKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLml0ZXJDbnQgPSAwO1xuICAgIHRoaXMuY3JlYXRlQ29ubmVjdGlvbnMoMCwgdGhpcy5sYXllckNudCAtIDEpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVMYXllck9mTmV1cm9ucyhsYXllcklkeDogbnVtYmVyLCBsYXllclNpemU6IG51bWJlcikge1xuICAgIHRoaXMubmV1cm9uc1tsYXllcklkeF0gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVyU2l6ZTsgaSsrKSB7XG4gICAgICB0aGlzLm5ldXJvbnNbbGF5ZXJJZHhdW2ldID0gbmV3IE5ldXJvbihgTmV1cm9uJHtsYXllcklkeH0ke2l9YCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDb25uZWN0aW9ucyhmaXJzdExheWVyLCBsYXN0TGF5ZXIpIHtcbiAgICBmb3IgKGxldCBsID0gZmlyc3RMYXllcjsgbCA8IGxhc3RMYXllcjsgbCsrKSB7XG4gICAgICAvLyBGb3IgZWFjaCBuZXVyb24gaW4gdGhlIGxheWVyIGFkZCBhbGwgY29ubmVjdGlvbnMgdG8gbmV1cm9ucyBpbiB0aGUgbmV4dCBsYXllclxuICAgICAgdGhpcy5jb25uZWN0aW9uc1tsXSA9IFtdO1xuXG4gICAgICAvLyBSZXNldCBpbnB1dCAmIG91dHB1dHNcbiAgICAgIHRoaXMubmV1cm9uc1tsICsgMV0uZm9yRWFjaChuZXh0TmV1cm9uID0+IHsgbmV4dE5ldXJvbi5yZXNldElucHV0cygpIH0pO1xuICAgICAgdGhpcy5uZXVyb25zW2xdLmZvckVhY2gobmV4dE5ldXJvbiA9PiB7IG5leHROZXVyb24ucmVzZXRPdXRwdXRzKCkgfSk7XG5cbiAgICAgIHRoaXMubmV1cm9uc1tsICsgMV0uZm9yRWFjaCgobmV4dE5ldXJvbiwgdG9JZHgpID0+IHsgLy8gSWYgeW91IHdvbmRlciB3aHkgdGhpcyBjeWNsZXMgYXJlIHN3aXRjaGVkLCBpdCdzIGJlY2F1c2Ugb2YgdGhlIGJpYXNcbiAgICAgICAgdGhpcy5uZXVyb25zW2xdLmZvckVhY2goKGN1cnJOZXVyb24sIGZyb21JZHgpID0+IHtcbiAgICAgICAgICBsZXQgd2VpZ2h0O1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB3ZWlnaHQgPSB0aGlzLndlaWdodExpc3RbbF1bdG9JZHhdW2Zyb21JZHhdXG4gICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAvLyBIYXBwZW5zIGlmIG5ldyBsYXllcnMgaGF2ZSBiZWVuIGFkZGVkIC0gdXNlIGRlZmF1bHQgdmFsdWUgZnJvbSBDb25uZWN0aW9uXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbihjdXJyTmV1cm9uLCBuZXh0TmV1cm9uLCB3ZWlnaHQpXG4gICAgICAgICAgY3Vyck5ldXJvbi5hZGRPdXRwdXQoY29ubmVjdGlvbik7XG4gICAgICAgICAgbmV4dE5ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xdLnB1c2goY29ubmVjdGlvbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBiaWFzO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGJpYXMgPSB0aGlzLmJpYXNMaXN0W2xdW3RvSWR4XTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgLy8gSGFwcGVucyBpZiBuZXcgbGF5ZXJzIGhhdmUgYmVlbiBhZGRlZCAtIHVzZSBkZWZhdWx0IHZhbHVlIGZyb20gQ29ubmVjdGlvblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGJpYXMgbmV1cm9uIHRvIGVhY2ggbGF5ZXJcbiAgICAgICAgY29uc3QgYmlhc0Nvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbih0aGlzLmJpYXNOZXVyb24sIG5leHROZXVyb24sIGJpYXMpO1xuICAgICAgICBuZXh0TmV1cm9uLmFkZElucHV0KGJpYXNDb25uZWN0aW9uKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsXS5wdXNoKGJpYXNDb25uZWN0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXROZXVyb25zKCkge1xuICAgIHJldHVybiB0aGlzLm5ldXJvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29ubmVjdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0SW5wdXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0U2l6ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPdXRwdXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLm91dHB1dFNpemU7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGF5ZXJDbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMubGF5ZXJDbnQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0SGlkZGVuTGF5ZXJTaXplcygpIHtcbiAgICByZXR1cm4gdGhpcy5oaWRkZW5MYXllclNpemVzO1xuICB9XG5cbiAgcHVibGljIHNldFJhdGUobmV3UmF0ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5yYXRlID0gbmV3UmF0ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJdGVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlckNudDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRSZWd1bGFyaXphdGlvblR5cGUocmVnVHlwZTogUmVndWxhcml6YXRpb25zKSB7XG4gICAgdGhpcy5yZWdUeXBlID0gcmVnVHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRSZWd1bGFyaXphdGlvblJhdGUocmF0ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5sYW1iZGEgPSByYXRlO1xuICB9XG5cbiAgcHVibGljIGdldFRyYWluaW5nU2FtcGxlcygpIHtcbiAgICByZXR1cm4gdGhpcy50cmFpblNhbXBsZXM7XG4gIH1cblxuICBwdWJsaWMgc2V0VHJhaW5pbmdTYW1wbGVzKHNhbXBsZXM6IFRyYWluU2FtcGxlW10pIHtcbiAgICB0aGlzLnRyYWluU2FtcGxlcyA9IHNhbXBsZXM7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tIFwiLi9Db25uZWN0aW9uXCI7XG5pbXBvcnQgeyBTSUdNT0lEIH0gZnJvbSBcIi4vSGVscGVyT2JqZWN0c1wiO1xuXG5leHBvcnQgY2xhc3MgTmV1cm9uIHtcbiAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBhY3RpdmF0aW9uOiBudW1iZXI7XG4gIHByaXZhdGUgaW5wdXRzOiBDb25uZWN0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBvdXRwdXRzOiBDb25uZWN0aW9uW10gPSBbXTtcblxuICAvLyBUaGUgZGVyaXZhdGlvbiBvZiBDIHdpdGggcmVzcGVjdCB0byB6XG4gIHByaXZhdGUgc2lnbWE6IG51bWJlcjtcbiAgcHJpdmF0ZSBpc0lucHV0OiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaXNDYWxjdWxhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaXNCaWFzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBpc0JpYXMgPSBmYWxzZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pc0JpYXMgPSBpc0JpYXM7XG4gIH07XG5cbiAgcHVibGljIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJc0JpYXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNCaWFzO1xuICB9XG5cbiAgcHVibGljIHNldEFzSW5wdXROZXVyb24oYWN0aXZhdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy5pc0lucHV0ID0gdHJ1ZTtcbiAgICB0aGlzLmFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICAgIHRoaXMuaW5wdXRzID0gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbnB1dChhY3RpdmF0aW9uOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuaXNJbnB1dCkge1xuICAgICAgdGhyb3cgJ0Nhbm5vdCBzZXQgYWN0aXZhdGlvbiBvZiBub24taW5wdXQgbmV1cm9uJztcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICB9XG5cbiAgcHVibGljIHNldFNpZ21hKHNpZ21hOiBudW1iZXIpIHtcbiAgICB0aGlzLnNpZ21hID0gc2lnbWE7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5wdXQoaW5wdXQ6IENvbm5lY3Rpb24pIHtcbiAgICB0aGlzLmlucHV0cy5wdXNoKGlucHV0KTtcbiAgfTtcblxuICBwdWJsaWMgZ2V0SW5wdXRzKCk6IENvbm5lY3Rpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRzO1xuICB9XG5cbiAgcHVibGljIGFkZE91dHB1dChvdXRwdXQ6IENvbm5lY3Rpb24pIHtcbiAgICB0aGlzLm91dHB1dHMucHVzaChvdXRwdXQpO1xuICB9XG5cbiAgcHVibGljIGdldE91dHB1dHMoKTogQ29ubmVjdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5vdXRwdXRzO1xuICB9XG5cbiAgcHVibGljIHNldE91dHB1dHMoY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXSkge1xuICAgIHRoaXMub3V0cHV0cyA9IGNvbm5lY3Rpb25zO1xuICB9XG5cbiAgcHVibGljIHNldElucHV0cyhjb25uZWN0aW9uczogQ29ubmVjdGlvbltdKSB7XG4gICAgdGhpcy5pbnB1dHMgPSBjb25uZWN0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyByZXNldElucHV0cygpIHtcbiAgICB0aGlzLmlucHV0cyA9IFtdO1xuICB9XG5cbiAgcHVibGljIHJlc2V0T3V0cHV0cygpIHtcbiAgICB0aGlzLm91dHB1dHMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGdldEFjdGl2YXRpb24oKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5pc0JpYXMpIHRoaXMuYWN0aXZhdGlvbiA9IDE7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZhdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTaWdtYSgpIHtcbiAgICByZXR1cm4gdGhpcy5zaWdtYTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVBY3RpdmF0aW9uKCk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLmlzSW5wdXQgJiYgIXRoaXMuaXNDYWxjdWxhdGVkICYmICF0aGlzLmlzQmlhcykge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uID0gU0lHTU9JRC5vdXRwdXQodGhpcy5pbnB1dHMucmVkdWNlKChhY2MsIGN1cnJDb25uKSA9PiBhY2MgKyBjdXJyQ29ubi5jYWxjdWxhdGVWYWx1ZSgpLCAwKSk7XG4gICAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldEFjdGl2YXRpb24oKTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=