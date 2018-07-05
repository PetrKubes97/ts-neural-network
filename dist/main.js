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

/***/ "./node_modules/linear-algebra/dist/linear-algebra.js":
/*!************************************************************!*\
  !*** ./node_modules/linear-algebra/dist/linear-algebra.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  "use strict";

  // AMD
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  // CommonJS
  else {}
})(this, function () {
  "use strict";


  var _throwError = function(msg) {
    throw new Error('linear-algebra: ' + msg);
  };


  var _throwSizeMismatchError = function(op, arg1, arg2) {
    _throwError('[' + op + '] op1 is ' + arg1.rows  + ' x ' + arg1.cols + 
      ' and op2 is ' + arg2.rows + ' x ' + arg2.cols);
  };


  /**
   * Initialise the linear algebra library.
   *
   * @param {Object} options Additional options.
   * @param {Function} [options.add] Function to add floating point numbers.
   * 
   * @return {Object} Linear algebra primitives.
   */
  return function(options) {
    options = options || {};

    
  var LinAlg = {};


  /**
   * Our common number array class.
   *
   * @param {Array} values 1D array (vector) or 2D array (matrix) with length >= 1.
   * 
   * @constructor
   */
  var Matrix = LinAlg.Matrix = function(values) {
    if (Array.isArray(values[0])) {
      // matrix
      this.data = values;
      this.rows = values.length;
      this.cols = values[0].length;
    } else {
      // row-vector
      this.data = [values];
      this.rows = 1;
      this.cols = values.length;
    }
  };




  /**
   * Clone this matrix.
   * @return {Matrix}
   */
  Matrix.prototype.clone = function() {
    return new Matrix(this.toArray());
  };




  /**
   * Get plain array version of this matrix.
   * 
   * @return {Array}
   */
  Matrix.prototype.toArray = function() {
    var thisData = this.data,
      rows = this.rows,
      cols = this.cols;

    var a = new Array(rows);

    for (var i = 0; i<rows; ++i) {
      a[i] = thisData[i].slice(0, cols);
    }

    return a;
  };




  /**
   * Create an identity matrix of given dimensions.
   * @param  {Integer} dim Length of one side.
   * @return {Matrix}
   */
  Matrix.identity = function(dim) {
    return Matrix.scalar(dim, 1);
  };




  /**
   * Create a scalar diagonal matrix.
   * @param {Integer} dim Matrix size (length of each side)
   * @param  {Number} entry The value to place in each diagonal.
   * @return {Matrix}
   */
  Matrix.scalar = function(dim, entry) {
    var a = new Array(dim),
      i, j;

    for (i=0; i<dim; ++i) {
      a[i] = new Array(dim);

      for (j=0; j<dim; ++j) {
        a[i][j] = 0;
      }

      a[i][i] = entry;
    }

    return new Matrix(a);
  };




  /**
   * Create a matrix of zeros.
   * @param {Integer} rows Number of rows.
   * @param {Integer} bols Number of bols.
   * @return {Matrix}
   */
  Matrix.zero = function(rows, cols) {
    var a = new Array(rows);

    for (var i=0; i<rows; ++i) {
      a[i] = new Array(cols);
      
      for (var j=0; j<cols; ++j) {
        a[i][j] = 0;
      }
    }
    return new Matrix(a);
  };



  /**
   * Reshape array into matrix.
   * 
   * @param {Array} values 1D array (vector)
   * @param {Number} rows Number of rows.
   * @param {Number} cols Number of cols.
   * 
   * @return {Matrix}
   */
  Matrix.reshapeFrom = function(values, rows, cols) {
    if (values.length !== rows * cols) {
      _throwError('cannot reshape array of length ' + values.length + ' into ' + rows  + 'x' +  cols + ' matrix');
    }

    var a = [];

    for (var i=0; i<values.length; i += cols) {
      a.push(values.slice(i, cols + i));
    }

    return new Matrix(a);
  };




  /**
   * Helpers to create vectors, i.e. matrices with a single row.
   */
  var Vector = LinAlg.Vector = {
    /**
     * Create a row-vector of zeros.
     * @param  {Integer} size Length of vector.
     * @return {Vector}
     */
    zero: function(size) {
      var a = new Array(size);

      for (var i=0; i<size; ++i) {
        a[i] = 0;
      }

      return new Matrix(a);    
    }
  };



/**
 * @fileOverview  Initialization options
 */


// function to add floating point values
if (options.add) {
  console.warn('linear-algebra: adder (options.add) will not be used in non-precision version');
}

/**
 * @fileOverview  Basic arithmetic operations
 */




/**
 * Transpose this matrix.
 * @return {Matrix}
 */
Matrix.prototype.trans = function() {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols;

  var row, col;

  var result = new Array(cols);

  for (col=0; col<cols; ++col) {
    result[col] = new Array(rows);
    
    for (row=0; row<rows; ++row) {
      result[col][row] = thisData[row][col];
    }
  }

  return new Matrix(result);
};






/**
 * In-place version of trans().
 * @return this
 */
Matrix.prototype.trans_ = function() {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols;

  var row, col, t;

  // first we transpose the matrix upto length of shortest side
  var isSquare = (cols === rows);
  var shortestSide = (cols > rows) ? rows : cols;

  for (row=0; row<shortestSide; ++row) {
    for (col=row + 1; col<shortestSide; ++col) {
      t = thisData[col][row];
      thisData[col][row] = thisData[row][col];
      thisData[row][col] = t;
    }
  }

  // now we transpose the rest of the matrix
  if (!isSquare) {
    if (cols > rows) {
      // do a column at a time
      for (col=rows; cols > col; ++col) {
        if (!Array.isArray(thisData[col])) {
          thisData[col] = new Array(rows);
        }

        for (row=0; row<rows; ++row) {
          thisData[col][row] = thisData[row][col];
        }
      }
    }
    else {
      // do a row at a time
      for (row=cols; rows > row; ++row) {
        for (col=0; cols > col; ++col) {
          thisData[col][row] = thisData[row][col];
        }
      }
    }
    
    // finally, we update the "official" dimensions
    t = rows;
    this.rows = cols;
    this.cols = t;
  }


  return this;
};



Matrix.prototype.div = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('div', this, op2);
  }
  
  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);
    
    for (col=0; col<cols; ++col) {
      result[row][col] = thisData[row][col] / op2Data[row][col];
    }
  }

  return new Matrix(result);
};




Matrix.prototype.div_ = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('div_', this, op2);
  }
  
  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = thisData[row][col] / op2Data[row][col];
    }
  }

  return this;
};




Matrix.prototype.mul = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('mul', this, op2);
  }
  
  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);
    
    for (col=0; col<cols; ++col) {
      result[row][col] = thisData[row][col] * op2Data[row][col];
    }
  }

  return new Matrix(result);
};




Matrix.prototype.mul_ = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('mul_', this, op2);
  }
  
  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = thisData[row][col] * op2Data[row][col];
    }
  }

  return this;
};




Matrix.prototype.plus = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('plus', this, op2);
  }
  
  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);
    
    for (col=0; col<cols; ++col) {
      result[row][col] = thisData[row][col] + op2Data[row][col];
    }
  }

  return new Matrix(result);
};




Matrix.prototype.plus_ = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('plus_', this, op2);
  }
  
  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = thisData[row][col] + op2Data[row][col];
    }
  }

  return this;
};




Matrix.prototype.minus = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('minus', this, op2);
  }
  
  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);
    
    for (col=0; col<cols; ++col) {
      result[row][col] = thisData[row][col] - op2Data[row][col];
    }
  }

  return new Matrix(result);
};




Matrix.prototype.minus_ = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('minus_', this, op2);
  }
  
  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = thisData[row][col] - op2Data[row][col];
    }
  }

  return this;
};











/**
 * Dot product.
 * 
 * @param  {Matrix} arg A Matrix.
 * 
 * @return {Matrix}
 */
Matrix.prototype.dot = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (cols !== rows2) {
    _throwSizeMismatchError('dot', this, op2);
  }

  // op1 = m x n
  // op2 = m2 x n2
  // op1 * op2 => m x n2

  var row, row2, col2;

  var result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols2);

    for (col2=0; col2<cols2; ++col2) {
      result[row][col2] = 0;

      for (row2=0; row2<rows2; ++row2) {
        result[row][col2] += thisData[row][row2] * op2Data[row2][col2];
      }
    }
  }  

  return new Matrix(result);
};




/**
 * In-place version of dot().
 * 
 * @return this
 */
Matrix.prototype.dot_ = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (cols !== rows2) {
    _throwSizeMismatchError('dot_', this, op2);
  }

  // op1 = m x n
  // op2 = m2 x n2
  // op1 * op2 => m x n2

  var row, row2, col2, tmp;

  for (row=0; row<rows; ++row) {
    // we need to keep a copy of this row since we'll be overwriting it in this.data
    tmp = thisData[row].slice(0, cols);

    for (col2=0; col2<cols2; ++col2) {
      thisData[row][col2] = 0;

      for (row2=0; row2<rows2; ++row2) {
        thisData[row][col2] += tmp[row2] * op2Data[row2][col2];
      }
    }
  }  

  // update dimensions
  this.cols = cols2;

  return this;
};




Matrix.prototype.getSum = function() {
 var thisData = this.data,
   rows = this.rows,
   cols = this.cols;

 var sum = 0;

 for (var i = 0; i<rows; ++i) {
   for (var j = 0; j<cols; ++j) {
     sum += thisData[i][j];
   }
 }
 
 return sum;  
};


/**
 * Apply function to all elements in this matrix.
 *
 * @param {Function} transformFn With signature (double) => double
 */
Matrix.prototype.map = function(transformFn) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);

    for (col=0; col<cols; ++col) {
      result[row][col] = transformFn(thisData[row][col]);
    }
  }  

  return new Matrix(result);
};





Matrix.prototype.map_ = function(transformFn) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = transformFn(thisData[row][col]);
    }
  }  

  return this;
};






/**
 * Calculate the natural log (ln) all the elements.
 */
Matrix.prototype.log = function(undefined) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);

    for (col=0; col<cols; ++col) {
      result[row][col] = Math.log(thisData[row][col]);
    }
  }  

  return new Matrix(result);
};





Matrix.prototype.log_ = function(undefined) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = Math.log(thisData[row][col]);
    }
  }  

  return this;
};






/**
 * Calculate the sigmoid function of all the elements.
 *
 * See http://en.wikipedia.org/wiki/Sigmoid_function
 */
Matrix.prototype.sigmoid = function(undefined) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);

    for (col=0; col<cols; ++col) {
      result[row][col] = (1 / (1 + Math.exp(-thisData[row][col])));
    }
  }  

  return new Matrix(result);
};





Matrix.prototype.sigmoid_ = function(undefined) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = (1 / (1 + Math.exp(-thisData[row][col])));
    }
  }  

  return this;
};





/**
 * Multiply every element with given value.
 * @param  {Number} value Value to multiple with.
 */
Matrix.prototype.mulEach = function(value) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);

    for (col=0; col<cols; ++col) {
      result[row][col] = thisData[row][col] * value;
    }
  }  

  return new Matrix(result);
};





Matrix.prototype.mulEach_ = function(value) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = thisData[row][col] * value;
    }
  }  

  return this;
};






/**
 * Add a value to every element.
 * @param  {Number} value Value to multiple with.
 */
Matrix.prototype.plusEach = function(value) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);

    for (col=0; col<cols; ++col) {
      result[row][col] = thisData[row][col] + value;
    }
  }  

  return new Matrix(result);
};





Matrix.prototype.plusEach_ = function(value) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = thisData[row][col] + value;
    }
  }  

  return this;
};





/**
 * Apply function with row and column parameters to all elements in matrix
 *
 * Used to apply different transformations depending on placement in matrix.
 */
Matrix.prototype.eleMap = function(transformFn) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);

    for (col=0; col<cols; ++col) {
      result[row][col] = transformFn(thisData[row][col], row, col);
    }
  }  

  return new Matrix(result);
};





Matrix.prototype.eleMap_ = function(transformFn) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = transformFn(thisData[row][col], row, col);
    }
  }  

  return this;
};







    return LinAlg;
  };
});



/***/ }),

/***/ "./node_modules/linear-algebra/dist/linear-algebra.precision.js":
/*!**********************************************************************!*\
  !*** ./node_modules/linear-algebra/dist/linear-algebra.precision.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  "use strict";

  // AMD
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  // CommonJS
  else {}
})(this, function () {
  "use strict";


  var _throwError = function(msg) {
    throw new Error('linear-algebra: ' + msg);
  };


  var _throwSizeMismatchError = function(op, arg1, arg2) {
    _throwError('[' + op + '] op1 is ' + arg1.rows  + ' x ' + arg1.cols + 
      ' and op2 is ' + arg2.rows + ' x ' + arg2.cols);
  };


  /**
   * Initialise the linear algebra library.
   *
   * @param {Object} options Additional options.
   * @param {Function} [options.add] Function to add floating point numbers.
   * 
   * @return {Object} Linear algebra primitives.
   */
  return function(options) {
    options = options || {};

    
  var LinAlg = {};


  /**
   * Our common number array class.
   *
   * @param {Array} values 1D array (vector) or 2D array (matrix) with length >= 1.
   * 
   * @constructor
   */
  var Matrix = LinAlg.Matrix = function(values) {
    if (Array.isArray(values[0])) {
      // matrix
      this.data = values;
      this.rows = values.length;
      this.cols = values[0].length;
    } else {
      // row-vector
      this.data = [values];
      this.rows = 1;
      this.cols = values.length;
    }
  };




  /**
   * Clone this matrix.
   * @return {Matrix}
   */
  Matrix.prototype.clone = function() {
    return new Matrix(this.toArray());
  };




  /**
   * Get plain array version of this matrix.
   * 
   * @return {Array}
   */
  Matrix.prototype.toArray = function() {
    var thisData = this.data,
      rows = this.rows,
      cols = this.cols;

    var a = new Array(rows);

    for (var i = 0; i<rows; ++i) {
      a[i] = thisData[i].slice(0, cols);
    }

    return a;
  };




  /**
   * Create an identity matrix of given dimensions.
   * @param  {Integer} dim Length of one side.
   * @return {Matrix}
   */
  Matrix.identity = function(dim) {
    return Matrix.scalar(dim, 1);
  };




  /**
   * Create a scalar diagonal matrix.
   * @param {Integer} dim Matrix size (length of each side)
   * @param  {Number} entry The value to place in each diagonal.
   * @return {Matrix}
   */
  Matrix.scalar = function(dim, entry) {
    var a = new Array(dim),
      i, j;

    for (i=0; i<dim; ++i) {
      a[i] = new Array(dim);

      for (j=0; j<dim; ++j) {
        a[i][j] = 0;
      }

      a[i][i] = entry;
    }

    return new Matrix(a);
  };




  /**
   * Create a matrix of zeros.
   * @param {Integer} rows Number of rows.
   * @param {Integer} bols Number of bols.
   * @return {Matrix}
   */
  Matrix.zero = function(rows, cols) {
    var a = new Array(rows);

    for (var i=0; i<rows; ++i) {
      a[i] = new Array(cols);
      
      for (var j=0; j<cols; ++j) {
        a[i][j] = 0;
      }
    }
    return new Matrix(a);
  };



  /**
   * Reshape array into matrix.
   * 
   * @param {Array} values 1D array (vector)
   * @param {Number} rows Number of rows.
   * @param {Number} cols Number of cols.
   * 
   * @return {Matrix}
   */
  Matrix.reshapeFrom = function(values, rows, cols) {
    if (values.length !== rows * cols) {
      _throwError('cannot reshape array of length ' + values.length + ' into ' + rows  + 'x' +  cols + ' matrix');
    }

    var a = [];

    for (var i=0; i<values.length; i += cols) {
      a.push(values.slice(i, cols + i));
    }

    return new Matrix(a);
  };




  /**
   * Helpers to create vectors, i.e. matrices with a single row.
   */
  var Vector = LinAlg.Vector = {
    /**
     * Create a row-vector of zeros.
     * @param  {Integer} size Length of vector.
     * @return {Vector}
     */
    zero: function(size) {
      var a = new Array(size);

      for (var i=0; i<size; ++i) {
        a[i] = 0;
      }

      return new Matrix(a);    
    }
  };



/**
 * @fileOverview  Initialization options for high-precision version
 */


// function to add floating point values
var adder = options.add;

if (!adder) {
  _throwError('options.add must be set for precision calculation');
}

/**
 * @fileOverview  Basic arithmetic operations
 */




/**
 * Transpose this matrix.
 * @return {Matrix}
 */
Matrix.prototype.trans = function() {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols;

  var row, col;

  var result = new Array(cols);

  for (col=0; col<cols; ++col) {
    result[col] = new Array(rows);
    
    for (row=0; row<rows; ++row) {
      result[col][row] = thisData[row][col];
    }
  }

  return new Matrix(result);
};






/**
 * In-place version of trans().
 * @return this
 */
Matrix.prototype.trans_ = function() {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols;

  var row, col, t;

  // first we transpose the matrix upto length of shortest side
  var isSquare = (cols === rows);
  var shortestSide = (cols > rows) ? rows : cols;

  for (row=0; row<shortestSide; ++row) {
    for (col=row + 1; col<shortestSide; ++col) {
      t = thisData[col][row];
      thisData[col][row] = thisData[row][col];
      thisData[row][col] = t;
    }
  }

  // now we transpose the rest of the matrix
  if (!isSquare) {
    if (cols > rows) {
      // do a column at a time
      for (col=rows; cols > col; ++col) {
        if (!Array.isArray(thisData[col])) {
          thisData[col] = new Array(rows);
        }

        for (row=0; row<rows; ++row) {
          thisData[col][row] = thisData[row][col];
        }
      }
    }
    else {
      // do a row at a time
      for (row=cols; rows > row; ++row) {
        for (col=0; cols > col; ++col) {
          thisData[col][row] = thisData[row][col];
        }
      }
    }
    
    // finally, we update the "official" dimensions
    t = rows;
    this.rows = cols;
    this.cols = t;
  }


  return this;
};



Matrix.prototype.div = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('div', this, op2);
  }
  
  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);
    
    for (col=0; col<cols; ++col) {
      result[row][col] = thisData[row][col] / op2Data[row][col];
    }
  }

  return new Matrix(result);
};




