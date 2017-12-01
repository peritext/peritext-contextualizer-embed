import React from 'react';
import PropTypes from 'prop-types';

const BlockStatic = ({
  resource,
  // contextualizer,
  // contextualization
}, {datasets}) => {
  const data = resource.data;
  const thumbnail = datasets[data.thumbnailDataset];
  if (thumbnail) {
    return (
    <figure className="resource-thumbnail peritext-contextualization peritext-contextualization-block peritext-contextualization-codex peritext-contextualizer-embed">
      <img 
        src={thumbnail.uri}
      />
    </figure>
    );
  }
  else return data.html ? (
    <figure
      className="peritext-contextualization peritext-contextualization-block peritext-contextualization-codex peritext-contextualizer-embed"
      dangerouslySetInnerHTML={{
        __html: data.html
      }} />
  ) : null;
};

BlockStatic.propTypes = {
  resource: PropTypes.object,
};

BlockStatic.contextTypes = {
  datasets: PropTypes.object,
}

export default BlockStatic;