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

/***/ "./src/NeuralCore.ts":
/*!***************************!*\
  !*** ./src/NeuralCore.ts ***!
  \***************************/
/*! exports provided: NeuralCore, Neuron, Connection, Activations, TrainSample */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NeuralCore", function() { return NeuralCore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Neuron", function() { return Neuron; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Connection", function() { return Connection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Activations", function() { return Activations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrainSample", function() { return TrainSample; });
class NeuralCore {
    constructor(inputSize, hiddenLayerSizes, outputSize) {
        this.rate = 1;
        this.biasNeuron = new Neuron('bias');
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
                this.neurons[l][n] = new Neuron(`Neuron${l}${n}`);
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
                    const connection = new Connection(currNeuron, nextNeuron);
                    currNeuron.addOutput(connection);
                    nextNeuron.addInput(connection);
                    this.connections[l].push(connection);
                });
                // Add bias neuron to each layer
                const biasConnection = new Connection(this.biasNeuron, nextNeuron);
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
        this.trainSamples.push(new TrainSample(input, output));
    }
    getCost() {
        const costSum = this.trainSamples.reduce((costSum, sample, idx) => {
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
                const newSigma = (sample.output[idx] - neuron.getActivation()) * Activations.SIGMOID.der(neuron.getActivation());
                neuron.setSigma(newSigma);
            });
            // Calculate sigmas for each neuron in the lower layers
            for (let l = this.layerCnt - 2; l >= 0; l--) {
                this.neurons[l].forEach((neuron) => {
                    const newSigma = neuron.getOutputs().reduce((acc, connection) => {
                        return acc + connection.getOutputNeuron().getSigma() * connection.getWeight();
                    }, 0) * Activations.SIGMOID.der(neuron.getActivation());
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
}
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
        return name;
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
            return 1;
        return this.activation;
    }
    getSigma() {
        return this.sigma;
    }
    calculateActivation() {
        if (!this.isInput && !this.isCalculated && !this.isBias) {
            this.activation = Activations.SIGMOID.output(this.inputs.reduce((acc, currConn) => acc + currConn.calculateValue(), 0));
            this.isCalculated = true;
        }
        return this.getActivation();
    }
}
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

/***/ "./src/Visualize.ts":
/*!**************************!*\
  !*** ./src/Visualize.ts ***!
  \**************************/
/*! exports provided: Visualizer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Visualizer", function() { return Visualizer; });
class Visualizer {
    constructor(content) {
        this.printNumber = (num) => {
            this.content.innerText = `${num}`;
        };
        this.content = content;
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
/* harmony import */ var _Visualize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Visualize */ "./src/Visualize.ts");
/* harmony import */ var _NeuralCore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NeuralCore */ "./src/NeuralCore.ts");


