/* 系统维护页面  */
import React, { Component } from 'react'
import './index.less'
export default class Maintain extends Component {
    componentWillMount() {

    }
    render() {
        return (
            <section id="maintains">
                <div className="mainPage">
                    <div className="maintains_img">
                        <img src="https://images.cnblogs.com/cnblogs_com/webqiand/636997/o_jianse.jpg"/>
                    </div>
                    <div className="text">网站正在维护中....</div>
                </div>
            </section> 
        );
    }
};