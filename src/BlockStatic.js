import React from 'react';

export default ({
  resource,
  // contextualizer,
  // contextualization
}) => {
  if (resource.data.thumbnail) {
    return (
    <figure className="resource-thumbnail peritext-contextualization peritext-contextualization-block peritext-contextualization-codex peritext-contextualizer-embed">
      <img 
        src={resource.data.thumbnail}
      />
    </figure>
    )
  }
  else return (
  <figure
    className="peritext-contextualization peritext-contextualization-block peritext-contextualization-codex peritext-contextualizer-embed"
    dangerouslySetInnerHTML={{
      __html: resource.data.html
    }} />
)}