window.onload = () => {
    main();
};
let neuralCore;
let visualizer;
const main = () => {
    const content = document.getElementById('content');
    visualizer = new _Visualize__WEBPACK_IMPORTED_MODULE_0__["Visualizer"](content);
    neuralCore = new _NeuralCore__WEBPACK_IMPORTED_MODULE_1__["NeuralCore"](2, [], 1);
    neuralCore.addTrainingSet([1, 1], [1]);
    neuralCore.addTrainingSet([1, 0], [0]);
    neuralCore.addTrainingSet([0, 1], [0]);
    neuralCore.addTrainingSet([0, 0], [0]);
    for (let i = 0; i < 2000; i++) {
        neuralCore.train();
        console.log(neuralCore.getCost());
    }
    console.log(neuralCore.evaluate([1, 1]));
    console.log(neuralCore.evaluate([1, 0]));
    console.log(neuralCore.evaluate([0, 1]));
    console.log(neuralCore.evaluate([0, 0]));
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL05ldXJhbENvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Zpc3VhbGl6ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGTTtJQWVKLFlBQVksU0FBaUIsRUFBRSxnQkFBMEIsRUFBRSxVQUFrQjtRQVJyRSxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRVQsZUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBRztRQUNqQyxZQUFPLEdBQWUsRUFBRSxDQUFDO1FBQ3pCLGdCQUFXLEdBQW1CLEVBQUUsQ0FBQztRQUVqQyxpQkFBWSxHQUFrQixFQUFFLENBQUM7UUFHdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFD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QUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzNCLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ25DO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImV4cG9ydCBjbGFzcyBOZXVyYWxDb3JlIHtcbiAgcHJpdmF0ZSBpbnB1dFNpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSBoaWRkZW5MYXllclNpemVzOiBudW1iZXJbXTtcbiAgcHJpdmF0ZSBvdXRwdXRTaXplOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBsYXllckNudDogbnVtYmVyO1xuXG4gIHByaXZhdGUgcmF0ZSA9IDE7XG5cbiAgcHJpdmF0ZSBiaWFzTmV1cm9uID0gbmV3IE5ldXJvbignYmlhcycsIClcbiAgcHJpdmF0ZSBuZXVyb25zOiBOZXVyb25bXVtdID0gW107XG4gIHByaXZhdGUgY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXVtdID0gW107XG5cbiAgcHJpdmF0ZSB0cmFpblNhbXBsZXM6IFRyYWluU2FtcGxlW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihpbnB1dFNpemU6IG51bWJlciwgaGlkZGVuTGF5ZXJTaXplczogbnVtYmVyW10sIG91dHB1dFNpemU6IG51bWJlcikge1xuICAgIHRoaXMuaW5wdXRTaXplID0gaW5wdXRTaXplO1xuICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplcyA9IGhpZGRlbkxheWVyU2l6ZXM7XG4gICAgdGhpcy5vdXRwdXRTaXplID0gb3V0cHV0U2l6ZTtcbiAgICB0aGlzLmxheWVyQ250ID0gaGlkZGVuTGF5ZXJTaXplcy5sZW5ndGggKyAyO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIC8vIENyZWF0ZSB0aGUgbmV1cm9uc1xuICAgIGZvciAobGV0IGwgPSAwOyBsIDwgdGhpcy5sYXllckNudDsgbCsrKSB7XG4gICAgICAvLyBIb3cgbWFueSBuZXVyb25zIGFyZSBpbiBlYWNoIGxheWVyP1xuICAgICAgbGV0IG5ldXJvbnNJbkxheWVyQ250ID0gMDtcbiAgICAgIHN3aXRjaCAobCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgbmV1cm9uc0luTGF5ZXJDbnQgPSB0aGlzLmlucHV0U2l6ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0aGlzLmhpZGRlbkxheWVyU2l6ZXMubGVuZ3RoICsgMTpcbiAgICAgICAgICBuZXVyb25zSW5MYXllckNudCA9IHRoaXMub3V0cHV0U2l6ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBuZXVyb25zSW5MYXllckNudCA9IHRoaXMuaGlkZGVuTGF5ZXJTaXplc1tsIC0gMV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubmV1cm9uc1tsXSA9IFtdO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlbVxuICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBuZXVyb25zSW5MYXllckNudDsgbisrKSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsXVtuXSA9IG5ldyBOZXVyb24oYE5ldXJvbiR7bH0ke259YCk7XG4gICAgICAgIGlmIChsID09IDApIHtcbiAgICAgICAgICB0aGlzLm5ldXJvbnNbbF1bbl0uc2V0QXNJbnB1dE5ldXJvbigwKTsgLy8ganVzdCB0byBhdm9pZCBjcmFzaGVzLCB0aGUgMCBzaG91bGQgYmUgb3ZlcnJpZGVuIGxhdGVyIFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHRoZSBDb25uZWN0aW9uc1xuICAgIGZvciAobGV0IGwgPSAwOyBsIDwgdGhpcy5sYXllckNudCAtIDE7IGwrKykge1xuICAgICAgLy8gRm9yIGVhY2ggbmV1cm9uIGluIHRoZSBsYXllciBhZGQgYWxsIGNvbm5lY3Rpb25zIHRvIG5ldXJvbnMgaW4gdGhlIG5leHQgbGF5ZXJcbiAgICAgIHRoaXMuY29ubmVjdGlvbnNbbF0gPSBbXTtcblxuICAgICAgdGhpcy5uZXVyb25zW2wgKyAxXS5mb3JFYWNoKG5leHROZXVyb24gPT4geyAvLyBJZiB5b3Ugd29uZGVyIHdoeSB0aGlzIGN5Y2xlcyBhcmUgc3dpdGNoZWQsIGl0J3MgYmVjYXVzZSBvZiB0aGUgYmlhc1xuICAgICAgICB0aGlzLm5ldXJvbnNbbF0uZm9yRWFjaChjdXJyTmV1cm9uID0+IHtcbiAgICAgICAgICBjb25zdCBjb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb24oY3Vyck5ldXJvbiwgbmV4dE5ldXJvbilcbiAgICAgICAgICBjdXJyTmV1cm9uLmFkZE91dHB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICBuZXh0TmV1cm9uLmFkZElucHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbF0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQWRkIGJpYXMgbmV1cm9uIHRvIGVhY2ggbGF5ZXJcbiAgICAgICAgY29uc3QgYmlhc0Nvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbih0aGlzLmJpYXNOZXVyb24sIG5leHROZXVyb24pO1xuICAgICAgICBuZXh0TmV1cm9uLmFkZElucHV0KGJpYXNDb25uZWN0aW9uKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tsXS5wdXNoKGJpYXNDb25uZWN0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBldmFsdWF0ZShpbnB1dDogbnVtYmVyW10pOiBudW1iZXJbXSB7XG4gICAgaWYgKGlucHV0Lmxlbmd0aCAhPSB0aGlzLmlucHV0U2l6ZSkge1xuICAgICAgdGhyb3cgJ0lucHV0IHNpemUgZG9lcyBub3QgbWF0Y2gnO1xuICAgIH1cbiAgICAvLyBSZXNldCwgc28gZWFjaCBuZXVyb24gaXMgcmVjYWxjdWxhdGVkXG4gICAgdGhpcy5uZXVyb25zLmZvckVhY2gobGF5ZXIgPT4geyBsYXllci5mb3JFYWNoKG5ldXJvbiA9PiBuZXVyb24ucmVzZXQoKSkgfSlcbiAgICAvLyBTZXQgaW5wdXQgbGF5ZXJcbiAgICB0aGlzLm5ldXJvbnNbMF0uZm9yRWFjaCgobmV1cm9uLCBpZHgpID0+IHsgbmV1cm9uLnNldElucHV0KGlucHV0W2lkeF0pIH0pO1xuXG4gICAgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5mb3JFYWNoKG5ldXJvbiA9PiB7XG4gICAgICBuZXVyb24uY2FsY3VsYXRlQWN0aXZhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250IC0gMV0ubWFwKG5ldXJvbiA9PiBuZXVyb24uZ2V0QWN0aXZhdGlvbigpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRUcmFpbmluZ1NldChpbnB1dDogbnVtYmVyW10sIG91dHB1dDogbnVtYmVyW10pIHtcbiAgICB0aGlzLnRyYWluU2FtcGxlcy5wdXNoKG5ldyBUcmFpblNhbXBsZShpbnB1dCwgb3V0cHV0KSlcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb3N0KCk6IG51bWJlciB7XG4gICAgY29uc3QgY29zdFN1bSA9IHRoaXMudHJhaW5TYW1wbGVzLnJlZHVjZSgoY29zdFN1bSwgc2FtcGxlLCBpZHgpID0+IHsgLy8gQWRkIHVwIGFsbCBzYW1wbGVzXG4gICAgICB0aGlzLmV2YWx1YXRlKHNhbXBsZS5pbnB1dCk7XG4gICAgICByZXR1cm4gY29zdFN1bSArIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250IC0gMV0ucmVkdWNlKChhY2MsIG5ldXJvbiwgaSkgPT4geyAvLyBBZGQgdXAgYWxsIG91dHB1dCBuZXVyb25zXG4gICAgICAgIHJldHVybiBhY2MgKyAobmV1cm9uLmdldEFjdGl2YXRpb24oKSAtIHNhbXBsZS5vdXRwdXRbaV0pICoqIDI7XG4gICAgICB9LCAwKTtcbiAgICB9LCAwKTtcblxuICAgIHJldHVybiAxIC8gMiAqIGNvc3RTdW0gKiAoMSAvIHRoaXMudHJhaW5TYW1wbGVzLmxlbmd0aCk7XG4gIH1cblxuICBwdWJsaWMgdHJhaW4oKSB7XG4gICAgdGhpcy50cmFpblNhbXBsZXMuZm9yRWFjaCgoc2FtcGxlKSA9PiB7XG4gICAgICB0aGlzLmV2YWx1YXRlKHNhbXBsZS5pbnB1dClcblxuICAgICAgLy8gQ2FsY3VsYXRlIHNpZ21hcyBvZiB0aGUgbGFzdCBsYXllclxuICAgICAgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5mb3JFYWNoKChuZXVyb24sIGlkeCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdTaWdtYSA9XG4gICAgICAgICAgKHNhbXBsZS5vdXRwdXRbaWR4XSAtIG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkpICogQWN0aXZhdGlvbnMuU0lHTU9JRC5kZXIobmV1cm9uLmdldEFjdGl2YXRpb24oKSk7XG5cbiAgICAgICAgbmV1cm9uLnNldFNpZ21hKG5ld1NpZ21hKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBDYWxjdWxhdGUgc2lnbWFzIGZvciBlYWNoIG5ldXJvbiBpbiB0aGUgbG93ZXIgbGF5ZXJzXG4gICAgICBmb3IgKGxldCBsID0gdGhpcy5sYXllckNudCAtIDI7IGwgPj0gMDsgbC0tKSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsXS5mb3JFYWNoKChuZXVyb24pID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdTaWdtYSA9XG4gICAgICAgICAgICBuZXVyb24uZ2V0T3V0cHV0cygpLnJlZHVjZSgoYWNjLCBjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBhY2MgKyBjb25uZWN0aW9uLmdldE91dHB1dE5ldXJvbigpLmdldFNpZ21hKCkgKiBjb25uZWN0aW9uLmdldFdlaWdodCgpO1xuICAgICAgICAgICAgfSwgMCkgKiBBY3RpdmF0aW9ucy5TSUdNT0lELmRlcihuZXVyb24uZ2V0QWN0aXZhdGlvbigpKTtcbiAgICAgICAgICBuZXVyb24uc2V0U2lnbWEobmV3U2lnbWEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gQWNjdW11bGF0ZSBhbGwgd2VpZ2h0IHVwZGF0ZXNcbiAgICAgIHRoaXMuY29ubmVjdGlvbnMuZm9yRWFjaCgoY29ubkxheWVyKSA9PiB7XG4gICAgICAgIGNvbm5MYXllci5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgICAgY29uc3Qgd2VpZ2h0Q2hhbmdlID1cbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0U2lnbWEoKSAqXG4gICAgICAgICAgICBjb25uZWN0aW9uLmdldElucHV0TmV1cm9uKCkuZ2V0QWN0aXZhdGlvbigpICpcbiAgICAgICAgICAgIHRoaXMucmF0ZTtcblxuICAgICAgICAgIGNvbm5lY3Rpb24uYWRkU2FtcGxlV2VpZ2h0Q2hhbmdlKHdlaWdodENoYW5nZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBVZmYsIGxldCdzIGhvcGUgZXZlcnl0aGluZyB3b3JrcyBhbmQgYXBwbHkgdGhlIG1hZ2ljXG4gICAgdGhpcy5jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uTGF5ZXIpID0+IHtcbiAgICAgIGNvbm5MYXllci5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbm5lY3Rpb24uYXBwbHlBdmVyYWdlV2VpZ2h0KCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXROZXVyb25zKCkge1xuICAgIHJldHVybiB0aGlzLm5ldXJvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29ubmVjdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbnM7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE5ldXJvbiB7XG4gIHByaXZhdGUgbmFtZTogc3RyaW5nO1xuXG4gIHByaXZhdGUgYWN0aXZhdGlvbjogbnVtYmVyO1xuICBwcml2YXRlIGlucHV0czogQ29ubmVjdGlvbltdID0gW107XG4gIHByaXZhdGUgb3V0cHV0czogQ29ubmVjdGlvbltdID0gW107XG5cbiAgLy8gVGhlIGRlcml2YXRpb24gb2YgQyB3aXRoIHJlc3BlY3QgdG8gelxuICBwcml2YXRlIHNpZ21hOiBudW1iZXI7XG4gIHByaXZhdGUgaXNJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGlzQ2FsY3VsYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGlzQmlhczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgaXNCaWFzID0gZmFsc2UpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaXNCaWFzID0gaXNCaWFzO1xuICB9O1xuXG4gIHB1YmxpYyB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRBc0lucHV0TmV1cm9uKGFjdGl2YXRpb246IG51bWJlcikge1xuICAgIHRoaXMuaXNJbnB1dCA9IHRydWU7XG4gICAgdGhpcy5hY3RpdmF0aW9uID0gYWN0aXZhdGlvbjtcbiAgICB0aGlzLmlucHV0cyA9IG51bGw7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5wdXQoYWN0aXZhdGlvbjogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLmlzSW5wdXQpIHtcbiAgICAgIHRocm93ICdDYW5ub3Qgc2V0IGFjdGl2YXRpb24gb2Ygbm9uLWlucHV0IG5ldXJvbic7XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmF0aW9uID0gYWN0aXZhdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTaWdtYShzaWdtYTogbnVtYmVyKSB7XG4gICAgdGhpcy5zaWdtYSA9IHNpZ21hO1xuICB9XG5cbiAgcHVibGljIGFkZElucHV0KGlucHV0OiBDb25uZWN0aW9uKSB7XG4gICAgdGhpcy5pbnB1dHMucHVzaChpbnB1dCk7XG4gIH07XG5cbiAgcHVibGljIGFkZE91dHB1dChvdXRwdXQ6IENvbm5lY3Rpb24pIHtcbiAgICB0aGlzLm91dHB1dHMucHVzaChvdXRwdXQpO1xuICB9XG5cbiAgcHVibGljIGdldE91dHB1dHMoKTogQ29ubmVjdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5vdXRwdXRzO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCkge1xuICAgIHRoaXMuaXNDYWxjdWxhdGVkID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0QWN0aXZhdGlvbigpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmlzQmlhcykgcmV0dXJuIDE7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZhdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTaWdtYSgpIHtcbiAgICByZXR1cm4gdGhpcy5zaWdtYTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVBY3RpdmF0aW9uKCk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLmlzSW5wdXQgJiYgIXRoaXMuaXNDYWxjdWxhdGVkICYmICF0aGlzLmlzQmlhcykge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uID0gQWN0aXZhdGlvbnMuU0lHTU9JRC5vdXRwdXQodGhpcy5pbnB1dHMucmVkdWNlKChhY2MsIGN1cnJDb25uKSA9PiBhY2MgKyBjdXJyQ29ubi5jYWxjdWxhdGVWYWx1ZSgpLCAwKSk7XG4gICAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldEFjdGl2YXRpb24oKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29ubmVjdGlvbiB7XG4gIHByaXZhdGUgd2VpZ2h0OiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpO1xuICBwcml2YXRlIGlucHV0TmV1cm9uOiBOZXVyb247XG4gIHByaXZhdGUgb3V0cHV0TmV1cm9uOiBOZXVyb247XG4gIHByaXZhdGUgc2FtcGxlV2VpZ2h0Q2hhbmdlczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihpbnB1dDogTmV1cm9uLCBvdXRwdXQ6IE5ldXJvbikge1xuICAgIHRoaXMuaW5wdXROZXVyb24gPSBpbnB1dDtcbiAgICB0aGlzLm91dHB1dE5ldXJvbiA9IG91dHB1dDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTYW1wbGVXZWlnaHRDaGFuZ2Uod2VpZ2h0Q2hhbmdlOiBudW1iZXIpIHtcbiAgICB0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMucHVzaCh3ZWlnaHRDaGFuZ2UpO1xuICB9XG5cbiAgcHVibGljIGFwcGx5QXZlcmFnZVdlaWdodCgpIHtcbiAgICBjb25zdCBjaGFuZ2UgPSAodGhpcy5zYW1wbGVXZWlnaHRDaGFuZ2VzLnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYyArIHZhbCwgMCkgLyB0aGlzLnNhbXBsZVdlaWdodENoYW5nZXMubGVuZ3RoKTtcbiAgICB0aGlzLndlaWdodCArPSBjaGFuZ2U7XG4gICAgdGhpcy5zYW1wbGVXZWlnaHRDaGFuZ2VzID0gW107XG4gIH1cblxuICBwdWJsaWMgZ2V0V2VpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLndlaWdodDtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy53ZWlnaHQgKiB0aGlzLmlucHV0TmV1cm9uLmNhbGN1bGF0ZUFjdGl2YXRpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPdXRwdXROZXVyb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub3V0cHV0TmV1cm9uO1xuICB9XG5cbiAgcHVibGljIGdldElucHV0TmV1cm9uKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0TmV1cm9uO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBY3RpdmF0aW9ucyB7XG4gIHB1YmxpYyBzdGF0aWMgU0lHTU9JRCA9IHtcbiAgICBvdXRwdXQ6ICh4OiBudW1iZXIpOiBudW1iZXIgPT4gMSAvICgxICsgTWF0aC5leHAoLXgpKSxcbiAgICBkZXI6ICh4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgICAgbGV0IG91dHB1dCA9IEFjdGl2YXRpb25zLlNJR01PSUQub3V0cHV0KHgpO1xuICAgICAgcmV0dXJuIG91dHB1dCAqICgxIC0gb3V0cHV0KTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBjbGFzcyBUcmFpblNhbXBsZSB7XG4gIHB1YmxpYyBpbnB1dDogbnVtYmVyW107XG4gIHB1YmxpYyBvdXRwdXQ6IG51bWJlcltdO1xuXG4gIGNvbnN0cnVjdG9yKGlucHV0OiBudW1iZXJbXSwgb3V0cHV0OiBudW1iZXJbXSkge1xuICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICB0aGlzLm91dHB1dCA9IG91dHB1dDtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFZpc3VhbGl6ZXIge1xuICBcbiAgcHJpdmF0ZSBjb250ZW50OiBIVE1MRWxlbWVudDsgXG5cbiAgY29uc3RydWN0b3IoY29udGVudDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICB9XG5cbiAgcHVibGljIHByaW50TnVtYmVyID0gKG51bTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5jb250ZW50LmlubmVyVGV4dCA9IGAke251bX1gO1xuICB9XG59XG4iLCJpbXBvcnQge1Zpc3VhbGl6ZXJ9IGZyb20gJy4vVmlzdWFsaXplJztcbmltcG9ydCB7TmV1cmFsQ29yZX0gZnJvbSAnLi9OZXVyYWxDb3JlJztcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgbWFpbigpO1xufTtcblxubGV0IG5ldXJhbENvcmU6IE5ldXJhbENvcmU7XG5sZXQgdmlzdWFsaXplcjogVmlzdWFsaXplcjtcblxuY29uc3QgbWFpbiA9ICgpID0+IHtcbiAgY29uc3QgY29udGVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpO1xuICB2aXN1YWxpemVyID0gbmV3IFZpc3VhbGl6ZXIoY29udGVudCk7XG4gIG5ldXJhbENvcmUgPSBuZXcgTmV1cmFsQ29yZSgyLCBbXSwgMSk7XG4gIFxuICBuZXVyYWxDb3JlLmFkZFRyYWluaW5nU2V0KFsxLDFdLCBbMV0pXG4gIG5ldXJhbENvcmUuYWRkVHJhaW5pbmdTZXQoWzEsMF0sIFswXSk7XG4gIG5ldXJhbENvcmUuYWRkVHJhaW5pbmdTZXQoWzAsMV0sIFswXSk7XG4gIG5ldXJhbENvcmUuYWRkVHJhaW5pbmdTZXQoWzAsMF0sIFswXSlcblxuICBmb3IgKGxldCBpID0gMDsgaTwyMDAwOyBpKyspIHtcbiAgICBuZXVyYWxDb3JlLnRyYWluKCk7XG4gICAgY29uc29sZS5sb2cobmV1cmFsQ29yZS5nZXRDb3N0KCkpO1xuICB9XG5cbiAgY29uc29sZS5sb2cobmV1cmFsQ29yZS5ldmFsdWF0ZShbMSwxXSkpO1xuICBjb25zb2xlLmxvZyhuZXVyYWxDb3JlLmV2YWx1YXRlKFsxLDBdKSk7XG4gIGNvbnNvbGUubG9nKG5ldXJhbENvcmUuZXZhbHVhdGUoWzAsMV0pKTtcbiAgY29uc29sZS5sb2cobmV1cmFsQ29yZS5ldmFsdWF0ZShbMCwwXSkpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==