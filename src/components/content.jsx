import React from 'react';
import ReactDOM from 'react-dom';

import PhotoTumblr from './PhotoTumblr';
import Pagination from './pagination';

class Content extends React.Component{
    constructor(props){
        super();
        this.state = {
            data: '',
            render: '',
            page: 1,
        }
        this.renderPhotos = this.renderPhotos.bind(this);
        this.changePage = this.changePage.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    componentWillMount(){
        if(this.props.data.length > 0){
            this.renderPhotos(this.props.data, 1);
            this.setState({data: this.props.data})
        } else {
            this.setState({render: 'Пользователь не выбран'});
        }
    }

    componentWillReceiveProps(props){
        if(props.data.length > 0){
            this.renderPhotos(props.data, 1);
            this.setState({data: props.data, page: 1});
        } else {
            this.setState({render: 'Пользователь не выбран'});
        }
    }

    renderPhotos(arr, page){

        console.log(arr);

        let render = arr[page - 1].map((elem, index) => {
                return <PhotoTumblr key={index} data={elem} openModal={this.openModal} />
            });

        this.setState({ render });
    }

    changePage(page){
        this.setState({ page });
        this.renderPhotos(this.state.data, page);
    }

    openModal(data){
        this.props.openModal(data, this.state.page);
    }

    render(){
        return (
            <div className="content">
                <div className="container">
                    <div className="content__wrapper">
                        {this.state.render}
                    </div>
                    {this.props.data.length > 1 ?
                        <Pagination
                            page={this.state.page}
                            allPages={this.props.data.length}
                            changePage={this.changePage}
                        /> : ''
                    }
                </div>
            </div>
        )
    }
}

export default Content;