
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
  const [blogInfo, setBlogInfo] = useState(false)




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
    if (process.env.process == "production") {
      console.log("我是线上");
    }
    let whichpage = getWhichpage(); //"https://www.cnblogs.com/bigweb/category/1100114.html"

    const subPages = whichpage.subPages;
    console.log('whichpage:', whichpage);
    // 显示维护页面
    let newShowMaintain = "";
    if (isInMaintain && isadmin === false) {
      $("#page_begin_html").addClass("full");
      newShowMaintain = true;
    } else {
      $("#page_begin_html").removeClass("full");
      newShowMaintain = false;
    }
    setShowMaintain(newShowMaintain)
    // 非博主隐藏日志
    let newIsnotFind = false;
    if (subPages == "diaryList" && !isadmin) {
      newIsnotFind = true
      gotonotFind();

    }
    //文章私密时非博主隐藏文章列表、详情及文章档案
    if (archivePrivate && !isadmin) {
      if (subPages == "articlesList" || subPages == "articlesInfo" || subPages == "archives") {
        gotonotFind();
      }
    }
    if (newShowMaintain || newIsnotFind) {
      setBlogInfo(false);
      setShowMaintain(showMaintain);
      setWhichpage(whichpage)
    } else {
      getBlogInfo()
        .then((res) => {
          // console.log("res:", res);
          if (res.state === 1) {
            res.whichpage = whichpage;
            setBlogInfo(res);
            setWhichpage(whichpage)

          } else if (!checkNull(res.state) && res.state === 0) {
            setBlogInfo({ whichpage: whichpage });
            setWhichpage(whichpage)
            setGetBlogInfoError(true)

          }
        })
        .catch((error) => {
          setBlogInfo({ whichpage: whichpage });
          setWhichpage(whichpage)
          setGetBlogInfoError(true)
        });
    }
  }, []);


  if (!blogInfo) {
    return (
      <Fragment>
        <Loadding />
      </Fragment>
    )
  }

  if (showMaintain) {
    return <Maintain />;
  }



  if (getBlogInfoError === true) {
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