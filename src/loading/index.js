/* 系统维护页面  */
import React, { Component } from 'react'
import './index.less'
export default class loadding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadding_text: "",
            
        } 
    }
    componentWillMount() {
        let loadding_text=this.props.text;
        this.setState({
            loadding_text:loadding_text
        })
    }
    render() {
        let {loadding_text}=this.state;
        return (
            <div className='loading'>
                <div className='loadMain'>
                    <div className='spinner'>
                        <div className='bounce1'></div>
                        <div className='bounce2'></div>
                        <div className='bounce3'></div>
                    </div>
                    <p className="loadingText">{loadding_text}</p>
                </div>
            </div>
        );
    }
};