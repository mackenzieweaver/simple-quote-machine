import React, { Component } from 'react';
import axios from 'axios';

export default class GetQuote extends Component {
    constructor(props){      
        super(props);  
        this.state = {
            colors: ['#472e32', '#fb6964', '#342224', '#bdbb99', '#73a857', '#f39c12', '#3b4d74', '#f1886c', '#006400', '#f06595'],
            quotes: [],
            quote: '',
            authors: [],
            author: '',
            tweet: 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22',
            extension: '',
            tumblr: 'https://www.tumblr.com/',
        };
        // bindings
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount () {
        axios.get(`https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`)
            .then(res => {
            this.setState({ 
                quotes: res.data.quotes.map(x => x.quote),
                authors: res.data.quotes.map(y => y.author),
            });
            let randy = Math.floor(Math.random() * this.state.quotes.length);
            this.setState({  
                quote: this.state.quotes[randy],
                author: this.state.authors[randy],
                color: this.state.colors[Math.floor(Math.random() * this.state.colors.length)],
            });
            this.setState({
                extension: this.state.quote.replace(' ', '%20') + '%22'
            });
        });
    }

    handleClick(e){      
        e.preventDefault();   
        let numbr = Math.floor(Math.random() * this.state.quotes.length);
        this.setState({
            quote: this.state.quotes[numbr],
            author: this.state.authors[numbr],
            color: this.state.colors[Math.floor(Math.random() * this.state.colors.length)],
        })
        this.setState({
            extension: this.state.quote.replace(' ', '%20') + '%22'
        });
    }

    render() {
        return (
            <div id="background"
                style={{ backgroundColor: this.state.color }}>
                <div id="quote-box">
                    <div id="text" style={{ color: this.state.color }}>                            
                        <i className="fa fa-quote-left"></i>
                        { ' ' + this.state.quote }
                    </div>
                    <div id="author" className="text-right" 
                        style={{ color: this.state.color }}>
                        {'- ' + this.state.author }
                    </div>
                    <div>
                        <div id="social-media">
                            <a id="tweet-quote" className="buttons" target="_blank"
                                href={this.state.tweet + this.state.extension}
                                style={{backgroundColor: this.state.color}} >
                                <i className="fa fa-twitter"></i>
                            </a>
                            <a id="tumblr-post" className="buttons" target="_blank"
                                href={this.state.tumblr}
                                style={{backgroundColor: this.state.color}} >
                                <i className="fa fa-tumblr"></i>
                            </a>
                        </div>
                        <button id="new-quote" type="button" className="buttons" onClick={this.handleClick} 
                                style={{ backgroundColor: this.state.color }}>
                            New Quote
                        </button>            
                    </div>
                </div>
                <p style={{
                    margin: '0',
                    display: 'relative',
                    bottom: '10rem',
                    color: '#fff', 
                    fontSize: '14px', 
                }}>
                    by <a id="self-promo" href="https://codepen.io/mackenzieweaver/" target="_blank" rel="noopener noreferrer">mackenzieweaver</a>
                </p>
            </div>
        )
    }
}