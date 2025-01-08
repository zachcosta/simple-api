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

eval("__webpack_require__.r(__webpack_exports__);\n//REQUIRE PACKAGES\r\nrequire('dotenv').config();\r\nconst express = require('express');\r\nconst axios = require('axios');\r\nconst {MongoClient} = require(\"mongodb\");\r\nconst fs = require('fs');\r\n\r\nconst cardsTest = JSON.parse(fs.readFileSync('./card-data/test-cards.json'));\r\n\r\n//STARTING SERVICES\r\nconst app = express();\r\nconst dbUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.12mxfzp.mongodb.net/?retryWrites=true&w=majority`;\r\nconst db = new MongoClient(dbUrl);\r\n\r\n//IMPORT ROUTES\r\nconst postsRoute = require('./routes/posts');\r\nconst cardsRoute = require('./routes/cards');\r\n\r\napp.use('/posts', postsRoute);\r\napp.use('/cards', cardsRoute);\r\n\r\n// ROUTES\r\napp.get('/', (req,res) => {\r\n    res.sendFile(__dirname + '/dist/index.html');\r\n})\r\napp.get('/search-page', (req,res) => {\r\n    res.sendFile(__dirname + '/dist/index.html');\r\n})\r\napp.get('/post-test', (req,res) => {\r\n    console.log(\"You've accessed the post test page!\")\r\n    res.send('Testing MongoDB POST request');\r\n    axios.post(`https://data.mongodb-api.com/app/${process.env.MONGODB_API_APP_ID}/endpoint/data/v1/action/insertMany`, {\r\n        'dataSource': process.env.MONGODB_CLUSTER_NAME,\r\n        'database': \"Magic-Cards-Test\",\r\n        \"collection\": \"all-cards\",\r\n        \"documents\": cardsTest\r\n    }, {\r\n        headers: {\r\n            'Content-Type': 'application/json',\r\n            'apiKey': process.env.MONGODB_API_SECRET\r\n        }\r\n    }).catch(function (error) {\r\n        console.log(error);\r\n    })\r\n})\r\n\r\n//CONNECT TO DB\r\ndb.connect().then(() => {\r\n    console.log('You have successfully connected!')\r\n})\r\n\r\n// STARTING SERVER\r\napp.listen(3000);\n\n//# sourceURL=webpack://magic-api/./app.js?");

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