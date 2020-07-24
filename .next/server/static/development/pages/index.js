module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _jsxFileName = \"/Users/digital/Projects/book/src/pages/index.js\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n/* eslint-disable react/react-in-jsx-scope */\nconst hero = () => __jsx(\"div\", {\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 2,\n    columnNumber: 20\n  }\n}, \"hero\");\n\nconst search = () => __jsx(\"div\", {\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 3,\n    columnNumber: 22\n  }\n}, \"search\");\n\nconst categories = () => __jsx(\"div\", {\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 4,\n    columnNumber: 26\n  }\n}, \"categories\");\n\nconst books_feed = () => __jsx(\"div\", {\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 5,\n    columnNumber: 26\n  }\n}, \"books_feed\");\n\nconst chapters_feed = () => __jsx(\"div\", {\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 6,\n    columnNumber: 29\n  }\n}, \"chapters_feed\");\n\nconst organisms = {\n  hero,\n  search,\n  categories,\n  books_feed,\n  chapters_feed\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => __jsx(\"div\", {\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 17,\n    columnNumber: 3\n  }\n}, __jsx(organisms.hero, {\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 18,\n    columnNumber: 5\n  }\n}), __jsx(organisms.search, {\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 19,\n    columnNumber: 5\n  }\n}), __jsx(organisms.categories, {\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 20,\n    columnNumber: 5\n  }\n}), __jsx(organisms.books_feed, {\n  title: \"Trending\",\n  sort: \"trending\",\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 21,\n    columnNumber: 5\n  }\n}), __jsx(organisms.books_feed, {\n  title: \"Latest series\",\n  sort: \"newest\",\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 22,\n    columnNumber: 5\n  }\n}), __jsx(organisms.chapters_feed, {\n  title: \"Latest updates\",\n  sort: \"newest\",\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 23,\n    columnNumber: 5\n  }\n})));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvaW5kZXguanM/NDU3MCJdLCJuYW1lcyI6WyJoZXJvIiwic2VhcmNoIiwiY2F0ZWdvcmllcyIsImJvb2tzX2ZlZWQiLCJjaGFwdGVyc19mZWVkIiwib3JnYW5pc21zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQSxNQUFNQSxJQUFJLEdBQUcsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBQW5COztBQUNBLE1BQU1DLE1BQU0sR0FBRyxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFBckI7O0FBQ0EsTUFBTUMsVUFBVSxHQUFHLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFBekI7O0FBQ0EsTUFBTUMsVUFBVSxHQUFHLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFBekI7O0FBQ0EsTUFBTUMsYUFBYSxHQUFHLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBNUI7O0FBRUEsTUFBTUMsU0FBUyxHQUFHO0FBQ2hCTCxNQURnQjtBQUVoQkMsUUFGZ0I7QUFHaEJDLFlBSGdCO0FBSWhCQyxZQUpnQjtBQUtoQkM7QUFMZ0IsQ0FBbEI7QUFRZSxxRUFDYjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQ0UsTUFBQyxTQUFELENBQVcsSUFBWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBREYsRUFFRSxNQUFDLFNBQUQsQ0FBVyxNQUFYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFGRixFQUdFLE1BQUMsU0FBRCxDQUFXLFVBQVg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUhGLEVBSUUsTUFBQyxTQUFELENBQVcsVUFBWDtBQUFzQixPQUFLLEVBQUMsVUFBNUI7QUFBdUMsTUFBSSxFQUFDLFVBQTVDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFKRixFQUtFLE1BQUMsU0FBRCxDQUFXLFVBQVg7QUFBc0IsT0FBSyxFQUFDLGVBQTVCO0FBQTRDLE1BQUksRUFBQyxRQUFqRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTEYsRUFNRSxNQUFDLFNBQUQsQ0FBVyxhQUFYO0FBQXlCLE9BQUssRUFBQyxnQkFBL0I7QUFBZ0QsTUFBSSxFQUFDLFFBQXJEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFORixDQURGIiwiZmlsZSI6Ii4vc3JjL3BhZ2VzL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcmVhY3QtaW4tanN4LXNjb3BlICovXG5jb25zdCBoZXJvID0gKCkgPT4gPGRpdj5oZXJvPC9kaXY+XG5jb25zdCBzZWFyY2ggPSAoKSA9PiA8ZGl2PnNlYXJjaDwvZGl2PlxuY29uc3QgY2F0ZWdvcmllcyA9ICgpID0+IDxkaXY+Y2F0ZWdvcmllczwvZGl2PlxuY29uc3QgYm9va3NfZmVlZCA9ICgpID0+IDxkaXY+Ym9va3NfZmVlZDwvZGl2PlxuY29uc3QgY2hhcHRlcnNfZmVlZCA9ICgpID0+IDxkaXY+Y2hhcHRlcnNfZmVlZDwvZGl2PlxuXG5jb25zdCBvcmdhbmlzbXMgPSB7XG4gIGhlcm8sXG4gIHNlYXJjaCxcbiAgY2F0ZWdvcmllcyxcbiAgYm9va3NfZmVlZCxcbiAgY2hhcHRlcnNfZmVlZCxcbn1cblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4gKFxuICA8ZGl2PlxuICAgIDxvcmdhbmlzbXMuaGVybyAvPlxuICAgIDxvcmdhbmlzbXMuc2VhcmNoIC8+XG4gICAgPG9yZ2FuaXNtcy5jYXRlZ29yaWVzIC8+XG4gICAgPG9yZ2FuaXNtcy5ib29rc19mZWVkIHRpdGxlPVwiVHJlbmRpbmdcIiBzb3J0PVwidHJlbmRpbmdcIiAvPlxuICAgIDxvcmdhbmlzbXMuYm9va3NfZmVlZCB0aXRsZT1cIkxhdGVzdCBzZXJpZXNcIiBzb3J0PVwibmV3ZXN0XCIgLz5cbiAgICA8b3JnYW5pc21zLmNoYXB0ZXJzX2ZlZWQgdGl0bGU9XCJMYXRlc3QgdXBkYXRlc1wiIHNvcnQ9XCJuZXdlc3RcIiAvPlxuICA8L2Rpdj5cbilcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/index.js\n");

/***/ }),

/***/ 3:
/*!**********************************!*\
  !*** multi ./src/pages/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/digital/Projects/book/src/pages/index.js */"./src/pages/index.js");


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ })

/******/ });