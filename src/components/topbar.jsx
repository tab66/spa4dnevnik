import React from 'react';
import ReactDOM from 'react-dom';
import jsonp from './jsonp';

class Topbar extends React.Component{

    constructor(props){
        super();
        this.state = {
            id: '',
            disableBtn: true
        }
        this.getVal = this.getVal.bind(this);
        this.getUserId = this.getUserId.bind(this);
        this.getUserPhotos = this.getUserPhotos.bind(this);
    }

    getVal(e){

        let disableBtn = true,
            val = e.target.value;

        val ? disableBtn = false : '';

        this.setState({
            id: val,
            disableBtn
        });

    }

    getUserId(){
        const id = this.state.id;
        if(isNaN(id)){
            jsonp(`https://api.vk.com/method/users.get?user_ids=${id}`, function (data) {

                data.error ? this.props.getPhotos([]) : this.getUserPhotos(data.response[0].uid);

            }.bind(this));
        } else {
            this.getUserPhotos(id);
        }
    }

    getUserPhotos(id) {

        let testUsers = ['luridus', 'megsy_cyborg'];

        const data = {
            owner_id: id,
            album_id: 'wall',
            extended: 1,
            rev: 1,
            access_token: 'ada516e4ada516e4ada516e485adc57c06aada5ada516e4f7e9c3b49921fa8170ca478f'
        };

        let filter = '';

        for (let i in data) {
            filter = filter + '&' + i + '=' + data[i];
        }

        filter = '?' + filter.substr(1);

        jsonp(`https://api.vk.com/method/photos.get${filter}`, function (data) {

            this.props.getPhotos(data.response);

        }.bind(this));
    }

    render(){
        return (
            <div className="topbar">
                <div className="container">
                    <div className="topbar__logo-wrapper">
                        <div className="topbar__image-wrapper">
                            <img className="topbar__image" src="image/logo.png" alt=""/>
                        </div>
                        <span className="topbar__logo-text">
                            ImageGrubber
                        </span>
                    </div>
                    <div className="topbar__input-wrapper">
                        <input className="topbar__input" type="text" onChange={this.getVal} placeholder="Введите никнейм или id пользователя"/>
                        <button className="topbar__input-button" disabled={this.state.disableBtn} onClick={this.getUserId}>Показать</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Topbar;