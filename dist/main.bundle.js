/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n//REQUIRE PACKAGES\nrequire('dotenv').config();\nconst express = require('express');\nconst axios = require('axios');\nconst {\n  MongoClient\n} = require(\"mongodb\");\nconst fs = require('fs');\nconst cardsTest = JSON.parse(fs.readFileSync('./card-data/test-cards.json'));\n\n//STARTING SERVICES\nconst app = express();\nconst dbUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.12mxfzp.mongodb.net/?retryWrites=true&w=majority`;\nconst db = new MongoClient(dbUrl);\n\n//IMPORT ROUTES\nconst postsRoute = require('./routes/posts');\nconst cardsRoute = require('./routes/cards');\napp.use('/posts', postsRoute);\napp.use('/cards', cardsRoute);\n\n// ROUTES\napp.get('/', (req, res) => {\n  res.sendFile(__dirname + '/dist/index.html');\n});\napp.get('/search-page', (req, res) => {\n  res.sendFile(__dirname + '/dist/index.html');\n});\napp.get('/post-test', (req, res) => {\n  console.log(\"You've accessed the post test page!\");\n  res.send('Testing MongoDB POST request');\n  axios.post(`https://data.mongodb-api.com/app/${process.env.MONGODB_API_APP_ID}/endpoint/data/v1/action/insertMany`, {\n    'dataSource': process.env.MONGODB_CLUSTER_NAME,\n    'database': \"Magic-Cards-Test\",\n    \"collection\": \"all-cards\",\n    \"documents\": cardsTest\n  }, {\n    headers: {\n      'Content-Type': 'application/json',\n      'apiKey': process.env.MONGODB_API_SECRET\n    }\n  }).catch(function (error) {\n    console.log(error);\n  });\n});\n\n//CONNECT TO DB\ndb.connect().then(() => {\n  console.log('You have successfully connected!');\n});\n\n// STARTING SERVER\napp.listen(3000);\n\n//# sourceURL=webpack://magic-api/./app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./app.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;