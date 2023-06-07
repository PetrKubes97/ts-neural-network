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
window.setWeights = () => {
    const weights = JSON.parse(weightsInput.value);
    neuralCore.setWeights(weights);
    neuralCore.reset();
    updateUI();
};
window.setBias = () => {
    const weights = JSON.parse(biasInput.value);
    neuralCore.setBias(weights);
    neuralCore.reset();
    updateUI();
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
    setWeights(weights) {
        this.weightList = weights;
    }
    setBias(biasList) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Zpc3VhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL0Nvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25ldXJhbE5ldHdvcmsvSGVscGVyT2JqZWN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV1cmFsTmV0d29yay9OZXVyYWxDb3JlLnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL05ldXJvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0VNO0lBUUosWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sR0FBRyxLQUFL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QUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxVQUFVLEdBQUcsc0RBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDMUI7UUFDRCxPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM5QixDQUFDO0NBQ0YiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgTmV1cm9uIH0gZnJvbSBcIi4vbmV1cmFsTmV0d29yay9OZXVyb25cIjtcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tIFwiLi9uZXVyYWxOZXR3b3JrL0Nvbm5lY3Rpb25cIjtcblxuZXhwb3J0IGNsYXNzIERyYXdhYmxlTmV1cm9uIHtcbiAgcHVibGljIHg6IG51bWJlcjtcbiAgcHVibGljIHk6IG51bWJlcjtcbiAgcHVibGljIGFjdGl2YXRpb246IG51bWJlcjtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIGlzQmlhczogYm9vbGVhbjtcbiAgcHVibGljIGlkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoeCwgeSwgYWN0aXZhdGlvbiwgbmFtZSwgaWQsIGlzQmlhcyA9IGZhbHNlKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuYWN0aXZhdGlvbiA9IGFjdGl2YXRpb247XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlzQmlhcyA9IGlzQmlhcztcbiAgICB0aGlzLmlkID0gaWQ7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6ZXIge1xuXG4gIHByaXZhdGUgY29udGVudDogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG4gIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcbiAgcHJpdmF0ZSBkcmF3YWJsZU5ldXJvbnM6IERyYXdhYmxlTmV1cm9uW107XG4gIHByaXZhdGUgZHJhd2FibGVJbnB1dE5ldXJvbnM6IERyYXdhYmxlTmV1cm9uW107XG5cbiAgY29uc3RydWN0b3IoY29udGVudDogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIHRoaXMuY3R4ID0gY29udGVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuaGVpZ2h0ID0gY29udGVudC5oZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IGNvbnRlbnQud2lkdGg7XG4gIH1cblxuICBwdWJsaWMgZHJhdyhuZXVyb25zOiBOZXVyb25bXVtdLCBjb25uZWN0aW9uczogQ29ubmVjdGlvbltdW10pIHtcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgdGhpcy5kcmF3YWJsZU5ldXJvbnMgPSBbXTtcbiAgICB0aGlzLmRyYXdhYmxlSW5wdXROZXVyb25zID0gW107XG4gICAgY29uc3QgbGVmdE1hcmdpbiA9IHRoaXMud2lkdGggLyAobmV1cm9ucy5sZW5ndGggKyAxKTtcblxuICAgIC8vIE5ldXJvbnNcbiAgICBuZXVyb25zLmZvckVhY2goKGxheWVyLCBsSWR4KSA9PiB7XG4gICAgICBjb25zdCB0b3BNYXJnaW4gPSB0aGlzLmhlaWdodCAvIChsYXllci5sZW5ndGggKyAyKTtcbiAgICAgIGxheWVyLmZvckVhY2goKG5ldXJvbiwgbklkeCkgPT4ge1xuICAgICAgICBjb25zdCB4ID0gbGVmdE1hcmdpbiAqICgxICsgbElkeCk7XG4gICAgICAgIGNvbnN0IHkgPSB0b3BNYXJnaW4gKiAoMSArIG5JZHgpO1xuXG4gICAgICAgIGNvbnN0IGRyYXdhYmxlTmV1cm9uID0gbmV3IERyYXdhYmxlTmV1cm9uKHgsIHksIG5ldXJvbi5nZXRBY3RpdmF0aW9uKCksIG5ldXJvbi5nZXROYW1lKCksIG5JZHgpO1xuICAgICAgICB0aGlzLmRyYXdhYmxlTmV1cm9ucy5wdXNoKGRyYXdhYmxlTmV1cm9uKTtcblxuICAgICAgICBpZiAobElkeCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuZHJhd2FibGVJbnB1dE5ldXJvbnMucHVzaChkcmF3YWJsZU5ldXJvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAobElkeCAhPSBuZXVyb25zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgY29uc3QgeCA9IGxlZnRNYXJnaW4gKiAoMSArIGxJZHgpO1xuICAgICAgICBjb25zdCB5ID0gdG9wTWFyZ2luICogKDEgKyBuZXVyb25zW2xJZHhdLmxlbmd0aCk7XG5cbiAgICAgICAgY29uc3QgZHJhd2FibGVOZXVyb24gPSBuZXcgRHJhd2FibGVOZXVyb24oeCwgeSwgMSwgYGJpYXMke2xJZHh9YCwgbmV1cm9uc1tsSWR4XS5sZW5ndGgsIHRydWUpO1xuICAgICAgICB0aGlzLmRyYXdhYmxlTmV1cm9ucy5wdXNoKGRyYXdhYmxlTmV1cm9uKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENvbm5lY3Rpb25zXG4gICAgY29uc3QgZHJhd2FibGVOYW1lTWFwID0gbmV3IE1hcDxzdHJpbmcsIERyYXdhYmxlTmV1cm9uPigpO1xuICAgIHRoaXMuZHJhd2FibGVOZXVyb25zLmZvckVhY2goXG4gICAgICAoZHJhd2FibGVOZXVyb24pID0+IGRyYXdhYmxlTmFtZU1hcC5zZXQoZHJhd2FibGVOZXVyb24ubmFtZSwgZHJhd2FibGVOZXVyb24pLy8gV1RGLCBJIHdhcyBub3QgYWJsZSB0byBjcmVhdGUgbWFwIGZyb20gMmQgYXJyXG4gICAgKTtcblxuICAgIGNvbm5lY3Rpb25zLmZvckVhY2goKGxheWVyLCBsSWR4KSA9PiB7XG4gICAgICBsYXllci5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0Tk5hbWUgPVxuICAgICAgICAgIChjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0SXNCaWFzKCkpID9cbiAgICAgICAgICAgIGBiaWFzJHtsSWR4fWAgOlxuICAgICAgICAgICAgY29ubmVjdGlvbi5nZXRJbnB1dE5ldXJvbigpLmdldE5hbWUoKTtcblxuICAgICAgICB0aGlzLmRyYXdDb25uZWN0aW9uKFxuICAgICAgICAgIGRyYXdhYmxlTmFtZU1hcC5nZXQoaW5wdXROTmFtZSksXG4gICAgICAgICAgZHJhd2FibGVOYW1lTWFwLmdldChjb25uZWN0aW9uLmdldE91dHB1dE5ldXJvbigpLmdldE5hbWUoKSksXG4gICAgICAgICAgY29ubmVjdGlvbi5nZXRXZWlnaHQoKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRyYXdhYmxlTmV1cm9ucy5mb3JFYWNoKChuZXVyb24pID0+IHtcbiAgICAgIHRoaXMuZHJhd05ldXJvbihuZXVyb24pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3TmV1cm9uKGRyYXdhYmxlTmV1cm9uOiBEcmF3YWJsZU5ldXJvbikge1xuICAgIC8vIHdoaXRlIGJhY2tncm91bmRcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5hcmMoZHJhd2FibGVOZXVyb24ueCwgZHJhd2FibGVOZXVyb24ueSwgMjUsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBgcmdiKDI1NSwyNTUsMjU1KWA7XG4gICAgdGhpcy5jdHguZmlsbCgpO1xuXG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgaWYgKGRyYXdhYmxlTmV1cm9uLmlzQmlhcylcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGByZ2JhKDQ2LDQwLDQyLCAxKWA7XG4gICAgZWxzZVxuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYmEoNjEsIDIzMiwgMjU1LCAke2RyYXdhYmxlTmV1cm9uLmFjdGl2YXRpb259KWA7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBgcmdiKDQ2LDQwLDQyLCAxKWBcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAxO1xuICAgIHRoaXMuY3R4LmFyYyhkcmF3YWJsZU5ldXJvbi54LCBkcmF3YWJsZU5ldXJvbi55LCAyNSwgMCwgMiAqIE1hdGguUEkpO1xuICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcblxuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGByZ2IoNDYsNDAsNDIsIDEpYFxuICAgIGNvbnN0IGhlaWdodCA9IDE2O1xuICAgIHRoaXMuY3R4LmZvbnQgPSBgYm9sZCAke2hlaWdodH1weGA7XG4gICAgY29uc3QgdGV4dCA9IE51bWJlcihkcmF3YWJsZU5ldXJvbi5hY3RpdmF0aW9uKS50b0ZpeGVkKDQpO1xuICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxuICAgICAgdGV4dCxcbiAgICAgIGRyYXdhYmxlTmV1cm9uLnggLSB0aGlzLmN0eC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aCAvIDIsXG4gICAgICBkcmF3YWJsZU5ldXJvbi55ICsgaGVpZ2h0IC8gMyk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdDb25uZWN0aW9uKGlucHV0TmV1cm9uOiBEcmF3YWJsZU5ldXJvbiwgb3V0cHV0TmV1cm9uOiBEcmF3YWJsZU5ldXJvbiwgd2VpZ2h0OiBudW1iZXIpIHtcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSBNYXRoLmxvZygxLjAwMSArIE1hdGguYWJzKHdlaWdodCkpO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gKHdlaWdodCA+IDApID9cbiAgICAgIGByZ2JhKDYxLCAyMzIsIDI1NSwgMSlgIDpcbiAgICAgIGByZ2JhKDIwNSwgODMsIDUyLCAxKWA7XG5cbiAgICB0aGlzLmN0eC5tb3ZlVG8oaW5wdXROZXVyb24ueCwgaW5wdXROZXVyb24ueSk7XG4gICAgdGhpcy5jdHgubGluZVRvKG91dHB1dE5ldXJvbi54LCBvdXRwdXROZXVyb24ueSk7XG4gICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG5cbiAgICAvLyBEcmF3IGNvbm5lY3Rpb24gd2VpZ2h0c1xuICAgIC8vIHkgPSBheCArIGNcbiAgICBjb25zdCBhID0gKG91dHB1dE5ldXJvbi55IC0gaW5wdXROZXVyb24ueSkgLyAob3V0cHV0TmV1cm9uLnggLSBpbnB1dE5ldXJvbi54KVxuICAgIGNvbnN0IGMgPSBvdXRwdXROZXVyb24ueSAtIGEgKiBvdXRwdXROZXVyb24ueFxuICAgIGxldCB4O1xuICAgIGNvbnN0IGRpc3RhbmNlRnJvbU9yaWdpbiA9IDYwO1xuICAgIGlmIChpbnB1dE5ldXJvbi5uYW1lLmluZGV4T2YoXCJiaWFzXCIpID4gLTEpIHtcbiAgICAgIHggPSBpbnB1dE5ldXJvbi54ICsgKGRpc3RhbmNlRnJvbU9yaWdpbi9NYXRoLnNxcnQoMSthKioyKSlcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9IG91dHB1dE5ldXJvbi54IC0gKGRpc3RhbmNlRnJvbU9yaWdpbi9NYXRoLnNxcnQoMSthKioyKSlcbiAgICB9XG4gICAgY29uc3QgeSA9IGEgKiB4ICsgYztcblxuICAgIHRoaXMuY3R4LmZvbnQgPSBgMTJweGA7XG4gICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSh4LCB5KTtcbiAgICB0aGlzLmN0eC5yb3RhdGUoTWF0aC5hdGFuKGEpKTtcbiAgICB0aGlzLmN0eC5maWxsVGV4dChOdW1iZXIod2VpZ2h0KS50b0ZpeGVkKDQpLCAwLCAwKTtcbiAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0RHJhd2FibGVJbnB1dE5ldXJvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZHJhd2FibGVJbnB1dE5ldXJvbnM7XG4gIH1cbn1cbiIsImltcG9ydCB7IFZpc3VhbGl6ZXIsIERyYXdhYmxlTmV1cm9uIH0gZnJvbSAnLi9WaXN1YWxpemVyJztcbmltcG9ydCB7IE5ldXJhbENvcmUgfSBmcm9tICcuL25ldXJhbE5ldHdvcmsvTmV1cmFsQ29yZSc7XG5pbXBvcnQgeyBSZWd1bGFyaXphdGlvbnMsIFRyYWluU2FtcGxlIH0gZnJvbSAnLi9uZXVyYWxOZXR3b3JrL0hlbHBlck9iamVjdHMnO1xuaW1wb3J0IHsgTmV1cm9uIH0gZnJvbSAnLi9uZXVyYWxOZXR3b3JrL05ldXJvbic7XG5cbih3aW5kb3cgYXMgYW55KS5zbGlkZSA9IChpOiBudW1iZXIsIHZhbHVlOiBudW1iZXIpID0+IHtcbiAgaW5wdXRbaV0gPSB2YWx1ZTtcbiAgbmV1cmFsQ29yZS5ldmFsdWF0ZShpbnB1dCk7XG4gIHZpc3VhbGl6ZXIuZHJhdyhuZXVyYWxDb3JlLmdldE5ldXJvbnMoKSwgbmV1cmFsQ29yZS5nZXRDb25uZWN0aW9ucygpKTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLmFkZE9yUmVtb3ZlTGF5ZXIgPSAoYWRkOiBib29sZWFuKSA9PiB7XG4gIG5ldXJhbENvcmUuYWRkT3JSZW1vdmVMYXllcihhZGQpO1xuICB1cGRhdGVVSSgpO1xufVxuXG4od2luZG93IGFzIGFueSkuYWRkT3JSZW1vdmVOZXVyb24gPSAoYWRkOiBib29sZWFuLCBsYXllcklkeDogbnVtYmVyKSA9PiB7XG4gIG5ldXJhbENvcmUuYWRkT3JSZW1vdmVOZXVyb24oYWRkLCBsYXllcklkeCk7XG4gIGlmIChsYXllcklkeCA9PSAwKSB7XG4gICAgaWYgKGFkZClcbiAgICAgIGlucHV0LnB1c2goMSk7XG4gICAgZWxzZVxuICAgICAgaW5wdXQucG9wKCk7XG4gIH1cblxuICB1cGRhdGVVSSgpO1xufVxuXG4od2luZG93IGFzIGFueSkudHJhaW4gPSAobXVsdGlwbGVJdGVyczogYm9vbGVhbikgPT4ge1xuICBsZXQgaXRlcnMgPSBtdWx0aXBsZUl0ZXJzID8gTnVtYmVyLnBhcnNlSW50KGl0ZXJzSW5wdXQudmFsdWUpIDogMTtcbiAgbmV1cmFsQ29yZS5zZXRSYXRlKE51bWJlci5wYXJzZUZsb2F0KHJhdGVJbnB1dC52YWx1ZSkpO1xuXG4gIC8vIFJlZ3VsYXJpemF0aW9uXG4gIHN3aXRjaCAocmVnVHlwZUlucHV0LnZhbHVlKSB7XG4gICAgY2FzZSBcIkwxXCI6XG4gICAgICBuZXVyYWxDb3JlLnNldFJlZ3VsYXJpemF0aW9uVHlwZShSZWd1bGFyaXphdGlvbnMuTDEpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkwyXCI6XG4gICAgICBuZXVyYWxDb3JlLnNldFJlZ3VsYXJpemF0aW9uVHlwZShSZWd1bGFyaXphdGlvbnMuTDIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIm5vbmVcIjpcbiAgICAgIG5ldXJhbENvcmUuc2V0UmVndWxhcml6YXRpb25UeXBlKFJlZ3VsYXJpemF0aW9ucy5OT05FKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgbmV1cmFsQ29yZS5zZXRSZWd1bGFyaXphdGlvblJhdGUoTnVtYmVyLnBhcnNlRmxvYXQocmVnUmF0ZUlucHV0LnZhbHVlKSk7XG5cbiAgaWYgKHRyYWluUmVwZWF0LmNoZWNrZWQgJiYgaW50ZXJ2YWwgPT0gbnVsbCkge1xuICAgIHRyYWluQnRuLmlubmVyVGV4dCA9IFwiU3RvcFwiXG4gICAgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7IHJ1blRyYWluTG9vcChpdGVycykgfSwgMTAwKTtcbiAgfSBlbHNlIGlmIChpbnRlcnZhbCAhPSBudWxsKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgaW50ZXJ2YWwgPSBudWxsO1xuICAgIHRyYWluQnRuLmlubmVyVGV4dCA9IFwiU3RhcnRcIlxuICB9IGVsc2Uge1xuICAgIHJ1blRyYWluTG9vcChpdGVycyk7XG4gIH1cbn1cblxuY29uc3QgcnVuVHJhaW5Mb29wID0gKGl0ZXJzOiBudW1iZXIpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyczsgaSsrKSB7XG4gICAgbmV1cmFsQ29yZS50cmFpbigpO1xuICB9XG4gIHVwZGF0ZVVJKCk7XG59XG5cbih3aW5kb3cgYXMgYW55KS5zZXRUcmFpbmluZ0RhdGEgPSAoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgZGF0YUFyciA9IEpTT04ucGFyc2UodHJhaW5pbmdTZXRJbnB1dC52YWx1ZSk7XG4gICAgbmV1cmFsQ29yZS5zZXRUcmFpbmluZ1NhbXBsZXMoW10pO1xuICAgIGRhdGFBcnIuZm9yRWFjaCgoc2FtcGxlKSA9PiB7XG4gICAgICBuZXVyYWxDb3JlLmFkZFRyYWluaW5nU2V0KHNhbXBsZVswXSwgc2FtcGxlWzFdKTtcbiAgICB9KTtcbiAgICBuZXVyYWxDb3JlLnJlc2V0KCk7XG4gICAgdXBkYXRlVUkoKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgYWxlcnQoZXJyKTtcbiAgfVxufVxuKHdpbmRvdyBhcyBhbnkpLnNldFdlaWdodHMgPSAoKSA9PiB7XG4gIGNvbnN0IHdlaWdodHM6IG51bWJlcltdW11bXSA9IEpTT04ucGFyc2Uod2VpZ2h0c0lucHV0LnZhbHVlKTtcbiAgbmV1cmFsQ29yZS5zZXRXZWlnaHRzKHdlaWdodHMpO1xuICBuZXVyYWxDb3JlLnJlc2V0KCk7XG4gIHVwZGF0ZVVJKCk7XG59XG4od2luZG93IGFzIGFueSkuc2V0QmlhcyA9ICgpID0+IHtcbiAgY29uc3Qgd2VpZ2h0czogbnVtYmVyW11bXSA9IEpTT04ucGFyc2UoYmlhc0lucHV0LnZhbHVlKTtcbiAgbmV1cmFsQ29yZS5zZXRCaWFzKHdlaWdodHMpO1xuICBuZXVyYWxDb3JlLnJlc2V0KCk7XG4gIHVwZGF0ZVVJKCk7XG59XG5cbih3aW5kb3cgYXMgYW55KS5yZXNldCA9ICgpID0+IHtcbiAgbmV1cmFsQ29yZS5yZXNldCgpO1xuICB1cGRhdGVVSSgpO1xufVxuXG4od2luZG93IGFzIGFueSkuYXBwbHlUcmFpbmluZ1NhbXBsZSA9IChpZHg6IG51bWJlcikgPT4ge1xuICBpbnB1dCA9IG5ldXJhbENvcmUuZ2V0VHJhaW5pbmdTYW1wbGVzKClbaWR4XS5pbnB1dDtcbiAgdXBkYXRlVUkoKTtcbn1cblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgbWFpbigpO1xufTtcblxubGV0IG5ldXJhbENvcmU6IE5ldXJhbENvcmU7XG5sZXQgdmlzdWFsaXplcjogVmlzdWFsaXplcjtcbmxldCBpbnB1dDogbnVtYmVyW107XG5sZXQgaW50ZXJ2YWwgPSBudWxsO1xuXG5sZXQgaW5wdXRTaXplID0gMztcbmxldCBoaWRkZW5TaXplcyA9IFsyXTtcbmxldCBvdXRwdXRTaXplID0gMjtcblxubGV0IGxheWVyQ29udHJvbHM6IEhUTUxFbGVtZW50O1xubGV0IGlucHV0Q29udHJvbHM6IEhUTUxFbGVtZW50O1xubGV0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG5cbmxldCBjb3N0OiBIVE1MRWxlbWVudDtcbmxldCBpdGVyOiBIVE1MRWxlbWVudDtcblxubGV0IHJhdGVJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbmxldCBpdGVyc0lucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xubGV0IHJlZ1R5cGVJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbmxldCByZWdSYXRlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5sZXQgdHJhaW5SZXBlYXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5sZXQgdHJhaW5CdG46IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbmxldCB0cmFpbmluZ1NldExhYmVsc091dHB1dDogSFRNTEVsZW1lbnQ7XG5sZXQgdHJhaW5pbmdTZXREYXRhT3V0cHV0OiBIVE1MRWxlbWVudDtcbmxldCB0cmFpbmluZ1NldElucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xubGV0IHdlaWdodHNJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbmxldCBiaWFzSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbmNvbnN0IG1haW4gPSAoKSA9PiB7XG4gIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50JykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGlucHV0Q29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtY29udHJvbHMnKTtcbiAgbGF5ZXJDb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsYXllci1jb250cm9scycpO1xuICBpdGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZXItb3V0cHV0Jyk7XG4gIGNvc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29zdCcpO1xuICByYXRlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmF0ZS1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGl0ZXJzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXRlcnMtaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICByZWdUeXBlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVndWxhcml6YXRpb24tdHlwZS1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHJlZ1JhdGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWd1bGFyaXphdGlvbi1yYXRlLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgdHJhaW5pbmdTZXREYXRhT3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluaW5nLXNldC1kYXRhLW91dHB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHRyYWluaW5nU2V0TGFiZWxzT3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluaW5nLXNldC1uZXVyb25zLW91dHB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHRyYWluaW5nU2V0SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW5pbmctc2V0LWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgd2VpZ2h0c0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluaW5nLXNldC13ZWlnaHRzJykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgYmlhc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluaW5nLXNldC1iaWFzJykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgdHJhaW5SZXBlYXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW4tcmVwZWF0LWNoY2tieCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHRyYWluQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluLWJ0bicpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgdmlzdWFsaXplciA9IG5ldyBWaXN1YWxpemVyKGNhbnZhcyk7XG5cbiAgaW5pdENvcmUoKTtcbn1cbmNvbnN0IGluaXRDb3JlID0gKCkgPT4ge1xuICBuZXVyYWxDb3JlID0gbmV3IE5ldXJhbENvcmUoaW5wdXRTaXplLCBoaWRkZW5TaXplcywgb3V0cHV0U2l6ZSk7XG5cbiAgLy8gU2V0IGRlZmF1bHQgdmFsdWVzXG4gIGlucHV0ID0gbmV3IEFycmF5KG5ldXJhbENvcmUuZ2V0SW5wdXRTaXplKCkpO1xuICBpbnB1dC5maWxsKDEpO1xuXG4gIG5ldXJhbENvcmUuZXZhbHVhdGUoaW5wdXQpO1xuICBjb25zdCB3biA9ICh3aW5kb3cgYXMgYW55KVxuICB3bi5zZXRUcmFpbmluZ0RhdGEoKVxuICB3bi5zZXRXZWlnaHRzKClcbiAgd24uc2V0QmlhcygpXG4gIHVwZGF0ZVVJKCk7XG59XG5cbmNvbnN0IHVwZGF0ZVVJID0gKCkgPT4ge1xuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcblxuICBsZXQgY29udGVudCA9IGFkZExheWVyQ29udHJvbFJvdyhcbiAgICAnTGF5ZXJzJyxcbiAgICBuZXVyYWxDb3JlLmdldExheWVyQ250KCkudG9TdHJpbmcoKSxcbiAgICAnYWRkT3JSZW1vdmVMYXllcih0cnVlKScsXG4gICAgJ2FkZE9yUmVtb3ZlTGF5ZXIoZmFsc2UpJ1xuICApO1xuXG5cbiAgY29udGVudCArPSBhZGRMYXllckNvbnRyb2xSb3coXG4gICAgJ0lucHV0IHNpemUnLFxuICAgIG5ldXJhbENvcmUuZ2V0SW5wdXRTaXplKCkudG9TdHJpbmcoKSxcbiAgICAnYWRkT3JSZW1vdmVOZXVyb24odHJ1ZSwgMCknLFxuICAgICdhZGRPclJlbW92ZU5ldXJvbihmYWxzZSwgMCknXG4gICk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXVyYWxDb3JlLmdldExheWVyQ250KCkgLSAyOyBpKyspIHtcbiAgICBjb250ZW50ICs9IGFkZExheWVyQ29udHJvbFJvdyhcbiAgICAgICdIaWRkZW4gbGF5ZXIgc2l6ZScsXG4gICAgICBuZXVyYWxDb3JlLmdldEhpZGRlbkxheWVyU2l6ZXMoKVtpXS50b1N0cmluZygpLFxuICAgICAgYGFkZE9yUmVtb3ZlTmV1cm9uKHRydWUsICR7aSArIDF9KWAsXG4gICAgICBgYWRkT3JSZW1vdmVOZXVyb24oZmFsc2UsICR7aSArIDF9KWBcbiAgICApO1xuICB9XG5cbiAgY29udGVudCArPSBhZGRMYXllckNvbnRyb2xSb3coXG4gICAgJ091dHB1dCBzaXplJyxcbiAgICBuZXVyYWxDb3JlLmdldE91dHB1dFNpemUoKS50b1N0cmluZygpLFxuICAgIGBhZGRPclJlbW92ZU5ldXJvbih0cnVlLCAke25ldXJhbENvcmUuZ2V0TGF5ZXJDbnQoKSAtIDF9KWAsXG4gICAgYGFkZE9yUmVtb3ZlTmV1cm9uKGZhbHNlLCAke25ldXJhbENvcmUuZ2V0TGF5ZXJDbnQoKSAtIDF9KWBcbiAgKTtcblxuICBsYXllckNvbnRyb2xzLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgaW5wdXRDb250cm9scy5pbm5lckhUTUwgPSAnJztcblxuICBpZiAoIXZpc3VhbGl6ZXIuZ2V0RHJhd2FibGVJbnB1dE5ldXJvbnMoKSkge1xuICAgIHZpc3VhbGl6ZXIuZHJhdyhuZXVyYWxDb3JlLmdldE5ldXJvbnMoKSwgbmV1cmFsQ29yZS5nZXRDb25uZWN0aW9ucygpKTtcbiAgfVxuXG5cbiAgY29uc3QgY29udHJvbEhlaWdodCA9IDUwO1xuICB2aXN1YWxpemVyLmdldERyYXdhYmxlSW5wdXROZXVyb25zKCkuZm9yRWFjaCgobmV1cm9uOiBEcmF3YWJsZU5ldXJvbikgPT4ge1xuICAgIGNvbnN0IHggPSBuZXVyb24ueCAtIDgwO1xuICAgIGNvbnN0IHkgPSBuZXVyb24ueSAtIGNvbnRyb2xIZWlnaHQgLyAyICsgNTtcbiAgICBpbnB1dENvbnRyb2xzLmlubmVySFRNTCArPSBgPGlucHV0XG4gICAgICBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAke3l9cHg7IGxlZnQ6ICR7eH1weDsgaGVpZ2h0OiAke2NvbnRyb2xIZWlnaHR9cHg7XCIgXG4gICAgICB0eXBlPVwicmFuZ2VcIiBvcmllbnQ9XCJ2ZXJ0aWNhbFwiIG1pbj1cIjBcIiBtYXg9XCIxXCIgdmFsdWU9XCIke25ldXJvbi5hY3RpdmF0aW9ufVwiIHN0ZXA9XCIwLjA1XCIgXG4gICAgICBvbmlucHV0PVwic2xpZGUoJHtuZXVyb24uaWR9LCB0aGlzLnZhbHVlKTtcIj5gO1xuICB9KVxuXG4gIGl0ZXIuaW5uZXJIVE1MID0gbmV1cmFsQ29yZS5nZXRJdGVyYXRpb24oKS50b1N0cmluZygpO1xuICBjb3N0LmlubmVySFRNTCA9IG5ldXJhbENvcmUuZ2V0Q29zdCgpLnRvU3RyaW5nKCk7XG5cbiAgLy8gQWRkIHRyYWluaW5nIHNldCBkYXRhIGxhYmVsc1xuICBsZXQgbGFiZWxzID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmV1cmFsQ29yZS5nZXRJbnB1dFNpemUoKTsgaSsrKSB7XG4gICAgbGFiZWxzICs9IGA8dGggc2NvcGU9J2NvbCc+SW5wdXQgJHtpfTwvdGg+YDtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5ldXJhbENvcmUuZ2V0T3V0cHV0U2l6ZSgpOyBpKyspIHtcbiAgICBsYWJlbHMgKz0gYDx0aCBzY29wZT0nY29sJyBzdHlsZT1cInRleHQtYWxpZ246IHJpZ2h0XCI+T3V0cHV0ICR7aX08L3RoPmA7XG4gIH1cbiAgdHJhaW5pbmdTZXRMYWJlbHNPdXRwdXQuaW5uZXJIVE1MID0gbGFiZWxzO1xuXG4gIC8vIEFkZCB0cmFpbmluZyBkYXRhXG4gIGxldCB0cmFpbmluZ0RhdGEgPSAnJztcbiAgbmV1cmFsQ29yZS5nZXRUcmFpbmluZ1NhbXBsZXMoKS5mb3JFYWNoKChzYW1wbGUsIGlkeCkgPT4ge1xuICAgIHRyYWluaW5nRGF0YSArPSBgPHRyIHN0eWxlPVwiY3Vyc29yOnBvaW50ZXI7XCIgb25jbGljaz1cImFwcGx5VHJhaW5pbmdTYW1wbGUoJHtpZHh9KVwiPmA7XG4gICAgc2FtcGxlLmlucHV0LmZvckVhY2godmFsID0+IHtcbiAgICAgIHRyYWluaW5nRGF0YSArPSBgPHRkPiR7dmFsfTwvdGQ+YDtcbiAgICB9KTtcbiAgICBzYW1wbGUub3V0cHV0LmZvckVhY2godmFsID0+IHtcbiAgICAgIHRyYWluaW5nRGF0YSArPSBgPHRkIHN0eWxlPVwidGV4dC1hbGlnbjogcmlnaHRcIj4ke3ZhbH08L3RkPmA7XG4gICAgfSk7XG4gICAgdHJhaW5pbmdEYXRhICs9ICc8L3RyPic7XG4gIH0pO1xuICB0cmFpbmluZ1NldERhdGFPdXRwdXQuaW5uZXJIVE1MID0gdHJhaW5pbmdEYXRhO1xuICB2aXN1YWxpemVyLmRyYXcobmV1cmFsQ29yZS5nZXROZXVyb25zKCksIG5ldXJhbENvcmUuZ2V0Q29ubmVjdGlvbnMoKSk7XG59XG5cbmNvbnN0IGFkZExheWVyQ29udHJvbFJvdyA9IChsYWJlbDogc3RyaW5nLCBzaXplOiBzdHJpbmcsIG9uY2xpY2tQb3M6IHN0cmluZywgb25jbGlja05lZzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGA8dHI+PHRkIGFsaWduPSdyaWdodCc+PGxhYmVsPiR7bGFiZWx9OjwvbGFiZWw+PGIgc3R5bGU9XCJtYXJnaW46IGF1dG8gNnB4XCI+JHtzaXplfTwvYj48L3RkPjx0ZD5cbiAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIHJvbGU9XCJncm91cFwiPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCIgb25jbGljaz1cIiR7b25jbGlja05lZ31cIj4tPC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc21cIiBvbmNsaWNrPVwiJHtvbmNsaWNrUG9zfVwiPis8L2J1dHRvbj5cbiAgPC9kaXY+PC90ZD48L3RyPmA7XG59IiwiaW1wb3J0IHsgTmV1cm9uIH0gZnJvbSBcIi4vTmV1cm9uXCI7XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uIHtcbiAgcHJpdmF0ZSB3ZWlnaHQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBpbnB1dE5ldXJvbjogTmV1cm9uO1xuICBwcml2YXRlIG91dHB1dE5ldXJvbjogTmV1cm9uO1xuICBwcml2YXRlIHNhbXBsZVdlaWdodENoYW5nZXM6IG51bWJlcltdID0gW107XG5cbiAgY29uc3RydWN0b3IoaW5wdXQ6IE5ldXJvbiwgb3V0cHV0OiBOZXVyb24sIHdlaWdodD86IG51bWJlcikge1xuICAgIHRoaXMuaW5wdXROZXVyb24gPSBpbnB1dDtcbiAgICB0aGlzLm91dHB1dE5ldXJvbiA9IG91dHB1dDtcbiAgICB0aGlzLndlaWdodCA9IHdlaWdodCB8fCBNYXRoLnJhbmRvbSgpO1xuICB9XG5cbiAgcHVibGljIGFkZFNhbXBsZVdlaWdodENoYW5nZSh3ZWlnaHRDaGFuZ2U6IG51bWJlcikge1xuICAgIHRoaXMuc2FtcGxlV2VpZ2h0Q2hhbmdlcy5wdXNoKHdlaWdodENoYW5nZSk7XG4gIH1cblxuICBwdWJsaWMgYXBwbHlBdmVyYWdlV2VpZ2h0Q2hhbmdlKCkge1xuICAgIGNvbnN0IGNoYW5nZSA9ICh0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjICsgdmFsLCAwKSAvIHRoaXMuc2FtcGxlV2VpZ2h0Q2hhbmdlcy5sZW5ndGgpO1xuICAgIHRoaXMud2VpZ2h0ICs9IGNoYW5nZTtcbiAgICB0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRXZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMud2VpZ2h0O1xuICB9XG5cbiAgcHVibGljIGNhbGN1bGF0ZVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLndlaWdodCAqIHRoaXMuaW5wdXROZXVyb24uY2FsY3VsYXRlQWN0aXZhdGlvbigpO1xuICB9XG5cbiAgcHVibGljIGdldE91dHB1dE5ldXJvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vdXRwdXROZXVyb247XG4gIH1cblxuICBwdWJsaWMgZ2V0SW5wdXROZXVyb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXROZXVyb247XG4gIH1cbn0iLCJpbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSBcIi4vQ29ubmVjdGlvblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGl2YXRpb24ge1xuICBkZXIoeDogbnVtYmVyKTogbnVtYmVyO1xuICBvdXRwdXQoeDogbnVtYmVyKTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGNvbnN0IFNJR01PSUQ6IEFjdGl2YXRpb24gPSB7XG4gIG91dHB1dDogKHg6IG51bWJlcik6IG51bWJlciA9PiAxIC8gKDEgKyBNYXRoLmV4cCgteCkpLFxuICBkZXI6ICh4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgIGxldCBvdXRwdXQgPSBTSUdNT0lELm91dHB1dCh4KTtcbiAgICByZXR1cm4gb3V0cHV0ICogKDEgLSBvdXRwdXQpO1xuICB9XG59O1xuXG5leHBvcnQgZW51bSBSZWd1bGFyaXphdGlvbnMge1xuICBMMSxcbiAgTDIsXG4gIE5PTkUsXG59XG5cbmV4cG9ydCBjb25zdCBMMVJlZyA9IHtcbiAgY29zdDogKGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW11bXSk6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIGNvbm5lY3Rpb25zLnJlZHVjZShcbiAgICAgIChwcmV2LCBjb25uTGF5ZXI6IENvbm5lY3Rpb25bXSkgPT4ge1xuICAgICAgICByZXR1cm4gcHJldiArIGNvbm5MYXllci5yZWR1Y2UoKGFjYywgY29ubikgPT4gYWNjICsgTWF0aC5hYnMoY29ubi5nZXRXZWlnaHQoKSksIDApXG4gICAgICB9LCAwKSAqICgxIC8gZ2V0TnVtYmVyT2ZDb25uZWN0aW9ucyhjb25uZWN0aW9ucykpO1xuICB9LFxuXG4gIGRlcjogKHdlaWdodDogbnVtYmVyLCBjb25uQ291bnQ6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuICgod2VpZ2h0ID4gMCkgPyAxIDogLTEpICAqICgxIC8gY29ubkNvdW50KTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgTDJSZWcgPSB7XG4gIGNvc3Q6IChjb25uZWN0aW9uczogQ29ubmVjdGlvbltdW10pOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiAxIC8gMiAqIGNvbm5lY3Rpb25zLnJlZHVjZShcbiAgICAgIChwcmV2LCBjb25uTGF5ZXI6IENvbm5lY3Rpb25bXSkgPT4ge1xuICAgICAgICByZXR1cm4gcHJldiArIGNvbm5MYXllci5yZWR1Y2UoKGFjYywgY29ubikgPT4gYWNjICsgY29ubi5nZXRXZWlnaHQoKSAqKiAyLCAwKVxuICAgICAgfSwgMCkgKiAoMSAvIGdldE51bWJlck9mQ29ubmVjdGlvbnMoY29ubmVjdGlvbnMpKTtcbiAgfSxcblxuICBkZXI6IChjdXJyV2VpZ2h0OiBudW1iZXIsIGNvbm5Db3VudDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gY3VycldlaWdodCAqICgxIC8gY29ubkNvdW50KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVHJhaW5TYW1wbGUge1xuICBwdWJsaWMgaW5wdXQ6IG51bWJlcltdO1xuICBwdWJsaWMgb3V0cHV0OiBudW1iZXJbXTtcblxuICBjb25zdHJ1Y3RvcihpbnB1dDogbnVtYmVyW10sIG91dHB1dDogbnVtYmVyW10pIHtcbiAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgdGhpcy5vdXRwdXQgPSBvdXRwdXQ7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldE51bWJlck9mQ29ubmVjdGlvbnMgPSAoY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXVtdKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuIGNvbm5lY3Rpb25zLnJlZHVjZSgoYWNjLCBjb25uKSA9PiBhY2MgKyBjb25uLmxlbmd0aCwgMCk7XG59IiwiaW1wb3J0IHsgTmV1cm9uIH0gZnJvbSBcIi4vTmV1cm9uXCI7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSBcIi4vQ29ubmVjdGlvblwiO1xuaW1wb3J0IHsgVHJhaW5TYW1wbGUsIFNJR01PSUQsIFJlZ3VsYXJpemF0aW9ucywgTDJSZWcsIGdldE51bWJlck9mQ29ubmVjdGlvbnMsIEwxUmVnIH0gZnJvbSBcIi4vSGVscGVyT2JqZWN0c1wiO1xuXG5leHBvcnQgY2xhc3MgTmV1cmFsQ29yZSB7XG4gIHByaXZhdGUgaW5wdXRTaXplOiBudW1iZXI7XG4gIHByaXZhdGUgaGlkZGVuTGF5ZXJTaXplczogbnVtYmVyW107XG4gIHByaXZhdGUgb3V0cHV0U2l6ZTogbnVtYmVyO1xuXG4gIHByaXZhdGUgbGF5ZXJDbnQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBiaWFzTGlzdDogbnVtYmVyW11bXTtcbiAgcHJpdmF0ZSB3ZWlnaHRMaXN0OiBudW1iZXJbXVtdW107XG5cbiAgcHJpdmF0ZSBpdGVyQ250ID0gMDtcblxuICBwcml2YXRlIHJhdGUgPSAxO1xuICBwcml2YXRlIGxhbWJkYSA9IDAuMDAxO1xuICBwcml2YXRlIHJlZ1R5cGU6IFJlZ3VsYXJpemF0aW9ucyA9IFJlZ3VsYXJpemF0aW9ucy5OT05FO1xuXG4gIHByaXZhdGUgYmlhc05ldXJvbiA9IG5ldyBOZXVyb24oJ2JpYXMnLCB0cnVlKTtcbiAgcHJpdmF0ZSBuZXVyb25zOiBOZXVyb25bXVtdID0gW107XG4gIHByaXZhdGUgY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXVtdID0gW107XG5cbiAgcHJpdmF0ZSB0cmFpblNhbXBsZXM6IFRyYWluU2FtcGxlW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihpbnB1dFNpemU6IG51bWJlciwgaGlkZGVuTGF5ZXJTaXplczogbnVtYmVyW10sIG91dHB1dFNpemU6IG51bWJlcikge1xuICAgIHRoaXMuaW5wdXRTaXplID0gaW5wdXRTaXplO1xuICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplcyA9IGhpZGRlbkxheWVyU2l6ZXM7XG4gICAgdGhpcy5vdXRwdXRTaXplID0gb3V0cHV0U2l6ZTtcbiAgICB0aGlzLmxheWVyQ250ID0gaGlkZGVuTGF5ZXJTaXplcy5sZW5ndGggKyAyO1xuXG4gICAgLy8gUmVzZXRcbiAgICB0aGlzLm5ldXJvbnMgPSBbXTtcbiAgICB0aGlzLmNvbm5lY3Rpb25zID0gW107XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICAvLyBDcmVhdGUgdGhlIG5ldXJvbnNcbiAgICBmb3IgKGxldCBsID0gMDsgbCA8IHRoaXMubGF5ZXJDbnQ7IGwrKykge1xuICAgICAgLy8gSG93IG1hbnkgbmV1cm9ucyBhcmUgaW4gZWFjaCBsYXllcj9cbiAgICAgIGxldCBuZXVyb25zSW5MYXllckNudCA9IDA7XG4gICAgICBzd2l0Y2ggKGwpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIG5ldXJvbnNJbkxheWVyQ250ID0gdGhpcy5pbnB1dFNpemU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdGhpcy5oaWRkZW5MYXllclNpemVzLmxlbmd0aCArIDE6XG4gICAgICAgICAgbmV1cm9uc0luTGF5ZXJDbnQgPSB0aGlzLm91dHB1dFNpemU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbmV1cm9uc0luTGF5ZXJDbnQgPSB0aGlzLmhpZGRlbkxheWVyU2l6ZXNbbCAtIDFdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm5ldXJvbnNbbF0gPSBbXTtcblxuICAgICAgLy8gQ3JlYXRlIHRoZW1cbiAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgbmV1cm9uc0luTGF5ZXJDbnQ7IG4rKykge1xuICAgICAgICB0aGlzLm5ldXJvbnNbbF1bbl0gPSBuZXcgTmV1cm9uKGBOZXVyb24ke2x9JHtufWApO1xuICAgICAgICBpZiAobCA9PSAwKSB7XG4gICAgICAgICAgdGhpcy5uZXVyb25zW2xdW25dLnNldEFzSW5wdXROZXVyb24oMCk7IC8vIGp1c3QgdG8gYXZvaWQgY3Jhc2hlcywgdGhlIDAgc2hvdWxkIGJlIG92ZXJyaWRlbiBsYXRlciBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENyZWF0ZSB0aGUgQ29ubmVjdGlvbnNcbiAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25zKDAsIHRoaXMubGF5ZXJDbnQgLSAxKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRXZWlnaHRzKHdlaWdodHM6IG51bWJlcltdW11bXSkge1xuXG4gICAgdGhpcy53ZWlnaHRMaXN0ID0gd2VpZ2h0cztcbiAgfVxuXG4gIHB1YmxpYyBzZXRCaWFzKGJpYXNMaXN0OiBudW1iZXJbXVtdKSB7XG5cbiAgICB0aGlzLmJpYXNMaXN0ID0gYmlhc0xpc3Q7XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGUoaW5wdXQ6IG51bWJlcltdKTogbnVtYmVyW10ge1xuICAgIGlmIChpbnB1dC5sZW5ndGggIT0gdGhpcy5pbnB1dFNpemUpIHtcbiAgICAgIHRocm93ICdJbnB1dCBzaXplIGRvZXMgbm90IG1hdGNoJztcbiAgICB9XG4gICAgLy8gUmVzZXQsIHNvIGVhY2ggbmV1cm9uIGlzIHJlY2FsY3VsYXRlZFxuICAgIHRoaXMubmV1cm9ucy5mb3JFYWNoKGxheWVyID0+IHsgbGF5ZXIuZm9yRWFjaChuZXVyb24gPT4gbmV1cm9uLnJlc2V0KCkpIH0pXG4gICAgLy8gU2V0IGlucHV0IGxheWVyXG4gICAgdGhpcy5uZXVyb25zWzBdLmZvckVhY2goKG5ldXJvbiwgaWR4KSA9PiB7IG5ldXJvbi5zZXRJbnB1dChpbnB1dFtpZHhdKSB9KTtcblxuICAgIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250IC0gMV0uZm9yRWFjaChuZXVyb24gPT4ge1xuICAgICAgbmV1cm9uLmNhbGN1bGF0ZUFjdGl2YXRpb24oKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLm1hcChuZXVyb24gPT4gbmV1cm9uLmdldEFjdGl2YXRpb24oKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkVHJhaW5pbmdTZXQoaW5wdXQ6IG51bWJlcltdLCBvdXRwdXQ6IG51bWJlcltdKSB7XG4gICAgaWYgKGlucHV0Lmxlbmd0aCAhPSB0aGlzLmlucHV0U2l6ZSkge1xuICAgICAgdGhyb3cgJ0lucHV0IHNpemUgZG9lcyBub3QgbWF0Y2gnO1xuICAgIH0gZWxzZSBpZiAob3V0cHV0Lmxlbmd0aCAhPSB0aGlzLm91dHB1dFNpemUpIHtcbiAgICAgIHRocm93ICdPdXRwdXQgc2l6ZSBkb2VzIG5vdCBtYXRjaCc7XG4gICAgfVxuXG4gICAgdGhpcy50cmFpblNhbXBsZXMucHVzaChuZXcgVHJhaW5TYW1wbGUoaW5wdXQsIG91dHB1dCkpXG4gIH1cblxuICBwdWJsaWMgZ2V0Q29zdCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLnRyYWluU2FtcGxlcy5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgY29uc3QgY29zdFN1bSA9IHRoaXMudHJhaW5TYW1wbGVzLnJlZHVjZSgoY29zdFN1bSwgc2FtcGxlKSA9PiB7IC8vIEFkZCB1cCBhbGwgc2FtcGxlc1xuICAgICAgdGhpcy5ldmFsdWF0ZShzYW1wbGUuaW5wdXQpO1xuICAgICAgcmV0dXJuIGNvc3RTdW0gKyB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLnJlZHVjZSgoYWNjLCBuZXVyb24sIGkpID0+IHsgLy8gQWRkIHVwIGFsbCBvdXRwdXQgbmV1cm9uc1xuICAgICAgICByZXR1cm4gYWNjICsgKG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkgLSBzYW1wbGUub3V0cHV0W2ldKSAqKiAyO1xuICAgICAgfSwgMCk7XG4gICAgfSwgMCk7XG5cbiAgICAvLyBSZWd1bGFyaXphdGlvblxuICAgIGxldCByZWdDb3N0ID0gMDtcbiAgICBzd2l0Y2ggKHRoaXMucmVnVHlwZSkge1xuICAgICAgY2FzZSBSZWd1bGFyaXphdGlvbnMuTDE6XG4gICAgICAgIHJlZ0Nvc3QgPSBMMVJlZy5jb3N0KHRoaXMuY29ubmVjdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUmVndWxhcml6YXRpb25zLkwyOlxuICAgICAgICByZWdDb3N0ID0gTDJSZWcuY29zdCh0aGlzLmNvbm5lY3Rpb25zKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFJlZ3VsYXJpemF0aW9ucy5OT05FOlxuICAgICAgICByZWdDb3N0ID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIDEgLyAyICogY29zdFN1bSAqICgxIC8gdGhpcy50cmFpblNhbXBsZXMubGVuZ3RoKSArXG4gICAgICB0aGlzLmxhbWJkYSAqIHJlZ0Nvc3Q7XG4gIH1cblxuICBwdWJsaWMgdHJhaW4oKSB7XG4gICAgdGhpcy50cmFpblNhbXBsZXMuZm9yRWFjaCgoc2FtcGxlKSA9PiB7XG4gICAgICB0aGlzLmV2YWx1YXRlKHNhbXBsZS5pbnB1dClcblxuICAgICAgLy8gQ2FsY3VsYXRlIHNpZ21hcyBvZiB0aGUgbGFzdCBsYXllclxuICAgICAgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5mb3JFYWNoKChuZXVyb24sIGlkeCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdTaWdtYSA9XG4gICAgICAgICAgKHNhbXBsZS5vdXRwdXRbaWR4XSAtIG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkpICogU0lHTU9JRC5kZXIobmV1cm9uLmdldEFjdGl2YXRpb24oKSk7XG4gICAgICAgIG5ldXJvbi5zZXRTaWdtYShuZXdTaWdtYSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gQ2FsY3VsYXRlIHNpZ21hcyBmb3IgZWFjaCBuZXVyb24gaW4gdGhlIGxvd2VyIGxheWVyc1xuICAgICAgZm9yIChsZXQgbCA9IHRoaXMubGF5ZXJDbnQgLSAyOyBsID49IDA7IGwtLSkge1xuICAgICAgICB0aGlzLm5ldXJvbnNbbF0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmV3U2lnbWEgPVxuICAgICAgICAgICAgbmV1cm9uLmdldE91dHB1dHMoKS5yZWR1Y2UoKGFjYywgY29ubmVjdGlvbikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gYWNjICsgY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXRTaWdtYSgpICogY29ubmVjdGlvbi5nZXRXZWlnaHQoKTtcbiAgICAgICAgICAgIH0sIDApICogU0lHTU9JRC5kZXIobmV1cm9uLmdldEFjdGl2YXRpb24oKSk7XG4gICAgICAgICAgbmV1cm9uLnNldFNpZ21hKG5ld1NpZ21hKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFjY3VtdWxhdGUgYWxsIHdlaWdodCB1cGRhdGVzXG4gICAgICB0aGlzLmNvbm5lY3Rpb25zLmZvckVhY2goKGNvbm5MYXllcikgPT4ge1xuICAgICAgICBjb25uTGF5ZXIuZm9yRWFjaCgoY29ubmVjdGlvbikgPT4ge1xuXG4gICAgICAgICAgbGV0IHJlZ0RlciA9IDA7XG4gICAgICAgICAgc3dpdGNoICh0aGlzLnJlZ1R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgUmVndWxhcml6YXRpb25zLkwxOlxuICAgICAgICAgICAgICByZWdEZXIgPSBMMVJlZy5kZXIoY29ubmVjdGlvbi5nZXRXZWlnaHQoKSwgZ2V0TnVtYmVyT2ZDb25uZWN0aW9ucyh0aGlzLmNvbm5lY3Rpb25zKSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBSZWd1bGFyaXphdGlvbnMuTDI6XG4gICAgICAgICAgICAgIHJlZ0RlciA9IEwyUmVnLmRlcihjb25uZWN0aW9uLmdldFdlaWdodCgpLCBnZXROdW1iZXJPZkNvbm5lY3Rpb25zKHRoaXMuY29ubmVjdGlvbnMpKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFJlZ3VsYXJpemF0aW9ucy5OT05FOlxuICAgICAgICAgICAgICByZWdEZXIgPSAwO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCB3ZWlnaHRDaGFuZ2UgPVxuICAgICAgICAgICAgY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXRTaWdtYSgpICpcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS5nZXRBY3RpdmF0aW9uKCkgKlxuICAgICAgICAgICAgdGhpcy5yYXRlIC1cbiAgICAgICAgICAgIHRoaXMubGFtYmRhICogcmVnRGVyOyAvLyBSZWd1bGFyaXphdGlvblxuXG4gICAgICAgICAgY29ubmVjdGlvbi5hZGRTYW1wbGVXZWlnaHRDaGFuZ2Uod2VpZ2h0Q2hhbmdlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFVmZiwgbGV0J3MgaG9wZSBldmVyeXRoaW5nIHdvcmtzIGFuZCBhcHBseSB0aGUgbWFnaWNcbiAgICB0aGlzLmNvbm5lY3Rpb25zLmZvckVhY2goKGNvbm5MYXllcikgPT4ge1xuICAgICAgY29ubkxheWVyLmZvckVhY2goKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgY29ubmVjdGlvbi5hcHBseUF2ZXJhZ2VXZWlnaHRDaGFuZ2UoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pdGVyQ250Kys7XG4gIH1cblxuICBwdWJsaWMgYWRkT3JSZW1vdmVMYXllcihhZGQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoYWRkKSB7XG4gICAgICBjb25zdCBuZXdMYXllclNpemUgPSAzO1xuICAgICAgdGhpcy5oaWRkZW5MYXllclNpemVzLnB1c2gobmV3TGF5ZXJTaXplKTtcbiAgICAgIHRoaXMubGF5ZXJDbnQrKztcblxuICAgICAgLy8gQ3JlYXRlIHRoZSBuZXcgbmV1cm9uc1xuICAgICAgdGhpcy5jcmVhdGVMYXllck9mTmV1cm9ucyh0aGlzLmxheWVyQ250IC0gMiwgbmV3TGF5ZXJTaXplKTtcblxuICAgICAgLy8gUmVjcmVhdGUgdGhlIGxhc3QgbGF5ZXJcbiAgICAgIHRoaXMuY3JlYXRlTGF5ZXJPZk5ldXJvbnModGhpcy5sYXllckNudCAtIDEsIHRoaXMub3V0cHV0U2l6ZSk7XG5cbiAgICAgIC8vIFJlY3JlYXRlIGFsbCBuZWNlc3NhcnkgY29ubmVjdGlvbnNcbiAgICAgIHRoaXMuY3JlYXRlQ29ubmVjdGlvbnModGhpcy5sYXllckNudCAtIDMsIHRoaXMubGF5ZXJDbnQgLSAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMubGF5ZXJDbnQgPT0gMikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplcy5wb3AoKTtcbiAgICAgIHRoaXMubGF5ZXJDbnQtLTtcbiAgICAgIHRoaXMubmV1cm9ucy5wb3AoKTtcbiAgICAgIHRoaXMuY29ubmVjdGlvbnMucG9wKCk7XG5cbiAgICAgIC8vIFJlY3JlYXRlIHRoZSBsYXN0IGxheWVyXG4gICAgICB0aGlzLmNyZWF0ZUxheWVyT2ZOZXVyb25zKHRoaXMubGF5ZXJDbnQgLSAxLCB0aGlzLm91dHB1dFNpemUpO1xuXG4gICAgICAvLyBSZWNyZWF0ZSBhbGwgbmVjZXNzYXJ5IGNvbm5lY3Rpb25zXG4gICAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25zKHRoaXMubGF5ZXJDbnQgLSAyLCB0aGlzLmxheWVyQ250IC0gMSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVGhpcyBmdW5jdGlvbiBpcyB2ZXJ5IGxvbmcgYW5kIHVnbHksIEkgZG9udCB3YW50IHRvIHNpbXBseSByZWJ1aWxkIHRoZSBuZXR3b3JrIGJlY2F1c2UgSSB3YW50IHRvIGtlZXAgdGhlIHdlaWdodHNcbiAgcHVibGljIGFkZE9yUmVtb3ZlTmV1cm9uKGFkZDogYm9vbGVhbiwgbGF5ZXJJZHg6IG51bWJlcikge1xuICAgIGNvbnN0IGlzSW5wdXQgPSBsYXllcklkeCA9PSAwO1xuICAgIGNvbnN0IGlzT3V0cHV0ID0gbGF5ZXJJZHggPT0gdGhpcy5sYXllckNudCAtIDE7XG4gICAgY29uc3QgaXNIaWRkZW4gPSAhaXNJbnB1dCAmJiAhaXNPdXRwdXQ7XG5cbiAgICBjb25zdCBzaXplQ2hhbmdlID0gKGFkZCkgPyAxIDogLTFcblxuICAgIGlmIChpc0hpZGRlbikge1xuICAgICAgdGhpcy5oaWRkZW5MYXllclNpemVzW2xheWVySWR4IC0gMV0gKz0gc2l6ZUNoYW5nZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNJbnB1dCkge1xuICAgICAgdGhpcy5pbnB1dFNpemUgKz0gc2l6ZUNoYW5nZTtcbiAgICAgIHRoaXMudHJhaW5TYW1wbGVzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3V0cHV0U2l6ZSArPSBzaXplQ2hhbmdlO1xuICAgICAgdGhpcy50cmFpblNhbXBsZXMgPSBbXTtcbiAgICB9XG5cbiAgICBpZiAoYWRkKSB7XG4gICAgICBsZXQgbmV3TmV1cm9uSWR4O1xuXG4gICAgICBpZiAoaXNIaWRkZW4pIHtcbiAgICAgICAgbmV3TmV1cm9uSWR4ID0gdGhpcy5oaWRkZW5MYXllclNpemVzW2xheWVySWR4IC0gMV0gLSAxO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNJbnB1dCkge1xuICAgICAgICBuZXdOZXVyb25JZHggPSB0aGlzLmlucHV0U2l6ZSAtIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdOZXVyb25JZHggPSB0aGlzLm91dHB1dFNpemUgLSAxO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdOZXVyb24gPSBuZXcgTmV1cm9uKGBOZXVyb24ke2xheWVySWR4fSR7bmV3TmV1cm9uSWR4fWApO1xuICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4XVtuZXdOZXVyb25JZHhdID0gbmV3TmV1cm9uO1xuXG4gICAgICBpZiAoaXNJbnB1dClcbiAgICAgICAgbmV3TmV1cm9uLnNldEFzSW5wdXROZXVyb24oMCk7XG5cblxuICAgICAgLy8vLyBBZGQgY29ubmVjdGlvbnMgZnJvbSB0aGUgcHJldiBsYXllclxuICAgICAgaWYgKCFpc0lucHV0KSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeCAtIDFdLmZvckVhY2goKG5ldXJvbiwgaWR4KSA9PiB7XG4gICAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKG5ldXJvbiwgbmV3TmV1cm9uKTtcbiAgICAgICAgICBuZXVyb24uYWRkT3V0cHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICAgIG5ld05ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4IC0gMV0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIERvbnQgZm9yZ2V0IHRoZSBiaWFzXG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbih0aGlzLmJpYXNOZXVyb24sIG5ld05ldXJvbik7XG4gICAgICAgIG5ld05ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeCAtIDFdLnB1c2goY29ubmVjdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNPdXRwdXQpIHtcbiAgICAgICAgLy8vLyBBZGQgY29ubmVjdGlvbnMgdG8gdGhlIG5leHQgbGF5ZXJcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4ICsgMV0uZm9yRWFjaCgobmV1cm9uLCBpZHgpID0+IHtcbiAgICAgICAgICBjb25zdCBjb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb24obmV3TmV1cm9uLCBuZXVyb24pO1xuICAgICAgICAgIG5ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4XS5wdXNoKGNvbm5lY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVtb3ZlZE5ldXJvbiA9IHRoaXMubmV1cm9uc1tsYXllcklkeF0ucG9wKCk7XG4gICAgICAvLyBSZW1vdmUgb3V0cHV0cyBmcm9tIHRoZSBwcmV2IGxheWVyXG4gICAgICBpZiAoIWlzSW5wdXQpIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4IC0gMV0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgbmV1cm9uLnNldE91dHB1dHMobmV1cm9uLmdldE91dHB1dHMoKS5maWx0ZXIoKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLmdldE91dHB1dE5ldXJvbigpLmdldE5hbWUoKSAhPSByZW1vdmVkTmV1cm9uLmdldE5hbWUoKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmUgaW5wdXQgaW4gdGhlIG5leHQgbGF5ZXJcbiAgICAgIGlmICghaXNPdXRwdXQpIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4ICsgMV0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgbmV1cm9uLnNldElucHV0cyhuZXVyb24uZ2V0SW5wdXRzKCkuZmlsdGVyKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5nZXRJbnB1dE5ldXJvbigpLmdldE5hbWUoKSAhPSByZW1vdmVkTmV1cm9uLmdldE5hbWUoKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmUgdGhlIHVudXNlZCBjb25uZWN0aW9uc1xuICAgICAgaWYgKCFpc0lucHV0KSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbGF5ZXJJZHggLSAxXSA9IHRoaXMuY29ubmVjdGlvbnNbbGF5ZXJJZHggLSAxXS5maWx0ZXIoKGNvbm5lY3Rpb246IENvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXROYW1lKCkgIT0gcmVtb3ZlZE5ldXJvbi5nZXROYW1lKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzT3V0cHV0KSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbGF5ZXJJZHhdID0gdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeF0uZmlsdGVyKChjb25uZWN0aW9uOiBDb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS5nZXROYW1lKCkgIT0gcmVtb3ZlZE5ldXJvbi5nZXROYW1lKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLml0ZXJDbnQgPSAwO1xuICAgIHRoaXMuY3JlYXRlQ29ubmVjdGlvbnMoMCwgdGhpcy5sYXllckNudCAtIDEpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVMYXllck9mTmV1cm9ucyhsYXllcklkeDogbnVtYmVyLCBsYXllclNpemU6IG51bWJlcikge1xuICAgIHRoaXMubmV1cm9uc1tsYXllcklkeF0gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVyU2l6ZTsgaSsrKSB7XG4gICAgICB0aGlzLm5ldXJvbnNbbGF5ZXJJZHhdW2ldID0gbmV3IE5ldXJvbihgTmV1cm9uJHtsYXllcklkeH0ke2l9YCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDb25uZWN0aW9ucyhmaXJzdExheWVyLCBsYXN0TGF5ZXIpIHtcbiAgICBmb3IgKGxldCBsID0gZmlyc3RMYXllcjsgbCA8IGxhc3RMYXllcjsgbCsrKSB7XG4gICAgICAvLyBGb3IgZWFjaCBuZXVyb24gaW4gdGhlIGxheWVyIGFkZCBhbGwgY29ubmVjdGlvbnMgdG8gbmV1cm9ucyBpbiB0aGUgbmV4dCBsYXllclxuICAgICAgdGhpcy5jb25uZWN0aW9uc1tsXSA9IFtdO1xuXG4gICAgICAvLyBSZXNldCBpbnB1dCAmIG91dHB1dHNcbiAgICAgIHRoaXMubmV1cm9uc1tsICsgMV0uZm9yRWFjaChuZXh0TmV1cm9uID0+IHsgbmV4dE5ldXJvbi5yZXNldElucHV0cygpIH0pO1xuICAgICAgdGhpcy5uZXVyb25zW2xdLmZvckVhY2gobmV4dE5ldXJvbiA9PiB7IG5leHROZXVyb24ucmVzZXRPdXRwdXRzKCkgfSk7XG5cbiAgICAgIHRoaXMubmV1cm9uc1tsICsgMV0uZm9yRWFjaCgobmV4dE5ldXJvbiwgdG9JZHgpID0+IHsgLy8gSWYgeW91IHdvbmRlciB3aHkgdGhpcyBjeWNsZXMgYXJlIHN3aXRjaGVkLCBpdCdzIGJlY2F1c2Ugb2YgdGhlIGJpYXNcbiAgICAgICAgdGhpcy5uZXVyb25zW2xdLmZvckVhY2goKGN1cnJOZXVyb24sIGZyb21JZHgpID0+IHtcbiAgICAgICAgICBsZXQgd2VpZ2h0O1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB3ZWlnaHQgPSB0aGlzLndlaWdodExpc3RbbF1bdG9JZHhdW2Zyb21JZHhdXG4gICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAvLyBIYXBwZW5zIGlmIG5ldyBsYXllcnMgaGF2ZSBiZWVuIGFkZGVkIC0gdXNlIGRlZmF1bHQgdmFsdWUgZnJvbSBDb25uZWN0aW9uXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbihjdXJyTmV1cm9uLCBuZXh0TmV1cm9uLCB3ZWlnaHQpXG4gICAgICAgICAgY3Vyck5ldXJvbi5hZGRPdXRwdXQoY29ubmVjdGlvbik7XG4gICAgICAgICAgbmV4dE5ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xdLnB1c2goY29ubmVjdGlvbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBiaWFzO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGJpYXMgPSB0aGlzLmJpYXNMaXN0W2xdW3RvSWR4XTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgLy8gSGFwcGVucyBpZiBuZXcgbGF5ZXJzIGhhdmUgYmVlbiBhZGRlZCAtIHVzZSBkZWZhdWx0IHZhbHVlIGZyb20gQ29ubmVjdGlvblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGJpYXMgbmV1cm9uIHRvIGVhY2ggbGF5ZXJcbiAgICAgICAgY29uc3QgYmlhc0Nvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbih0aGlzLmJpYXNOZXVyb24sIG5leHROZXVyb24sIGJpYXMpO1xuICAgICAgICBuZXh0TmV1cm9uLmFkZElucHV0KGJpYXNDb25uZWN0aW9uKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsXS5wdXNoKGJpYXNDb25uZWN0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXROZXVyb25zKCkge1xuICAgIHJldHVybiB0aGlzLm5ldXJvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29ubmVjdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0SW5wdXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0U2l6ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPdXRwdXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLm91dHB1dFNpemU7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGF5ZXJDbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMubGF5ZXJDbnQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0SGlkZGVuTGF5ZXJTaXplcygpIHtcbiAgICByZXR1cm4gdGhpcy5oaWRkZW5MYXllclNpemVzO1xuICB9XG5cbiAgcHVibGljIHNldFJhdGUobmV3UmF0ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5yYXRlID0gbmV3UmF0ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJdGVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlckNudDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRSZWd1bGFyaXphdGlvblR5cGUocmVnVHlwZTogUmVndWxhcml6YXRpb25zKSB7XG4gICAgdGhpcy5yZWdUeXBlID0gcmVnVHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRSZWd1bGFyaXphdGlvblJhdGUocmF0ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5sYW1iZGEgPSByYXRlO1xuICB9XG5cbiAgcHVibGljIGdldFRyYWluaW5nU2FtcGxlcygpIHtcbiAgICByZXR1cm4gdGhpcy50cmFpblNhbXBsZXM7XG4gIH1cblxuICBwdWJsaWMgc2V0VHJhaW5pbmdTYW1wbGVzKHNhbXBsZXM6IFRyYWluU2FtcGxlW10pIHtcbiAgICB0aGlzLnRyYWluU2FtcGxlcyA9IHNhbXBsZXM7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tIFwiLi9Db25uZWN0aW9uXCI7XG5pbXBvcnQgeyBTSUdNT0lEIH0gZnJvbSBcIi4vSGVscGVyT2JqZWN0c1wiO1xuXG5leHBvcnQgY2xhc3MgTmV1cm9uIHtcbiAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBhY3RpdmF0aW9uOiBudW1iZXI7XG4gIHByaXZhdGUgaW5wdXRzOiBDb25uZWN0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBvdXRwdXRzOiBDb25uZWN0aW9uW10gPSBbXTtcblxuICAvLyBUaGUgZGVyaXZhdGlvbiBvZiBDIHdpdGggcmVzcGVjdCB0byB6XG4gIHByaXZhdGUgc2lnbWE6IG51bWJlcjtcbiAgcHJpdmF0ZSBpc0lucHV0OiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaXNDYWxjdWxhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaXNCaWFzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBpc0JpYXMgPSBmYWxzZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pc0JpYXMgPSBpc0JpYXM7XG4gIH07XG5cbiAgcHVibGljIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJc0JpYXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNCaWFzO1xuICB9XG5cbiAgcHVibGljIHNldEFzSW5wdXROZXVyb24oYWN0aXZhdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy5pc0lucHV0ID0gdHJ1ZTtcbiAgICB0aGlzLmFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICAgIHRoaXMuaW5wdXRzID0gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbnB1dChhY3RpdmF0aW9uOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuaXNJbnB1dCkge1xuICAgICAgdGhyb3cgJ0Nhbm5vdCBzZXQgYWN0aXZhdGlvbiBvZiBub24taW5wdXQgbmV1cm9uJztcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICB9XG5cbiAgcHVibGljIHNldFNpZ21hKHNpZ21hOiBudW1iZXIpIHtcbiAgICB0aGlzLnNpZ21hID0gc2lnbWE7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5wdXQoaW5wdXQ6IENvbm5lY3Rpb24pIHtcbiAgICB0aGlzLmlucHV0cy5wdXNoKGlucHV0KTtcbiAgfTtcblxuICBwdWJsaWMgZ2V0SW5wdXRzKCk6IENvbm5lY3Rpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRzO1xuICB9XG5cbiAgcHVibGljIGFkZE91dHB1dChvdXRwdXQ6IENvbm5lY3Rpb24pIHtcbiAgICB0aGlzLm91dHB1dHMucHVzaChvdXRwdXQpO1xuICB9XG5cbiAgcHVibGljIGdldE91dHB1dHMoKTogQ29ubmVjdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5vdXRwdXRzO1xuICB9XG5cbiAgcHVibGljIHNldE91dHB1dHMoY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXSkge1xuICAgIHRoaXMub3V0cHV0cyA9IGNvbm5lY3Rpb25zO1xuICB9XG5cbiAgcHVibGljIHNldElucHV0cyhjb25uZWN0aW9uczogQ29ubmVjdGlvbltdKSB7XG4gICAgdGhpcy5pbnB1dHMgPSBjb25uZWN0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyByZXNldElucHV0cygpIHtcbiAgICB0aGlzLmlucHV0cyA9IFtdO1xuICB9XG5cbiAgcHVibGljIHJlc2V0T3V0cHV0cygpIHtcbiAgICB0aGlzLm91dHB1dHMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGdldEFjdGl2YXRpb24oKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5pc0JpYXMpIHRoaXMuYWN0aXZhdGlvbiA9IDE7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZhdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTaWdtYSgpIHtcbiAgICByZXR1cm4gdGhpcy5zaWdtYTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVBY3RpdmF0aW9uKCk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLmlzSW5wdXQgJiYgIXRoaXMuaXNDYWxjdWxhdGVkICYmICF0aGlzLmlzQmlhcykge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uID0gU0lHTU9JRC5vdXRwdXQodGhpcy5pbnB1dHMucmVkdWNlKChhY2MsIGN1cnJDb25uKSA9PiBhY2MgKyBjdXJyQ29ubi5jYWxjdWxhdGVWYWx1ZSgpLCAwKSk7XG4gICAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldEFjdGl2YXRpb24oKTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=