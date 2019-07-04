"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("babel-polyfill");

var _index = _interopRequireDefault(require("./routes/index"));

var _Party = _interopRequireDefault(require("./src/usingJSObject/controllers/Party"));

var _Party2 = _interopRequireDefault(require("./src/usingDB/controllers/Party"));

var _User = _interopRequireDefault(require("./src/usingDB/controllers/User"));

var _Auth = _interopRequireDefault(require("./src/usingDB/middleware/Auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// deprecated
_dotenv["default"].config();

var Party = process.env.TYPE === 'db' ? _Party2["default"] : _Party["default"];
var app = (0, _express["default"])();

var router = _express["default"].Router();

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: "false"
}));
app.use((0, _morgan["default"])('dev'));
(0, _index["default"])(app); // app.use('/api/v1/', router);

app.post('/api/v1/parties', _Auth["default"].verifyToken, Party.create);
app.get('/api/v1/parties', _Auth["default"].verifyToken, Party.getAll);
app.get('/api/v1/parties/:id', _Auth["default"].verifyToken, Party.getOne);
app.put('/api/v1/parties/:id', _Auth["default"].verifyToken, Party.update);
app["delete"]('/api/v1/parties/:id', _Auth["default"].verifyToken, Party["delete"]);
app.post('/api/v1/users', _User["default"].create);
app.post('/api/v1/users/login', _User["default"].login);
app["delete"]('/api/v1/users/me', _Auth["default"].verifyToken, _User["default"]["delete"]);
app.listen(3000); // console.log('app listening on port ', 3000);

var _default = app;
exports["default"] = _default;