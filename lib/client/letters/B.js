"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// We simulate that "moment" is called in "A" and "B"
const B = () => 'B'; // We keep a reference to prevent uglify remove


B.moment = _moment.default;
var _default = B;
exports.default = _default;