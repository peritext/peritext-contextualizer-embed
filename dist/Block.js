"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _meta = _interopRequireDefault(require("./meta"));

var _peritextUtils = require("peritext-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Block = ({
  resource,
  // contextualizer,
  contextualization = {},
  renderingMode
}, {
  productionAssets
}) => {
  const appropriateAsset = (0, _peritextUtils.chooseAppropriateAsset)(resource, _meta.default.profile.block.assetPickingRules.element[renderingMode], productionAssets);
  let field;

  if (appropriateAsset) {
    field = appropriateAsset.resourceDataField;
  } else {
    return null;
  }

  let assetUri;

  const renderContent = () => {
    switch (field) {
      case 'html':
        return _react.default.createElement("div", {
          dangerouslySetInnerHTML: {
            /* eslint react/no-danger : 0 */
            __html: resource.data.html
          }
        });

      default:
        if (appropriateAsset) {
          assetUri = appropriateAsset.asset.data;
          return _react.default.createElement("img", {
            src: assetUri
          });
        }

        return null;
    }
  };

  return _react.default.createElement("div", {
    id: contextualization.id,
    className: `peritext-contextualization block embed rendering-mode-${renderingMode} asset-field-${field}`
  }, renderContent()); // }
};

Block.contextTypes = {
  productionAssets: _propTypes.default.object
};
var _default = Block;
exports.default = _default;