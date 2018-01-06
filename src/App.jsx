import React from 'react';
import ReactDOM from 'react-dom';

import Content from './components/content'
import Modal from './components/modal'
import Header from "./components/header";

class App extends React.Component{
    constructor(props){
        super();
        this.state = {
            data: '',
            photos: '',
            filter: '',
            modal: ''
        }
        this.getPhotos = this.getPhotos.bind(this);
        this.dataToPages = this.dataToPages.bind(this);
        this.modalAction = this.modalAction.bind(this);
    }

    getPhotos(arr){
        if(arr.length > 0){
            this.setState({data: arr});
            this.dataToPages(arr);
        } else {
            this.setState({photos: arr});
        }
    }

    sortByDate(){
        this.dataToPages(arr);
    }

    sortByLikes(){
        this.dataToPages(arr);
    }

    sortByComments(){
        this.dataToPages(arr);
    }

    reverseSort(){

    }

    dataToPages(photos){

        let protosArr = [];

        if (photos.length <= 50) {
            protosArr = photos;
        } else {
            let index = 0;
            photos.reduce((prev, next) => {
                index = index + 1;
                prev.push(next);
                if (prev.length === 50) {
                    protosArr.push(prev);
                    prev = [];
                } else if (index === photos.length) {
                    protosArr.push(prev);
                }
                return prev;
            }, [])
        }

        this.setState({photos: protosArr});

    }

    modalAction(data){

        let modal = '';

        data !== '' ? modal = <Modal data={data} allPhotos={this.state.photos} closeModal={this.modalAction} /> : '';

        this.setState({ modal });
    }

    render(){
        return (
            <div className="app-wrapper">
                <Header getPhotos={this.getPhotos} />
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