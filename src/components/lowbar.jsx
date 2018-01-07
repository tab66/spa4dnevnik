import React from 'react';
import ReactDOM from 'react-dom';

class Lowbar extends React.Component{

    constructor(props){
        super();
        this.state = {
            error: '',
            showSort: false,
            filter: 'date',
            filterReverse: false
        }
        this.sortIt = this.sortIt.bind(this);
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
        return next.error !== this.state.error ||
               next.showSort !== this.state.showSort ||
               next.filter !== this.state.filter ||
               next.filterReverse !== this.state.filterReverse;
    }

    sortIt(e){
        let id = e.target.id;
        if(this.state.filter === id){
            this.props.sortIt('reverse');
            this.setState({filterReverse: !this.state.filterReverse});
        } else {
            this.props.sortIt(id);
            this.setState({
                filter: id,
                filterReverse: false
            });
        }

    }

    render(){
        console.log()
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
                                <button id="date" onClick={this.sortIt}
                                        className={`lowbar__filter${
                                        this.state.filter === 'date' && this.state.filterReverse ?
                                        ' lowbar__filter--sort-down' : this.state.filter === 'date' ?
                                        ' lowbar__filter--sort-up' : ''}`}>
                                    по дате
                                </button>
                                <button id="likes" onClick={this.sortIt}
                                        className={`lowbar__filter${
                                            this.state.filter === 'likes' && this.state.filterReverse ?
                                            ' lowbar__filter--sort-down' : this.state.filter === 'likes' ?
                                            ' lowbar__filter--sort-up' : ''}`}>
                                    по лайкам
                                </button>
                                <button id="comments" onClick={this.sortIt}
                                        className={`lowbar__filter${
                                            this.state.filter === 'comments' && this.state.filterReverse ?
                                            ' lowbar__filter--sort-down' : this.state.filter === 'comments' ?
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