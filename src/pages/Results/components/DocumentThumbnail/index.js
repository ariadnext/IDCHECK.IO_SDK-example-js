import React, { Component } from 'react';

class DocumentThumbnail extends Component {

    render() {
        const { document } = this.props;
        return (
            <div className="document-thumbnail">
                <h3>{document.type}</h3>
                {document.images.length && <img
                    src={`/api/document/${document.uid}/image/${document.images[0].uid}`}
                    alt={document.type}
                    style={{ width: '100%' }}
                />}
            </div>
        );
    }

}

export default DocumentThumbnail;