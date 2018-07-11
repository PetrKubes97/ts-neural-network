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
                const drawableNeuron = new DrawableNeuron(x, y, neuron.getActivation(), neuron.toString());
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
                    connection.getInputNeuron().toString();
                this.drawConnection(drawableNameMap.get(inputNName), drawableNameMap.get(connection.getOutputNeuron().toString()), connection.getWeight());
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


window.slide = (i, value) => {
    input[i] = value;
    neuralCore.evaluate(input);
    visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
};
window.addOrRemoveLayer = (add) => {
    neuralCore.addLayer(add);
    neuralCore.evaluate(input);
    updateUI();
    visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
};
window.addOrRemoveNeuron = (layer, add) => {
};
window.train = (iters) => {
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
let inputSize = 2;
let hiddenSizes = [3];
let outputSize = 2;
let layerControls;
let inputControls;
let layerCnt;
let cost;
const main = () => {
    const content = document.getElementById('content');
    inputControls = document.getElementById('input-controls');
    layerControls = document.getElementById('layer-controls');
    layerCnt = document.getElementById('layer-cnt');
    cost = document.getElementById('cost');
    visualizer = new _Visualizer__WEBPACK_IMPORTED_MODULE_0__["Visualizer"](content);
    initCore();
};
const initCore = () => {
    neuralCore = new _neuralNetwork_NeuralCore__WEBPACK_IMPORTED_MODULE_1__["NeuralCore"](inputSize, hiddenSizes, outputSize);
    neuralCore.addTrainingSet([1, 1], [1, 1]);
    neuralCore.addTrainingSet([1, 0], [0, 0]);
    neuralCore.addTrainingSet([0, 1], [0, 0]);
    neuralCore.addTrainingSet([0, 0], [0, 0]);
    // Set default values
    input = new Array(neuralCore.getInputSize());
    input.fill(1);
    neuralCore.evaluate(input);
    updateUI();
    visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
};
const updateUI = () => {
    let content = '<table>';
    content += `<tr><td align='right'>Input size:</td><td>
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(-1, false)">-</button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(-1, true)">+</button>
    </div></td></tr>`;
    for (let i = 0; i < neuralCore.getLayerCnt() - 2; i++) {
        content += `<tr><td align='right'>Hidden layer size:</td><td>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(${i}, false)">-</button>
        <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(${i}, true)">+</button>
      </div></td></tr>`;
    }
    content += `<tr><td align='right'>Output size:</td><td>
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(-2, false)">-</button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(-2, true)">+</button>
    </div></td></tr>`;
    content += '</table>';
    layerControls.innerHTML = content;
    inputControls.innerHTML = '';
    for (let i = 0; i < neuralCore.getInputSize(); i++) {
        inputControls.innerHTML += `Neuron ${i}: <input style="position: relative; top: 5px;" type="range" min="0" max="1" value="1" step="0.05" id="slider${i}" oninput="slide(${i}, this.value);"><br>`;
    }
    layerCnt.innerText = neuralCore.getLayerCnt().toString();
    cost.innerHTML = neuralCore.getCost().toString();
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

/***/ "./src/neuralNetwork/HelperClasses.ts":
/*!********************************************!*\
  !*** ./src/neuralNetwork/HelperClasses.ts ***!
  \********************************************/
/*! exports provided: Activations, TrainSample */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Activations", function() { return Activations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrainSample", function() { return TrainSample; });
class Activations {
}
Activations.SIGMOID = {
    output: (x) => 1 / (1 + Math.exp(-x)),
    der: (x) => {
        let output = Activations.SIGMOID.output(x);
        return output * (1 - output);
    }
};
class TrainSample {
    constructor(input, output) {
        this.input = input;
        this.output = output;
    }
}


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
/* harmony import */ var _HelperClasses__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HelperClasses */ "./src/neuralNetwork/HelperClasses.ts");