Matrix.prototype.div_ = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('div_', this, op2);
  }
  
  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = thisData[row][col] / op2Data[row][col];
    }
  }

  return this;
};




Matrix.prototype.mul = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('mul', this, op2);
  }
  
  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);
    
    for (col=0; col<cols; ++col) {
      result[row][col] = thisData[row][col] * op2Data[row][col];
    }
  }

  return new Matrix(result);
};




Matrix.prototype.mul_ = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('mul_', this, op2);
  }
  
  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = thisData[row][col] * op2Data[row][col];
    }
  }

  return this;
};




Matrix.prototype.plus = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('plus', this, op2);
  }
  
  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);
    
    for (col=0; col<cols; ++col) {
      result[row][col] = thisData[row][col] + op2Data[row][col];
    }
  }

  return new Matrix(result);
};




Matrix.prototype.plus_ = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('plus_', this, op2);
  }
  
  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = thisData[row][col] + op2Data[row][col];
    }
  }

  return this;
};




Matrix.prototype.minus = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('minus', this, op2);
  }
  
  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);
    
    for (col=0; col<cols; ++col) {
      result[row][col] = thisData[row][col] - op2Data[row][col];
    }
  }

  return new Matrix(result);
};




Matrix.prototype.minus_ = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('minus_', this, op2);
  }
  
  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = thisData[row][col] - op2Data[row][col];
    }
  }

  return this;
};









/**
 * @fileOverview  High precision version.
 */



/**
 * Dot product.
 * 
 * @param  {Matrix} arg A Matrix.
 * 
 * @return {Matrix}
 */
Matrix.prototype.dot = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (cols !== rows2) {
    _throwSizeMismatchError('dot', this, op2);
  }

  // op1 = m x n
  // op2 = m2 x n2
  // op1 * op2 => m x n2

  var row, row2, col2, tmp;

  var result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols2);

    for (col2=0; col2<cols2; ++col2) {
      tmp = new Array(rows2);

      for (row2=0; row2<rows2; ++row2) {
        tmp[row2] = thisData[row][row2] * op2Data[row2][col2];
      }

      result[row][col2] = adder(tmp);
    }
  }  

  return new Matrix(result);
};




/**
 * In-place version of dot()
 * 
 * @return this
 */
Matrix.prototype.dot_ = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (cols !== rows2) {
    _throwSizeMismatchError('dot_', this, op2);
  }

  // op1 = m x n
  // op2 = m2 x n2
  // op1 * op2 => m x n2

  var row, row2, col2, tmp, tmp2;

  for (row=0; row<rows; ++row) {
    // we need to keep a copy of this row since we'll be overwriting it in this.data
    tmp = thisData[row].slice(0, cols);

    for (col2=0; col2<cols2; ++col2) {
      tmp2 = new Array(rows2);

      for (row2=0; row2<op2.rows; ++row2) {
        tmp2[row2] = tmp[row2] * op2Data[row2][col2];
      }

      thisData[row][col2] = adder(tmp2);
    }
  }  

  // update dimensions
  this.cols = cols2;

  return this;
};





/**
 * @fileOverview  High precision version.
 */




/**
 * Sum every element.
 * @return {Number}
 */
Matrix.prototype.getSum = function(value) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var sum = new Array(rows * cols);

  for (var i = 0, jBase = 0; i<rows; ++i, jBase += cols) {
    for (var j = 0; j<cols; ++j) {
      sum[jBase + j] = thisData[i][j];
    }
  }
  
  return adder(sum); 
};

/**
 * Apply function to all elements in this matrix.
 *
 * @param {Function} transformFn With signature (double) => double
 */
Matrix.prototype.map = function(transformFn) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);

    for (col=0; col<cols; ++col) {
      result[row][col] = transformFn(thisData[row][col]);
    }
  }  

  return new Matrix(result);
};





Matrix.prototype.map_ = function(transformFn) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = transformFn(thisData[row][col]);
    }
  }  

  return this;
};






/**
 * Calculate the natural log (ln) all the elements.
 */
Matrix.prototype.log = function(undefined) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);

    for (col=0; col<cols; ++col) {
      result[row][col] = Math.log(thisData[row][col]);
    }
  }  

  return new Matrix(result);
};





Matrix.prototype.log_ = function(undefined) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = Math.log(thisData[row][col]);
    }
  }  

  return this;
};






/**
 * Calculate the sigmoid function of all the elements.
 *
 * See http://en.wikipedia.org/wiki/Sigmoid_function
 */
Matrix.prototype.sigmoid = function(undefined) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);

    for (col=0; col<cols; ++col) {
      result[row][col] = (1 / (1 + Math.exp(-thisData[row][col])));
    }
  }  

  return new Matrix(result);
};





Matrix.prototype.sigmoid_ = function(undefined) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = (1 / (1 + Math.exp(-thisData[row][col])));
    }
  }  

  return this;
};





/**
 * Multiply every element with given value.
 * @param  {Number} value Value to multiple with.
 */
Matrix.prototype.mulEach = function(value) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);

    for (col=0; col<cols; ++col) {
      result[row][col] = thisData[row][col] * value;
    }
  }  

  return new Matrix(result);
};





Matrix.prototype.mulEach_ = function(value) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = thisData[row][col] * value;
    }
  }  

  return this;
};






/**
 * Add a value to every element.
 * @param  {Number} value Value to multiple with.
 */
Matrix.prototype.plusEach = function(value) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);

    for (col=0; col<cols; ++col) {
      result[row][col] = thisData[row][col] + value;
    }
  }  

  return new Matrix(result);
};





Matrix.prototype.plusEach_ = function(value) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = thisData[row][col] + value;
    }
  }  

  return this;
};





/**
 * Apply function with row and column parameters to all elements in matrix
 *
 * Used to apply different transformations depending on placement in matrix.
 */
Matrix.prototype.eleMap = function(transformFn) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col, result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols);

    for (col=0; col<cols; ++col) {
      result[row][col] = transformFn(thisData[row][col], row, col);
    }
  }  

  return new Matrix(result);
};





Matrix.prototype.eleMap_ = function(transformFn) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = transformFn(thisData[row][col], row, col);
    }
  }  

  return this;
};







    return LinAlg;
  };
});



/***/ }),

/***/ "./node_modules/linear-algebra/index.js":
/*!**********************************************!*\
  !*** ./node_modules/linear-algebra/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var normal = __webpack_require__(/*! ./dist/linear-algebra */ "./node_modules/linear-algebra/dist/linear-algebra.js"),
  precision = __webpack_require__(/*! ./dist/linear-algebra.precision */ "./node_modules/linear-algebra/dist/linear-algebra.precision.js");


/** 
 * Initialise the library.
 * 
 * @param {Object} options Additional options.
 * @param {Function} [options.add] Function to add floating point numbers.
 * 
 * @return {Object} Linear algebra primitives.
 */
var linearAlgebra = module.exports = function(options) {
  options = options || {};
  
  if (options.add) {
    return linearAlgebra._precision(options);
  } else {
    return linearAlgebra._normal(options);
  }
};


// to make testing easier
linearAlgebra._normal = normal;
linearAlgebra._precision = precision;



/***/ }),

/***/ "./src/NeuralCore.ts":
/*!***************************!*\
  !*** ./src/NeuralCore.ts ***!
  \***************************/
/*! exports provided: NeuralCore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NeuralCore", function() { return NeuralCore; });
/* harmony import */ var linear_algebra__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! linear-algebra */ "./node_modules/linear-algebra/index.js");
/* harmony import */ var linear_algebra__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(linear_algebra__WEBPACK_IMPORTED_MODULE_0__);

