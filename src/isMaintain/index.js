/* 系统维护页面  */

import React, { Component } from 'react'
import { Button } from 'antd';
import './index.less'
export default class Maintain extends Component {
    componentWillMount() {

    }
    render() {
        return (
            <section id="maintains">
                <div className="mainPage">
                    <div className="maintains_img">
                        <img src="http://www.webnotes.top/public/images/jianse.jpg"/>
                    </div>
                    <div className="text">
                        
                       网站正在维护中....
                       <Button type="primary">确认</Button>
                    </div>
                </div>
                
            </section> 
        );
    }
};