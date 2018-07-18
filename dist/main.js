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
const main = () => {
    const content = document.getElementById('content');
    inputControls = document.getElementById('input-controls');
    layerControls = document.getElementById('layer-controls');
    iter = document.getElementById('iter-output');
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
        this.iterCnt = 0;
        this.rate = 1;
        this.lambda = 0.001;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Zpc3VhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL0Nvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25ldXJhbE5ldHdvcmsvSGVscGVyQ2xhc3Nlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV1cmFsTmV0d29yay9OZXVyYWxDb3JlLnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL05ldXJvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0VNO0lBT0osWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxHQUFHLEtBQUs7UUFDaEQsSUFB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TyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDOUIsQ0FBQztDQUNGIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IE5ldXJvbiB9IGZyb20gXCIuL25ldXJhbE5ldHdvcmsvTmV1cm9uXCI7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSBcIi4vbmV1cmFsTmV0d29yay9Db25uZWN0aW9uXCI7XG5cbmV4cG9ydCBjbGFzcyBEcmF3YWJsZU5ldXJvbiB7XG4gIHB1YmxpYyB4OiBudW1iZXI7XG4gIHB1YmxpYyB5OiBudW1iZXI7XG4gIHB1YmxpYyBhY3RpdmF0aW9uOiBudW1iZXI7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBpc0JpYXM6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoeCwgeSwgYWN0aXZhdGlvbiwgbmFtZSwgaXNCaWFzID0gZmFsc2UpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5hY3RpdmF0aW9uID0gYWN0aXZhdGlvbjtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaXNCaWFzID0gaXNCaWFzO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaXN1YWxpemVyIHtcblxuICBwcml2YXRlIGNvbnRlbnQ6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoY29udGVudDogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIHRoaXMuY3R4ID0gY29udGVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuaGVpZ2h0ID0gY29udGVudC5oZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IGNvbnRlbnQud2lkdGg7XG4gIH1cblxuICBwdWJsaWMgZHJhdyhuZXVyb25zOiBOZXVyb25bXVtdLCBjb25uZWN0aW9uczogQ29ubmVjdGlvbltdW10pIHtcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIFxuICAgIGNvbnN0IGRyYXdhYmxlTmV1cm9uczogRHJhd2FibGVOZXVyb25bXSA9IFtdO1xuICAgIGNvbnN0IGxlZnRNYXJnaW4gPSB0aGlzLndpZHRoIC8gKG5ldXJvbnMubGVuZ3RoICsgMSk7XG5cbiAgICAvLyBOZXVyb25zXG4gICAgbmV1cm9ucy5mb3JFYWNoKChsYXllciwgbElkeCkgPT4ge1xuICAgICAgY29uc3QgdG9wTWFyZ2luID0gdGhpcy5oZWlnaHQgLyAobGF5ZXIubGVuZ3RoICsgMik7XG4gICAgICBsYXllci5mb3JFYWNoKChuZXVyb24sIG5JZHgpID0+IHtcbiAgICAgICAgY29uc3QgeCA9IGxlZnRNYXJnaW4gKiAoMSArIGxJZHgpO1xuICAgICAgICBjb25zdCB5ID0gdG9wTWFyZ2luICogKDEgKyBuSWR4KTtcblxuICAgICAgICBjb25zdCBkcmF3YWJsZU5ldXJvbiA9IG5ldyBEcmF3YWJsZU5ldXJvbih4LCB5LCBuZXVyb24uZ2V0QWN0aXZhdGlvbigpLCBuZXVyb24uZ2V0TmFtZSgpKTtcbiAgICAgICAgZHJhd2FibGVOZXVyb25zLnB1c2goZHJhd2FibGVOZXVyb24pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChsSWR4ICE9IG5ldXJvbnMubGVuZ3RoIC0gMSkge1xuICAgICAgICBjb25zdCB4ID0gbGVmdE1hcmdpbiAqICgxICsgbElkeCk7XG4gICAgICAgIGNvbnN0IHkgPSB0b3BNYXJnaW4gKiAoMSArIG5ldXJvbnNbbElkeF0ubGVuZ3RoKTtcblxuICAgICAgICBjb25zdCBkcmF3YWJsZU5ldXJvbiA9IG5ldyBEcmF3YWJsZU5ldXJvbih4LCB5LCAxLCBgYmlhcyR7bElkeH1gLCB0cnVlKTtcbiAgICAgICAgZHJhd2FibGVOZXVyb25zLnB1c2goZHJhd2FibGVOZXVyb24pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQ29ubmVjdGlvbnNcbiAgICBjb25zdCBkcmF3YWJsZU5hbWVNYXAgPSBuZXcgTWFwPHN0cmluZywgRHJhd2FibGVOZXVyb24+KCk7XG4gICAgZHJhd2FibGVOZXVyb25zLmZvckVhY2goXG4gICAgICAoZHJhd2FibGVOZXVyb24pID0+IGRyYXdhYmxlTmFtZU1hcC5zZXQoZHJhd2FibGVOZXVyb24ubmFtZSwgZHJhd2FibGVOZXVyb24pLy8gV1RGLCBJIHdhcyBub3QgYWJsZSB0byBjcmVhdGUgbWFwIGZyb20gMmQgYXJyXG4gICAgKTtcblxuICAgIGNvbm5lY3Rpb25zLmZvckVhY2goKGxheWVyLCBsSWR4KSA9PiB7XG4gICAgICBsYXllci5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0Tk5hbWUgPVxuICAgICAgICAgIChjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0SXNCaWFzKCkpID9cbiAgICAgICAgICAgIGBiaWFzJHtsSWR4fWAgOlxuICAgICAgICAgICAgY29ubmVjdGlvbi5nZXRJbnB1dE5ldXJvbigpLmdldE5hbWUoKTtcblxuICAgICAgICB0aGlzLmRyYXdDb25uZWN0aW9uKFxuICAgICAgICAgIGRyYXdhYmxlTmFtZU1hcC5nZXQoaW5wdXROTmFtZSksXG4gICAgICAgICAgZHJhd2FibGVOYW1lTWFwLmdldChjb25uZWN0aW9uLmdldE91dHB1dE5ldXJvbigpLmdldE5hbWUoKSksXG4gICAgICAgICAgY29ubmVjdGlvbi5nZXRXZWlnaHQoKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkcmF3YWJsZU5ldXJvbnMuZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICB0aGlzLmRyYXdOZXVyb24obmV1cm9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd05ldXJvbihkcmF3YWJsZU5ldXJvbjogRHJhd2FibGVOZXVyb24pIHtcbiAgICAvLyB3aGl0ZSBiYWNrZ3JvdW5kXG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguYXJjKGRyYXdhYmxlTmV1cm9uLngsIGRyYXdhYmxlTmV1cm9uLnksIDI1LCAwLCAyICogTWF0aC5QSSk7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYigyNTUsMjU1LDI1NSlgO1xuICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICBcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICBpZiAoZHJhd2FibGVOZXVyb24uaXNCaWFzKVxuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYmEoNDYsNDAsNDIsIDEpYDtcbiAgICBlbHNlXG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBgcmdiYSgyMywgMTkwLCAxODcsICR7ZHJhd2FibGVOZXVyb24uYWN0aXZhdGlvbn0pYDtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGByZ2IoNDYsNDAsNDIsIDEpYFxuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgdGhpcy5jdHguYXJjKGRyYXdhYmxlTmV1cm9uLngsIGRyYXdhYmxlTmV1cm9uLnksIDI1LCAwLCAyICogTWF0aC5QSSk7XG4gICAgdGhpcy5jdHguZmlsbCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuXG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYig0Niw0MCw0MiwgMSlgXG4gICAgY29uc3QgaGVpZ2h0ID0gMTY7XG4gICAgdGhpcy5jdHguZm9udCA9IGBib2xkICR7aGVpZ2h0fXB4IHNlcmlmYDtcbiAgICBjb25zdCB0ZXh0ID0gTnVtYmVyKGRyYXdhYmxlTmV1cm9uLmFjdGl2YXRpb24pLnRvRml4ZWQoMik7XG4gICAgdGhpcy5jdHguZmlsbFRleHQoXG4gICAgICB0ZXh0LCBcbiAgICAgIGRyYXdhYmxlTmV1cm9uLnggLSB0aGlzLmN0eC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aCAvIDIsIFxuICAgICAgZHJhd2FibGVOZXVyb24ueSArIGhlaWdodCAvIDMpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3Q29ubmVjdGlvbihpbnB1dE5ldXJvbjogRHJhd2FibGVOZXVyb24sIG91dHB1dE5ldXJvbjogRHJhd2FibGVOZXVyb24sIHdlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHgubGluZVdpZHRoID0gKHdlaWdodCA+IDApID8gXG4gICAgICBNYXRoLmxvZyh3ZWlnaHQpIDpcbiAgICAgIE1hdGgubG9nKC13ZWlnaHQpO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gKHdlaWdodCA+IDApID9cbiAgICAgIGByZ2JhKDIwNSwgODMsIDUyLCAke3dlaWdodH0pYCA6XG4gICAgICBgcmdiYSg2MSwgMjMyLCAyNTUsICR7d2VpZ2h0ICogLTF9KWA7XG4gICAgdGhpcy5jdHgubW92ZVRvKGlucHV0TmV1cm9uLngsIGlucHV0TmV1cm9uLnkpO1xuICAgIHRoaXMuY3R4LmxpbmVUbyhvdXRwdXROZXVyb24ueCwgb3V0cHV0TmV1cm9uLnkpO1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWaXN1YWxpemVyIH0gZnJvbSAnLi9WaXN1YWxpemVyJztcbmltcG9ydCB7IE5ldXJhbENvcmUgfSBmcm9tICcuL25ldXJhbE5ldHdvcmsvTmV1cmFsQ29yZSc7XG5cbih3aW5kb3cgYXMgYW55KS5zbGlkZSA9IChpOiBudW1iZXIsIHZhbHVlOiBudW1iZXIpID0+IHtcbiAgaW5wdXRbaV0gPSB2YWx1ZTtcbiAgbmV1cmFsQ29yZS5ldmFsdWF0ZShpbnB1dCk7XG4gIHZpc3VhbGl6ZXIuZHJhdyhuZXVyYWxDb3JlLmdldE5ldXJvbnMoKSwgbmV1cmFsQ29yZS5nZXRDb25uZWN0aW9ucygpKTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLmFkZE9yUmVtb3ZlTGF5ZXIgPSAoYWRkOiBib29sZWFuKSA9PiB7XG4gIG5ldXJhbENvcmUuYWRkT3JSZW1vdmVMYXllcihhZGQpO1xuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcblxuICB1cGRhdGVVSSgpO1xuICB2aXN1YWxpemVyLmRyYXcobmV1cmFsQ29yZS5nZXROZXVyb25zKCksIG5ldXJhbENvcmUuZ2V0Q29ubmVjdGlvbnMoKSk7XG59XG5cbih3aW5kb3cgYXMgYW55KS5hZGRPclJlbW92ZU5ldXJvbiA9IChhZGQ6IGJvb2xlYW4sIGxheWVySWR4OiBudW1iZXIpID0+IHtcbiAgbmV1cmFsQ29yZS5hZGRPclJlbW92ZU5ldXJvbihhZGQsIGxheWVySWR4KTtcbiAgaWYgKGxheWVySWR4ID09IDApIHtcbiAgICBpZiAoYWRkKVxuICAgICAgaW5wdXQucHVzaCgxKTtcbiAgICBlbHNlXG4gICAgICBpbnB1dC5wb3AoKTtcbiAgfVxuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcblxuICB1cGRhdGVVSSgpO1xuICB2aXN1YWxpemVyLmRyYXcobmV1cmFsQ29yZS5nZXROZXVyb25zKCksIG5ldXJhbENvcmUuZ2V0Q29ubmVjdGlvbnMoKSk7XG59XG5cbih3aW5kb3cgYXMgYW55KS50cmFpbiA9IChtdWx0aXBsZUl0ZXJzOiBib29sZWFuKSA9PiB7XG4gIGxldCBpdGVycyA9IG11bHRpcGxlSXRlcnMgPyBOdW1iZXIucGFyc2VJbnQoaXRlcnNJbnB1dC52YWx1ZSkgOiAxO1xuICBuZXVyYWxDb3JlLnNldFJhdGUoTnVtYmVyLnBhcnNlRmxvYXQocmF0ZUlucHV0LnZhbHVlKSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyczsgaSsrKSB7XG4gICAgbmV1cmFsQ29yZS50cmFpbigpO1xuICB9XG5cbiAgbmV1cmFsQ29yZS5ldmFsdWF0ZShpbnB1dCk7XG4gIHVwZGF0ZVVJKCk7XG4gIHZpc3VhbGl6ZXIuZHJhdyhuZXVyYWxDb3JlLmdldE5ldXJvbnMoKSwgbmV1cmFsQ29yZS5nZXRDb25uZWN0aW9ucygpKTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLnJlc2V0ID0gKCkgPT4ge1xuICBuZXVyYWxDb3JlLnJlc2V0KCk7XG4gIG5ldXJhbENvcmUuZXZhbHVhdGUoaW5wdXQpO1xuICB1cGRhdGVVSSgpO1xuICB2aXN1YWxpemVyLmRyYXcobmV1cmFsQ29yZS5nZXROZXVyb25zKCksIG5ldXJhbENvcmUuZ2V0Q29ubmVjdGlvbnMoKSk7XG59XG5cblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgbWFpbigpO1xufTtcblxubGV0IG5ldXJhbENvcmU6IE5ldXJhbENvcmU7XG5sZXQgdmlzdWFsaXplcjogVmlzdWFsaXplcjtcbmxldCBpbnB1dDogbnVtYmVyW107XG5cbmxldCBpbnB1dFNpemUgPSA0O1xubGV0IGhpZGRlblNpemVzID0gWzNdO1xubGV0IG91dHB1dFNpemUgPSA0O1xubGV0IGxheWVyQ29udHJvbHM6IEhUTUxFbGVtZW50O1xubGV0IGlucHV0Q29udHJvbHM6IEhUTUxFbGVtZW50O1xuXG5sZXQgY29zdDogSFRNTEVsZW1lbnQ7XG5sZXQgaXRlcjogSFRNTEVsZW1lbnQ7XG5cbmxldCByYXRlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5sZXQgaXRlcnNJbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuY29uc3QgbWFpbiA9ICgpID0+IHtcbiAgY29uc3QgY29udGVudDogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICBpbnB1dENvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LWNvbnRyb2xzJyk7XG4gIGxheWVyQ29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGF5ZXItY29udHJvbHMnKTtcbiAgaXRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVyLW91dHB1dCcpO1xuICBjb3N0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvc3QnKTtcbiAgcmF0ZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhdGUtaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICBpdGVyc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZXJzLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICB2aXN1YWxpemVyID0gbmV3IFZpc3VhbGl6ZXIoY29udGVudCk7XG5cbiAgaW5pdENvcmUoKTtcbn1cblxuY29uc3QgaW5pdENvcmUgPSAoKSA9PiB7XG4gIG5ldXJhbENvcmUgPSBuZXcgTmV1cmFsQ29yZShpbnB1dFNpemUsIGhpZGRlblNpemVzLCBvdXRwdXRTaXplKTtcblxuICBuZXVyYWxDb3JlLmFkZFRyYWluaW5nU2V0KFsxLCAwLCAwLCAwXSwgWzAsIDEsIDAsIDBdKTtcbiAgbmV1cmFsQ29yZS5hZGRUcmFpbmluZ1NldChbMCwgMSwgMCwgMF0sIFswLCAwLCAxLCAwXSk7XG4gIG5ldXJhbENvcmUuYWRkVHJhaW5pbmdTZXQoWzAsIDAsIDEsIDBdLCBbMCwgMCwgMCwgMV0pO1xuXG4gIC8vIFNldCBkZWZhdWx0IHZhbHVlc1xuICBpbnB1dCA9IG5ldyBBcnJheShuZXVyYWxDb3JlLmdldElucHV0U2l6ZSgpKTtcbiAgaW5wdXQuZmlsbCgxKTtcblxuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcbiAgdXBkYXRlVUkoKTtcbiAgdmlzdWFsaXplci5kcmF3KG5ldXJhbENvcmUuZ2V0TmV1cm9ucygpLCBuZXVyYWxDb3JlLmdldENvbm5lY3Rpb25zKCkpO1xufVxuXG5jb25zdCB1cGRhdGVVSSA9ICgpID0+IHtcbiAgbGV0IGNvbnRlbnQgPSBhZGRMYXllckNvbnRyb2xSb3coXG4gICAgJ0xheWVycycsXG4gICAgbmV1cmFsQ29yZS5nZXRMYXllckNudCgpLnRvU3RyaW5nKCksXG4gICAgJ2FkZE9yUmVtb3ZlTGF5ZXIodHJ1ZSknLFxuICAgICdhZGRPclJlbW92ZUxheWVyKGZhbHNlKSdcbiAgKTtcblxuXG4gIGNvbnRlbnQgKz0gYWRkTGF5ZXJDb250cm9sUm93KFxuICAgICdJbnB1dCBzaXplJyxcbiAgICBuZXVyYWxDb3JlLmdldElucHV0U2l6ZSgpLnRvU3RyaW5nKCksXG4gICAgJ2FkZE9yUmVtb3ZlTmV1cm9uKHRydWUsIDApJyxcbiAgICAnYWRkT3JSZW1vdmVOZXVyb24oZmFsc2UsIDApJ1xuICApO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmV1cmFsQ29yZS5nZXRMYXllckNudCgpIC0gMjsgaSsrKSB7XG4gICAgY29udGVudCArPSBhZGRMYXllckNvbnRyb2xSb3coXG4gICAgICAnSGlkZGVuIGxheWVyIHNpemUnLFxuICAgICAgbmV1cmFsQ29yZS5nZXRIaWRkZW5MYXllclNpemVzKClbaV0udG9TdHJpbmcoKSxcbiAgICAgIGBhZGRPclJlbW92ZU5ldXJvbih0cnVlLCAke2kgKyAxfSlgLFxuICAgICAgYGFkZE9yUmVtb3ZlTmV1cm9uKGZhbHNlLCAke2kgKyAxfSlgXG4gICAgKTtcbiAgfVxuXG4gIGNvbnRlbnQgKz0gYWRkTGF5ZXJDb250cm9sUm93KFxuICAgICdPdXRwdXQgc2l6ZScsXG4gICAgbmV1cmFsQ29yZS5nZXRPdXRwdXRTaXplKCkudG9TdHJpbmcoKSxcbiAgICBgYWRkT3JSZW1vdmVOZXVyb24odHJ1ZSwgJHtuZXVyYWxDb3JlLmdldExheWVyQ250KCkgLSAxfSlgLFxuICAgIGBhZGRPclJlbW92ZU5ldXJvbihmYWxzZSwgJHtuZXVyYWxDb3JlLmdldExheWVyQ250KCkgLSAxfSlgXG4gICk7XG5cbiAgbGF5ZXJDb250cm9scy5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gIGlucHV0Q29udHJvbHMuaW5uZXJIVE1MID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmV1cmFsQ29yZS5nZXRJbnB1dFNpemUoKTsgaSsrKSB7XG4gICAgaW5wdXRDb250cm9scy5pbm5lckhUTUwgKz0gYDxsYWJlbD5OZXVyb24gJHtpfTo8L2xhYmVsPiA8aW5wdXQgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7IHRvcDogNXB4O1wiIHR5cGU9XCJyYW5nZVwiIG1pbj1cIjBcIiBtYXg9XCIxXCIgdmFsdWU9XCIxXCIgc3RlcD1cIjAuMDVcIiBpZD1cInNsaWRlciR7aX1cIiBvbmlucHV0PVwic2xpZGUoJHtpfSwgdGhpcy52YWx1ZSk7XCI+PGJyPmA7XG4gIH1cblxuICBpdGVyLmlubmVySFRNTCA9IG5ldXJhbENvcmUuZ2V0SXRlcmF0aW9uKCkudG9TdHJpbmcoKTtcbiAgY29zdC5pbm5lckhUTUwgPSBuZXVyYWxDb3JlLmdldENvc3QoKS50b1N0cmluZygpO1xufVxuXG5jb25zdCBhZGRMYXllckNvbnRyb2xSb3cgPSAobGFiZWw6IHN0cmluZywgc2l6ZTogc3RyaW5nLCBvbmNsaWNrUG9zOiBzdHJpbmcsIG9uY2xpY2tOZWc6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBgPHRyPjx0ZCBhbGlnbj0ncmlnaHQnPjxsYWJlbD4ke2xhYmVsfTo8L2xhYmVsPjxiIHN0eWxlPVwibWFyZ2luOiBhdXRvIDZweFwiPiR7c2l6ZX08L2I+PC90ZD48dGQ+XG4gIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiIG9uY2xpY2s9XCIke29uY2xpY2tOZWd9XCI+LTwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCIgb25jbGljaz1cIiR7b25jbGlja1Bvc31cIj4rPC9idXR0b24+XG4gIDwvZGl2PjwvdGQ+PC90cj5gO1xufSIsImltcG9ydCB7IE5ldXJvbiB9IGZyb20gXCIuL05ldXJvblwiO1xuXG5leHBvcnQgY2xhc3MgQ29ubmVjdGlvbiB7XG4gIHByaXZhdGUgd2VpZ2h0OiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogMTAgLSA1O1xuICBwcml2YXRlIGlucHV0TmV1cm9uOiBOZXVyb247XG4gIHByaXZhdGUgb3V0cHV0TmV1cm9uOiBOZXVyb247XG4gIHByaXZhdGUgc2FtcGxlV2VpZ2h0Q2hhbmdlczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihpbnB1dDogTmV1cm9uLCBvdXRwdXQ6IE5ldXJvbikge1xuICAgIHRoaXMuaW5wdXROZXVyb24gPSBpbnB1dDtcbiAgICB0aGlzLm91dHB1dE5ldXJvbiA9IG91dHB1dDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTYW1wbGVXZWlnaHRDaGFuZ2Uod2VpZ2h0Q2hhbmdlOiBudW1iZXIpIHtcbiAgICB0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMucHVzaCh3ZWlnaHRDaGFuZ2UpO1xuICB9XG5cbiAgcHVibGljIGFwcGx5QXZlcmFnZVdlaWdodENoYW5nZSgpIHtcbiAgICBjb25zdCBjaGFuZ2UgPSAodGhpcy5zYW1wbGVXZWlnaHRDaGFuZ2VzLnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYyArIHZhbCwgMCkgLyB0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMubGVuZ3RoKTtcbiAgICB0aGlzLndlaWdodCArPSBjaGFuZ2U7XG4gICAgdGhpcy5zYW1wbGVXZWlnaHRDaGFuZ2VzID0gW107XG4gIH1cblxuICBwdWJsaWMgZ2V0V2VpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLndlaWdodDtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy53ZWlnaHQgKiB0aGlzLmlucHV0TmV1cm9uLmNhbGN1bGF0ZUFjdGl2YXRpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPdXRwdXROZXVyb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub3V0cHV0TmV1cm9uO1xuICB9XG5cbiAgcHVibGljIGdldElucHV0TmV1cm9uKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0TmV1cm9uO1xuICB9XG59IiwiZXhwb3J0IGludGVyZmFjZSBBY3RpdmF0aW9uIHtcbiAgZGVyKHg6IG51bWJlcik6IG51bWJlcjtcbiAgb3V0cHV0KHg6IG51bWJlcik6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEFjdGl2YXRpb25zIHtcbiAgcHVibGljIHN0YXRpYyBTSUdNT0lEOiBBY3RpdmF0aW9uID0ge1xuICAgIG91dHB1dDogKHg6IG51bWJlcik6IG51bWJlciA9PiAxIC8gKDEgKyBNYXRoLmV4cCgteCkpLFxuICAgIGRlcjogKHg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgICBsZXQgb3V0cHV0ID0gQWN0aXZhdGlvbnMuU0lHTU9JRC5vdXRwdXQoeCk7XG4gICAgICByZXR1cm4gb3V0cHV0ICogKDEgLSBvdXRwdXQpO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIFRyYWluU2FtcGxlIHtcbiAgcHVibGljIGlucHV0OiBudW1iZXJbXTtcbiAgcHVibGljIG91dHB1dDogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IoaW5wdXQ6IG51bWJlcltdLCBvdXRwdXQ6IG51bWJlcltdKSB7XG4gICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgIHRoaXMub3V0cHV0ID0gb3V0cHV0O1xuICB9XG59IiwiaW1wb3J0IHsgTmV1cm9uIH0gZnJvbSBcIi4vTmV1cm9uXCI7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSBcIi4vQ29ubmVjdGlvblwiO1xuaW1wb3J0IHsgVHJhaW5TYW1wbGUsIEFjdGl2YXRpb25zIH0gZnJvbSBcIi4vSGVscGVyQ2xhc3Nlc1wiO1xuXG5leHBvcnQgY2xhc3MgTmV1cmFsQ29yZSB7XG4gIHByaXZhdGUgaW5wdXRTaXplOiBudW1iZXI7XG4gIHByaXZhdGUgaGlkZGVuTGF5ZXJTaXplczogbnVtYmVyW107XG4gIHByaXZhdGUgb3V0cHV0U2l6ZTogbnVtYmVyO1xuXG4gIHByaXZhdGUgbGF5ZXJDbnQ6IG51bWJlcjtcblxuICBwcml2YXRlIGl0ZXJDbnQgPSAwO1xuXG4gIHByaXZhdGUgcmF0ZSA9IDE7XG4gIHByaXZhdGUgbGFtYmRhID0gMC4wMDE7XG5cbiAgcHJpdmF0ZSBiaWFzTmV1cm9uID0gbmV3IE5ldXJvbignYmlhcycsIHRydWUpO1xuICBwcml2YXRlIG5ldXJvbnM6IE5ldXJvbltdW10gPSBbXTtcbiAgcHJpdmF0ZSBjb25uZWN0aW9uczogQ29ubmVjdGlvbltdW10gPSBbXTtcblxuICBwcml2YXRlIHRyYWluU2FtcGxlczogVHJhaW5TYW1wbGVbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGlucHV0U2l6ZTogbnVtYmVyLCBoaWRkZW5MYXllclNpemVzOiBudW1iZXJbXSwgb3V0cHV0U2l6ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5pbnB1dFNpemUgPSBpbnB1dFNpemU7XG4gICAgdGhpcy5oaWRkZW5MYXllclNpemVzID0gaGlkZGVuTGF5ZXJTaXplcztcbiAgICB0aGlzLm91dHB1dFNpemUgPSBvdXRwdXRTaXplO1xuICAgIHRoaXMubGF5ZXJDbnQgPSBoaWRkZW5MYXllclNpemVzLmxlbmd0aCArIDI7XG5cbiAgICAvLyBSZXNldFxuICAgIHRoaXMubmV1cm9ucyA9IFtdO1xuICAgIHRoaXMuY29ubmVjdGlvbnMgPSBbXTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIC8vIENyZWF0ZSB0aGUgbmV1cm9uc1xuICAgIGZvciAobGV0IGwgPSAwOyBsIDwgdGhpcy5sYXllckNudDsgbCsrKSB7XG4gICAgICAvLyBIb3cgbWFueSBuZXVyb25zIGFyZSBpbiBlYWNoIGxheWVyP1xuICAgICAgbGV0IG5ldXJvbnNJbkxheWVyQ250ID0gMDtcbiAgICAgIHN3aXRjaCAobCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgbmV1cm9uc0luTGF5ZXJDbnQgPSB0aGlzLmlucHV0U2l6ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0aGlzLmhpZGRlbkxheWVyU2l6ZXMubGVuZ3RoICsgMTpcbiAgICAgICAgICBuZXVyb25zSW5MYXllckNudCA9IHRoaXMub3V0cHV0U2l6ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBuZXVyb25zSW5MYXllckNudCA9IHRoaXMuaGlkZGVuTGF5ZXJTaXplc1tsIC0gMV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubmV1cm9uc1tsXSA9IFtdO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlbVxuICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBuZXVyb25zSW5MYXllckNudDsgbisrKSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsXVtuXSA9IG5ldyBOZXVyb24oYE5ldXJvbiR7bH0ke259YCk7XG4gICAgICAgIGlmIChsID09IDApIHtcbiAgICAgICAgICB0aGlzLm5ldXJvbnNbbF1bbl0uc2V0QXNJbnB1dE5ldXJvbigwKTsgLy8ganVzdCB0byBhdm9pZCBjcmFzaGVzLCB0aGUgMCBzaG91bGQgYmUgb3ZlcnJpZGVuIGxhdGVyIFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHRoZSBDb25uZWN0aW9uc1xuICAgIHRoaXMuY3JlYXRlQ29ubmVjdGlvbnMoMCwgdGhpcy5sYXllckNudCAtIDEpO1xuICB9XG5cbiAgcHVibGljIGV2YWx1YXRlKGlucHV0OiBudW1iZXJbXSk6IG51bWJlcltdIHtcbiAgICBpZiAoaW5wdXQubGVuZ3RoICE9IHRoaXMuaW5wdXRTaXplKSB7XG4gICAgICB0aHJvdyAnSW5wdXQgc2l6ZSBkb2VzIG5vdCBtYXRjaCc7XG4gICAgfVxuICAgIC8vIFJlc2V0LCBzbyBlYWNoIG5ldXJvbiBpcyByZWNhbGN1bGF0ZWRcbiAgICB0aGlzLm5ldXJvbnMuZm9yRWFjaChsYXllciA9PiB7IGxheWVyLmZvckVhY2gobmV1cm9uID0+IG5ldXJvbi5yZXNldCgpKSB9KVxuICAgIC8vIFNldCBpbnB1dCBsYXllclxuICAgIHRoaXMubmV1cm9uc1swXS5mb3JFYWNoKChuZXVyb24sIGlkeCkgPT4geyBuZXVyb24uc2V0SW5wdXQoaW5wdXRbaWR4XSkgfSk7XG5cbiAgICB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLmZvckVhY2gobmV1cm9uID0+IHtcbiAgICAgIG5ldXJvbi5jYWxjdWxhdGVBY3RpdmF0aW9uKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5tYXAobmV1cm9uID0+IG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkpO1xuICB9XG5cbiAgcHVibGljIGFkZFRyYWluaW5nU2V0KGlucHV0OiBudW1iZXJbXSwgb3V0cHV0OiBudW1iZXJbXSkge1xuICAgIHRoaXMudHJhaW5TYW1wbGVzLnB1c2gobmV3IFRyYWluU2FtcGxlKGlucHV0LCBvdXRwdXQpKVxuICB9XG5cbiAgcHVibGljIGdldENvc3QoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy50cmFpblNhbXBsZXMubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGNvbnN0IGNvc3RTdW0gPSB0aGlzLnRyYWluU2FtcGxlcy5yZWR1Y2UoKGNvc3RTdW0sIHNhbXBsZSkgPT4geyAvLyBBZGQgdXAgYWxsIHNhbXBsZXNcbiAgICAgIHRoaXMuZXZhbHVhdGUoc2FtcGxlLmlucHV0KTtcbiAgICAgIHJldHVybiBjb3N0U3VtICsgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5yZWR1Y2UoKGFjYywgbmV1cm9uLCBpKSA9PiB7IC8vIEFkZCB1cCBhbGwgb3V0cHV0IG5ldXJvbnNcbiAgICAgICAgcmV0dXJuIGFjYyArIChuZXVyb24uZ2V0QWN0aXZhdGlvbigpIC0gc2FtcGxlLm91dHB1dFtpXSkgKiogMjtcbiAgICAgIH0sIDApO1xuICAgIH0sIDApO1xuXG4gICAgcmV0dXJuIDEgLyAyICogY29zdFN1bSAqICgxIC8gdGhpcy50cmFpblNhbXBsZXMubGVuZ3RoKSArXG4gICAgICAxIC8gMiAqIHRoaXMubGFtYmRhICogdGhpcy5jb25uZWN0aW9ucy5yZWR1Y2UoIC8vIFJlZ3VsYXJpemF0aW9uXG4gICAgICAgIChwcmV2LCBjb25uTGF5ZXI6IENvbm5lY3Rpb25bXSkgPT4ge1xuICAgICAgICAgIHJldHVybiBwcmV2ICsgY29ubkxheWVyLnJlZHVjZSgoYWNjLCBjb25uKSA9PiBhY2MgKyBjb25uLmdldFdlaWdodCgpLCAwKSAqKiAyXG4gICAgICAgIH0sIDApICogKDEgLyB0aGlzLmdldE51bWJlck9mQ29ubmVjdGlvbnMoKSk7XG4gIH1cblxuICBwdWJsaWMgdHJhaW4oKSB7XG4gICAgdGhpcy50cmFpblNhbXBsZXMuZm9yRWFjaCgoc2FtcGxlKSA9PiB7XG4gICAgICB0aGlzLmV2YWx1YXRlKHNhbXBsZS5pbnB1dClcblxuICAgICAgLy8gQ2FsY3VsYXRlIHNpZ21hcyBvZiB0aGUgbGFzdCBsYXllclxuICAgICAgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5mb3JFYWNoKChuZXVyb24sIGlkeCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdTaWdtYSA9XG4gICAgICAgICAgKHNhbXBsZS5vdXRwdXRbaWR4XSAtIG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkpICogQWN0aXZhdGlvbnMuU0lHTU9JRC5kZXIobmV1cm9uLmdldEFjdGl2YXRpb24oKSk7XG5cbiAgICAgICAgbmV1cm9uLnNldFNpZ21hKG5ld1NpZ21hKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBDYWxjdWxhdGUgc2lnbWFzIGZvciBlYWNoIG5ldXJvbiBpbiB0aGUgbG93ZXIgbGF5ZXJzXG4gICAgICBmb3IgKGxldCBsID0gdGhpcy5sYXllckNudCAtIDI7IGwgPj0gMDsgbC0tKSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsXS5mb3JFYWNoKChuZXVyb24pID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdTaWdtYSA9XG4gICAgICAgICAgICBuZXVyb24uZ2V0T3V0cHV0cygpLnJlZHVjZSgoYWNjLCBjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBhY2MgKyBjb25uZWN0aW9uLmdldE91dHB1dE5ldXJvbigpLmdldFNpZ21hKCkgKiBjb25uZWN0aW9uLmdldFdlaWdodCgpO1xuICAgICAgICAgICAgfSwgMCkgKiBBY3RpdmF0aW9ucy5TSUdNT0lELmRlcihuZXVyb24uZ2V0QWN0aXZhdGlvbigpKTtcbiAgICAgICAgICBuZXVyb24uc2V0U2lnbWEobmV3U2lnbWEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gQWNjdW11bGF0ZSBhbGwgd2VpZ2h0IHVwZGF0ZXNcbiAgICAgIHRoaXMuY29ubmVjdGlvbnMuZm9yRWFjaCgoY29ubkxheWVyKSA9PiB7XG4gICAgICAgIGNvbm5MYXllci5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgY29uc3Qgd2VpZ2h0Q2hhbmdlID1cbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0U2lnbWEoKSAqXG4gICAgICAgICAgICBjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0QWN0aXZhdGlvbigpICpcbiAgICAgICAgICAgIHRoaXMucmF0ZSAtXG4gICAgICAgICAgICB0aGlzLmxhbWJkYSAqIGNvbm5lY3Rpb24uZ2V0V2VpZ2h0KCkgKiAoMSAvIHRoaXMuZ2V0TnVtYmVyT2ZDb25uZWN0aW9ucygpKTsgLy8gUmVndWxhcml6YXRpb25cblxuICAgICAgICAgIGNvbm5lY3Rpb24uYWRkU2FtcGxlV2VpZ2h0Q2hhbmdlKHdlaWdodENoYW5nZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBVZmYsIGxldCdzIGhvcGUgZXZlcnl0aGluZyB3b3JrcyBhbmQgYXBwbHkgdGhlIG1hZ2ljXG4gICAgdGhpcy5jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uTGF5ZXIpID0+IHtcbiAgICAgIGNvbm5MYXllci5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbm5lY3Rpb24uYXBwbHlBdmVyYWdlV2VpZ2h0Q2hhbmdlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuaXRlckNudCsrO1xuICB9XG5cbiAgcHVibGljIGFkZE9yUmVtb3ZlTGF5ZXIoYWRkOiBib29sZWFuKSB7XG4gICAgaWYgKGFkZCkge1xuICAgICAgY29uc3QgbmV3TGF5ZXJTaXplID0gMztcbiAgICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplcy5wdXNoKG5ld0xheWVyU2l6ZSk7XG4gICAgICB0aGlzLmxheWVyQ250Kys7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgbmV3IG5ldXJvbnNcbiAgICAgIHRoaXMuY3JlYXRlTGF5ZXJPZk5ldXJvbnModGhpcy5sYXllckNudCAtIDIsIG5ld0xheWVyU2l6ZSk7XG5cbiAgICAgIC8vIFJlY3JlYXRlIHRoZSBsYXN0IGxheWVyXG4gICAgICB0aGlzLmNyZWF0ZUxheWVyT2ZOZXVyb25zKHRoaXMubGF5ZXJDbnQgLSAxLCB0aGlzLm91dHB1dFNpemUpO1xuXG4gICAgICAvLyBSZWNyZWF0ZSBhbGwgbmVjZXNzYXJ5IGNvbm5lY3Rpb25zXG4gICAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25zKHRoaXMubGF5ZXJDbnQgLSAzLCB0aGlzLmxheWVyQ250IC0gMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmxheWVyQ250ID09IDIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmhpZGRlbkxheWVyU2l6ZXMucG9wKCk7XG4gICAgICB0aGlzLmxheWVyQ250LS07XG4gICAgICB0aGlzLm5ldXJvbnMucG9wKCk7XG4gICAgICB0aGlzLmNvbm5lY3Rpb25zLnBvcCgpO1xuXG4gICAgICAvLyBSZWNyZWF0ZSB0aGUgbGFzdCBsYXllclxuICAgICAgdGhpcy5jcmVhdGVMYXllck9mTmV1cm9ucyh0aGlzLmxheWVyQ250IC0gMSwgdGhpcy5vdXRwdXRTaXplKTtcblxuICAgICAgLy8gUmVjcmVhdGUgYWxsIG5lY2Vzc2FyeSBjb25uZWN0aW9uc1xuICAgICAgdGhpcy5jcmVhdGVDb25uZWN0aW9ucyh0aGlzLmxheWVyQ250IC0gMiwgdGhpcy5sYXllckNudCAtIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRoaXMgZnVuY3Rpb24gaXMgdmVyeSBsb25nIGFuZCB1Z2x5LCBJIGRvbnQgd2FudCB0byBzaW1wbHkgcmVidWlsZCB0aGUgbmV0d29yayBiZWNhdXNlIEkgd2FudCB0byBrZWVwIHRoZSB3ZWlnaHRzXG4gIHB1YmxpYyBhZGRPclJlbW92ZU5ldXJvbihhZGQ6IGJvb2xlYW4sIGxheWVySWR4OiBudW1iZXIpIHtcbiAgICBjb25zdCBpc0lucHV0ID0gbGF5ZXJJZHggPT0gMDtcbiAgICBjb25zdCBpc091dHB1dCA9IGxheWVySWR4ID09IHRoaXMubGF5ZXJDbnQgLSAxO1xuICAgIGNvbnN0IGlzSGlkZGVuID0gIWlzSW5wdXQgJiYgIWlzT3V0cHV0O1xuXG4gICAgY29uc3Qgc2l6ZUNoYW5nZSA9IChhZGQpID8gMSA6IC0xXG5cbiAgICBpZiAoaXNIaWRkZW4pIHtcbiAgICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplc1tsYXllcklkeCAtIDFdICs9IHNpemVDaGFuZ2U7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzSW5wdXQpIHtcbiAgICAgIHRoaXMuaW5wdXRTaXplICs9IHNpemVDaGFuZ2U7XG4gICAgICB0aGlzLnRyYWluU2FtcGxlcyA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm91dHB1dFNpemUgKz0gc2l6ZUNoYW5nZTtcbiAgICAgIHRoaXMudHJhaW5TYW1wbGVzID0gW107XG4gICAgfVxuXG4gICAgaWYgKGFkZCkge1xuICAgICAgbGV0IG5ld05ldXJvbklkeDtcblxuICAgICAgaWYgKGlzSGlkZGVuKSB7XG4gICAgICAgIG5ld05ldXJvbklkeCA9IHRoaXMuaGlkZGVuTGF5ZXJTaXplc1tsYXllcklkeCAtIDFdIC0gMTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzSW5wdXQpIHtcbiAgICAgICAgbmV3TmV1cm9uSWR4ID0gdGhpcy5pbnB1dFNpemUgLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3TmV1cm9uSWR4ID0gdGhpcy5vdXRwdXRTaXplIC0gMTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3TmV1cm9uID0gbmV3IE5ldXJvbihgTmV1cm9uJHtsYXllcklkeH0ke25ld05ldXJvbklkeH1gKTtcbiAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeF1bbmV3TmV1cm9uSWR4XSA9IG5ld05ldXJvbjtcblxuICAgICAgaWYgKGlzSW5wdXQpXG4gICAgICAgIG5ld05ldXJvbi5zZXRBc0lucHV0TmV1cm9uKDApO1xuXG4gICAgICAvLy8vIEFkZCBjb25uZWN0aW9ucyBmcm9tIHRoZSBwcmV2IGxheWVyXG4gICAgICBpZiAoIWlzSW5wdXQpIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4IC0gMV0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKG5ldXJvbiwgbmV3TmV1cm9uKTtcbiAgICAgICAgICBuZXVyb24uYWRkT3V0cHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICAgIG5ld05ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4IC0gMV0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIERvbnQgZm9yZ2V0IHRoZSBiaWFzXG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbih0aGlzLmJpYXNOZXVyb24sIG5ld05ldXJvbik7XG4gICAgICAgIG5ld05ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeCAtIDFdLnB1c2goY29ubmVjdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNPdXRwdXQpIHtcbiAgICAgICAgLy8vLyBBZGQgY29ubmVjdGlvbnMgdG8gdGhlIG5leHQgbGF5ZXJcbiAgICAgICAgdGhpcy5uZXVyb25zW2xheWVySWR4ICsgMV0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKG5ld05ldXJvbiwgbmV1cm9uKTtcbiAgICAgICAgICBuZXVyb24uYWRkSW5wdXQoY29ubmVjdGlvbik7XG4gICAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsYXllcklkeF0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJlbW92ZWROZXVyb24gPSB0aGlzLm5ldXJvbnNbbGF5ZXJJZHhdLnBvcCgpO1xuICAgICAgLy8gUmVtb3ZlIG91dHB1dHMgZnJvbSB0aGUgcHJldiBsYXllclxuICAgICAgaWYgKCFpc0lucHV0KSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeCAtIDFdLmZvckVhY2goKG5ldXJvbikgPT4ge1xuICAgICAgICAgIG5ldXJvbi5zZXRPdXRwdXRzKG5ldXJvbi5nZXRPdXRwdXRzKCkuZmlsdGVyKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXROYW1lKCkgIT0gcmVtb3ZlZE5ldXJvbi5nZXROYW1lKCk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVtb3ZlIGlucHV0IGluIHRoZSBuZXh0IGxheWVyXG4gICAgICBpZiAoIWlzT3V0cHV0KSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeCArIDFdLmZvckVhY2goKG5ldXJvbikgPT4ge1xuICAgICAgICAgIG5ldXJvbi5zZXRJbnB1dHMobmV1cm9uLmdldElucHV0cygpLmZpbHRlcigoY29ubmVjdGlvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS5nZXROYW1lKCkgIT0gcmVtb3ZlZE5ldXJvbi5nZXROYW1lKCk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVtb3ZlIHRoZSB1bnVzZWQgY29ubmVjdGlvbnNcbiAgICAgIGlmICghaXNJbnB1dCkge1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4IC0gMV0gPSB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4IC0gMV0uZmlsdGVyKChjb25uZWN0aW9uOiBDb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0TmFtZSgpICE9IHJlbW92ZWROZXVyb24uZ2V0TmFtZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc091dHB1dCkge1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xheWVySWR4XSA9IHRoaXMuY29ubmVjdGlvbnNbbGF5ZXJJZHhdLmZpbHRlcigoY29ubmVjdGlvbjogQ29ubmVjdGlvbikgPT4ge1xuICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0TmFtZSgpICE9IHJlbW92ZWROZXVyb24uZ2V0TmFtZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgdGhpcy5jcmVhdGVDb25uZWN0aW9ucygwLCB0aGlzLmxheWVyQ250IC0gMSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUxheWVyT2ZOZXVyb25zKGxheWVySWR4OiBudW1iZXIsIGxheWVyU2l6ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5uZXVyb25zW2xheWVySWR4XSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXJTaXplOyBpKyspIHtcbiAgICAgIHRoaXMubmV1cm9uc1tsYXllcklkeF1baV0gPSBuZXcgTmV1cm9uKGBOZXVyb24ke2xheWVySWR4fSR7aX1gKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNvbm5lY3Rpb25zKGZpcnN0TGF5ZXIsIGxhc3RMYXllcikge1xuICAgIGZvciAobGV0IGwgPSBmaXJzdExheWVyOyBsIDwgbGFzdExheWVyOyBsKyspIHtcbiAgICAgIC8vIEZvciBlYWNoIG5ldXJvbiBpbiB0aGUgbGF5ZXIgYWRkIGFsbCBjb25uZWN0aW9ucyB0byBuZXVyb25zIGluIHRoZSBuZXh0IGxheWVyXG4gICAgICB0aGlzLmNvbm5lY3Rpb25zW2xdID0gW107XG5cbiAgICAgIC8vIFJlc2V0IGlucHV0ICYgb3V0cHV0c1xuICAgICAgdGhpcy5uZXVyb25zW2wgKyAxXS5mb3JFYWNoKG5leHROZXVyb24gPT4geyBuZXh0TmV1cm9uLnJlc2V0SW5wdXRzKCkgfSk7XG4gICAgICB0aGlzLm5ldXJvbnNbbF0uZm9yRWFjaChuZXh0TmV1cm9uID0+IHsgbmV4dE5ldXJvbi5yZXNldE91dHB1dHMoKSB9KTtcblxuXG4gICAgICB0aGlzLm5ldXJvbnNbbCArIDFdLmZvckVhY2gobmV4dE5ldXJvbiA9PiB7IC8vIElmIHlvdSB3b25kZXIgd2h5IHRoaXMgY3ljbGVzIGFyZSBzd2l0Y2hlZCwgaXQncyBiZWNhdXNlIG9mIHRoZSBiaWFzXG4gICAgICAgIHRoaXMubmV1cm9uc1tsXS5mb3JFYWNoKGN1cnJOZXVyb24gPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbihjdXJyTmV1cm9uLCBuZXh0TmV1cm9uKVxuICAgICAgICAgIGN1cnJOZXVyb24uYWRkT3V0cHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICAgIG5leHROZXVyb24uYWRkSW5wdXQoY29ubmVjdGlvbik7XG4gICAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsXS5wdXNoKGNvbm5lY3Rpb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBBZGQgYmlhcyBuZXVyb24gdG8gZWFjaCBsYXllclxuICAgICAgICBjb25zdCBiaWFzQ29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKHRoaXMuYmlhc05ldXJvbiwgbmV4dE5ldXJvbik7XG4gICAgICAgIG5leHROZXVyb24uYWRkSW5wdXQoYmlhc0Nvbm5lY3Rpb24pO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xdLnB1c2goYmlhc0Nvbm5lY3Rpb24pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXROdW1iZXJPZkNvbm5lY3Rpb25zKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbnMucmVkdWNlKChhY2MsIGNvbm4pID0+IGFjYyArIGNvbm4ubGVuZ3RoLCAwKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXROZXVyb25zKCkge1xuICAgIHJldHVybiB0aGlzLm5ldXJvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29ubmVjdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0SW5wdXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0U2l6ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPdXRwdXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLm91dHB1dFNpemU7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGF5ZXJDbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMubGF5ZXJDbnQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0SGlkZGVuTGF5ZXJTaXplcygpIHtcbiAgICByZXR1cm4gdGhpcy5oaWRkZW5MYXllclNpemVzO1xuICB9XG5cbiAgcHVibGljIHNldFJhdGUobmV3UmF0ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5yYXRlID0gbmV3UmF0ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJdGVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlckNudDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gXCIuL0Nvbm5lY3Rpb25cIjtcbmltcG9ydCB7IEFjdGl2YXRpb25zIH0gZnJvbSBcIi4vSGVscGVyQ2xhc3Nlc1wiO1xuXG5leHBvcnQgY2xhc3MgTmV1cm9uIHtcbiAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBhY3RpdmF0aW9uOiBudW1iZXI7XG4gIHByaXZhdGUgaW5wdXRzOiBDb25uZWN0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBvdXRwdXRzOiBDb25uZWN0aW9uW10gPSBbXTtcblxuICAvLyBUaGUgZGVyaXZhdGlvbiBvZiBDIHdpdGggcmVzcGVjdCB0byB6XG4gIHByaXZhdGUgc2lnbWE6IG51bWJlcjtcbiAgcHJpdmF0ZSBpc0lucHV0OiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaXNDYWxjdWxhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaXNCaWFzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBpc0JpYXMgPSBmYWxzZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pc0JpYXMgPSBpc0JpYXM7XG4gIH07XG5cbiAgcHVibGljIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJc0JpYXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNCaWFzO1xuICB9XG5cbiAgcHVibGljIHNldEFzSW5wdXROZXVyb24oYWN0aXZhdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy5pc0lucHV0ID0gdHJ1ZTtcbiAgICB0aGlzLmFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICAgIHRoaXMuaW5wdXRzID0gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbnB1dChhY3RpdmF0aW9uOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuaXNJbnB1dCkge1xuICAgICAgdGhyb3cgJ0Nhbm5vdCBzZXQgYWN0aXZhdGlvbiBvZiBub24taW5wdXQgbmV1cm9uJztcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICB9XG5cbiAgcHVibGljIHNldFNpZ21hKHNpZ21hOiBudW1iZXIpIHtcbiAgICB0aGlzLnNpZ21hID0gc2lnbWE7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5wdXQoaW5wdXQ6IENvbm5lY3Rpb24pIHtcbiAgICB0aGlzLmlucHV0cy5wdXNoKGlucHV0KTtcbiAgfTtcblxuICBwdWJsaWMgZ2V0SW5wdXRzKCk6IENvbm5lY3Rpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRzO1xuICB9XG5cbiAgcHVibGljIGFkZE91dHB1dChvdXRwdXQ6IENvbm5lY3Rpb24pIHtcbiAgICB0aGlzLm91dHB1dHMucHVzaChvdXRwdXQpO1xuICB9XG5cbiAgcHVibGljIGdldE91dHB1dHMoKTogQ29ubmVjdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5vdXRwdXRzO1xuICB9XG5cbiAgcHVibGljIHNldE91dHB1dHMoY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXSkge1xuICAgIHRoaXMub3V0cHV0cyA9IGNvbm5lY3Rpb25zO1xuICB9XG5cbiAgcHVibGljIHNldElucHV0cyhjb25uZWN0aW9uczogQ29ubmVjdGlvbltdKSB7XG4gICAgdGhpcy5pbnB1dHMgPSBjb25uZWN0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyByZXNldElucHV0cygpIHtcbiAgICB0aGlzLmlucHV0cyA9IFtdO1xuICB9XG5cbiAgcHVibGljIHJlc2V0T3V0cHV0cygpIHtcbiAgICB0aGlzLm91dHB1dHMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGdldEFjdGl2YXRpb24oKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5pc0JpYXMpIHRoaXMuYWN0aXZhdGlvbiA9IDE7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZhdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTaWdtYSgpIHtcbiAgICByZXR1cm4gdGhpcy5zaWdtYTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVBY3RpdmF0aW9uKCk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLmlzSW5wdXQgJiYgIXRoaXMuaXNDYWxjdWxhdGVkICYmICF0aGlzLmlzQmlhcykge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uID0gQWN0aXZhdGlvbnMuU0lHTU9JRC5vdXRwdXQodGhpcy5pbnB1dHMucmVkdWNlKChhY2MsIGN1cnJDb25uKSA9PiBhY2MgKyBjdXJyQ29ubi5jYWxjdWxhdGVWYWx1ZSgpLCAwKSk7XG4gICAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldEFjdGl2YXRpb24oKTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=