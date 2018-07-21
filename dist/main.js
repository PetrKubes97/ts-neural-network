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
    constructor(x, y, activation, name, isBias = false) {
        this.x = x;
        this.y = y;
        this.activation = activation;
        this.name = name;
        this.isBias = isBias;
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
        const drawableNeurons = [];
        const leftMargin = this.width / (neurons.length + 1);
        // Neurons
        neurons.forEach((layer, lIdx) => {
            const topMargin = this.height / (layer.length + 2);
            layer.forEach((neuron, nIdx) => {
                const x = leftMargin * (1 + lIdx);
                const y = topMargin * (1 + nIdx);
                const drawableNeuron = new DrawableNeuron(x, y, neuron.getActivation(), neuron.getName());
                drawableNeurons.push(drawableNeuron);
            });
            if (lIdx != neurons.length - 1) {
                const x = leftMargin * (1 + lIdx);
                const y = topMargin * (1 + neurons[lIdx].length);
                const drawableNeuron = new DrawableNeuron(x, y, 1, `bias${lIdx}`, true);
                drawableNeurons.push(drawableNeuron);
            }
        });
        // Connections
        const drawableNameMap = new Map();
        drawableNeurons.forEach((drawableNeuron) => drawableNameMap.set(drawableNeuron.name, drawableNeuron) // WTF, I was not able to create map from 2d arr
        );
        connections.forEach((layer, lIdx) => {
            layer.forEach((connection) => {
                const inputNName = (connection.getInputNeuron().getIsBias()) ?
                    `bias${lIdx}` :
                    connection.getInputNeuron().getName();
                this.drawConnection(drawableNameMap.get(inputNName), drawableNameMap.get(connection.getOutputNeuron().getName()), connection.getWeight());
            });
        });
        drawableNeurons.forEach((neuron) => {
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
            this.ctx.fillStyle = `rgba(23, 190, 187, ${drawableNeuron.activation})`;
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
            `rgba(205, 83, 52, ${weight})` :
            `rgba(61, 232, 255, ${weight * -1})`;
        this.ctx.moveTo(inputNeuron.x, inputNeuron.y);
        this.ctx.lineTo(outputNeuron.x, outputNeuron.y);
        this.ctx.closePath();
        this.ctx.stroke();
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
    neuralCore.evaluate(input);
    updateUI();
    visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
};
window.addOrRemoveNeuron = (add, layerIdx) => {
    neuralCore.addOrRemoveNeuron(add, layerIdx);
    if (layerIdx == 0) {
        if (add)
            input.push(1);
        else
            input.pop();
    }
    neuralCore.evaluate(input);
    updateUI();
    visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
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
    neuralCore.evaluate(input);
    updateUI();
    visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
};
window.reset = () => {
    neuralCore.reset();
    neuralCore.evaluate(input);
    updateUI();
    visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
};
window.onload = () => {
    main();
};
let neuralCore;
let visualizer;
let input;
let inputSize = 4;
let hiddenSizes = [3];
let outputSize = 4;
let layerControls;
let inputControls;
let cost;
let iter;
let rateInput;
let itersInput;
let regTypeInput;
let regRateInput;
const main = () => {
    const content = document.getElementById('content');
    inputControls = document.getElementById('input-controls');
    layerControls = document.getElementById('layer-controls');
    iter = document.getElementById('iter-output');
    cost = document.getElementById('cost');
    rateInput = document.getElementById('rate-input');
    itersInput = document.getElementById('iters-input');
    regTypeInput = document.getElementById('regularization-type-input');
    regRateInput = document.getElementById('regularization-rate-input');
    visualizer = new _Visualizer__WEBPACK_IMPORTED_MODULE_0__["Visualizer"](content);
    initCore();
};
const initCore = () => {
    neuralCore = new _neuralNetwork_NeuralCore__WEBPACK_IMPORTED_MODULE_1__["NeuralCore"](inputSize, hiddenSizes, outputSize);
    neuralCore.addTrainingSet([1, 0, 0, 0], [0, 1, 0, 0]);
    neuralCore.addTrainingSet([0, 1, 0, 0], [0, 0, 1, 0]);
    neuralCore.addTrainingSet([0, 0, 1, 0], [0, 0, 0, 1]);
    // Set default values
    input = new Array(neuralCore.getInputSize());
    input.fill(1);
    neuralCore.evaluate(input);
    updateUI();
    visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
};
const updateUI = () => {
    let content = addLayerControlRow('Layers', neuralCore.getLayerCnt().toString(), 'addOrRemoveLayer(true)', 'addOrRemoveLayer(false)');
    content += addLayerControlRow('Input size', neuralCore.getInputSize().toString(), 'addOrRemoveNeuron(true, 0)', 'addOrRemoveNeuron(false, 0)');
    for (let i = 0; i < neuralCore.getLayerCnt() - 2; i++) {
        content += addLayerControlRow('Hidden layer size', neuralCore.getHiddenLayerSizes()[i].toString(), `addOrRemoveNeuron(true, ${i + 1})`, `addOrRemoveNeuron(false, ${i + 1})`);
    }
    content += addLayerControlRow('Output size', neuralCore.getOutputSize().toString(), `addOrRemoveNeuron(true, ${neuralCore.getLayerCnt() - 1})`, `addOrRemoveNeuron(false, ${neuralCore.getLayerCnt() - 1})`);
    layerControls.innerHTML = content;
    inputControls.innerHTML = '';
    for (let i = 0; i < neuralCore.getInputSize(); i++) {
        inputControls.innerHTML += `<label>Neuron ${i}:</label> <input style="position: relative; top: 5px;" type="range" min="0" max="1" value="1" step="0.05" id="slider${i}" oninput="slide(${i}, this.value);"><br>`;
    }
    iter.innerHTML = neuralCore.getIteration().toString();
    cost.innerHTML = neuralCore.getCost().toString();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Zpc3VhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL0Nvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25ldXJhbE5ldHdvcmsvSGVscGVyT2JqZWN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV1cmFsTmV0d29yay9OZXVyYWxDb3JlLnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL05ldXJvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0VNO0lBT0osWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxHQUFHLEtBQUs7UUFDaEQsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Q0FDRjtBQUVLO0lBT0osWUFBWSxPQUEwQjtRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRU0sSUFBSSxDQUFDLE9BQW1CLEVBQUUsV0FBMkI7UUFDMUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVsRCxNQUFNLGVBQWUsR0FBcUIsRUFBRSxDQUFDO1FBQzdDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXJELFVBQVU7UUFDVixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQzlCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25ELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQzdCLE1BQU0sQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDbEMsTUFBTSxDQUFDLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUVqQyxNQUFNLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDMUYsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUM5QixNQUFNLENBQUMsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRWpELE1BQU0sY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3hFLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDdEM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILGNBQWM7UUFDZCxNQUFNLGVBQWUsR0FBRyxJQUFJLEdBQUcsRUFBMEIsQ0FBQztRQUMxRCxlQUFlLENBQUMsT0FBTyxDQUNyQixDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxpREFBZ0Q7U0FDN0gsQ0FBQztRQUVGLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDbEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO2dCQUMzQixNQUFNLFVBQVUsR0FDZCxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDZixVQUFVLENBQUMsY0FBYyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRTFDLElBQUksQ0FBQyxjQUFjLENBQ2pCLGVBQWUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQy9CLGVBQWUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQzNELFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FDdkIsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxVQUFVLENBQUMsY0FBOEI7UUFDL0MsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQztRQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRWhCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsSUFBSSxjQUFjLENBQUMsTUFBTTtZQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQzs7WUFFekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsc0JBQXNCLGNBQWMsQ0FBQyxVQUFVLEdBQUcsQ0FBQztRQUMxRSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxrQkFBa0I7UUFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLGtCQUFrQjtRQUN2QyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsUUFBUSxNQUFNLFVBQVUsQ0FBQztRQUN6QyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDZixJQUFJLEVBQ0osY0FBYyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUN2RCxjQUFjLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU8sY0FBYyxDQUFDLFdBQTJCLEVBQUUsWUFBNEIsRUFBRSxNQUFjO1FBQzlGLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMscUJBQXFCLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEMsc0JBQXNCLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNwQixDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUh5QztBQUNjO0FBQ1E7QUFFL0QsTUFBYyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQVMsRUFBRSxLQUFhLEVBQUUsRUFBRTtJQUNuRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ2pCLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLEVBQUUsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7QUFDeEUsQ0FBQztBQUVBLE1BQWMsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLEdBQVksRUFBRSxFQUFFO0lBQ2xELFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTNCLFFBQVEsRUFBRSxDQUFDO0lBQ1gsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLEVBQUUsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7QUFDeEUsQ0FBQztBQUVBLE1BQWMsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEdBQVksRUFBRSxRQUFnQixFQUFFLEVBQUU7SUFDckUsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM1QyxJQUFJLFFBQVEsSUFBSSxDQUFDLEVBQUU7UUFDakIsSUFBSSxHQUFHO1lBQ0wsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFFZCxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDZjtJQUNELFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFM0IsUUFBUSxFQUFFLENBQUM7SUFDWCxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUN4RSxDQUFDO0FBRUEsTUFBYyxDQUFDLEtBQUssR0FBRyxDQUFDLGFBQXNCLEVBQUUsRUFBRTtJQUNqRCxJQUFJLEtBQUssR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBRXZELGlCQUFpQjtJQUNqQixRQUFRLFlBQVksQ0FBQyxLQUFLLEVBQUU7UUFDMUIsS0FBSyxJQUFJO1lBQ1AsVUFBVSxDQUFDLHFCQUFxQixDQUFDLDRFQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckQsTUFBTTtRQUNSLEtBQUssSUFBSTtZQUNQLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyw0RUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELE1BQU07UUFDUixLQUFLLE1BQU07WUFDVCxVQUFVLENBQUMscUJBQXFCLENBQUMsNEVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxNQUFNO0tBQ1Q7SUFFRCxVQUFVLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUV4RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzlCLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNwQjtJQUVELFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsUUFBUSxFQUFFLENBQUM7SUFDWCxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUN4RSxDQUFDO0FBRUEsTUFBYyxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUU7SUFDM0IsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ25CLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsUUFBUSxFQUFFLENBQUM7SUFDWCxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUN4RSxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7SUFDbkIsSUFBSSxFQUFFLENBQUM7QUFDVCxDQUFDLENBQUM7QUFFRixJQUFJLFVBQXNCLENBQUM7QUFDM0IsSUFBSSxVQUFzQixDQUFDO0FBQzNCLElBQUksS0FBZSxDQUFDO0FBRXBCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztBQUNsQixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztBQUNuQixJQUFJLGFBQTBCLENBQUM7QUFDL0IsSUFBSSxhQUEwQixDQUFDO0FBRS9CLElBQUksSUFBaUIsQ0FBQztBQUN0QixJQUFJLElBQWlCLENBQUM7QUFFdEIsSUFBSSxTQUEyQixDQUFDO0FBQ2hDLElBQUksVUFBNEIsQ0FBQztBQUNqQyxJQUFJLFlBQThCLENBQUM7QUFDbkMsSUFBSSxZQUE4QixDQUFDO0FBRW5DLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtJQUNoQixNQUFNLE9BQU8sR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQXNCLENBQUM7SUFDM0YsYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMxRCxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzFELElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzlDLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBcUIsQ0FBQztJQUN0RSxVQUFVLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQXFCLENBQUM7SUFDeEUsWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsMkJBQTJCLENBQXFCLENBQUM7SUFDeEYsWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsMkJBQTJCLENBQXFCLENBQUM7SUFFeEYsVUFBVSxHQUFHLElBQUksc0RBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVyQyxRQUFRLEVBQUUsQ0FBQztBQUNiLENBQUM7QUFFRCxNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUU7SUFDcEIsVUFBVSxHQUFHLElBQUksb0VBQVUsQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRWhFLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXRELHFCQUFxQjtJQUNyQixLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDN0MsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVkLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsUUFBUSxFQUFFLENBQUM7SUFDWCxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUN4RSxDQUFDO0FBRUQsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUFFO0lBQ3BCLElBQUksT0FBTyxHQUFHLGtCQUFrQixDQUM5QixRQUFRLEVBQ1IsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUNuQyx3QkFBd0IsRUFDeEIseUJBQXlCLENBQzFCLENBQUM7SUFHRixPQUFPLElBQUksa0JBQWtCLENBQzNCLFlBQVksRUFDWixVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQ3BDLDRCQUE0QixFQUM1Qiw2QkFBNkIsQ0FDOUIsQ0FBQztJQUVGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JELE9BQU8sSUFBSSxrQkFBa0IsQ0FDM0IsbUJBQW1CLEVBQ25CLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUM5QywyQkFBMkIsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUNuQyw0QkFBNEIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUNyQyxDQUFDO0tBQ0g7SUFFRCxPQUFPLElBQUksa0JBQWtCLENBQzNCLGFBQWEsRUFDYixVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQ3JDLDJCQUEyQixVQUFVLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQzFELDRCQUE0QixVQUFVLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQzVELENBQUM7SUFFRixhQUFhLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUVsQyxhQUFhLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUM3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xELGFBQWEsQ0FBQyxTQUFTLElBQUksaUJBQWlCLENBQUMsdUhBQXVILENBQUMsb0JBQW9CLENBQUMsc0JBQXNCLENBQUM7S0FDbE47SUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN0RCxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNuRCxDQUFDO0FBRUQsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxJQUFZLEVBQUUsVUFBa0IsRUFBRSxVQUFrQixFQUFVLEVBQUU7SUFDekcsT0FBTyxnQ0FBZ0MsS0FBSyx3Q0FBd0MsSUFBSTs7c0VBRXBCLFVBQVU7c0VBQ1YsVUFBVTttQkFDN0QsQ0FBQztBQUNwQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUN4S0s7SUFNSixZQUFZLEtBQWEsRUFBRSxNQUFjO1FBTGpDLFdBQU0sR0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUd4Qyx3QkFBbUIsR0FBYSxFQUFFLENBQUM7UUFHekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7SUFDN0IsQ0FBQztJQUVNLHFCQUFxQixDQUFDLFlBQW9CO1FBQy9DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVNLHdCQUF3QjtRQUM3QixNQUFNLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFTSxTQUFTO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxjQUFjO1FBQ25CLE9BQU8sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDOUQsQ0FBQztJQUVNLGVBQWU7UUFDcEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFTSxjQUFjO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0JNLE1BQU0sT0FBTyxHQUFlO0lBQ2pDLE1BQU0sRUFBRSxDQUFDLENBQVMsRUFBVSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxHQUFHLEVBQUUsQ0FBQyxDQUFTLEVBQVUsRUFBRTtRQUN6QixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDRixDQUFDO0FBRUYsSUFBWSxlQUlYO0FBSkQsV0FBWSxlQUFlO0lBQ3pCLGlEQUFFO0lBQ0YsaURBQUU7SUFDRixxREFBSTtBQUNOLENBQUMsRUFKVyxlQUFlLEtBQWYsZUFBZSxRQUkxQjtBQUVNLE1BQU0sS0FBSyxHQUFHO0lBQ25CLElBQUksRUFBRSxDQUFDLFdBQTJCLEVBQVUsRUFBRTtRQUM1QyxPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQ3ZCLENBQUMsSUFBSSxFQUFFLFNBQXVCLEVBQUUsRUFBRTtZQUNoQyxPQUFPLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxHQUFHLEVBQUUsQ0FBQyxNQUFjLEVBQVUsRUFBRTtRQUM5QixPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDRjtBQUVNLE1BQU0sS0FBSyxHQUFHO0lBQ25CLElBQUksRUFBRSxDQUFDLFdBQTJCLEVBQVUsRUFBRTtRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FDL0IsQ0FBQyxJQUFJLEVBQUUsU0FBdUIsRUFBRSxFQUFFO1lBQ2hDLE9BQU8sSUFBSSxHQUFHLGtCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBSSxDQUFDO1FBQy9FLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxHQUFHLEVBQUUsQ0FBQyxVQUFrQixFQUFFLFNBQWlCLEVBQVUsRUFBRTtRQUNyRCxPQUFPLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0Y7QUFFSztJQUlKLFlBQVksS0FBZSxFQUFFLE1BQWdCO1FBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Q0FDRjtBQUVNLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxXQUEyQixFQUFVLEVBQUU7SUFDNUUsT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDakUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0RpQztBQUNRO0FBQ29FO0FBRXhHO0lBbUJKLFlBQVksU0FBaUIsRUFBRSxnQkFBMEIsRUFBRSxVQUFrQjtRQVpyRSxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRVosU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixZQUFPLEdBQW9CLDhEQUFlLENBQUMsSUFBSSxDQUFDO1FBRWhELGVBQVUsR0FBRyxJQUFJLDhDQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RDLFlBQU8sR0FBZSxFQUFFLENBQUM7UUFDekIsZ0JBQVcsR0FBbUIsRUFBRSxDQUFDO1FBRWpDLGlCQUFZLEdBQWtCLEVBQUUsQ0FBQztRQUd2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRTVDLFFBQVE7UUFDUixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUV0QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRU8sSUFBSTtRQUNWLHFCQUFxQjtRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxzQ0FBc0M7WUFDdEMsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7WUFDMUIsUUFBUSxDQUFDLEVBQUU7Z0JBQ1QsS0FBSyxDQUFDO29CQUNKLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQ25DLE1BQU07Z0JBQ1IsS0FBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUM7b0JBQ25DLGlCQUFpQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7b0JBQ3BDLE1BQU07Z0JBQ1I7b0JBQ0UsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDakQsTUFBTTthQUNUO1lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFFckIsY0FBYztZQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLDhDQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQywwREFBMEQ7aUJBQ25HO2FBQ0Y7U0FDRjtRQUVELHlCQUF5QjtRQUN6QixJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVNLFFBQVEsQ0FBQyxLQUFlO1FBQzdCLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xDLE1BQU0sMkJBQTJCLENBQUM7U0FDbkM7UUFDRCx3Q0FBd0M7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQzFFLGtCQUFrQjtRQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFFMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMvQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFTSxjQUFjLENBQUMsS0FBZSxFQUFFLE1BQWdCO1FBQ3JELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksMERBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNqQyxPQUFPLENBQUMsQ0FBQztTQUNWO1FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsT0FBTyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3pFLE9BQU8sR0FBRyxHQUFHLFVBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBSSxDQUFDLEVBQUM7WUFDaEUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRU4saUJBQWlCO1FBQ2pCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQixRQUFRLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDcEIsS0FBSyw4REFBZSxDQUFDLEVBQUU7Z0JBQ3JCLE9BQU8sR0FBRyxvREFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU07WUFDUixLQUFLLDhEQUFlLENBQUMsRUFBRTtnQkFDckIsT0FBTyxHQUFHLG9EQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDdkMsTUFBTTtZQUNSLEtBQUssOERBQWUsQ0FBQyxJQUFJO2dCQUN2QixPQUFPLEdBQUcsQ0FBQyxDQUFDO2dCQUNaLE1BQU07U0FDVDtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7WUFDckQsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7SUFDMUIsQ0FBQztJQUVNLEtBQUs7UUFDVixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUUzQixxQ0FBcUM7WUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDdEQsTUFBTSxRQUFRLEdBQ1osQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFHLHNEQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2dCQUV0RixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1lBRUgsdURBQXVEO1lBQ3ZELEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQkFDakMsTUFBTSxRQUFRLEdBQ1osTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRTt3QkFDN0MsT0FBTyxHQUFHLEdBQUcsVUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDaEYsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLHNEQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO29CQUM5QyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM1QixDQUFDLENBQUMsQ0FBQzthQUNKO1lBRUQsZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3JDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtvQkFFL0IsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUNmLFFBQVEsSUFBSSxDQUFDLE9BQU8sRUFBRTt3QkFDcEIsS0FBSyw4REFBZSxDQUFDLEVBQUU7NEJBQ3JCLE1BQU0sR0FBRyxvREFBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzs0QkFDM0MsTUFBTTt3QkFDUixLQUFLLDhEQUFlLENBQUMsRUFBRTs0QkFDckIsTUFBTSxHQUFHLG9EQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRSw2RUFBc0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs0QkFDckYsTUFBTTt3QkFDUixLQUFLLDhEQUFlLENBQUMsSUFBSTs0QkFDdkIsTUFBTSxHQUFHLENBQUMsQ0FBQzs0QkFDWCxNQUFNO3FCQUNUO29CQUVELE1BQU0sWUFBWSxHQUNoQixVQUFVLENBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxFQUFFO3dCQUN2QyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUMsYUFBYSxFQUFFO3dCQUMzQyxJQUFJLENBQUMsSUFBSTt3QkFDVCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLGlCQUFpQjtvQkFFekMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCx1REFBdUQ7UUFDdkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNyQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7Z0JBQy9CLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVNLGdCQUFnQixDQUFDLEdBQVk7UUFDbEMsSUFBSSxHQUFHLEVBQUU7WUFDUCxNQUFNLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFaEIseUJBQXlCO1lBQ3pCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUUzRCwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU5RCxxQ0FBcUM7WUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDOUQ7YUFBTTtZQUNMLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLEVBQUU7Z0JBQ3RCLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRXZCLDBCQUEwQjtZQUMxQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTlELHFDQUFxQztZQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM5RDtJQUNILENBQUM7SUFFRCxvSEFBb0g7SUFDN0csaUJBQWlCLENBQUMsR0FBWSxFQUFFLFFBQWdCO1FBQ3JELE1BQU0sT0FBTyxHQUFHLFFBQVEsSUFBSSxDQUFDLENBQUM7UUFDOUIsTUFBTSxRQUFRLEdBQUcsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sUUFBUSxHQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRXZDLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpDLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxVQUFVLENBQUM7U0FDbkQ7YUFDSSxJQUFJLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUyxJQUFJLFVBQVUsQ0FBQztZQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztTQUN4QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUM7WUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7U0FDeEI7UUFFRCxJQUFJLEdBQUcsRUFBRTtZQUNQLElBQUksWUFBWSxDQUFDO1lBRWpCLElBQUksUUFBUSxFQUFFO2dCQUNaLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN4RDtpQkFDSSxJQUFJLE9BQU8sRUFBRTtnQkFDaEIsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2FBQ25DO2lCQUFNO2dCQUNMLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzthQUNwQztZQUVELE1BQU0sU0FBUyxHQUFHLElBQUksOENBQU0sQ0FBQyxTQUFTLFFBQVEsR0FBRyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsU0FBUyxDQUFDO1lBRWpELElBQUksT0FBTztnQkFDVCxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFaEMsd0NBQXdDO1lBQ3hDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQzVDLE1BQU0sVUFBVSxHQUFHLElBQUksc0RBQVUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQ3JELE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzdCLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbEQsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsdUJBQXVCO2dCQUN2QixNQUFNLFVBQVUsR0FBRyxJQUFJLHNEQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDOUQsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2pEO1lBRUQsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDYixzQ0FBc0M7Z0JBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUM1QyxNQUFNLFVBQVUsR0FBRyxJQUFJLHNEQUFVLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNyRCxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDOUMsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO2FBQU07WUFDTCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ25ELHFDQUFxQztZQUNyQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUM1QyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTt3QkFDMUQsT0FBTyxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUMzRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNOLENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxpQ0FBaUM7WUFDakMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDYixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQkFDNUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7d0JBQ3hELE9BQU8sVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDMUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQzthQUNKO1lBRUQsZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBc0IsRUFBRSxFQUFFO29CQUNoRyxPQUFPLFVBQVUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzNFLENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFzQixFQUFFLEVBQUU7b0JBQ3hGLE9BQU8sVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDMUUsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO0lBQ0gsQ0FBQztJQUVNLEtBQUs7UUFDVixJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVPLG9CQUFvQixDQUFDLFFBQWdCLEVBQUUsU0FBaUI7UUFDOUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksOENBQU0sQ0FBQyxTQUFTLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pFO0lBQ0gsQ0FBQztJQUVPLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxTQUFTO1FBQzdDLEtBQUssSUFBSSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsZ0ZBQWdGO1lBQ2hGLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRXpCLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsWUFBWSxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFHckUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDbkMsTUFBTSxVQUFVLEdBQUcsSUFBSSxzREFBVSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7b0JBQ3pELFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ2pDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDLENBQUMsQ0FBQztnQkFFSCxnQ0FBZ0M7Z0JBQ2hDLE1BQU0sY0FBYyxHQUFHLElBQUksc0RBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNuRSxVQUFVLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMzQyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVNLFVBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVNLGNBQWM7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFTSxZQUFZO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRU0sYUFBYTtRQUNsQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVNLFdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxtQkFBbUI7UUFDeEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUVNLE9BQU8sQ0FBQyxPQUFlO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFTSxZQUFZO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRU0scUJBQXFCLENBQUMsT0FBd0I7UUFDbkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVNLHFCQUFxQixDQUFDLElBQVk7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FDNVh5QztBQUVwQztJQWFKLFlBQVksSUFBWSxFQUFFLE1BQU0sR0FBRyxLQUFLO1FBVGhDLFdBQU0sR0FBaUIsRUFBRSxDQUFDO1FBQzFCLFlBQU8sR0FBaUIsRUFBRSxDQUFDO1FBSTNCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUc5QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBQUEsQ0FBQztJQUVLLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVNLFNBQVM7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVNLGdCQUFnQixDQUFDLFVBQWtCO1FBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxRQUFRLENBQUMsVUFBa0I7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsTUFBTSwyQ0FBMkMsQ0FBQztTQUNuRDtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUM7SUFFTSxRQUFRLENBQUMsS0FBYTtRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRU0sUUFBUSxDQUFDLEtBQWlCO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFBQSxDQUFDO0lBRUssU0FBUztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRU0sU0FBUyxDQUFDLE1BQWtCO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFTSxVQUFVO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFTSxVQUFVLENBQUMsV0FBeUI7UUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7SUFDN0IsQ0FBQztJQUVNLFNBQVMsQ0FBQyxXQUF5QjtRQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRU0sV0FBVztRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRU0sWUFBWTtRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU0sS0FBSztRQUNWLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFFTSxhQUFhO1FBQ2xCLElBQUksSUFBSSxDQUFDLE1BQU07WUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVNLG1CQUFtQjtRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxVQUFVLEdBQUcsc0RBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDMUI7UUFDRCxPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM5QixDQUFDO0NBQ0YiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgTmV1cm9uIH0gZnJvbSBcIi4vbmV1cmFsTmV0d29yay9OZXVyb25cIjtcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tIFwiLi9uZXVyYWxOZXR3b3JrL0Nvbm5lY3Rpb25cIjtcblxuZXhwb3J0IGNsYXNzIERyYXdhYmxlTmV1cm9uIHtcbiAgcHVibGljIHg6IG51bWJlcjtcbiAgcHVibGljIHk6IG51bWJlcjtcbiAgcHVibGljIGFjdGl2YXRpb246IG51bWJlcjtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIGlzQmlhczogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcih4LCB5LCBhY3RpdmF0aW9uLCBuYW1lLCBpc0JpYXMgPSBmYWxzZSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pc0JpYXMgPSBpc0JpYXM7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6ZXIge1xuXG4gIHByaXZhdGUgY29udGVudDogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG4gIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihjb250ZW50OiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgdGhpcy5jdHggPSBjb250ZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5oZWlnaHQgPSBjb250ZW50LmhlaWdodDtcbiAgICB0aGlzLndpZHRoID0gY29udGVudC53aWR0aDtcbiAgfVxuXG4gIHB1YmxpYyBkcmF3KG5ldXJvbnM6IE5ldXJvbltdW10sIGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW11bXSkge1xuICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgXG4gICAgY29uc3QgZHJhd2FibGVOZXVyb25zOiBEcmF3YWJsZU5ldXJvbltdID0gW107XG4gICAgY29uc3QgbGVmdE1hcmdpbiA9IHRoaXMud2lkdGggLyAobmV1cm9ucy5sZW5ndGggKyAxKTtcblxuICAgIC8vIE5ldXJvbnNcbiAgICBuZXVyb25zLmZvckVhY2goKGxheWVyLCBsSWR4KSA9PiB7XG4gICAgICBjb25zdCB0b3BNYXJnaW4gPSB0aGlzLmhlaWdodCAvIChsYXllci5sZW5ndGggKyAyKTtcbiAgICAgIGxheWVyLmZvckVhY2goKG5ldXJvbiwgbklkeCkgPT4ge1xuICAgICAgICBjb25zdCB4ID0gbGVmdE1hcmdpbiAqICgxICsgbElkeCk7XG4gICAgICAgIGNvbnN0IHkgPSB0b3BNYXJnaW4gKiAoMSArIG5JZHgpO1xuXG4gICAgICAgIGNvbnN0IGRyYXdhYmxlTmV1cm9uID0gbmV3IERyYXdhYmxlTmV1cm9uKHgsIHksIG5ldXJvbi5nZXRBY3RpdmF0aW9uKCksIG5ldXJvbi5nZXROYW1lKCkpO1xuICAgICAgICBkcmF3YWJsZU5ldXJvbnMucHVzaChkcmF3YWJsZU5ldXJvbik7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGxJZHggIT0gbmV1cm9ucy5sZW5ndGggLSAxKSB7XG4gICAgICAgIGNvbnN0IHggPSBsZWZ0TWFyZ2luICogKDEgKyBsSWR4KTtcbiAgICAgICAgY29uc3QgeSA9IHRvcE1hcmdpbiAqICgxICsgbmV1cm9uc1tsSWR4XS5sZW5ndGgpO1xuXG4gICAgICAgIGNvbnN0IGRyYXdhYmxlTmV1cm9uID0gbmV3IERyYXdhYmxlTmV1cm9uKHgsIHksIDEsIGBiaWFzJHtsSWR4fWAsIHRydWUpO1xuICAgICAgICBkcmF3YWJsZU5ldXJvbnMucHVzaChkcmF3YWJsZU5ldXJvbik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBDb25uZWN0aW9uc1xuICAgIGNvbnN0IGRyYXdhYmxlTmFtZU1hcCA9IG5ldyBNYXA8c3RyaW5nLCBEcmF3YWJsZU5ldXJvbj4oKTtcbiAgICBkcmF3YWJsZU5ldXJvbnMuZm9yRWFjaChcbiAgICAgIChkcmF3YWJsZU5ldXJvbikgPT4gZHJhd2FibGVOYW1lTWFwLnNldChkcmF3YWJsZU5ldXJvbi5uYW1lLCBkcmF3YWJsZU5ldXJvbikvLyBXVEYsIEkgd2FzIG5vdCBhYmxlIHRvIGNyZWF0ZSBtYXAgZnJvbSAyZCBhcnJcbiAgICApO1xuXG4gICAgY29ubmVjdGlvbnMuZm9yRWFjaCgobGF5ZXIsIGxJZHgpID0+IHtcbiAgICAgIGxheWVyLmZvckVhY2goKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgaW5wdXROTmFtZSA9XG4gICAgICAgICAgKGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS5nZXRJc0JpYXMoKSkgP1xuICAgICAgICAgICAgYGJpYXMke2xJZHh9YCA6XG4gICAgICAgICAgICBjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIHRoaXMuZHJhd0Nvbm5lY3Rpb24oXG4gICAgICAgICAgZHJhd2FibGVOYW1lTWFwLmdldChpbnB1dE5OYW1lKSxcbiAgICAgICAgICBkcmF3YWJsZU5hbWVNYXAuZ2V0KGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0TmFtZSgpKSxcbiAgICAgICAgICBjb25uZWN0aW9uLmdldFdlaWdodCgpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRyYXdhYmxlTmV1cm9ucy5mb3JFYWNoKChuZXVyb24pID0+IHtcbiAgICAgIHRoaXMuZHJhd05ldXJvbihuZXVyb24pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3TmV1cm9uKGRyYXdhYmxlTmV1cm9uOiBEcmF3YWJsZU5ldXJvbikge1xuICAgIC8vIHdoaXRlIGJhY2tncm91bmRcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5hcmMoZHJhd2FibGVOZXVyb24ueCwgZHJhd2FibGVOZXVyb24ueSwgMjUsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBgcmdiKDI1NSwyNTUsMjU1KWA7XG4gICAgdGhpcy5jdHguZmlsbCgpO1xuICAgIFxuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIGlmIChkcmF3YWJsZU5ldXJvbi5pc0JpYXMpXG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBgcmdiYSg0Niw0MCw0MiwgMSlgO1xuICAgIGVsc2VcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGByZ2JhKDIzLCAxOTAsIDE4NywgJHtkcmF3YWJsZU5ldXJvbi5hY3RpdmF0aW9ufSlgO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gYHJnYig0Niw0MCw0MiwgMSlgXG4gICAgdGhpcy5jdHgubGluZVdpZHRoID0gMTtcbiAgICB0aGlzLmN0eC5hcmMoZHJhd2FibGVOZXVyb24ueCwgZHJhd2FibGVOZXVyb24ueSwgMjUsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICB0aGlzLmN0eC5maWxsKCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG5cbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBgcmdiKDQ2LDQwLDQyLCAxKWBcbiAgICBjb25zdCBoZWlnaHQgPSAxNjtcbiAgICB0aGlzLmN0eC5mb250ID0gYGJvbGQgJHtoZWlnaHR9cHggc2VyaWZgO1xuICAgIGNvbnN0IHRleHQgPSBOdW1iZXIoZHJhd2FibGVOZXVyb24uYWN0aXZhdGlvbikudG9GaXhlZCgyKTtcbiAgICB0aGlzLmN0eC5maWxsVGV4dChcbiAgICAgIHRleHQsIFxuICAgICAgZHJhd2FibGVOZXVyb24ueCAtIHRoaXMuY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoIC8gMiwgXG4gICAgICBkcmF3YWJsZU5ldXJvbi55ICsgaGVpZ2h0IC8gMyk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdDb25uZWN0aW9uKGlucHV0TmV1cm9uOiBEcmF3YWJsZU5ldXJvbiwgb3V0cHV0TmV1cm9uOiBEcmF3YWJsZU5ldXJvbiwgd2VpZ2h0OiBudW1iZXIpIHtcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAod2VpZ2h0ID4gMCkgPyBcbiAgICAgIE1hdGgubG9nKHdlaWdodCkgOlxuICAgICAgTWF0aC5sb2coLXdlaWdodCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSAod2VpZ2h0ID4gMCkgP1xuICAgICAgYHJnYmEoMjA1LCA4MywgNTIsICR7d2VpZ2h0fSlgIDpcbiAgICAgIGByZ2JhKDYxLCAyMzIsIDI1NSwgJHt3ZWlnaHQgKiAtMX0pYDtcbiAgICB0aGlzLmN0eC5tb3ZlVG8oaW5wdXROZXVyb24ueCwgaW5wdXROZXVyb24ueSk7XG4gICAgdGhpcy5jdHgubGluZVRvKG91dHB1dE5ldXJvbi54LCBvdXRwdXROZXVyb24ueSk7XG4gICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFZpc3VhbGl6ZXIgfSBmcm9tICcuL1Zpc3VhbGl6ZXInO1xuaW1wb3J0IHsgTmV1cmFsQ29yZSB9IGZyb20gJy4vbmV1cmFsTmV0d29yay9OZXVyYWxDb3JlJztcbmltcG9ydCB7IFJlZ3VsYXJpemF0aW9ucyB9IGZyb20gJy4vbmV1cmFsTmV0d29yay9IZWxwZXJPYmplY3RzJztcblxuKHdpbmRvdyBhcyBhbnkpLnNsaWRlID0gKGk6IG51bWJlciwgdmFsdWU6IG51bWJlcikgPT4ge1xuICBpbnB1dFtpXSA9IHZhbHVlO1xuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcbiAgdmlzdWFsaXplci5kcmF3KG5ldXJhbENvcmUuZ2V0TmV1cm9ucygpLCBuZXVyYWxDb3JlLmdldENvbm5lY3Rpb25zKCkpO1xufVxuXG4od2luZG93IGFzIGFueSkuYWRkT3JSZW1vdmVMYXllciA9IChhZGQ6IGJvb2xlYW4pID0+IHtcbiAgbmV1cmFsQ29yZS5hZGRPclJlbW92ZUxheWVyKGFkZCk7XG4gIG5ldXJhbENvcmUuZXZhbHVhdGUoaW5wdXQpO1xuXG4gIHVwZGF0ZVVJKCk7XG4gIHZpc3VhbGl6ZXIuZHJhdyhuZXVyYWxDb3JlLmdldE5ldXJvbnMoKSwgbmV1cmFsQ29yZS5nZXRDb25uZWN0aW9ucygpKTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLmFkZE9yUmVtb3ZlTmV1cm9uID0gKGFkZDogYm9vbGVhbiwgbGF5ZXJJZHg6IG51bWJlcikgPT4ge1xuICBuZXVyYWxDb3JlLmFkZE9yUmVtb3ZlTmV1cm9uKGFkZCwgbGF5ZXJJZHgpO1xuICBpZiAobGF5ZXJJZHggPT0gMCkge1xuICAgIGlmIChhZGQpXG4gICAgICBpbnB1dC5wdXNoKDEpO1xuICAgIGVsc2VcbiAgICAgIGlucHV0LnBvcCgpO1xuICB9XG4gIG5ldXJhbENvcmUuZXZhbHVhdGUoaW5wdXQpO1xuXG4gIHVwZGF0ZVVJKCk7XG4gIHZpc3VhbGl6ZXIuZHJhdyhuZXVyYWxDb3JlLmdldE5ldXJvbnMoKSwgbmV1cmFsQ29yZS5nZXRDb25uZWN0aW9ucygpKTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLnRyYWluID0gKG11bHRpcGxlSXRlcnM6IGJvb2xlYW4pID0+IHtcbiAgbGV0IGl0ZXJzID0gbXVsdGlwbGVJdGVycyA/IE51bWJlci5wYXJzZUludChpdGVyc0lucHV0LnZhbHVlKSA6IDE7XG4gIG5ldXJhbENvcmUuc2V0UmF0ZShOdW1iZXIucGFyc2VGbG9hdChyYXRlSW5wdXQudmFsdWUpKTtcblxuICAvLyBSZWd1bGFyaXphdGlvblxuICBzd2l0Y2ggKHJlZ1R5cGVJbnB1dC52YWx1ZSkge1xuICAgIGNhc2UgXCJMMVwiOlxuICAgICAgbmV1cmFsQ29yZS5zZXRSZWd1bGFyaXphdGlvblR5cGUoUmVndWxhcml6YXRpb25zLkwxKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJMMlwiOlxuICAgICAgbmV1cmFsQ29yZS5zZXRSZWd1bGFyaXphdGlvblR5cGUoUmVndWxhcml6YXRpb25zLkwyKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJub25lXCI6XG4gICAgICBuZXVyYWxDb3JlLnNldFJlZ3VsYXJpemF0aW9uVHlwZShSZWd1bGFyaXphdGlvbnMuTk9ORSk7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIG5ldXJhbENvcmUuc2V0UmVndWxhcml6YXRpb25SYXRlKE51bWJlci5wYXJzZUZsb2F0KHJlZ1JhdGVJbnB1dC52YWx1ZSkpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlcnM7IGkrKykge1xuICAgIG5ldXJhbENvcmUudHJhaW4oKTtcbiAgfVxuXG4gIG5ldXJhbENvcmUuZXZhbHVhdGUoaW5wdXQpO1xuICB1cGRhdGVVSSgpO1xuICB2aXN1YWxpemVyLmRyYXcobmV1cmFsQ29yZS5nZXROZXVyb25zKCksIG5ldXJhbENvcmUuZ2V0Q29ubmVjdGlvbnMoKSk7XG59XG5cbih3aW5kb3cgYXMgYW55KS5yZXNldCA9ICgpID0+IHtcbiAgbmV1cmFsQ29yZS5yZXNldCgpO1xuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcbiAgdXBkYXRlVUkoKTtcbiAgdmlzdWFsaXplci5kcmF3KG5ldXJhbENvcmUuZ2V0TmV1cm9ucygpLCBuZXVyYWxDb3JlLmdldENvbm5lY3Rpb25zKCkpO1xufVxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBtYWluKCk7XG59O1xuXG5sZXQgbmV1cmFsQ29yZTogTmV1cmFsQ29yZTtcbmxldCB2aXN1YWxpemVyOiBWaXN1YWxpemVyO1xubGV0IGlucHV0OiBudW1iZXJbXTtcblxubGV0IGlucHV0U2l6ZSA9IDQ7XG5sZXQgaGlkZGVuU2l6ZXMgPSBbM107XG5sZXQgb3V0cHV0U2l6ZSA9IDQ7XG5sZXQgbGF5ZXJDb250cm9sczogSFRNTEVsZW1lbnQ7XG5sZXQgaW5wdXRDb250cm9sczogSFRNTEVsZW1lbnQ7XG5cbmxldCBjb3N0OiBIVE1MRWxlbWVudDtcbmxldCBpdGVyOiBIVE1MRWxlbWVudDtcblxubGV0IHJhdGVJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbmxldCBpdGVyc0lucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xubGV0IHJlZ1R5cGVJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbmxldCByZWdSYXRlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbmNvbnN0IG1haW4gPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRlbnQ6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgaW5wdXRDb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC1jb250cm9scycpO1xuICBsYXllckNvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xheWVyLWNvbnRyb2xzJyk7XG4gIGl0ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXRlci1vdXRwdXQnKTtcbiAgY29zdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3N0Jyk7XG4gIHJhdGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYXRlLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgaXRlcnNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVycy1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHJlZ1R5cGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWd1bGFyaXphdGlvbi10eXBlLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgcmVnUmF0ZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZ3VsYXJpemF0aW9uLXJhdGUtaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIHZpc3VhbGl6ZXIgPSBuZXcgVmlzdWFsaXplcihjb250ZW50KTtcblxuICBpbml0Q29yZSgpO1xufVxuXG5jb25zdCBpbml0Q29yZSA9ICgpID0+IHtcbiAgbmV1cmFsQ29yZSA9IG5ldyBOZXVyYWxDb3JlKGlucHV0U2l6ZSwgaGlkZGVuU2l6ZXMsIG91dHB1dFNpemUpO1xuXG4gIG5ldXJhbENvcmUuYWRkVHJhaW5pbmdTZXQoWzEsIDAsIDAsIDBdLCBbMCwgMSwgMCwgMF0pO1xuICBuZXVyYWxDb3JlLmFkZFRyYWluaW5nU2V0KFswLCAxLCAwLCAwXSwgWzAsIDAsIDEsIDBdKTtcbiAgbmV1cmFsQ29yZS5hZGRUcmFpbmluZ1NldChbMCwgMCwgMSwgMF0sIFswLCAwLCAwLCAxXSk7XG5cbiAgLy8gU2V0IGRlZmF1bHQgdmFsdWVzXG4gIGlucHV0ID0gbmV3IEFycmF5KG5ldXJhbENvcmUuZ2V0SW5wdXRTaXplKCkpO1xuICBpbnB1dC5maWxsKDEpO1xuXG4gIG5ldXJhbENvcmUuZXZhbHVhdGUoaW5wdXQpO1xuICB1cGRhdGVVSSgpO1xuICB2aXN1YWxpemVyLmRyYXcobmV1cmFsQ29yZS5nZXROZXVyb25zKCksIG5ldXJhbENvcmUuZ2V0Q29ubmVjdGlvbnMoKSk7XG59XG5cbmNvbnN0IHVwZGF0ZVVJID0gKCkgPT4ge1xuICBsZXQgY29udGVudCA9IGFkZExheWVyQ29udHJvbFJvdyhcbiAgICAnTGF5ZXJzJyxcbiAgICBuZXVyYWxDb3JlLmdldExheWVyQ250KCkudG9TdHJpbmcoKSxcbiAgICAnYWRkT3JSZW1vdmVMYXllcih0cnVlKScsXG4gICAgJ2FkZE9yUmVtb3ZlTGF5ZXIoZmFsc2UpJ1xuICApO1xuXG5cbiAgY29udGVudCArPSBhZGRMYXllckNvbnRyb2xSb3coXG4gICAgJ0lucHV0IHNpemUnLFxuICAgIG5ldXJhbENvcmUuZ2V0SW5wdXRTaXplKCkudG9TdHJpbmcoKSxcbiAgICAnYWRkT3JSZW1vdmVOZXVyb24odHJ1ZSwgMCknLFxuICAgICdhZGRPclJlbW92ZU5ldXJvbihmYWxzZSwgMCknXG4gICk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXVyYWxDb3JlLmdldExheWVyQ250KCkgLSAyOyBpKyspIHtcbiAgICBjb250ZW50ICs9IGFkZExheWVyQ29udHJvbFJvdyhcbiAgICAgICdIaWRkZW4gbGF5ZXIgc2l6ZScsXG4gICAgICBuZXVyYWxDb3JlLmdldEhpZGRlbkxheWVyU2l6ZXMoKVtpXS50b1N0cmluZygpLFxuICAgICAgYGFkZE9yUmVtb3ZlTmV1cm9uKHRydWUsICR7aSArIDF9KWAsXG4gICAgICBgYWRkT3JSZW1vdmVOZXVyb24oZmFsc2UsICR7aSArIDF9KWBcbiAgICApO1xuICB9XG5cbiAgY29udGVudCArPSBhZGRMYXllckNvbnRyb2xSb3coXG4gICAgJ091dHB1dCBzaXplJyxcbiAgICBuZXVyYWxDb3JlLmdldE91dHB1dFNpemUoKS50b1N0cmluZygpLFxuICAgIGBhZGRPclJlbW92ZU5ldXJvbih0cnVlLCAke25ldXJhbENvcmUuZ2V0TGF5ZXJDbnQoKSAtIDF9KWAsXG4gICAgYGFkZE9yUmVtb3ZlTmV1cm9uKGZhbHNlLCAke25ldXJhbENvcmUuZ2V0TGF5ZXJDbnQoKSAtIDF9KWBcbiAgKTtcblxuICBsYXllckNvbnRyb2xzLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgaW5wdXRDb250cm9scy5pbm5lckhUTUwgPSAnJztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXVyYWxDb3JlLmdldElucHV0U2l6ZSgpOyBpKyspIHtcbiAgICBpbnB1dENvbnRyb2xzLmlubmVySFRNTCArPSBgPGxhYmVsPk5ldXJvbiAke2l9OjwvbGFiZWw+IDxpbnB1dCBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTsgdG9wOiA1cHg7XCIgdHlwZT1cInJhbmdlXCIgbWluPVwiMFwiIG1heD1cIjFcIiB2YWx1ZT1cIjFcIiBzdGVwPVwiMC4wNVwiIGlkPVwic2xpZGVyJHtpfVwiIG9uaW5wdXQ9XCJzbGlkZSgke2l9LCB0aGlzLnZhbHVlKTtcIj48YnI+YDtcbiAgfVxuXG4gIGl0ZXIuaW5uZXJIVE1MID0gbmV1cmFsQ29yZS5nZXRJdGVyYXRpb24oKS50b1N0cmluZygpO1xuICBjb3N0LmlubmVySFRNTCA9IG5ldXJhbENvcmUuZ2V0Q29zdCgpLnRvU3RyaW5nKCk7XG59XG5cbmNvbnN0IGFkZExheWVyQ29udHJvbFJvdyA9IChsYWJlbDogc3RyaW5nLCBzaXplOiBzdHJpbmcsIG9uY2xpY2tQb3M6IHN0cmluZywgb25jbGlja05lZzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGA8dHI+PHRkIGFsaWduPSdyaWdodCc+PGxhYmVsPiR7bGFiZWx9OjwvbGFiZWw+PGIgc3R5bGU9XCJtYXJnaW46IGF1dG8gNnB4XCI+JHtzaXplfTwvYj48L3RkPjx0ZD5cbiAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIHJvbGU9XCJncm91cFwiPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCIgb25jbGljaz1cIiR7b25jbGlja05lZ31cIj4tPC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc21cIiBvbmNsaWNrPVwiJHtvbmNsaWNrUG9zfVwiPis8L2J1dHRvbj5cbiAgPC9kaXY+PC90ZD48L3RyPmA7XG59IiwiaW1wb3J0IHsgTmV1cm9uIH0gZnJvbSBcIi4vTmV1cm9uXCI7XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uIHtcbiAgcHJpdmF0ZSB3ZWlnaHQ6IG51bWJlciA9IE1hdGgucmFuZG9tKCkgKiAxMCAtIDU7XG4gIHByaXZhdGUgaW5wdXROZXVyb246IE5ldXJvbjtcbiAgcHJpdmF0ZSBvdXRwdXROZXVyb246IE5ldXJvbjtcbiAgcHJpdmF0ZSBzYW1wbGVXZWlnaHRDaGFuZ2VzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGlucHV0OiBOZXVyb24sIG91dHB1dDogTmV1cm9uKSB7XG4gICAgdGhpcy5pbnB1dE5ldXJvbiA9IGlucHV0O1xuICAgIHRoaXMub3V0cHV0TmV1cm9uID0gb3V0cHV0O1xuICB9XG5cbiAgcHVibGljIGFkZFNhbXBsZVdlaWdodENoYW5nZSh3ZWlnaHRDaGFuZ2U6IG51bWJlcikge1xuICAgIHRoaXMuc2FtcGxlV2VpZ2h0Q2hhbmdlcy5wdXNoKHdlaWdodENoYW5nZSk7XG4gIH1cblxuICBwdWJsaWMgYXBwbHlBdmVyYWdlV2VpZ2h0Q2hhbmdlKCkge1xuICAgIGNvbnN0IGNoYW5nZSA9ICh0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjICsgdmFsLCAwKSAvIHRoaXMuc2FtcGxlV2VpZ2h0Q2hhbmdlcy5sZW5ndGgpO1xuICAgIHRoaXMud2VpZ2h0ICs9IGNoYW5nZTtcbiAgICB0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRXZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMud2VpZ2h0O1xuICB9XG5cbiAgcHVibGljIGNhbGN1bGF0ZVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLndlaWdodCAqIHRoaXMuaW5wdXROZXVyb24uY2FsY3VsYXRlQWN0aXZhdGlvbigpO1xuICB9XG5cbiAgcHVibGljIGdldE91dHB1dE5ldXJvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vdXRwdXROZXVyb247XG4gIH1cblxuICBwdWJsaWMgZ2V0SW5wdXROZXVyb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXROZXVyb247XG4gIH1cbn0iLCJpbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSBcIi4vQ29ubmVjdGlvblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGl2YXRpb24ge1xuICBkZXIoeDogbnVtYmVyKTogbnVtYmVyO1xuICBvdXRwdXQoeDogbnVtYmVyKTogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgU0lHTU9JRDogQWN0aXZhdGlvbiA9IHtcbiAgb3V0cHV0OiAoeDogbnVtYmVyKTogbnVtYmVyID0+IDEgLyAoMSArIE1hdGguZXhwKC14KSksXG4gIGRlcjogKHg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgbGV0IG91dHB1dCA9IFNJR01PSUQub3V0cHV0KHgpO1xuICAgIHJldHVybiBvdXRwdXQgKiAoMSAtIG91dHB1dCk7XG4gIH1cbn07XG5cbmV4cG9ydCBlbnVtIFJlZ3VsYXJpemF0aW9ucyB7XG4gIEwxLFxuICBMMixcbiAgTk9ORSxcbn1cblxuZXhwb3J0IGNvbnN0IEwxUmVnID0ge1xuICBjb3N0OiAoY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXVtdKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gY29ubmVjdGlvbnMucmVkdWNlKFxuICAgICAgKHByZXYsIGNvbm5MYXllcjogQ29ubmVjdGlvbltdKSA9PiB7XG4gICAgICAgIHJldHVybiBwcmV2ICsgTWF0aC5hYnMoY29ubkxheWVyLnJlZHVjZSgoYWNjLCBjb25uKSA9PiBhY2MgKyBjb25uLmdldFdlaWdodCgpLCAwKSlcbiAgICAgIH0sIDApICogKDEgLyBnZXROdW1iZXJPZkNvbm5lY3Rpb25zKGNvbm5lY3Rpb25zKSk7XG4gIH0sXG5cbiAgZGVyOiAod2VpZ2h0OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiAod2VpZ2h0ID4gMCkgPyAxIDogLTE7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEwyUmVnID0ge1xuICBjb3N0OiAoY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXVtdKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gMSAvIDIgKiBjb25uZWN0aW9ucy5yZWR1Y2UoXG4gICAgICAocHJldiwgY29ubkxheWVyOiBDb25uZWN0aW9uW10pID0+IHtcbiAgICAgICAgcmV0dXJuIHByZXYgKyBjb25uTGF5ZXIucmVkdWNlKChhY2MsIGNvbm4pID0+IGFjYyArIGNvbm4uZ2V0V2VpZ2h0KCksIDApICoqIDJcbiAgICAgIH0sIDApICogKDEgLyBnZXROdW1iZXJPZkNvbm5lY3Rpb25zKGNvbm5lY3Rpb25zKSk7XG4gIH0sXG5cbiAgZGVyOiAoY3VycldlaWdodDogbnVtYmVyLCBjb25uQ291bnQ6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIGN1cnJXZWlnaHQgKiAoMSAvIGNvbm5Db3VudCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRyYWluU2FtcGxlIHtcbiAgcHVibGljIGlucHV0OiBudW1iZXJbXTtcbiAgcHVibGljIG91dHB1dDogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IoaW5wdXQ6IG51bWJlcltdLCBvdXRwdXQ6IG51bWJlcltdKSB7XG4gICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgIHRoaXMub3V0cHV0ID0gb3V0cHV0O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZXROdW1iZXJPZkNvbm5lY3Rpb25zID0gKGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW11bXSk6IG51bWJlciA9PiB7XG4gIHJldHVybiBjb25uZWN0aW9ucy5yZWR1Y2UoKGFjYywgY29ubikgPT4gYWNjICsgY29ubi5sZW5ndGgsIDApO1xufSIsImltcG9ydCB7IE5ldXJvbiB9IGZyb20gXCIuL05ldXJvblwiO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gXCIuL0Nvbm5lY3Rpb25cIjtcbmltcG9ydCB7IFRyYWluU2FtcGxlLCBTSUdNT0lELCBSZWd1bGFyaXphdGlvbnMsIEwyUmVnLCBnZXROdW1iZXJPZkNvbm5lY3Rpb25zLCBMMVJlZyB9IGZyb20gXCIuL0hlbHBlck9iamVjdHNcIjtcblxuZXhwb3J0IGNsYXNzIE5ldXJhbENvcmUge1xuICBwcml2YXRlIGlucHV0U2l6ZTogbnVtYmVyO1xuICBwcml2YXRlIGhpZGRlbkxheWVyU2l6ZXM6IG51bWJlcltdO1xuICBwcml2YXRlIG91dHB1dFNpemU6IG51bWJlcjtcblxuICBwcml2YXRlIGxheWVyQ250OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBpdGVyQ250ID0gMDtcblxuICBwcml2YXRlIHJhdGUgPSAxO1xuICBwcml2YXRlIGxhbWJkYSA9IDAuMDAxO1xuICBwcml2YXRlIHJlZ1R5cGU6IFJlZ3VsYXJpemF0aW9ucyA9IFJlZ3VsYXJpemF0aW9ucy5OT05FO1xuXG4gIHByaXZhdGUgYmlhc05ldXJvbiA9IG5ldyBOZXVyb24oJ2JpYXMnLCB0cnVlKTtcbiAgcHJpdmF0ZSBuZXVyb25zOiBOZXVyb25bXVtdID0gW107XG4gIHByaXZhdGUgY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXVtdID0gW107XG5cbiAgcHJpdmF0ZSB0cmFpblNhbXBsZXM6IFRyYWluU2FtcGxlW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihpbnB1dFNpemU6IG51bWJlciwgaGlkZGVuTGF5ZXJTaXplczogbnVtYmVyW10sIG91dHB1dFNpemU6IG51bWJlcikge1xuICAgIHRoaXMuaW5wdXRTaXplID0gaW5wdXRTaXplO1xuICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplcyA9IGhpZGRlbkxheWVyU2l6ZXM7XG4gICAgdGhpcy5vdXRwdXRTaXplID0gb3V0cHV0U2l6ZTtcbiAgICB0aGlzLmxheWVyQ250ID0gaGlkZGVuTGF5ZXJTaXplcy5sZW5ndGggKyAyO1xuXG4gICAgLy8gUmVzZXRcbiAgICB0aGlzLm5ldXJvbnMgPSBbXTtcbiAgICB0aGlzLmNvbm5lY3Rpb25zID0gW107XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICAvLyBDcmVhdGUgdGhlIG5ldXJvbnNcbiAgICBmb3IgKGxldCBsID0gMDsgbCA8IHRoaXMubGF5ZXJDbnQ7IGwrKykge1xuICAgICAgLy8gSG93IG1hbnkgbmV1cm9ucyBhcmUgaW4gZWFjaCBsYXllcj9cbiAgICAgIGxldCBuZXVyb25zSW5MYXllckNudCA9IDA7XG4gICAgICBzd2l0Y2ggKGwpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIG5ldXJvbnNJbkxheWVyQ250ID0gdGhpcy5pbnB1dFNpemU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdGhpcy5oaWRkZW5MYXllclNpemVzLmxlbmd0aCArIDE6XG4gICAgICAgICAgbmV1cm9uc0luTGF5ZXJDbnQgPSB0aGlzLm91dHB1dFNpemU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbmV1cm9uc0luTGF5ZXJDbnQgPSB0aGlzLmhpZGRlbkxheWVyU2l6ZXNbbCAtIDFdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm5ldXJvbnNbbF0gPSBbXTtcblxuICAgICAgLy8gQ3JlYXRlIHRoZW1cbiAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgbmV1cm9uc0luTGF5ZXJDbnQ7IG4rKykge1xuICAgICAgICB0aGlzLm5ldXJvbnNbbF1bbl0gPSBuZXcgTmV1cm9uKGBOZXVyb24ke2x9JHtufWApO1xuICAgICAgICBpZiAobCA9PSAwKSB7XG4gICAgICAgICAgdGhpcy5uZXVyb25zW2xdW25dLnNldEFzSW5wdXROZXVyb24oMCk7IC8vIGp1c3QgdG8gYXZvaWQgY3Jhc2hlcywgdGhlIDAgc2hvdWxkIGJlIG92ZXJyaWRlbiBsYXRlciBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENyZWF0ZSB0aGUgQ29ubmVjdGlvbnNcbiAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25zKDAsIHRoaXMubGF5ZXJDbnQgLSAxKTtcbiAgfVxuXG4gIHB1YmxpYyBldmFsdWF0ZShpbnB1dDogbnVtYmVyW10pOiBudW1iZXJbXSB7XG4gICAgaWYgKGlucHV0Lmxlbmd0aCAhPSB0aGlzLmlucHV0U2l6ZSkge1xuICAgICAgdGhyb3cgJ0lucHV0IHNpemUgZG9lcyBub3QgbWF0Y2gnO1xuICAgIH1cbiAgICAvLyBSZXNldCwgc28gZWFjaCBuZXVyb24gaXMgcmVjYWxjdWxhdGVkXG4gICAgdGhpcy5uZXVyb25zLmZvckVhY2gobGF5ZXIgPT4geyBsYXllci5mb3JFYWNoKG5ldXJvbiA9PiBuZXVyb24ucmVzZXQoKSkgfSlcbiAgICAvLyBTZXQgaW5wdXQgbGF5ZXJcbiAgICB0aGlzLm5ldXJvbnNbMF0uZm9yRWFjaCgobmV1cm9uLCBpZHgpID0+IHsgbmV1cm9uLnNldElucHV0KGlucHV0W2lkeF0pIH0pO1xuXG4gICAgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5mb3JFYWNoKG5ldXJvbiA9PiB7XG4gICAgICBuZXVyb24uY2FsY3VsYXRlQWN0aXZhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250IC0gMV0ubWFwKG5ldXJvbiA9PiBuZXVyb24uZ2V0QWN0aXZhdGlvbigpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRUcmFpbmluZ1NldChpbnB1dDogbnVtYmVyW10sIG91dHB1dDogbnVtYmVyW10pIHtcbiAgICB0aGlzLnRyYWluU2FtcGxlcy5wdXNoKG5ldyBUcmFpblNhbXBsZShpbnB1dCwgb3V0cHV0KSlcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb3N0KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMudHJhaW5TYW1wbGVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBjb25zdCBjb3N0U3VtID0gdGhpcy50cmFpblNhbXBsZXMucmVkdWNlKChjb3N0U3VtLCBzYW1wbGUpID0+IHsgLy8gQWRkIHVwIGFsbCBzYW1wbGVzXG4gICAgICB0aGlzLmV2YWx1YXRlKHNhbXBsZS5pbnB1dCk7XG4gICAgICByZXR1cm4gY29zdFN1bSArIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250IC0gMV0ucmVkdWNlKChhY2MsIG5ldXJvbiwgaSkgPT4geyAvLyBBZGQgdXAgYWxsIG91dHB1dCBuZXVyb25zXG4gICAgICAgIHJldHVybiBhY2MgKyAobmV1cm9uLmdldEFjdGl2YXRpb24oKSAtIHNhbXBsZS5vdXRwdXRbaV0pICoqIDI7XG4gICAgICB9LCAwKTtcbiAgICB9LCAwKTtcblxuICAgIC8vIFJlZ3VsYXJpemF0aW9uXG4gICAgbGV0IHJlZ0Nvc3QgPSAwO1xuICAgIHN3aXRjaCAodGhpcy5yZWdUeXBlKSB7XG4gICAgICBjYXNlIFJlZ3VsYXJpemF0aW9ucy5MMTpcbiAgICAgICAgcmVnQ29zdCA9IEwxUmVnLmNvc3QodGhpcy5jb25uZWN0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBSZWd1bGFyaXphdGlvbnMuTDI6XG4gICAgICAgIHJlZ0Nvc3QgPSBMMlJlZy5jb3N0KHRoaXMuY29ubmVjdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUmVndWxhcml6YXRpb25zLk5PTkU6XG4gICAgICAgIHJlZ0Nvc3QgPSAwO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gMSAvIDIgKiBjb3N0U3VtICogKDEgLyB0aGlzLnRyYWluU2FtcGxlcy5sZW5ndGgpICtcbiAgICAgIHRoaXMubGFtYmRhICogcmVnQ29zdDtcbiAgfVxuXG4gIHB1YmxpYyB0cmFpbigpIHtcbiAgICB0aGlzLnRyYWluU2FtcGxlcy5mb3JFYWNoKChzYW1wbGUpID0+IHtcbiAgICAgIHRoaXMuZXZhbHVhdGUoc2FtcGxlLmlucHV0KVxuXG4gICAgICAvLyBDYWxjdWxhdGUgc2lnbWFzIG9mIHRoZSBsYXN0IGxheWVyXG4gICAgICB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLmZvckVhY2goKG5ldXJvbiwgaWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1NpZ21hID1cbiAgICAgICAgICAoc2FtcGxlLm91dHB1dFtpZHhdIC0gbmV1cm9uLmdldEFjdGl2YXRpb24oKSkgKiBTSUdNT0lELmRlcihuZXVyb24uZ2V0QWN0aXZhdGlvbigpKTtcblxuICAgICAgICBuZXVyb24uc2V0U2lnbWEobmV3U2lnbWEpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBzaWdtYXMgZm9yIGVhY2ggbmV1cm9uIGluIHRoZSBsb3dlciBsYXllcnNcbiAgICAgIGZvciAobGV0IGwgPSB0aGlzLmxheWVyQ250IC0gMjsgbCA+PSAwOyBsLS0pIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xdLmZvckVhY2goKG5ldXJvbikgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld1NpZ21hID1cbiAgICAgICAgICAgIG5ldXJvbi5nZXRPdXRwdXRzKCkucmVkdWNlKChhY2MsIGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFjYyArIGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0U2lnbWEoKSAqIGNvbm5lY3Rpb24uZ2V0V2VpZ2h0KCk7XG4gICAgICAgICAgICB9LCAwKSAqIFNJR01PSUQuZGVyKG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkpO1xuICAgICAgICAgIG5ldXJvbi5zZXRTaWdtYShuZXdTaWdtYSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBBY2N1bXVsYXRlIGFsbCB3ZWlnaHQgdXBkYXRlc1xuICAgICAgdGhpcy5jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uTGF5ZXIpID0+IHtcbiAgICAgICAgY29ubkxheWVyLmZvckVhY2goKGNvbm5lY3Rpb24pID0+IHtcblxuICAgICAgICAgIGxldCByZWdEZXIgPSAwO1xuICAgICAgICAgIHN3aXRjaCAodGhpcy5yZWdUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFJlZ3VsYXJpemF0aW9ucy5MMTpcbiAgICAgICAgICAgICAgcmVnRGVyID0gTDFSZWcuZGVyKGNvbm5lY3Rpb24uZ2V0V2VpZ2h0KCkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUmVndWxhcml6YXRpb25zLkwyOlxuICAgICAgICAgICAgICByZWdEZXIgPSBMMlJlZy5kZXIoY29ubmVjdGlvbi5nZXRXZWlnaHQoKSwgZ2V0TnVtYmVyT2ZDb25uZWN0aW9ucyh0aGlzLmNvbm5lY3Rpb25zKSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBSZWd1bGFyaXphdGlvbnMuTk9ORTpcbiAgICAgICAgICAgICAgcmVnRGVyID0gMDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgd2VpZ2h0Q2hhbmdlID1cbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0U2lnbWEoKSAqXG4gICAgICAgICAgICBjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0QWN0aXZhdGlvbigpICpcbiAgICAgICAgICAgIHRoaXMucmF0ZSAtXG4gICAgICAgICAgICB0aGlzLmxhbWJkYSAqIHJlZ0RlcjsgLy8gUmVndWxhcml6YXRpb25cblxuICAgICAgICAgIGNvbm5lY3Rpb24uYWRkU2FtcGxlV2VpZ2h0Q2hhbmdlKHdlaWdodENoYW5nZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBVZmYsIGxldCdzIGhvcGUgZXZlcnl0aGluZyB3b3JrcyBhbmQgYXBwbHkgdGhlIG1hZ2ljXG4gICAgdGhpcy5jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uTGF5ZXIpID0+IHtcbiAgICAgIGNvbm5MYXllci5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbm5lY3Rpb24uYXBwbHlBdmVyYWdlV2VpZ2h0Q2hhbmdlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuaXRlckNudCsrO1xuICB9XG5cbiAgcHVibGljIGFkZE9yUmVtb3ZlTGF5ZXIoYWRkOiBib29sZWFuKSB7XG4gICAgaWYgKGFkZCkge1xuICAgICAgY29uc3QgbmV3TGF5ZXJTaXplID0gMztcbiAgICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplcy5wdXNoKG5ld0xheWVyU2l6ZSk7XG4gICAgICB0aGlzLmxheWVyQ250Kys7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgbmV3IG5ldXJvbnNcbiAgICAgIHRoaXMuY3JlYXRlTGF5ZXJPZk5ldXJvbnModGhpcy5sYXllckNudCAtIDIsIG5ld0xheWVyU2l6ZSk7XG5cbiAgICAgIC8vIFJlY3JlYXRlIHRoZSBsYXN0IGxheWVyXG4gICAgICB0aGlzLmNyZWF0ZUxheWVyT2ZOZXVyb25zKHRoaXMubGF5ZXJDbnQgLSAxLCB0aGlzLm91dHB1dFNpemUpO1xuXG4gICAgICAvLyBSZWNyZWF0ZSBhbGwgbmVjZXNzYXJ5IGNvbm5lY3Rpb25zXG4gICAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25zKHRoaXMubGF5ZXJDbnQgLSAzLCB0aGlzLmxheWVyQ250IC0gMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmxheWVyQ250ID09IDIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmhpZGRlbkxheWVyU2l6ZXMucG9wKCk7XG4gICAgICB0aGlzLmxheWVyQ250LS07XG4gICAgICB0aGlzLm5ldXJvbnMucG9wKCk7XG4gICAgICB0aGlzLmNvbm5lY3Rpb25zLnBvcCgpO1xuXG4gICAgICAvLyBSZWNyZWF0ZSB0aGUgbGFzdCBsYXllclxuICAgICAgdGhpcy5jcmVhdGVMYXllck9mTmV1cm9ucyh0aGlzLmxheWVyQ250IC0gMSwgdGhpcy5vdXRwdXRTaXplKTtcblxuICAgICAgLy8gUmVjcmVhdGUgYWxsIG5lY2Vzc2FyeSBjb25uZWN0aW9uc1xuICAgICAgdGhpcy5jcmVhdGVDb25uZWN0aW9ucyh0aGlzLmxheWVyQ250IC0gMiwgdGhpcy5sYXllckNudCAtIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRoaXMgZnVuY3Rpb24gaXMgdmVyeSBsb25nIGFuZCB1Z2x5LCBJIGRvbnQgd2FudCB0byBzaW1wbHkgcmVidWlsZCB0aGUgbmV0d29yayBiZWNhdXNlIEkgd2FudCB0byBrZWVwIHRoZSB3ZWlnaHRzXG4gIHB1YmxpYyBhZGRPclJlbW92ZU5ldXJvbihhZGQ6IGJvb2xlYW4sIGxheWVySWR4OiBudW1iZXIpIHtcbiAgICBjb25zdCBpc0lucHV0ID0gbGF5ZXJJZHggPT0gMDtcbiAgICBjb25zdCBpc091dHB1dCA9IGxheWVySWR4ID09IHRoaXMubGF5ZXJDbnQgLSAxO1xuICAgIGNvbnN0IGlzSGlkZGVuID0gIWlzSW5wdXQgJiYgIWlzT3V0cHV0O1xuXG4gICAgY29uc3Qgc2l6ZUNoYW5nZSA9IChhZGQpID8gMSA6IC0xXG5cbiAgICBpZiAoaXNIaWRkZW4pIHtcbiAgICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplc1tsYXllcklkeCAtIDFdICs9IHNpemVDaGFuZ2U7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzSW5wdXQpIHtcbiAgICAgIHRoaXMuaW5wdXRTaXplICs9IHNpemVDaGFuZ2U7XG4gICAgICB0aGlzLnRyYWluU2FtcGxlcyA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm91dHB1dFNpemUgKz0gc2l6ZUNoYW5nZTtcbiAgICAgIHRoaXMudHJhaW5TYW1wbGVzID0gW107XG4gICAgfVxuXG4gICAgaWYgKGFkZCkge1xuICAgICAgbGV0IG5ld05ldXJvbklkeDtcblxuICAgICAgaWYgKGlzSGlkZGVuKSB7XG4gICAgICAgIG5ld05ldXJvbklkeCA9IHRoaXMuaGlkZGVuTGF5ZXJTaXplc1tsYXllcklkeCAtIDFdIC0gMTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzSW5wdXQpIHtcbiAgICAgICAgbmV3TmV1cm9uSWR4ID0gdGhpcy5pbnB1dFNpemUgLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3TmV1cm9uSWR4ID0gdGhpcy5vdXRwdXRTaXplIC0gMTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3TmV1cm9uID0gbmV3IE5ldXJvbihgTmV1cm9uJHtsYXllcklkeH0ke25ld05ldXJvbklkeH1gKTtcbiAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeF1bbmV3TmV1cm9uSWR4XSA9IG5ld05ldXJvbjtcblxuICAgICAgaWYgKGlzSW5wdXQpXG4gICAgICAgIG5ld05ldXJvbi5zZXRBc0lucHV0TmV1cm9uKDApO1xuXG4gICAgICAvLy8vIEFkZCBjb25uZWN0aW9ucyBmcm9tIHRoZSBwcmV2IGxheWVyXG4gICAgICBpZiAoIWlzSW5wdXQpIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4IC0gMV0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKG5ldXJvbiwgbmV3TmV1cm9uKTtcbiAgICAgICAgICBuZXVyb24uYWRkT3V0cHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICAgIG5ld05ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4IC0gMV0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIERvbnQgZm9yZ2V0IHRoZSBiaWFzXG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbih0aGlzLmJpYXNOZXVyb24sIG5ld05ldXJvbik7XG4gICAgICAgIG5ld05ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeCAtIDFdLnB1c2goY29ubmVjdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNPdXRwdXQpIHtcbiAgICAgICAgLy8vLyBBZGQgY29ubmVjdGlvbnMgdG8gdGhlIG5leHQgbGF5ZXJcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4ICsgMV0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKG5ld05ldXJvbiwgbmV1cm9uKTtcbiAgICAgICAgICBuZXVyb24uYWRkSW5wdXQoY29ubmVjdGlvbik7XG4gICAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeF0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJlbW92ZWROZXVyb24gPSB0aGlzLm5ldXJvbnNbbGF5ZXJJZHhdLnBvcCgpO1xuICAgICAgLy8gUmVtb3ZlIG91dHB1dHMgZnJvbSB0aGUgcHJldiBsYXllclxuICAgICAgaWYgKCFpc0lucHV0KSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeCAtIDFdLmZvckVhY2goKG5ldXJvbikgPT4ge1xuICAgICAgICAgIG5ldXJvbi5zZXRPdXRwdXRzKG5ldXJvbi5nZXRPdXRwdXRzKCkuZmlsdGVyKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXROYW1lKCkgIT0gcmVtb3ZlZE5ldXJvbi5nZXROYW1lKCk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVtb3ZlIGlucHV0IGluIHRoZSBuZXh0IGxheWVyXG4gICAgICBpZiAoIWlzT3V0cHV0KSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeCArIDFdLmZvckVhY2goKG5ldXJvbikgPT4ge1xuICAgICAgICAgIG5ldXJvbi5zZXRJbnB1dHMobmV1cm9uLmdldElucHV0cygpLmZpbHRlcigoY29ubmVjdGlvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS5nZXROYW1lKCkgIT0gcmVtb3ZlZE5ldXJvbi5nZXROYW1lKCk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVtb3ZlIHRoZSB1bnVzZWQgY29ubmVjdGlvbnNcbiAgICAgIGlmICghaXNJbnB1dCkge1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4IC0gMV0gPSB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4IC0gMV0uZmlsdGVyKChjb25uZWN0aW9uOiBDb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0TmFtZSgpICE9IHJlbW92ZWROZXVyb24uZ2V0TmFtZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc091dHB1dCkge1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4XSA9IHRoaXMuY29ubmVjdGlvbnNbbGF5ZXJJZHhdLmZpbHRlcigoY29ubmVjdGlvbjogQ29ubmVjdGlvbikgPT4ge1xuICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0TmFtZSgpICE9IHJlbW92ZWROZXVyb24uZ2V0TmFtZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgdGhpcy5jcmVhdGVDb25uZWN0aW9ucygwLCB0aGlzLmxheWVyQ250IC0gMSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUxheWVyT2ZOZXVyb25zKGxheWVySWR4OiBudW1iZXIsIGxheWVyU2l6ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5uZXVyb25zW2xheWVySWR4XSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXJTaXplOyBpKyspIHtcbiAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeF1baV0gPSBuZXcgTmV1cm9uKGBOZXVyb24ke2xheWVySWR4fSR7aX1gKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNvbm5lY3Rpb25zKGZpcnN0TGF5ZXIsIGxhc3RMYXllcikge1xuICAgIGZvciAobGV0IGwgPSBmaXJzdExheWVyOyBsIDwgbGFzdExheWVyOyBsKyspIHtcbiAgICAgIC8vIEZvciBlYWNoIG5ldXJvbiBpbiB0aGUgbGF5ZXIgYWRkIGFsbCBjb25uZWN0aW9ucyB0byBuZXVyb25zIGluIHRoZSBuZXh0IGxheWVyXG4gICAgICB0aGlzLmNvbm5lY3Rpb25zW2xdID0gW107XG5cbiAgICAgIC8vIFJlc2V0IGlucHV0ICYgb3V0cHV0c1xuICAgICAgdGhpcy5uZXVyb25zW2wgKyAxXS5mb3JFYWNoKG5leHROZXVyb24gPT4geyBuZXh0TmV1cm9uLnJlc2V0SW5wdXRzKCkgfSk7XG4gICAgICB0aGlzLm5ldXJvbnNbbF0uZm9yRWFjaChuZXh0TmV1cm9uID0+IHsgbmV4dE5ldXJvbi5yZXNldE91dHB1dHMoKSB9KTtcblxuXG4gICAgICB0aGlzLm5ldXJvbnNbbCArIDFdLmZvckVhY2gobmV4dE5ldXJvbiA9PiB7IC8vIElmIHlvdSB3b25kZXIgd2h5IHRoaXMgY3ljbGVzIGFyZSBzd2l0Y2hlZCwgaXQncyBiZWNhdXNlIG9mIHRoZSBiaWFzXG4gICAgICAgIHRoaXMubmV1cm9uc1tsXS5mb3JFYWNoKGN1cnJOZXVyb24gPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbihjdXJyTmV1cm9uLCBuZXh0TmV1cm9uKVxuICAgICAgICAgIGN1cnJOZXVyb24uYWRkT3V0cHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICAgIG5leHROZXVyb24uYWRkSW5wdXQoY29ubmVjdGlvbik7XG4gICAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsXS5wdXNoKGNvbm5lY3Rpb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBBZGQgYmlhcyBuZXVyb24gdG8gZWFjaCBsYXllclxuICAgICAgICBjb25zdCBiaWFzQ29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKHRoaXMuYmlhc05ldXJvbiwgbmV4dE5ldXJvbik7XG4gICAgICAgIG5leHROZXVyb24uYWRkSW5wdXQoYmlhc0Nvbm5lY3Rpb24pO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xdLnB1c2goYmlhc0Nvbm5lY3Rpb24pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldE5ldXJvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV1cm9ucztcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb25uZWN0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBnZXRJbnB1dFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRTaXplO1xuICB9XG5cbiAgcHVibGljIGdldE91dHB1dFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMub3V0cHV0U2l6ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRMYXllckNudCgpIHtcbiAgICByZXR1cm4gdGhpcy5sYXllckNudDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRIaWRkZW5MYXllclNpemVzKCkge1xuICAgIHJldHVybiB0aGlzLmhpZGRlbkxheWVyU2l6ZXM7XG4gIH1cblxuICBwdWJsaWMgc2V0UmF0ZShuZXdSYXRlOiBudW1iZXIpIHtcbiAgICB0aGlzLnJhdGUgPSBuZXdSYXRlO1xuICB9XG5cbiAgcHVibGljIGdldEl0ZXJhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pdGVyQ250O1xuICB9XG5cbiAgcHVibGljIHNldFJlZ3VsYXJpemF0aW9uVHlwZShyZWdUeXBlOiBSZWd1bGFyaXphdGlvbnMpIHtcbiAgICB0aGlzLnJlZ1R5cGUgPSByZWdUeXBlO1xuICB9XG5cbiAgcHVibGljIHNldFJlZ3VsYXJpemF0aW9uUmF0ZShyYXRlOiBudW1iZXIpIHtcbiAgICB0aGlzLmxhbWJkYSA9IHJhdGU7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tIFwiLi9Db25uZWN0aW9uXCI7XG5pbXBvcnQgeyBTSUdNT0lEIH0gZnJvbSBcIi4vSGVscGVyT2JqZWN0c1wiO1xuXG5leHBvcnQgY2xhc3MgTmV1cm9uIHtcbiAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBhY3RpdmF0aW9uOiBudW1iZXI7XG4gIHByaXZhdGUgaW5wdXRzOiBDb25uZWN0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBvdXRwdXRzOiBDb25uZWN0aW9uW10gPSBbXTtcblxuICAvLyBUaGUgZGVyaXZhdGlvbiBvZiBDIHdpdGggcmVzcGVjdCB0byB6XG4gIHByaXZhdGUgc2lnbWE6IG51bWJlcjtcbiAgcHJpdmF0ZSBpc0lucHV0OiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaXNDYWxjdWxhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaXNCaWFzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBpc0JpYXMgPSBmYWxzZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pc0JpYXMgPSBpc0JpYXM7XG4gIH07XG5cbiAgcHVibGljIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJc0JpYXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNCaWFzO1xuICB9XG5cbiAgcHVibGljIHNldEFzSW5wdXROZXVyb24oYWN0aXZhdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy5pc0lucHV0ID0gdHJ1ZTtcbiAgICB0aGlzLmFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICAgIHRoaXMuaW5wdXRzID0gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbnB1dChhY3RpdmF0aW9uOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuaXNJbnB1dCkge1xuICAgICAgdGhyb3cgJ0Nhbm5vdCBzZXQgYWN0aXZhdGlvbiBvZiBub24taW5wdXQgbmV1cm9uJztcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICB9XG5cbiAgcHVibGljIHNldFNpZ21hKHNpZ21hOiBudW1iZXIpIHtcbiAgICB0aGlzLnNpZ21hID0gc2lnbWE7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5wdXQoaW5wdXQ6IENvbm5lY3Rpb24pIHtcbiAgICB0aGlzLmlucHV0cy5wdXNoKGlucHV0KTtcbiAgfTtcblxuICBwdWJsaWMgZ2V0SW5wdXRzKCk6IENvbm5lY3Rpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRzO1xuICB9XG5cbiAgcHVibGljIGFkZE91dHB1dChvdXRwdXQ6IENvbm5lY3Rpb24pIHtcbiAgICB0aGlzLm91dHB1dHMucHVzaChvdXRwdXQpO1xuICB9XG5cbiAgcHVibGljIGdldE91dHB1dHMoKTogQ29ubmVjdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5vdXRwdXRzO1xuICB9XG5cbiAgcHVibGljIHNldE91dHB1dHMoY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXSkge1xuICAgIHRoaXMub3V0cHV0cyA9IGNvbm5lY3Rpb25zO1xuICB9XG5cbiAgcHVibGljIHNldElucHV0cyhjb25uZWN0aW9uczogQ29ubmVjdGlvbltdKSB7XG4gICAgdGhpcy5pbnB1dHMgPSBjb25uZWN0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyByZXNldElucHV0cygpIHtcbiAgICB0aGlzLmlucHV0cyA9IFtdO1xuICB9XG5cbiAgcHVibGljIHJlc2V0T3V0cHV0cygpIHtcbiAgICB0aGlzLm91dHB1dHMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGdldEFjdGl2YXRpb24oKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5pc0JpYXMpIHRoaXMuYWN0aXZhdGlvbiA9IDE7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZhdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTaWdtYSgpIHtcbiAgICByZXR1cm4gdGhpcy5zaWdtYTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVBY3RpdmF0aW9uKCk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLmlzSW5wdXQgJiYgIXRoaXMuaXNDYWxjdWxhdGVkICYmICF0aGlzLmlzQmlhcykge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uID0gU0lHTU9JRC5vdXRwdXQodGhpcy5pbnB1dHMucmVkdWNlKChhY2MsIGN1cnJDb25uKSA9PiBhY2MgKyBjdXJyQ29ubi5jYWxjdWxhdGVWYWx1ZSgpLCAwKSk7XG4gICAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldEFjdGl2YXRpb24oKTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=