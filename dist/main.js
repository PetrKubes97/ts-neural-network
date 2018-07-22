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
        this.ctx.font = `bold ${height}px serif`;
        const text = Number(drawableNeuron.activation).toFixed(2);
        this.ctx.fillText(text, drawableNeuron.x - this.ctx.measureText(text).width / 2, drawableNeuron.y + height / 3);
    }
    drawConnection(inputNeuron, outputNeuron, weight) {
        this.ctx.beginPath();
        this.ctx.lineWidth = (weight > 0) ?
            Math.log(weight) :
            Math.log(-weight);
        this.ctx.strokeStyle = (weight > 0) ?
            `rgba(205, 83, 52, 1)` :
            `rgba(61, 232, 255, 1)`;
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
let inputSize = 2;
let hiddenSizes = [3];
let outputSize = 1;
let layerControls;
let inputControls;
let canvas;
let cost;
let iter;
let rateInput;
let itersInput;
let regTypeInput;
let regRateInput;
let trainingSetLabelsOutput;
let trainingSetDataOutput;
let trainingSetInput;
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
    visualizer = new _Visualizer__WEBPACK_IMPORTED_MODULE_0__["Visualizer"](canvas);
    initCore();
};
const initCore = () => {
    neuralCore = new _neuralNetwork_NeuralCore__WEBPACK_IMPORTED_MODULE_1__["NeuralCore"](inputSize, hiddenSizes, outputSize);
    neuralCore.addTrainingSet([1, 1], [0]);
    neuralCore.addTrainingSet([1, 0], [1]);
    neuralCore.addTrainingSet([0, 1], [1]);
    neuralCore.addTrainingSet([0, 0], [0]);
    // Set default values
    input = new Array(neuralCore.getInputSize());
    input.fill(1);
    neuralCore.evaluate(input);
    updateUI();
};
const updateUI = () => {
    neuralCore.evaluate(input);
    visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
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
    constructor(input, output) {
        this.weight = Math.random() * 10 - 5;
        this.sampleWeightChanges = [];
        this.inputNeuron = input;
        this.outputNeuron = output;
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
            return prev + Math.abs(connLayer.reduce((acc, conn) => acc + conn.getWeight(), 0));
        }, 0) * (1 / getNumberOfConnections(connections));
    },
    der: (weight) => {
        return (weight > 0) ? 1 : -1;
    }
};
const L2Reg = {
    cost: (connections) => {
        return 1 / 2 * connections.reduce((prev, connLayer) => {
            return prev + Math.pow(connLayer.reduce((acc, conn) => acc + conn.getWeight(), 0), 2);
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
                            regDer = _HelperObjects__WEBPACK_IMPORTED_MODULE_2__["L1Reg"].der(connection.getWeight());
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
                this.neurons[layerIdx - 1].forEach((neuron) => {
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
                this.neurons[layerIdx + 1].forEach((neuron) => {
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
            this.neurons[l + 1].forEach(nextNeuron => {
                this.neurons[l].forEach(currNeuron => {
                    const connection = new _Connection__WEBPACK_IMPORTED_MODULE_1__["Connection"](currNeuron, nextNeuron);
                    currNeuron.addOutput(connection);
                    nextNeuron.addInput(connection);
                    this.connections[l].push(connection);
                });
                // Add bias neuron to each layer
                const biasConnection = new _Connection__WEBPACK_IMPORTED_MODULE_1__["Connection"](this.biasNeuron, nextNeuron);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Zpc3VhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL0Nvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25ldXJhbE5ldHdvcmsvSGVscGVyT2JqZWN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV1cmFsTmV0d29yay9OZXVyYWxDb3JlLnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL05ldXJvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0VNO0lBUUosWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sR0FBRyxLQUFL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LElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFFTSxhQUFhO1FBQ2xCLElBQUksSUFBSSxDQUFDLE1BQU07WUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVNLG1CQUFtQjtRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxVQUFVLEdBQUcsc0RBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDMUI7UUFDRCxPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM5QixDQUFDO0NBQ0YiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgTmV1cm9uIH0gZnJvbSBcIi4vbmV1cmFsTmV0d29yay9OZXVyb25cIjtcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tIFwiLi9uZXVyYWxOZXR3b3JrL0Nvbm5lY3Rpb25cIjtcblxuZXhwb3J0IGNsYXNzIERyYXdhYmxlTmV1cm9uIHtcbiAgcHVibGljIHg6IG51bWJlcjtcbiAgcHVibGljIHk6IG51bWJlcjtcbiAgcHVibGljIGFjdGl2YXRpb246IG51bWJlcjtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIGlzQmlhczogYm9vbGVhbjtcbiAgcHVibGljIGlkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoeCwgeSwgYWN0aXZhdGlvbiwgbmFtZSwgaWQsIGlzQmlhcyA9IGZhbHNlKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuYWN0aXZhdGlvbiA9IGFjdGl2YXRpb247XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlzQmlhcyA9IGlzQmlhcztcbiAgICB0aGlzLmlkID0gaWQ7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6ZXIge1xuXG4gIHByaXZhdGUgY29udGVudDogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG4gIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcbiAgcHJpdmF0ZSBkcmF3YWJsZU5ldXJvbnM6IERyYXdhYmxlTmV1cm9uW107XG4gIHByaXZhdGUgZHJhd2FibGVJbnB1dE5ldXJvbnM6IERyYXdhYmxlTmV1cm9uW107XG5cbiAgY29uc3RydWN0b3IoY29udGVudDogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIHRoaXMuY3R4ID0gY29udGVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuaGVpZ2h0ID0gY29udGVudC5oZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IGNvbnRlbnQud2lkdGg7XG4gIH1cblxuICBwdWJsaWMgZHJhdyhuZXVyb25zOiBOZXVyb25bXVtdLCBjb25uZWN0aW9uczogQ29ubmVjdGlvbltdW10pIHtcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgdGhpcy5kcmF3YWJsZU5ldXJvbnMgPSBbXTtcbiAgICB0aGlzLmRyYXdhYmxlSW5wdXROZXVyb25zID0gW107XG4gICAgY29uc3QgbGVmdE1hcmdpbiA9IHRoaXMud2lkdGggLyAobmV1cm9ucy5sZW5ndGggKyAxKTtcblxuICAgIC8vIE5ldXJvbnNcbiAgICBuZXVyb25zLmZvckVhY2goKGxheWVyLCBsSWR4KSA9PiB7XG4gICAgICBjb25zdCB0b3BNYXJnaW4gPSB0aGlzLmhlaWdodCAvIChsYXllci5sZW5ndGggKyAyKTtcbiAgICAgIGxheWVyLmZvckVhY2goKG5ldXJvbiwgbklkeCkgPT4ge1xuICAgICAgICBjb25zdCB4ID0gbGVmdE1hcmdpbiAqICgxICsgbElkeCk7XG4gICAgICAgIGNvbnN0IHkgPSB0b3BNYXJnaW4gKiAoMSArIG5JZHgpO1xuXG4gICAgICAgIGNvbnN0IGRyYXdhYmxlTmV1cm9uID0gbmV3IERyYXdhYmxlTmV1cm9uKHgsIHksIG5ldXJvbi5nZXRBY3RpdmF0aW9uKCksIG5ldXJvbi5nZXROYW1lKCksIG5JZHgpO1xuICAgICAgICB0aGlzLmRyYXdhYmxlTmV1cm9ucy5wdXNoKGRyYXdhYmxlTmV1cm9uKTtcblxuICAgICAgICBpZiAobElkeCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuZHJhd2FibGVJbnB1dE5ldXJvbnMucHVzaChkcmF3YWJsZU5ldXJvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAobElkeCAhPSBuZXVyb25zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgY29uc3QgeCA9IGxlZnRNYXJnaW4gKiAoMSArIGxJZHgpO1xuICAgICAgICBjb25zdCB5ID0gdG9wTWFyZ2luICogKDEgKyBuZXVyb25zW2xJZHhdLmxlbmd0aCk7XG5cbiAgICAgICAgY29uc3QgZHJhd2FibGVOZXVyb24gPSBuZXcgRHJhd2FibGVOZXVyb24oeCwgeSwgMSwgYGJpYXMke2xJZHh9YCwgbmV1cm9uc1tsSWR4XS5sZW5ndGgsIHRydWUpO1xuICAgICAgICB0aGlzLmRyYXdhYmxlTmV1cm9ucy5wdXNoKGRyYXdhYmxlTmV1cm9uKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENvbm5lY3Rpb25zXG4gICAgY29uc3QgZHJhd2FibGVOYW1lTWFwID0gbmV3IE1hcDxzdHJpbmcsIERyYXdhYmxlTmV1cm9uPigpO1xuICAgIHRoaXMuZHJhd2FibGVOZXVyb25zLmZvckVhY2goXG4gICAgICAoZHJhd2FibGVOZXVyb24pID0+IGRyYXdhYmxlTmFtZU1hcC5zZXQoZHJhd2FibGVOZXVyb24ubmFtZSwgZHJhd2FibGVOZXVyb24pLy8gV1RGLCBJIHdhcyBub3QgYWJsZSB0byBjcmVhdGUgbWFwIGZyb20gMmQgYXJyXG4gICAgKTtcblxuICAgIGNvbm5lY3Rpb25zLmZvckVhY2goKGxheWVyLCBsSWR4KSA9PiB7XG4gICAgICBsYXllci5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0Tk5hbWUgPVxuICAgICAgICAgIChjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0SXNCaWFzKCkpID9cbiAgICAgICAgICAgIGBiaWFzJHtsSWR4fWAgOlxuICAgICAgICAgICAgY29ubmVjdGlvbi5nZXRJbnB1dE5ldXJvbigpLmdldE5hbWUoKTtcblxuICAgICAgICB0aGlzLmRyYXdDb25uZWN0aW9uKFxuICAgICAgICAgIGRyYXdhYmxlTmFtZU1hcC5nZXQoaW5wdXROTmFtZSksXG4gICAgICAgICAgZHJhd2FibGVOYW1lTWFwLmdldChjb25uZWN0aW9uLmdldE91dHB1dE5ldXJvbigpLmdldE5hbWUoKSksXG4gICAgICAgICAgY29ubmVjdGlvbi5nZXRXZWlnaHQoKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRyYXdhYmxlTmV1cm9ucy5mb3JFYWNoKChuZXVyb24pID0+IHtcbiAgICAgIHRoaXMuZHJhd05ldXJvbihuZXVyb24pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3TmV1cm9uKGRyYXdhYmxlTmV1cm9uOiBEcmF3YWJsZU5ldXJvbikge1xuICAgIC8vIHdoaXRlIGJhY2tncm91bmRcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5hcmMoZHJhd2FibGVOZXVyb24ueCwgZHJhd2FibGVOZXVyb24ueSwgMjUsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBgcmdiKDI1NSwyNTUsMjU1KWA7XG4gICAgdGhpcy5jdHguZmlsbCgpO1xuXG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgaWYgKGRyYXdhYmxlTmV1cm9uLmlzQmlhcylcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGByZ2JhKDQ2LDQwLDQyLCAxKWA7XG4gICAgZWxzZVxuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYmEoNjEsIDIzMiwgMjU1LCAke2RyYXdhYmxlTmV1cm9uLmFjdGl2YXRpb259KWA7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBgcmdiKDQ2LDQwLDQyLCAxKWBcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAxO1xuICAgIHRoaXMuY3R4LmFyYyhkcmF3YWJsZU5ldXJvbi54LCBkcmF3YWJsZU5ldXJvbi55LCAyNSwgMCwgMiAqIE1hdGguUEkpO1xuICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcblxuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGByZ2IoNDYsNDAsNDIsIDEpYFxuICAgIGNvbnN0IGhlaWdodCA9IDE2O1xuICAgIHRoaXMuY3R4LmZvbnQgPSBgYm9sZCAke2hlaWdodH1weCBzZXJpZmA7XG4gICAgY29uc3QgdGV4dCA9IE51bWJlcihkcmF3YWJsZU5ldXJvbi5hY3RpdmF0aW9uKS50b0ZpeGVkKDIpO1xuICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxuICAgICAgdGV4dCxcbiAgICAgIGRyYXdhYmxlTmV1cm9uLnggLSB0aGlzLmN0eC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aCAvIDIsXG4gICAgICBkcmF3YWJsZU5ldXJvbi55ICsgaGVpZ2h0IC8gMyk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdDb25uZWN0aW9uKGlucHV0TmV1cm9uOiBEcmF3YWJsZU5ldXJvbiwgb3V0cHV0TmV1cm9uOiBEcmF3YWJsZU5ldXJvbiwgd2VpZ2h0OiBudW1iZXIpIHtcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAod2VpZ2h0ID4gMCkgP1xuICAgICAgTWF0aC5sb2cod2VpZ2h0KSA6XG4gICAgICBNYXRoLmxvZygtd2VpZ2h0KTtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9ICh3ZWlnaHQgPiAwKSA/XG4gICAgICBgcmdiYSgyMDUsIDgzLCA1MiwgMSlgIDpcbiAgICAgIGByZ2JhKDYxLCAyMzIsIDI1NSwgMSlgO1xuICAgIHRoaXMuY3R4Lm1vdmVUbyhpbnB1dE5ldXJvbi54LCBpbnB1dE5ldXJvbi55KTtcbiAgICB0aGlzLmN0eC5saW5lVG8ob3V0cHV0TmV1cm9uLngsIG91dHB1dE5ldXJvbi55KTtcbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXREcmF3YWJsZUlucHV0TmV1cm9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5kcmF3YWJsZUlucHV0TmV1cm9ucztcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmlzdWFsaXplciwgRHJhd2FibGVOZXVyb24gfSBmcm9tICcuL1Zpc3VhbGl6ZXInO1xuaW1wb3J0IHsgTmV1cmFsQ29yZSB9IGZyb20gJy4vbmV1cmFsTmV0d29yay9OZXVyYWxDb3JlJztcbmltcG9ydCB7IFJlZ3VsYXJpemF0aW9ucywgVHJhaW5TYW1wbGUgfSBmcm9tICcuL25ldXJhbE5ldHdvcmsvSGVscGVyT2JqZWN0cyc7XG5pbXBvcnQgeyBOZXVyb24gfSBmcm9tICcuL25ldXJhbE5ldHdvcmsvTmV1cm9uJztcblxuKHdpbmRvdyBhcyBhbnkpLnNsaWRlID0gKGk6IG51bWJlciwgdmFsdWU6IG51bWJlcikgPT4ge1xuICBpbnB1dFtpXSA9IHZhbHVlO1xuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcbiAgdmlzdWFsaXplci5kcmF3KG5ldXJhbENvcmUuZ2V0TmV1cm9ucygpLCBuZXVyYWxDb3JlLmdldENvbm5lY3Rpb25zKCkpO1xufVxuXG4od2luZG93IGFzIGFueSkuYWRkT3JSZW1vdmVMYXllciA9IChhZGQ6IGJvb2xlYW4pID0+IHtcbiAgbmV1cmFsQ29yZS5hZGRPclJlbW92ZUxheWVyKGFkZCk7XG4gIHVwZGF0ZVVJKCk7XG59XG5cbih3aW5kb3cgYXMgYW55KS5hZGRPclJlbW92ZU5ldXJvbiA9IChhZGQ6IGJvb2xlYW4sIGxheWVySWR4OiBudW1iZXIpID0+IHtcbiAgbmV1cmFsQ29yZS5hZGRPclJlbW92ZU5ldXJvbihhZGQsIGxheWVySWR4KTtcbiAgaWYgKGxheWVySWR4ID09IDApIHtcbiAgICBpZiAoYWRkKVxuICAgICAgaW5wdXQucHVzaCgxKTtcbiAgICBlbHNlXG4gICAgICBpbnB1dC5wb3AoKTtcbiAgfVxuXG4gIHVwZGF0ZVVJKCk7XG59XG5cbih3aW5kb3cgYXMgYW55KS50cmFpbiA9IChtdWx0aXBsZUl0ZXJzOiBib29sZWFuKSA9PiB7XG4gIGxldCBpdGVycyA9IG11bHRpcGxlSXRlcnMgPyBOdW1iZXIucGFyc2VJbnQoaXRlcnNJbnB1dC52YWx1ZSkgOiAxO1xuICBuZXVyYWxDb3JlLnNldFJhdGUoTnVtYmVyLnBhcnNlRmxvYXQocmF0ZUlucHV0LnZhbHVlKSk7XG5cbiAgLy8gUmVndWxhcml6YXRpb25cbiAgc3dpdGNoIChyZWdUeXBlSW5wdXQudmFsdWUpIHtcbiAgICBjYXNlIFwiTDFcIjpcbiAgICAgIG5ldXJhbENvcmUuc2V0UmVndWxhcml6YXRpb25UeXBlKFJlZ3VsYXJpemF0aW9ucy5MMSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiTDJcIjpcbiAgICAgIG5ldXJhbENvcmUuc2V0UmVndWxhcml6YXRpb25UeXBlKFJlZ3VsYXJpemF0aW9ucy5MMik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwibm9uZVwiOlxuICAgICAgbmV1cmFsQ29yZS5zZXRSZWd1bGFyaXphdGlvblR5cGUoUmVndWxhcml6YXRpb25zLk5PTkUpO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICBuZXVyYWxDb3JlLnNldFJlZ3VsYXJpemF0aW9uUmF0ZShOdW1iZXIucGFyc2VGbG9hdChyZWdSYXRlSW5wdXQudmFsdWUpKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXJzOyBpKyspIHtcbiAgICBuZXVyYWxDb3JlLnRyYWluKCk7XG4gIH1cblxuICB1cGRhdGVVSSgpO1xufVxuXG4od2luZG93IGFzIGFueSkuc2V0VHJhaW5pbmdEYXRhID0gKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGFBcnIgPSBKU09OLnBhcnNlKHRyYWluaW5nU2V0SW5wdXQudmFsdWUpO1xuICAgIG5ldXJhbENvcmUuc2V0VHJhaW5pbmdTYW1wbGVzKFtdKTtcbiAgICBkYXRhQXJyLmZvckVhY2goKHNhbXBsZSkgPT4ge1xuICAgICAgbmV1cmFsQ29yZS5hZGRUcmFpbmluZ1NldChzYW1wbGVbMF0sIHNhbXBsZVsxXSk7XG4gICAgfSk7XG5cbiAgICB1cGRhdGVVSSgpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBhbGVydChlcnIpO1xuICB9XG59XG5cbih3aW5kb3cgYXMgYW55KS5yZXNldCA9ICgpID0+IHtcbiAgbmV1cmFsQ29yZS5yZXNldCgpO1xuICB1cGRhdGVVSSgpO1xufVxuXG4od2luZG93IGFzIGFueSkuYXBwbHlUcmFpbmluZ1NhbXBsZSA9IChpZHg6IG51bWJlcikgPT4ge1xuICBpbnB1dCA9IG5ldXJhbENvcmUuZ2V0VHJhaW5pbmdTYW1wbGVzKClbaWR4XS5pbnB1dDtcbiAgdXBkYXRlVUkoKTtcbn1cblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgbWFpbigpO1xufTtcblxubGV0IG5ldXJhbENvcmU6IE5ldXJhbENvcmU7XG5sZXQgdmlzdWFsaXplcjogVmlzdWFsaXplcjtcbmxldCBpbnB1dDogbnVtYmVyW107XG5cbmxldCBpbnB1dFNpemUgPSAyO1xubGV0IGhpZGRlblNpemVzID0gWzNdO1xubGV0IG91dHB1dFNpemUgPSAxO1xubGV0IGxheWVyQ29udHJvbHM6IEhUTUxFbGVtZW50O1xubGV0IGlucHV0Q29udHJvbHM6IEhUTUxFbGVtZW50O1xubGV0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG5cbmxldCBjb3N0OiBIVE1MRWxlbWVudDtcbmxldCBpdGVyOiBIVE1MRWxlbWVudDtcblxubGV0IHJhdGVJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbmxldCBpdGVyc0lucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xubGV0IHJlZ1R5cGVJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbmxldCByZWdSYXRlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbmxldCB0cmFpbmluZ1NldExhYmVsc091dHB1dDogSFRNTEVsZW1lbnQ7XG5sZXQgdHJhaW5pbmdTZXREYXRhT3V0cHV0OiBIVE1MRWxlbWVudDtcbmxldCB0cmFpbmluZ1NldElucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuXG5jb25zdCBtYWluID0gKCkgPT4ge1xuICBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICBpbnB1dENvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LWNvbnRyb2xzJyk7XG4gIGxheWVyQ29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGF5ZXItY29udHJvbHMnKTtcbiAgaXRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVyLW91dHB1dCcpO1xuICBjb3N0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvc3QnKTtcbiAgcmF0ZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhdGUtaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICBpdGVyc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZXJzLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgcmVnVHlwZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZ3VsYXJpemF0aW9uLXR5cGUtaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICByZWdSYXRlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVndWxhcml6YXRpb24tcmF0ZS1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHRyYWluaW5nU2V0RGF0YU91dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbmluZy1zZXQtZGF0YS1vdXRwdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICB0cmFpbmluZ1NldExhYmVsc091dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbmluZy1zZXQtbmV1cm9ucy1vdXRwdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICB0cmFpbmluZ1NldElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluaW5nLXNldC1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgdmlzdWFsaXplciA9IG5ldyBWaXN1YWxpemVyKGNhbnZhcyk7XG5cbiAgaW5pdENvcmUoKTtcbn1cblxuY29uc3QgaW5pdENvcmUgPSAoKSA9PiB7XG4gIG5ldXJhbENvcmUgPSBuZXcgTmV1cmFsQ29yZShpbnB1dFNpemUsIGhpZGRlblNpemVzLCBvdXRwdXRTaXplKTtcblxuICBuZXVyYWxDb3JlLmFkZFRyYWluaW5nU2V0KFsxLCAxXSwgWzBdKTtcbiAgbmV1cmFsQ29yZS5hZGRUcmFpbmluZ1NldChbMSwgMF0sIFsxXSk7XG4gIG5ldXJhbENvcmUuYWRkVHJhaW5pbmdTZXQoWzAsIDFdLCBbMV0pO1xuICBuZXVyYWxDb3JlLmFkZFRyYWluaW5nU2V0KFswLCAwXSwgWzBdKTtcblxuICAvLyBTZXQgZGVmYXVsdCB2YWx1ZXNcbiAgaW5wdXQgPSBuZXcgQXJyYXkobmV1cmFsQ29yZS5nZXRJbnB1dFNpemUoKSk7XG4gIGlucHV0LmZpbGwoMSk7XG5cbiAgbmV1cmFsQ29yZS5ldmFsdWF0ZShpbnB1dCk7XG4gIHVwZGF0ZVVJKCk7XG59XG5cbmNvbnN0IHVwZGF0ZVVJID0gKCkgPT4ge1xuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcbiAgdmlzdWFsaXplci5kcmF3KG5ldXJhbENvcmUuZ2V0TmV1cm9ucygpLCBuZXVyYWxDb3JlLmdldENvbm5lY3Rpb25zKCkpO1xuXG4gIGxldCBjb250ZW50ID0gYWRkTGF5ZXJDb250cm9sUm93KFxuICAgICdMYXllcnMnLFxuICAgIG5ldXJhbENvcmUuZ2V0TGF5ZXJDbnQoKS50b1N0cmluZygpLFxuICAgICdhZGRPclJlbW92ZUxheWVyKHRydWUpJyxcbiAgICAnYWRkT3JSZW1vdmVMYXllcihmYWxzZSknXG4gICk7XG5cblxuICBjb250ZW50ICs9IGFkZExheWVyQ29udHJvbFJvdyhcbiAgICAnSW5wdXQgc2l6ZScsXG4gICAgbmV1cmFsQ29yZS5nZXRJbnB1dFNpemUoKS50b1N0cmluZygpLFxuICAgICdhZGRPclJlbW92ZU5ldXJvbih0cnVlLCAwKScsXG4gICAgJ2FkZE9yUmVtb3ZlTmV1cm9uKGZhbHNlLCAwKSdcbiAgKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5ldXJhbENvcmUuZ2V0TGF5ZXJDbnQoKSAtIDI7IGkrKykge1xuICAgIGNvbnRlbnQgKz0gYWRkTGF5ZXJDb250cm9sUm93KFxuICAgICAgJ0hpZGRlbiBsYXllciBzaXplJyxcbiAgICAgIG5ldXJhbENvcmUuZ2V0SGlkZGVuTGF5ZXJTaXplcygpW2ldLnRvU3RyaW5nKCksXG4gICAgICBgYWRkT3JSZW1vdmVOZXVyb24odHJ1ZSwgJHtpICsgMX0pYCxcbiAgICAgIGBhZGRPclJlbW92ZU5ldXJvbihmYWxzZSwgJHtpICsgMX0pYFxuICAgICk7XG4gIH1cblxuICBjb250ZW50ICs9IGFkZExheWVyQ29udHJvbFJvdyhcbiAgICAnT3V0cHV0IHNpemUnLFxuICAgIG5ldXJhbENvcmUuZ2V0T3V0cHV0U2l6ZSgpLnRvU3RyaW5nKCksXG4gICAgYGFkZE9yUmVtb3ZlTmV1cm9uKHRydWUsICR7bmV1cmFsQ29yZS5nZXRMYXllckNudCgpIC0gMX0pYCxcbiAgICBgYWRkT3JSZW1vdmVOZXVyb24oZmFsc2UsICR7bmV1cmFsQ29yZS5nZXRMYXllckNudCgpIC0gMX0pYFxuICApO1xuXG4gIGxheWVyQ29udHJvbHMuaW5uZXJIVE1MID0gY29udGVudDtcblxuICBpbnB1dENvbnRyb2xzLmlubmVySFRNTCA9ICcnO1xuXG4gIGlmICghdmlzdWFsaXplci5nZXREcmF3YWJsZUlucHV0TmV1cm9ucygpKSB7XG4gICAgdmlzdWFsaXplci5kcmF3KG5ldXJhbENvcmUuZ2V0TmV1cm9ucygpLCBuZXVyYWxDb3JlLmdldENvbm5lY3Rpb25zKCkpO1xuICB9XG5cblxuICBjb25zdCBjb250cm9sSGVpZ2h0ID0gNTA7XG4gIHZpc3VhbGl6ZXIuZ2V0RHJhd2FibGVJbnB1dE5ldXJvbnMoKS5mb3JFYWNoKChuZXVyb246IERyYXdhYmxlTmV1cm9uKSA9PiB7XG4gICAgY29uc3QgeCA9IG5ldXJvbi54IC0gNTA7XG4gICAgY29uc3QgeSA9IG5ldXJvbi55IC0gY29udHJvbEhlaWdodCAvIDIgKyA1O1xuICAgIGlucHV0Q29udHJvbHMuaW5uZXJIVE1MICs9IGA8aW5wdXRcbiAgICAgIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6ICR7eX1weDsgbGVmdDogJHt4fXB4OyBoZWlnaHQ6ICR7Y29udHJvbEhlaWdodH1weDtcIiBcbiAgICAgIHR5cGU9XCJyYW5nZVwiIG9yaWVudD1cInZlcnRpY2FsXCIgbWluPVwiMFwiIG1heD1cIjFcIiB2YWx1ZT1cIiR7bmV1cm9uLmFjdGl2YXRpb259XCIgc3RlcD1cIjAuMDVcIiBcbiAgICAgIG9uaW5wdXQ9XCJzbGlkZSgke25ldXJvbi5pZH0sIHRoaXMudmFsdWUpO1wiPmA7XG4gIH0pXG5cbiAgaXRlci5pbm5lckhUTUwgPSBuZXVyYWxDb3JlLmdldEl0ZXJhdGlvbigpLnRvU3RyaW5nKCk7XG4gIGNvc3QuaW5uZXJIVE1MID0gbmV1cmFsQ29yZS5nZXRDb3N0KCkudG9TdHJpbmcoKTtcblxuICAvLyBBZGQgdHJhaW5pbmcgc2V0IGRhdGEgbGFiZWxzXG4gIGxldCBsYWJlbHMgPSAnJztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXVyYWxDb3JlLmdldElucHV0U2l6ZSgpOyBpKyspIHtcbiAgICBsYWJlbHMgKz0gYDx0aCBzY29wZT0nY29sJz5JbnB1dCAke2l9PC90aD5gO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmV1cmFsQ29yZS5nZXRPdXRwdXRTaXplKCk7IGkrKykge1xuICAgIGxhYmVscyArPSBgPHRoIHNjb3BlPSdjb2wnIHN0eWxlPVwidGV4dC1hbGlnbjogcmlnaHRcIj5PdXRwdXQgJHtpfTwvdGg+YDtcbiAgfVxuICB0cmFpbmluZ1NldExhYmVsc091dHB1dC5pbm5lckhUTUwgPSBsYWJlbHM7XG5cbiAgLy8gQWRkIHRyYWluaW5nIGRhdGFcbiAgbGV0IHRyYWluaW5nRGF0YSA9ICcnO1xuICBuZXVyYWxDb3JlLmdldFRyYWluaW5nU2FtcGxlcygpLmZvckVhY2goKHNhbXBsZSwgaWR4KSA9PiB7XG4gICAgdHJhaW5pbmdEYXRhICs9IGA8dHIgc3R5bGU9XCJjdXJzb3I6cG9pbnRlcjtcIiBvbmNsaWNrPVwiYXBwbHlUcmFpbmluZ1NhbXBsZSgke2lkeH0pXCI+YDtcbiAgICBzYW1wbGUuaW5wdXQuZm9yRWFjaCh2YWwgPT4ge1xuICAgICAgdHJhaW5pbmdEYXRhICs9IGA8dGQ+JHt2YWx9PC90ZD5gO1xuICAgIH0pO1xuICAgIHNhbXBsZS5vdXRwdXQuZm9yRWFjaCh2YWwgPT4ge1xuICAgICAgdHJhaW5pbmdEYXRhICs9IGA8dGQgc3R5bGU9XCJ0ZXh0LWFsaWduOiByaWdodFwiPiR7dmFsfTwvdGQ+YDtcbiAgICB9KTtcbiAgICB0cmFpbmluZ0RhdGEgKz0gJzwvdHI+JztcbiAgfSk7XG4gIHRyYWluaW5nU2V0RGF0YU91dHB1dC5pbm5lckhUTUwgPSB0cmFpbmluZ0RhdGE7XG59XG5cbmNvbnN0IGFkZExheWVyQ29udHJvbFJvdyA9IChsYWJlbDogc3RyaW5nLCBzaXplOiBzdHJpbmcsIG9uY2xpY2tQb3M6IHN0cmluZywgb25jbGlja05lZzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGA8dHI+PHRkIGFsaWduPSdyaWdodCc+PGxhYmVsPiR7bGFiZWx9OjwvbGFiZWw+PGIgc3R5bGU9XCJtYXJnaW46IGF1dG8gNnB4XCI+JHtzaXplfTwvYj48L3RkPjx0ZD5cbiAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIHJvbGU9XCJncm91cFwiPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCIgb25jbGljaz1cIiR7b25jbGlja05lZ31cIj4tPC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc21cIiBvbmNsaWNrPVwiJHtvbmNsaWNrUG9zfVwiPis8L2J1dHRvbj5cbiAgPC9kaXY+PC90ZD48L3RyPmA7XG59IiwiaW1wb3J0IHsgTmV1cm9uIH0gZnJvbSBcIi4vTmV1cm9uXCI7XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uIHtcbiAgcHJpdmF0ZSB3ZWlnaHQ6IG51bWJlciA9IE1hdGgucmFuZG9tKCkgKiAxMCAtIDU7XG4gIHByaXZhdGUgaW5wdXROZXVyb246IE5ldXJvbjtcbiAgcHJpdmF0ZSBvdXRwdXROZXVyb246IE5ldXJvbjtcbiAgcHJpdmF0ZSBzYW1wbGVXZWlnaHRDaGFuZ2VzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGlucHV0OiBOZXVyb24sIG91dHB1dDogTmV1cm9uKSB7XG4gICAgdGhpcy5pbnB1dE5ldXJvbiA9IGlucHV0O1xuICAgIHRoaXMub3V0cHV0TmV1cm9uID0gb3V0cHV0O1xuICB9XG5cbiAgcHVibGljIGFkZFNhbXBsZVdlaWdodENoYW5nZSh3ZWlnaHRDaGFuZ2U6IG51bWJlcikge1xuICAgIHRoaXMuc2FtcGxlV2VpZ2h0Q2hhbmdlcy5wdXNoKHdlaWdodENoYW5nZSk7XG4gIH1cblxuICBwdWJsaWMgYXBwbHlBdmVyYWdlV2VpZ2h0Q2hhbmdlKCkge1xuICAgIGNvbnN0IGNoYW5nZSA9ICh0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjICsgdmFsLCAwKSAvIHRoaXMuc2FtcGxlV2VpZ2h0Q2hhbmdlcy5sZW5ndGgpO1xuICAgIHRoaXMud2VpZ2h0ICs9IGNoYW5nZTtcbiAgICB0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRXZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMud2VpZ2h0O1xuICB9XG5cbiAgcHVibGljIGNhbGN1bGF0ZVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLndlaWdodCAqIHRoaXMuaW5wdXROZXVyb24uY2FsY3VsYXRlQWN0aXZhdGlvbigpO1xuICB9XG5cbiAgcHVibGljIGdldE91dHB1dE5ldXJvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vdXRwdXROZXVyb247XG4gIH1cblxuICBwdWJsaWMgZ2V0SW5wdXROZXVyb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXROZXVyb247XG4gIH1cbn0iLCJpbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSBcIi4vQ29ubmVjdGlvblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGl2YXRpb24ge1xuICBkZXIoeDogbnVtYmVyKTogbnVtYmVyO1xuICBvdXRwdXQoeDogbnVtYmVyKTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGNvbnN0IFNJR01PSUQ6IEFjdGl2YXRpb24gPSB7XG4gIG91dHB1dDogKHg6IG51bWJlcik6IG51bWJlciA9PiAxIC8gKDEgKyBNYXRoLmV4cCgteCkpLFxuICBkZXI6ICh4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgIGxldCBvdXRwdXQgPSBTSUdNT0lELm91dHB1dCh4KTtcbiAgICByZXR1cm4gb3V0cHV0ICogKDEgLSBvdXRwdXQpO1xuICB9XG59O1xuXG5leHBvcnQgZW51bSBSZWd1bGFyaXphdGlvbnMge1xuICBMMSxcbiAgTDIsXG4gIE5PTkUsXG59XG5cbmV4cG9ydCBjb25zdCBMMVJlZyA9IHtcbiAgY29zdDogKGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW11bXSk6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIGNvbm5lY3Rpb25zLnJlZHVjZShcbiAgICAgIChwcmV2LCBjb25uTGF5ZXI6IENvbm5lY3Rpb25bXSkgPT4ge1xuICAgICAgICByZXR1cm4gcHJldiArIE1hdGguYWJzKGNvbm5MYXllci5yZWR1Y2UoKGFjYywgY29ubikgPT4gYWNjICsgY29ubi5nZXRXZWlnaHQoKSwgMCkpXG4gICAgICB9LCAwKSAqICgxIC8gZ2V0TnVtYmVyT2ZDb25uZWN0aW9ucyhjb25uZWN0aW9ucykpO1xuICB9LFxuXG4gIGRlcjogKHdlaWdodDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gKHdlaWdodCA+IDApID8gMSA6IC0xO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBMMlJlZyA9IHtcbiAgY29zdDogKGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW11bXSk6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIDEgLyAyICogY29ubmVjdGlvbnMucmVkdWNlKFxuICAgICAgKHByZXYsIGNvbm5MYXllcjogQ29ubmVjdGlvbltdKSA9PiB7XG4gICAgICAgIHJldHVybiBwcmV2ICsgY29ubkxheWVyLnJlZHVjZSgoYWNjLCBjb25uKSA9PiBhY2MgKyBjb25uLmdldFdlaWdodCgpLCAwKSAqKiAyXG4gICAgICB9LCAwKSAqICgxIC8gZ2V0TnVtYmVyT2ZDb25uZWN0aW9ucyhjb25uZWN0aW9ucykpO1xuICB9LFxuXG4gIGRlcjogKGN1cnJXZWlnaHQ6IG51bWJlciwgY29ubkNvdW50OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiBjdXJyV2VpZ2h0ICogKDEgLyBjb25uQ291bnQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUcmFpblNhbXBsZSB7XG4gIHB1YmxpYyBpbnB1dDogbnVtYmVyW107XG4gIHB1YmxpYyBvdXRwdXQ6IG51bWJlcltdO1xuXG4gIGNvbnN0cnVjdG9yKGlucHV0OiBudW1iZXJbXSwgb3V0cHV0OiBudW1iZXJbXSkge1xuICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICB0aGlzLm91dHB1dCA9IG91dHB1dDtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2V0TnVtYmVyT2ZDb25uZWN0aW9ucyA9IChjb25uZWN0aW9uczogQ29ubmVjdGlvbltdW10pOiBudW1iZXIgPT4ge1xuICByZXR1cm4gY29ubmVjdGlvbnMucmVkdWNlKChhY2MsIGNvbm4pID0+IGFjYyArIGNvbm4ubGVuZ3RoLCAwKTtcbn0iLCJpbXBvcnQgeyBOZXVyb24gfSBmcm9tIFwiLi9OZXVyb25cIjtcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tIFwiLi9Db25uZWN0aW9uXCI7XG5pbXBvcnQgeyBUcmFpblNhbXBsZSwgU0lHTU9JRCwgUmVndWxhcml6YXRpb25zLCBMMlJlZywgZ2V0TnVtYmVyT2ZDb25uZWN0aW9ucywgTDFSZWcgfSBmcm9tIFwiLi9IZWxwZXJPYmplY3RzXCI7XG5cbmV4cG9ydCBjbGFzcyBOZXVyYWxDb3JlIHtcbiAgcHJpdmF0ZSBpbnB1dFNpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSBoaWRkZW5MYXllclNpemVzOiBudW1iZXJbXTtcbiAgcHJpdmF0ZSBvdXRwdXRTaXplOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBsYXllckNudDogbnVtYmVyO1xuXG4gIHByaXZhdGUgaXRlckNudCA9IDA7XG5cbiAgcHJpdmF0ZSByYXRlID0gMTtcbiAgcHJpdmF0ZSBsYW1iZGEgPSAwLjAwMTtcbiAgcHJpdmF0ZSByZWdUeXBlOiBSZWd1bGFyaXphdGlvbnMgPSBSZWd1bGFyaXphdGlvbnMuTk9ORTtcblxuICBwcml2YXRlIGJpYXNOZXVyb24gPSBuZXcgTmV1cm9uKCdiaWFzJywgdHJ1ZSk7XG4gIHByaXZhdGUgbmV1cm9uczogTmV1cm9uW11bXSA9IFtdO1xuICBwcml2YXRlIGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW11bXSA9IFtdO1xuXG4gIHByaXZhdGUgdHJhaW5TYW1wbGVzOiBUcmFpblNhbXBsZVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoaW5wdXRTaXplOiBudW1iZXIsIGhpZGRlbkxheWVyU2l6ZXM6IG51bWJlcltdLCBvdXRwdXRTaXplOiBudW1iZXIpIHtcbiAgICB0aGlzLmlucHV0U2l6ZSA9IGlucHV0U2l6ZTtcbiAgICB0aGlzLmhpZGRlbkxheWVyU2l6ZXMgPSBoaWRkZW5MYXllclNpemVzO1xuICAgIHRoaXMub3V0cHV0U2l6ZSA9IG91dHB1dFNpemU7XG4gICAgdGhpcy5sYXllckNudCA9IGhpZGRlbkxheWVyU2l6ZXMubGVuZ3RoICsgMjtcblxuICAgIC8vIFJlc2V0XG4gICAgdGhpcy5uZXVyb25zID0gW107XG4gICAgdGhpcy5jb25uZWN0aW9ucyA9IFtdO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgLy8gQ3JlYXRlIHRoZSBuZXVyb25zXG4gICAgZm9yIChsZXQgbCA9IDA7IGwgPCB0aGlzLmxheWVyQ250OyBsKyspIHtcbiAgICAgIC8vIEhvdyBtYW55IG5ldXJvbnMgYXJlIGluIGVhY2ggbGF5ZXI/XG4gICAgICBsZXQgbmV1cm9uc0luTGF5ZXJDbnQgPSAwO1xuICAgICAgc3dpdGNoIChsKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBuZXVyb25zSW5MYXllckNudCA9IHRoaXMuaW5wdXRTaXplO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRoaXMuaGlkZGVuTGF5ZXJTaXplcy5sZW5ndGggKyAxOlxuICAgICAgICAgIG5ldXJvbnNJbkxheWVyQ250ID0gdGhpcy5vdXRwdXRTaXplO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG5ldXJvbnNJbkxheWVyQ250ID0gdGhpcy5oaWRkZW5MYXllclNpemVzW2wgLSAxXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdGhpcy5uZXVyb25zW2xdID0gW107XG5cbiAgICAgIC8vIENyZWF0ZSB0aGVtXG4gICAgICBmb3IgKGxldCBuID0gMDsgbiA8IG5ldXJvbnNJbkxheWVyQ250OyBuKyspIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xdW25dID0gbmV3IE5ldXJvbihgTmV1cm9uJHtsfSR7bn1gKTtcbiAgICAgICAgaWYgKGwgPT0gMCkge1xuICAgICAgICAgIHRoaXMubmV1cm9uc1tsXVtuXS5zZXRBc0lucHV0TmV1cm9uKDApOyAvLyBqdXN0IHRvIGF2b2lkIGNyYXNoZXMsIHRoZSAwIHNob3VsZCBiZSBvdmVycmlkZW4gbGF0ZXIgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgdGhlIENvbm5lY3Rpb25zXG4gICAgdGhpcy5jcmVhdGVDb25uZWN0aW9ucygwLCB0aGlzLmxheWVyQ250IC0gMSk7XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGUoaW5wdXQ6IG51bWJlcltdKTogbnVtYmVyW10ge1xuXG4gICAgaWYgKGlucHV0Lmxlbmd0aCAhPSB0aGlzLmlucHV0U2l6ZSkge1xuICAgICAgdGhyb3cgJ0lucHV0IHNpemUgZG9lcyBub3QgbWF0Y2gnO1xuICAgIH1cbiAgICAvLyBSZXNldCwgc28gZWFjaCBuZXVyb24gaXMgcmVjYWxjdWxhdGVkXG4gICAgdGhpcy5uZXVyb25zLmZvckVhY2gobGF5ZXIgPT4geyBsYXllci5mb3JFYWNoKG5ldXJvbiA9PiBuZXVyb24ucmVzZXQoKSkgfSlcbiAgICAvLyBTZXQgaW5wdXQgbGF5ZXJcbiAgICB0aGlzLm5ldXJvbnNbMF0uZm9yRWFjaCgobmV1cm9uLCBpZHgpID0+IHsgbmV1cm9uLnNldElucHV0KGlucHV0W2lkeF0pIH0pO1xuXG4gICAgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5mb3JFYWNoKG5ldXJvbiA9PiB7XG4gICAgICBuZXVyb24uY2FsY3VsYXRlQWN0aXZhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250IC0gMV0ubWFwKG5ldXJvbiA9PiBuZXVyb24uZ2V0QWN0aXZhdGlvbigpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRUcmFpbmluZ1NldChpbnB1dDogbnVtYmVyW10sIG91dHB1dDogbnVtYmVyW10pIHtcbiAgICBpZiAoaW5wdXQubGVuZ3RoICE9IHRoaXMuaW5wdXRTaXplKSB7XG4gICAgICB0aHJvdyAnSW5wdXQgc2l6ZSBkb2VzIG5vdCBtYXRjaCc7XG4gICAgfSBlbHNlIGlmIChvdXRwdXQubGVuZ3RoICE9IHRoaXMub3V0cHV0U2l6ZSkge1xuICAgICAgdGhyb3cgJ091dHB1dCBzaXplIGRvZXMgbm90IG1hdGNoJztcbiAgICB9XG5cbiAgICB0aGlzLnRyYWluU2FtcGxlcy5wdXNoKG5ldyBUcmFpblNhbXBsZShpbnB1dCwgb3V0cHV0KSlcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb3N0KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMudHJhaW5TYW1wbGVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBjb25zdCBjb3N0U3VtID0gdGhpcy50cmFpblNhbXBsZXMucmVkdWNlKChjb3N0U3VtLCBzYW1wbGUpID0+IHsgLy8gQWRkIHVwIGFsbCBzYW1wbGVzXG4gICAgICB0aGlzLmV2YWx1YXRlKHNhbXBsZS5pbnB1dCk7XG4gICAgICByZXR1cm4gY29zdFN1bSArIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250IC0gMV0ucmVkdWNlKChhY2MsIG5ldXJvbiwgaSkgPT4geyAvLyBBZGQgdXAgYWxsIG91dHB1dCBuZXVyb25zXG4gICAgICAgIHJldHVybiBhY2MgKyAobmV1cm9uLmdldEFjdGl2YXRpb24oKSAtIHNhbXBsZS5vdXRwdXRbaV0pICoqIDI7XG4gICAgICB9LCAwKTtcbiAgICB9LCAwKTtcblxuICAgIC8vIFJlZ3VsYXJpemF0aW9uXG4gICAgbGV0IHJlZ0Nvc3QgPSAwO1xuICAgIHN3aXRjaCAodGhpcy5yZWdUeXBlKSB7XG4gICAgICBjYXNlIFJlZ3VsYXJpemF0aW9ucy5MMTpcbiAgICAgICAgcmVnQ29zdCA9IEwxUmVnLmNvc3QodGhpcy5jb25uZWN0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBSZWd1bGFyaXphdGlvbnMuTDI6XG4gICAgICAgIHJlZ0Nvc3QgPSBMMlJlZy5jb3N0KHRoaXMuY29ubmVjdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUmVndWxhcml6YXRpb25zLk5PTkU6XG4gICAgICAgIHJlZ0Nvc3QgPSAwO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gMSAvIDIgKiBjb3N0U3VtICogKDEgLyB0aGlzLnRyYWluU2FtcGxlcy5sZW5ndGgpICtcbiAgICAgIHRoaXMubGFtYmRhICogcmVnQ29zdDtcbiAgfVxuXG4gIHB1YmxpYyB0cmFpbigpIHtcbiAgICB0aGlzLnRyYWluU2FtcGxlcy5mb3JFYWNoKChzYW1wbGUpID0+IHtcbiAgICAgIHRoaXMuZXZhbHVhdGUoc2FtcGxlLmlucHV0KVxuXG4gICAgICAvLyBDYWxjdWxhdGUgc2lnbWFzIG9mIHRoZSBsYXN0IGxheWVyXG4gICAgICB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLmZvckVhY2goKG5ldXJvbiwgaWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1NpZ21hID1cbiAgICAgICAgICAoc2FtcGxlLm91dHB1dFtpZHhdIC0gbmV1cm9uLmdldEFjdGl2YXRpb24oKSkgKiBTSUdNT0lELmRlcihuZXVyb24uZ2V0QWN0aXZhdGlvbigpKTtcblxuICAgICAgICBuZXVyb24uc2V0U2lnbWEobmV3U2lnbWEpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBzaWdtYXMgZm9yIGVhY2ggbmV1cm9uIGluIHRoZSBsb3dlciBsYXllcnNcbiAgICAgIGZvciAobGV0IGwgPSB0aGlzLmxheWVyQ250IC0gMjsgbCA+PSAwOyBsLS0pIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xdLmZvckVhY2goKG5ldXJvbikgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld1NpZ21hID1cbiAgICAgICAgICAgIG5ldXJvbi5nZXRPdXRwdXRzKCkucmVkdWNlKChhY2MsIGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFjYyArIGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0U2lnbWEoKSAqIGNvbm5lY3Rpb24uZ2V0V2VpZ2h0KCk7XG4gICAgICAgICAgICB9LCAwKSAqIFNJR01PSUQuZGVyKG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkpO1xuICAgICAgICAgIG5ldXJvbi5zZXRTaWdtYShuZXdTaWdtYSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBBY2N1bXVsYXRlIGFsbCB3ZWlnaHQgdXBkYXRlc1xuICAgICAgdGhpcy5jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uTGF5ZXIpID0+IHtcbiAgICAgICAgY29ubkxheWVyLmZvckVhY2goKGNvbm5lY3Rpb24pID0+IHtcblxuICAgICAgICAgIGxldCByZWdEZXIgPSAwO1xuICAgICAgICAgIHN3aXRjaCAodGhpcy5yZWdUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFJlZ3VsYXJpemF0aW9ucy5MMTpcbiAgICAgICAgICAgICAgcmVnRGVyID0gTDFSZWcuZGVyKGNvbm5lY3Rpb24uZ2V0V2VpZ2h0KCkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUmVndWxhcml6YXRpb25zLkwyOlxuICAgICAgICAgICAgICByZWdEZXIgPSBMMlJlZy5kZXIoY29ubmVjdGlvbi5nZXRXZWlnaHQoKSwgZ2V0TnVtYmVyT2ZDb25uZWN0aW9ucyh0aGlzLmNvbm5lY3Rpb25zKSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBSZWd1bGFyaXphdGlvbnMuTk9ORTpcbiAgICAgICAgICAgICAgcmVnRGVyID0gMDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgd2VpZ2h0Q2hhbmdlID1cbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0U2lnbWEoKSAqXG4gICAgICAgICAgICBjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0QWN0aXZhdGlvbigpICpcbiAgICAgICAgICAgIHRoaXMucmF0ZSAtXG4gICAgICAgICAgICB0aGlzLmxhbWJkYSAqIHJlZ0RlcjsgLy8gUmVndWxhcml6YXRpb25cblxuICAgICAgICAgIGNvbm5lY3Rpb24uYWRkU2FtcGxlV2VpZ2h0Q2hhbmdlKHdlaWdodENoYW5nZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBVZmYsIGxldCdzIGhvcGUgZXZlcnl0aGluZyB3b3JrcyBhbmQgYXBwbHkgdGhlIG1hZ2ljXG4gICAgdGhpcy5jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uTGF5ZXIpID0+IHtcbiAgICAgIGNvbm5MYXllci5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbm5lY3Rpb24uYXBwbHlBdmVyYWdlV2VpZ2h0Q2hhbmdlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuaXRlckNudCsrO1xuICB9XG5cbiAgcHVibGljIGFkZE9yUmVtb3ZlTGF5ZXIoYWRkOiBib29sZWFuKSB7XG4gICAgaWYgKGFkZCkge1xuICAgICAgY29uc3QgbmV3TGF5ZXJTaXplID0gMztcbiAgICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplcy5wdXNoKG5ld0xheWVyU2l6ZSk7XG4gICAgICB0aGlzLmxheWVyQ250Kys7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgbmV3IG5ldXJvbnNcbiAgICAgIHRoaXMuY3JlYXRlTGF5ZXJPZk5ldXJvbnModGhpcy5sYXllckNudCAtIDIsIG5ld0xheWVyU2l6ZSk7XG5cbiAgICAgIC8vIFJlY3JlYXRlIHRoZSBsYXN0IGxheWVyXG4gICAgICB0aGlzLmNyZWF0ZUxheWVyT2ZOZXVyb25zKHRoaXMubGF5ZXJDbnQgLSAxLCB0aGlzLm91dHB1dFNpemUpO1xuXG4gICAgICAvLyBSZWNyZWF0ZSBhbGwgbmVjZXNzYXJ5IGNvbm5lY3Rpb25zXG4gICAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25zKHRoaXMubGF5ZXJDbnQgLSAzLCB0aGlzLmxheWVyQ250IC0gMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmxheWVyQ250ID09IDIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmhpZGRlbkxheWVyU2l6ZXMucG9wKCk7XG4gICAgICB0aGlzLmxheWVyQ250LS07XG4gICAgICB0aGlzLm5ldXJvbnMucG9wKCk7XG4gICAgICB0aGlzLmNvbm5lY3Rpb25zLnBvcCgpO1xuXG4gICAgICAvLyBSZWNyZWF0ZSB0aGUgbGFzdCBsYXllclxuICAgICAgdGhpcy5jcmVhdGVMYXllck9mTmV1cm9ucyh0aGlzLmxheWVyQ250IC0gMSwgdGhpcy5vdXRwdXRTaXplKTtcblxuICAgICAgLy8gUmVjcmVhdGUgYWxsIG5lY2Vzc2FyeSBjb25uZWN0aW9uc1xuICAgICAgdGhpcy5jcmVhdGVDb25uZWN0aW9ucyh0aGlzLmxheWVyQ250IC0gMiwgdGhpcy5sYXllckNudCAtIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRoaXMgZnVuY3Rpb24gaXMgdmVyeSBsb25nIGFuZCB1Z2x5LCBJIGRvbnQgd2FudCB0byBzaW1wbHkgcmVidWlsZCB0aGUgbmV0d29yayBiZWNhdXNlIEkgd2FudCB0byBrZWVwIHRoZSB3ZWlnaHRzXG4gIHB1YmxpYyBhZGRPclJlbW92ZU5ldXJvbihhZGQ6IGJvb2xlYW4sIGxheWVySWR4OiBudW1iZXIpIHtcbiAgICBjb25zdCBpc0lucHV0ID0gbGF5ZXJJZHggPT0gMDtcbiAgICBjb25zdCBpc091dHB1dCA9IGxheWVySWR4ID09IHRoaXMubGF5ZXJDbnQgLSAxO1xuICAgIGNvbnN0IGlzSGlkZGVuID0gIWlzSW5wdXQgJiYgIWlzT3V0cHV0O1xuXG4gICAgY29uc3Qgc2l6ZUNoYW5nZSA9IChhZGQpID8gMSA6IC0xXG5cbiAgICBpZiAoaXNIaWRkZW4pIHtcbiAgICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplc1tsYXllcklkeCAtIDFdICs9IHNpemVDaGFuZ2U7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzSW5wdXQpIHtcbiAgICAgIHRoaXMuaW5wdXRTaXplICs9IHNpemVDaGFuZ2U7XG4gICAgICB0aGlzLnRyYWluU2FtcGxlcyA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm91dHB1dFNpemUgKz0gc2l6ZUNoYW5nZTtcbiAgICAgIHRoaXMudHJhaW5TYW1wbGVzID0gW107XG4gICAgfVxuXG4gICAgaWYgKGFkZCkge1xuICAgICAgbGV0IG5ld05ldXJvbklkeDtcblxuICAgICAgaWYgKGlzSGlkZGVuKSB7XG4gICAgICAgIG5ld05ldXJvbklkeCA9IHRoaXMuaGlkZGVuTGF5ZXJTaXplc1tsYXllcklkeCAtIDFdIC0gMTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzSW5wdXQpIHtcbiAgICAgICAgbmV3TmV1cm9uSWR4ID0gdGhpcy5pbnB1dFNpemUgLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3TmV1cm9uSWR4ID0gdGhpcy5vdXRwdXRTaXplIC0gMTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3TmV1cm9uID0gbmV3IE5ldXJvbihgTmV1cm9uJHtsYXllcklkeH0ke25ld05ldXJvbklkeH1gKTtcbiAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeF1bbmV3TmV1cm9uSWR4XSA9IG5ld05ldXJvbjtcblxuICAgICAgaWYgKGlzSW5wdXQpXG4gICAgICAgIG5ld05ldXJvbi5zZXRBc0lucHV0TmV1cm9uKDApO1xuXG4gICAgICAvLy8vIEFkZCBjb25uZWN0aW9ucyBmcm9tIHRoZSBwcmV2IGxheWVyXG4gICAgICBpZiAoIWlzSW5wdXQpIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4IC0gMV0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKG5ldXJvbiwgbmV3TmV1cm9uKTtcbiAgICAgICAgICBuZXVyb24uYWRkT3V0cHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICAgIG5ld05ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4IC0gMV0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIERvbnQgZm9yZ2V0IHRoZSBiaWFzXG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbih0aGlzLmJpYXNOZXVyb24sIG5ld05ldXJvbik7XG4gICAgICAgIG5ld05ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeCAtIDFdLnB1c2goY29ubmVjdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNPdXRwdXQpIHtcbiAgICAgICAgLy8vLyBBZGQgY29ubmVjdGlvbnMgdG8gdGhlIG5leHQgbGF5ZXJcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4ICsgMV0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKG5ld05ldXJvbiwgbmV1cm9uKTtcbiAgICAgICAgICBuZXVyb24uYWRkSW5wdXQoY29ubmVjdGlvbik7XG4gICAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeF0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJlbW92ZWROZXVyb24gPSB0aGlzLm5ldXJvbnNbbGF5ZXJJZHhdLnBvcCgpO1xuICAgICAgLy8gUmVtb3ZlIG91dHB1dHMgZnJvbSB0aGUgcHJldiBsYXllclxuICAgICAgaWYgKCFpc0lucHV0KSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeCAtIDFdLmZvckVhY2goKG5ldXJvbikgPT4ge1xuICAgICAgICAgIG5ldXJvbi5zZXRPdXRwdXRzKG5ldXJvbi5nZXRPdXRwdXRzKCkuZmlsdGVyKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXROYW1lKCkgIT0gcmVtb3ZlZE5ldXJvbi5nZXROYW1lKCk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVtb3ZlIGlucHV0IGluIHRoZSBuZXh0IGxheWVyXG4gICAgICBpZiAoIWlzT3V0cHV0KSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeCArIDFdLmZvckVhY2goKG5ldXJvbikgPT4ge1xuICAgICAgICAgIG5ldXJvbi5zZXRJbnB1dHMobmV1cm9uLmdldElucHV0cygpLmZpbHRlcigoY29ubmVjdGlvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS5nZXROYW1lKCkgIT0gcmVtb3ZlZE5ldXJvbi5nZXROYW1lKCk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVtb3ZlIHRoZSB1bnVzZWQgY29ubmVjdGlvbnNcbiAgICAgIGlmICghaXNJbnB1dCkge1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4IC0gMV0gPSB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4IC0gMV0uZmlsdGVyKChjb25uZWN0aW9uOiBDb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0TmFtZSgpICE9IHJlbW92ZWROZXVyb24uZ2V0TmFtZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc091dHB1dCkge1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4XSA9IHRoaXMuY29ubmVjdGlvbnNbbGF5ZXJJZHhdLmZpbHRlcigoY29ubmVjdGlvbjogQ29ubmVjdGlvbikgPT4ge1xuICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0TmFtZSgpICE9IHJlbW92ZWROZXVyb24uZ2V0TmFtZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgdGhpcy5pdGVyQ250ID0gMDtcbiAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25zKDAsIHRoaXMubGF5ZXJDbnQgLSAxKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTGF5ZXJPZk5ldXJvbnMobGF5ZXJJZHg6IG51bWJlciwgbGF5ZXJTaXplOiBudW1iZXIpIHtcbiAgICB0aGlzLm5ldXJvbnNbbGF5ZXJJZHhdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllclNpemU7IGkrKykge1xuICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4XVtpXSA9IG5ldyBOZXVyb24oYE5ldXJvbiR7bGF5ZXJJZHh9JHtpfWApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ29ubmVjdGlvbnMoZmlyc3RMYXllciwgbGFzdExheWVyKSB7XG4gICAgZm9yIChsZXQgbCA9IGZpcnN0TGF5ZXI7IGwgPCBsYXN0TGF5ZXI7IGwrKykge1xuICAgICAgLy8gRm9yIGVhY2ggbmV1cm9uIGluIHRoZSBsYXllciBhZGQgYWxsIGNvbm5lY3Rpb25zIHRvIG5ldXJvbnMgaW4gdGhlIG5leHQgbGF5ZXJcbiAgICAgIHRoaXMuY29ubmVjdGlvbnNbbF0gPSBbXTtcblxuICAgICAgLy8gUmVzZXQgaW5wdXQgJiBvdXRwdXRzXG4gICAgICB0aGlzLm5ldXJvbnNbbCArIDFdLmZvckVhY2gobmV4dE5ldXJvbiA9PiB7IG5leHROZXVyb24ucmVzZXRJbnB1dHMoKSB9KTtcbiAgICAgIHRoaXMubmV1cm9uc1tsXS5mb3JFYWNoKG5leHROZXVyb24gPT4geyBuZXh0TmV1cm9uLnJlc2V0T3V0cHV0cygpIH0pO1xuXG5cbiAgICAgIHRoaXMubmV1cm9uc1tsICsgMV0uZm9yRWFjaChuZXh0TmV1cm9uID0+IHsgLy8gSWYgeW91IHdvbmRlciB3aHkgdGhpcyBjeWNsZXMgYXJlIHN3aXRjaGVkLCBpdCdzIGJlY2F1c2Ugb2YgdGhlIGJpYXNcbiAgICAgICAgdGhpcy5uZXVyb25zW2xdLmZvckVhY2goY3Vyck5ldXJvbiA9PiB7XG4gICAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKGN1cnJOZXVyb24sIG5leHROZXVyb24pXG4gICAgICAgICAgY3Vyck5ldXJvbi5hZGRPdXRwdXQoY29ubmVjdGlvbik7XG4gICAgICAgICAgbmV4dE5ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xdLnB1c2goY29ubmVjdGlvbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEFkZCBiaWFzIG5ldXJvbiB0byBlYWNoIGxheWVyXG4gICAgICAgIGNvbnN0IGJpYXNDb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb24odGhpcy5iaWFzTmV1cm9uLCBuZXh0TmV1cm9uKTtcbiAgICAgICAgbmV4dE5ldXJvbi5hZGRJbnB1dChiaWFzQ29ubmVjdGlvbik7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbF0ucHVzaChiaWFzQ29ubmVjdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0TmV1cm9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5uZXVyb25zO1xuICB9XG5cbiAgcHVibGljIGdldENvbm5lY3Rpb25zKCkge1xuICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb25zO1xuICB9XG5cbiAgcHVibGljIGdldElucHV0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dFNpemU7XG4gIH1cblxuICBwdWJsaWMgZ2V0T3V0cHV0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5vdXRwdXRTaXplO1xuICB9XG5cbiAgcHVibGljIGdldExheWVyQ250KCkge1xuICAgIHJldHVybiB0aGlzLmxheWVyQ250O1xuICB9XG5cbiAgcHVibGljIGdldEhpZGRlbkxheWVyU2l6ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGlkZGVuTGF5ZXJTaXplcztcbiAgfVxuXG4gIHB1YmxpYyBzZXRSYXRlKG5ld1JhdGU6IG51bWJlcikge1xuICAgIHRoaXMucmF0ZSA9IG5ld1JhdGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0SXRlcmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLml0ZXJDbnQ7XG4gIH1cblxuICBwdWJsaWMgc2V0UmVndWxhcml6YXRpb25UeXBlKHJlZ1R5cGU6IFJlZ3VsYXJpemF0aW9ucykge1xuICAgIHRoaXMucmVnVHlwZSA9IHJlZ1R5cGU7XG4gIH1cblxuICBwdWJsaWMgc2V0UmVndWxhcml6YXRpb25SYXRlKHJhdGU6IG51bWJlcikge1xuICAgIHRoaXMubGFtYmRhID0gcmF0ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUcmFpbmluZ1NhbXBsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhaW5TYW1wbGVzO1xuICB9XG5cbiAgcHVibGljIHNldFRyYWluaW5nU2FtcGxlcyhzYW1wbGVzOiBUcmFpblNhbXBsZVtdKSB7XG4gICAgdGhpcy50cmFpblNhbXBsZXMgPSBzYW1wbGVzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSBcIi4vQ29ubmVjdGlvblwiO1xuaW1wb3J0IHsgU0lHTU9JRCB9IGZyb20gXCIuL0hlbHBlck9iamVjdHNcIjtcblxuZXhwb3J0IGNsYXNzIE5ldXJvbiB7XG4gIHByaXZhdGUgbmFtZTogc3RyaW5nO1xuXG4gIHByaXZhdGUgYWN0aXZhdGlvbjogbnVtYmVyO1xuICBwcml2YXRlIGlucHV0czogQ29ubmVjdGlvbltdID0gW107XG4gIHByaXZhdGUgb3V0cHV0czogQ29ubmVjdGlvbltdID0gW107XG5cbiAgLy8gVGhlIGRlcml2YXRpb24gb2YgQyB3aXRoIHJlc3BlY3QgdG8gelxuICBwcml2YXRlIHNpZ21hOiBudW1iZXI7XG4gIHByaXZhdGUgaXNJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGlzQ2FsY3VsYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGlzQmlhczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgaXNCaWFzID0gZmFsc2UpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaXNCaWFzID0gaXNCaWFzO1xuICB9O1xuXG4gIHB1YmxpYyBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0SXNCaWFzKCkge1xuICAgIHJldHVybiB0aGlzLmlzQmlhcztcbiAgfVxuXG4gIHB1YmxpYyBzZXRBc0lucHV0TmV1cm9uKGFjdGl2YXRpb246IG51bWJlcikge1xuICAgIHRoaXMuaXNJbnB1dCA9IHRydWU7XG4gICAgdGhpcy5hY3RpdmF0aW9uID0gYWN0aXZhdGlvbjtcbiAgICB0aGlzLmlucHV0cyA9IG51bGw7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5wdXQoYWN0aXZhdGlvbjogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLmlzSW5wdXQpIHtcbiAgICAgIHRocm93ICdDYW5ub3Qgc2V0IGFjdGl2YXRpb24gb2Ygbm9uLWlucHV0IG5ldXJvbic7XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmF0aW9uID0gYWN0aXZhdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTaWdtYShzaWdtYTogbnVtYmVyKSB7XG4gICAgdGhpcy5zaWdtYSA9IHNpZ21hO1xuICB9XG5cbiAgcHVibGljIGFkZElucHV0KGlucHV0OiBDb25uZWN0aW9uKSB7XG4gICAgdGhpcy5pbnB1dHMucHVzaChpbnB1dCk7XG4gIH07XG5cbiAgcHVibGljIGdldElucHV0cygpOiBDb25uZWN0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLmlucHV0cztcbiAgfVxuXG4gIHB1YmxpYyBhZGRPdXRwdXQob3V0cHV0OiBDb25uZWN0aW9uKSB7XG4gICAgdGhpcy5vdXRwdXRzLnB1c2gob3V0cHV0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPdXRwdXRzKCk6IENvbm5lY3Rpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMub3V0cHV0cztcbiAgfVxuXG4gIHB1YmxpYyBzZXRPdXRwdXRzKGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW10pIHtcbiAgICB0aGlzLm91dHB1dHMgPSBjb25uZWN0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbnB1dHMoY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXSkge1xuICAgIHRoaXMuaW5wdXRzID0gY29ubmVjdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgcmVzZXRJbnB1dHMoKSB7XG4gICAgdGhpcy5pbnB1dHMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldE91dHB1dHMoKSB7XG4gICAgdGhpcy5vdXRwdXRzID0gW107XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgdGhpcy5pc0NhbGN1bGF0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBY3RpdmF0aW9uKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuaXNCaWFzKSB0aGlzLmFjdGl2YXRpb24gPSAxO1xuICAgIHJldHVybiB0aGlzLmFjdGl2YXRpb247XG4gIH1cblxuICBwdWJsaWMgZ2V0U2lnbWEoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2lnbWE7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlQWN0aXZhdGlvbigpOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5pc0lucHV0ICYmICF0aGlzLmlzQ2FsY3VsYXRlZCAmJiAhdGhpcy5pc0JpYXMpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbiA9IFNJR01PSUQub3V0cHV0KHRoaXMuaW5wdXRzLnJlZHVjZSgoYWNjLCBjdXJyQ29ubikgPT4gYWNjICsgY3VyckNvbm4uY2FsY3VsYXRlVmFsdWUoKSwgMCkpO1xuICAgICAgdGhpcy5pc0NhbGN1bGF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRBY3RpdmF0aW9uKCk7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9