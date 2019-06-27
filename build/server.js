"use strict";

var _express = _interopRequireDefault(require("express"));

var _Party = _interopRequireDefault(require("./src/controllers/Party.js"));

var _User = _interopRequireDefault(require("./src/controllers/User"));

var _Office = _interopRequireDefault(require("./src/controllers/Office"));

var _Candidate = _interopRequireDefault(require("./src/controllers/Candidate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// server.js
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.get('/', function (req, res) {
  return res.status(200).send({
    'message': 'Congratulation! Endpoint is working!'
  });
});
app.post('/api/v1/parties', _Party["default"].create);
app.get('/api/v1/parties', _Party["default"].getAll);
app.get('/api/v1/parties/:id', _Party["default"].getOne);
app.put('/api/v1/parties/:id', _Party["default"].update);
app["delete"]('/api/v1/parties/:id', _Party["default"]["delete"]);
app.post('/api/v1/users', _User["default"].create);
app.get('/api/v1/users', _User["default"].getAll);
app.get('/api/v1/users/:id', _User["default"].getOne);
app.put('/api/v1/users/:id', _User["default"].update);
app["delete"]('/api/v1/users/:id', _User["default"]["delete"]);
app.post('/api/v1/offices', _Office["default"].create);
app.get('/api/v1/offices', _Office["default"].getAll);
app.get('/api/v1/offices/:id', _Office["default"].getOne);
app.put('/api/v1/offices/:id', _Office["default"].update);
app["delete"]('/api/v1/offices/:id', _Office["default"]["delete"]);
app.post('/api/v1/candidates', _Candidate["default"].create);
app.get('/api/v1/candidates', _Candidate["default"].getAll);
app.get('/api/v1/candidates/:id', _Candidate["default"].getAll);
app.put('/api/v1/candidates/:id', _Candidate["default"].update);
app["delete"]('/api/v1/candidates/:id', _Candidate["default"]["delete"]);
app.listen(3000);
console.log('app listening on port ', 3000);