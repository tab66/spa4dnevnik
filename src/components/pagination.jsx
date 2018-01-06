import React from 'react';
import ReactDOM from 'react-dom';

class Pagination extends React.Component {
    constructor(props){
        super();
        this.state = {
            page: 1,
            endPage: 0,
            pagRender: []
        }
        this.renderPagination = this.renderPagination.bind(this);
        this.toFirstPage = this.toFirstPage.bind(this);
        this.toPrevPage = this.toPrevPage.bind(this);
        this.toNextPage = this.toNextPage.bind(this);
        this.toLastPage = this.toLastPage.bind(this);
        this.newPage = this.newPage.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentWillMount(){
        let page = this.props.page,
            endPage = this.props.allPages;

        this.renderPagination(page, endPage);
    }

    renderPagination(page, endPage) {
        let i = 1,
            pagRender = [];

        page = Number(page);
        endPage = Number(endPage);

        if(page < 5 && endPage <= 7){
            for(i; i <= endPage; i++){
                pagRender.push(i);
            }
        } else if(page < 5){
            for(i; i < 6; i++){
                pagRender.push(i);
            }
            pagRender.push({text: '...', page: 6});
            pagRender.push(endPage);
        } else if(page + 5 > endPage){
            pagRender.push(1);
            pagRender.push({text: '...', page: endPage - 6});
            for(i = endPage - 5; i <= endPage; i++){
                pagRender.push(i);
            }
        } else {
            pagRender.push(1);
            pagRender.push({text: '...', page: page - 2});
            for(i = page - 1; i <= page + 1; i++){
                pagRender.push(i);
            }
            pagRender.push({text: '...', page: page + 2});
            pagRender.push(endPage);
        }
        this.setState({page: page, endPage: endPage, pagRender});
    }

    toFirstPage(e){
        e.preventDefault();
        let page = 1;
        this.changePage(page);
    }

    toPrevPage(e){
        e.preventDefault();
        let page = Number(this.state.page) - 1;
        this.changePage(page);
    }

    toNextPage(e){
        e.preventDefault();
        let page = Number(this.state.page) + 1;
        this.changePage(page);
    }

    toLastPage(e){
        e.preventDefault();
        let page = this.state.endPage;
        console.log(page);
        this.changePage(page);
    }

    newPage(e){
        e.preventDefault();
        let page = e.target.id;
        this.changePage(page);
    }

    changePage(page){
        this.props.changePage(page);
        this.renderPagination(page, this.props.allPages);
    }

    render(){
        return(
            <div className="pagination">
                <div className="pagination__links-wrapper">
                    <button onClick={this.toFirstPage} className="pagination__link" disabled={this.props.page === 1}><i className="material-icons">first_page</i></button>
                    <button onClick={this.toPrevPage} className="pagination__link" disabled={this.props.page === 1}><i className="material-icons">chevron_left</i></button>
                    {this.state.pagRender.map((elem, index) =>{
                        return <a key={index} id={elem.page || elem} onClick={this.newPage} href="#" className={`pagination__link${this.state.page === Number(elem) ? ' pagination__link--active' : ''}`}>{elem.text || elem}</a>
                    })}
                    <button onClick={this.toNextPage} className="pagination__link" disabled={this.props.page === this.props.allPages}><i className="material-icons">chevron_right</i></button>
                    <button onClick={this.toLastPage} className="pagination__link" disabled={this.props.page === this.props.allPages}><i className="material-icons">last_page</i></button>
                </div>
            </div>
        );
    }
}

export default Pagination;