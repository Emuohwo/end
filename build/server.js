"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// server.js
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _morgan["default"])('dev'));
(0, _index["default"])(app); // app.use('api/v1/');

app.listen(3000); // console.log('app listening on port ', 3000);

var _default = app;
exports["default"] = _default;