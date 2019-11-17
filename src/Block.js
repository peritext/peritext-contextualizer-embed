import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import Fullscreen from "react-full-screen";

import meta from './meta';
import { chooseAppropriateAsset, getResourceTitle } from 'peritext-utils';

const FullableEmbed = ({
  html
}) => {
  const [isFullScreen, setFullScreen] = useState(false);
  return [
    <Fullscreen
      key={0}
      enabled={isFullScreen}
      onChange={newVal => setFullScreen(newVal)}
    >
    <div
      dangerouslySetInnerHTML={ {/* eslint react/no-danger : 0 */
        __html: html
      } }
    />
    {isFullScreen && 
      <button 
        key={1} 
        className="fullscreen-btn" 
        onClick={() => setFullScreen(false)}
      >
        ❖
      </button>
    }
    </Fullscreen>,
    <button 
      key={1} 
      className="fullscreen-btn" 
      onClick={() => setFullScreen(true)}
    >
      ❖
    </button>
  ]
}

const Block = ( {
  resource,
  // contextualizer,
  contextualization = {},
  renderingMode
}, {
  productionAssets,
} ) => {

  const title = contextualization.title || getResourceTitle(resource)

  const [isLocked, setLocked] = useState(true)

  const coverAsset = chooseAppropriateAsset( resource, meta.profile.block.assetPickingRules.element['paged'], productionAssets );
  let coverField;
  if ( coverAsset ) {
    coverField = coverAsset.resourceDataField;
  }
  else {
    return null;
  }

  let assetUri;
  let activeAssetField = coverField;
  let Content = null;
  if (renderingMode === 'paged') {
    if ( coverAsset && coverAsset.asset ) {
      assetUri = coverAsset.asset.data;
      activeAssetField = coverField;
      Content = () => (
        <img src={ assetUri } />
      );
    }
  } else if (coverAsset && coverAsset.asset) {
    if (isLocked) {
      assetUri = coverAsset.asset.data;
      activeAssetField = coverField;
      Content = () => (
        <div onClick={() => setLocked(false)} className="cover">
          <img src={assetUri} />
          <h3>{title}</h3>
        </div>
      );
    } else {        
      activeAssetField = 'html';
      Content = () => (
        <FullableEmbed html={resource.data.html} />
      )
    }
  } else {
    activeAssetField = 'html';
    Content = () => (
      <FullableEmbed html={resource.data.html} />
    );
  }
  return (
    <div
      id={ contextualization.id }
      className={ `peritext-contextualization block embed rendering-mode-${renderingMode} asset-field-${activeAssetField}` }
    >
      <Content />
    </div>
  );
};

Block.contextTypes = {
  productionAssets: PropTypes.object,
};

export default Block;
