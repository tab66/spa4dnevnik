import React from 'react';
import ReactDOM from 'react-dom';

import jsonp from './jsonp';

class Modal extends React.Component{

    constructor(props){
        super();
        this.state = {
            data: {},
            photos: {},
            index: 0,
            page: 1,
        }
        this.getIndex = this.getIndex.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.prevPhoto = this.prevPhoto.bind(this);
        this.nextPhoto = this.nextPhoto.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount(){
        this.setState({
            data: this.props.data,
            photos: this.props.allPhotos,
            index: this.getIndex()
        });

        document.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    componentWillUnmount(){
        document.removeEventListener("keyup", this.handleKeyUp.bind(this));
    }

    getIndex(){
        let all = this.props.allPhotos,
            data = this.props.data,
            dataIndex = [];

        all[0].map((elem, index) => {
            elem.pid === data.pid ? dataIndex.push(index) : '';
        });

        return dataIndex[0];
    }

    handleKeyUp(e) {
        if(e.key === 'ArrowRight'){
            this.nextPhoto();
        } else if(e.key === 'ArrowLeft') {
            this.prevPhoto();
        } else if(e.key === 'Escape'){
            this.props.closeModal('');
        }
    }


    nextPhoto(){
        let id = this.state.index + 1,
            page = this.state.page - 1,
            all = this.state.photos;
        if(id > 49){
            this.setState({
                data: all[page + 1][0],
                index: 0,
                page: page + 2
            });
        } else {
            this.setState({
                data: all[page][id],
                index: id
            });
        }
    }

    prevPhoto(){
        let id = this.state.index - 1,
            page = this.state.page - 1,
            all = this.state.photos;
        if(id < 0){
            this.setState({
                data: all[page - 1][49],
                index: 49,
                page: page
            });
        } else {
            this.setState({
                data: all[page][id],
                index: id
            });
        }
    }

    closeModal(e){
        e.target.classList[0] === 'modal' ? this.props.closeModal('') : '';
    }

    render(){
        let data = this.state.data,
            dateCreated = new Date(data.created * 1000).toISOString().substr(0, 10).split('-').reverse().join('.');
        return (
            <div className="modal" onClick={this.closeModal} onKeyDown={this.handleKeyDown}>
                {this.state.index === 0 && this.state.page === 1 ? '' :
                    <button className="modal__button--prev" onClick={this.prevPhoto}>
                        <i className="material-icons">chevron_left</i>
                    </button>
                }
                <div className="modal__content-wrapper">
                    <div className="modal__image-wrapper">
                        <img className="modal__image" src={data.src_xxbig || data.src_xbig || data.src_big} alt=""/>
                    </div>
                    <div className="modal__info">
                        <div className="modal__info-top">
                            <b>Общая информация о фотографии:</b>
                            <span className="modal__info-top-item--date">{dateCreated}</span>
                            <span className="modal__info-top-item--likes">{data.likes.count}</span>
                            <span className="modal__info-top-item--comments">{data.comments.count}</span>
                        </div>
                        <div className="modal__comments-wrapper">
                            Для отображения комментариев войдите в систему.
                        </div>
                    </div>
                </div>
                {this.state.index === 49 && this.state.page === this.state.photos.length ? '' :
                    <button className="modal__button--next" onClick={this.nextPhoto}>
                        <i className="material-icons">chevron_right</i>
                    </button>
                }
                <button className="modal__button--close" onClick={e => this.props.closeModal('')}>
                    <i className="material-icons">close</i>
                </button>
            </div>
        )
    }
}

export default Modal;