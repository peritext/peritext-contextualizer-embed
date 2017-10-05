'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  type: 'peritext-contextualizer',
  id: 'embed',
  name: 'Embeddable hmtl code',
  coverage: {
    inlineStatic: false,
    blockStatic: false,
    inlineDynamic: false,
    blockDynamic: true
  },
  model: {
    acceptedResourceTypes: [{ type: 'embed' }],
    block: {
      options: []
    }
  }
};