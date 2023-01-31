/* 系统维护页面  */
import React, { Component } from 'react'
import './index.less'
import { Icon, Button } from 'antd';
import { Icons } from '../utils/utils'
import { IconFont } from '../utils/utils';
export default class loadding extends Component {
    constructor(props) {
        super(props);
        this.state = {


        }
    }
    componentWillMount() {

    }
    reloads = () => {
        window.location.reload();
    }

    render() {
        return (
            <div className='weberro-body an-row-center-all'>
                <div className='weberro-main'>
                    <p className="weberro-img">
                        <IconFont type="icon-icon-test" style={{ fontSize: "160px" }} />

                    </p>
                    <p className="weberro-text">网页似乎出了问题</p>
                    <p className="weberro-button"> <Button onClick={this.reloads}>重新加载 </Button></p>
                </div>
            </div>
        );
    }
};