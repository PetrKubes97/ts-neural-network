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
            this.neurons[l].forEach(neuron => {
                this.neurons[l + 1].forEach(nextNeuron => {
                    const connection = new Connection(neuron, nextNeuron);
                    neuron.addOutput(connection);
                    nextNeuron.addInput(connection);
                    this.connections[l].push(connection);
                });
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
                        connection.getInputNeuron().getActivation();
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
    constructor(name) {
        this.inputs = [];
        this.outputs = [];
        this.isInput = false;
        this.isCalculated = false;
        this.name = name;
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
        return this.activation;
    }
    getSigma() {
        return this.sigma;
    }
    calculateActivation() {
        if (!this.isInput && !this.isCalculated) {
            this.activation = Activations.SIGMOID.output(this.inputs.reduce((acc, currConn) => acc + currConn.calculateValue(), 0));
            this.isCalculated = true;
        }
        return this.activation;
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
    neuralCore = new _NeuralCore__WEBPACK_IMPORTED_MODULE_1__["NeuralCore"](2, [6], 1);
    neuralCore.addTrainingSet([1, 1], [1]);
    neuralCore.addTrainingSet([1, 0], [1]);
    neuralCore.addTrainingSet([0, 1], [1]);
    neuralCore.addTrainingSet([0, 0], [0]);
    for (let i = 0; i < 5000; i++) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL05ldXJhbENvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Zpc3VhbGl6ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGTTtJQWNKLFlBQVksU0FBaUIsRUFBRSxnQkFBMEIsRUFBRSxVQUFrQjtRQVByRSxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRVQsWUFBTyxHQUFlLEVBQUUsQ0FBQztRQUN6QixnQkFBVyxHQUFtQixFQUFFLENBQUM7UUFFakMsaUJBQVksR0FBa0IsRUFBRSxDQUFDO1FBR3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6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Q0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImV4cG9ydCBjbGFzcyBOZXVyYWxDb3JlIHtcbiAgcHJpdmF0ZSBpbnB1dFNpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSBoaWRkZW5MYXllclNpemVzOiBudW1iZXJbXTtcbiAgcHJpdmF0ZSBvdXRwdXRTaXplOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBsYXllckNudDogbnVtYmVyO1xuXG4gIHByaXZhdGUgcmF0ZSA9IDE7XG5cbiAgcHJpdmF0ZSBuZXVyb25zOiBOZXVyb25bXVtdID0gW107XG4gIHByaXZhdGUgY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXVtdID0gW107XG5cbiAgcHJpdmF0ZSB0cmFpblNhbXBsZXM6IFRyYWluU2FtcGxlW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihpbnB1dFNpemU6IG51bWJlciwgaGlkZGVuTGF5ZXJTaXplczogbnVtYmVyW10sIG91dHB1dFNpemU6IG51bWJlcikge1xuICAgIHRoaXMuaW5wdXRTaXplID0gaW5wdXRTaXplO1xuICAgIHRoaXMuaGlkZGVuTGF5ZXJTaXplcyA9IGhpZGRlbkxheWVyU2l6ZXM7XG4gICAgdGhpcy5vdXRwdXRTaXplID0gb3V0cHV0U2l6ZTtcbiAgICB0aGlzLmxheWVyQ250ID0gaGlkZGVuTGF5ZXJTaXplcy5sZW5ndGggKyAyO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIC8vIENyZWF0ZSB0aGUgbmV1cm9uc1xuICAgIGZvciAobGV0IGwgPSAwOyBsIDwgdGhpcy5sYXllckNudDsgbCsrKSB7XG4gICAgICAvLyBIb3cgbWFueSBuZXVyb25zIGFyZSBpbiBlYWNoIGxheWVyP1xuICAgICAgbGV0IG5ldXJvbnNJbkxheWVyQ250ID0gMDtcbiAgICAgIHN3aXRjaCAobCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgbmV1cm9uc0luTGF5ZXJDbnQgPSB0aGlzLmlucHV0U2l6ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0aGlzLmhpZGRlbkxheWVyU2l6ZXMubGVuZ3RoICsgMTpcbiAgICAgICAgICBuZXVyb25zSW5MYXllckNudCA9IHRoaXMub3V0cHV0U2l6ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBuZXVyb25zSW5MYXllckNudCA9IHRoaXMuaGlkZGVuTGF5ZXJTaXplc1tsIC0gMV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubmV1cm9uc1tsXSA9IFtdO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlbVxuICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBuZXVyb25zSW5MYXllckNudDsgbisrKSB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsXVtuXSA9IG5ldyBOZXVyb24oYE5ldXJvbiR7bH0ke259YCk7XG4gICAgICAgIGlmIChsID09IDApIHtcbiAgICAgICAgICB0aGlzLm5ldXJvbnNbbF1bbl0uc2V0QXNJbnB1dE5ldXJvbigwKTsgLy8ganVzdCB0byBhdm9pZCBjcmFzaGVzLCB0aGUgMCBzaG91bGQgYmUgb3ZlcnJpZGVuIGxhdGVyIFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHRoZSBDb25uZWN0aW9uc1xuICAgIGZvciAobGV0IGwgPSAwOyBsIDwgdGhpcy5sYXllckNudCAtIDE7IGwrKykge1xuICAgICAgLy8gRm9yIGVhY2ggbmV1cm9uIGluIHRoZSBsYXllciBhZGQgYWxsIGNvbm5lY3Rpb25zIHRvIG5ldXJvbnMgaW4gdGhlIG5leHQgbGF5ZXJcbiAgICAgIHRoaXMuY29ubmVjdGlvbnNbbF0gPSBbXTtcbiAgICAgIHRoaXMubmV1cm9uc1tsXS5mb3JFYWNoKG5ldXJvbiA9PiB7XG4gICAgICAgIHRoaXMubmV1cm9uc1tsICsgMV0uZm9yRWFjaChuZXh0TmV1cm9uID0+IHtcbiAgICAgICAgICBjb25zdCBjb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb24obmV1cm9uLCBuZXh0TmV1cm9uKVxuICAgICAgICAgIG5ldXJvbi5hZGRPdXRwdXQoY29ubmVjdGlvbik7XG4gICAgICAgICAgbmV4dE5ldXJvbi5hZGRJbnB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW2xdLnB1c2goY29ubmVjdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGV2YWx1YXRlKGlucHV0OiBudW1iZXJbXSk6IG51bWJlcltdIHtcbiAgICBpZiAoaW5wdXQubGVuZ3RoICE9IHRoaXMuaW5wdXRTaXplKSB7XG4gICAgICB0aHJvdyAnSW5wdXQgc2l6ZSBkb2VzIG5vdCBtYXRjaCc7XG4gICAgfVxuICAgIC8vIFJlc2V0LCBzbyBlYWNoIG5ldXJvbiBpcyByZWNhbGN1bGF0ZWRcbiAgICB0aGlzLm5ldXJvbnMuZm9yRWFjaChsYXllciA9PiB7IGxheWVyLmZvckVhY2gobmV1cm9uID0+IG5ldXJvbi5yZXNldCgpKSB9KVxuICAgIC8vIFNldCBpbnB1dCBsYXllclxuICAgIHRoaXMubmV1cm9uc1swXS5mb3JFYWNoKChuZXVyb24sIGlkeCkgPT4geyBuZXVyb24uc2V0SW5wdXQoaW5wdXRbaWR4XSkgfSk7XG5cbiAgICB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLmZvckVhY2gobmV1cm9uID0+IHtcbiAgICAgIG5ldXJvbi5jYWxjdWxhdGVBY3RpdmF0aW9uKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5tYXAobmV1cm9uID0+IG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkpO1xuICB9XG5cbiAgcHVibGljIGFkZFRyYWluaW5nU2V0KGlucHV0OiBudW1iZXJbXSwgb3V0cHV0OiBudW1iZXJbXSkge1xuICAgIHRoaXMudHJhaW5TYW1wbGVzLnB1c2gobmV3IFRyYWluU2FtcGxlKGlucHV0LCBvdXRwdXQpKVxuICB9XG5cbiAgcHVibGljIGdldENvc3QoKTogbnVtYmVyIHtcbiAgICBjb25zdCBjb3N0U3VtID0gdGhpcy50cmFpblNhbXBsZXMucmVkdWNlKChjb3N0U3VtLCBzYW1wbGUsIGlkeCkgPT4geyAvLyBBZGQgdXAgYWxsIHNhbXBsZXNcbiAgICAgIHRoaXMuZXZhbHVhdGUoc2FtcGxlLmlucHV0KTtcbiAgICAgIHJldHVybiBjb3N0U3VtICsgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQgLSAxXS5yZWR1Y2UoKGFjYywgbmV1cm9uLCBpKSA9PiB7IC8vIEFkZCB1cCBhbGwgb3V0cHV0IG5ldXJvbnNcbiAgICAgICAgcmV0dXJuIGFjYyArIChuZXVyb24uZ2V0QWN0aXZhdGlvbigpIC0gc2FtcGxlLm91dHB1dFtpXSkgKiogMjtcbiAgICAgIH0sIDApO1xuICAgIH0sIDApO1xuXG4gICAgcmV0dXJuIDEgLyAyICogY29zdFN1bSAqICgxIC8gdGhpcy50cmFpblNhbXBsZXMubGVuZ3RoKTtcbiAgfVxuXG4gIHB1YmxpYyB0cmFpbigpIHtcbiAgICB0aGlzLnRyYWluU2FtcGxlcy5mb3JFYWNoKChzYW1wbGUpID0+IHtcbiAgICAgIHRoaXMuZXZhbHVhdGUoc2FtcGxlLmlucHV0KVxuXG4gICAgICAvLyBDYWxjdWxhdGUgc2lnbWFzIG9mIHRoZSBsYXN0IGxheWVyXG4gICAgICB0aGlzLm5ldXJvbnNbdGhpcy5sYXllckNudCAtIDFdLmZvckVhY2goKG5ldXJvbiwgaWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1NpZ21hID1cbiAgICAgICAgICAoc2FtcGxlLm91dHB1dFtpZHhdIC0gbmV1cm9uLmdldEFjdGl2YXRpb24oKSkgKiBBY3RpdmF0aW9ucy5TSUdNT0lELmRlcihuZXVyb24uZ2V0QWN0aXZhdGlvbigpKTtcblxuICAgICAgICBuZXVyb24uc2V0U2lnbWEobmV3U2lnbWEpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBzaWdtYXMgZm9yIGVhY2ggbmV1cm9uIGluIHRoZSBsb3dlciBsYXllcnNcbiAgICAgIGZvciAobGV0IGwgPSB0aGlzLmxheWVyQ250IC0gMjsgbCA+PSAwOyBsLS0pIHtcbiAgICAgICAgdGhpcy5uZXVyb25zW2xdLmZvckVhY2goKG5ldXJvbikgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld1NpZ21hID1cbiAgICAgICAgICAgIG5ldXJvbi5nZXRPdXRwdXRzKCkucmVkdWNlKChhY2MsIGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFjYyArIGNvbm5lY3Rpb24uZ2V0T3V0cHV0TmV1cm9uKCkuZ2V0U2lnbWEoKSAqIGNvbm5lY3Rpb24uZ2V0V2VpZ2h0KCk7XG4gICAgICAgICAgICB9LCAwKSAqIEFjdGl2YXRpb25zLlNJR01PSUQuZGVyKG5ldXJvbi5nZXRBY3RpdmF0aW9uKCkpO1xuICAgICAgICAgIG5ldXJvbi5zZXRTaWdtYShuZXdTaWdtYSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBBY2N1bXVsYXRlIGFsbCB3ZWlnaHQgdXBkYXRlc1xuICAgICAgdGhpcy5jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uTGF5ZXIpID0+IHtcbiAgICAgICAgY29ubkxheWVyLmZvckVhY2goKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICBjb25zdCB3ZWlnaHRDaGFuZ2UgPVxuICAgICAgICAgICAgY29ubmVjdGlvbi5nZXRPdXRwdXROZXVyb24oKS5nZXRTaWdtYSgpICpcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZ2V0SW5wdXROZXVyb24oKS5nZXRBY3RpdmF0aW9uKCk7XG5cbiAgICAgICAgICBjb25uZWN0aW9uLmFkZFNhbXBsZVdlaWdodENoYW5nZSh3ZWlnaHRDaGFuZ2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gVWZmLCBsZXQncyBob3BlIGV2ZXJ5dGhpbmcgd29ya3MgYW5kIGFwcGx5IHRoZSBtYWdpY1xuICAgIHRoaXMuY29ubmVjdGlvbnMuZm9yRWFjaCgoY29ubkxheWVyKSA9PiB7XG4gICAgICBjb25uTGF5ZXIuZm9yRWFjaCgoY29ubmVjdGlvbikgPT4ge1xuICAgICAgICBjb25uZWN0aW9uLmFwcGx5QXZlcmFnZVdlaWdodCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TmV1cm9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5uZXVyb25zO1xuICB9XG5cbiAgcHVibGljIGdldENvbm5lY3Rpb25zKCkge1xuICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb25zO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBOZXVyb24ge1xuICBwcml2YXRlIG5hbWU6IHN0cmluZztcblxuICBwcml2YXRlIGFjdGl2YXRpb246IG51bWJlcjtcbiAgcHJpdmF0ZSBpbnB1dHM6IENvbm5lY3Rpb25bXSA9IFtdO1xuICBwcml2YXRlIG91dHB1dHM6IENvbm5lY3Rpb25bXSA9IFtdO1xuXG4gIC8vIFRoZSBkZXJpdmF0aW9uIG9mIEMgd2l0aCByZXNwZWN0IHRvIHpcbiAgcHJpdmF0ZSBzaWdtYTogbnVtYmVyO1xuICBwcml2YXRlIGlzSW5wdXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBpc0NhbGN1bGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9O1xuXG4gIHB1YmxpYyB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRBc0lucHV0TmV1cm9uKGFjdGl2YXRpb246IG51bWJlcikge1xuICAgIHRoaXMuaXNJbnB1dCA9IHRydWU7XG4gICAgdGhpcy5hY3RpdmF0aW9uID0gYWN0aXZhdGlvbjtcbiAgICB0aGlzLmlucHV0cyA9IG51bGw7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5wdXQoYWN0aXZhdGlvbjogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLmlzSW5wdXQpIHtcbiAgICAgIHRocm93ICdDYW5ub3Qgc2V0IGFjdGl2YXRpb24gb2Ygbm9uLWlucHV0IG5ldXJvbic7XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmF0aW9uID0gYWN0aXZhdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTaWdtYShzaWdtYTogbnVtYmVyKSB7XG4gICAgdGhpcy5zaWdtYSA9IHNpZ21hO1xuICB9XG5cbiAgcHVibGljIGFkZElucHV0KGlucHV0OiBDb25uZWN0aW9uKSB7XG4gICAgdGhpcy5pbnB1dHMucHVzaChpbnB1dCk7XG4gIH07XG5cbiAgcHVibGljIGFkZE91dHB1dChvdXRwdXQ6IENvbm5lY3Rpb24pIHtcbiAgICB0aGlzLm91dHB1dHMucHVzaChvdXRwdXQpO1xuICB9XG5cbiAgcHVibGljIGdldE91dHB1dHMoKTogQ29ubmVjdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5vdXRwdXRzO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCkge1xuICAgIHRoaXMuaXNDYWxjdWxhdGVkID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0QWN0aXZhdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmFjdGl2YXRpb247XG4gIH1cblxuICBwdWJsaWMgZ2V0U2lnbWEoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2lnbWE7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlQWN0aXZhdGlvbigpOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5pc0lucHV0ICYmICF0aGlzLmlzQ2FsY3VsYXRlZCkge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uID0gQWN0aXZhdGlvbnMuU0lHTU9JRC5vdXRwdXQodGhpcy5pbnB1dHMucmVkdWNlKChhY2MsIGN1cnJDb25uKSA9PiBhY2MgKyBjdXJyQ29ubi5jYWxjdWxhdGVWYWx1ZSgpLCAwKSk7XG4gICAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFjdGl2YXRpb247XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb24ge1xuICBwcml2YXRlIHdlaWdodDogbnVtYmVyID0gTWF0aC5yYW5kb20oKTtcbiAgcHJpdmF0ZSBpbnB1dE5ldXJvbjogTmV1cm9uO1xuICBwcml2YXRlIG91dHB1dE5ldXJvbjogTmV1cm9uO1xuICBwcml2YXRlIHNhbXBsZVdlaWdodENoYW5nZXM6IG51bWJlcltdID0gW107XG5cbiAgY29uc3RydWN0b3IoaW5wdXQ6IE5ldXJvbiwgb3V0cHV0OiBOZXVyb24pIHtcbiAgICB0aGlzLmlucHV0TmV1cm9uID0gaW5wdXQ7XG4gICAgdGhpcy5vdXRwdXROZXVyb24gPSBvdXRwdXQ7XG4gIH1cblxuICBwdWJsaWMgYWRkU2FtcGxlV2VpZ2h0Q2hhbmdlKHdlaWdodENoYW5nZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zYW1wbGVXZWlnaHRDaGFuZ2VzLnB1c2god2VpZ2h0Q2hhbmdlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBseUF2ZXJhZ2VXZWlnaHQoKSB7XG4gICAgY29uc3QgY2hhbmdlID0gKHRoaXMuc2FtcGxlV2VpZ2h0Q2hhbmdlcy5yZWR1Y2UoKGFjYywgdmFsKSA9PiBhY2MgKyB2YWwsIDApIC8gdGhpcy5zYW1wbGVXZWlnaHRDaGFuZ2VzLmxlbmd0aCk7XG4gICAgdGhpcy53ZWlnaHQgKz0gY2hhbmdlO1xuICAgIHRoaXMuc2FtcGxlV2VpZ2h0Q2hhbmdlcyA9IFtdO1xuICB9XG5cbiAgcHVibGljIGdldFdlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy53ZWlnaHQ7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMud2VpZ2h0ICogdGhpcy5pbnB1dE5ldXJvbi5jYWxjdWxhdGVBY3RpdmF0aW9uKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0T3V0cHV0TmV1cm9uKCkge1xuICAgIHJldHVybiB0aGlzLm91dHB1dE5ldXJvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJbnB1dE5ldXJvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dE5ldXJvbjtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aXZhdGlvbnMge1xuICBwdWJsaWMgc3RhdGljIFNJR01PSUQgPSB7XG4gICAgb3V0cHV0OiAoeDogbnVtYmVyKTogbnVtYmVyID0+IDEgLyAoMSArIE1hdGguZXhwKC14KSksXG4gICAgZGVyOiAoeDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICAgIGxldCBvdXRwdXQgPSBBY3RpdmF0aW9ucy5TSUdNT0lELm91dHB1dCh4KTtcbiAgICAgIHJldHVybiBvdXRwdXQgKiAoMSAtIG91dHB1dCk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgVHJhaW5TYW1wbGUge1xuICBwdWJsaWMgaW5wdXQ6IG51bWJlcltdO1xuICBwdWJsaWMgb3V0cHV0OiBudW1iZXJbXTtcblxuICBjb25zdHJ1Y3RvcihpbnB1dDogbnVtYmVyW10sIG91dHB1dDogbnVtYmVyW10pIHtcbiAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgdGhpcy5vdXRwdXQgPSBvdXRwdXQ7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBWaXN1YWxpemVyIHtcbiAgXG4gIHByaXZhdGUgY29udGVudDogSFRNTEVsZW1lbnQ7IFxuXG4gIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgfVxuXG4gIHB1YmxpYyBwcmludE51bWJlciA9IChudW06IG51bWJlcikgPT4ge1xuICAgIHRoaXMuY29udGVudC5pbm5lclRleHQgPSBgJHtudW19YDtcbiAgfVxufVxuIiwiaW1wb3J0IHtWaXN1YWxpemVyfSBmcm9tICcuL1Zpc3VhbGl6ZSc7XG5pbXBvcnQge05ldXJhbENvcmV9IGZyb20gJy4vTmV1cmFsQ29yZSc7XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIG1haW4oKTtcbn07XG5cbmxldCBuZXVyYWxDb3JlOiBOZXVyYWxDb3JlO1xubGV0IHZpc3VhbGl6ZXI6IFZpc3VhbGl6ZXI7XG5cbmNvbnN0IG1haW4gPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRlbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKTtcbiAgdmlzdWFsaXplciA9IG5ldyBWaXN1YWxpemVyKGNvbnRlbnQpO1xuICBuZXVyYWxDb3JlID0gbmV3IE5ldXJhbENvcmUoMiwgWzZdLCAxKTtcbiAgXG4gIG5ldXJhbENvcmUuYWRkVHJhaW5pbmdTZXQoWzEsMV0sIFsxXSlcbiAgbmV1cmFsQ29yZS5hZGRUcmFpbmluZ1NldChbMSwwXSwgWzFdKTtcbiAgbmV1cmFsQ29yZS5hZGRUcmFpbmluZ1NldChbMCwxXSwgWzFdKTtcbiAgbmV1cmFsQ29yZS5hZGRUcmFpbmluZ1NldChbMCwwXSwgWzBdKVxuXG4gIGZvciAobGV0IGkgPSAwOyBpPDUwMDA7IGkrKykge1xuICAgIG5ldXJhbENvcmUudHJhaW4oKTtcbiAgICBjb25zb2xlLmxvZyhuZXVyYWxDb3JlLmdldENvc3QoKSk7XG4gIH1cblxuICBjb25zb2xlLmxvZyhuZXVyYWxDb3JlLmV2YWx1YXRlKFsxLDFdKSk7XG4gIGNvbnNvbGUubG9nKG5ldXJhbENvcmUuZXZhbHVhdGUoWzEsMF0pKTtcbiAgY29uc29sZS5sb2cobmV1cmFsQ29yZS5ldmFsdWF0ZShbMCwxXSkpO1xuICBjb25zb2xlLmxvZyhuZXVyYWxDb3JlLmV2YWx1YXRlKFswLDBdKSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9