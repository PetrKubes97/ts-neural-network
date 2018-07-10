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
window.numOflayersChange = (val) => {
    hiddenSizes = new Array(val - 2);
    hiddenSizes.fill(3);
    initCore();
};
window.numOfNeruonsInLayerChange = (idx, val) => {
    if (idx == 0) {
        inputSize = Number.parseInt(val);
    }
    else if (idx == hiddenSizes.length + 1) {
        outputSize = Number.parseInt(val);
    }
    else {
        hiddenSizes[idx - 1] = Number.parseInt(val);
    }
    initCore();
};
window.train = () => {
    neuralCore.addTrainingSet([1, 1], [0, 0]);
    neuralCore.addTrainingSet([1, 0], [1, 0]);
    neuralCore.addTrainingSet([0, 1], [1, 0]);
    neuralCore.addTrainingSet([0, 0], [0, 0]);
    for (let i = 0; i < 10000; i++) {
        neuralCore.train();
    }
    console.log(neuralCore.getCost());
    neuralCore.evaluate(input);
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
const main = () => {
    const content = document.getElementById('content');
    inputControls = document.getElementById('input-controls');
    layerControls = document.getElementById('layer-controls');
    visualizer = new _Visualizer__WEBPACK_IMPORTED_MODULE_0__["Visualizer"](content);
    initCore();
};
const initCore = () => {
    neuralCore = new _neuralNetwork_NeuralCore__WEBPACK_IMPORTED_MODULE_1__["NeuralCore"](inputSize, hiddenSizes, outputSize);
    layerControls.innerHTML = '';
    layerControls.innerHTML += `Input size: <input type="number" name="layers" min="1" max="10" value="${inputSize}" onchange="numOfNeruonsInLayerChange(0, this.value)"><br>`;
    for (let i = 1; i < hiddenSizes.length + 1; i++) {
        layerControls.innerHTML += `Layer ${i} size: <input type="number" name="layers" min="1" max="10" value="${hiddenSizes[i - 1]}" onchange="numOfNeruonsInLayerChange(${i}, this.value)"><br>`;
    }
    layerControls.innerHTML += `Output size: <input type="number" name="layers" min="1" max="10" value="${outputSize}" onchange="numOfNeruonsInLayerChange(${hiddenSizes.length + 1}, this.value)"><br>`;
    // Set default values
    input = new Array(neuralCore.getInputSize());
    input.fill(1);
    inputControls.innerHTML = '';
    for (let i = 0; i < neuralCore.getInputSize(); i++) {
        inputControls.innerHTML += `Neuron ${i}: <input style="position: relative; top: 5px;" type="range" min="0" max="1" value="1" step="0.05" id="slider${i}" oninput="slide(${i}, this.value);"><br>`;
    }
    neuralCore.evaluate(input);
    visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
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
        this.weight = Math.random();
        this.sampleWeightChanges = [];
        this.inputNeuron = input;
        this.outputNeuron = output;
    }
    addSampleWeightChange(weightChange) {
        this.sampleWeightChanges.push(weightChange);
    }
    applyAverageWeight() {
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
        this.rate = 5;
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
        for (let l = 0; l < this.layerCnt - 1; l++) {
            // For each neuron in the layer add all connections to neurons in the next layer
            this.connections[l] = [];
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
                connection.applyAverageWeight();
            });
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Zpc3VhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL0Nvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25ldXJhbE5ldHdvcmsvSGVscGVyQ2xhc3Nlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV1cmFsTmV0d29yay9OZXVyYWxDb3JlLnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL05ldXJvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0VNO0lBT0osWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxHQUFHLEtBQUs7UUFDaEQsSUFB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SUFDNUIsQ0FBQztJQUVNLGFBQWE7UUFDbEIsSUFBSSxJQUFJLENBQUMsTUFBTTtZQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRU0sbUJBQW1CO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDdkQsSUFBSSxDQUFDLFVBQVUsR0FBRywwREFBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEgsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDMUI7UUFDRCxPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM5QixDQUFDO0NBQ0YiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgTmV1cm9uIH0gZnJvbSBcIi4vbmV1cmFsTmV0d29yay9OZXVyb25cIjtcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tIFwiLi9uZXVyYWxOZXR3b3JrL0Nvbm5lY3Rpb25cIjtcblxuZXhwb3J0IGNsYXNzIERyYXdhYmxlTmV1cm9uIHtcbiAgcHVibGljIHg6IG51bWJlcjtcbiAgcHVibGljIHk6IG51bWJlcjtcbiAgcHVibGljIGFjdGl2YXRpb246IG51bWJlcjtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIGlzQmlhczogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcih4LCB5LCBhY3RpdmF0aW9uLCBuYW1lLCBpc0JpYXMgPSBmYWxzZSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pc0JpYXMgPSBpc0JpYXM7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6ZXIge1xuXG4gIHByaXZhdGUgY29udGVudDogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG4gIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihjb250ZW50OiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgdGhpcy5jdHggPSBjb250ZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5oZWlnaHQgPSBjb250ZW50LmhlaWdodDtcbiAgICB0aGlzLndpZHRoID0gY29udGVudC53aWR0aDtcbiAgfVxuXG4gIHB1YmxpYyBkcmF3KG5ldXJvbnM6IE5ldXJvbltdW10sIGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW11bXSkge1xuICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgXG4gICAgY29uc3QgZHJhd2FibGVOZXVyb25zOiBEcmF3YWJsZU5ldXJvbltdID0gW107XG4gICAgY29uc3QgbGVmdE1hcmdpbiA9IHRoaXMud2lkdGggLyAobmV1cm9ucy5sZW5ndGggKyAxKTtcblxuICAgIC8vIE5ldXJvbnNcbiAgICBuZXVyb25zLmZvckVhY2goKGxheWVyLCBsSWR4KSA9PiB7XG4gICAgICBjb25zdCB0b3BNYXJnaW4gPSB0aGlzLmhlaWdodCAvIChsYXllci5sZW5ndGggKyAyKTtcbiAgICAgIGxheWVyLmZvckVhY2goKG5ldXJvbiwgbklkeCkgPT4ge1xuICAgICAgICBjb25zdCB4ID0gbGVmdE1hcmdpbiAqICgxICsgbElkeCk7XG4gICAgICAgIGNvbnN0IHkgPSB0b3BNYXJnaW4gKiAoMSArIG5JZHgpO1xuXG4gICAgICAgIGNvbnN0IGRyYXdhYmxlTmV1cm9uID0gbmV3IERyYXdhYmxlTmV1cm9uKHgsIHksIG5ldXJvbi5nZXRBY3RpdmF0aW9uKCksIG5ldXJvbi50b1N0cmluZygpKTtcbiAgICAgICAgZHJhd2FibGVOZXVyb25zLnB1c2goZHJhd2FibGVOZXVyb24pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChsSWR4ICE9IG5ldXJvbnMubGVuZ3RoIC0gMSkge1xuICAgICAgICBjb25zdCB4ID0gbGVmdE1hcmdpbiAqICgxICsgbElkeCk7XG4gICAgICAgIGNvbnN0IHkgPSB0b3BNYXJnaW4gKiAoMSArIG5ldXJvbnNbbElkeF0ubGVuZ3RoKTtcblxuICAgICAgICBjb25zdCBkcmF3YWJsZU5ldXJvbiA9IG5ldyBEcmF3YWJsZU5ldXJvbih4LCB5LCAxLCBgYmlhcyR7bElkeH1gLCB0cnVlKTtcbiAgICAgICAgZHJhd2FibGVOZXVyb25zLnB1c2goZHJhd2FibGVOZXVyb24pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQ29ubmVjdGlvbnNcbiAgICBjb25zdCBkcmF3YWJsZU5hbWVNYXAgPSBuZXcgTWFwPHN0cmluZywgRHJhd2FibGVOZXVyb24+KCk7XG4gICAgZHJhd2FibGVOZXVyb25zLmZvckVhY2goXG4gICAgICAoZHJhd2FibGVOZXVyb24pID0+IGRyYXdhYmxlTmFtZU1hcC5zZXQoZHJhd2FibGVOZXVyb24ubmFtZSwgZHJhd2FibGVOZXVyb24pLy8gV1RGLCBJIHdhcyBub3QgYWJsZSB0byBjcmVhdGUgbWFwIGZyb20gMmQgYXJyXG4gICAgKTtcblxuICAgIGNvbm5lY3Rpb25zLmZvckVhY2goKGxheWVyLCBsSWR4KSA9PiB7XG4gICAgICBsYXllci5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0Tk5hbWUgPVxuICAgICAgICAgIChjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0SXNCaWFzKCkpID9cbiAgICAgICAgICAgIGBiaWFzJHtsSWR4fWAgOlxuICAgICAgICAgICAgY29ubmVjdGlvbi5nZXRJbnB1dE5ldXJvbigpLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgdGhpcy5kcmF3Q29ubmVjdGlvbihcbiAgICAgICAgICBkcmF3YWJsZU5hbWVNYXAuZ2V0KGlucHV0Tk5hbWUpLFxuICAgICAgICAgIGRyYXdhYmxlTmFtZU1hcC5nZXQoY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS50b1N0cmluZygpKSxcbiAgICAgICAgICBjb25uZWN0aW9uLmdldFdlaWdodCgpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRyYXdhYmxlTmV1cm9ucy5mb3JFYWNoKChuZXVyb24pID0+IHtcbiAgICAgIHRoaXMuZHJhd05ldXJvbihuZXVyb24pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3TmV1cm9uKGRyYXdhYmxlTmV1cm9uOiBEcmF3YWJsZU5ldXJvbikge1xuICAgIC8vIHdoaXRlIGJhY2tncm91bmRcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5hcmMoZHJhd2FibGVOZXVyb24ueCwgZHJhd2FibGVOZXVyb24ueSwgMjUsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBgcmdiKDI1NSwyNTUsMjU1KWA7XG4gICAgdGhpcy5jdHguZmlsbCgpO1xuICAgIFxuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIGlmIChkcmF3YWJsZU5ldXJvbi5pc0JpYXMpXG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBgcmdiYSg0Niw0MCw0MiwgMSlgO1xuICAgIGVsc2VcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGByZ2JhKDIzLCAxOTAsIDE4NywgJHtkcmF3YWJsZU5ldXJvbi5hY3RpdmF0aW9ufSlgO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gYHJnYig0Niw0MCw0MiwgMSlgXG4gICAgdGhpcy5jdHgubGluZVdpZHRoID0gMTtcbiAgICB0aGlzLmN0eC5hcmMoZHJhd2FibGVOZXVyb24ueCwgZHJhd2FibGVOZXVyb24ueSwgMjUsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICB0aGlzLmN0eC5maWxsKCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG5cbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBgcmdiKDQ2LDQwLDQyLCAxKWBcbiAgICBjb25zdCBoZWlnaHQgPSAxNjtcbiAgICB0aGlzLmN0eC5mb250ID0gYGJvbGQgJHtoZWlnaHR9cHggc2VyaWZgO1xuICAgIGNvbnN0IHRleHQgPSBOdW1iZXIoZHJhd2FibGVOZXVyb24uYWN0aXZhdGlvbikudG9GaXhlZCgyKTtcbiAgICB0aGlzLmN0eC5maWxsVGV4dChcbiAgICAgIHRleHQsIFxuICAgICAgZHJhd2FibGVOZXVyb24ueCAtIHRoaXMuY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoIC8gMiwgXG4gICAgICBkcmF3YWJsZU5ldXJvbi55ICsgaGVpZ2h0IC8gMyk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdDb25uZWN0aW9uKGlucHV0TmV1cm9uOiBEcmF3YWJsZU5ldXJvbiwgb3V0cHV0TmV1cm9uOiBEcmF3YWJsZU5ldXJvbiwgd2VpZ2h0OiBudW1iZXIpIHtcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAod2VpZ2h0ID4gMCkgPyBcbiAgICAgIE1hdGgubG9nKHdlaWdodCkgOlxuICAgICAgTWF0aC5sb2coLXdlaWdodCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSAod2VpZ2h0ID4gMCkgP1xuICAgICAgYHJnYmEoMjA1LCA4MywgNTIsICR7d2VpZ2h0fSlgIDpcbiAgICAgIGByZ2JhKDYxLCAyMzIsIDI1NSwgJHt3ZWlnaHQgKiAtMX0pYDtcbiAgICB0aGlzLmN0eC5tb3ZlVG8oaW5wdXROZXVyb24ueCwgaW5wdXROZXVyb24ueSk7XG4gICAgdGhpcy5jdHgubGluZVRvKG91dHB1dE5ldXJvbi54LCBvdXRwdXROZXVyb24ueSk7XG4gICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFZpc3VhbGl6ZXIgfSBmcm9tICcuL1Zpc3VhbGl6ZXInO1xuaW1wb3J0IHsgTmV1cmFsQ29yZSB9IGZyb20gJy4vbmV1cmFsTmV0d29yay9OZXVyYWxDb3JlJztcblxuKHdpbmRvdyBhcyBhbnkpLnNsaWRlID0gKGk6IG51bWJlciwgdmFsdWU6IG51bWJlcikgPT4ge1xuICBpbnB1dFtpXSA9IHZhbHVlO1xuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcbiAgdmlzdWFsaXplci5kcmF3KG5ldXJhbENvcmUuZ2V0TmV1cm9ucygpLCBuZXVyYWxDb3JlLmdldENvbm5lY3Rpb25zKCkpO1xufVxuXG4od2luZG93IGFzIGFueSkubnVtT2ZsYXllcnNDaGFuZ2UgPSAodmFsOiBudW1iZXIpID0+IHtcbiAgaGlkZGVuU2l6ZXMgPSBuZXcgQXJyYXkodmFsLTIpO1xuICBoaWRkZW5TaXplcy5maWxsKDMpO1xuICBpbml0Q29yZSgpO1xufVxuXG4od2luZG93IGFzIGFueSkubnVtT2ZOZXJ1b25zSW5MYXllckNoYW5nZSA9IChpZHg6IG51bWJlciwgdmFsKSA9PiB7XG4gIGlmIChpZHggPT0gMCkge1xuICAgIGlucHV0U2l6ZSA9IE51bWJlci5wYXJzZUludCh2YWwpO1xuICB9IGVsc2UgaWYgKGlkeCA9PSBoaWRkZW5TaXplcy5sZW5ndGggKyAxKSB7XG4gICAgb3V0cHV0U2l6ZSA9IE51bWJlci5wYXJzZUludCh2YWwpO1xuICB9IGVsc2Uge1xuICAgIGhpZGRlblNpemVzW2lkeC0xXSA9IE51bWJlci5wYXJzZUludCh2YWwpO1xuICB9XG4gIGluaXRDb3JlKCk7XG59XG5cbih3aW5kb3cgYXMgYW55KS50cmFpbiA9ICgpID0+IHtcbiAgbmV1cmFsQ29yZS5hZGRUcmFpbmluZ1NldChbMSwxXSwgWzAsMF0pO1xuICBuZXVyYWxDb3JlLmFkZFRyYWluaW5nU2V0KFsxLDBdLCBbMSwwXSk7XG4gIG5ldXJhbENvcmUuYWRkVHJhaW5pbmdTZXQoWzAsMV0sIFsxLDBdKTtcbiAgbmV1cmFsQ29yZS5hZGRUcmFpbmluZ1NldChbMCwwXSwgWzAsMF0pO1xuXG4gIGZvciAobGV0IGk9MDtpPDEwMDAwO2krKykge1xuICAgIG5ldXJhbENvcmUudHJhaW4oKTtcbiAgfVxuICBjb25zb2xlLmxvZyhuZXVyYWxDb3JlLmdldENvc3QoKSlcblxuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcbiAgdmlzdWFsaXplci5kcmF3KG5ldXJhbENvcmUuZ2V0TmV1cm9ucygpLCBuZXVyYWxDb3JlLmdldENvbm5lY3Rpb25zKCkpO1xufVxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBtYWluKCk7XG59O1xuXG5sZXQgbmV1cmFsQ29yZTogTmV1cmFsQ29yZTtcbmxldCB2aXN1YWxpemVyOiBWaXN1YWxpemVyO1xubGV0IGlucHV0OiBudW1iZXJbXTtcblxuXG5sZXQgaW5wdXRTaXplID0gMjtcbmxldCBoaWRkZW5TaXplcyA9IFszXTtcbmxldCBvdXRwdXRTaXplID0gMjtcbmxldCBsYXllckNvbnRyb2xzOiBIVE1MQ2FudmFzRWxlbWVudDtcbmxldCBpbnB1dENvbnRyb2xzOiBIVE1MQ2FudmFzRWxlbWVudDtcblxuY29uc3QgbWFpbiA9ICgpID0+IHtcbiAgY29uc3QgY29udGVudDogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICBpbnB1dENvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LWNvbnRyb2xzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGxheWVyQ29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGF5ZXItY29udHJvbHMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgdmlzdWFsaXplciA9IG5ldyBWaXN1YWxpemVyKGNvbnRlbnQpO1xuXG4gIGluaXRDb3JlKCk7XG59XG5cbmNvbnN0IGluaXRDb3JlID0gKCkgPT4ge1xuICBuZXVyYWxDb3JlID0gbmV3IE5ldXJhbENvcmUoaW5wdXRTaXplLCBoaWRkZW5TaXplcywgb3V0cHV0U2l6ZSk7XG5cbiAgbGF5ZXJDb250cm9scy5pbm5lckhUTUwgPSAnJztcbiAgbGF5ZXJDb250cm9scy5pbm5lckhUTUwgKz0gYElucHV0IHNpemU6IDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbmFtZT1cImxheWVyc1wiIG1pbj1cIjFcIiBtYXg9XCIxMFwiIHZhbHVlPVwiJHtpbnB1dFNpemV9XCIgb25jaGFuZ2U9XCJudW1PZk5lcnVvbnNJbkxheWVyQ2hhbmdlKDAsIHRoaXMudmFsdWUpXCI+PGJyPmA7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgaGlkZGVuU2l6ZXMubGVuZ3RoKzE7IGkrKykge1xuICAgIGxheWVyQ29udHJvbHMuaW5uZXJIVE1MICs9IGBMYXllciAke2l9IHNpemU6IDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbmFtZT1cImxheWVyc1wiIG1pbj1cIjFcIiBtYXg9XCIxMFwiIHZhbHVlPVwiJHtoaWRkZW5TaXplc1tpLTFdfVwiIG9uY2hhbmdlPVwibnVtT2ZOZXJ1b25zSW5MYXllckNoYW5nZSgke2l9LCB0aGlzLnZhbHVlKVwiPjxicj5gO1xuICB9XG4gIGxheWVyQ29udHJvbHMuaW5uZXJIVE1MICs9IGBPdXRwdXQgc2l6ZTogPGlucHV0IHR5cGU9XCJudW1iZXJcIiBuYW1lPVwibGF5ZXJzXCIgbWluPVwiMVwiIG1heD1cIjEwXCIgdmFsdWU9XCIke291dHB1dFNpemV9XCIgb25jaGFuZ2U9XCJudW1PZk5lcnVvbnNJbkxheWVyQ2hhbmdlKCR7aGlkZGVuU2l6ZXMubGVuZ3RoICsgMX0sIHRoaXMudmFsdWUpXCI+PGJyPmA7XG5cbiAgLy8gU2V0IGRlZmF1bHQgdmFsdWVzXG4gIGlucHV0ID0gbmV3IEFycmF5KG5ldXJhbENvcmUuZ2V0SW5wdXRTaXplKCkpO1xuICBpbnB1dC5maWxsKDEpO1xuXG4gIGlucHV0Q29udHJvbHMuaW5uZXJIVE1MID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmV1cmFsQ29yZS5nZXRJbnB1dFNpemUoKTsgaSsrKSB7XG4gICAgaW5wdXRDb250cm9scy5pbm5lckhUTUwgKz0gYE5ldXJvbiAke2l9OiA8aW5wdXQgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7IHRvcDogNXB4O1wiIHR5cGU9XCJyYW5nZVwiIG1pbj1cIjBcIiBtYXg9XCIxXCIgdmFsdWU9XCIxXCIgc3RlcD1cIjAuMDVcIiBpZD1cInNsaWRlciR7aX1cIiBvbmlucHV0PVwic2xpZGUoJHtpfSwgdGhpcy52YWx1ZSk7XCI+PGJyPmA7XG4gIH1cblxuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcbiAgdmlzdWFsaXplci5kcmF3KG5ldXJhbENvcmUuZ2V0TmV1cm9ucygpLCBuZXVyYWxDb3JlLmdldENvbm5lY3Rpb25zKCkpO1xufSIsImltcG9ydCB7IE5ldXJvbiB9IGZyb20gXCIuL05ldXJvblwiO1xuXG5leHBvcnQgY2xhc3MgQ29ubmVjdGlvbiB7XG4gIHByaXZhdGUgd2VpZ2h0OiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpO1xuICBwcml2YXRlIGlucHV0TmV1cm9uOiBOZXVyb247XG4gIHByaXZhdGUgb3V0cHV0TmV1cm9uOiBOZXVyb247XG4gIHByaXZhdGUgc2FtcGxlV2VpZ2h0Q2hhbmdlczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihpbnB1dDogTmV1cm9uLCBvdXRwdXQ6IE5ldXJvbikge1xuICAgIHRoaXMuaW5wdXROZXVyb24gPSBpbnB1dDtcbiAgICB0aGlzLm91dHB1dE5ldXJvbiA9IG91dHB1dDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTYW1wbGVXZWlnaHRDaGFuZ2Uod2VpZ2h0Q2hhbmdlOiBudW1iZXIpIHtcbiAgICB0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMucHVzaCh3ZWlnaHRDaGFuZ2UpO1xuICB9XG5cbiAgcHVibGljIGFwcGx5QXZlcmFnZVdlaWdodCgpIHtcbiAgICBjb25zdCBjaGFuZ2UgPSAodGhpcy5zYW1wbGVXZWlnaHRDaGFuZ2VzLnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYyArIHZhbCwgMCkgLyB0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMubGVuZ3RoKTtcbiAgICB0aGlzLndlaWdodCArPSBjaGFuZ2U7XG4gICAgdGhpcy5zYW1wbGVXZWlnaHRDaGFuZ2VzID0gW107XG4gIH1cblxuICBwdWJsaWMgZ2V0V2VpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLndlaWdodDtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy53ZWlnaHQgKiB0aGlzLmlucHV0TmV1cm9uLmNhbGN1bGF0ZUFjdGl2YXRpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPdXRwdXROZXVyb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub3V0cHV0TmV1cm9uO1xuICB9XG5cbiAgcHVibGljIGdldElucHV0TmV1cm9uKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0TmV1cm9uO1xuICB9XG59IiwiZXhwb3J0IGNsYXNzIEFjdGl2YXRpb25zIHtcbiAgcHVibGljIHN0YXRpYyBTSUdNT0lEID0ge1xuICAgIG91dHB1dDogKHg6IG51bWJlcik6IG51bWJlciA9PiAxIC8gKDEgKyBNYXRoLmV4cCgteCkpLFxuICAgIGRlcjogKHg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgICBsZXQgb3V0cHV0ID0gQWN0aXZhdGlvbnMuU0lHTU9JRC5vdXRwdXQoeCk7XG4gICAgICByZXR1cm4gb3V0cHV0ICogKDEgLSBvdXRwdXQpO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIFRyYWluU2FtcGxlIHtcbiAgcHVibGljIGlucHV0OiBudW1iZXJbXTtcbiAgcHVibGljIG91dHB1dDogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IoaW5wdXQ6IG51bWJlcltdLCBvdXRwdXQ6IG51bWJlcltdKSB7XG4gICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgIHRoaXMub3V0cHV0ID0gb3V0cHV0O1xuICB9XG59IiwiaW1wb3J0IHsgTmV1cm9uIH0gZnJvbSBcIi4vTmV1cm9uXCI7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSBcIi4vQ29ubmVjdGlvblwiO1xuaW1wb3J0IHsgVHJhaW5TYW1wbGUsIEFjdGl2YXRpb25zIH0gZnJvbSBcIi4vSGVscGVyQ2xhc3Nlc1wiO1xuXG5leHBvcnQgY2xhc3MgTmV1cmFsQ29yZSB7XG4gIHByaXZhdGUgaW5wdXRTaXplOiBudW1iZXI7XG4gIHByaXZhdGUgaGlkZGVuTGF5ZXJTaXplczogbnVtYmVyW107XG4gIHByaXZhdGUgb3V0cHV0U2l6ZTogbnVtYmVyO1xuXG4gIHByaXZhdGUgbGF5ZXJDbnQ6IG51bWJlcjtcblxuICBwcml2YXRlIHJhdGUgPSA1O1xuXG4gIHByaXZhdGUgYmlhc05ldXJvbiA9IG5ldyBOZXVyb24oJ2JpYXMnLCB0cnVlKTtcbiAgcHJpdmF0ZSBuZXVyb25zOiBOZXVyb25bXVtdID0gW107XG4gIHByaXZhdGUgY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXVtdID0gW107XG5cbiAgcHJpdmF0ZSB0cmFpblNhbXBsZXM6IFRyYWluU2FtcGxlW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihpbnB1dFNpemU6IG51bWJlciwgaGlkZGVuTGF5ZXJTaXplczogbnVtYmVyW10sIG91dHB1dFNpemU6IG51bWJlcikge1xuICAgIHRoaXMuaW5wdXRTaXplID0gaW5wdXRTaXplO1xuICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplcyA9IGhpZGRlbkxheWVyU2l6ZXM7XG4gICAgdGhpcy5vdXRwdXRTaXplID0gb3V0cHV0U2l6ZTtcbiAgICB0aGlzLmxheWVyQ250ID0gaGlkZGVuTGF5ZXJTaXplcy5sZW5ndGggKyAyO1xuXG4gICAgLy8gUmVzZXRcbiAgICB0aGlzLm5ldXJvbnMgPSBbXTtcbiAgICB0aGlzLmNvbm5lY3Rpb25zID0gW107XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICAvLyBDcmVhdGUgdGhlIG5ldXJvbnNcbiAgICBmb3IgKGxldCBsID0gMDsgbCA8IHRoaXMubGF5ZXJDbnQ7IGwrKykge1xuICAgICAgLy8gSG93IG1hbnkgbmV1cm9ucyBhcmUgaW4gZWFjaCBsYXllcj9cbiAgICAgIGxldCBuZXVyb25zSW5MYXllckNudCA9IDA7XG4gICAgICBzd2l0Y2ggKGwpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIG5ldXJvbnNJbkxheWVyQ250ID0gdGhpcy5pbnB1dFNpemU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdGhpcy5oaWRkZW5MYXllclNpemVzLmxlbmd0aCArIDE6XG4gICAgICAgICAgbmV1cm9uc0luTGF5ZXJDbnQgPSB0aGlzLm91dHB1dFNpemU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbmV1cm9uc0luTGF5ZXJDbnQgPSB0aGlzLmhpZGRlbkxheWVyU2l6ZXNbbCAtIDFdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm5ldXJvbnNbbF0gPSBbXTtcblxuICAgICAgLy8gQ3JlYXRlIHRoZW1cbiAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgbmV1cm9uc0luTGF5ZXJDbnQ7IG4rKykge1xuICAgICAgICB0aGlzLm5ldXJvbnNbbF1bbl0gPSBuZXcgTmV1cm9uKGBOZXVyb24ke2x9JHtufWApO1xuICAgICAgICBpZiAobCA9PSAwKSB7XG4gICAgICAgICAgdGhpcy5uZXVyb25zW2xdW25dLnNldEFzSW5wdXROZXVyb24oMCk7IC8vIGp1c3QgdG8gYXZvaWQgY3Jhc2hlcywgdGhlIDAgc2hvdWxkIGJlIG92ZXJyaWRlbiBsYXRlciBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENyZWF0ZSB0aGUgQ29ubmVjdGlvbnNcbiAgICBmb3IgKGxldCBsID0gMDsgbCA8IHRoaXMubGF5ZXJDbnQgLSAxOyBsKyspIHtcbiAgICAgIC8vIEZvciBlYWNoIG5ldXJvbiBpbiB0aGUgbGF5ZXIgYWRkIGFsbCBjb25uZWN0aW9ucyB0byBuZXVyb25zIGluIHRoZSBuZXh0IGxheWVyXG4gICAgICB0aGlzLmNvbm5lY3Rpb25zW2xdID0gW107XG5cbiAgICAgIHRoaXMubmV1cm9uc1tsICsgMV0uZm9yRWFjaChuZXh0TmV1cm9uID0+IHsgLy8gSWYgeW91IHdvbmRlciB3aHkgdGhpcyBjeWNsZXMgYXJlIHN3aXRjaGVkLCBpdCdzIGJlY2F1c2Ugb2YgdGhlIGJpYXNcbiAgICAgICAgdGhpcy5uZXVyb25zW2xdLmZvckVhY2goY3Vyck5ldXJvbiA9PiB7XG4gICAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKGN1cnJOZXVyb24sIG5leHROZXVyb24pXG4gICAgICAgICAgY3Vyck5ldXJvbi5hZGRPdXRwdXQoY29ubmVjdGlvbik7XG4gICAgICAgICAgbmV4dE5ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xdLnB1c2goY29ubmVjdGlvbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEFkZCBiaWFzIG5ldXJvbiB0byBlYWNoIGxheWVyXG4gICAgICAgIGNvbnN0IGJpYXNDb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb24odGhpcy5iaWFzTmV1cm9uLCBuZXh0TmV1cm9uKTtcbiAgICAgICAgbmV4dE5ldXJvbi5hZGRJbnB1dChiaWFzQ29ubmVjdGlvbik7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbF0ucHVzaChiaWFzQ29ubmVjdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGUoaW5wdXQ6IG51bWJlcltdKTogbnVtYmVyW10ge1xuICAgIGlmIChpbnB1dC5sZW5ndGggIT0gdGhpcy5pbnB1dFNpemUpIHtcbiAgICAgIHRocm93ICdJbnB1dCBzaXplIGRvZXMgbm90IG1hdGNoJztcbiAgICB9XG4gICAgLy8gUmVzZXQsIHNvIGVhY2ggbmV1cm9uIGlzIHJlY2FsY3VsYXRlZFxuICAgIHRoaXMubmV1cm9ucy5mb3JFYWNoKGxheWVyID0+IHsgbGF5ZXIuZm9yRWFjaChuZXVyb24gPT4gbmV1cm9uLnJlc2V0KCkpIH0pXG4gICAgLy8gU2V0IGlucHV0IGxheWVyXG4gICAgdGhpcy5uZXVyb25zWzBdLmZvckVhY2goKG5ldXJvbiwgaWR4KSA9PiB7IG5ldXJvbi5zZXRJbnB1dChpbnB1dFtpZHhdKSB9KTtcblxuICAgIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250IC0gMV0uZm9yRWFjaChuZXVyb24gPT4ge1xuICAgICAgbmV1cm9uLmNhbGN1bGF0ZUFjdGl2YXRpb24oKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLm1hcChuZXVyb24gPT4gbmV1cm9uLmdldEFjdGl2YXRpb24oKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkVHJhaW5pbmdTZXQoaW5wdXQ6IG51bWJlcltdLCBvdXRwdXQ6IG51bWJlcltdKSB7XG4gICAgdGhpcy50cmFpblNhbXBsZXMucHVzaChuZXcgVHJhaW5TYW1wbGUoaW5wdXQsIG91dHB1dCkpXG4gIH1cblxuICBwdWJsaWMgZ2V0Q29zdCgpOiBudW1iZXIge1xuICAgIGNvbnN0IGNvc3RTdW0gPSB0aGlzLnRyYWluU2FtcGxlcy5yZWR1Y2UoKGNvc3RTdW0sIHNhbXBsZSkgPT4geyAvLyBBZGQgdXAgYWxsIHNhbXBsZXNcbiAgICAgIHRoaXMuZXZhbHVhdGUoc2FtcGxlLmlucHV0KTtcbiAgICAgIHJldHVybiBjb3N0U3VtICsgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5yZWR1Y2UoKGFjYywgbmV1cm9uLCBpKSA9PiB7IC8vIEFkZCB1cCBhbGwgb3V0cHV0IG5ldXJvbnNcbiAgICAgICAgcmV0dXJuIGFjYyArIChuZXVyb24uZ2V0QWN0aXZhdGlvbigpIC0gc2FtcGxlLm91dHB1dFtpXSkgKiogMjtcbiAgICAgIH0sIDApO1xuICAgIH0sIDApO1xuXG4gICAgcmV0dXJuIDEgLyAyICogY29zdFN1bSAqICgxIC8gdGhpcy50cmFpblNhbXBsZXMubGVuZ3RoKTtcbiAgfVxuXG4gIHB1YmxpYyB0cmFpbigpIHtcbiAgICB0aGlzLnRyYWluU2FtcGxlcy5mb3JFYWNoKChzYW1wbGUpID0+IHtcbiAgICAgIHRoaXMuZXZhbHVhdGUoc2FtcGxlLmlucHV0KVxuXG4gICAgICAvLyBDYWxjdWxhdGUgc2lnbWFzIG9mIHRoZSBsYXN0IGxheWVyXG4gICAgICB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLmZvckVhY2goKG5ldXJvbiwgaWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1NpZ21hID1cbiAgICAgICAgICAoc2FtcGxlLm91dHB1dFtpZHhdIC0gbmV1cm9uLmdldEFjdGl2YXRpb24oKSkgKiBBY3RpdmF0aW9ucy5TSUdNT0lELmRlcihuZXVyb24uZ2V0QWN0aXZhdGlvbigpKTtcblxuICAgICAgICBuZXVyb24uc2V0U2lnbWEobmV3U2lnbWEpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBzaWdtYXMgZm9yIGVhY2ggbmV1cm9uIGluIHRoZSBsb3dlciBsYXllcnNcbiAgICAgIGZvciAobGV0IGwgPSB0aGlzLmxheWVyQ250IC0gMjsgbCA+PSAwOyBsLS0pIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xdLmZvckVhY2goKG5ldXJvbikgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld1NpZ21hID1cbiAgICAgICAgICAgIG5ldXJvbi5nZXRPdXRwdXRzKCkucmVkdWNlKChhY2MsIGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFjYyArIGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0U2lnbWEoKSAqIGNvbm5lY3Rpb24uZ2V0V2VpZ2h0KCk7XG4gICAgICAgICAgICB9LCAwKSAqIEFjdGl2YXRpb25zLlNJR01PSUQuZGVyKG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkpO1xuICAgICAgICAgIG5ldXJvbi5zZXRTaWdtYShuZXdTaWdtYSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBBY2N1bXVsYXRlIGFsbCB3ZWlnaHQgdXBkYXRlc1xuICAgICAgdGhpcy5jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uTGF5ZXIpID0+IHtcbiAgICAgICAgY29ubkxheWVyLmZvckVhY2goKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICBjb25zdCB3ZWlnaHRDaGFuZ2UgPVxuICAgICAgICAgICAgY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXRTaWdtYSgpICpcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS5nZXRBY3RpdmF0aW9uKCkgKlxuICAgICAgICAgICAgdGhpcy5yYXRlO1xuXG4gICAgICAgICAgY29ubmVjdGlvbi5hZGRTYW1wbGVXZWlnaHRDaGFuZ2Uod2VpZ2h0Q2hhbmdlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFVmZiwgbGV0J3MgaG9wZSBldmVyeXRoaW5nIHdvcmtzIGFuZCBhcHBseSB0aGUgbWFnaWNcbiAgICB0aGlzLmNvbm5lY3Rpb25zLmZvckVhY2goKGNvbm5MYXllcikgPT4ge1xuICAgICAgY29ubkxheWVyLmZvckVhY2goKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgY29ubmVjdGlvbi5hcHBseUF2ZXJhZ2VXZWlnaHQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldE5ldXJvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV1cm9ucztcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb25uZWN0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBnZXRJbnB1dFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRTaXplO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSBcIi4vQ29ubmVjdGlvblwiO1xuaW1wb3J0IHsgQWN0aXZhdGlvbnMgfSBmcm9tIFwiLi9IZWxwZXJDbGFzc2VzXCI7XG5cbmV4cG9ydCBjbGFzcyBOZXVyb24ge1xuICBwcml2YXRlIG5hbWU6IHN0cmluZztcblxuICBwcml2YXRlIGFjdGl2YXRpb246IG51bWJlcjtcbiAgcHJpdmF0ZSBpbnB1dHM6IENvbm5lY3Rpb25bXSA9IFtdO1xuICBwcml2YXRlIG91dHB1dHM6IENvbm5lY3Rpb25bXSA9IFtdO1xuXG4gIC8vIFRoZSBkZXJpdmF0aW9uIG9mIEMgd2l0aCByZXNwZWN0IHRvIHpcbiAgcHJpdmF0ZSBzaWdtYTogbnVtYmVyO1xuICBwcml2YXRlIGlzSW5wdXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBpc0NhbGN1bGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBpc0JpYXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGlzQmlhcyA9IGZhbHNlKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlzQmlhcyA9IGlzQmlhcztcbiAgfTtcblxuICBwdWJsaWMgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJc0JpYXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNCaWFzO1xuICB9XG5cbiAgcHVibGljIHNldEFzSW5wdXROZXVyb24oYWN0aXZhdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy5pc0lucHV0ID0gdHJ1ZTtcbiAgICB0aGlzLmFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICAgIHRoaXMuaW5wdXRzID0gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbnB1dChhY3RpdmF0aW9uOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuaXNJbnB1dCkge1xuICAgICAgdGhyb3cgJ0Nhbm5vdCBzZXQgYWN0aXZhdGlvbiBvZiBub24taW5wdXQgbmV1cm9uJztcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICB9XG5cbiAgcHVibGljIHNldFNpZ21hKHNpZ21hOiBudW1iZXIpIHtcbiAgICB0aGlzLnNpZ21hID0gc2lnbWE7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5wdXQoaW5wdXQ6IENvbm5lY3Rpb24pIHtcbiAgICB0aGlzLmlucHV0cy5wdXNoKGlucHV0KTtcbiAgfTtcblxuICBwdWJsaWMgYWRkT3V0cHV0KG91dHB1dDogQ29ubmVjdGlvbikge1xuICAgIHRoaXMub3V0cHV0cy5wdXNoKG91dHB1dCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0T3V0cHV0cygpOiBDb25uZWN0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLm91dHB1dHM7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgdGhpcy5pc0NhbGN1bGF0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBY3RpdmF0aW9uKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuaXNCaWFzKSB0aGlzLmFjdGl2YXRpb24gPSAxO1xuICAgIHJldHVybiB0aGlzLmFjdGl2YXRpb247XG4gIH1cblxuICBwdWJsaWMgZ2V0U2lnbWEoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2lnbWE7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlQWN0aXZhdGlvbigpOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5pc0lucHV0ICYmICF0aGlzLmlzQ2FsY3VsYXRlZCAmJiAhdGhpcy5pc0JpYXMpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbiA9IEFjdGl2YXRpb25zLlNJR01PSUQub3V0cHV0KHRoaXMuaW5wdXRzLnJlZHVjZSgoYWNjLCBjdXJyQ29ubikgPT4gYWNjICsgY3VyckNvbm4uY2FsY3VsYXRlVmFsdWUoKSwgMCkpO1xuICAgICAgdGhpcy5pc0NhbGN1bGF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRBY3RpdmF0aW9uKCk7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9