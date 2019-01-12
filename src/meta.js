
export default {
  id: 'embed',
  type: 'peritext-contextualizer',
  name: 'Embed contextualizer',
  acceptedResourceTypes: [
  {
    type: 'embed',
  }
  ],
  profile: {
    block: {
      mutable: false,
      assetPickingRules: {
        element: {
          screened: [ 'html', 'rgbImageAssetId', 'cmybImageAssetId' ],
          paged: [ 'cmybImageAssetId', 'rgbImageAssetId', 'html' ]
        }
      }
    }
  }
};
