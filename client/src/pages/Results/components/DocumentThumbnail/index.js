import React from 'react';

function DocumentDisplay({ isVideo, ...props }) {
  // eslint-disable-next-line
  return isVideo ? <video controls={true} {...props} /> : <img {...props} />;
}

function DocumentThumbnail({ document }) {
  return (
    <div className="document-thumbnail">
      <h3>{document.type}</h3>
      {document.images.length && (
        <DocumentDisplay
          isVideo={
            document.images.length && document.images[0].origin === 'VIDEO'
          }
          src={`/api/document/${document.uid}/image/${document.images[0].uid}`}
          alt={document.type}
          style={{ width: '100%' }}
        />
      )}
    </div>
  );
}

export default DocumentThumbnail;
