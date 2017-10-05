import React from 'react';

export default ({
  resource,
  // contextualizer,
  // contextualization
}) => (
  <figure className="peritext-contextualization peritext-contextualization-block peritext-contextualization-web peritext-contextualizer-embed"
    dangerouslySetInnerHTML={{
      __html: resource.data.html
    }} />
)