import React from 'react';
import PropTypes from 'prop-types';

import meta from './meta';
import { chooseAppropriateAsset } from 'peritext-utils';

const Block = ( {
  resource,
  // contextualizer,
  contextualization = {},
  renderingMode
}, {
  productionAssets,
} ) => {

  const appropriateAsset = chooseAppropriateAsset( resource, meta.profile.block.assetPickingRules.element[renderingMode], productionAssets );
  let field;
  if ( appropriateAsset ) {
    field = appropriateAsset.resourceDataField;
  }
 else {
    return null;
  }

  let assetUri;

  const renderContent = () => {
    switch ( field ) {
      case 'html':
        return (
          <div
            dangerouslySetInnerHTML={ {/* eslint react/no-danger : 0 */
              __html: resource.data.html
            } }
          />
        );

        default:
          if ( appropriateAsset ) {
            assetUri = appropriateAsset.asset.data;
            return (
              <img src={ assetUri } />
            );
          }
        return null;
      }
    };
    return (
      <div
        id={ contextualization.id }
        className={ `peritext-contextualization block embed rendering-mode-${renderingMode} asset-field-${field}` }
      >
        {renderContent()}
      </div>
    );
  // }
};

Block.contextTypes = {
  productionAssets: PropTypes.object,
};

export default Block;
