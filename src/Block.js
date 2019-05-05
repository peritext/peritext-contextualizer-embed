import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Fullscreen from "react-full-screen";

import meta from './meta';
import { chooseAppropriateAsset } from 'peritext-utils';

class FullableEmbed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false
    }
  }
  render = () => {
    const {
      html
    } = this.props;
    return [
      <Fullscreen
        key={0}
        enabled={this.state.isFullScreen}
        onChange={isFullScreen => this.setState({isFullScreen})}
      >
      <div
        dangerouslySetInnerHTML={ {/* eslint react/no-danger : 0 */
          __html: html
        } }
      />
      {this.state.isFullScreen && 
        <button 
          key={1} 
          className="fullscreen-btn" 
          onClick={() => this.setState({isFullScreen: false})}
        >
          ❖
        </button>
      }
      </Fullscreen>,
      <button 
        key={1} 
        className="fullscreen-btn" 
        onClick={() => this.setState({isFullScreen: true})}
      >
        ❖
      </button>
    ]
  }
}

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
          <FullableEmbed html={resource.data.html} />
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
