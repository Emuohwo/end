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

var _Office = _interopRequireDefault(require("./src/usingDB/controllers/Office"));

var _Office2 = _interopRequireDefault(require("./src/usingJSObject/controllers/Office"));

var _Candidate = _interopRequireDefault(require("./src/usingDB/controllers/Candidate"));

var _Candidate2 = _interopRequireDefault(require("./src/usingJSObject/controllers/Candidate"));

var _Vote = _interopRequireDefault(require("./src/usingDB/controllers/Vote"));

var _User = _interopRequireDefault(require("./src/usingDB/controllers/User"));

var _Auth = _interopRequireDefault(require("./src/usingDB/middleware/Auth"));

var _index2 = require("./src/usingDB/middleware/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var Party = process.env.TYPE === 'db' ? _Party2["default"] : _Party["default"];
var Office = process.env.TYPE === 'db' ? _Office["default"] : _Office2["default"];
var Candidate = process.env.TYPE === 'db' ? _Candidate["default"] : _Candidate2["default"];
var Vote = process.env.TYPE === 'db' ? _Vote["default"] : _Vote["default"]; // const isAdmin = [
//   Auth.verifyToken,
//   Auth.isAdmin
// ]

var app = (0, _express["default"])();
var port = process.env.PORT || 3000;

var router = _express["default"].Router();

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: "false"
}));
app.use((0, _morgan["default"])('dev'));
(0, _index["default"])(app); // app.use('/api/v1/', router);

app.post('/api/parties', _Auth["default"].verifyToken, _index2.isAdmin, Party.create);
app.get('/api/parties', _Auth["default"].verifyToken, Party.getAll);
app.get('/api/parties/:id', _Auth["default"].verifyToken, Party.getOne);
app.patch('/api/parties/:id/name', _Auth["default"].verifyToken, Party.update);
app["delete"]('/api/parties/:id', _Auth["default"].verifyToken, _index2.isAdmin, Party["delete"]);
app.post('/auth/signup', _User["default"].create);
app.post('/auth/login', _User["default"].login);
app["delete"]('/api/users/me', _Auth["default"].verifyToken, _User["default"]["delete"]);
app.post('/api/offices', _Auth["default"].verifyToken, _index2.isAdmin, Office.create);
app.get('/api/offices', _Auth["default"].verifyToken, Office.getAll);
app.get('/api/offices/:id', _Auth["default"].verifyToken, Office.getOneOffice);
app.put('/api/offices/:id', _Auth["default"].verifyToken, _index2.isAdmin, Office.update);
app["delete"]('/api/offices/:id', _Auth["default"].verifyToken, _index2.isAdmin, Office["delete"]);
app.post('/api/office/:id/register', _Auth["default"].verifyToken, Candidate.createCandidate);
app.get('/api/candidates', _Auth["default"].verifyToken, Candidate.getAllCandidates);
app.get('/api/v1/candidates/:id', _Auth["default"].verifyToken, Candidate.getOneCandidate);
app.get('/api/v1/candidates/:office', _Auth["default"].verifyToken, Candidate.getCandidatesByOffice);
app.get('/api/v1/candidates/:party', _Auth["default"].verifyToken, Candidate.getCandidatesByParty);
app.put('/api/v1/candidates/:id', _Auth["default"].verifyToken, Candidate.updateOndeCandidate);
app["delete"]('/api/v1/candidates/:id', _Auth["default"].verifyToken, Candidate.deleteCandidate);
app.all('*', function (req, res) {
  res.status(404).send({
    status: 404,
    message: 'Not Found'
  });
});
app.post('/api/votes', _Auth["default"].verifyToken, Vote.createVote); // server

app.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log("Server Started On Port ".concat(port));
});
var _default = app;
exports["default"] = _default;