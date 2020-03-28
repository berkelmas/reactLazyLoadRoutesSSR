"use strict";

require("core-js");

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _component = require("@loadable/component");

var _App = _interopRequireDefault(require("./App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-extraneous-dependencies
(0, _component.loadableReady)(() => {
  const root = document.getElementById('main');
  (0, _reactDom.hydrate)( /*#__PURE__*/_react.default.createElement(_App.default, null), root);
});