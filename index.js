
import React, { Component, Fragment, useEffect, useState } from "react";
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
import getWhichpage from "./src/utils/whichpage"; //判断是什么页面
import Loadding from "./src/components/loading";
import Weberror from "./src/components/weberro";
import "./src/css/antd.css";
import "./src/css/base.css";
import "./src/css/index.less";
import * as serviceWorker from "./serviceWorker";


const IndexLayout = (props) => {
  const { isLogin, isadmin, isInMaintain, archivePrivate, currentUrl, isGray } = BootCommons; //isInMaintain:是否维护    true 维护页面 false 博客页面

  const [showMaintain, setShowMaintain] = useState(false) //是否维护
  const [whichpage, setWhichpage] = useState({})
  const [getBlogInfoError, setGetBlogInfoError] = useState(false)  //
  const [blogInfo, setBlogInfo] = useState(undefined)




  // 跳转404页面
  const gotonotFind = () => {
    if (isLogin) {
      window.location.href = "https://www.cnblogs.com/bigweb/p/404.html";
    } else {
      window.location.href =
        "https://account.cnblogs.com/signin?ReturnUrl=" + currentUrl;
    }
  };

  useEffect(() => {
    addEventListener();  //移动端优化
    if (isGray) {
      $("body").addClass("memorial");
    }
    const { env } = process.env;
    console.log("process:", process);
    console.log("NODE_ENV:", process.env.NODE_ENV);
    if (process.env.NODE_ENV == "production") {
      console.log("我是线上");
    }
    let whichpage = getWhichpage(); //"https://www.cnblogs.com/bigweb/category/1100114.html"
    setWhichpage(whichpage)
    const subPages = whichpage.subPages;
    console.log('whichpage:', whichpage);

    getBlogInfo().then((res) => {
      const newResp = res || {}
      console.log("res:", newResp);
      if (newResp.state === 1) {
        console.log("state==1:", newResp);
        newResp.whichpage = whichpage;
        setBlogInfo(newResp);
        setGetBlogInfoError(false)
      } else if (newResp.state === 0) {
        console.log("stat不存在:", newResp);
        setBlogInfo({ whichpage: whichpage });
        setGetBlogInfoError(true)
      }
    }).catch((error) => {
      console.log("catch error:", error);
      setBlogInfo({ whichpage: whichpage });
      setGetBlogInfoError(true)
    });
  }, []);




  // 是否显示维护页面
  if (isInMaintain && isadmin === false) {
    $("#page_begin_html").addClass("full");
    return <Maintain />;
  }

  if (!blogInfo) {
    return (
      <Fragment>
        <Loadding />
      </Fragment>
    )
  }

  //文章私密时非博主隐藏文章列表、详情及文章档案,  非博主隐藏日志   跳转404
  if (["diaryList", "articlesList", "articlesInfo", "archives"].includes(whichpage.subPages) && isadmin === false) {
    console.log("隐藏跳转")
    gotonotFind();
    return <Loadding />
  }


  if (getBlogInfoError === true) {
    console.log("Weberror")
    return (
      <Fragment>
        <Weberror />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Fragment>
        <Homes blogInfo={blogInfo} setWhichpage={whichpage} />
      </Fragment>
    </Fragment>
  );

};

render(<IndexLayout />, document.getElementById("app"))
// serviceWorker.unregister()