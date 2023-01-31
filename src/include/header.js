/* 博客头部 */
import React, { Component } from 'react'
import { BootCommons, isMobile, Icons, removehttp, isContain, linkTo, stringToArry } from '../utils/utils.js'
import { message, Dropdown, Menu } from 'antd'
import { getPostcategory, showsideMobile, getUserInfo } from '../utils/commens.js' //获取博客信息

import './header.less';
const { ctx, currentUrl, navList } = BootCommons;

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogInfo: {},
            navCategory: [],    //导航
            visible: false,
            nav_visiable: false,  //导航弹出框
            user_visiable: false, //用户信息弹出框
            search_val: "",
            userInfo: {},
            whichpage: {},
            navListArry: []
        }
    }
    componentWillMount() {
        const { blogInfo = {} } = this.props; //获取用户信息
        const { whichpage } = blogInfo;



        this.setState({
            blogInfo: blogInfo,
            whichpage: whichpage,
            userInfo: userInfo,
        });
        let userInfo = getUserInfo().then((datas) => {
            this.setState({
                userInfo: datas,
            });
        });
    }
    componentDidMount() {
        let $this = this;
        /*    获取导航         */
        this.getNav();

        $(window).scroll(function () {
            $this.backtop();
        });
    }
    // 获取导航
    getNav = () => {
        // let $this=this;
        let { navCategory } = this.state;
        let navListArry = stringToArry(navList);
        let currentnavs = this.getCurrentnav()
        navListArry.forEach((item, i) => {
            let isindexCurrent = currentnavs === item.replace(/(^\s*)|(\s*$)/g, "") ? true : false;
            navCategory.push({ name: item, link: "", current: isindexCurrent });
        })
        navCategory = [...[{ name: "首页", link: "https://" + removehttp(ctx), current: currentnavs === "index" ? true : false }], ...navCategory]
        this.setState({
            navCategory
        }, () => {
            getPostcategory().then((postcategory) => {
                if (postcategory.length > 0) {
                    postcategory.map((obj) => {
                        navCategory.find((values, index, arr) => {
                            if (values.name === obj.name) {
                                values.link = obj.link;
                            }
                        })
                    })
                    this.setState({ navCategory })
                }
            })
        })
    }
    // 获取当前选中导航
    getCurrentnav = () => {
        const { whichpage } = this.state;
        const { subPages } = whichpage;
        let currentnav = "";
        switch (subPages) {
            case "index":
                currentnav = "index";
                break;
            case "postList":
                let entrylistTitle = $(".entrylistTitle").html() ? $(".entrylistTitle").html().replace(/(^\s*)|(\s*$)/g, "") : "";
                currentnav = entrylistTitle.indexOf("-") >= 0 ? entrylistTitle.split("-")[1] : entrylistTitle;
                break;
        }
        currentnav = currentnav.replace(/(^\s*)|(\s*$)/g, "");
        return currentnav;
    }

    /*  搜索框伸缩*/
    searchshow = (e) => {
        var ev = e || event; // enent做兼容
        let isTrue = $(".search-hd").is(".on"); // 判断.search-hd是否是展开状态
        let search_val = $(".search-hd").addClass('on').find('input').val();
        ev.stopPropagation(); // 阻止冒泡
        if (search_val == "") { // 在输入框没有文字时执行
            if (isTrue) { // isTrue等于 true 移除on，false就添加on
                !isMobile ? $(".search-hd").removeClass('on').find('input').blur() : $(".search-hd").removeClass('on');
            } else {
                !isMobile ? $(".search-hd").addClass('on').find('input').focus() : $(".search-hd").addClass('on');
            }
        } else { //提交事件search-hd
            !isMobile ? $(".search-hd").find('input').focus() : "";
            if (isTrue) {
                this.tosearch();
            } else { }
        }

    }
    search_enter = (n) => {
        if (n.keyCode == 13) {
            this.tosearch()
        }
    }
    tosearch() {
        const { blogInfo } = this.state;
        // const {isadmin}=blogInfo;
        let search_val = document.getElementById("searchInput").value;
        if (search_val == "") {
            message.info("请输入你要搜索的内容")
            return false;
        }
        var n = encodeURIComponent("blog:" + blogInfo.blogApp + " " + search_val);
        window.location.href = "http://zzk.cnblogs.com/s?w=" + n
    }
    cancelSearch(e) {
        var ev = e || event; // enent做兼容
        $(".search-hd").removeClass('on').find('input').blur()
    }
    //电脑端下拉显示用户信息箭头旋转
    onVisibleChange = (visible) => {
        if (visible) {
            $(".login_namez").addClass("chevdown")
        } else {
            $(".login_namez").removeClass("chevdown")
        }
    }

    show_userModel = () => {
        const { visible, user_visiable } = this.state;
        this.setState({ user_visiable: user_visiable ? false : true, visible: user_visiable ? false : true })
        $("html,body, #main").addClass("overflow_hidden")
        // document.addEventListener('touchmove', this.touchStart,{passive:false});//一般第三个参数可直接填false,true -> 表示在捕获阶段调用事件处理程序, false -> 表示在冒泡阶段调用事件处理程序使用，但是touchmove会被浏览器忽略掉，并不会阻止默认行为，这里通过passive:false明确声明为不是被动的
        // this.setState({visible:user_visiable?false:true})
    }

    touchStart = (event) => {
        event.preventDefault();//通知 Web 浏览器不要执行与事件关联的默认动作
    }
    hideModel = () => {
        this.setState({ nav_visiable: false, visible: false, user_visiable: false })
        $("html,body, #main").removeClass("overflow_hidden")
        // document.removeEventListener('touchmove',this.touchStart,{passive:false});
    }
    // 返回顶部
    totop = () => {
        $('html,body').animate({ scrollTop: '0px' }, 800);
    }
    //返回顶部显示隐藏设置
    backtop = () => {
        if (!isMobile) {
            var daohj2 = $(document).scrollTop();
            var kjqyg = document.body.clientHeight; //屏幕宽
            if (daohj2 > (1 / 10) * kjqyg) {
                $("#backtop").fadeIn(800);
            }
            else {
                $("#backtop").fadeOut(800);
            }
        }

    }
    render() {
        const { blogInfo, navCategory, nav_visiable, user_visiable, userInfo = {} } = this.state;
        const { blogTitle, blogSubTitle, isadmin, isLogin, username } = blogInfo;
        const sideNavclassNames = nav_visiable ? "show-sideMobile" : "hide-sideMobile"
        const showUserclassNames = user_visiable ? "show-sideMobile" : "hide-sideMobile";
        const userAvatars = userInfo.avatarName ? userInfo.avatarName : blogInfo.userAvatar;  //用户头像
        let userDropdownData = [

            {
                title: "我的博客",
                link: userInfo.blogLink || "",
                icon: "icon-boke",
                isCheckAdmin: "false"
            },
            {
                title: "我的日志",
                link: ctx + "/MyDiary.html",
                icon: "icon-rizhi1",
                isCheckAdmin: "true"
            },
            {
                title: "我的主页",
                link: userInfo.blogApp && userInfo.blogApp !== "" ? "https://home.cnblogs.com/u/" + userInfo.blogApp : "",
                icon: "icon-home",
                isCheckAdmin: "false"
            },
            {
                title: "园子",
                link: "https://home.cnblogs.com/",
                icon: "icon-yuan",
                isCheckAdmin: "false"
            },
            {
                title: "我的收藏",
                link: "https://wz.cnblogs.com",
                icon: "icon-shoucang1",
                isCheckAdmin: "false",
            },
            {
                title: "我的消息",
                link: "https://msg.cnblogs.com/inbox",
                icon: "icon-xiaoxi",
                isCheckAdmin: "false"
            },
            // {
            //     title:"账号中心",
            //     link:"https://account.cnblogs.com/settings/account",
            //     icon:"icon-shezhi1",
            //     isCheckAdmin:"false"
            // },

            // {
            //     title:"问题反馈",
            //     link:"https://group.cnblogs.com/forum/public/",
            //     icon:"icon-wentifankui",
            //     isCheckAdmin:"false"
            // },
            // {
            //     title:"博客园首页",
            //     link:"https://www.cnblogs.com/",
            //     icon:"icon-shouye",
            //     isCheckAdmin:"false"
            // }
        ]

        const menu = (
            <Menu>

                <div className="writepost an-row">
                    <a className="wdyz" href="https://i.cnblogs.com/posts/edit" target="_blank"><Icons type="icon-bianji1" size="14px" />写随笔</a>
                    <a className="wdyz" href="https://i.cnblogs.com/articles/edit" target="_blank"><Icons type="icon-bianji" size="14px" />写文章</a>
                    <a className="wdyz" href="https://i.cnblogs.com/diaries/edit" target="_blank"><Icons type="icon-bianji2" size="14px" />写日记</a>
                </div>
                {
                    userDropdownData.map((obj, i) => {
                        if (obj.link && obj.link !== "") {
                            if (obj.isCheckAdmin === "true") {
                                if (isadmin) {
                                    return (
                                        <Menu.Item className="overlayList">
                                            <a href={obj.link} target="_blank" ><Icons type={obj.icon} size="18px" color="#00ACF0" />{obj.title}</a>
                                        </Menu.Item>
                                    )
                                }
                            } else {
                                return (
                                    <Menu.Item className="overlayList">
                                        <a href={obj.link} target="_blank"><Icons type={obj.icon} size="18px" color="#00ACF0" />{obj.title}</a>
                                    </Menu.Item>
                                )
                            }
                        }
                    })
                }

                <Menu.Item className="overlayList Loginout">
                    <a href={"https://passport.cnblogs.com/logout.aspx?ReturnUrl=" + currentUrl} id="lnkLoginout"><Icons type="icon-tuichu1" size="18px" color="#00ACF0" />注销</a>
                </Menu.Item>
            </Menu>
        );
        const ctxIndex = "https://" + removehttp(ctx);   //isMobile
        // pc端
        if (!isMobile) {
            return (
                <header id="headers" className="boxsizing">
                    <div className="headLeft">
                        <div id="logo">
                            <a href={ctxIndex}>
                                <p className={blogSubTitle ? "" : "line-blogTitle"}>{blogTitle}</p>
                                {blogSubTitle ? <em>{blogSubTitle}</em> : ""}
                            </a>
                        </div>
                        {/* <div id="search">
                            <div className="searchicobox"><Icons type="icon--search" onClick={(event) => this.searchshow(event)} size="22px" /></div>
                            <div id="searchContent" className="search-hd boxsizing">
                                <input id="searchInput" placeholder="请输入您要搜索的内容" onKeyUp={event => this.search_enter(event)} className="input_my_zzk box" type="search" />
                            </div>
                        </div> */}
                        {/*导航*/}
                        <ul id="navLists">
                            <li className="nav" ></li>
                            {
                                navCategory.map((objs, i) => {
                                    let navClasss = objs.current ? "nav_current" : "nav_" + (i + 1)
                                    return (
                                        <li className="nav" id={navClasss} key={i} data-name={objs.name}>
                                            <a className="menu" href={objs.link}>{objs.name}</a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="headRight">
                        <div id="search">
                            <div className="searchicobox"><Icons type="icon--search" onClick={(event) => this.searchshow(event)} size="22px" /></div>
                            <div id="searchContent" className="search-hd boxsizing">
                                <input id="searchInput" placeholder="请输入您要搜索的内容" onKeyUp={event => this.search_enter(event)} className="input_my_zzk box" type="search" />
                            </div>
                        </div>
                        <div className="userinfoshow">

                            {isLogin &&
                                <li className="guanz an-row-center-all" id="lnkname">
                                    <Dropdown overlay={menu} placement="bottomCenter" className="login_namez an-row-center-all" overlayClassName="overlayContent" onVisibleChange={(visible) => { this.onVisibleChange(visible) }}>
                                        <a className="ant-dropdown-link login_namez" href="javascript:void(0)">
                                            <em className="pc-show login_name an-row-center-all"><img className="login-avatars" src={userAvatars} /></em>
                                            {/* <span className="chevron-icon fa-chevron-down"><Icons type="icon-bottom" /></span> */}
                                        </a>
                                    </Dropdown>
                                </li>

                            }
                            {
                                !isLogin && <li id="tologin"><a href={"https://passport.cnblogs.com/login.aspx?ReturnUrl=" + currentUrl} title="登录"><Icons type="icon-denglu" size="26px" /></a></li> //登录
                            }
                            {/* {
                                !isLogin && <li id="signup"><a href={"https://account.cnblogs.com/signup?ReturnUrl=" + currentUrl}>注册</a></li>
                            } */}
                            <li className="dingy"><a href={ctx + "/rss"} target="_blank" title="订阅"><Icons type="icon-RSS rss_icon" size="32px" /></a></li>
                            {isLogin && <li className="Configure"><a href="https://i.cnblogs.com/" target="_blank" title="博客设置"><Icons type="icon-set" className="editico" size="18px" /></a></li>}
                        </div>
                    </div>

                    <div id="backtop" title="返回顶部" onClick={this.totop}><Icons type="icon--arrow-up" id="backtopIco" color="#FFF" size="20px" /></div>
                </header>
            );
        }
        // 移动端
        if (isMobile) {
            return (
                <header id="mobile_header" className="boxsizing">
                    <div className="headLeft">
                        <div id="logo">
                            <a href={ctxIndex}>
                                <p className={blogSubTitle ? "" : "line-blogTitle"}>{blogTitle}</p>
                                {blogSubTitle ? <em>{blogSubTitle}</em> : ""}
                            </a>
                        </div>

                    </div>

                    <div className="headRight">
                        <li className="headerList searchMain">
                            <Icons type="icon--search" title="搜索" onClick={(event) => this.searchshow(event)} size="22px" />
                            {/* 显示搜索框*/}
                            <div id="searchContent" className="search-hd boxsizing">
                                <input id="searchInput" placeholder="请输入您要搜索的内容" onKeyUp={event => this.search_enter(event)} className="input_my_zzk boxsizing" type="search" />
                                <span className="mobile-search"> <Icons type="icon--search" onClick={(event) => this.tosearch(event)} /></span>
                                <span className="cancel-search" onClick={(event) => this.cancelSearch(event)}>取消</span>
                            </div>
                        </li>
                        {
                            isLogin && <li id="username" className="headerList" onClick={this.show_userModel}><em className="mobile-show1 moble-head_img"><img src={userAvatars} /></em></li>
                        }

                        {
                            !isLogin && <li id="tologin" className="headerList" ><a href={"https://passport.cnblogs.com/login.aspx?ReturnUrl=" + currentUrl}><Icons type="icon-denglu" size=".48rem" /></a></li>
                        }
                        <li className="menus headerList" onClick={() => showsideMobile()}><a href="javascript:void(0)"><Icons type="icon-menu" title="菜单" /></a></li>
                    </div>

                    <div id="backtop" title="返回顶部" onClick={this.totop}><Icons type="icon--arrow-up" id="backtopIco" color="#FFF" size="20px" /></div>



                    {/* 窄屏幕弹出用户信息 */}
                    <div className={"sideModel " + showUserclassNames} style={{ height: "100vh" }}>
                        <div className="sideModel-nav" >
                            <span className="sidenav-icon"><Icons type="icon--left" title="返回" size="22px" onClick={() => this.hideModel()} /></span>
                            <h2>用户中心</h2>
                        </div>
                        <div className="sideModel-body" id="sideUser">
                            <div className="sideUser_avatarMain">
                                <div className="sideUser_avatarContent">
                                    <div className="sideUser_avatar"><img src={userAvatars} /></div>
                                    <div className="sideUser_name">{userInfo.displayName ? userInfo.displayName : blogInfo.username}</div>
                                </div>
                                <div className="sideUser_avatarRight">
                                    <a href={userInfo.blogApp && userInfo.blogApp !== "" ? "https://home.cnblogs.com/u/" + userInfo.blogApp : "javascript:void(0)"} className="arrow">个人主页</a>
                                </div>
                            </div>
                            <div className="mt0-5_r list-warp">
                                <div className="list-box arrow" onClick={() => { linkTo("https://i.cnblogs.com/posts/edit") }}>
                                    <div className="list-main"><div className="list-title">写随笔</div></div>
                                </div>
                                <div className="list-box arrow" onClick={() => { linkTo("https://i.cnblogs.com/articles/edit") }}>
                                    <div className="list-main"><div className="list-title">写文章</div></div>
                                </div>
                                <div className="list-box arrow" onClick={() => { linkTo("https://i.cnblogs.com/diaries/edit") }}>
                                    <div className="list-main"><div className="list-title">写日记</div></div>
                                </div>
                            </div>
                            <div className="mt0-5_r list-warp">
                                {
                                    userDropdownData.map((obj, i) => {
                                        if (obj.link && obj.link !== "") {
                                            if (obj.isCheckAdmin === "true") {
                                                if (isadmin) {
                                                    return (
                                                        <div className="list-box arrow" onClick={() => { linkTo(obj.link) }}>
                                                            <div className="list-main"><div className="list-title">{obj.title}</div></div>
                                                        </div>
                                                    )
                                                }
                                            } else {
                                                return (
                                                    <div className="list-box arrow" onClick={() => { linkTo(obj.link) }}>
                                                        <div className="list-main"><div className="list-title">{obj.title}</div></div>
                                                    </div>
                                                )
                                            }

                                        }


                                    })
                                }
                                <div className="list-box arrow" onClick={() => { linkTo(ctx + "/rss") }}>
                                    <div className="list-main"><div className="list-title">订阅</div></div>
                                </div>

                                {isadmin &&
                                    <div className="list-box arrow" onClick={() => { linkTo("https://i.cnblogs.com/") }}>
                                        <div className="list-main"><div className="list-title">博客设置</div></div>
                                    </div>
                                }
                            </div>
                            <div className="mt0-5_r list-warp mb1_r mb20" style={{ paddingBottom: "2px" }}>
                                <div className="list-box logout-list" onClick={() => { linkTo("https://passport.cnblogs.com/logout.aspx?ReturnUrl=" + currentUrl) }}>
                                    <p className="logout">注销 </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <MobileModal visible={this.state.visible} maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0)" }} wrapClassName={"sidenavmarks1 "} className={showUserclassNames}> </MobileModal> */}
                </header>
            )
        }

    }
}

