import React from 'react';
import ReactDOM from 'react-dom';

class PhotoTumblr extends React.Component {
    render() {
        return(
            <div className="photo-tumblr" onClick={e => this.props.openModal(this.props.data)}>
                <div className="photo-tumblr__body-wrapper">
                    <div className="photo-tumblr__image-wrapper">
                        <img src={this.props.data.src} alt=""/>
                    </div>
                    <div className="photo-tumblr__info">
                        <div className="photo-tumblr__info-item--likes">
                            {this.props.data.likes.count}
                        </div>
                        <div className="photo-tumblr__info-item--comments">
                            {this.props.data.comments.count}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PhotoTumblr;