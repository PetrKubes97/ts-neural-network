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
        // y = ax + c
        const a = (outputNeuron.y - inputNeuron.y) / (outputNeuron.x - inputNeuron.x);
        const c = outputNeuron.y - a * outputNeuron.x;
        const x = (outputNeuron.x - 60);
        const y = a * x + c;
        this.ctx.font = `12px`;
        this.ctx.fillText(Number(weight).toFixed(4), x, y);
        this.ctx.moveTo(inputNeuron.x, inputNeuron.y);
        this.ctx.lineTo(outputNeuron.x, outputNeuron.y);
        this.ctx.closePath();
        this.ctx.stroke();
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
    neuralCore.addTrainingSet([3, 0, 1], [1, 0]);
    // Set default values
    input = new Array(neuralCore.getInputSize());
    input.fill(1);
    neuralCore.evaluate(input);
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
        const x = neuron.x - 50;
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
        this.weight = weight;
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
        this.biasList = [[0.4, 0.2], [0.6, 0.3]];
        this.weightList = [
            [[0.1, 0.2, 0.6], [0.4, 0.3, 0.1]],
            [[0.2, 0.1], [0.1, 0.4]]
        ];
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
                    const connection = new _Connection__WEBPACK_IMPORTED_MODULE_1__["Connection"](neuron, newNeuron, 1);
                    neuron.addOutput(connection);
                    newNeuron.addInput(connection);
                    this.connections[layerIdx - 1].push(connection);
                });
                // Dont forget the bias
                const connection = new _Connection__WEBPACK_IMPORTED_MODULE_1__["Connection"](this.biasNeuron, newNeuron, 1);
                newNeuron.addInput(connection);
                this.connections[layerIdx - 1].push(connection);
            }
            if (!isOutput) {
                //// Add connections to the next layer
                this.neurons[layerIdx + 1].forEach((neuron, idx) => {
                    const connection = new _Connection__WEBPACK_IMPORTED_MODULE_1__["Connection"](newNeuron, neuron, 1);
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
                    let weight = this.weightList[l][toIdx][fromIdx];
                    const connection = new _Connection__WEBPACK_IMPORTED_MODULE_1__["Connection"](currNeuron, nextNeuron, weight);
                    currNeuron.addOutput(connection);
                    nextNeuron.addInput(connection);
                    this.connections[l].push(connection);
                });
                const bias = this.biasList[l][toIdx];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Zpc3VhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL0Nvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25ldXJhbE5ldHdvcmsvSGVscGVyT2JqZWN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV1cmFsTmV0d29yay9OZXVyYWxDb3JlLnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL05ldXJvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0VNO0lBUUosWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sR0FBRyxLQUFLO1FBQ3BELElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNmLENBQUM7Q0FDRjtBQUVLO0lBU0osWUFBWSxPQUEwQjtRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRU0sSUFBSSxDQUFDLE9BQW1CLEVBQUUsV0FBMkI7UUFDMUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQy9CLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXJELFVBQVU7UUFDVixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQzlCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25ELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQzdCLE1BQU0sQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDbEMsTUFBTSxDQUFDLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUVqQyxNQUFNLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2hHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUUxQyxJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDaEQ7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUM5QixNQUFNLENBQUMsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRWpELE1BQU0sY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sSUFBSSxFQUFFLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDOUYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDM0M7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILGNBQWM7UUFDZCxNQUFNLGVBQWUsR0FBRyxJQUFJLEdBQUcsRUFBMEIsQ0FBQztRQUMxRCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FDMUIsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsaURBQWdEO1NBQzdILENBQUM7UUFFRixXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ2xDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtnQkFDM0IsTUFBTSxVQUFVLEdBQ2QsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ2YsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUUxQyxJQUFJLENBQUMsY0FBYyxDQUNqQixlQUFlLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUMvQixlQUFlLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUMzRCxVQUFVLENBQUMsU0FBUyxFQUFFLENBQ3ZCLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLFVBQVUsQ0FBQyxjQUE4QjtRQUMvQyxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLGtCQUFrQixDQUFDO1FBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixJQUFJLGNBQWMsQ0FBQyxNQUFNO1lBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLG1CQUFtQixDQUFDOztZQUV6QyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxzQkFBc0IsY0FBYyxDQUFDLFVBQVUsR0FBRyxDQUFDO1FBQzFFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLGtCQUFrQjtRQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsa0JBQWtCO1FBQ3ZDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxRQUFRLE1BQU0sSUFBSSxDQUFDO1FBQ25DLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUNmLElBQUksRUFDSixjQUFjLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQ3ZELGNBQWMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTyxjQUFjLENBQUMsV0FBMkIsRUFBRSxZQUE0QixFQUFFLE1BQWM7UUFDOUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3pCLHNCQUFzQixDQUFDO1FBRXpCLGFBQWE7UUFDYixNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzdFLE1BQU0sQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNoQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUNiLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQ3pCLENBQUMsRUFDRCxDQUFDLENBQUMsQ0FBQztRQUVQLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU0sdUJBQXVCO1FBQzVCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQ25DLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNySnlEO0FBQ0Y7QUFDcUI7QUFHNUUsTUFBYyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQVMsRUFBRSxLQUFhLEVBQUUsRUFBRTtJQUNuRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ2pCLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLEVBQUUsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7QUFDeEUsQ0FBQztBQUVBLE1BQWMsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLEdBQVksRUFBRSxFQUFFO0lBQ2xELFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxRQUFRLEVBQUUsQ0FBQztBQUNiLENBQUM7QUFFQSxNQUFjLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxHQUFZLEVBQUUsUUFBZ0IsRUFBRSxFQUFFO0lBQ3JFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUMsSUFBSSxRQUFRLElBQUksQ0FBQyxFQUFFO1FBQ2pCLElBQUksR0FBRztZQUNMLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBRWQsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQ2Y7SUFFRCxRQUFRLEVBQUUsQ0FBQztBQUNiLENBQUM7QUFFQSxNQUFjLENBQUMsS0FBSyxHQUFHLENBQUMsYUFBc0IsRUFBRSxFQUFFO0lBQ2pELElBQUksS0FBSyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRSxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFdkQsaUJBQWlCO0lBQ2pCLFFBQVEsWUFBWSxDQUFDLEtBQUssRUFBRTtRQUMxQixLQUFLLElBQUk7WUFDUCxVQUFVLENBQUMscUJBQXFCLENBQUMsNEVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyRCxNQUFNO1FBQ1IsS0FBSyxJQUFJO1lBQ1AsVUFBVSxDQUFDLHFCQUFxQixDQUFDLDRFQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckQsTUFBTTtRQUNSLEtBQUssTUFBTTtZQUNULFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyw0RUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELE1BQU07S0FDVDtJQUVELFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBRXhFLElBQUksV0FBVyxDQUFDLE9BQU8sSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO1FBQzNDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTTtRQUMzQixRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDNUQ7U0FBTSxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7UUFDM0IsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hCLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsUUFBUSxDQUFDLFNBQVMsR0FBRyxPQUFPO0tBQzdCO1NBQU07UUFDTCxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDckI7QUFDSCxDQUFDO0FBRUQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtJQUNyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzlCLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNwQjtJQUNELFFBQVEsRUFBRSxDQUFDO0FBQ2IsQ0FBQztBQUVBLE1BQWMsQ0FBQyxlQUFlLEdBQUcsR0FBRyxFQUFFO0lBQ3JDLElBQUk7UUFDRixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25ELFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDekIsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsUUFBUSxFQUFFLENBQUM7S0FDWjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ1o7QUFDSCxDQUFDO0FBQ0EsTUFBYyxDQUFDLFVBQVUsR0FBRyxHQUFHLEVBQUU7SUFDaEMsTUFBTSxPQUFPLEdBQWlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdELFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0IsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ25CLFFBQVEsRUFBRSxDQUFDO0FBQ2IsQ0FBQztBQUNBLE1BQWMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO0lBQzdCLE1BQU0sT0FBTyxHQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hELFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUIsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ25CLFFBQVEsRUFBRSxDQUFDO0FBQ2IsQ0FBQztBQUVBLE1BQWMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFO0lBQzNCLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNuQixRQUFRLEVBQUUsQ0FBQztBQUNiLENBQUM7QUFFQSxNQUFjLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRTtJQUNwRCxLQUFLLEdBQUcsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ25ELFFBQVEsRUFBRSxDQUFDO0FBQ2IsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO0lBQ25CLElBQUksRUFBRSxDQUFDO0FBQ1QsQ0FBQyxDQUFDO0FBRUYsSUFBSSxVQUFzQixDQUFDO0FBQzNCLElBQUksVUFBc0IsQ0FBQztBQUMzQixJQUFJLEtBQWUsQ0FBQztBQUNwQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFFcEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBRW5CLElBQUksYUFBMEIsQ0FBQztBQUMvQixJQUFJLGFBQTBCLENBQUM7QUFDL0IsSUFBSSxNQUF5QixDQUFDO0FBRTlCLElBQUksSUFBaUIsQ0FBQztBQUN0QixJQUFJLElBQWlCLENBQUM7QUFFdEIsSUFBSSxTQUEyQixDQUFDO0FBQ2hDLElBQUksVUFBNEIsQ0FBQztBQUNqQyxJQUFJLFlBQThCLENBQUM7QUFDbkMsSUFBSSxZQUE4QixDQUFDO0FBQ25DLElBQUksV0FBNkIsQ0FBQztBQUNsQyxJQUFJLFFBQTBCLENBQUM7QUFFL0IsSUFBSSx1QkFBb0MsQ0FBQztBQUN6QyxJQUFJLHFCQUFrQyxDQUFDO0FBQ3ZDLElBQUksZ0JBQWtDLENBQUM7QUFDdkMsSUFBSSxZQUE4QixDQUFDO0FBQ25DLElBQUksU0FBMkIsQ0FBQztBQUVoQyxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7SUFDaEIsTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFzQixDQUFDO0lBQ2pFLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDMUQsYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMxRCxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM5QyxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQXFCLENBQUM7SUFDdEUsVUFBVSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFxQixDQUFDO0lBQ3hFLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLDJCQUEyQixDQUFxQixDQUFDO0lBQ3hGLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLDJCQUEyQixDQUFxQixDQUFDO0lBQ3hGLHFCQUFxQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsMEJBQTBCLENBQXFCLENBQUM7SUFDaEcsdUJBQXVCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyw2QkFBNkIsQ0FBcUIsQ0FBQztJQUNyRyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFxQixDQUFDO0lBQ3JGLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFxQixDQUFDO0lBQ25GLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFxQixDQUFDO0lBQzdFLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFxQixDQUFDO0lBQ2pGLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBcUIsQ0FBQztJQUVwRSxVQUFVLEdBQUcsSUFBSSxzREFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXBDLFFBQVEsRUFBRSxDQUFDO0FBQ2IsQ0FBQztBQUVELE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTtJQUNwQixVQUFVLEdBQUcsSUFBSSxvRUFBVSxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFaEUsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU3QyxxQkFBcUI7SUFDckIsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFZCxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLFFBQVEsRUFBRSxDQUFDO0FBQ2IsQ0FBQztBQUVELE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTtJQUNwQixVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTNCLElBQUksT0FBTyxHQUFHLGtCQUFrQixDQUM5QixRQUFRLEVBQ1IsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUNuQyx3QkFBd0IsRUFDeEIseUJBQXlCLENBQzFCLENBQUM7SUFHRixPQUFPLElBQUksa0JBQWtCLENBQzNCLFlBQVksRUFDWixVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQ3BDLDRCQUE0QixFQUM1Qiw2QkFBNkIsQ0FDOUIsQ0FBQztJQUVGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JELE9BQU8sSUFBSSxrQkFBa0IsQ0FDM0IsbUJBQW1CLEVBQ25CLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUM5QywyQkFBMkIsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUNuQyw0QkFBNEIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUNyQyxDQUFDO0tBQ0g7SUFFRCxPQUFPLElBQUksa0JBQWtCLENBQzNCLGFBQWEsRUFDYixVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQ3JDLDJCQUEyQixVQUFVLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQzFELDRCQUE0QixVQUFVLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQzVELENBQUM7SUFFRixhQUFhLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUVsQyxhQUFhLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUU3QixJQUFJLENBQUMsVUFBVSxDQUFDLHVCQUF1QixFQUFFLEVBQUU7UUFDekMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLEVBQUUsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7S0FDdkU7SUFHRCxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDekIsVUFBVSxDQUFDLHVCQUF1QixFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBc0IsRUFBRSxFQUFFO1FBQ3RFLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsYUFBYSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0MsYUFBYSxDQUFDLFNBQVMsSUFBSTt3Q0FDUyxDQUFDLGFBQWEsQ0FBQyxlQUFlLGFBQWE7OERBQ3JCLE1BQU0sQ0FBQyxVQUFVO3VCQUN4RCxNQUFNLENBQUMsRUFBRSxrQkFBa0IsQ0FBQztJQUNqRCxDQUFDLENBQUM7SUFFRixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN0RCxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUVqRCwrQkFBK0I7SUFDL0IsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEQsTUFBTSxJQUFJLHlCQUF5QixDQUFDLE9BQU8sQ0FBQztLQUM3QztJQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbkQsTUFBTSxJQUFJLG9EQUFvRCxDQUFDLE9BQU8sQ0FBQztLQUN4RTtJQUNELHVCQUF1QixDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7SUFFM0Msb0JBQW9CO0lBQ3BCLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUN0QixVQUFVLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDdEQsWUFBWSxJQUFJLDREQUE0RCxHQUFHLEtBQUssQ0FBQztRQUNyRixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN6QixZQUFZLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLFlBQVksSUFBSSxpQ0FBaUMsR0FBRyxPQUFPLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFDSCxZQUFZLElBQUksT0FBTyxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0gscUJBQXFCLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztJQUMvQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUN4RSxDQUFDO0FBRUQsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxJQUFZLEVBQUUsVUFBa0IsRUFBRSxVQUFrQixFQUFVLEVBQUU7SUFDekcsT0FBTyxnQ0FBZ0MsS0FBSyx3Q0FBd0MsSUFBSTs7c0VBRXBCLFVBQVU7c0VBQ1YsVUFBVTttQkFDN0QsQ0FBQztBQUNwQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNqUUs7SUFNSixZQUFZLEtBQWEsRUFBRSxNQUFjLEVBQUUsTUFBYztRQUZqRCx3QkFBbUIsR0FBYSxFQUFFLENBQUM7UUFHekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVNLHFCQUFxQixDQUFDLFlBQW9CO1FBQy9DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVNLHdCQUF3QjtRQUM3QixNQUFNLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFTSxTQUFTO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxjQUFjO1FBQ25CLE9BQU8sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDOUQsQ0FBQztJQUVNLGVBQWU7UUFDcEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFTSxjQUFjO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQ0E7QUFBQSxDQUFDO0FBRUssTUFBTSxPQUFPLEdBQWU7SUFDakMsTUFBTSxFQUFFLENBQUMsQ0FBUyxFQUFVLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELEdBQUcsRUFBRSxDQUFDLENBQVMsRUFBVSxFQUFFO1FBQ3pCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsT0FBTyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQztDQUNGLENBQUM7QUFFRixJQUFZLGVBSVg7QUFKRCxXQUFZLGVBQWU7SUFDekIsaURBQUU7SUFDRixpREFBRTtJQUNGLHFEQUFJO0FBQ04sQ0FBQyxFQUpXLGVBQWUsS0FBZixlQUFlLFFBSTFCO0FBRU0sTUFBTSxLQUFLLEdBQUc7SUFDbkIsSUFBSSxFQUFFLENBQUMsV0FBMkIsRUFBVSxFQUFFO1FBQzVDLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FDdkIsQ0FBQyxJQUFJLEVBQUUsU0FBdUIsRUFBRSxFQUFFO1lBQ2hDLE9BQU8sSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEYsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELEdBQUcsRUFBRSxDQUFDLE1BQWMsRUFBRSxTQUFpQixFQUFVLEVBQUU7UUFDakQsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUksQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7SUFDcEQsQ0FBQztDQUNGO0FBRU0sTUFBTSxLQUFLLEdBQUc7SUFDbkIsSUFBSSxFQUFFLENBQUMsV0FBMkIsRUFBVSxFQUFFO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUMvQixDQUFDLElBQUksRUFBRSxTQUF1QixFQUFFLEVBQUU7WUFDaEMsT0FBTyxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxhQUFJLENBQUMsU0FBUyxFQUFFLEVBQUksQ0FBQyxHQUFFLENBQUMsQ0FBQztRQUMvRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsR0FBRyxFQUFFLENBQUMsVUFBa0IsRUFBRSxTQUFpQixFQUFVLEVBQUU7UUFDckQsT0FBTyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUNGO0FBRUs7SUFJSixZQUFZLEtBQWUsRUFBRSxNQUFnQjtRQUMzQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0NBQ0Y7QUFFTSxNQUFNLHNCQUFzQixHQUFHLENBQUMsV0FBMkIsRUFBVSxFQUFFO0lBQzVFLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNEaUM7QUFDUTtBQUNvRTtBQUV4RztJQXdCSixZQUFZLFNBQWlCLEVBQUUsZ0JBQTBCLEVBQUUsVUFBa0I7UUFsQnJFLGFBQVEsR0FBZSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLGVBQVUsR0FBaUI7WUFDL0IsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDM0I7UUFFTyxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRVosU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixZQUFPLEdBQW9CLDhEQUFlLENBQUMsSUFBSSxDQUFDO1FBRWhELGVBQVUsR0FBRyxJQUFJLDhDQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RDLFlBQU8sR0FBZSxFQUFFLENBQUM7UUFDekIsZ0JBQVcsR0FBbUIsRUFBRSxDQUFDO1FBRWpDLGlCQUFZLEdBQWtCLEVBQUUsQ0FBQztRQUd2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRTVDLFFBQVE7UUFDUixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUV0QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRU8sSUFBSTtRQUNWLHFCQUFxQjtRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxzQ0FBc0M7WUFDdEMsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7WUFDMUIsUUFBUSxDQUFDLEVBQUU7Z0JBQ1QsS0FBSyxDQUFDO29CQUNKLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQ25DLE1BQU07Z0JBQ1IsS0FBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUM7b0JBQ25DLGlCQUFpQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7b0JBQ3BDLE1BQU07Z0JBQ1I7b0JBQ0UsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDakQsTUFBTTthQUNUO1lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFFckIsY0FBYztZQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLDhDQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQywwREFBMEQ7aUJBQ25HO2FBQ0Y7U0FDRjtRQUVELHlCQUF5QjtRQUN6QixJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVNLFVBQVUsQ0FBQyxPQUFxQjtRQUVyQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRU0sT0FBTyxDQUFDLFFBQW9CO1FBRWpDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFFTSxRQUFRLENBQUMsS0FBZTtRQUM3QixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQyxNQUFNLDJCQUEyQixDQUFDO1NBQ25DO1FBQ0Qsd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUMxRSxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDL0MsTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRU0sY0FBYyxDQUFDLEtBQWUsRUFBRSxNQUFnQjtRQUNyRCxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQyxNQUFNLDJCQUEyQixDQUFDO1NBQ25DO2FBQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDM0MsTUFBTSw0QkFBNEIsQ0FBQztTQUNwQztRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksMERBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNqQyxPQUFPLENBQUMsQ0FBQztTQUNWO1FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsT0FBTyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3pFLE9BQU8sR0FBRyxHQUFHLFVBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBSSxDQUFDLEVBQUM7WUFDaEUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRU4saUJBQWlCO1FBQ2pCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQixRQUFRLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDcEIsS0FBSyw4REFBZSxDQUFDLEVBQUU7Z0JBQ3JCLE9BQU8sR0FBRyxvREFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU07WUFDUixLQUFLLDhEQUFlLENBQUMsRUFBRTtnQkFDckIsT0FBTyxHQUFHLG9EQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDdkMsTUFBTTtZQUNSLEtBQUssOERBQWUsQ0FBQyxJQUFJO2dCQUN2QixPQUFPLEdBQUcsQ0FBQyxDQUFDO2dCQUNaLE1BQU07U0FDVDtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7WUFDckQsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7SUFDMUIsQ0FBQztJQUVNLEtBQUs7UUFDVixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUUzQixxQ0FBcUM7WUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDdEQsTUFBTSxRQUFRLEdBQ1osQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFHLHNEQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2dCQUV0RixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1lBRUgsdURBQXVEO1lBQ3ZELEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQkFDakMsTUFBTSxRQUFRLEdBQ1osTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRTt3QkFDN0MsT0FBTyxHQUFHLEdBQUcsVUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDaEYsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLHNEQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO29CQUM5QyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM1QixDQUFDLENBQUMsQ0FBQzthQUNKO1lBRUQsZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3JDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtvQkFFL0IsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUNmLFFBQVEsSUFBSSxDQUFDLE9BQU8sRUFBRTt3QkFDcEIsS0FBSyw4REFBZSxDQUFDLEVBQUU7NEJBQ3JCLE1BQU0sR0FBRyxvREFBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEVBQUUsNkVBQXNCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7NEJBQ3JGLE1BQU07d0JBQ1IsS0FBSyw4REFBZSxDQUFDLEVBQUU7NEJBQ3JCLE1BQU0sR0FBRyxvREFBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEVBQUUsNkVBQXNCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7NEJBQ3JGLE1BQU07d0JBQ1IsS0FBSyw4REFBZSxDQUFDLElBQUk7NEJBQ3ZCLE1BQU0sR0FBRyxDQUFDLENBQUM7NEJBQ1gsTUFBTTtxQkFDVDtvQkFFRCxNQUFNLFlBQVksR0FDaEIsVUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsRUFBRTt3QkFDdkMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLGFBQWEsRUFBRTt3QkFDM0MsSUFBSSxDQUFDLElBQUk7d0JBQ1QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxpQkFBaUI7b0JBRXpDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDakQsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsdURBQXVEO1FBQ3ZELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDckMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO2dCQUMvQixVQUFVLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxHQUFZO1FBQ2xDLElBQUksR0FBRyxFQUFFO1lBQ1AsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRWhCLHlCQUF5QjtZQUN6QixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFFM0QsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFOUQscUNBQXFDO1lBQ3JDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzlEO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFFO2dCQUN0QixPQUFPO2FBQ1I7WUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUV2QiwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU5RCxxQ0FBcUM7WUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDOUQ7SUFDSCxDQUFDO0lBRUQsb0hBQW9IO0lBQzdHLGlCQUFpQixDQUFDLEdBQVksRUFBRSxRQUFnQjtRQUNyRCxNQUFNLE9BQU8sR0FBRyxRQUFRLElBQUksQ0FBQyxDQUFDO1FBQzlCLE1BQU0sUUFBUSxHQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUMvQyxNQUFNLFFBQVEsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUV2QyxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqQyxJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFDO1NBQ25EO2FBQ0ksSUFBSSxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFNBQVMsSUFBSSxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7U0FDeEI7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDO1lBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxHQUFHLEVBQUU7WUFDUCxJQUFJLFlBQVksQ0FBQztZQUVqQixJQUFJLFFBQVEsRUFBRTtnQkFDWixZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDeEQ7aUJBQ0ksSUFBSSxPQUFPLEVBQUU7Z0JBQ2hCLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQzthQUNuQztpQkFBTTtnQkFDTCxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7YUFDcEM7WUFFRCxNQUFNLFNBQVMsR0FBRyxJQUFJLDhDQUFNLENBQUMsU0FBUyxRQUFRLEdBQUcsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUVqRCxJQUFJLE9BQU87Z0JBQ1QsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBR2hDLHdDQUF3QztZQUN4QyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDakQsTUFBTSxVQUFVLEdBQUcsSUFBSSxzREFBVSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZELE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzdCLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbEQsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsdUJBQXVCO2dCQUN2QixNQUFNLFVBQVUsR0FBRyxJQUFJLHNEQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNqRDtZQUVELElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2Isc0NBQXNDO2dCQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0JBQ2pELE1BQU0sVUFBVSxHQUFHLElBQUksc0RBQVUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDOUMsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO2FBQU07WUFDTCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ25ELHFDQUFxQztZQUNyQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUM1QyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTt3QkFDMUQsT0FBTyxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUMzRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNOLENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxpQ0FBaUM7WUFDakMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDYixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQkFDNUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7d0JBQ3hELE9BQU8sVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDMUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQzthQUNKO1lBRUQsZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBc0IsRUFBRSxFQUFFO29CQUNoRyxPQUFPLFVBQVUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzNFLENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFzQixFQUFFLEVBQUU7b0JBQ3hGLE9BQU8sVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDMUUsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO0lBQ0gsQ0FBQztJQUVNLEtBQUs7UUFDVixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVPLG9CQUFvQixDQUFDLFFBQWdCLEVBQUUsU0FBaUI7UUFDOUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksOENBQU0sQ0FBQyxTQUFTLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pFO0lBQ0gsQ0FBQztJQUVPLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxTQUFTO1FBQzdDLEtBQUssSUFBSSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsZ0ZBQWdGO1lBQ2hGLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRXpCLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsWUFBWSxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFFckUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsRUFBRTtvQkFDOUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUM7b0JBQy9DLE1BQU0sVUFBVSxHQUFHLElBQUksc0RBQVUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQztvQkFDakUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDakMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3ZDLENBQUMsQ0FBQyxDQUFDO2dCQUVILE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUVwQyxnQ0FBZ0M7Z0JBQ2hDLE1BQU0sY0FBYyxHQUFHLElBQUksc0RBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDekUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFTSxVQUFVO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFTSxjQUFjO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRU0sWUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVNLGFBQWE7UUFDbEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxXQUFXO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sbUJBQW1CO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQy9CLENBQUM7SUFFTSxPQUFPLENBQUMsT0FBZTtRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRU0sWUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVNLHFCQUFxQixDQUFDLE9BQXdCO1FBQ25ELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFTSxxQkFBcUIsQ0FBQyxJQUFZO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxrQkFBa0I7UUFDdkIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFTSxrQkFBa0IsQ0FBQyxPQUFzQjtRQUM5QyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztJQUM5QixDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3WnlDO0FBRXBDO0lBYUosWUFBWSxJQUFZLEVBQUUsTUFBTSxHQUFHLEtBQUs7UUFUaEMsV0FBTSxHQUFpQixFQUFFLENBQUM7UUFDMUIsWUFBTyxHQUFpQixFQUFFLENBQUM7UUFJM0IsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixXQUFNLEdBQVksS0FBSyxDQUFDO1FBRzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFBQSxDQUFDO0lBRUssT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRU0sU0FBUztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRU0sZ0JBQWdCLENBQUMsVUFBa0I7UUFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVNLFFBQVEsQ0FBQyxVQUFrQjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixNQUFNLDJDQUEyQyxDQUFDO1NBQ25EO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVNLFFBQVEsQ0FBQyxLQUFhO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFTSxRQUFRLENBQUMsS0FBaUI7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUFBLENBQUM7SUFFSyxTQUFTO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxTQUFTLENBQUMsTUFBa0I7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVNLFVBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVNLFVBQVUsQ0FBQyxXQUF5QjtRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztJQUM3QixDQUFDO0lBRU0sU0FBUyxDQUFDLFdBQXlCO1FBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFFTSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFTSxZQUFZO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTSxLQUFLO1FBQ1YsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVNLGFBQWE7UUFDbEIsSUFBSSxJQUFJLENBQUMsTUFBTTtZQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRU0sbUJBQW1CO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDdkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxzREFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1RyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUMxQjtRQUNELE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzlCLENBQUM7Q0FDRiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBOZXVyb24gfSBmcm9tIFwiLi9uZXVyYWxOZXR3b3JrL05ldXJvblwiO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gXCIuL25ldXJhbE5ldHdvcmsvQ29ubmVjdGlvblwiO1xuXG5leHBvcnQgY2xhc3MgRHJhd2FibGVOZXVyb24ge1xuICBwdWJsaWMgeDogbnVtYmVyO1xuICBwdWJsaWMgeTogbnVtYmVyO1xuICBwdWJsaWMgYWN0aXZhdGlvbjogbnVtYmVyO1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwdWJsaWMgaXNCaWFzOiBib29sZWFuO1xuICBwdWJsaWMgaWQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcih4LCB5LCBhY3RpdmF0aW9uLCBuYW1lLCBpZCwgaXNCaWFzID0gZmFsc2UpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5hY3RpdmF0aW9uID0gYWN0aXZhdGlvbjtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaXNCaWFzID0gaXNCaWFzO1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmlzdWFsaXplciB7XG5cbiAgcHJpdmF0ZSBjb250ZW50OiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgcHJpdmF0ZSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlcjtcbiAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xuICBwcml2YXRlIGRyYXdhYmxlTmV1cm9uczogRHJhd2FibGVOZXVyb25bXTtcbiAgcHJpdmF0ZSBkcmF3YWJsZUlucHV0TmV1cm9uczogRHJhd2FibGVOZXVyb25bXTtcblxuICBjb25zdHJ1Y3Rvcihjb250ZW50OiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgdGhpcy5jdHggPSBjb250ZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5oZWlnaHQgPSBjb250ZW50LmhlaWdodDtcbiAgICB0aGlzLndpZHRoID0gY29udGVudC53aWR0aDtcbiAgfVxuXG4gIHB1YmxpYyBkcmF3KG5ldXJvbnM6IE5ldXJvbltdW10sIGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW11bXSkge1xuICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICB0aGlzLmRyYXdhYmxlTmV1cm9ucyA9IFtdO1xuICAgIHRoaXMuZHJhd2FibGVJbnB1dE5ldXJvbnMgPSBbXTtcbiAgICBjb25zdCBsZWZ0TWFyZ2luID0gdGhpcy53aWR0aCAvIChuZXVyb25zLmxlbmd0aCArIDEpO1xuXG4gICAgLy8gTmV1cm9uc1xuICAgIG5ldXJvbnMuZm9yRWFjaCgobGF5ZXIsIGxJZHgpID0+IHtcbiAgICAgIGNvbnN0IHRvcE1hcmdpbiA9IHRoaXMuaGVpZ2h0IC8gKGxheWVyLmxlbmd0aCArIDIpO1xuICAgICAgbGF5ZXIuZm9yRWFjaCgobmV1cm9uLCBuSWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IHggPSBsZWZ0TWFyZ2luICogKDEgKyBsSWR4KTtcbiAgICAgICAgY29uc3QgeSA9IHRvcE1hcmdpbiAqICgxICsgbklkeCk7XG5cbiAgICAgICAgY29uc3QgZHJhd2FibGVOZXVyb24gPSBuZXcgRHJhd2FibGVOZXVyb24oeCwgeSwgbmV1cm9uLmdldEFjdGl2YXRpb24oKSwgbmV1cm9uLmdldE5hbWUoKSwgbklkeCk7XG4gICAgICAgIHRoaXMuZHJhd2FibGVOZXVyb25zLnB1c2goZHJhd2FibGVOZXVyb24pO1xuXG4gICAgICAgIGlmIChsSWR4ID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5kcmF3YWJsZUlucHV0TmV1cm9ucy5wdXNoKGRyYXdhYmxlTmV1cm9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChsSWR4ICE9IG5ldXJvbnMubGVuZ3RoIC0gMSkge1xuICAgICAgICBjb25zdCB4ID0gbGVmdE1hcmdpbiAqICgxICsgbElkeCk7XG4gICAgICAgIGNvbnN0IHkgPSB0b3BNYXJnaW4gKiAoMSArIG5ldXJvbnNbbElkeF0ubGVuZ3RoKTtcblxuICAgICAgICBjb25zdCBkcmF3YWJsZU5ldXJvbiA9IG5ldyBEcmF3YWJsZU5ldXJvbih4LCB5LCAxLCBgYmlhcyR7bElkeH1gLCBuZXVyb25zW2xJZHhdLmxlbmd0aCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuZHJhd2FibGVOZXVyb25zLnB1c2goZHJhd2FibGVOZXVyb24pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQ29ubmVjdGlvbnNcbiAgICBjb25zdCBkcmF3YWJsZU5hbWVNYXAgPSBuZXcgTWFwPHN0cmluZywgRHJhd2FibGVOZXVyb24+KCk7XG4gICAgdGhpcy5kcmF3YWJsZU5ldXJvbnMuZm9yRWFjaChcbiAgICAgIChkcmF3YWJsZU5ldXJvbikgPT4gZHJhd2FibGVOYW1lTWFwLnNldChkcmF3YWJsZU5ldXJvbi5uYW1lLCBkcmF3YWJsZU5ldXJvbikvLyBXVEYsIEkgd2FzIG5vdCBhYmxlIHRvIGNyZWF0ZSBtYXAgZnJvbSAyZCBhcnJcbiAgICApO1xuXG4gICAgY29ubmVjdGlvbnMuZm9yRWFjaCgobGF5ZXIsIGxJZHgpID0+IHtcbiAgICAgIGxheWVyLmZvckVhY2goKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgaW5wdXROTmFtZSA9XG4gICAgICAgICAgKGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS5nZXRJc0JpYXMoKSkgP1xuICAgICAgICAgICAgYGJpYXMke2xJZHh9YCA6XG4gICAgICAgICAgICBjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIHRoaXMuZHJhd0Nvbm5lY3Rpb24oXG4gICAgICAgICAgZHJhd2FibGVOYW1lTWFwLmdldChpbnB1dE5OYW1lKSxcbiAgICAgICAgICBkcmF3YWJsZU5hbWVNYXAuZ2V0KGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0TmFtZSgpKSxcbiAgICAgICAgICBjb25uZWN0aW9uLmdldFdlaWdodCgpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZHJhd2FibGVOZXVyb25zLmZvckVhY2goKG5ldXJvbikgPT4ge1xuICAgICAgdGhpcy5kcmF3TmV1cm9uKG5ldXJvbik7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdOZXVyb24oZHJhd2FibGVOZXVyb246IERyYXdhYmxlTmV1cm9uKSB7XG4gICAgLy8gd2hpdGUgYmFja2dyb3VuZFxuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LmFyYyhkcmF3YWJsZU5ldXJvbi54LCBkcmF3YWJsZU5ldXJvbi55LCAyNSwgMCwgMiAqIE1hdGguUEkpO1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGByZ2IoMjU1LDI1NSwyNTUpYDtcbiAgICB0aGlzLmN0eC5maWxsKCk7XG5cbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICBpZiAoZHJhd2FibGVOZXVyb24uaXNCaWFzKVxuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYmEoNDYsNDAsNDIsIDEpYDtcbiAgICBlbHNlXG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBgcmdiYSg2MSwgMjMyLCAyNTUsICR7ZHJhd2FibGVOZXVyb24uYWN0aXZhdGlvbn0pYDtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGByZ2IoNDYsNDAsNDIsIDEpYFxuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgdGhpcy5jdHguYXJjKGRyYXdhYmxlTmV1cm9uLngsIGRyYXdhYmxlTmV1cm9uLnksIDI1LCAwLCAyICogTWF0aC5QSSk7XG4gICAgdGhpcy5jdHguZmlsbCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuXG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYig0Niw0MCw0MiwgMSlgXG4gICAgY29uc3QgaGVpZ2h0ID0gMTY7XG4gICAgdGhpcy5jdHguZm9udCA9IGBib2xkICR7aGVpZ2h0fXB4YDtcbiAgICBjb25zdCB0ZXh0ID0gTnVtYmVyKGRyYXdhYmxlTmV1cm9uLmFjdGl2YXRpb24pLnRvRml4ZWQoNCk7XG4gICAgdGhpcy5jdHguZmlsbFRleHQoXG4gICAgICB0ZXh0LFxuICAgICAgZHJhd2FibGVOZXVyb24ueCAtIHRoaXMuY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoIC8gMixcbiAgICAgIGRyYXdhYmxlTmV1cm9uLnkgKyBoZWlnaHQgLyAzKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd0Nvbm5lY3Rpb24oaW5wdXROZXVyb246IERyYXdhYmxlTmV1cm9uLCBvdXRwdXROZXVyb246IERyYXdhYmxlTmV1cm9uLCB3ZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IE1hdGgubG9nKDEuMDAxICsgTWF0aC5hYnMod2VpZ2h0KSk7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSAod2VpZ2h0ID4gMCkgP1xuICAgICAgYHJnYmEoNjEsIDIzMiwgMjU1LCAxKWAgOlxuICAgICAgYHJnYmEoMjA1LCA4MywgNTIsIDEpYDtcblxuICAgIC8vIHkgPSBheCArIGNcbiAgICBjb25zdCBhID0gKG91dHB1dE5ldXJvbi55IC0gaW5wdXROZXVyb24ueSkgLyAob3V0cHV0TmV1cm9uLnggLSBpbnB1dE5ldXJvbi54KVxuICAgIGNvbnN0IGMgPSBvdXRwdXROZXVyb24ueSAtIGEgKiBvdXRwdXROZXVyb24ueFxuICAgIGNvbnN0IHggPSAob3V0cHV0TmV1cm9uLnggLSA2MCk7XG4gICAgY29uc3QgeSA9IGEgKiB4ICsgY1xuICAgIHRoaXMuY3R4LmZvbnQgPSBgMTJweGA7XG4gICAgdGhpcy5jdHguZmlsbFRleHQoXG4gICAgICAgIE51bWJlcih3ZWlnaHQpLnRvRml4ZWQoNCksXG4gICAgICAgIHgsXG4gICAgICAgIHkpO1xuXG4gICAgdGhpcy5jdHgubW92ZVRvKGlucHV0TmV1cm9uLngsIGlucHV0TmV1cm9uLnkpO1xuICAgIHRoaXMuY3R4LmxpbmVUbyhvdXRwdXROZXVyb24ueCwgb3V0cHV0TmV1cm9uLnkpO1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICB9XG5cbiAgcHVibGljIGdldERyYXdhYmxlSW5wdXROZXVyb25zKCkge1xuICAgIHJldHVybiB0aGlzLmRyYXdhYmxlSW5wdXROZXVyb25zO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWaXN1YWxpemVyLCBEcmF3YWJsZU5ldXJvbiB9IGZyb20gJy4vVmlzdWFsaXplcic7XG5pbXBvcnQgeyBOZXVyYWxDb3JlIH0gZnJvbSAnLi9uZXVyYWxOZXR3b3JrL05ldXJhbENvcmUnO1xuaW1wb3J0IHsgUmVndWxhcml6YXRpb25zLCBUcmFpblNhbXBsZSB9IGZyb20gJy4vbmV1cmFsTmV0d29yay9IZWxwZXJPYmplY3RzJztcbmltcG9ydCB7IE5ldXJvbiB9IGZyb20gJy4vbmV1cmFsTmV0d29yay9OZXVyb24nO1xuXG4od2luZG93IGFzIGFueSkuc2xpZGUgPSAoaTogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKSA9PiB7XG4gIGlucHV0W2ldID0gdmFsdWU7XG4gIG5ldXJhbENvcmUuZXZhbHVhdGUoaW5wdXQpO1xuICB2aXN1YWxpemVyLmRyYXcobmV1cmFsQ29yZS5nZXROZXVyb25zKCksIG5ldXJhbENvcmUuZ2V0Q29ubmVjdGlvbnMoKSk7XG59XG5cbih3aW5kb3cgYXMgYW55KS5hZGRPclJlbW92ZUxheWVyID0gKGFkZDogYm9vbGVhbikgPT4ge1xuICBuZXVyYWxDb3JlLmFkZE9yUmVtb3ZlTGF5ZXIoYWRkKTtcbiAgdXBkYXRlVUkoKTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLmFkZE9yUmVtb3ZlTmV1cm9uID0gKGFkZDogYm9vbGVhbiwgbGF5ZXJJZHg6IG51bWJlcikgPT4ge1xuICBuZXVyYWxDb3JlLmFkZE9yUmVtb3ZlTmV1cm9uKGFkZCwgbGF5ZXJJZHgpO1xuICBpZiAobGF5ZXJJZHggPT0gMCkge1xuICAgIGlmIChhZGQpXG4gICAgICBpbnB1dC5wdXNoKDEpO1xuICAgIGVsc2VcbiAgICAgIGlucHV0LnBvcCgpO1xuICB9XG5cbiAgdXBkYXRlVUkoKTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLnRyYWluID0gKG11bHRpcGxlSXRlcnM6IGJvb2xlYW4pID0+IHtcbiAgbGV0IGl0ZXJzID0gbXVsdGlwbGVJdGVycyA/IE51bWJlci5wYXJzZUludChpdGVyc0lucHV0LnZhbHVlKSA6IDE7XG4gIG5ldXJhbENvcmUuc2V0UmF0ZShOdW1iZXIucGFyc2VGbG9hdChyYXRlSW5wdXQudmFsdWUpKTtcblxuICAvLyBSZWd1bGFyaXphdGlvblxuICBzd2l0Y2ggKHJlZ1R5cGVJbnB1dC52YWx1ZSkge1xuICAgIGNhc2UgXCJMMVwiOlxuICAgICAgbmV1cmFsQ29yZS5zZXRSZWd1bGFyaXphdGlvblR5cGUoUmVndWxhcml6YXRpb25zLkwxKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJMMlwiOlxuICAgICAgbmV1cmFsQ29yZS5zZXRSZWd1bGFyaXphdGlvblR5cGUoUmVndWxhcml6YXRpb25zLkwyKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJub25lXCI6XG4gICAgICBuZXVyYWxDb3JlLnNldFJlZ3VsYXJpemF0aW9uVHlwZShSZWd1bGFyaXphdGlvbnMuTk9ORSk7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIG5ldXJhbENvcmUuc2V0UmVndWxhcml6YXRpb25SYXRlKE51bWJlci5wYXJzZUZsb2F0KHJlZ1JhdGVJbnB1dC52YWx1ZSkpO1xuXG4gIGlmICh0cmFpblJlcGVhdC5jaGVja2VkICYmIGludGVydmFsID09IG51bGwpIHtcbiAgICB0cmFpbkJ0bi5pbm5lclRleHQgPSBcIlN0b3BcIlxuICAgIGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4geyBydW5UcmFpbkxvb3AoaXRlcnMpIH0sIDEwMCk7XG4gIH0gZWxzZSBpZiAoaW50ZXJ2YWwgIT0gbnVsbCkge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIGludGVydmFsID0gbnVsbDtcbiAgICB0cmFpbkJ0bi5pbm5lclRleHQgPSBcIlN0YXJ0XCJcbiAgfSBlbHNlIHtcbiAgICBydW5UcmFpbkxvb3AoaXRlcnMpO1xuICB9XG59XG5cbmNvbnN0IHJ1blRyYWluTG9vcCA9IChpdGVyczogbnVtYmVyKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlcnM7IGkrKykge1xuICAgIG5ldXJhbENvcmUudHJhaW4oKTtcbiAgfVxuICB1cGRhdGVVSSgpO1xufVxuXG4od2luZG93IGFzIGFueSkuc2V0VHJhaW5pbmdEYXRhID0gKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGFBcnIgPSBKU09OLnBhcnNlKHRyYWluaW5nU2V0SW5wdXQudmFsdWUpO1xuICAgIG5ldXJhbENvcmUuc2V0VHJhaW5pbmdTYW1wbGVzKFtdKTtcbiAgICBkYXRhQXJyLmZvckVhY2goKHNhbXBsZSkgPT4ge1xuICAgICAgbmV1cmFsQ29yZS5hZGRUcmFpbmluZ1NldChzYW1wbGVbMF0sIHNhbXBsZVsxXSk7XG4gICAgfSk7XG4gICAgbmV1cmFsQ29yZS5yZXNldCgpO1xuICAgIHVwZGF0ZVVJKCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGFsZXJ0KGVycik7XG4gIH1cbn1cbih3aW5kb3cgYXMgYW55KS5zZXRXZWlnaHRzID0gKCkgPT4ge1xuICBjb25zdCB3ZWlnaHRzOiBudW1iZXJbXVtdW10gPSBKU09OLnBhcnNlKHdlaWdodHNJbnB1dC52YWx1ZSk7XG4gIG5ldXJhbENvcmUuc2V0V2VpZ2h0cyh3ZWlnaHRzKTtcbiAgbmV1cmFsQ29yZS5yZXNldCgpO1xuICB1cGRhdGVVSSgpO1xufVxuKHdpbmRvdyBhcyBhbnkpLnNldEJpYXMgPSAoKSA9PiB7XG4gIGNvbnN0IHdlaWdodHM6IG51bWJlcltdW10gPSBKU09OLnBhcnNlKGJpYXNJbnB1dC52YWx1ZSk7XG4gIG5ldXJhbENvcmUuc2V0Qmlhcyh3ZWlnaHRzKTtcbiAgbmV1cmFsQ29yZS5yZXNldCgpO1xuICB1cGRhdGVVSSgpO1xufVxuXG4od2luZG93IGFzIGFueSkucmVzZXQgPSAoKSA9PiB7XG4gIG5ldXJhbENvcmUucmVzZXQoKTtcbiAgdXBkYXRlVUkoKTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLmFwcGx5VHJhaW5pbmdTYW1wbGUgPSAoaWR4OiBudW1iZXIpID0+IHtcbiAgaW5wdXQgPSBuZXVyYWxDb3JlLmdldFRyYWluaW5nU2FtcGxlcygpW2lkeF0uaW5wdXQ7XG4gIHVwZGF0ZVVJKCk7XG59XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIG1haW4oKTtcbn07XG5cbmxldCBuZXVyYWxDb3JlOiBOZXVyYWxDb3JlO1xubGV0IHZpc3VhbGl6ZXI6IFZpc3VhbGl6ZXI7XG5sZXQgaW5wdXQ6IG51bWJlcltdO1xubGV0IGludGVydmFsID0gbnVsbDtcblxubGV0IGlucHV0U2l6ZSA9IDM7XG5sZXQgaGlkZGVuU2l6ZXMgPSBbMl07XG5sZXQgb3V0cHV0U2l6ZSA9IDI7XG5cbmxldCBsYXllckNvbnRyb2xzOiBIVE1MRWxlbWVudDtcbmxldCBpbnB1dENvbnRyb2xzOiBIVE1MRWxlbWVudDtcbmxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuXG5sZXQgY29zdDogSFRNTEVsZW1lbnQ7XG5sZXQgaXRlcjogSFRNTEVsZW1lbnQ7XG5cbmxldCByYXRlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5sZXQgaXRlcnNJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbmxldCByZWdUeXBlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5sZXQgcmVnUmF0ZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xubGV0IHRyYWluUmVwZWF0OiBIVE1MSW5wdXRFbGVtZW50O1xubGV0IHRyYWluQnRuOiBIVE1MSW5wdXRFbGVtZW50O1xuXG5sZXQgdHJhaW5pbmdTZXRMYWJlbHNPdXRwdXQ6IEhUTUxFbGVtZW50O1xubGV0IHRyYWluaW5nU2V0RGF0YU91dHB1dDogSFRNTEVsZW1lbnQ7XG5sZXQgdHJhaW5pbmdTZXRJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbmxldCB3ZWlnaHRzSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5sZXQgYmlhc0lucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuXG5jb25zdCBtYWluID0gKCkgPT4ge1xuICBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICBpbnB1dENvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LWNvbnRyb2xzJyk7XG4gIGxheWVyQ29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGF5ZXItY29udHJvbHMnKTtcbiAgaXRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVyLW91dHB1dCcpO1xuICBjb3N0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvc3QnKTtcbiAgcmF0ZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhdGUtaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICBpdGVyc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZXJzLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgcmVnVHlwZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZ3VsYXJpemF0aW9uLXR5cGUtaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICByZWdSYXRlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVndWxhcml6YXRpb24tcmF0ZS1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHRyYWluaW5nU2V0RGF0YU91dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbmluZy1zZXQtZGF0YS1vdXRwdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICB0cmFpbmluZ1NldExhYmVsc091dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbmluZy1zZXQtbmV1cm9ucy1vdXRwdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICB0cmFpbmluZ1NldElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluaW5nLXNldC1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHdlaWdodHNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbmluZy1zZXQtd2VpZ2h0cycpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGJpYXNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbmluZy1zZXQtYmlhcycpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHRyYWluUmVwZWF0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluLXJlcGVhdC1jaGNrYngnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICB0cmFpbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbi1idG4nKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIHZpc3VhbGl6ZXIgPSBuZXcgVmlzdWFsaXplcihjYW52YXMpO1xuXG4gIGluaXRDb3JlKCk7XG59XG5cbmNvbnN0IGluaXRDb3JlID0gKCkgPT4ge1xuICBuZXVyYWxDb3JlID0gbmV3IE5ldXJhbENvcmUoaW5wdXRTaXplLCBoaWRkZW5TaXplcywgb3V0cHV0U2l6ZSk7XG5cbiAgbmV1cmFsQ29yZS5hZGRUcmFpbmluZ1NldChbMywgMCwgMV0sIFsxLCAwXSk7XG5cbiAgLy8gU2V0IGRlZmF1bHQgdmFsdWVzXG4gIGlucHV0ID0gbmV3IEFycmF5KG5ldXJhbENvcmUuZ2V0SW5wdXRTaXplKCkpO1xuICBpbnB1dC5maWxsKDEpO1xuXG4gIG5ldXJhbENvcmUuZXZhbHVhdGUoaW5wdXQpO1xuICB1cGRhdGVVSSgpO1xufVxuXG5jb25zdCB1cGRhdGVVSSA9ICgpID0+IHtcbiAgbmV1cmFsQ29yZS5ldmFsdWF0ZShpbnB1dCk7XG5cbiAgbGV0IGNvbnRlbnQgPSBhZGRMYXllckNvbnRyb2xSb3coXG4gICAgJ0xheWVycycsXG4gICAgbmV1cmFsQ29yZS5nZXRMYXllckNudCgpLnRvU3RyaW5nKCksXG4gICAgJ2FkZE9yUmVtb3ZlTGF5ZXIodHJ1ZSknLFxuICAgICdhZGRPclJlbW92ZUxheWVyKGZhbHNlKSdcbiAgKTtcblxuXG4gIGNvbnRlbnQgKz0gYWRkTGF5ZXJDb250cm9sUm93KFxuICAgICdJbnB1dCBzaXplJyxcbiAgICBuZXVyYWxDb3JlLmdldElucHV0U2l6ZSgpLnRvU3RyaW5nKCksXG4gICAgJ2FkZE9yUmVtb3ZlTmV1cm9uKHRydWUsIDApJyxcbiAgICAnYWRkT3JSZW1vdmVOZXVyb24oZmFsc2UsIDApJ1xuICApO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmV1cmFsQ29yZS5nZXRMYXllckNudCgpIC0gMjsgaSsrKSB7XG4gICAgY29udGVudCArPSBhZGRMYXllckNvbnRyb2xSb3coXG4gICAgICAnSGlkZGVuIGxheWVyIHNpemUnLFxuICAgICAgbmV1cmFsQ29yZS5nZXRIaWRkZW5MYXllclNpemVzKClbaV0udG9TdHJpbmcoKSxcbiAgICAgIGBhZGRPclJlbW92ZU5ldXJvbih0cnVlLCAke2kgKyAxfSlgLFxuICAgICAgYGFkZE9yUmVtb3ZlTmV1cm9uKGZhbHNlLCAke2kgKyAxfSlgXG4gICAgKTtcbiAgfVxuXG4gIGNvbnRlbnQgKz0gYWRkTGF5ZXJDb250cm9sUm93KFxuICAgICdPdXRwdXQgc2l6ZScsXG4gICAgbmV1cmFsQ29yZS5nZXRPdXRwdXRTaXplKCkudG9TdHJpbmcoKSxcbiAgICBgYWRkT3JSZW1vdmVOZXVyb24odHJ1ZSwgJHtuZXVyYWxDb3JlLmdldExheWVyQ250KCkgLSAxfSlgLFxuICAgIGBhZGRPclJlbW92ZU5ldXJvbihmYWxzZSwgJHtuZXVyYWxDb3JlLmdldExheWVyQ250KCkgLSAxfSlgXG4gICk7XG5cbiAgbGF5ZXJDb250cm9scy5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gIGlucHV0Q29udHJvbHMuaW5uZXJIVE1MID0gJyc7XG5cbiAgaWYgKCF2aXN1YWxpemVyLmdldERyYXdhYmxlSW5wdXROZXVyb25zKCkpIHtcbiAgICB2aXN1YWxpemVyLmRyYXcobmV1cmFsQ29yZS5nZXROZXVyb25zKCksIG5ldXJhbENvcmUuZ2V0Q29ubmVjdGlvbnMoKSk7XG4gIH1cblxuXG4gIGNvbnN0IGNvbnRyb2xIZWlnaHQgPSA1MDtcbiAgdmlzdWFsaXplci5nZXREcmF3YWJsZUlucHV0TmV1cm9ucygpLmZvckVhY2goKG5ldXJvbjogRHJhd2FibGVOZXVyb24pID0+IHtcbiAgICBjb25zdCB4ID0gbmV1cm9uLnggLSA1MDtcbiAgICBjb25zdCB5ID0gbmV1cm9uLnkgLSBjb250cm9sSGVpZ2h0IC8gMiArIDU7XG4gICAgaW5wdXRDb250cm9scy5pbm5lckhUTUwgKz0gYDxpbnB1dFxuICAgICAgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogJHt5fXB4OyBsZWZ0OiAke3h9cHg7IGhlaWdodDogJHtjb250cm9sSGVpZ2h0fXB4O1wiIFxuICAgICAgdHlwZT1cInJhbmdlXCIgb3JpZW50PVwidmVydGljYWxcIiBtaW49XCIwXCIgbWF4PVwiMVwiIHZhbHVlPVwiJHtuZXVyb24uYWN0aXZhdGlvbn1cIiBzdGVwPVwiMC4wNVwiIFxuICAgICAgb25pbnB1dD1cInNsaWRlKCR7bmV1cm9uLmlkfSwgdGhpcy52YWx1ZSk7XCI+YDtcbiAgfSlcblxuICBpdGVyLmlubmVySFRNTCA9IG5ldXJhbENvcmUuZ2V0SXRlcmF0aW9uKCkudG9TdHJpbmcoKTtcbiAgY29zdC5pbm5lckhUTUwgPSBuZXVyYWxDb3JlLmdldENvc3QoKS50b1N0cmluZygpO1xuXG4gIC8vIEFkZCB0cmFpbmluZyBzZXQgZGF0YSBsYWJlbHNcbiAgbGV0IGxhYmVscyA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG5ldXJhbENvcmUuZ2V0SW5wdXRTaXplKCk7IGkrKykge1xuICAgIGxhYmVscyArPSBgPHRoIHNjb3BlPSdjb2wnPklucHV0ICR7aX08L3RoPmA7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXVyYWxDb3JlLmdldE91dHB1dFNpemUoKTsgaSsrKSB7XG4gICAgbGFiZWxzICs9IGA8dGggc2NvcGU9J2NvbCcgc3R5bGU9XCJ0ZXh0LWFsaWduOiByaWdodFwiPk91dHB1dCAke2l9PC90aD5gO1xuICB9XG4gIHRyYWluaW5nU2V0TGFiZWxzT3V0cHV0LmlubmVySFRNTCA9IGxhYmVscztcblxuICAvLyBBZGQgdHJhaW5pbmcgZGF0YVxuICBsZXQgdHJhaW5pbmdEYXRhID0gJyc7XG4gIG5ldXJhbENvcmUuZ2V0VHJhaW5pbmdTYW1wbGVzKCkuZm9yRWFjaCgoc2FtcGxlLCBpZHgpID0+IHtcbiAgICB0cmFpbmluZ0RhdGEgKz0gYDx0ciBzdHlsZT1cImN1cnNvcjpwb2ludGVyO1wiIG9uY2xpY2s9XCJhcHBseVRyYWluaW5nU2FtcGxlKCR7aWR4fSlcIj5gO1xuICAgIHNhbXBsZS5pbnB1dC5mb3JFYWNoKHZhbCA9PiB7XG4gICAgICB0cmFpbmluZ0RhdGEgKz0gYDx0ZD4ke3ZhbH08L3RkPmA7XG4gICAgfSk7XG4gICAgc2FtcGxlLm91dHB1dC5mb3JFYWNoKHZhbCA9PiB7XG4gICAgICB0cmFpbmluZ0RhdGEgKz0gYDx0ZCBzdHlsZT1cInRleHQtYWxpZ246IHJpZ2h0XCI+JHt2YWx9PC90ZD5gO1xuICAgIH0pO1xuICAgIHRyYWluaW5nRGF0YSArPSAnPC90cj4nO1xuICB9KTtcbiAgdHJhaW5pbmdTZXREYXRhT3V0cHV0LmlubmVySFRNTCA9IHRyYWluaW5nRGF0YTtcbiAgdmlzdWFsaXplci5kcmF3KG5ldXJhbENvcmUuZ2V0TmV1cm9ucygpLCBuZXVyYWxDb3JlLmdldENvbm5lY3Rpb25zKCkpO1xufVxuXG5jb25zdCBhZGRMYXllckNvbnRyb2xSb3cgPSAobGFiZWw6IHN0cmluZywgc2l6ZTogc3RyaW5nLCBvbmNsaWNrUG9zOiBzdHJpbmcsIG9uY2xpY2tOZWc6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBgPHRyPjx0ZCBhbGlnbj0ncmlnaHQnPjxsYWJlbD4ke2xhYmVsfTo8L2xhYmVsPjxiIHN0eWxlPVwibWFyZ2luOiBhdXRvIDZweFwiPiR7c2l6ZX08L2I+PC90ZD48dGQ+XG4gIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiIG9uY2xpY2s9XCIke29uY2xpY2tOZWd9XCI+LTwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCIgb25jbGljaz1cIiR7b25jbGlja1Bvc31cIj4rPC9idXR0b24+XG4gIDwvZGl2PjwvdGQ+PC90cj5gO1xufSIsImltcG9ydCB7IE5ldXJvbiB9IGZyb20gXCIuL05ldXJvblwiO1xuXG5leHBvcnQgY2xhc3MgQ29ubmVjdGlvbiB7XG4gIHByaXZhdGUgd2VpZ2h0OiBudW1iZXI7XG4gIHByaXZhdGUgaW5wdXROZXVyb246IE5ldXJvbjtcbiAgcHJpdmF0ZSBvdXRwdXROZXVyb246IE5ldXJvbjtcbiAgcHJpdmF0ZSBzYW1wbGVXZWlnaHRDaGFuZ2VzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGlucHV0OiBOZXVyb24sIG91dHB1dDogTmV1cm9uLCB3ZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuaW5wdXROZXVyb24gPSBpbnB1dDtcbiAgICB0aGlzLm91dHB1dE5ldXJvbiA9IG91dHB1dDtcbiAgICB0aGlzLndlaWdodCA9IHdlaWdodDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTYW1wbGVXZWlnaHRDaGFuZ2Uod2VpZ2h0Q2hhbmdlOiBudW1iZXIpIHtcbiAgICB0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMucHVzaCh3ZWlnaHRDaGFuZ2UpO1xuICB9XG5cbiAgcHVibGljIGFwcGx5QXZlcmFnZVdlaWdodENoYW5nZSgpIHtcbiAgICBjb25zdCBjaGFuZ2UgPSAodGhpcy5zYW1wbGVXZWlnaHRDaGFuZ2VzLnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYyArIHZhbCwgMCkgLyB0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMubGVuZ3RoKTtcbiAgICB0aGlzLndlaWdodCArPSBjaGFuZ2U7XG4gICAgdGhpcy5zYW1wbGVXZWlnaHRDaGFuZ2VzID0gW107XG4gIH1cblxuICBwdWJsaWMgZ2V0V2VpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLndlaWdodDtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy53ZWlnaHQgKiB0aGlzLmlucHV0TmV1cm9uLmNhbGN1bGF0ZUFjdGl2YXRpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPdXRwdXROZXVyb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub3V0cHV0TmV1cm9uO1xuICB9XG5cbiAgcHVibGljIGdldElucHV0TmV1cm9uKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0TmV1cm9uO1xuICB9XG59IiwiaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gXCIuL0Nvbm5lY3Rpb25cIjtcblxuZXhwb3J0IGludGVyZmFjZSBBY3RpdmF0aW9uIHtcbiAgZGVyKHg6IG51bWJlcik6IG51bWJlcjtcbiAgb3V0cHV0KHg6IG51bWJlcik6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBTSUdNT0lEOiBBY3RpdmF0aW9uID0ge1xuICBvdXRwdXQ6ICh4OiBudW1iZXIpOiBudW1iZXIgPT4gMSAvICgxICsgTWF0aC5leHAoLXgpKSxcbiAgZGVyOiAoeDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICBsZXQgb3V0cHV0ID0gU0lHTU9JRC5vdXRwdXQoeCk7XG4gICAgcmV0dXJuIG91dHB1dCAqICgxIC0gb3V0cHV0KTtcbiAgfVxufTtcblxuZXhwb3J0IGVudW0gUmVndWxhcml6YXRpb25zIHtcbiAgTDEsXG4gIEwyLFxuICBOT05FLFxufVxuXG5leHBvcnQgY29uc3QgTDFSZWcgPSB7XG4gIGNvc3Q6IChjb25uZWN0aW9uczogQ29ubmVjdGlvbltdW10pOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiBjb25uZWN0aW9ucy5yZWR1Y2UoXG4gICAgICAocHJldiwgY29ubkxheWVyOiBDb25uZWN0aW9uW10pID0+IHtcbiAgICAgICAgcmV0dXJuIHByZXYgKyBjb25uTGF5ZXIucmVkdWNlKChhY2MsIGNvbm4pID0+IGFjYyArIE1hdGguYWJzKGNvbm4uZ2V0V2VpZ2h0KCkpLCAwKVxuICAgICAgfSwgMCkgKiAoMSAvIGdldE51bWJlck9mQ29ubmVjdGlvbnMoY29ubmVjdGlvbnMpKTtcbiAgfSxcblxuICBkZXI6ICh3ZWlnaHQ6IG51bWJlciwgY29ubkNvdW50OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiAoKHdlaWdodCA+IDApID8gMSA6IC0xKSAgKiAoMSAvIGNvbm5Db3VudCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEwyUmVnID0ge1xuICBjb3N0OiAoY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXVtdKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gMSAvIDIgKiBjb25uZWN0aW9ucy5yZWR1Y2UoXG4gICAgICAocHJldiwgY29ubkxheWVyOiBDb25uZWN0aW9uW10pID0+IHtcbiAgICAgICAgcmV0dXJuIHByZXYgKyBjb25uTGF5ZXIucmVkdWNlKChhY2MsIGNvbm4pID0+IGFjYyArIGNvbm4uZ2V0V2VpZ2h0KCkgKiogMiwgMClcbiAgICAgIH0sIDApICogKDEgLyBnZXROdW1iZXJPZkNvbm5lY3Rpb25zKGNvbm5lY3Rpb25zKSk7XG4gIH0sXG5cbiAgZGVyOiAoY3VycldlaWdodDogbnVtYmVyLCBjb25uQ291bnQ6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIGN1cnJXZWlnaHQgKiAoMSAvIGNvbm5Db3VudCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRyYWluU2FtcGxlIHtcbiAgcHVibGljIGlucHV0OiBudW1iZXJbXTtcbiAgcHVibGljIG91dHB1dDogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IoaW5wdXQ6IG51bWJlcltdLCBvdXRwdXQ6IG51bWJlcltdKSB7XG4gICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgIHRoaXMub3V0cHV0ID0gb3V0cHV0O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZXROdW1iZXJPZkNvbm5lY3Rpb25zID0gKGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW11bXSk6IG51bWJlciA9PiB7XG4gIHJldHVybiBjb25uZWN0aW9ucy5yZWR1Y2UoKGFjYywgY29ubikgPT4gYWNjICsgY29ubi5sZW5ndGgsIDApO1xufSIsImltcG9ydCB7IE5ldXJvbiB9IGZyb20gXCIuL05ldXJvblwiO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gXCIuL0Nvbm5lY3Rpb25cIjtcbmltcG9ydCB7IFRyYWluU2FtcGxlLCBTSUdNT0lELCBSZWd1bGFyaXphdGlvbnMsIEwyUmVnLCBnZXROdW1iZXJPZkNvbm5lY3Rpb25zLCBMMVJlZyB9IGZyb20gXCIuL0hlbHBlck9iamVjdHNcIjtcblxuZXhwb3J0IGNsYXNzIE5ldXJhbENvcmUge1xuICBwcml2YXRlIGlucHV0U2l6ZTogbnVtYmVyO1xuICBwcml2YXRlIGhpZGRlbkxheWVyU2l6ZXM6IG51bWJlcltdO1xuICBwcml2YXRlIG91dHB1dFNpemU6IG51bWJlcjtcblxuICBwcml2YXRlIGxheWVyQ250OiBudW1iZXI7XG4gIHByaXZhdGUgYmlhc0xpc3Q6IG51bWJlcltdW10gPSBbWzAuNCwgMC4yXSwgWzAuNiwgMC4zXV1cbiAgcHJpdmF0ZSB3ZWlnaHRMaXN0OiBudW1iZXJbXVtdW10gPSBbXG4gICAgICBbWzAuMSwgMC4yLCAwLjZdLCBbMC40LCAwLjMsIDAuMV1dLFxuICAgICAgW1swLjIsIDAuMV0sIFswLjEsIDAuNF1dXG4gIF1cblxuICBwcml2YXRlIGl0ZXJDbnQgPSAwO1xuXG4gIHByaXZhdGUgcmF0ZSA9IDE7XG4gIHByaXZhdGUgbGFtYmRhID0gMC4wMDE7XG4gIHByaXZhdGUgcmVnVHlwZTogUmVndWxhcml6YXRpb25zID0gUmVndWxhcml6YXRpb25zLk5PTkU7XG5cbiAgcHJpdmF0ZSBiaWFzTmV1cm9uID0gbmV3IE5ldXJvbignYmlhcycsIHRydWUpO1xuICBwcml2YXRlIG5ldXJvbnM6IE5ldXJvbltdW10gPSBbXTtcbiAgcHJpdmF0ZSBjb25uZWN0aW9uczogQ29ubmVjdGlvbltdW10gPSBbXTtcblxuICBwcml2YXRlIHRyYWluU2FtcGxlczogVHJhaW5TYW1wbGVbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGlucHV0U2l6ZTogbnVtYmVyLCBoaWRkZW5MYXllclNpemVzOiBudW1iZXJbXSwgb3V0cHV0U2l6ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5pbnB1dFNpemUgPSBpbnB1dFNpemU7XG4gICAgdGhpcy5oaWRkZW5MYXllclNpemVzID0gaGlkZGVuTGF5ZXJTaXplcztcbiAgICB0aGlzLm91dHB1dFNpemUgPSBvdXRwdXRTaXplO1xuICAgIHRoaXMubGF5ZXJDbnQgPSBoaWRkZW5MYXllclNpemVzLmxlbmd0aCArIDI7XG5cbiAgICAvLyBSZXNldFxuICAgIHRoaXMubmV1cm9ucyA9IFtdO1xuICAgIHRoaXMuY29ubmVjdGlvbnMgPSBbXTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIC8vIENyZWF0ZSB0aGUgbmV1cm9uc1xuICAgIGZvciAobGV0IGwgPSAwOyBsIDwgdGhpcy5sYXllckNudDsgbCsrKSB7XG4gICAgICAvLyBIb3cgbWFueSBuZXVyb25zIGFyZSBpbiBlYWNoIGxheWVyP1xuICAgICAgbGV0IG5ldXJvbnNJbkxheWVyQ250ID0gMDtcbiAgICAgIHN3aXRjaCAobCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgbmV1cm9uc0luTGF5ZXJDbnQgPSB0aGlzLmlucHV0U2l6ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0aGlzLmhpZGRlbkxheWVyU2l6ZXMubGVuZ3RoICsgMTpcbiAgICAgICAgICBuZXVyb25zSW5MYXllckNudCA9IHRoaXMub3V0cHV0U2l6ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBuZXVyb25zSW5MYXllckNudCA9IHRoaXMuaGlkZGVuTGF5ZXJTaXplc1tsIC0gMV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubmV1cm9uc1tsXSA9IFtdO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlbVxuICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBuZXVyb25zSW5MYXllckNudDsgbisrKSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsXVtuXSA9IG5ldyBOZXVyb24oYE5ldXJvbiR7bH0ke259YCk7XG4gICAgICAgIGlmIChsID09IDApIHtcbiAgICAgICAgICB0aGlzLm5ldXJvbnNbbF1bbl0uc2V0QXNJbnB1dE5ldXJvbigwKTsgLy8ganVzdCB0byBhdm9pZCBjcmFzaGVzLCB0aGUgMCBzaG91bGQgYmUgb3ZlcnJpZGVuIGxhdGVyIFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHRoZSBDb25uZWN0aW9uc1xuICAgIHRoaXMuY3JlYXRlQ29ubmVjdGlvbnMoMCwgdGhpcy5sYXllckNudCAtIDEpO1xuICB9XG5cbiAgcHVibGljIHNldFdlaWdodHMod2VpZ2h0czogbnVtYmVyW11bXVtdKSB7XG5cbiAgICB0aGlzLndlaWdodExpc3QgPSB3ZWlnaHRzO1xuICB9XG5cbiAgcHVibGljIHNldEJpYXMoYmlhc0xpc3Q6IG51bWJlcltdW10pIHtcblxuICAgIHRoaXMuYmlhc0xpc3QgPSBiaWFzTGlzdDtcbiAgfVxuXG4gIHB1YmxpYyBldmFsdWF0ZShpbnB1dDogbnVtYmVyW10pOiBudW1iZXJbXSB7XG4gICAgaWYgKGlucHV0Lmxlbmd0aCAhPSB0aGlzLmlucHV0U2l6ZSkge1xuICAgICAgdGhyb3cgJ0lucHV0IHNpemUgZG9lcyBub3QgbWF0Y2gnO1xuICAgIH1cbiAgICAvLyBSZXNldCwgc28gZWFjaCBuZXVyb24gaXMgcmVjYWxjdWxhdGVkXG4gICAgdGhpcy5uZXVyb25zLmZvckVhY2gobGF5ZXIgPT4geyBsYXllci5mb3JFYWNoKG5ldXJvbiA9PiBuZXVyb24ucmVzZXQoKSkgfSlcbiAgICAvLyBTZXQgaW5wdXQgbGF5ZXJcbiAgICB0aGlzLm5ldXJvbnNbMF0uZm9yRWFjaCgobmV1cm9uLCBpZHgpID0+IHsgbmV1cm9uLnNldElucHV0KGlucHV0W2lkeF0pIH0pO1xuXG4gICAgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5mb3JFYWNoKG5ldXJvbiA9PiB7XG4gICAgICBuZXVyb24uY2FsY3VsYXRlQWN0aXZhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250IC0gMV0ubWFwKG5ldXJvbiA9PiBuZXVyb24uZ2V0QWN0aXZhdGlvbigpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRUcmFpbmluZ1NldChpbnB1dDogbnVtYmVyW10sIG91dHB1dDogbnVtYmVyW10pIHtcbiAgICBpZiAoaW5wdXQubGVuZ3RoICE9IHRoaXMuaW5wdXRTaXplKSB7XG4gICAgICB0aHJvdyAnSW5wdXQgc2l6ZSBkb2VzIG5vdCBtYXRjaCc7XG4gICAgfSBlbHNlIGlmIChvdXRwdXQubGVuZ3RoICE9IHRoaXMub3V0cHV0U2l6ZSkge1xuICAgICAgdGhyb3cgJ091dHB1dCBzaXplIGRvZXMgbm90IG1hdGNoJztcbiAgICB9XG5cbiAgICB0aGlzLnRyYWluU2FtcGxlcy5wdXNoKG5ldyBUcmFpblNhbXBsZShpbnB1dCwgb3V0cHV0KSlcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb3N0KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMudHJhaW5TYW1wbGVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBjb25zdCBjb3N0U3VtID0gdGhpcy50cmFpblNhbXBsZXMucmVkdWNlKChjb3N0U3VtLCBzYW1wbGUpID0+IHsgLy8gQWRkIHVwIGFsbCBzYW1wbGVzXG4gICAgICB0aGlzLmV2YWx1YXRlKHNhbXBsZS5pbnB1dCk7XG4gICAgICByZXR1cm4gY29zdFN1bSArIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250IC0gMV0ucmVkdWNlKChhY2MsIG5ldXJvbiwgaSkgPT4geyAvLyBBZGQgdXAgYWxsIG91dHB1dCBuZXVyb25zXG4gICAgICAgIHJldHVybiBhY2MgKyAobmV1cm9uLmdldEFjdGl2YXRpb24oKSAtIHNhbXBsZS5vdXRwdXRbaV0pICoqIDI7XG4gICAgICB9LCAwKTtcbiAgICB9LCAwKTtcblxuICAgIC8vIFJlZ3VsYXJpemF0aW9uXG4gICAgbGV0IHJlZ0Nvc3QgPSAwO1xuICAgIHN3aXRjaCAodGhpcy5yZWdUeXBlKSB7XG4gICAgICBjYXNlIFJlZ3VsYXJpemF0aW9ucy5MMTpcbiAgICAgICAgcmVnQ29zdCA9IEwxUmVnLmNvc3QodGhpcy5jb25uZWN0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBSZWd1bGFyaXphdGlvbnMuTDI6XG4gICAgICAgIHJlZ0Nvc3QgPSBMMlJlZy5jb3N0KHRoaXMuY29ubmVjdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUmVndWxhcml6YXRpb25zLk5PTkU6XG4gICAgICAgIHJlZ0Nvc3QgPSAwO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gMSAvIDIgKiBjb3N0U3VtICogKDEgLyB0aGlzLnRyYWluU2FtcGxlcy5sZW5ndGgpICtcbiAgICAgIHRoaXMubGFtYmRhICogcmVnQ29zdDtcbiAgfVxuXG4gIHB1YmxpYyB0cmFpbigpIHtcbiAgICB0aGlzLnRyYWluU2FtcGxlcy5mb3JFYWNoKChzYW1wbGUpID0+IHtcbiAgICAgIHRoaXMuZXZhbHVhdGUoc2FtcGxlLmlucHV0KVxuXG4gICAgICAvLyBDYWxjdWxhdGUgc2lnbWFzIG9mIHRoZSBsYXN0IGxheWVyXG4gICAgICB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLmZvckVhY2goKG5ldXJvbiwgaWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1NpZ21hID1cbiAgICAgICAgICAoc2FtcGxlLm91dHB1dFtpZHhdIC0gbmV1cm9uLmdldEFjdGl2YXRpb24oKSkgKiBTSUdNT0lELmRlcihuZXVyb24uZ2V0QWN0aXZhdGlvbigpKTtcblxuICAgICAgICBuZXVyb24uc2V0U2lnbWEobmV3U2lnbWEpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBzaWdtYXMgZm9yIGVhY2ggbmV1cm9uIGluIHRoZSBsb3dlciBsYXllcnNcbiAgICAgIGZvciAobGV0IGwgPSB0aGlzLmxheWVyQ250IC0gMjsgbCA+PSAwOyBsLS0pIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xdLmZvckVhY2goKG5ldXJvbikgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld1NpZ21hID1cbiAgICAgICAgICAgIG5ldXJvbi5nZXRPdXRwdXRzKCkucmVkdWNlKChhY2MsIGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFjYyArIGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0U2lnbWEoKSAqIGNvbm5lY3Rpb24uZ2V0V2VpZ2h0KCk7XG4gICAgICAgICAgICB9LCAwKSAqIFNJR01PSUQuZGVyKG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkpO1xuICAgICAgICAgIG5ldXJvbi5zZXRTaWdtYShuZXdTaWdtYSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBBY2N1bXVsYXRlIGFsbCB3ZWlnaHQgdXBkYXRlc1xuICAgICAgdGhpcy5jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uTGF5ZXIpID0+IHtcbiAgICAgICAgY29ubkxheWVyLmZvckVhY2goKGNvbm5lY3Rpb24pID0+IHtcblxuICAgICAgICAgIGxldCByZWdEZXIgPSAwO1xuICAgICAgICAgIHN3aXRjaCAodGhpcy5yZWdUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFJlZ3VsYXJpemF0aW9ucy5MMTpcbiAgICAgICAgICAgICAgcmVnRGVyID0gTDFSZWcuZGVyKGNvbm5lY3Rpb24uZ2V0V2VpZ2h0KCksIGdldE51bWJlck9mQ29ubmVjdGlvbnModGhpcy5jb25uZWN0aW9ucykpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUmVndWxhcml6YXRpb25zLkwyOlxuICAgICAgICAgICAgICByZWdEZXIgPSBMMlJlZy5kZXIoY29ubmVjdGlvbi5nZXRXZWlnaHQoKSwgZ2V0TnVtYmVyT2ZDb25uZWN0aW9ucyh0aGlzLmNvbm5lY3Rpb25zKSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBSZWd1bGFyaXphdGlvbnMuTk9ORTpcbiAgICAgICAgICAgICAgcmVnRGVyID0gMDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgd2VpZ2h0Q2hhbmdlID1cbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0U2lnbWEoKSAqXG4gICAgICAgICAgICBjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0QWN0aXZhdGlvbigpICpcbiAgICAgICAgICAgIHRoaXMucmF0ZSAtXG4gICAgICAgICAgICB0aGlzLmxhbWJkYSAqIHJlZ0RlcjsgLy8gUmVndWxhcml6YXRpb25cblxuICAgICAgICAgIGNvbm5lY3Rpb24uYWRkU2FtcGxlV2VpZ2h0Q2hhbmdlKHdlaWdodENoYW5nZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBVZmYsIGxldCdzIGhvcGUgZXZlcnl0aGluZyB3b3JrcyBhbmQgYXBwbHkgdGhlIG1hZ2ljXG4gICAgdGhpcy5jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uTGF5ZXIpID0+IHtcbiAgICAgIGNvbm5MYXllci5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbm5lY3Rpb24uYXBwbHlBdmVyYWdlV2VpZ2h0Q2hhbmdlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuaXRlckNudCsrO1xuICB9XG5cbiAgcHVibGljIGFkZE9yUmVtb3ZlTGF5ZXIoYWRkOiBib29sZWFuKSB7XG4gICAgaWYgKGFkZCkge1xuICAgICAgY29uc3QgbmV3TGF5ZXJTaXplID0gMztcbiAgICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplcy5wdXNoKG5ld0xheWVyU2l6ZSk7XG4gICAgICB0aGlzLmxheWVyQ250Kys7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgbmV3IG5ldXJvbnNcbiAgICAgIHRoaXMuY3JlYXRlTGF5ZXJPZk5ldXJvbnModGhpcy5sYXllckNudCAtIDIsIG5ld0xheWVyU2l6ZSk7XG5cbiAgICAgIC8vIFJlY3JlYXRlIHRoZSBsYXN0IGxheWVyXG4gICAgICB0aGlzLmNyZWF0ZUxheWVyT2ZOZXVyb25zKHRoaXMubGF5ZXJDbnQgLSAxLCB0aGlzLm91dHB1dFNpemUpO1xuXG4gICAgICAvLyBSZWNyZWF0ZSBhbGwgbmVjZXNzYXJ5IGNvbm5lY3Rpb25zXG4gICAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25zKHRoaXMubGF5ZXJDbnQgLSAzLCB0aGlzLmxheWVyQ250IC0gMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmxheWVyQ250ID09IDIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmhpZGRlbkxheWVyU2l6ZXMucG9wKCk7XG4gICAgICB0aGlzLmxheWVyQ250LS07XG4gICAgICB0aGlzLm5ldXJvbnMucG9wKCk7XG4gICAgICB0aGlzLmNvbm5lY3Rpb25zLnBvcCgpO1xuXG4gICAgICAvLyBSZWNyZWF0ZSB0aGUgbGFzdCBsYXllclxuICAgICAgdGhpcy5jcmVhdGVMYXllck9mTmV1cm9ucyh0aGlzLmxheWVyQ250IC0gMSwgdGhpcy5vdXRwdXRTaXplKTtcblxuICAgICAgLy8gUmVjcmVhdGUgYWxsIG5lY2Vzc2FyeSBjb25uZWN0aW9uc1xuICAgICAgdGhpcy5jcmVhdGVDb25uZWN0aW9ucyh0aGlzLmxheWVyQ250IC0gMiwgdGhpcy5sYXllckNudCAtIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRoaXMgZnVuY3Rpb24gaXMgdmVyeSBsb25nIGFuZCB1Z2x5LCBJIGRvbnQgd2FudCB0byBzaW1wbHkgcmVidWlsZCB0aGUgbmV0d29yayBiZWNhdXNlIEkgd2FudCB0byBrZWVwIHRoZSB3ZWlnaHRzXG4gIHB1YmxpYyBhZGRPclJlbW92ZU5ldXJvbihhZGQ6IGJvb2xlYW4sIGxheWVySWR4OiBudW1iZXIpIHtcbiAgICBjb25zdCBpc0lucHV0ID0gbGF5ZXJJZHggPT0gMDtcbiAgICBjb25zdCBpc091dHB1dCA9IGxheWVySWR4ID09IHRoaXMubGF5ZXJDbnQgLSAxO1xuICAgIGNvbnN0IGlzSGlkZGVuID0gIWlzSW5wdXQgJiYgIWlzT3V0cHV0O1xuXG4gICAgY29uc3Qgc2l6ZUNoYW5nZSA9IChhZGQpID8gMSA6IC0xXG5cbiAgICBpZiAoaXNIaWRkZW4pIHtcbiAgICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplc1tsYXllcklkeCAtIDFdICs9IHNpemVDaGFuZ2U7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzSW5wdXQpIHtcbiAgICAgIHRoaXMuaW5wdXRTaXplICs9IHNpemVDaGFuZ2U7XG4gICAgICB0aGlzLnRyYWluU2FtcGxlcyA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm91dHB1dFNpemUgKz0gc2l6ZUNoYW5nZTtcbiAgICAgIHRoaXMudHJhaW5TYW1wbGVzID0gW107XG4gICAgfVxuXG4gICAgaWYgKGFkZCkge1xuICAgICAgbGV0IG5ld05ldXJvbklkeDtcblxuICAgICAgaWYgKGlzSGlkZGVuKSB7XG4gICAgICAgIG5ld05ldXJvbklkeCA9IHRoaXMuaGlkZGVuTGF5ZXJTaXplc1tsYXllcklkeCAtIDFdIC0gMTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzSW5wdXQpIHtcbiAgICAgICAgbmV3TmV1cm9uSWR4ID0gdGhpcy5pbnB1dFNpemUgLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3TmV1cm9uSWR4ID0gdGhpcy5vdXRwdXRTaXplIC0gMTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3TmV1cm9uID0gbmV3IE5ldXJvbihgTmV1cm9uJHtsYXllcklkeH0ke25ld05ldXJvbklkeH1gKTtcbiAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeF1bbmV3TmV1cm9uSWR4XSA9IG5ld05ldXJvbjtcblxuICAgICAgaWYgKGlzSW5wdXQpXG4gICAgICAgIG5ld05ldXJvbi5zZXRBc0lucHV0TmV1cm9uKDApO1xuXG5cbiAgICAgIC8vLy8gQWRkIGNvbm5lY3Rpb25zIGZyb20gdGhlIHByZXYgbGF5ZXJcbiAgICAgIGlmICghaXNJbnB1dCkge1xuICAgICAgICB0aGlzLm5ldXJvbnNbbGF5ZXJJZHggLSAxXS5mb3JFYWNoKChuZXVyb24sIGlkeCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbihuZXVyb24sIG5ld05ldXJvbiwxKTtcbiAgICAgICAgICBuZXVyb24uYWRkT3V0cHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICAgIG5ld05ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4IC0gMV0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIERvbnQgZm9yZ2V0IHRoZSBiaWFzXG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbih0aGlzLmJpYXNOZXVyb24sIG5ld05ldXJvbiwgMSk7XG4gICAgICAgIG5ld05ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeCAtIDFdLnB1c2goY29ubmVjdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNPdXRwdXQpIHtcbiAgICAgICAgLy8vLyBBZGQgY29ubmVjdGlvbnMgdG8gdGhlIG5leHQgbGF5ZXJcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4ICsgMV0uZm9yRWFjaCgobmV1cm9uLCBpZHgpID0+IHtcbiAgICAgICAgICBjb25zdCBjb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb24obmV3TmV1cm9uLCBuZXVyb24sIDEpO1xuICAgICAgICAgIG5ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4XS5wdXNoKGNvbm5lY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVtb3ZlZE5ldXJvbiA9IHRoaXMubmV1cm9uc1tsYXllcklkeF0ucG9wKCk7XG4gICAgICAvLyBSZW1vdmUgb3V0cHV0cyBmcm9tIHRoZSBwcmV2IGxheWVyXG4gICAgICBpZiAoIWlzSW5wdXQpIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4IC0gMV0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgbmV1cm9uLnNldE91dHB1dHMobmV1cm9uLmdldE91dHB1dHMoKS5maWx0ZXIoKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLmdldE91dHB1dE5ldXJvbigpLmdldE5hbWUoKSAhPSByZW1vdmVkTmV1cm9uLmdldE5hbWUoKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmUgaW5wdXQgaW4gdGhlIG5leHQgbGF5ZXJcbiAgICAgIGlmICghaXNPdXRwdXQpIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4ICsgMV0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgbmV1cm9uLnNldElucHV0cyhuZXVyb24uZ2V0SW5wdXRzKCkuZmlsdGVyKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5nZXRJbnB1dE5ldXJvbigpLmdldE5hbWUoKSAhPSByZW1vdmVkTmV1cm9uLmdldE5hbWUoKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmUgdGhlIHVudXNlZCBjb25uZWN0aW9uc1xuICAgICAgaWYgKCFpc0lucHV0KSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbGF5ZXJJZHggLSAxXSA9IHRoaXMuY29ubmVjdGlvbnNbbGF5ZXJJZHggLSAxXS5maWx0ZXIoKGNvbm5lY3Rpb246IENvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXROYW1lKCkgIT0gcmVtb3ZlZE5ldXJvbi5nZXROYW1lKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzT3V0cHV0KSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbGF5ZXJJZHhdID0gdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeF0uZmlsdGVyKChjb25uZWN0aW9uOiBDb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS5nZXROYW1lKCkgIT0gcmVtb3ZlZE5ldXJvbi5nZXROYW1lKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLml0ZXJDbnQgPSAwO1xuICAgIHRoaXMuY3JlYXRlQ29ubmVjdGlvbnMoMCwgdGhpcy5sYXllckNudCAtIDEpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVMYXllck9mTmV1cm9ucyhsYXllcklkeDogbnVtYmVyLCBsYXllclNpemU6IG51bWJlcikge1xuICAgIHRoaXMubmV1cm9uc1tsYXllcklkeF0gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVyU2l6ZTsgaSsrKSB7XG4gICAgICB0aGlzLm5ldXJvbnNbbGF5ZXJJZHhdW2ldID0gbmV3IE5ldXJvbihgTmV1cm9uJHtsYXllcklkeH0ke2l9YCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDb25uZWN0aW9ucyhmaXJzdExheWVyLCBsYXN0TGF5ZXIpIHtcbiAgICBmb3IgKGxldCBsID0gZmlyc3RMYXllcjsgbCA8IGxhc3RMYXllcjsgbCsrKSB7XG4gICAgICAvLyBGb3IgZWFjaCBuZXVyb24gaW4gdGhlIGxheWVyIGFkZCBhbGwgY29ubmVjdGlvbnMgdG8gbmV1cm9ucyBpbiB0aGUgbmV4dCBsYXllclxuICAgICAgdGhpcy5jb25uZWN0aW9uc1tsXSA9IFtdO1xuXG4gICAgICAvLyBSZXNldCBpbnB1dCAmIG91dHB1dHNcbiAgICAgIHRoaXMubmV1cm9uc1tsICsgMV0uZm9yRWFjaChuZXh0TmV1cm9uID0+IHsgbmV4dE5ldXJvbi5yZXNldElucHV0cygpIH0pO1xuICAgICAgdGhpcy5uZXVyb25zW2xdLmZvckVhY2gobmV4dE5ldXJvbiA9PiB7IG5leHROZXVyb24ucmVzZXRPdXRwdXRzKCkgfSk7XG5cbiAgICAgIHRoaXMubmV1cm9uc1tsICsgMV0uZm9yRWFjaCgobmV4dE5ldXJvbiwgdG9JZHgpID0+IHsgLy8gSWYgeW91IHdvbmRlciB3aHkgdGhpcyBjeWNsZXMgYXJlIHN3aXRjaGVkLCBpdCdzIGJlY2F1c2Ugb2YgdGhlIGJpYXNcbiAgICAgICAgdGhpcy5uZXVyb25zW2xdLmZvckVhY2goKGN1cnJOZXVyb24sIGZyb21JZHgpID0+IHtcbiAgICAgICAgICBsZXQgd2VpZ2h0ID0gdGhpcy53ZWlnaHRMaXN0W2xdW3RvSWR4XVtmcm9tSWR4XVxuICAgICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbihjdXJyTmV1cm9uLCBuZXh0TmV1cm9uLCB3ZWlnaHQpXG4gICAgICAgICAgY3Vyck5ldXJvbi5hZGRPdXRwdXQoY29ubmVjdGlvbik7XG4gICAgICAgICAgbmV4dE5ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xdLnB1c2goY29ubmVjdGlvbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGJpYXMgPSB0aGlzLmJpYXNMaXN0W2xdW3RvSWR4XVxuXG4gICAgICAgIC8vIEFkZCBiaWFzIG5ldXJvbiB0byBlYWNoIGxheWVyXG4gICAgICAgIGNvbnN0IGJpYXNDb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb24odGhpcy5iaWFzTmV1cm9uLCBuZXh0TmV1cm9uLCBiaWFzKTtcbiAgICAgICAgbmV4dE5ldXJvbi5hZGRJbnB1dChiaWFzQ29ubmVjdGlvbik7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbF0ucHVzaChiaWFzQ29ubmVjdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0TmV1cm9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5uZXVyb25zO1xuICB9XG5cbiAgcHVibGljIGdldENvbm5lY3Rpb25zKCkge1xuICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb25zO1xuICB9XG5cbiAgcHVibGljIGdldElucHV0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dFNpemU7XG4gIH1cblxuICBwdWJsaWMgZ2V0T3V0cHV0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5vdXRwdXRTaXplO1xuICB9XG5cbiAgcHVibGljIGdldExheWVyQ250KCkge1xuICAgIHJldHVybiB0aGlzLmxheWVyQ250O1xuICB9XG5cbiAgcHVibGljIGdldEhpZGRlbkxheWVyU2l6ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGlkZGVuTGF5ZXJTaXplcztcbiAgfVxuXG4gIHB1YmxpYyBzZXRSYXRlKG5ld1JhdGU6IG51bWJlcikge1xuICAgIHRoaXMucmF0ZSA9IG5ld1JhdGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0SXRlcmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLml0ZXJDbnQ7XG4gIH1cblxuICBwdWJsaWMgc2V0UmVndWxhcml6YXRpb25UeXBlKHJlZ1R5cGU6IFJlZ3VsYXJpemF0aW9ucykge1xuICAgIHRoaXMucmVnVHlwZSA9IHJlZ1R5cGU7XG4gIH1cblxuICBwdWJsaWMgc2V0UmVndWxhcml6YXRpb25SYXRlKHJhdGU6IG51bWJlcikge1xuICAgIHRoaXMubGFtYmRhID0gcmF0ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUcmFpbmluZ1NhbXBsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhaW5TYW1wbGVzO1xuICB9XG5cbiAgcHVibGljIHNldFRyYWluaW5nU2FtcGxlcyhzYW1wbGVzOiBUcmFpblNhbXBsZVtdKSB7XG4gICAgdGhpcy50cmFpblNhbXBsZXMgPSBzYW1wbGVzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSBcIi4vQ29ubmVjdGlvblwiO1xuaW1wb3J0IHsgU0lHTU9JRCB9IGZyb20gXCIuL0hlbHBlck9iamVjdHNcIjtcblxuZXhwb3J0IGNsYXNzIE5ldXJvbiB7XG4gIHByaXZhdGUgbmFtZTogc3RyaW5nO1xuXG4gIHByaXZhdGUgYWN0aXZhdGlvbjogbnVtYmVyO1xuICBwcml2YXRlIGlucHV0czogQ29ubmVjdGlvbltdID0gW107XG4gIHByaXZhdGUgb3V0cHV0czogQ29ubmVjdGlvbltdID0gW107XG5cbiAgLy8gVGhlIGRlcml2YXRpb24gb2YgQyB3aXRoIHJlc3BlY3QgdG8gelxuICBwcml2YXRlIHNpZ21hOiBudW1iZXI7XG4gIHByaXZhdGUgaXNJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGlzQ2FsY3VsYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGlzQmlhczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgaXNCaWFzID0gZmFsc2UpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaXNCaWFzID0gaXNCaWFzO1xuICB9O1xuXG4gIHB1YmxpYyBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0SXNCaWFzKCkge1xuICAgIHJldHVybiB0aGlzLmlzQmlhcztcbiAgfVxuXG4gIHB1YmxpYyBzZXRBc0lucHV0TmV1cm9uKGFjdGl2YXRpb246IG51bWJlcikge1xuICAgIHRoaXMuaXNJbnB1dCA9IHRydWU7XG4gICAgdGhpcy5hY3RpdmF0aW9uID0gYWN0aXZhdGlvbjtcbiAgICB0aGlzLmlucHV0cyA9IG51bGw7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5wdXQoYWN0aXZhdGlvbjogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLmlzSW5wdXQpIHtcbiAgICAgIHRocm93ICdDYW5ub3Qgc2V0IGFjdGl2YXRpb24gb2Ygbm9uLWlucHV0IG5ldXJvbic7XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmF0aW9uID0gYWN0aXZhdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTaWdtYShzaWdtYTogbnVtYmVyKSB7XG4gICAgdGhpcy5zaWdtYSA9IHNpZ21hO1xuICB9XG5cbiAgcHVibGljIGFkZElucHV0KGlucHV0OiBDb25uZWN0aW9uKSB7XG4gICAgdGhpcy5pbnB1dHMucHVzaChpbnB1dCk7XG4gIH07XG5cbiAgcHVibGljIGdldElucHV0cygpOiBDb25uZWN0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLmlucHV0cztcbiAgfVxuXG4gIHB1YmxpYyBhZGRPdXRwdXQob3V0cHV0OiBDb25uZWN0aW9uKSB7XG4gICAgdGhpcy5vdXRwdXRzLnB1c2gob3V0cHV0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPdXRwdXRzKCk6IENvbm5lY3Rpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMub3V0cHV0cztcbiAgfVxuXG4gIHB1YmxpYyBzZXRPdXRwdXRzKGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW10pIHtcbiAgICB0aGlzLm91dHB1dHMgPSBjb25uZWN0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbnB1dHMoY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXSkge1xuICAgIHRoaXMuaW5wdXRzID0gY29ubmVjdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgcmVzZXRJbnB1dHMoKSB7XG4gICAgdGhpcy5pbnB1dHMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldE91dHB1dHMoKSB7XG4gICAgdGhpcy5vdXRwdXRzID0gW107XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgdGhpcy5pc0NhbGN1bGF0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBY3RpdmF0aW9uKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuaXNCaWFzKSB0aGlzLmFjdGl2YXRpb24gPSAxO1xuICAgIHJldHVybiB0aGlzLmFjdGl2YXRpb247XG4gIH1cblxuICBwdWJsaWMgZ2V0U2lnbWEoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2lnbWE7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlQWN0aXZhdGlvbigpOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5pc0lucHV0ICYmICF0aGlzLmlzQ2FsY3VsYXRlZCAmJiAhdGhpcy5pc0JpYXMpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbiA9IFNJR01PSUQub3V0cHV0KHRoaXMuaW5wdXRzLnJlZHVjZSgoYWNjLCBjdXJyQ29ubikgPT4gYWNjICsgY3VyckNvbm4uY2FsY3VsYXRlVmFsdWUoKSwgMCkpO1xuICAgICAgdGhpcy5pc0NhbGN1bGF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRBY3RpdmF0aW9uKCk7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9