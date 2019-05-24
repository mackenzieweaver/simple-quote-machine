import React, { Component } from 'react';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

library.add(faStroopwafel);

export default class GetQuote extends Component {
    constructor(props){      
        super(props);  
        this.state = {
            quote: [],
            author: [],
            num: 0,
        };        
        // bindings
        this.handleClick = this.handleClick.bind(this);
    }


    componentDidMount () {
        axios.get(`https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`)
            .then(res => {
                this.setState({ 
                    quote: res.data.quotes.map(x => x.quote),
                    author: res.data.quotes.map(y => y.author)
                });
            })
    }

    handleClick(e){      
        e.preventDefault();  
        let max = this.state.quote.length;
        let min = 0;
        this.setState({
            num: Math.floor(Math.random() * (max - min) + min)
        }) 
    }

    render() {
        return (
            <div style={quoteBox}>
                <FontAwesomeIcon icon="coffee" />
                <div>
                    {'"' + this.state.quote[this.state.num] + '"'}
                </div>
                <div className="text-right">
                    {'- ' + this.state.author[this.state.num] }
                </div>
                <div>
                    <button 
                        type="button" 
                        className="btn btn-outline-dark float-right" 
                        onClick={this.handleClick}>
                            New Quote
                    </button>            
                </div>
            </div>
        )
    }
}
const quoteBox = {
    margin: '5rem',
    padding: '5rem',
    color: 'cadetblue',
    backgroundColor: '#fff',
    borderRadius: '5px',
}