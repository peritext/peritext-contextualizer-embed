'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlockStatic = function BlockStatic(_ref, _ref2) {
  var resource = _ref.resource;
  var datasets = _ref2.datasets;

  var data = resource.data;
  var thumbnail = datasets[data.thumbnailDataset];
  if (thumbnail) {
    return _react2.default.createElement(
      'figure',
      { className: 'resource-thumbnail peritext-contextualization peritext-contextualization-block peritext-contextualization-codex peritext-contextualizer-embed' },
      _react2.default.createElement('img', {
        src: thumbnail.uri
      })
    );
  } else return data.html ? _react2.default.createElement('figure', {
    className: 'peritext-contextualization peritext-contextualization-block peritext-contextualization-codex peritext-contextualizer-embed',
    dangerouslySetInnerHTML: {
      __html: data.html
    } }) : null;
};

BlockStatic.propTypes = {
  resource: _propTypes2.default.object
};

BlockStatic.contextTypes = {
  datasets: _propTypes2.default.object
};

exports.default = BlockStatic;