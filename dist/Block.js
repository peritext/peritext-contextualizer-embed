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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FullableEmbed extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "render", () => {
      const {
        html
      } = this.props;
      return [_react.default.createElement(_reactFullScreen.default, {
        key: 0,
        enabled: this.state.isFullScreen,
        onChange: isFullScreen => this.setState({
          isFullScreen
        })
      }, _react.default.createElement("div", {
        dangerouslySetInnerHTML: {
          /* eslint react/no-danger : 0 */
          __html: html
        }
      }), this.state.isFullScreen && _react.default.createElement("button", {
        key: 1,
        className: "fullscreen-btn",
        onClick: () => this.setState({
          isFullScreen: false
        })
      }, "\u2756")), _react.default.createElement("button", {
        key: 1,
        className: "fullscreen-btn",
        onClick: () => this.setState({
          isFullScreen: true
        })
      }, "\u2756")];
    });

    this.state = {
      isFullScreen: false
    };
  }

}

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
        return _react.default.createElement(FullableEmbed, {
          html: resource.data.html
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