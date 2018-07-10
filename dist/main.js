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
        const text = drawableNeuron.activation.toFixed(2);
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
window.onload = () => {
    main();
};
let neuralCore;
let visualizer;
let input;
const main = () => {
    const content = document.getElementById('content');
    const controls = document.getElementById('controls');
    visualizer = new _Visualizer__WEBPACK_IMPORTED_MODULE_0__["Visualizer"](content);
    neuralCore = new _neuralNetwork_NeuralCore__WEBPACK_IMPORTED_MODULE_1__["NeuralCore"](2, [3], 1);
    // Set default values
    input = new Array(neuralCore.getInputSize());
    input.fill(1);
    neuralCore.addTrainingSet([1, 1], [0]);
    neuralCore.addTrainingSet([1, 0], [1]);
    neuralCore.addTrainingSet([0, 1], [1]);
    neuralCore.addTrainingSet([0, 0], [0]);
    for (let i = 0; i < 10000; i++) {
        neuralCore.train();
    }
    neuralCore.evaluate(input);
    visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
    for (let i = 0; i < neuralCore.getInputSize(); i++) {
        controls.innerHTML += `<input type="range" min="0" max="1" value="1" step="0.05" id="slider${i}" oninput="slide(${i}, this.value);"><br>`;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Zpc3VhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL0Nvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25ldXJhbE5ldHdvcmsvSGVscGVyQ2xhc3Nlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV1cmFsTmV0d29yay9OZXVyYWxDb3JlLnRzIiwid2VicGFjazovLy8uL3NyYy9uZXVyYWxOZXR3b3JrL05ldXJvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0VNO0lBT0osWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxHQUFHLEtBQUs7UUFDaEQsSUFB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QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBQUEsQ0FBQztJQUVLLFNBQVMsQ0FBQyxNQUFrQjtRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU0sVUFBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRU0sS0FBSztRQUNWLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFFTSxhQUFhO1FBQ2xCLElBQUksSUFBSSxDQUFDLE1BQU07WUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVNLG1CQUFtQjtRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxVQUFVLEdBQUcsMERBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDOUIsQ0FBQztDQUNGIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IE5ldXJvbiB9IGZyb20gXCIuL25ldXJhbE5ldHdvcmsvTmV1cm9uXCI7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSBcIi4vbmV1cmFsTmV0d29yay9Db25uZWN0aW9uXCI7XG5cbmV4cG9ydCBjbGFzcyBEcmF3YWJsZU5ldXJvbiB7XG4gIHB1YmxpYyB4OiBudW1iZXI7XG4gIHB1YmxpYyB5OiBudW1iZXI7XG4gIHB1YmxpYyBhY3RpdmF0aW9uOiBudW1iZXI7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBpc0JpYXM6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoeCwgeSwgYWN0aXZhdGlvbiwgbmFtZSwgaXNCaWFzID0gZmFsc2UpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5hY3RpdmF0aW9uID0gYWN0aXZhdGlvbjtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaXNCaWFzID0gaXNCaWFzO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaXN1YWxpemVyIHtcblxuICBwcml2YXRlIGNvbnRlbnQ6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoY29udGVudDogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIHRoaXMuY3R4ID0gY29udGVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuaGVpZ2h0ID0gY29udGVudC5oZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IGNvbnRlbnQud2lkdGg7XG4gIH1cblxuICBwdWJsaWMgZHJhdyhuZXVyb25zOiBOZXVyb25bXVtdLCBjb25uZWN0aW9uczogQ29ubmVjdGlvbltdW10pIHtcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIFxuICAgIGNvbnN0IGRyYXdhYmxlTmV1cm9uczogRHJhd2FibGVOZXVyb25bXSA9IFtdO1xuICAgIGNvbnN0IGxlZnRNYXJnaW4gPSB0aGlzLndpZHRoIC8gKG5ldXJvbnMubGVuZ3RoICsgMSk7XG5cbiAgICAvLyBOZXVyb25zXG4gICAgbmV1cm9ucy5mb3JFYWNoKChsYXllciwgbElkeCkgPT4ge1xuICAgICAgY29uc3QgdG9wTWFyZ2luID0gdGhpcy5oZWlnaHQgLyAobGF5ZXIubGVuZ3RoICsgMik7XG4gICAgICBsYXllci5mb3JFYWNoKChuZXVyb24sIG5JZHgpID0+IHtcbiAgICAgICAgY29uc3QgeCA9IGxlZnRNYXJnaW4gKiAoMSArIGxJZHgpO1xuICAgICAgICBjb25zdCB5ID0gdG9wTWFyZ2luICogKDEgKyBuSWR4KTtcblxuICAgICAgICBjb25zdCBkcmF3YWJsZU5ldXJvbiA9IG5ldyBEcmF3YWJsZU5ldXJvbih4LCB5LCBuZXVyb24uZ2V0QWN0aXZhdGlvbigpLCBuZXVyb24udG9TdHJpbmcoKSk7XG4gICAgICAgIGRyYXdhYmxlTmV1cm9ucy5wdXNoKGRyYXdhYmxlTmV1cm9uKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAobElkeCAhPSBuZXVyb25zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgY29uc3QgeCA9IGxlZnRNYXJnaW4gKiAoMSArIGxJZHgpO1xuICAgICAgICBjb25zdCB5ID0gdG9wTWFyZ2luICogKDEgKyBuZXVyb25zW2xJZHhdLmxlbmd0aCk7XG5cbiAgICAgICAgY29uc3QgZHJhd2FibGVOZXVyb24gPSBuZXcgRHJhd2FibGVOZXVyb24oeCwgeSwgMSwgYGJpYXMke2xJZHh9YCwgdHJ1ZSk7XG4gICAgICAgIGRyYXdhYmxlTmV1cm9ucy5wdXNoKGRyYXdhYmxlTmV1cm9uKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENvbm5lY3Rpb25zXG4gICAgY29uc3QgZHJhd2FibGVOYW1lTWFwID0gbmV3IE1hcDxzdHJpbmcsIERyYXdhYmxlTmV1cm9uPigpO1xuICAgIGRyYXdhYmxlTmV1cm9ucy5mb3JFYWNoKFxuICAgICAgKGRyYXdhYmxlTmV1cm9uKSA9PiBkcmF3YWJsZU5hbWVNYXAuc2V0KGRyYXdhYmxlTmV1cm9uLm5hbWUsIGRyYXdhYmxlTmV1cm9uKS8vIFdURiwgSSB3YXMgbm90IGFibGUgdG8gY3JlYXRlIG1hcCBmcm9tIDJkIGFyclxuICAgICk7XG5cbiAgICBjb25uZWN0aW9ucy5mb3JFYWNoKChsYXllciwgbElkeCkgPT4ge1xuICAgICAgbGF5ZXIuZm9yRWFjaCgoY29ubmVjdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dE5OYW1lID1cbiAgICAgICAgICAoY29ubmVjdGlvbi5nZXRJbnB1dE5ldXJvbigpLmdldElzQmlhcygpKSA/XG4gICAgICAgICAgICBgYmlhcyR7bElkeH1gIDpcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS50b1N0cmluZygpO1xuXG4gICAgICAgIHRoaXMuZHJhd0Nvbm5lY3Rpb24oXG4gICAgICAgICAgZHJhd2FibGVOYW1lTWFwLmdldChpbnB1dE5OYW1lKSxcbiAgICAgICAgICBkcmF3YWJsZU5hbWVNYXAuZ2V0KGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkudG9TdHJpbmcoKSksXG4gICAgICAgICAgY29ubmVjdGlvbi5nZXRXZWlnaHQoKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkcmF3YWJsZU5ldXJvbnMuZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICB0aGlzLmRyYXdOZXVyb24obmV1cm9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd05ldXJvbihkcmF3YWJsZU5ldXJvbjogRHJhd2FibGVOZXVyb24pIHtcbiAgICAvLyB3aGl0ZSBiYWNrZ3JvdW5kXG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguYXJjKGRyYXdhYmxlTmV1cm9uLngsIGRyYXdhYmxlTmV1cm9uLnksIDI1LCAwLCAyICogTWF0aC5QSSk7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYigyNTUsMjU1LDI1NSlgO1xuICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICBcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICBpZiAoZHJhd2FibGVOZXVyb24uaXNCaWFzKVxuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYmEoNDYsNDAsNDIsIDEpYDtcbiAgICBlbHNlXG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBgcmdiYSgyMywgMTkwLCAxODcsICR7ZHJhd2FibGVOZXVyb24uYWN0aXZhdGlvbn0pYDtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGByZ2IoNDYsNDAsNDIsIDEpYFxuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgdGhpcy5jdHguYXJjKGRyYXdhYmxlTmV1cm9uLngsIGRyYXdhYmxlTmV1cm9uLnksIDI1LCAwLCAyICogTWF0aC5QSSk7XG4gICAgdGhpcy5jdHguZmlsbCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuXG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYHJnYig0Niw0MCw0MiwgMSlgXG4gICAgY29uc3QgaGVpZ2h0ID0gMTY7XG4gICAgdGhpcy5jdHguZm9udCA9IGBib2xkICR7aGVpZ2h0fXB4IHNlcmlmYDtcbiAgICBjb25zdCB0ZXh0ID0gZHJhd2FibGVOZXVyb24uYWN0aXZhdGlvbi50b0ZpeGVkKDIpO1xuICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxuICAgICAgdGV4dCwgXG4gICAgICBkcmF3YWJsZU5ldXJvbi54IC0gdGhpcy5jdHgubWVhc3VyZVRleHQodGV4dCkud2lkdGggLyAyLCBcbiAgICAgIGRyYXdhYmxlTmV1cm9uLnkgKyBoZWlnaHQgLyAzKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd0Nvbm5lY3Rpb24oaW5wdXROZXVyb246IERyYXdhYmxlTmV1cm9uLCBvdXRwdXROZXVyb246IERyYXdhYmxlTmV1cm9uLCB3ZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9ICh3ZWlnaHQgPiAwKSA/IFxuICAgICAgTWF0aC5sb2cod2VpZ2h0KSA6XG4gICAgICBNYXRoLmxvZygtd2VpZ2h0KTtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9ICh3ZWlnaHQgPiAwKSA/XG4gICAgICBgcmdiYSgyMDUsIDgzLCA1MiwgJHt3ZWlnaHR9KWAgOlxuICAgICAgYHJnYmEoNjEsIDIzMiwgMjU1LCAke3dlaWdodCAqIC0xfSlgO1xuICAgIHRoaXMuY3R4Lm1vdmVUbyhpbnB1dE5ldXJvbi54LCBpbnB1dE5ldXJvbi55KTtcbiAgICB0aGlzLmN0eC5saW5lVG8ob3V0cHV0TmV1cm9uLngsIG91dHB1dE5ldXJvbi55KTtcbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmlzdWFsaXplciB9IGZyb20gJy4vVmlzdWFsaXplcic7XG5pbXBvcnQgeyBOZXVyYWxDb3JlIH0gZnJvbSAnLi9uZXVyYWxOZXR3b3JrL05ldXJhbENvcmUnO1xuXG4od2luZG93IGFzIGFueSkuc2xpZGUgPSAoaTogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKSA9PiB7XG4gIGlucHV0W2ldID0gdmFsdWU7XG4gIG5ldXJhbENvcmUuZXZhbHVhdGUoaW5wdXQpO1xuICB2aXN1YWxpemVyLmRyYXcobmV1cmFsQ29yZS5nZXROZXVyb25zKCksIG5ldXJhbENvcmUuZ2V0Q29ubmVjdGlvbnMoKSk7XG59XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIG1haW4oKTtcbn07XG5cbmxldCBuZXVyYWxDb3JlOiBOZXVyYWxDb3JlO1xubGV0IHZpc3VhbGl6ZXI6IFZpc3VhbGl6ZXI7XG5sZXQgaW5wdXQ6IG51bWJlcltdO1xuXG5jb25zdCBtYWluID0gKCkgPT4ge1xuICBjb25zdCBjb250ZW50OiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50JykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGNvbnN0IGNvbnRyb2xzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9scycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICB2aXN1YWxpemVyID0gbmV3IFZpc3VhbGl6ZXIoY29udGVudCk7XG4gIG5ldXJhbENvcmUgPSBuZXcgTmV1cmFsQ29yZSgyLCBbM10sIDEpO1xuXG4gIC8vIFNldCBkZWZhdWx0IHZhbHVlc1xuICBpbnB1dCA9IG5ldyBBcnJheShuZXVyYWxDb3JlLmdldElucHV0U2l6ZSgpKTtcbiAgaW5wdXQuZmlsbCgxKTtcblxuICBuZXVyYWxDb3JlLmFkZFRyYWluaW5nU2V0KFsxLCAxXSwgWzBdKTtcbiAgbmV1cmFsQ29yZS5hZGRUcmFpbmluZ1NldChbMSwgMF0sIFsxXSk7XG4gIG5ldXJhbENvcmUuYWRkVHJhaW5pbmdTZXQoWzAsIDFdLCBbMV0pO1xuICBuZXVyYWxDb3JlLmFkZFRyYWluaW5nU2V0KFswLCAwXSwgWzBdKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDAwOyBpKyspIHtcbiAgICBuZXVyYWxDb3JlLnRyYWluKCk7XG4gIH1cblxuICBuZXVyYWxDb3JlLmV2YWx1YXRlKGlucHV0KTtcbiAgdmlzdWFsaXplci5kcmF3KG5ldXJhbENvcmUuZ2V0TmV1cm9ucygpLCBuZXVyYWxDb3JlLmdldENvbm5lY3Rpb25zKCkpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmV1cmFsQ29yZS5nZXRJbnB1dFNpemUoKTsgaSsrKSB7XG4gICAgY29udHJvbHMuaW5uZXJIVE1MICs9IGA8aW5wdXQgdHlwZT1cInJhbmdlXCIgbWluPVwiMFwiIG1heD1cIjFcIiB2YWx1ZT1cIjFcIiBzdGVwPVwiMC4wNVwiIGlkPVwic2xpZGVyJHtpfVwiIG9uaW5wdXQ9XCJzbGlkZSgke2l9LCB0aGlzLnZhbHVlKTtcIj48YnI+YDtcbiAgfVxufSIsImltcG9ydCB7IE5ldXJvbiB9IGZyb20gXCIuL05ldXJvblwiO1xuXG5leHBvcnQgY2xhc3MgQ29ubmVjdGlvbiB7XG4gIHByaXZhdGUgd2VpZ2h0OiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpO1xuICBwcml2YXRlIGlucHV0TmV1cm9uOiBOZXVyb247XG4gIHByaXZhdGUgb3V0cHV0TmV1cm9uOiBOZXVyb247XG4gIHByaXZhdGUgc2FtcGxlV2VpZ2h0Q2hhbmdlczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihpbnB1dDogTmV1cm9uLCBvdXRwdXQ6IE5ldXJvbikge1xuICAgIHRoaXMuaW5wdXROZXVyb24gPSBpbnB1dDtcbiAgICB0aGlzLm91dHB1dE5ldXJvbiA9IG91dHB1dDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTYW1wbGVXZWlnaHRDaGFuZ2Uod2VpZ2h0Q2hhbmdlOiBudW1iZXIpIHtcbiAgICB0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMucHVzaCh3ZWlnaHRDaGFuZ2UpO1xuICB9XG5cbiAgcHVibGljIGFwcGx5QXZlcmFnZVdlaWdodCgpIHtcbiAgICBjb25zdCBjaGFuZ2UgPSAodGhpcy5zYW1wbGVXZWlnaHRDaGFuZ2VzLnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYyArIHZhbCwgMCkgLyB0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMubGVuZ3RoKTtcbiAgICB0aGlzLndlaWdodCArPSBjaGFuZ2U7XG4gICAgdGhpcy5zYW1wbGVXZWlnaHRDaGFuZ2VzID0gW107XG4gIH1cblxuICBwdWJsaWMgZ2V0V2VpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLndlaWdodDtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy53ZWlnaHQgKiB0aGlzLmlucHV0TmV1cm9uLmNhbGN1bGF0ZUFjdGl2YXRpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPdXRwdXROZXVyb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub3V0cHV0TmV1cm9uO1xuICB9XG5cbiAgcHVibGljIGdldElucHV0TmV1cm9uKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0TmV1cm9uO1xuICB9XG59IiwiZXhwb3J0IGNsYXNzIEFjdGl2YXRpb25zIHtcbiAgcHVibGljIHN0YXRpYyBTSUdNT0lEID0ge1xuICAgIG91dHB1dDogKHg6IG51bWJlcik6IG51bWJlciA9PiAxIC8gKDEgKyBNYXRoLmV4cCgteCkpLFxuICAgIGRlcjogKHg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgICBsZXQgb3V0cHV0ID0gQWN0aXZhdGlvbnMuU0lHTU9JRC5vdXRwdXQoeCk7XG4gICAgICByZXR1cm4gb3V0cHV0ICogKDEgLSBvdXRwdXQpO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIFRyYWluU2FtcGxlIHtcbiAgcHVibGljIGlucHV0OiBudW1iZXJbXTtcbiAgcHVibGljIG91dHB1dDogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IoaW5wdXQ6IG51bWJlcltdLCBvdXRwdXQ6IG51bWJlcltdKSB7XG4gICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgIHRoaXMub3V0cHV0ID0gb3V0cHV0O1xuICB9XG59IiwiaW1wb3J0IHsgTmV1cm9uIH0gZnJvbSBcIi4vTmV1cm9uXCI7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSBcIi4vQ29ubmVjdGlvblwiO1xuaW1wb3J0IHsgVHJhaW5TYW1wbGUsIEFjdGl2YXRpb25zIH0gZnJvbSBcIi4vSGVscGVyQ2xhc3Nlc1wiO1xuXG5leHBvcnQgY2xhc3MgTmV1cmFsQ29yZSB7XG4gIHByaXZhdGUgaW5wdXRTaXplOiBudW1iZXI7XG4gIHByaXZhdGUgaGlkZGVuTGF5ZXJTaXplczogbnVtYmVyW107XG4gIHByaXZhdGUgb3V0cHV0U2l6ZTogbnVtYmVyO1xuXG4gIHByaXZhdGUgbGF5ZXJDbnQ6IG51bWJlcjtcblxuICBwcml2YXRlIHJhdGUgPSA1O1xuXG4gIHByaXZhdGUgYmlhc05ldXJvbiA9IG5ldyBOZXVyb24oJ2JpYXMnLCB0cnVlKTtcbiAgcHJpdmF0ZSBuZXVyb25zOiBOZXVyb25bXVtdID0gW107XG4gIHByaXZhdGUgY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXVtdID0gW107XG5cbiAgcHJpdmF0ZSB0cmFpblNhbXBsZXM6IFRyYWluU2FtcGxlW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihpbnB1dFNpemU6IG51bWJlciwgaGlkZGVuTGF5ZXJTaXplczogbnVtYmVyW10sIG91dHB1dFNpemU6IG51bWJlcikge1xuICAgIHRoaXMuaW5wdXRTaXplID0gaW5wdXRTaXplO1xuICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplcyA9IGhpZGRlbkxheWVyU2l6ZXM7XG4gICAgdGhpcy5vdXRwdXRTaXplID0gb3V0cHV0U2l6ZTtcbiAgICB0aGlzLmxheWVyQ250ID0gaGlkZGVuTGF5ZXJTaXplcy5sZW5ndGggKyAyO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIC8vIENyZWF0ZSB0aGUgbmV1cm9uc1xuICAgIGZvciAobGV0IGwgPSAwOyBsIDwgdGhpcy5sYXllckNudDsgbCsrKSB7XG4gICAgICAvLyBIb3cgbWFueSBuZXVyb25zIGFyZSBpbiBlYWNoIGxheWVyP1xuICAgICAgbGV0IG5ldXJvbnNJbkxheWVyQ250ID0gMDtcbiAgICAgIHN3aXRjaCAobCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgbmV1cm9uc0luTGF5ZXJDbnQgPSB0aGlzLmlucHV0U2l6ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0aGlzLmhpZGRlbkxheWVyU2l6ZXMubGVuZ3RoICsgMTpcbiAgICAgICAgICBuZXVyb25zSW5MYXllckNudCA9IHRoaXMub3V0cHV0U2l6ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBuZXVyb25zSW5MYXllckNudCA9IHRoaXMuaGlkZGVuTGF5ZXJTaXplc1tsIC0gMV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubmV1cm9uc1tsXSA9IFtdO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlbVxuICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBuZXVyb25zSW5MYXllckNudDsgbisrKSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsXVtuXSA9IG5ldyBOZXVyb24oYE5ldXJvbiR7bH0ke259YCk7XG4gICAgICAgIGlmIChsID09IDApIHtcbiAgICAgICAgICB0aGlzLm5ldXJvbnNbbF1bbl0uc2V0QXNJbnB1dE5ldXJvbigwKTsgLy8ganVzdCB0byBhdm9pZCBjcmFzaGVzLCB0aGUgMCBzaG91bGQgYmUgb3ZlcnJpZGVuIGxhdGVyIFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHRoZSBDb25uZWN0aW9uc1xuICAgIGZvciAobGV0IGwgPSAwOyBsIDwgdGhpcy5sYXllckNudCAtIDE7IGwrKykge1xuICAgICAgLy8gRm9yIGVhY2ggbmV1cm9uIGluIHRoZSBsYXllciBhZGQgYWxsIGNvbm5lY3Rpb25zIHRvIG5ldXJvbnMgaW4gdGhlIG5leHQgbGF5ZXJcbiAgICAgIHRoaXMuY29ubmVjdGlvbnNbbF0gPSBbXTtcblxuICAgICAgdGhpcy5uZXVyb25zW2wgKyAxXS5mb3JFYWNoKG5leHROZXVyb24gPT4geyAvLyBJZiB5b3Ugd29uZGVyIHdoeSB0aGlzIGN5Y2xlcyBhcmUgc3dpdGNoZWQsIGl0J3MgYmVjYXVzZSBvZiB0aGUgYmlhc1xuICAgICAgICB0aGlzLm5ldXJvbnNbbF0uZm9yRWFjaChjdXJyTmV1cm9uID0+IHtcbiAgICAgICAgICBjb25zdCBjb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb24oY3Vyck5ldXJvbiwgbmV4dE5ldXJvbilcbiAgICAgICAgICBjdXJyTmV1cm9uLmFkZE91dHB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICBuZXh0TmV1cm9uLmFkZElucHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbF0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQWRkIGJpYXMgbmV1cm9uIHRvIGVhY2ggbGF5ZXJcbiAgICAgICAgY29uc3QgYmlhc0Nvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbih0aGlzLmJpYXNOZXVyb24sIG5leHROZXVyb24pO1xuICAgICAgICBuZXh0TmV1cm9uLmFkZElucHV0KGJpYXNDb25uZWN0aW9uKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsXS5wdXNoKGJpYXNDb25uZWN0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBldmFsdWF0ZShpbnB1dDogbnVtYmVyW10pOiBudW1iZXJbXSB7XG4gICAgaWYgKGlucHV0Lmxlbmd0aCAhPSB0aGlzLmlucHV0U2l6ZSkge1xuICAgICAgdGhyb3cgJ0lucHV0IHNpemUgZG9lcyBub3QgbWF0Y2gnO1xuICAgIH1cbiAgICAvLyBSZXNldCwgc28gZWFjaCBuZXVyb24gaXMgcmVjYWxjdWxhdGVkXG4gICAgdGhpcy5uZXVyb25zLmZvckVhY2gobGF5ZXIgPT4geyBsYXllci5mb3JFYWNoKG5ldXJvbiA9PiBuZXVyb24ucmVzZXQoKSkgfSlcbiAgICAvLyBTZXQgaW5wdXQgbGF5ZXJcbiAgICB0aGlzLm5ldXJvbnNbMF0uZm9yRWFjaCgobmV1cm9uLCBpZHgpID0+IHsgbmV1cm9uLnNldElucHV0KGlucHV0W2lkeF0pIH0pO1xuXG4gICAgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5mb3JFYWNoKG5ldXJvbiA9PiB7XG4gICAgICBuZXVyb24uY2FsY3VsYXRlQWN0aXZhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250IC0gMV0ubWFwKG5ldXJvbiA9PiBuZXVyb24uZ2V0QWN0aXZhdGlvbigpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRUcmFpbmluZ1NldChpbnB1dDogbnVtYmVyW10sIG91dHB1dDogbnVtYmVyW10pIHtcbiAgICB0aGlzLnRyYWluU2FtcGxlcy5wdXNoKG5ldyBUcmFpblNhbXBsZShpbnB1dCwgb3V0cHV0KSlcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb3N0KCk6IG51bWJlciB7XG4gICAgY29uc3QgY29zdFN1bSA9IHRoaXMudHJhaW5TYW1wbGVzLnJlZHVjZSgoY29zdFN1bSwgc2FtcGxlKSA9PiB7IC8vIEFkZCB1cCBhbGwgc2FtcGxlc1xuICAgICAgdGhpcy5ldmFsdWF0ZShzYW1wbGUuaW5wdXQpO1xuICAgICAgcmV0dXJuIGNvc3RTdW0gKyB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLnJlZHVjZSgoYWNjLCBuZXVyb24sIGkpID0+IHsgLy8gQWRkIHVwIGFsbCBvdXRwdXQgbmV1cm9uc1xuICAgICAgICByZXR1cm4gYWNjICsgKG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkgLSBzYW1wbGUub3V0cHV0W2ldKSAqKiAyO1xuICAgICAgfSwgMCk7XG4gICAgfSwgMCk7XG5cbiAgICByZXR1cm4gMSAvIDIgKiBjb3N0U3VtICogKDEgLyB0aGlzLnRyYWluU2FtcGxlcy5sZW5ndGgpO1xuICB9XG5cbiAgcHVibGljIHRyYWluKCkge1xuICAgIHRoaXMudHJhaW5TYW1wbGVzLmZvckVhY2goKHNhbXBsZSkgPT4ge1xuICAgICAgdGhpcy5ldmFsdWF0ZShzYW1wbGUuaW5wdXQpXG5cbiAgICAgIC8vIENhbGN1bGF0ZSBzaWdtYXMgb2YgdGhlIGxhc3QgbGF5ZXJcbiAgICAgIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250IC0gMV0uZm9yRWFjaCgobmV1cm9uLCBpZHgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3U2lnbWEgPVxuICAgICAgICAgIChzYW1wbGUub3V0cHV0W2lkeF0gLSBuZXVyb24uZ2V0QWN0aXZhdGlvbigpKSAqIEFjdGl2YXRpb25zLlNJR01PSUQuZGVyKG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkpO1xuXG4gICAgICAgIG5ldXJvbi5zZXRTaWdtYShuZXdTaWdtYSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gQ2FsY3VsYXRlIHNpZ21hcyBmb3IgZWFjaCBuZXVyb24gaW4gdGhlIGxvd2VyIGxheWVyc1xuICAgICAgZm9yIChsZXQgbCA9IHRoaXMubGF5ZXJDbnQgLSAyOyBsID49IDA7IGwtLSkge1xuICAgICAgICB0aGlzLm5ldXJvbnNbbF0uZm9yRWFjaCgobmV1cm9uKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmV3U2lnbWEgPVxuICAgICAgICAgICAgbmV1cm9uLmdldE91dHB1dHMoKS5yZWR1Y2UoKGFjYywgY29ubmVjdGlvbikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gYWNjICsgY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXRTaWdtYSgpICogY29ubmVjdGlvbi5nZXRXZWlnaHQoKTtcbiAgICAgICAgICAgIH0sIDApICogQWN0aXZhdGlvbnMuU0lHTU9JRC5kZXIobmV1cm9uLmdldEFjdGl2YXRpb24oKSk7XG4gICAgICAgICAgbmV1cm9uLnNldFNpZ21hKG5ld1NpZ21hKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFjY3VtdWxhdGUgYWxsIHdlaWdodCB1cGRhdGVzXG4gICAgICB0aGlzLmNvbm5lY3Rpb25zLmZvckVhY2goKGNvbm5MYXllcikgPT4ge1xuICAgICAgICBjb25uTGF5ZXIuZm9yRWFjaCgoY29ubmVjdGlvbikgPT4ge1xuICAgICAgICAgIGNvbnN0IHdlaWdodENoYW5nZSA9XG4gICAgICAgICAgICBjb25uZWN0aW9uLmdldE91dHB1dE5ldXJvbigpLmdldFNpZ21hKCkgKlxuICAgICAgICAgICAgY29ubmVjdGlvbi5nZXRJbnB1dE5ldXJvbigpLmdldEFjdGl2YXRpb24oKSAqXG4gICAgICAgICAgICB0aGlzLnJhdGU7XG5cbiAgICAgICAgICBjb25uZWN0aW9uLmFkZFNhbXBsZVdlaWdodENoYW5nZSh3ZWlnaHRDaGFuZ2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gVWZmLCBsZXQncyBob3BlIGV2ZXJ5dGhpbmcgd29ya3MgYW5kIGFwcGx5IHRoZSBtYWdpY1xuICAgIHRoaXMuY29ubmVjdGlvbnMuZm9yRWFjaCgoY29ubkxheWVyKSA9PiB7XG4gICAgICBjb25uTGF5ZXIuZm9yRWFjaCgoY29ubmVjdGlvbikgPT4ge1xuICAgICAgICBjb25uZWN0aW9uLmFwcGx5QXZlcmFnZVdlaWdodCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TmV1cm9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5uZXVyb25zO1xuICB9XG5cbiAgcHVibGljIGdldENvbm5lY3Rpb25zKCkge1xuICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb25zO1xuICB9XG5cbiAgcHVibGljIGdldElucHV0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dFNpemU7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tIFwiLi9Db25uZWN0aW9uXCI7XG5pbXBvcnQgeyBBY3RpdmF0aW9ucyB9IGZyb20gXCIuL0hlbHBlckNsYXNzZXNcIjtcblxuZXhwb3J0IGNsYXNzIE5ldXJvbiB7XG4gIHByaXZhdGUgbmFtZTogc3RyaW5nO1xuXG4gIHByaXZhdGUgYWN0aXZhdGlvbjogbnVtYmVyO1xuICBwcml2YXRlIGlucHV0czogQ29ubmVjdGlvbltdID0gW107XG4gIHByaXZhdGUgb3V0cHV0czogQ29ubmVjdGlvbltdID0gW107XG5cbiAgLy8gVGhlIGRlcml2YXRpb24gb2YgQyB3aXRoIHJlc3BlY3QgdG8gelxuICBwcml2YXRlIHNpZ21hOiBudW1iZXI7XG4gIHByaXZhdGUgaXNJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGlzQ2FsY3VsYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGlzQmlhczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgaXNCaWFzID0gZmFsc2UpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaXNCaWFzID0gaXNCaWFzO1xuICB9O1xuXG4gIHB1YmxpYyB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgcHVibGljIGdldElzQmlhcygpIHtcbiAgICByZXR1cm4gdGhpcy5pc0JpYXM7XG4gIH1cblxuICBwdWJsaWMgc2V0QXNJbnB1dE5ldXJvbihhY3RpdmF0aW9uOiBudW1iZXIpIHtcbiAgICB0aGlzLmlzSW5wdXQgPSB0cnVlO1xuICAgIHRoaXMuYWN0aXZhdGlvbiA9IGFjdGl2YXRpb247XG4gICAgdGhpcy5pbnB1dHMgPSBudWxsO1xuICB9XG5cbiAgcHVibGljIHNldElucHV0KGFjdGl2YXRpb246IG51bWJlcikge1xuICAgIGlmICghdGhpcy5pc0lucHV0KSB7XG4gICAgICB0aHJvdyAnQ2Fubm90IHNldCBhY3RpdmF0aW9uIG9mIG5vbi1pbnB1dCBuZXVyb24nO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZhdGlvbiA9IGFjdGl2YXRpb247XG4gIH1cblxuICBwdWJsaWMgc2V0U2lnbWEoc2lnbWE6IG51bWJlcikge1xuICAgIHRoaXMuc2lnbWEgPSBzaWdtYTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJbnB1dChpbnB1dDogQ29ubmVjdGlvbikge1xuICAgIHRoaXMuaW5wdXRzLnB1c2goaW5wdXQpO1xuICB9O1xuXG4gIHB1YmxpYyBhZGRPdXRwdXQob3V0cHV0OiBDb25uZWN0aW9uKSB7XG4gICAgdGhpcy5vdXRwdXRzLnB1c2gob3V0cHV0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPdXRwdXRzKCk6IENvbm5lY3Rpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMub3V0cHV0cztcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGdldEFjdGl2YXRpb24oKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5pc0JpYXMpIHRoaXMuYWN0aXZhdGlvbiA9IDE7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZhdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTaWdtYSgpIHtcbiAgICByZXR1cm4gdGhpcy5zaWdtYTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVBY3RpdmF0aW9uKCk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLmlzSW5wdXQgJiYgIXRoaXMuaXNDYWxjdWxhdGVkICYmICF0aGlzLmlzQmlhcykge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uID0gQWN0aXZhdGlvbnMuU0lHTU9JRC5vdXRwdXQodGhpcy5pbnB1dHMucmVkdWNlKChhY2MsIGN1cnJDb25uKSA9PiBhY2MgKyBjdXJyQ29ubi5jYWxjdWxhdGVWYWx1ZSgpLCAwKSk7XG4gICAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldEFjdGl2YXRpb24oKTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=