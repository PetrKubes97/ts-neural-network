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
        input.push(1);
    }
    neuralCore.evaluate(input);
    updateUI();
    visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
};
window.train = (multipleIters) => {
    let iters = multipleIters ? Number.parseInt(itersInput.value) : 1;
    neuralCore.setRate(Number.parseFloat(rateInput.value));
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
let layerCnt;
let cost;
let rateInput;
let itersInput;
const main = () => {
    const content = document.getElementById('content');
    inputControls = document.getElementById('input-controls');
    layerControls = document.getElementById('layer-controls');
    layerCnt = document.getElementById('layer-cnt');
    cost = document.getElementById('cost');
    rateInput = document.getElementById('rate-input');
    itersInput = document.getElementById('iters-input');
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
    let content = '<table>';
    content += `<tr><td align='right'>Input size: <b>${inputSize}</b></td><td>
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(false, 0)">-</button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(true, 0)">+</button>
    </div></td></tr>`;
    for (let i = 0; i < neuralCore.getLayerCnt() - 2; i++) {
        content += `<tr><td align='right'>Hidden layer size: <b>${neuralCore.getHiddenLayerSizes()[i]}</b></td><td>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(false, ${i + 1})">-</button>
        <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(true, ${i + 1})">+</button>
      </div></td></tr>`;
    }
    content += `<tr><td align='right'>Output size: <b>${outputSize}</b></td><td>
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(false, ${neuralCore.getLayerCnt() - 1})">-</button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(true, ${neuralCore.getLayerCnt() - 1})">+</button>
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
        if (this.trainSamples.length == 0) {
            return 0;
        }
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
    getLayerCnt() {
        return this.layerCnt;
    }
    getHiddenLayerSizes() {
        return this.hiddenLayerSizes;
    }
    setRate(newRate) {
        this.rate = newRate;
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
            this.activation = _HelperClasses__WEBPACK_IMPORTED_MODULE_0__["Activations"].SIGMOID.output(this.inputs.reduce((acc, currConn) => acc + currConn.calculateValue(), 0));
            this.isCalculated = true;
        }
        return this.getActivation();
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Zpc3VhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL0Nvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25ldXJhbE5ldHdvcmsvSGVscGVyQ2xhc3Nlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV1cmFsTmV0d29yay9OZXVyYWxDb3JlLnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL05ldXJvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0VNO0lBT0osWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxHQUFHLEtBQUs7UUFDaEQsSUFB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akIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVNLEtBQUs7UUFDVixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRU0sYUFBYTtRQUNsQixJQUFJLElBQUksQ0FBQyxNQUFNO1lBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxRQUFRO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFTSxtQkFBbUI7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN2RCxJQUFJLENBQUMsVUFBVSxHQUFHLDBEQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4SCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUMxQjtRQUNELE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzlCLENBQUM7Q0FDRiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBOZXVyb24gfSBmcm9tIFwiLi9uZXVyYWxOZXR3b3JrL05ldXJvblwiO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gXCIuL25ldXJhbE5ldHdvcmsvQ29ubmVjdGlvblwiO1xuXG5leHBvcnQgY2xhc3MgRHJhd2FibGVOZXVyb24ge1xuICBwdWJsaWMgeDogbnVtYmVyO1xuICBwdWJsaWMgeTogbnVtYmVyO1xuICBwdWJsaWMgYWN0aXZhdGlvbjogbnVtYmVyO1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwdWJsaWMgaXNCaWFzOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHgsIHksIGFjdGl2YXRpb24sIG5hbWUsIGlzQmlhcyA9IGZhbHNlKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuYWN0aXZhdGlvbiA9IGFjdGl2YXRpb247XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlzQmlhcyA9IGlzQmlhcztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmlzdWFsaXplciB7XG5cbiAgcHJpdmF0ZSBjb250ZW50OiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgcHJpdmF0ZSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlcjtcbiAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICB0aGlzLmN0eCA9IGNvbnRlbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLmhlaWdodCA9IGNvbnRlbnQuaGVpZ2h0O1xuICAgIHRoaXMud2lkdGggPSBjb250ZW50LndpZHRoO1xuICB9XG5cbiAgcHVibGljIGRyYXcobmV1cm9uczogTmV1cm9uW11bXSwgY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXVtdKSB7XG4gICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICBcbiAgICBjb25zdCBkcmF3YWJsZU5ldXJvbnM6IERyYXdhYmxlTmV1cm9uW10gPSBbXTtcbiAgICBjb25zdCBsZWZ0TWFyZ2luID0gdGhpcy53aWR0aCAvIChuZXVyb25zLmxlbmd0aCArIDEpO1xuXG4gICAgLy8gTmV1cm9uc1xuICAgIG5ldXJvbnMuZm9yRWFjaCgobGF5ZXIsIGxJZHgpID0+IHtcbiAgICAgIGNvbnN0IHRvcE1hcmdpbiA9IHRoaXMuaGVpZ2h0IC8gKGxheWVyLmxlbmd0aCArIDIpO1xuICAgICAgbGF5ZXIuZm9yRWFjaCgobmV1cm9uLCBuSWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IHggPSBsZWZ0TWFyZ2luICogKDEgKyBsSWR4KTtcbiAgICAgICAgY29uc3QgeSA9IHRvcE1hcmdpbiAqICgxICsgbklkeCk7XG5cbiAgICAgICAgY29uc3QgZHJhd2FibGVOZXVyb24gPSBuZXcgRHJhd2FibGVOZXVyb24oeCwgeSwgbmV1cm9uLmdldEFjdGl2YXRpb24oKSwgbmV1cm9uLmdldE5hbWUoKSk7XG4gICAgICAgIGRyYXdhYmxlTmV1cm9ucy5wdXNoKGRyYXdhYmxlTmV1cm9uKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAobElkeCAhPSBuZXVyb25zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgY29uc3QgeCA9IGxlZnRNYXJnaW4gKiAoMSArIGxJZHgpO1xuICAgICAgICBjb25zdCB5ID0gdG9wTWFyZ2luICogKDEgKyBuZXVyb25zW2xJZHhdLmxlbmd0aCk7XG5cbiAgICAgICAgY29uc3QgZHJhd2FibGVOZXVyb24gPSBuZXcgRHJhd2FibGVOZXVyb24oeCwgeSwgMSwgYGJpYXMke2xJZHh9YCwgdHJ1ZSk7XG4gICAgICAgIGRyYXdhYmxlTmV1cm9ucy5wdXNoKGRyYXdhYmxlTmV1cm9uKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENvbm5lY3Rpb25zXG4gICAgY29uc3QgZHJhd2FibGVOYW1lTWFwID0gbmV3IE1hcDxzdHJpbmcsIERyYXdhYmxlTmV1cm9uPigpO1xuICAgIGRyYXdhYmxlTmV1cm9ucy5mb3JFYWNoKFxuICAgICAgKGRyYXdhYmxlTmV1cm9uKSA9PiBkcmF3YWJsZU5hbWVNYXAuc2V0KGRyYXdhYmxlTmV1cm9uLm5hbWUsIGRyYXdhYmxlTmV1cm9uKS8vIFdURiwgSSB3YXMgbm90IGFibGUgdG8gY3JlYXRlIG1hcCBmcm9tIDJkIGFyclxuICAgICk7XG5cbiAgICBjb25uZWN0aW9ucy5mb3JFYWNoKChsYXllciwgbElkeCkgPT4ge1xuICAgICAgbGF5ZXIuZm9yRWFjaCgoY29ubmVjdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dE5OYW1lID1cbiAgICAgICAgICAoY29ubmVjdGlvbi5nZXRJbnB1dE5ldXJvbigpLmdldElzQmlhcygpKSA/XG4gICAgICAgICAgICBgYmlhcyR7bElkeH1gIDpcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS5nZXROYW1lKCk7XG5cbiAgICAgICAgdGhpcy5kcmF3Q29ubmVjdGlvbihcbiAgICAgICAgICBkcmF3YWJsZU5hbWVNYXAuZ2V0KGlucHV0Tk5hbWUpLFxuICAgICAgICAgIGRyYXdhYmxlTmFtZU1hcC5nZXQoY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXROYW1lKCkpLFxuICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0V2VpZ2h0KClcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZHJhd2FibGVOZXVyb25zLmZvckVhY2goKG5ldXJvbikgPT4ge1xuICAgICAgdGhpcy5kcmF3TmV1cm9uKG5ldXJvbik7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdOZXVyb24oZHJhd2FibGVOZXVyb246IERyYXdhYmxlTmV1cm9uKSB7XG4gICAgLy8gd2hpdGUgYmFja2dyb3VuZFxuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LmFyYyhkcmF3YWJsZU5ldXJvbi54LCBkcmF3YWJsZU5ldXJvbi55LCAyNSwgMCwgMiAqIE1hdGguUEkpO1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGByZ2IoMjU1LDI1NSwyNTUpYDtcbiAgICB0aGlzLmN0eC5maWxsKCk7XG4gICAgXG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgaWYgKGRyYXdhYmxlTmV1cm9uLmlzQmlhcylcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGByZ2JhKDQ2LDQwLDQyLCAxKWA7XG4gICAgZWxzZVxuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYmEoMjMsIDE5MCwgMTg3LCAke2RyYXdhYmxlTmV1cm9uLmFjdGl2YXRpb259KWA7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBgcmdiKDQ2LDQwLDQyLCAxKWBcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAxO1xuICAgIHRoaXMuY3R4LmFyYyhkcmF3YWJsZU5ldXJvbi54LCBkcmF3YWJsZU5ldXJvbi55LCAyNSwgMCwgMiAqIE1hdGguUEkpO1xuICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcblxuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGByZ2IoNDYsNDAsNDIsIDEpYFxuICAgIGNvbnN0IGhlaWdodCA9IDE2O1xuICAgIHRoaXMuY3R4LmZvbnQgPSBgYm9sZCAke2hlaWdodH1weCBzZXJpZmA7XG4gICAgY29uc3QgdGV4dCA9IE51bWJlcihkcmF3YWJsZU5ldXJvbi5hY3RpdmF0aW9uKS50b0ZpeGVkKDIpO1xuICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxuICAgICAgdGV4dCwgXG4gICAgICBkcmF3YWJsZU5ldXJvbi54IC0gdGhpcy5jdHgubWVhc3VyZVRleHQodGV4dCkud2lkdGggLyAyLCBcbiAgICAgIGRyYXdhYmxlTmV1cm9uLnkgKyBoZWlnaHQgLyAzKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd0Nvbm5lY3Rpb24oaW5wdXROZXVyb246IERyYXdhYmxlTmV1cm9uLCBvdXRwdXROZXVyb246IERyYXdhYmxlTmV1cm9uLCB3ZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9ICh3ZWlnaHQgPiAwKSA/IFxuICAgICAgTWF0aC5sb2cod2VpZ2h0KSA6XG4gICAgICBNYXRoLmxvZygtd2VpZ2h0KTtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9ICh3ZWlnaHQgPiAwKSA/XG4gICAgICBgcmdiYSgyMDUsIDgzLCA1MiwgJHt3ZWlnaHR9KWAgOlxuICAgICAgYHJnYmEoNjEsIDIzMiwgMjU1LCAke3dlaWdodCAqIC0xfSlgO1xuICAgIHRoaXMuY3R4Lm1vdmVUbyhpbnB1dE5ldXJvbi54LCBpbnB1dE5ldXJvbi55KTtcbiAgICB0aGlzLmN0eC5saW5lVG8ob3V0cHV0TmV1cm9uLngsIG91dHB1dE5ldXJvbi55KTtcbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmlzdWFsaXplciB9IGZyb20gJy4vVmlzdWFsaXplcic7XG5pbXBvcnQgeyBOZXVyYWxDb3JlIH0gZnJvbSAnLi9uZXVyYWxOZXR3b3JrL05ldXJhbENvcmUnO1xuXG4od2luZG93IGFzIGFueSkuc2xpZGUgPSAoaTogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKSA9PiB7XG4gIGlucHV0W2ldID0gdmFsdWU7XG4gIG5ldXJhbENvcmUuZXZhbHVhdGUoaW5wdXQpO1xuICB2aXN1YWxpemVyLmRyYXcobmV1cmFsQ29yZS5nZXROZXVyb25zKCksIG5ldXJhbENvcmUuZ2V0Q29ubmVjdGlvbnMoKSk7XG59XG5cbih3aW5kb3cgYXMgYW55KS5hZGRPclJlbW92ZUxheWVyID0gKGFkZDogYm9vbGVhbikgPT4ge1xuICBuZXVyYWxDb3JlLmFkZE9yUmVtb3ZlTGF5ZXIoYWRkKTtcbiAgbmV1cmFsQ29yZS5ldmFsdWF0ZShpbnB1dCk7XG5cbiAgdXBkYXRlVUkoKTtcbiAgdmlzdWFsaXplci5kcmF3KG5ldXJhbENvcmUuZ2V0TmV1cm9ucygpLCBuZXVyYWxDb3JlLmdldENvbm5lY3Rpb25zKCkpO1xufVxuXG4od2luZG93IGFzIGFueSkuYWRkT3JSZW1vdmVOZXVyb24gPSAoYWRkOiBib29sZWFuLCBsYXllcklkeDogbnVtYmVyKSA9PiB7XG4gIG5ldXJhbENvcmUuYWRkT3JSZW1vdmVOZXVyb24oYWRkLCBsYXllcklkeCk7XG4gIGlmIChsYXllcklkeCA9PSAwKSB7XG4gICAgaW5wdXQucHVzaCgxKTtcbiAgfVxuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcblxuICB1cGRhdGVVSSgpO1xuICB2aXN1YWxpemVyLmRyYXcobmV1cmFsQ29yZS5nZXROZXVyb25zKCksIG5ldXJhbENvcmUuZ2V0Q29ubmVjdGlvbnMoKSk7XG59XG5cbih3aW5kb3cgYXMgYW55KS50cmFpbiA9IChtdWx0aXBsZUl0ZXJzOiBib29sZWFuKSA9PiB7XG4gIGxldCBpdGVycyA9IG11bHRpcGxlSXRlcnMgPyBOdW1iZXIucGFyc2VJbnQoaXRlcnNJbnB1dC52YWx1ZSkgOiAxO1xuICBuZXVyYWxDb3JlLnNldFJhdGUoTnVtYmVyLnBhcnNlRmxvYXQocmF0ZUlucHV0LnZhbHVlKSk7XG5cbiAgZm9yIChsZXQgaT0wO2k8aXRlcnM7aSsrKSB7XG4gICAgbmV1cmFsQ29yZS50cmFpbigpO1xuICB9XG5cbiAgbmV1cmFsQ29yZS5ldmFsdWF0ZShpbnB1dCk7XG4gIHVwZGF0ZVVJKCk7XG4gIHZpc3VhbGl6ZXIuZHJhdyhuZXVyYWxDb3JlLmdldE5ldXJvbnMoKSwgbmV1cmFsQ29yZS5nZXRDb25uZWN0aW9ucygpKTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLnJlc2V0ID0gKCkgPT4ge1xuICBuZXVyYWxDb3JlLnJlc2V0KCk7XG4gIG5ldXJhbENvcmUuZXZhbHVhdGUoaW5wdXQpO1xuICB1cGRhdGVVSSgpO1xuICB2aXN1YWxpemVyLmRyYXcobmV1cmFsQ29yZS5nZXROZXVyb25zKCksIG5ldXJhbENvcmUuZ2V0Q29ubmVjdGlvbnMoKSk7XG59XG5cblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgbWFpbigpO1xufTtcblxubGV0IG5ldXJhbENvcmU6IE5ldXJhbENvcmU7XG5sZXQgdmlzdWFsaXplcjogVmlzdWFsaXplcjtcbmxldCBpbnB1dDogbnVtYmVyW107XG5cbmxldCBpbnB1dFNpemUgPSA0O1xubGV0IGhpZGRlblNpemVzID0gWzNdO1xubGV0IG91dHB1dFNpemUgPSA0O1xubGV0IGxheWVyQ29udHJvbHM6IEhUTUxFbGVtZW50O1xubGV0IGlucHV0Q29udHJvbHM6IEhUTUxFbGVtZW50O1xuXG5sZXQgbGF5ZXJDbnQ6IEhUTUxFbGVtZW50O1xubGV0IGNvc3Q6IEhUTUxFbGVtZW50O1xuXG5sZXQgcmF0ZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xubGV0IGl0ZXJzSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbmNvbnN0IG1haW4gPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRlbnQ6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgaW5wdXRDb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC1jb250cm9scycpO1xuICBsYXllckNvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xheWVyLWNvbnRyb2xzJyk7XG4gIGxheWVyQ250ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xheWVyLWNudCcpO1xuICBjb3N0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvc3QnKTtcbiAgcmF0ZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhdGUtaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICBpdGVyc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZXJzLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICB2aXN1YWxpemVyID0gbmV3IFZpc3VhbGl6ZXIoY29udGVudCk7XG5cbiAgaW5pdENvcmUoKTtcbn1cblxuY29uc3QgaW5pdENvcmUgPSAoKSA9PiB7XG4gIG5ldXJhbENvcmUgPSBuZXcgTmV1cmFsQ29yZShpbnB1dFNpemUsIGhpZGRlblNpemVzLCBvdXRwdXRTaXplKTtcblxuICBuZXVyYWxDb3JlLmFkZFRyYWluaW5nU2V0KFsxLDAsMCwwXSwgWzAsMSwwLDBdKTtcbiAgbmV1cmFsQ29yZS5hZGRUcmFpbmluZ1NldChbMCwxLDAsMF0sIFswLDAsMSwwXSk7XG4gIG5ldXJhbENvcmUuYWRkVHJhaW5pbmdTZXQoWzAsMCwxLDBdLCBbMCwwLDAsMV0pO1xuXG4gIC8vIFNldCBkZWZhdWx0IHZhbHVlc1xuICBpbnB1dCA9IG5ldyBBcnJheShuZXVyYWxDb3JlLmdldElucHV0U2l6ZSgpKTtcbiAgaW5wdXQuZmlsbCgxKTtcblxuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcbiAgdXBkYXRlVUkoKTtcbiAgdmlzdWFsaXplci5kcmF3KG5ldXJhbENvcmUuZ2V0TmV1cm9ucygpLCBuZXVyYWxDb3JlLmdldENvbm5lY3Rpb25zKCkpO1xufVxuXG5jb25zdCB1cGRhdGVVSSA9ICgpID0+IHtcbiAgbGV0IGNvbnRlbnQgPSAnPHRhYmxlPic7XG4gIGNvbnRlbnQgKz0gYDx0cj48dGQgYWxpZ249J3JpZ2h0Jz5JbnB1dCBzaXplOiA8Yj4ke2lucHV0U2l6ZX08L2I+PC90ZD48dGQ+XG4gICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIHJvbGU9XCJncm91cFwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc21cIiBvbmNsaWNrPVwiYWRkT3JSZW1vdmVOZXVyb24oZmFsc2UsIDApXCI+LTwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc21cIiBvbmNsaWNrPVwiYWRkT3JSZW1vdmVOZXVyb24odHJ1ZSwgMClcIj4rPC9idXR0b24+XG4gICAgPC9kaXY+PC90ZD48L3RyPmA7XG4gIFxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5ldXJhbENvcmUuZ2V0TGF5ZXJDbnQoKSAtIDI7IGkrKykge1xuICAgIGNvbnRlbnQgKz0gYDx0cj48dGQgYWxpZ249J3JpZ2h0Jz5IaWRkZW4gbGF5ZXIgc2l6ZTogPGI+JHtuZXVyYWxDb3JlLmdldEhpZGRlbkxheWVyU2l6ZXMoKVtpXX08L2I+PC90ZD48dGQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCIgb25jbGljaz1cImFkZE9yUmVtb3ZlTmV1cm9uKGZhbHNlLCAke2krMX0pXCI+LTwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiIG9uY2xpY2s9XCJhZGRPclJlbW92ZU5ldXJvbih0cnVlLCAke2krMX0pXCI+KzwvYnV0dG9uPlxuICAgICAgPC9kaXY+PC90ZD48L3RyPmA7XG4gIH1cbiAgY29udGVudCArPSBgPHRyPjx0ZCBhbGlnbj0ncmlnaHQnPk91dHB1dCBzaXplOiA8Yj4ke291dHB1dFNpemV9PC9iPjwvdGQ+PHRkPlxuICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCIgb25jbGljaz1cImFkZE9yUmVtb3ZlTmV1cm9uKGZhbHNlLCAke25ldXJhbENvcmUuZ2V0TGF5ZXJDbnQoKS0xfSlcIj4tPC9idXR0b24+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiIG9uY2xpY2s9XCJhZGRPclJlbW92ZU5ldXJvbih0cnVlLCAke25ldXJhbENvcmUuZ2V0TGF5ZXJDbnQoKS0xfSlcIj4rPC9idXR0b24+XG4gICAgPC9kaXY+PC90ZD48L3RyPmA7XG4gIGNvbnRlbnQgKz0gJzwvdGFibGU+JztcblxuICBsYXllckNvbnRyb2xzLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgaW5wdXRDb250cm9scy5pbm5lckhUTUwgPSAnJztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXVyYWxDb3JlLmdldElucHV0U2l6ZSgpOyBpKyspIHtcbiAgICBpbnB1dENvbnRyb2xzLmlubmVySFRNTCArPSBgTmV1cm9uICR7aX06IDxpbnB1dCBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTsgdG9wOiA1cHg7XCIgdHlwZT1cInJhbmdlXCIgbWluPVwiMFwiIG1heD1cIjFcIiB2YWx1ZT1cIjFcIiBzdGVwPVwiMC4wNVwiIGlkPVwic2xpZGVyJHtpfVwiIG9uaW5wdXQ9XCJzbGlkZSgke2l9LCB0aGlzLnZhbHVlKTtcIj48YnI+YDtcbiAgfVxuXG4gIGxheWVyQ250LmlubmVyVGV4dCA9IG5ldXJhbENvcmUuZ2V0TGF5ZXJDbnQoKS50b1N0cmluZygpO1xuICBjb3N0LmlubmVySFRNTCA9IG5ldXJhbENvcmUuZ2V0Q29zdCgpLnRvU3RyaW5nKCk7XG59IiwiaW1wb3J0IHsgTmV1cm9uIH0gZnJvbSBcIi4vTmV1cm9uXCI7XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uIHtcbiAgcHJpdmF0ZSB3ZWlnaHQ6IG51bWJlciA9IE1hdGgucmFuZG9tKCkgKiAxMCAtIDU7XG4gIHByaXZhdGUgaW5wdXROZXVyb246IE5ldXJvbjtcbiAgcHJpdmF0ZSBvdXRwdXROZXVyb246IE5ldXJvbjtcbiAgcHJpdmF0ZSBzYW1wbGVXZWlnaHRDaGFuZ2VzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGlucHV0OiBOZXVyb24sIG91dHB1dDogTmV1cm9uKSB7XG4gICAgdGhpcy5pbnB1dE5ldXJvbiA9IGlucHV0O1xuICAgIHRoaXMub3V0cHV0TmV1cm9uID0gb3V0cHV0O1xuICB9XG5cbiAgcHVibGljIGFkZFNhbXBsZVdlaWdodENoYW5nZSh3ZWlnaHRDaGFuZ2U6IG51bWJlcikge1xuICAgIHRoaXMuc2FtcGxlV2VpZ2h0Q2hhbmdlcy5wdXNoKHdlaWdodENoYW5nZSk7XG4gIH1cblxuICBwdWJsaWMgYXBwbHlBdmVyYWdlV2VpZ2h0Q2hhbmdlKCkge1xuICAgIGNvbnN0IGNoYW5nZSA9ICh0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjICsgdmFsLCAwKSAvIHRoaXMuc2FtcGxlV2VpZ2h0Q2hhbmdlcy5sZW5ndGgpO1xuICAgIHRoaXMud2VpZ2h0ICs9IGNoYW5nZTtcbiAgICB0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRXZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMud2VpZ2h0O1xuICB9XG5cbiAgcHVibGljIGNhbGN1bGF0ZVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLndlaWdodCAqIHRoaXMuaW5wdXROZXVyb24uY2FsY3VsYXRlQWN0aXZhdGlvbigpO1xuICB9XG5cbiAgcHVibGljIGdldE91dHB1dE5ldXJvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vdXRwdXROZXVyb247XG4gIH1cblxuICBwdWJsaWMgZ2V0SW5wdXROZXVyb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXROZXVyb247XG4gIH1cbn0iLCJleHBvcnQgY2xhc3MgQWN0aXZhdGlvbnMge1xuICBwdWJsaWMgc3RhdGljIFNJR01PSUQgPSB7XG4gICAgb3V0cHV0OiAoeDogbnVtYmVyKTogbnVtYmVyID0+IDEgLyAoMSArIE1hdGguZXhwKC14KSksXG4gICAgZGVyOiAoeDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICAgIGxldCBvdXRwdXQgPSBBY3RpdmF0aW9ucy5TSUdNT0lELm91dHB1dCh4KTtcbiAgICAgIHJldHVybiBvdXRwdXQgKiAoMSAtIG91dHB1dCk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgVHJhaW5TYW1wbGUge1xuICBwdWJsaWMgaW5wdXQ6IG51bWJlcltdO1xuICBwdWJsaWMgb3V0cHV0OiBudW1iZXJbXTtcblxuICBjb25zdHJ1Y3RvcihpbnB1dDogbnVtYmVyW10sIG91dHB1dDogbnVtYmVyW10pIHtcbiAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgdGhpcy5vdXRwdXQgPSBvdXRwdXQ7XG4gIH1cbn0iLCJpbXBvcnQgeyBOZXVyb24gfSBmcm9tIFwiLi9OZXVyb25cIjtcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tIFwiLi9Db25uZWN0aW9uXCI7XG5pbXBvcnQgeyBUcmFpblNhbXBsZSwgQWN0aXZhdGlvbnMgfSBmcm9tIFwiLi9IZWxwZXJDbGFzc2VzXCI7XG5cbmV4cG9ydCBjbGFzcyBOZXVyYWxDb3JlIHtcbiAgcHJpdmF0ZSBpbnB1dFNpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSBoaWRkZW5MYXllclNpemVzOiBudW1iZXJbXTtcbiAgcHJpdmF0ZSBvdXRwdXRTaXplOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBsYXllckNudDogbnVtYmVyO1xuXG4gIHByaXZhdGUgcmF0ZSA9IDE7XG5cbiAgcHJpdmF0ZSBiaWFzTmV1cm9uID0gbmV3IE5ldXJvbignYmlhcycsIHRydWUpO1xuICBwcml2YXRlIG5ldXJvbnM6IE5ldXJvbltdW10gPSBbXTtcbiAgcHJpdmF0ZSBjb25uZWN0aW9uczogQ29ubmVjdGlvbltdW10gPSBbXTtcblxuICBwcml2YXRlIHRyYWluU2FtcGxlczogVHJhaW5TYW1wbGVbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGlucHV0U2l6ZTogbnVtYmVyLCBoaWRkZW5MYXllclNpemVzOiBudW1iZXJbXSwgb3V0cHV0U2l6ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5pbnB1dFNpemUgPSBpbnB1dFNpemU7XG4gICAgdGhpcy5oaWRkZW5MYXllclNpemVzID0gaGlkZGVuTGF5ZXJTaXplcztcbiAgICB0aGlzLm91dHB1dFNpemUgPSBvdXRwdXRTaXplO1xuICAgIHRoaXMubGF5ZXJDbnQgPSBoaWRkZW5MYXllclNpemVzLmxlbmd0aCArIDI7XG5cbiAgICAvLyBSZXNldFxuICAgIHRoaXMubmV1cm9ucyA9IFtdO1xuICAgIHRoaXMuY29ubmVjdGlvbnMgPSBbXTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIC8vIENyZWF0ZSB0aGUgbmV1cm9uc1xuICAgIGZvciAobGV0IGwgPSAwOyBsIDwgdGhpcy5sYXllckNudDsgbCsrKSB7XG4gICAgICAvLyBIb3cgbWFueSBuZXVyb25zIGFyZSBpbiBlYWNoIGxheWVyP1xuICAgICAgbGV0IG5ldXJvbnNJbkxheWVyQ250ID0gMDtcbiAgICAgIHN3aXRjaCAobCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgbmV1cm9uc0luTGF5ZXJDbnQgPSB0aGlzLmlucHV0U2l6ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0aGlzLmhpZGRlbkxheWVyU2l6ZXMubGVuZ3RoICsgMTpcbiAgICAgICAgICBuZXVyb25zSW5MYXllckNudCA9IHRoaXMub3V0cHV0U2l6ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBuZXVyb25zSW5MYXllckNudCA9IHRoaXMuaGlkZGVuTGF5ZXJTaXplc1tsIC0gMV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubmV1cm9uc1tsXSA9IFtdO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlbVxuICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBuZXVyb25zSW5MYXllckNudDsgbisrKSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsXVtuXSA9IG5ldyBOZXVyb24oYE5ldXJvbiR7bH0ke259YCk7XG4gICAgICAgIGlmIChsID09IDApIHtcbiAgICAgICAgICB0aGlzLm5ldXJvbnNbbF1bbl0uc2V0QXNJbnB1dE5ldXJvbigwKTsgLy8ganVzdCB0byBhdm9pZCBjcmFzaGVzLCB0aGUgMCBzaG91bGQgYmUgb3ZlcnJpZGVuIGxhdGVyIFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHRoZSBDb25uZWN0aW9uc1xuICAgIHRoaXMuY3JlYXRlQ29ubmVjdGlvbnMoMCwgdGhpcy5sYXllckNudCAtIDEpO1xuICB9XG5cbiAgcHVibGljIGV2YWx1YXRlKGlucHV0OiBudW1iZXJbXSk6IG51bWJlcltdIHtcbiAgICBpZiAoaW5wdXQubGVuZ3RoICE9IHRoaXMuaW5wdXRTaXplKSB7XG4gICAgICB0aHJvdyAnSW5wdXQgc2l6ZSBkb2VzIG5vdCBtYXRjaCc7XG4gICAgfVxuICAgIC8vIFJlc2V0LCBzbyBlYWNoIG5ldXJvbiBpcyByZWNhbGN1bGF0ZWRcbiAgICB0aGlzLm5ldXJvbnMuZm9yRWFjaChsYXllciA9PiB7IGxheWVyLmZvckVhY2gobmV1cm9uID0+IG5ldXJvbi5yZXNldCgpKSB9KVxuICAgIC8vIFNldCBpbnB1dCBsYXllclxuICAgIHRoaXMubmV1cm9uc1swXS5mb3JFYWNoKChuZXVyb24sIGlkeCkgPT4geyBuZXVyb24uc2V0SW5wdXQoaW5wdXRbaWR4XSkgfSk7XG5cbiAgICB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLmZvckVhY2gobmV1cm9uID0+IHtcbiAgICAgIG5ldXJvbi5jYWxjdWxhdGVBY3RpdmF0aW9uKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5tYXAobmV1cm9uID0+IG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkpO1xuICB9XG5cbiAgcHVibGljIGFkZFRyYWluaW5nU2V0KGlucHV0OiBudW1iZXJbXSwgb3V0cHV0OiBudW1iZXJbXSkge1xuICAgIHRoaXMudHJhaW5TYW1wbGVzLnB1c2gobmV3IFRyYWluU2FtcGxlKGlucHV0LCBvdXRwdXQpKVxuICB9XG5cbiAgcHVibGljIGdldENvc3QoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy50cmFpblNhbXBsZXMubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGNvbnN0IGNvc3RTdW0gPSB0aGlzLnRyYWluU2FtcGxlcy5yZWR1Y2UoKGNvc3RTdW0sIHNhbXBsZSkgPT4geyAvLyBBZGQgdXAgYWxsIHNhbXBsZXNcbiAgICAgIHRoaXMuZXZhbHVhdGUoc2FtcGxlLmlucHV0KTtcbiAgICAgIHJldHVybiBjb3N0U3VtICsgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5yZWR1Y2UoKGFjYywgbmV1cm9uLCBpKSA9PiB7IC8vIEFkZCB1cCBhbGwgb3V0cHV0IG5ldXJvbnNcbiAgICAgICAgcmV0dXJuIGFjYyArIChuZXVyb24uZ2V0QWN0aXZhdGlvbigpIC0gc2FtcGxlLm91dHB1dFtpXSkgKiogMjtcbiAgICAgIH0sIDApO1xuICAgIH0sIDApO1xuXG4gICAgcmV0dXJuIDEgLyAyICogY29zdFN1bSAqICgxIC8gdGhpcy50cmFpblNhbXBsZXMubGVuZ3RoKTtcbiAgfVxuXG4gIHB1YmxpYyB0cmFpbigpIHtcbiAgICB0aGlzLnRyYWluU2FtcGxlcy5mb3JFYWNoKChzYW1wbGUpID0+IHtcbiAgICAgIHRoaXMuZXZhbHVhdGUoc2FtcGxlLmlucHV0KVxuXG4gICAgICAvLyBDYWxjdWxhdGUgc2lnbWFzIG9mIHRoZSBsYXN0IGxheWVyXG4gICAgICB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLmZvckVhY2goKG5ldXJvbiwgaWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1NpZ21hID1cbiAgICAgICAgICAoc2FtcGxlLm91dHB1dFtpZHhdIC0gbmV1cm9uLmdldEFjdGl2YXRpb24oKSkgKiBBY3RpdmF0aW9ucy5TSUdNT0lELmRlcihuZXVyb24uZ2V0QWN0aXZhdGlvbigpKTtcblxuICAgICAgICBuZXVyb24uc2V0U2lnbWEobmV3U2lnbWEpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBzaWdtYXMgZm9yIGVhY2ggbmV1cm9uIGluIHRoZSBsb3dlciBsYXllcnNcbiAgICAgIGZvciAobGV0IGwgPSB0aGlzLmxheWVyQ250IC0gMjsgbCA+PSAwOyBsLS0pIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xdLmZvckVhY2goKG5ldXJvbikgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld1NpZ21hID1cbiAgICAgICAgICAgIG5ldXJvbi5nZXRPdXRwdXRzKCkucmVkdWNlKChhY2MsIGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFjYyArIGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0U2lnbWEoKSAqIGNvbm5lY3Rpb24uZ2V0V2VpZ2h0KCk7XG4gICAgICAgICAgICB9LCAwKSAqIEFjdGl2YXRpb25zLlNJR01PSUQuZGVyKG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkpO1xuICAgICAgICAgIG5ldXJvbi5zZXRTaWdtYShuZXdTaWdtYSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBBY2N1bXVsYXRlIGFsbCB3ZWlnaHQgdXBkYXRlc1xuICAgICAgdGhpcy5jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uTGF5ZXIpID0+IHtcbiAgICAgICAgY29ubkxheWVyLmZvckVhY2goKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICBjb25zdCB3ZWlnaHRDaGFuZ2UgPVxuICAgICAgICAgICAgY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXRTaWdtYSgpICpcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS5nZXRBY3RpdmF0aW9uKCkgKlxuICAgICAgICAgICAgdGhpcy5yYXRlO1xuXG4gICAgICAgICAgY29ubmVjdGlvbi5hZGRTYW1wbGVXZWlnaHRDaGFuZ2Uod2VpZ2h0Q2hhbmdlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFVmZiwgbGV0J3MgaG9wZSBldmVyeXRoaW5nIHdvcmtzIGFuZCBhcHBseSB0aGUgbWFnaWNcbiAgICB0aGlzLmNvbm5lY3Rpb25zLmZvckVhY2goKGNvbm5MYXllcikgPT4ge1xuICAgICAgY29ubkxheWVyLmZvckVhY2goKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgY29ubmVjdGlvbi5hcHBseUF2ZXJhZ2VXZWlnaHRDaGFuZ2UoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFkZE9yUmVtb3ZlTGF5ZXIoYWRkOiBib29sZWFuKSB7XG4gICAgaWYgKGFkZCkge1xuICAgICAgY29uc3QgbmV3TGF5ZXJTaXplID0gMztcbiAgICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplcy5wdXNoKG5ld0xheWVyU2l6ZSk7XG4gICAgICB0aGlzLmxheWVyQ250Kys7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgbmV3IG5ldXJvbnNcbiAgICAgIHRoaXMuY3JlYXRlTGF5ZXJPZk5ldXJvbnModGhpcy5sYXllckNudCAtIDIsIG5ld0xheWVyU2l6ZSk7XG5cbiAgICAgIC8vIFJlY3JlYXRlIHRoZSBsYXN0IGxheWVyXG4gICAgICB0aGlzLmNyZWF0ZUxheWVyT2ZOZXVyb25zKHRoaXMubGF5ZXJDbnQgLSAxLCB0aGlzLm91dHB1dFNpemUpO1xuXG4gICAgICAvLyBSZWNyZWF0ZSBhbGwgbmVjZXNzYXJ5IGNvbm5lY3Rpb25zXG4gICAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25zKHRoaXMubGF5ZXJDbnQgLSAzLCB0aGlzLmxheWVyQ250IC0gMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmxheWVyQ250ID09IDIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmhpZGRlbkxheWVyU2l6ZXMucG9wKCk7XG4gICAgICB0aGlzLmxheWVyQ250LS07XG4gICAgICB0aGlzLm5ldXJvbnMucG9wKCk7XG4gICAgICB0aGlzLmNvbm5lY3Rpb25zLnBvcCgpO1xuXG4gICAgICAvLyBSZWNyZWF0ZSB0aGUgbGFzdCBsYXllclxuICAgICAgdGhpcy5jcmVhdGVMYXllck9mTmV1cm9ucyh0aGlzLmxheWVyQ250IC0gMSwgdGhpcy5vdXRwdXRTaXplKTtcblxuICAgICAgLy8gUmVjcmVhdGUgYWxsIG5lY2Vzc2FyeSBjb25uZWN0aW9uc1xuICAgICAgdGhpcy5jcmVhdGVDb25uZWN0aW9ucyh0aGlzLmxheWVyQ250IC0gMiwgdGhpcy5sYXllckNudCAtIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRoaXMgZnVuY3Rpb24gaXMgdmVyeSBsb25nIGFuZCB1Z2x5LCBJIGRvbnQgd2FudCB0byBzaW1wbHkgcmVidWlsZCB0aGUgbmV0d29yayBiZWNhdXNlIEkgd2FudCB0byBrZWVwIHRoZSB3ZWlnaHRzXG4gIHB1YmxpYyBhZGRPclJlbW92ZU5ldXJvbihhZGQ6IGJvb2xlYW4sIGxheWVySWR4OiBudW1iZXIpIHtcbiAgICBjb25zdCBpc0lucHV0ID0gbGF5ZXJJZHggPT0gMDtcbiAgICBjb25zdCBpc091dHB1dCA9IGxheWVySWR4ID09IHRoaXMubGF5ZXJDbnQgLSAxO1xuICAgIGNvbnN0IGlzSGlkZGVuID0gIWlzSW5wdXQgJiYgIWlzT3V0cHV0O1xuICAgIFxuICAgIGNvbnN0IHNpemVDaGFuZ2UgPSAoYWRkKSA/IDEgOiAtMVxuXG4gICAgaWYgKGlzSGlkZGVuKSB7XG4gICAgICB0aGlzLmhpZGRlbkxheWVyU2l6ZXNbbGF5ZXJJZHggLSAxXSArPSBzaXplQ2hhbmdlO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc0lucHV0KSB7XG4gICAgICB0aGlzLmlucHV0U2l6ZSArPSBzaXplQ2hhbmdlO1xuICAgICAgdGhpcy50cmFpblNhbXBsZXMgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vdXRwdXRTaXplICs9IHNpemVDaGFuZ2U7XG4gICAgICB0aGlzLnRyYWluU2FtcGxlcyA9IFtdO1xuICAgIH1cblxuICAgIGlmIChhZGQpIHtcbiAgICAgIGxldCBuZXdOZXVyb25JZHg7XG5cbiAgICAgIGlmIChpc0hpZGRlbikge1xuICAgICAgICBuZXdOZXVyb25JZHggPSB0aGlzLmhpZGRlbkxheWVyU2l6ZXNbbGF5ZXJJZHggLSAxXSAtIDE7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0lucHV0KSB7XG4gICAgICAgIG5ld05ldXJvbklkeCA9IHRoaXMuaW5wdXRTaXplIC0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld05ldXJvbklkeCA9IHRoaXMub3V0cHV0U2l6ZSAtIDE7XG4gICAgICB9ICBcblxuICAgICAgY29uc3QgbmV3TmV1cm9uID0gbmV3IE5ldXJvbihgTmV1cm9uJHtsYXllcklkeH0ke25ld05ldXJvbklkeH1gKTtcbiAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeF1bbmV3TmV1cm9uSWR4XSA9IG5ld05ldXJvbjtcblxuICAgICAgaWYgKGlzSW5wdXQpXG4gICAgICAgIG5ld05ldXJvbi5zZXRBc0lucHV0TmV1cm9uKDApO1xuXG4gICAgICAvLy8vIEFkZCBjb25uZWN0aW9ucyBmcm9tIHRoZSBwcmV2IGxheWVyXG4gICAgICBpZiAoIWlzSW5wdXQpIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4IC0gMV0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKG5ldXJvbiwgbmV3TmV1cm9uKTtcbiAgICAgICAgICBuZXVyb24uYWRkT3V0cHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICAgIG5ld05ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4IC0gMV0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIERvbnQgZm9yZ2V0IHRoZSBiaWFzXG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbih0aGlzLmJpYXNOZXVyb24sIG5ld05ldXJvbik7XG4gICAgICAgIG5ld05ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeCAtIDFdLnB1c2goY29ubmVjdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNPdXRwdXQpIHtcbiAgICAgICAgLy8vLyBBZGQgY29ubmVjdGlvbnMgdG8gdGhlIG5leHQgbGF5ZXJcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4ICsgMV0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKG5ld05ldXJvbiwgbmV1cm9uKTtcbiAgICAgICAgICBuZXVyb24uYWRkSW5wdXQoY29ubmVjdGlvbik7XG4gICAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeF0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJlbW92ZWROZXVyb24gPSB0aGlzLm5ldXJvbnNbbGF5ZXJJZHhdLnBvcCgpO1xuICAgICAgLy8gUmVtb3ZlIG91dHB1dHMgZnJvbSB0aGUgcHJldiBsYXllclxuICAgICAgaWYgKCFpc0lucHV0KSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeCAtIDFdLmZvckVhY2goKG5ldXJvbikgPT4ge1xuICAgICAgICAgIG5ldXJvbi5zZXRPdXRwdXRzKG5ldXJvbi5nZXRPdXRwdXRzKCkuZmlsdGVyKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXROYW1lKCkgIT0gcmVtb3ZlZE5ldXJvbi5nZXROYW1lKCk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVtb3ZlIGlucHV0IGluIHRoZSBuZXh0IGxheWVyXG4gICAgICBpZiAoIWlzT3V0cHV0KSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeCArIDFdLmZvckVhY2goKG5ldXJvbikgPT4ge1xuICAgICAgICAgIG5ldXJvbi5zZXRJbnB1dHMobmV1cm9uLmdldElucHV0cygpLmZpbHRlcigoY29ubmVjdGlvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS5nZXROYW1lKCkgIT0gcmVtb3ZlZE5ldXJvbi5nZXROYW1lKCk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVtb3ZlIHRoZSB1bnVzZWQgY29ubmVjdGlvbnNcbiAgICAgIGlmICghaXNJbnB1dCkge1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4LTFdID0gdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeC0xXS5maWx0ZXIoKGNvbm5lY3Rpb246IENvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXROYW1lKCkgIT0gcmVtb3ZlZE5ldXJvbi5nZXROYW1lKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzT3V0cHV0KSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbGF5ZXJJZHhdID0gdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeF0uZmlsdGVyKChjb25uZWN0aW9uOiBDb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS5nZXROYW1lKCkgIT0gcmVtb3ZlZE5ldXJvbi5nZXROYW1lKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25zKDAsIHRoaXMubGF5ZXJDbnQgLSAxKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTGF5ZXJPZk5ldXJvbnMobGF5ZXJJZHg6IG51bWJlciwgbGF5ZXJTaXplOiBudW1iZXIpIHtcbiAgICB0aGlzLm5ldXJvbnNbbGF5ZXJJZHhdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllclNpemU7IGkrKykge1xuICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4XVtpXSA9IG5ldyBOZXVyb24oYE5ldXJvbiR7bGF5ZXJJZHh9JHtpfWApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ29ubmVjdGlvbnMoZmlyc3RMYXllciwgbGFzdExheWVyKSB7XG4gICAgZm9yIChsZXQgbCA9IGZpcnN0TGF5ZXI7IGwgPCBsYXN0TGF5ZXI7IGwrKykge1xuICAgICAgLy8gRm9yIGVhY2ggbmV1cm9uIGluIHRoZSBsYXllciBhZGQgYWxsIGNvbm5lY3Rpb25zIHRvIG5ldXJvbnMgaW4gdGhlIG5leHQgbGF5ZXJcbiAgICAgIHRoaXMuY29ubmVjdGlvbnNbbF0gPSBbXTtcblxuICAgICAgLy8gUmVzZXQgaW5wdXQgJiBvdXRwdXRzXG4gICAgICB0aGlzLm5ldXJvbnNbbCArIDFdLmZvckVhY2gobmV4dE5ldXJvbiA9PiB7IG5leHROZXVyb24ucmVzZXRJbnB1dHMoKSB9KTtcbiAgICAgIHRoaXMubmV1cm9uc1tsXS5mb3JFYWNoKG5leHROZXVyb24gPT4geyBuZXh0TmV1cm9uLnJlc2V0T3V0cHV0cygpIH0pO1xuXG5cbiAgICAgIHRoaXMubmV1cm9uc1tsICsgMV0uZm9yRWFjaChuZXh0TmV1cm9uID0+IHsgLy8gSWYgeW91IHdvbmRlciB3aHkgdGhpcyBjeWNsZXMgYXJlIHN3aXRjaGVkLCBpdCdzIGJlY2F1c2Ugb2YgdGhlIGJpYXNcbiAgICAgICAgdGhpcy5uZXVyb25zW2xdLmZvckVhY2goY3Vyck5ldXJvbiA9PiB7XG4gICAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKGN1cnJOZXVyb24sIG5leHROZXVyb24pXG4gICAgICAgICAgY3Vyck5ldXJvbi5hZGRPdXRwdXQoY29ubmVjdGlvbik7XG4gICAgICAgICAgbmV4dE5ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xdLnB1c2goY29ubmVjdGlvbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEFkZCBiaWFzIG5ldXJvbiB0byBlYWNoIGxheWVyXG4gICAgICAgIGNvbnN0IGJpYXNDb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb24odGhpcy5iaWFzTmV1cm9uLCBuZXh0TmV1cm9uKTtcbiAgICAgICAgbmV4dE5ldXJvbi5hZGRJbnB1dChiaWFzQ29ubmVjdGlvbik7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbF0ucHVzaChiaWFzQ29ubmVjdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0TmV1cm9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5uZXVyb25zO1xuICB9XG5cbiAgcHVibGljIGdldENvbm5lY3Rpb25zKCkge1xuICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb25zO1xuICB9XG5cbiAgcHVibGljIGdldElucHV0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dFNpemU7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGF5ZXJDbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMubGF5ZXJDbnQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0SGlkZGVuTGF5ZXJTaXplcygpIHtcbiAgICByZXR1cm4gdGhpcy5oaWRkZW5MYXllclNpemVzO1xuICB9XG5cbiAgcHVibGljIHNldFJhdGUobmV3UmF0ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5yYXRlID0gbmV3UmF0ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gXCIuL0Nvbm5lY3Rpb25cIjtcbmltcG9ydCB7IEFjdGl2YXRpb25zIH0gZnJvbSBcIi4vSGVscGVyQ2xhc3Nlc1wiO1xuXG5leHBvcnQgY2xhc3MgTmV1cm9uIHtcbiAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBhY3RpdmF0aW9uOiBudW1iZXI7XG4gIHByaXZhdGUgaW5wdXRzOiBDb25uZWN0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBvdXRwdXRzOiBDb25uZWN0aW9uW10gPSBbXTtcblxuICAvLyBUaGUgZGVyaXZhdGlvbiBvZiBDIHdpdGggcmVzcGVjdCB0byB6XG4gIHByaXZhdGUgc2lnbWE6IG51bWJlcjtcbiAgcHJpdmF0ZSBpc0lucHV0OiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaXNDYWxjdWxhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaXNCaWFzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBpc0JpYXMgPSBmYWxzZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pc0JpYXMgPSBpc0JpYXM7XG4gIH07XG5cbiAgcHVibGljIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJc0JpYXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNCaWFzO1xuICB9XG5cbiAgcHVibGljIHNldEFzSW5wdXROZXVyb24oYWN0aXZhdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy5pc0lucHV0ID0gdHJ1ZTtcbiAgICB0aGlzLmFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICAgIHRoaXMuaW5wdXRzID0gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbnB1dChhY3RpdmF0aW9uOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuaXNJbnB1dCkge1xuICAgICAgdGhyb3cgJ0Nhbm5vdCBzZXQgYWN0aXZhdGlvbiBvZiBub24taW5wdXQgbmV1cm9uJztcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICB9XG5cbiAgcHVibGljIHNldFNpZ21hKHNpZ21hOiBudW1iZXIpIHtcbiAgICB0aGlzLnNpZ21hID0gc2lnbWE7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5wdXQoaW5wdXQ6IENvbm5lY3Rpb24pIHtcbiAgICB0aGlzLmlucHV0cy5wdXNoKGlucHV0KTtcbiAgfTtcblxuICBwdWJsaWMgZ2V0SW5wdXRzKCk6IENvbm5lY3Rpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRzO1xuICB9XG5cbiAgcHVibGljIGFkZE91dHB1dChvdXRwdXQ6IENvbm5lY3Rpb24pIHtcbiAgICB0aGlzLm91dHB1dHMucHVzaChvdXRwdXQpO1xuICB9XG5cbiAgcHVibGljIGdldE91dHB1dHMoKTogQ29ubmVjdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5vdXRwdXRzO1xuICB9XG5cbiAgcHVibGljIHNldE91dHB1dHMoY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXSkge1xuICAgIHRoaXMub3V0cHV0cyA9IGNvbm5lY3Rpb25zO1xuICB9XG5cbiAgcHVibGljIHNldElucHV0cyhjb25uZWN0aW9uczogQ29ubmVjdGlvbltdKSB7XG4gICAgdGhpcy5pbnB1dHMgPSBjb25uZWN0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyByZXNldElucHV0cygpIHtcbiAgICB0aGlzLmlucHV0cyA9IFtdO1xuICB9XG5cbiAgcHVibGljIHJlc2V0T3V0cHV0cygpIHtcbiAgICB0aGlzLm91dHB1dHMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGdldEFjdGl2YXRpb24oKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5pc0JpYXMpIHRoaXMuYWN0aXZhdGlvbiA9IDE7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZhdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTaWdtYSgpIHtcbiAgICByZXR1cm4gdGhpcy5zaWdtYTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVBY3RpdmF0aW9uKCk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLmlzSW5wdXQgJiYgIXRoaXMuaXNDYWxjdWxhdGVkICYmICF0aGlzLmlzQmlhcykge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uID0gQWN0aXZhdGlvbnMuU0lHTU9JRC5vdXRwdXQodGhpcy5pbnB1dHMucmVkdWNlKChhY2MsIGN1cnJDb25uKSA9PiBhY2MgKyBjdXJyQ29ubi5jYWxjdWxhdGVWYWx1ZSgpLCAwKSk7XG4gICAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldEFjdGl2YXRpb24oKTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=