const la = linear_algebra__WEBPACK_IMPORTED_MODULE_0__();
class NeuralCore {
    constructor() {
        this.rate = 1;
    }
    initNetwork(inputSize, hiddenLayerSizes, outputSize, randomInit) {
        this.inputSize = inputSize;
        this.hiddenLayerSizes = hiddenLayerSizes;
        this.outputSize = outputSize;
        if (randomInit) {
            this.weights = [];
            if (hiddenLayerSizes.length > 0) {
                for (let i = 0; i < hiddenLayerSizes.length + 1; i++) {
                    switch (i) {
                        case 0:
                            this.weights.push(this.randMatrix(hiddenLayerSizes[0], inputSize));
                            break;
                        case hiddenLayerSizes.length:
                            this.weights.push(this.randMatrix(outputSize, hiddenLayerSizes[i - 1]));
                            break;
                        default:
                            this.weights.push(this.randMatrix(hiddenLayerSizes[i], hiddenLayerSizes[i - 1]));
                            break;
                    }
                }
            }
            else {
                this.weights.push(this.randMatrix(outputSize, inputSize));
            }
        }
    }
    // TODO for each example
    setTrainingSet(input, output) {
        this.trainTarget = new la.Matrix(output);
        this.trainInput = new la.Matrix(input);
    }
    evaluate(input) {
        if (input.length != this.inputSize) {
            throw Error(`Invalid input size, should be ${this.inputSize}.`);
        }
        const neurons = [];
        // Forward propagation
        let currLayer = new la.Matrix(input).trans();
        for (let i = 0; i < this.hiddenLayerSizes.length + 1; i++) {
            neurons.push(currLayer);
            currLayer = this.weights[i].dot(currLayer).sigmoid();
        }
        neurons.push(currLayer);
        return neurons;
    }
    getCost() {
        const outputLayer = this.evaluate(this.trainInput.data[0])[this.weights.length];
        return (1 / 2) * outputLayer.minus(this.trainTarget.trans()).map((x) => { return Math.pow(x, 2); }).getSum();
    }
    train() {
        const L = this.weights.length;
        // Compute each layer
        let x = this.evaluate(this.trainInput.data[0]);
        // Last layer
        const sigmas = [];
        sigmas[L] = x[L].mul(x[L].plusEach(-1)).mul(x[L].minus(this.trainTarget.trans()));
        // All hidden layers
        for (let i = L - 1; i >= 1; i--) {
            sigmas[i] = x[i].mul(x[i].plusEach(-1)).mulEach(-1).mul((x[i + 1].trans().dot(this.weights[i])).trans());
        }
        sigmas.shift();
        //console.log('sigmas: ', sigmas);
        //console.log('weights: ', this.weights.map((m) => m.data));
        //console.log('x: ', x.map((m) => m.data));
        // Update all weights
        for (let j = 0; j < L; j++) {
            this.weights[j] = this.weights[j].plus((sigmas[j].dot(x[j].trans())));
        }
        x = this.evaluate(this.trainInput.data[0]);
        console.log('x: ', x[L].data);
    }
    randMatrix(height, width) {
        const res = [];
        for (let j = 0; j < height; j++) {
            let row = [];
            for (let i = 0; i < width; i++) {
                row.push(Math.random());
            }
            res.push(row);
        }
        const m = new la.Matrix(res);
        return m;
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
    neuralCore = new _NeuralCore__WEBPACK_IMPORTED_MODULE_1__["NeuralCore"]();
    neuralCore.initNetwork(2, [2], 2, true);
    neuralCore.setTrainingSet([1, 1], [0, 1]);
    for (let i = 0; i < 1000; i++) {
        neuralCore.train();
    }
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpbmVhci1hbGdlYnJhL2Rpc3QvbGluZWFyLWFsZ2VicmEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpbmVhci1hbGdlYnJhL2Rpc3QvbGluZWFyLWFsZ2VicmEucHJlY2lzaW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saW5lYXItYWxnZWJyYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTmV1cmFsQ29yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVmlzdWFsaXplLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFD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QUVBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWEsVUFBVTtBQUN2Qjs7QUFFQSxlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWEsVUFBVTtBQUN2QixlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWEsVUFBVTtBQUN2Qjs7QUFFQSxlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWEsVUFBVTtBQUN2QixlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWEsVUFBVTtBQUN2Qjs7QUFFQSxlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWEsVUFBVTtBQUN2QixlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQVlBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsYUFBYSxV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Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWEsVUFBVTtBQUN2Qjs7QUFFQSxlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWEsVUFBVTtBQUN2QixlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWEsVUFBVTtBQUN2Qjs7QUFFQSxlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWEsVUFBVTtBQUN2QixlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWEsVUFBVTtBQUN2Qjs7QUFFQSxlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWEsVUFBVTtBQUN2QixlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUFVQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVB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SUFBSSxxREFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLFVBQVUsR0FBRyxJQUFJLHNEQUFVLEVBQUUsQ0FBQztJQUU5QixVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUV4QyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMzQixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDcEI7QUFFSCxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICAvLyBBTURcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XG4gIH1cbiAgLy8gQ29tbW9uSlNcbiAgZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH1cbiAgLy8gQnJvd3NlclxuICBlbHNlIHtcbiAgICByb290LmxpbmVhckFsZ2VicmEgPSBmYWN0b3J5KCk7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cblxuICB2YXIgX3Rocm93RXJyb3IgPSBmdW5jdGlvbihtc2cpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2xpbmVhci1hbGdlYnJhOiAnICsgbXNnKTtcbiAgfTtcblxuXG4gIHZhciBfdGhyb3dTaXplTWlzbWF0Y2hFcnJvciA9IGZ1bmN0aW9uKG9wLCBhcmcxLCBhcmcyKSB7XG4gICAgX3Rocm93RXJyb3IoJ1snICsgb3AgKyAnXSBvcDEgaXMgJyArIGFyZzEucm93cyAgKyAnIHggJyArIGFyZzEuY29scyArIFxuICAgICAgJyBhbmQgb3AyIGlzICcgKyBhcmcyLnJvd3MgKyAnIHggJyArIGFyZzIuY29scyk7XG4gIH07XG5cblxuICAvKipcbiAgICogSW5pdGlhbGlzZSB0aGUgbGluZWFyIGFsZ2VicmEgbGlicmFyeS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQWRkaXRpb25hbCBvcHRpb25zLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5hZGRdIEZ1bmN0aW9uIHRvIGFkZCBmbG9hdGluZyBwb2ludCBudW1iZXJzLlxuICAgKiBcbiAgICogQHJldHVybiB7T2JqZWN0fSBMaW5lYXIgYWxnZWJyYSBwcmltaXRpdmVzLlxuICAgKi9cbiAgcmV0dXJuIGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIFxuICB2YXIgTGluQWxnID0ge307XG5cblxuICAvKipcbiAgICogT3VyIGNvbW1vbiBudW1iZXIgYXJyYXkgY2xhc3MuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyAxRCBhcnJheSAodmVjdG9yKSBvciAyRCBhcnJheSAobWF0cml4KSB3aXRoIGxlbmd0aCA+PSAxLlxuICAgKiBcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICB2YXIgTWF0cml4ID0gTGluQWxnLk1hdHJpeCA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlc1swXSkpIHtcbiAgICAgIC8vIG1hdHJpeFxuICAgICAgdGhpcy5kYXRhID0gdmFsdWVzO1xuICAgICAgdGhpcy5yb3dzID0gdmFsdWVzLmxlbmd0aDtcbiAgICAgIHRoaXMuY29scyA9IHZhbHVlc1swXS5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJvdy12ZWN0b3JcbiAgICAgIHRoaXMuZGF0YSA9IFt2YWx1ZXNdO1xuICAgICAgdGhpcy5yb3dzID0gMTtcbiAgICAgIHRoaXMuY29scyA9IHZhbHVlcy5sZW5ndGg7XG4gICAgfVxuICB9O1xuXG5cblxuXG4gIC8qKlxuICAgKiBDbG9uZSB0aGlzIG1hdHJpeC5cbiAgICogQHJldHVybiB7TWF0cml4fVxuICAgKi9cbiAgTWF0cml4LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgTWF0cml4KHRoaXMudG9BcnJheSgpKTtcbiAgfTtcblxuXG5cblxuICAvKipcbiAgICogR2V0IHBsYWluIGFycmF5IHZlcnNpb24gb2YgdGhpcyBtYXRyaXguXG4gICAqIFxuICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICovXG4gIE1hdHJpeC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0aGlzRGF0YSA9IHRoaXMuZGF0YSxcbiAgICAgIHJvd3MgPSB0aGlzLnJvd3MsXG4gICAgICBjb2xzID0gdGhpcy5jb2xzO1xuXG4gICAgdmFyIGEgPSBuZXcgQXJyYXkocm93cyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaTxyb3dzOyArK2kpIHtcbiAgICAgIGFbaV0gPSB0aGlzRGF0YVtpXS5zbGljZSgwLCBjb2xzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYTtcbiAgfTtcblxuXG5cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIGlkZW50aXR5IG1hdHJpeCBvZiBnaXZlbiBkaW1lbnNpb25zLlxuICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSBkaW0gTGVuZ3RoIG9mIG9uZSBzaWRlLlxuICAgKiBAcmV0dXJuIHtNYXRyaXh9XG4gICAqL1xuICBNYXRyaXguaWRlbnRpdHkgPSBmdW5jdGlvbihkaW0pIHtcbiAgICByZXR1cm4gTWF0cml4LnNjYWxhcihkaW0sIDEpO1xuICB9O1xuXG5cblxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBzY2FsYXIgZGlhZ29uYWwgbWF0cml4LlxuICAgKiBAcGFyYW0ge0ludGVnZXJ9IGRpbSBNYXRyaXggc2l6ZSAobGVuZ3RoIG9mIGVhY2ggc2lkZSlcbiAgICogQHBhcmFtICB7TnVtYmVyfSBlbnRyeSBUaGUgdmFsdWUgdG8gcGxhY2UgaW4gZWFjaCBkaWFnb25hbC5cbiAgICogQHJldHVybiB7TWF0cml4fVxuICAgKi9cbiAgTWF0cml4LnNjYWxhciA9IGZ1bmN0aW9uKGRpbSwgZW50cnkpIHtcbiAgICB2YXIgYSA9IG5ldyBBcnJheShkaW0pLFxuICAgICAgaSwgajtcblxuICAgIGZvciAoaT0wOyBpPGRpbTsgKytpKSB7XG4gICAgICBhW2ldID0gbmV3IEFycmF5KGRpbSk7XG5cbiAgICAgIGZvciAoaj0wOyBqPGRpbTsgKytqKSB7XG4gICAgICAgIGFbaV1bal0gPSAwO1xuICAgICAgfVxuXG4gICAgICBhW2ldW2ldID0gZW50cnk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBNYXRyaXgoYSk7XG4gIH07XG5cblxuXG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG1hdHJpeCBvZiB6ZXJvcy5cbiAgICogQHBhcmFtIHtJbnRlZ2VyfSByb3dzIE51bWJlciBvZiByb3dzLlxuICAgKiBAcGFyYW0ge0ludGVnZXJ9IGJvbHMgTnVtYmVyIG9mIGJvbHMuXG4gICAqIEByZXR1cm4ge01hdHJpeH1cbiAgICovXG4gIE1hdHJpeC56ZXJvID0gZnVuY3Rpb24ocm93cywgY29scykge1xuICAgIHZhciBhID0gbmV3IEFycmF5KHJvd3MpO1xuXG4gICAgZm9yICh2YXIgaT0wOyBpPHJvd3M7ICsraSkge1xuICAgICAgYVtpXSA9IG5ldyBBcnJheShjb2xzKTtcbiAgICAgIFxuICAgICAgZm9yICh2YXIgaj0wOyBqPGNvbHM7ICsraikge1xuICAgICAgICBhW2ldW2pdID0gMDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBNYXRyaXgoYSk7XG4gIH07XG5cblxuXG4gIC8qKlxuICAgKiBSZXNoYXBlIGFycmF5IGludG8gbWF0cml4LlxuICAgKiBcbiAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIDFEIGFycmF5ICh2ZWN0b3IpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSByb3dzIE51bWJlciBvZiByb3dzLlxuICAgKiBAcGFyYW0ge051bWJlcn0gY29scyBOdW1iZXIgb2YgY29scy5cbiAgICogXG4gICAqIEByZXR1cm4ge01hdHJpeH1cbiAgICovXG4gIE1hdHJpeC5yZXNoYXBlRnJvbSA9IGZ1bmN0aW9uKHZhbHVlcywgcm93cywgY29scykge1xuICAgIGlmICh2YWx1ZXMubGVuZ3RoICE9PSByb3dzICogY29scykge1xuICAgICAgX3Rocm93RXJyb3IoJ2Nhbm5vdCByZXNoYXBlIGFycmF5IG9mIGxlbmd0aCAnICsgdmFsdWVzLmxlbmd0aCArICcgaW50byAnICsgcm93cyAgKyAneCcgKyAgY29scyArICcgbWF0cml4Jyk7XG4gICAgfVxuXG4gICAgdmFyIGEgPSBbXTtcblxuICAgIGZvciAodmFyIGk9MDsgaTx2YWx1ZXMubGVuZ3RoOyBpICs9IGNvbHMpIHtcbiAgICAgIGEucHVzaCh2YWx1ZXMuc2xpY2UoaSwgY29scyArIGkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE1hdHJpeChhKTtcbiAgfTtcblxuXG5cblxuICAvKipcbiAgICogSGVscGVycyB0byBjcmVhdGUgdmVjdG9ycywgaS5lLiBtYXRyaWNlcyB3aXRoIGEgc2luZ2xlIHJvdy5cbiAgICovXG4gIHZhciBWZWN0b3IgPSBMaW5BbGcuVmVjdG9yID0ge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHJvdy12ZWN0b3Igb2YgemVyb3MuXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gc2l6ZSBMZW5ndGggb2YgdmVjdG9yLlxuICAgICAqIEByZXR1cm4ge1ZlY3Rvcn1cbiAgICAgKi9cbiAgICB6ZXJvOiBmdW5jdGlvbihzaXplKSB7XG4gICAgICB2YXIgYSA9IG5ldyBBcnJheShzaXplKTtcblxuICAgICAgZm9yICh2YXIgaT0wOyBpPHNpemU7ICsraSkge1xuICAgICAgICBhW2ldID0gMDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBNYXRyaXgoYSk7ICAgIFxuICAgIH1cbiAgfTtcblxuXG5cbi8qKlxuICogQGZpbGVPdmVydmlldyAgSW5pdGlhbGl6YXRpb24gb3B0aW9uc1xuICovXG5cblxuLy8gZnVuY3Rpb24gdG8gYWRkIGZsb2F0aW5nIHBvaW50IHZhbHVlc1xuaWYgKG9wdGlvbnMuYWRkKSB7XG4gIGNvbnNvbGUud2FybignbGluZWFyLWFsZ2VicmE6IGFkZGVyIChvcHRpb25zLmFkZCkgd2lsbCBub3QgYmUgdXNlZCBpbiBub24tcHJlY2lzaW9uIHZlcnNpb24nKTtcbn1cblxuLyoqXG4gKiBAZmlsZU92ZXJ2aWV3ICBCYXNpYyBhcml0aG1ldGljIG9wZXJhdGlvbnNcbiAqL1xuXG5cblxuXG4vKipcbiAqIFRyYW5zcG9zZSB0aGlzIG1hdHJpeC5cbiAqIEByZXR1cm4ge01hdHJpeH1cbiAqL1xuTWF0cml4LnByb3RvdHlwZS50cmFucyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhpc0RhdGEgPSB0aGlzLmRhdGEsXG4gICAgcm93cyA9IHRoaXMucm93cywgXG4gICAgY29scyA9IHRoaXMuY29scztcblxuICB2YXIgcm93LCBjb2w7XG5cbiAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShjb2xzKTtcblxuICBmb3IgKGNvbD0wOyBjb2w8Y29sczsgKytjb2wpIHtcbiAgICByZXN1bHRbY29sXSA9IG5ldyBBcnJheShyb3dzKTtcbiAgICBcbiAgICBmb3IgKHJvdz0wOyByb3c8cm93czsgKytyb3cpIHtcbiAgICAgIHJlc3VsdFtjb2xdW3Jvd10gPSB0aGlzRGF0YVtyb3ddW2NvbF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBNYXRyaXgocmVzdWx0KTtcbn07XG5cblxuXG5cblxuXG4vKipcbiAqIEluLXBsYWNlIHZlcnNpb24gb2YgdHJhbnMoKS5cbiAqIEByZXR1cm4gdGhpc1xuICovXG5NYXRyaXgucHJvdG90eXBlLnRyYW5zXyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhpc0RhdGEgPSB0aGlzLmRhdGEsXG4gICAgcm93cyA9IHRoaXMucm93cywgXG4gICAgY29scyA9IHRoaXMuY29scztcblxuICB2YXIgcm93LCBjb2wsIHQ7XG5cbiAgLy8gZmlyc3Qgd2UgdHJhbnNwb3NlIHRoZSBtYXRyaXggdXB0byBsZW5ndGggb2Ygc2hvcnRlc3Qgc2lkZVxuICB2YXIgaXNTcXVhcmUgPSAoY29scyA9PT0gcm93cyk7XG4gIHZhciBzaG9ydGVzdFNpZGUgPSAoY29scyA+IHJvd3MpID8gcm93cyA6IGNvbHM7XG5cbiAgZm9yIChyb3c9MDsgcm93PHNob3J0ZXN0U2lkZTsgKytyb3cpIHtcbiAgICBmb3IgKGNvbD1yb3cgKyAxOyBjb2w8c2hvcnRlc3RTaWRlOyArK2NvbCkge1xuICAgICAgdCA9IHRoaXNEYXRhW2NvbF1bcm93XTtcbiAgICAgIHRoaXNEYXRhW2NvbF1bcm93XSA9IHRoaXNEYXRhW3Jvd11bY29sXTtcbiAgICAgIHRoaXNEYXRhW3Jvd11bY29sXSA9IHQ7XG4gICAgfVxuICB9XG5cbiAgLy8gbm93IHdlIHRyYW5zcG9zZSB0aGUgcmVzdCBvZiB0aGUgbWF0cml4XG4gIGlmICghaXNTcXVhcmUpIHtcbiAgICBpZiAoY29scyA+IHJvd3MpIHtcbiAgICAgIC8vIGRvIGEgY29sdW1uIGF0IGEgdGltZVxuICAgICAgZm9yIChjb2w9cm93czsgY29scyA+IGNvbDsgKytjb2wpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXNEYXRhW2NvbF0pKSB7XG4gICAgICAgICAgdGhpc0RhdGFbY29sXSA9IG5ldyBBcnJheShyb3dzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAocm93PTA7IHJvdzxyb3dzOyArK3Jvdykge1xuICAgICAgICAgIHRoaXNEYXRhW2NvbF1bcm93XSA9IHRoaXNEYXRhW3Jvd11bY29sXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIGRvIGEgcm93IGF0IGEgdGltZVxuICAgICAgZm9yIChyb3c9Y29sczsgcm93cyA+IHJvdzsgKytyb3cpIHtcbiAgICAgICAgZm9yIChjb2w9MDsgY29scyA+IGNvbDsgKytjb2wpIHtcbiAgICAgICAgICB0aGlzRGF0YVtjb2xdW3Jvd10gPSB0aGlzRGF0YVtyb3ddW2NvbF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gZmluYWxseSwgd2UgdXBkYXRlIHRoZSBcIm9mZmljaWFsXCIgZGltZW5zaW9uc1xuICAgIHQgPSByb3dzO1xuICAgIHRoaXMucm93cyA9IGNvbHM7XG4gICAgdGhpcy5jb2xzID0gdDtcbiAgfVxuXG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cblxuTWF0cml4LnByb3RvdHlwZS5kaXYgPSBmdW5jdGlvbihvcDIpIHtcbiAgdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgIHJvd3MgPSB0aGlzLnJvd3MsIFxuICAgIGNvbHMgPSB0aGlzLmNvbHMsXG4gICAgb3AyRGF0YSA9IG9wMi5kYXRhLFxuICAgIHJvd3MyID0gb3AyLnJvd3MsXG4gICAgY29sczIgPSBvcDIuY29scztcblxuICBpZiAocm93cyAhPT0gcm93czIgfHwgY29scyAhPT0gY29sczIpIHtcbiAgICBfdGhyb3dTaXplTWlzbWF0Y2hFcnJvcignZGl2JywgdGhpcywgb3AyKTtcbiAgfVxuICBcbiAgdmFyIHJvdywgY29sLCByZXN1bHQgPSBuZXcgQXJyYXkocm93cyk7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgcmVzdWx0W3Jvd10gPSBuZXcgQXJyYXkoY29scyk7XG4gICAgXG4gICAgZm9yIChjb2w9MDsgY29sPGNvbHM7ICsrY29sKSB7XG4gICAgICByZXN1bHRbcm93XVtjb2xdID0gdGhpc0RhdGFbcm93XVtjb2xdIC8gb3AyRGF0YVtyb3ddW2NvbF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBNYXRyaXgocmVzdWx0KTtcbn07XG5cblxuXG5cbk1hdHJpeC5wcm90b3R5cGUuZGl2XyA9IGZ1bmN0aW9uKG9wMikge1xuICB2YXIgdGhpc0RhdGEgPSB0aGlzLmRhdGEsXG4gICAgcm93cyA9IHRoaXMucm93cywgXG4gICAgY29scyA9IHRoaXMuY29scyxcbiAgICBvcDJEYXRhID0gb3AyLmRhdGEsXG4gICAgcm93czIgPSBvcDIucm93cyxcbiAgICBjb2xzMiA9IG9wMi5jb2xzO1xuXG4gIGlmIChyb3dzICE9PSByb3dzMiB8fCBjb2xzICE9PSBjb2xzMikge1xuICAgIF90aHJvd1NpemVNaXNtYXRjaEVycm9yKCdkaXZfJywgdGhpcywgb3AyKTtcbiAgfVxuICBcbiAgdmFyIHJvdywgY29sO1xuXG4gIGZvciAocm93PTA7IHJvdzxyb3dzOyArK3Jvdykge1xuICAgIGZvciAoY29sPTA7IGNvbDxjb2xzOyArK2NvbCkge1xuICAgICAgdGhpc0RhdGFbcm93XVtjb2xdID0gdGhpc0RhdGFbcm93XVtjb2xdIC8gb3AyRGF0YVtyb3ddW2NvbF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cblxuXG5NYXRyaXgucHJvdG90eXBlLm11bCA9IGZ1bmN0aW9uKG9wMikge1xuICB2YXIgdGhpc0RhdGEgPSB0aGlzLmRhdGEsXG4gICAgcm93cyA9IHRoaXMucm93cywgXG4gICAgY29scyA9IHRoaXMuY29scyxcbiAgICBvcDJEYXRhID0gb3AyLmRhdGEsXG4gICAgcm93czIgPSBvcDIucm93cyxcbiAgICBjb2xzMiA9IG9wMi5jb2xzO1xuXG4gIGlmIChyb3dzICE9PSByb3dzMiB8fCBjb2xzICE9PSBjb2xzMikge1xuICAgIF90aHJvd1NpemVNaXNtYXRjaEVycm9yKCdtdWwnLCB0aGlzLCBvcDIpO1xuICB9XG4gIFxuICB2YXIgcm93LCBjb2wsIHJlc3VsdCA9IG5ldyBBcnJheShyb3dzKTtcblxuICBmb3IgKHJvdz0wOyByb3c8cm93czsgKytyb3cpIHtcbiAgICByZXN1bHRbcm93XSA9IG5ldyBBcnJheShjb2xzKTtcbiAgICBcbiAgICBmb3IgKGNvbD0wOyBjb2w8Y29sczsgKytjb2wpIHtcbiAgICAgIHJlc3VsdFtyb3ddW2NvbF0gPSB0aGlzRGF0YVtyb3ddW2NvbF0gKiBvcDJEYXRhW3Jvd11bY29sXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IE1hdHJpeChyZXN1bHQpO1xufTtcblxuXG5cblxuTWF0cml4LnByb3RvdHlwZS5tdWxfID0gZnVuY3Rpb24ob3AyKSB7XG4gIHZhciB0aGlzRGF0YSA9IHRoaXMuZGF0YSxcbiAgICByb3dzID0gdGhpcy5yb3dzLCBcbiAgICBjb2xzID0gdGhpcy5jb2xzLFxuICAgIG9wMkRhdGEgPSBvcDIuZGF0YSxcbiAgICByb3dzMiA9IG9wMi5yb3dzLFxuICAgIGNvbHMyID0gb3AyLmNvbHM7XG5cbiAgaWYgKHJvd3MgIT09IHJvd3MyIHx8IGNvbHMgIT09IGNvbHMyKSB7XG4gICAgX3Rocm93U2l6ZU1pc21hdGNoRXJyb3IoJ211bF8nLCB0aGlzLCBvcDIpO1xuICB9XG4gIFxuICB2YXIgcm93LCBjb2w7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgZm9yIChjb2w9MDsgY29sPGNvbHM7ICsrY29sKSB7XG4gICAgICB0aGlzRGF0YVtyb3ddW2NvbF0gPSB0aGlzRGF0YVtyb3ddW2NvbF0gKiBvcDJEYXRhW3Jvd11bY29sXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cblxuXG5cbk1hdHJpeC5wcm90b3R5cGUucGx1cyA9IGZ1bmN0aW9uKG9wMikge1xuICB2YXIgdGhpc0RhdGEgPSB0aGlzLmRhdGEsXG4gICAgcm93cyA9IHRoaXMucm93cywgXG4gICAgY29scyA9IHRoaXMuY29scyxcbiAgICBvcDJEYXRhID0gb3AyLmRhdGEsXG4gICAgcm93czIgPSBvcDIucm93cyxcbiAgICBjb2xzMiA9IG9wMi5jb2xzO1xuXG4gIGlmIChyb3dzICE9PSByb3dzMiB8fCBjb2xzICE9PSBjb2xzMikge1xuICAgIF90aHJvd1NpemVNaXNtYXRjaEVycm9yKCdwbHVzJywgdGhpcywgb3AyKTtcbiAgfVxuICBcbiAgdmFyIHJvdywgY29sLCByZXN1bHQgPSBuZXcgQXJyYXkocm93cyk7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgcmVzdWx0W3Jvd10gPSBuZXcgQXJyYXkoY29scyk7XG4gICAgXG4gICAgZm9yIChjb2w9MDsgY29sPGNvbHM7ICsrY29sKSB7XG4gICAgICByZXN1bHRbcm93XVtjb2xdID0gdGhpc0RhdGFbcm93XVtjb2xdICsgb3AyRGF0YVtyb3ddW2NvbF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBNYXRyaXgocmVzdWx0KTtcbn07XG5cblxuXG5cbk1hdHJpeC5wcm90b3R5cGUucGx1c18gPSBmdW5jdGlvbihvcDIpIHtcbiAgdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgIHJvd3MgPSB0aGlzLnJvd3MsIFxuICAgIGNvbHMgPSB0aGlzLmNvbHMsXG4gICAgb3AyRGF0YSA9IG9wMi5kYXRhLFxuICAgIHJvd3MyID0gb3AyLnJvd3MsXG4gICAgY29sczIgPSBvcDIuY29scztcblxuICBpZiAocm93cyAhPT0gcm93czIgfHwgY29scyAhPT0gY29sczIpIHtcbiAgICBfdGhyb3dTaXplTWlzbWF0Y2hFcnJvcigncGx1c18nLCB0aGlzLCBvcDIpO1xuICB9XG4gIFxuICB2YXIgcm93LCBjb2w7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgZm9yIChjb2w9MDsgY29sPGNvbHM7ICsrY29sKSB7XG4gICAgICB0aGlzRGF0YVtyb3ddW2NvbF0gPSB0aGlzRGF0YVtyb3ddW2NvbF0gKyBvcDJEYXRhW3Jvd11bY29sXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cblxuXG5cbk1hdHJpeC5wcm90b3R5cGUubWludXMgPSBmdW5jdGlvbihvcDIpIHtcbiAgdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgIHJvd3MgPSB0aGlzLnJvd3MsIFxuICAgIGNvbHMgPSB0aGlzLmNvbHMsXG4gICAgb3AyRGF0YSA9IG9wMi5kYXRhLFxuICAgIHJvd3MyID0gb3AyLnJvd3MsXG4gICAgY29sczIgPSBvcDIuY29scztcblxuICBpZiAocm93cyAhPT0gcm93czIgfHwgY29scyAhPT0gY29sczIpIHtcbiAgICBfdGhyb3dTaXplTWlzbWF0Y2hFcnJvcignbWludXMnLCB0aGlzLCBvcDIpO1xuICB9XG4gIFxuICB2YXIgcm93LCBjb2wsIHJlc3VsdCA9IG5ldyBBcnJheShyb3dzKTtcblxuICBmb3IgKHJvdz0wOyByb3c8cm93czsgKytyb3cpIHtcbiAgICByZXN1bHRbcm93XSA9IG5ldyBBcnJheShjb2xzKTtcbiAgICBcbiAgICBmb3IgKGNvbD0wOyBjb2w8Y29sczsgKytjb2wpIHtcbiAgICAgIHJlc3VsdFtyb3ddW2NvbF0gPSB0aGlzRGF0YVtyb3ddW2NvbF0gLSBvcDJEYXRhW3Jvd11bY29sXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IE1hdHJpeChyZXN1bHQpO1xufTtcblxuXG5cblxuTWF0cml4LnByb3RvdHlwZS5taW51c18gPSBmdW5jdGlvbihvcDIpIHtcbiAgdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgIHJvd3MgPSB0aGlzLnJvd3MsIFxuICAgIGNvbHMgPSB0aGlzLmNvbHMsXG4gICAgb3AyRGF0YSA9IG9wMi5kYXRhLFxuICAgIHJvd3MyID0gb3AyLnJvd3MsXG4gICAgY29sczIgPSBvcDIuY29scztcblxuICBpZiAocm93cyAhPT0gcm93czIgfHwgY29scyAhPT0gY29sczIpIHtcbiAgICBfdGhyb3dTaXplTWlzbWF0Y2hFcnJvcignbWludXNfJywgdGhpcywgb3AyKTtcbiAgfVxuICBcbiAgdmFyIHJvdywgY29sO1xuXG4gIGZvciAocm93PTA7IHJvdzxyb3dzOyArK3Jvdykge1xuICAgIGZvciAoY29sPTA7IGNvbDxjb2xzOyArK2NvbCkge1xuICAgICAgdGhpc0RhdGFbcm93XVtjb2xdID0gdGhpc0RhdGFbcm93XVtjb2xdIC0gb3AyRGF0YVtyb3ddW2NvbF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cblxuXG5cblxuXG5cblxuXG5cbi8qKlxuICogRG90IHByb2R1Y3QuXG4gKiBcbiAqIEBwYXJhbSAge01hdHJpeH0gYXJnIEEgTWF0cml4LlxuICogXG4gKiBAcmV0dXJuIHtNYXRyaXh9XG4gKi9cbk1hdHJpeC5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24ob3AyKSB7XG4gIHZhciB0aGlzRGF0YSA9IHRoaXMuZGF0YSxcbiAgICByb3dzID0gdGhpcy5yb3dzLCBcbiAgICBjb2xzID0gdGhpcy5jb2xzLFxuICAgIG9wMkRhdGEgPSBvcDIuZGF0YSxcbiAgICByb3dzMiA9IG9wMi5yb3dzLFxuICAgIGNvbHMyID0gb3AyLmNvbHM7XG5cbiAgaWYgKGNvbHMgIT09IHJvd3MyKSB7XG4gICAgX3Rocm93U2l6ZU1pc21hdGNoRXJyb3IoJ2RvdCcsIHRoaXMsIG9wMik7XG4gIH1cblxuICAvLyBvcDEgPSBtIHggblxuICAvLyBvcDIgPSBtMiB4IG4yXG4gIC8vIG9wMSAqIG9wMiA9PiBtIHggbjJcblxuICB2YXIgcm93LCByb3cyLCBjb2wyO1xuXG4gIHZhciByZXN1bHQgPSBuZXcgQXJyYXkocm93cyk7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgcmVzdWx0W3Jvd10gPSBuZXcgQXJyYXkoY29sczIpO1xuXG4gICAgZm9yIChjb2wyPTA7IGNvbDI8Y29sczI7ICsrY29sMikge1xuICAgICAgcmVzdWx0W3Jvd11bY29sMl0gPSAwO1xuXG4gICAgICBmb3IgKHJvdzI9MDsgcm93Mjxyb3dzMjsgKytyb3cyKSB7XG4gICAgICAgIHJlc3VsdFtyb3ddW2NvbDJdICs9IHRoaXNEYXRhW3Jvd11bcm93Ml0gKiBvcDJEYXRhW3JvdzJdW2NvbDJdO1xuICAgICAgfVxuICAgIH1cbiAgfSAgXG5cbiAgcmV0dXJuIG5ldyBNYXRyaXgocmVzdWx0KTtcbn07XG5cblxuXG5cbi8qKlxuICogSW4tcGxhY2UgdmVyc2lvbiBvZiBkb3QoKS5cbiAqIFxuICogQHJldHVybiB0aGlzXG4gKi9cbk1hdHJpeC5wcm90b3R5cGUuZG90XyA9IGZ1bmN0aW9uKG9wMikge1xuICB2YXIgdGhpc0RhdGEgPSB0aGlzLmRhdGEsXG4gICAgcm93cyA9IHRoaXMucm93cywgXG4gICAgY29scyA9IHRoaXMuY29scyxcbiAgICBvcDJEYXRhID0gb3AyLmRhdGEsXG4gICAgcm93czIgPSBvcDIucm93cyxcbiAgICBjb2xzMiA9IG9wMi5jb2xzO1xuXG4gIGlmIChjb2xzICE9PSByb3dzMikge1xuICAgIF90aHJvd1NpemVNaXNtYXRjaEVycm9yKCdkb3RfJywgdGhpcywgb3AyKTtcbiAgfVxuXG4gIC8vIG9wMSA9IG0geCBuXG4gIC8vIG9wMiA9IG0yIHggbjJcbiAgLy8gb3AxICogb3AyID0+IG0geCBuMlxuXG4gIHZhciByb3csIHJvdzIsIGNvbDIsIHRtcDtcblxuICBmb3IgKHJvdz0wOyByb3c8cm93czsgKytyb3cpIHtcbiAgICAvLyB3ZSBuZWVkIHRvIGtlZXAgYSBjb3B5IG9mIHRoaXMgcm93IHNpbmNlIHdlJ2xsIGJlIG92ZXJ3cml0aW5nIGl0IGluIHRoaXMuZGF0YVxuICAgIHRtcCA9IHRoaXNEYXRhW3Jvd10uc2xpY2UoMCwgY29scyk7XG5cbiAgICBmb3IgKGNvbDI9MDsgY29sMjxjb2xzMjsgKytjb2wyKSB7XG4gICAgICB0aGlzRGF0YVtyb3ddW2NvbDJdID0gMDtcblxuICAgICAgZm9yIChyb3cyPTA7IHJvdzI8cm93czI7ICsrcm93Mikge1xuICAgICAgICB0aGlzRGF0YVtyb3ddW2NvbDJdICs9IHRtcFtyb3cyXSAqIG9wMkRhdGFbcm93Ml1bY29sMl07XG4gICAgICB9XG4gICAgfVxuICB9ICBcblxuICAvLyB1cGRhdGUgZGltZW5zaW9uc1xuICB0aGlzLmNvbHMgPSBjb2xzMjtcblxuICByZXR1cm4gdGhpcztcbn07XG5cblxuXG5cbk1hdHJpeC5wcm90b3R5cGUuZ2V0U3VtID0gZnVuY3Rpb24oKSB7XG4gdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgcm93cyA9IHRoaXMucm93cyxcbiAgIGNvbHMgPSB0aGlzLmNvbHM7XG5cbiB2YXIgc3VtID0gMDtcblxuIGZvciAodmFyIGkgPSAwOyBpPHJvd3M7ICsraSkge1xuICAgZm9yICh2YXIgaiA9IDA7IGo8Y29sczsgKytqKSB7XG4gICAgIHN1bSArPSB0aGlzRGF0YVtpXVtqXTtcbiAgIH1cbiB9XG4gXG4gcmV0dXJuIHN1bTsgIFxufTtcblxuXG4vKipcbiAqIEFwcGx5IGZ1bmN0aW9uIHRvIGFsbCBlbGVtZW50cyBpbiB0aGlzIG1hdHJpeC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm1GbiBXaXRoIHNpZ25hdHVyZSAoZG91YmxlKSA9PiBkb3VibGVcbiAqL1xuTWF0cml4LnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbih0cmFuc2Zvcm1Gbikge1xuICB2YXIgdGhpc0RhdGEgPSB0aGlzLmRhdGEsXG4gICAgcm93cyA9IHRoaXMucm93cyxcbiAgICBjb2xzID0gdGhpcy5jb2xzO1xuXG4gIHZhciByb3csIGNvbCwgcmVzdWx0ID0gbmV3IEFycmF5KHJvd3MpO1xuXG4gIGZvciAocm93PTA7IHJvdzxyb3dzOyArK3Jvdykge1xuICAgIHJlc3VsdFtyb3ddID0gbmV3IEFycmF5KGNvbHMpO1xuXG4gICAgZm9yIChjb2w9MDsgY29sPGNvbHM7ICsrY29sKSB7XG4gICAgICByZXN1bHRbcm93XVtjb2xdID0gdHJhbnNmb3JtRm4odGhpc0RhdGFbcm93XVtjb2xdKTtcbiAgICB9XG4gIH0gIFxuXG4gIHJldHVybiBuZXcgTWF0cml4KHJlc3VsdCk7XG59O1xuXG5cblxuXG5cbk1hdHJpeC5wcm90b3R5cGUubWFwXyA9IGZ1bmN0aW9uKHRyYW5zZm9ybUZuKSB7XG4gIHZhciB0aGlzRGF0YSA9IHRoaXMuZGF0YSxcbiAgICByb3dzID0gdGhpcy5yb3dzLFxuICAgIGNvbHMgPSB0aGlzLmNvbHM7XG5cbiAgdmFyIHJvdywgY29sO1xuXG4gIGZvciAocm93PTA7IHJvdzxyb3dzOyArK3Jvdykge1xuICAgIGZvciAoY29sPTA7IGNvbDxjb2xzOyArK2NvbCkge1xuICAgICAgdGhpc0RhdGFbcm93XVtjb2xdID0gdHJhbnNmb3JtRm4odGhpc0RhdGFbcm93XVtjb2xdKTtcbiAgICB9XG4gIH0gIFxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuXG5cblxuXG5cbi8qKlxuICogQ2FsY3VsYXRlIHRoZSBuYXR1cmFsIGxvZyAobG4pIGFsbCB0aGUgZWxlbWVudHMuXG4gKi9cbk1hdHJpeC5wcm90b3R5cGUubG9nID0gZnVuY3Rpb24odW5kZWZpbmVkKSB7XG4gIHZhciB0aGlzRGF0YSA9IHRoaXMuZGF0YSxcbiAgICByb3dzID0gdGhpcy5yb3dzLFxuICAgIGNvbHMgPSB0aGlzLmNvbHM7XG5cbiAgdmFyIHJvdywgY29sLCByZXN1bHQgPSBuZXcgQXJyYXkocm93cyk7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgcmVzdWx0W3Jvd10gPSBuZXcgQXJyYXkoY29scyk7XG5cbiAgICBmb3IgKGNvbD0wOyBjb2w8Y29sczsgKytjb2wpIHtcbiAgICAgIHJlc3VsdFtyb3ddW2NvbF0gPSBNYXRoLmxvZyh0aGlzRGF0YVtyb3ddW2NvbF0pO1xuICAgIH1cbiAgfSAgXG5cbiAgcmV0dXJuIG5ldyBNYXRyaXgocmVzdWx0KTtcbn07XG5cblxuXG5cblxuTWF0cml4LnByb3RvdHlwZS5sb2dfID0gZnVuY3Rpb24odW5kZWZpbmVkKSB7XG4gIHZhciB0aGlzRGF0YSA9IHRoaXMuZGF0YSxcbiAgICByb3dzID0gdGhpcy5yb3dzLFxuICAgIGNvbHMgPSB0aGlzLmNvbHM7XG5cbiAgdmFyIHJvdywgY29sO1xuXG4gIGZvciAocm93PTA7IHJvdzxyb3dzOyArK3Jvdykge1xuICAgIGZvciAoY29sPTA7IGNvbDxjb2xzOyArK2NvbCkge1xuICAgICAgdGhpc0RhdGFbcm93XVtjb2xdID0gTWF0aC5sb2codGhpc0RhdGFbcm93XVtjb2xdKTtcbiAgICB9XG4gIH0gIFxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuXG5cblxuXG5cbi8qKlxuICogQ2FsY3VsYXRlIHRoZSBzaWdtb2lkIGZ1bmN0aW9uIG9mIGFsbCB0aGUgZWxlbWVudHMuXG4gKlxuICogU2VlIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvU2lnbW9pZF9mdW5jdGlvblxuICovXG5NYXRyaXgucHJvdG90eXBlLnNpZ21vaWQgPSBmdW5jdGlvbih1bmRlZmluZWQpIHtcbiAgdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgIHJvd3MgPSB0aGlzLnJvd3MsXG4gICAgY29scyA9IHRoaXMuY29scztcblxuICB2YXIgcm93LCBjb2wsIHJlc3VsdCA9IG5ldyBBcnJheShyb3dzKTtcblxuICBmb3IgKHJvdz0wOyByb3c8cm93czsgKytyb3cpIHtcbiAgICByZXN1bHRbcm93XSA9IG5ldyBBcnJheShjb2xzKTtcblxuICAgIGZvciAoY29sPTA7IGNvbDxjb2xzOyArK2NvbCkge1xuICAgICAgcmVzdWx0W3Jvd11bY29sXSA9ICgxIC8gKDEgKyBNYXRoLmV4cCgtdGhpc0RhdGFbcm93XVtjb2xdKSkpO1xuICAgIH1cbiAgfSAgXG5cbiAgcmV0dXJuIG5ldyBNYXRyaXgocmVzdWx0KTtcbn07XG5cblxuXG5cblxuTWF0cml4LnByb3RvdHlwZS5zaWdtb2lkXyA9IGZ1bmN0aW9uKHVuZGVmaW5lZCkge1xuICB2YXIgdGhpc0RhdGEgPSB0aGlzLmRhdGEsXG4gICAgcm93cyA9IHRoaXMucm93cyxcbiAgICBjb2xzID0gdGhpcy5jb2xzO1xuXG4gIHZhciByb3csIGNvbDtcblxuICBmb3IgKHJvdz0wOyByb3c8cm93czsgKytyb3cpIHtcbiAgICBmb3IgKGNvbD0wOyBjb2w8Y29sczsgKytjb2wpIHtcbiAgICAgIHRoaXNEYXRhW3Jvd11bY29sXSA9ICgxIC8gKDEgKyBNYXRoLmV4cCgtdGhpc0RhdGFbcm93XVtjb2xdKSkpO1xuICAgIH1cbiAgfSAgXG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cblxuXG5cbi8qKlxuICogTXVsdGlwbHkgZXZlcnkgZWxlbWVudCB3aXRoIGdpdmVuIHZhbHVlLlxuICogQHBhcmFtICB7TnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byBtdWx0aXBsZSB3aXRoLlxuICovXG5NYXRyaXgucHJvdG90eXBlLm11bEVhY2ggPSBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIgdGhpc0RhdGEgPSB0aGlzLmRhdGEsXG4gICAgcm93cyA9IHRoaXMucm93cyxcbiAgICBjb2xzID0gdGhpcy5jb2xzO1xuXG4gIHZhciByb3csIGNvbCwgcmVzdWx0ID0gbmV3IEFycmF5KHJvd3MpO1xuXG4gIGZvciAocm93PTA7IHJvdzxyb3dzOyArK3Jvdykge1xuICAgIHJlc3VsdFtyb3ddID0gbmV3IEFycmF5KGNvbHMpO1xuXG4gICAgZm9yIChjb2w9MDsgY29sPGNvbHM7ICsrY29sKSB7XG4gICAgICByZXN1bHRbcm93XVtjb2xdID0gdGhpc0RhdGFbcm93XVtjb2xdICogdmFsdWU7XG4gICAgfVxuICB9ICBcblxuICByZXR1cm4gbmV3IE1hdHJpeChyZXN1bHQpO1xufTtcblxuXG5cblxuXG5NYXRyaXgucHJvdG90eXBlLm11bEVhY2hfID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgIHJvd3MgPSB0aGlzLnJvd3MsXG4gICAgY29scyA9IHRoaXMuY29scztcblxuICB2YXIgcm93LCBjb2w7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgZm9yIChjb2w9MDsgY29sPGNvbHM7ICsrY29sKSB7XG4gICAgICB0aGlzRGF0YVtyb3ddW2NvbF0gPSB0aGlzRGF0YVtyb3ddW2NvbF0gKiB2YWx1ZTtcbiAgICB9XG4gIH0gIFxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuXG5cblxuXG5cbi8qKlxuICogQWRkIGEgdmFsdWUgdG8gZXZlcnkgZWxlbWVudC5cbiAqIEBwYXJhbSAge051bWJlcn0gdmFsdWUgVmFsdWUgdG8gbXVsdGlwbGUgd2l0aC5cbiAqL1xuTWF0cml4LnByb3RvdHlwZS5wbHVzRWFjaCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhciB0aGlzRGF0YSA9IHRoaXMuZGF0YSxcbiAgICByb3dzID0gdGhpcy5yb3dzLFxuICAgIGNvbHMgPSB0aGlzLmNvbHM7XG5cbiAgdmFyIHJvdywgY29sLCByZXN1bHQgPSBuZXcgQXJyYXkocm93cyk7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgcmVzdWx0W3Jvd10gPSBuZXcgQXJyYXkoY29scyk7XG5cbiAgICBmb3IgKGNvbD0wOyBjb2w8Y29sczsgKytjb2wpIHtcbiAgICAgIHJlc3VsdFtyb3ddW2NvbF0gPSB0aGlzRGF0YVtyb3ddW2NvbF0gKyB2YWx1ZTtcbiAgICB9XG4gIH0gIFxuXG4gIHJldHVybiBuZXcgTWF0cml4KHJlc3VsdCk7XG59O1xuXG5cblxuXG5cbk1hdHJpeC5wcm90b3R5cGUucGx1c0VhY2hfID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgIHJvd3MgPSB0aGlzLnJvd3MsXG4gICAgY29scyA9IHRoaXMuY29scztcblxuICB2YXIgcm93LCBjb2w7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgZm9yIChjb2w9MDsgY29sPGNvbHM7ICsrY29sKSB7XG4gICAgICB0aGlzRGF0YVtyb3ddW2NvbF0gPSB0aGlzRGF0YVtyb3ddW2NvbF0gKyB2YWx1ZTtcbiAgICB9XG4gIH0gIFxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuXG5cblxuXG4vKipcbiAqIEFwcGx5IGZ1bmN0aW9uIHdpdGggcm93IGFuZCBjb2x1bW4gcGFyYW1ldGVycyB0byBhbGwgZWxlbWVudHMgaW4gbWF0cml4XG4gKlxuICogVXNlZCB0byBhcHBseSBkaWZmZXJlbnQgdHJhbnNmb3JtYXRpb25zIGRlcGVuZGluZyBvbiBwbGFjZW1lbnQgaW4gbWF0cml4LlxuICovXG5NYXRyaXgucHJvdG90eXBlLmVsZU1hcCA9IGZ1bmN0aW9uKHRyYW5zZm9ybUZuKSB7XG4gIHZhciB0aGlzRGF0YSA9IHRoaXMuZGF0YSxcbiAgICByb3dzID0gdGhpcy5yb3dzLFxuICAgIGNvbHMgPSB0aGlzLmNvbHM7XG5cbiAgdmFyIHJvdywgY29sLCByZXN1bHQgPSBuZXcgQXJyYXkocm93cyk7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgcmVzdWx0W3Jvd10gPSBuZXcgQXJyYXkoY29scyk7XG5cbiAgICBmb3IgKGNvbD0wOyBjb2w8Y29sczsgKytjb2wpIHtcbiAgICAgIHJlc3VsdFtyb3ddW2NvbF0gPSB0cmFuc2Zvcm1Gbih0aGlzRGF0YVtyb3ddW2NvbF0sIHJvdywgY29sKTtcbiAgICB9XG4gIH0gIFxuXG4gIHJldHVybiBuZXcgTWF0cml4KHJlc3VsdCk7XG59O1xuXG5cblxuXG5cbk1hdHJpeC5wcm90b3R5cGUuZWxlTWFwXyA9IGZ1bmN0aW9uKHRyYW5zZm9ybUZuKSB7XG4gIHZhciB0aGlzRGF0YSA9IHRoaXMuZGF0YSxcbiAgICByb3dzID0gdGhpcy5yb3dzLFxuICAgIGNvbHMgPSB0aGlzLmNvbHM7XG5cbiAgdmFyIHJvdywgY29sO1xuXG4gIGZvciAocm93PTA7IHJvdzxyb3dzOyArK3Jvdykge1xuICAgIGZvciAoY29sPTA7IGNvbDxjb2xzOyArK2NvbCkge1xuICAgICAgdGhpc0RhdGFbcm93XVtjb2xdID0gdHJhbnNmb3JtRm4odGhpc0RhdGFbcm93XVtjb2xdLCByb3csIGNvbCk7XG4gICAgfVxuICB9ICBcblxuICByZXR1cm4gdGhpcztcbn07XG5cblxuXG5cblxuXG5cbiAgICByZXR1cm4gTGluQWxnO1xuICB9O1xufSk7XG5cbiIsIihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICAvLyBBTURcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XG4gIH1cbiAgLy8gQ29tbW9uSlNcbiAgZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH1cbiAgLy8gQnJvd3NlclxuICBlbHNlIHtcbiAgICByb290LmxpbmVhckFsZ2VicmEgPSBmYWN0b3J5KCk7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cblxuICB2YXIgX3Rocm93RXJyb3IgPSBmdW5jdGlvbihtc2cpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2xpbmVhci1hbGdlYnJhOiAnICsgbXNnKTtcbiAgfTtcblxuXG4gIHZhciBfdGhyb3dTaXplTWlzbWF0Y2hFcnJvciA9IGZ1bmN0aW9uKG9wLCBhcmcxLCBhcmcyKSB7XG4gICAgX3Rocm93RXJyb3IoJ1snICsgb3AgKyAnXSBvcDEgaXMgJyArIGFyZzEucm93cyAgKyAnIHggJyArIGFyZzEuY29scyArIFxuICAgICAgJyBhbmQgb3AyIGlzICcgKyBhcmcyLnJvd3MgKyAnIHggJyArIGFyZzIuY29scyk7XG4gIH07XG5cblxuICAvKipcbiAgICogSW5pdGlhbGlzZSB0aGUgbGluZWFyIGFsZ2VicmEgbGlicmFyeS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQWRkaXRpb25hbCBvcHRpb25zLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5hZGRdIEZ1bmN0aW9uIHRvIGFkZCBmbG9hdGluZyBwb2ludCBudW1iZXJzLlxuICAgKiBcbiAgICogQHJldHVybiB7T2JqZWN0fSBMaW5lYXIgYWxnZWJyYSBwcmltaXRpdmVzLlxuICAgKi9cbiAgcmV0dXJuIGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIFxuICB2YXIgTGluQWxnID0ge307XG5cblxuICAvKipcbiAgICogT3VyIGNvbW1vbiBudW1iZXIgYXJyYXkgY2xhc3MuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyAxRCBhcnJheSAodmVjdG9yKSBvciAyRCBhcnJheSAobWF0cml4KSB3aXRoIGxlbmd0aCA+PSAxLlxuICAgKiBcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICB2YXIgTWF0cml4ID0gTGluQWxnLk1hdHJpeCA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlc1swXSkpIHtcbiAgICAgIC8vIG1hdHJpeFxuICAgICAgdGhpcy5kYXRhID0gdmFsdWVzO1xuICAgICAgdGhpcy5yb3dzID0gdmFsdWVzLmxlbmd0aDtcbiAgICAgIHRoaXMuY29scyA9IHZhbHVlc1swXS5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJvdy12ZWN0b3JcbiAgICAgIHRoaXMuZGF0YSA9IFt2YWx1ZXNdO1xuICAgICAgdGhpcy5yb3dzID0gMTtcbiAgICAgIHRoaXMuY29scyA9IHZhbHVlcy5sZW5ndGg7XG4gICAgfVxuICB9O1xuXG5cblxuXG4gIC8qKlxuICAgKiBDbG9uZSB0aGlzIG1hdHJpeC5cbiAgICogQHJldHVybiB7TWF0cml4fVxuICAgKi9cbiAgTWF0cml4LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgTWF0cml4KHRoaXMudG9BcnJheSgpKTtcbiAgfTtcblxuXG5cblxuICAvKipcbiAgICogR2V0IHBsYWluIGFycmF5IHZlcnNpb24gb2YgdGhpcyBtYXRyaXguXG4gICAqIFxuICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICovXG4gIE1hdHJpeC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0aGlzRGF0YSA9IHRoaXMuZGF0YSxcbiAgICAgIHJvd3MgPSB0aGlzLnJvd3MsXG4gICAgICBjb2xzID0gdGhpcy5jb2xzO1xuXG4gICAgdmFyIGEgPSBuZXcgQXJyYXkocm93cyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaTxyb3dzOyArK2kpIHtcbiAgICAgIGFbaV0gPSB0aGlzRGF0YVtpXS5zbGljZSgwLCBjb2xzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYTtcbiAgfTtcblxuXG5cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIGlkZW50aXR5IG1hdHJpeCBvZiBnaXZlbiBkaW1lbnNpb25zLlxuICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSBkaW0gTGVuZ3RoIG9mIG9uZSBzaWRlLlxuICAgKiBAcmV0dXJuIHtNYXRyaXh9XG4gICAqL1xuICBNYXRyaXguaWRlbnRpdHkgPSBmdW5jdGlvbihkaW0pIHtcbiAgICByZXR1cm4gTWF0cml4LnNjYWxhcihkaW0sIDEpO1xuICB9O1xuXG5cblxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBzY2FsYXIgZGlhZ29uYWwgbWF0cml4LlxuICAgKiBAcGFyYW0ge0ludGVnZXJ9IGRpbSBNYXRyaXggc2l6ZSAobGVuZ3RoIG9mIGVhY2ggc2lkZSlcbiAgICogQHBhcmFtICB7TnVtYmVyfSBlbnRyeSBUaGUgdmFsdWUgdG8gcGxhY2UgaW4gZWFjaCBkaWFnb25hbC5cbiAgICogQHJldHVybiB7TWF0cml4fVxuICAgKi9cbiAgTWF0cml4LnNjYWxhciA9IGZ1bmN0aW9uKGRpbSwgZW50cnkpIHtcbiAgICB2YXIgYSA9IG5ldyBBcnJheShkaW0pLFxuICAgICAgaSwgajtcblxuICAgIGZvciAoaT0wOyBpPGRpbTsgKytpKSB7XG4gICAgICBhW2ldID0gbmV3IEFycmF5KGRpbSk7XG5cbiAgICAgIGZvciAoaj0wOyBqPGRpbTsgKytqKSB7XG4gICAgICAgIGFbaV1bal0gPSAwO1xuICAgICAgfVxuXG4gICAgICBhW2ldW2ldID0gZW50cnk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBNYXRyaXgoYSk7XG4gIH07XG5cblxuXG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG1hdHJpeCBvZiB6ZXJvcy5cbiAgICogQHBhcmFtIHtJbnRlZ2VyfSByb3dzIE51bWJlciBvZiByb3dzLlxuICAgKiBAcGFyYW0ge0ludGVnZXJ9IGJvbHMgTnVtYmVyIG9mIGJvbHMuXG4gICAqIEByZXR1cm4ge01hdHJpeH1cbiAgICovXG4gIE1hdHJpeC56ZXJvID0gZnVuY3Rpb24ocm93cywgY29scykge1xuICAgIHZhciBhID0gbmV3IEFycmF5KHJvd3MpO1xuXG4gICAgZm9yICh2YXIgaT0wOyBpPHJvd3M7ICsraSkge1xuICAgICAgYVtpXSA9IG5ldyBBcnJheShjb2xzKTtcbiAgICAgIFxuICAgICAgZm9yICh2YXIgaj0wOyBqPGNvbHM7ICsraikge1xuICAgICAgICBhW2ldW2pdID0gMDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBNYXRyaXgoYSk7XG4gIH07XG5cblxuXG4gIC8qKlxuICAgKiBSZXNoYXBlIGFycmF5IGludG8gbWF0cml4LlxuICAgKiBcbiAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIDFEIGFycmF5ICh2ZWN0b3IpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSByb3dzIE51bWJlciBvZiByb3dzLlxuICAgKiBAcGFyYW0ge051bWJlcn0gY29scyBOdW1iZXIgb2YgY29scy5cbiAgICogXG4gICAqIEByZXR1cm4ge01hdHJpeH1cbiAgICovXG4gIE1hdHJpeC5yZXNoYXBlRnJvbSA9IGZ1bmN0aW9uKHZhbHVlcywgcm93cywgY29scykge1xuICAgIGlmICh2YWx1ZXMubGVuZ3RoICE9PSByb3dzICogY29scykge1xuICAgICAgX3Rocm93RXJyb3IoJ2Nhbm5vdCByZXNoYXBlIGFycmF5IG9mIGxlbmd0aCAnICsgdmFsdWVzLmxlbmd0aCArICcgaW50byAnICsgcm93cyAgKyAneCcgKyAgY29scyArICcgbWF0cml4Jyk7XG4gICAgfVxuXG4gICAgdmFyIGEgPSBbXTtcblxuICAgIGZvciAodmFyIGk9MDsgaTx2YWx1ZXMubGVuZ3RoOyBpICs9IGNvbHMpIHtcbiAgICAgIGEucHVzaCh2YWx1ZXMuc2xpY2UoaSwgY29scyArIGkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE1hdHJpeChhKTtcbiAgfTtcblxuXG5cblxuICAvKipcbiAgICogSGVscGVycyB0byBjcmVhdGUgdmVjdG9ycywgaS5lLiBtYXRyaWNlcyB3aXRoIGEgc2luZ2xlIHJvdy5cbiAgICovXG4gIHZhciBWZWN0b3IgPSBMaW5BbGcuVmVjdG9yID0ge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHJvdy12ZWN0b3Igb2YgemVyb3MuXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gc2l6ZSBMZW5ndGggb2YgdmVjdG9yLlxuICAgICAqIEByZXR1cm4ge1ZlY3Rvcn1cbiAgICAgKi9cbiAgICB6ZXJvOiBmdW5jdGlvbihzaXplKSB7XG4gICAgICB2YXIgYSA9IG5ldyBBcnJheShzaXplKTtcblxuICAgICAgZm9yICh2YXIgaT0wOyBpPHNpemU7ICsraSkge1xuICAgICAgICBhW2ldID0gMDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBNYXRyaXgoYSk7ICAgIFxuICAgIH1cbiAgfTtcblxuXG5cbi8qKlxuICogQGZpbGVPdmVydmlldyAgSW5pdGlhbGl6YXRpb24gb3B0aW9ucyBmb3IgaGlnaC1wcmVjaXNpb24gdmVyc2lvblxuICovXG5cblxuLy8gZnVuY3Rpb24gdG8gYWRkIGZsb2F0aW5nIHBvaW50IHZhbHVlc1xudmFyIGFkZGVyID0gb3B0aW9ucy5hZGQ7XG5cbmlmICghYWRkZXIpIHtcbiAgX3Rocm93RXJyb3IoJ29wdGlvbnMuYWRkIG11c3QgYmUgc2V0IGZvciBwcmVjaXNpb24gY2FsY3VsYXRpb24nKTtcbn1cblxuLyoqXG4gKiBAZmlsZU92ZXJ2aWV3ICBCYXNpYyBhcml0aG1ldGljIG9wZXJhdGlvbnNcbiAqL1xuXG5cblxuXG4vKipcbiAqIFRyYW5zcG9zZSB0aGlzIG1hdHJpeC5cbiAqIEByZXR1cm4ge01hdHJpeH1cbiAqL1xuTWF0cml4LnByb3RvdHlwZS50cmFucyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhpc0RhdGEgPSB0aGlzLmRhdGEsXG4gICAgcm93cyA9IHRoaXMucm93cywgXG4gICAgY29scyA9IHRoaXMuY29scztcblxuICB2YXIgcm93LCBjb2w7XG5cbiAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShjb2xzKTtcblxuICBmb3IgKGNvbD0wOyBjb2w8Y29sczsgKytjb2wpIHtcbiAgICByZXN1bHRbY29sXSA9IG5ldyBBcnJheShyb3dzKTtcbiAgICBcbiAgICBmb3IgKHJvdz0wOyByb3c8cm93czsgKytyb3cpIHtcbiAgICAgIHJlc3VsdFtjb2xdW3Jvd10gPSB0aGlzRGF0YVtyb3ddW2NvbF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBNYXRyaXgocmVzdWx0KTtcbn07XG5cblxuXG5cblxuXG4vKipcbiAqIEluLXBsYWNlIHZlcnNpb24gb2YgdHJhbnMoKS5cbiAqIEByZXR1cm4gdGhpc1xuICovXG5NYXRyaXgucHJvdG90eXBlLnRyYW5zXyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhpc0RhdGEgPSB0aGlzLmRhdGEsXG4gICAgcm93cyA9IHRoaXMucm93cywgXG4gICAgY29scyA9IHRoaXMuY29scztcblxuICB2YXIgcm93LCBjb2wsIHQ7XG5cbiAgLy8gZmlyc3Qgd2UgdHJhbnNwb3NlIHRoZSBtYXRyaXggdXB0byBsZW5ndGggb2Ygc2hvcnRlc3Qgc2lkZVxuICB2YXIgaXNTcXVhcmUgPSAoY29scyA9PT0gcm93cyk7XG4gIHZhciBzaG9ydGVzdFNpZGUgPSAoY29scyA+IHJvd3MpID8gcm93cyA6IGNvbHM7XG5cbiAgZm9yIChyb3c9MDsgcm93PHNob3J0ZXN0U2lkZTsgKytyb3cpIHtcbiAgICBmb3IgKGNvbD1yb3cgKyAxOyBjb2w8c2hvcnRlc3RTaWRlOyArK2NvbCkge1xuICAgICAgdCA9IHRoaXNEYXRhW2NvbF1bcm93XTtcbiAgICAgIHRoaXNEYXRhW2NvbF1bcm93XSA9IHRoaXNEYXRhW3Jvd11bY29sXTtcbiAgICAgIHRoaXNEYXRhW3Jvd11bY29sXSA9IHQ7XG4gICAgfVxuICB9XG5cbiAgLy8gbm93IHdlIHRyYW5zcG9zZSB0aGUgcmVzdCBvZiB0aGUgbWF0cml4XG4gIGlmICghaXNTcXVhcmUpIHtcbiAgICBpZiAoY29scyA+IHJvd3MpIHtcbiAgICAgIC8vIGRvIGEgY29sdW1uIGF0IGEgdGltZVxuICAgICAgZm9yIChjb2w9cm93czsgY29scyA+IGNvbDsgKytjb2wpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXNEYXRhW2NvbF0pKSB7XG4gICAgICAgICAgdGhpc0RhdGFbY29sXSA9IG5ldyBBcnJheShyb3dzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAocm93PTA7IHJvdzxyb3dzOyArK3Jvdykge1xuICAgICAgICAgIHRoaXNEYXRhW2NvbF1bcm93XSA9IHRoaXNEYXRhW3Jvd11bY29sXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIGRvIGEgcm93IGF0IGEgdGltZVxuICAgICAgZm9yIChyb3c9Y29sczsgcm93cyA+IHJvdzsgKytyb3cpIHtcbiAgICAgICAgZm9yIChjb2w9MDsgY29scyA+IGNvbDsgKytjb2wpIHtcbiAgICAgICAgICB0aGlzRGF0YVtjb2xdW3Jvd10gPSB0aGlzRGF0YVtyb3ddW2NvbF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gZmluYWxseSwgd2UgdXBkYXRlIHRoZSBcIm9mZmljaWFsXCIgZGltZW5zaW9uc1xuICAgIHQgPSByb3dzO1xuICAgIHRoaXMucm93cyA9IGNvbHM7XG4gICAgdGhpcy5jb2xzID0gdDtcbiAgfVxuXG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cblxuTWF0cml4LnByb3RvdHlwZS5kaXYgPSBmdW5jdGlvbihvcDIpIHtcbiAgdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgIHJvd3MgPSB0aGlzLnJvd3MsIFxuICAgIGNvbHMgPSB0aGlzLmNvbHMsXG4gICAgb3AyRGF0YSA9IG9wMi5kYXRhLFxuICAgIHJvd3MyID0gb3AyLnJvd3MsXG4gICAgY29sczIgPSBvcDIuY29scztcblxuICBpZiAocm93cyAhPT0gcm93czIgfHwgY29scyAhPT0gY29sczIpIHtcbiAgICBfdGhyb3dTaXplTWlzbWF0Y2hFcnJvcignZGl2JywgdGhpcywgb3AyKTtcbiAgfVxuICBcbiAgdmFyIHJvdywgY29sLCByZXN1bHQgPSBuZXcgQXJyYXkocm93cyk7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgcmVzdWx0W3Jvd10gPSBuZXcgQXJyYXkoY29scyk7XG4gICAgXG4gICAgZm9yIChjb2w9MDsgY29sPGNvbHM7ICsrY29sKSB7XG4gICAgICByZXN1bHRbcm93XVtjb2xdID0gdGhpc0RhdGFbcm93XVtjb2xdIC8gb3AyRGF0YVtyb3ddW2NvbF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBNYXRyaXgocmVzdWx0KTtcbn07XG5cblxuXG5cbk1hdHJpeC5wcm90b3R5cGUuZGl2XyA9IGZ1bmN0aW9uKG9wMikge1xuICB2YXIgdGhpc0RhdGEgPSB0aGlzLmRhdGEsXG4gICAgcm93cyA9IHRoaXMucm93cywgXG4gICAgY29scyA9IHRoaXMuY29scyxcbiAgICBvcDJEYXRhID0gb3AyLmRhdGEsXG4gICAgcm93czIgPSBvcDIucm93cyxcbiAgICBjb2xzMiA9IG9wMi5jb2xzO1xuXG4gIGlmIChyb3dzICE9PSByb3dzMiB8fCBjb2xzICE9PSBjb2xzMikge1xuICAgIF90aHJvd1NpemVNaXNtYXRjaEVycm9yKCdkaXZfJywgdGhpcywgb3AyKTtcbiAgfVxuICBcbiAgdmFyIHJvdywgY29sO1xuXG4gIGZvciAocm93PTA7IHJvdzxyb3dzOyArK3Jvdykge1xuICAgIGZvciAoY29sPTA7IGNvbDxjb2xzOyArK2NvbCkge1xuICAgICAgdGhpc0RhdGFbcm93XVtjb2xdID0gdGhpc0RhdGFbcm93XVtjb2xdIC8gb3AyRGF0YVtyb3ddW2NvbF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cblxuXG5NYXRyaXgucHJvdG90eXBlLm11bCA9IGZ1bmN0aW9uKG9wMikge1xuICB2YXIgdGhpc0RhdGEgPSB0aGlzLmRhdGEsXG4gICAgcm93cyA9IHRoaXMucm93cywgXG4gICAgY29scyA9IHRoaXMuY29scyxcbiAgICBvcDJEYXRhID0gb3AyLmRhdGEsXG4gICAgcm93czIgPSBvcDIucm93cyxcbiAgICBjb2xzMiA9IG9wMi5jb2xzO1xuXG4gIGlmIChyb3dzICE9PSByb3dzMiB8fCBjb2xzICE9PSBjb2xzMikge1xuICAgIF90aHJvd1NpemVNaXNtYXRjaEVycm9yKCdtdWwnLCB0aGlzLCBvcDIpO1xuICB9XG4gIFxuICB2YXIgcm93LCBjb2wsIHJlc3VsdCA9IG5ldyBBcnJheShyb3dzKTtcblxuICBmb3IgKHJvdz0wOyByb3c8cm93czsgKytyb3cpIHtcbiAgICByZXN1bHRbcm93XSA9IG5ldyBBcnJheShjb2xzKTtcbiAgICBcbiAgICBmb3IgKGNvbD0wOyBjb2w8Y29sczsgKytjb2wpIHtcbiAgICAgIHJlc3VsdFtyb3ddW2NvbF0gPSB0aGlzRGF0YVtyb3ddW2NvbF0gKiBvcDJEYXRhW3Jvd11bY29sXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IE1hdHJpeChyZXN1bHQpO1xufTtcblxuXG5cblxuTWF0cml4LnByb3RvdHlwZS5tdWxfID0gZnVuY3Rpb24ob3AyKSB7XG4gIHZhciB0aGlzRGF0YSA9IHRoaXMuZGF0YSxcbiAgICByb3dzID0gdGhpcy5yb3dzLCBcbiAgICBjb2xzID0gdGhpcy5jb2xzLFxuICAgIG9wMkRhdGEgPSBvcDIuZGF0YSxcbiAgICByb3dzMiA9IG9wMi5yb3dzLFxuICAgIGNvbHMyID0gb3AyLmNvbHM7XG5cbiAgaWYgKHJvd3MgIT09IHJvd3MyIHx8IGNvbHMgIT09IGNvbHMyKSB7XG4gICAgX3Rocm93U2l6ZU1pc21hdGNoRXJyb3IoJ211bF8nLCB0aGlzLCBvcDIpO1xuICB9XG4gIFxuICB2YXIgcm93LCBjb2w7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgZm9yIChjb2w9MDsgY29sPGNvbHM7ICsrY29sKSB7XG4gICAgICB0aGlzRGF0YVtyb3ddW2NvbF0gPSB0aGlzRGF0YVtyb3ddW2NvbF0gKiBvcDJEYXRhW3Jvd11bY29sXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cblxuXG5cbk1hdHJpeC5wcm90b3R5cGUucGx1cyA9IGZ1bmN0aW9uKG9wMikge1xuICB2YXIgdGhpc0RhdGEgPSB0aGlzLmRhdGEsXG4gICAgcm93cyA9IHRoaXMucm93cywgXG4gICAgY29scyA9IHRoaXMuY29scyxcbiAgICBvcDJEYXRhID0gb3AyLmRhdGEsXG4gICAgcm93czIgPSBvcDIucm93cyxcbiAgICBjb2xzMiA9IG9wMi5jb2xzO1xuXG4gIGlmIChyb3dzICE9PSByb3dzMiB8fCBjb2xzICE9PSBjb2xzMikge1xuICAgIF90aHJvd1NpemVNaXNtYXRjaEVycm9yKCdwbHVzJywgdGhpcywgb3AyKTtcbiAgfVxuICBcbiAgdmFyIHJvdywgY29sLCByZXN1bHQgPSBuZXcgQXJyYXkocm93cyk7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgcmVzdWx0W3Jvd10gPSBuZXcgQXJyYXkoY29scyk7XG4gICAgXG4gICAgZm9yIChjb2w9MDsgY29sPGNvbHM7ICsrY29sKSB7XG4gICAgICByZXN1bHRbcm93XVtjb2xdID0gdGhpc0RhdGFbcm93XVtjb2xdICsgb3AyRGF0YVtyb3ddW2NvbF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBNYXRyaXgocmVzdWx0KTtcbn07XG5cblxuXG5cbk1hdHJpeC5wcm90b3R5cGUucGx1c18gPSBmdW5jdGlvbihvcDIpIHtcbiAgdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgIHJvd3MgPSB0aGlzLnJvd3MsIFxuICAgIGNvbHMgPSB0aGlzLmNvbHMsXG4gICAgb3AyRGF0YSA9IG9wMi5kYXRhLFxuICAgIHJvd3MyID0gb3AyLnJvd3MsXG4gICAgY29sczIgPSBvcDIuY29scztcblxuICBpZiAocm93cyAhPT0gcm93czIgfHwgY29scyAhPT0gY29sczIpIHtcbiAgICBfdGhyb3dTaXplTWlzbWF0Y2hFcnJvcigncGx1c18nLCB0aGlzLCBvcDIpO1xuICB9XG4gIFxuICB2YXIgcm93LCBjb2w7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgZm9yIChjb2w9MDsgY29sPGNvbHM7ICsrY29sKSB7XG4gICAgICB0aGlzRGF0YVtyb3ddW2NvbF0gPSB0aGlzRGF0YVtyb3ddW2NvbF0gKyBvcDJEYXRhW3Jvd11bY29sXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cblxuXG5cbk1hdHJpeC5wcm90b3R5cGUubWludXMgPSBmdW5jdGlvbihvcDIpIHtcbiAgdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgIHJvd3MgPSB0aGlzLnJvd3MsIFxuICAgIGNvbHMgPSB0aGlzLmNvbHMsXG4gICAgb3AyRGF0YSA9IG9wMi5kYXRhLFxuICAgIHJvd3MyID0gb3AyLnJvd3MsXG4gICAgY29sczIgPSBvcDIuY29scztcblxuICBpZiAocm93cyAhPT0gcm93czIgfHwgY29scyAhPT0gY29sczIpIHtcbiAgICBfdGhyb3dTaXplTWlzbWF0Y2hFcnJvcignbWludXMnLCB0aGlzLCBvcDIpO1xuICB9XG4gIFxuICB2YXIgcm93LCBjb2wsIHJlc3VsdCA9IG5ldyBBcnJheShyb3dzKTtcblxuICBmb3IgKHJvdz0wOyByb3c8cm93czsgKytyb3cpIHtcbiAgICByZXN1bHRbcm93XSA9IG5ldyBBcnJheShjb2xzKTtcbiAgICBcbiAgICBmb3IgKGNvbD0wOyBjb2w8Y29sczsgKytjb2wpIHtcbiAgICAgIHJlc3VsdFtyb3ddW2NvbF0gPSB0aGlzRGF0YVtyb3ddW2NvbF0gLSBvcDJEYXRhW3Jvd11bY29sXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IE1hdHJpeChyZXN1bHQpO1xufTtcblxuXG5cblxuTWF0cml4LnByb3RvdHlwZS5taW51c18gPSBmdW5jdGlvbihvcDIpIHtcbiAgdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgIHJvd3MgPSB0aGlzLnJvd3MsIFxuICAgIGNvbHMgPSB0aGlzLmNvbHMsXG4gICAgb3AyRGF0YSA9IG9wMi5kYXRhLFxuICAgIHJvd3MyID0gb3AyLnJvd3MsXG4gICAgY29sczIgPSBvcDIuY29scztcblxuICBpZiAocm93cyAhPT0gcm93czIgfHwgY29scyAhPT0gY29sczIpIHtcbiAgICBfdGhyb3dTaXplTWlzbWF0Y2hFcnJvcignbWludXNfJywgdGhpcywgb3AyKTtcbiAgfVxuICBcbiAgdmFyIHJvdywgY29sO1xuXG4gIGZvciAocm93PTA7IHJvdzxyb3dzOyArK3Jvdykge1xuICAgIGZvciAoY29sPTA7IGNvbDxjb2xzOyArK2NvbCkge1xuICAgICAgdGhpc0RhdGFbcm93XVtjb2xdID0gdGhpc0RhdGFbcm93XVtjb2xdIC0gb3AyRGF0YVtyb3ddW2NvbF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cblxuXG5cblxuXG5cblxuLyoqXG4gKiBAZmlsZU92ZXJ2aWV3ICBIaWdoIHByZWNpc2lvbiB2ZXJzaW9uLlxuICovXG5cblxuXG4vKipcbiAqIERvdCBwcm9kdWN0LlxuICogXG4gKiBAcGFyYW0gIHtNYXRyaXh9IGFyZyBBIE1hdHJpeC5cbiAqIFxuICogQHJldHVybiB7TWF0cml4fVxuICovXG5NYXRyaXgucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uKG9wMikge1xuICB2YXIgdGhpc0RhdGEgPSB0aGlzLmRhdGEsXG4gICAgcm93cyA9IHRoaXMucm93cywgXG4gICAgY29scyA9IHRoaXMuY29scyxcbiAgICBvcDJEYXRhID0gb3AyLmRhdGEsXG4gICAgcm93czIgPSBvcDIucm93cyxcbiAgICBjb2xzMiA9IG9wMi5jb2xzO1xuXG4gIGlmIChjb2xzICE9PSByb3dzMikge1xuICAgIF90aHJvd1NpemVNaXNtYXRjaEVycm9yKCdkb3QnLCB0aGlzLCBvcDIpO1xuICB9XG5cbiAgLy8gb3AxID0gbSB4IG5cbiAgLy8gb3AyID0gbTIgeCBuMlxuICAvLyBvcDEgKiBvcDIgPT4gbSB4IG4yXG5cbiAgdmFyIHJvdywgcm93MiwgY29sMiwgdG1wO1xuXG4gIHZhciByZXN1bHQgPSBuZXcgQXJyYXkocm93cyk7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgcmVzdWx0W3Jvd10gPSBuZXcgQXJyYXkoY29sczIpO1xuXG4gICAgZm9yIChjb2wyPTA7IGNvbDI8Y29sczI7ICsrY29sMikge1xuICAgICAgdG1wID0gbmV3IEFycmF5KHJvd3MyKTtcblxuICAgICAgZm9yIChyb3cyPTA7IHJvdzI8cm93czI7ICsrcm93Mikge1xuICAgICAgICB0bXBbcm93Ml0gPSB0aGlzRGF0YVtyb3ddW3JvdzJdICogb3AyRGF0YVtyb3cyXVtjb2wyXTtcbiAgICAgIH1cblxuICAgICAgcmVzdWx0W3Jvd11bY29sMl0gPSBhZGRlcih0bXApO1xuICAgIH1cbiAgfSAgXG5cbiAgcmV0dXJuIG5ldyBNYXRyaXgocmVzdWx0KTtcbn07XG5cblxuXG5cbi8qKlxuICogSW4tcGxhY2UgdmVyc2lvbiBvZiBkb3QoKVxuICogXG4gKiBAcmV0dXJuIHRoaXNcbiAqL1xuTWF0cml4LnByb3RvdHlwZS5kb3RfID0gZnVuY3Rpb24ob3AyKSB7XG4gIHZhciB0aGlzRGF0YSA9IHRoaXMuZGF0YSxcbiAgICByb3dzID0gdGhpcy5yb3dzLCBcbiAgICBjb2xzID0gdGhpcy5jb2xzLFxuICAgIG9wMkRhdGEgPSBvcDIuZGF0YSxcbiAgICByb3dzMiA9IG9wMi5yb3dzLFxuICAgIGNvbHMyID0gb3AyLmNvbHM7XG5cbiAgaWYgKGNvbHMgIT09IHJvd3MyKSB7XG4gICAgX3Rocm93U2l6ZU1pc21hdGNoRXJyb3IoJ2RvdF8nLCB0aGlzLCBvcDIpO1xuICB9XG5cbiAgLy8gb3AxID0gbSB4IG5cbiAgLy8gb3AyID0gbTIgeCBuMlxuICAvLyBvcDEgKiBvcDIgPT4gbSB4IG4yXG5cbiAgdmFyIHJvdywgcm93MiwgY29sMiwgdG1wLCB0bXAyO1xuXG4gIGZvciAocm93PTA7IHJvdzxyb3dzOyArK3Jvdykge1xuICAgIC8vIHdlIG5lZWQgdG8ga2VlcCBhIGNvcHkgb2YgdGhpcyByb3cgc2luY2Ugd2UnbGwgYmUgb3ZlcndyaXRpbmcgaXQgaW4gdGhpcy5kYXRhXG4gICAgdG1wID0gdGhpc0RhdGFbcm93XS5zbGljZSgwLCBjb2xzKTtcblxuICAgIGZvciAoY29sMj0wOyBjb2wyPGNvbHMyOyArK2NvbDIpIHtcbiAgICAgIHRtcDIgPSBuZXcgQXJyYXkocm93czIpO1xuXG4gICAgICBmb3IgKHJvdzI9MDsgcm93MjxvcDIucm93czsgKytyb3cyKSB7XG4gICAgICAgIHRtcDJbcm93Ml0gPSB0bXBbcm93Ml0gKiBvcDJEYXRhW3JvdzJdW2NvbDJdO1xuICAgICAgfVxuXG4gICAgICB0aGlzRGF0YVtyb3ddW2NvbDJdID0gYWRkZXIodG1wMik7XG4gICAgfVxuICB9ICBcblxuICAvLyB1cGRhdGUgZGltZW5zaW9uc1xuICB0aGlzLmNvbHMgPSBjb2xzMjtcblxuICByZXR1cm4gdGhpcztcbn07XG5cblxuXG5cblxuLyoqXG4gKiBAZmlsZU92ZXJ2aWV3ICBIaWdoIHByZWNpc2lvbiB2ZXJzaW9uLlxuICovXG5cblxuXG5cbi8qKlxuICogU3VtIGV2ZXJ5IGVsZW1lbnQuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cbk1hdHJpeC5wcm90b3R5cGUuZ2V0U3VtID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgIHJvd3MgPSB0aGlzLnJvd3MsXG4gICAgY29scyA9IHRoaXMuY29scztcblxuICB2YXIgc3VtID0gbmV3IEFycmF5KHJvd3MgKiBjb2xzKTtcblxuICBmb3IgKHZhciBpID0gMCwgakJhc2UgPSAwOyBpPHJvd3M7ICsraSwgakJhc2UgKz0gY29scykge1xuICAgIGZvciAodmFyIGogPSAwOyBqPGNvbHM7ICsraikge1xuICAgICAgc3VtW2pCYXNlICsgal0gPSB0aGlzRGF0YVtpXVtqXTtcbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiBhZGRlcihzdW0pOyBcbn07XG5cbi8qKlxuICogQXBwbHkgZnVuY3Rpb24gdG8gYWxsIGVsZW1lbnRzIGluIHRoaXMgbWF0cml4LlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybUZuIFdpdGggc2lnbmF0dXJlIChkb3VibGUpID0+IGRvdWJsZVxuICovXG5NYXRyaXgucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uKHRyYW5zZm9ybUZuKSB7XG4gIHZhciB0aGlzRGF0YSA9IHRoaXMuZGF0YSxcbiAgICByb3dzID0gdGhpcy5yb3dzLFxuICAgIGNvbHMgPSB0aGlzLmNvbHM7XG5cbiAgdmFyIHJvdywgY29sLCByZXN1bHQgPSBuZXcgQXJyYXkocm93cyk7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgcmVzdWx0W3Jvd10gPSBuZXcgQXJyYXkoY29scyk7XG5cbiAgICBmb3IgKGNvbD0wOyBjb2w8Y29sczsgKytjb2wpIHtcbiAgICAgIHJlc3VsdFtyb3ddW2NvbF0gPSB0cmFuc2Zvcm1Gbih0aGlzRGF0YVtyb3ddW2NvbF0pO1xuICAgIH1cbiAgfSAgXG5cbiAgcmV0dXJuIG5ldyBNYXRyaXgocmVzdWx0KTtcbn07XG5cblxuXG5cblxuTWF0cml4LnByb3RvdHlwZS5tYXBfID0gZnVuY3Rpb24odHJhbnNmb3JtRm4pIHtcbiAgdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgIHJvd3MgPSB0aGlzLnJvd3MsXG4gICAgY29scyA9IHRoaXMuY29scztcblxuICB2YXIgcm93LCBjb2w7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgZm9yIChjb2w9MDsgY29sPGNvbHM7ICsrY29sKSB7XG4gICAgICB0aGlzRGF0YVtyb3ddW2NvbF0gPSB0cmFuc2Zvcm1Gbih0aGlzRGF0YVtyb3ddW2NvbF0pO1xuICAgIH1cbiAgfSAgXG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cblxuXG5cblxuLyoqXG4gKiBDYWxjdWxhdGUgdGhlIG5hdHVyYWwgbG9nIChsbikgYWxsIHRoZSBlbGVtZW50cy5cbiAqL1xuTWF0cml4LnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbih1bmRlZmluZWQpIHtcbiAgdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgIHJvd3MgPSB0aGlzLnJvd3MsXG4gICAgY29scyA9IHRoaXMuY29scztcblxuICB2YXIgcm93LCBjb2wsIHJlc3VsdCA9IG5ldyBBcnJheShyb3dzKTtcblxuICBmb3IgKHJvdz0wOyByb3c8cm93czsgKytyb3cpIHtcbiAgICByZXN1bHRbcm93XSA9IG5ldyBBcnJheShjb2xzKTtcblxuICAgIGZvciAoY29sPTA7IGNvbDxjb2xzOyArK2NvbCkge1xuICAgICAgcmVzdWx0W3Jvd11bY29sXSA9IE1hdGgubG9nKHRoaXNEYXRhW3Jvd11bY29sXSk7XG4gICAgfVxuICB9ICBcblxuICByZXR1cm4gbmV3IE1hdHJpeChyZXN1bHQpO1xufTtcblxuXG5cblxuXG5NYXRyaXgucHJvdG90eXBlLmxvZ18gPSBmdW5jdGlvbih1bmRlZmluZWQpIHtcbiAgdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgIHJvd3MgPSB0aGlzLnJvd3MsXG4gICAgY29scyA9IHRoaXMuY29scztcblxuICB2YXIgcm93LCBjb2w7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgZm9yIChjb2w9MDsgY29sPGNvbHM7ICsrY29sKSB7XG4gICAgICB0aGlzRGF0YVtyb3ddW2NvbF0gPSBNYXRoLmxvZyh0aGlzRGF0YVtyb3ddW2NvbF0pO1xuICAgIH1cbiAgfSAgXG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cblxuXG5cblxuLyoqXG4gKiBDYWxjdWxhdGUgdGhlIHNpZ21vaWQgZnVuY3Rpb24gb2YgYWxsIHRoZSBlbGVtZW50cy5cbiAqXG4gKiBTZWUgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9TaWdtb2lkX2Z1bmN0aW9uXG4gKi9cbk1hdHJpeC5wcm90b3R5cGUuc2lnbW9pZCA9IGZ1bmN0aW9uKHVuZGVmaW5lZCkge1xuICB2YXIgdGhpc0RhdGEgPSB0aGlzLmRhdGEsXG4gICAgcm93cyA9IHRoaXMucm93cyxcbiAgICBjb2xzID0gdGhpcy5jb2xzO1xuXG4gIHZhciByb3csIGNvbCwgcmVzdWx0ID0gbmV3IEFycmF5KHJvd3MpO1xuXG4gIGZvciAocm93PTA7IHJvdzxyb3dzOyArK3Jvdykge1xuICAgIHJlc3VsdFtyb3ddID0gbmV3IEFycmF5KGNvbHMpO1xuXG4gICAgZm9yIChjb2w9MDsgY29sPGNvbHM7ICsrY29sKSB7XG4gICAgICByZXN1bHRbcm93XVtjb2xdID0gKDEgLyAoMSArIE1hdGguZXhwKC10aGlzRGF0YVtyb3ddW2NvbF0pKSk7XG4gICAgfVxuICB9ICBcblxuICByZXR1cm4gbmV3IE1hdHJpeChyZXN1bHQpO1xufTtcblxuXG5cblxuXG5NYXRyaXgucHJvdG90eXBlLnNpZ21vaWRfID0gZnVuY3Rpb24odW5kZWZpbmVkKSB7XG4gIHZhciB0aGlzRGF0YSA9IHRoaXMuZGF0YSxcbiAgICByb3dzID0gdGhpcy5yb3dzLFxuICAgIGNvbHMgPSB0aGlzLmNvbHM7XG5cbiAgdmFyIHJvdywgY29sO1xuXG4gIGZvciAocm93PTA7IHJvdzxyb3dzOyArK3Jvdykge1xuICAgIGZvciAoY29sPTA7IGNvbDxjb2xzOyArK2NvbCkge1xuICAgICAgdGhpc0RhdGFbcm93XVtjb2xdID0gKDEgLyAoMSArIE1hdGguZXhwKC10aGlzRGF0YVtyb3ddW2NvbF0pKSk7XG4gICAgfVxuICB9ICBcblxuICByZXR1cm4gdGhpcztcbn07XG5cblxuXG5cblxuLyoqXG4gKiBNdWx0aXBseSBldmVyeSBlbGVtZW50IHdpdGggZ2l2ZW4gdmFsdWUuXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IHZhbHVlIFZhbHVlIHRvIG11bHRpcGxlIHdpdGguXG4gKi9cbk1hdHJpeC5wcm90b3R5cGUubXVsRWFjaCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhciB0aGlzRGF0YSA9IHRoaXMuZGF0YSxcbiAgICByb3dzID0gdGhpcy5yb3dzLFxuICAgIGNvbHMgPSB0aGlzLmNvbHM7XG5cbiAgdmFyIHJvdywgY29sLCByZXN1bHQgPSBuZXcgQXJyYXkocm93cyk7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgcmVzdWx0W3Jvd10gPSBuZXcgQXJyYXkoY29scyk7XG5cbiAgICBmb3IgKGNvbD0wOyBjb2w8Y29sczsgKytjb2wpIHtcbiAgICAgIHJlc3VsdFtyb3ddW2NvbF0gPSB0aGlzRGF0YVtyb3ddW2NvbF0gKiB2YWx1ZTtcbiAgICB9XG4gIH0gIFxuXG4gIHJldHVybiBuZXcgTWF0cml4KHJlc3VsdCk7XG59O1xuXG5cblxuXG5cbk1hdHJpeC5wcm90b3R5cGUubXVsRWFjaF8gPSBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIgdGhpc0RhdGEgPSB0aGlzLmRhdGEsXG4gICAgcm93cyA9IHRoaXMucm93cyxcbiAgICBjb2xzID0gdGhpcy5jb2xzO1xuXG4gIHZhciByb3csIGNvbDtcblxuICBmb3IgKHJvdz0wOyByb3c8cm93czsgKytyb3cpIHtcbiAgICBmb3IgKGNvbD0wOyBjb2w8Y29sczsgKytjb2wpIHtcbiAgICAgIHRoaXNEYXRhW3Jvd11bY29sXSA9IHRoaXNEYXRhW3Jvd11bY29sXSAqIHZhbHVlO1xuICAgIH1cbiAgfSAgXG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cblxuXG5cblxuLyoqXG4gKiBBZGQgYSB2YWx1ZSB0byBldmVyeSBlbGVtZW50LlxuICogQHBhcmFtICB7TnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byBtdWx0aXBsZSB3aXRoLlxuICovXG5NYXRyaXgucHJvdG90eXBlLnBsdXNFYWNoID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgIHJvd3MgPSB0aGlzLnJvd3MsXG4gICAgY29scyA9IHRoaXMuY29scztcblxuICB2YXIgcm93LCBjb2wsIHJlc3VsdCA9IG5ldyBBcnJheShyb3dzKTtcblxuICBmb3IgKHJvdz0wOyByb3c8cm93czsgKytyb3cpIHtcbiAgICByZXN1bHRbcm93XSA9IG5ldyBBcnJheShjb2xzKTtcblxuICAgIGZvciAoY29sPTA7IGNvbDxjb2xzOyArK2NvbCkge1xuICAgICAgcmVzdWx0W3Jvd11bY29sXSA9IHRoaXNEYXRhW3Jvd11bY29sXSArIHZhbHVlO1xuICAgIH1cbiAgfSAgXG5cbiAgcmV0dXJuIG5ldyBNYXRyaXgocmVzdWx0KTtcbn07XG5cblxuXG5cblxuTWF0cml4LnByb3RvdHlwZS5wbHVzRWFjaF8gPSBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIgdGhpc0RhdGEgPSB0aGlzLmRhdGEsXG4gICAgcm93cyA9IHRoaXMucm93cyxcbiAgICBjb2xzID0gdGhpcy5jb2xzO1xuXG4gIHZhciByb3csIGNvbDtcblxuICBmb3IgKHJvdz0wOyByb3c8cm93czsgKytyb3cpIHtcbiAgICBmb3IgKGNvbD0wOyBjb2w8Y29sczsgKytjb2wpIHtcbiAgICAgIHRoaXNEYXRhW3Jvd11bY29sXSA9IHRoaXNEYXRhW3Jvd11bY29sXSArIHZhbHVlO1xuICAgIH1cbiAgfSAgXG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cblxuXG5cbi8qKlxuICogQXBwbHkgZnVuY3Rpb24gd2l0aCByb3cgYW5kIGNvbHVtbiBwYXJhbWV0ZXJzIHRvIGFsbCBlbGVtZW50cyBpbiBtYXRyaXhcbiAqXG4gKiBVc2VkIHRvIGFwcGx5IGRpZmZlcmVudCB0cmFuc2Zvcm1hdGlvbnMgZGVwZW5kaW5nIG9uIHBsYWNlbWVudCBpbiBtYXRyaXguXG4gKi9cbk1hdHJpeC5wcm90b3R5cGUuZWxlTWFwID0gZnVuY3Rpb24odHJhbnNmb3JtRm4pIHtcbiAgdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgIHJvd3MgPSB0aGlzLnJvd3MsXG4gICAgY29scyA9IHRoaXMuY29scztcblxuICB2YXIgcm93LCBjb2wsIHJlc3VsdCA9IG5ldyBBcnJheShyb3dzKTtcblxuICBmb3IgKHJvdz0wOyByb3c8cm93czsgKytyb3cpIHtcbiAgICByZXN1bHRbcm93XSA9IG5ldyBBcnJheShjb2xzKTtcblxuICAgIGZvciAoY29sPTA7IGNvbDxjb2xzOyArK2NvbCkge1xuICAgICAgcmVzdWx0W3Jvd11bY29sXSA9IHRyYW5zZm9ybUZuKHRoaXNEYXRhW3Jvd11bY29sXSwgcm93LCBjb2wpO1xuICAgIH1cbiAgfSAgXG5cbiAgcmV0dXJuIG5ldyBNYXRyaXgocmVzdWx0KTtcbn07XG5cblxuXG5cblxuTWF0cml4LnByb3RvdHlwZS5lbGVNYXBfID0gZnVuY3Rpb24odHJhbnNmb3JtRm4pIHtcbiAgdmFyIHRoaXNEYXRhID0gdGhpcy5kYXRhLFxuICAgIHJvd3MgPSB0aGlzLnJvd3MsXG4gICAgY29scyA9IHRoaXMuY29scztcblxuICB2YXIgcm93LCBjb2w7XG5cbiAgZm9yIChyb3c9MDsgcm93PHJvd3M7ICsrcm93KSB7XG4gICAgZm9yIChjb2w9MDsgY29sPGNvbHM7ICsrY29sKSB7XG4gICAgICB0aGlzRGF0YVtyb3ddW2NvbF0gPSB0cmFuc2Zvcm1Gbih0aGlzRGF0YVtyb3ddW2NvbF0sIHJvdywgY29sKTtcbiAgICB9XG4gIH0gIFxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuXG5cblxuXG5cblxuICAgIHJldHVybiBMaW5BbGc7XG4gIH07XG59KTtcblxuIiwidmFyIG5vcm1hbCA9IHJlcXVpcmUoJy4vZGlzdC9saW5lYXItYWxnZWJyYScpLFxuICBwcmVjaXNpb24gPSByZXF1aXJlKCcuL2Rpc3QvbGluZWFyLWFsZ2VicmEucHJlY2lzaW9uJyk7XG5cblxuLyoqIFxuICogSW5pdGlhbGlzZSB0aGUgbGlicmFyeS5cbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQWRkaXRpb25hbCBvcHRpb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuYWRkXSBGdW5jdGlvbiB0byBhZGQgZmxvYXRpbmcgcG9pbnQgbnVtYmVycy5cbiAqIFxuICogQHJldHVybiB7T2JqZWN0fSBMaW5lYXIgYWxnZWJyYSBwcmltaXRpdmVzLlxuICovXG52YXIgbGluZWFyQWxnZWJyYSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgXG4gIGlmIChvcHRpb25zLmFkZCkge1xuICAgIHJldHVybiBsaW5lYXJBbGdlYnJhLl9wcmVjaXNpb24ob3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpbmVhckFsZ2VicmEuX25vcm1hbChvcHRpb25zKTtcbiAgfVxufTtcblxuXG4vLyB0byBtYWtlIHRlc3RpbmcgZWFzaWVyXG5saW5lYXJBbGdlYnJhLl9ub3JtYWwgPSBub3JtYWw7XG5saW5lYXJBbGdlYnJhLl9wcmVjaXNpb24gPSBwcmVjaXNpb247XG5cbiIsImltcG9ydCAqIGFzIGxpbmVhckFsZ2VicmEgZnJvbSAnbGluZWFyLWFsZ2VicmEnO1xuY29uc3QgbGEgPSBsaW5lYXJBbGdlYnJhKCk7XG5cbmV4cG9ydCBjbGFzcyBOZXVyYWxDb3JlIHtcbiAgcHJpdmF0ZSBpbnB1dFNpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSBoaWRkZW5MYXllclNpemVzOiBudW1iZXJbXTtcbiAgcHJpdmF0ZSBvdXRwdXRTaXplOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSB3ZWlnaHRzOiBsYS5NYXRyaXhbXTtcbiAgXG4gIHByaXZhdGUgdHJhaW5UYXJnZXQ6IGxhLk1hdHJpeDtcbiAgcHJpdmF0ZSB0cmFpbklucHV0OiBsYS5NYXRyaXg7XG5cbiAgcHJpdmF0ZSByYXRlID0gMTtcblxuICBwdWJsaWMgaW5pdE5ldHdvcmsoXG4gICAgICBpbnB1dFNpemU6IG51bWJlciwgaGlkZGVuTGF5ZXJTaXplczogbnVtYmVyW10sIG91dHB1dFNpemU6IG51bWJlcixcbiAgICAgIHJhbmRvbUluaXQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmlucHV0U2l6ZSA9IGlucHV0U2l6ZTtcbiAgICB0aGlzLmhpZGRlbkxheWVyU2l6ZXMgPSBoaWRkZW5MYXllclNpemVzO1xuICAgIHRoaXMub3V0cHV0U2l6ZSA9IG91dHB1dFNpemU7XG5cbiAgICBpZiAocmFuZG9tSW5pdCkge1xuICAgICAgdGhpcy53ZWlnaHRzID0gW107XG5cbiAgICAgIGlmIChoaWRkZW5MYXllclNpemVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoaWRkZW5MYXllclNpemVzLmxlbmd0aCArIDE7IGkrKykge1xuICAgICAgICAgIHN3aXRjaCAoaSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB0aGlzLndlaWdodHMucHVzaCh0aGlzLnJhbmRNYXRyaXgoaGlkZGVuTGF5ZXJTaXplc1swXSwgaW5wdXRTaXplKSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBoaWRkZW5MYXllclNpemVzLmxlbmd0aDpcbiAgICAgICAgICAgICAgdGhpcy53ZWlnaHRzLnB1c2godGhpcy5yYW5kTWF0cml4KG91dHB1dFNpemUsIGhpZGRlbkxheWVyU2l6ZXNbaS0xXSkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHRoaXMud2VpZ2h0cy5wdXNoKHRoaXMucmFuZE1hdHJpeChoaWRkZW5MYXllclNpemVzW2ldLCBoaWRkZW5MYXllclNpemVzW2ktMV0pKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLndlaWdodHMucHVzaCh0aGlzLnJhbmRNYXRyaXgob3V0cHV0U2l6ZSwgaW5wdXRTaXplKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETyBmb3IgZWFjaCBleGFtcGxlXG4gIHB1YmxpYyBzZXRUcmFpbmluZ1NldChpbnB1dDogbnVtYmVyW10sIG91dHB1dDogbnVtYmVyW10pIHtcbiAgICB0aGlzLnRyYWluVGFyZ2V0ID0gbmV3IGxhLk1hdHJpeChvdXRwdXQpO1xuICAgIHRoaXMudHJhaW5JbnB1dCA9IG5ldyBsYS5NYXRyaXgoaW5wdXQpO1xuICB9XG5cbiAgcHVibGljIGV2YWx1YXRlKGlucHV0OiBudW1iZXJbXSk6IGxhLk1hdHJpeFtdIHtcbiAgICBpZiAoaW5wdXQubGVuZ3RoICE9IHRoaXMuaW5wdXRTaXplKSB7XG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBpbnB1dCBzaXplLCBzaG91bGQgYmUgJHt0aGlzLmlucHV0U2l6ZX0uYCk7XG4gICAgfVxuXG4gICAgY29uc3QgbmV1cm9ucyA9IFtdO1xuXG4gICAgLy8gRm9yd2FyZCBwcm9wYWdhdGlvblxuICAgIGxldCBjdXJyTGF5ZXIgPSBuZXcgbGEuTWF0cml4KGlucHV0KS50cmFucygpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5oaWRkZW5MYXllclNpemVzLmxlbmd0aCArIDE7IGkrKykge1xuICAgICAgbmV1cm9ucy5wdXNoKGN1cnJMYXllcik7XG4gICAgICBjdXJyTGF5ZXIgPSB0aGlzLndlaWdodHNbaV0uZG90KGN1cnJMYXllcikuc2lnbW9pZCgpO1xuICAgIH1cblxuICAgIG5ldXJvbnMucHVzaChjdXJyTGF5ZXIpO1xuXG4gICAgcmV0dXJuIG5ldXJvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29zdCgpOiBudW1iZXIge1xuICAgIGNvbnN0IG91dHB1dExheWVyID0gdGhpcy5ldmFsdWF0ZSh0aGlzLnRyYWluSW5wdXQuZGF0YVswXSlbdGhpcy53ZWlnaHRzLmxlbmd0aF07XG5cbiAgICByZXR1cm4gKDEvMikgKiBvdXRwdXRMYXllci5taW51cyh0aGlzLnRyYWluVGFyZ2V0LnRyYW5zKCkpLm1hcCgoeCkgPT4ge3JldHVybiB4KioyO30pLmdldFN1bSgpO1xuICB9XG5cbiAgcHVibGljIHRyYWluKCkge1xuICAgIGNvbnN0IEwgPSB0aGlzLndlaWdodHMubGVuZ3RoO1xuICAgIFxuICAgIC8vIENvbXB1dGUgZWFjaCBsYXllclxuICAgIGxldCB4ID0gdGhpcy5ldmFsdWF0ZSh0aGlzLnRyYWluSW5wdXQuZGF0YVswXSk7XG5cbiAgICAvLyBMYXN0IGxheWVyXG4gICAgY29uc3Qgc2lnbWFzID0gW107XG4gICAgc2lnbWFzW0xdID0geFtMXS5tdWwoeFtMXS5wbHVzRWFjaCgtMSkpLm11bCh4W0xdLm1pbnVzKHRoaXMudHJhaW5UYXJnZXQudHJhbnMoKSkpO1xuXG4gICAgLy8gQWxsIGhpZGRlbiBsYXllcnNcbiAgICBmb3IgKGxldCBpPUwtMTsgaT49MTtpLS0pIHtcbiAgICAgIHNpZ21hc1tpXSA9IHhbaV0ubXVsKHhbaV0ucGx1c0VhY2goLTEpKS5tdWxFYWNoKC0xKS5tdWwoKHhbaSsxXS50cmFucygpLmRvdCh0aGlzLndlaWdodHNbaV0pKS50cmFucygpKTtcbiAgICB9XG4gICAgc2lnbWFzLnNoaWZ0KCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKCdzaWdtYXM6ICcsIHNpZ21hcyk7XG4gICAgLy9jb25zb2xlLmxvZygnd2VpZ2h0czogJywgdGhpcy53ZWlnaHRzLm1hcCgobSkgPT4gbS5kYXRhKSk7XG4gICAgLy9jb25zb2xlLmxvZygneDogJywgeC5tYXAoKG0pID0+IG0uZGF0YSkpO1xuXG4gICAgLy8gVXBkYXRlIGFsbCB3ZWlnaHRzXG4gICAgZm9yIChsZXQgaj0wO2o8TDtqKyspIHtcbiAgICAgIHRoaXMud2VpZ2h0c1tqXSA9IHRoaXMud2VpZ2h0c1tqXS5wbHVzKChzaWdtYXNbal0uZG90KHhbal0udHJhbnMoKSkpKTsgXG4gICAgfVxuXG4gICAgeCA9IHRoaXMuZXZhbHVhdGUodGhpcy50cmFpbklucHV0LmRhdGFbMF0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCd4OiAnLCB4W0xdLmRhdGEpO1xuICB9XG5cbiAgcHJpdmF0ZSByYW5kTWF0cml4KGhlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyKTogbGEuTWF0cml4IHtcbiAgICBjb25zdCByZXMgPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGhlaWdodDsgaisrKSB7XG4gICAgICBsZXQgcm93ID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgICAgcm93LnB1c2goTWF0aC5yYW5kb20oKSk7XG4gICAgICB9XG4gICAgICByZXMucHVzaChyb3cpO1xuICAgIH1cbiAgICBjb25zdCBtID0gIG5ldyBsYS5NYXRyaXgocmVzKTtcbiAgICBcbiAgICByZXR1cm4gbTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFZpc3VhbGl6ZXIge1xuICBcbiAgcHJpdmF0ZSBjb250ZW50OiBIVE1MRWxlbWVudDsgXG5cbiAgY29uc3RydWN0b3IoY29udGVudDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICB9XG5cbiAgcHVibGljIHByaW50TnVtYmVyID0gKG51bTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5jb250ZW50LmlubmVyVGV4dCA9IGAke251bX1gO1xuICB9XG59XG4iLCJpbXBvcnQge1Zpc3VhbGl6ZXJ9IGZyb20gJy4vVmlzdWFsaXplJztcbmltcG9ydCB7TmV1cmFsQ29yZX0gZnJvbSAnLi9OZXVyYWxDb3JlJztcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgbWFpbigpO1xufTtcblxubGV0IG5ldXJhbENvcmU6IE5ldXJhbENvcmU7XG5sZXQgdmlzdWFsaXplcjogVmlzdWFsaXplcjtcblxuY29uc3QgbWFpbiA9ICgpID0+IHtcbiAgY29uc3QgY29udGVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpO1xuICB2aXN1YWxpemVyID0gbmV3IFZpc3VhbGl6ZXIoY29udGVudCk7XG4gIG5ldXJhbENvcmUgPSBuZXcgTmV1cmFsQ29yZSgpO1xuXG4gIG5ldXJhbENvcmUuaW5pdE5ldHdvcmsoMiwgWzJdLCAyLCB0cnVlKTtcbiAgXG4gIG5ldXJhbENvcmUuc2V0VHJhaW5pbmdTZXQoWzEsMV0sIFswLDFdKTtcbiAgZm9yIChsZXQgaSA9IDA7IGk8MTAwMDsgaSsrKSB7XG4gICAgbmV1cmFsQ29yZS50cmFpbigpO1xuICB9XG4gIFxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==