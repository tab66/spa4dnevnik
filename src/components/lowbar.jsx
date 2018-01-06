import React from 'react';
import ReactDOM from 'react-dom';

class Lowbar extends React.Component{

    constructor(props){
        super();
        this.state = {
            error: '',
            showSort: false,
            filter: 'date'
        }
        // this.getPhotos = this.getPhotos.bind(this);
    }

    componentWillReceiveProps(props){
        // console.log(props);
        if(props.error){
            this.setState({
                error: props.error,
                showSort: false
            });
        } else if(props.showSort){
            this.setState({
                error: '',
                showSort: true
            });
        }
    }

    shouldComponentUpdate(prev, next){
        return next.showSort !== this.state.showSort;
    }

    render(){
        console.log('bang!');
        return (
            <div className={`lowbar${this.state.error ?
                ' lowbar--error' : this.state.showSort ?
                ' lowbar--sort' : ''}`}
            >
                <div className="container">
                    {this.state.error}
                    {this.state.showSort ?
                        <div className="lowbar__sort-wrapper">
                            <b>Выберите фильтр</b>
                            <div className="lowbar__filters-wrapper">
                                <button id="date" className={`lowbar__filter${
                                    this.state.filter === 'date' ?
                                    ' lowbar__filter--sort-up' : ''}`}>
                                    по дате
                                </button>
                                <button id="likes" className={`lowbar__filter${
                                    this.state.filter === 'likes' ?
                                    ' lowbar__filter--sort-up' : ''}`}>
                                    по лайкам
                                </button>
                                <button id="comments" className={`lowbar__filter${
                                    this.state.filter === 'comments' ?
                                    ' lowbar__filter--sort-up' : ''}`}>
                                    по комментариям
                                </button>
                            </div>
                        </div> : ''
                    }
                </div>
            </div>
        )
    }
}

export default Lowbar;