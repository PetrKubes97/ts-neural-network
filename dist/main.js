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
        this.lambda = 0.003;
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
        return 1 / 2 * costSum * (1 / this.trainSamples.length) +
            1 / 2 * this.lambda * this.connections.reduce(// Regularization
            (prev, connLayer) => {
                return prev + Math.pow(connLayer.reduce((acc, conn) => acc + conn.getWeight(), 0), 2);
            }, 0) * (1 / this.getNumberOfConnections());
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
                        this.rate -
                        this.lambda * connection.getWeight() * (1 / this.getNumberOfConnections()); // Regularization
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
    getNumberOfConnections() {
        return this.connections.reduce((acc, conn) => acc + conn.length, 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Zpc3VhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL0Nvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25ldXJhbE5ldHdvcmsvSGVscGVyQ2xhc3Nlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV1cmFsTmV0d29yay9OZXVyYWxDb3JlLnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL05ldXJvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0VNO0lBT0osWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxHQUFHLEtBQUs7UUFDaEQsSUFB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QUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxVQUFVLEdBQUcsMERBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDOUIsQ0FBQztDQUNGIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IE5ldXJvbiB9IGZyb20gXCIuL25ldXJhbE5ldHdvcmsvTmV1cm9uXCI7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSBcIi4vbmV1cmFsTmV0d29yay9Db25uZWN0aW9uXCI7XG5cbmV4cG9ydCBjbGFzcyBEcmF3YWJsZU5ldXJvbiB7XG4gIHB1YmxpYyB4OiBudW1iZXI7XG4gIHB1YmxpYyB5OiBudW1iZXI7XG4gIHB1YmxpYyBhY3RpdmF0aW9uOiBudW1iZXI7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBpc0JpYXM6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoeCwgeSwgYWN0aXZhdGlvbiwgbmFtZSwgaXNCaWFzID0gZmFsc2UpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5hY3RpdmF0aW9uID0gYWN0aXZhdGlvbjtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaXNCaWFzID0gaXNCaWFzO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaXN1YWxpemVyIHtcblxuICBwcml2YXRlIGNvbnRlbnQ6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoY29udGVudDogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIHRoaXMuY3R4ID0gY29udGVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuaGVpZ2h0ID0gY29udGVudC5oZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IGNvbnRlbnQud2lkdGg7XG4gIH1cblxuICBwdWJsaWMgZHJhdyhuZXVyb25zOiBOZXVyb25bXVtdLCBjb25uZWN0aW9uczogQ29ubmVjdGlvbltdW10pIHtcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIFxuICAgIGNvbnN0IGRyYXdhYmxlTmV1cm9uczogRHJhd2FibGVOZXVyb25bXSA9IFtdO1xuICAgIGNvbnN0IGxlZnRNYXJnaW4gPSB0aGlzLndpZHRoIC8gKG5ldXJvbnMubGVuZ3RoICsgMSk7XG5cbiAgICAvLyBOZXVyb25zXG4gICAgbmV1cm9ucy5mb3JFYWNoKChsYXllciwgbElkeCkgPT4ge1xuICAgICAgY29uc3QgdG9wTWFyZ2luID0gdGhpcy5oZWlnaHQgLyAobGF5ZXIubGVuZ3RoICsgMik7XG4gICAgICBsYXllci5mb3JFYWNoKChuZXVyb24sIG5JZHgpID0+IHtcbiAgICAgICAgY29uc3QgeCA9IGxlZnRNYXJnaW4gKiAoMSArIGxJZHgpO1xuICAgICAgICBjb25zdCB5ID0gdG9wTWFyZ2luICogKDEgKyBuSWR4KTtcblxuICAgICAgICBjb25zdCBkcmF3YWJsZU5ldXJvbiA9IG5ldyBEcmF3YWJsZU5ldXJvbih4LCB5LCBuZXVyb24uZ2V0QWN0aXZhdGlvbigpLCBuZXVyb24uZ2V0TmFtZSgpKTtcbiAgICAgICAgZHJhd2FibGVOZXVyb25zLnB1c2goZHJhd2FibGVOZXVyb24pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChsSWR4ICE9IG5ldXJvbnMubGVuZ3RoIC0gMSkge1xuICAgICAgICBjb25zdCB4ID0gbGVmdE1hcmdpbiAqICgxICsgbElkeCk7XG4gICAgICAgIGNvbnN0IHkgPSB0b3BNYXJnaW4gKiAoMSArIG5ldXJvbnNbbElkeF0ubGVuZ3RoKTtcblxuICAgICAgICBjb25zdCBkcmF3YWJsZU5ldXJvbiA9IG5ldyBEcmF3YWJsZU5ldXJvbih4LCB5LCAxLCBgYmlhcyR7bElkeH1gLCB0cnVlKTtcbiAgICAgICAgZHJhd2FibGVOZXVyb25zLnB1c2goZHJhd2FibGVOZXVyb24pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQ29ubmVjdGlvbnNcbiAgICBjb25zdCBkcmF3YWJsZU5hbWVNYXAgPSBuZXcgTWFwPHN0cmluZywgRHJhd2FibGVOZXVyb24+KCk7XG4gICAgZHJhd2FibGVOZXVyb25zLmZvckVhY2goXG4gICAgICAoZHJhd2FibGVOZXVyb24pID0+IGRyYXdhYmxlTmFtZU1hcC5zZXQoZHJhd2FibGVOZXVyb24ubmFtZSwgZHJhd2FibGVOZXVyb24pLy8gV1RGLCBJIHdhcyBub3QgYWJsZSB0byBjcmVhdGUgbWFwIGZyb20gMmQgYXJyXG4gICAgKTtcblxuICAgIGNvbm5lY3Rpb25zLmZvckVhY2goKGxheWVyLCBsSWR4KSA9PiB7XG4gICAgICBsYXllci5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0Tk5hbWUgPVxuICAgICAgICAgIChjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0SXNCaWFzKCkpID9cbiAgICAgICAgICAgIGBiaWFzJHtsSWR4fWAgOlxuICAgICAgICAgICAgY29ubmVjdGlvbi5nZXRJbnB1dE5ldXJvbigpLmdldE5hbWUoKTtcblxuICAgICAgICB0aGlzLmRyYXdDb25uZWN0aW9uKFxuICAgICAgICAgIGRyYXdhYmxlTmFtZU1hcC5nZXQoaW5wdXROTmFtZSksXG4gICAgICAgICAgZHJhd2FibGVOYW1lTWFwLmdldChjb25uZWN0aW9uLmdldE91dHB1dE5ldXJvbigpLmdldE5hbWUoKSksXG4gICAgICAgICAgY29ubmVjdGlvbi5nZXRXZWlnaHQoKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkcmF3YWJsZU5ldXJvbnMuZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICB0aGlzLmRyYXdOZXVyb24obmV1cm9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd05ldXJvbihkcmF3YWJsZU5ldXJvbjogRHJhd2FibGVOZXVyb24pIHtcbiAgICAvLyB3aGl0ZSBiYWNrZ3JvdW5kXG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguYXJjKGRyYXdhYmxlTmV1cm9uLngsIGRyYXdhYmxlTmV1cm9uLnksIDI1LCAwLCAyICogTWF0aC5QSSk7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYigyNTUsMjU1LDI1NSlgO1xuICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICBcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICBpZiAoZHJhd2FibGVOZXVyb24uaXNCaWFzKVxuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYmEoNDYsNDAsNDIsIDEpYDtcbiAgICBlbHNlXG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBgcmdiYSgyMywgMTkwLCAxODcsICR7ZHJhd2FibGVOZXVyb24uYWN0aXZhdGlvbn0pYDtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGByZ2IoNDYsNDAsNDIsIDEpYFxuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgdGhpcy5jdHguYXJjKGRyYXdhYmxlTmV1cm9uLngsIGRyYXdhYmxlTmV1cm9uLnksIDI1LCAwLCAyICogTWF0aC5QSSk7XG4gICAgdGhpcy5jdHguZmlsbCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuXG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYig0Niw0MCw0MiwgMSlgXG4gICAgY29uc3QgaGVpZ2h0ID0gMTY7XG4gICAgdGhpcy5jdHguZm9udCA9IGBib2xkICR7aGVpZ2h0fXB4IHNlcmlmYDtcbiAgICBjb25zdCB0ZXh0ID0gTnVtYmVyKGRyYXdhYmxlTmV1cm9uLmFjdGl2YXRpb24pLnRvRml4ZWQoMik7XG4gICAgdGhpcy5jdHguZmlsbFRleHQoXG4gICAgICB0ZXh0LCBcbiAgICAgIGRyYXdhYmxlTmV1cm9uLnggLSB0aGlzLmN0eC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aCAvIDIsIFxuICAgICAgZHJhd2FibGVOZXVyb24ueSArIGhlaWdodCAvIDMpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3Q29ubmVjdGlvbihpbnB1dE5ldXJvbjogRHJhd2FibGVOZXVyb24sIG91dHB1dE5ldXJvbjogRHJhd2FibGVOZXVyb24sIHdlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHgubGluZVdpZHRoID0gKHdlaWdodCA+IDApID8gXG4gICAgICBNYXRoLmxvZyh3ZWlnaHQpIDpcbiAgICAgIE1hdGgubG9nKC13ZWlnaHQpO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gKHdlaWdodCA+IDApID9cbiAgICAgIGByZ2JhKDIwNSwgODMsIDUyLCAke3dlaWdodH0pYCA6XG4gICAgICBgcmdiYSg2MSwgMjMyLCAyNTUsICR7d2VpZ2h0ICogLTF9KWA7XG4gICAgdGhpcy5jdHgubW92ZVRvKGlucHV0TmV1cm9uLngsIGlucHV0TmV1cm9uLnkpO1xuICAgIHRoaXMuY3R4LmxpbmVUbyhvdXRwdXROZXVyb24ueCwgb3V0cHV0TmV1cm9uLnkpO1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWaXN1YWxpemVyIH0gZnJvbSAnLi9WaXN1YWxpemVyJztcbmltcG9ydCB7IE5ldXJhbENvcmUgfSBmcm9tICcuL25ldXJhbE5ldHdvcmsvTmV1cmFsQ29yZSc7XG5cbih3aW5kb3cgYXMgYW55KS5zbGlkZSA9IChpOiBudW1iZXIsIHZhbHVlOiBudW1iZXIpID0+IHtcbiAgaW5wdXRbaV0gPSB2YWx1ZTtcbiAgbmV1cmFsQ29yZS5ldmFsdWF0ZShpbnB1dCk7XG4gIHZpc3VhbGl6ZXIuZHJhdyhuZXVyYWxDb3JlLmdldE5ldXJvbnMoKSwgbmV1cmFsQ29yZS5nZXRDb25uZWN0aW9ucygpKTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLmFkZE9yUmVtb3ZlTGF5ZXIgPSAoYWRkOiBib29sZWFuKSA9PiB7XG4gIG5ldXJhbENvcmUuYWRkT3JSZW1vdmVMYXllcihhZGQpO1xuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcblxuICB1cGRhdGVVSSgpO1xuICB2aXN1YWxpemVyLmRyYXcobmV1cmFsQ29yZS5nZXROZXVyb25zKCksIG5ldXJhbENvcmUuZ2V0Q29ubmVjdGlvbnMoKSk7XG59XG5cbih3aW5kb3cgYXMgYW55KS5hZGRPclJlbW92ZU5ldXJvbiA9IChhZGQ6IGJvb2xlYW4sIGxheWVySWR4OiBudW1iZXIpID0+IHtcbiAgbmV1cmFsQ29yZS5hZGRPclJlbW92ZU5ldXJvbihhZGQsIGxheWVySWR4KTtcbiAgaWYgKGxheWVySWR4ID09IDApIHtcbiAgICBpbnB1dC5wdXNoKDEpO1xuICB9XG4gIG5ldXJhbENvcmUuZXZhbHVhdGUoaW5wdXQpO1xuXG4gIHVwZGF0ZVVJKCk7XG4gIHZpc3VhbGl6ZXIuZHJhdyhuZXVyYWxDb3JlLmdldE5ldXJvbnMoKSwgbmV1cmFsQ29yZS5nZXRDb25uZWN0aW9ucygpKTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLnRyYWluID0gKG11bHRpcGxlSXRlcnM6IGJvb2xlYW4pID0+IHtcbiAgbGV0IGl0ZXJzID0gbXVsdGlwbGVJdGVycyA/IE51bWJlci5wYXJzZUludChpdGVyc0lucHV0LnZhbHVlKSA6IDE7XG4gIG5ldXJhbENvcmUuc2V0UmF0ZShOdW1iZXIucGFyc2VGbG9hdChyYXRlSW5wdXQudmFsdWUpKTtcblxuICBmb3IgKGxldCBpPTA7aTxpdGVycztpKyspIHtcbiAgICBuZXVyYWxDb3JlLnRyYWluKCk7XG4gIH1cblxuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcbiAgdXBkYXRlVUkoKTtcbiAgdmlzdWFsaXplci5kcmF3KG5ldXJhbENvcmUuZ2V0TmV1cm9ucygpLCBuZXVyYWxDb3JlLmdldENvbm5lY3Rpb25zKCkpO1xufVxuXG4od2luZG93IGFzIGFueSkucmVzZXQgPSAoKSA9PiB7XG4gIG5ldXJhbENvcmUucmVzZXQoKTtcbiAgbmV1cmFsQ29yZS5ldmFsdWF0ZShpbnB1dCk7XG4gIHVwZGF0ZVVJKCk7XG4gIHZpc3VhbGl6ZXIuZHJhdyhuZXVyYWxDb3JlLmdldE5ldXJvbnMoKSwgbmV1cmFsQ29yZS5nZXRDb25uZWN0aW9ucygpKTtcbn1cblxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBtYWluKCk7XG59O1xuXG5sZXQgbmV1cmFsQ29yZTogTmV1cmFsQ29yZTtcbmxldCB2aXN1YWxpemVyOiBWaXN1YWxpemVyO1xubGV0IGlucHV0OiBudW1iZXJbXTtcblxubGV0IGlucHV0U2l6ZSA9IDQ7XG5sZXQgaGlkZGVuU2l6ZXMgPSBbM107XG5sZXQgb3V0cHV0U2l6ZSA9IDQ7XG5sZXQgbGF5ZXJDb250cm9sczogSFRNTEVsZW1lbnQ7XG5sZXQgaW5wdXRDb250cm9sczogSFRNTEVsZW1lbnQ7XG5cbmxldCBsYXllckNudDogSFRNTEVsZW1lbnQ7XG5sZXQgY29zdDogSFRNTEVsZW1lbnQ7XG5cbmxldCByYXRlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5sZXQgaXRlcnNJbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuY29uc3QgbWFpbiA9ICgpID0+IHtcbiAgY29uc3QgY29udGVudDogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICBpbnB1dENvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LWNvbnRyb2xzJyk7XG4gIGxheWVyQ29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGF5ZXItY29udHJvbHMnKTtcbiAgbGF5ZXJDbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGF5ZXItY250Jyk7XG4gIGNvc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29zdCcpO1xuICByYXRlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmF0ZS1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGl0ZXJzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXRlcnMtaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIHZpc3VhbGl6ZXIgPSBuZXcgVmlzdWFsaXplcihjb250ZW50KTtcblxuICBpbml0Q29yZSgpO1xufVxuXG5jb25zdCBpbml0Q29yZSA9ICgpID0+IHtcbiAgbmV1cmFsQ29yZSA9IG5ldyBOZXVyYWxDb3JlKGlucHV0U2l6ZSwgaGlkZGVuU2l6ZXMsIG91dHB1dFNpemUpO1xuXG4gIG5ldXJhbENvcmUuYWRkVHJhaW5pbmdTZXQoWzEsMCwwLDBdLCBbMCwxLDAsMF0pO1xuICBuZXVyYWxDb3JlLmFkZFRyYWluaW5nU2V0KFswLDEsMCwwXSwgWzAsMCwxLDBdKTtcbiAgbmV1cmFsQ29yZS5hZGRUcmFpbmluZ1NldChbMCwwLDEsMF0sIFswLDAsMCwxXSk7XG5cbiAgLy8gU2V0IGRlZmF1bHQgdmFsdWVzXG4gIGlucHV0ID0gbmV3IEFycmF5KG5ldXJhbENvcmUuZ2V0SW5wdXRTaXplKCkpO1xuICBpbnB1dC5maWxsKDEpO1xuXG4gIG5ldXJhbENvcmUuZXZhbHVhdGUoaW5wdXQpO1xuICB1cGRhdGVVSSgpO1xuICB2aXN1YWxpemVyLmRyYXcobmV1cmFsQ29yZS5nZXROZXVyb25zKCksIG5ldXJhbENvcmUuZ2V0Q29ubmVjdGlvbnMoKSk7XG59XG5cbmNvbnN0IHVwZGF0ZVVJID0gKCkgPT4ge1xuICBsZXQgY29udGVudCA9ICc8dGFibGU+JztcbiAgY29udGVudCArPSBgPHRyPjx0ZCBhbGlnbj0ncmlnaHQnPklucHV0IHNpemU6IDxiPiR7aW5wdXRTaXplfTwvYj48L3RkPjx0ZD5cbiAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCI+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiIG9uY2xpY2s9XCJhZGRPclJlbW92ZU5ldXJvbihmYWxzZSwgMClcIj4tPC9idXR0b24+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiIG9uY2xpY2s9XCJhZGRPclJlbW92ZU5ldXJvbih0cnVlLCAwKVwiPis8L2J1dHRvbj5cbiAgICA8L2Rpdj48L3RkPjwvdHI+YDtcbiAgXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmV1cmFsQ29yZS5nZXRMYXllckNudCgpIC0gMjsgaSsrKSB7XG4gICAgY29udGVudCArPSBgPHRyPjx0ZCBhbGlnbj0ncmlnaHQnPkhpZGRlbiBsYXllciBzaXplOiA8Yj4ke25ldXJhbENvcmUuZ2V0SGlkZGVuTGF5ZXJTaXplcygpW2ldfTwvYj48L3RkPjx0ZD5cbiAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc21cIiBvbmNsaWNrPVwiYWRkT3JSZW1vdmVOZXVyb24oZmFsc2UsICR7aSsxfSlcIj4tPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCIgb25jbGljaz1cImFkZE9yUmVtb3ZlTmV1cm9uKHRydWUsICR7aSsxfSlcIj4rPC9idXR0b24+XG4gICAgICA8L2Rpdj48L3RkPjwvdHI+YDtcbiAgfVxuICBjb250ZW50ICs9IGA8dHI+PHRkIGFsaWduPSdyaWdodCc+T3V0cHV0IHNpemU6IDxiPiR7b3V0cHV0U2l6ZX08L2I+PC90ZD48dGQ+XG4gICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIHJvbGU9XCJncm91cFwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc21cIiBvbmNsaWNrPVwiYWRkT3JSZW1vdmVOZXVyb24oZmFsc2UsICR7bmV1cmFsQ29yZS5nZXRMYXllckNudCgpLTF9KVwiPi08L2J1dHRvbj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCIgb25jbGljaz1cImFkZE9yUmVtb3ZlTmV1cm9uKHRydWUsICR7bmV1cmFsQ29yZS5nZXRMYXllckNudCgpLTF9KVwiPis8L2J1dHRvbj5cbiAgICA8L2Rpdj48L3RkPjwvdHI+YDtcbiAgY29udGVudCArPSAnPC90YWJsZT4nO1xuXG4gIGxheWVyQ29udHJvbHMuaW5uZXJIVE1MID0gY29udGVudDtcblxuICBpbnB1dENvbnRyb2xzLmlubmVySFRNTCA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG5ldXJhbENvcmUuZ2V0SW5wdXRTaXplKCk7IGkrKykge1xuICAgIGlucHV0Q29udHJvbHMuaW5uZXJIVE1MICs9IGBOZXVyb24gJHtpfTogPGlucHV0IHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlOyB0b3A6IDVweDtcIiB0eXBlPVwicmFuZ2VcIiBtaW49XCIwXCIgbWF4PVwiMVwiIHZhbHVlPVwiMVwiIHN0ZXA9XCIwLjA1XCIgaWQ9XCJzbGlkZXIke2l9XCIgb25pbnB1dD1cInNsaWRlKCR7aX0sIHRoaXMudmFsdWUpO1wiPjxicj5gO1xuICB9XG5cbiAgbGF5ZXJDbnQuaW5uZXJUZXh0ID0gbmV1cmFsQ29yZS5nZXRMYXllckNudCgpLnRvU3RyaW5nKCk7XG4gIGNvc3QuaW5uZXJIVE1MID0gbmV1cmFsQ29yZS5nZXRDb3N0KCkudG9TdHJpbmcoKTtcbn0iLCJpbXBvcnQgeyBOZXVyb24gfSBmcm9tIFwiLi9OZXVyb25cIjtcblxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb24ge1xuICBwcml2YXRlIHdlaWdodDogbnVtYmVyID0gTWF0aC5yYW5kb20oKSAqIDEwIC0gNTtcbiAgcHJpdmF0ZSBpbnB1dE5ldXJvbjogTmV1cm9uO1xuICBwcml2YXRlIG91dHB1dE5ldXJvbjogTmV1cm9uO1xuICBwcml2YXRlIHNhbXBsZVdlaWdodENoYW5nZXM6IG51bWJlcltdID0gW107XG5cbiAgY29uc3RydWN0b3IoaW5wdXQ6IE5ldXJvbiwgb3V0cHV0OiBOZXVyb24pIHtcbiAgICB0aGlzLmlucHV0TmV1cm9uID0gaW5wdXQ7XG4gICAgdGhpcy5vdXRwdXROZXVyb24gPSBvdXRwdXQ7XG4gIH1cblxuICBwdWJsaWMgYWRkU2FtcGxlV2VpZ2h0Q2hhbmdlKHdlaWdodENoYW5nZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zYW1wbGVXZWlnaHRDaGFuZ2VzLnB1c2god2VpZ2h0Q2hhbmdlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBseUF2ZXJhZ2VXZWlnaHRDaGFuZ2UoKSB7XG4gICAgY29uc3QgY2hhbmdlID0gKHRoaXMuc2FtcGxlV2VpZ2h0Q2hhbmdlcy5yZWR1Y2UoKGFjYywgdmFsKSA9PiBhY2MgKyB2YWwsIDApIC8gdGhpcy5zYW1wbGVXZWlnaHRDaGFuZ2VzLmxlbmd0aCk7XG4gICAgdGhpcy53ZWlnaHQgKz0gY2hhbmdlO1xuICAgIHRoaXMuc2FtcGxlV2VpZ2h0Q2hhbmdlcyA9IFtdO1xuICB9XG5cbiAgcHVibGljIGdldFdlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy53ZWlnaHQ7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMud2VpZ2h0ICogdGhpcy5pbnB1dE5ldXJvbi5jYWxjdWxhdGVBY3RpdmF0aW9uKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0T3V0cHV0TmV1cm9uKCkge1xuICAgIHJldHVybiB0aGlzLm91dHB1dE5ldXJvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJbnB1dE5ldXJvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dE5ldXJvbjtcbiAgfVxufSIsImV4cG9ydCBpbnRlcmZhY2UgQWN0aXZhdGlvbiB7XG4gIGRlcih4OiBudW1iZXIpOiBudW1iZXI7XG4gIG91dHB1dCh4OiBudW1iZXIpOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBBY3RpdmF0aW9ucyB7XG4gIHB1YmxpYyBzdGF0aWMgU0lHTU9JRDogQWN0aXZhdGlvbiA9IHtcbiAgICBvdXRwdXQ6ICh4OiBudW1iZXIpOiBudW1iZXIgPT4gMSAvICgxICsgTWF0aC5leHAoLXgpKSxcbiAgICBkZXI6ICh4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgICAgbGV0IG91dHB1dCA9IEFjdGl2YXRpb25zLlNJR01PSUQub3V0cHV0KHgpO1xuICAgICAgcmV0dXJuIG91dHB1dCAqICgxIC0gb3V0cHV0KTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBjbGFzcyBUcmFpblNhbXBsZSB7XG4gIHB1YmxpYyBpbnB1dDogbnVtYmVyW107XG4gIHB1YmxpYyBvdXRwdXQ6IG51bWJlcltdO1xuXG4gIGNvbnN0cnVjdG9yKGlucHV0OiBudW1iZXJbXSwgb3V0cHV0OiBudW1iZXJbXSkge1xuICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICB0aGlzLm91dHB1dCA9IG91dHB1dDtcbiAgfVxufSIsImltcG9ydCB7IE5ldXJvbiB9IGZyb20gXCIuL05ldXJvblwiO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gXCIuL0Nvbm5lY3Rpb25cIjtcbmltcG9ydCB7IFRyYWluU2FtcGxlLCBBY3RpdmF0aW9ucyB9IGZyb20gXCIuL0hlbHBlckNsYXNzZXNcIjtcblxuZXhwb3J0IGNsYXNzIE5ldXJhbENvcmUge1xuICBwcml2YXRlIGlucHV0U2l6ZTogbnVtYmVyO1xuICBwcml2YXRlIGhpZGRlbkxheWVyU2l6ZXM6IG51bWJlcltdO1xuICBwcml2YXRlIG91dHB1dFNpemU6IG51bWJlcjtcblxuICBwcml2YXRlIGxheWVyQ250OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSByYXRlID0gMTtcbiAgcHJpdmF0ZSBsYW1iZGEgPSAwLjAwMztcblxuICBwcml2YXRlIGJpYXNOZXVyb24gPSBuZXcgTmV1cm9uKCdiaWFzJywgdHJ1ZSk7XG4gIHByaXZhdGUgbmV1cm9uczogTmV1cm9uW11bXSA9IFtdO1xuICBwcml2YXRlIGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW11bXSA9IFtdO1xuXG4gIHByaXZhdGUgdHJhaW5TYW1wbGVzOiBUcmFpblNhbXBsZVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoaW5wdXRTaXplOiBudW1iZXIsIGhpZGRlbkxheWVyU2l6ZXM6IG51bWJlcltdLCBvdXRwdXRTaXplOiBudW1iZXIpIHtcbiAgICB0aGlzLmlucHV0U2l6ZSA9IGlucHV0U2l6ZTtcbiAgICB0aGlzLmhpZGRlbkxheWVyU2l6ZXMgPSBoaWRkZW5MYXllclNpemVzO1xuICAgIHRoaXMub3V0cHV0U2l6ZSA9IG91dHB1dFNpemU7XG4gICAgdGhpcy5sYXllckNudCA9IGhpZGRlbkxheWVyU2l6ZXMubGVuZ3RoICsgMjtcblxuICAgIC8vIFJlc2V0XG4gICAgdGhpcy5uZXVyb25zID0gW107XG4gICAgdGhpcy5jb25uZWN0aW9ucyA9IFtdO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgLy8gQ3JlYXRlIHRoZSBuZXVyb25zXG4gICAgZm9yIChsZXQgbCA9IDA7IGwgPCB0aGlzLmxheWVyQ250OyBsKyspIHtcbiAgICAgIC8vIEhvdyBtYW55IG5ldXJvbnMgYXJlIGluIGVhY2ggbGF5ZXI/XG4gICAgICBsZXQgbmV1cm9uc0luTGF5ZXJDbnQgPSAwO1xuICAgICAgc3dpdGNoIChsKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBuZXVyb25zSW5MYXllckNudCA9IHRoaXMuaW5wdXRTaXplO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRoaXMuaGlkZGVuTGF5ZXJTaXplcy5sZW5ndGggKyAxOlxuICAgICAgICAgIG5ldXJvbnNJbkxheWVyQ250ID0gdGhpcy5vdXRwdXRTaXplO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG5ldXJvbnNJbkxheWVyQ250ID0gdGhpcy5oaWRkZW5MYXllclNpemVzW2wgLSAxXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdGhpcy5uZXVyb25zW2xdID0gW107XG5cbiAgICAgIC8vIENyZWF0ZSB0aGVtXG4gICAgICBmb3IgKGxldCBuID0gMDsgbiA8IG5ldXJvbnNJbkxheWVyQ250OyBuKyspIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xdW25dID0gbmV3IE5ldXJvbihgTmV1cm9uJHtsfSR7bn1gKTtcbiAgICAgICAgaWYgKGwgPT0gMCkge1xuICAgICAgICAgIHRoaXMubmV1cm9uc1tsXVtuXS5zZXRBc0lucHV0TmV1cm9uKDApOyAvLyBqdXN0IHRvIGF2b2lkIGNyYXNoZXMsIHRoZSAwIHNob3VsZCBiZSBvdmVycmlkZW4gbGF0ZXIgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgdGhlIENvbm5lY3Rpb25zXG4gICAgdGhpcy5jcmVhdGVDb25uZWN0aW9ucygwLCB0aGlzLmxheWVyQ250IC0gMSk7XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGUoaW5wdXQ6IG51bWJlcltdKTogbnVtYmVyW10ge1xuICAgIGlmIChpbnB1dC5sZW5ndGggIT0gdGhpcy5pbnB1dFNpemUpIHtcbiAgICAgIHRocm93ICdJbnB1dCBzaXplIGRvZXMgbm90IG1hdGNoJztcbiAgICB9XG4gICAgLy8gUmVzZXQsIHNvIGVhY2ggbmV1cm9uIGlzIHJlY2FsY3VsYXRlZFxuICAgIHRoaXMubmV1cm9ucy5mb3JFYWNoKGxheWVyID0+IHsgbGF5ZXIuZm9yRWFjaChuZXVyb24gPT4gbmV1cm9uLnJlc2V0KCkpIH0pXG4gICAgLy8gU2V0IGlucHV0IGxheWVyXG4gICAgdGhpcy5uZXVyb25zWzBdLmZvckVhY2goKG5ldXJvbiwgaWR4KSA9PiB7IG5ldXJvbi5zZXRJbnB1dChpbnB1dFtpZHhdKSB9KTtcblxuICAgIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250IC0gMV0uZm9yRWFjaChuZXVyb24gPT4ge1xuICAgICAgbmV1cm9uLmNhbGN1bGF0ZUFjdGl2YXRpb24oKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLm1hcChuZXVyb24gPT4gbmV1cm9uLmdldEFjdGl2YXRpb24oKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkVHJhaW5pbmdTZXQoaW5wdXQ6IG51bWJlcltdLCBvdXRwdXQ6IG51bWJlcltdKSB7XG4gICAgdGhpcy50cmFpblNhbXBsZXMucHVzaChuZXcgVHJhaW5TYW1wbGUoaW5wdXQsIG91dHB1dCkpXG4gIH1cblxuICBwdWJsaWMgZ2V0Q29zdCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLnRyYWluU2FtcGxlcy5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgY29uc3QgY29zdFN1bSA9IHRoaXMudHJhaW5TYW1wbGVzLnJlZHVjZSgoY29zdFN1bSwgc2FtcGxlKSA9PiB7IC8vIEFkZCB1cCBhbGwgc2FtcGxlc1xuICAgICAgdGhpcy5ldmFsdWF0ZShzYW1wbGUuaW5wdXQpO1xuICAgICAgcmV0dXJuIGNvc3RTdW0gKyB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLnJlZHVjZSgoYWNjLCBuZXVyb24sIGkpID0+IHsgLy8gQWRkIHVwIGFsbCBvdXRwdXQgbmV1cm9uc1xuICAgICAgICByZXR1cm4gYWNjICsgKG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkgLSBzYW1wbGUub3V0cHV0W2ldKSAqKiAyO1xuICAgICAgfSwgMCk7XG4gICAgfSwgMCk7XG5cbiAgICByZXR1cm4gMSAvIDIgKiBjb3N0U3VtICogKDEgLyB0aGlzLnRyYWluU2FtcGxlcy5sZW5ndGgpICsgXG4gICAgICAxIC8gMiAqIHRoaXMubGFtYmRhICogdGhpcy5jb25uZWN0aW9ucy5yZWR1Y2UoIC8vIFJlZ3VsYXJpemF0aW9uXG4gICAgICAgIChwcmV2LCBjb25uTGF5ZXI6IENvbm5lY3Rpb25bXSkgPT4ge1xuICAgICAgICAgIHJldHVybiBwcmV2ICsgY29ubkxheWVyLnJlZHVjZSgoYWNjLCBjb25uKSA9PiBhY2MgKyBjb25uLmdldFdlaWdodCgpLCAwKSAqKiAyXG4gICAgICAgIH0sIDApICogKDEgLyB0aGlzLmdldE51bWJlck9mQ29ubmVjdGlvbnMoKSk7XG4gIH1cblxuICBwdWJsaWMgdHJhaW4oKSB7XG4gICAgdGhpcy50cmFpblNhbXBsZXMuZm9yRWFjaCgoc2FtcGxlKSA9PiB7XG4gICAgICB0aGlzLmV2YWx1YXRlKHNhbXBsZS5pbnB1dClcblxuICAgICAgLy8gQ2FsY3VsYXRlIHNpZ21hcyBvZiB0aGUgbGFzdCBsYXllclxuICAgICAgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5mb3JFYWNoKChuZXVyb24sIGlkeCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdTaWdtYSA9XG4gICAgICAgICAgKHNhbXBsZS5vdXRwdXRbaWR4XSAtIG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkpICogQWN0aXZhdGlvbnMuU0lHTU9JRC5kZXIobmV1cm9uLmdldEFjdGl2YXRpb24oKSk7XG5cbiAgICAgICAgbmV1cm9uLnNldFNpZ21hKG5ld1NpZ21hKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBDYWxjdWxhdGUgc2lnbWFzIGZvciBlYWNoIG5ldXJvbiBpbiB0aGUgbG93ZXIgbGF5ZXJzXG4gICAgICBmb3IgKGxldCBsID0gdGhpcy5sYXllckNudCAtIDI7IGwgPj0gMDsgbC0tKSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsXS5mb3JFYWNoKChuZXVyb24pID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdTaWdtYSA9XG4gICAgICAgICAgICBuZXVyb24uZ2V0T3V0cHV0cygpLnJlZHVjZSgoYWNjLCBjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBhY2MgKyBjb25uZWN0aW9uLmdldE91dHB1dE5ldXJvbigpLmdldFNpZ21hKCkgKiBjb25uZWN0aW9uLmdldFdlaWdodCgpO1xuICAgICAgICAgICAgfSwgMCkgKiBBY3RpdmF0aW9ucy5TSUdNT0lELmRlcihuZXVyb24uZ2V0QWN0aXZhdGlvbigpKTtcbiAgICAgICAgICBuZXVyb24uc2V0U2lnbWEobmV3U2lnbWEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gQWNjdW11bGF0ZSBhbGwgd2VpZ2h0IHVwZGF0ZXNcbiAgICAgIHRoaXMuY29ubmVjdGlvbnMuZm9yRWFjaCgoY29ubkxheWVyKSA9PiB7XG4gICAgICAgIGNvbm5MYXllci5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgY29uc3Qgd2VpZ2h0Q2hhbmdlID1cbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0U2lnbWEoKSAqXG4gICAgICAgICAgICBjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0QWN0aXZhdGlvbigpICpcbiAgICAgICAgICAgIHRoaXMucmF0ZSAtIFxuICAgICAgICAgICAgdGhpcy5sYW1iZGEgKiBjb25uZWN0aW9uLmdldFdlaWdodCgpICogKDEgLyB0aGlzLmdldE51bWJlck9mQ29ubmVjdGlvbnMoKSk7IC8vIFJlZ3VsYXJpemF0aW9uXG5cbiAgICAgICAgICBjb25uZWN0aW9uLmFkZFNhbXBsZVdlaWdodENoYW5nZSh3ZWlnaHRDaGFuZ2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gVWZmLCBsZXQncyBob3BlIGV2ZXJ5dGhpbmcgd29ya3MgYW5kIGFwcGx5IHRoZSBtYWdpY1xuICAgIHRoaXMuY29ubmVjdGlvbnMuZm9yRWFjaCgoY29ubkxheWVyKSA9PiB7XG4gICAgICBjb25uTGF5ZXIuZm9yRWFjaCgoY29ubmVjdGlvbikgPT4ge1xuICAgICAgICBjb25uZWN0aW9uLmFwcGx5QXZlcmFnZVdlaWdodENoYW5nZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYWRkT3JSZW1vdmVMYXllcihhZGQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoYWRkKSB7XG4gICAgICBjb25zdCBuZXdMYXllclNpemUgPSAzO1xuICAgICAgdGhpcy5oaWRkZW5MYXllclNpemVzLnB1c2gobmV3TGF5ZXJTaXplKTtcbiAgICAgIHRoaXMubGF5ZXJDbnQrKztcblxuICAgICAgLy8gQ3JlYXRlIHRoZSBuZXcgbmV1cm9uc1xuICAgICAgdGhpcy5jcmVhdGVMYXllck9mTmV1cm9ucyh0aGlzLmxheWVyQ250IC0gMiwgbmV3TGF5ZXJTaXplKTtcblxuICAgICAgLy8gUmVjcmVhdGUgdGhlIGxhc3QgbGF5ZXJcbiAgICAgIHRoaXMuY3JlYXRlTGF5ZXJPZk5ldXJvbnModGhpcy5sYXllckNudCAtIDEsIHRoaXMub3V0cHV0U2l6ZSk7XG5cbiAgICAgIC8vIFJlY3JlYXRlIGFsbCBuZWNlc3NhcnkgY29ubmVjdGlvbnNcbiAgICAgIHRoaXMuY3JlYXRlQ29ubmVjdGlvbnModGhpcy5sYXllckNudCAtIDMsIHRoaXMubGF5ZXJDbnQgLSAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMubGF5ZXJDbnQgPT0gMikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplcy5wb3AoKTtcbiAgICAgIHRoaXMubGF5ZXJDbnQtLTtcbiAgICAgIHRoaXMubmV1cm9ucy5wb3AoKTtcbiAgICAgIHRoaXMuY29ubmVjdGlvbnMucG9wKCk7XG5cbiAgICAgIC8vIFJlY3JlYXRlIHRoZSBsYXN0IGxheWVyXG4gICAgICB0aGlzLmNyZWF0ZUxheWVyT2ZOZXVyb25zKHRoaXMubGF5ZXJDbnQgLSAxLCB0aGlzLm91dHB1dFNpemUpO1xuXG4gICAgICAvLyBSZWNyZWF0ZSBhbGwgbmVjZXNzYXJ5IGNvbm5lY3Rpb25zXG4gICAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25zKHRoaXMubGF5ZXJDbnQgLSAyLCB0aGlzLmxheWVyQ250IC0gMSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVGhpcyBmdW5jdGlvbiBpcyB2ZXJ5IGxvbmcgYW5kIHVnbHksIEkgZG9udCB3YW50IHRvIHNpbXBseSByZWJ1aWxkIHRoZSBuZXR3b3JrIGJlY2F1c2UgSSB3YW50IHRvIGtlZXAgdGhlIHdlaWdodHNcbiAgcHVibGljIGFkZE9yUmVtb3ZlTmV1cm9uKGFkZDogYm9vbGVhbiwgbGF5ZXJJZHg6IG51bWJlcikge1xuICAgIGNvbnN0IGlzSW5wdXQgPSBsYXllcklkeCA9PSAwO1xuICAgIGNvbnN0IGlzT3V0cHV0ID0gbGF5ZXJJZHggPT0gdGhpcy5sYXllckNudCAtIDE7XG4gICAgY29uc3QgaXNIaWRkZW4gPSAhaXNJbnB1dCAmJiAhaXNPdXRwdXQ7XG4gICAgXG4gICAgY29uc3Qgc2l6ZUNoYW5nZSA9IChhZGQpID8gMSA6IC0xXG5cbiAgICBpZiAoaXNIaWRkZW4pIHtcbiAgICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplc1tsYXllcklkeCAtIDFdICs9IHNpemVDaGFuZ2U7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzSW5wdXQpIHtcbiAgICAgIHRoaXMuaW5wdXRTaXplICs9IHNpemVDaGFuZ2U7XG4gICAgICB0aGlzLnRyYWluU2FtcGxlcyA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm91dHB1dFNpemUgKz0gc2l6ZUNoYW5nZTtcbiAgICAgIHRoaXMudHJhaW5TYW1wbGVzID0gW107XG4gICAgfVxuXG4gICAgaWYgKGFkZCkge1xuICAgICAgbGV0IG5ld05ldXJvbklkeDtcblxuICAgICAgaWYgKGlzSGlkZGVuKSB7XG4gICAgICAgIG5ld05ldXJvbklkeCA9IHRoaXMuaGlkZGVuTGF5ZXJTaXplc1tsYXllcklkeCAtIDFdIC0gMTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzSW5wdXQpIHtcbiAgICAgICAgbmV3TmV1cm9uSWR4ID0gdGhpcy5pbnB1dFNpemUgLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3TmV1cm9uSWR4ID0gdGhpcy5vdXRwdXRTaXplIC0gMTtcbiAgICAgIH0gIFxuXG4gICAgICBjb25zdCBuZXdOZXVyb24gPSBuZXcgTmV1cm9uKGBOZXVyb24ke2xheWVySWR4fSR7bmV3TmV1cm9uSWR4fWApO1xuICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4XVtuZXdOZXVyb25JZHhdID0gbmV3TmV1cm9uO1xuXG4gICAgICBpZiAoaXNJbnB1dClcbiAgICAgICAgbmV3TmV1cm9uLnNldEFzSW5wdXROZXVyb24oMCk7XG5cbiAgICAgIC8vLy8gQWRkIGNvbm5lY3Rpb25zIGZyb20gdGhlIHByZXYgbGF5ZXJcbiAgICAgIGlmICghaXNJbnB1dCkge1xuICAgICAgICB0aGlzLm5ldXJvbnNbbGF5ZXJJZHggLSAxXS5mb3JFYWNoKChuZXVyb24pID0+IHtcbiAgICAgICAgICBjb25zdCBjb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb24obmV1cm9uLCBuZXdOZXVyb24pO1xuICAgICAgICAgIG5ldXJvbi5hZGRPdXRwdXQoY29ubmVjdGlvbik7XG4gICAgICAgICAgbmV3TmV1cm9uLmFkZElucHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbGF5ZXJJZHggLSAxXS5wdXNoKGNvbm5lY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gRG9udCBmb3JnZXQgdGhlIGJpYXNcbiAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKHRoaXMuYmlhc05ldXJvbiwgbmV3TmV1cm9uKTtcbiAgICAgICAgbmV3TmV1cm9uLmFkZElucHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4IC0gMV0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc091dHB1dCkge1xuICAgICAgICAvLy8vIEFkZCBjb25uZWN0aW9ucyB0byB0aGUgbmV4dCBsYXllclxuICAgICAgICB0aGlzLm5ldXJvbnNbbGF5ZXJJZHggKyAxXS5mb3JFYWNoKChuZXVyb24pID0+IHtcbiAgICAgICAgICBjb25zdCBjb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb24obmV3TmV1cm9uLCBuZXVyb24pO1xuICAgICAgICAgIG5ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4XS5wdXNoKGNvbm5lY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVtb3ZlZE5ldXJvbiA9IHRoaXMubmV1cm9uc1tsYXllcklkeF0ucG9wKCk7XG4gICAgICAvLyBSZW1vdmUgb3V0cHV0cyBmcm9tIHRoZSBwcmV2IGxheWVyXG4gICAgICBpZiAoIWlzSW5wdXQpIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4IC0gMV0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgbmV1cm9uLnNldE91dHB1dHMobmV1cm9uLmdldE91dHB1dHMoKS5maWx0ZXIoKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLmdldE91dHB1dE5ldXJvbigpLmdldE5hbWUoKSAhPSByZW1vdmVkTmV1cm9uLmdldE5hbWUoKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmUgaW5wdXQgaW4gdGhlIG5leHQgbGF5ZXJcbiAgICAgIGlmICghaXNPdXRwdXQpIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4ICsgMV0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgbmV1cm9uLnNldElucHV0cyhuZXVyb24uZ2V0SW5wdXRzKCkuZmlsdGVyKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5nZXRJbnB1dE5ldXJvbigpLmdldE5hbWUoKSAhPSByZW1vdmVkTmV1cm9uLmdldE5hbWUoKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmUgdGhlIHVudXNlZCBjb25uZWN0aW9uc1xuICAgICAgaWYgKCFpc0lucHV0KSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbGF5ZXJJZHgtMV0gPSB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4LTFdLmZpbHRlcigoY29ubmVjdGlvbjogQ29ubmVjdGlvbikgPT4ge1xuICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLmdldE91dHB1dE5ldXJvbigpLmdldE5hbWUoKSAhPSByZW1vdmVkTmV1cm9uLmdldE5hbWUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNPdXRwdXQpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeF0gPSB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4XS5maWx0ZXIoKGNvbm5lY3Rpb246IENvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5nZXRJbnB1dE5ldXJvbigpLmdldE5hbWUoKSAhPSByZW1vdmVkTmV1cm9uLmdldE5hbWUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlc2V0KCkge1xuICAgIHRoaXMuY3JlYXRlQ29ubmVjdGlvbnMoMCwgdGhpcy5sYXllckNudCAtIDEpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVMYXllck9mTmV1cm9ucyhsYXllcklkeDogbnVtYmVyLCBsYXllclNpemU6IG51bWJlcikge1xuICAgIHRoaXMubmV1cm9uc1tsYXllcklkeF0gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVyU2l6ZTsgaSsrKSB7XG4gICAgICB0aGlzLm5ldXJvbnNbbGF5ZXJJZHhdW2ldID0gbmV3IE5ldXJvbihgTmV1cm9uJHtsYXllcklkeH0ke2l9YCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDb25uZWN0aW9ucyhmaXJzdExheWVyLCBsYXN0TGF5ZXIpIHtcbiAgICBmb3IgKGxldCBsID0gZmlyc3RMYXllcjsgbCA8IGxhc3RMYXllcjsgbCsrKSB7XG4gICAgICAvLyBGb3IgZWFjaCBuZXVyb24gaW4gdGhlIGxheWVyIGFkZCBhbGwgY29ubmVjdGlvbnMgdG8gbmV1cm9ucyBpbiB0aGUgbmV4dCBsYXllclxuICAgICAgdGhpcy5jb25uZWN0aW9uc1tsXSA9IFtdO1xuXG4gICAgICAvLyBSZXNldCBpbnB1dCAmIG91dHB1dHNcbiAgICAgIHRoaXMubmV1cm9uc1tsICsgMV0uZm9yRWFjaChuZXh0TmV1cm9uID0+IHsgbmV4dE5ldXJvbi5yZXNldElucHV0cygpIH0pO1xuICAgICAgdGhpcy5uZXVyb25zW2xdLmZvckVhY2gobmV4dE5ldXJvbiA9PiB7IG5leHROZXVyb24ucmVzZXRPdXRwdXRzKCkgfSk7XG5cblxuICAgICAgdGhpcy5uZXVyb25zW2wgKyAxXS5mb3JFYWNoKG5leHROZXVyb24gPT4geyAvLyBJZiB5b3Ugd29uZGVyIHdoeSB0aGlzIGN5Y2xlcyBhcmUgc3dpdGNoZWQsIGl0J3MgYmVjYXVzZSBvZiB0aGUgYmlhc1xuICAgICAgICB0aGlzLm5ldXJvbnNbbF0uZm9yRWFjaChjdXJyTmV1cm9uID0+IHtcbiAgICAgICAgICBjb25zdCBjb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb24oY3Vyck5ldXJvbiwgbmV4dE5ldXJvbilcbiAgICAgICAgICBjdXJyTmV1cm9uLmFkZE91dHB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICBuZXh0TmV1cm9uLmFkZElucHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbF0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQWRkIGJpYXMgbmV1cm9uIHRvIGVhY2ggbGF5ZXJcbiAgICAgICAgY29uc3QgYmlhc0Nvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbih0aGlzLmJpYXNOZXVyb24sIG5leHROZXVyb24pO1xuICAgICAgICBuZXh0TmV1cm9uLmFkZElucHV0KGJpYXNDb25uZWN0aW9uKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsXS5wdXNoKGJpYXNDb25uZWN0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0TnVtYmVyT2ZDb25uZWN0aW9ucygpOm51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbnMucmVkdWNlKChhY2MsIGNvbm4pID0+IGFjYyArIGNvbm4ubGVuZ3RoLCAwKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXROZXVyb25zKCkge1xuICAgIHJldHVybiB0aGlzLm5ldXJvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29ubmVjdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0SW5wdXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0U2l6ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRMYXllckNudCgpIHtcbiAgICByZXR1cm4gdGhpcy5sYXllckNudDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRIaWRkZW5MYXllclNpemVzKCkge1xuICAgIHJldHVybiB0aGlzLmhpZGRlbkxheWVyU2l6ZXM7XG4gIH1cblxuICBwdWJsaWMgc2V0UmF0ZShuZXdSYXRlOiBudW1iZXIpIHtcbiAgICB0aGlzLnJhdGUgPSBuZXdSYXRlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSBcIi4vQ29ubmVjdGlvblwiO1xuaW1wb3J0IHsgQWN0aXZhdGlvbnMgfSBmcm9tIFwiLi9IZWxwZXJDbGFzc2VzXCI7XG5cbmV4cG9ydCBjbGFzcyBOZXVyb24ge1xuICBwcml2YXRlIG5hbWU6IHN0cmluZztcblxuICBwcml2YXRlIGFjdGl2YXRpb246IG51bWJlcjtcbiAgcHJpdmF0ZSBpbnB1dHM6IENvbm5lY3Rpb25bXSA9IFtdO1xuICBwcml2YXRlIG91dHB1dHM6IENvbm5lY3Rpb25bXSA9IFtdO1xuXG4gIC8vIFRoZSBkZXJpdmF0aW9uIG9mIEMgd2l0aCByZXNwZWN0IHRvIHpcbiAgcHJpdmF0ZSBzaWdtYTogbnVtYmVyO1xuICBwcml2YXRlIGlzSW5wdXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBpc0NhbGN1bGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBpc0JpYXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGlzQmlhcyA9IGZhbHNlKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlzQmlhcyA9IGlzQmlhcztcbiAgfTtcblxuICBwdWJsaWMgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgcHVibGljIGdldElzQmlhcygpIHtcbiAgICByZXR1cm4gdGhpcy5pc0JpYXM7XG4gIH1cblxuICBwdWJsaWMgc2V0QXNJbnB1dE5ldXJvbihhY3RpdmF0aW9uOiBudW1iZXIpIHtcbiAgICB0aGlzLmlzSW5wdXQgPSB0cnVlO1xuICAgIHRoaXMuYWN0aXZhdGlvbiA9IGFjdGl2YXRpb247XG4gICAgdGhpcy5pbnB1dHMgPSBudWxsO1xuICB9XG5cbiAgcHVibGljIHNldElucHV0KGFjdGl2YXRpb246IG51bWJlcikge1xuICAgIGlmICghdGhpcy5pc0lucHV0KSB7XG4gICAgICB0aHJvdyAnQ2Fubm90IHNldCBhY3RpdmF0aW9uIG9mIG5vbi1pbnB1dCBuZXVyb24nO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZhdGlvbiA9IGFjdGl2YXRpb247XG4gIH1cblxuICBwdWJsaWMgc2V0U2lnbWEoc2lnbWE6IG51bWJlcikge1xuICAgIHRoaXMuc2lnbWEgPSBzaWdtYTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJbnB1dChpbnB1dDogQ29ubmVjdGlvbikge1xuICAgIHRoaXMuaW5wdXRzLnB1c2goaW5wdXQpO1xuICB9O1xuXG4gIHB1YmxpYyBnZXRJbnB1dHMoKTogQ29ubmVjdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dHM7XG4gIH1cblxuICBwdWJsaWMgYWRkT3V0cHV0KG91dHB1dDogQ29ubmVjdGlvbikge1xuICAgIHRoaXMub3V0cHV0cy5wdXNoKG91dHB1dCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0T3V0cHV0cygpOiBDb25uZWN0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLm91dHB1dHM7XG4gIH1cblxuICBwdWJsaWMgc2V0T3V0cHV0cyhjb25uZWN0aW9uczogQ29ubmVjdGlvbltdKSB7XG4gICAgdGhpcy5vdXRwdXRzID0gY29ubmVjdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5wdXRzKGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW10pIHtcbiAgICB0aGlzLmlucHV0cyA9IGNvbm5lY3Rpb25zO1xuICB9XG5cbiAgcHVibGljIHJlc2V0SW5wdXRzKCkge1xuICAgIHRoaXMuaW5wdXRzID0gW107XG4gIH1cblxuICBwdWJsaWMgcmVzZXRPdXRwdXRzKCkge1xuICAgIHRoaXMub3V0cHV0cyA9IFtdO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCkge1xuICAgIHRoaXMuaXNDYWxjdWxhdGVkID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0QWN0aXZhdGlvbigpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmlzQmlhcykgdGhpcy5hY3RpdmF0aW9uID0gMTtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmF0aW9uO1xuICB9XG5cbiAgcHVibGljIGdldFNpZ21hKCkge1xuICAgIHJldHVybiB0aGlzLnNpZ21hO1xuICB9XG5cbiAgcHVibGljIGNhbGN1bGF0ZUFjdGl2YXRpb24oKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMuaXNJbnB1dCAmJiAhdGhpcy5pc0NhbGN1bGF0ZWQgJiYgIXRoaXMuaXNCaWFzKSB7XG4gICAgICB0aGlzLmFjdGl2YXRpb24gPSBBY3RpdmF0aW9ucy5TSUdNT0lELm91dHB1dCh0aGlzLmlucHV0cy5yZWR1Y2UoKGFjYywgY3VyckNvbm4pID0+IGFjYyArIGN1cnJDb25uLmNhbGN1bGF0ZVZhbHVlKCksIDApKTtcbiAgICAgIHRoaXMuaXNDYWxjdWxhdGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0QWN0aXZhdGlvbigpO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==