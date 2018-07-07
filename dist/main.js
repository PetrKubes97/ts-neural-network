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
/*! exports provided: NeuralCore, Neuron, Connection, Activations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NeuralCore", function() { return NeuralCore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Neuron", function() { return Neuron; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Connection", function() { return Connection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Activations", function() { return Activations; });
class NeuralCore {
    constructor(inputSize, hiddenLayerSizes, outputSize) {
        this.rate = 1;
        this.neurons = [];
        this.connections = [];
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
        this.neurons[this.layerCnt - 1].forEach(neuron => {
            neuron.calculateActivation();
        });
        console.log(this.connections);
        console.log(this.neurons);
        return this.neurons[this.layerCnt - 1].map(neuron => neuron.getActivation());
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
    addInput(input) {
        this.inputs.push(input);
    }
    ;
    addOutput(output) {
        this.outputs.push(output);
    }
    reset() {
        this.isCalculated = false;
    }
    getActivation() {
        return this.activation;
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
        this.inputNeuron = input;
        this.outputNeuron = output;
    }
    updateWeight(newWeight) {
        this.weight = newWeight;
    }
    calculateValue() {
        return this.weight * this.inputNeuron.calculateActivation();
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
    neuralCore = new _NeuralCore__WEBPACK_IMPORTED_MODULE_1__["NeuralCore"](2, [5], 1);
    console.log(neuralCore.evaluate([1, 1]));
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL05ldXJhbENvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Zpc3VhbGl6ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0VNO0lBWUosWUFBWSxTQUFpQixFQUFFLGdCQUEwQixFQUFFLFVBQWtCO1FBTHJFLFNBQUksR0FBRyxDQUFDLENBQUM7UUFFVCxZQUFPLEdBQWUsRUFBRSxDQUFDO1FBQ3pCLGdCQUFXLEdBQW1CLEVBQUUsQ0FBQztRQUd2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENB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QVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLE9BQU8sTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDRixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNsS0U7SUFJSixZQUFZLE9BQW9CO1FBSXpCLGdCQUFXLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUFMQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0NBS0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYc0M7QUFDQztBQUV4QyxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtJQUNuQixJQUFJLEVBQUUsQ0FBQztBQUNULENBQUMsQ0FBQztBQUVGLElBQUksVUFBc0IsQ0FBQztBQUMzQixJQUFJLFVBQXNCLENBQUM7QUFFM0IsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO0lBQ2hCLE1BQU0sT0FBTyxHQUFnQixRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hFLFVBQVUsR0FBRyxJQUFJLHFEQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsVUFBVSxHQUFHLElBQUksc0RBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTNDLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgTnVtZXJpY0RpY3Rpb25hcnkgfSBmcm9tIFwibG9kYXNoXCI7XG5cbnR5cGUgTWF0cml4ID0gbnVtYmVyW11bXTtcbnR5cGUgVmVjdG9yID0gbnVtYmVyW107XG5cbmV4cG9ydCBjbGFzcyBOZXVyYWxDb3JlIHtcbiAgcHJpdmF0ZSBpbnB1dFNpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSBoaWRkZW5MYXllclNpemVzOiBudW1iZXJbXTtcbiAgcHJpdmF0ZSBvdXRwdXRTaXplOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBsYXllckNudDogbnVtYmVyO1xuXG4gIHByaXZhdGUgcmF0ZSA9IDE7XG5cbiAgcHJpdmF0ZSBuZXVyb25zOiBOZXVyb25bXVtdID0gW107XG4gIHByaXZhdGUgY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoaW5wdXRTaXplOiBudW1iZXIsIGhpZGRlbkxheWVyU2l6ZXM6IG51bWJlcltdLCBvdXRwdXRTaXplOiBudW1iZXIpIHtcbiAgICB0aGlzLmlucHV0U2l6ZSA9IGlucHV0U2l6ZTtcbiAgICB0aGlzLmhpZGRlbkxheWVyU2l6ZXMgPSBoaWRkZW5MYXllclNpemVzO1xuICAgIHRoaXMub3V0cHV0U2l6ZSA9IG91dHB1dFNpemU7XG4gICAgdGhpcy5sYXllckNudCA9IGhpZGRlbkxheWVyU2l6ZXMubGVuZ3RoICsgMjtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICAvLyBDcmVhdGUgdGhlIG5ldXJvbnNcbiAgICBmb3IgKGxldCBsID0gMDsgbCA8IHRoaXMubGF5ZXJDbnQ7IGwrKykge1xuICAgICAgLy8gSG93IG1hbnkgbmV1cm9ucyBhcmUgaW4gZWFjaCBsYXllcj9cbiAgICAgIGxldCBuZXVyb25zSW5MYXllckNudCA9IDA7XG4gICAgICBzd2l0Y2ggKGwpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIG5ldXJvbnNJbkxheWVyQ250ID0gdGhpcy5pbnB1dFNpemU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdGhpcy5oaWRkZW5MYXllclNpemVzLmxlbmd0aCArIDE6XG4gICAgICAgICAgbmV1cm9uc0luTGF5ZXJDbnQgPSB0aGlzLm91dHB1dFNpemU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbmV1cm9uc0luTGF5ZXJDbnQgPSB0aGlzLmhpZGRlbkxheWVyU2l6ZXNbbCAtIDFdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm5ldXJvbnNbbF0gPSBbXTtcblxuICAgICAgLy8gQ3JlYXRlIHRoZW1cbiAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgbmV1cm9uc0luTGF5ZXJDbnQ7IG4rKykge1xuICAgICAgICB0aGlzLm5ldXJvbnNbbF1bbl0gPSBuZXcgTmV1cm9uKGBOZXVyb24ke2x9JHtufWApO1xuICAgICAgICBpZiAobCA9PSAwKSB7XG4gICAgICAgICAgdGhpcy5uZXVyb25zW2xdW25dLnNldEFzSW5wdXROZXVyb24oMCk7IC8vIGp1c3QgdG8gYXZvaWQgY3Jhc2hlcywgdGhlIDAgc2hvdWxkIGJlIG92ZXJyaWRlbiBsYXRlciBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENyZWF0ZSB0aGUgQ29ubmVjdGlvbnNcbiAgICBmb3IgKGxldCBsID0gMDsgbCA8IHRoaXMubGF5ZXJDbnQgLSAxOyBsKyspIHtcbiAgICAgIC8vIEZvciBlYWNoIG5ldXJvbiBpbiB0aGUgbGF5ZXIgYWRkIGFsbCBjb25uZWN0aW9ucyB0byBuZXVyb25zIGluIHRoZSBuZXh0IGxheWVyXG4gICAgICB0aGlzLmNvbm5lY3Rpb25zW2xdID0gW107XG4gICAgICB0aGlzLm5ldXJvbnNbbF0uZm9yRWFjaChuZXVyb24gPT4ge1xuICAgICAgICB0aGlzLm5ldXJvbnNbbCsxXS5mb3JFYWNoKG5leHROZXVyb24gPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbihuZXVyb24sIG5leHROZXVyb24pXG4gICAgICAgICAgbmV1cm9uLmFkZE91dHB1dChjb25uZWN0aW9uKTtcbiAgICAgICAgICBuZXh0TmV1cm9uLmFkZElucHV0KGNvbm5lY3Rpb24pO1xuICAgICAgICAgIHRoaXMuY29ubmVjdGlvbnNbbF0ucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGUoaW5wdXQ6IG51bWJlcltdKTogbnVtYmVyW10ge1xuICAgIGlmIChpbnB1dC5sZW5ndGggIT0gdGhpcy5pbnB1dFNpemUpIHtcbiAgICAgIHRocm93ICdJbnB1dCBzaXplIGRvZXMgbm90IG1hdGNoJztcbiAgICB9XG4gICAgLy8gUmVzZXQsIHNvIGVhY2ggbmV1cm9uIGlzIHJlY2FsY3VsYXRlZFxuICAgIHRoaXMubmV1cm9ucy5mb3JFYWNoKGxheWVyID0+IHtsYXllci5mb3JFYWNoKG5ldXJvbiA9PiBuZXVyb24ucmVzZXQoKSl9KVxuXG4gICAgdGhpcy5uZXVyb25zW3RoaXMubGF5ZXJDbnQtMV0uZm9yRWFjaChuZXVyb24gPT4ge1xuICAgICAgbmV1cm9uLmNhbGN1bGF0ZUFjdGl2YXRpb24oKTtcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNvbm5lY3Rpb25zKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLm5ldXJvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXMubmV1cm9uc1t0aGlzLmxheWVyQ250LTFdLm1hcChuZXVyb24gPT4gbmV1cm9uLmdldEFjdGl2YXRpb24oKSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE5ldXJvbiB7XG4gIHByaXZhdGUgbmFtZTogc3RyaW5nO1xuXG4gIHByaXZhdGUgYWN0aXZhdGlvbjogbnVtYmVyO1xuICBwcml2YXRlIGlucHV0czogQ29ubmVjdGlvbltdID0gW107XG4gIHByaXZhdGUgb3V0cHV0czogQ29ubmVjdGlvbltdID0gW107XG5cbiAgLy8gVGhlIGRlcml2YXRpb24gb2YgQyB3aXRoIHJlc3BlY3QgdG8gelxuICBwcml2YXRlIHNpZ21hOiBudW1iZXI7XG4gIHByaXZhdGUgaXNJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGlzQ2FsY3VsYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH07XG5cbiAgcHVibGljIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBuYW1lO1xuICB9XG5cbiAgcHVibGljIHNldEFzSW5wdXROZXVyb24oYWN0aXZhdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy5pc0lucHV0ID0gdHJ1ZTtcbiAgICB0aGlzLmFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICAgIHRoaXMuaW5wdXRzID0gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJbnB1dChpbnB1dDogQ29ubmVjdGlvbikge1xuICAgIHRoaXMuaW5wdXRzLnB1c2goaW5wdXQpO1xuICB9O1xuXG4gIHB1YmxpYyBhZGRPdXRwdXQob3V0cHV0OiBDb25uZWN0aW9uKSB7XG4gICAgdGhpcy5vdXRwdXRzLnB1c2gob3V0cHV0KTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLmlzQ2FsY3VsYXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGdldEFjdGl2YXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmF0aW9uO1xuICB9XG5cbiAgcHVibGljIGNhbGN1bGF0ZUFjdGl2YXRpb24oKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMuaXNJbnB1dCAmJiAhdGhpcy5pc0NhbGN1bGF0ZWQpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbiA9IEFjdGl2YXRpb25zLlNJR01PSUQub3V0cHV0KHRoaXMuaW5wdXRzLnJlZHVjZSgoYWNjLCBjdXJyQ29ubikgPT4gYWNjICsgY3VyckNvbm4uY2FsY3VsYXRlVmFsdWUoKSwgMCkpO1xuICAgICAgdGhpcy5pc0NhbGN1bGF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hY3RpdmF0aW9uO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uIHtcbiAgcHJpdmF0ZSB3ZWlnaHQ6IG51bWJlciA9IE1hdGgucmFuZG9tKCk7XG4gIHByaXZhdGUgaW5wdXROZXVyb246IE5ldXJvbjtcbiAgcHJpdmF0ZSBvdXRwdXROZXVyb246IE5ldXJvbjtcblxuICBjb25zdHJ1Y3RvcihpbnB1dDogTmV1cm9uLCBvdXRwdXQ6IE5ldXJvbikge1xuICAgIHRoaXMuaW5wdXROZXVyb24gPSBpbnB1dDtcbiAgICB0aGlzLm91dHB1dE5ldXJvbiA9IG91dHB1dDtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVXZWlnaHQobmV3V2VpZ2h0OiBudW1iZXIpIHtcbiAgICB0aGlzLndlaWdodCA9IG5ld1dlaWdodDtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy53ZWlnaHQgKiB0aGlzLmlucHV0TmV1cm9uLmNhbGN1bGF0ZUFjdGl2YXRpb24oKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aXZhdGlvbnMge1xuICBwdWJsaWMgc3RhdGljIFNJR01PSUQgPSB7XG4gICAgb3V0cHV0OiAoeDogbnVtYmVyKTogbnVtYmVyID0+IDEgLyAoMSArIE1hdGguZXhwKC14KSksXG4gICAgZGVyOiAoeDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICAgIGxldCBvdXRwdXQgPSBBY3RpdmF0aW9ucy5TSUdNT0lELm91dHB1dCh4KTtcbiAgICAgIHJldHVybiBvdXRwdXQgKiAoMSAtIG91dHB1dCk7XG4gICAgfVxuICB9O1xufVxuIiwiZXhwb3J0IGNsYXNzIFZpc3VhbGl6ZXIge1xuICBcbiAgcHJpdmF0ZSBjb250ZW50OiBIVE1MRWxlbWVudDsgXG5cbiAgY29uc3RydWN0b3IoY29udGVudDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICB9XG5cbiAgcHVibGljIHByaW50TnVtYmVyID0gKG51bTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5jb250ZW50LmlubmVyVGV4dCA9IGAke251bX1gO1xuICB9XG59XG4iLCJpbXBvcnQge1Zpc3VhbGl6ZXJ9IGZyb20gJy4vVmlzdWFsaXplJztcbmltcG9ydCB7TmV1cmFsQ29yZX0gZnJvbSAnLi9OZXVyYWxDb3JlJztcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgbWFpbigpO1xufTtcblxubGV0IG5ldXJhbENvcmU6IE5ldXJhbENvcmU7XG5sZXQgdmlzdWFsaXplcjogVmlzdWFsaXplcjtcblxuY29uc3QgbWFpbiA9ICgpID0+IHtcbiAgY29uc3QgY29udGVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpO1xuICB2aXN1YWxpemVyID0gbmV3IFZpc3VhbGl6ZXIoY29udGVudCk7XG4gIG5ldXJhbENvcmUgPSBuZXcgTmV1cmFsQ29yZSgyLCBbNV0sIDEpO1xuICBjb25zb2xlLmxvZyhuZXVyYWxDb3JlLmV2YWx1YXRlKFsxLCAxXSkpO1xuICBcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=