import React, {Component} from 'react';

class SearchBar extends Component{
    state={
        term:''
    };
    onFormSubmit = e =>{
        e.preventDefault();
        this.props.onTermSubmit(this.state.term);

    };
    handleChange = e =>{
        this.setState({[e.target.id]:e.target.value});

    };
    render(){
        return(
            <div className="ui segment search-bar">
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="field">
                        <label >Video Search</label>
                        <input id="term" type="text" value={this.state.term} onChange={this.handleChange}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;