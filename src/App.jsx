import React from 'react';
import ReactDOM from 'react-dom';

import Topbar from './components/topbar'
import Content from './components/content'
import Modal from './components/modal'

class App extends React.Component{
    constructor(props){
        super();
        this.state = {
            photos: '',
            modal: ''
        }
        this.getPhotos = this.getPhotos.bind(this);
        this.modalAction = this.modalAction.bind(this);
    }

    getPhotos(arr){
        arr.length > 0 ? this.setState({photos: arr}) : '';
    }

    modalAction(data){

        let modal = '';

        data !== '' ? modal = <Modal data={data} allPhotos={this.state.photos} closeModal={this.modalAction} /> : '';

        this.setState({ modal });
    }

    render(){
        return (
            <div className="app-wrapper">
                <Topbar getPhotos={this.getPhotos} />
                <Content data={this.state.photos} openModal={this.modalAction}  />
                {this.state.modal}
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);