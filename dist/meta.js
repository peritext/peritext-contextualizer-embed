"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  id: 'embed',
  type: 'peritext-contextualizer',
  name: 'Embed contextualizer',
  acceptedResourceTypes: [{
    type: 'embed'
  }],
  profile: {
    block: {
      mutable: false,
      assetPickingRules: {
        element: {
          screened: ['html', 'rgbImageAssetId', 'cmybImageAssetId'],
          paged: ['cmybImageAssetId', 'rgbImageAssetId', 'html']
        }
      }
    }
  }
};
exports.default = _default;