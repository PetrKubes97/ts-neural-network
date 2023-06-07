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
        if (inputNeuron.name.indexOf("bias") > -1) {
            x = inputNeuron.x + 60;
        }
        else {
            x = outputNeuron.x - 60;
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
    neuralCore.addTrainingSet([3, 0, 1], [1, 0]);
    neuralCore.addTrainingSet([1, 3, 2], [0, 1]);
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
                    let weight;
                    try {
                        weight = this.weightList[l][toIdx][fromIdx];
                    }
                    catch (_a) {
                        weight = 0;
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
                    bias = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Zpc3VhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL0Nvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25ldXJhbE5ldHdvcmsvSGVscGVyT2JqZWN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV1cmFsTmV0d29yay9OZXVyYWxDb3JlLnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL05ldXJvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0VNO0lBUUosWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sR0FBRyxLQUFL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QUFZLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFFTSxhQUFhO1FBQ2xCLElBQUksSUFBSSxDQUFDLE1BQU07WUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVNLG1CQUFtQjtRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxVQUFVLEdBQUcsc0RBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDMUI7UUFDRCxPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM5QixDQUFDO0NBQ0YiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgTmV1cm9uIH0gZnJvbSBcIi4vbmV1cmFsTmV0d29yay9OZXVyb25cIjtcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tIFwiLi9uZXVyYWxOZXR3b3JrL0Nvbm5lY3Rpb25cIjtcblxuZXhwb3J0IGNsYXNzIERyYXdhYmxlTmV1cm9uIHtcbiAgcHVibGljIHg6IG51bWJlcjtcbiAgcHVibGljIHk6IG51bWJlcjtcbiAgcHVibGljIGFjdGl2YXRpb246IG51bWJlcjtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIGlzQmlhczogYm9vbGVhbjtcbiAgcHVibGljIGlkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoeCwgeSwgYWN0aXZhdGlvbiwgbmFtZSwgaWQsIGlzQmlhcyA9IGZhbHNlKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuYWN0aXZhdGlvbiA9IGFjdGl2YXRpb247XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlzQmlhcyA9IGlzQmlhcztcbiAgICB0aGlzLmlkID0gaWQ7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6ZXIge1xuXG4gIHByaXZhdGUgY29udGVudDogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG4gIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcbiAgcHJpdmF0ZSBkcmF3YWJsZU5ldXJvbnM6IERyYXdhYmxlTmV1cm9uW107XG4gIHByaXZhdGUgZHJhd2FibGVJbnB1dE5ldXJvbnM6IERyYXdhYmxlTmV1cm9uW107XG5cbiAgY29uc3RydWN0b3IoY29udGVudDogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIHRoaXMuY3R4ID0gY29udGVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuaGVpZ2h0ID0gY29udGVudC5oZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IGNvbnRlbnQud2lkdGg7XG4gIH1cblxuICBwdWJsaWMgZHJhdyhuZXVyb25zOiBOZXVyb25bXVtdLCBjb25uZWN0aW9uczogQ29ubmVjdGlvbltdW10pIHtcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgdGhpcy5kcmF3YWJsZU5ldXJvbnMgPSBbXTtcbiAgICB0aGlzLmRyYXdhYmxlSW5wdXROZXVyb25zID0gW107XG4gICAgY29uc3QgbGVmdE1hcmdpbiA9IHRoaXMud2lkdGggLyAobmV1cm9ucy5sZW5ndGggKyAxKTtcblxuICAgIC8vIE5ldXJvbnNcbiAgICBuZXVyb25zLmZvckVhY2goKGxheWVyLCBsSWR4KSA9PiB7XG4gICAgICBjb25zdCB0b3BNYXJnaW4gPSB0aGlzLmhlaWdodCAvIChsYXllci5sZW5ndGggKyAyKTtcbiAgICAgIGxheWVyLmZvckVhY2goKG5ldXJvbiwgbklkeCkgPT4ge1xuICAgICAgICBjb25zdCB4ID0gbGVmdE1hcmdpbiAqICgxICsgbElkeCk7XG4gICAgICAgIGNvbnN0IHkgPSB0b3BNYXJnaW4gKiAoMSArIG5JZHgpO1xuXG4gICAgICAgIGNvbnN0IGRyYXdhYmxlTmV1cm9uID0gbmV3IERyYXdhYmxlTmV1cm9uKHgsIHksIG5ldXJvbi5nZXRBY3RpdmF0aW9uKCksIG5ldXJvbi5nZXROYW1lKCksIG5JZHgpO1xuICAgICAgICB0aGlzLmRyYXdhYmxlTmV1cm9ucy5wdXNoKGRyYXdhYmxlTmV1cm9uKTtcblxuICAgICAgICBpZiAobElkeCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuZHJhd2FibGVJbnB1dE5ldXJvbnMucHVzaChkcmF3YWJsZU5ldXJvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAobElkeCAhPSBuZXVyb25zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgY29uc3QgeCA9IGxlZnRNYXJnaW4gKiAoMSArIGxJZHgpO1xuICAgICAgICBjb25zdCB5ID0gdG9wTWFyZ2luICogKDEgKyBuZXVyb25zW2xJZHhdLmxlbmd0aCk7XG5cbiAgICAgICAgY29uc3QgZHJhd2FibGVOZXVyb24gPSBuZXcgRHJhd2FibGVOZXVyb24oeCwgeSwgMSwgYGJpYXMke2xJZHh9YCwgbmV1cm9uc1tsSWR4XS5sZW5ndGgsIHRydWUpO1xuICAgICAgICB0aGlzLmRyYXdhYmxlTmV1cm9ucy5wdXNoKGRyYXdhYmxlTmV1cm9uKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENvbm5lY3Rpb25zXG4gICAgY29uc3QgZHJhd2FibGVOYW1lTWFwID0gbmV3IE1hcDxzdHJpbmcsIERyYXdhYmxlTmV1cm9uPigpO1xuICAgIHRoaXMuZHJhd2FibGVOZXVyb25zLmZvckVhY2goXG4gICAgICAoZHJhd2FibGVOZXVyb24pID0+IGRyYXdhYmxlTmFtZU1hcC5zZXQoZHJhd2FibGVOZXVyb24ubmFtZSwgZHJhd2FibGVOZXVyb24pLy8gV1RGLCBJIHdhcyBub3QgYWJsZSB0byBjcmVhdGUgbWFwIGZyb20gMmQgYXJyXG4gICAgKTtcblxuICAgIGNvbm5lY3Rpb25zLmZvckVhY2goKGxheWVyLCBsSWR4KSA9PiB7XG4gICAgICBsYXllci5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0Tk5hbWUgPVxuICAgICAgICAgIChjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0SXNCaWFzKCkpID9cbiAgICAgICAgICAgIGBiaWFzJHtsSWR4fWAgOlxuICAgICAgICAgICAgY29ubmVjdGlvbi5nZXRJbnB1dE5ldXJvbigpLmdldE5hbWUoKTtcblxuICAgICAgICB0aGlzLmRyYXdDb25uZWN0aW9uKFxuICAgICAgICAgIGRyYXdhYmxlTmFtZU1hcC5nZXQoaW5wdXROTmFtZSksXG4gICAgICAgICAgZHJhd2FibGVOYW1lTWFwLmdldChjb25uZWN0aW9uLmdldE91dHB1dE5ldXJvbigpLmdldE5hbWUoKSksXG4gICAgICAgICAgY29ubmVjdGlvbi5nZXRXZWlnaHQoKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRyYXdhYmxlTmV1cm9ucy5mb3JFYWNoKChuZXVyb24pID0+IHtcbiAgICAgIHRoaXMuZHJhd05ldXJvbihuZXVyb24pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3TmV1cm9uKGRyYXdhYmxlTmV1cm9uOiBEcmF3YWJsZU5ldXJvbikge1xuICAgIC8vIHdoaXRlIGJhY2tncm91bmRcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5hcmMoZHJhd2FibGVOZXVyb24ueCwgZHJhd2FibGVOZXVyb24ueSwgMjUsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBgcmdiKDI1NSwyNTUsMjU1KWA7XG4gICAgdGhpcy5jdHguZmlsbCgpO1xuXG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgaWYgKGRyYXdhYmxlTmV1cm9uLmlzQmlhcylcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGByZ2JhKDQ2LDQwLDQyLCAxKWA7XG4gICAgZWxzZVxuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYmEoNjEsIDIzMiwgMjU1LCAke2RyYXdhYmxlTmV1cm9uLmFjdGl2YXRpb259KWA7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBgcmdiKDQ2LDQwLDQyLCAxKWBcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAxO1xuICAgIHRoaXMuY3R4LmFyYyhkcmF3YWJsZU5ldXJvbi54LCBkcmF3YWJsZU5ldXJvbi55LCAyNSwgMCwgMiAqIE1hdGguUEkpO1xuICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcblxuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGByZ2IoNDYsNDAsNDIsIDEpYFxuICAgIGNvbnN0IGhlaWdodCA9IDE2O1xuICAgIHRoaXMuY3R4LmZvbnQgPSBgYm9sZCAke2hlaWdodH1weGA7XG4gICAgY29uc3QgdGV4dCA9IE51bWJlcihkcmF3YWJsZU5ldXJvbi5hY3RpdmF0aW9uKS50b0ZpeGVkKDQpO1xuICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxuICAgICAgdGV4dCxcbiAgICAgIGRyYXdhYmxlTmV1cm9uLnggLSB0aGlzLmN0eC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aCAvIDIsXG4gICAgICBkcmF3YWJsZU5ldXJvbi55ICsgaGVpZ2h0IC8gMyk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdDb25uZWN0aW9uKGlucHV0TmV1cm9uOiBEcmF3YWJsZU5ldXJvbiwgb3V0cHV0TmV1cm9uOiBEcmF3YWJsZU5ldXJvbiwgd2VpZ2h0OiBudW1iZXIpIHtcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSBNYXRoLmxvZygxLjAwMSArIE1hdGguYWJzKHdlaWdodCkpO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gKHdlaWdodCA+IDApID9cbiAgICAgIGByZ2JhKDYxLCAyMzIsIDI1NSwgMSlgIDpcbiAgICAgIGByZ2JhKDIwNSwgODMsIDUyLCAxKWA7XG5cbiAgICB0aGlzLmN0eC5tb3ZlVG8oaW5wdXROZXVyb24ueCwgaW5wdXROZXVyb24ueSk7XG4gICAgdGhpcy5jdHgubGluZVRvKG91dHB1dE5ldXJvbi54LCBvdXRwdXROZXVyb24ueSk7XG4gICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG5cbiAgICAvLyBEcmF3IGNvbm5lY3Rpb24gd2VpZ2h0c1xuICAgIC8vIHkgPSBheCArIGNcbiAgICBjb25zdCBhID0gKG91dHB1dE5ldXJvbi55IC0gaW5wdXROZXVyb24ueSkgLyAob3V0cHV0TmV1cm9uLnggLSBpbnB1dE5ldXJvbi54KVxuICAgIGNvbnN0IGMgPSBvdXRwdXROZXVyb24ueSAtIGEgKiBvdXRwdXROZXVyb24ueFxuICAgIGxldCB4O1xuICAgIGlmIChpbnB1dE5ldXJvbi5uYW1lLmluZGV4T2YoXCJiaWFzXCIpID4gLTEpIHtcbiAgICAgIHggPSBpbnB1dE5ldXJvbi54ICsgNjA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSBvdXRwdXROZXVyb24ueCAtIDYwO1xuICAgIH1cbiAgICBjb25zdCB5ID0gYSAqIHggKyBjO1xuXG4gICAgdGhpcy5jdHguZm9udCA9IGAxMnB4YDtcbiAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgdGhpcy5jdHgudHJhbnNsYXRlKHgsIHkpO1xuICAgIHRoaXMuY3R4LnJvdGF0ZShNYXRoLmF0YW4oYSkpO1xuICAgIHRoaXMuY3R4LmZpbGxUZXh0KE51bWJlcih3ZWlnaHQpLnRvRml4ZWQoNCksIDAsIDApO1xuICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXREcmF3YWJsZUlucHV0TmV1cm9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5kcmF3YWJsZUlucHV0TmV1cm9ucztcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmlzdWFsaXplciwgRHJhd2FibGVOZXVyb24gfSBmcm9tICcuL1Zpc3VhbGl6ZXInO1xuaW1wb3J0IHsgTmV1cmFsQ29yZSB9IGZyb20gJy4vbmV1cmFsTmV0d29yay9OZXVyYWxDb3JlJztcbmltcG9ydCB7IFJlZ3VsYXJpemF0aW9ucywgVHJhaW5TYW1wbGUgfSBmcm9tICcuL25ldXJhbE5ldHdvcmsvSGVscGVyT2JqZWN0cyc7XG5pbXBvcnQgeyBOZXVyb24gfSBmcm9tICcuL25ldXJhbE5ldHdvcmsvTmV1cm9uJztcblxuKHdpbmRvdyBhcyBhbnkpLnNsaWRlID0gKGk6IG51bWJlciwgdmFsdWU6IG51bWJlcikgPT4ge1xuICBpbnB1dFtpXSA9IHZhbHVlO1xuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcbiAgdmlzdWFsaXplci5kcmF3KG5ldXJhbENvcmUuZ2V0TmV1cm9ucygpLCBuZXVyYWxDb3JlLmdldENvbm5lY3Rpb25zKCkpO1xufVxuXG4od2luZG93IGFzIGFueSkuYWRkT3JSZW1vdmVMYXllciA9IChhZGQ6IGJvb2xlYW4pID0+IHtcbiAgbmV1cmFsQ29yZS5hZGRPclJlbW92ZUxheWVyKGFkZCk7XG4gIHVwZGF0ZVVJKCk7XG59XG5cbih3aW5kb3cgYXMgYW55KS5hZGRPclJlbW92ZU5ldXJvbiA9IChhZGQ6IGJvb2xlYW4sIGxheWVySWR4OiBudW1iZXIpID0+IHtcbiAgbmV1cmFsQ29yZS5hZGRPclJlbW92ZU5ldXJvbihhZGQsIGxheWVySWR4KTtcbiAgaWYgKGxheWVySWR4ID09IDApIHtcbiAgICBpZiAoYWRkKVxuICAgICAgaW5wdXQucHVzaCgxKTtcbiAgICBlbHNlXG4gICAgICBpbnB1dC5wb3AoKTtcbiAgfVxuXG4gIHVwZGF0ZVVJKCk7XG59XG5cbih3aW5kb3cgYXMgYW55KS50cmFpbiA9IChtdWx0aXBsZUl0ZXJzOiBib29sZWFuKSA9PiB7XG4gIGxldCBpdGVycyA9IG11bHRpcGxlSXRlcnMgPyBOdW1iZXIucGFyc2VJbnQoaXRlcnNJbnB1dC52YWx1ZSkgOiAxO1xuICBuZXVyYWxDb3JlLnNldFJhdGUoTnVtYmVyLnBhcnNlRmxvYXQocmF0ZUlucHV0LnZhbHVlKSk7XG5cbiAgLy8gUmVndWxhcml6YXRpb25cbiAgc3dpdGNoIChyZWdUeXBlSW5wdXQudmFsdWUpIHtcbiAgICBjYXNlIFwiTDFcIjpcbiAgICAgIG5ldXJhbENvcmUuc2V0UmVndWxhcml6YXRpb25UeXBlKFJlZ3VsYXJpemF0aW9ucy5MMSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiTDJcIjpcbiAgICAgIG5ldXJhbENvcmUuc2V0UmVndWxhcml6YXRpb25UeXBlKFJlZ3VsYXJpemF0aW9ucy5MMik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwibm9uZVwiOlxuICAgICAgbmV1cmFsQ29yZS5zZXRSZWd1bGFyaXphdGlvblR5cGUoUmVndWxhcml6YXRpb25zLk5PTkUpO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICBuZXVyYWxDb3JlLnNldFJlZ3VsYXJpemF0aW9uUmF0ZShOdW1iZXIucGFyc2VGbG9hdChyZWdSYXRlSW5wdXQudmFsdWUpKTtcblxuICBpZiAodHJhaW5SZXBlYXQuY2hlY2tlZCAmJiBpbnRlcnZhbCA9PSBudWxsKSB7XG4gICAgdHJhaW5CdG4uaW5uZXJUZXh0ID0gXCJTdG9wXCJcbiAgICBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHsgcnVuVHJhaW5Mb29wKGl0ZXJzKSB9LCAxMDApO1xuICB9IGVsc2UgaWYgKGludGVydmFsICE9IG51bGwpIHtcbiAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICBpbnRlcnZhbCA9IG51bGw7XG4gICAgdHJhaW5CdG4uaW5uZXJUZXh0ID0gXCJTdGFydFwiXG4gIH0gZWxzZSB7XG4gICAgcnVuVHJhaW5Mb29wKGl0ZXJzKTtcbiAgfVxufVxuXG5jb25zdCBydW5UcmFpbkxvb3AgPSAoaXRlcnM6IG51bWJlcikgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXJzOyBpKyspIHtcbiAgICBuZXVyYWxDb3JlLnRyYWluKCk7XG4gIH1cbiAgdXBkYXRlVUkoKTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLnNldFRyYWluaW5nRGF0YSA9ICgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBkYXRhQXJyID0gSlNPTi5wYXJzZSh0cmFpbmluZ1NldElucHV0LnZhbHVlKTtcbiAgICBuZXVyYWxDb3JlLnNldFRyYWluaW5nU2FtcGxlcyhbXSk7XG4gICAgZGF0YUFyci5mb3JFYWNoKChzYW1wbGUpID0+IHtcbiAgICAgIG5ldXJhbENvcmUuYWRkVHJhaW5pbmdTZXQoc2FtcGxlWzBdLCBzYW1wbGVbMV0pO1xuICAgIH0pO1xuICAgIG5ldXJhbENvcmUucmVzZXQoKTtcbiAgICB1cGRhdGVVSSgpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBhbGVydChlcnIpO1xuICB9XG59XG4od2luZG93IGFzIGFueSkuc2V0V2VpZ2h0cyA9ICgpID0+IHtcbiAgY29uc3Qgd2VpZ2h0czogbnVtYmVyW11bXVtdID0gSlNPTi5wYXJzZSh3ZWlnaHRzSW5wdXQudmFsdWUpO1xuICBuZXVyYWxDb3JlLnNldFdlaWdodHMod2VpZ2h0cyk7XG4gIG5ldXJhbENvcmUucmVzZXQoKTtcbiAgdXBkYXRlVUkoKTtcbn1cbih3aW5kb3cgYXMgYW55KS5zZXRCaWFzID0gKCkgPT4ge1xuICBjb25zdCB3ZWlnaHRzOiBudW1iZXJbXVtdID0gSlNPTi5wYXJzZShiaWFzSW5wdXQudmFsdWUpO1xuICBuZXVyYWxDb3JlLnNldEJpYXMod2VpZ2h0cyk7XG4gIG5ldXJhbENvcmUucmVzZXQoKTtcbiAgdXBkYXRlVUkoKTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLnJlc2V0ID0gKCkgPT4ge1xuICBuZXVyYWxDb3JlLnJlc2V0KCk7XG4gIHVwZGF0ZVVJKCk7XG59XG5cbih3aW5kb3cgYXMgYW55KS5hcHBseVRyYWluaW5nU2FtcGxlID0gKGlkeDogbnVtYmVyKSA9PiB7XG4gIGlucHV0ID0gbmV1cmFsQ29yZS5nZXRUcmFpbmluZ1NhbXBsZXMoKVtpZHhdLmlucHV0O1xuICB1cGRhdGVVSSgpO1xufVxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBtYWluKCk7XG59O1xuXG5sZXQgbmV1cmFsQ29yZTogTmV1cmFsQ29yZTtcbmxldCB2aXN1YWxpemVyOiBWaXN1YWxpemVyO1xubGV0IGlucHV0OiBudW1iZXJbXTtcbmxldCBpbnRlcnZhbCA9IG51bGw7XG5cbmxldCBpbnB1dFNpemUgPSAzO1xubGV0IGhpZGRlblNpemVzID0gWzJdO1xubGV0IG91dHB1dFNpemUgPSAyO1xuXG5sZXQgbGF5ZXJDb250cm9sczogSFRNTEVsZW1lbnQ7XG5sZXQgaW5wdXRDb250cm9sczogSFRNTEVsZW1lbnQ7XG5sZXQgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcblxubGV0IGNvc3Q6IEhUTUxFbGVtZW50O1xubGV0IGl0ZXI6IEhUTUxFbGVtZW50O1xuXG5sZXQgcmF0ZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xubGV0IGl0ZXJzSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5sZXQgcmVnVHlwZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xubGV0IHJlZ1JhdGVJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbmxldCB0cmFpblJlcGVhdDogSFRNTElucHV0RWxlbWVudDtcbmxldCB0cmFpbkJ0bjogSFRNTElucHV0RWxlbWVudDtcblxubGV0IHRyYWluaW5nU2V0TGFiZWxzT3V0cHV0OiBIVE1MRWxlbWVudDtcbmxldCB0cmFpbmluZ1NldERhdGFPdXRwdXQ6IEhUTUxFbGVtZW50O1xubGV0IHRyYWluaW5nU2V0SW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5sZXQgd2VpZ2h0c0lucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xubGV0IGJpYXNJbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuY29uc3QgbWFpbiA9ICgpID0+IHtcbiAgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgaW5wdXRDb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC1jb250cm9scycpO1xuICBsYXllckNvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xheWVyLWNvbnRyb2xzJyk7XG4gIGl0ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXRlci1vdXRwdXQnKTtcbiAgY29zdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3N0Jyk7XG4gIHJhdGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYXRlLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgaXRlcnNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVycy1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHJlZ1R5cGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWd1bGFyaXphdGlvbi10eXBlLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgcmVnUmF0ZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZ3VsYXJpemF0aW9uLXJhdGUtaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICB0cmFpbmluZ1NldERhdGFPdXRwdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW5pbmctc2V0LWRhdGEtb3V0cHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgdHJhaW5pbmdTZXRMYWJlbHNPdXRwdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW5pbmctc2V0LW5ldXJvbnMtb3V0cHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgdHJhaW5pbmdTZXRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbmluZy1zZXQtaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICB3ZWlnaHRzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW5pbmctc2V0LXdlaWdodHMnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICBiaWFzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW5pbmctc2V0LWJpYXMnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICB0cmFpblJlcGVhdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbi1yZXBlYXQtY2hja2J4JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgdHJhaW5CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW4tYnRuJykgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICB2aXN1YWxpemVyID0gbmV3IFZpc3VhbGl6ZXIoY2FudmFzKTtcblxuICBpbml0Q29yZSgpO1xufVxuXG5jb25zdCBpbml0Q29yZSA9ICgpID0+IHtcbiAgbmV1cmFsQ29yZSA9IG5ldyBOZXVyYWxDb3JlKGlucHV0U2l6ZSwgaGlkZGVuU2l6ZXMsIG91dHB1dFNpemUpO1xuXG4gIG5ldXJhbENvcmUuYWRkVHJhaW5pbmdTZXQoWzMsIDAsIDFdLCBbMSwgMF0pO1xuICBuZXVyYWxDb3JlLmFkZFRyYWluaW5nU2V0KFsxLDMsMl0sWzAsMV0pO1xuXG4gIC8vIFNldCBkZWZhdWx0IHZhbHVlc1xuICBpbnB1dCA9IG5ldyBBcnJheShuZXVyYWxDb3JlLmdldElucHV0U2l6ZSgpKTtcbiAgaW5wdXQuZmlsbCgxKTtcblxuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcbiAgdXBkYXRlVUkoKTtcbn1cblxuY29uc3QgdXBkYXRlVUkgPSAoKSA9PiB7XG4gIG5ldXJhbENvcmUuZXZhbHVhdGUoaW5wdXQpO1xuXG4gIGxldCBjb250ZW50ID0gYWRkTGF5ZXJDb250cm9sUm93KFxuICAgICdMYXllcnMnLFxuICAgIG5ldXJhbENvcmUuZ2V0TGF5ZXJDbnQoKS50b1N0cmluZygpLFxuICAgICdhZGRPclJlbW92ZUxheWVyKHRydWUpJyxcbiAgICAnYWRkT3JSZW1vdmVMYXllcihmYWxzZSknXG4gICk7XG5cblxuICBjb250ZW50ICs9IGFkZExheWVyQ29udHJvbFJvdyhcbiAgICAnSW5wdXQgc2l6ZScsXG4gICAgbmV1cmFsQ29yZS5nZXRJbnB1dFNpemUoKS50b1N0cmluZygpLFxuICAgICdhZGRPclJlbW92ZU5ldXJvbih0cnVlLCAwKScsXG4gICAgJ2FkZE9yUmVtb3ZlTmV1cm9uKGZhbHNlLCAwKSdcbiAgKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5ldXJhbENvcmUuZ2V0TGF5ZXJDbnQoKSAtIDI7IGkrKykge1xuICAgIGNvbnRlbnQgKz0gYWRkTGF5ZXJDb250cm9sUm93KFxuICAgICAgJ0hpZGRlbiBsYXllciBzaXplJyxcbiAgICAgIG5ldXJhbENvcmUuZ2V0SGlkZGVuTGF5ZXJTaXplcygpW2ldLnRvU3RyaW5nKCksXG4gICAgICBgYWRkT3JSZW1vdmVOZXVyb24odHJ1ZSwgJHtpICsgMX0pYCxcbiAgICAgIGBhZGRPclJlbW92ZU5ldXJvbihmYWxzZSwgJHtpICsgMX0pYFxuICAgICk7XG4gIH1cblxuICBjb250ZW50ICs9IGFkZExheWVyQ29udHJvbFJvdyhcbiAgICAnT3V0cHV0IHNpemUnLFxuICAgIG5ldXJhbENvcmUuZ2V0T3V0cHV0U2l6ZSgpLnRvU3RyaW5nKCksXG4gICAgYGFkZE9yUmVtb3ZlTmV1cm9uKHRydWUsICR7bmV1cmFsQ29yZS5nZXRMYXllckNudCgpIC0gMX0pYCxcbiAgICBgYWRkT3JSZW1vdmVOZXVyb24oZmFsc2UsICR7bmV1cmFsQ29yZS5nZXRMYXllckNudCgpIC0gMX0pYFxuICApO1xuXG4gIGxheWVyQ29udHJvbHMuaW5uZXJIVE1MID0gY29udGVudDtcblxuICBpbnB1dENvbnRyb2xzLmlubmVySFRNTCA9ICcnO1xuXG4gIGlmICghdmlzdWFsaXplci5nZXREcmF3YWJsZUlucHV0TmV1cm9ucygpKSB7XG4gICAgdmlzdWFsaXplci5kcmF3KG5ldXJhbENvcmUuZ2V0TmV1cm9ucygpLCBuZXVyYWxDb3JlLmdldENvbm5lY3Rpb25zKCkpO1xuICB9XG5cblxuICBjb25zdCBjb250cm9sSGVpZ2h0ID0gNTA7XG4gIHZpc3VhbGl6ZXIuZ2V0RHJhd2FibGVJbnB1dE5ldXJvbnMoKS5mb3JFYWNoKChuZXVyb246IERyYXdhYmxlTmV1cm9uKSA9PiB7XG4gICAgY29uc3QgeCA9IG5ldXJvbi54IC0gNTA7XG4gICAgY29uc3QgeSA9IG5ldXJvbi55IC0gY29udHJvbEhlaWdodCAvIDIgKyA1O1xuICAgIGlucHV0Q29udHJvbHMuaW5uZXJIVE1MICs9IGA8aW5wdXRcbiAgICAgIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6ICR7eX1weDsgbGVmdDogJHt4fXB4OyBoZWlnaHQ6ICR7Y29udHJvbEhlaWdodH1weDtcIiBcbiAgICAgIHR5cGU9XCJyYW5nZVwiIG9yaWVudD1cInZlcnRpY2FsXCIgbWluPVwiMFwiIG1heD1cIjFcIiB2YWx1ZT1cIiR7bmV1cm9uLmFjdGl2YXRpb259XCIgc3RlcD1cIjAuMDVcIiBcbiAgICAgIG9uaW5wdXQ9XCJzbGlkZSgke25ldXJvbi5pZH0sIHRoaXMudmFsdWUpO1wiPmA7XG4gIH0pXG5cbiAgaXRlci5pbm5lckhUTUwgPSBuZXVyYWxDb3JlLmdldEl0ZXJhdGlvbigpLnRvU3RyaW5nKCk7XG4gIGNvc3QuaW5uZXJIVE1MID0gbmV1cmFsQ29yZS5nZXRDb3N0KCkudG9TdHJpbmcoKTtcblxuICAvLyBBZGQgdHJhaW5pbmcgc2V0IGRhdGEgbGFiZWxzXG4gIGxldCBsYWJlbHMgPSAnJztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXVyYWxDb3JlLmdldElucHV0U2l6ZSgpOyBpKyspIHtcbiAgICBsYWJlbHMgKz0gYDx0aCBzY29wZT0nY29sJz5JbnB1dCAke2l9PC90aD5gO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmV1cmFsQ29yZS5nZXRPdXRwdXRTaXplKCk7IGkrKykge1xuICAgIGxhYmVscyArPSBgPHRoIHNjb3BlPSdjb2wnIHN0eWxlPVwidGV4dC1hbGlnbjogcmlnaHRcIj5PdXRwdXQgJHtpfTwvdGg+YDtcbiAgfVxuICB0cmFpbmluZ1NldExhYmVsc091dHB1dC5pbm5lckhUTUwgPSBsYWJlbHM7XG5cbiAgLy8gQWRkIHRyYWluaW5nIGRhdGFcbiAgbGV0IHRyYWluaW5nRGF0YSA9ICcnO1xuICBuZXVyYWxDb3JlLmdldFRyYWluaW5nU2FtcGxlcygpLmZvckVhY2goKHNhbXBsZSwgaWR4KSA9PiB7XG4gICAgdHJhaW5pbmdEYXRhICs9IGA8dHIgc3R5bGU9XCJjdXJzb3I6cG9pbnRlcjtcIiBvbmNsaWNrPVwiYXBwbHlUcmFpbmluZ1NhbXBsZSgke2lkeH0pXCI+YDtcbiAgICBzYW1wbGUuaW5wdXQuZm9yRWFjaCh2YWwgPT4ge1xuICAgICAgdHJhaW5pbmdEYXRhICs9IGA8dGQ+JHt2YWx9PC90ZD5gO1xuICAgIH0pO1xuICAgIHNhbXBsZS5vdXRwdXQuZm9yRWFjaCh2YWwgPT4ge1xuICAgICAgdHJhaW5pbmdEYXRhICs9IGA8dGQgc3R5bGU9XCJ0ZXh0LWFsaWduOiByaWdodFwiPiR7dmFsfTwvdGQ+YDtcbiAgICB9KTtcbiAgICB0cmFpbmluZ0RhdGEgKz0gJzwvdHI+JztcbiAgfSk7XG4gIHRyYWluaW5nU2V0RGF0YU91dHB1dC5pbm5lckhUTUwgPSB0cmFpbmluZ0RhdGE7XG4gIHZpc3VhbGl6ZXIuZHJhdyhuZXVyYWxDb3JlLmdldE5ldXJvbnMoKSwgbmV1cmFsQ29yZS5nZXRDb25uZWN0aW9ucygpKTtcbn1cblxuY29uc3QgYWRkTGF5ZXJDb250cm9sUm93ID0gKGxhYmVsOiBzdHJpbmcsIHNpemU6IHN0cmluZywgb25jbGlja1Bvczogc3RyaW5nLCBvbmNsaWNrTmVnOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gYDx0cj48dGQgYWxpZ249J3JpZ2h0Jz48bGFiZWw+JHtsYWJlbH06PC9sYWJlbD48YiBzdHlsZT1cIm1hcmdpbjogYXV0byA2cHhcIj4ke3NpemV9PC9iPjwvdGQ+PHRkPlxuICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCI+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc21cIiBvbmNsaWNrPVwiJHtvbmNsaWNrTmVnfVwiPi08L2J1dHRvbj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiIG9uY2xpY2s9XCIke29uY2xpY2tQb3N9XCI+KzwvYnV0dG9uPlxuICA8L2Rpdj48L3RkPjwvdHI+YDtcbn0iLCJpbXBvcnQgeyBOZXVyb24gfSBmcm9tIFwiLi9OZXVyb25cIjtcblxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb24ge1xuICBwcml2YXRlIHdlaWdodDogbnVtYmVyO1xuICBwcml2YXRlIGlucHV0TmV1cm9uOiBOZXVyb247XG4gIHByaXZhdGUgb3V0cHV0TmV1cm9uOiBOZXVyb247XG4gIHByaXZhdGUgc2FtcGxlV2VpZ2h0Q2hhbmdlczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihpbnB1dDogTmV1cm9uLCBvdXRwdXQ6IE5ldXJvbiwgd2VpZ2h0OiBudW1iZXIpIHtcbiAgICB0aGlzLmlucHV0TmV1cm9uID0gaW5wdXQ7XG4gICAgdGhpcy5vdXRwdXROZXVyb24gPSBvdXRwdXQ7XG4gICAgdGhpcy53ZWlnaHQgPSB3ZWlnaHQ7XG4gIH1cblxuICBwdWJsaWMgYWRkU2FtcGxlV2VpZ2h0Q2hhbmdlKHdlaWdodENoYW5nZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zYW1wbGVXZWlnaHRDaGFuZ2VzLnB1c2god2VpZ2h0Q2hhbmdlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBseUF2ZXJhZ2VXZWlnaHRDaGFuZ2UoKSB7XG4gICAgY29uc3QgY2hhbmdlID0gKHRoaXMuc2FtcGxlV2VpZ2h0Q2hhbmdlcy5yZWR1Y2UoKGFjYywgdmFsKSA9PiBhY2MgKyB2YWwsIDApIC8gdGhpcy5zYW1wbGVXZWlnaHRDaGFuZ2VzLmxlbmd0aCk7XG4gICAgdGhpcy53ZWlnaHQgKz0gY2hhbmdlO1xuICAgIHRoaXMuc2FtcGxlV2VpZ2h0Q2hhbmdlcyA9IFtdO1xuICB9XG5cbiAgcHVibGljIGdldFdlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy53ZWlnaHQ7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMud2VpZ2h0ICogdGhpcy5pbnB1dE5ldXJvbi5jYWxjdWxhdGVBY3RpdmF0aW9uKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0T3V0cHV0TmV1cm9uKCkge1xuICAgIHJldHVybiB0aGlzLm91dHB1dE5ldXJvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJbnB1dE5ldXJvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dE5ldXJvbjtcbiAgfVxufSIsImltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tIFwiLi9Db25uZWN0aW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aXZhdGlvbiB7XG4gIGRlcih4OiBudW1iZXIpOiBudW1iZXI7XG4gIG91dHB1dCh4OiBudW1iZXIpOiBudW1iZXI7XG59O1xuXG5leHBvcnQgY29uc3QgU0lHTU9JRDogQWN0aXZhdGlvbiA9IHtcbiAgb3V0cHV0OiAoeDogbnVtYmVyKTogbnVtYmVyID0+IDEgLyAoMSArIE1hdGguZXhwKC14KSksXG4gIGRlcjogKHg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgbGV0IG91dHB1dCA9IFNJR01PSUQub3V0cHV0KHgpO1xuICAgIHJldHVybiBvdXRwdXQgKiAoMSAtIG91dHB1dCk7XG4gIH1cbn07XG5cbmV4cG9ydCBlbnVtIFJlZ3VsYXJpemF0aW9ucyB7XG4gIEwxLFxuICBMMixcbiAgTk9ORSxcbn1cblxuZXhwb3J0IGNvbnN0IEwxUmVnID0ge1xuICBjb3N0OiAoY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXVtdKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gY29ubmVjdGlvbnMucmVkdWNlKFxuICAgICAgKHByZXYsIGNvbm5MYXllcjogQ29ubmVjdGlvbltdKSA9PiB7XG4gICAgICAgIHJldHVybiBwcmV2ICsgY29ubkxheWVyLnJlZHVjZSgoYWNjLCBjb25uKSA9PiBhY2MgKyBNYXRoLmFicyhjb25uLmdldFdlaWdodCgpKSwgMClcbiAgICAgIH0sIDApICogKDEgLyBnZXROdW1iZXJPZkNvbm5lY3Rpb25zKGNvbm5lY3Rpb25zKSk7XG4gIH0sXG5cbiAgZGVyOiAod2VpZ2h0OiBudW1iZXIsIGNvbm5Db3VudDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gKCh3ZWlnaHQgPiAwKSA/IDEgOiAtMSkgICogKDEgLyBjb25uQ291bnQpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBMMlJlZyA9IHtcbiAgY29zdDogKGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW11bXSk6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIDEgLyAyICogY29ubmVjdGlvbnMucmVkdWNlKFxuICAgICAgKHByZXYsIGNvbm5MYXllcjogQ29ubmVjdGlvbltdKSA9PiB7XG4gICAgICAgIHJldHVybiBwcmV2ICsgY29ubkxheWVyLnJlZHVjZSgoYWNjLCBjb25uKSA9PiBhY2MgKyBjb25uLmdldFdlaWdodCgpICoqIDIsIDApXG4gICAgICB9LCAwKSAqICgxIC8gZ2V0TnVtYmVyT2ZDb25uZWN0aW9ucyhjb25uZWN0aW9ucykpO1xuICB9LFxuXG4gIGRlcjogKGN1cnJXZWlnaHQ6IG51bWJlciwgY29ubkNvdW50OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiBjdXJyV2VpZ2h0ICogKDEgLyBjb25uQ291bnQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUcmFpblNhbXBsZSB7XG4gIHB1YmxpYyBpbnB1dDogbnVtYmVyW107XG4gIHB1YmxpYyBvdXRwdXQ6IG51bWJlcltdO1xuXG4gIGNvbnN0cnVjdG9yKGlucHV0OiBudW1iZXJbXSwgb3V0cHV0OiBudW1iZXJbXSkge1xuICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICB0aGlzLm91dHB1dCA9IG91dHB1dDtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2V0TnVtYmVyT2ZDb25uZWN0aW9ucyA9IChjb25uZWN0aW9uczogQ29ubmVjdGlvbltdW10pOiBudW1iZXIgPT4ge1xuICByZXR1cm4gY29ubmVjdGlvbnMucmVkdWNlKChhY2MsIGNvbm4pID0+IGFjYyArIGNvbm4ubGVuZ3RoLCAwKTtcbn0iLCJpbXBvcnQgeyBOZXVyb24gfSBmcm9tIFwiLi9OZXVyb25cIjtcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tIFwiLi9Db25uZWN0aW9uXCI7XG5pbXBvcnQgeyBUcmFpblNhbXBsZSwgU0lHTU9JRCwgUmVndWxhcml6YXRpb25zLCBMMlJlZywgZ2V0TnVtYmVyT2ZDb25uZWN0aW9ucywgTDFSZWcgfSBmcm9tIFwiLi9IZWxwZXJPYmplY3RzXCI7XG5cbmV4cG9ydCBjbGFzcyBOZXVyYWxDb3JlIHtcbiAgcHJpdmF0ZSBpbnB1dFNpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSBoaWRkZW5MYXllclNpemVzOiBudW1iZXJbXTtcbiAgcHJpdmF0ZSBvdXRwdXRTaXplOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBsYXllckNudDogbnVtYmVyO1xuICBwcml2YXRlIGJpYXNMaXN0OiBudW1iZXJbXVtdID0gW1swLjQsIDAuMl0sIFswLjYsIDAuM11dXG4gIHByaXZhdGUgd2VpZ2h0TGlzdDogbnVtYmVyW11bXVtdID0gW1xuICAgICAgW1swLjEsIDAuMiwgMC42XSwgWzAuNCwgMC4zLCAwLjFdXSxcbiAgICAgIFtbMC4yLCAwLjFdLCBbMC4xLCAwLjRdXVxuICBdXG5cbiAgcHJpdmF0ZSBpdGVyQ250ID0gMDtcblxuICBwcml2YXRlIHJhdGUgPSAxO1xuICBwcml2YXRlIGxhbWJkYSA9IDAuMDAxO1xuICBwcml2YXRlIHJlZ1R5cGU6IFJlZ3VsYXJpemF0aW9ucyA9IFJlZ3VsYXJpemF0aW9ucy5OT05FO1xuXG4gIHByaXZhdGUgYmlhc05ldXJvbiA9IG5ldyBOZXVyb24oJ2JpYXMnLCB0cnVlKTtcbiAgcHJpdmF0ZSBuZXVyb25zOiBOZXVyb25bXVtdID0gW107XG4gIHByaXZhdGUgY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXVtdID0gW107XG5cbiAgcHJpdmF0ZSB0cmFpblNhbXBsZXM6IFRyYWluU2FtcGxlW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihpbnB1dFNpemU6IG51bWJlciwgaGlkZGVuTGF5ZXJTaXplczogbnVtYmVyW10sIG91dHB1dFNpemU6IG51bWJlcikge1xuICAgIHRoaXMuaW5wdXRTaXplID0gaW5wdXRTaXplO1xuICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplcyA9IGhpZGRlbkxheWVyU2l6ZXM7XG4gICAgdGhpcy5vdXRwdXRTaXplID0gb3V0cHV0U2l6ZTtcbiAgICB0aGlzLmxheWVyQ250ID0gaGlkZGVuTGF5ZXJTaXplcy5sZW5ndGggKyAyO1xuXG4gICAgLy8gUmVzZXRcbiAgICB0aGlzLm5ldXJvbnMgPSBbXTtcbiAgICB0aGlzLmNvbm5lY3Rpb25zID0gW107XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICAvLyBDcmVhdGUgdGhlIG5ldXJvbnNcbiAgICBmb3IgKGxldCBsID0gMDsgbCA8IHRoaXMubGF5ZXJDbnQ7IGwrKykge1xuICAgICAgLy8gSG93IG1hbnkgbmV1cm9ucyBhcmUgaW4gZWFjaCBsYXllcj9cbiAgICAgIGxldCBuZXVyb25zSW5MYXllckNudCA9IDA7XG4gICAgICBzd2l0Y2ggKGwpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIG5ldXJvbnNJbkxheWVyQ250ID0gdGhpcy5pbnB1dFNpemU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdGhpcy5oaWRkZW5MYXllclNpemVzLmxlbmd0aCArIDE6XG4gICAgICAgICAgbmV1cm9uc0luTGF5ZXJDbnQgPSB0aGlzLm91dHB1dFNpemU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbmV1cm9uc0luTGF5ZXJDbnQgPSB0aGlzLmhpZGRlbkxheWVyU2l6ZXNbbCAtIDFdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm5ldXJvbnNbbF0gPSBbXTtcblxuICAgICAgLy8gQ3JlYXRlIHRoZW1cbiAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgbmV1cm9uc0luTGF5ZXJDbnQ7IG4rKykge1xuICAgICAgICB0aGlzLm5ldXJvbnNbbF1bbl0gPSBuZXcgTmV1cm9uKGBOZXVyb24ke2x9JHtufWApO1xuICAgICAgICBpZiAobCA9PSAwKSB7XG4gICAgICAgICAgdGhpcy5uZXVyb25zW2xdW25dLnNldEFzSW5wdXROZXVyb24oMCk7IC8vIGp1c3QgdG8gYXZvaWQgY3Jhc2hlcywgdGhlIDAgc2hvdWxkIGJlIG92ZXJyaWRlbiBsYXRlciBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENyZWF0ZSB0aGUgQ29ubmVjdGlvbnNcbiAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25zKDAsIHRoaXMubGF5ZXJDbnQgLSAxKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRXZWlnaHRzKHdlaWdodHM6IG51bWJlcltdW11bXSkge1xuXG4gICAgdGhpcy53ZWlnaHRMaXN0ID0gd2VpZ2h0cztcbiAgfVxuXG4gIHB1YmxpYyBzZXRCaWFzKGJpYXNMaXN0OiBudW1iZXJbXVtdKSB7XG5cbiAgICB0aGlzLmJpYXNMaXN0ID0gYmlhc0xpc3Q7XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGUoaW5wdXQ6IG51bWJlcltdKTogbnVtYmVyW10ge1xuICAgIGlmIChpbnB1dC5sZW5ndGggIT0gdGhpcy5pbnB1dFNpemUpIHtcbiAgICAgIHRocm93ICdJbnB1dCBzaXplIGRvZXMgbm90IG1hdGNoJztcbiAgICB9XG4gICAgLy8gUmVzZXQsIHNvIGVhY2ggbmV1cm9uIGlzIHJlY2FsY3VsYXRlZFxuICAgIHRoaXMubmV1cm9ucy5mb3JFYWNoKGxheWVyID0+IHsgbGF5ZXIuZm9yRWFjaChuZXVyb24gPT4gbmV1cm9uLnJlc2V0KCkpIH0pXG4gICAgLy8gU2V0IGlucHV0IGxheWVyXG4gICAgdGhpcy5uZXVyb25zWzBdLmZvckVhY2goKG5ldXJvbiwgaWR4KSA9PiB7IG5ldXJvbi5zZXRJbnB1dChpbnB1dFtpZHhdKSB9KTtcblxuICAgIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250IC0gMV0uZm9yRWFjaChuZXVyb24gPT4ge1xuICAgICAgbmV1cm9uLmNhbGN1bGF0ZUFjdGl2YXRpb24oKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLm1hcChuZXVyb24gPT4gbmV1cm9uLmdldEFjdGl2YXRpb24oKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkVHJhaW5pbmdTZXQoaW5wdXQ6IG51bWJlcltdLCBvdXRwdXQ6IG51bWJlcltdKSB7XG4gICAgaWYgKGlucHV0Lmxlbmd0aCAhPSB0aGlzLmlucHV0U2l6ZSkge1xuICAgICAgdGhyb3cgJ0lucHV0IHNpemUgZG9lcyBub3QgbWF0Y2gnO1xuICAgIH0gZWxzZSBpZiAob3V0cHV0Lmxlbmd0aCAhPSB0aGlzLm91dHB1dFNpemUpIHtcbiAgICAgIHRocm93ICdPdXRwdXQgc2l6ZSBkb2VzIG5vdCBtYXRjaCc7XG4gICAgfVxuXG4gICAgdGhpcy50cmFpblNhbXBsZXMucHVzaChuZXcgVHJhaW5TYW1wbGUoaW5wdXQsIG91dHB1dCkpXG4gIH1cblxuICBwdWJsaWMgZ2V0Q29zdCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLnRyYWluU2FtcGxlcy5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgY29uc3QgY29zdFN1bSA9IHRoaXMudHJhaW5TYW1wbGVzLnJlZHVjZSgoY29zdFN1bSwgc2FtcGxlKSA9PiB7IC8vIEFkZCB1cCBhbGwgc2FtcGxlc1xuICAgICAgdGhpcy5ldmFsdWF0ZShzYW1wbGUuaW5wdXQpO1xuICAgICAgcmV0dXJuIGNvc3RTdW0gKyB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLnJlZHVjZSgoYWNjLCBuZXVyb24sIGkpID0+IHsgLy8gQWRkIHVwIGFsbCBvdXRwdXQgbmV1cm9uc1xuICAgICAgICByZXR1cm4gYWNjICsgKG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkgLSBzYW1wbGUub3V0cHV0W2ldKSAqKiAyO1xuICAgICAgfSwgMCk7XG4gICAgfSwgMCk7XG5cbiAgICAvLyBSZWd1bGFyaXphdGlvblxuICAgIGxldCByZWdDb3N0ID0gMDtcbiAgICBzd2l0Y2ggKHRoaXMucmVnVHlwZSkge1xuICAgICAgY2FzZSBSZWd1bGFyaXphdGlvbnMuTDE6XG4gICAgICAgIHJlZ0Nvc3QgPSBMMVJlZy5jb3N0KHRoaXMuY29ubmVjdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUmVndWxhcml6YXRpb25zLkwyOlxuICAgICAgICByZWdDb3N0ID0gTDJSZWcuY29zdCh0aGlzLmNvbm5lY3Rpb25zKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFJlZ3VsYXJpemF0aW9ucy5OT05FOlxuICAgICAgICByZWdDb3N0ID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIDEgLyAyICogY29zdFN1bSAqICgxIC8gdGhpcy50cmFpblNhbXBsZXMubGVuZ3RoKSArXG4gICAgICB0aGlzLmxhbWJkYSAqIHJlZ0Nvc3Q7XG4gIH1cblxuICBwdWJsaWMgdHJhaW4oKSB7XG4gICAgdGhpcy50cmFpblNhbXBsZXMuZm9yRWFjaCgoc2FtcGxlKSA9PiB7XG4gICAgICB0aGlzLmV2YWx1YXRlKHNhbXBsZS5pbnB1dClcblxuICAgICAgLy8gQ2FsY3VsYXRlIHNpZ21hcyBvZiB0aGUgbGFzdCBsYXllclxuICAgICAgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5mb3JFYWNoKChuZXVyb24sIGlkeCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdTaWdtYSA9XG4gICAgICAgICAgKHNhbXBsZS5vdXRwdXRbaWR4XSAtIG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkpICogU0lHTU9JRC5kZXIobmV1cm9uLmdldEFjdGl2YXRpb24oKSk7XG4gICAgICAgIG5ldXJvbi5zZXRTaWdtYShuZXdTaWdtYSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gQ2FsY3VsYXRlIHNpZ21hcyBmb3IgZWFjaCBuZXVyb24gaW4gdGhlIGxvd2VyIGxheWVyc1xuICAgICAgZm9yIChsZXQgbCA9IHRoaXMubGF5ZXJDbnQgLSAyOyBsID49IDA7IGwtLSkge1xuICAgICAgICB0aGlzLm5ldXJvbnNbbF0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmV3U2lnbWEgPVxuICAgICAgICAgICAgbmV1cm9uLmdldE91dHB1dHMoKS5yZWR1Y2UoKGFjYywgY29ubmVjdGlvbikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gYWNjICsgY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXRTaWdtYSgpICogY29ubmVjdGlvbi5nZXRXZWlnaHQoKTtcbiAgICAgICAgICAgIH0sIDApICogU0lHTU9JRC5kZXIobmV1cm9uLmdldEFjdGl2YXRpb24oKSk7XG4gICAgICAgICAgbmV1cm9uLnNldFNpZ21hKG5ld1NpZ21hKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFjY3VtdWxhdGUgYWxsIHdlaWdodCB1cGRhdGVzXG4gICAgICB0aGlzLmNvbm5lY3Rpb25zLmZvckVhY2goKGNvbm5MYXllcikgPT4ge1xuICAgICAgICBjb25uTGF5ZXIuZm9yRWFjaCgoY29ubmVjdGlvbikgPT4ge1xuXG4gICAgICAgICAgbGV0IHJlZ0RlciA9IDA7XG4gICAgICAgICAgc3dpdGNoICh0aGlzLnJlZ1R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgUmVndWxhcml6YXRpb25zLkwxOlxuICAgICAgICAgICAgICByZWdEZXIgPSBMMVJlZy5kZXIoY29ubmVjdGlvbi5nZXRXZWlnaHQoKSwgZ2V0TnVtYmVyT2ZDb25uZWN0aW9ucyh0aGlzLmNvbm5lY3Rpb25zKSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBSZWd1bGFyaXphdGlvbnMuTDI6XG4gICAgICAgICAgICAgIHJlZ0RlciA9IEwyUmVnLmRlcihjb25uZWN0aW9uLmdldFdlaWdodCgpLCBnZXROdW1iZXJPZkNvbm5lY3Rpb25zKHRoaXMuY29ubmVjdGlvbnMpKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFJlZ3VsYXJpemF0aW9ucy5OT05FOlxuICAgICAgICAgICAgICByZWdEZXIgPSAwO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCB3ZWlnaHRDaGFuZ2UgPVxuICAgICAgICAgICAgY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXRTaWdtYSgpICpcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS5nZXRBY3RpdmF0aW9uKCkgKlxuICAgICAgICAgICAgdGhpcy5yYXRlIC1cbiAgICAgICAgICAgIHRoaXMubGFtYmRhICogcmVnRGVyOyAvLyBSZWd1bGFyaXphdGlvblxuXG4gICAgICAgICAgY29ubmVjdGlvbi5hZGRTYW1wbGVXZWlnaHRDaGFuZ2Uod2VpZ2h0Q2hhbmdlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFVmZiwgbGV0J3MgaG9wZSBldmVyeXRoaW5nIHdvcmtzIGFuZCBhcHBseSB0aGUgbWFnaWNcbiAgICB0aGlzLmNvbm5lY3Rpb25zLmZvckVhY2goKGNvbm5MYXllcikgPT4ge1xuICAgICAgY29ubkxheWVyLmZvckVhY2goKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgY29ubmVjdGlvbi5hcHBseUF2ZXJhZ2VXZWlnaHRDaGFuZ2UoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pdGVyQ250Kys7XG4gIH1cblxuICBwdWJsaWMgYWRkT3JSZW1vdmVMYXllcihhZGQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoYWRkKSB7XG4gICAgICBjb25zdCBuZXdMYXllclNpemUgPSAzO1xuICAgICAgdGhpcy5oaWRkZW5MYXllclNpemVzLnB1c2gobmV3TGF5ZXJTaXplKTtcbiAgICAgIHRoaXMubGF5ZXJDbnQrKztcblxuICAgICAgLy8gQ3JlYXRlIHRoZSBuZXcgbmV1cm9uc1xuICAgICAgdGhpcy5jcmVhdGVMYXllck9mTmV1cm9ucyh0aGlzLmxheWVyQ250IC0gMiwgbmV3TGF5ZXJTaXplKTtcblxuICAgICAgLy8gUmVjcmVhdGUgdGhlIGxhc3QgbGF5ZXJcbiAgICAgIHRoaXMuY3JlYXRlTGF5ZXJPZk5ldXJvbnModGhpcy5sYXllckNudCAtIDEsIHRoaXMub3V0cHV0U2l6ZSk7XG5cbiAgICAgIC8vIFJlY3JlYXRlIGFsbCBuZWNlc3NhcnkgY29ubmVjdGlvbnNcbiAgICAgIHRoaXMuY3JlYXRlQ29ubmVjdGlvbnModGhpcy5sYXllckNudCAtIDMsIHRoaXMubGF5ZXJDbnQgLSAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMubGF5ZXJDbnQgPT0gMikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplcy5wb3AoKTtcbiAgICAgIHRoaXMubGF5ZXJDbnQtLTtcbiAgICAgIHRoaXMubmV1cm9ucy5wb3AoKTtcbiAgICAgIHRoaXMuY29ubmVjdGlvbnMucG9wKCk7XG5cbiAgICAgIC8vIFJlY3JlYXRlIHRoZSBsYXN0IGxheWVyXG4gICAgICB0aGlzLmNyZWF0ZUxheWVyT2ZOZXVyb25zKHRoaXMubGF5ZXJDbnQgLSAxLCB0aGlzLm91dHB1dFNpemUpO1xuXG4gICAgICAvLyBSZWNyZWF0ZSBhbGwgbmVjZXNzYXJ5IGNvbm5lY3Rpb25zXG4gICAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25zKHRoaXMubGF5ZXJDbnQgLSAyLCB0aGlzLmxheWVyQ250IC0gMSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVGhpcyBmdW5jdGlvbiBpcyB2ZXJ5IGxvbmcgYW5kIHVnbHksIEkgZG9udCB3YW50IHRvIHNpbXBseSByZWJ1aWxkIHRoZSBuZXR3b3JrIGJlY2F1c2UgSSB3YW50IHRvIGtlZXAgdGhlIHdlaWdodHNcbiAgcHVibGljIGFkZE9yUmVtb3ZlTmV1cm9uKGFkZDogYm9vbGVhbiwgbGF5ZXJJZHg6IG51bWJlcikge1xuICAgIGNvbnN0IGlzSW5wdXQgPSBsYXllcklkeCA9PSAwO1xuICAgIGNvbnN0IGlzT3V0cHV0ID0gbGF5ZXJJZHggPT0gdGhpcy5sYXllckNudCAtIDE7XG4gICAgY29uc3QgaXNIaWRkZW4gPSAhaXNJbnB1dCAmJiAhaXNPdXRwdXQ7XG5cbiAgICBjb25zdCBzaXplQ2hhbmdlID0gKGFkZCkgPyAxIDogLTFcblxuICAgIGlmIChpc0hpZGRlbikge1xuICAgICAgdGhpcy5oaWRkZW5MYXllclNpemVzW2xheWVySWR4IC0gMV0gKz0gc2l6ZUNoYW5nZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNJbnB1dCkge1xuICAgICAgdGhpcy5pbnB1dFNpemUgKz0gc2l6ZUNoYW5nZTtcbiAgICAgIHRoaXMudHJhaW5TYW1wbGVzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3V0cHV0U2l6ZSArPSBzaXplQ2hhbmdlO1xuICAgICAgdGhpcy50cmFpblNhbXBsZXMgPSBbXTtcbiAgICB9XG5cbiAgICBpZiAoYWRkKSB7XG4gICAgICBsZXQgbmV3TmV1cm9uSWR4O1xuXG4gICAgICBpZiAoaXNIaWRkZW4pIHtcbiAgICAgICAgbmV3TmV1cm9uSWR4ID0gdGhpcy5oaWRkZW5MYXllclNpemVzW2xheWVySWR4IC0gMV0gLSAxO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNJbnB1dCkge1xuICAgICAgICBuZXdOZXVyb25JZHggPSB0aGlzLmlucHV0U2l6ZSAtIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdOZXVyb25JZHggPSB0aGlzLm91dHB1dFNpemUgLSAxO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdOZXVyb24gPSBuZXcgTmV1cm9uKGBOZXVyb24ke2xheWVySWR4fSR7bmV3TmV1cm9uSWR4fWApO1xuICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4XVtuZXdOZXVyb25JZHhdID0gbmV3TmV1cm9uO1xuXG4gICAgICBpZiAoaXNJbnB1dClcbiAgICAgICAgbmV3TmV1cm9uLnNldEFzSW5wdXROZXVyb24oMCk7XG5cblxuICAgICAgLy8vLyBBZGQgY29ubmVjdGlvbnMgZnJvbSB0aGUgcHJldiBsYXllclxuICAgICAgaWYgKCFpc0lucHV0KSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeCAtIDFdLmZvckVhY2goKG5ldXJvbiwgaWR4KSA9PiB7XG4gICAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKG5ldXJvbiwgbmV3TmV1cm9uLDEpO1xuICAgICAgICAgIG5ldXJvbi5hZGRPdXRwdXQoY29ubmVjdGlvbik7XG4gICAgICAgICAgbmV3TmV1cm9uLmFkZElucHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbGF5ZXJJZHggLSAxXS5wdXNoKGNvbm5lY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gRG9udCBmb3JnZXQgdGhlIGJpYXNcbiAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKHRoaXMuYmlhc05ldXJvbiwgbmV3TmV1cm9uLCAxKTtcbiAgICAgICAgbmV3TmV1cm9uLmFkZElucHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4IC0gMV0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc091dHB1dCkge1xuICAgICAgICAvLy8vIEFkZCBjb25uZWN0aW9ucyB0byB0aGUgbmV4dCBsYXllclxuICAgICAgICB0aGlzLm5ldXJvbnNbbGF5ZXJJZHggKyAxXS5mb3JFYWNoKChuZXVyb24sIGlkeCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbihuZXdOZXVyb24sIG5ldXJvbiwgMSk7XG4gICAgICAgICAgbmV1cm9uLmFkZElucHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbGF5ZXJJZHhdLnB1c2goY29ubmVjdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByZW1vdmVkTmV1cm9uID0gdGhpcy5uZXVyb25zW2xheWVySWR4XS5wb3AoKTtcbiAgICAgIC8vIFJlbW92ZSBvdXRwdXRzIGZyb20gdGhlIHByZXYgbGF5ZXJcbiAgICAgIGlmICghaXNJbnB1dCkge1xuICAgICAgICB0aGlzLm5ldXJvbnNbbGF5ZXJJZHggLSAxXS5mb3JFYWNoKChuZXVyb24pID0+IHtcbiAgICAgICAgICBuZXVyb24uc2V0T3V0cHV0cyhuZXVyb24uZ2V0T3V0cHV0cygpLmZpbHRlcigoY29ubmVjdGlvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0TmFtZSgpICE9IHJlbW92ZWROZXVyb24uZ2V0TmFtZSgpO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlbW92ZSBpbnB1dCBpbiB0aGUgbmV4dCBsYXllclxuICAgICAgaWYgKCFpc091dHB1dCkge1xuICAgICAgICB0aGlzLm5ldXJvbnNbbGF5ZXJJZHggKyAxXS5mb3JFYWNoKChuZXVyb24pID0+IHtcbiAgICAgICAgICBuZXVyb24uc2V0SW5wdXRzKG5ldXJvbi5nZXRJbnB1dHMoKS5maWx0ZXIoKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0TmFtZSgpICE9IHJlbW92ZWROZXVyb24uZ2V0TmFtZSgpO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlbW92ZSB0aGUgdW51c2VkIGNvbm5lY3Rpb25zXG4gICAgICBpZiAoIWlzSW5wdXQpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeCAtIDFdID0gdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeCAtIDFdLmZpbHRlcigoY29ubmVjdGlvbjogQ29ubmVjdGlvbikgPT4ge1xuICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLmdldE91dHB1dE5ldXJvbigpLmdldE5hbWUoKSAhPSByZW1vdmVkTmV1cm9uLmdldE5hbWUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNPdXRwdXQpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeF0gPSB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4XS5maWx0ZXIoKGNvbm5lY3Rpb246IENvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5nZXRJbnB1dE5ldXJvbigpLmdldE5hbWUoKSAhPSByZW1vdmVkTmV1cm9uLmdldE5hbWUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlc2V0KCkge1xuICAgIHRoaXMuaXRlckNudCA9IDA7XG4gICAgdGhpcy5jcmVhdGVDb25uZWN0aW9ucygwLCB0aGlzLmxheWVyQ250IC0gMSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUxheWVyT2ZOZXVyb25zKGxheWVySWR4OiBudW1iZXIsIGxheWVyU2l6ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5uZXVyb25zW2xheWVySWR4XSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXJTaXplOyBpKyspIHtcbiAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeF1baV0gPSBuZXcgTmV1cm9uKGBOZXVyb24ke2xheWVySWR4fSR7aX1gKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNvbm5lY3Rpb25zKGZpcnN0TGF5ZXIsIGxhc3RMYXllcikge1xuICAgIGZvciAobGV0IGwgPSBmaXJzdExheWVyOyBsIDwgbGFzdExheWVyOyBsKyspIHtcbiAgICAgIC8vIEZvciBlYWNoIG5ldXJvbiBpbiB0aGUgbGF5ZXIgYWRkIGFsbCBjb25uZWN0aW9ucyB0byBuZXVyb25zIGluIHRoZSBuZXh0IGxheWVyXG4gICAgICB0aGlzLmNvbm5lY3Rpb25zW2xdID0gW107XG5cbiAgICAgIC8vIFJlc2V0IGlucHV0ICYgb3V0cHV0c1xuICAgICAgdGhpcy5uZXVyb25zW2wgKyAxXS5mb3JFYWNoKG5leHROZXVyb24gPT4geyBuZXh0TmV1cm9uLnJlc2V0SW5wdXRzKCkgfSk7XG4gICAgICB0aGlzLm5ldXJvbnNbbF0uZm9yRWFjaChuZXh0TmV1cm9uID0+IHsgbmV4dE5ldXJvbi5yZXNldE91dHB1dHMoKSB9KTtcblxuICAgICAgdGhpcy5uZXVyb25zW2wgKyAxXS5mb3JFYWNoKChuZXh0TmV1cm9uLCB0b0lkeCkgPT4geyAvLyBJZiB5b3Ugd29uZGVyIHdoeSB0aGlzIGN5Y2xlcyBhcmUgc3dpdGNoZWQsIGl0J3MgYmVjYXVzZSBvZiB0aGUgYmlhc1xuICAgICAgICB0aGlzLm5ldXJvbnNbbF0uZm9yRWFjaCgoY3Vyck5ldXJvbiwgZnJvbUlkeCkgPT4ge1xuICAgICAgICAgIGxldCB3ZWlnaHQ7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHdlaWdodCA9IHRoaXMud2VpZ2h0TGlzdFtsXVt0b0lkeF1bZnJvbUlkeF1cbiAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHdlaWdodCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKGN1cnJOZXVyb24sIG5leHROZXVyb24sIHdlaWdodClcbiAgICAgICAgICBjdXJyTmV1cm9uLmFkZE91dHB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICBuZXh0TmV1cm9uLmFkZElucHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbF0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGJpYXM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYmlhcyA9IHRoaXMuYmlhc0xpc3RbbF1bdG9JZHhdXG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIGJpYXMgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGJpYXMgbmV1cm9uIHRvIGVhY2ggbGF5ZXJcbiAgICAgICAgY29uc3QgYmlhc0Nvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbih0aGlzLmJpYXNOZXVyb24sIG5leHROZXVyb24sIGJpYXMpO1xuICAgICAgICBuZXh0TmV1cm9uLmFkZElucHV0KGJpYXNDb25uZWN0aW9uKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsXS5wdXNoKGJpYXNDb25uZWN0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXROZXVyb25zKCkge1xuICAgIHJldHVybiB0aGlzLm5ldXJvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29ubmVjdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0SW5wdXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0U2l6ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPdXRwdXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLm91dHB1dFNpemU7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGF5ZXJDbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMubGF5ZXJDbnQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0SGlkZGVuTGF5ZXJTaXplcygpIHtcbiAgICByZXR1cm4gdGhpcy5oaWRkZW5MYXllclNpemVzO1xuICB9XG5cbiAgcHVibGljIHNldFJhdGUobmV3UmF0ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5yYXRlID0gbmV3UmF0ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJdGVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlckNudDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRSZWd1bGFyaXphdGlvblR5cGUocmVnVHlwZTogUmVndWxhcml6YXRpb25zKSB7XG4gICAgdGhpcy5yZWdUeXBlID0gcmVnVHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRSZWd1bGFyaXphdGlvblJhdGUocmF0ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5sYW1iZGEgPSByYXRlO1xuICB9XG5cbiAgcHVibGljIGdldFRyYWluaW5nU2FtcGxlcygpIHtcbiAgICByZXR1cm4gdGhpcy50cmFpblNhbXBsZXM7XG4gIH1cblxuICBwdWJsaWMgc2V0VHJhaW5pbmdTYW1wbGVzKHNhbXBsZXM6IFRyYWluU2FtcGxlW10pIHtcbiAgICB0aGlzLnRyYWluU2FtcGxlcyA9IHNhbXBsZXM7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tIFwiLi9Db25uZWN0aW9uXCI7XG5pbXBvcnQgeyBTSUdNT0lEIH0gZnJvbSBcIi4vSGVscGVyT2JqZWN0c1wiO1xuXG5leHBvcnQgY2xhc3MgTmV1cm9uIHtcbiAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBhY3RpdmF0aW9uOiBudW1iZXI7XG4gIHByaXZhdGUgaW5wdXRzOiBDb25uZWN0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBvdXRwdXRzOiBDb25uZWN0aW9uW10gPSBbXTtcblxuICAvLyBUaGUgZGVyaXZhdGlvbiBvZiBDIHdpdGggcmVzcGVjdCB0byB6XG4gIHByaXZhdGUgc2lnbWE6IG51bWJlcjtcbiAgcHJpdmF0ZSBpc0lucHV0OiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaXNDYWxjdWxhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaXNCaWFzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBpc0JpYXMgPSBmYWxzZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pc0JpYXMgPSBpc0JpYXM7XG4gIH07XG5cbiAgcHVibGljIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJc0JpYXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNCaWFzO1xuICB9XG5cbiAgcHVibGljIHNldEFzSW5wdXROZXVyb24oYWN0aXZhdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy5pc0lucHV0ID0gdHJ1ZTtcbiAgICB0aGlzLmFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICAgIHRoaXMuaW5wdXRzID0gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbnB1dChhY3RpdmF0aW9uOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuaXNJbnB1dCkge1xuICAgICAgdGhyb3cgJ0Nhbm5vdCBzZXQgYWN0aXZhdGlvbiBvZiBub24taW5wdXQgbmV1cm9uJztcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICB9XG5cbiAgcHVibGljIHNldFNpZ21hKHNpZ21hOiBudW1iZXIpIHtcbiAgICB0aGlzLnNpZ21hID0gc2lnbWE7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5wdXQoaW5wdXQ6IENvbm5lY3Rpb24pIHtcbiAgICB0aGlzLmlucHV0cy5wdXNoKGlucHV0KTtcbiAgfTtcblxuICBwdWJsaWMgZ2V0SW5wdXRzKCk6IENvbm5lY3Rpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRzO1xuICB9XG5cbiAgcHVibGljIGFkZE91dHB1dChvdXRwdXQ6IENvbm5lY3Rpb24pIHtcbiAgICB0aGlzLm91dHB1dHMucHVzaChvdXRwdXQpO1xuICB9XG5cbiAgcHVibGljIGdldE91dHB1dHMoKTogQ29ubmVjdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5vdXRwdXRzO1xuICB9XG5cbiAgcHVibGljIHNldE91dHB1dHMoY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXSkge1xuICAgIHRoaXMub3V0cHV0cyA9IGNvbm5lY3Rpb25zO1xuICB9XG5cbiAgcHVibGljIHNldElucHV0cyhjb25uZWN0aW9uczogQ29ubmVjdGlvbltdKSB7XG4gICAgdGhpcy5pbnB1dHMgPSBjb25uZWN0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyByZXNldElucHV0cygpIHtcbiAgICB0aGlzLmlucHV0cyA9IFtdO1xuICB9XG5cbiAgcHVibGljIHJlc2V0T3V0cHV0cygpIHtcbiAgICB0aGlzLm91dHB1dHMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGdldEFjdGl2YXRpb24oKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5pc0JpYXMpIHRoaXMuYWN0aXZhdGlvbiA9IDE7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZhdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTaWdtYSgpIHtcbiAgICByZXR1cm4gdGhpcy5zaWdtYTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVBY3RpdmF0aW9uKCk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLmlzSW5wdXQgJiYgIXRoaXMuaXNDYWxjdWxhdGVkICYmICF0aGlzLmlzQmlhcykge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uID0gU0lHTU9JRC5vdXRwdXQodGhpcy5pbnB1dHMucmVkdWNlKChhY2MsIGN1cnJDb25uKSA9PiBhY2MgKyBjdXJyQ29ubi5jYWxjdWxhdGVWYWx1ZSgpLCAwKSk7XG4gICAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldEFjdGl2YXRpb24oKTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=