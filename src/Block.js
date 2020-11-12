import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {FullScreen, useFullScreenHandle} from "react-full-screen";

import meta from './meta';
import { chooseAppropriateAsset, getResourceTitle } from 'peritext-utils';

const FullableEmbed = ({
  html
}) => {
  const [isFullScreen, setFullScreen] = useState(false);
  const screen = useFullScreenHandle();
  const reportChange = useCallback((state, /*handle*/) => {
    setFullScreen(state.active)
  }, [screen]);
  return [
    <FullScreen
      key={0}
      handle={screen}
      onChange={reportChange}
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
        onClick={() => {
          setFullScreen(false)
          screen.exit()
          if (document.fullscreenElement) { 
            document.exitFullscreen() 
          } else if (document.documentElement) { 
            document.documentElement.requestFullscreen() 
          } 
        }}
      >
        ❖
      </button>
    }
    </FullScreen>,
    <button 
      key={1} 
      className="fullscreen-btn" 
      onClick={() => {
        setFullScreen(true)
        screen.enter();
      }}
    >
      ❖
    </button>
  ];
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
  let Content = () => null;
  if (renderingMode === 'paged') {
    if ( coverAsset && coverAsset.asset ) {
      assetUri = coverAsset.asset.data;
      activeAssetField = coverField;
      return (
        <div
          id={ contextualization.id }
          className={ `peritext-contextualization block embed rendering-mode-${renderingMode} asset-field-${activeAssetField}` }
        >
          <img src={ assetUri } />
        </div>
      );
    }
  } else if (coverAsset && coverAsset.asset) {
    if (isLocked) {
      assetUri = coverAsset.asset.data;
      activeAssetField = coverField;
      return (
        <div
          id={ contextualization.id }
          className={ `peritext-contextualization block embed rendering-mode-${renderingMode} asset-field-${activeAssetField}` }
        >
          <div onClick={() => setLocked(false)} className="cover">
            <img src={assetUri} />
            <h3>{title}</h3>
          </div>
        </div>
      );
    } else {        
      activeAssetField = 'html';
      return (
        <div
          id={ contextualization.id }
          className={ `peritext-contextualization block embed rendering-mode-${renderingMode} asset-field-${activeAssetField}` }
        >
          <FullableEmbed html={resource.data.html} />
        </div>
      );
    }
  } else {
    activeAssetField = 'html';
    return (
      <div
        id={ contextualization.id }
        className={ `peritext-contextualization block embed rendering-mode-${renderingMode} asset-field-${activeAssetField}` }
      >
        <FullableEmbed html={resource.data.html} />
      </div>
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
