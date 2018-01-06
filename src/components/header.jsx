import React from 'react';
import ReactDOM from 'react-dom';

import Topbar from './topbar';
import Lowbar from './lowbar';

class Header extends React.Component{

    constructor(props){
        super();
        this.state = {
            error: '',
            showSort: false
        }
        this.getPhotos = this.getPhotos.bind(this);
    }

    getPhotos(arr){
        if(arr.length > 0){
            this.props.getPhotos(arr);
            this.setState({
                error: '',
                showSort: true
            });
        } else {
            this.props.getPhotos([]);
            this.setState({
                error: 'Такого пользователя не существует! Введите другой ник или ID!',
                showSort: true
            })
        }
    }

    render(){
        return (
            <header>
                <Topbar getPhotos={this.getPhotos} />
                <Lowbar error={this.state.error} showSort={this.state.showSort} />
            </header>
        )
    }
}

export default Header;