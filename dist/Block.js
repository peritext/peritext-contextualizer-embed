"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFullScreen = _interopRequireDefault(require("react-full-screen"));

var _meta = _interopRequireDefault(require("./meta"));

var _peritextUtils = require("peritext-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const FullableEmbed = ({
  html
}) => {
  const [isFullScreen, setFullScreen] = (0, _react.useState)(false);
  return [_react.default.createElement(_reactFullScreen.default, {
    key: 0,
    enabled: isFullScreen,
    onChange: newVal => setFullScreen(newVal)
  }, _react.default.createElement("div", {
    dangerouslySetInnerHTML: {
      /* eslint react/no-danger : 0 */
      __html: html
    }
  }), isFullScreen && _react.default.createElement("button", {
    key: 1,
    className: "fullscreen-btn",
    onClick: () => setFullScreen(false)
  }, "\u2756")), _react.default.createElement("button", {
    key: 1,
    className: "fullscreen-btn",
    onClick: () => setFullScreen(true)
  }, "\u2756")];
};

const Block = ({
  resource,
  // contextualizer,
  contextualization = {},
  renderingMode
}, {
  productionAssets
}) => {
  const title = contextualization.title || (0, _peritextUtils.getResourceTitle)(resource);
  const [isLocked, setLocked] = (0, _react.useState)(true);
  const coverAsset = (0, _peritextUtils.chooseAppropriateAsset)(resource, _meta.default.profile.block.assetPickingRules.element['paged'], productionAssets);
  let coverField;

  if (coverAsset) {
    coverField = coverAsset.resourceDataField;
  } else {
    return null;
  }

  let assetUri;
  let activeAssetField = coverField;
  let Content = null;

  if (renderingMode === 'paged') {
    if (coverAsset && coverAsset.asset) {
      assetUri = coverAsset.asset.data;
      activeAssetField = coverField;

      Content = () => _react.default.createElement("img", {
        src: assetUri
      });
    }
  } else if (coverAsset && coverAsset.asset) {
    if (isLocked) {
      assetUri = coverAsset.asset.data;
      activeAssetField = coverField;

      Content = () => _react.default.createElement("div", {
        onClick: () => setLocked(false),
        className: "cover"
      }, _react.default.createElement("img", {
        src: assetUri
      }), _react.default.createElement("h3", null, title));
    } else {
      activeAssetField = 'html';

      Content = () => _react.default.createElement(FullableEmbed, {
        html: resource.data.html
      });
    }
  } else {
    activeAssetField = 'html';

    Content = () => _react.default.createElement(FullableEmbed, {
      html: resource.data.html
    });
  }

  return _react.default.createElement("div", {
    id: contextualization.id,
    className: `peritext-contextualization block embed rendering-mode-${renderingMode} asset-field-${activeAssetField}`
  }, _react.default.createElement(Content, null));
};

Block.contextTypes = {
  productionAssets: _propTypes.default.object
};
var _default = Block;
exports.default = _default;