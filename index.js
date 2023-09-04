import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import Maintain from "./src/components/isMaintain";
import Homes from "./src/home.js";
import { getBlogInfo } from "./src/utils/commens.js"; //获取博客信息
import {
  addEventListener,
  BootCommons,
  isMobile,
  checkNull,
} from "./src/utils/utils.js";
import Whichpage from "./src/utils/whichpage"; //判断是什么页面
import Loadding from "./src/components/loading";
import Weberror from "./src/components/weberro";
import "./src/css/antd.css";
import "./src/css/base.css";
import "./src/css/index.less";

const { isLogin, isadmin, isInMaintain, archivePrivate, currentUrl, isGray } =
  BootCommons; //isInMaintain:是否维护    true 维护页面 false 博客页面

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogInfo: false,
      showMaintain: false,
      isnotFind: false, //是否404 未找到
      whichpage: {},
      getBlogInfoError: false,
    };
  }

  componentWillMount() {
    let $this = this;
    addEventListener(); // 移动端优化显示
    if (isGray) {
      $("body").addClass("memorial");
    }

    const { NODE_ENV } = process.env;
    console.log("process.env:", process.env);
    if (process.env.NODE_ENV == "production") {
      console.log("我是线上");
    }

    let whichpage = Whichpage(); //"https://www.cnblogs.com/bigweb/category/1100114.html"

    const { subPages } = whichpage;
    // console.log('whichpage:',whichpage);

    // 显示维护页面
    let showMaintain = "";
    if (isInMaintain && isadmin === false) {
      $("#page_begin_html").addClass("full");
      showMaintain = true;
    } else {
      showMaintain = false;
      $("#page_begin_html").removeClass("full");
    }

    // 非博主隐藏日志
    let isnotFind = false;
    if (subPages == "diaryList" && !isadmin) {
      //
      isnotFind = true;
    }
    //文章私密时非博主隐藏文章列表、详情及文章档案
    if (archivePrivate && !isadmin) {
      if (
        subPages == "articlesList" ||
        subPages == "articlesInfo" ||
        subPages == "archives"
      ) {
        isnotFind = true;
      }
    }
    if (showMaintain || isnotFind) {
      this.setState({
        blogInfo: {},
        showMaintain: showMaintain,
        isnotFind: isnotFind,
        whichpage,
      });
    } else {
      getBlogInfo()
        .then((res) => {
          console.log("res:", res);
          if (res.state === 1) {
            console.log("res.state===1");
            res.whichpage = whichpage;
            this.setState({
              blogInfo: res,
              whichpage,
            });
          } else if (!checkNull(res.state) && res.state === 0) {
            console.log("res.state===0");
            this.setState({
              blogInfo: { whichpage: whichpage },
              whichpage,
              getBlogInfoError: true,
            });
          }
        })
        .catch((error) => {
          console.log("getBlogInfo Error", error);
          this.setState({
            blogInfo: { whichpage: whichpage },
            whichpage,
            getBlogInfoError: true,
          });
        });
    }
  }
  componentDidMount() {}
  // 跳转404页面
  gotonotFind = () => {
    if (isLogin) {
      window.location.href = "https://www.cnblogs.com/bigweb/p/404.html";
    } else {
      window.location.href =
        "https://account.cnblogs.com/signin?ReturnUrl=" + currentUrl;
    }
  };
  render() {
    const { blogInfo, showMaintain, isnotFind, getBlogInfoError } = this.state;
    if (!blogInfo) {
      return (
        <Fragment>
          <Loadding />
        </Fragment>
      );
    } else if (showMaintain) {
      return <Maintain />;
    } else if (isnotFind) {
      this.gotonotFind();
    } else if (!getBlogInfoError) {
      return (
        <Fragment>
          <Homes blogInfo={blogInfo} />
        </Fragment>
      );
    } else {
      return <Weberror />;
      // return (
      //     <Fragment>
      //         <Homes blogInfo={blogInfo} />
      //     </Fragment>
      // )
    }
  }
}
render(<Main />, document.getElementById("app"));