class NeuralCore {
    constructor(inputSize, hiddenLayerSizes, outputSize) {
        this.rate = 1;
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
        this.trainSamples.push(new _HelperClasses__WEBPACK_IMPORTED_MODULE_2__["TrainSample"](input, output));
    }
    getCost() {
        const costSum = this.trainSamples.reduce((costSum, sample) => {
            this.evaluate(sample.input);
            return costSum + this.neurons[this.layerCnt - 1].reduce((acc, neuron, i) => {
                return acc + Math.pow((neuron.getActivation() - sample.output[i]), 2);
            }, 0);
        }, 0);
        return 1 / 2 * costSum * (1 / this.trainSamples.length);
    }
    train() {
        this.trainSamples.forEach((sample) => {
            this.evaluate(sample.input);
            // Calculate sigmas of the last layer
            this.neurons[this.layerCnt - 1].forEach((neuron, idx) => {
                const newSigma = (sample.output[idx] - neuron.getActivation()) * _HelperClasses__WEBPACK_IMPORTED_MODULE_2__["Activations"].SIGMOID.der(neuron.getActivation());
                neuron.setSigma(newSigma);
            });
            // Calculate sigmas for each neuron in the lower layers
            for (let l = this.layerCnt - 2; l >= 0; l--) {
                this.neurons[l].forEach((neuron) => {
                    const newSigma = neuron.getOutputs().reduce((acc, connection) => {
                        return acc + connection.getOutputNeuron().getSigma() * connection.getWeight();
                    }, 0) * _HelperClasses__WEBPACK_IMPORTED_MODULE_2__["Activations"].SIGMOID.der(neuron.getActivation());
                    neuron.setSigma(newSigma);
                });
            }
            // Accumulate all weight updates
            this.connections.forEach((connLayer) => {
                connLayer.forEach((connection) => {
                    const weightChange = connection.getOutputNeuron().getSigma() *
                        connection.getInputNeuron().getActivation() *
                        this.rate;
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
    }
    addLayer(add) {
        if (add) {
            const newLayerSize = 3;
            this.hiddenLayerSizes.push(newLayerSize);
            this.layerCnt++;
            // Create the new neurons
            this.neurons[this.layerCnt - 2] = [];
            for (let i = 0; i < newLayerSize; i++) {
                this.neurons[this.layerCnt - 2][i] = new _Neuron__WEBPACK_IMPORTED_MODULE_0__["Neuron"](`Neuron${this.layerCnt - 2}${i}`);
            }
            // Recreate the last layer
            this.neurons[this.layerCnt - 1] = [];
            for (let i = 0; i < this.outputSize; i++) {
                this.neurons[this.layerCnt - 1][i] = new _Neuron__WEBPACK_IMPORTED_MODULE_0__["Neuron"](`Neuron${this.layerCnt - 1}${i}`);
            }
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
            this.neurons[this.layerCnt - 1] = [];
            for (let i = 0; i < this.outputSize; i++) {
                this.neurons[this.layerCnt - 1][i] = new _Neuron__WEBPACK_IMPORTED_MODULE_0__["Neuron"](`Neuron${this.layerCnt - 1}${i}`);
            }
            // Recreate all necessary connections
            this.createConnections(this.layerCnt - 2, this.layerCnt - 1);
        }
    }
    reset() {
        this.createConnections(0, this.layerCnt - 1);
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
    getLayerCnt() {
        return this.layerCnt;
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
/* harmony import */ var _HelperClasses__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HelperClasses */ "./src/neuralNetwork/HelperClasses.ts");

class Neuron {
    constructor(name, isBias = false) {
        this.isInput = false;
        this.isCalculated = false;
        this.isBias = false;
        this.name = name;
        this.isBias = isBias;
    }
    ;
    toString() {
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
    addOutput(output) {
        this.outputs.push(output);
    }
    getOutputs() {
        return this.outputs;
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
            this.activation = _HelperClasses__WEBPACK_IMPORTED_MODULE_0__["Activations"].SIGMOID.output(this.inputs.reduce((acc, currConn) => acc + currConn.calculateValue(), 0));
            this.isCalculated = true;
        }
        return this.getActivation();
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Zpc3VhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL0Nvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25ldXJhbE5ldHdvcmsvSGVscGVyQ2xhc3Nlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV1cmFsTmV0d29yay9OZXVyYWxDb3JlLnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL05ldXJvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0VNO0lBT0osWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxHQUFHLEtBQUs7UUFDaEQsSUFB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QUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDOUIsQ0FBQztDQUNGIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IE5ldXJvbiB9IGZyb20gXCIuL25ldXJhbE5ldHdvcmsvTmV1cm9uXCI7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSBcIi4vbmV1cmFsTmV0d29yay9Db25uZWN0aW9uXCI7XG5cbmV4cG9ydCBjbGFzcyBEcmF3YWJsZU5ldXJvbiB7XG4gIHB1YmxpYyB4OiBudW1iZXI7XG4gIHB1YmxpYyB5OiBudW1iZXI7XG4gIHB1YmxpYyBhY3RpdmF0aW9uOiBudW1iZXI7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBpc0JpYXM6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoeCwgeSwgYWN0aXZhdGlvbiwgbmFtZSwgaXNCaWFzID0gZmFsc2UpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5hY3RpdmF0aW9uID0gYWN0aXZhdGlvbjtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaXNCaWFzID0gaXNCaWFzO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaXN1YWxpemVyIHtcblxuICBwcml2YXRlIGNvbnRlbnQ6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoY29udGVudDogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIHRoaXMuY3R4ID0gY29udGVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuaGVpZ2h0ID0gY29udGVudC5oZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IGNvbnRlbnQud2lkdGg7XG4gIH1cblxuICBwdWJsaWMgZHJhdyhuZXVyb25zOiBOZXVyb25bXVtdLCBjb25uZWN0aW9uczogQ29ubmVjdGlvbltdW10pIHtcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIFxuICAgIGNvbnN0IGRyYXdhYmxlTmV1cm9uczogRHJhd2FibGVOZXVyb25bXSA9IFtdO1xuICAgIGNvbnN0IGxlZnRNYXJnaW4gPSB0aGlzLndpZHRoIC8gKG5ldXJvbnMubGVuZ3RoICsgMSk7XG5cbiAgICAvLyBOZXVyb25zXG4gICAgbmV1cm9ucy5mb3JFYWNoKChsYXllciwgbElkeCkgPT4ge1xuICAgICAgY29uc3QgdG9wTWFyZ2luID0gdGhpcy5oZWlnaHQgLyAobGF5ZXIubGVuZ3RoICsgMik7XG4gICAgICBsYXllci5mb3JFYWNoKChuZXVyb24sIG5JZHgpID0+IHtcbiAgICAgICAgY29uc3QgeCA9IGxlZnRNYXJnaW4gKiAoMSArIGxJZHgpO1xuICAgICAgICBjb25zdCB5ID0gdG9wTWFyZ2luICogKDEgKyBuSWR4KTtcblxuICAgICAgICBjb25zdCBkcmF3YWJsZU5ldXJvbiA9IG5ldyBEcmF3YWJsZU5ldXJvbih4LCB5LCBuZXVyb24uZ2V0QWN0aXZhdGlvbigpLCBuZXVyb24udG9TdHJpbmcoKSk7XG4gICAgICAgIGRyYXdhYmxlTmV1cm9ucy5wdXNoKGRyYXdhYmxlTmV1cm9uKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAobElkeCAhPSBuZXVyb25zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgY29uc3QgeCA9IGxlZnRNYXJnaW4gKiAoMSArIGxJZHgpO1xuICAgICAgICBjb25zdCB5ID0gdG9wTWFyZ2luICogKDEgKyBuZXVyb25zW2xJZHhdLmxlbmd0aCk7XG5cbiAgICAgICAgY29uc3QgZHJhd2FibGVOZXVyb24gPSBuZXcgRHJhd2FibGVOZXVyb24oeCwgeSwgMSwgYGJpYXMke2xJZHh9YCwgdHJ1ZSk7XG4gICAgICAgIGRyYXdhYmxlTmV1cm9ucy5wdXNoKGRyYXdhYmxlTmV1cm9uKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENvbm5lY3Rpb25zXG4gICAgY29uc3QgZHJhd2FibGVOYW1lTWFwID0gbmV3IE1hcDxzdHJpbmcsIERyYXdhYmxlTmV1cm9uPigpO1xuICAgIGRyYXdhYmxlTmV1cm9ucy5mb3JFYWNoKFxuICAgICAgKGRyYXdhYmxlTmV1cm9uKSA9PiBkcmF3YWJsZU5hbWVNYXAuc2V0KGRyYXdhYmxlTmV1cm9uLm5hbWUsIGRyYXdhYmxlTmV1cm9uKS8vIFdURiwgSSB3YXMgbm90IGFibGUgdG8gY3JlYXRlIG1hcCBmcm9tIDJkIGFyclxuICAgICk7XG5cbiAgICBjb25uZWN0aW9ucy5mb3JFYWNoKChsYXllciwgbElkeCkgPT4ge1xuICAgICAgbGF5ZXIuZm9yRWFjaCgoY29ubmVjdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dE5OYW1lID1cbiAgICAgICAgICAoY29ubmVjdGlvbi5nZXRJbnB1dE5ldXJvbigpLmdldElzQmlhcygpKSA/XG4gICAgICAgICAgICBgYmlhcyR7bElkeH1gIDpcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS50b1N0cmluZygpO1xuXG4gICAgICAgIHRoaXMuZHJhd0Nvbm5lY3Rpb24oXG4gICAgICAgICAgZHJhd2FibGVOYW1lTWFwLmdldChpbnB1dE5OYW1lKSxcbiAgICAgICAgICBkcmF3YWJsZU5hbWVNYXAuZ2V0KGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkudG9TdHJpbmcoKSksXG4gICAgICAgICAgY29ubmVjdGlvbi5nZXRXZWlnaHQoKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkcmF3YWJsZU5ldXJvbnMuZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICB0aGlzLmRyYXdOZXVyb24obmV1cm9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd05ldXJvbihkcmF3YWJsZU5ldXJvbjogRHJhd2FibGVOZXVyb24pIHtcbiAgICAvLyB3aGl0ZSBiYWNrZ3JvdW5kXG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguYXJjKGRyYXdhYmxlTmV1cm9uLngsIGRyYXdhYmxlTmV1cm9uLnksIDI1LCAwLCAyICogTWF0aC5QSSk7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYigyNTUsMjU1LDI1NSlgO1xuICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICBcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICBpZiAoZHJhd2FibGVOZXVyb24uaXNCaWFzKVxuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYmEoNDYsNDAsNDIsIDEpYDtcbiAgICBlbHNlXG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBgcmdiYSgyMywgMTkwLCAxODcsICR7ZHJhd2FibGVOZXVyb24uYWN0aXZhdGlvbn0pYDtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGByZ2IoNDYsNDAsNDIsIDEpYFxuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgdGhpcy5jdHguYXJjKGRyYXdhYmxlTmV1cm9uLngsIGRyYXdhYmxlTmV1cm9uLnksIDI1LCAwLCAyICogTWF0aC5QSSk7XG4gICAgdGhpcy5jdHguZmlsbCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuXG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYig0Niw0MCw0MiwgMSlgXG4gICAgY29uc3QgaGVpZ2h0ID0gMTY7XG4gICAgdGhpcy5jdHguZm9udCA9IGBib2xkICR7aGVpZ2h0fXB4IHNlcmlmYDtcbiAgICBjb25zdCB0ZXh0ID0gTnVtYmVyKGRyYXdhYmxlTmV1cm9uLmFjdGl2YXRpb24pLnRvRml4ZWQoMik7XG4gICAgdGhpcy5jdHguZmlsbFRleHQoXG4gICAgICB0ZXh0LCBcbiAgICAgIGRyYXdhYmxlTmV1cm9uLnggLSB0aGlzLmN0eC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aCAvIDIsIFxuICAgICAgZHJhd2FibGVOZXVyb24ueSArIGhlaWdodCAvIDMpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3Q29ubmVjdGlvbihpbnB1dE5ldXJvbjogRHJhd2FibGVOZXVyb24sIG91dHB1dE5ldXJvbjogRHJhd2FibGVOZXVyb24sIHdlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHgubGluZVdpZHRoID0gKHdlaWdodCA+IDApID8gXG4gICAgICBNYXRoLmxvZyh3ZWlnaHQpIDpcbiAgICAgIE1hdGgubG9nKC13ZWlnaHQpO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gKHdlaWdodCA+IDApID9cbiAgICAgIGByZ2JhKDIwNSwgODMsIDUyLCAke3dlaWdodH0pYCA6XG4gICAgICBgcmdiYSg2MSwgMjMyLCAyNTUsICR7d2VpZ2h0ICogLTF9KWA7XG4gICAgdGhpcy5jdHgubW92ZVRvKGlucHV0TmV1cm9uLngsIGlucHV0TmV1cm9uLnkpO1xuICAgIHRoaXMuY3R4LmxpbmVUbyhvdXRwdXROZXVyb24ueCwgb3V0cHV0TmV1cm9uLnkpO1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWaXN1YWxpemVyIH0gZnJvbSAnLi9WaXN1YWxpemVyJztcbmltcG9ydCB7IE5ldXJhbENvcmUgfSBmcm9tICcuL25ldXJhbE5ldHdvcmsvTmV1cmFsQ29yZSc7XG5cbih3aW5kb3cgYXMgYW55KS5zbGlkZSA9IChpOiBudW1iZXIsIHZhbHVlOiBudW1iZXIpID0+IHtcbiAgaW5wdXRbaV0gPSB2YWx1ZTtcbiAgbmV1cmFsQ29yZS5ldmFsdWF0ZShpbnB1dCk7XG4gIHZpc3VhbGl6ZXIuZHJhdyhuZXVyYWxDb3JlLmdldE5ldXJvbnMoKSwgbmV1cmFsQ29yZS5nZXRDb25uZWN0aW9ucygpKTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLmFkZE9yUmVtb3ZlTGF5ZXIgPSAoYWRkOiBib29sZWFuKSA9PiB7XG4gIG5ldXJhbENvcmUuYWRkTGF5ZXIoYWRkKTtcbiAgbmV1cmFsQ29yZS5ldmFsdWF0ZShpbnB1dCk7XG5cbiAgdXBkYXRlVUkoKTtcbiAgdmlzdWFsaXplci5kcmF3KG5ldXJhbENvcmUuZ2V0TmV1cm9ucygpLCBuZXVyYWxDb3JlLmdldENvbm5lY3Rpb25zKCkpO1xufVxuXG4od2luZG93IGFzIGFueSkuYWRkT3JSZW1vdmVOZXVyb24gPSAobGF5ZXI6IG51bWJlciwgYWRkOiBib29sZWFuKSA9PiB7XG5cbn1cblxuKHdpbmRvdyBhcyBhbnkpLnRyYWluID0gKGl0ZXJzOiBudW1iZXIpID0+IHtcbiAgZm9yIChsZXQgaT0wO2k8aXRlcnM7aSsrKSB7XG4gICAgbmV1cmFsQ29yZS50cmFpbigpO1xuICB9XG5cbiAgbmV1cmFsQ29yZS5ldmFsdWF0ZShpbnB1dCk7XG4gIHVwZGF0ZVVJKCk7XG4gIHZpc3VhbGl6ZXIuZHJhdyhuZXVyYWxDb3JlLmdldE5ldXJvbnMoKSwgbmV1cmFsQ29yZS5nZXRDb25uZWN0aW9ucygpKTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLnJlc2V0ID0gKCkgPT4ge1xuICBuZXVyYWxDb3JlLnJlc2V0KCk7XG4gIG5ldXJhbENvcmUuZXZhbHVhdGUoaW5wdXQpO1xuICB1cGRhdGVVSSgpO1xuICB2aXN1YWxpemVyLmRyYXcobmV1cmFsQ29yZS5nZXROZXVyb25zKCksIG5ldXJhbENvcmUuZ2V0Q29ubmVjdGlvbnMoKSk7XG59XG5cblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgbWFpbigpO1xufTtcblxubGV0IG5ldXJhbENvcmU6IE5ldXJhbENvcmU7XG5sZXQgdmlzdWFsaXplcjogVmlzdWFsaXplcjtcbmxldCBpbnB1dDogbnVtYmVyW107XG5cblxubGV0IGlucHV0U2l6ZSA9IDI7XG5sZXQgaGlkZGVuU2l6ZXMgPSBbM107XG5sZXQgb3V0cHV0U2l6ZSA9IDI7XG5sZXQgbGF5ZXJDb250cm9sczogSFRNTEVsZW1lbnQ7XG5sZXQgaW5wdXRDb250cm9sczogSFRNTEVsZW1lbnQ7XG5cbmxldCBsYXllckNudDogSFRNTEVsZW1lbnQ7XG5sZXQgY29zdDogSFRNTEVsZW1lbnQ7XG5cbmNvbnN0IG1haW4gPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRlbnQ6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgaW5wdXRDb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC1jb250cm9scycpO1xuICBsYXllckNvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xheWVyLWNvbnRyb2xzJyk7XG4gIGxheWVyQ250ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xheWVyLWNudCcpO1xuICBjb3N0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvc3QnKTtcblxuICB2aXN1YWxpemVyID0gbmV3IFZpc3VhbGl6ZXIoY29udGVudCk7XG5cbiAgaW5pdENvcmUoKTtcbn1cblxuY29uc3QgaW5pdENvcmUgPSAoKSA9PiB7XG4gIG5ldXJhbENvcmUgPSBuZXcgTmV1cmFsQ29yZShpbnB1dFNpemUsIGhpZGRlblNpemVzLCBvdXRwdXRTaXplKTtcblxuICBuZXVyYWxDb3JlLmFkZFRyYWluaW5nU2V0KFsxLDFdLCBbMSwxXSk7XG4gIG5ldXJhbENvcmUuYWRkVHJhaW5pbmdTZXQoWzEsMF0sIFswLDBdKTtcbiAgbmV1cmFsQ29yZS5hZGRUcmFpbmluZ1NldChbMCwxXSwgWzAsMF0pO1xuICBuZXVyYWxDb3JlLmFkZFRyYWluaW5nU2V0KFswLDBdLCBbMCwwXSk7XG5cbiAgLy8gU2V0IGRlZmF1bHQgdmFsdWVzXG4gIGlucHV0ID0gbmV3IEFycmF5KG5ldXJhbENvcmUuZ2V0SW5wdXRTaXplKCkpO1xuICBpbnB1dC5maWxsKDEpO1xuXG4gIG5ldXJhbENvcmUuZXZhbHVhdGUoaW5wdXQpO1xuICB1cGRhdGVVSSgpO1xuICB2aXN1YWxpemVyLmRyYXcobmV1cmFsQ29yZS5nZXROZXVyb25zKCksIG5ldXJhbENvcmUuZ2V0Q29ubmVjdGlvbnMoKSk7XG59XG5cbmNvbnN0IHVwZGF0ZVVJID0gKCkgPT4ge1xuICBsZXQgY29udGVudCA9ICc8dGFibGU+JztcbiAgY29udGVudCArPSBgPHRyPjx0ZCBhbGlnbj0ncmlnaHQnPklucHV0IHNpemU6PC90ZD48dGQ+XG4gICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIHJvbGU9XCJncm91cFwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc21cIiBvbmNsaWNrPVwiYWRkT3JSZW1vdmVOZXVyb24oLTEsIGZhbHNlKVwiPi08L2J1dHRvbj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCIgb25jbGljaz1cImFkZE9yUmVtb3ZlTmV1cm9uKC0xLCB0cnVlKVwiPis8L2J1dHRvbj5cbiAgICA8L2Rpdj48L3RkPjwvdHI+YDtcbiAgXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmV1cmFsQ29yZS5nZXRMYXllckNudCgpIC0gMjsgaSsrKSB7XG4gICAgY29udGVudCArPSBgPHRyPjx0ZCBhbGlnbj0ncmlnaHQnPkhpZGRlbiBsYXllciBzaXplOjwvdGQ+PHRkPlxuICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIHJvbGU9XCJncm91cFwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiIG9uY2xpY2s9XCJhZGRPclJlbW92ZU5ldXJvbigke2l9LCBmYWxzZSlcIj4tPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCIgb25jbGljaz1cImFkZE9yUmVtb3ZlTmV1cm9uKCR7aX0sIHRydWUpXCI+KzwvYnV0dG9uPlxuICAgICAgPC9kaXY+PC90ZD48L3RyPmA7XG4gIH1cbiAgY29udGVudCArPSBgPHRyPjx0ZCBhbGlnbj0ncmlnaHQnPk91dHB1dCBzaXplOjwvdGQ+PHRkPlxuICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCIgb25jbGljaz1cImFkZE9yUmVtb3ZlTmV1cm9uKC0yLCBmYWxzZSlcIj4tPC9idXR0b24+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiIG9uY2xpY2s9XCJhZGRPclJlbW92ZU5ldXJvbigtMiwgdHJ1ZSlcIj4rPC9idXR0b24+XG4gICAgPC9kaXY+PC90ZD48L3RyPmA7XG4gIGNvbnRlbnQgKz0gJzwvdGFibGU+JztcblxuICBsYXllckNvbnRyb2xzLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgaW5wdXRDb250cm9scy5pbm5lckhUTUwgPSAnJztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXVyYWxDb3JlLmdldElucHV0U2l6ZSgpOyBpKyspIHtcbiAgICBpbnB1dENvbnRyb2xzLmlubmVySFRNTCArPSBgTmV1cm9uICR7aX06IDxpbnB1dCBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTsgdG9wOiA1cHg7XCIgdHlwZT1cInJhbmdlXCIgbWluPVwiMFwiIG1heD1cIjFcIiB2YWx1ZT1cIjFcIiBzdGVwPVwiMC4wNVwiIGlkPVwic2xpZGVyJHtpfVwiIG9uaW5wdXQ9XCJzbGlkZSgke2l9LCB0aGlzLnZhbHVlKTtcIj48YnI+YDtcbiAgfVxuXG4gIGxheWVyQ250LmlubmVyVGV4dCA9IG5ldXJhbENvcmUuZ2V0TGF5ZXJDbnQoKS50b1N0cmluZygpO1xuICBjb3N0LmlubmVySFRNTCA9IG5ldXJhbENvcmUuZ2V0Q29zdCgpLnRvU3RyaW5nKCk7XG59IiwiaW1wb3J0IHsgTmV1cm9uIH0gZnJvbSBcIi4vTmV1cm9uXCI7XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uIHtcbiAgcHJpdmF0ZSB3ZWlnaHQ6IG51bWJlciA9IE1hdGgucmFuZG9tKCkgKiAxMCAtIDU7XG4gIHByaXZhdGUgaW5wdXROZXVyb246IE5ldXJvbjtcbiAgcHJpdmF0ZSBvdXRwdXROZXVyb246IE5ldXJvbjtcbiAgcHJpdmF0ZSBzYW1wbGVXZWlnaHRDaGFuZ2VzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGlucHV0OiBOZXVyb24sIG91dHB1dDogTmV1cm9uKSB7XG4gICAgdGhpcy5pbnB1dE5ldXJvbiA9IGlucHV0O1xuICAgIHRoaXMub3V0cHV0TmV1cm9uID0gb3V0cHV0O1xuICB9XG5cbiAgcHVibGljIGFkZFNhbXBsZVdlaWdodENoYW5nZSh3ZWlnaHRDaGFuZ2U6IG51bWJlcikge1xuICAgIHRoaXMuc2FtcGxlV2VpZ2h0Q2hhbmdlcy5wdXNoKHdlaWdodENoYW5nZSk7XG4gIH1cblxuICBwdWJsaWMgYXBwbHlBdmVyYWdlV2VpZ2h0Q2hhbmdlKCkge1xuICAgIGNvbnN0IGNoYW5nZSA9ICh0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjICsgdmFsLCAwKSAvIHRoaXMuc2FtcGxlV2VpZ2h0Q2hhbmdlcy5sZW5ndGgpO1xuICAgIHRoaXMud2VpZ2h0ICs9IGNoYW5nZTtcbiAgICB0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRXZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMud2VpZ2h0O1xuICB9XG5cbiAgcHVibGljIGNhbGN1bGF0ZVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLndlaWdodCAqIHRoaXMuaW5wdXROZXVyb24uY2FsY3VsYXRlQWN0aXZhdGlvbigpO1xuICB9XG5cbiAgcHVibGljIGdldE91dHB1dE5ldXJvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vdXRwdXROZXVyb247XG4gIH1cblxuICBwdWJsaWMgZ2V0SW5wdXROZXVyb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXROZXVyb247XG4gIH1cbn0iLCJleHBvcnQgY2xhc3MgQWN0aXZhdGlvbnMge1xuICBwdWJsaWMgc3RhdGljIFNJR01PSUQgPSB7XG4gICAgb3V0cHV0OiAoeDogbnVtYmVyKTogbnVtYmVyID0+IDEgLyAoMSArIE1hdGguZXhwKC14KSksXG4gICAgZGVyOiAoeDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICAgIGxldCBvdXRwdXQgPSBBY3RpdmF0aW9ucy5TSUdNT0lELm91dHB1dCh4KTtcbiAgICAgIHJldHVybiBvdXRwdXQgKiAoMSAtIG91dHB1dCk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgVHJhaW5TYW1wbGUge1xuICBwdWJsaWMgaW5wdXQ6IG51bWJlcltdO1xuICBwdWJsaWMgb3V0cHV0OiBudW1iZXJbXTtcblxuICBjb25zdHJ1Y3RvcihpbnB1dDogbnVtYmVyW10sIG91dHB1dDogbnVtYmVyW10pIHtcbiAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgdGhpcy5vdXRwdXQgPSBvdXRwdXQ7XG4gIH1cbn0iLCJpbXBvcnQgeyBOZXVyb24gfSBmcm9tIFwiLi9OZXVyb25cIjtcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tIFwiLi9Db25uZWN0aW9uXCI7XG5pbXBvcnQgeyBUcmFpblNhbXBsZSwgQWN0aXZhdGlvbnMgfSBmcm9tIFwiLi9IZWxwZXJDbGFzc2VzXCI7XG5cbmV4cG9ydCBjbGFzcyBOZXVyYWxDb3JlIHtcbiAgcHJpdmF0ZSBpbnB1dFNpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSBoaWRkZW5MYXllclNpemVzOiBudW1iZXJbXTtcbiAgcHJpdmF0ZSBvdXRwdXRTaXplOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBsYXllckNudDogbnVtYmVyO1xuXG4gIHByaXZhdGUgcmF0ZSA9IDE7XG5cbiAgcHJpdmF0ZSBiaWFzTmV1cm9uID0gbmV3IE5ldXJvbignYmlhcycsIHRydWUpO1xuICBwcml2YXRlIG5ldXJvbnM6IE5ldXJvbltdW10gPSBbXTtcbiAgcHJpdmF0ZSBjb25uZWN0aW9uczogQ29ubmVjdGlvbltdW10gPSBbXTtcblxuICBwcml2YXRlIHRyYWluU2FtcGxlczogVHJhaW5TYW1wbGVbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGlucHV0U2l6ZTogbnVtYmVyLCBoaWRkZW5MYXllclNpemVzOiBudW1iZXJbXSwgb3V0cHV0U2l6ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5pbnB1dFNpemUgPSBpbnB1dFNpemU7XG4gICAgdGhpcy5oaWRkZW5MYXllclNpemVzID0gaGlkZGVuTGF5ZXJTaXplcztcbiAgICB0aGlzLm91dHB1dFNpemUgPSBvdXRwdXRTaXplO1xuICAgIHRoaXMubGF5ZXJDbnQgPSBoaWRkZW5MYXllclNpemVzLmxlbmd0aCArIDI7XG5cbiAgICAvLyBSZXNldFxuICAgIHRoaXMubmV1cm9ucyA9IFtdO1xuICAgIHRoaXMuY29ubmVjdGlvbnMgPSBbXTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIC8vIENyZWF0ZSB0aGUgbmV1cm9uc1xuICAgIGZvciAobGV0IGwgPSAwOyBsIDwgdGhpcy5sYXllckNudDsgbCsrKSB7XG4gICAgICAvLyBIb3cgbWFueSBuZXVyb25zIGFyZSBpbiBlYWNoIGxheWVyP1xuICAgICAgbGV0IG5ldXJvbnNJbkxheWVyQ250ID0gMDtcbiAgICAgIHN3aXRjaCAobCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgbmV1cm9uc0luTGF5ZXJDbnQgPSB0aGlzLmlucHV0U2l6ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0aGlzLmhpZGRlbkxheWVyU2l6ZXMubGVuZ3RoICsgMTpcbiAgICAgICAgICBuZXVyb25zSW5MYXllckNudCA9IHRoaXMub3V0cHV0U2l6ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBuZXVyb25zSW5MYXllckNudCA9IHRoaXMuaGlkZGVuTGF5ZXJTaXplc1tsIC0gMV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubmV1cm9uc1tsXSA9IFtdO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlbVxuICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBuZXVyb25zSW5MYXllckNudDsgbisrKSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsXVtuXSA9IG5ldyBOZXVyb24oYE5ldXJvbiR7bH0ke259YCk7XG4gICAgICAgIGlmIChsID09IDApIHtcbiAgICAgICAgICB0aGlzLm5ldXJvbnNbbF1bbl0uc2V0QXNJbnB1dE5ldXJvbigwKTsgLy8ganVzdCB0byBhdm9pZCBjcmFzaGVzLCB0aGUgMCBzaG91bGQgYmUgb3ZlcnJpZGVuIGxhdGVyIFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHRoZSBDb25uZWN0aW9uc1xuICAgIHRoaXMuY3JlYXRlQ29ubmVjdGlvbnMoMCwgdGhpcy5sYXllckNudCAtIDEpO1xuICB9XG5cbiAgcHVibGljIGV2YWx1YXRlKGlucHV0OiBudW1iZXJbXSk6IG51bWJlcltdIHtcbiAgICBpZiAoaW5wdXQubGVuZ3RoICE9IHRoaXMuaW5wdXRTaXplKSB7XG4gICAgICB0aHJvdyAnSW5wdXQgc2l6ZSBkb2VzIG5vdCBtYXRjaCc7XG4gICAgfVxuICAgIC8vIFJlc2V0LCBzbyBlYWNoIG5ldXJvbiBpcyByZWNhbGN1bGF0ZWRcbiAgICB0aGlzLm5ldXJvbnMuZm9yRWFjaChsYXllciA9PiB7IGxheWVyLmZvckVhY2gobmV1cm9uID0+IG5ldXJvbi5yZXNldCgpKSB9KVxuICAgIC8vIFNldCBpbnB1dCBsYXllclxuICAgIHRoaXMubmV1cm9uc1swXS5mb3JFYWNoKChuZXVyb24sIGlkeCkgPT4geyBuZXVyb24uc2V0SW5wdXQoaW5wdXRbaWR4XSkgfSk7XG5cbiAgICB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLmZvckVhY2gobmV1cm9uID0+IHtcbiAgICAgIG5ldXJvbi5jYWxjdWxhdGVBY3RpdmF0aW9uKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5tYXAobmV1cm9uID0+IG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkpO1xuICB9XG5cbiAgcHVibGljIGFkZFRyYWluaW5nU2V0KGlucHV0OiBudW1iZXJbXSwgb3V0cHV0OiBudW1iZXJbXSkge1xuICAgIHRoaXMudHJhaW5TYW1wbGVzLnB1c2gobmV3IFRyYWluU2FtcGxlKGlucHV0LCBvdXRwdXQpKVxuICB9XG5cbiAgcHVibGljIGdldENvc3QoKTogbnVtYmVyIHtcbiAgICBjb25zdCBjb3N0U3VtID0gdGhpcy50cmFpblNhbXBsZXMucmVkdWNlKChjb3N0U3VtLCBzYW1wbGUpID0+IHsgLy8gQWRkIHVwIGFsbCBzYW1wbGVzXG4gICAgICB0aGlzLmV2YWx1YXRlKHNhbXBsZS5pbnB1dCk7XG4gICAgICByZXR1cm4gY29zdFN1bSArIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250IC0gMV0ucmVkdWNlKChhY2MsIG5ldXJvbiwgaSkgPT4geyAvLyBBZGQgdXAgYWxsIG91dHB1dCBuZXVyb25zXG4gICAgICAgIHJldHVybiBhY2MgKyAobmV1cm9uLmdldEFjdGl2YXRpb24oKSAtIHNhbXBsZS5vdXRwdXRbaV0pICoqIDI7XG4gICAgICB9LCAwKTtcbiAgICB9LCAwKTtcblxuICAgIHJldHVybiAxIC8gMiAqIGNvc3RTdW0gKiAoMSAvIHRoaXMudHJhaW5TYW1wbGVzLmxlbmd0aCk7XG4gIH1cblxuICBwdWJsaWMgdHJhaW4oKSB7XG4gICAgdGhpcy50cmFpblNhbXBsZXMuZm9yRWFjaCgoc2FtcGxlKSA9PiB7XG4gICAgICB0aGlzLmV2YWx1YXRlKHNhbXBsZS5pbnB1dClcblxuICAgICAgLy8gQ2FsY3VsYXRlIHNpZ21hcyBvZiB0aGUgbGFzdCBsYXllclxuICAgICAgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5mb3JFYWNoKChuZXVyb24sIGlkeCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdTaWdtYSA9XG4gICAgICAgICAgKHNhbXBsZS5vdXRwdXRbaWR4XSAtIG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkpICogQWN0aXZhdGlvbnMuU0lHTU9JRC5kZXIobmV1cm9uLmdldEFjdGl2YXRpb24oKSk7XG5cbiAgICAgICAgbmV1cm9uLnNldFNpZ21hKG5ld1NpZ21hKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBDYWxjdWxhdGUgc2lnbWFzIGZvciBlYWNoIG5ldXJvbiBpbiB0aGUgbG93ZXIgbGF5ZXJzXG4gICAgICBmb3IgKGxldCBsID0gdGhpcy5sYXllckNudCAtIDI7IGwgPj0gMDsgbC0tKSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsXS5mb3JFYWNoKChuZXVyb24pID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdTaWdtYSA9XG4gICAgICAgICAgICBuZXVyb24uZ2V0T3V0cHV0cygpLnJlZHVjZSgoYWNjLCBjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBhY2MgKyBjb25uZWN0aW9uLmdldE91dHB1dE5ldXJvbigpLmdldFNpZ21hKCkgKiBjb25uZWN0aW9uLmdldFdlaWdodCgpO1xuICAgICAgICAgICAgfSwgMCkgKiBBY3RpdmF0aW9ucy5TSUdNT0lELmRlcihuZXVyb24uZ2V0QWN0aXZhdGlvbigpKTtcbiAgICAgICAgICBuZXVyb24uc2V0U2lnbWEobmV3U2lnbWEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gQWNjdW11bGF0ZSBhbGwgd2VpZ2h0IHVwZGF0ZXNcbiAgICAgIHRoaXMuY29ubmVjdGlvbnMuZm9yRWFjaCgoY29ubkxheWVyKSA9PiB7XG4gICAgICAgIGNvbm5MYXllci5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgY29uc3Qgd2VpZ2h0Q2hhbmdlID1cbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0U2lnbWEoKSAqXG4gICAgICAgICAgICBjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0QWN0aXZhdGlvbigpICpcbiAgICAgICAgICAgIHRoaXMucmF0ZTtcblxuICAgICAgICAgIGNvbm5lY3Rpb24uYWRkU2FtcGxlV2VpZ2h0Q2hhbmdlKHdlaWdodENoYW5nZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBVZmYsIGxldCdzIGhvcGUgZXZlcnl0aGluZyB3b3JrcyBhbmQgYXBwbHkgdGhlIG1hZ2ljXG4gICAgdGhpcy5jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uTGF5ZXIpID0+IHtcbiAgICAgIGNvbm5MYXllci5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbm5lY3Rpb24uYXBwbHlBdmVyYWdlV2VpZ2h0Q2hhbmdlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRMYXllcihhZGQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoYWRkKSB7XG4gICAgICBjb25zdCBuZXdMYXllclNpemUgPSAzO1xuICAgICAgdGhpcy5oaWRkZW5MYXllclNpemVzLnB1c2gobmV3TGF5ZXJTaXplKTtcbiAgICAgIHRoaXMubGF5ZXJDbnQrKztcblxuICAgICAgLy8gQ3JlYXRlIHRoZSBuZXcgbmV1cm9uc1xuICAgICAgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAyXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdMYXllclNpemU7IGkrKykge1xuICAgICAgICB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDJdW2ldID0gbmV3IE5ldXJvbihgTmV1cm9uJHt0aGlzLmxheWVyQ250IC0gMn0ke2l9YCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlY3JlYXRlIHRoZSBsYXN0IGxheWVyXG4gICAgICB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3V0cHV0U2l6ZTsgaSsrKSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250IC0gMV1baV0gPSBuZXcgTmV1cm9uKGBOZXVyb24ke3RoaXMubGF5ZXJDbnQgLSAxfSR7aX1gKTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVjcmVhdGUgYWxsIG5lY2Vzc2FyeSBjb25uZWN0aW9uc1xuICAgICAgdGhpcy5jcmVhdGVDb25uZWN0aW9ucyh0aGlzLmxheWVyQ250IC0gMywgdGhpcy5sYXllckNudCAtIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5sYXllckNudCA9PSAyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5oaWRkZW5MYXllclNpemVzLnBvcCgpO1xuICAgICAgdGhpcy5sYXllckNudC0tO1xuICAgICAgdGhpcy5uZXVyb25zLnBvcCgpO1xuICAgICAgdGhpcy5jb25uZWN0aW9ucy5wb3AoKTtcblxuICAgICAgLy8gUmVjcmVhdGUgdGhlIGxhc3QgbGF5ZXJcbiAgICAgIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250IC0gMV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vdXRwdXRTaXplOyBpKyspIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXVtpXSA9IG5ldyBOZXVyb24oYE5ldXJvbiR7dGhpcy5sYXllckNudCAtIDF9JHtpfWApO1xuICAgICAgfVxuXG4gICAgICAvLyBSZWNyZWF0ZSBhbGwgbmVjZXNzYXJ5IGNvbm5lY3Rpb25zXG4gICAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25zKHRoaXMubGF5ZXJDbnQgLSAyLCB0aGlzLmxheWVyQ250IC0gMSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlc2V0KCkge1xuICAgIHRoaXMuY3JlYXRlQ29ubmVjdGlvbnMoMCwgdGhpcy5sYXllckNudC0xKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ29ubmVjdGlvbnMoZmlyc3RMYXllciwgbGFzdExheWVyKSB7XG4gICAgZm9yIChsZXQgbCA9IGZpcnN0TGF5ZXI7IGwgPCBsYXN0TGF5ZXI7IGwrKykge1xuICAgICAgLy8gRm9yIGVhY2ggbmV1cm9uIGluIHRoZSBsYXllciBhZGQgYWxsIGNvbm5lY3Rpb25zIHRvIG5ldXJvbnMgaW4gdGhlIG5leHQgbGF5ZXJcbiAgICAgIHRoaXMuY29ubmVjdGlvbnNbbF0gPSBbXTtcblxuICAgICAgLy8gUmVzZXQgaW5wdXQgJiBvdXRwdXRzXG4gICAgICB0aGlzLm5ldXJvbnNbbCArIDFdLmZvckVhY2gobmV4dE5ldXJvbiA9PiB7bmV4dE5ldXJvbi5yZXNldElucHV0cygpfSk7XG4gICAgICB0aGlzLm5ldXJvbnNbbF0uZm9yRWFjaChuZXh0TmV1cm9uID0+IHtuZXh0TmV1cm9uLnJlc2V0T3V0cHV0cygpfSk7XG5cblxuICAgICAgdGhpcy5uZXVyb25zW2wgKyAxXS5mb3JFYWNoKG5leHROZXVyb24gPT4geyAvLyBJZiB5b3Ugd29uZGVyIHdoeSB0aGlzIGN5Y2xlcyBhcmUgc3dpdGNoZWQsIGl0J3MgYmVjYXVzZSBvZiB0aGUgYmlhc1xuICAgICAgICB0aGlzLm5ldXJvbnNbbF0uZm9yRWFjaChjdXJyTmV1cm9uID0+IHtcbiAgICAgICAgICBjb25zdCBjb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb24oY3Vyck5ldXJvbiwgbmV4dE5ldXJvbilcbiAgICAgICAgICBjdXJyTmV1cm9uLmFkZE91dHB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICBuZXh0TmV1cm9uLmFkZElucHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbF0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQWRkIGJpYXMgbmV1cm9uIHRvIGVhY2ggbGF5ZXJcbiAgICAgICAgY29uc3QgYmlhc0Nvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbih0aGlzLmJpYXNOZXVyb24sIG5leHROZXVyb24pO1xuICAgICAgICBuZXh0TmV1cm9uLmFkZElucHV0KGJpYXNDb25uZWN0aW9uKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsXS5wdXNoKGJpYXNDb25uZWN0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXROZXVyb25zKCkge1xuICAgIHJldHVybiB0aGlzLm5ldXJvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29ubmVjdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0SW5wdXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0U2l6ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRMYXllckNudCgpIHtcbiAgICByZXR1cm4gdGhpcy5sYXllckNudDtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSBcIi4vQ29ubmVjdGlvblwiO1xuaW1wb3J0IHsgQWN0aXZhdGlvbnMgfSBmcm9tIFwiLi9IZWxwZXJDbGFzc2VzXCI7XG5cbmV4cG9ydCBjbGFzcyBOZXVyb24ge1xuICBwcml2YXRlIG5hbWU6IHN0cmluZztcblxuICBwcml2YXRlIGFjdGl2YXRpb246IG51bWJlcjtcbiAgcHJpdmF0ZSBpbnB1dHM6IENvbm5lY3Rpb25bXTtcbiAgcHJpdmF0ZSBvdXRwdXRzOiBDb25uZWN0aW9uW107XG5cbiAgLy8gVGhlIGRlcml2YXRpb24gb2YgQyB3aXRoIHJlc3BlY3QgdG8gelxuICBwcml2YXRlIHNpZ21hOiBudW1iZXI7XG4gIHByaXZhdGUgaXNJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGlzQ2FsY3VsYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGlzQmlhczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgaXNCaWFzID0gZmFsc2UpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaXNCaWFzID0gaXNCaWFzO1xuICB9O1xuXG4gIHB1YmxpYyB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgcHVibGljIGdldElzQmlhcygpIHtcbiAgICByZXR1cm4gdGhpcy5pc0JpYXM7XG4gIH1cblxuICBwdWJsaWMgc2V0QXNJbnB1dE5ldXJvbihhY3RpdmF0aW9uOiBudW1iZXIpIHtcbiAgICB0aGlzLmlzSW5wdXQgPSB0cnVlO1xuICAgIHRoaXMuYWN0aXZhdGlvbiA9IGFjdGl2YXRpb247XG4gICAgdGhpcy5pbnB1dHMgPSBudWxsO1xuICB9XG5cbiAgcHVibGljIHNldElucHV0KGFjdGl2YXRpb246IG51bWJlcikge1xuICAgIGlmICghdGhpcy5pc0lucHV0KSB7XG4gICAgICB0aHJvdyAnQ2Fubm90IHNldCBhY3RpdmF0aW9uIG9mIG5vbi1pbnB1dCBuZXVyb24nO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZhdGlvbiA9IGFjdGl2YXRpb247XG4gIH1cblxuICBwdWJsaWMgc2V0U2lnbWEoc2lnbWE6IG51bWJlcikge1xuICAgIHRoaXMuc2lnbWEgPSBzaWdtYTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJbnB1dChpbnB1dDogQ29ubmVjdGlvbikge1xuICAgIHRoaXMuaW5wdXRzLnB1c2goaW5wdXQpO1xuICB9O1xuXG4gIHB1YmxpYyBhZGRPdXRwdXQob3V0cHV0OiBDb25uZWN0aW9uKSB7XG4gICAgdGhpcy5vdXRwdXRzLnB1c2gob3V0cHV0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPdXRwdXRzKCk6IENvbm5lY3Rpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMub3V0cHV0cztcbiAgfVxuXG4gIHB1YmxpYyByZXNldElucHV0cygpIHtcbiAgICB0aGlzLmlucHV0cyA9IFtdO1xuICB9XG5cbiAgcHVibGljIHJlc2V0T3V0cHV0cygpIHtcbiAgICB0aGlzLm91dHB1dHMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGdldEFjdGl2YXRpb24oKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5pc0JpYXMpIHRoaXMuYWN0aXZhdGlvbiA9IDE7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZhdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTaWdtYSgpIHtcbiAgICByZXR1cm4gdGhpcy5zaWdtYTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVBY3RpdmF0aW9uKCk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLmlzSW5wdXQgJiYgIXRoaXMuaXNDYWxjdWxhdGVkICYmICF0aGlzLmlzQmlhcykge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uID0gQWN0aXZhdGlvbnMuU0lHTU9JRC5vdXRwdXQodGhpcy5pbnB1dHMucmVkdWNlKChhY2MsIGN1cnJDb25uKSA9PiBhY2MgKyBjdXJyQ29ubi5jYWxjdWxhdGVWYWx1ZSgpLCAwKSk7XG4gICAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldEFjdGl2YXRpb24oKTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=