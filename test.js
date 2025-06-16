import React, { Component, Fragment } from 'react'
import { render } from 'react-dom';
import Maintain from './src/components/isMaintain';
import { Button, message } from 'antd'
import Header from './src/include/header.js';
import { userinfo, galleryArry } from './src/utils/json'
import Loadding from './src/components/loading'
import Weberror from './src/components/weberro'
import { galleryList } from './src/pages/gallery'
import { sideBar } from "./src/include/sidebar"; //侧边栏
import { getBlogInfo } from './src/utils/commens.js' //获取博客信息

import { listserialnum, addEventListener, addjs, BootCommons, addkeys, isMobile, Icons, stringSplit, getLastbrackval, remLastbrackval, DateFormat, getDateDiff } from './src/utils/utils.js'
// import Whichpage from './src/utils/whichpage' //判断是什么页面
const { isInMaintain, archivePrivate, currentUrl, isGray } = BootCommons;  //isInMaintain:显示的页面  false 博客页面  true 维护页面
import './src/css/antd.css';
import './src/css/base.css';
import './src/css/index.less'



class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogInfo: userinfo,
            showMaintain: "",
            isnotFind: false, //是否404 未找到
            whichpage: {}
        }
    }
    componentWillMount() {
        let $this = this;

        addEventListener() // 移动端优化显示
        // let texts="10.原来他们四个也是有故事的男人"
        // let lists=listserialnum(texts)
        // console.log('lists:',lists);


    }
    componentDidMount() {
        let $this = this;
        // $("#home").show();
        const { blogInfo, archives } = this.state;

        sideBar(blogInfo, archives) //加载侧边栏






        // let backlist_src = "https://www.cnblogs.com/bigweb/gallery/682944.html"
        // let src = "http://n.sinaimg.cn/news/1_img/upload/cf3881ab/67/w1000h667/20200710/1349-iwasyei8902095.jpg";  //target="_New"
        // $(".forFlow").append(`<div class="gallery"><div class="galleryMain" id="gallery_info"></div></div>`);
        // let title = "浅谈响应式瀑布流的实现方式"
        // $("#gallery_info").append(`
        //     <div class="gallery_img">
        //         <img src="${src}" />
        //     </div>
        // `)
        // if (title != "") {
        //     $(".gallery_img").before(`
        //         <div class="gallery_Title">
        //             <h1>${title}</h1>
        //             <div class="gallery_Title_r">
        //                 <span><a href="${backlist_src}"><i class="iconfont icon-liebiao"></i>返回列表</a></span>
        //                 <span><a href="${src}" target="_New"><i class="iconfont icon-fangda"></i>查看原图</a></span>
        //             </div>
        //         </div>

        //     `)
        // }
    }
    render() {
        return (
            <Fragment>



                {/* <Maintain /> */}
                {/* <Loadding/> */}
                {/* <Weberror /> */}
                <Header blogInfo={userinfo} />

                {/* <Button type="primary">确定</Button> */}
            </Fragment>
        )
    }
}

render(<Test />, document.getElementById("app"));
